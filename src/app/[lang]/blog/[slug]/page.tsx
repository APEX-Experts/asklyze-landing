export const revalidate = 60;

import BlogCarousel from "@/components/BlogCarousel";
import BlogPostSchema from "@/components/BlogPostSchema";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getDictionary } from "@/get-dictionary";
import { getPayload } from "@/lib/payload";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang);
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  const post = docs[0];

  if (!post) {
    return {
      title: dict.blog.article.postNotFound,
      robots: { index: false, follow: false },
    };
  }

  const siteUrl = dict.siteSettings.siteUrl.endsWith("/")
    ? dict.siteSettings.siteUrl
    : `${dict.siteSettings.siteUrl}/`;
  const title = lang === "ar" && post.titleAr ? post.titleAr : post.title;
  const description =
    lang === "ar" && post.excerptAr ? post.excerptAr : post.excerpt;
  const canonicalUrl = `${siteUrl}${lang}/blog/${slug}`;

  return {
    title: `${title} | ASKLYZE Blog`,
    description: description || `Read ${post.title} on the ASKLYZE blog.`,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteUrl}en/blog/${slug}`,
        ar: `${siteUrl}ar/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title,
      description: description || `Read ${post.title} on the ASKLYZE blog.`,
      url: canonicalUrl,
      images: [{ url: post.image || "/logo.png", alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || `Read ${post.title} on the ASKLYZE blog.`,
      images: [post.image || "/logo.png"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; lang: "en" | "ar" }>;
}) {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang);

  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  const post = docs[0];

  if (!post) {
    return notFound();
  }

  const authorName = post.author?.name || dict.blog.article.unknownAuthor;
  const authorImage = post.author?.image || null;
  const category = post.category || dict.blog.article.generalCategory;
  const displayTitle =
    lang === "ar" && post.titleAr ? post.titleAr : post.title;

  const richContent =
    lang === "ar" && post.contentAr ? post.contentAr : post.content;

  const heroImage = post.image;

  const { docs: relatedDocs } = await payload.find({
    collection: "posts",
    where: {
      category: { equals: post.category },
      slug: { not_equals: slug },
    },
    limit: 6,
    sort: "-publishedDate",
  });
  const relatedPosts = relatedDocs.filter((p) => p.slug);

  return (
    <main className="min-h-screen w-full bg-bg">
      <BlogPostSchema
        post={post}
        lang={lang}
        slug={slug}
        siteUrl={dict.siteSettings.siteUrl}
      />
      <Navbar dict={dict.navbar} siteSettings={dict.siteSettings} />

      <section className="max-w-wide-section mx-auto lg:mx-[60px] relative mt-4 rounded-[50px] overflow-hidden hero-gradient">
        <div className="flex flex-col lg:flex-row items-center w-full gap-10 p-6 md:p-12 lg:px-24 lg:py-8 lg:pt-32">
          {heroImage && (
            <div className="w-full lg:w-[570px] lg:h-[320px]">
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl border border-white/50">
                <Image
                  src={heroImage}
                  alt={displayTitle}
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          <div
            className={`w-full ${heroImage ? "lg:w-1/2" : ""} flex flex-col items-start gap-6`}
          >
            {/* Topic Badge */}
            <span
              className="self-start flex items-center justify-center gap-1 rounded-[6px] text-sm font-medium bg-primary-light text-primary"
              style={{ padding: "4px 10px" }}
            >
              {dict.blog.topics[category as keyof typeof dict.blog.topics] ||
                category}
            </span>

            {/* Title */}
            <h1
              className="text-primary-dark m-0 text-3xl md:text-5xl"
              style={{
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "normal",
              }}
            >
              {displayTitle}
            </h1>

            {/* Mins Read, Author, Date row */}
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6 mt-4">
              {/* Author */}
              <div className="flex items-center gap-3">
                {authorImage && (
                  <div className="relative w-[56px] h-[56px] rounded-full overflow-hidden shadow-sm">
                    <Image
                      src={authorImage}
                      alt={authorName}
                      unoptimized
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-text-heading text-lg leading-[150%]">
                    {authorName}
                  </span>
                  <span className="text-gray-550 leading-[150%]">
                    {dict.blog.article.authorLabel}
                  </span>
                </div>
              </div>

              <div className="bg-gray-300 w-px h-[50px] max-sm:hidden"></div>

              {/* Mins Read */}
              <div className="flex flex-row items-center gap-3">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30 33.0001H9.75C7.67893 33.0001 6 31.3212 6 29.2501M6 29.2501V16.0255C6 11.5487 6 9.31023 7.13493 7.73785C7.51075 7.21716 7.96774 6.76018 8.48842 6.38434C10.0608 5.24941 12.2993 5.24941 16.7762 5.24941C18.2408 5.24941 20.0244 5.32659 21.5037 5.3466C22.8525 5.36484 23.5269 5.37397 24.7833 5.15196C26.0395 4.92994 26.1738 4.8789 26.4423 4.77681C27.5973 4.33764 28.6908 3.65462 30 3V17.2502C30 20.0459 30 21.4437 29.5432 22.5464C28.9342 24.0165 27.7662 25.1845 26.2961 25.7935C25.1934 26.2501 23.7957 26.2501 21 26.2501H9C7.34314 26.2501 6 27.5934 6 29.2501Z"
                    stroke="#757575"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M27 25.5V33"
                    stroke="#757575"
                    strokeWidth="2.25"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6V12"
                    stroke="#757575"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-550 font-medium leading-[150%]">
                  {Math.max(
                    1,
                    Math.ceil(JSON.stringify(richContent || {}).length / 3000)
                  )}{" "}
                  {dict.blog.article.mins}
                </span>
              </div>

              <div className="bg-gray-300 w-px h-[50px] max-sm:hidden"></div>

              {/* Date */}
              <div className="flex flex-row items-center gap-3">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27 3V6M9 3V6"
                    stroke="#757575"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.75 18.3648C3.75 11.8289 3.75 8.56092 5.62818 6.53046C7.50636 4.5 10.5292 4.5 16.575 4.5H19.425C25.4707 4.5 28.4937 4.5 30.3719 6.53046C32.25 8.56092 32.25 11.8289 32.25 18.3648V19.1352C32.25 25.6711 32.25 28.9391 30.3719 30.9696C28.4937 33 25.4707 33 19.425 33H16.575C10.5292 33 7.50636 33 5.62818 30.9696C3.75 28.9391 3.75 25.6711 3.75 19.1352V18.3648Z"
                    stroke="#757575"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.5 12H31.5"
                    stroke="#757575"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-550 font-medium leading-[150%]">
                  {new Date(post.publishedDate).toLocaleDateString(
                    lang === "ar" ? "ar-EG" : "en-US",
                    { year: "numeric", month: "short", day: "numeric" }
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 prose prose-lg prose-headings:text-primary-dark prose-p:text-text-body prose-p:leading-relaxed prose-li:text-text-body prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-primary-dark prose-blockquote:border-primary prose-blockquote:bg-primary-light prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-img:rounded-2xl">
        {richContent ? <RichText data={richContent} /> : null}
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-12 md:py-16 px-4 md:px-8 lg:px-24 border-t border-gray-100">
          <div className="max-w-full flex flex-col items-center mx-auto bg-bg-card rounded-5xl gap-10 justify-center py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12">
            <h2 className="text-3xl lg:text-[40px] font-bold text-center text-primary-dark">
              {dict.blog.article.relatedArticles}
            </h2>
            <BlogCarousel
              posts={relatedPosts}
              lang={lang}
              showAll={dict.blogSection.showAll}
              blogDict={dict.blog}
            />
          </div>
        </section>
      )}

      <Footer dict={dict.footer} siteSettings={dict.siteSettings} />
    </main>
  );
}
