import { MetadataRoute } from 'next';
import { getPayload } from '@/lib/payload';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  const locales = ['en', 'ar'];

  const routes = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
    '/security',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Static routes
  routes.forEach((route) => {
    locales.forEach((lang) => {
      sitemap.push({
        url: `${baseUrl}/${lang}${route}`,
        changeFrequency: route === '/blog' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            ar: `${baseUrl}/ar${route}`,
            'x-default': `${baseUrl}/en${route}`,
          },
        },
      });
    });
  });

  // Dynamic blog posts
  const payload = await getPayload();

  const posts = await payload.find({
    collection: 'posts',
    limit: 1000,
  });

  posts.docs.forEach((post) => {
    locales.forEach((lang) => {
      sitemap.push({
        url: `${baseUrl}/${lang}/blog/${post.slug}`,
        lastModified: new Date(post.publishedDate || post.createdAt),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/${post.slug}`,
            ar: `${baseUrl}/ar/blog/${post.slug}`,
            'x-default': `${baseUrl}/en/blog/${post.slug}`,
          },
        },
      });
    });
  });

  return sitemap;
}