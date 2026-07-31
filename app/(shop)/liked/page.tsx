"use client";
import React from "react";
import Link from "next/link";
import { useLikedStore } from "@/store/likedStore";
import { useCartStore } from "@/store/cartStore";

const LikePage = () => {
  const { items, removeLike } = useLikedStore();
  const { addToCart } = useCartStore();

  if (items.length == 0) {
    return (
      <div className="w-full pt-16 px-[43px] pb-20 text-center">
        <h2 className="font-medium text-2xl pb-4">Your Liked Items</h2>
        <p className="text-gray-500 mb-6">No liked items yet</p>
        <Link
          href="/"
          className="inline-block bg-[#ff8f9c] text-white rounded-lg px-6 py-2 font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-16 px-[43px] pb-20">
      <h2>Your Liked Items</h2>

      <div className="flex flex-col gap-6 ">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 border border-gray-200 rounded-xl p-4"
          >
            <div className="flex gap-[10px]">
              <img
                src={item.image}
                alt={item.title}
                width={90}
                height={120}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium uppercase text-[#ff8f9c]">
                {item.title}
              </h3></div>
              
            </div>

            <div className=" flex flex-col items-end gap-[10px]">
              <p className="font-bold">${item.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(item)}
                className="text-sm text-gray-400 hover:text-red-500"
              >
                Add to cart
              </button>
              <button
                onClick={() => removeLike(item.id)}
                className="text-sm text-gray-400 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikePage;
