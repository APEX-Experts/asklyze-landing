import React from 'react';

interface BlogPostSchemaProps {
    post: any; // Using any to match the dynamic payload return type safely
    lang: string;
    slug: string;
}

export default function BlogPostSchema({ post, lang, slug }: BlogPostSchemaProps) {
    const baseUrl = 'https://asklyze.ai';
    const url = `${baseUrl}/${lang}/blog/${slug}`;
    const imageUrl = post.image || `${baseUrl}/logo.png`;

    // Format date specifically for Schema (ISO 8601)
    const datePublished = new Date(post.publishedDate || post.date || new Date()).toISOString();
    const dateModified = new Date(post.updatedAt || post.publishedDate || post.date || new Date()).toISOString();

    const title = lang === 'ar' && post.titleAr ? post.titleAr : post.title;
    const description = lang === 'ar' && post.excerptAr ? post.excerptAr : post.excerpt;
    const authorName = post.author?.name || 'Asklyze Team';

    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "image": imageUrl,
        "datePublished": datePublished,
        "dateModified": dateModified,
        "author": {
            "@type": "Person",
            "name": authorName,
            "url": `${baseUrl}/${lang}/about` // Linking to about page as author profile
        },
        "publisher": {
            "@type": "Organization",
            "name": "ASKLYZE",
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/logo.png`
            }
        },
        "description": description,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
