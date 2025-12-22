import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logout } from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";
import { useCartSidebarStore } from "@/stores/cartNotificationStore";

/**
 * Kullanıcı çıkışı için mutation hook
 * @returns {Object} React Query mutation result
 */
export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const closeSidebar = useCartSidebarStore((state) => state.closeSidebar);

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // Zustand store'u temizle
      clearAuth();
      // Sepet sidebar'ı kapat
      closeSidebar();
      // Frontend sepet cache'ini temizle (API'den silme, sadece frontend'de sıfırla)
      queryClient.removeQueries({ queryKey: ["cart"] });
      // Sepet query'sini null olarak set et
      queryClient.setQueryData(["cart"], null);
      // Refresh token cookie'de, backend logout endpoint'i temizler
      // Login sayfasına yönlendir
      router.push("/hesap/giris");
    },
    onError: (error) => {
      // Hata olsa bile store'u temizle, sepet cache'ini temizle ve yönlendir
      clearAuth();
      closeSidebar();
      queryClient.removeQueries({ queryKey: ["cart"] });
      queryClient.setQueryData(["cart"], null);
      router.push("/hesap/giris");
    },
  });
};
