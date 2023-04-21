'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoSrc from '../../img/logo_white.svg';
import GalleryButton from "@/ah/components/Shared/GalleryButton";
import ContactModalWithNavigationButton from "@/ah/components/Shared/ContactModalWithNavigationButton";

interface NavbarProps {
    dictionary: {
        galleryButton: string;
        contactButton: string;
        footer: {
            headline: string;
            text: string;
        };
    };
}

const FooterSection = ({dictionary}: NavbarProps) => {
    const handleClose = () => {}
    return (
        <div className={`bg-black`}>
            <section className={`container grid grid-cols-1 justify-center items-center pt-16`}>
                <h1 className={`text-white text-center text-[2rem] md:text-7xl font-medium`}>
                    {dictionary.footer.headline}
                </h1>
                <article className={`text-gray-80 text-center text-[1rem] md:text-3xl whitespace-pre-line`}>
                    {dictionary.footer.text}
                </article>
                <div className={`grid grid-cols-1`}>
                    <ContactModalWithNavigationButton dictionary={dictionary} onClick={handleClose} classStyles={`bg-white text-black border-white border hover:bg-black hover:text-white hover:border-black mt-8 mb-4`}/>
                    <GalleryButton close={handleClose} dictionary={dictionary} classStyles={`bg-black text-white border border-white hover:bg-white hover:text-black`}/>
                </div>
                <hr className={`h-px w-full bg-white`}/>

            </section>
        </div>
    );
};

export default FooterSection;
