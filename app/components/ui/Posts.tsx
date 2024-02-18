import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { image } from "@/ah/utils/type";
import React from "react";

type Props = {
  href: string;
  title: string;
  subtitle?: string;
  image: image | StaticImageData;
  dictionary: any;
};

export default function Posts(props: Props) {
  return (
    <div className="min-w-sm max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <a href={props.href}>{renderImage(props.image, props.title)}</a>
      <div className="p-5">
        <div className={`h-36`}>
          <h5 className="mb-2 text-2xl font-medium text-gray-900 dark:text-white">
            {props.title}
          </h5>
        </div>
        <div className={`pb-5`}>
          <Link
            href={props.href}
            className="font-roboto mb-4 border border-black bg-white px-8 py-4 text-center font-thin text-black hover:bg-black hover:text-white focus:outline-none md:mb-0 md:mr-6"
          >
            {props.dictionary.other.readMore}
          </Link>
        </div>
      </div>
    </div>
  );
}

function renderImage(image: image | StaticImageData, alt: string) {
  if (isMyImage(image)) {
    return (
      <Image
        src={image.url}
        width={image.width}
        height={image.height}
        alt={alt}
        className={`h-[300px] w-full object-cover object-top`}
      />
    );
  } else {
    return (
      <Image
        src={image}
        alt={alt}
        className={`h-[300px] object-cover object-top`}
      />
    );
  }
}

function isMyImage(image: image | StaticImageData): image is image {
  return (image as image).url !== undefined;
}
