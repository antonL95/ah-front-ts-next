'use client'

import Sections from "@/ah/components/ui/Sections";

type props = {
    dictionary: any;
}

type section = {
    headline: string;
    text: string;
}

const BenefitsOfRenting = (props: props) => {
    return <Sections classStyle={`bg-black text-white`} id={`benefits-of-renting`}>
        <>
            <h2 className={`text-4xl text-center`}>
                {props.dictionary.benefitsOfRentingArt.headline}
            </h2>
            <div className={`container md:w-9/12 mx-auto md:grid md:grid-cols-3 md:pt-48`}>
                {
                    props.dictionary.benefitsOfRentingArt.sections.map((section: section) => {
                        return (
                            <div className={`md:w-10/12`} key={section.headline}>
                                <h3 className={`pb-8 text-3xl`}>{section.headline}</h3>
                                <p>{section.text}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    </Sections>
}

export default BenefitsOfRenting;
