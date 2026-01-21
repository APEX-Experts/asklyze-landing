import { getPayload } from 'payload'
import config from '../../../payload.config'
import { blogData } from '@/data/blogData'
import { NextResponse } from 'next/server'

export async function GET() {
    const payload = await getPayload({ config: await config })

    // Check if posts exist
    const existingPosts = await payload.find({
        collection: 'posts',
        limit: 1,
    })

    if (existingPosts.docs.length > 0) {
        return NextResponse.json({ message: 'Posts already exist' })
    }

    // Seed posts
    for (const post of blogData) {
        await payload.create({
            collection: 'posts',
            data: {
                title: post.title,
                slug: post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                excerpt: post.excerpt,
                category: post.category as "Tutorial" | "Industry Trends" | "Features" | "Security" | "Case Study" | "Product Update", // Explicitly cast to allowed options
                publishedDate: new Date(post.date).toISOString(),
                image: post.image,
                author: {
                    name: post.author.name,
                    image: post.author.image,
                },
                content: {
                    root: {
                        children: [
                            {
                                children: [
                                    {
                                        detail: 0,
                                        format: 0,
                                        mode: 'normal',
                                        style: '',
                                        text: post.excerpt, // Simple content for now
                                        type: 'text',
                                        version: 1,
                                    },
                                ],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                type: 'paragraph',
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'root',
                        version: 1,
                    },
                },
            },
        })
    }

    return NextResponse.json({ message: `Seeded ${blogData.length} posts` })
}
