import BlogSection from "@/components/BlogSection";
import ContactCTA from "@/components/ContactCTA";
import ContactUs from "@/components/ContactUs";
import FAQ from "@/components/FAQ";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import TrustedSection from "@/components/TrustedSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import WorkingProcess from "@/components/WorkingProcess";
import { getDictionary } from "@/get-dictionary";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const siteUrl = dict.siteSettings.siteUrl.endsWith("/")
    ? dict.siteSettings.siteUrl
    : `${dict.siteSettings.siteUrl}/`;

  return {
    title: dict.metadata.home.title,
    description: dict.metadata.home.description,
    alternates: {
      canonical: `${siteUrl}${lang}`,
      languages: {
        en: `${siteUrl}en`,
        ar: `${siteUrl}ar`,
      },
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict.navbar} siteSettings={dict.siteSettings} />
      <main className="mt-4">
        <Hero dict={dict.hero} siteSettings={dict.siteSettings} />
        <FeatureGrid dict={dict.featureGrid} commonCTA_Dict={dict.commonCTA} />
        <WorkingProcess
          dict={dict.workingProcess}
          commonCTA_Dict={dict.commonCTA}
        />
        <TrustedSection dict={dict.trustedBy} lang={lang} />
        <WhyChooseUs dict={dict.whyChoose} commonCTA_Dict={dict.commonCTA} />
        <Pricing dict={dict.pricing} />
        <FAQ dict={dict.faq} />
        <ContactUs dict={dict.contactUs} lang={lang} />
        <ContactCTA dict={dict.contactCTA} commonCTA_Dict={dict.commonCTA} />
        <BlogSection dict={dict.blogSection} blogDict={dict.blog} lang={lang} />
      </main>
      <Footer dict={dict.footer} siteSettings={dict.siteSettings} />
    </>
  );
}
