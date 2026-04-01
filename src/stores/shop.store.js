import { create } from "zustand";
import { getStores } from "../api";

export const useShopStore = create((set) => ({
  activeShop: "",
  shops: [],
  setActiveShop: (shop) => set({ activeShop: shop }),
  loadShops: () => set({ shops: getStores() }),
}));
