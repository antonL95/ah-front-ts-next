'use client';

import {artist, carouselItems} from "@/ah/utils/type";
import {Avatar} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CarouselSlider from "@/ah/components/ui/CarouselSlider";

type props = {
    artist: artist
}
const GalleryRow = (props: props) => {
    const carouselItems: carouselItems = [];

    if (props.artist.products !== undefined) {
        for (const item of props.artist.products) {
            carouselItems.push(
                {
                    "id": item.id,
                    "element": <Link href={`/gallery/products/${item.id}`} key={`${item.id}-link`}>
                        <div key={`${item.id}-div`}>
                            <Image src={item.imageUrl} alt={item.name} height={300} width={300}
                                   className={`object-cover`}
                                   key={`${item.id}-image`}/>
                            <h2 key={`${item.id}-h2`} className={``}>{item.name}</h2>
                        </div>
                    </Link>,
                },
            )
        }
    }
    return <div>
        <div className={`flex`}>
            <Avatar radius={"xl"} size={"lg"} src={props.artist.profileImageUrl}/>
            <Link href={`/gallery/artists/${props.artist.href}`}>
                <span className={`align-middle`}>{props.artist.name}</span>
            </Link>
        </div>
        <div>
            <CarouselSlider items={carouselItems}/>
        </div>
    </div>
}

export default GalleryRow;
