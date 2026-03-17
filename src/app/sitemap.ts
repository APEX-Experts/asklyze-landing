import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '../payload.config'

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

    // Dynamic blog posts
    try {
        const payload = await getPayload({ config: await config })
        const posts = await payload.find({
            collection: 'posts',
            limit: 1000,
            depth: 0,
            pagination: false
        })

        posts.docs.forEach((post) => {
            platforms.forEach((lang) => {
                sitemaps.push({
                    url: `${baseUrl}/${lang}/blog/${post.slug}`,
                    lastModified: new Date(post.updatedAt || post.publishedDate || new Date()),
                    changeFrequency: 'weekly',
                    priority: 0.7,
                })
            })
        })
    } catch (error) {
        console.error('Error fetching blog posts for sitemap:', error)
    }

    return sitemaps
}
