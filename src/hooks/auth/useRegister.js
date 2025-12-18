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
      // Response yapısı: response.data.data.data.accessToken ve response.data.data.data.user
      const responseData = response.data?.data?.data || response.data?.data;
      
      // Access token'ı localStorage'a kaydet
      // Refresh token otomatik olarak cookie'ye kaydedilir (httpOnly)
      if (responseData?.accessToken) {
        localStorage.setItem("accessToken", responseData.accessToken);
        
        // Kullanıcı bilgilerini localStorage'a kaydet
        if (responseData?.user) {
          localStorage.setItem("user", JSON.stringify(responseData.user));
          console.log("User data saved:", responseData.user);
        } else {
          console.log("No user data in response:", responseData);
        }
        
        console.log(
          "Access token saved to localStorage:",
          responseData.accessToken
        );
        // Auth değişikliğini bildir
        window.dispatchEvent(new Event("auth-change"));
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
