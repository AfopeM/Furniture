"use client";
import { useCart } from "@/libs/zustand";
import { currencyFormat } from "@/utils";
import { useUpdateClient } from "@/hooks";
import { useEffect, useState } from "react";
import { CartItemsProp } from "@/utils/types";
import { checkout } from "@/libs/stripe/checkout";
import { Hero, Title, CartCard } from "@/components";

export default function Cart() {
  const tax = 0.13;
  const initialCart = useCart().cart;
  const [cart, setCart] = useState([] as CartItemsProp[]);
  const totalPrice = useUpdateClient(useCart().totalPrice());

  useEffect(() => {
    const updateCart = () => {
      setCart(initialCart);
    };
    updateCart();
  }, [initialCart]);

  return (
    <>
      <Hero title="Cart" />
      <div
        className="brand-px bg-brand-dark/10 py-12 text-center text-brand-dark/50 
        md:text-start"
      >
        <Title
          textSize="text-3xl"
          colour="text-brand-dark"
          extra="pb-2 mx-auto md:mx-0 max-w-md"
        >
          Order Summary
        </Title>
        <p className="font-fira">
          Check your Item And select your shipping for better experience Order
          item.
        </p>
      </div>

      {/* CART DISPLAY */}
      <main
        className="brand-px mt-12 grid w-full grid-cols-1 items-start 
        justify-center justify-items-center gap-12 xl:grid-cols-3"
      >
        {/* CART ITEMS */}
        <section
          className="h-[560px] w-full space-y-4 overflow-y-scroll
          rounded-lg bg-brand-dark/10 p-4 text-brand-dark 
          md:p-6 lg:h-[750px] lg:p-8 xl:col-span-2"
        >
          {cart.map((item) => {
            return <CartCard key={item.id} {...item} />;
          })}
        </section>

        {/* PAY BUTTON */}
        <section
          className="text-light flex w-full max-w-3xl flex-col 
          gap-y-4 rounded-lg bg-brand-dark p-8 text-center md:text-start"
        >
          {/* TITLE */}
          <div>
            <Title
              textSize="text-2xl"
              colour="text-brand-light"
              extra="mx-auto md:mx-0"
            >
              Payment Details
            </Title>
            <p className="font-fira leading-relaxed text-brand-gray">
              Complete your purchase here! <br />
              Please use{" "}
              <span className="rounded bg-red-500/50 px-2 py-1 tracking-wide text-brand-light/75">
                4242 4242 4242 4242
              </span>{" "}
              as card number
            </p>
          </div>

          {/* <p className="rounded-md bg-red-500 p-2 font-fira">
            Please do not use your actual card number to make a purchase. Use
            <span> 4242 4242 4242 4242</span>
          </p> */}

          {/* BUTTON */}
          <button
            type="button"
            onClick={() => checkout(cart)}
            disabled={totalPrice < 1}
            aria-label="Pay for products in cart"
            className={`${
              totalPrice <= 0
                ? "bg-brand-base/50 text-brand-light/80"
                : "bg-brand-base/90 text-brand-light"
            } brand-ease h-16 w-full max-w-4xl rounded-lg bg-brand-base/50 
            text-xl font-bold uppercase tracking-widest md:h-20 md:text-3xl
            lg:bg-brand-base/50 lg:px-4 lg:text-2xl 
            lg:text-brand-light/80 lg:hover:bg-brand-base/90 lg:hover:text-brand-light`}
          >
            {totalPrice > 0
              ? `pay ${currencyFormat(totalPrice)[0]}`
              : "Checkout is Empty"}
          </button>
        </section>
      </main>
    </>
  );
}
