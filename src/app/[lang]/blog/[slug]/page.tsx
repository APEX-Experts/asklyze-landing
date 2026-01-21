import { getPayload } from 'payload'
import config from '../../../../payload.config'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const dynamic = 'force-dynamic'

import { getDictionary } from "@/get-dictionary";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lang: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const payload = await getPayload({ config: await config });
    const posts = await payload.find({
        collection: "posts",
        where: { slug: { equals: slug } },
    });

    if (!posts.docs.length) return { title: "Post Not Found" };
    const post = posts.docs[0];
    const { lang } = await params;
    const title = lang === 'ar' && post.titleAr ? post.titleAr : post.title;

    return {
        title: `${title} | ASKLYZE Blog`,
        description: post.excerpt || `Read ${post.title} on the ASKLYZE blog.`,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; lang: string }> }) {
    const { slug, lang } = await params
    const dict = await getDictionary(lang);
    const payload = await getPayload({ config: await config })

    const result = await payload.find({
        collection: 'posts',
        locale: lang as 'en' | 'ar',
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    const post = result.docs[0]

    if (!post) {
        return notFound()
    }

    // Determine types for author/category which might be strings or relations?
    // Based on schema, author is group-group, category is select (string).
    const authorName = post.author?.name || 'Unknown Author'
    const authorImage = post.author?.image || null
    const authorJobTitle = lang === 'ar' && post.author?.jobTitleAr ? post.author?.jobTitleAr : (post.author?.jobTitle || null)
    const category = post.category || 'General'
    const displayTitle = lang === 'ar' && post.titleAr ? post.titleAr : post.title
    const displayContent = lang === 'ar' && post.contentAr ? post.contentAr : post.content

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar dict={dict.navbar} />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block px-3 py-1 bg-coral-100 text-coral-600 rounded-full text-sm font-medium mb-4">
                        {dict.blog.topics[category as keyof typeof dict.blog.topics] || category}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">
                        {displayTitle}
                    </h1>

                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 mb-8 border-b border-slate-100 pb-8">
                        <Link href={`/${lang}`} className="hover:text-coral-500 transition-colors">{dict.blog.breadcrumbHome}</Link>
                        <span>•</span>
                        <Link href={`/${lang}/blog`} className="hover:text-coral-500 transition-colors">{dict.blog.breadcrumbBlog}</Link>
                        <span>•</span>
                        <Link
                            href={`/${lang}/blog?topic=${category}`}
                            className="hover:text-coral-500 transition-colors"
                        >
                            {dict.blog.topics[category as keyof typeof dict.blog.topics] || category}
                        </Link>
                    </div>

                    <div className="flex items-center justify-center space-x-4 mb-4">
                        {authorImage && (
                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                                <Image
                                    src={authorImage}
                                    alt={authorName}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="text-left">
                            <p className="text-navy-900 font-medium">{authorName}</p>
                            {authorJobTitle && <p className="text-slate-400 text-xs">{authorJobTitle}</p>}
                            <p className="text-slate-500 text-sm">
                                {new Date(post.publishedDate).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            {post.image && (
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src={post.image as string}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            )}

            {/* Content Body */}
            <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 prose prose-lg prose-slate prose-headings:text-navy-900 prose-a:text-coral-500">
                {displayContent && (
                    <RichText data={displayContent} />
                )}
            </article>

            <div className="max-w-3xl mx-auto px-4 mb-24 text-center">
                <Link
                    href={`/${lang}/blog`}
                    className="inline-flex items-center font-medium text-coral-500 hover:text-coral-600 transition-colors"
                >
                    {lang === 'ar' ? '← العودة إلى المدونة' : '← Back to Blog'}
                </Link>
            </div>

            <Footer dict={dict.footer} />
        </main>
    )
}
