"use client";

import { Button, Card } from "flowbite-react";
import Image, { StaticImageData } from "next/image";
import media1 from "@/ah/img/media_1.webp";
import media2 from "@/ah/img/media_2.webp";
import media3 from "@/ah/img/media_3.webp";
import media4 from "@/ah/img/media_4.webp";
import media5 from "@/ah/img/media_5.webp";
import media6 from "@/ah/img/media_6.webp";
import media7 from "@/ah/img/media_7.webp";
import Sections from "@/ah/components/ui/Sections";
import React from "react";

type Props = {
  dictionary: any;
};

type CartProps = {
  name: string;
  image: StaticImageData;
  href: string;
  dictionary: any;
};

function MediaSection(props: Props) {
  const cards = [
    {
      name: "Firma může pomocí umění komunikovat své hodnoty",
      image: media1,
      href: "https://www.kancelare.cz/firma-muze-pomoci-umeni-komunikovat-sve-hodnoty-rika-zakladatel-artist-s-hero-marek-jakubek",
    },
    {
      name: "Netroufáte si umělecké dílo do kanceláře koupit? Pronajměte si jej",
      image: media2,
      href: "https://www.kancelare.cz/marek-jakubek-netroufate-si-umelecke-dilo-do-kancelare-koupit-pronajmete-si-jej",
    },
    {
      name: "Umění rozšiřuje obzory a umožňuje nám obklopit se umělcovou energií",
      image: media3,
      href: "https://www.kancelare.cz/umeni-rozsiruje-obzory-a-umoznuje-nam-obklopit-se-umelcovou-energii-rika-zakladatel-artist-s-hero-marek-jakubek",
    },
    {
      name: "Umění v kanceláři. Příklady z CAPEXu dokazují, že se vyplatí ho mít",
      image: media4,
      href: "https://www.capexus.cz/blog/umeni-v-kancelari-priklady-z-capexu-dokazuji-ze-se-vyplati-ho-mit",
    },
    {
      name: "Átrium projektu Kesselbauer oživí originálne umelecké dielo",
      image: media5,
      href: "https://www.kesselbauer.sk/sk/novinky/atrium-projektu-kesselbauer-ozivi-originalne-umelecke-dielo",
    },
    {
      name: "Vernisáž: Enjoy ART WORKS",
      image: media6,
      href: "https://www.capexus.cz/vernisaz-enjoy-art-works",
    },
    {
      name: "Umění nás nutí ke kritickému myšlení",
      image: media7,
      href: "https://open.spotify.com/episode/3JHFnGkyjvKK9IZmWxuXOZ?si=nPrGmX77Qdakazg14hQNow&nd=1",
    },
  ];

  return (
    <Sections classStyle={``}>
      <>
        <h2 className={`text-center text-5xl font-medium`}>
          {props.dictionary.media.headline}
        </h2>
        <div className="container mx-auto">
          <div className={`flex flex-row flex-wrap justify-around`}>
            {cards.map((card, index) => (
              <div key={index} className={`max-w-sm py-5`}>
                <CardWithDecorativeImage
                  name={card.name}
                  image={card.image}
                  dictionary={props.dictionary}
                  href={card.href}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    </Sections>
  );
}

function CardWithDecorativeImage(props: CartProps) {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <a href={props.href}>
        <Image
          src={props.image}
          alt={props.name}
          className={`h-[300px] object-cover object-top`}
        />
      </a>
      <div className="p-5">
        <div className={`h-36`}>
          <h5 className="mb-2 text-2xl font-medium text-gray-900 dark:text-white">
            {props.name}
          </h5>
        </div>
        <div className={`pb-5`}>
          <a
            href={props.href}
            className="mb-4 border border-black bg-white px-8 py-4 text-center font-roboto font-thin text-black hover:bg-black hover:text-white focus:outline-none md:mb-0 md:mr-6"
          >
            {props.dictionary.other.readMore}
          </a>
        </div>
      </div>
    </div>
  );
}

export default MediaSection;
