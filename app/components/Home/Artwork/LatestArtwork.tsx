import React from "react";
import Sections from "@/ah/components/ui/Sections";
import Link from "next/link";
import Image from "next/image";
import CarouselSlider from "@/ah/components/ui/CarouselSlider";
import {carouselItems} from "@/ah/utils/type";

type artwork = {
    imageUrl: string,
    href: string,
    name: string,
    id: string | number
}
type artworks = artwork[];

type props = {
    dictionary: any,
};

async function getData() {
    const res = await fetch('https://api.artistshero.com/en/api/products')

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const data = await res.json();

    const returnData: artworks = [];

    for (const item of data) {
        const href = item["id_product"];
        returnData.push(
            {
                "id": item["id_product"],
                "imageUrl": item.image,
                "name": item.name,
                "href": href,
            },
        )
    }

    return returnData;
}

const LatestArtwork = async (props: props) => {

    const data: artworks = await getData();
    const carouselItems: carouselItems = [];

    for (const item of data) {
        carouselItems.push(
            {
                "id": item.id,
                "element": <Link href={`/gallery/products/${item.id}`} key={`${item.id}-link`}>
                    <div key={`${item.id}-div`}>
                        <Image src={item.imageUrl} alt={item.name} width={300} height={300} key={`${item.id}-image`}/>
                        <h2 key={`${item.id}-h2`} className={`text-center text-2xl`}>{item.name}</h2>
                    </div>
                </Link>,
            }
        )
    }

    return <>
        <Sections classStyle={`bg-white text-black`}>
            <>
                <div className={`container mx-auto`}>
                    <h2 className={`text-5xl font-medium`}>{props.dictionary.artworks.headline}</h2>
                    <div className={`md:pt-24`}>
                        <CarouselSlider items={carouselItems}/>
                    </div>
                </div>
            </>
        </Sections>
    </>
}

export default LatestArtwork;
