import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart } from "@/services/cartService";

/**
 * Sepeti temizle
 * @returns {Object} React Query mutation result
 */
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearCart(),
    onSuccess: () => {
      // Sepet listesini yenile
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

