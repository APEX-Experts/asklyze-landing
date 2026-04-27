import { unstable_cache } from "next/cache";
import "server-only";
import {
  AboutPageContent,
  BlogContent,
  BlogSectionContent,
  CommonCtaContent,
  ContactCtaContent,
  ContactHeroContent,
  ContactUsContent,
  FaqContent,
  FeatureGridContent,
  FooterContent,
  HeroContent,
  MetadataContent,
  NavbarContent,
  PricingContent,
  PrivacyContent,
  SecurityContent,
  TermsContent,
  TrustedByContent,
  WhyChooseContent,
  WorkingProcessContent,
} from "../payload-types";
import arFallback from "./dictionaries/ar.json";
import enFallback from "./dictionaries/en.json";
import { getPayload } from "./lib/payload";

export type Dictionary = {
  navbar: Omit<NavbarContent, "id" | "createdAt" | "updatedAt">;
  hero: Omit<HeroContent, "id" | "createdAt" | "updatedAt">;
  workingProcess: Omit<WorkingProcessContent, "id" | "createdAt" | "updatedAt">;
  trustedBy: Omit<TrustedByContent, "id" | "createdAt" | "updatedAt">;
  whyChoose: Omit<WhyChooseContent, "id" | "createdAt" | "updatedAt">;
  contactHero: Omit<ContactHeroContent, "id" | "createdAt" | "updatedAt">;
  featureGrid: Omit<FeatureGridContent, "id" | "createdAt" | "updatedAt">;
  commonCTA: Omit<CommonCtaContent, "id" | "createdAt" | "updatedAt">;
  contactCTA: Omit<ContactCtaContent, "id" | "createdAt" | "updatedAt">;
  faq: Omit<FaqContent, "id" | "createdAt" | "updatedAt">;
  pricing: Omit<PricingContent, "id" | "createdAt" | "updatedAt">;
  contactUs: Omit<ContactUsContent, "id" | "createdAt" | "updatedAt">;
  footer: Omit<FooterContent, "id" | "createdAt" | "updatedAt">;
  blogSection: Omit<BlogSectionContent, "id" | "createdAt" | "updatedAt">;
  blog: Omit<BlogContent, "id" | "createdAt" | "updatedAt">;
  metadata: Omit<MetadataContent, "id" | "createdAt" | "updatedAt">;
  privacy: Omit<PrivacyContent, "id" | "createdAt" | "updatedAt">;
  terms: Omit<TermsContent, "id" | "createdAt" | "updatedAt">;
  security: Omit<SecurityContent, "id" | "createdAt" | "updatedAt">;
  aboutPage: Omit<AboutPageContent, "id" | "createdAt" | "updatedAt">;
};

const fetchDictionary = async (locale: "en" | "ar"): Promise<Dictionary> => {
  try {
    const payload = await getPayload();

    const [
      navbar,
      hero,
      workingProcess,
      trustedBy,
      whyChoose,
      contactHero,
      featureGrid,
      commonCTA,
      contactCTA,
      faq,
      pricing,
      contactUs,
      footer,
      blogSection,
      blog,
      metadata,
      privacy,
      terms,
      security,
      aboutPage,
    ] = await Promise.all([
      payload.findGlobal({ slug: "navbar-content", locale }),
      payload.findGlobal({ slug: "hero-content", locale }),
      payload.findGlobal({ slug: "working-process-content", locale }),
      payload.findGlobal({ slug: "trusted-by-content", locale }),
      payload.findGlobal({ slug: "why-choose-content", locale }),
      payload.findGlobal({ slug: "contact-hero-content", locale }),
      payload.findGlobal({ slug: "feature-grid-content", locale }),
      payload.findGlobal({ slug: "common-cta-content", locale }),
      payload.findGlobal({ slug: "contact-cta-content", locale }),
      payload.findGlobal({ slug: "faq-content", locale }),
      payload.findGlobal({ slug: "pricing-content", locale }),
      payload.findGlobal({ slug: "contact-us-content", locale }),
      payload.findGlobal({ slug: "footer-content", locale }),
      payload.findGlobal({ slug: "blog-section-content", locale }),
      payload.findGlobal({ slug: "blog-content", locale }),
      payload.findGlobal({ slug: "metadata-content", locale }),
      payload.findGlobal({ slug: "privacy-content", locale }),
      payload.findGlobal({ slug: "terms-content", locale }),
      payload.findGlobal({ slug: "security-content", locale }),
      payload.findGlobal({ slug: "about-page-content", locale }),
    ]);

    return {
      navbar: {
        ...navbar,
        links:
          navbar.links?.map((link) => ({
            label: link.label || "",
            href: link.href || "",
            icon: link.icon ? link.icon : ("Users" as const),
            external: !!link.external,
          })) || [],
      },
      hero,
      workingProcess,
      trustedBy,
      whyChoose,
      contactHero,
      featureGrid,
      commonCTA,
      contactCTA,
      pricing: {
        ...pricing,
        plans:
          pricing.plans?.map((p) => ({
            ...p,
            period: p.period || "monthly",
            periodLabel: p.periodLabel || "",
            isRecommended: !!p.isRecommended,
            features: p.features,
          })) || [],
      },
      contactUs: {
        ...contactUs,
        form: {
          ...contactUs.form,
          country: {
            ...contactUs.form.country,
            countrySelect: !!contactUs.form.country.countrySelect,
          },
          companySize: {
            ...contactUs.form.companySize,
            options: contactUs.form.companySize.options,
          },
          message: {
            ...contactUs.form.message,
            textarea: !!contactUs.form.message.textarea,
          },
        },
      },
      footer,
      blogSection,
      blog,
      metadata,
      privacy,
      terms,
      security,
      aboutPage,
      faq: {
        ...faq,
        categories: faq.categories,
      },
    };
  } catch (e) {
    console.error(
      "Failed to fetch dictionary from Payload, falling back to JSON",
      e
    );
    const fallback = locale === "ar" ? arFallback : enFallback;
    return {
      ...fallback,
      navbar: {
        ...fallback.navbar,
        links: (fallback.navbar.links as NavbarContent["links"]),
      },
    };
  }
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const cachedFetchDictionary = unstable_cache(
    fetchDictionary,
    ["dictionary", locale],
    { tags: ["dictionary"] }
  );
  return await cachedFetchDictionary(locale === "ar" ? "ar" : "en");
};
