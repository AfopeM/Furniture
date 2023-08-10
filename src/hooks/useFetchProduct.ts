"use client";
import { getBaseUrl } from "@/utils";
import { useState, useEffect } from "react";
import type { ProductDetailProp } from "@/utils/types";

export default function useFetchProducts() {
  const [products, setProducts] = useState<ProductDetailProp[] | null>(null);
  let url = getBaseUrl();
  useEffect(() => {
    async function getProducts() {
      const res = await fetch(`${url}/api/products`);
      const data: ProductDetailProp[] = await res.json();
      setProducts(data);
    }
    getProducts();
  }, [url]);

  return products;
}
