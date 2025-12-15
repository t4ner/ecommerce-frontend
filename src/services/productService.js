import api from "@/lib/apiClient";

/**
 * Featured ürünleri getir
 * @returns {Promise} API response
 */
export const getFeaturedProducts = () =>
  api.get("/products/getFeaturedProducts");

/**
 * Tüm ürünleri getir
 * @returns {Promise} API response
 */
export const getAllProducts = () => api.get("/products/getAllProducts");
