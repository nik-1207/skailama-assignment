import { create } from "zustand";
import { createStore, getStores } from "../api";

export const useShopStore = create((set) => ({
  activeShop: null,
  shops: [],
  setActiveShop: (shop) => set({ activeShop: shop }),
  loadShops: () => set({ shops: getStores() }),
  addShop: async ({ name, timezone }) => {
    const shop = await createStore({ name, timezone });
    set((state) => ({
      shops: [...state.shops, shop],
    }));
    return shop;
  },
}));
