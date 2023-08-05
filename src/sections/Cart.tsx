"use client";
import { useCart } from "@/libs/zustand";
import { CartCards } from "@/components";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";
import { useUpdateClient } from "@/utils/hooks";
import type { CartItemsProp } from "@/utils/types";

interface CartProp {
  isCartOpen: boolean;
}

export default function Cart({ isCartOpen }: CartProp) {
  // CART TOTAL PRICE
  const totalPrice = useUpdateClient(useCart((state) => state.totalPrice()));

  // CART ITEMS
  const serverCart = useCart((state) => state.cart);
  const [cart, setCart] = useState<CartItemsProp[]>([]);

  useEffect(() => {
    setCart(serverCart);
  }, [serverCart]);

  return (
    <aside
      className={`${
        isCartOpen ? "translate-y-8" : "-translate-y-[32rem]"
      } brand-ease absolute z-10 h-[26rem] w-96 overflow-hidden rounded-xl 
      bg-brand-light/5 backdrop-blur-2xl md:w-[32rem] md:-translate-x-[26rem]`}
    >
      <div
        className={`${
          cart.length > 0
            ? "space-y-4 overflow-y-scroll"
            : "flex items-center justify-center"
        } my-6 h-[68.5%] px-8`}
      >
        {cart.length > 0 ? (
          cart.map((items) => {
            return <CartCards key={items.productId} {...items} />;
          })
        ) : (
          <p className="font-fira text-3xl font-light capitalize tracking-widest">
            cart is empty
          </p>
        )}
      </div>
      <button
        type="button"
        className={`brand-ease h-[20%] w-full bg-brand-base/70 text-xl font-bold 
        uppercase tracking-widest text-brand-light/80 hover:bg-brand-base/90 
        hover:text-brand-light md:text-2xl`}
      >
        {totalPrice > 0
          ? `pay ${currencyFormat(totalPrice)[0]}`
          : "Checkout is Empty"}
      </button>
    </aside>
  );
}
