import Link from "next/link";
import React from "react";

type GalleryButtonProps = {
  close?: () => void;
  dictionary: any;
  lang: string;
  classStyles: string;
};
const GalleryButton = ({
  close,
  dictionary,
  lang,
  classStyles,
}: GalleryButtonProps) => {
  return (
    <Link
      href={`/${lang}/gallery`}
      onClick={close}
      className={`${classStyles} mb-4 px-8 py-4 text-center font-roboto font-thin focus:outline-none md:mb-0 md:mr-6`}
    >
      {dictionary.galleryButton}
    </Link>
  );
};

export default GalleryButton;
