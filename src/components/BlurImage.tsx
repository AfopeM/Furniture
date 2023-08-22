"use client";
import Image from "next/image";
import { useState } from "react";

interface BlurImageProp {
  imgSrc: string;
  imgAlt: string;
  style?: string;
  size?: string;
}
export default function BlurImage({
  size,
  style,
  imgAlt,
  imgSrc,
}: BlurImageProp) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Image
      fill
      src={imgSrc}
      alt={imgAlt}
      sizes={size ? size : `50vw`}
      onLoadingComplete={() => setIsLoading(false)}
      className={`${
        isLoading
          ? "scale-110 blur-2xl grayscale"
          : "scale-100 blur-0 grayscale-0"
      } object-cover ${style} brand-ease`}
    />
  );
}
