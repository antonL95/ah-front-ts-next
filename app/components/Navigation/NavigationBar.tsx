"use client";

import React from "react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import Image from "next/image";
import logo from "@/ah/img/logo_black.svg";
import menuIcon from "@/ah/img/hamburger.svg";
import crossIcon from "@/ah/img/cross.svg";
import ContactModalWithNavigationButton from "@/ah/components/ui/ContactModalWithNavigationButton";
import GalleryButton from "@/ah/components/ui/GalleryButton";
import NavigationHash from "@/ah/components/ui/NavigationHash";
import LocaleSwitcher from "@/ah/components/Navigation/LocaleSwitcher";

type NavbarProps = {
  dictionary: any;
  lang: "en" | "cs";
};

const NavigationBar = ({ dictionary, lang }: NavbarProps) => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <nav className={`bg-white shadow-md`}>
      <div className={`p-4 md:container md:mx-auto md:flex md:justify-between`}>
        <div className={`flex items-center justify-between`}>
          <div className={``}>
            <Link href={`/${lang}/`} onClick={close}>
              <Image
                src={logo}
                alt="artists hero logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>
          <button
            className={"relative w-[18px] focus:outline-none md:hidden"}
            onClick={toggle}
          >
            <Image
              src={menuIcon}
              alt={``}
              className={`${
                opened ? "opacity-0" : "opacity-100"
              } absolute top-0 transition-opacity duration-300`}
            />
            <Image
              src={crossIcon}
              alt={``}
              className={`${
                opened ? "opacity-100" : "opacity-0"
              } absolute top-0 transition-opacity duration-300`}
            />
          </button>
        </div>
        <div className={`${opened ? "block" : "hidden"} md:block`}>
          <div
            className={`grid grid-cols-1 p-4 md:flex md:flex-row md:justify-between`}
          >
            <NavigationHash
              close={close}
              lang={lang}
              className={`text-center md:hidden`}
              dictionary={dictionary}
            />
            <GalleryButton
              close={close}
              lang={lang}
              dictionary={dictionary}
              classStyles={`bg-white text-black border-black border hover:bg-black hover:text-white`}
            />
            <ContactModalWithNavigationButton
              dictionary={dictionary}
              onClick={close}
              classStyles={`bg-black text-white border-black border hover:bg-white hover:text-black`}
            />
            {/*<LocaleSwitcher locale={lang}/>*/}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
