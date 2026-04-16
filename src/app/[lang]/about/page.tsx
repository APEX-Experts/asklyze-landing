import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";
import AboutContent from "./AboutContent";

export async function generateMetadata({ params }: { params: Promise<{ lang: "en" | "ar" }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return {
        title: dict.metadata.about.title,
        description: dict.metadata.about.description,
        alternates: {
            canonical: `https://asklyze.ai/${lang}/about`,
            languages: {
                'en': 'https://asklyze.ai/en/about',
                'ar': 'https://asklyze.ai/ar/about',
            },
        },
    };
}

export default async function About({ params }: { params: Promise<{ lang: "en" | "ar" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const isArabic = lang === "ar";

    return (
        <>
            <Navbar dict={dict.navbar} />
            <AboutContent lang={lang} isArabic={isArabic} content={dict.aboutPage} />
            <Footer dict={dict.footer} />
        </>
    );
}
