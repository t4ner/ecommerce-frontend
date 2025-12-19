import api from "@/lib/apiClient";

/**
 * Kullanıcı girişi yap
 * @param {Object} credentials - Giriş bilgileri { email, password }
 * @returns {Promise} API response
 */
export const login = (credentials) => api.post("/auth/login", credentials);

/**
 * Kullanıcı kaydı yap
 * @param {Object} userData - Kullanıcı bilgileri { name, email, password }
 * @returns {Promise} API response
 */
export const register = (userData) => {
  // Role'ü otomatik olarak "user" olarak ekle
  const dataWithRole = {
    ...userData,
    role: "user",
  };
  return api.post("/auth/register", dataWithRole);
};

/**
 * Refresh token kullanarak yeni access token al
 * Cookie'deki refreshToken otomatik gönderilir (withCredentials: true)
 * @returns {Promise} API response
 */
export const refreshToken = () => api.get("/auth/refresh");

/**
 * Kullanıcı çıkışı yap
 * Cookie'deki refreshToken'ı temizler
 * @returns {Promise} API response
 */
export const logout = () => api.post("/auth/logout");
