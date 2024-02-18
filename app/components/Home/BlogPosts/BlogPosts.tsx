import Sections from "@/ah/components/ui/Sections";
import { blogPost } from "@/ah/utils/type";
import React from "react";
import Posts from "../../ui/Posts";
type Props = {
  dictionary: any;
  blogPosts: blogPost[];
  lang: string;
};

export default function BlogPosts(props: Props) {
  return (
    <Sections classStyle={``}>
      <>
        <h2 className={`text-center text-5xl font-medium`}>
          {props.dictionary.blog.headline}
        </h2>
        <div className="container mx-auto">
          <div className={`flex flex-row flex-wrap justify-around`}>
            {props.blogPosts.map((post, index) => (
              <div key={index} className={`w-sm max-w-sm py-5`}>
                <Posts
                  title={post.title}
                  image={post.thumbnail}
                  dictionary={props.dictionary}
                  href={`${props.lang}/blog/${post.id}`}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    </Sections>
  );
}
