import {i18n} from '../../i18n-config'
import '../globals.css'
import React from "react";
import NavigationBar from "@/ah/components/Navigation/NavigationBar";
import {getDictionary} from "../../get-directories";
import FooterSection from "@/ah/components/Footer/FooterSection";

export const generateStaticParams = () => {
    return i18n.locales.map((locale) => ({lang: locale}))
}

export const metadata = {
    title: `Artist's hero`,
    description: `Artist's hero description`,
}

async function getData() {
    const response = await fetch(
        `${process.env.STRAPI_URL}references`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.STRAPI_KEY}`,
            },
            method: 'GET',
        }
    )

    if(!response.ok) {
        console.log(`error`);
    }

    return response.json();
}

const Root = async ({children, params}: { children: React.ReactNode, params: { lang: "cs" | "en" } }) => {
    const dictionary = await getDictionary(params.lang)

    return (
        <html lang={params.lang}>
        <body>
        <header className={`sticky top-0 z-50`}>
            <NavigationBar dictionary={dictionary}/>
        </header>
        <main className={`relative`}>
            {children}
        </main>
        <footer>
            <FooterSection dictionary={dictionary} />
        </footer>
        <div id={`portals`}></div>
        </body>
        </html>
    )
}

export default Root;
