"use client";

import BlogCard from "./BlogCard";
import LinkButton from "./LinkButton";
import { Post } from "@/../payload-types";
import Carousel from "./Carousel";
import { Dictionary } from "@/get-dictionary";

type Props = {
  posts: Post[];
  lang: "en" | "ar";
  showAll: string;
  blogDict: Dictionary["blog"];
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
      emptyMessage={blogDict.emptyMessage}
      renderItem={(post) => (
        <BlogCard key={post.id} post={post} lang={lang} dict={blogDict} />
      )}
      renderExtraActions={() => (
        <LinkButton href={`/${lang}/blog`}>{showAll}</LinkButton>
      )}
    />
  );
}
