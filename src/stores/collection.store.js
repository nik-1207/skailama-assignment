import { create } from "zustand";
import { getCollections } from "../api";

export const useCollectionStore = create((set) => ({
  collections: [],
  loadCollections: async () => {
    const collections = await getCollections();
    set({ collections: collections.data });
  },
}));
