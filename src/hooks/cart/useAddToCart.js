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
      console.log("Sepete ekleme isteği:", productData);
      return addToCart(productData);
    },
    onSuccess: async (response, variables) => {
      console.log("Sepete ekleme başarılı:", response);

      // Sepet listesini yenile ve güncel veriyi al
      await queryClient.invalidateQueries({ queryKey: ["cart"] });

      // Sepet sidebar'ını aç
      openSidebar();
    },
    onError: (error) => {
      console.error("Sepete ekleme hatası:", error);
    },
  });
};
