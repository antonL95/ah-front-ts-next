import {ReactElement} from "react";

type carouselItem = {
    id: string | number,
    element: ReactElement,
};

type carouselItems = carouselItem[];

type artwork = {
    image: {
        url: string,
        width: number,
        height: number,
    },
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
    href: string,
};

type artsists = artist[];

type filter = {
    type: string,
    values: string[],
}

type filters = filter[];

type ContactFormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
}
