'use client'

import {ReactElement} from "react";
import {Carousel} from '@mantine/carousel';
import {carouselItems} from "@/ah/utils/type";
import {useMediaQuery} from "@mantine/hooks";
import {useMantineTheme} from "@mantine/core";
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';

type items = carouselItems;

type props = {
    items: items,
}

const CarouselSlider = (props: props) => {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    return <Carousel
        slideSize="20%"
        height={350}
        align="start"
        slideGap="xs"
        controlsOffset="xs"
        dragFree
        styles={{
            control: {
                '&[data-inactive]': {
                    opacity: 0,
                    cursor: 'default',
                },
                backgroundColor: "#000",
                border: "1px solid #000"
            },
        }}
        slidesToScroll={mobile ? 1 : 2}
        nextControlIcon={<IconArrowRight size={16} className={`bg-black`} color={`#fff`}/>}
        previousControlIcon={<IconArrowLeft size={16} className={`bg-black`} color={`#fff`}/>}
    >
        {props.items.map((item) => {
            return <Carousel.Slide key={`${(new Date().getTime())}-${item.id}`}>{item.element}</Carousel.Slide>;
        })}
    </Carousel>;
}

export default CarouselSlider;
