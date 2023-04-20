'use client';

import React from 'react';
import MobileMenu from './MobileMenu';

interface NavbarProps {
    dictionary: {
        galleryButton: string;
        contactButton: string;
    };
}

const NavigationBar: React.FC<NavbarProps> = ({dictionary}) => {
    return (
        <MobileMenu dictionary={dictionary} />
    );
};

export default NavigationBar;
