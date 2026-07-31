import LikePage from "@/app/(shop)/liked/page";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface LikedItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface LikedStore {
  items: LikedItem[];
  toggleLike: (item: LikedItem) => void;
  isLiked: (id: number) => boolean;
  removeLike: (id: number) => void;
  clearLiked: () => void; 
}

const syncLiked = (items: LikedItem[]) => {
  fetch("/api/users/liked", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ liked: items }),
  }).catch(() => {}); // fire-and-forget
};

export const useLikedStore = create<LikedStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleLike: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          const items = existing ? state.items.filter((i) => i.id !== item.id) :[...state.items, item];
          syncLiked(items);
          return { items };
        }),

      isLiked: (id) => {
        return get().items.some((i) => i.id === id);
      },

      removeLike: (id) =>
        set((state) => {
         const items = state.items.filter((i) => i.id !== id);
         syncLiked(items);
         return { items };
        }),
        clearLiked: () =>
          set(() => {
          syncLiked([]);
          return { items: [] };
        }),
    }),
    {
      name: "liked-storage",
    },
  ),
);