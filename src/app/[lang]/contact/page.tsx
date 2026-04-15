import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactHero from "@/components/ContactHero";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.metadata.contact.title,
    description: dict.metadata.contact.description,
    alternates: {
      canonical: `https://asklyze.ai/${lang}/contact`,
      languages: {
        en: "https://asklyze.ai/en/contact",
        ar: "https://asklyze.ai/ar/contact",
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <>
      <Navbar dict={dict.navbar} />
      <main className="mt-16 space-y-12">
        <ContactUs dict={dict.contactUs} />
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
