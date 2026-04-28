import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getDictionary } from "@/get-dictionary";
import type { Metadata } from "next";

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
    title: dict.metadata.contact.title,
    description: dict.metadata.contact.description,
    alternates: {
      canonical: `${siteUrl}${lang}/contact`,
      languages: {
        en: `${siteUrl}en/contact`,
        ar: `${siteUrl}ar/contact`,
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
      <Navbar dict={dict.navbar} siteSettings={dict.siteSettings} />
      <main className="mt-16 space-y-12">
        <ContactUs dict={dict.contactUs} lang={lang} />
      </main>
      <Footer dict={dict.footer} siteSettings={dict.siteSettings} />
    </>
  );
}
