import {getDictionary} from '../../get-directories'
import {Locale} from '../../i18n-config'
import HeroSection from '@/ah/components/Index/HeroSection/HeroSection'


const IndexPage = async ({params: {lang},}: { params: { lang: Locale } }) => {
    const dictionary = await getDictionary(lang)

    return (
        <>
            <HeroSection dictionary={dictionary}/>
        </>
    )
}
export default IndexPage;

