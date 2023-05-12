'use client';

import React from 'react';
import Image from 'next/image';
import logoSrc from '@/ah/img/logo_white.svg';
import GalleryButton from "@/ah/components/ui/GalleryButton";
import ContactModalWithNavigationButton from "@/ah/components/ui/ContactModalWithNavigationButton";

type FooterProps = {
    dictionary: any;
}

const FooterSection = ({dictionary}: FooterProps) => {
    const handleClose = () => {
    }
    return (
        <div className={`bg-black`}>
            <section className={`container grid grid-cols-1 justify-center items-center pt-16 md:mx-auto md:flex md:flex-col md:justify-center md:w-5/12`}>
                <h1 className={`text-white text-center text-[2rem] md:text-5xl font-medium md:text-center md:mb-12 md:mt-28 2xl:whitespace-pre-line`}>
                    {dictionary.footer.headline}
                </h1>
                <article className={`text-gray-80 text-center text-[1rem] md:text-lg whitespace-pre-line md:mb-16`}>
                    {dictionary.footer.text}
                </article>
                <div className={`grid grid-cols-1 md:flex md:flex-row md:justify-between`}>
                    <ContactModalWithNavigationButton dictionary={dictionary} onClick={handleClose}
                                                      classStyles={`bg-white text-black border-white border hover:bg-black hover:text-white hover:border-white mt-8 mb-4 md:mt-0 md:mb-0 md:mr-5`}/>
                    <GalleryButton close={handleClose} dictionary={dictionary}
                                   classStyles={`bg-black text-white border border-white hover:bg-white hover:text-black md:mt-0 md:mb-0`}/>
                </div>
            </section>
            <div className={`container mx-auto pb-14 md:pb-16`}>
                <hr className={`h-px w-full border-b border-white border-opacity-20 mb-16 mt-24`}/>
                <Image src={logoSrc} alt={`logo`}/>
                <p className={`text-gray-80 text-xs mt-4`}>© {new Date().getFullYear()} {`Artist's hero`} </p>
            </div>
        </div>
    );
};

export default FooterSection;
