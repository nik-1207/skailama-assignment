import { create } from "zustand";
import { getCollections } from "../api";

export const useCollectionStore = create((set) => ({
  collections: [],
  loadCollections: () => set({ collections: getCollections() }),
}));
