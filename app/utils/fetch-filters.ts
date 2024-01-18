import qs from "qs";
import { fetchData } from "@/ah/utils/fetch-helper";
import { isDraftModeTrue } from "@/ah/utils/draft-mode";
import { filters } from "@/ah/utils/type";

export const fetchFilters = async (lang: string, options?: any) => {
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
      pagination: {
        pageSize: 1000,
        page: 1,
      },
      locale: [lang],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const filters: filters = [];

  try {
    const res = await fetchData("filters", query, options);
    const data = await res.json();

    const filtersHelper = [];
    for (const item of data.data) {
      const filterType = item.attributes.type;
      const filterValue = item.attributes.value;
      if (filtersHelper[filterType] !== undefined) {
        filtersHelper[filterType].push({
          id: item.id,
          value: filterValue,
        });

        continue;
      }

      filtersHelper[filterType] = [
        {
          id: item.id,
          value: filterValue,
        },
      ];
    }
    for (const item in filtersHelper) {
      filters.push({
        type: item,
        values: filtersHelper[item],
      });
    }
  } catch (error) {
    console.log(error);

    return filters;
  }

  return filters;
};
