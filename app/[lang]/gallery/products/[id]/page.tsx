import { getDictionary } from "@/ah/../get-directories";
import { Locale } from "@/ah/../i18n-config";
import { fetchArtistWithProducts, fetchProduct } from "@/ah/utils/fetch-helper";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { carouselItems } from "@/ah/utils/type";
import CarouselSlider from "@/ah/components/ui/CarouselSlider";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { BreadcrumbsWrapper } from "@/ah/components/ui/BreadcrumbWrapper";
import { RentButton } from "@/ah/components/ui/RentButton";
import GalleryRow from "@/ah/components/ui/GalleryRow";

export const runtime = "edge";

type props = {
  params: {
    lang: Locale;
    id: number | string;
  };
};
const IndexPage = async (props: props) => {
  const dictionary: any = await getDictionary(props.params.lang);
  const product = await fetchProduct(props.params.lang, props.params.id);
  const artistsArtworks = await fetchArtistWithProducts(
    props.params.lang,
    product.artist.id,
    product.id,
  );
  const elements: carouselItems = [];
  const breadcrumbs = [
    {
      name: dictionary.gallery.productDetail.breadcrumb.home,
      href: "/gallery",
    },
    {
      name: product.artist.name,
      href: `/gallery/artists/${product.artist.id}`,
    },
    { name: product.name, href: `` },
  ];

  const filters = product.filters.map((filter) => {
    return (
      <div key={filter.type}>
        <p className="text-gray-60 uppercase text-sm mt-8">{filter.type}</p>
        <p className="text-base mt-1">{filter.value}</p>
      </div>
    );
  });

  for (const image of product.images) {
    elements.push({
      id: image.url,
      element: (
        <Image
          src={image.url}
          alt={product.name}
          height={image.height}
          width={image.width}
        />
      ),
    });
  }

  return (
    <>
      <div className="container mx-auto md:mb-8">
        <div className="py-5 md:py-10">
          <BreadcrumbsWrapper items={breadcrumbs} />
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2">
          <div className="flex justify-center">
            <CarouselSlider
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
              items={elements}
            />
          </div>
          <div className={`md:mx-auto md:w-8/12`}>
            <h1 className="text-3xl">{product.name}</h1>
            <p className="md:my-8">
              by{" "}
              <Link
                href={`/gallery/artists/${product.artist.id}`}
                className="text-gray-60 underline"
              >
                {product.artist.name}
              </Link>
            </p>
            {filters}
            <p className="text-gray-60 uppercase text-sm mt-8">
              {dictionary.gallery.productDetail.description}
            </p>
            <ReactMarkdown>{product.description}</ReactMarkdown>
            <div className="my-8">
              <RentButton product={product} dictionary={dictionary} />
            </div>
          </div>
        </div>
        {artistsArtworks !== undefined ? <GalleryRow artist={artistsArtworks}/> : null}
      </div>
    </>
  );
};
export default IndexPage;
