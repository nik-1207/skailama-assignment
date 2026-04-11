import { create } from "zustand";
import { getProducts } from "../api";

export const useProductStore = create((set) => ({
  products: [],
  loadProducts: async () => {
    const products = await getProducts();
    set({ products: products.data });
  },
}));
