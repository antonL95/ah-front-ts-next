"use client";

import { artsists, filters } from "@/ah/utils/type";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

type props = {
  dictionary: any;
  filters: filters;
  selectedFilters: string[];
  artists: artsists;
};

const FilterRow = (props: props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string | number) => {
      // @ts-ignore
      const params = new URLSearchParams(searchParams);
      if (params.has(name) && params.get(name) === value.toString()) {
        params.delete(name);
      } else {
        params.set(name, value.toString());
      }

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <div className={`container mx-auto flex flex-row justify-around py-16`}>
        <Menu as="div" className={`relative inline-block text-left`}>
          <div>
            <Menu.Button
              className={`z-50 cursor-pointer border border-black px-8 py-4`}
            >
              Artists
            </Menu.Button>
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
              className={`absolute z-10 mt-[-1px] w-56 origin-top-right border border-black bg-white`}
            >
              {props.artists.map((artist) => {
                return (
                  <div
                    className={`py-1`}
                    key={`${new Date().getTime()}-${artist.id}-div`}
                  >
                    <Menu.Item>
                      <button
                        onClick={() => {
                          // <pathname>?sort=asc
                          router.push(
                            pathname +
                              "?" +
                              createQueryString("artist", artist.name)
                          );
                        }}
                        className={`text-gray-700 hover:bg-gray-100 hover:text-gray-900 block cursor-pointer px-4 py-2 text-sm`}
                      >
                        <span
                          className={`${
                            props.selectedFilters.includes(artist.id.toString())
                              ? ``
                              : `hidden`
                          }`}
                        >
                          <CheckIcon />
                        </span>
                        <span>
                          <Image
                            src={artist.profileImageUrl.url}
                            alt={artist.name}
                            width={30}
                            height={30}
                            className={`rounded-full inline-block mx-2`}
                          />
                          {artist.name}
                        </span>
                      </button>
                    </Menu.Item>
                  </div>
                );
              })}
            </Menu.Items>
          </Transition>
        </Menu>
        {props.filters.map((filter) => {
          return (
            <Menu
              as="div"
              className={`relative inline-block text-left`}
              key={`${new Date().getTime()}-${filter.type}-menu`}
            >
              <div>
                <Menu.Button
                  className={`z-50 cursor-pointer border border-black px-8 py-4`}
                >
                  {filter.type}
                </Menu.Button>
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
                  className={`absolute z-10 mt-[-1px] w-56 origin-top-right border border-black bg-white`}
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
                              router.push(
                                pathname +
                                  "?" +
                                  createQueryString(filter.type, value.value)
                              );
                            }}
                            className={`text-gray-700 hover:bg-gray-100 hover:text-gray-900 block cursor-pointer px-4 py-2 text-sm`}
                          >
                            <span
                              className={`${
                                props.selectedFilters.includes(
                                  value.id.toString()
                                )
                                  ? ``
                                  : `hidden`
                              }`}
                            >
                              <CheckIcon />
                            </span>
                            <span>{value.value}</span>
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
        <Menu
          as="div"
          className={`relative inline-block text-left ${
            props.selectedFilters.length > 0 ? `` : `hidden`
          } `}
        >
          <div>
            <Menu.Button
              className={`z-50 cursor-pointer px-8 py-4`}
              onClick={() => {
                router.push(pathname);
              }}
            >
              <CloseIcon />
              Clear all filters
            </Menu.Button>
          </div>
        </Menu>
      </div>
    </>
  );
};

export default FilterRow;
