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

export default function BlogCard({ post, lang, delay = 0, dict }: BlogCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className="group bg-[var(--color-bg-card)] rounded-2xl overflow-hidden border border-[var(--color-border)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-2"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden aspect-[16/10]">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-[var(--color-bg-accent)]/90 border border-[var(--color-border)] backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[var(--color-primary)] uppercase tracking-wide">
                    {dict.topics[post.category as keyof typeof dict.topics] || post.category}
                </div>
            </div>

            {/* Content Container */}
            <div className="p-6">
                {/* Meta Row */}
                <div className="flex items-center gap-4 text-xs text-[var(--color-body-secondary)] mb-4">
                    <div className="flex items-center gap-1">
                        <User size={14} className="text-[var(--color-primary)]" />
                        <div className="flex flex-col">
                            <span className="font-medium">{post.author.name}</span>
                            {post.author.jobTitle && <span className="text-[10px] opacity-70 leading-none">{post.author.jobTitle}</span>}
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-[var(--color-primary)]" />
                        <span>{post.date}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-[var(--color-heading)] mb-3 leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                    <Link href={`/${lang}/blog/${post.slug}`} className="line-clamp-2">
                        {post.title}
                    </Link>
                </h3>

                <p className="text-[var(--color-body)] text-sm mb-6 line-clamp-3">
                    {post.excerpt}
                </p>

                {/* Footer/Link */}
                <div className="border-t border-[var(--color-border)] pt-4 flex items-center justify-between">
                    <Link
                        href={`/${lang}/blog/${post.slug}`}
                        className="text-sm font-bold text-[var(--color-heading)] hover:text-[var(--color-primary)] flex items-center gap-1 transition-colors"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
