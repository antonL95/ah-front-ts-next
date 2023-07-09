"use client";

import { filters } from "@/ah/utils/type";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type props = {
  dictionary: any;
  filters: filters;
};

const FilterRow = (props: props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string|number) => {
      // @ts-ignore
      const params = new URLSearchParams(searchParams)
      if (params.has(name) && params.get(name) === value.toString()) {
        params.delete(name)
      } else {
        params.set(name, value.toString())
      }

      return params.toString()
    },
    [searchParams]
  )


  return (
    <>
      <div className={`container mx-auto flex flex-row justify-around`}>
        {props.filters.map((filter) => {
          return (
            <Menu
              as="div"
              className={`relative inline-block text-left`}
              key={`${new Date().getTime()}-${filter.type}-menu`}
            >
              <div>
                <Menu.Button className={``}>{filter.type}</Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter={`transition ease-out duration-100`}
                enterFrom={`transform opacity-0 scale-95`}
                enterTo={`transform opacity-100 scale-100`}
                leave={`transition ease-in duration-75`}
                leaveFrom={`transform opacity-100 scale-100`}
                leaveTo={`transform opacity-0 scale-95`}
              >
                <Menu.Items
                  className={`absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                >
                  {filter.values.map((value) => {
                    return (
                      <div
                        className={`py-1`}
                        key={`${new Date().getTime()}-${value.value}-div`}
                      >
                        <Menu.Item>
                          <button
                            onClick={() => {
                              // <pathname>?sort=asc
                              router.push(pathname + '?' + createQueryString(filter.type, value.value))
                            }}
                          >
                            {value.value}
                          </button>
                        </Menu.Item>
                      </div>
                    );
                  })}
                </Menu.Items>
              </Transition>
            </Menu>
          );
        })}
      </div>
    </>
  );
};

export default FilterRow;
