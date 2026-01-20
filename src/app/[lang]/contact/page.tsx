import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactHero from "@/components/ContactHero";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }: { params: Promise<{ lang: "en" | "ar" }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return {
        title: dict.metadata.contact.title,
        description: dict.metadata.contact.description,
    };
}

import { getDictionary } from "@/get-dictionary";

export default async function ContactPage({ params }: { params: Promise<{ lang: "en" | "ar" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return (
        <>
            <Navbar dict={dict.navbar} />
            <main>
                <ContactHero dict={dict.contactHero} />
                <ContactSection dict={dict.contact} />
            </main>
            <Footer dict={dict.footer} />
        </>
    );
}
