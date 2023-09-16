"use client";
import { BlurImage } from ".";
import { motion } from "framer-motion";
import { currencyFormat } from "@/utils";
import { useCart } from "@/libs/zustand";
import { useRouter } from "next/navigation";
import { useUpdateClient } from "@/hooks";
import type { ProductSnippetProp } from "@/utils/types";
import { cardVariant } from "@/libs/framer-motion/motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useViewedProducts } from "@/libs/zustand/useViewedProduct";

interface AnimateProductSnippetProp extends ProductSnippetProp {
  index: number;
}

export function ProductCard({
  image,
  name,
  price,
  type,
  id,
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

  // INCREASE, DECREASE AND ADD PRODUCT TO CART
  const { addToCart, increase, decrease } = useCart((state) => state);
  const productAmount = useUpdateClient(
    useCart((state) => state.productAmount(id))
  );

  function handleAddToCart() {
    const addProduct = {
      id,
      name,
      type,
      price,
      amount: 1,
      image,
    };
    addToCart(addProduct);
  }

  return (
    <motion.article
      variants={cardVariant(index, 0.2)}
      initial="initial"
      animate="animate"
      className="group relative"
    >
      {/* ADD TO CART BTN */}
      <div
        className="brand-ease absolute right-0 top-6 w-10 overflow-hidden 
        rounded-r-2xl bg-brand-dark group-hover:translate-x-10"
      >
        {productAmount <= 0 ? (
          <button
            type="button"
            onClick={() => handleAddToCart()}
            className="brand-ease hidden h-16 w-full items-center justify-center 
            hover:bg-brand-base lg:flex"
          >
            <FontAwesomeIcon icon={faPlus} className="text-xl" />
          </button>
        ) : (
          <div className="hidden h-40 grid-rows-4 items-center lg:grid">
            <button
              type="button"
              onClick={() => increase(id)}
              className="brand-ease h-full bg-brand-base/20 font-bold text-brand-base 
              hover:bg-brand-base hover:text-brand-light/90"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <span
              className="brand-ease row-span-2 flex h-full items-center justify-center 
             text-xl text-brand-light"
            >
              {productAmount}
            </span>
            <button
              type="button"
              onClick={() => decrease(id)}
              className="brand-ease h-full bg-brand-base/20 font-bold text-brand-base 
            hover:bg-brand-base hover:text-brand-light"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </div>
        )}
      </div>
      <div
        className={`z-10 h-96 w-72 cursor-pointer overflow-hidden rounded-2xl bg-brand-dark`}
      >
        {/* IMAGE */}
        <div
          onClick={() => handleAddToViewed()}
          className="relative h-[65%] w-full overflow-hidden lg:h-[75%]"
        >
          <BlurImage
            imgSrc={image}
            style="lg:group-hover:scale-110"
            imgAlt={`Photo of ${name} ${type}`}
          />
        </div>

        {/* CONTENT */}
        <div
          className={`grid-row-2 lg:grid-row-1 grid h-[35%] w-full grid-cols-3 items-center 
          px-6 py-4 lg:h-[25%] lg:px-6`}
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

          {productAmount <= 0 ? (
            <button
              type="button"
              onClick={() => handleAddToCart()}
              className="brand-ease col-span-3 mx-auto h-3/4 w-3/4 rounded-md bg-brand-base/80
              font-oswald text-lg font-light capitalize lg:hidden"
            >
              add to cart
            </button>
          ) : (
            <div
              className="col-span-3 mx-auto grid h-3/4 w-3/4 grid-cols-4 
              items-center justify-center lg:hidden"
            >
              <button
                type="button"
                onClick={() => decrease(id)}
                className="brand-ease h-full rounded-l-lg bg-brand-base/30 font-bold 
                  text-brand-base hover:bg-brand-base hover:text-brand-light"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span
                className="brand-ease col-span-2 col-start-2 flex h-full items-center 
                  justify-center bg-brand-light/10 text-brand-light"
              >
                {productAmount}
              </span>

              <button
                type="button"
                onClick={() => increase(id)}
                className="brand-ease h-full rounded-r-lg bg-brand-base/30 font-bold   
                text-brand-base hover:bg-brand-base hover:text-brand-light/90"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          )}
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
