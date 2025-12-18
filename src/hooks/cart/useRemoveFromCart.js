import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart } from "@/services/cartService";

/**
 * Sepetten ürün sil
 * @returns {Object} React Query mutation result
 */
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => removeFromCart(productId),
    onSuccess: () => {
      // Sepet listesini yenile
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
