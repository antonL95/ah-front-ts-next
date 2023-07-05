import React from "react";
import Sections from "@/ah/components/ui/Sections";
import Underline from "@/ah/components/ui/icon/underline";

type props = {
  dictionary: any;
};

type section = {
  headline: string;
  text: string;
  number: string;
  line: string;
};

const HowItWorks = (props: props) => {
  return (
    <>
      <Sections classStyle={`bg-white text-black`} id={`how`}>
        <>
          <h2 className={`text-5xl font-medium text-center`}>
            {props.dictionary.howItWorks.headline}
          </h2>
          <div className={`container mx-auto md:grid md:grid-cols-4 md:pt-24`}>
            {props.dictionary.howItWorks.sections.map((section: section) => {
              return (
                <div className={`md:px-1`} key={section.headline}>
                  <span
                    className={`pb-8 text-8xl font-urbanist font-thin flex`}
                  >
                    {section.number}
                    <span
                      className={`hidden md:flex md:justify-items-center md:align-middle`}
                    >
                      {section.line === "down" ? (
                        <Underline classNames={`rotate-180 ml-10 md:w-100`} />
                      ) : (
                        ""
                      )}
                      {section.line === "up" ? (
                        <Underline classNames={`ml-10 md:w-100`} />
                      ) : (
                        ""
                      )}
                    </span>
                  </span>
                  <h3 className={`pb-8 text-3xl font-medium md:pr-16`}>
                    {section.headline}
                  </h3>
                  <p className={`md:pr-20`}>{section.text}</p>
                </div>
              );
            })}
          </div>
        </>
      </Sections>
    </>
  );
};

export default HowItWorks;
