"use client";
import { BlurImage } from ".";
import { motion } from "framer-motion";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { cardVariant } from "@/libs/motion";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ProductCardsProp {
  id: string;
  name: string;
  type: string;
  price: number;
  index: number;
  image: string;
}

export default function ProductCards({
  image,
  name,
  price,
  type,
  id,
  index,
}: ProductCardsProp) {
  const router = useRouter();

  return (
    <motion.article
      variants={cardVariant(index, 0.2)}
      initial="initial"
      animate="animate"
      onClick={() => {
        router.push(`/product/${id}`);
      }}
      className="group relative"
    >
      {/* ADD TO CART BTN */}
      <button
        type="button"
        className="bg-brand-dark py-6 pr-3 pl-4 rounded-r-2xl absolute
        top-4 right-0 group-hover:translate-x-10 hover:bg-brand-base
        brand-duration-500"
      >
        <FontAwesomeIcon icon={faPlus} className="text-xl" />
      </button>
      <div
        className="h-80 w-72 cursor-pointer overflow-hidden 
        rounded-2xl bg-brand-dark z-10"
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
        <div className="flex h-[30%] w-full items-center justify-around">
          <div>
            <p className="text-[12px] uppercase tracking-widest text-brand-gray">
              {type}
            </p>
            <h3 className="text-xl font-medium capitalize leading-none tracking-tight">
              {name}
            </h3>
          </div>
          <span
            className="brand-duration-500 rounded-lg  bg-brand-base/25 p-2 font-fira 
            text-lg tracking-wider text-brand-base group-hover:bg-brand-base
            group-hover:text-brand-light"
          >
            {currencyFormat(price)}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
