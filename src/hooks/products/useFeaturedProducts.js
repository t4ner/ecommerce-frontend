import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "@/services/productService";

/**
 * Featured ürünleri getir
 * @returns {Object} React Query hook result
 */
export const useFeaturedProducts = () =>
  useQuery({
    queryKey: ["featuredProducts"],
    queryFn: () => getFeaturedProducts().then((res) => res.data.data),
    staleTime: 1000 * 60 * 5, // 5 dakika
  });
