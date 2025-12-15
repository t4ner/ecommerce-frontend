import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/services/productService";

/**
 * En yeni 10 ürünü getir
 * @returns {Object} React Query hook result
 */
export const useNewProducts = () =>
  useQuery({
    queryKey: ["newProducts"],
    queryFn: async () => {
      const response = await getAllProducts();
      const products = response.data.data || [];
      // En yeni ürünleri almak için createdAt'e göre sırala ve ilk 10'unu al
      const sortedProducts = [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return sortedProducts.slice(0, 10);
    },
    staleTime: 1000 * 60 * 5, // 5 dakika
  });
