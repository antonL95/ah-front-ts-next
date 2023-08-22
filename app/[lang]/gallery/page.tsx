import { getDictionary } from "@/ah/../get-directories";
import { Locale } from "@/ah/../i18n-config";
import GalleryRow from "@/ah/components/ui/GalleryRow";
import FilterRow from "@/ah/components/Gallery/Main/FilterRow";
import { artist } from "@/ah/utils/type";
import { Suspense } from "react";
import DefaultSpinner from "@/ah/components/ui/DefaultSpinner";
import { fetchFilters } from "@/ah/utils/fetch-filters";
import { fetchAllArtists } from "@/ah/utils/fetch-artists";
import { fetchArtistsWithProducts } from "@/ah/utils/fetch-artists-products";

type props = {
  params: {
    lang: Locale;
  };
  searchParams: {
    [key: string]: string;
  };
};

const IndexPage = async (props: props) => {
  const dictionary: any = await getDictionary(props.params.lang);
  const filters = await fetchFilters(props.params.lang, { cache: "no-store" });
  const allArtists = await fetchAllArtists(props.params.lang, { cache: "no-store" });

  const filteredSearchParams: string[] = [];
  let selectedArtist = undefined;

  for (const [key, value] of Object.entries(props.searchParams)) {
    if (key !== "lang") {
      for (const filter of filters) {
        for (const filterValue of filter.values) {
          if (filterValue.value === value) {
            filteredSearchParams.push(filterValue.id.toString());
          }
        }
      }
    }
    if (key === "artist") {
      selectedArtist = value;
    }
  }

  const artistsWithProducts = await fetchArtistsWithProducts(
    props.params.lang,
    selectedArtist,
    { cache: "no-store" }
  );

  let filteredArtists: artist[] = [];
  if (filteredSearchParams.length > 0) {
    for (const i in artistsWithProducts) {
      artistsWithProducts[i].products = artistsWithProducts[i].products.filter(
        (product) => {
          if (product.filters === undefined || product.filters.length === 0) {
            return false;
          }

          let hasAllFilters = false;

          for (const filter of filteredSearchParams) {
            hasAllFilters = product.filters.includes(filter);
          }

          return hasAllFilters;
        }
      );

      if (artistsWithProducts[i].products.length === 0) {
        delete artistsWithProducts[i];
      } else {
        filteredArtists.push(artistsWithProducts[i]);
      }
    }
  } else {
    filteredArtists = artistsWithProducts;
  }

  return (
    <>
      <Suspense fallback={<DefaultSpinner />}>
        <FilterRow
          dictionary={dictionary}
          filters={filters}
          selectedFilters={filteredSearchParams}
          artists={allArtists}
          selectedArtist={selectedArtist}
        />
        {filteredArtists.length > 0 ? (
          filteredArtists.map((artist) => {
            return (
              <div key={artist.id} className={`even:bg-gray odd:bg-white`}>
                <div className={`container mx-auto`}>
                  <GalleryRow
                    lang={props.params.lang}
                    key={`${artist.id}-${new Date().getTime()}`}
                    artist={artist}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className={`text-center md:py-36`}>
            <h2 className={`text-3xl`}>{dictionary.other.noProductsFound}</h2>
          </div>
        )}
      </Suspense>
    </>
  );
};
export default IndexPage;
