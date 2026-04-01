import { create } from "zustand";
import { createStore, getStores } from "../api";

export const useShopStore = create((set) => ({
  activeShop: "",
  shops: [],
  setActiveShop: (shop) => set({ activeShop: shop }),
  loadShops: () => set({ shops: getStores() }),
  addShop: (shop) => {
    createStore(shop)
    set([...state.shops, shop])
  }
}));
