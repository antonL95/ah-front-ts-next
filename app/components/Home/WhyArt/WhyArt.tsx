"use client";

import Sections from "@/ah/components/ui/Sections";
import imgSrc from "@/ah/img/why_section.webp";
import Image from "next/image";
import SpoilerExtension from "@/ah/components/ui/SpoilerExtension";

type WhyArt = {
  dictionary: any;
};

const WhyArt = ({ dictionary }: WhyArt) => {
  return (
    <Sections classStyle={`bg-black text-white`} id={`why`}>
      <div
        className={`container mx-auto grid grid-cols-1 md:flex md:w-9/12 md:flex-col md:justify-between`}
      >
        <h2 className={`text-center text-5xl font-medium`}>
          {dictionary.whyArt.headline}
        </h2>
        <Image
          src={imgSrc}
          alt={dictionary.whyArt.headline}
          className={`mt-4 md:mt-20 md:self-center`}
        />
        <article
          className={`hidden whitespace-pre-line md:mt-16 md:block md:w-9/12`}
        >
          {dictionary.whyArt.content}
        </article>
        <SpoilerExtension
          content={dictionary.whyArt.content}
          className={`mt-4 grid grid-cols-1 justify-items-center self-center whitespace-pre-line md:hidden`}
          maxHeight={240}
          strokeColor={`white`}
        />
      </div>
    </Sections>
  );
};

export default WhyArt;
