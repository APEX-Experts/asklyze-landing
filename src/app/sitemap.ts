import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://asklyze.com'
    const platforms = ['en', 'ar']
    const routes = [
        '',
        '/about',
        '/features',
        '/pricing',
        '/blog',
        '/contact',
        '/privacy',
        '/terms',
        '/security'
    ]

    const sitemaps: MetadataRoute.Sitemap = []

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

    return sitemaps
}
