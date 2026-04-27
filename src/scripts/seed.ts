import * as dotenv from 'dotenv'
dotenv.config()
process.env.SEEDING = "true";
import { BasePayload, getPayload, GlobalSlug } from 'payload'
import config from '../payload.config'
import { blogData } from '../data/blogData'
import en from '../dictionaries/en.json' assert { type: 'json' }
import ar from '../dictionaries/ar.json' assert { type: 'json' }
import { Post } from '@/payload-types';


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

/**
 * Recursively maps Payload-generated IDs from the English result
 * into the target Arabic data structure to prevent array wiping.
 */
const mapIdsRecursively = (enSource: any, arTarget: any) => {
  // Base check: If either is null/undefined or not an object, stop traversing.
  if (!enSource || !arTarget || typeof enSource !== 'object' || typeof arTarget !== 'object') {
    return;
  }

  // Handle Arrays: Traverse each item in the array
  if (Array.isArray(enSource) && Array.isArray(arTarget)) {
    const length = Math.min(enSource.length, arTarget.length);
    for (let i = 0; i < length; i++) {
      mapIdsRecursively(enSource[i], arTarget[i]);
    }
    return;
  }

  // Handle Objects: Copy ID and traverse properties
  if (!Array.isArray(enSource) && !Array.isArray(arTarget)) {
    // If Payload generated an ID for this object (e.g., an array row or block), map it over
    if (enSource.id) {
      arTarget.id = enSource.id;
    }

    // Recursively check all nested properties (Groups, deeper Arrays, etc.)
    for (const key of Object.keys(enSource)) {
      if (Object.prototype.hasOwnProperty.call(arTarget, key)) {
        mapIdsRecursively(enSource[key], arTarget[key]);
      }
    }
  }
};

const seedPosts = async (payload: BasePayload) => {
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
                    category: post.category as Post["category"],
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
                            direction: null,
                            format: "",
                            indent: 0,
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

const seedGlobal = async (payload: BasePayload, slug: GlobalSlug, force: boolean = false) => {
    const dictKey = SLUG_TO_DICT_KEY[slug];
    if (!dictKey) {
        console.error(`Unknown global slug: ${slug}`);
        return;
    }

    if (!force) {
        try {
            const existing = await payload.findGlobal({ slug, locale: 'en' });
            // Check if global has any specific content. 
            // A common pattern is that empty globals only have basic fields or specific defaults.
            // We check for any field that is not a metadata field and has a truthy value.
            const hasData = Object.keys(existing).some(key => 
                !['id', 'createdAt', 'updatedAt', 'globalType'].includes(key) && 
                existing[key as keyof typeof existing] !== null && 
                existing[key as keyof typeof existing] !== undefined &&
                (Array.isArray(existing[key as keyof typeof existing]) ? (existing[key as keyof typeof existing] as unknown as any[])!.length > 0 : true) &&
                (typeof existing[key as keyof typeof existing] === 'object' ? Object.keys(existing[key as keyof typeof existing]!).length > 0 : true)
            );

            if (hasData) {
                console.log(`Skipping Global: ${slug} (already has data). Use --force to overwrite.`);
                return;
            }
        } catch (e) {
            // If it fails to find, we probably need to seed it
        }
    }

  console.log(`Seeding Global: ${slug}...`);
  try {
    const enData = (en as any)[dictKey];
    // Create a deep copy of arData so we don't accidentally mutate the imported JSON module
    const arData = JSON.parse(JSON.stringify((ar as any)[dictKey]));

    // 1. Update English
    const enResult = await payload.updateGlobal({
      slug,
      data: enData,
      locale: 'en',
    });

    // 2. Map the generated IDs to the Arabic data recursively
    if (enResult && arData) {
      mapIdsRecursively(enResult, arData);
    }

    // 3. Update Arabic
    await payload.updateGlobal({
      slug,
      data: arData,
      locale: 'ar',
    });

        console.log(`- Success: ${slug}`);
    } catch (error) {
        console.error(`- Failed: ${slug}`, error);
    }
}

const seed = async () => {
    const args = process.argv.slice(2);
    const force = args.includes('--force');
    const filteredArgs = args.filter(arg => arg !== '--force');
    const targets = filteredArgs.length > 0 ? filteredArgs : 'all';

    console.log(`--- Seeding Database [Target: ${targets}${force ? ' (FORCED)' : ''}] ---`)
    const payload = await getPayload({ config: await config })

    if (targets === 'all' || targets.includes('posts')) {
        await seedPosts(payload);
    }

    if (targets === 'all') {
        for (const slug of Object.keys(SLUG_TO_DICT_KEY)) {
            await seedGlobal(payload, slug as GlobalSlug, force);
        }
    } else if (!targets.includes("posts")) {
        // Assume target is a global slug
        for (const slug of targets) {
            await seedGlobal(payload, slug as GlobalSlug, force);
        }
    }

    console.log('--- Seed Action Completed ---')
    process.exit(0)
}

seed().catch((err) => {
    console.error('--- Seed Failed ---')
    console.error(err)
    process.exit(1)
})
