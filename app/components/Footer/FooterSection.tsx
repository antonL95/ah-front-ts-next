import React from "react";
import Image from "next/image";
import logoSrc from "@/ah/img/logo_white.svg";
import GalleryButton from "@/ah/components/ui/GalleryButton";
import ContactModalWithNavigationButton from "@/ah/components/ui/ContactModalWithNavigationButton";
import marekImage from "@/ah/img/marek.webp";

type Props = {
  dictionary: any;
  lang: string,
};
const FooterSection = ({ dictionary, lang }: Props) => {
  return (
    <div className={`bg-black`}>
      <section
        className={`container grid grid-cols-1 items-center justify-center pt-16 md:mx-auto md:flex md:w-5/12 md:flex-col md:justify-center`}
      >
        <h2
          className={`text-center text-[2rem] font-medium text-white md:mb-12 md:mt-28 md:text-center md:text-5xl 2xl:whitespace-pre-line`}
        >
          {dictionary.footer.headline}
        </h2>
        <article
          className={`whitespace-pre-line text-center text-[1rem] text-gray-80 md:mb-16 md:text-lg`}
        >
          {dictionary.footer.text}
        </article>
        <div
          className={`grid grid-cols-1 md:flex md:flex-row md:justify-between`}
        >
          <ContactModalWithNavigationButton
            dictionary={dictionary}
            classStyles={`bg-white text-black border-white border hover:bg-black hover:text-white hover:border-white mt-8 mb-4 md:mt-0 md:mb-0 md:mr-5`}
          />
          <GalleryButton
            dictionary={dictionary}
            lang={lang}
            classStyles={`bg-black text-white border border-white hover:bg-white hover:text-black md:mt-0 md:mb-0`}
          />
        </div>
        {/*<div>socials</div>*/}
        <div className={`text-white`}>
          <h2 className={`p-2.5 text-center text-3xl`}>
            <Image
              src={marekImage}
              alt={`ceo`}
              className={`mx-auto mb-10 w-6/12`}
            />
            Marek Jakúbek, Founder & CEO
          </h2>
          <p className={`flex flex-col md:grid md:grid-cols-2`}>
            <span className={`text-center`}>
              <a
                href={`mailto:marek@artistshero.com`}
                className={`w-full p-2.5 text-center text-lg underline`}
              >
                marek@artistshero.com
              </a>
            </span>
            <span className={`text-center`}>
              <a
                href={`tel:+421951121167`}
                className={`w-full p-2.5 text-lg underline`}
              >
                +421 951 121 167
              </a>
            </span>
          </p>
        </div>
      </section>
      <div className={`container mx-auto pb-14 md:pb-16`}>
        <hr
          className={`mb-16 mt-24 h-px w-full border-b border-white border-opacity-20`}
        />
        <Image src={logoSrc} alt={`logo`} />
        <p className={`mt-4 text-xs text-gray-80`}>
          © {new Date().getFullYear()} {`Artist's hero`}{" "}
        </p>
      </div>
    </div>
  );
};

export default FooterSection;
