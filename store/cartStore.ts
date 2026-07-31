import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
}

const syncCart = (items: CartItem[]) => {
  fetch("/api/users/cart", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart: items }),
  }).catch(() => {}); // fire-and-forget
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          const items = existing
            ? state.items.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
            : [...state.items, { ...item, quantity: 1 }];
          syncCart(items);
          return { items };
        }),

      removeFromCart: (id) =>
        set((state) => {
          const items = state.items.filter((i) => i.id !== id);
          syncCart(items);
          return {items};
        }),

      increaseQty: (id) =>
        set((state) => {
          const items = state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
          );
           syncCart(items);
          return {items};
        }),

      decreaseQty: (id) =>
        set((state) => {
          const items = state.items
            .map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
            )
            .filter((i) => i.quantity > 0);
             syncCart(items);
             return {items};
        }),

      clearCart: () => set(() => {
        syncCart([]);
        return { items: [] };
      }),
    }),
    {
      name: "cart-storage",
    },
  ),
);