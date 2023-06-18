import {getDictionary} from '@/ah/../get-directories';
import {Locale} from '@/ah/../i18n-config';
import * as qs from "qs";
import {fetchData} from "@/ah/utils/fetch-helper";

const getData = async () => {
    const query = qs.stringify(
        {
            "populate": [
                "profileImage",
            ],
        },
        {
            encodeValuesOnly: true,
        });
    const res = await fetchData('artists', query);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const data = await res.json();
    for (const item of data.data) {
        console.log(item);
    }
}
export const runtime = 'edge';

const IndexPage = async ({params: {lang}}: { params: { lang: Locale } }) => {
    const dictionary = await getDictionary(lang);

    const data = await getData();

    return (
        <>
        </>
    );
}
export default IndexPage;
