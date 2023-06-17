import React, {ReactElement} from "react";
import Sections from "@/ah/components/ui/Sections";
import capexus from "@/ah/img/capexus.webp"
import Link from "next/link";
import Image from "next/image";

type props = {
    dictionary: any,
};

type section = {
    headline: string;
    text: string;
    id: string;
}

const wroteAboutUs = [
    {
        "imageUrl": capexus,
        "alt": "capexus",
        "href": "https://www.capexus.cz/udalosti/sila-umeni-v-modernim-pracovnim-prostredi",
    },
];

const AboutUs = (props: props) => {

    const linksWroteAboutUs: ReactElement[] = [];

    for (const article of wroteAboutUs) {
        linksWroteAboutUs.push(
            <div key={article.alt}>
                <Link href={article.href} target={`_blank`}>
                    <Image src={article.imageUrl} alt={article.alt}/>
                </Link>
            </div>,
        );
    }

    return <>
        <Sections classStyle={`bg-white text-black`}>
            <>
                <div className={`container mx-auto md:grid md:grid-cols-3`}>
                    {
                        props.dictionary.about.sections.map((section: section) => {
                            return (
                                <>
                                    <div className={`md:px-1`} key={section.headline}>
                                        <h3 className={`pb-8 text-3xl font-medium md:pr-16`}>{section.headline}</h3>
                                        <p className={`md:pr-20 whitespace-pre-line`}>{section.text}</p>
                                        {
                                            section.id === "wrote_about_us"
                                            ? <div>{linksWroteAboutUs}</div>
                                            : ""
                                        }
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </>
        </Sections>
    </>
}

export default AboutUs;
