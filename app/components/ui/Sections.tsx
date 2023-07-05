import React from "react";

type SectionsProps = {
  children: JSX.Element;
  classStyle: string;
  id?: string;
};
const Sections = ({ children, classStyle, id }: SectionsProps) => {
  return (
    <section className={`${classStyle} py-4 md:py-16`} id={id}>
      {children}
    </section>
  );
};

export default Sections;
