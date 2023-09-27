"use client";
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
import type { CartItemsProp } from "@/utils/types";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const checkout = async (products: CartItemsProp[]) => {
  try {
    const lineItems = products.map((item) => {
      return {
        price: item.price.id,
        quantity: item.quantity,
      };
    });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lineItems),
      }
    );

    const data: Stripe.Response<Stripe.Checkout.Session> = await res.json();
    const stripe = await stripePromise;

    const { error } = await stripe?.redirectToCheckout({
      sessionId: data.id,
    })!;

    if (error) {
      if (error instanceof Error) throw new Error(error.message);
      else {
        throw error;
      }
    }
  } catch (error) {
    console.log(`ClientError:${error}`);
  }
};
