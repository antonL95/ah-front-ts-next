"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "@/ah/../i18n-config";
import eng from "@/ah/img/eng.png";
import cz from "@/ah/img/cz.png";
import Image from "next/image";
import { Dropdown } from "flowbite-react";

type LocaleSwitcherProps = {
  locale: "en" | "cs";
};
export default function LocaleSwitcher(props: LocaleSwitcherProps) {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) {
      return "/";
    }
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const imageToLocaleMapper = {
    en: {
      image: eng,
      alt: "English",
    },
    cs: {
      image: cz,
      alt: "Czech",
    },
  };

  return (
    <div className={`ml-4 flex`}>
      <Dropdown
        label={
          <Image
            src={imageToLocaleMapper[props.locale].image}
            alt={imageToLocaleMapper[props.locale].alt}
            className={`h-[24px] w-[24px]`}
          />
        }
        inline={true}
        className={`focus:outline-none`}
      >
        {i18n.locales.map((locale) => (
          <Dropdown.Item key={locale}>
            <Link href={redirectedPathName(locale)}>
              <Image
                src={imageToLocaleMapper[locale].image}
                alt={imageToLocaleMapper[locale].alt}
                className={`h-[24px] w-[24px]`}
              />
            </Link>
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
}
