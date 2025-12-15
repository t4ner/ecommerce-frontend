import { useQuery } from "@tanstack/react-query";
import { getAllCampaigns } from "@/services/campaignService";

/**
 * Tüm kampanyaları getir
 * @returns {Object} React Query hook result
 */
export const useCampaigns = () =>
  useQuery({
    queryKey: ["campaigns"],
    queryFn: () => getAllCampaigns().then((res) => res.data.data),
    staleTime: 1000 * 60 * 5, // 5 dakika
  });
