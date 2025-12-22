import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { register } from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";

/**
 * Kullanıcı kaydı için mutation hook
 * @returns {Object} React Query mutation result
 */
export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (userData) => register(userData),
    onSuccess: async (response) => {
      // Response yapısı: response.data.data.data.accessToken ve response.data.data.data.user
      const responseData = response.data?.data?.data || response.data?.data;

      // Zustand store'a kaydet
      if (responseData?.accessToken) {
        setAuth(responseData.accessToken, responseData.user);

        // Eski sepet cache'ini temizle ve yeni kullanıcının sepetini getir
        queryClient.removeQueries({ queryKey: ["cart"] });
        // Yeni kullanıcının sepetini hemen çek
        await queryClient.refetchQueries({ queryKey: ["cart"] });
      }
      // Başarılı kayıt sonrası ana sayfaya yönlendir
      router.push("/");
    },
    onError: (error) => {
      // Hata yönetimi component seviyesinde yapılabilir
    },
  });
};
