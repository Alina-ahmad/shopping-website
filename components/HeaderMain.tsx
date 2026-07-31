"use client";

import React, { useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useCartStore } from "@/store/cartStore";
import { useLikedStore } from "@/store/likedStore";
import { useState } from "react";
import Link from "next/link";
import { useSearchStore } from "@/store/searchStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const HeaderMain = () => {
  const cartItems = useCartStore((state) => state.items);
  const likedItems = useLikedStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const clearLiked = useLikedStore((state) => state.clearLiked);
  const { searchText, setSearchText } = useSearchStore();
  const { user, checkAuth, setUser } = useAuthStore();
  const router = useRouter();

   useEffect(() => {
    checkAuth();
  }, [checkAuth]);

    const handleLogout = async () => {
    await fetch("/api/users/logout", { method: "POST" });
    setUser(null);
    clearCart();
    clearLiked();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="sticky top-0 z-10 border-b border-gray-200 py-6 bg-white ">
      <div className="px-[43px] sm:flex justify-between items-center ">
        <div className="font-bold text-4xl text-center pb-4 sm:pb-0 text-blackish">
          LOGO
        </div>
        <div className="w-full sm:w-[300px] md:w-[70%] relative">
          <input
            className="border-gray-200 border p-2 px-4 rounded-lg w-full"
            type="text"
            placeholder="Enter any product name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <BsSearch
            className="absolute right-0 top-0 mr-3 mt-3 text-gray-400"
            size={20}
          />
        </div>
        <div className="hidden lg:flex gap-4 text-gray-500 text-[30px]">
          {user ? (
            <button onClick={handleLogout} className="relative text-2xl">
              logout
            </button>
          ) : (
            <Link href="/login" className="relative text-2xl">
              login
            </Link>
          )}

          <Link href="/liked" className="relative">
            <FiHeart />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              {likedItems.length}
            </div>
          </Link>
          <Link href="/cart" className="relative">
            <HiOutlineShoppingBag />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              {" "}
              {cartItems.length}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
