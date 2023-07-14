import React from "react";
import Link from "next/link";

type Props = {
  close?: () => void;
  className?: string;
  dictionary: any;
  lang: string;
};
const NavigationHash = (props: Props) => {
  return (
    <>
      <div className={`grid grid-cols-1 ${props.className || ""}`}>
        <Link href={`/${props.lang}/`} onClick={props.close} className={`py-2`}>
          {props.dictionary.navigation.intro}
        </Link>
        <Link href={`/${props.lang}/#why`} onClick={props.close} className={`py-2`}>
          {props.dictionary.navigation.why}
        </Link>
        <Link href={`/${props.lang}/#benefits`} onClick={props.close} className={`py-2`}>
          {props.dictionary.navigation.benefits}
        </Link>
        <Link
          href={`/${props.lang}/#benefits-of-renting`}
          onClick={props.close}
          className={`py-2`}
        >
          {props.dictionary.navigation.benefitsOfRenting}
        </Link>
        <Link href={`/${props.lang}/#how`} onClick={props.close} className={`py-2`}>
          {props.dictionary.navigation.how}
        </Link>
        <Link href={`/${props.lang}/#latest`} onClick={props.close} className={`py-2`}>
          {props.dictionary.navigation.latest}
        </Link>
        <Link href={`/${props.lang}/#about`} onClick={props.close} className={`py-2`}>
          {props.dictionary.navigation.about}
        </Link>
      </div>
    </>
  );
};

export default NavigationHash;
