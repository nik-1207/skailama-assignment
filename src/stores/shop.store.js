import { create } from "zustand";
import { createStore, getStores } from "../api";

export const useShopStore = create((set) => ({
  activeShop: null,
  shops: [],
  setActiveShop: (shop) => set({ activeShop: shop }),
  loadShops: async () => {
    const shops = await getStores();
    set({ shops: shops.data });
  },
  addShop: async ({ name, timezone, currency }) => {
    const shop = await createStore({ name, timezone, currency });
    set((state) => ({
      shops: [...state.shops, shop],
    }));
    return shop;
  },
}));
