export const revalidate = 60;

import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getDictionary } from "@/get-dictionary";
import { getPayload } from "@/lib/payload";
import { cn } from "@/lib/utils";
import { Post } from "@/payload-types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

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

  const siteUrl = dict.siteSettings.siteUrl.endsWith("/")
    ? dict.siteSettings.siteUrl
    : `${dict.siteSettings.siteUrl}/`;

  return {
    title,
    description: dict.metadata.blog.description,
    alternates: {
      canonical: `${siteUrl}${lang}/blog`,
      languages: {
        en: `${siteUrl}en/blog`,
        ar: `${siteUrl}ar/blog`,
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

  if (dict.blog.isEnabled === false) {
    return (
      <main className="min-h-screen w-full">
        <Navbar dict={dict.navbar} siteSettings={dict.siteSettings} />
        <div className="flex-1" />
        <Footer dict={dict.footer} siteSettings={dict.siteSettings} />
      </main>
    );
  }

  const currentPageParam =
    typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
  const selectedTopic =
    typeof topicParam === "string" && topicParam !== "All"
      ? topicParam
      : undefined;
  const limit = 6;
  const initialPage = currentPageParam > 0 ? currentPageParam : 1;

  const payload = await getPayload();

  // Fetch with optional category filter using server-side pagination
  const {
    docs: pagePosts,
    totalPages: payloadTotalPages,
    hasNextPage,
    hasPrevPage,
    page: payloadPage,
  } = await payload.find({
    collection: "posts",
    limit: limit,
    page: initialPage,
    sort: "-publishedDate",
    ...(selectedTopic
      ? { where: { category: { equals: selectedTopic } } }
      : {}),
  });

  const totalPages = Math.max(1, payloadTotalPages);
  const currentPage = payloadPage || initialPage;

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

  return (
    <main className="min-h-screen w-full">
      <Navbar dict={dict.navbar} siteSettings={dict.siteSettings} />

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
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} lang={lang} dict={dict.blog} />
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

      <Footer dict={dict.footer} siteSettings={dict.siteSettings} />
    </main>
  );
}
