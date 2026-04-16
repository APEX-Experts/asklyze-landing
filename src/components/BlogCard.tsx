"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BlogPost } from "../types/blog";
import { User, Calendar } from "lucide-react";

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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group rounded-2xl overflow-hidden border border-white/8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#ff705a]/15"
      style={{ background: "rgba(20, 20, 35, 0.6)" }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          unoptimized
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#ff705a] uppercase tracking-wide border border-white/10">
          {dict.topics[post.category as keyof typeof dict.topics] ||
            post.category}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Meta Row */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <User size={14} className="text-[#ff705a]" />
            <div className="flex flex-col">
              <span className="font-medium">{post.author.name}</span>
              {post.author.jobTitle && (
                <span className="text-[10px] opacity-70 leading-none">
                  {post.author.jobTitle}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-[#ff705a]" />
            <span>{post.date}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-[#ff705a] transition-colors">
          <Link href={`/${lang}/blog/${post.slug}`} className="line-clamp-2">
            {post.title}
          </Link>
        </h3>

        <p className="text-gray-400 text-sm mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer/Link */}
        <div className="border-t border-white/8 pt-4 flex items-center justify-between">
          <Link
            href={`/${lang}/blog/${post.slug}`}
            className="text-sm font-bold text-gray-300 hover:text-[#ff705a] flex items-center gap-1 transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
