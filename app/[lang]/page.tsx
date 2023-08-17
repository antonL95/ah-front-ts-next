import { getDictionary } from "../../get-directories";
import { Locale } from "../../i18n-config";
import HeroSection from "@/ah/components/Home/HeroSection/HeroSection";
import WhyArt from "@/ah/components/Home/WhyArt/WhyArt";
import Benefits from "@/ah/components/Home/Benefits/Benefits";
import BenefitsOfRenting from "@/ah/components/Home/BenefitsOfRenting/BenefitsOfRenting";
import HowItWorks from "@/ah/components/Home/How/HowItWorks";
import AboutUs from "@/ah/components/Home/About/AboutUs";
import LatestArtwork from "@/ah/components/Home/Artwork/LatestArtwork";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { artworks, carouselItems } from "@/ah/utils/type";
import * as qs from "qs";
import { fetchData, fetchLatestProducts } from "@/ah/utils/fetch-helper";
import MediaSection from "@/ah/components/Home/Media/MediaSection";

type Props = {
  params: {
    lang: Locale;
  };
};

const IndexPage = async ({ params: { lang } }: Props) => {
  const dictionary = await getDictionary(lang);

  const data = await fetchLatestProducts(lang);

  const carouselItems: carouselItems = [];
  for (const item of data) {
    carouselItems.push({
      id: item.id,
      element: (
        <div key={item.id} className={`max-w-[300px]`}>
          <Link href={`/${lang}/gallery/products/${item.id}`}>
            <Image
              src={item.image.url}
              alt={item.name}
              width={item.image.width}
              height={item.image.height}
            />
            <h2 className={`text-2xl`}>{item.name}</h2>
          </Link>
        </div>
      ),
    });
  }

  return (
    <>
      <HeroSection dictionary={dictionary} />
      <WhyArt dictionary={dictionary} />
      <Benefits dictionary={dictionary} />
      <BenefitsOfRenting dictionary={dictionary} />
      <HowItWorks dictionary={dictionary} />
      <LatestArtwork dictionary={dictionary} carouselItems={carouselItems} />
      <AboutUs dictionary={dictionary} />
      <MediaSection dictionary={dictionary} />
    </>
  );
};
export default IndexPage;
