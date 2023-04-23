import Sections from "@/ah/components/Shared/Sections";


interface WhyArt {
    dictionary: any;
}

const WhyArt = ({dictionary}:WhyArt) => {

    return <Sections classStyle={`bg-black text-white`}>
        <div className={`container mx-auto`}>
            <h2 className={`text-5xl font-medium`}>
                {dictionary.whyArt.headline}
            </h2>
        </div>
    </Sections>
}

export default WhyArt;
