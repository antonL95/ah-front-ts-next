"use client";

import { Carousel } from "@mantine/carousel";
import { carouselItems } from "@/ah/utils/type";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";

type items = carouselItems;
type options = {
  slideSize?: string;
  align?: number | "start" | "center" | "end";
  slideGap?: string;
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
  height?: number|string;
  sx?: () => {};
};

type props = {
  items: items;
  addSx?: boolean;
  options?: options;
};

const CarouselSlider = (props: props) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  let options: options;

  if (props.options === undefined) {
    options = {
      slideSize: "20%",
      align: "start",
      slideGap: "xs",
      controlsOffset: "xs",
      dragFree: true,
      slidesToScroll: mobile ? 1 : 2,
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
        }
      },
      breakpoints: [
        { maxWidth: "md", slideSize: "50%" },
        { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
      ],
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

  return (
    <Carousel {...options}>
      {props.items.map((item) => {
        return (
          <Carousel.Slide
            key={`${new Date().getTime()}-${item.id}`}
            className={props.addSx ? `` : `flex justify-items-center`}
          >
            {item.element}
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default CarouselSlider;
