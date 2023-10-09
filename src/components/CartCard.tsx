"use client";
import Link from "next/link";
import { BlurImage } from ".";
import { useCart } from "@/libs/zustand";
import { currencyFormat } from "@/utils";
import { CartItemsProp } from "@/utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function CartCard({
  id,
  name,
  type,
  price,
  image,
  quantity,
}: CartItemsProp) {
  const { increase, decrease, remove } = useCart((state) => state);

  return (
    <article
      className="brand-ease group relative grid h-32 grid-cols-4 items-center 
      justify-center overflow-hidden rounded-lg bg-brand-dark md:h-36 lg:h-40"
    >
      {/* CLOSE BTN */}
      <button
        onClick={() => remove(id)}
        aria-label={`remove 1 ${name} from cart`}
        className="brand-ease group/close absolute right-4 top-2 lg:translate-x-10 
        lg:group-hover:translate-x-0"
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="brand-ease text-xl text-brand-red lg:text-2xl 
          lg:opacity-50 lg:group-hover/close:opacity-100"
        />
      </button>

      {/* PRODUCT IMAGE */}
      <Link
        as={`/product/${id}`}
        href={`/product/${id}`}
        className="relative row-span-2 h-full w-full"
      >
        <BlurImage
          imgSrc={image}
          size="(max-width:768px)50vw, 25vw"
          imgAlt={`image of ${name} ${type}`}
        />
      </Link>

      {/* PRODUCT NAME & TYPE */}
      <div className="col-span-2 text-center uppercase tracking-wide">
        <p className="font-fira text-xs text-brand-light/50 md:text-sm">
          {type}
        </p>
        <Link
          as={`product/${id}`}
          href={`product/${id}`}
          className="text-lg font-medium leading-tight text-brand-light 
          sm:leading-none md:text-xl"
        >
          {name}
        </Link>
      </div>

      {/* PRODUCT PRICE */}
      <p
        className="brand-ease col-start-4 row-span-2 mr-3 mt-4 w-4/5 justify-self-center 
        rounded-lg bg-brand-base/25 py-2 text-center font-fira font-medium tracking-wider 
        text-brand-base lg:mr-2 lg:mt-0 lg:text-xl lg:group-hover:row-span-2 lg:group-hover:mt-6"
      >
        {currencyFormat(price.amount)}
      </p>

      {/* PRODUCT QUANITITY */}
      <div
        className="col-span-2 col-start-2 grid h-2/3 w-3/4 grid-cols-3 items-center 
        justify-around self-start justify-self-center overflow-hidden rounded-lg bg-brand-light"
      >
        <button
          onClick={() => decrease(id)}
          className="brand-ease h-full text-xs text-brand-base hover:bg-brand-base 
          hover:text-brand-light"
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <p className="text-center text-sm text-brand-dark">{quantity}</p>
        <button
          onClick={() => increase(id)}
          className="brand-ease h-full text-xs text-brand-base 
          hover:bg-brand-base hover:text-brand-light"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </article>
  );
}
