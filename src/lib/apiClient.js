import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";

const api = axios.create({
  baseURL: "https://lizette-unfurbelowed-carly.ngrok-free.dev/api/",
  withCredentials: true, // Cookie'ler için gerekli (refreshToken httpOnly cookie'de)
  headers: {
    "Content-Type": "application/json",
  },
});
// Zustand store'a erişim helper
const getAuthStore = () => {
  if (typeof window !== "undefined") {
    return useAuthStore.getState();
  }
  return null;
};

// Refresh token mekanizması için state
let isRefreshing = false;
let failedQueue = [];

// Queue'daki request'leri işle
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor - Access token ekleme
api.interceptors.request.use(
  (config) => {
    // Zustand store'dan token al
    const store = getAuthStore();
    const token = store?.accessToken || localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - 401 hatası ve refresh token mekanizması
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url || "";
    const fullUrl = originalRequest?.baseURL
      ? `${originalRequest.baseURL}${requestUrl}`
      : requestUrl;

    // Login sayfasındaysak refresh deneme
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (currentPath === "/hesap/giris" || currentPath === "/hesap/kayit") {
        return Promise.reject(error);
      }
    }

    // Refresh endpoint'ine istek atıyorsak veya zaten retry edilmişse, sonsuz döngüyü önle
    if (
      requestUrl.includes("/auth/refresh") ||
      fullUrl.includes("/auth/refresh") ||
      originalRequest._retry ||
      originalRequest._skipRefresh
    ) {
      return Promise.reject(error);
    }

    // 401 hatası ve daha önce retry edilmemişse
    if (error.response?.status === 401) {
      // Eğer refresh işlemi devam ediyorsa, queue'ya ekle
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh token endpoint'ine istek at (cookie otomatik gönderilir)
        // Doğrudan axios kullanarak interceptor'a takılmadan istek atıyoruz
        // Yeni bir axios instance oluşturuyoruz ki interceptor'lara takılmasın
        const refreshAxios = axios.create({
          baseURL: api.defaults.baseURL,
          withCredentials: true,
        });

        const response = await refreshAxios.get("/auth/refresh");

        const newAccessToken = response.data?.data?.accessToken;

        if (newAccessToken) {
          // Zustand store'u güncelle
          const store = getAuthStore();
          if (store?.updateToken) {
            store.updateToken(newAccessToken);
          } else {
            // Fallback: localStorage'a kaydet
            localStorage.setItem("accessToken", newAccessToken);
          }

          // Queue'daki tüm request'leri yeni token ile işle
          processQueue(null, newAccessToken);

          // Orijinal request'i yeni token ile tekrar dene
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          isRefreshing = false;
          return api(originalRequest);
        } else {
          throw new Error("No access token in refresh response");
        }
      } catch (refreshError) {
        // Refresh başarısız oldu
        processQueue(refreshError, null);
        isRefreshing = false;

        // Zustand store'u temizle
        const store = getAuthStore();
        if (store?.clearAuth) {
          store.clearAuth();
        } else {
          // Fallback: localStorage'dan temizle
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
        }

        // Login sayfasına yönlendir (sadece bir kez)
        if (typeof window !== "undefined" && !window._redirectingToLogin) {
          window._redirectingToLogin = true;
          window.location.href = "/hesap/giris";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
