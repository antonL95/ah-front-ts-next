import React from "react";
import Link from "next/link";

type Props = {
    close?: () => void;
    className?: string;
}
const NavigationHash = (props: Props) => {
    const handleClickScroll = (target: string, e: React.UIEvent) => {
        e.preventDefault();
        if (props.close) {
            props.close();
        }

        const element = document.getElementById(target);
        if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        }
    };
    return <>
        <div className={`grid grid-cols-1 ${props.className || ''}`}>
            <Link href={`#intro`} onClick={
                (e) => handleClickScroll('intro', e)}>Intro</Link>
            <Link href={`#why`} onClick={
                (e) => handleClickScroll('why', e)}>Why Art</Link>
        </div>
    </>
}

export default NavigationHash;
