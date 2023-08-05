"use client";
import { Nav } from ".";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface HeroProp {
  title?: string;
  children?: React.ReactNode;
}

//prettier-ignore
export default function Hero({ children, title } : HeroProp) {
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
        } brand-px flex w-full items-center relative justify-center text-center`}
      >
        {currentPage === "/" ? children : (<h1 className="text-5xl font-bold uppercase tracking-tight 
          md:text-6xl lg:text-8xl"> 
          {title}
        </h1>)}
      </section>
    </header>
  );
}
