"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Post } from "@/payload-types";
import LinkButton from "./LinkButton";

type Props = {
  posts: Post[];
  lang: "en" | "ar";
  showAll: string;
};

const CARDS_PER_PAGE = 3;

export default function BlogCarousel({ posts, lang, showAll }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, posts.length - CARDS_PER_PAGE);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const visiblePosts = posts.slice(currentIndex, currentIndex + CARDS_PER_PAGE);

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Cards Row */}
      {visiblePosts.length > 0 ? (
        <div className="flex flex-row w-full gap-6 items-stretch">
          {visiblePosts.map((post) => {
            const postDate = new Date(post.publishedDate).toLocaleDateString(
              lang === "ar" ? "ar-EG" : "en-US",
              { year: "numeric", month: "short", day: "numeric" }
            );

            const localizedTitle =
              lang === "ar" && post.titleAr ? post.titleAr : post.title;
            const localizedExcerpt =
              lang === "ar" && post.excerptAr ? post.excerptAr : post.excerpt;

            return (
              <Link
                key={post.id}
                href={`/${lang}/blog/${post.slug}`}
                className="flex flex-col items-center gap-4 flex-1 rounded-[30px] border border-primary-light bg-white h-[500px] hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                style={{ padding: "10px 16px 16px 16px" }}
              >
                {/* Cover Image with Date badge */}
                <div className="relative w-full rounded-3xl overflow-hidden shrink-0 flex-1 min-h-0">
                  <Image
                    src={post.image}
                    alt={localizedTitle}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {/* Date Badge */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1 rounded-5xl shadow-sm">
                    {postDate}
                  </span>
                </div>

                {/* Card Body */}
                <div className="flex flex-col gap-3 w-full pb-1 shrink-0">
                  {/* Category Badge */}
                  <span
                    className="self-start flex items-center justify-center gap-1 rounded-[6px] text-sm font-medium"
                    style={{
                      padding: "4px 10px",
                      background: "var(--color-primary-light)",
                      color: "var(--color-primary)",
                    }}
                  >
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-semibold leading-[28px] line-clamp-2"
                    style={{
                      color: "var(--color-primary-dark)",
                      fontSize: "24px",
                    }}
                  >
                    {localizedTitle}
                  </h3>

                  {/* Summary */}
                  <p
                    className="line-clamp-3"
                    style={{
                      color: "var(--color-text-heading)",
                      fontSize: "18px",
                      fontWeight: 400,
                      lineHeight: "30px",
                      opacity: 0.7,
                    }}
                  >
                    {localizedExcerpt}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-text-body text-center py-8">No articles yet.</p>
      )}

      {/* Arrow Buttons */}
      <div className="flex flex-row justify-between max-lg:flex-wrap items-center gap-8">
        <LinkButton href={`/${lang}/blog`}>{showAll}</LinkButton>
        <div className="flex items-center gap-3 self-end" dir="ltr">
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
