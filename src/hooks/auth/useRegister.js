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
    onSuccess: (response) => {;

      // accessToken'ı localStorage'a kaydet
      if (response.data?.data?.accessToken) {
        localStorage.setItem("token", response.data.data.accessToken);
        console.log(
          "Token saved to localStorage:",
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
