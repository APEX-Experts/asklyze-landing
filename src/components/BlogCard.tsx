"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "../types/blog";

interface BlogCardProps {
  post: BlogPost;
  lang: "en" | "ar";
  delay?: number;
  dict: {
    topics: Record<string, string>;
  };
}

export default function BlogCard({
  post,
  lang,
  delay = 0,
  dict,
}: BlogCardProps) {
  return (
    <Link
      href={`/${lang}/blog/${post.slug}`}
      className="flex flex-col items-center gap-4 flex-1 rounded-[30px] border border-primary-light bg-white h-[500px] hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
      style={{ padding: "10px 16px 16px 16px" }}
    >
      {/* Cover Image with Date badge */}
      <div className="relative w-full rounded-3xl overflow-hidden shrink-0 flex-1 min-h-0">
        <Image
          src={post.image}
          alt={post.title}
          fill
          unoptimized
          className="object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        {/* Date Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1 rounded-5xl shadow-sm">
          {post.date}
        </span>
      </div>

      {/* Card Body */}
      <div className="flex flex-col gap-3 w-full pb-1 shrink-0">
        {/* Category Badge */}
        <span
          className="self-start flex items-center justify-center gap-1 rounded-[6px] text-sm font-medium bg-primary-light text-primary"
          style={{ padding: "4px 10px" }}
        >
          {dict.topics[post.category as keyof typeof dict.topics] || post.category}
        </span>

        {/* Title */}
        <h3
          className="font-semibold leading-[28px] line-clamp-2 text-primary-dark group-hover:text-primary transition-colors duration-300"
          style={{ fontSize: "24px" }}
        >
          {post.title}
        </h3>

        {/* Summary */}
        <p
          className="line-clamp-3 text-text-heading opacity-70 font-normal"
          style={{ fontSize: "18px", lineHeight: "30px" }}
        >
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}
