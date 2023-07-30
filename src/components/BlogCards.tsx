"use client";
import { BlurImage } from ".";
import { motion } from "framer-motion";

interface BlogCardsProp {
  index: number;
  alt: string;
  title: string;
}

export default function ArticleBlog({ index, alt, title }: BlogCardsProp) {
  const date = new Date();
  const day = date.getDate() - index * 2;
  let final = new Date(date.setDate(day)).toDateString().split(/ /);
  final.shift();

  return (
    <motion.article
      initial={{
        x: index - 25,
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        opacity: 1,
        transition: {
          delay: 0.25 * index,
        },
      }}
      viewport={{
        once: true,
      }}
      className="max-w-[350px] group cursor-pointer space-y-4"
    >
      <div className="relative h-64 w-full">
        <BlurImage
          imgAlt={alt}
          style="group-hover:scale-105"
          size="(max-width:768px) 60vw, 45vw"
          imgSrc={`/collection/blog_${index + 1}.webp`}
        />
      </div>
      <div>
        <span className="pb-2 font-fira uppercase text-brand-dark/50">
          {`${final[0]} ${final[1]}, ${final[2]}`}
        </span>
        <h4
          className="brand-duration-500 text-3xl text-brand-dark 
          group-hover:text-brand-base"
        >
          {title}
        </h4>
      </div>
    </motion.article>
  );
}
