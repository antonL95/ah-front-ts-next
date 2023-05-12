import React from "react";

type SectionsProps = {
    children: JSX.Element;
    classStyle: string;
    id?: string;
}
const Sections = ({children, classStyle, id}: SectionsProps) => {
    return <section className={`${classStyle} py-16 md:py-48`} id={id}>
        {children}
    </section>
}

export default Sections;
