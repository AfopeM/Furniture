import Link from "next/link";
import { Hero } from "@/components";

export default function Home() {
  return (
    <>
      <Hero>
        <div className="max-w-lg md:max-w-xl lg:text-start lg:max-w-2xl">
          {/* TITLE */}
          <h1
            className="pb-4 text-5xl font-bold uppercase tracking-tight 
            md:text-6xl lg:text-8xl"
          >
            Luxury furniture for a lavish home
          </h1>

          {/* TAGLINE */}
          <p className="font-fira pb-12 text-lg font-light text-brand-gray lg:text-xl">
            Top of the line furniture designed and crafted by the best artist
            solely to create a space that reflects you and what your love.
          </p>

          {/* SHOP BUTTON */}
          <Link
            href="/shop"
            className="relative brand-duration-500 rounded-xl bg-brand-base/25 
            px-8 py-4 tracking-wider text-brand-base hover:bg-brand-base 
            hover:px-12 hover:text-brand-light lg:px-16 lg:text-lg lg:hover:px-20"
          >
            Shop Now
          </Link>
        </div>
      </Hero>
      <main className="space-y-16"></main>
    </>
  );
}
