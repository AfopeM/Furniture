"use client";
import useSWR from "swr";
import { ToCart } from "@/components";
import { currencyFormat } from "@/utils";
import { getProduct } from "@/libs/stripe";
import { useEffect, useState } from "react";
import { useViewedProducts } from "@/libs/zustand";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { ProductSnippetProp } from "@/utils/types";
import {
  Title,
  Hero,
  BlurImage,
  ProductCard,
  ProductCardSkeleton,
} from "@/components";
import {
  faRuler,
  faHammer,
  faEarthAfrica,
} from "@fortawesome/free-solid-svg-icons";

function ProductTag({ value, icon }: { value: string; icon: IconProp }) {
  return (
    <li className="rounded-md bg-brand-light/5 px-3 py-2">
      <FontAwesomeIcon icon={icon} className="pr-2 text-brand-base/75" />
      {value}
    </li>
  );
}

export default function Product({
  params,
}: {
  params: { product_id: string };
}) {
  // PRODUCT INFO
  const { data: content, error } = useSWR(params.product_id, getProduct);

  // VIEW PRODUCTS
  const viewedProducts = useViewedProducts((state) => state.viewed);
  const [viewed, setViewed] = useState<null | ProductSnippetProp[]>(null);

  useEffect(() => {
    setViewed(viewedProducts);
  }, [viewedProducts]);

  const tags = [
    { value: content?.product?.origin as string, icon: faEarthAfrica },
    { value: content?.product?.material as string, icon: faHammer },
    { value: content?.product?.dimension as string, icon: faRuler },
  ];

  return (
    <>
      <Hero title="Our Product" />

      <main className="space-y-8">
        {error ? (
          <p>We do not sell this furniture</p>
        ) : content ? (
          <>
            {/* PRODUCT TITLE */}
            <div className="brand-px w-full bg-brand-dark/10 py-8 uppercase">
              <span className="text-xl tracking-wider text-brand-dark/50">
                {content.product.type}
              </span>
              <h2 className="text-4xl font-medium text-brand-dark">
                {content.product.name}
              </h2>
            </div>

            {/* PRODUCT DETAILS */}
            <div className="brand-px">
              <section
                className="mx-auto flex h-[850px] flex-col gap-4 overflow-hidden rounded-xl 
                sm:max-w-[40rem] lg:h-[500px] lg:max-w-6xl lg:flex-row lg:gap-0"
              >
                {/* PRODUCT IMAGE */}
                <div
                  className="relative h-1/2 w-full overflow-hidden rounded-b-xl bg-brand-dark md:h-3/5 
                  lg:h-full lg:w-[55%] lg:rounded-none"
                >
                  <BlurImage
                    size="100vw"
                    imgSrc={content.product.image}
                    imgAlt={`Photo of ${content.product.name} ${content.product.type}`}
                  />
                </div>

                {/* PRODUCT CONTENT */}
                <div
                  className="grid h-1/2 w-full grid-cols-1 grid-rows-5 items-center rounded-t-xl 
                  bg-brand-dark px-6 py-4 md:h-2/5 md:grid-cols-3 md:grid-rows-2 md:gap-x-4 md:p-8 
                  lg:h-full lg:w-[45%] lg:grid-cols-1 lg:grid-rows-5 lg:gap-0 lg:rounded-none 
                  lg:px-10 lg:py-8"
                >
                  {/* PRODUCT PRICE */}
                  <p
                    className="text-4xl font-bold text-brand-base md:col-start-3 md:row-start-1
                        md:justify-self-end md:text-5xl lg:col-auto lg:row-auto lg:justify-self-start"
                  >
                    {currencyFormat(content.product.price.amount)}
                  </p>

                  {/* PRODUCT DESCRIPTION, MATERIAL, DIMENSIONS & ORIGIN */}
                  <div
                    className="row-span-3 row-start-2 space-y-2 font-light tracking-wider text-brand-gray 
                    md:col-span-2 md:col-start-1 md:row-span-2 lg:row-span-3 lg:row-start-2"
                  >
                    <Title textSize="text-xl" colour="text-brand-light">
                      Description
                    </Title>
                    <p className="pb-2 font-fira leading-snug text-brand-gray">
                      {content.product.desc}
                    </p>
                    <ul className="flex flex-wrap gap-2 font-oswald text-xs uppercase sm:text-sm">
                      {tags.map((item) => {
                        return (
                          <ProductTag
                            key={item.value}
                            icon={item.icon}
                            value={item.value}
                          />
                        );
                      })}
                    </ul>
                  </div>

                  {/* PRODUCT QUANTITY */}
                  <ToCart {...content.product} />
                </div>
              </section>
            </div>
          </>
        ) : (
          <>
            {/* PRODUCT TITLE */}
            <div className="brand-px w-full bg-brand-dark/10 py-8 uppercase">
              <div className="h-6 w-32 animate-pulse rounded bg-brand-dark" />
              <div className="mt-2 h-8 w-56 animate-pulse rounded bg-brand-dark" />
            </div>

            {/* PRODUCT DETAILS */}
            <div className="brand-px">
              <section
                className="mx-auto flex h-[850px] flex-col gap-4 overflow-hidden rounded-xl 
                sm:max-w-[40rem] lg:h-[500px] lg:max-w-6xl lg:flex-row lg:gap-0"
              >
                {/* PRODUCT IMAGE */}
                <div
                  className="relative h-1/2 w-full overflow-hidden rounded-b-xl bg-brand-dark md:h-3/5 
                  lg:h-full lg:w-[55%] lg:rounded-none"
                >
                  <div className=" h-full w-full animate-pulse bg-brand-gray" />
                </div>

                {/* PRODUCT CONTENT */}
                <div
                  className="grid h-1/2 w-full grid-cols-1 grid-rows-5 items-center rounded-t-xl 
                  bg-brand-dark px-6 py-4 md:h-2/5 md:grid-cols-3 md:grid-rows-2 md:gap-x-4 md:p-8 
                  lg:h-full lg:w-[45%] lg:grid-cols-1 lg:grid-rows-5 lg:gap-0 lg:rounded-none 
                  lg:px-10 lg:py-8"
                >
                  {/* PRODUCT PRICE */}
                  <div className="h-10 w-24 animate-pulse rounded bg-brand-gray md:h-14 md:w-32" />

                  {/* PRODUCT DESCRIPTION, MATERIAL, DIMENSIONS & ORIGIN */}
                  <div
                    className="row-span-3 row-start-2 space-y-2 font-light tracking-wider text-brand-gray 
                    md:col-span-2 md:col-start-1 md:row-span-2 lg:row-span-3 lg:row-start-2"
                  >
                    <div className="h-6 w-24 animate-pulse rounded bg-brand-gray md:h-8 md:w-28" />
                    <div className="mt-2 space-y-1">
                      <div className="h-5 w-full animate-pulse rounded bg-brand-gray" />
                      <div className="h-5 w-full animate-pulse rounded bg-brand-gray" />
                      <div className="h-5 w-3/4 animate-pulse rounded bg-brand-gray" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="h-8 w-1/4 animate-pulse rounded bg-brand-gray" />
                      <div className="h-8 w-1/4 animate-pulse rounded bg-brand-gray" />
                      <div className="h-8 w-1/4 animate-pulse rounded bg-brand-gray" />
                    </div>
                  </div>

                  {/* PRODUCT QUANTITY */}
                  <div
                    className="h-14 w-full overflow-hidden rounded-lg md:col-start-3 md:row-start-2
                    lg:col-auto lg:row-start-5 lg:h-16"
                  >
                    <div
                      className="h-14 w-full animate-pulse overflow-hidden rounded-lg bg-brand-gray
                      md:col-start-3 md:row-start-2 lg:col-auto lg:row-start-5 lg:h-16"
                    />
                  </div>
                </div>
              </section>
            </div>
          </>
        )}

        <div className="mt-24 space-y-12">
          {/* RELATED PRODUCTS */}
          <section className="brand-px space-y-6">
            <div className="rounded-xl bg-brand-dark/10 px-12 py-6 text-center md:text-start">
              <Title textSize="text-3xl" colour="text-brand-dark">
                Related Products
              </Title>
              <p className="pt-2 font-fira font-light tracking-wide text-brand-dark/50">
                You many also like these...
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 px-8">
              {content
                ? content.relatedProducts.map((product, i) => {
                    return (
                      <ProductCard key={product.id} index={i} {...product} />
                    );
                  })
                : Array(3)
                    .fill(1)
                    .map((item, i) => {
                      return <ProductCardSkeleton key={item + i} />;
                    })}
            </div>
          </section>

          {/* VIEWED PRODUCTS */}
          <section className="brand-px space-y-6">
            <div className="rounded-xl bg-brand-dark/10 px-12 py-6 text-center md:text-start">
              <Title textSize="text-3xl" colour="text-brand-dark">
                Previously Viewed Furinture
              </Title>
              <p className="pt-2 font-fira font-light tracking-wide text-brand-dark/50">
                Would you like to take another look at these products.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 px-8">
              {viewed
                ? viewed.map((product, i) => {
                    return (
                      <ProductCard index={i} {...product} key={product.id} />
                    );
                  })
                : Array(2)
                    .fill(1)
                    .map((item, i) => {
                      return <ProductCardSkeleton key={item + i} />;
                    })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
