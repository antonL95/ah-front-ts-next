import * as qs from "qs";
import {artsists, artworks, filter, filters} from "@/ah/utils/type";

export const fetchData = async (endpoint: string, query: string, options = {}) => {
    const res = await fetch(
        `${process.env.STRAPI_URL}/${endpoint}?${query}`,
        {
            headers: {
                "Authorization": `Bearer ${process.env.STRAPI_KEY}`,
            },
            ...options,
        });

    if (!res.ok) {
        throw new Error(`Unsuccessful request : ${process.env.STRAPI_URL}/${endpoint}?${query}`)
    }

    return res;
}

export const fetchArtistsWithProducts = async (lang: string) => {
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

    const data = await res.json();
    const artists: artsists = [];
    for (const item of data.data) {
        const itemQuery = qs.stringify(
            {
                "populate": [
                    "images",
                ],
                "filters": {
                    artist: {
                        id: {
                            $eq: item.id,
                        },
                    },
                },
            },
            {
                encodeValuesOnly: true,
            },
        );

        const products: artworks = [];
        let productRes;
        try {
            productRes = await fetchData('products', itemQuery, {next: {revalidate: 0}});
        } catch (err) {
            continue;
        }

        const productData = await productRes.json();

        if (productData.data.length <= 0) {
            continue;
        }

        for (const product of productData.data) {
            const itemAttr = product.attributes;
            const thumbnail = itemAttr.images.data[0].attributes.formats.thumbnail;
            products.push(
                {
                    "id": product.id,
                    "image": {
                        url: thumbnail.url,
                        width: thumbnail.width,
                        height: thumbnail.height,
                    },
                    "name": itemAttr.name,
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

export const fetchFiltersAndValues = async (lang: string) => {
    const query = qs.stringify(
        {
            "populate": ["*"],
            "pagination": {
                limit: 1000,
                start: 0,
            },
            "locale": [lang],
        },
        {
            encodeValuesOnly: true,
        },
    );

    const res = await fetchData('filters', query);
    const data = await res.json();

    const filters: filters = [];
    const filtersHelper = [];
    for (const item of data.data) {
        const filterType = item.attributes.type;
        const filterValue = item.attributes.value;
        if (filtersHelper[filterType] !== undefined) {
            filtersHelper[filterType].push(filterValue);

            continue;
        }

        filtersHelper[filterType] = [filterValue];
    }

    for (const item in filtersHelper) {
        filters.push(
            {
                type: item,
                values: filtersHelper[item],
            },
        )
    }

    return filters;
}
