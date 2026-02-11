import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { getPayload } from 'payload'
import config from '../../../payload.config'
import Link from "next/link";
import { BlogPost } from "@/types/blog";

export const dynamic = 'force-dynamic'

import { getDictionary } from "@/get-dictionary";

export async function generateMetadata({
    params,
    searchParams
}: {
    params: Promise<{ lang: "en" | "ar" }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
    const { lang } = await params;
    const { topic } = await searchParams;
    const dict = await getDictionary(lang);

    let title = dict.metadata.blog.title;
    if (typeof topic === 'string' && topic !== 'All') {
        const localizedTopic = dict.blog.topics[topic as keyof typeof dict.blog.topics] || topic;
        title = `${localizedTopic} | ${dict.metadata.blog.title}`;
    }

    return {
        title,
        description: dict.metadata.blog.description,
        alternates: {
            canonical: `https://asklyze.ai/${lang}/blog`,
            languages: {
                'en': 'https://asklyze.ai/en/blog',
                'ar': 'https://asklyze.ai/ar/blog',
            },
        },
    };
}

export default async function BlogPage({
    searchParams,
    params
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>,
    params: Promise<{ lang: "en" | "ar" }>
}) {
    const { page: pageParam, topic: topicParam } = await searchParams
    const { lang } = await params
    const dict = await getDictionary(lang);
    const currentPage = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1
    const selectedTopic = typeof topicParam === 'string' ? topicParam : undefined
    const limit = 6

    const payload = await getPayload({ config: await config })

    // Fetch results with optional category filter
    const postsResult = await payload.find({
        collection: 'posts',
        sort: '-publishedDate',
        limit,
        page: currentPage,
        locale: lang,
        where: selectedTopic ? {
            category: {
                equals: selectedTopic
            }
        } : undefined
    })

    const { totalPages, hasNextPage, hasPrevPage } = postsResult

    // Define available topics based on collection options
    const topics = ['All', 'Tutorial', 'Industry Trends', 'Features', 'Security', 'Case Study', 'Product Update']

    // Map Payload results to existing BlogCard interface
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts: BlogPost[] = postsResult.docs.map((doc: any) => ({
        id: doc.id,
        slug: doc.slug,
        title: lang === 'ar' && doc.titleAr ? doc.titleAr : doc.title,
        excerpt: lang === 'ar' && doc.excerptAr ? doc.excerptAr : doc.excerpt,
        category: doc.category,
        author: {
            name: doc.author?.name || 'Unknown',
            image: doc.author?.image || 'https://i.pravatar.cc/150?u=unknown',
            jobTitle: lang === 'ar' && doc.author?.jobTitleAr ? doc.author?.jobTitleAr : doc.author?.jobTitle,
        },
        date: new Date(doc.publishedDate).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        image: doc.image,
    }))

    const getPaginationUrl = (page: number) => {
        const params = new URLSearchParams()
        params.set('page', page.toString())
        if (selectedTopic) params.set('topic', selectedTopic)
        return `/${lang}/blog?${params.toString()}`
    }

    const getTopicUrl = (topic: string) => {
        const params = new URLSearchParams()
        if (topic !== 'All') params.set('topic', topic)
        return `/${lang}/blog?${params.toString()}`
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar dict={dict.navbar} />

            {/* Blog Hero */}
            <section className="relative pt-48 pb-16 overflow-hidden">
                {/* Background Details */}
                <div className="absolute inset-0 bg-[#f9fbfd] -z-10" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#ffece8] to-transparent opacity-60 -z-10" />

                <div className="container text-center">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold text-[#2c234d] mb-6">
                            {dict.blog.title.split(dict.blog.titleHighlight)[0]} <span className="text-[#ff705a]">{dict.blog.titleHighlight}</span> {dict.blog.title.split(dict.blog.titleHighlight)[1]}
                        </h1>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
                            {dict.blog.description}
                        </p>

                        <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500">
                            <Link href={`/${lang}`} className="hover:text-[#ff705a] transition-colors">{dict.blog.breadcrumbHome}</Link>
                            <span>•</span>
                            <Link href={`/${lang}/blog`} className={`${!selectedTopic ? 'text-[#ff705a]' : 'hover:text-[#ff705a] transition-colors'}`}>
                                {dict.blog.breadcrumbBlog}
                            </Link>
                            {selectedTopic && selectedTopic !== 'All' && (
                                <>
                                    <span>•</span>
                                    <span className="text-[#ff705a]">
                                        {dict.blog.topics[selectedTopic as keyof typeof dict.blog.topics] || selectedTopic}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Topic Filter */}
            <section className="pb-12 bg-[#f9fbfd]">
                <div className="container">
                    <div className="flex flex-wrap justify-center gap-3">
                        {topics.map((topic) => (
                            <Link
                                key={topic}
                                href={getTopicUrl(topic)}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${(topic === 'All' && !selectedTopic) || topic === selectedTopic
                                    ? "bg-[#ff705a] text-white shadow-md"
                                    : "bg-white text-gray-500 border border-gray-100 hover:border-[#ff705a] hover:text-[#ff705a]"
                                    }`}
                            >
                                {dict.blog.topics[topic as keyof typeof dict.blog.topics] || topic}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="section pt-16 pb-24">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <BlogCard key={post.id} post={post} lang={lang} delay={index * 0.1} dict={dict.blog} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {posts.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            {dict.blog.noPosts} {selectedTopic ? `${dict.blog.inTopic} "${dict.blog.topics[selectedTopic as keyof typeof dict.blog.topics] || selectedTopic}"` : ''}. <Link href="/admin" className="text-[#ff705a] font-bold">{dict.blog.adminLinkText}</Link> {dict.blog.adminLinkPrefix}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-3 mt-16">
                            {hasPrevPage && (
                                <Link
                                    href={getPaginationUrl(currentPage - 1)}
                                    className="w-10 h-10 rounded-full bg-white text-gray-500 border border-gray-200 font-bold flex items-center justify-center hover:border-[#ff705a] hover:text-[#ff705a] transition-colors"
                                >
                                    {'<'}
                                </Link>
                            )}

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <Link
                                    key={pageNum}
                                    href={getPaginationUrl(pageNum)}
                                    className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all ${currentPage === pageNum
                                        ? "bg-[#ff705a] text-white shadow-lg scale-105"
                                        : "bg-white text-gray-500 border border-gray-200 hover:border-[#ff705a] hover:text-[#ff705a]"
                                        }`}
                                >
                                    {pageNum}
                                </Link>
                            ))}

                            {hasNextPage && (
                                <Link
                                    href={getPaginationUrl(currentPage + 1)}
                                    className="w-10 h-10 rounded-full bg-white text-gray-500 border border-gray-200 font-bold flex items-center justify-center hover:border-[#ff705a] hover:text-[#ff705a] transition-colors"
                                >
                                    {'>'}
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
