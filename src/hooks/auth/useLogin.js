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
        localStorage.setItem("token", response.data.data.accessToken);
        console.log("Token saved successfully");
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
