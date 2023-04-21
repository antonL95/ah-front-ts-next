'use client';

import React from 'react';
import {useDisclosure} from "@mantine/hooks";
import Link from "next/link";
import Image from "next/image";
import logo from "@/ah/img/logo_black.svg";
import menuIcon from "@/ah/img/hamburger.svg";
import crossIcon from "@/ah/img/cross.svg";
import ContactModalWithNavigationButton from "@/ah/components/Shared/ContactModalWithNavigationButton";
import GalleryButton from "@/ah/components/Shared/GalleryButton";

interface NavbarProps {
    dictionary: {
        galleryButton: string;
        contactButton: string;
    };
}

const NavigationBar: React.FC<NavbarProps> = ({dictionary}) => {
    const [opened, {toggle, close}] = useDisclosure(false);

    return (
        <nav className={`bg-white shadow-md`}>
            <div className={`md:flex md:justify-between p-4 md:container md:mx-auto`}>
                <div className={`flex justify-between items-center`}>
                    <div className={``}>
                        <Link href={`/`} onClick={close}>
                            <Image src={logo} alt="artists hero logo" className="h-10 w-auto"/>
                        </Link>
                    </div>
                    <button className={'relative focus:outline-none md:hidden'} style={{width: 24, height: 24}}
                            onClick={toggle}>
                        <Image src={menuIcon} alt={``}
                               className={`${opened ? 'opacity-0' : 'opacity-100'} absolute transition-opacity duration-300`}/>
                        <Image src={crossIcon} alt={``}
                               className={`${opened ? 'opacity-100' : 'opacity-0'} absolute transition-opacity duration-300`}/>
                    </button>
                </div>
                <div className={`${opened ? 'block' : 'hidden'} md:block`}>
                    <div className={`grid grid-cols-1 p-4 md:flex md:flex-row md:justify-between`}>
                        <GalleryButton close={close} dictionary={dictionary} classStyles={`bg-white text-black border-black border hover:bg-black hover:text-white`}/>
                        <ContactModalWithNavigationButton dictionary={dictionary} onClick={close} classStyles={`bg-black text-white border-black border hover:bg-white hover:text-black`}/>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
