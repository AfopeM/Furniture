"use client";
import Link from "next/link";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SeeBtnProp {
  href: string;
  alignment?: string;
}
export default function SeeMoreBtn({ href, alignment }: SeeBtnProp) {
  return (
    <Link
      href={href}
      className={`${alignment} brand-duration-500 group flex max-w-max items-center 
      gap-2 text-lg uppercase text-brand-secondary hover:text-brand-base`}
    >
      See More
      <span className="group-hover:rotate-45 group-hover:opacity-100 brand-duration-500">
        <FontAwesomeIcon icon={faArrowUp} />
      </span>
    </Link>
  );
}
