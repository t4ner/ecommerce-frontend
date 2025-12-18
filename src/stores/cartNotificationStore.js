import { create } from "zustand";

/**
 * Sepet sidebar için global state
 */
export const useCartSidebarStore = create((set) => ({
  isOpen: false,

  // Sidebar'ı aç
  openSidebar: () => {
    set({ isOpen: true });
  },

  // Sidebar'ı kapat
  closeSidebar: () => {
    set({ isOpen: false });
  },

  // Sidebar'ı toggle et
  toggleSidebar: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
}));
