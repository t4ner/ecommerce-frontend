import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logout } from "@/services/authService";

/**
 * Kullanıcı çıkışı için mutation hook
 * @returns {Object} React Query mutation result
 */
export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // Access token'ı localStorage'dan temizle
      localStorage.removeItem("accessToken");
      // Refresh token cookie'de, backend logout endpoint'i temizler
      console.log("Logout successful");
      // Login sayfasına yönlendir
      router.push("/hesap/giris");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      // Hata olsa bile token'ları temizle ve yönlendir
      localStorage.removeItem("accessToken");
      router.push("/hesap/giris");
    },
  });
};
