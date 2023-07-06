"use client";

import Sections from "@/ah/components/ui/Sections";
import image1 from "@/ah/img/AH1.webp";
import image2 from "@/ah/img/AH2.webp";
import image3 from "@/ah/img/AH3.webp";
import image4 from "@/ah/img/AH4.webp";
import image5 from "@/ah/img/AH5.webp";
import image6 from "@/ah/img/AH6.webp";
import Image from "next/image";

type props = {
  dictionary: any;
};

type section = {
  headline: string;
  text: string;
};

const BenefitsOfRenting = (props: props) => {
  return (
    <Sections classStyle={`bg-black text-white`} id={`benefits-of-renting`}>
      <>
        <h2 className={`text-5xl font-medium text-center mb-3 md:mb-0`}>
          {props.dictionary.benefitsOfRentingArt.headline}
        </h2>
        <div
          className={`container md:w-9/12 mx-auto md:grid md:grid-cols-3 md:pt-24`}
        >
          {props.dictionary.benefitsOfRentingArt.sections.map(
            (section: section) => {
              return (
                <div className={`py-3 md:w-10/12`} key={section.headline}>
                  <h3 className={`pb-8 text-3xl`}>{section.headline}</h3>
                  <p>{section.text}</p>
                </div>
              );
            }
          )}
        </div>
      </>
    </Sections>
  );
};

export default BenefitsOfRenting;
