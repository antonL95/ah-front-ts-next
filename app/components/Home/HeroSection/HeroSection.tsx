import React from "react";
import heroSectionSrc from "@/ah/img/hero_section.webp";
import Image from "next/image";
import Underline from "@/ah/components/ui/icon/underline";

type params = {
  dictionary: any;
};

const HeroSection = ({ dictionary }: params) => {
  return (
    <div className={`relative md:flex md:h-[730px]`} id={`intro`}>
      <Image
        src={heroSectionSrc}
        alt="hero section"
        className={`absolute right-0 top-0 hidden md:block z-[-1]`}
        priority
      />
      <div className={`container mx-auto`}>
        <section className={`mt-10 max-w-3xl md:mt-24`}>
          <h1
            className={`whitespace-pre-line text-[2rem] font-medium md:whitespace-normal md:text-7xl`}
          >
            {dictionary.heroSection.title}
          </h1>
          <h3 className={`mt-8 flex text-xl md:mt-12 md:text-2xl`}>
            <div
              className={`relative inline-block h-[33px] w-[155px] md:w-[226px]`}
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
            <div className={`relative inline-block`}>
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
