import * as dotenv from 'dotenv';
import { BasePayload, getPayload, GlobalSlug } from 'payload';
import ar from '../dictionaries/ar.json' with { type: 'json' };
import en from '../dictionaries/en.json' with { type: 'json' };
import config from '../payload.config';
dotenv.config()
process.env.SEEDING = "true";

console.log({
    "S3_BUCKET": process.env.S3_BUCKET,
    "S3_ACCESS_KEY_ID": process.env.S3_ACCESS_KEY_ID ? "****" : undefined,
    "S3_SECRET_ACCESS_KEY": process.env.S3_SECRET_ACCESS_KEY ? "****" : undefined,
    "S3_REGION": process.env.S3_REGION,
    "S3_ENDPOINT": process.env.S3_ENDPOINT
})


import * as fs from 'fs';
import * as path from 'path';

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
    'site-settings': 'siteSettings',
};

/**
 * Mapping to store uploaded media IDs to avoid redundant uploads
 */
const MEDIA_MAP: Record<string, string | number> = {};

/**
 * Uploads a file from public directory or external URL to Payload Media collection
 */
const ensureMedia = async (payload: BasePayload, filePath: string) => {
    if (MEDIA_MAP[filePath]) return MEDIA_MAP[filePath];

    let fileData: Buffer;
    let fileName: string;
    let mimeType: string;

    if (filePath.startsWith('http')) {
        try {
            console.log(`- Downloading external media: ${filePath}...`);
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
            const arrayBuffer = await response.arrayBuffer();
            fileData = Buffer.from(arrayBuffer);
            fileName = path.basename(new URL(filePath).pathname);
            mimeType = response.headers.get('content-type') || 'application/octet-stream';
        } catch (error) {
            console.error(`- Failed to download external media: ${filePath}`, error);
            return null;
        }
    } else {
        const publicPath = path.resolve(process.cwd(), 'public', filePath.startsWith('/') ? filePath.slice(1) : filePath);

        if (!fs.existsSync(publicPath)) {
            console.warn(`- Media not found: ${publicPath}`);
            return null;
        }
        fileData = fs.readFileSync(publicPath);
        fileName = path.basename(filePath);
        mimeType = filePath.endsWith('.png') ? 'image/png' :
            filePath.endsWith('.jpg') || filePath.endsWith('.jpeg') ? 'image/jpeg' :
                filePath.endsWith('.svg') ? 'image/svg+xml' :
                    filePath.endsWith('.mp4') ? 'video/mp4' : 'application/octet-stream';
    }

    try {
        console.log(`- Uploading media: ${fileName}...`);
        const result = await payload.create({
            collection: 'media',
            data: {
                alt: fileName,
            },
            file: {
                data: fileData,
                name: fileName,
                mimetype: mimeType,
                size: fileData.length,
            },
        });
        MEDIA_MAP[filePath] = result.id;
        return result.id;
    } catch (error) {
        console.error(`- Failed to upload media: ${filePath}`, error);
        return null;
    }
};

/**
 * Recursively scans data for media paths and uploads/replaces them
 */
const processMediaFields = async (payload: BasePayload, data: any) => {
    if (!data || typeof data !== 'object') return data;

    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            data[i] = await processMediaFields(payload, data[i]);
        }
        return data;
    }

    for (const key of Object.keys(data)) {
        const value = data[key];

        // Check if field should be media based on value pattern or key name
        // Pattern: starts with / or http and has extension
        const isMediaPath = typeof value === 'string' && (
            (value.startsWith('/') || value.startsWith('http')) &&
            (value.endsWith('.png') || value.endsWith('.jpg') || value.endsWith('.jpeg') || value.endsWith('.svg') || value.endsWith('.mp4') || value.endsWith('.gif'))
        );

        if (isMediaPath) {
            const mediaId = await ensureMedia(payload, value);
            if (mediaId) {
                data[key] = mediaId;
            }
        } else if (typeof value === 'object') {
            data[key] = await processMediaFields(payload, value);
        }
    }
    return data;
};

/**
 * Recursively scans dictionary data for media paths and updates ONLY those fields in existing data
 */
const syncMedia = async (payload: BasePayload, existingData: any, dictData: any) => {
    if (!dictData || typeof dictData !== 'object') return existingData;

    let result = existingData;
    if (result === null || result === undefined) {
        result = Array.isArray(dictData) ? [] : {};
    }

    if (Array.isArray(dictData)) {
        for (let i = 0; i < dictData.length; i++) {
            result[i] = await syncMedia(payload, result[i], dictData[i]);
        }
        return result;
    }

    for (const key of Object.keys(dictData)) {
        const value = dictData[key];

        const isMediaPath = typeof value === 'string' && (
            (value.startsWith('/') || value.startsWith('http')) &&
            (value.endsWith('.png') || value.endsWith('.jpg') || value.endsWith('.jpeg') || value.endsWith('.svg') || value.endsWith('.mp4') || value.endsWith('.gif'))
        );

        if (isMediaPath) {
            const mediaId = await ensureMedia(payload, value);
            if (mediaId) {
                result[key] = mediaId;
            }
        } else if (typeof value === 'object' && value !== null) {
            result[key] = await syncMedia(payload, result[key], value);
        }
    }
    return result;
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

const seedGlobal = async (payload: BasePayload, slug: GlobalSlug, force: boolean = false, mediaOnly: boolean = false) => {
    const dictKey = SLUG_TO_DICT_KEY[slug];
    if (!dictKey) {
        console.error(`Unknown global slug: ${slug}`);
        return;
    }

    if (!force) {
        try {
            const existing = await payload.findGlobal({ slug, locale: 'en' });
            // Check if global has any specific content. 
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

    let existingEn: any = null;
    let existingAr: any = null;

    if (mediaOnly) {
        try {
            existingEn = await payload.findGlobal({ slug, locale: 'en' });
            existingAr = await payload.findGlobal({ slug, locale: 'ar' });
        } catch (e) {
            console.warn(`- Warning: Could not fetch existing data for ${slug}. Will perform partial seed.`);
        }
    }

    console.log(`Seeding Global: ${slug}${mediaOnly ? ' (MEDIA ONLY)' : ''}...`);
    try {
        const enDataRaw = (en as any)[dictKey];
        const arDataRaw = (ar as any)[dictKey];

        let enData, arData;

        if (mediaOnly) {
            enData = await syncMedia(payload, existingEn, JSON.parse(JSON.stringify(enDataRaw)));
            arData = await syncMedia(payload, existingAr, JSON.parse(JSON.stringify(arDataRaw)));
        } else {
            // Process media fields
            enData = await processMediaFields(payload, JSON.parse(JSON.stringify(enDataRaw)));
            arData = await processMediaFields(payload, JSON.parse(JSON.stringify(arDataRaw)));
        }

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
        console.error(`- Failed: ${slug}`, JSON.stringify(error, null, 2));
    }
}

const seed = async () => {
    const args = process.argv.slice(2);
    const force = args.includes('--force');
    const mediaOnly = args.includes('--media');
    const filteredArgs = args.filter(arg => arg !== '--force' && arg !== '--media');
    const targets = filteredArgs.length > 0 ? filteredArgs : 'all';

    console.log(`--- Seeding Database [Target: ${targets}${force ? ' (FORCED)' : ''}${mediaOnly ? ' (MEDIA ONLY)' : ''}] ---`)
    const payload = await getPayload({ config: await config })

    if (targets === 'all') {
        for (const slug of Object.keys(SLUG_TO_DICT_KEY)) {
            await seedGlobal(payload, slug as GlobalSlug, force, mediaOnly);
        }
    } else {
        // Assume target is a global slug
        for (const slug of targets) {
            await seedGlobal(payload, slug as GlobalSlug, force, mediaOnly);
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
