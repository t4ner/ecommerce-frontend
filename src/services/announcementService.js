import api from "@/lib/apiClient";

/**
 * Tüm duyuruları getir
 * @returns {Promise} API response
 */
export const getAllAnnouncements = () =>
  api.get("/announcements/getAllAnnouncements");
