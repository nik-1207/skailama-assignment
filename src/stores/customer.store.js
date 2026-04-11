import { create } from "zustand";
import { getUsers } from "../api";

export const useCustomerStore = create((set) => ({
  customers: [],
  loadCustomers: async () => {
    const customers = await getUsers();
    set({ customers:customers.data });
  },
}));
