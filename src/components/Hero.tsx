"use client";
import { Nav } from ".";
import Image from "next/image";

export default function Hero() {
  return (
    <header className="relative w-full h-96 bg-brand-dark">
      <Image
        fill
        alt="hero"
        sizes="80vw"
        src="/hero.webp"
        className="object-cover opacity-25"
      />
      <Nav />
      Hero
    </header>
  );
}
