"use client";

import { Carousel } from "@mantine/carousel";
import { carouselItems } from "@/ah/utils/type";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { isMobile } from "react-device-detect";

type items = carouselItems;
type options = {
  slideSize?: string;
  align?: number | "start" | "center" | "end";
  slideGap?: string | number;
  controlsOffset?: string;
  dragFree?: boolean;
  slidesToScroll?: number;
  nextControlIcon?: React.ReactNode;
  previousControlIcon?: React.ReactNode;
  styles?: any;
  breakpoints?: {
    maxWidth: string;
    slideSize: string;
    slideGap?: number;
  }[];
  mx?: string;
  maw?: number;
  mah?: number;
  height?: number | string;
  sx?: () => {};
};

type props = {
  items: items;
  addSx?: boolean;
  options?: options;
};

const CarouselSlider = (props: props) => {
  let options: options;

  if (props.options === undefined) {
    options = {
      slideSize: "20%",
      slideGap: "md",
      align: "start",
      controlsOffset: "xs",
      dragFree: true,
      slidesToScroll: isMobile ? 1 : 5,
      nextControlIcon: (
        <IconArrowRight size={16} className={`bg-black`} color={`#fff`} />
      ),
      previousControlIcon: (
        <IconArrowLeft size={16} className={`bg-black`} color={`#fff`} />
      ),
      styles: {
        control: {
          "&[data-inactive]": {
            opacity: 0,
            cursor: "default",
          },
          backgroundColor: "#000",
          border: "1px solid #000",
        },
      },
      breakpoints: [{ maxWidth: "sm", slideSize: "100%", slideGap: 0 }],
    };
  } else {
    options = props.options;
    if (props.addSx) {
      options.sx = () => ({
        height: 300,
        "@media (min-width: 62em)": {
          height: 600,
        },
      });
    }
  }

  const slides = props.items.map((item) => {
    return <Carousel.Slide key={item.id}>{item.element}</Carousel.Slide>;
  });

  return <Carousel {...options}>{slides}</Carousel>;
};

export default CarouselSlider;
