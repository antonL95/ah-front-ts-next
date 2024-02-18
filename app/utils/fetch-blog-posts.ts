import { isDraftModeTrue } from "@/ah/utils/draft-mode";
import qs from "qs";
import { fetchData } from "@/ah/utils/fetch-helper";
import { blogPost } from "./type";

export async function fetchBlogPosts(lang: string, options?: any) {
  let publicationState = {};
  const isEnabled = isDraftModeTrue();

  if (isEnabled) {
    publicationState = {
      publicationState: "preview",
    };
  }
  const query = qs.stringify(
    {
      ...publicationState,
      populate: "*",
      locale: [lang],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetchData("posts", query, options);
  const data = await res.json();

  const blogPosts: blogPost[] = [];

  if (data.data.length <= 0) {
    return blogPosts;
  }

  for (const item of data.data) {
    const blogPostAttr = item.attributes;
    const thumbnail = blogPostAttr.thumbnail.data.attributes;
    const coverImage = blogPostAttr.coverImage.data.attributes;

    const blogPost: blogPost = {
      id: item.id,
      title: blogPostAttr.title,
      thumbnail: {
        url: thumbnail.url,
        width: thumbnail.width,
        height: thumbnail.height,
      },
      coverImage: {
        url: coverImage.url,
        width: coverImage.width,
        height: coverImage.height,
      },
      content: blogPostAttr.content,
    };

    blogPosts.push(blogPost);
  }

  return blogPosts;
}

export async function fetchBlogPost(
  lang: string,
  id: number | string,
  options?: any
) {
  let publicationState = {};
  const isEnabled = isDraftModeTrue();

  if (isEnabled) {
    publicationState = {
      publicationState: "preview",
    };
  }
  const query = qs.stringify(
    {
      ...publicationState,
      filters: {
        id: {
          $eq: id,
        },
      },
      populate: "*",
      locale: [lang],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetchData("posts", query, options);
  const data = await res.json();

  if (data.data.length <= 0) {
    return;
  }

  const item = data.data[0];
  const blogPostAttr = item.attributes;
  const thumbnail = blogPostAttr.thumbnail.data.attributes;
  const coverImage = blogPostAttr.coverImage.data.attributes;
  const images = [];

  if (
    blogPostAttr.images.data !== null &&
    blogPostAttr.images.data.length > 0
  ) {
    for (const image of blogPostAttr.images.data) {
      images.push({
        url: image.attributes.url,
        width: image.attributes.width,
        height: image.attributes.height,
      });
    }
  }

  const blogPost: blogPost = {
    id: item.id,
    title: blogPostAttr.title,
    subtitle: blogPostAttr.subtitle,
    thumbnail: {
      url: thumbnail.url,
      width: thumbnail.width,
      height: thumbnail.height,
    },
    coverImage: {
      url: coverImage.url,
      width: coverImage.width,
      height: coverImage.height,
    },
    images: images,
    content: blogPostAttr.content,
  };

  return blogPost;
}
