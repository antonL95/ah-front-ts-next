import React, { ReactElement } from "react";
import Sections from "@/ah/components/ui/Sections";
import capexus from "@/ah/img/capexus.png";
import proxenta from "@/ah/img/proxenta.png";
import Link from "next/link";
import Image from "next/image";

type props = {
  dictionary: any;
};

type section = {
  headline: string;
  text: string;
  id: string;
};

const wroteAboutUs = [
  {
    imageUrl: capexus,
    alt: "capexus",
    href: "https://www.capexus.cz/udalosti/sila-umeni-v-modernim-pracovnim-prostredi",
  },
  {
    imageUrl: proxenta,
    alt: "proxenta",
    href: "https://www.kesselbauer.sk/sk/novinky/atrium-projektu-kesselbauer-ozivi-originalne-umelecke-dielo",
  },
];

const AboutUs = (props: props) => {
  const linksWroteAboutUs: ReactElement[] = [];

  for (const article of wroteAboutUs) {
    linksWroteAboutUs.push(
      <div key={article.alt} className={`my-16`}>
        <Link href={article.href} target={`_blank`}>
          <Image src={article.imageUrl} alt={article.alt} className={`w-auto max-h-[100px]`}/>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Sections classStyle={`bg-white text-black pt-0`} id={`about`}>
        <>
          <div className={`container mx-auto md:grid md:grid-cols-3`}>
            {props.dictionary.about.sections.map((section: section) => {
              return (
                <>
                  <div className={`py-3 md:px-1`} key={section.headline}>
                    <h3 className={`pb-3 text-3xl font-medium md:pr-16`}>
                      {section.headline}
                    </h3>
                    <p className={`whitespace-pre-line md:pr-20`}>
                      {section.text}
                    </p>
                    {section.id === "our_clients" ? (
                      <div>{linksWroteAboutUs}</div>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </>
      </Sections>
    </>
  );
};

export default AboutUs;
