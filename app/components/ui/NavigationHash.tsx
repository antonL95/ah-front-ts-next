import React from "react";
import Link from "next/link";

type Props = {
    close?: () => void;
    className?: string;
    dictionary: any;
}
const NavigationHash = (props: Props) => {
    return <>
        <div className={`grid grid-cols-1 ${props.className || ""}`}>
            <Link href={`/`} onClick={props.close} className={`py-2`}>{props.dictionary.navigation.intro}</Link>
            <Link href={`#why`} onClick={props.close} className={`py-2`}>{props.dictionary.navigation.why}</Link>
            <Link href={`#benefits`} onClick={props.close}
                  className={`py-2`}>{props.dictionary.navigation.benefits}</Link>
            <Link href={`#benefits-of-renting`} onClick={props.close}
                  className={`py-2`}>{props.dictionary.navigation.benefitsOfRenting}</Link>
            <Link href={`#how`} onClick={props.close} className={`py-2`}>{props.dictionary.navigation.how}</Link>
            <Link href={`#latest`} onClick={props.close} className={`py-2`}>{props.dictionary.navigation.latest}</Link>
            <Link href={`#about`} onClick={props.close} className={`py-2`}>{props.dictionary.navigation.about}</Link>
        </div>
    </>
}

export default NavigationHash;
