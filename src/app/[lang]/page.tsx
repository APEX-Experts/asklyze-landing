import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import WorkingProcess from "@/components/WorkingProcess";
import ContentSplit from "@/components/ContentSplit";
import TabbedShowcase from "@/components/TabbedShowcase";
import TrustBar from "@/components/TrustBar";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import GradientCTA from "@/components/GradientCTA";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";
import TrustedSection from "@/components/TrustedSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactUs from "@/components/ContactUs";
import ContactCTA from "@/components/ContactCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.metadata.home.title,
    description: dict.metadata.home.description,
    alternates: {
      canonical: `https://asklyze.ai/${lang}`,
      languages: {
        en: "https://asklyze.ai/en",
        ar: "https://asklyze.ai/ar",
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
      <Navbar dict={dict.navbar} />
      <main className="mt-4">
        <Hero dict={dict.hero} />
        <FeatureGrid dict={dict.featureGrid} commonCTA_Dict={dict.commonCTA} />
        <WorkingProcess
          dict={dict.workingProcess}
          commonCTA_Dict={dict.commonCTA}
        />
        <TrustedSection dict={dict.trustedBy} lang={lang} />
        <WhyChooseUs dict={dict.whyChoose} commonCTA_Dict={dict.commonCTA} />
        <Pricing dict={dict.pricing} lang={lang} />
        <FAQ dict={dict.faq} />
        <ContactUs dict={dict.contactUs} />
        <ContactCTA dict={dict.contactCTA} commonCTA_Dict={dict.commonCTA} />
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
