import { getPayload } from 'payload';
import configPromise from '../payload.config';
import fs from 'fs';
import path from 'path';

const enDictPath = path.join(process.cwd(), 'src/dictionaries/en.json');
const arDictPath = path.join(process.cwd(), 'src/dictionaries/ar.json');
const enDict = JSON.parse(fs.readFileSync(enDictPath, 'utf8'));
const arDict = JSON.parse(fs.readFileSync(arDictPath, 'utf8'));

// Helper to convert arrays of strings to arrays of objects { text: string }
const mapStringsToObjects = (arr: any[]): any[] => {
    if (!Array.isArray(arr)) return [];
    return arr.map(item => typeof item === 'string' ? { text: item } : item);
}

// Deep clone and map specific arrays
const mapDictForPayload = (dict: any): any => {
    const d = JSON.parse(JSON.stringify(dict)); // deep clone
    
    if (d.contact?.locationLines) {
        d.contact.locationLines = mapStringsToObjects(d.contact.locationLines);
    }
    if (d.contentSplit?.section2?.features) {
        d.contentSplit.section2.features = mapStringsToObjects(d.contentSplit.section2.features);
    }
    if (d.tabbedShowcase?.tabs) {
        d.tabbedShowcase.tabs = mapStringsToObjects(d.tabbedShowcase.tabs);
    }
    if (d.faq?.categories) {
        d.faq.categories = mapStringsToObjects(d.faq.categories);
    }
    if (d.pricing?.plans) {
        d.pricing.plans = d.pricing.plans.map((p: any) => ({
            ...p,
            features: mapStringsToObjects(p.features || [])
        }));
    }
    if (d.contactUs?.form?.companySize?.options) {
        d.contactUs.form.companySize.options = mapStringsToObjects(d.contactUs.form.companySize.options);
    }
    
    // Map points arrays in privacy, terms, security
    const mapPointsIfPresent = (sections: any[]) => {
        if (!sections) return;
        sections.forEach(s => {
            if (s.points) s.points = mapStringsToObjects(s.points);
        });
    }

    if (d.privacy) {
        mapPointsIfPresent(d.privacy.sections);
        mapPointsIfPresent(d.privacy.additionalSections);
    }
    if (d.terms) {
        mapPointsIfPresent(d.terms.sections);
        mapPointsIfPresent(d.terms.additionalSections);
    }
    if (d.security) {
        mapPointsIfPresent(d.security.sections);
        mapPointsIfPresent(d.security.additionalSections);
    }

    // Explicitly fallback boolean fields that might be missing completely rather than undefined
    if (d.contactUs?.form?.message) {
        d.contactUs.form.message.textarea = !!d.contactUs.form.message.textarea;
    }
    if (d.contactUs?.form?.country) {
        d.contactUs.form.country.countrySelect = !!d.contactUs.form.country.countrySelect;
    }

    return d;
}

async function runSeed() {
    process.env.SEEDING = 'true';
    console.log('Loading Payload...');
    
    const payload = await getPayload({ config: configPromise });

    console.log('Starting seed process...');

    for (const locale of ['en', 'ar'] as const) {
        const rawDict = locale === 'en' ? enDict : arDict;
        const dict = mapDictForPayload(rawDict); // Convert simple arrays for payload

        // Map dictionary keys to their global slugs
        const slugMap = {
            navbar: 'navbar-content',
            hero: 'hero-content',
            workingProcess: 'working-process-content',
            trustedBy: 'trusted-by-content',
            whyChoose: 'why-choose-content',
            contact: 'contact-content',
            contactHero: 'contact-hero-content',
            featureGrid: 'feature-grid-content',
            commonCTA: 'common-cta-content',
            contactCTA: 'contact-cta-content',
            contentSplit: 'content-split-content',
            tabbedShowcase: 'tabbed-showcase-content',
            testimonials: 'testimonials-content',
            faq: 'faq-content',
            pricing: 'pricing-content',
            gradientCTA: 'gradient-cta-content',
            contactUs: 'contact-us-content',
            footer: 'footer-content',
            blogSection: 'blog-section-content',
            blog: 'blog-content',
            metadata: 'metadata-content',
            privacy: 'privacy-content',
            terms: 'terms-content',
            security: 'security-content',
        } as const;

        for (const [key, slug] of Object.entries(slugMap)) {
            if (dict[key]) {
                try {
                    await payload.updateGlobal({
                        slug: slug,
                        data: dict[key],
                        locale: locale,
                    });
                    console.log(`✅ Seeded ${slug} (${locale})`);
                } catch (e) {
                    console.error(`❌ Failed to seed ${slug} (${locale})`, e);
                }
            }
        }
    }

    console.log('🎉 Seed complete!');
    process.exit(0);
}

runSeed();
