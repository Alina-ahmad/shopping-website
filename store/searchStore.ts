import { create } from "zustand";

interface SearchState {
  searchText: string;
  setSearchText: (text: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchText: "",
  setSearchText: (text) => set({ searchText: text }),
}));