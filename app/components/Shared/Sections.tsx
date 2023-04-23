import React from "react";

interface SectionsProps {
    children: JSX.Element;
    classStyle: string;
}
const Sections = ({children, classStyle}: SectionsProps) => {
    return <section className={`${classStyle} py-16 md:py-48`}>
        {children}
    </section>
}

export default Sections;
