import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5858/api",
  withCredentials: false, // Cookie kullanmıyoruz, token header ile gönderiliyor
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Token ekleme
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Hata yönetimi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 Unauthorized - Token geçersiz veya süresi dolmuş
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Gerekirse login sayfasına yönlendirme yapılabilir
    }
    return Promise.reject(error);
  }
);

export default api;
