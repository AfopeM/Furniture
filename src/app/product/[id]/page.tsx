"use client";
import { Hero } from "@/components";
import { useParams } from "next/navigation";

export default function Product() {
  const { id } = useParams();
  //   console.log(id);

  return (
    <>
      <Hero title="Our Product" />
      {/* PRODUCT TITLE */}
      {/* <div
        className="brand-px w-full bg-brand-dark/10 
        py-8 uppercase"
      >
        <span className="text-xl text-brand-dark/50">{product?.type}</span>
        <h2 className="text-4xl font-medium text-brand-dark">
          {product?.name}
        </h2>
      </div> */}
      <main></main>
    </>
  );
}
