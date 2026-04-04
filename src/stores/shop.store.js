import { create } from "zustand";
import { createStore, getStores } from "../api";

export const useShopStore = create((set) => ({
  activeShop: null,
  shops: [],
  setActiveShop: (shop) => set({ activeShop: shop }),
  loadShops: () => set({ shops: getStores() }),
  addShop: (name) => {
    const shop = createStore(name);
    set((state) => ({
      shops: [...state.shops, shop],
    }));
  },
}));
