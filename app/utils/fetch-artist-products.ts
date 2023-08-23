import { isDraftModeTrue } from "@/ah/utils/draft-mode";
import qs from "qs";
import { artist, artworks } from "@/ah/utils/type";
import { fetchData } from "@/ah/utils/fetch-helper";

export const fetchArtistWithProducts = async (
  lang: string,
  id: number | string,
  areProductsNeeded: boolean,
  productId?: number | string,
  options?: any
) => {
  let publicationState = {};
  const isEnabled = isDraftModeTrue();

  if (isEnabled) {
    publicationState = {
      publicationState: "preview",
    };
  }
  const query = qs.stringify(
    {
      ...publicationState,
      filters: {
        id: {
          $eq: id,
        },
      },
      populate: "*",
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

  if (productData.data.length <= 0 && areProductsNeeded) {
    return;
  }

  if (productData.data.length > 0) {
    for (const product of productData.data) {
      const itemAttr = product.attributes;
      const medium = itemAttr.images.data[0].attributes.formats.medium === null
                     ? itemAttr.images.data[0].attributes
                     : itemAttr.images.data[0].attributes.formats.medium;
      products.push({
        id: product.id,
        image: {
          url: medium.url,
          width: medium.width,
          height: medium.height,
        },
        name: itemAttr.name,
        href: product.id,
      });
    }
  }

  const artistAttr = item.attributes;
  const thumbnailProfile =
    artistAttr.profileImage.data.attributes.formats.thumbnail;
  const coverImage =
    artistAttr.coverImage.data.attributes.formats.medium === null
      ? artistAttr.coverImage.data.attributes
      : artistAttr.coverImage.data.attributes.formats.medium;
  const otherImages = [];
  if (
    artistAttr.otherImages.data !== null &&
    artistAttr.otherImages.data.length > 0
  ) {
    for (const image of artistAttr.otherImages.data) {
      otherImages.push({
        url: image.attributes.url,
        width: image.attributes.width,
        height: image.attributes.height,
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
