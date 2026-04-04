import { create } from "zustand";
import { getUsers } from "../api";

export const useCustomerStore = create((set) => ({
  customers: [],
  loadCustomers: () => set({ customers: getUsers() }),
}));
