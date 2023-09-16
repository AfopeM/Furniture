"use client";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { EmailForm } from "@/sections";
import { useState, Suspense } from "react";
import homeData from "@/../public/data/home.json";
import { motion, AnimatePresence } from "framer-motion";
import {
  switchBtnVariant,
  fadeInOutVariant,
} from "@/libs/framer-motion/motion";
import {
  Hero,
  Title,
  HomeCards,
  SeeMoreBtn,
  ProductCard,
  ProductCardSkeleton,
} from "@/components";
import { getPopularProducts } from "@/api-layer/stripe";

export default function Home() {
  const { whyChooseUs, testimonials } = homeData;
  const [switchBtn, setSwitchBtn] = useState(true);

  const { data: popular, error } = useSWR("allProducts", getPopularProducts);

  console.log();
  return (
    <>
      <Hero>
        <div className="max-w-lg md:max-w-xl lg:max-w-2xl lg:text-start">
          {/* TITLE */}
          <h1
            className="pb-4 text-5xl font-bold uppercase tracking-tight 
            md:text-6xl lg:text-8xl"
          >
            Luxury furniture for a lavish home
          </h1>

          {/* TAGLINE */}
          <p className="pb-12 font-fira text-lg font-light text-brand-gray lg:text-xl">
            Top of the line furniture designed and crafted by the best artist
            solely to create a space that reflects you and what your love.
          </p>

          {/* SHOP BUTTON */}
          <Link
            as={"/shop"}
            href="/shop"
            className="brand-ease relative rounded-xl bg-brand-base/25 
            px-8 py-4 tracking-wider text-brand-base hover:bg-brand-base 
            hover:text-brand-light lg:px-16 lg:text-lg lg:hover:px-20"
          >
            Shop Now
          </Link>
        </div>
      </Hero>

      <main className="space-y-16">
        {/* POPULAR TITLE */}
        <section className="space-y-8">
          <div
            className="brand-px flex flex-col items-start justify-between 
            gap-4 bg-brand-dark/5 py-12 sm:flex-row sm:items-end"
          >
            <div>
              <Title textSize="text-4xl" colour="text-brand-dark">
                Popular Products
              </Title>
              <p className="pt-2 font-fira normal-case text-brand-darkgray/50">
                Indulge in luxury with our exclusive collection of popular
                furniture pieces.
              </p>
            </div>
            <SeeMoreBtn href="/shop" alignment="self-start sm:self-end" />
          </div>

          {/* POPULAR PRODUCTS */}
          <div
            className="brand-px flex flex-wrap items-center 
            justify-center gap-16"
          >
            {error ? (
              <p>could not fetch popular Products</p>
            ) : popular ? (
              popular!.map((product, i) => {
                return <ProductCard index={i} {...product} key={product.id} />;
              })
            ) : (
              Array(4)
                .fill(1)
                .map((item, i) => {
                  return <ProductCardSkeleton key={item + i} />;
                })
            )}
          </div>
        </section>

        {/* WHY CHOOSE US & TESTIMONIALS */}
        <section className="brand-px">
          {/* TITLE */}
          <div
            className="mb-16 flex flex-col items-center gap-8 
            rounded-lg bg-brand-dark/5 px-12 py-8 text-center 
            md:flex-row-reverse md:justify-between md:text-start 
            lg:justify-around"
          >
            {/* SWITCH BUTTON */}
            <button
              aria-label=""
              type="button"
              onClick={() => setSwitchBtn((prev) => !prev)}
              className="relative h-20 w-40 overflow-hidden 
              rounded-full bg-brand-base"
            >
              <Image
                fill
                src="/texture.webp"
                alt="texture image"
                sizes="(max-width:768px) 15vw, 20vw"
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
                  src="/texture.webp"
                  alt="texture image"
                  className="object-cover"
                  sizes="(max-width:768px) 10vw, 15vw"
                />
              </motion.div>
            </button>

            <AnimatePresence mode="wait">
              {switchBtn ? (
                <motion.div
                  key={"why choose us"}
                  variants={fadeInOutVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Title textSize="text-3xl" colour="text-brand-dark">
                    why choose us
                  </Title>
                  <p className="max-w-sm pt-2 font-fira text-brand-darkgray/50">
                    Our handcrafted furniture is designed to elevate any space
                    with unparalleled style and comfort.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={"Testimonials"}
                  variants={fadeInOutVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Title textSize="text-3xl" colour="text-brand-dark">
                    Testimonials
                  </Title>
                  <p className="max-w-sm pt-2 font-fira text-brand-darkgray/50">
                    Our commitment to quality is evident in every piece of
                    furniture we create.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CARDS */}
          <div className="flex flex-wrap justify-center gap-8">
            {switchBtn
              ? whyChooseUs.map((us, i) => {
                  return (
                    <HomeCards
                      key={us.name}
                      type="Why Choose Us"
                      {...us}
                      index={i + 1}
                    />
                  );
                })
              : testimonials.map((test, i) => {
                  return (
                    <HomeCards
                      key={test.name}
                      type="testimonials"
                      {...test}
                      index={i + 1}
                    />
                  );
                })}
          </div>
        </section>

        {/* EMAIL */}
        <EmailForm />
      </main>
    </>
  );
}
