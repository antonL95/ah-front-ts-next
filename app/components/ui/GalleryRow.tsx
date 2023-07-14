"use client";

import { artist, carouselItems } from "@/ah/utils/type";
import { Avatar } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CarouselSlider from "@/ah/components/ui/CarouselSlider";

type props = {
  artist: artist;
  lang: string;
  withoutAvatar?: boolean;
};
const GalleryRow = (props: props) => {
  const carouselItems: carouselItems = [];

  if (props.artist.products !== undefined) {
    for (const item of props.artist.products) {
      carouselItems.push({
        id: item.id,
        element: (
          <Link href={`/${props.lang}/gallery/products/${item.id}`} key={`${item.id}-link`}>
            <div key={`${item.id}-div`} className={`max-w-[300px] text-center`}>
              <Image
                src={item.image.url}
                alt={item.name}
                width={item.image.width}
                height={item.image.height}
                className={`mx-auto max-h-[300px] object-contain`}
                key={`${item.id}-image`}
              />
              <h2 key={`${item.id}-h2`} className={``}>
                {item.name}
              </h2>
            </div>
          </Link>
        ),
      });
    }
  }
  return (
    <div className={`md:py-8`}>
      {props.withoutAvatar ? null : (
        <div className={`flex px-5 pb-5`}>
          <Image
            src={props.artist.profileImageUrl.url}
            alt={props.artist.name}
            height={props.artist.profileImageUrl.height}
            width={props.artist.profileImageUrl.width}
            className={`h-[80px] w-[80px] rounded-full`}
          />
          <Link
            href={`/${props.lang}/gallery/artists/${props.artist.href}`}
            className={`flex flex-col justify-items-center`}
          >
            <span className={`my-auto self-center pl-2 text-2xl`}>
              {props.artist.name}
            </span>
          </Link>
        </div>
      )}

      <div className={`md:container md:mx-auto`}>
        <CarouselSlider items={carouselItems} />
      </div>
    </div>
  );
};

export default GalleryRow;
