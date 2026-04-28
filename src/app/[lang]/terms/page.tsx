import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";
import TermsAndConditionsContent from "./TermsAndConditionsContent";

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
    title: dict.metadata.terms.title,
    description: dict.metadata.terms.description,
    alternates: {
      canonical: `${siteUrl}${lang}/terms`,
      languages: {
        en: `${siteUrl}en/terms`,
        ar: `${siteUrl}ar/terms`,
      },
    },
  };
}

export default async function TermsAndConditions({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const content = dict.terms;

  return (
    <>
      <Navbar dict={dict.navbar} siteSettings={dict.siteSettings} />
      <TermsAndConditionsContent content={content} />
      <Footer dict={dict.footer} siteSettings={dict.siteSettings} />
    </>
  );
}
