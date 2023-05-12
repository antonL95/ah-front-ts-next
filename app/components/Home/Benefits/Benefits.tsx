'use client';
import React, {ReactElement, useId} from "react";
import Sections from "@/ah/components/ui/Sections";
import SpoilerExtension from "@/ah/components/ui/SpoilerExtension";
import Creativity from "@/ah/components/ui/icon/creativity";
import Branding from "@/ah/components/ui/icon/branding";
import Wellbeing from "@/ah/components/ui/icon/wellbeing";
import Csr from "@/ah/components/ui/icon/csr";

type Benefits = {
    dictionary: any,
};


const Benefits = ({dictionary}: Benefits) => {
    const sections: ReactElement[] = [];

    const choseIcon = (key: string) => {
        switch (key) {
            case 'branding':
                return <Branding/>
            case 'wellbeing':
                return <Wellbeing/>
            case 'csr':
                return <Csr/>
            default:
                return <Creativity/>
        }
    }

    const chosePercantage = (key: string) => {
        switch (key) {
            case 'branding':
                return '75'
            case 'wellbeing':
                return '94'
            case 'creativity':
                return '61'
            default:
                return ''
        }
    }

    for (const section of Object.entries(dictionary.benefits)) {
        const key: string = section[0];
        const value: any = section[1];

        sections.push(
            <div className={``} key={key}>
                <h2 className={`flex flex-row text-2xl`}>
                    {choseIcon(key)} {value.headline}
                </h2>
                <h3 className={`text-6xl text-black font-extralight font-urbanist`}>
                    {chosePercantage(key)}<span className={`text-3xl font-extralight`}> %</span>
                </h3>
                <p className={`text-lg text-gray-60 mb-8 mt-2`}>
                    {value.subheadline}
                </p>
                <SpoilerExtension
                    className={`grid grid-cols-1 justify-items-center`}
                    maxHeight={240}
                    strokeColor={`black`}
                    content={value.content}
                />
            </div>
        )
    }


    return <>
        <Sections classStyle={`bg-white text-black`}>
            <div className={`container mx-auto`}>
                {sections}
            </div>
        </Sections>
    </>
}

export default Benefits;
