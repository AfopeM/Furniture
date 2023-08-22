"use client";
import { BlurImage } from ".";
import { useCart } from "@/libs/zustand";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { CartItemsProp } from "@/utils/types";
import { faXmark, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CartCards({
  name,
  type,
  price,
  image,
  amount,
  id,
}: CartItemsProp) {
  const router = useRouter();
  const { increase, decrease, remove } = useCart((state) => state);

  return (
    <article
      className="brand-ease group relative grid h-32 grid-cols-4 items-center 
      justify-center overflow-hidden rounded-xl bg-brand-dark lg:h-24 
      lg:hover:h-36 lg:hover:grid-rows-3"
    >
      {/* CLOSE BTN */}
      <button
        onClick={() => remove(id)}
        className="brand-ease absolute right-4 top-2 opacity-100 lg:opacity-0 
        lg:group-hover:opacity-100"
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="brand-ease text-lg hover:text-brand-red"
        />
      </button>

      {/* PRODUCT IMAGE */}
      <div className="relative row-span-2 h-full w-full lg:group-hover:row-span-full">
        <BlurImage
          imgSrc={image}
          size="(max-width:768px)50vw, 25vw"
          imgAlt={`image of ${name} ${type}`}
        />
      </div>

      {/* PRODUCT NAME & TYPE */}
      <div
        onClick={() => router.push(`/product/${id}`)}
        className="col-span-2 col-start-2 mt-4 cursor-pointer justify-self-center text-center
        uppercase tracking-wide md:mt-0 lg:group-hover:row-span-2 lg:group-hover:mt-6"
      >
        <p className="font-fira text-xs text-brand-light/75 md:text-sm">
          {type}
        </p>
        <h3 className="text-sm font-medium leading-tight sm:leading-none md:text-xl">
          {name}
        </h3>
        <span
          className="hidden text-sm capitalize tracking-widest text-brand-light/40 
          lg:block lg:group-hover:hidden"
        >
          qty:{amount}
        </span>
      </div>

      {/* PRODUCT PRICE */}
      <p
        className="brand-ease col-start-4 row-span-2 mr-5 mt-4 w-4/5 justify-self-center 
        rounded-lg bg-brand-base/25 py-2 text-center font-fira font-medium tracking-wider 
        text-brand-base lg:mt-0 lg:group-hover:row-span-2 lg:group-hover:mt-6"
      >
        {currencyFormat(price.amount)}
      </p>

      {/* PRODUCT QUANITITY */}
      <div
        className="col-span-2 col-start-2 grid h-1/2 w-3/4 grid-cols-3 items-center justify-around self-start 
        justify-self-center overflow-hidden rounded-lg bg-brand-light lg:row-start-3 
        lg:hidden lg:h-2/3 lg:group-hover:grid"
      >
        <button
          onClick={() => decrease(id)}
          className="brand-ease h-full text-xs text-brand-base hover:bg-brand-base 
          hover:text-brand-light"
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <p className="text-center text-sm text-brand-dark">{amount}</p>
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
