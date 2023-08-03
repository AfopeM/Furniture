"use client";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { ProductCardProp } from "@/utils/types";
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

function ProductTag({ value, icon }: { value: string; icon: IconProp }) {
  return (
    <li className="bg-brand-light/5 rounded-md px-3 py-2">
      <FontAwesomeIcon icon={icon} className="text-brand-base/75 pr-2" />
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
  const [amount, setAmount] = useState(0);
  const newAmount = useCart((state) => state.productAmount(product?.id || ""));
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
  const [viewed, setViewed] = useState<null | ProductCardProp[]>(null);

  useEffect(() => {
    setViewed(viewedProducts);
    setAmount(newAmount);
  }, [viewedProducts, newAmount]);

  return (
    <>
      <Hero title="Our Product" />

      <main className="space-y-8">
        {product ? (
          <>
            {/* PRODUCT TITLE */}
            <div className="brand-px w-full bg-brand-dark/10 py-8 uppercase">
              <span className="text-xl text-brand-dark/50 tracking-wider">
                {product.type}
              </span>
              <h2 className="text-4xl font-medium text-brand-dark">
                {product.name}
              </h2>
            </div>

            {/* PRODUCT DETAILS */}
            <div className="brand-px">
              <section
                className="mx-auto flex h-[850px] max-w-6xl flex-col overflow-hidden 
                rounded-xl lg:h-[500px] lg:flex-row gap-4 lg:gap-0"
              >
                {/* PRODUCT IMAGE */}
                <div
                  className="relative h-1/2 w-full md:h-3/5 lg:h-full lg:w-[55%] rounded-b-xl 
                  lg:rounded-none overflow-hidden"
                >
                  <BlurImage
                    size="100vw"
                    imgSrc={product.image}
                    imgAlt={`Photo of ${product.name} ${product.type}`}
                  />
                </div>
                <div
                  className="grid h-1/2 w-full grid-cols-1 grid-rows-5 items-center bg-brand-dark 
                  px-6 py-4 md:h-2/5 md:grid-cols-3 md:grid-rows-2 md:gap-x-4 md:p-8 lg:h-full 
                  lg:w-[45%] lg:grid-cols-1 lg:grid-rows-5 lg:py-8 lg:px-10 rounded-t-xl 
                  lg:rounded-none lg:gap-0"
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
                    md:col-start-1 md:row-span-2 lg:row-span-3 md:col-span-2 lg:row-start-2"
                  >
                    <Title textSize="text-xl" colour="text-brand-light">
                      Description
                    </Title>
                    <p className="font-fira leading-snug text-brand-gray pb-2">
                      {product.desc}
                    </p>
                    <ul className="flex text-xs sm:text-sm flex-wrap gap-2 uppercase font-oswald">
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
                    className="overflow-hidden rounded-lg md:col-start-3 md:row-start-2 lg:col-auto lg:row-start-5
                    h-14 lg:h-16 w-full"
                  >
                    {amount > 0 ? (
                      <div className="grid grid-cols-4 h-full items-center justify-center">
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

      <div className="space-y-12 mt-24">
        {/* RELATED PRODUCTS */}
        <section className="space-y-6 brand-px">
          <div className="rounded-xl bg-brand-dark/10 px-12 py-6 text-center md:text-start">
            <Title textSize="text-3xl" colour="text-brand-dark">
              Related Products
            </Title>
            <p className="font-fira font-light text-brand-dark/50 pt-2 tracking-wide">
              You many also like these...
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-y-8 gap-x-16 px-8">
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
        <section className="space-y-6 brand-px">
          <div className="rounded-xl bg-brand-dark/10 px-12 py-6 text-center md:text-start">
            <Title textSize="text-3xl" colour="text-brand-dark">
              Previously Viewed Furinture
            </Title>
            <p className="font-fira font-light text-brand-dark/50 pt-2 tracking-wide">
              Would you like to take another look at these products.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-y-8 gap-x-16 px-8">
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
