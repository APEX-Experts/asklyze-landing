import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { getDictionary } from "@/get-dictionary";
import { getPayload } from "@/lib/payload";
import { BlogPost } from "@/types/blog";

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
  const posts: BlogPost[] = pagePosts.map((post) => ({
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
    <main className="min-h-screen bg-[#0f0f18]">
      <Navbar dict={dict.navbar} />

      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#0f0f18] -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-[#ff705a]/5 to-transparent opacity-60 -z-10" />

        <div className="container text-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {dict.blog.title.split(dict.blog.titleHighlight)[0]}{" "}
              <span className="text-[#ff705a]">{dict.blog.titleHighlight}</span>{" "}
              {dict.blog.title.split(dict.blog.titleHighlight)[1]}
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              {dict.blog.description}
            </p>

            <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-400">
              <Link
                href={`/${lang}`}
                className="hover:text-[#ff705a] transition-colors"
              >
                {dict.blog.breadcrumbHome}
              </Link>
              <span>•</span>
              <Link
                href={`/${lang}/blog`}
                className={`${!selectedTopic ? "text-[#ff705a]" : "hover:text-[#ff705a] transition-colors"}`}
              >
                {dict.blog.breadcrumbBlog}
              </Link>
              {selectedTopic && (
                <>
                  <span>•</span>
                  <span className="text-[#ff705a]">
                    {dict.blog.topics[
                      selectedTopic as keyof typeof dict.blog.topics
                    ] || selectedTopic}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 bg-[#0f0f18]">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-3">
            {topics.map((topic) => (
              <Link
                key={topic}
                href={getTopicUrl(topic)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  (topic === "All" && !selectedTopic) || topic === selectedTopic
                    ? "bg-[#ff705a] text-white shadow-md"
                    : "bg-white/5 text-gray-400 border border-white/8 hover:border-[#ff705a] hover:text-[#ff705a]"
                }`}
              >
                {dict.blog.topics[topic as keyof typeof dict.blog.topics] ||
                  topic}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-16 pb-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="text-center py-20 text-gray-400">
              {dict.blog.noPosts}{" "}
              {selectedTopic
                ? `${dict.blog.inTopic} "${dict.blog.topics[selectedTopic as keyof typeof dict.blog.topics] || selectedTopic}"`
                : ""}
              .
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-16">
              {hasPrevPage && (
                <Link
                  href={getPaginationUrl(currentPage - 1)}
                  className="w-10 h-10 rounded-full bg-white/5 text-gray-400 border border-white/8 font-bold flex items-center justify-center hover:border-[#ff705a] hover:text-[#ff705a] transition-colors"
                >
                  {"<"}
                </Link>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <Link
                    key={pageNum}
                    href={getPaginationUrl(pageNum)}
                    className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all ${
                      currentPage === pageNum
                        ? "bg-[#ff705a] text-white shadow-lg scale-105"
                        : "bg-white/5 text-gray-400 border border-white/8 hover:border-[#ff705a] hover:text-[#ff705a]"
                    }`}
                  >
                    {pageNum}
                  </Link>
                )
              )}

              {hasNextPage && (
                <Link
                  href={getPaginationUrl(currentPage + 1)}
                  className="w-10 h-10 rounded-full bg-white/5 text-gray-400 border border-white/8 font-bold flex items-center justify-center hover:border-[#ff705a] hover:text-[#ff705a] transition-colors"
                >
                  {">"}
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer dict={dict.footer} />
    </main>
  );
}
