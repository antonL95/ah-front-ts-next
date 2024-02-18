import { getDictionary } from "@/ah/../get-directories";
import { Locale } from "@/ah/../i18n-config";
import { notFound } from "next/navigation";
import Image from "next/image";
import CarouselSlider from "@/ah/components/ui/CarouselSlider";
import { carouselItems } from "@/ah/utils/type";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { EditorJsWrapper } from "@/ah/components/ui/EditorJsWrapper";
import { BreadcrumbsWrapper } from "@/ah/components/ui/BreadcrumbWrapper";
import { fetchBlogPost } from "@/ah/utils/fetch-blog-posts";

type props = {
  params: {
    lang: Locale;
    id: number | string;
  };
};
const IndexPage = async (props: props) => {
  const dictionary: any = await getDictionary(props.params.lang);

  const blogPost = await fetchBlogPost(
    props.params.lang,
    props.params.id,
    false
  );

  if (blogPost === undefined) {
    notFound();
  }

  const breadcrumbs = [
    {
      name: dictionary.gallery.productDetail.breadcrumb.home,
      href: `/${props.params.lang}/gallery`,
    },
    { name: blogPost.title, href: `` },
  ];

  let otherImages: carouselItems = [];
  if (blogPost.images !== undefined) {
    otherImages = blogPost.images.map((image) => {
      return {
        id: image.url,
        element: (
          <Image
            src={image.url}
            width={image.width}
            height={image.width}
            alt={blogPost.title}
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
        {blogPost.coverImage === undefined ? null : (
          <Image
            src={blogPost.coverImage.url}
            alt={blogPost.title}
            height={blogPost.coverImage.height}
            width={blogPost.coverImage.width}
            className={`z-0 h-[150px] w-full object-cover object-[center_12%] md:h-[500px]`}
          />
        )}
        <div
          className={`absolute top-0 z-0 flex h-[150px] w-full flex-col bg-black/[.5] md:h-[500px]`}
        ></div>
      </div>
      <div className="container mx-auto py-5 md:py-10">
        <h1 className={`text-5xl text-black`}>{blogPost.title}</h1>
        {blogPost.subtitle !== undefined ? (
          <h3 className={`text-2xl text-black`}>{blogPost.subtitle}</h3>
        ) : (
          <></>
        )}
        <div
          className={
            otherImages.length > 0 ? `md:grid md:grid-cols-2` : `md:flex`
          }
        >
          <div className={``}>
            <article className={`prose`}>
              <EditorJsWrapper data={JSON.parse(blogPost.content)} />
            </article>
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
        <BreadcrumbsWrapper items={breadcrumbs} />
      </div>
    </>
  );
};
export default IndexPage;
