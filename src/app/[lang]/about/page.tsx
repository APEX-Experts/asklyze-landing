import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";
import AboutContent from "./AboutContent";

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
    title: dict.metadata.about.title,
    description: dict.metadata.about.description,
    alternates: {
      canonical: `${siteUrl}${lang}/about`,
      languages: {
        en: `${siteUrl}en/about`,
        ar: `${siteUrl}ar/about`,
      },
    },
  };
}

export default async function About({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isArabic = lang === "ar";

  return (
    <>
      <Navbar dict={dict.navbar} siteSettings={dict.siteSettings} />
      <AboutContent lang={lang} isArabic={isArabic} content={dict.aboutPage} />
      <Footer dict={dict.footer} siteSettings={dict.siteSettings} />
    </>
  );
}
