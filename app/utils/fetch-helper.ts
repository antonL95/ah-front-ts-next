import * as qs from "qs";
import {
  artist,
  artsists,
  artworks,
  detailArtwork,
  filters,
  image,
  singularFilter,
} from "@/ah/utils/type";
import { draftMode } from 'next/headers'

export const fetchData = async (
  endpoint: string,
  query: string,
  options = {}
) => {
  const res = await fetch(`${process.env.STRAPI_URL}/${endpoint}?${query}`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_KEY}`,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(
      `Unsuccessful request : ${process.env.STRAPI_URL}/${endpoint}?${query}`
    );
  }

  return res;
};

export const fetchArtistsWithProducts = async (lang: string) => {
  let publicationState = {}
  const { isEnabled } = draftMode()

  if (isEnabled) {
    publicationState = {
      publicationState: 'preview',
    }
  }
  const query = qs.stringify(
    {
      ...publicationState,
      populate: ["profileImage"],
      locale: [lang],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetchData("artists", query);

  const data = await res.json();

  const artists: artsists = [];
  for (const item of data.data) {
    const itemQuery = qs.stringify(
      {
        ...publicationState,
        populate: ["images"],
        locale: [lang],
        filters: {
          artist: {
            id: {
              $eq: item.id,
            },
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    const products: artworks = [];
    let productRes;
    try {
      productRes = await fetchData("products", itemQuery, {
        next: { revalidate: 0 },
      });
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
      products.push({
        id: product.id,
        image: {
          url: thumbnail.url,
          width: thumbnail.width,
          height: thumbnail.height,
        },
        name: itemAttr.name,
        href: product.id,
      });
    }

    const itemAttr = item.attributes;
    const thumbnail = itemAttr.profileImage.data.attributes.formats.thumbnail;

    artists.push({
      id: item.id,
      profileImageUrl: {
        url: thumbnail.url,
        width: thumbnail.width,
        height: thumbnail.height,
      },
      name: itemAttr.name,
      products: products,
      href: item.id,
    });
  }

  return artists;
};

export const fetchFiltersAndValues = async (lang: string) => {
  let publicationState = {}
  const { isEnabled } = draftMode()

  if (isEnabled) {
    publicationState = {
      publicationState: 'preview',
    }
  }
  const query = qs.stringify(
    {
      ...publicationState,
      populate: ["*"],
      pagination: {
        limit: 1000,
        start: 0,
      },
      locale: [lang],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetchData("filters", query);
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
    filters.push({
      type: item,
      values: filtersHelper[item],
    });
  }

  return filters;
};

export const fetchProduct = async (lang: string, id: number | string) => {
  let publicationState = {}
  const { isEnabled } = draftMode()

  console.log(isEnabled)

  if (isEnabled) {
    publicationState = {
      publicationState: 'preview',
    }
  }
  const query = qs.stringify(
    {
      ...publicationState,
      populate: ["images", "artist", "filters"],
      locale: [lang],
      filters: {
        id: {
          $eq: id,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetchData("products", query);
  const data = await res.json();
  const item = data.data[0];

  const imagesAtt = item.attributes.images;
  const filters: singularFilter[] = [];
  for (const filter of item.attributes.filters.data) {
    filters.push({
      type: filter.attributes.type,
      value: filter.attributes.value,
    });
  }
  const images: image[] = [];
  for (const image of imagesAtt.data) {
    images.push({
      url: image.attributes.formats.large.url,
      width: image.attributes.formats.large.width,
      height: image.attributes.formats.large.height,
    });
  }

  const product: detailArtwork = {
    id: item.id,
    name: item.attributes.name,
    description: item.attributes.description,
    images: images,
    artist: {
      id: item.attributes.artist.data.id,
      name: item.attributes.artist.data.attributes.name,
    },
    filters: filters,
  };

  return product;
};

export const fetchArtistWithProducts = async (
  lang: string,
  id: number | string,
  productId?: number | string,
  options?:any,
) => {
  let publicationState = {}
  const { isEnabled } = draftMode()

  if (isEnabled) {
    publicationState = {
      publicationState: 'preview',
    }
  }
  const query = qs.stringify(
    {
      ...publicationState,
      filters: {
        id: {
          $eq: id,
        },
      },
      populate: '*',
      locale: [lang],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetchData("artists", query, options);

  const data = await res.json();

  if (data.data.length <= 0) {
    return;
  }

  const item = data.data[0];

  type filter = {
    id?: any;
    artist: {
      id: {
        $eq: number | string;
      };
    };
  };

  let itemQueryFileter: filter = {
    artist: {
      id: {
        $eq: item.id,
      },
    },
  };

  if (productId) {
    itemQueryFileter = {
      ...itemQueryFileter,
      id: {
        $ne: productId,
      },
    };
  }

  const itemQuery = qs.stringify(
    {
      ...publicationState,
      populate: ["images"],
      locale: [lang],
      filters: itemQueryFileter,
    },
    {
      encodeValuesOnly: true,
    }
  );

  const products: artworks = [];
  let productRes;

  try {
    productRes = await fetchData("products", itemQuery);
  } catch (err) {
    return;
  }

  const productData = await productRes.json();

  if (productData.data.length <= 0) {
    return;
  }

  for (const product of productData.data) {
    const itemAttr = product.attributes;
    const thumbnail = itemAttr.images.data[0].attributes.formats.thumbnail;
    products.push({
      id: product.id,
      image: {
        url: thumbnail.url,
        width: thumbnail.width,
        height: thumbnail.height,
      },
      name: itemAttr.name,
      href: product.id,
    });
  }

  const artistAttr = item.attributes;
  const thumbnailProfile = artistAttr.profileImage.data.attributes.formats.thumbnail;
  const coverImage = artistAttr.coverImage.data.attributes.formats.large;
  const otherImages = [];
  if (artistAttr.otherImages.data !== null && artistAttr.otherImages.data.length > 0) {
    for (const image of artistAttr.otherImages.data) {
      otherImages.push({
        url: image.attributes.formats.large.url,
        width: image.attributes.formats.large.width,
        height: image.attributes.formats.large.height,
      });
    }
  }

  const artist: artist = {
    id: item.id,
    profileImageUrl: {
      url: thumbnailProfile.url,
      width: thumbnailProfile.width,
      height: thumbnailProfile.height,
    },
    coverImageUrl: {
      url: coverImage.url,
      width: coverImage.width,
      height: coverImage.height,
    },
    otherImages: otherImages,
    name: artistAttr.name,
    bio: artistAttr.bio,
    products: products,
    href: item.id,
  };

  return artist;
};
