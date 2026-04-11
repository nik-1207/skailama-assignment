import { create } from "zustand";
import { getCustomerTags } from "../api";

export const useCustomerTagStore = create((set) => ({
  customerTags: [],
  loadCustomerTags: async () => {
    const customerTags = await getCustomerTags();
    set({ customerTags: customerTags.data });
  },
}));
