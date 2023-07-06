'use client';

import { Avatar } from "@mantine/core";

type props = {
  radius: string;
  size: string;
  src: string;
  alt: string;
}
export const AvatarWrapper = (props: any) => {
  return (<Avatar radius={props.radius} size={props.size} src={props.src} alt={props.alt}/>)
}
