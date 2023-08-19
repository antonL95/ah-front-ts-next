import { getDictionary } from "@/ah/../get-directories";
import { Locale } from "@/ah/../i18n-config";
import {
  fetchAllArtists,
  fetchArtistsWithProducts,
  fetchFiltersAndValues,
} from "@/ah/utils/fetch-helper";
import GalleryRow from "@/ah/components/ui/GalleryRow";
import FilterRow from "@/ah/components/Gallery/Main/FilterRow";
import { artist } from "@/ah/utils/type";
import { Suspense } from "react";
import DefaultSpinner from "@/ah/components/ui/DefaultSpinner";

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
  const filters = await fetchFiltersAndValues(props.params.lang);
  const allArtists = await fetchAllArtists(props.params.lang);

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

  const artists: artist[] = [];

  for (const artist of allArtists) {
    artists.push(artist);
  }

  const data = await fetchArtistsWithProducts(
    props.params.lang,
    selectedArtist,
    { cache: "no-store" }
  );

  for (const i in data) {
    if (filteredSearchParams.length > 0) {
      data[i].products = data[i].products.filter((product) => {
        if (product.filters === undefined || product.filters.length === 0) {
          return false;
        }

        let hasAllFilters = true;

        for (const filter of filteredSearchParams) {
          if (!product.filters.includes(filter)) {
            hasAllFilters = false;
          }
        }

        return hasAllFilters;
      });

      if (data[i].products.length === 0) {
        delete data[i];
      }
    }
  }

  return (
    <>
      <Suspense fallback={<DefaultSpinner />}>
        <FilterRow
          dictionary={dictionary}
          filters={filters}
          selectedFilters={filteredSearchParams}
          artists={artists}
          selectedArtist={selectedArtist}
        />
        {data[0] !== undefined ? (
          data.map((artist) => {
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
