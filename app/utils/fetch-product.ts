import { isDraftModeTrue } from "@/ah/utils/draft-mode";
import qs from "qs";
import { detailArtwork, image, singularFilter } from "@/ah/utils/type";
import { fetchData } from "@/ah/utils/fetch-helper";

export const fetchProduct = async (lang: string, id: number | string) => {
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

  const res = await fetchData("products", query, { cache: "no-store" });
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
