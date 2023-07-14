import { getDictionary } from "@/ah/../get-directories";
import { Locale } from "@/ah/../i18n-config";
import { fetchArtistWithProducts, fetchProduct } from "@/ah/utils/fetch-helper";
import Image from "next/image";
import { carouselItems } from "@/ah/utils/type";
import CarouselSlider from "@/ah/components/ui/CarouselSlider";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { BreadcrumbsWrapper } from "@/ah/components/ui/BreadcrumbWrapper";
import GalleryRow from "@/ah/components/ui/GalleryRow";
import { EditorJsWrapper } from "@/ah/components/ui/EditorJsWrapper";
import React from "react";

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
    true,
    product.id,
  );
  const elements: carouselItems = [];
  const breadcrumbs = [
    {
      name: dictionary.gallery.productDetail.breadcrumb.home,
      href: `/${props.params.lang}/gallery`,
    },
    {
      name: product.artist.name,
      href: `/${props.params.lang}/gallery/artists/${product.artist.id}`,
    },
    { name: product.name, href: `` },
  ];

  const filters = product.filters.map((filter) => {
    return (
      <div key={filter.type}>
        <p className="mt-8 text-sm uppercase text-gray-60">{filter.type}</p>
        <p className="mt-1 text-base">{filter.value}</p>
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
            <h1 className="my-4 text-3xl md:my-0">{product.name}</h1>
            <p className="md:my-8">
              by{" "}
              <Link
                href={`/${props.params.lang}/gallery/artists/${product.artist.id}`}
                className="text-gray-60 underline"
              >
                {product.artist.name}
              </Link>
            </p>
            {filters}
            <p className="mt-8 text-sm uppercase text-gray-60">
              {dictionary.gallery.productDetail.description}
            </p>
            <article className={`prose`}>
              <EditorJsWrapper data={JSON.parse(product.description)} />
            </article>
            {/*<div className="my-8">
              <RentButton product={product} dictionary={dictionary} />
            </div>*/}
          </div>
        </div>
        {artistsArtworks !== undefined ? (
          <div className={`py-4`}>
            <h2 className={`text-2xl font-medium`}>
              {dictionary.gallery.productDetail.otherArtworks}
            </h2>
            <GalleryRow lang={props.params.lang} artist={artistsArtworks} withoutAvatar={true} />
          </div>
        ) : null}
      </div>
    </>
  );
};
export default IndexPage;
