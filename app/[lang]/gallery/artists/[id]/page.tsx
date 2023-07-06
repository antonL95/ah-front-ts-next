import { getDictionary } from "@/ah/../get-directories";
import { Locale } from "@/ah/../i18n-config";
import { fetchArtistWithProducts } from "@/ah/utils/fetch-helper";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import GalleryRow from "@/ah/components/ui/GalleryRow";
import CarouselSlider from "@/ah/components/ui/CarouselSlider";
import { carouselItems } from "@/ah/utils/type";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

export const runtime = "edge";

type props = {
  params: {
    lang: Locale;
    id: number | string;
  };
};
const IndexPage = async (props: props) => {
  const dictionary: any = await getDictionary(props.params.lang);

  const artist = await fetchArtistWithProducts(
    props.params.lang,
    props.params.id
  );

  if (artist === undefined) {
    notFound();
  }

  const breadcrumbs = [
    {
      name: dictionary.gallery.productDetail.breadcrumb.home,
      href: "/gallery",
    },
    { name: artist.name, href: `` },
  ];

  let otherImages:carouselItems = [];
  if (artist.otherImages !== undefined) {
    otherImages = artist.otherImages.map((image) => {
      return {
        id: image.url,
        element: (
          <Image
            src={image.url}
            width={image.width}
            height={image.width}
            alt={artist.name}
            key={image.url}
          />
        ),
      };
    });
  }

  return (
    <>
      <div className={`relative -z-50`}>
        {artist.coverImageUrl === undefined ? null : (
          <Image
            src={artist.coverImageUrl.url}
            alt={artist.name}
            height={artist.coverImageUrl.height}
            width={artist.coverImageUrl.width}
            className={`w-full h-[150px] md:h-[500px] object-cover z-0`}
          />
        )}
        <div
          className={`absolute top-0 w-full h-[150px] md:h-[500px] bg-black/[.5] flex flex-col z-0`}
        ></div>
      </div>
      <div className={`container mx-auto mt-[-50px] md:mt-[-150px] z-10`}>
        <Image
          src={artist.profileImageUrl.url}
          alt={artist.name}
          height={200}
          width={200}
          className={`rounded-full flex-none w-[100px] h-[100px] md:w-[200px] md:h-[200px] border-4 border-white`}
        />
      </div>
      <div className="py-5 md:py-10 md:container md:mx-auto">
        {/*<BreadcrumbsWrapper items={breadcrumbs} />*/}
        <h1 className={`text-5xl text-black`}>{artist.name}</h1>
        <div className={`md:grid md:grid-cols-2`}>
          <div>
            <ReactMarkdown>{artist.bio}</ReactMarkdown>
          </div>
          {otherImages.length > 0 ? (
            <div>
              <CarouselSlider
                items={otherImages}
                options={{
                  align: "start",
                  slideGap: "xs",
                  controlsOffset: "xs",
                  mx: "auto",
                  dragFree: true,
                  slidesToScroll: 1,
                  height: "100%",
                  nextControlIcon: (
                    <IconArrowRight
                      size={16}
                      className={`bg-black`}
                      color={`#fff`}
                    />
                  ),
                  previousControlIcon: (
                    <IconArrowLeft
                      size={16}
                      className={`bg-black`}
                      color={`#fff`}
                    />
                  ),
                  styles: {
                    control: {
                      "&[data-inactive]": {
                        opacity: 0,
                        cursor: "default",
                      },
                      backgroundColor: "#000",
                      border: "1px solid #000",
                    },
                    slide: {},
                  },
                  breakpoints: [
                    { maxWidth: "md", slideSize: "100%" },
                    { maxWidth: "sm", slideSize: "100%" },
                  ],
                }}
                addSx={true}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className={`py-5 md:py-10`}>
        <h2 className={`text-3xl text-black md:container md:mx-auto`}>
          {dictionary.gallery.artistDetail.artworks}
        </h2>
        <GalleryRow artist={artist} withoutAvatar={true} />
      </div>
    </>
  );
};
export default IndexPage;
