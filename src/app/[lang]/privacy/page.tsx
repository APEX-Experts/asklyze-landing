import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";
import PrivacyPolicyContent from "./PrivacyPolicyContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.metadata.privacy.title,
    description: dict.metadata.privacy.description,
    alternates: {
      canonical: `https://asklyze.ai/${lang}/privacy`,
      languages: {
        en: "https://asklyze.ai/en/privacy",
        ar: "https://asklyze.ai/ar/privacy",
      },
    },
  };
}

export default async function PrivacyPolicy({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const content = dict.privacy;

  return (
    <>
      <Navbar dict={dict.navbar} />
      <PrivacyPolicyContent content={content} />
      <Footer dict={dict.footer} />
    </>
  );
}
