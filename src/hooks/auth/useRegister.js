import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { register } from "@/services/authService";

/**
 * Kullanıcı kaydı için mutation hook
 * @returns {Object} React Query mutation result
 */
export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (userData) => register(userData),
    onSuccess: (response) => {
      // Access token'ı localStorage'a kaydet
      // Refresh token otomatik olarak cookie'ye kaydedilir (httpOnly)
      if (response.data?.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        console.log(
          "Access token saved to localStorage:",
          response.data.data.accessToken
        );
      } else {
        console.log("No accessToken in response", response.data);
      }
      // Başarılı kayıt sonrası ana sayfaya yönlendir
      router.push("/");
    },
    onError: (error) => {
      // Hata yönetimi mutation içinde yapılabilir veya component'te
      console.error("Register error:", error);
    },
  });
};
