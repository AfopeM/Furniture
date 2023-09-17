"use client";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { EmailForm } from "@/sections";
import { motion } from "framer-motion";
import homeData from "@/../public/data/home.json";
import { cardVariant } from "@/libs/framer-motion/motion";
import {
  Hero,
  Title,
  SeeMoreBtn,
  ProductCard,
  ProductCardSkeleton,
} from "@/components";
import { getPopularProducts } from "@/libs/stripe";

export default function Home() {
  const { whyChooseUs, testimonials } = homeData;
  const { data: popular, error } = useSWR("allProducts", getPopularProducts);

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

        {/* WHY CHOOSE US */}
        <section className="brand-px">
          {/* TITLE */}
          <div
            className="flex flex-col items-center justify-center rounded-lg 
            bg-brand-dark/5 px-12 py-8 text-center lg:flex-row lg:gap-16 lg:text-start"
          >
            <Title textSize="text-3xl" colour="text-brand-dark">
              why choose us
            </Title>
            <p className="max-w-sm pt-2 font-fira text-brand-darkgray/50">
              Our handcrafted furniture is designed to elevate any space with
              unparalleled style and comfort.
            </p>
          </div>

          {/* CONTENT */}
          <div className="my-8 flex flex-wrap justify-center gap-8">
            {whyChooseUs.map((us, i) => {
              return (
                <motion.article
                  key={i}
                  exit="exit"
                  animate="animate"
                  initial="initial"
                  whileHover="whileHover"
                  variants={cardVariant(i, 0.2)}
                  className="group flex max-w-sm items-center space-y-2 
                  overflow-hidden rounded-xl text-center"
                >
                  <div
                    className="brand-ease h-full bg-brand-dark/5 px-10 
                    py-6 group-hover:bg-brand-dark"
                  >
                    <span
                      className="brand-ease mx-auto flex max-w-max items-center 
                      justify-center rounded-xl bg-brand-dark p-3 text-brand-base 
                      group-hover:bg-brand-base/25"
                    >
                      <Image
                        width={0}
                        height={0}
                        src={us.icon}
                        alt={us.name}
                        sizes="5vw"
                        className="h-8 w-8 object-contain"
                      />
                    </span>
                    <h3
                      className="brand-ease py-2 text-2xl font-medium
                      capitalize text-brand-dark group-hover:text-brand-light"
                    >
                      {us.name}
                    </h3>
                    <p
                      className="brand-ease font-fira text-brand-dark/50 
                      group-hover:text-brand-light/50"
                    >
                      {us.desc}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="brand-px">
          {/* TITLE */}
          <div
            className="flex flex-col items-center justify-center rounded-lg 
            bg-brand-dark/5 px-12 py-8 text-center lg:flex-row lg:gap-16 lg:text-start"
          >
            <Title textSize="text-3xl" colour="text-brand-dark">
              Testimonials
            </Title>
            <p className="max-w-sm pt-2 font-fira text-brand-darkgray/50">
              Our commitment to quality is evident in every piece of furniture
              we create.
            </p>
          </div>

          {/* CONTENT */}
          <div className="my-8 flex flex-wrap justify-center gap-8">
            {testimonials.map((test, i) => {
              return (
                <motion.article
                  key={i}
                  exit="exit"
                  animate="animate"
                  initial="initial"
                  whileHover="whileHover"
                  variants={cardVariant(i, 0.2)}
                  className="group flex max-w-sm items-center space-y-2 
                  overflow-hidden rounded-xl text-center"
                >
                  <div
                    className="brand-ease h-full bg-brand-dark/5 px-10 
                    py-6 group-hover:bg-brand-dark"
                  >
                    <Image
                      width={0}
                      height={0}
                      src={test.icon}
                      alt={test.name}
                      sizes="5vw"
                      className="mx-auto h-12 w-32"
                    />
                    <p
                      className="brand-ease pb-2 font-fira text-brand-dark/50 
                    group-hover:text-brand-gray"
                    >
                      {test.desc}
                    </p>
                    <h3
                      className="brand-ease text-2xl font-medium capitalize text-brand-dark 
                    group-hover:text-brand-light"
                    >
                      {test.name}
                    </h3>
                  </div>
                </motion.article>
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
