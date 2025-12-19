import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";

/**
 * Kullanıcı girişi için mutation hook
 * @returns {Object} React Query mutation result
 */
export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials) => login(credentials),
    onSuccess: async (response) => {
      console.log("Login success response:", response);

      // Response yapısı: response.data.data.data.accessToken ve response.data.data.data.user
      const responseData = response.data?.data?.data || response.data?.data;

      if (responseData?.accessToken) {
        // Zustand store'a kaydet
        setAuth(responseData.accessToken, responseData.user);
        console.log("Access token and user saved successfully");

        // Eski sepet cache'ini temizle ve yeni kullanıcının sepetini getir
        queryClient.removeQueries({ queryKey: ["cart"] });
        // Yeni kullanıcının sepetini hemen çek
        await queryClient.refetchQueries({ queryKey: ["cart"] });
      } else {
        console.log("No accessToken found in response:", response.data);
      }
      // Başarılı giriş sonrası ana sayfaya yönlendir
      router.push("/");
    },
    onError: (error) => {
      console.log("Login error:", error);
    },
  });
};
