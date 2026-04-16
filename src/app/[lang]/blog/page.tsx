import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import BlogTopicFilter from "@/components/BlogTopicFilter";
import { getDictionary } from "@/get-dictionary";
import { getPayload } from "@/lib/payload";
import { BlogPost } from "@/types/blog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Post } from "@/payload-types";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { topic } = await searchParams;
  const dict = await getDictionary(lang);

  let title = dict.metadata.blog.title;
  if (typeof topic === "string" && topic !== "All") {
    const localizedTopic =
      dict.blog.topics[topic as keyof typeof dict.blog.topics] || topic;
    title = `${localizedTopic} | ${dict.metadata.blog.title}`;
  }

  return {
    title,
    description: dict.metadata.blog.description,
    alternates: {
      canonical: `https://asklyze.ai/${lang}/blog`,
      languages: {
        en: "https://asklyze.ai/en/blog",
        ar: "https://asklyze.ai/ar/blog",
      },
    },
  };
}

export default async function BlogPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { page: pageParam, topic: topicParam } = await searchParams;
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const currentPageParam =
    typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
  const selectedTopic =
    typeof topicParam === "string" && topicParam !== "All"
      ? topicParam
      : undefined;
  const limit = 6;

  const payload = await getPayload();

  // Fetch with optional category filter
  const { docs: allPostDocs, totalDocs } = await payload.find({
    collection: "posts",
    limit: 1000,
    sort: "-publishedDate",
    ...(selectedTopic
      ? { where: { category: { equals: selectedTopic } } }
      : {}),
  });

  // Fetch all posts for topic list (without filter)
  const { docs: allForTopics } = await payload.find({
    collection: "posts",
    limit: 1000,
    sort: "-publishedDate",
  });

  const topics = [
    "All",
    ...Array.from(new Set(allForTopics.map((p) => p.category))),
  ];

  const totalPages = Math.max(1, Math.ceil(totalDocs / limit));
  const currentPage =
    currentPageParam > 0 ? Math.min(currentPageParam, totalPages) : 1;
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;
  const startIndex = (currentPage - 1) * limit;
  const pagePosts = allPostDocs.slice(startIndex, startIndex + limit);

  // Map Payload Post → BlogPost shape expected by BlogCard
  const posts: Post[] = pagePosts.map((post) => ({
    id: post.id,
    slug: post.slug ?? "",
    title: lang === "ar" && post.titleAr ? post.titleAr : post.title,
    titleAr: post.titleAr ?? undefined,
    excerpt: lang === "ar" && post.excerptAr ? post.excerptAr : post.excerpt,
    excerptAr: post.excerptAr ?? undefined,
    category: post.category,
    author: {
      name: post.author.name,
      image: post.author.image ?? "/favicon-light.png",
      jobTitle:
        lang === "ar" && post.author.jobTitleAr
          ? post.author.jobTitleAr
          : (post.author.jobTitle ?? undefined),
      jobTitleAr: post.author.jobTitleAr ?? undefined,
    },
    date: new Date(post.publishedDate).toLocaleDateString(
      lang === "ar" ? "ar-EG" : "en-US",
      { year: "numeric", month: "short", day: "numeric" }
    ),
    publishedDate: post.publishedDate,
    image: post.image,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  }));

  const getPaginationUrl = (page: number) => {
    const nextParams = new URLSearchParams();
    nextParams.set("page", page.toString());
    if (selectedTopic) nextParams.set("topic", selectedTopic);
    return `/${lang}/blog?${nextParams.toString()}`;
  };

  const getTopicUrl = (topic: string) => {
    const nextParams = new URLSearchParams();
    if (topic !== "All") nextParams.set("topic", topic);
    return `/${lang}/blog?${nextParams.toString()}`;
  };

  return (
    <main className="min-h-screen w-full">
      <Navbar dict={dict.navbar} />

      <section
        className="hero-gradient rounded-5xl max-w-wide-section mx-auto lg:mx-[60px] pb-16 relative mt-4"
        style={{ paddingTop: "128px" }}
      >
        <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center gap-4">
            <h1 className="font-normal text-primary-dark text-center text-[44px] md:text-[64px] max-w-3xl">
              {dict.blog.title}
            </h1>
            <p className="text-base max-w-2xl leading-normal font-medium text-text-body">
              {dict.blog.description}
            </p>
          </div>
        </div>
      </section>
      <section className="section py-16 max-w-wide-section mx-auto lg:mx-[130px] flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto w-full">
          {posts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              lang={lang}
              delay={index * 0.1}
              dict={dict.blog}
            />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 text-text-muted">
            {dict.blog.noPosts}{" "}
            {selectedTopic
              ? ` "${dict.blog.topics[selectedTopic as keyof typeof dict.blog.topics] || selectedTopic}"`
              : ""}
            .
          </div>
        )}

        {totalPages > 1 && (
          <div
            className={cn(
              "flex justify-center items-center gap-3 mt-16",
              lang === "ar" ? "flex-row-reverse" : ""
            )}
          >
            {hasPrevPage && (
              <Link
                href={getPaginationUrl(currentPage - 1)}
                className="w-10 h-10 rounded-full bg-white text-gray-500 border border-gray-200 font-bold flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronLeft width={24} height={24} />
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Link
                  key={pageNum}
                  href={getPaginationUrl(pageNum)}
                  className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all ${
                    currentPage === pageNum
                      ? "bg-primary text-white shadow-lg scale-105"
                      : "bg-white text-gray-500 border border-gray-200 hover:border-primary hover:text-primary"
                  }`}
                >
                  {pageNum}
                </Link>
              )
            )}

            {hasNextPage && (
              <Link
                href={getPaginationUrl(currentPage + 1)}
                className="w-10 h-10 rounded-full bg-white text-gray-500 border border-gray-200 font-bold flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronRight width={24} height={24} />
              </Link>
            )}
          </div>
        )}
      </section>

      <Footer dict={dict.footer} />
    </main>
  );
}
