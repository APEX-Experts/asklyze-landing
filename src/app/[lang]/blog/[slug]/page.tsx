import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostSchema from "@/components/BlogPostSchema";
import { blogData } from "@/data/blogData";
import { getDictionary } from "@/get-dictionary";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lang: string }> }): Promise<Metadata> {
    const { slug, lang } = await params;
    const post = blogData.find((entry) => entry.slug === slug);

    if (!post) {
        return {
            title: "Post Not Found",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const title = lang === "ar" && post.titleAr ? post.titleAr : post.title;
    const description = lang === "ar" && post.excerptAr ? post.excerptAr : post.excerpt;
    const canonicalUrl = `https://asklyze.ai/${lang}/blog/${slug}`;

    return {
        title: `${title} | ASKLYZE Blog`,
        description: description || `Read ${post.title} on the ASKLYZE blog.`,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `https://asklyze.ai/en/blog/${slug}`,
                ar: `https://asklyze.ai/ar/blog/${slug}`,
            },
        },
        openGraph: {
            type: "article",
            title,
            description: description || `Read ${post.title} on the ASKLYZE blog.`,
            url: canonicalUrl,
            images: [
                {
                    url: post.image || "/logo.png",
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: description || `Read ${post.title} on the ASKLYZE blog.`,
            images: [post.image || "/logo.png"],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; lang: string }> }) {
    const { slug, lang } = await params;
    const dict = await getDictionary(lang);
    const post = blogData.find((entry) => entry.slug === slug);

    if (!post) {
        return notFound();
    }

    const authorName = post.author?.name || "Unknown Author";
    const authorImage = post.author?.image || null;
    const authorJobTitle = lang === "ar" && post.author?.jobTitleAr ? post.author.jobTitleAr : (post.author?.jobTitle || null);
    const category = post.category || "General";
    const displayTitle = lang === "ar" && post.titleAr ? post.titleAr : post.title;
    const displayContent = lang === "ar" && post.contentHtmlAr ? post.contentHtmlAr : post.contentHtml;
    const heroImage = post.heroImage || post.image;

    return (
        <main className="min-h-screen bg-[#0f0f18]">
            <BlogPostSchema post={post} lang={lang} slug={slug} />
            <Navbar dict={dict.navbar} />

            <div className="absolute top-0 right-0 w-1/3 h-[800px] bg-gradient-to-l from-[#ff705a]/5 to-transparent opacity-60 -z-10" />

            <section className="relative pt-48 pb-16 overflow-hidden">
                <div className="container max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 bg-black/60 backdrop-blur-sm border border-[#ff705a]/20 text-[#ff705a] rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                        {dict.blog.topics[category as keyof typeof dict.blog.topics] || category}
                    </span>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
                        {displayTitle}
                    </h1>

                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 mb-12">
                        <Link href={`/${lang}`} className="hover:text-[#ff705a] transition-colors">{dict.blog.breadcrumbHome}</Link>
                        <span>•</span>
                        <Link href={`/${lang}/blog`} className="hover:text-[#ff705a] transition-colors">{dict.blog.breadcrumbBlog}</Link>
                        <span>•</span>
                        <span className="text-gray-400 truncate max-w-[200px]">
                            {displayTitle}
                        </span>
                    </div>

                    <div className="flex items-center justify-center gap-4 py-8 border-y border-white/5">
                        {authorImage && (
                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
                                <Image
                                    src={authorImage}
                                    alt={authorName}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="text-left">
                            <p className="text-white font-bold text-lg leading-tight">{authorName}</p>
                            <div className="flex items-center gap-2 mt-1">
                                {authorJobTitle && <span className="text-[#ff705a] text-xs font-semibold">{authorJobTitle}</span>}
                                <span className="text-gray-500 text-xs">•</span>
                                <span className="text-gray-500 text-xs">
                                    {new Date(post.publishedDate || post.date).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {heroImage && (
                <section className="pb-16 px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="relative w-full aspect-[16/9] rounded-[32px] overflow-hidden shadow-2xl border border-white/10">
                            <Image
                                src={heroImage}
                                alt={displayTitle}
                                fill
                                className="object-cover transform hover:scale-105 transition-transform duration-1000"
                                priority
                                unoptimized={heroImage.endsWith(".gif")}
                            />
                        </div>
                    </div>
                </section>
            )}

            <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 prose prose-lg prose-invert prose-headings:text-white prose-p:text-gray-400 prose-p:leading-relaxed prose-li:text-gray-400 prose-a:text-[#ff705a] prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-blockquote:border-[#ff705a] prose-blockquote:bg-white/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-img:rounded-2xl">
                {displayContent ? (
                    <div dangerouslySetInnerHTML={{ __html: displayContent }} />
                ) : null}
            </article>

            <div className="max-w-3xl mx-auto px-4 pb-32 text-center border-t border-white/5 pt-12">
                <Link
                    href={`/${lang}/blog`}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-[#ff705a] border border-white/10 hover:border-[#ff705a] text-white font-bold rounded-full transition-all group"
                >
                    <span className="transition-transform group-hover:-translate-x-1">{"←"}</span>
                    {lang === "ar" ? "العودة إلى المدونة" : "Back to Blog"}
                </Link>
            </div>

            <Footer dict={dict.footer} />
        </main>
    );
}
