import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "@/services/productService";

/**
 * Slug'a göre ürün getir
 * @param {string} slug - Ürün slug'ı
 * @returns {Object} React Query hook result
 */
export const useProductBySlug = (slug) =>
  useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug).then((res) => res.data.data),
    enabled: !!slug, // Sadece slug varsa çalışır
    staleTime: 1000 * 60 * 5, // 5 dakika
  });

