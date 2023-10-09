import Stripe from "stripe";
import type { ProductSnippetProp, ProductDetailProp } from "@/utils/types";

interface ProductPageProp {
  product: ProductDetailProp;
  relatedProducts: ProductSnippetProp[];
}

export const stripeObj = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export const getAllProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL!}/api/products`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok)
      throw new Error(
        `All Products could not be found:${res.status} ${res.statusText}`
      );
    const data: ProductDetailProp[] = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPopularProducts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL!}/api/products/popular`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok)
      throw new Error(
        `Popular Products could not be found:${res.status} ${res.statusText}`
      );

    const data: ProductSnippetProp[] = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (product_id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products/${product_id}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok)
      throw new Error(
        `Product could not be found:${res.status} ${res.statusText}`
      );

    const data: ProductPageProp = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchSessionId = async (session_id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/session/${session_id}`
  );
  const data = await res.json();
  return data;
};
