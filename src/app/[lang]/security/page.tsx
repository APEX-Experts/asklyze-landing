import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";
import DataSecurityContent from "./DataSecurityContent";

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
    title: dict.metadata.security.title,
    description: dict.metadata.security.description,
    alternates: {
      canonical: `${siteUrl}${lang}/security`,
      languages: {
        en: `${siteUrl}en/security`,
        ar: `${siteUrl}ar/security`,
      },
    },
  };
}

export default async function DataSecurity({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const content = dict.security;

  return (
    <>
      <Navbar dict={dict.navbar} siteSettings={dict.siteSettings} />
      <DataSecurityContent content={content} />
      <Footer dict={dict.footer} siteSettings={dict.siteSettings} />
    </>
  );
}
