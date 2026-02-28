"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface FooterProps {
    dict: {
        company: string;
        services: string;
        digitalExperience: string;
        address: string;
        nycOffice: string;
        links: {
            features: string;
            dashboard: string;
            portfolio: string;
            about: string;
            contact: string;
        };
        rights: string;
        bottomLinks: {
            privacy: string;
            terms: string;
            security: string;
        };
    };
}

export default function Footer({ dict }: FooterProps) {
    const pathname = usePathname();
    const currentLocale = pathname.startsWith("/ar") ? "ar" : "en";

    return (
        <footer style={{ background: "#000000" }}>
            <div className="container">
                {/* Minimal copyright line — exactly like Vexel */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="py-8 flex flex-col md:flex-row justify-between items-center gap-4"
                    style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}
                >
                    <p className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>
                        © {new Date().getFullYear()} — {dict.rights}
                    </p>
                    <div className="flex gap-6 text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>
                        <a href={`/${currentLocale}/privacy`} className="hover:text-white transition-colors">{dict.bottomLinks.privacy}</a>
                        <a href={`/${currentLocale}/terms`} className="hover:text-white transition-colors">{dict.bottomLinks.terms}</a>
                        <a href={`/${currentLocale}/security`} className="hover:text-white transition-colors">{dict.bottomLinks.security}</a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
