import { getPayload } from 'payload'
import config from '../payload.config'
import { blogData } from '../data/blogData'

const seed = async () => {
    console.log('--- Seeding Database ---')
    const payload = await getPayload({ config: await config })

    console.log('Checking for existing posts...')
    const existingPosts = await payload.find({
        collection: 'posts',
        limit: 1,
    })

    if (existingPosts.docs.length > 0) {
        console.log('Database already contains posts. Skipping seed.')
        process.exit(0)
    }

    console.log(`Seeding ${blogData.length} posts...`)

    for (const post of blogData) {
        try {
            await payload.create({
                collection: 'posts',
                data: {
                    title: post.title,
                    slug: post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                    excerpt: post.excerpt,
                    category: post.category as 'Analytics' | 'AI' | 'Enterprise',
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
                                            text: post.excerpt,
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
            console.log(`- Created post: ${post.title}`)
        } catch (error) {
            console.error(`- Failed to create post: ${post.title}`, error)
        }
    }

    console.log('--- Seed Completed Successfully ---')
    process.exit(0)
}

seed().catch((err) => {
    console.error('--- Seed Failed ---')
    console.error(err)
    process.exit(1)
})
