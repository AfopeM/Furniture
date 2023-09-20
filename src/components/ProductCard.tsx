"use client";
import { BlurImage } from ".";
import { ToCart } from "@/components";
import { motion } from "framer-motion";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import type { ProductSnippetProp } from "@/utils/types";
import { cardVariant } from "@/libs/framer-motion/motion";
import { useViewedProducts } from "@/libs/zustand/useViewedProduct";

interface AnimateProductSnippetProp extends ProductSnippetProp {
  index: number;
}

export function ProductCard({
  id,
  type,
  name,
  image,
  price,
  index,
}: AnimateProductSnippetProp) {
  const router = useRouter();

  // ADD TO PREVIOUSLY VIEWED PRODUCTS
  const { addToViewed } = useViewedProducts((state) => state);
  function handleAddToViewed() {
    const addProduct = {
      id,
      name,
      type,
      price,
      image,
    };
    addToViewed(addProduct);
    router.push(`/product/${id}`);
  }

  return (
    <motion.article
      variants={cardVariant(index, 0.2)}
      initial="initial"
      animate="animate"
      className="group relative"
    >
      <div
        className={`z-10 h-96 w-72 cursor-pointer overflow-hidden rounded-2xl bg-brand-dark`}
      >
        {/* IMAGE */}
        <button
          type="button"
          onClick={() => handleAddToViewed()}
          aria-label={`${name} image button`}
          className="relative h-[65%] w-full overflow-hidden"
        >
          <BlurImage
            imgSrc={image}
            style="lg:group-hover:scale-110"
            imgAlt={`Photo of ${name} ${type}`}
          />
        </button>

        {/* CONTENT */}
        <div
          className={`grid-row-2 lg:grid-row-1 grid h-[35%] w-full grid-cols-3 items-center 
          px-6 py-4 lg:px-6`}
        >
          <div className="col-span-2">
            <p className="font-fira text-xs uppercase tracking-widest text-brand-gray">
              {type}
            </p>
            <h3 className={`text-xl font-medium capitalize leading-tight`}>
              {name}
            </h3>
          </div>
          <span
            className={`brand-ease rounded-lg bg-brand-base/25 p-2 text-center font-fira 
            text-lg tracking-wider text-brand-base lg:group-hover:bg-brand-base
            lg:group-hover:text-brand-light`}
          >
            {currencyFormat(price.amount)}
          </span>

          <ToCart
            id={id}
            size="sm"
            name={name}
            type={type}
            price={price}
            image={image}
          />
        </div>
      </div>
    </motion.article>
  );
}

export function ProductCardSkeleton() {
  return (
    <article className="group relative">
      <div
        className={`z-10 h-96 w-72 overflow-hidden rounded-2xl bg-brand-dark`}
      >
        {/* IMAGE */}
        <div className="h-[70%] w-full animate-pulse bg-brand-gray" />

        {/* CONTENT */}
        <div className="flex h-[30%] w-full items-center justify-around">
          <div className="w-1/2 animate-pulse space-y-2">
            <div className="h-4 w-1/2 rounded bg-brand-gray" />
            <div className="h-6 w-full rounded bg-brand-gray" />
          </div>
          <div className="h-12 w-1/3 animate-pulse rounded bg-brand-gray" />
        </div>
      </div>
    </article>
  );
}
