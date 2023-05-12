import React from "react";
import Link from "next/link";

type Props = {
    close?: () => void;
    className?: string;
}
const NavigationHash = (props: Props) => {
    return <>
        <div className={`grid grid-cols-1 ${props.className || ''}`}>
            <Link href={`#intro`} onClick={props.close}>Intro</Link>
            <Link href={`#why`} onClick={props.close}>Why Art</Link>
        </div>
    </>
}

export default NavigationHash;
