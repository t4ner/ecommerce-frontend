import { useQuery } from "@tanstack/react-query";
import { getProductsByCategorySlug } from "@/services/productService";

/**
 * Kategori slug'ına göre ürünleri getir
 * @param {string} slug - Kategori slug'ı
 * @returns {Object} React Query hook result
 */
export const useProductsByCategorySlug = (slug) =>
  useQuery({
    queryKey: ["productsByCategorySlug", slug],
    queryFn: () => getProductsByCategorySlug(slug).then((res) => res.data.data),
    enabled: !!slug, // Sadece slug varsa çalışır
    staleTime: 1000 * 60 * 5, // 5 dakika
  });

