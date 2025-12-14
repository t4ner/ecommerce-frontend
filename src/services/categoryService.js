import api from "@/lib/apiClient";

/**
 * Tüm kategorileri getir (tree yapısında)
 * @param {Object} params - Query parametreleri (opsiyonel)
 * @returns {Promise} API response
 */
export const getCategories = (params) =>
  api.get("/categories/getAllCategoriesTree", { params });
