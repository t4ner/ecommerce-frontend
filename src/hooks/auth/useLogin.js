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

      // Response yapısı: response.data.data.data.accessToken ve response.data.data.data.user
      const responseData = response.data?.data?.data || response.data?.data;

      if (responseData?.accessToken) {
        // Access token'ı localStorage'a kaydet
        // Refresh token otomatik olarak cookie'ye kaydedilir (httpOnly)
        localStorage.setItem("accessToken", responseData.accessToken);

        // Kullanıcı bilgilerini localStorage'a kaydet
        if (responseData?.user) {
          localStorage.setItem("user", JSON.stringify(responseData.user));
          console.log("User data saved:", responseData.user);
        } else {
          console.log("No user data in response:", responseData);
        }

        console.log("Access token saved successfully");
        // Auth değişikliğini bildir
        window.dispatchEvent(new Event("auth-change"));
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
