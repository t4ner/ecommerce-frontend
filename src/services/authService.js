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
export const register = (userData) => api.post("/auth/register", userData);
