"use client";
import { currencyFormat } from "@/utils";
import { useState, useEffect } from "react";

interface CartProp {
  isCartOpen: boolean;
}

export default function Cart({ isCartOpen }: CartProp) {
  //   console.log(isCartOpen);
  return (
    <aside
      className={`${
        isCartOpen
          ? "translate-x-8 md:right-0 md:-translate-x-12"
          : "-translate-x-full"
      } brand-ease absolute h-96 w-full max-w-sm translate-y-60 space-y-4 
  overflow-hidden rounded-xl bg-brand-light/5 backdrop-blur-2xl sm:max-w-lg`}
    ></aside>
  );
}

// className={`${
//     isCartOpen
//       ? "translate-x-8 md:right-0 md:-translate-x-12"
//       : "-translate-x-full md:right-0 md:translate-x-full"
//   } brand-ease absolute h-96 w-full max-w-sm translate-y-60 space-y-4
// overflow-hidden rounded-xl bg-brand-light/5 backdrop-blur-2xl sm:max-w-lg`}

{
  /* <div
    className={`${
      cartLength > 0
        ? "space-y-4 overflow-y-scroll"
        : "flex items-center justify-center"
    } mt-6 h-[70%] px-6`}
  > */
}
{
  /* {cartLength > 0 ? (
      cartItems.map((items) => {
        return (
          <CartCard
            key={items.product.name}
            {...items.product}
            amount={items.amount}
          />
        );
      })
    ) : (
      <p className="font-fira text-3xl font-light capitalize tracking-widest">
        cart is empty
      </p>
    )} */
}
{
  /* </div> */
}

{
  /* <button
    className={`brand-ease h-[20%] w-full bg-brand-base/50 text-xl 
    font-bold uppercase tracking-widest text-brand-light/50 
    hover:bg-brand-base/80 hover:text-brand-light md:text-2xl`}
  >
    Checkout {totalPrice > 0 ? currencyFormat(totalPrice) : null}
  </button> */
}
