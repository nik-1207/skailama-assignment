import { create } from "zustand";
import { getProducts } from "../api";

export const useProductStore = create((set) => ({
  products: [],
  loadProducts: () => set({ products: getProducts() }),
}));
