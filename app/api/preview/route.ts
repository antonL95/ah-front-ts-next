// route handler with secret and slug
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { fetchData } from "@/ah/utils/fetch-helper";
import * as qs from "qs";

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const id = searchParams.get("id");
  const endpoint = searchParams.get("endpoint");
  const locale = searchParams.get("locale");

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.PREVIEW_SECRET || !id || !endpoint) {
    return new Response("Invalid token", { status: 401 });
  }

  if (endpoint !== "artists" && endpoint !== "products") {
    return new Response("Invalid endpoint", { status: 401 });
  }

  const query = qs.stringify(
    {
      publicationState: "preview",
      filters: {
        id: {
          $eq: id,
        },
      },
      locale: locale,
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetchData(endpoint, query);
  const data = await res.json();

  // Enable Draft Mode by setting the cookie
  draftMode().enable();

  let returnUrl;
  if (endpoint === "artists") {
    returnUrl = `/${locale}/gallery/artists/${data.data[0].id}`;
  } else if (endpoint === "products") {
    returnUrl = `/${locale}/gallery/products/${data.data[0].id}`;
  } else {
    returnUrl = "/";
  }

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(returnUrl);
}
