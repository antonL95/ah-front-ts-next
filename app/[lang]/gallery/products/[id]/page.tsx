import { getDictionary } from "@/ah/../get-directories";
import { Locale } from "@/ah/../i18n-config";
import { fetchProduct } from "@/ah/utils/fetch-helper";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export const runtime = "edge";

type props = {
  params: {
    lang: Locale;
    id: number | string;
  };
};
const IndexPage = async (props: props) => {
  const dictionary = await getDictionary(props.params.lang);
  const product = await fetchProduct(props.params.lang, props.params.id);

  const filters = product.filters.map((filter) => {
    return (
      <div key={filter.type}>
        <p>{filter.type}</p>
        <p>{filter.value}</p>
      </div>
    );
  });
  const images = product.images.map((image) => {
    return (
      <div key={image.url}>
        <Image
          src={image.url}
          alt={product.name}
          height={image.height}
          width={image.width}
        />
      </div>
    );
  });
  return (
    <>
      <div>
        <h1>{product.name}</h1>
        <ReactMarkdown>{product.description}</ReactMarkdown>
        {filters}
        {images}
      </div>
    </>
  );
};
export default IndexPage;
