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
      as={href}
      href={href}
      className={`${alignment} group/SeeMoreBtn flex max-w-max items-center gap-2 
      text-lg uppercase text-brand-secondary hover:text-brand-base hover:opacity-100`}
    >
      <span className="brand-ease">See More</span>
      <FontAwesomeIcon
        icon={faArrowUp}
        className="brand-ease rotate-180 group-hover/SeeMoreBtn:rotate-45"
      />
    </Link>
  );
}
