import { getDictionary } from "@/ah/../get-directories";
import { Locale } from "@/ah/../i18n-config";

export const runtime = "edge";

const IndexPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const dictionary = await getDictionary(lang);

  return <></>;
};
export default IndexPage;
