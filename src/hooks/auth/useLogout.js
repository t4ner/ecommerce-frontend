import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logout } from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";

/**
 * Kullanıcı çıkışı için mutation hook
 * @returns {Object} React Query mutation result
 */
export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // Zustand store'u temizle
      clearAuth();
      // Sadece frontend sepet cache'ini temizle (backend'de sepet kalır)
      queryClient.removeQueries({ queryKey: ["cart"] });
      // Refresh token cookie'de, backend logout endpoint'i temizler
      console.log("Logout successful, frontend cart cache cleared");
      // Login sayfasına yönlendir
      router.push("/hesap/giris");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      // Hata olsa bile store'u temizle, sepet cache'ini temizle ve yönlendir
      clearAuth();
      queryClient.removeQueries({ queryKey: ["cart"] });
      router.push("/hesap/giris");
    },
  });
};
