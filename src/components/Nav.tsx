"use client";
import Link from "next/link";
import { Cart } from "@/sections";
import { useCart } from "@/libs/zustand";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";
import { useUpdateClient } from "@/utils/hooks";
import { useState, useEffect, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBagShopping,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const currentPage = usePathname();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const mediaQuery = useMediaQuery("(min-width:768px)");

  // NAV PAGES
  const routes = [
    { name: "shop", path: "/shop" },
    { name: "collection", path: "/collection" },
    { name: "about", path: "/about" },
  ];

  //OPEN & CLOSE MOBILE MENU
  function handleOpenMobileMenu(value: SetStateAction<boolean>) {
    setOpenMobileMenu(value);
    handleOpenCart(false);
  }

  //OPEN & CLOSE CART
  const [openCart, setOpenCart] = useState(false);
  function handleOpenCart(value: boolean) {
    setOpenCart(value);
  }

  // AMOUNT IN CART
  const amountInCart = useUpdateClient(useCart((state) => state.cartLength()));
  // const cartLength = useCart((state) => state.cartLength());
  // const [amountInCart, setAmountInCart] = useState(0);

  // useEffect(() => {
  //   if (mediaQuery) setOpenMobileMenu(false);
  //   setAmountInCart(cartLength);
  // }, [mediaQuery, cartLength]);

  useEffect(() => {
    if (mediaQuery) setOpenMobileMenu(false);
  }, [mediaQuery]);

  return (
    <nav
      className="brand-px relative z-30 grid h-20 w-full  
      grid-cols-3 items-center justify-between uppercase"
    >
      {/* CART BUTTON */}
      <button
        type="button"
        onClick={() => handleOpenCart(!openCart)}
        className={`group relative flex justify-center justify-self-start 
        hover:text-brand-light md:col-start-3 md:justify-self-end`}
      >
        <div className="group-hover:scale-110 brand-ease">
          <FontAwesomeIcon icon={faBagShopping} className="pb-1 text-2xl" />
        </div>
        <span
          className={`${
            amountInCart <= 0 ? "hidden" : "block"
          } absolute -translate-y-3 translate-x-3 items-start justify-center
          rounded-md bg-brand-base px-2 py-0.5 text-sm font-medium text-brand-light`}
        >
          {amountInCart}
        </span>
      </button>

      {/* CART */}
      <Cart isCartOpen={openCart} />

      {/* LOGO */}
      <Link
        href="/"
        className={`${
          currentPage === "/" ? "text-brand-light" : "text-brand-gray"
        } brand-ease group col-start-2 row-start-1 
        justify-self-center text-2xl font-bold tracking-tight 
        hover:text-brand-light md:col-start-1 md:justify-self-start 
        md:text-3xl`}
      >
        Furniture{" "}
        <span
          className={`${
            currentPage === "/" ? " opacity-100" : "opacity-0"
          } brand-ease inline-block h-2 w-2 rounded-sm
          bg-brand-base group-hover:opacity-100`}
        />
      </Link>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => handleOpenMobileMenu(true)}
        className="brand-ease relative col-start-3 justify-self-end 
        hover:scale-110 md:hidden"
      >
        <FontAwesomeIcon icon={faBarsStaggered} className="text-2xl" />
      </button>

      {/* MOBILE MENU CONTENT */}
      <aside
        className={`${
          openMobileMenu ? "translate-x-0" : "translate-x-full"
        } brand-ease fixed left-0 top-0 flex h-screen w-full 
        flex-col items-center gap-24 bg-brand-dark bg-opacity-80 p-8  
        backdrop-blur-md md:translate-x-full`}
      >
        {/* CLOSE BTN */}
        <button
          onClick={() => handleOpenMobileMenu(false)}
          className="brand-ease group flex h-6 w-6 items-center
          justify-center self-end text-end hover:scale-110"
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="brand-ease text-2xl group-hover:text-brand-red"
          />
        </button>

        {/* LOGO */}
        <Link
          href="/"
          onClick={() => setOpenMobileMenu(false)}
          className={`${
            currentPage === "/" ? "text-brand-light" : "text-brand-gray"
          } brand-ease group mt-20 text-3xl font-bold tracking-tight 
          hover:text-brand-light`}
        >
          Furniture{" "}
          <span
            className={`${
              currentPage === "/" ? "opacity-100" : "opacity-0"
            } brand-ease inline-block h-2 w-2 rounded-sm 
          bg-brand-base group-hover:opacity-100`}
          />
        </Link>

        {/* MENU */}
        <ul
          className="flex h-64 flex-col items-center justify-between 
          text-lg"
        >
          {routes.map((route) => {
            return (
              <li key={route.name} className="group relative pb-1">
                <Link
                  href={route.path}
                  onClick={() => handleOpenMobileMenu(true)}
                  className={`${
                    currentPage === route.path
                      ? "text-brand-light"
                      : "text-brand-gray"
                  } brand-ease tracking-wider hover:text-brand-light`}
                >
                  {route.name}
                </Link>
                <span
                  className={`${
                    currentPage === route.path ? "opacity-100" : "opacity-0"
                  } brand-ease absolute -bottom-2 left-1/2 block h-2 w-2
                   -translate-x-1/2 rounded-sm bg-brand-base group-hover:opacity-100`}
                />
              </li>
            );
          })}
        </ul>
      </aside>

      {/* DESKTOP MENU */}
      <ul
        className="relative row-start-1 hidden w-full
        justify-between text-sm md:col-start-2 md:ml-4 md:flex"
      >
        {routes.map((route) => {
          return (
            <li key={route.name} className="group relative pb-1">
              <Link
                href={route.path}
                className={`${
                  currentPage === route.path
                    ? "text-brand-light"
                    : "text-brand-gray"
                } brand-ease tracking-wider hover:text-brand-light`}
              >
                {route.name}
              </Link>
              <span
                className={`${
                  currentPage === route.path ? "opacity-100" : "opacity-0"
                } brand-ease absolute -bottom-2 left-1/2 h-2 w-2 
                -translate-x-1/2 rounded-sm bg-brand-base 
                group-hover:opacity-100`}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
