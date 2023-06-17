import {getDictionary} from '../../get-directories'
import {Locale} from '../../i18n-config'
import HeroSection from '@/ah/components/Home/HeroSection/HeroSection'
import WhyArt from "@/ah/components/Home/WhyArt/WhyArt";
import Benefits from "@/ah/components/Home/Benefits/Benefits";
import BenefitsOfRenting from "@/ah/components/Home/BenefitsOfRenting/BenefitsOfRenting";
import HowItWorks from "@/ah/components/Home/How/HowItWorks";
import AboutUs from "@/ah/components/Home/About/AboutUs";
import LatestArtwork from "@/ah/components/Home/Artwork/LatestArtwork";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import {carouselItems} from "@/ah/utils/type";

type Props = {
    params: {
        lang: Locale,
    }
}
export const runtime = 'edge';

type artwork = {
    imageUrl: string,
    href: string,
    name: string,
    id: string | number
}
type artworks = artwork[];

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

const IndexPage = async ({params: {lang}}: Props) => {
    const dictionary = await getDictionary(lang)



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

    return (
        <>
            <HeroSection dictionary={dictionary}/>
            <WhyArt dictionary={dictionary}/>
            <Benefits dictionary={dictionary}/>
            <BenefitsOfRenting dictionary={dictionary}/>
            <HowItWorks dictionary={dictionary}/>
            <LatestArtwork dictionary={dictionary} carouselItems={carouselItems}/>
            <AboutUs dictionary={dictionary}/>
        </>
    )
}
export default IndexPage;

