import { getDictionary } from "@/ah/../get-directories";
import { Locale } from "@/ah/../i18n-config";
import {
  fetchArtistsWithProducts,
  fetchFiltersAndValues,
} from "@/ah/utils/fetch-helper";
import GalleryRow from "@/ah/components/ui/GalleryRow";
import FilterRow from "@/ah/components/Gallery/Main/FilterRow";
import { artist } from "@/ah/utils/type";

export const runtime = "edge";

type props = {
  params: {
    lang: Locale;
  };
  searchParams: {
    [key: string]: string;
  };
};

const IndexPage = async (props: props) => {
  const dictionary = await getDictionary(props.params.lang);
  const filters = await fetchFiltersAndValues(props.params.lang);

  const filteredSearchParams: string[] = [];

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
  }

  const data = await fetchArtistsWithProducts(props.params.lang);
  const artists:artist[] = [];
  for (const i in data) {
    artists.push({
      name: data[i].name,
      id: data[i].id,
      profileImageUrl: data[i].profileImageUrl,
      products: [],
    });

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
      <FilterRow
        dictionary={dictionary}
        filters={filters}
        selectedFilters={filteredSearchParams}
        artists={artists}
      />
      {data[0] !== undefined ? (
        data.map((artist) => {
          return (
            <div key={artist.id} className={`odd:bg-gray even:bg-white`}>
              <GalleryRow
                key={`${artist.id}-${new Date().getTime()}`}
                artist={artist}
              />
            </div>
          );
        })
      ) : (
        <div className={`text-center`}>No result</div>
      )}
    </>
  );
};
export default IndexPage;
