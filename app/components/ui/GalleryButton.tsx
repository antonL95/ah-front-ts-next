import Link from "next/link";
import React from "react";

type GalleryButtonProps = {
    close: () => void;
    dictionary: {
        galleryButton: string;
    };
    classStyles: string;
}
const GalleryButton = ({close, dictionary, classStyles}: GalleryButtonProps) => {
    return (
        <Link href="/gallery" onClick={close}
              className={`${classStyles} text-center font-roboto font-thin py-4 px-8 focus:outline-none mb-4 md:mb-0 md:mr-6`}>
            {dictionary.galleryButton}
        </Link>
    );
}

export default GalleryButton;
