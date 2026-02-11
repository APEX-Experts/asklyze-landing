import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/', '/graphql'],
        },
        sitemap: 'https://asklyze.ai/sitemap.xml',
    }
}
