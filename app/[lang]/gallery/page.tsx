import {getDictionary} from '@/ah/../get-directories';
import {Locale} from '@/ah/../i18n-config';
import * as qs from "qs";
import {fetchData} from "@/ah/utils/fetch-helper";
import {artsists, artwork, artworks} from "@/ah/utils/type";
import GalleryRow from "@/ah/components/ui/GalleryRow";

const getData = async () => {
    const query = qs.stringify(
        {
            "populate": [
                "profileImage",
            ],
        },
        {
            encodeValuesOnly: true,
        });
    const res = await fetchData('artists', query);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const data = await res.json();
    const artists: artsists = [];
    for (const item of data.data) {
        const itemQuery = qs.stringify(
            {
                "populate": [
                    "images",
                ],
                "filter": {
                    artist: {
                        $eq: item.id,
                    },
                },
            },
            {
                encodeValuesOnly: true,
            },
        );

        const productRes = await fetchData('products', itemQuery);

        if (!res.ok) {
            continue;
        }

        const productData = await productRes.json();
        const products: artworks = [];
        for (const product of productData.data) {
            const itemAttr = product.attributes;
            const thumbnail = itemAttr.images.data[0].attributes.formats.thumbnail;
            products.push(
                {
                    "id": product.id,
                    "imageUrl": thumbnail.url,
                    "name": product.name,
                    "href": product.id,
                },
            );
        }

        const itemAttr = item.attributes;
        const thumbnail = itemAttr.profileImage.data.attributes.formats.thumbnail;

        artists.push(
            {
                "id": item.id,
                "profileImageUrl": thumbnail.url,
                "name": itemAttr.name,
                "products": products,
                "href": item.id,
            },
        )
    }

    return artists;
}
export const runtime = 'edge';

const IndexPage = async ({params: {lang}}: { params: { lang: Locale } }) => {
    const dictionary = await getDictionary(lang);

    const data = await getData();

    return (
        <>
            {data.map(
                (artist) => {
                    return <div key={artist.id}>
                        <GalleryRow artist={artist} />
                    </div>;
                },
            )}
        </>
    );
}
export default IndexPage;
