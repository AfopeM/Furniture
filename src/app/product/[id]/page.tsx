"use client";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { ProductSnippetProp } from "@/utils/types";
import productData from "@/../public/data/products.json";
import { useViewedProducts, useCart } from "@/libs/zustand";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ProductCards, Title, Hero, BlurImage } from "@/components";
import {
  faMinus,
  faPlus,
  faRuler,
  faEarthAfrica,
  faHammer,
} from "@fortawesome/free-solid-svg-icons";
import { useUpdateClient } from "@/utils/hooks";

function ProductTag({ value, icon }: { value: string; icon: IconProp }) {
  return (
    <li className="rounded-md bg-brand-light/5 px-3 py-2">
      <FontAwesomeIcon icon={icon} className="pr-2 text-brand-base/75" />
      {value}
    </li>
  );
}

export default function Product() {
  // PRODUCT INFO
  const { id } = useParams();
  const product = productData.products.find((item) => item.id === id);
  const tags = [
    { value: product?.origin as string, icon: faEarthAfrica },
    { value: product?.material as string, icon: faHammer },
    { value: product?.dimensions as string, icon: faRuler },
  ];

  // CART
  const amount = useUpdateClient(
    useCart((state) => state.productAmount(product?.id || ""))
  );
  const { addToCart, increase, decrease } = useCart((state) => state);

  function handleAddToCart() {
    if (product) {
      const addProduct = {
        productId: product.id,
        name: product.name,
        type: product.type,
        price: product.price,
        amount: 1,
        image: product.image,
      };
      addToCart(addProduct);
    }
  }

  // RELATED PRODUCTS
  const relatedProduct = productData.products.filter(
    (item) => item.type === product?.type && item.id !== product.id
  );

  // VIEW PRODUCTS
  const viewedProducts = useViewedProducts((state) => state.viewed);
  const [viewed, setViewed] = useState<null | ProductSnippetProp[]>(null);

  useEffect(() => {
    setViewed(viewedProducts);
  }, [viewedProducts]);

  return (
    <>
      <Hero title="Our Product" />

      <main className="space-y-8">
        {product ? (
          <>
            {/* PRODUCT TITLE */}
            <div className="brand-px w-full bg-brand-dark/10 py-8 uppercase">
              <span className="text-xl tracking-wider text-brand-dark/50">
                {product.type}
              </span>
              <h2 className="text-4xl font-medium text-brand-dark">
                {product.name}
              </h2>
            </div>

            {/* PRODUCT DETAILS */}
            <div className="brand-px">
              <section
                className="mx-auto flex h-[850px] max-w-6xl flex-col gap-4 
                overflow-hidden rounded-xl lg:h-[500px] lg:flex-row lg:gap-0"
              >
                {/* PRODUCT IMAGE */}
                <div
                  className="relative h-1/2 w-full overflow-hidden rounded-b-xl md:h-3/5 lg:h-full 
                  lg:w-[55%] lg:rounded-none"
                >
                  <BlurImage
                    size="100vw"
                    imgSrc={product.image}
                    imgAlt={`Photo of ${product.name} ${product.type}`}
                  />
                </div>
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
                    {currencyFormat(product.price)}
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
                      {product.desc}
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
                  <div
                    className="h-14 w-full overflow-hidden rounded-lg md:col-start-3 md:row-start-2
                    lg:col-auto lg:row-start-5 lg:h-16"
                  >
                    {amount > 0 ? (
                      <div className="grid h-full grid-cols-4 items-center justify-center">
                        <button
                          type="button"
                          onClick={() => decrease(product.id)}
                          className="brand-ease h-full bg-brand-base/20 font-bold text-brand-base 
                          hover:bg-brand-base hover:text-brand-light"
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span
                          className="brand-ease col-span-2 col-start-2 flex h-full items-center justify-center 
                          bg-brand-light/10 text-xl text-brand-light"
                        >
                          {amount}
                        </span>

                        <button
                          type="button"
                          onClick={() => increase(product.id)}
                          className="brand-ease h-full bg-brand-base/20 font-bold text-brand-base 
                          hover:bg-brand-base hover:text-brand-light/90"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAddToCart()}
                        className="brand-ease h-full w-full bg-brand-base/20 font-oswald text-xl font-light 
                        capitalize text-brand-base hover:bg-brand-base hover:text-brand-light lg:text-2xl"
                      >
                        add to cart
                      </button>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </>
        ) : (
          <p>We do not sell this furniture</p>
        )}
      </main>

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
            {relatedProduct
              ? relatedProduct.map((product, i) => {
                  return (
                    <ProductCards
                      index={i}
                      size="small"
                      {...product}
                      key={product.id}
                    />
                  );
                })
              : null}
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
                    <ProductCards
                      index={i}
                      size="small"
                      {...product}
                      key={product.id}
                    />
                  );
                })
              : null}
          </div>
        </section>
      </div>
    </>
  );
}
