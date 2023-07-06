import { getDictionary } from "@/ah/../get-directories";
import { Locale } from "@/ah/../i18n-config";
import * as qs from "qs";
import {
  fetchArtistsWithProducts,
  fetchData,
  fetchFiltersAndValues,
} from "@/ah/utils/fetch-helper";
import { artsists, artwork, artworks, carouselItems } from "@/ah/utils/type";
import GalleryRow from "@/ah/components/ui/GalleryRow";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export const runtime = "edge";

type props = {
  params: {
    lang: Locale;
  };
};

const IndexPage = async (props: props) => {
  const dictionary = await getDictionary(props.params.lang);
  const data = await fetchArtistsWithProducts(props.params.lang);
  const filters = await fetchFiltersAndValues(props.params.lang);

  return (
    <>
      {data.map((artist) => {
        return (
          <div key={artist.id} className={`even:bg-white odd:bg-gray`}>
            <GalleryRow key={`${artist.id}-${(new Date()).getTime()}`} artist={artist} />
          </div>
        );
      })}
    </>
  );
};
export default IndexPage;
