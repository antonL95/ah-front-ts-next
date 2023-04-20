'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoSrc from '../../img/logo_black.svg';
import ContactModalWithNavigationButton from "@/ah/components/ContactModalWithNavigationButton";
import {useDisclosure} from "@mantine/hooks";
import hamburger from '../../img/hamburger.svg';
import cross from '../../img/cross.svg';

interface MobileMenuProps {
    dictionary: {
        galleryButton: string;
        contactButton: string;
    };
}

const MobileMenu: React.FC<MobileMenuProps> = ({dictionary}) => {
    const [opened, {toggle, close}] = useDisclosure(false);

    return (
        <nav className={`md:hidden bg-white shadow-md`}>
            <div>
                <div className={`flex justify-between p-4`}>
                    <div className={``}>
                        <Link href={`/`} onClick={close}>
                            <Image src={logoSrc} alt="artists hero logo" className="h-10 w-auto"/>
                        </Link>
                    </div>
                    <button className={'relative focus:outline-none'} style={{width: 24, height: 24}} onClick={toggle}>
                        <Image src={hamburger} alt={``}
                               className={`${opened ? 'opacity-0' : 'opacity-100'} absolute transition-opacity duration-300`}/>
                        <Image src={cross} alt={``}
                               className={`${opened ? 'opacity-100' : 'opacity-0'} absolute transition-opacity duration-300`}/>
                    </button>
                </div>
                <div className={`${opened ? 'block' : 'hidden'}`}>
                    <div className={`grid grid-cols-1 p-4`}>
                        <Link href="/gallery" onClick={close} className={`bg-black text-white text-center font-roboto font-thin py-4 px-8 hover:bg-white hover:text-black hover:border hover:border-black focus:outline-none mb-4`}>
                            {dictionary.galleryButton}
                        </Link>
                        <ContactModalWithNavigationButton dictionary={dictionary} onClick={close}/>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default MobileMenu;
