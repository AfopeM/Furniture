"use client";
import Image from "next/image";
import { useState } from "react";

interface BlurImageProp {
  imgSrc: string;
  imgAlt: string;
  style?: string;
}
export default function BlurImage({ imgSrc, imgAlt, style }: BlurImageProp) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Image
      fill
      src={imgSrc}
      alt={imgAlt}
      sizes="50vw"
      className={`${
        isLoading ? "blur-2xl grayscale" : "blur-0 grayscale-0"
      } ${style} object-cover brand-duration-500`}
      onLoadingComplete={() => setIsLoading(false)}
    />
  );
}
