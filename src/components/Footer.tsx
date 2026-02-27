"use client";

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

interface FooterLink {
    name: string;
    href: string;
    target?: string;
}

export default function Footer({ dict }: FooterProps) {
    const pathname = usePathname();
    const currentLocale = pathname.startsWith("/ar") ? "ar" : "en";

    const footerColumns: { title: string; links: FooterLink[] }[] = [
        {
            title: "TRY ASKLYZE ON",
            links: [
                { name: "Web", href: "https://asklyze.ai", target: "_blank" },
                { name: "Oracle APEX", href: "https://asklyze.ai", target: "_blank" },
                { name: "Dashboard", href: "https://g50f94ce30c3ffb-asklyze.adb.ca-toronto-1.oraclecloudapps.com/ords/r/asklyze_local/asklyze-customer-portal/login", target: "_blank" },
            ]
        },
        {
            title: "PRODUCT",
            links: [
                { name: "Features", href: `/${currentLocale}/#features` },
                { name: "How It Works", href: `/${currentLocale}/#process` },
                { name: "Pricing", href: `/${currentLocale}/#pricing` },
                { name: "Security", href: `/${currentLocale}/security` },
            ]
        },
        {
            title: "API",
            links: [
                { name: "Documentation", href: "https://docs.asklyze.ai/", target: "_blank" },
                { name: "Architecture", href: `/${currentLocale}/#architecture` },
            ]
        },
        {
            title: "COMPANY",
            links: [
                { name: "About", href: `/${currentLocale}/about` },
                { name: "Contact", href: `/${currentLocale}/contact` },
                { name: "Blog", href: `/${currentLocale}/blog` },
            ]
        },
        {
            title: "RESOURCES",
            links: [
                { name: dict.bottomLinks.privacy || "Privacy Policy", href: `/${currentLocale}/privacy` },
                { name: dict.bottomLinks.terms || "Terms of Service", href: `/${currentLocale}/terms` },
                { name: dict.bottomLinks.security || "Security", href: `/${currentLocale}/security` },
                { name: "FAQ", href: `/${currentLocale}/#faq` },
            ]
        },
    ];

    return (
        <footer className="relative pt-32 pb-0 overflow-hidden">
            {/* Footer content */}
            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-16 mb-32">
                    {footerColumns.map((section, idx) => (
                        <div key={idx}>
                            <h4 className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.25em] mb-6 font-mono">
                                {section.title}
                            </h4>
                            <ul className="space-y-3.5">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a
                                            href={link.href}
                                            target={link.target}
                                            rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                                            className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Warm amber/orange gradient glow at the bottom — like x.ai */}
            <div className="relative w-full h-[200px] pointer-events-none select-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[400px]"
                    style={{
                        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(251,146,60,0.25) 0%, rgba(234,88,12,0.12) 30%, rgba(180,83,9,0.06) 50%, transparent 80%)',
                    }}
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px]"
                    style={{
                        background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(251,191,36,0.15) 0%, rgba(245,158,11,0.08) 40%, transparent 70%)',
                    }}
                />
            </div>
        </footer>
    );
}
