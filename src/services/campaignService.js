import api from "@/lib/apiClient";

/**
 * Tüm kampanyaları getir
 * @returns {Promise} API response
 */
export const getAllCampaigns = () => api.get("/campaigns/getAllCampaigns");

