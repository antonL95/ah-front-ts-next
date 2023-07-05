"use client";

import React, { ReactElement } from "react";
import Sections from "@/ah/components/ui/Sections";
import SpoilerExtension from "@/ah/components/ui/SpoilerExtension";
import Creativity from "@/ah/components/ui/icon/creativity";
import Branding from "@/ah/components/ui/icon/branding";
import Wellbeing from "@/ah/components/ui/icon/wellbeing";
import Csr from "@/ah/components/ui/icon/csr";
import benefitImage1 from "@/ah/img/benefits_1.webp";
import benefitImage2 from "@/ah/img/benefits_2.webp";
import Image from "next/image";

type Benefits = {
  dictionary: any;
};

const Benefits = ({ dictionary }: Benefits) => {
  const sections: ReactElement[] = [];

  const choseIcon = (key: string) => {
    switch (key) {
      case "identity":
        return <Branding key={`${key}-${new Date().getTime()}-svg1`} />;
      case "wellbeing":
        return <Wellbeing key={`${key}-${new Date().getTime()}-svg2`} />;
      case "csr":
        return <Csr key={`${key}-${new Date().getTime()}-svg3`} />;
      default:
        return <Creativity key={`${key}-${new Date().getTime()}-svg4`} />;
    }
  };

  for (const section of Object.entries(dictionary.benefits)) {
    const key: string = section[0];
    const value: any = section[1];

    sections.push(
      <React.Fragment key={`${key}-${new Date().getTime()}-wrapper`}>
        {key === "identity" ? (
          <Image
            key={`${key}-${new Date().getTime()}-image1`}
            src={benefitImage1}
            alt={key}
            className={`mt-16 md:mt-20`}
          />
        ) : (
          ""
        )}
        <div className={`flex mt-16 md:mt-20 md:w-8/12`}>
          <div className={`pl-2 md:pl-0 w-[32px]`}>{choseIcon(key)}</div>
          <div className={`px-5`} key={`${key}-${new Date().getTime()}-div`}>
            <h2
              className={`flex flex-row text-2xl`}
              key={`${key}-${new Date().getTime()}-h2`}
            >
              {value.headline}
            </h2>
            {value.percentage !== "" ? (
              <h3
                className={`text-6xl text-black font-extralight font-urbanist`}
                key={`${key}-${new Date().getTime()}-h3`}
              >
                {value.percentage}
                <span
                  className={`text-3xl font-extralight`}
                  key={`${key}-${new Date().getTime()}-span`}
                >
                  {" "}
                  %
                </span>
              </h3>
            ) : (
              ""
            )}
            {value.subheadline !== "" ? (
              <p
                className={`text-lg text-gray-60 mb-8 mt-2`}
                key={`${key}-${new Date().getTime()}-p1`}
              >
                {value.subheadline}
              </p>
            ) : (
              ""
            )}
            <SpoilerExtension
              className={`grid grid-cols-1 justify-items-center md:justify-items-start`}
              maxHeight={240}
              strokeColor={`black`}
              content={value.content}
              key={`${key}-${new Date().getTime()}-spoiler`}
            />
          </div>
        </div>
        {key === "csr" ? (
          <Image
            key={`${key}-${new Date().getTime()}-image2`}
            src={benefitImage2}
            alt={key}
            className={`mt-16 md:mt-20`}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }

  return (
    <>
      <Sections classStyle={`bg-white text-black md:pt-0`} id={`benefits`}>
        <div
          className={`grid grid-cols-1 mx-auto md:grid-cols-2 md:justify-items-center`}
        >
          {sections}
        </div>
      </Sections>
    </>
  );
};

export default Benefits;
