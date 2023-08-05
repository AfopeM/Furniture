"use client";
import { BlurImage } from ".";
import { useCart } from "@/libs/zustand";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CartCardProp {
  productId: string;
  name: string;
  image: string;
  type: string;
  price: number;
  amount: number;
}

export default function CartCards({
  name,
  type,
  price,
  image,
  amount,
  productId,
}: CartCardProp) {
  const router = useRouter();
  const { increase, decrease, remove } = useCart((state) => state);

  return (
    <article
      className="brand-ease group relative grid h-24 grid-cols-4 items-center 
      justify-center overflow-hidden rounded-xl bg-brand-dark hover:h-36 
      hover:grid-rows-3"
    >
      {/* CLOSE BTN */}
      <button
        onClick={() => remove(productId)}
        className="brand-ease absolute right-4 top-2 opacity-0 group-hover:opacity-100"
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="brand-ease text-lg hover:text-brand-red"
        />
      </button>

      {/* PRODUCT IMAGE */}
      <div className="relative h-full w-full group-hover:row-span-full">
        <BlurImage
          imgSrc={image}
          size="(max-width:768px)50vw, 25vw"
          imgAlt={`image of ${name} ${type}`}
        />
      </div>

      {/* PRODUCT NAME & TYPE */}
      <div
        onClick={() => router.push(`/product/${productId}`)}
        className="col-span-2 col-start-2 row-start-1 cursor-pointer justify-self-center
        text-center uppercase tracking-wide group-hover:row-span-2 group-hover:mt-6"
      >
        <p className="font-fira text-xs text-brand-light/50 md:text-sm">
          {type}
        </p>
        <h3 className="text-base font-medium leading-tight sm:leading-none md:text-xl">
          {name}
        </h3>
      </div>

      {/* PRODUCT PRICE */}
      <p
        className="brand-ease col-start-4 mr-5 w-4/5 justify-self-center rounded-lg 
        bg-brand-base/25 py-2 text-center font-fira font-medium tracking-wider 
        text-brand-base group-hover:row-span-2 group-hover:mt-6 sm:w-2/3"
      >
        {currencyFormat(price)}
      </p>

      {/* PRODUCT QUANITITY */}
      <div
        className="col-span-3 col-start-2 row-start-3 hidden h-2/3 w-3/4 grid-cols-3 
        items-center justify-around self-start justify-self-center overflow-hidden 
        rounded-lg bg-brand-light group-hover:grid"
      >
        <button
          onClick={() => decrease(productId)}
          className="brand-ease h-full pb-1 text-xl text-brand-base hover:bg-brand-base 
          hover:text-brand-light"
        >
          -
        </button>
        <p className="text-center text-sm text-brand-dark">{amount}</p>
        <button
          onClick={() => increase(productId)}
          className="brand-ease h-full text-xl text-brand-base hover:bg-brand-base 
          hover:text-brand-light"
        >
          +
        </button>
      </div>
    </article>
  );
}
