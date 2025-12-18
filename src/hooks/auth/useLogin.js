import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";

/**
 * Kullanıcı girişi için mutation hook
 * @returns {Object} React Query mutation result
 */
export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials) => login(credentials),
    onSuccess: (response) => {
      console.log("Login success response:", response);
      if (response.data?.data?.accessToken) {
        // Access token'ı localStorage'a kaydet
        // Refresh token otomatik olarak cookie'ye kaydedilir (httpOnly)
        localStorage.setItem("accessToken", response.data.data.accessToken);
        console.log("Access token saved successfully");
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
