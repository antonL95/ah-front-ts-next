'use client'

import React from "react";
import Sections from "@/ah/components/ui/Sections";
import CarouselSlider from "@/ah/components/ui/CarouselSlider";
import {carouselItems} from "@/ah/utils/type";

type props = {
    dictionary: any,
    carouselItems: carouselItems
};

const LatestArtwork = (props: props) => {
    return <>
        <Sections classStyle={`bg-white text-black py-0`} id={`latest`}>
            <>
                <div className={`container mx-auto`}>
                    <h2 className={`text-5xl font-medium`}>{props.dictionary.artworks.headline}</h2>
                    <div className={`md:pt-24`}>
                        <CarouselSlider items={props.carouselItems}/>
                    </div>
                </div>
            </>
        </Sections>
    </>
}

export default LatestArtwork;
