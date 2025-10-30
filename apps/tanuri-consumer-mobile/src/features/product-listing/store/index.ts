import { create } from "zustand";

// Store for ProductListing
interface ProductFilteringState {
  searchQuery?: string;
  categoryId?: number;
}

interface ProductFilteringActions {
  setSearch: (search: string | null) => void;
  setCategory: (categoryId: number | null) => void;
  clearFilters: () => void;
}

export const useProductFilteringStore = create<
  ProductFilteringState & ProductFilteringActions
>((set) => ({
  searchQuery: undefined,
  categoryId: undefined,

  setCategory: (categoryId) => {
    set({ categoryId: categoryId ?? undefined });
  },
  setSearch: (search) => {
    set({ searchQuery: search ?? undefined });
  },
  clearFilters: () => {
    set({ searchQuery: undefined, categoryId: undefined });
  },
}));
