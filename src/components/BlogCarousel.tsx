"use client";

import BlogCard from "./BlogCard";
import LinkButton from "./LinkButton";
import { Post } from "@/payload-types";
import Carousel from "./Carousel";

type Props = {
  posts: Post[];
  lang: "en" | "ar";
  showAll: string;
  blogDict: {
    topics: Record<string, string>;
  };
};

export default function BlogCarousel({
  posts,
  lang,
  showAll,
  blogDict,
}: Props) {
  return (
    <Carousel
      items={posts}
      lang={lang}
      itemsPerPage={3}
      emptyMessage="No articles yet."
      renderItem={(post, index) => (
        <BlogCard
          key={post.id}
          post={post}
          lang={lang}
          delay={index * 0.1}
          dict={blogDict}
        />
      )}
      renderExtraActions={() => (
        <LinkButton href={`/${lang}/blog`}>{showAll}</LinkButton>
      )}
    />
  );
}
