import api from "@/lib/apiClient";

/**
 * Kullanıcının sepetini getir
 * @returns {Promise} API response
 */
export const getCart = () => api.get("/cart/getCart");

/**
 * Sepete ürün ekle
 * @param {Object} productData - Ürün bilgileri
 * @returns {Promise} API response
 */
export const addToCart = (productData) =>
  api.post("/cart/addToCart", productData);

/**
 * Sepetteki ürün miktarını güncelle
 * @param {string} productId - Ürün ID'si
 * @param {Object} updateData - Güncelleme bilgileri (quantity vb.)
 * @returns {Promise} API response
 */
export const updateCartItem = (productId, updateData) =>
  api.put(`/cart/updateCartItem/${productId}`, updateData);

/**
 * Sepetten ürün sil
 * @param {string} productId - Ürün ID'si
 * @returns {Promise} API response
 */
export const removeFromCart = (productId) =>
  api.delete(`/cart/removeFromCart/${productId}`);

/**
 * Sepeti temizle
 * @returns {Promise} API response
 */
export const clearCart = () => api.delete("/cart/clearCart");
