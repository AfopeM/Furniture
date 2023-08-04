"use client";
import { BlurImage } from ".";
import { motion } from "framer-motion";
import { currencyFormat } from "@/utils";
import { useCart } from "@/libs/zustand";
import { useRouter } from "next/navigation";
import { useUpdateClient } from "@/utils/hooks";
import type { ProductCardProp } from "@/utils/types";
import { cardVariant } from "@/libs/framer-motion/motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useViewedProducts } from "@/libs/zustand/useViewedProduct";

interface AnimateProductCardProp extends ProductCardProp {
  index: number;
  size?: string;
}

export default function ProductCards({
  image,
  name,
  price,
  type,
  id,
  index,
  size,
}: AnimateProductCardProp) {
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
      productId: id,
      name: name,
      type: type,
      price: price,
      amount: 1,
      image: image,
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
        className="brand-ease absolute w-10 rounded-r-2xl overflow-hidden top-6 
        right-0 group-hover:translate-x-10 bg-brand-dark"
      >
        {productAmount <= 0 ? (
          <button
            type="button"
            onClick={() => handleAddToCart()}
            className="brand-ease h-16 flex items-center justify-center w-full 
            hover:bg-brand-base"
          >
            <FontAwesomeIcon icon={faPlus} className="text-xl" />
          </button>
        ) : (
          <div className="grid grid-rows-4 h-40 items-center">
            <button
              type="button"
              onClick={() => increase(id)}
              className="brand-ease h-full bg-brand-base/20 font-bold text-brand-base 
              hover:bg-brand-base hover:text-brand-light/90"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <span
              className="brand-ease flex h-full row-span-2 items-center justify-center 
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
        onClick={() => handleAddToViewed()}
        className={`${
          size === "small" ? "w-56 h-72" : "h-80 w-72"
        } cursor-pointer overflow-hidden rounded-2xl bg-brand-dark z-10`}
      >
        {/* IMAGE */}
        <div className="relative h-[70%] w-full overflow-hidden">
          <BlurImage
            imgSrc={image}
            style="group-hover:scale-110"
            imgAlt={`Photo of ${name} ${type}`}
          />
        </div>

        {/* CONTENT */}
        <div
          className={`${
            size === "small" ? "justify-evenly" : "justify-around"
          } flex h-[30%] w-full items-center`}
        >
          <div>
            <p className="text-xs uppercase tracking-widest font-fira text-brand-gray">
              {type}
            </p>
            <h3
              className={`${
                size === "small" ? "text-[17px]" : "text-xl"
              } text-xl font-medium capitalize leading-tight`}
            >
              {name}
            </h3>
          </div>
          <span
            className={`${
              size === "small" ? "text-base" : "text-lg"
            } brand-ease rounded-lg bg-brand-base/25 p-2 font-fira 
             tracking-wider text-brand-base group-hover:bg-brand-base
            group-hover:text-brand-light`}
          >
            {currencyFormat(price)}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
