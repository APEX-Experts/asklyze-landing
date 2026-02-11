import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import WorkingProcess from "@/components/WorkingProcess";
import ContentSplit from "@/components/ContentSplit";
import TabbedShowcase from "@/components/TabbedShowcase";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import GradientCTA from "@/components/GradientCTA";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";

export async function generateMetadata({ params }: { params: Promise<{ lang: "en" | "ar" }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return {
        title: dict.metadata.home.title,
        description: dict.metadata.home.description,
        alternates: {
            canonical: `https://asklyze.com/${lang}`,
            languages: {
                'en': 'https://asklyze.com/en',
                'ar': 'https://asklyze.com/ar',
            },
        },
    };
}

export default async function Home({ params }: { params: Promise<{ lang: "en" | "ar" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <>
            <Navbar dict={dict.navbar} />
            <main>
                <Hero dict={dict.hero} />
                <WorkingProcess dict={dict.workingProcess} />
                <ContentSplit dict={dict.contentSplit} />
                <TabbedShowcase dict={dict.tabbedShowcase} />
                <FeatureGrid dict={dict.featureGrid} />
                <Testimonials dict={dict.testimonials} />
                <Pricing dict={dict.pricing} lang={lang} />
                <FAQ dict={dict.faq} />
                <GradientCTA dict={dict.gradientCTA} lang={lang} />
            </main>
            <Footer dict={dict.footer} />
        </>
    );
}
