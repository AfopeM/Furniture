import Stripe from "stripe";
import type { ProductSnippetProp } from "@/utils/types";

export const stripeObj = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export const getAllProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL!}/api/products`, {
    next: { revalidate: 3600 },
  });
  const data: ProductSnippetProp[] = await res.json();
  return data;
};

export const getPopularProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL!}/api/products/popular`,
    {
      next: { revalidate: 3600 },
    }
  );

  const data: ProductSnippetProp[] = await res.json();
  return data;
};
