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
            faq: string;
            terms: string;
        };
    };
}

export default function Footer({ dict }: FooterProps) {
    const pathname = usePathname();
    const currentLocale = pathname.startsWith("/ar") ? "ar" : "en";

    const footerLinks = [
        {
            title: dict.company,
            links: [
                { name: dict.links.features, href: `/${currentLocale}#features` },
                { name: dict.links.dashboard, href: `/${currentLocale}#dashboard` },
                { name: dict.links.portfolio, href: `/${currentLocale}#portfolio` },
                { name: dict.links.about, href: `/${currentLocale}#aboutUs` },
                { name: dict.links.contact, href: `/${currentLocale}#contact` },
            ]
        },
        {
            title: dict.services,
            links: [
                { name: dict.links.features, href: `/${currentLocale}#features` },
                { name: dict.links.dashboard, href: `/${currentLocale}#dashboard` },
                { name: dict.links.portfolio, href: `/${currentLocale}#portfolio` },
                { name: dict.links.about, href: `/${currentLocale}#aboutUs` },
                { name: dict.links.contact, href: `/${currentLocale}#contact` },
            ]
        },
        {
            title: dict.digitalExperience,
            links: [
                { name: dict.links.features, href: `/${currentLocale}#features` },
                { name: dict.links.dashboard, href: `/${currentLocale}#dashboard` },
                { name: dict.links.portfolio, href: `/${currentLocale}#portfolio` },
                { name: dict.links.about, href: `/${currentLocale}#aboutUs` },
                { name: dict.links.contact, href: `/${currentLocale}#contact` },
            ]
        }
    ];

    const socialLinks = [
        { icon: Facebook, href: "#" },
        { icon: Twitter, href: "#" },
        { icon: Github, href: "#" },
        { icon: Linkedin, href: "#" },
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
                                        <a href={link.href} className="text-[#6a7695] hover:text-[#ff705a] text-sm transition-colors">
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
                        <a href={`/${currentLocale}#privacy`} className="hover:text-[#ff705a]">{dict.bottomLinks.privacy}</a>
                        <a href={`/${currentLocale}#faq`} className="hover:text-[#ff705a]">{dict.bottomLinks.faq}</a>
                        <a href={`/${currentLocale}#terms`} className="hover:text-[#ff705a]">{dict.bottomLinks.terms}</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
