"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

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

    const portfolioPDF = currentLocale === "ar"
        ? "/ASKLYZE-Intelligent_APEX_Analytics_2026_ar.pdf"
        : "/ASKLYZE-Intelligent_APEX_Analytics_2026_en.pdf";

    const footerLinks = [
        {
            title: dict.company,
            links: [
                { name: dict.links.features, href: `/${currentLocale}/#features` },
                { name: dict.links.about, href: `/${currentLocale}/about` },
                { name: dict.links.portfolio, href: portfolioPDF, target: "_blank" },
                { name: dict.links.contact, href: `/${currentLocale}/contact` },
            ]
        },
        {
            title: dict.services,
            links: [
                { name: "Documentation", href: "https://docs.asklyze.ai/", target: "_blank" },
                { name: "Demo", href: "https://g64534a1113c35c-asklyze.adb.me-riyadh-1.oraclecloudapps.com/ords/r/asklyze_cloud/asklyze-demo/login", target: "_blank" },
                { name: "Blog", href: `/${currentLocale}/blog` },
            ]
        },
        {
            title: dict.digitalExperience,
            links: [
                { name: "Pricing", href: `/${currentLocale}/#pricing` },
                { name: "FAQ", href: `/${currentLocale}/#faq` },
                { name: dict.links.contact, href: `/${currentLocale}/contact` },
            ]
        }
    ];

    const socialLinks = [
        { icon: Facebook, href: "https://www.facebook.com/apexexperts.ai" },
        { icon: Twitter, href: "https://twitter.com/apex_experts" },
        { icon: Github, href: "https://github.com/APEX-Experts" },
        { icon: Linkedin, href: "https://www.linkedin.com/company/apex-experts" },
    ];

    return (
        <footer className="pt-24 pb-12 bg-white">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
                    {footerLinks.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-[#2c234d] font-bold text-lg mb-8">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a
                                            href={link.href}
                                            target={link.target}
                                            rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                                            className="text-[#6a7695] hover:text-[#ff705a] text-sm transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}

                    {/* Our Address Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        {/* Footer Logo */}
                        <div className="mb-6">
                            <Image src="/logo-dark.png" alt="ASKLYZE" width={140} height={40} className="h-8 w-auto" />
                        </div>

                        <h4 className="text-[#2c234d] font-bold text-lg mb-8">{dict.address}</h4>

                        <p className="text-[#6a7695] text-sm leading-relaxed mb-8 max-w-xs">
                            {dict.nycOffice}
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#ff705a] hover:text-[#ff705a] transition-all duration-300"
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#6a7695]">
                    <p>
                        © {new Date().getFullYear()} {dict.rights}
                    </p>
                    <div className="flex gap-6">
                        <a href={`/${currentLocale}/privacy`} className="hover:text-[#ff705a]">{dict.bottomLinks.privacy}</a>
                        <a href={`/${currentLocale}/terms`} className="hover:text-[#ff705a]">{dict.bottomLinks.terms}</a>
                        <a href={`/${currentLocale}/security`} className="hover:text-[#ff705a]">{dict.bottomLinks.security}</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
