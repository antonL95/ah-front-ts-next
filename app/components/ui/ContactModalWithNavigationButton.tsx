'use client';

import React from 'react';
import {useDisclosure} from '@mantine/hooks';
import {Modal} from '@mantine/core';
import contactSrc from '../../img/contact_image.webp';
import Image from 'next/image';
import ContactForm from "@/ah/components/ui/ContactForm";
import Portal from "@/ah/components/ui/Portal";

type ContactButtonProps = {
    dictionary: any;
    onClick?: () => void;
    classStyles: string;
}

const ContactModalWithNavigationButton = ({dictionary, onClick = undefined, classStyles}: ContactButtonProps) => {

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
                        <section className={`md:ml-12 md:mr-14`}>
                            <h1 className="font-urbanist font-thin text-center text-3xl mb-8 mx-12 md:my-9 md:text-5xl">Contact
                                Us</h1>
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
                className={`${classStyles} font-roboto font-thin py-4 px-8 border border-black focus:outline-none`}
            >
                {dictionary.contactButton}
            </button>
        </>
    );
};

export default ContactModalWithNavigationButton;
