"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import BlogCard from "./BlogCard";
import LinkButton from "./LinkButton";
import { Post } from "@/payload-types";
import { cn } from "@/lib/utils";

type Props = {
  posts: Post[];
  lang: "en" | "ar";
  showAll: string;
  blogDict: {
    topics: Record<string, string>;
  };
};

const CARDS_PER_PAGE = 3;

export default function BlogCarousel({
  posts,
  lang,
  showAll,
  blogDict,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, posts.length - CARDS_PER_PAGE);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const visiblePosts = posts.slice(currentIndex, currentIndex + CARDS_PER_PAGE);

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Cards Row */}
      {visiblePosts.length > 0 ? (
        <div
          className={cn(
            "flex flex-row w-full gap-6 items-stretch",
            lang === "ar" ? "flex-row-reverse" : ""
          )}
        >
          {visiblePosts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              lang={lang}
              delay={index * 0.1}
              dict={blogDict}
            />
          ))}
        </div>
      ) : (
        <p className="text-text-body text-center py-8">No articles yet.</p>
      )}

      {/* Arrow Buttons */}
      <div className="flex flex-row justify-between max-lg:flex-wrap items-center gap-8">
        <LinkButton href={`/${lang}/blog`}>{showAll}</LinkButton>
        <div
          className={cn(
            "flex items-center gap-3 self-end",
            lang === "ar" ? "flex-row-reverse" : ""
          )}
        >
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={!canGoPrev}
            aria-label="Previous articles"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 ${
              canGoPrev
                ? "bg-primary text-white cursor-pointer border-transparent hover:bg-primary-hover"
                : "cursor-not-allowed bg-primary-variant text-white"
            }`}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() =>
              setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
            }
            disabled={!canGoNext}
            aria-label="Next articles"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 ${
              canGoNext
                ? "bg-primary text-white cursor-pointer border-transparent hover:bg-primary-hover"
                : "cursor-not-allowed bg-primary-variant text-white"
            }`}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
