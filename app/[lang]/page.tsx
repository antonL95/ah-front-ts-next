import {getDictionary} from '../../get-directories'
import {Locale} from '../../i18n-config'
import HeroSection from '@/ah/components/Home/HeroSection/HeroSection'
import WhyArt from "@/ah/components/Home/WhyArt/WhyArt";
import Benefits from "@/ah/components/Home/Benefits/Benefits";


const IndexPage = async ({params: {lang},}: { params: { lang: Locale } }) => {
    const dictionary = await getDictionary(lang)

    return (
        <>
            <HeroSection dictionary={dictionary}/>
            <WhyArt dictionary={dictionary}/>
            <Benefits dictionary={dictionary}/>
        </>
    )
}
export default IndexPage;

