"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { ProductCardProp } from "@/utils/types";
import { ProductCards, Title, Hero } from "@/components";
import { useViewedProducts } from "@/libs/zustand/useViewedProduct";

export default function Product() {
  const { id } = useParams();
  const viewedProducts = useViewedProducts((state) => state.viewed);
  const [viewed, setViewed] = useState<null | ProductCardProp[]>(null);

  useEffect(() => {
    setViewed(viewedProducts);
  }, [viewedProducts]);

  return (
    <>
      <Hero title="Our Product" />

      <main></main>

      {/* VIEWED PRODUCTS */}
      <section className="space-y-8 brand-px">
        <div className="rounded-xl bg-brand-dark/10 px-12 py-6 text-center md:text-start">
          <Title textSize="text-3xl" colour="text-brand-dark">
            Previously Viewed Furinture
          </Title>
          <p className="font-fira font-light text-brand-dark/50 pt-2">
            Would you like to take another look at these products.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 px-8">
          {viewed
            ? viewed.map((product, i) => {
                return <ProductCards key={product.id} index={i} {...product} />;
              })
            : null}
        </div>
      </section>
    </>
  );
}
