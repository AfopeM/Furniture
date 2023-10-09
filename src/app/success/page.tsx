"use client";
import useSWR from "swr";
import Stripe from "stripe";
import Image from "next/image";
import { useEffect } from "react";
import { Hero, Title } from "@/components";
import { currencyFormat } from "@/utils";
import { useCart } from "@/libs/zustand";
import { fetchSessionId } from "@/libs/stripe";

export default function Success({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const { resetCart } = useCart();
  const {
    data: checkoutsession,
    error,
    isLoading,
  } = useSWR(searchParams.session_id, fetchSessionId);

  useEffect(() => {
    resetCart();
  }, [resetCart]);

  if (isLoading) {
    return (
      <>
        <Hero title="Purchase Complete" />
        {/* SUCCESS PAGE TAGLINE */}
        <div className="brand-px bg-brand-dark/10 py-12">
          <Title textSize="text-3xl md:text-4xl" colour="text-brand-dark">
            Thanks for ordering
          </Title>
          <p className="mt-4 font-fira text-brand-dark/50">
            We appreciate your order, we&apos;ve processed your order and will
            be shipping it to you within 3-4 business days. We hoped you enjoyed
            shopping with us do come again and check out our fall collection
          </p>
        </div>

        {/* CONTENT */}
        <main className="brand-px bggreen-400 mt-12">
          {/* PURCHASE PRODUCTS DISPLAY */}
          <section>
            <Title textSize="text-xl" colour="text-brand-dark">
              Order number
            </Title>
            <div className="h-12 w-[70%] animate-pulse bg-brand-gray" />

            <div
              className="my-8 flex flex-col items-center justify-center 
              border-y-2 border-brand-dark/5"
            >
              {Array(2).map((product, i) => {
                return (
                  <article
                    key={product.id}
                    className={`${
                      i === 0 ? "" : "border-t-2 border-brand-base/10"
                    } grid grid-cols-1 items-center gap-8 py-8 md:grid-cols-2`}
                  >
                    {/* PRODUCT IMAGE */}
                    <div className="mx-auto h-60 w-60 animate-pulse bg-brand-gray md:m-0" />

                    {/* PRODUCT DETAILS */}
                    <div
                      className="max-w-lg space-y-2 text-center font-fira text-brand-dark/50 
                      md:text-start"
                    >
                      <div className="h-10 w-1/5 animate-pulse bg-brand-gray" />
                      <div className="h-44 w-4/5 animate-pulse bg-brand-gray" />
                      <div className="flex gap-2 divide-x-2 divide-brand-base/10">
                        <div className="mr-2 h-6 w-1/3 animate-pulse border-r-2 border-brand-base/10 bg-brand-gray" />
                        <div className="ml-2 h-6 w-1/3 animate-pulse bg-brand-gray" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* BILLING INFORMATION */}
            <div className="space-y-2 text-brand-dark">
              <Title
                textSize="text-2xl"
                extra="text-center"
                colour="text-brand-dark"
              >
                Billing Address
              </Title>
              <div className="h-48 w-1/5 animate-pulse bg-brand-gray md:w-full" />
            </div>

            {/* PRICING */}
            <div className="space-y-2 text-brand-dark">
              <Title
                textSize="text-2xl"
                extra="text-center"
                colour="text-brand-dark"
              >
                Total
              </Title>
              <div className="h-32 w-1/2 animate-pulse bg-brand-gray md:h-56" />
            </div>
          </section>
        </main>
      </>
    );
  }

  if (checkoutsession) {
    const { amount_total, customer_details, payment_intent, line_items } =
      checkoutsession as Stripe.Checkout.Session;

    const { id } = payment_intent as Stripe.PaymentIntent;
    const products = line_items?.data as Stripe.LineItem[];
    const { email, name, address } =
      customer_details as Stripe.Checkout.Session.CustomerDetails;

    const billingInfo = [
      { infoName: "Name", value: name },
      { infoName: "Email", value: email },
      { infoName: "Country", value: address?.country },
      { infoName: "Postal Code", value: address?.postal_code },
    ];

    return (
      <>
        <Hero title="Purchase Complete" />
        {/* SUCCESS PAGE TAGLINE */}
        <div className="brand-px bg-brand-dark/10 py-12">
          <Title textSize="text-3xl md:text-4xl" colour="text-brand-dark">
            Thanks for ordering
          </Title>
          <p className="mt-4 font-fira text-brand-dark/50">
            We appreciate your order, we&apos;ve processed your order and will
            be shipping it to you within 3-4 business days. We hoped you enjoyed
            shopping with us do come again and check out our fall collection
          </p>
        </div>

        {/* CONTENT */}
        <main className="brand-px bggreen-400 mt-12">
          {/* PURCHASE PRODUCTS DISPLAY */}
          <section>
            <Title textSize="text-xl" colour="text-brand-dark">
              Order number
            </Title>
            <span className="text-2xl font-bold text-purple-500 md:text-3xl">
              {id}
            </span>

            <div
              className="my-8 flex flex-col items-center justify-center 
              divide-y-2 divide-brand-dark/5 border-y-2 border-brand-dark/5"
            >
              {products.map((product, i) => {
                const { name, images, description } = product.price
                  ?.product as Stripe.Product;
                return (
                  <article
                    key={product.id}
                    className="grid grid-cols-1 items-center gap-8 py-8 md:grid-cols-2"
                  >
                    {/* PRODUCT IMAGE */}
                    <div className="relative mx-auto h-60 w-60 md:m-0">
                      <Image
                        fill
                        sizes="80vw"
                        src={images[0]}
                        alt={`${name} image`}
                        className="object-contain"
                      />
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div
                      className="max-w-lg space-y-2 text-center font-fira text-brand-dark/50 
                      md:text-start"
                    >
                      <h2 className="font-oswald text-2xl uppercase text-brand-dark">
                        {name}
                      </h2>
                      <p>{description}</p>
                      <div>
                        <span
                          className="border-r-2 border-brand-base/10 pr-2 uppercase
                          text-brand-dark"
                        >
                          Quantity:
                          <span className="text-brand-dark/50">
                            {" "}
                            {product.quantity}
                          </span>
                        </span>
                        <span className="pl-2 uppercase text-brand-dark">
                          Price:
                          <span className="text-brand-dark/50">
                            {" "}
                            {currencyFormat(product.price?.unit_amount!)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* BILLING INFORMATION */}
            <div className="space-y-2 text-brand-dark">
              <Title
                textSize="text-2xl"
                extra="text-center"
                colour="text-brand-dark"
              >
                Billing Address
              </Title>
              <table className="w-full">
                <tbody className="mx-auto w-4/5 uppercase md:w-full">
                  {billingInfo.map((item, i) => {
                    return (
                      <tr
                        key={item.infoName}
                        className={`${i % 2 === 0 ? "bg-brand-dark/5" : ""}`}
                      >
                        <td className="pl-4">{item.infoName}:</td>
                        <td
                          className={`${
                            item.infoName === "Name"
                              ? "capitalize"
                              : "normal-case"
                          } pr-4 text-end font-fira text-brand-dark/50`}
                        >
                          {item.value}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* PRICING */}
            <div className="space-y-2 text-brand-dark">
              <Title
                textSize="text-2xl"
                extra="text-center"
                colour="text-brand-dark"
              >
                Total
              </Title>
              <p
                className="-ml-6 text-center font-fira text-6xl font-bold 
                text-brand-base/50 md:mx-0 md:pt-4"
              >
                {currencyFormat(amount_total!)}
              </p>
            </div>
          </section>
        </main>
      </>
    );
  }

  if (error)
    return (
      <>
        <Hero title="Purchase Completed" />
        <main
          className="h-24 w-full text-center text-2xl capitalize 
          text-brand-dark"
        >
          failed to load the session
        </main>
      </>
    );
}
