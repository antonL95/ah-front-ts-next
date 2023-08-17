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
  selectedArtist?: string;
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
      <div
        className={`container mx-auto flex flex-col py-16 md:flex-row md:justify-around`}
      >
        <Menu
          as="div"
          className={`relative inline-block w-full text-left md:w-56`}
        >
          <div>
            <Menu.Button
              className={`z-50 w-full cursor-pointer border border-black px-8 py-4 md:w-56 hover:bg-gray-100`}
            >
              {props.dictionary.gallery.filterRow.artists}
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
              className={`bg-gray z-10 mt-[-1px] w-full origin-top-right border border-black md:absolute md:w-56`}
            >
              {props.artists.map((artist) => {
                return (
                  <div
                    className={`py-1 bg-white`}
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
                        className={`flex w-full cursor-pointer flex-row px-4 py-2 text-sm hover:bg-gray-100`}
                      >
                        <span
                          className={`${
                            props.selectedArtist === artist.name ? `` : `hidden`
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
                            className={`mx-2 inline-block rounded-full`}
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
              className={`relative inline-block w-full text-left md:w-56 `}
              key={`${new Date().getTime()}-${filter.type}-menu`}
            >
              <div>
                <Menu.Button
                  className={`z-50 w-full cursor-pointer border-b border-l border-r border-black px-8 py-4 md:w-56 md:border md:border-black hover:bg-gray-100`}
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
                  className={`bg-gray z-10 mt-[-1px] w-full origin-top-right border border-black bg-white md:absolute md:w-56`}
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
                            className={`flex w-full cursor-pointer flex-row px-4 py-2 text-sm hover:bg-gray-100`}
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
        {props.selectedFilters.length > 0 ||
        props.selectedArtist !== undefined ? (
          <Menu
            as="div"
            className={`relative inline-block w-full text-left md:w-56`}
          >
            <div>
              <Menu.Button
                className={`z-50 w-full cursor-pointer px-8 py-4 hover:bg-gray-100`}
                onClick={() => {
                  router.push(pathname);
                }}
              >
                <CloseIcon />
                {props.dictionary.gallery.filterRow.clearAll}
              </Menu.Button>
            </div>
          </Menu>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default FilterRow;
