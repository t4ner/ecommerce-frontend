import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categoryService";

/**
 * Tüm kategorileri getir (tree yapısında)
 * @param {Object} params - Query parametreleri (opsiyonel)
 * @returns {Object} React Query hook result
 */
export const useCategories = (params) =>
  useQuery({
    queryKey: ["categories", params],
    queryFn: () => getCategories(params).then((res) => res.data.data),
    staleTime: 1000 * 60, // 1 dakika
  });
