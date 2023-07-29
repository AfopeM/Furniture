"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { switchBtnVariant } from "@/libs/motion";
import { motion, AnimatePresence } from "framer-motion";
import { Hero, Title, SeeMoreBtn, EmailForm } from "@/components";

export default function Home() {
  const [switchBtn, setSwitchBtn] = useState(false);
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
      <main className="space-y-16">
        {/* POPULAR TITLE */}
        <section className="space-y-8">
          <div
            className="brand-px flex flex-col items-start 
            justify-between gap-4 bg-brand-dark/5 py-12 
            sm:flex-row sm:items-end"
          >
            <div>
              <Title textSize="text-4xl" colour="text-brand-dark">
                Popular Products
              </Title>
              <p
                className="font-fira font-light normal-case 
              text-brand-darkgray pt-2"
              >
                Indulge in luxury with our exclusive collection of popular
                furniture pieces.
              </p>
            </div>
            <SeeMoreBtn href="/shop" alignment="self-start sm:self-end" />
          </div>
        </section>

        {/* WHY CHOOSE US & TESTIMONIALS */}
        <section className="brand-px">
          <div
            className="mb-16 flex flex-col items-center gap-8 
            rounded-lg bg-brand-dark/5 px-12 py-8 text-center 
            md:flex-row-reverse md:justify-between md:text-start 
            lg:justify-around"
          >
            {/* SWITCH BUTTON */}
            <button
              type="button"
              onClick={() => setSwitchBtn((prev) => !prev)}
              className="relative h-20 w-40 overflow-hidden 
              rounded-full bg-brand-base"
            >
              <Image
                fill
                sizes="24vw"
                src="/texture.webp"
                alt="texture image"
                className="object-cover opacity-50"
              />
              <motion.div
                variants={switchBtnVariant(switchBtn)}
                initial="initial"
                animate="animate"
                className="absolute h-14 w-14 overflow-hidden rounded-full"
              >
                <Image
                  fill
                  sizes="16vw"
                  src="/texture.webp"
                  alt="texture image"
                  className="object-cover"
                />
              </motion.div>
            </button>
          </div>
        </section>

        {/* EMAIL */}
        <EmailForm />
      </main>
    </>
  );
}
