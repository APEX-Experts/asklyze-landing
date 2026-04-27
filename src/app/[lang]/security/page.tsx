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
  return {
    title: dict.metadata.security.title,
    description: dict.metadata.security.description,
    alternates: {
      canonical: `https://asklyze.ai/${lang}/security`,
      languages: {
        en: "https://asklyze.ai/en/security",
        ar: "https://asklyze.ai/ar/security",
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
      <Navbar dict={dict.navbar} />
      <DataSecurityContent content={content} />
      <Footer dict={dict.footer} />
    </>
  );
}
