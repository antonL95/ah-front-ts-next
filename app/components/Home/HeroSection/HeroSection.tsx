import React from "react";
import heroSectionSrc from "@/ah/img/hero_section.webp";
import Image from "next/image";
import Underline from "@/ah/components/ui/icon/underline";

type params = {
  dictionary: any;
};

const HeroSection = ({ dictionary }: params) => {
  return (
    <div className={`md:flex relative md:h-[730px]`} id={`intro`}>
      <Image
        src={heroSectionSrc}
        alt="hero section"
        className={`hidden md:block absolute top-0 right-0`}
        priority
      />
      <div className={`container mx-auto`}>
        <section className={`max-w-3xl mt-10 md:mt-24`}>
          <h1
            className={`text-[2rem] md:text-7xl font-medium whitespace-pre-line md:whitespace-normal`}
          >
            {dictionary.heroSection.title}
          </h1>
          <h3 className={`flex text-xl mt-8 md:text-2xl md:mt-12`}>
            <div
              className={`inline-block relative h-[33px] w-[155px] md:w-[188px]`}
            >
              <span className={`absolute animate-topToBottom opacity-0`}>
                {dictionary.heroSection.subtitle1}
              </span>
              <span
                className={`absolute animate-topToBottom opacity-0`}
                style={{ animationDelay: "5s" }}
              >
                {dictionary.heroSection.subtitle2}
              </span>
              <span
                className={`absolute animate-topToBottom opacity-0`}
                style={{ animationDelay: "10s" }}
              >
                {dictionary.heroSection.subtitle3}
              </span>
              <span className={`absolute bottom-0 md:bottom-[-3px]`}>
                <Underline />
              </span>
            </div>
            {` `}
            <div className={`inline-block relative`}>
              {dictionary.heroSection.subtitle}
            </div>
          </h3>
        </section>
        <section className={`md:hidden`}>
          <Image src={heroSectionSrc} alt="hero section" priority />
        </section>
      </div>
    </div>
  );
};

export default HeroSection;
