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
      className={`${alignment} brand-ease group/SeeMoreBtn flex max-w-max items-center 
      gap-2 text-lg uppercase text-brand-secondary hover:text-brand-base group-hover:text-brand-base 
      group-hover:opacity-100`}
    >
      See More
      <span
        className="brand-ease rotate-180 group-hover/SeeMoreBtn:rotate-45
        group-hover:rotate-45 group-hover/SeeMoreBtn:opacity-100"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </span>
    </Link>
  );
}
