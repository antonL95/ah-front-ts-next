import {ReactElement} from "react";

type carouselItem = {
    id: string | number,
    element: ReactElement,
};

type carouselItems = carouselItem[];

type artwork = {
    imageUrl: string,
    href: string,
    name: string,
    id: string | number
}

type artworks = artwork[];

type artist = {
    id: string|number,
    name: string,
    profileImageUrl: string,
    products: artwork[],
};

type artsists = artist[];
