import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/services/cartService";
import { useCartSidebarStore } from "@/stores/cartNotificationStore";

/**
 * Sepete ürün ekle
 * @returns {Object} React Query mutation result
 */
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { openSidebar } = useCartSidebarStore();

  return useMutation({
    mutationFn: ({ productData, product }) => {
      return addToCart(productData);
    },
    onSuccess: async (response, variables) => {
      // Sepet listesini yenile ve güncel veriyi al
      await queryClient.invalidateQueries({ queryKey: ["cart"] });

      // Sepet sidebar'ını aç
      openSidebar();
    },
    onError: (error) => {
      // Hata yönetimi component seviyesinde yapılabilir
    },
  });
};
