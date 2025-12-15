import { useQuery } from "@tanstack/react-query";
import { getAllAnnouncements } from "@/services/announcementService";

/**
 * Tüm duyuruları getir
 * @returns {Object} React Query hook result
 */
export const useAnnouncements = () =>
  useQuery({
    queryKey: ["announcements"],
    queryFn: () => getAllAnnouncements().then((res) => res.data.data),
    staleTime: 1000 * 60 * 5, // 5 dakika
  });
