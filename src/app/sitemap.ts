import { MetadataRoute } from 'next'
import { blogData } from '../data/blogData'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://asklyze.ai'
    const platforms = ['en', 'ar']
    const routes = [
        '',
        '/about',
        '/blog',
        '/contact',
        '/privacy',
        '/terms',
        '/security'
    ]

    const sitemaps: MetadataRoute.Sitemap = []

    // Static routes
    platforms.forEach((lang) => {
        routes.forEach((route) => {
            sitemaps.push({
                url: `${baseUrl}/${lang}${route}`,
                lastModified: new Date(),
                changeFrequency: route === '/blog' ? 'daily' : 'weekly',
                priority: route === '' ? 1 : 0.8,
            })
        })
    })

    blogData.forEach((post) => {
        platforms.forEach((lang) => {
            sitemaps.push({
                url: `${baseUrl}/${lang}/blog/${post.slug}`,
                lastModified: new Date(post.publishedDate || new Date()),
                changeFrequency: 'weekly',
                priority: 0.7,
            })
        })
    })

    return sitemaps
}
