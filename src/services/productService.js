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

/**
 * Slug'a göre tek bir ürün getir
 * @param {string} slug - Ürün slug'ı
 * @returns {Promise} API response
 */
export const getProductBySlug = (slug) =>
  api.get(`/products/getProductBySlug/${slug}`);

/**
 * Kategori slug'ına göre ürünleri getir
 * @param {string} slug - Kategori slug'ı
 * @returns {Promise} API response
 */
export const getProductsByCategorySlug = (slug) =>
  api.get(`/products/getProductsByCategorySlug/${slug}`);
