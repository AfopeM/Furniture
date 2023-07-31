"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { cardVariant } from "@/libs/motion";

interface HomeCardsProp {
  type?: string;
  icon: string;
  name: string;
  desc: string;
  index: number;
}

//prettier-ignore
export default function HomeCards({ type, name, icon, desc, index }: HomeCardsProp) {
  return (
    <motion.article
      variants={cardVariant(index, 0.2)}
      initial="initial"
      animate="animate"
      whileHover="whileHover"
      exit="exit"
      className="group max-w-sm space-y-2 rounded-xl text-center 
      overflow-hidden flex items-center"
    >
      <div
        className="bg-brand-dark/5 px-10 py-6 group-hover:bg-brand-dark 
        brand-ease h-full"
      >
        {type === "Why Choose Us" ? (
          <>
            {/* WHY CHOOSE US */}
            <span
              className="brand-ease mx-auto flex max-w-max items-center 
              justify-center rounded-xl bg-brand-dark p-3 text-brand-base 
              group-hover:bg-brand-base/25"
            >
              <Image
                width={0}
                height={0}
                src={icon}
                alt={name}
                sizes="5vw"
                className="h-8 w-8 object-contain"
              />
            </span>
            <h3
              className="brand-ease text-2xl pt-2 font-medium capitalize
              text-brand-dark group-hover:text-brand-light"
            >
              {name}
            </h3>
            <p
              className="brand-ease font-fira font-light 
              text-brand-dark/50 group-hover:text-brand-light/50"
            >
              {desc}
            </p>
          </>
        ) : (
          <>
            {/* TESTIMONIAL */}
            <Image
              width={0}
              height={0}
              src={icon}
              alt={name}
              sizes="5vw"
              className="mx-auto h-12 w-32"
            />
            <p
              className="brand-ease font-fira font-light 
              text-brand-dark/50 group-hover:text-brand-gray pb-2"
            >
              {desc}
            </p>
            <h3
              className="brand-ease text-2xl font-medium capitalize
              text-brand-dark group-hover:text-brand-light"
            >
              {name}
            </h3>
          </>
        )}
      </div>
    </motion.article>
  );
}
