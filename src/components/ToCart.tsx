"use client";
import { useCart } from "@/libs/zustand";
import { useUpdateClient } from "@/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

interface ToCartProp {
  id: string;
  name: string;
  type: string;
  image: string;
  size?: string | "sm";
  price: { id: string; amount: number };
}
export default function ToCart({
  id,
  name,
  type,
  price,
  image,
  size,
}: ToCartProp) {
  // INCREASE, DECREASE AND ADD PRODUCT TO CART
  const { addToCart, increase, decrease } = useCart((state) => state);
  const productAmount = useUpdateClient(
    useCart((state) => state.productAmount(id))
  );

  function handleAddToCart() {
    addToCart({ id, name, type, price, image, quantity: 1 });
  }

  return (
    <>
      {size === "sm" ? (
        productAmount <= 0 ? (
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
        )
      ) : (
        <div
          className="h-14 w-full overflow-hidden rounded-lg md:col-start-3 md:row-start-2
  lg:col-auto lg:row-start-5 lg:h-16"
        >
          {productAmount > 0 ? (
            <div className="grid h-full grid-cols-4 items-center justify-center">
              <button
                type="button"
                onClick={() => decrease(id)}
                className="brand-ease h-full bg-brand-base/20 font-bold text-brand-base 
        hover:bg-brand-base hover:text-brand-light"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span
                className="brand-ease col-span-2 col-start-2 flex h-full items-center justify-center 
        bg-brand-light/10 text-xl text-brand-light"
              >
                {productAmount}
              </span>

              <button
                type="button"
                onClick={() => increase(id)}
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
      )}
    </>
  );
}
