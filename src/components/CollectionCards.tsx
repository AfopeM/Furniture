"use client";
import { motion } from "framer-motion";
import { SeeMoreBtn, BlurImage } from ".";

interface CollectionCardsProp {
  index: number;
  image: string;
  alt: string;
  title: string;
  desc: string;
}

export default function CollectionCards({
  index,
  image,
  alt,
  title,
  desc,
}: CollectionCardsProp) {
  return (
    <motion.article
      initial={{
        x: index % 2 === 0 ? -25 : 25,
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      className={`${index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} 
      group cursor-pointer flex flex-col items-center justify-center gap-6 
      text-brand-dark lg:gap-16`}
    >
      <div className="relative h-72 w-full max-w-md md:min-w-[300px] ">
        <BlurImage
          imgAlt={alt}
          imgSrc={image}
          style="group-hover:scale-105"
          size="(max-width:768px) 75vw, 45vw"
        />
      </div>

      {/* COLLECTION CONTENT */}
      <div className="max-w-md">
        <h3 className="pb-3 text-3xl font-medium uppercase lg:text-4xl">
          {title}
        </h3>
        <p className="pb-5 font-fira font-light text-brand-dark/50 md:pb-10">
          {desc}
        </p>
        <SeeMoreBtn href="/collection" />
      </div>
    </motion.article>
  );
}
