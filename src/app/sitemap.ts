import { MetadataRoute } from 'next'
import { getPayload } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://asklyze.ai'
    const locales = ['en', 'ar']
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

    // 1. Map Static Routes with Multi-language Alternates
    routes.forEach((route) => {
        locales.forEach((lang) => {
            sitemaps.push({
                url: `${baseUrl}/${lang}${route}`,
                changeFrequency: route === '/blog' ? 'daily' : 'weekly',
                priority: route === '' ? 1 : 0.8,
                alternates: {
                    languages: {
                        en: `${baseUrl}/en${route}`,
                        ar: `${baseUrl}/ar${route}`,
                    },
                },
            })
        })
    })

    // 2. Fetch Payload Posts (Ensure we only get published ones)
    const payload = await getPayload()
    const posts = await payload.find({
        collection: "posts",
        limit: 1000, // Note: If you exceed 1000 posts, you'll need to paginate this request
        where: {
            _status: {
                equals: 'published'
            }
        }
    })

    // 3. Map Dynamic Blog Routes with Multi-language Alternates
    posts.docs.forEach((post) => {
        locales.forEach((lang) => {
            sitemaps.push({
                url: `${baseUrl}/${lang}/blog/${post.slug}`,
                // Fallback to createdAt if publishedDate isn't set yet
                lastModified: new Date(post.publishedDate || post.createdAt), 
                changeFrequency: 'weekly',
                priority: 0.7,
                alternates: {
                    languages: {
                        en: `${baseUrl}/en/blog/${post.slug}`,
                        ar: `${baseUrl}/ar/blog/${post.slug}`,
                    },
                },
            })
        })
    })

    return sitemaps
}