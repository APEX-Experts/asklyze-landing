import 'server-only';
import { getPayload } from './lib/payload';
import { unstable_cache } from 'next/cache';
import enFallback from './dictionaries/en.json';
import arFallback from './dictionaries/ar.json';

const fetchDictionary = async (locale: 'en' | 'ar') => {
    try {
        const payload = await getPayload();

        const [
            navbar, hero, workingProcess, trustedBy, whyChoose, contactHero,
            featureGrid, commonCTA, contactCTA, faq, pricing, contactUs, footer, blogSection, blog, metadata,
            privacy, terms, security, aboutPage
        ] = await Promise.all([
            payload.findGlobal({ slug: 'navbar-content', locale }),
            payload.findGlobal({ slug: 'hero-content', locale }),
            payload.findGlobal({ slug: 'working-process-content', locale }),
            payload.findGlobal({ slug: 'trusted-by-content', locale }),
            payload.findGlobal({ slug: 'why-choose-content', locale }),
            payload.findGlobal({ slug: 'contact-hero-content', locale }),
            payload.findGlobal({ slug: 'feature-grid-content', locale }),
            payload.findGlobal({ slug: 'common-cta-content', locale }),
            payload.findGlobal({ slug: 'contact-cta-content', locale }),
            payload.findGlobal({ slug: 'faq-content', locale }),
            payload.findGlobal({ slug: 'pricing-content', locale }),
            payload.findGlobal({ slug: 'contact-us-content', locale }),
            payload.findGlobal({ slug: 'footer-content', locale }),
            payload.findGlobal({ slug: 'blog-section-content', locale }),
            payload.findGlobal({ slug: 'blog-content', locale }),
            payload.findGlobal({ slug: 'metadata-content', locale }),
            payload.findGlobal({ slug: 'privacy-content', locale }),
            payload.findGlobal({ slug: 'terms-content', locale }),
            payload.findGlobal({ slug: 'security-content', locale }),
            payload.findGlobal({ slug: 'about-page-content', locale }),
        ]);

        return {
            navbar, hero, workingProcess, trustedBy, whyChoose,
            contactHero,
            featureGrid, commonCTA, contactCTA,
            pricing: {
                ...pricing,
                plans: pricing.plans?.map((p) => ({
                    ...p,
                    period: p.period || 'monthly',
                    periodLabel: p.periodLabel || '',
                    isRecommended: !!p.isRecommended,
                    features: p.features?.map((f) => f.text) || []
                })) || []
            },
            contactUs: {
                ...contactUs,
                form: {
                    ...contactUs.form,
                    country: { ...contactUs.form.country, countrySelect: !!contactUs.form.country.countrySelect },
                    companySize: { ...contactUs.form.companySize, options: contactUs.form.companySize.options?.map((o) => o.text) || [] },
                    message: { ...contactUs.form.message, textarea: !!contactUs.form.message.textarea }
                }
            },
            footer, blogSection, blog, metadata,
            privacy, terms, security, aboutPage, faq: {
                ...faq,
                categories: faq.categories?.map((c) => c.text) || []
            }
        } as typeof enFallback;
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
