'use client';

import {artist} from "@/ah/utils/type";
import {Avatar} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

type props = {
    artist: artist
}
const GalleryRow = (props: props) => {
    return <div>
        <div className={`flex`}>
            <Avatar radius={"xl"} size={"lg"} src={props.artist.profileImageUrl}/>
            <Link href={`/gallery/artists/${props.artist.href}`}>
                <span className={`align-middle`}>{props.artist.name}</span>
            </Link>
        </div>
    </div>
}

export default GalleryRow;
