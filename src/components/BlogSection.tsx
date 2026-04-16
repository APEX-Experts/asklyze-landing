import React from "react";
import LinkButton from "./LinkButton";
import BlogCarousel from "./BlogCarousel";
import { getPayload } from "@/lib/payload";
import { Post } from "@/payload-types";

type Props = {
  dict: {
    title: string;
    subtitle: string;
    showAll: string;
  };
  lang: "en" | "ar";
};

const BlogSection = async ({ dict, lang }: Props) => {
  const { title, subtitle, showAll } = dict;

  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: "posts",
    limit: 9,
    sort: "-publishedDate",
  });

  const posts = (docs as unknown as Post[]).filter((post) => post.slug);

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 lg:px-24">
      <div className="max-w-full flex flex-col items-center mx-auto bg-bg-card rounded-5xl gap-10 justify-center py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12">
        {/* Heading */}
        <div className="flex flex-col items-center gap-2.5">
          <h2 className="text-3xl lg:text-[40px] font-bold text-center text-primary-dark">
            {title}
          </h2>
          <p className="text-text-body text-lg leading-[28px] text-center">
            {subtitle}
          </p>
        </div>

        {/* Blog Cards Carousel */}
        <BlogCarousel posts={posts} lang={lang} showAll={showAll} />
      </div>
    </section>
  );
};

export default BlogSection;
