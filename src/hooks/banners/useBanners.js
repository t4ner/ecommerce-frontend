import { useQuery } from "@tanstack/react-query";
import { getAllBanners } from "@/services/bannerService";

/**
 * Tüm bannerları getir
 * @returns {Object} React Query hook result
 */
export const useBanners = () =>
  useQuery({
    queryKey: ["banners"],
    queryFn: () => getAllBanners().then((res) => res.data.data),
    staleTime: 1000 * 60 * 5, // 5 dakika
  });
