import { getDictionary } from "@/ah/../get-directories";
import { Locale } from "@/ah/../i18n-config";
import { notFound } from "next/navigation";
import Image from "next/image";
import GalleryRow from "@/ah/components/ui/GalleryRow";
import CarouselSlider from "@/ah/components/ui/CarouselSlider";
import { carouselItems } from "@/ah/utils/type";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { EditorJsWrapper } from "@/ah/components/ui/EditorJsWrapper";
import { BreadcrumbsWrapper } from "@/ah/components/ui/BreadcrumbWrapper";
import { fetchArtistWithProducts } from "@/ah/utils/fetch-artist-products";

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
    props.params.id,
    false
  );

  if (artist === undefined) {
    notFound();
  }

  const breadcrumbs = [
    {
      name: dictionary.gallery.productDetail.breadcrumb.home,
      href: `/${props.params.lang}/gallery`,
    },
    { name: artist.name, href: `` },
  ];

  let otherImages: carouselItems = [];
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
            className={`h-[300px] w-full object-contain object-center md:h-[600px]`}
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
            className={`z-0 h-[150px] w-full object-contain md:h-[500px]`}
          />
        )}
        <div
          className={`absolute top-0 z-0 flex h-[150px] w-full flex-col bg-black/[.5] md:h-[500px]`}
        ></div>
      </div>
      <div className={`container z-10 mx-auto mt-[-50px] md:mt-[-150px]`}>
        <Image
          src={artist.profileImageUrl.url}
          alt={artist.name}
          height={200}
          width={200}
          className={`h-[100px] w-[100px] object-center object-contain flex-none rounded-full border-4 border-white md:h-[200px] md:w-[200px]`}
        />
      </div>
      <div className="container mx-auto py-5 md:py-10">
        <h1 className={`text-5xl text-black`}>{artist.name}</h1>
        <div className={`md:grid md:grid-cols-2`}>
          <div className={``}>
            {artist.bio !== undefined ? (
              <article className={`prose`}>
                <EditorJsWrapper data={JSON.parse(artist.bio)} />
              </article>
            ) : null}
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
      <div className={`container mx-auto py-5 md:py-10`}>
        <h2 className={`text-3xl text-black`}>
          {dictionary.gallery.artistDetail.artworks}
        </h2>
        <GalleryRow
          lang={props.params.lang}
          artist={artist}
          withoutAvatar={true}
        />
      </div>
      <div className={`container mx-auto py-5 md:py-10`}>
        <BreadcrumbsWrapper items={breadcrumbs} />
      </div>
    </>
  );
};
export default IndexPage;
