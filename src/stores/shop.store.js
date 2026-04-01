import { create } from "zustand";

export const useShopStore = create((set) => ({
  setActiveShop: (shop) => set({ activeShop: shop }),
}));
