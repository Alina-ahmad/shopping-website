import {create } from "zustand";
import { useCartStore } from "./cartStore";
import { useLikedStore } from "./likedStore";

interface User {
    id: string;
    email: string;
    username: string
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user:null,
    isLoading: true,
    setUser: (user) => set({user}),
    checkAuth: async () => {
        try {
            const res = await  fetch("/api/users");
            if (res.ok) {               
                const data = await res.json();
                set({user: data, isLoading:false});
                useCartStore.setState({ items: data.cart ?? [] });
                useLikedStore.setState({ items: data.liked ?? [] });
            }else {
                set({user:null, isLoading:false});
            } 
        } catch (error) {
            set({ user: null, isLoading: false });
        }
    }

}))