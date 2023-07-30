"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import aboutData from "@/../public/data/about.json";
import { Hero, Title } from "@/components";

export default function About() {
  const { members, trustedby } = aboutData;
  return (
    <>
      <Hero title="Our Story" />
      <main>
        {/* COMPANY HISTORY  */}
        <section className="brand-px bg-brand-dark/10 py-16 text-center">
          <Title
            textSize="text-4xl"
            colour="text-brand-dark"
            extra="pb-4 mx-auto mx-auto max-w-md"
          >
            Discover the rich history and evolution of Furniture
          </Title>
          <p className="mx-auto max-w-7xl font-fira font-light leading-8 text-brand-dark/50">
            Our brand with a rich history of craftsmanship and innovation.
            Established over 50 years ago, the brand has evolved into a premier
            destination for discerning clients seeking the finest in high-end
            furniture. Our values of quality, style, and function are reflected
            in every piece we create, and our commitment to excellence is
            evident in every detail. Our objective is to create furniture that
            is not only beautiful and elegant but also functional and
            comfortable. We believe that every home should be a reflection of
            the individual&apos;s unique style and personality, and our
            collection offers a range of styles to fit every taste and
            preference. At Furniture, we are dedicated to exceeding our
            clients&apos; expectations and creating spaces that inspire and
            delight.
          </p>
        </section>

        {/* TEAM MEMBERS */}
        <section className="brand-px space-y-16 bg-brand-dark py-16">
          <Title
            textSize="text-4xl"
            colour="text-brand-light"
            extra="pb-8 text-center md:text-start"
          >
            Meet the Team
          </Title>

          <div
            className="grid w-full grid-cols-1 items-center justify-between 
            gap-16 md:grid-cols-2 lg:grid-cols-3"
          >
            {members.map((member, i) => {
              return (
                <motion.article
                  initial={{
                    scale: 0,
                    opacity: 0,
                  }}
                  whileInView={{
                    scale: 1,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 75,
                      delay: 0.25 * i,
                    },
                  }}
                  viewport={{
                    once: true,
                  }}
                  key={member.name}
                  className="group max-w-[300px] w-full mx-auto cursor-pointer space-y-4"
                >
                  <Image
                    width={0}
                    height={0}
                    alt={member.alt}
                    src={member.image}
                    sizes="(max-width: 768px)60vw, 40vw"
                    className="object-contain w-full grayscale group-hover:grayscale-0 
                    brand-duration-500"
                  />
                  <div className="text-center uppercase md:text-start">
                    <span
                      className="brand-duration-500 font-fira text-xl font-light 
                     text-brand-base/50 group-hover:text-brand-base"
                    >
                      {member.position}
                    </span>
                    <h4
                      className="text-3xl font-bold text-brand-gray brand-duration-500 
                      group-hover:text-brand-light md:text-4xl"
                    >
                      {member.name}
                    </h4>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* TRUSTED BY */}
        <section className="brand-px py-16">
          <Title
            textSize="text-4xl"
            colour="text-brand-dark"
            extra="pb-8 text-center md:text-start"
          >
            Trust By
          </Title>
          <div className="grid w-full grid-cols-2 items-center gap-16 md:grid-cols-4">
            {trustedby.map((trust) => {
              return (
                <Image
                  width={0}
                  height={0}
                  key={trust.alt}
                  src={trust.image}
                  alt={trust.alt}
                  className="object-contain w-full max-w-[200px] justify-self-center"
                />
              );
            })}
          </div>
        </section>
      </main>

      {/* QUOTE */}
      <section className="bg-brand-dark/5">
        <div
          className="brand-px flex flex-col items-center gap-8 py-24 lg:flex-row 
          -mb-24 md:justify-center lg:gap-16"
        >
          <Image
            width={0}
            height={0}
            src="/about/office.webp"
            sizes="(max-width:768px)50vw, 65vw"
            className="justify-self-center h-auto w-full max-w-xl"
            alt="Photo of Office by Annie Spratt on Unsplash"
          />

          <h3
            className="relative max-w-md text-center text-3xl uppercase text-brand-dark
             md:text-4xl lg:text-start"
          >
            <span
              className="absolute left-0 top-0 text-4xl font-bold leading-9 
                text-brand-base lg:-left-4"
            >
              &quot;
            </span>
            Design is not just what it looks like and feels like. Design is how
            it works.
          </h3>
        </div>
      </section>
    </>
  );
}
