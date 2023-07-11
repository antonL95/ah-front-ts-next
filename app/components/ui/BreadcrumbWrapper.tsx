"use client";

import { Breadcrumbs } from "@mantine/core";
import Link from "next/link";

type props = {
  items: {
    name: string;
    href: string;
  }[];
};

export const BreadcrumbsWrapper = (props: props) => {
  return (
    <Breadcrumbs>
      {props.items.map((item) => {
        if (item.href === "") {
          return (
            <span className="... truncate text-gray-60" key={item.name}>
              {item.name}
            </span>
          );
        }
        return (
          <Link
            key={item.href}
            href={item.href}
            className="text-gray-60 underline"
          >
            {item.name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
