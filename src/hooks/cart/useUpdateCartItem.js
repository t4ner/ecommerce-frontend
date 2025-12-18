import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartItem } from "@/services/cartService";

/**
 * Sepetteki ürün miktarını güncelle
 * @returns {Object} React Query mutation result
 */
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, updateData }) =>
      updateCartItem(productId, updateData),
    onSuccess: () => {
      // Sepet listesini yenile
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

