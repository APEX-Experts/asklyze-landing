import Navbar from "@/components/Navbar";
import ContactHero from "@/components/ContactHero";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Contact Us - ASKLYZE",
    description: "Get in touch with the ASKLYZE team. We'd love to hear from you and answer any questions you may have.",
};

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
