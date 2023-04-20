import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoSrc from '../../img/logo_white.svg';

interface NavbarProps {
    dictionary: {
        galleryButton: string;
        contactButton: string;
    };
}

const FooterSection = ({dictionary}: NavbarProps) => {
    return (
        <div className={`bg-black`}>
            <section>

            </section>
        </div>
    );
};

export default FooterSection;
