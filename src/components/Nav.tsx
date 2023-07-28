"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBarsStaggered,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const routes = [
    { name: "shop", path: "/shop" },
    { name: "collection", path: "/collection" },
    { name: "about", path: "/about" },
  ];

  return (
    <nav
      className="brand-px relative z-20 grid h-20 w-full  
      grid-cols-3 items-center justify-between uppercase"
    >
      {/* CART */}
      <button
        className={`group relative flex justify-center justify-self-start 
        hover:text-brand-light md:col-start-3 md:justify-self-end`}
      >
        <div className="group-hover:scale-110 brand-duration-300">
          <FontAwesomeIcon icon={faBagShopping} className="pb-1 text-2xl" />
        </div>
        <span
          className={`absolute -translate-y-3 translate-x-3 items-start justify-center
          rounded-md bg-brand-base px-2 py-0.5 text-sm font-medium text-brand-light`}
        >
          1
        </span>
      </button>

      {/* LOGO */}
      <Link
        href="/"
        className={`brand-duration-300 group col-start-2 row-start-1 
        justify-self-center text-2xl font-bold tracking-tight 
        hover:text-brand-light md:col-start-1 md:justify-self-start 
        md:text-3xl`}
      >
        Furniture{" "}
        <span
          className={`brand-duration-300 inline-block h-2 w-2 rounded-sm
          bg-brand-base group-hover:opacity-100`}
        />
      </Link>

      {/* MOBILE MENU BUTTON */}
      <button
        className="brand-duration-500 relative col-start-3 justify-self-end 
        hover:scale-110 md:hidden"
      >
        <FontAwesomeIcon icon={faBarsStaggered} className="text-2xl" />
      </button>

      {/* LABTOP MENU */}
      <ul
        className="relative row-start-1 hidden w-full
        justify-between text-sm md:col-start-2 md:ml-4 md:flex"
      >
        {routes.map((route) => {
          return (
            <li key={route.name} className="group relative pb-1">
              <Link
                href={route.path}
                className={`brand-duration-300 tracking-wider hover:text-brand-light`}
              >
                {route.name}
              </Link>
              <span
                className={`brand-duration-300 absolute -bottom-2 left-1/2 h-2 w-2 
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
