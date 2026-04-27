import * as dotenv from 'dotenv'
dotenv.config()
process.env.SEEDING = "true";
import { getPayload } from 'payload'
import config from '../payload.config'
import { blogData } from '../data/blogData'
import en from '../dictionaries/en.json' assert { type: 'json' }
import ar from '../dictionaries/ar.json' assert { type: 'json' }


/**
 * Mapping between Payload global slugs and dictionary keys.
 * If a custom transformation is needed, it can be handled in seedGlobal.
 */
const SLUG_TO_DICT_KEY: Record<string, string> = {
    'navbar-content': 'navbar',
    'hero-content': 'hero',
    'working-process-content': 'workingProcess',
    'trusted-by-content': 'trustedBy',
    'why-choose-content': 'whyChoose',
    'contact-hero-content': 'contactHero',
    'feature-grid-content': 'featureGrid',
    'common-cta-content': 'commonCTA',
    'contact-cta-content': 'contactCTA',
    'faq-content': 'faq',
    'pricing-content': 'pricing',
    'contact-us-content': 'contactUs',
    'footer-content': 'footer',
    'blog-section-content': 'blogSection',
    'blog-content': 'blog',
    'metadata-content': 'metadata',
    'privacy-content': 'privacy',
    'terms-content': 'terms',
    'security-content': 'security',
    'about-page-content': 'aboutPage',
};

const transformGlobalData = (slug: string, data: any) => {
    if (!data) return data;

    // Pricing features transformation: string[] -> { text: string }[]
    if (slug === 'pricing-content' && data.plans) {
        return {
            ...data,
            plans: data.plans.map((plan: any) => ({
                ...plan,
                features: plan.features?.map((f: string) => ({ text: f })) || []
            }))
        };
    }

    // FAQ categories transformation: string[] -> { text: string }[]
    if (slug === 'faq-content' && data.categories) {
        return {
            ...data,
            categories: data.categories.map((c: string) => ({ text: c }))
        }
    }

    // Contact Us company size options: string[] -> { text: string }[]
    if (slug === 'contact-us-content' && data.form?.companySize?.options) {
        return {
            ...data,
            form: {
                ...data.form,
                companySize: {
                    ...data.form.companySize,
                    options: data.form.companySize.options.map((o: string) => ({ text: o }))
                }
            }
        }
    }

    return data;
}

const seedPosts = async (payload: any) => {
    console.log('Checking for existing posts...')
    const existingPosts = await payload.find({
        collection: 'posts',
        limit: 1,
    })

    if (existingPosts.docs.length > 0) {
        console.log('Database already contains posts. Skipping posts seed.')
        return
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
                    category: post.category,
                    publishedDate: new Date(post.date).toISOString(),
                    image: post.image,
                    author: post.author,
                    content: {
                        root: {
                            children: [
                                {
                                    children: [
                                        {
                                            text: post.excerpt,
                                            type: 'text',
                                            version: 1,
                                        },
                                    ],
                                    type: 'paragraph',
                                    version: 1,
                                },
                            ],
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
}

const seedGlobal = async (payload: any, slug: string) => {
    const dictKey = SLUG_TO_DICT_KEY[slug];
    if (!dictKey) {
        console.error(`Unknown global slug: ${slug}`);
        return;
    }

    console.log(`Seeding Global: ${slug}...`);
    try {
        const enData = transformGlobalData(slug, (en as any)[dictKey]);
        const arData = transformGlobalData(slug, (ar as any)[dictKey]);

        await payload.updateGlobal({
            slug,
            data: enData,
            locale: 'en'
        });

        await payload.updateGlobal({
            slug,
            data: arData,
            locale: 'ar'
        });

        console.log(`- Success: ${slug}`);
    } catch (error) {
        console.error(`- Failed: ${slug}`, error);
    }
}

const seed = async () => {
    const args = process.argv.slice(2);
    const target = args[0] || 'all';

    console.log(`--- Seeding Database [Target: ${target}] ---`)
    const payload = await getPayload({ config: await config })

    if (target === 'all' || target === 'posts') {
        await seedPosts(payload);
    }

    if (target === 'all') {
        for (const slug of Object.keys(SLUG_TO_DICT_KEY)) {
            await seedGlobal(payload, slug);
        }
    } else if (target !== 'posts') {
        // Assume target is a global slug
        await seedGlobal(payload, target);
    }

    console.log('--- Seed Action Completed ---')
    process.exit(0)
}

seed().catch((err) => {
    console.error('--- Seed Failed ---')
    console.error(err)
    process.exit(1)
})
