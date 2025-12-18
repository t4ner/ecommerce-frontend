import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/services/cartService";

/**
 * Kullanıcının sepetini getir
 * @returns {Object} React Query hook result
 */
export const useCart = () =>
  useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart().then((res) => res.data.data),
    staleTime: 1000 * 60, // 1 dakika
  });

