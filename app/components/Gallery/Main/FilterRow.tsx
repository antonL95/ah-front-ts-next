import { filters } from "@/ah/utils/type";

type props = {
  dictionary: any;
  filters: filters;
  changeFilter: () => {};
};

const FilterRow = (props: props) => {
  return (
    <>
      <div>
        {props.filters.map((filter) => {
          return <></>;
        })}
      </div>
    </>
  );
};

export default FilterRow;
