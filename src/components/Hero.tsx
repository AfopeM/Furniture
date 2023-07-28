"use client";
import { Nav } from ".";
import Image from "next/image";
import { usePathname } from "next/navigation";

//prettier-ignore
export default function Hero({ children } : { children:React.ReactNode }) {
const currentPage = usePathname();

  return (
    <header className="relative w-full bg-brand-dark">
      {/* BG IMAGE */}
      <Image
        fill
        priority
        alt="hero"
        sizes="80vw"
        src="/hero.webp"
        className="object-cover opacity-10"
      />
      {/* NAVBAR */}
      <Nav />
      

      {/* HERO */}
      <section
        className={`${
          currentPage === "/"
            ? "h-[75vh] lg:justify-start"
            : "h-[40vh]"
        } brand-px flex w-full items-center justify-center text-center`}
      >
        {children}
      </section>
    </header>
  );
}
