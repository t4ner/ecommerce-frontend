import api from "@/lib/apiClient";

/**
 * Tüm bannerları getir
 * @returns {Promise} API response
 */
export const getAllBanners = () => api.get("/banners/getAllBanners");
