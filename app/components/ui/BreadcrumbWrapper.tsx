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
          return <span className="text-gray-60 truncate ..." key={item.name} >{item.name}</span>;
        }
        return (
          <Link key={item.href} href={item.href} className="underline text-gray-60">
            {item.name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
