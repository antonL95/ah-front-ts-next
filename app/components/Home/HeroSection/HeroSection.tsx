"use client";
import React from 'react';
import heroSectionSrc from '@/ah/img/hero_section.png';
import Image from 'next/image';

type params = {
    dictionary: any;
}

const HeroSection = ({dictionary}: params) => {
    return (
        <div
            className={`md:flex md:bg-[url(./img/hero_section.png)] bg-no-repeat bg-right bg-blend-difference md:h-[730px]`} id={`intro`}>
            <div className={`container mx-auto`}>
                <section className={`max-w-3xl mt-10 md:mt-24`}>
                    <h1 className={`text-[2rem] md:text-7xl font-medium whitespace-pre-line md:whitespace-normal`}>
                        {dictionary.heroSection.title}
                    </h1>
                    <h3 className={`flex text-xl mt-8 md:text-2xl md:mt-12`}>
                        <div
                            className={`inline-block relative bg-[url(./img/underline.png)] bg-no-repeat bg-bottom h-[33px] w-[155px] md:w-[188px]`}>
                            <span className={`absolute animate-topToBottom opacity-0`}>
                                {dictionary.heroSection.subtitle1}
                            </span>
                            <span className={`absolute animate-topToBottom opacity-0`} style={{animationDelay: '5s'}}>
                                {dictionary.heroSection.subtitle2}
                            </span>
                            <span className={`absolute animate-topToBottom opacity-0`} style={{animationDelay: '10s'}}>
                                {dictionary.heroSection.subtitle3}
                            </span>
                        </div>
                        {` `}
                        <div className={`inline-block relative`}>
                            {dictionary.heroSection.subtitle}
                        </div>
                    </h3>
                </section>
                <section className={`md:hidden`}>
                    <Image src={heroSectionSrc} alt="hero section"/>
                </section>
                <section className={`max-w-xl mt-1`}>
                    <div className={`grid grid-cols-2`}>
                        <div>first partner</div>
                        <div>first partner</div>
                        <div>first partner</div>
                        <div>first partner</div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default HeroSection;
