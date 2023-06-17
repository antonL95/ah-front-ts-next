import {getDictionary} from '../../get-directories'
import {Locale} from '../../i18n-config'
import HeroSection from '@/ah/components/Home/HeroSection/HeroSection'
import WhyArt from "@/ah/components/Home/WhyArt/WhyArt";
import Benefits from "@/ah/components/Home/Benefits/Benefits";
import BenefitsOfRenting from "@/ah/components/Home/BenefitsOfRenting/BenefitsOfRenting";
import HowItWorks from "@/ah/components/Home/How/HowItWorks";
import AboutUs from "@/ah/components/Home/About/AboutUs";
import LatestArtwork from "@/ah/components/Home/Artwork/LatestArtwork";

type Props = {
    params: {
        lang: Locale,
    }
}
export const runtime = 'edge';

const IndexPage = async ({params: {lang}}: Props) => {
    const dictionary = await getDictionary(lang)

    return (
        <>
            <HeroSection dictionary={dictionary}/>
            <WhyArt dictionary={dictionary}/>
            <Benefits dictionary={dictionary}/>
            <BenefitsOfRenting dictionary={dictionary}/>
            <HowItWorks dictionary={dictionary}/>
            <LatestArtwork dictionary={dictionary}/>
            <AboutUs dictionary={dictionary}/>
        </>
    )
}
export default IndexPage;

