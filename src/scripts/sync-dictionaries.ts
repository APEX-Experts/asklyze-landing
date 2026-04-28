import * as dotenv from 'dotenv'
dotenv.config()
import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'

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

const locales = ['en', 'ar'];

async function sync() {
    console.log('--- Starting Dictionary Sync ---');
    const payload = await getPayload({ config: await config });
    const dictionariesPath = path.resolve(process.cwd(), 'src/dictionaries');

    for (const locale of locales) {
        console.log(`Syncing locale: ${locale}...`);
        const dictionary: any = {};

        // Backup existing
        const dictFilePath = path.join(dictionariesPath, `${locale}.json`);
        if (fs.existsSync(dictFilePath)) {
            const backupPath = path.join(dictionariesPath, `${locale}.backup.json`);
            fs.copyFileSync(dictFilePath, backupPath);
            console.log(`- Created backup at ${locale}.backup.json`);
        }

        for (const [slug, key] of Object.entries(SLUG_TO_DICT_KEY)) {
            try {
                const data = await payload.findGlobal({
                    slug: slug as any,
                    locale: locale as any,
                });
                // Remove Payload internal fields
                const { id, createdAt, updatedAt, globalType, ...cleanData } = data as any;
                dictionary[key] = cleanData;
            } catch (error) {
                console.error(`- Failed to fetch global ${slug} for ${locale}:`, error);
            }
        }

        fs.writeFileSync(dictFilePath, JSON.stringify(dictionary, null, 2));
        console.log(`- Successfully updated ${locale}.json`);
    }

    console.log('--- Sync Completed Successfully ---');
    process.exit(0);
}

sync().catch(err => {
    console.error('--- Sync Failed ---');
    console.error(err);
    process.exit(1);
});
