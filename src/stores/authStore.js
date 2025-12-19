import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Authentication state management with Zustand
 * localStorage ile persist edilir
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      isLoggedIn: false,
      user: null,
      accessToken: null,

      // Actions
      /**
       * Login - Token ve user bilgilerini kaydet
       */
      setAuth: (token, userData) => {
        set({
          accessToken: token,
          user: userData,
          isLoggedIn: !!token,
        });
      },

      /**
       * Logout - Tüm auth bilgilerini temizle
       */
      clearAuth: () => {
        set({
          accessToken: null,
          user: null,
          isLoggedIn: false,
        });
      },

      /**
       * Token güncelle (refresh token sonrası)
       */
      updateToken: (token) => {
        set({
          accessToken: token,
          isLoggedIn: !!token,
        });
      },

      /**
       * User bilgilerini güncelle
       */
      updateUser: (userData) => {
        set({
          user: userData,
        });
      },

      /**
       * Auth durumunu kontrol et (localStorage'dan)
       */
      checkAuth: () => {
        const state = get();
        if (state.accessToken) {
          set({ isLoggedIn: true });
        } else {
          set({ isLoggedIn: false });
        }
      },
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        // Sadece bunları localStorage'a kaydet
        accessToken: state.accessToken,
        user: state.user,
      }),
    }
  )
);
