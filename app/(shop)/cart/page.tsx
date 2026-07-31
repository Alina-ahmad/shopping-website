"use client";
import React from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

const CartPage = () => {
  const { items, removeFromCart, increaseQty, decreaseQty } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <div className="w-full pt-16 px-[43px] pb-20 text-center">
        <h2 className="font-medium text-2xl pb-4">Your Cart</h2>
        <p className="text-gray-500 mb-6">Your cart is empty.</p>
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
      <h2>Your Cart</h2>

      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border border-gray-200 rounded-xl p-4"
          >
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
              </h3>
              <p className=" text-gray-500">${item.price.toFixed(2)} each</p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="w-8 h-8 border rounded-lg text-lg"
                  aria-label="Decrease Quantity"
                >
                  -
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="w-8 h-8 border rounded-lg text-lg"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex  flex-col items-end gap-3">
                <p className="font-bold">${(item.price* item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-sm text-gray-400 hover:text-red-500">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-10">
        <div className="w-full sm:w-[320px] border border-gray-200 rounded-xl p-6">
          <div className="flex justify-between mb-2 text-gray-500">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="w-full bg-[#ff8f9c] text-white rounded-lg py-3 font-medium">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
