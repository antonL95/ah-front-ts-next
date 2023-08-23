import { isDraftModeTrue } from "@/ah/utils/draft-mode";
import qs from "qs";
import { artsists } from "@/ah/utils/type";
import { fetchData } from "@/ah/utils/fetch-helper";

export const fetchArtistsWithProducts = async (
  lang: string,
  artistName?: string,
  options?: any
) => {
  let publicationState = {};
  let filters = {};
  const isEnabled = isDraftModeTrue();

  if (isEnabled) {
    publicationState = {
      publicationState: "preview",
    };
  }

  if (artistName !== undefined) {
    filters = {
      filters: {
        artist: {
          name: {
            $eq: artistName,
          },
        },
      },
    };
  }

  const query = qs.stringify(
    {
      ...publicationState,
      populate: {
        artist: {
          populate: {
            profileImage: true,
          },
        },
        images: true,
        filters: {
          populate: {
            id: true,
          },
        },
      },
      locale: [lang],
      pagination: {
        pageSize: 1000,
        page: 1,
      },
      ...filters,
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetchData("products", query, options);
  const data = await res.json();

  let artistsHelper = [];
  for (const item of data.data) {

    if (item.attributes.artist.data === null) {
      continue;
    }

    try {
      const itemAttr = item.attributes;
      const artist = itemAttr.artist.data;
      const filters = itemAttr.filters.data;
      const artistId = artist.id;
      const artistName = artist.attributes.name;
      const artistProfileImage =
        artist.attributes.profileImage.data.attributes.formats.thumbnail;
      const artistHref = artist.id;

      const productFilters = filters.map((filter: { id: number | string }) => {
        return filter.id.toString();
      });

      const productImage = itemAttr.images.data[0].attributes.formats.small === null
                     ? itemAttr.images.data[0].attributes
                     : itemAttr.images.data[0].attributes.formats.small

      if (artistsHelper[artistId] !== undefined) {
        artistsHelper[artistId].products.push({
          id: item.id,
          name: itemAttr.name,
          image: {
            url: productImage.url,
            width: productImage.width,
            height: productImage.height,
          },
          href: item.id,
          filters: productFilters,
        });
      } else {
        artistsHelper[artistId] = {
          id: artistId,
          name: artistName,
          profileImageUrl: {
            url: artistProfileImage.url,
            width: artistProfileImage.width,
            height: artistProfileImage.height,
          },
          products: [
            {
              id: item.id,
              name: itemAttr.name,
              image: {
                url: productImage.url,
                width: productImage.width,
                height: productImage.height,
              },
              href: item.id,
              filters: productFilters,
            },
          ],
          href: artistHref,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  const artists: artsists = [];

  for (const item in artistsHelper) {
    artists.push(artistsHelper[item]);
  }

  return artists;
};
