import { isDraftModeTrue } from "@/ah/utils/draft-mode";
import qs from "qs";
import { artworks } from "@/ah/utils/type";
import { fetchData } from "@/ah/utils/fetch-helper";

export const fetchLatestProducts = async (lang: string) => {
  let publicationState = {};
  const isEnabled = isDraftModeTrue();

  if (isEnabled) {
    publicationState = {
      publicationState: "preview",
    };
  }
  const query = qs.stringify({
    ...publicationState,
    populate: "images",
    locale: [lang],
  });

  const res = await fetchData("products", query);

  const data = await res.json();

  const returnData: artworks = [];

  for (const item of data.data) {
    const itemAttr = item.attributes;
    const small = itemAttr.images.data[0].attributes.formats.small;
    returnData.push({
      id: item.id,
      image: {
        url: small.url,
        width: small.width,
        height: small.height,
      },
      name: itemAttr.name,
      href: item.id,
    });
  }
  return returnData;
};
