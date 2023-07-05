import React from "react";
import Image from "next/image";
import logoSrc from "@/ah/img/logo_white.svg";
import GalleryButton from "@/ah/components/ui/GalleryButton";
import ContactModalWithNavigationButton from "@/ah/components/ui/ContactModalWithNavigationButton";
import marekImage from "@/ah/img/marek.webp";

type Props = {
  dictionary: any;
};
const FooterSection = ({ dictionary }: Props) => {
  return (
    <div className={`bg-black`}>
      <section
        className={`container grid grid-cols-1 justify-center items-center pt-16 md:mx-auto md:flex md:flex-col md:justify-center md:w-5/12`}
      >
        <h1
          className={`text-white text-center text-[2rem] md:text-5xl font-medium md:text-center md:mb-12 md:mt-28 2xl:whitespace-pre-line`}
        >
          {dictionary.footer.headline}
        </h1>
        <article
          className={`text-gray-80 text-center text-[1rem] md:text-lg whitespace-pre-line md:mb-16`}
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
            classStyles={`bg-black text-white border border-white hover:bg-white hover:text-black md:mt-0 md:mb-0`}
          />
        </div>
        <div>socials</div>
        <div className={`text-white`}>
          <h2 className={`text-3xl text-center p-2.5`}>
            <Image
              src={marekImage}
              alt={`ceo`}
              className={`mx-auto mb-10 w-6/12`}
            />
            Marek Jakúbek, Founder & CEO
          </h2>
          <p className={`md:grid md:grid-cols-2 flex flex-col`}>
            <span className={`text-center`}>
              <a
                href={`mailto:marek@artistshero.com`}
                className={`text-lg underline text-center w-full p-2.5`}
              >
                marek@artistshero.com
              </a>
            </span>
            <span className={`text-center`}>
              <a
                href={`tel:+421951121167`}
                className={`text-lg underline w-full p-2.5`}
              >
                +421 951 121 167
              </a>
            </span>
          </p>
        </div>
      </section>
      <div className={`container mx-auto pb-14 md:pb-16`}>
        <hr
          className={`h-px w-full border-b border-white border-opacity-20 mb-16 mt-24`}
        />
        <Image src={logoSrc} alt={`logo`} />
        <p className={`text-gray-80 text-xs mt-4`}>
          © {new Date().getFullYear()} {`Artist's hero`}{" "}
        </p>
      </div>
    </div>
  );
};

export default FooterSection;
