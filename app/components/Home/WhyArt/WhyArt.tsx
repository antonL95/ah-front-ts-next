'use client'

import Sections from "@/ah/components/ui/Sections";
import imgSrc from "@/ah/img/why_section.png";
import Image from "next/image";
import SpoilerExtension from "@/ah/components/ui/SpoilerExtension";

type WhyArt = {
    dictionary: any;
}

const WhyArt = ({dictionary}:WhyArt) => {
    return <Sections classStyle={`bg-black text-white`} id={`why`}>
        <div className={`container md:w-9/12 mx-auto grid grid-cols-1 md:flex md:flex-col md:justify-between`}>
            <h2 className={`text-5xl font-medium`}>
                {dictionary.whyArt.headline}
            </h2>
            <Image src={imgSrc} alt={dictionary.whyArt.headline} className={`mt-4 md:self-center md:mt-20`} />
            <article className={`hidden md:block whitespace-pre-line md:w-6/12 md:self-end md:mt-16`}>
                {dictionary.whyArt.content}
            </article>
            <SpoilerExtension
                content={dictionary.whyArt.content}
                className={`md:hidden whitespace-pre-line self-center justify-items-center grid grid-cols-1 mt-4`}
                maxHeight={240}
                strokeColor={`white`}/>
        </div>
    </Sections>
}

export default WhyArt;
