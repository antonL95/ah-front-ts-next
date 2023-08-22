import { isDraftModeTrue } from "@/ah/utils/draft-mode";
import qs from "qs";
import { artist } from "@/ah/utils/type";
import { fetchData } from "@/ah/utils/fetch-helper";

export const fetchAllArtists = async (lang: string, options?: any) => {
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
      populate: ["profileImage", "name"],
      locale: [lang],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetchData("artists", query, options);
  const data = await res.json();

  const artists: artist[] = [];

  for (const item of data.data) {
    const artistAttr = item.attributes;
    const thumbnailProfile =
      artistAttr.profileImage.data.attributes.formats.thumbnail;

    const artist: artist = {
      id: item.id,
      profileImageUrl: {
        url: thumbnailProfile.url,
        width: thumbnailProfile.width,
        height: thumbnailProfile.height,
      },
      name: artistAttr.name,
      products: [],
      href: item.id,
    };

    artists.push(artist);
  }

  return artists;
};
