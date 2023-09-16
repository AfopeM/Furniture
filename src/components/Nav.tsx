"use client";
import Link from "next/link";
import { useCart } from "@/libs/zustand";
import { useUpdateClient } from "@/hooks";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";
import { useState, useEffect, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBagShopping,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const currentPage = usePathname();
  const mediaQuery = useMediaQuery("(min-width:768px)");
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  // NAV PAGES
  const routes = [
    { name: "shop", path: "/shop" },
    { name: "collection", path: "/collection" },
    { name: "about", path: "/about" },
  ];

  //OPEN & CLOSE MOBILE MENU
  function handleOpenMobileMenu(value: SetStateAction<boolean>) {
    setOpenMobileMenu(value);
  }

  // AMOUNT IN CART
  const amountInCart = useUpdateClient(useCart((state) => state.cartLength()));

  useEffect(() => {
    if (mediaQuery) setOpenMobileMenu(false);
  }, [mediaQuery]);

  return (
    <nav
      className="brand-px relative z-30 grid h-20 w-full grid-cols-3 
      items-center justify-between uppercase"
    >
      {/* CART*/}
      <Link
        as={"/cart"}
        href={"/cart"}
        className="brand-ease group relative flex justify-center 
        justify-self-start md:col-start-3 md:justify-self-end lg:hover:scale-105"
      >
        <FontAwesomeIcon
          icon={faBagShopping}
          className={`${
            currentPage === "/cart" ? "text-brand-light" : "text-brand-light/50"
          } brand-ease pb-1 text-2xl group-hover:text-brand-light/75`}
        />
        <span
          className={`${
            amountInCart <= 0 ? "hidden" : "block"
          } absolute -translate-y-3 translate-x-3 items-start justify-center rounded-md 
            bg-brand-base px-2 py-0.5 text-sm font-medium text-brand-light`}
        >
          {amountInCart}
        </span>
      </Link>

      {/* LOGO */}
      <Link
        as={"/"}
        href="/"
        className={`${
          currentPage === "/" ? "text-brand-light" : "text-brand-gray"
        } brand-ease group col-start-2 row-start-1 justify-self-center text-xl 
        font-bold tracking-tight hover:text-brand-light sm:text-2xl 
        md:col-start-1 md:justify-self-start md:text-3xl`}
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
        aria-label="mobile menu open button"
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
        } brand-ease fixed left-0 top-0 z-20 flex h-full w-full 
        flex-col items-center gap-24 bg-brand-dark bg-opacity-80 p-8  
        backdrop-blur-md md:translate-x-full`}
      >
        {/* CLOSE BTN */}
        <button
          aria-label="mobile menu close button"
          onClick={() => handleOpenMobileMenu(false)}
          className="brand-ease group flex h-6 w-6 items-center justify-center 
          self-end text-end hover:scale-110"
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="brand-ease text-2xl group-hover:text-brand-red"
          />
        </button>

        {/* LOGO */}
        <Link
          as={"/"}
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
        <ul className="flex h-64 flex-col items-center justify-between text-lg">
          {routes.map((route) => {
            return (
              <li key={route.name} className="group relative pb-1">
                <Link
                  as={route.path}
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
          <li>
            <Link
              as={"/cart"}
              href={"/cart"}
              className="brand-ease group relative flex justify-center justify-self-start"
            >
              <FontAwesomeIcon
                icon={faBagShopping}
                className={`${
                  currentPage === "/cart"
                    ? "text-brand-light"
                    : "text-brand-light/50"
                } brand-ease pb-1 text-2xl group-hover:text-brand-light/75`}
              />
              <span
                className={`${
                  amountInCart <= 0 ? "hidden" : "block"
                } absolute -translate-y-3 translate-x-3 items-start justify-center rounded-md 
                bg-brand-base px-2 py-0.5 text-sm font-medium text-brand-light`}
              >
                {amountInCart}
              </span>
            </Link>
          </li>
        </ul>
      </aside>

      {/* DESKTOP MENU */}
      <ul
        className="relative row-start-1 hidden w-full justify-between 
        text-sm md:col-start-2 md:ml-4 md:flex"
      >
        {routes.map((route) => {
          return (
            <li key={route.name} className="group relative pb-1">
              <Link
                as={route.path}
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
