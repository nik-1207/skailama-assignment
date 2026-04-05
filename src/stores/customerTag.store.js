import { create } from "zustand";
import { getCustomerTags } from "../api";

export const useCustomerTagStore = create((set) => ({
  customerTags: [],
  loadCustomerTags: () => set({ customerTags: getCustomerTags() }),
}));
