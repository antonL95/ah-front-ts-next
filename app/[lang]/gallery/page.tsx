import {getDictionary} from '../../../get-directories'
import {Locale} from '../../../i18n-config'


const IndexPage = async ({params: {lang},}: { params: { lang: Locale } }) => {
    const dictionary = await getDictionary(lang)

    return (
        <>
        </>
    )
}
export default IndexPage;
