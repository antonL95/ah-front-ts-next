'use client';

import React from 'react';
import {useDisclosure} from '@mantine/hooks';
import {Modal} from '@mantine/core';
import contactSrc from '../img/contact_image.png';
import Image from 'next/image';
import ContactForm from "@/ah/components/ContactForm";
import Portal from "@/ah/components/Portal";

interface ContactButtonProps {
    dictionary: {
        contactButton: string;
    }
    onClick?: () => void;
}

const ContactModalWithNavigationButton: React.FC<ContactButtonProps> = ({dictionary, onClick}) => {

    const [opened, {open, close}] = useDisclosure(false);

    const handleOnClick = () => {
        open();
        if (onClick) {
            onClick();
        }
    }

    return (
        <>
            <Portal>
                <Modal opened={opened} onClose={close} centered size={`auto`} withCloseButton={false}>
                    <div className={`grid grid-cols-1 lg:grid-cols-2`}>
                        <section className={`ml-12 mr-14`}>
                            <h1 className="text-5xl font-urbanist font-thin text-center my-9 mx-12">Contact Us</h1>
                            <ContactForm/>
                        </section>
                        <section className={`hidden lg:block`}>
                            <Image src={contactSrc} alt="contact image"/>
                        </section>
                    </div>
                </Modal>
            </Portal>

            <button
                onClick={handleOnClick}
                className="bg-white text-black font-roboto font-thin py-4 px-8 border border-black hover:bg-black hover:text-white focus:outline-none"
            >
                {dictionary.contactButton}
            </button>
        </>
    );
};

export default ContactModalWithNavigationButton;
