"use client";
import { Title } from ".";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname().replace("/", "");
  const currentPage = pathName === "" ? "home" : pathName;
  const ourCompany = ["home", "shop", "collection", "about"];
  const ourCollection = ["kitchen", "bedroom", "office", "living room"];

  return (
    <footer
      className="brand-px mt-24 relative bg-brand-dark pb-8 pt-16 
      text-center text-brand-gray md:text-start"
    >
      <Image
        fill
        alt="texture"
        src="/texture.webp"
        className="object-cover opacity-5"
      />

      {/* FOOTER CONTENT */}
      <section
        className="relative z-10 flex w-full flex-col items-center 
        justify-between gap-8 border-b-[1px] border-solid 
        border-brand-light/10 pb-8 md:flex-row"
      >
        {/* COMPANY TITLE & SUMMARY */}
        <div>
          <Title textSize="text-xl" colour="text-brand-light">
            Furniture
          </Title>
          <p className="w-full max-w-md pt-2 font-fira font-light capitalize">
            we are dedicated to creating the highest quality luxury furniture
            that combines style, comfort, and functionality. Our pieces are
            designed with the utmost care and attention to detail, using only
            the finest materials and craftsmanship.
          </p>
        </div>

        <div className="flex gap-8">
          {/* OUR COMPANY */}
          <div>
            <h3 className="uppercase text-brand-light">Our Company</h3>
            <ul className="font-fira font-light capitalize">
              {ourCompany.map((company) => {
                return (
                  <li key={company}>
                    <Link
                      href={`${company === "home" ? "/" : `/${company}`}`}
                      className={`${
                        currentPage === company
                          ? "text-brand-light"
                          : "text-brand-gray"
                      } brand-ease hover:text-brand-light`}
                    >
                      {company}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* OUR COLLECTION */}
          <div>
            <h3 className="uppercase text-brand-light">Our Collection</h3>
            <ul className="font-fira font-light capitalize">
              {ourCollection.map((collection) => {
                return (
                  <li key={collection}>
                    <Link
                      href="/collection"
                      className="brand-ease hover:text-brand-light"
                    >
                      {collection}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* COPYRIGHT */}
      <p className="pt-8 text-center font-fira font-light">
        Copyright &copy; 2023 Furniture. All right Reserved
      </p>
    </footer>
  );
}
