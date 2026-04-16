import 'server-only';
import { getPayload } from './lib/payload';
import { unstable_cache } from 'next/cache';
import enFallback from './dictionaries/en.json';
import arFallback from './dictionaries/ar.json';

const fetchDictionary = async (locale: 'en' | 'ar') => {
    try {
        const payload = await getPayload();

        const [
            navbar, hero, workingProcess, trustedBy, whyChoose, contact, contactHero,
            featureGrid, commonCTA, contactCTA, contentSplit, tabbedShowcase, testimonials,
            faq, pricing, gradientCTA, contactUs, footer, blogSection, blog, metadata,
            privacy, terms, security
        ] = await Promise.all([
            payload.findGlobal({ slug: 'navbar-content', locale }),
            payload.findGlobal({ slug: 'hero-content', locale }),
            payload.findGlobal({ slug: 'working-process-content', locale }),
            payload.findGlobal({ slug: 'trusted-by-content', locale }),
            payload.findGlobal({ slug: 'why-choose-content', locale }),
            payload.findGlobal({ slug: 'contact-content', locale }),
            payload.findGlobal({ slug: 'contact-hero-content', locale }),
            payload.findGlobal({ slug: 'feature-grid-content', locale }),
            payload.findGlobal({ slug: 'common-cta-content', locale }),
            payload.findGlobal({ slug: 'contact-cta-content', locale }),
            payload.findGlobal({ slug: 'content-split-content', locale }),
            payload.findGlobal({ slug: 'tabbed-showcase-content', locale }),
            payload.findGlobal({ slug: 'testimonials-content', locale }),
            payload.findGlobal({ slug: 'faq-content', locale }),
            payload.findGlobal({ slug: 'pricing-content', locale }),
            payload.findGlobal({ slug: 'gradient-cta-content', locale }),
            payload.findGlobal({ slug: 'contact-us-content', locale }),
            payload.findGlobal({ slug: 'footer-content', locale }),
            payload.findGlobal({ slug: 'blog-section-content', locale }),
            payload.findGlobal({ slug: 'blog-content', locale }),
            payload.findGlobal({ slug: 'metadata-content', locale }),
            payload.findGlobal({ slug: 'privacy-content', locale }),
            payload.findGlobal({ slug: 'terms-content', locale }),
            payload.findGlobal({ slug: 'security-content', locale }),
        ]);

        console.log(featureGrid)

        return {
            navbar, hero, workingProcess, trustedBy, whyChoose,
            contact: {
                ...contact,
                locationLines: contact.locationLines?.map((l: any) => l.text) || []
            },
            contactHero,
            featureGrid, commonCTA, contactCTA,
            contentSplit: {
                ...contentSplit,
                section2: {
                    ...contentSplit.section2,
                    features: contentSplit.section2?.features?.map((f: any) => f.text) || []
                }
            },
            tabbedShowcase: {
                ...tabbedShowcase,
                tabs: tabbedShowcase.tabs?.map((t: any) => t.text) || []
            },
            testimonials,
            faq: {
                ...faq,
                categories: faq.categories?.map((c: any) => c.text) || []
            },
            pricing: {
                ...pricing,
                plans: pricing.plans?.map((p: any) => ({
                    ...p,
                    period: p.period || 'monthly',
                    periodLabel: p.periodLabel || '',
                    isRecommended: !!p.isRecommended,
                    features: p.features?.map((f: any) => f.text) || []
                })) || []
            },
            gradientCTA,
            contactUs: {
                ...contactUs,
                form: {
                    ...contactUs.form,
                    country: { ...contactUs.form.country, countrySelect: !!contactUs.form.country.countrySelect },
                    companySize: { ...contactUs.form.companySize, options: contactUs.form.companySize.options?.map((o: any) => o.text) || [] },
                    message: { ...contactUs.form.message, textarea: !!contactUs.form.message.textarea }
                }
            },
            footer, blogSection, blog, metadata,
            privacy, terms, security
        } as unknown as typeof enFallback;
    } catch (e) {
        console.error('Failed to fetch dictionary from Payload, falling back to JSON', e);
        return locale === 'ar' ? arFallback : enFallback;
    }
}

export const getDictionary = async (locale: string): Promise<typeof enFallback> => {
    const cachedFetchDictionary = unstable_cache(
        fetchDictionary,
        ['dictionary', locale],
        { tags: ['dictionary'] }
    );
    return await cachedFetchDictionary(locale === 'ar' ? 'ar' : 'en');
};
