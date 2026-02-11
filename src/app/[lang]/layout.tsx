import type { Metadata } from "next";
import { Playfair_Display, Inter, Vazirmatn } from "next/font/google";
import "../globals.css";
import SchemaMarkup from "@/components/SchemaMarkup";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const vazirmatn = Vazirmatn({
    subsets: ["arabic"],
    variable: "--font-vazirmatn",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL('https://asklyze.com'),
    title: {
        default: "ASKLYZE | The First AI-Powered Analytics Platform for Oracle APEX",
        template: "%s | ASKLYZE"
    },
    description: "Transform Oracle APEX into an intelligent analytics center. Zero data movement, natural language queries (English & Arabic), and enterprise-grade security.",
    applicationName: 'ASKLYZE',
    authors: [{ name: 'APEX Experts AI Solutions', url: 'https://apexexperts.ai' }],
    generator: 'Next.js',
    keywords: [
        "Oracle APEX AI",
        "APEX Analytics",
        "Natural Language to SQL",
        "Oracle APEX Reporting",
        "AI Dashboard Generator",
        "Oracle APEX Plugin",
        "Data Sovereignty",
        "Oracle Database AI",
        "Enterprise BI Tool",
        "Zero Data Movement"
    ],
    referrer: 'origin-when-cross-origin',
    creator: 'APEX Experts AI Solutions',
    publisher: 'APEX Experts AI Solutions',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        title: "ASKLYZE | AI-Powered Analytics for Oracle APEX",
        description: "Transform Oracle APEX into an intelligent analytics center. Query your data with natural language in English & Arabic.",
        url: 'https://asklyze.com',
        siteName: 'ASKLYZE',
        images: [
            {
                url: '/og-image.jpg', // Ensure this file exists or use a valid path
                width: 1200,
                height: 630,
                alt: 'ASKLYZE Platform Preview',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "ASKLYZE | AI for Oracle APEX",
        description: "Zero data movement analytics for Oracle APEX. English & Arabic support.",
        creator: '@asklyze', // Replace with actual handle if different
        images: ['/og-image.jpg'], // Ensure this file exists
    },
    icons: {
        icon: [
            {
                url: "/favicon-light.png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/favicon-dark.png",
                media: "(prefers-color-scheme: dark)",
            },
        ],
        shortcut: ["/favicon-light.png"],
        apple: ["/favicon-light.png"],
    },
};

export async function generateStaticParams() {
    return [{ lang: "en" }, { lang: "ar" }];
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const isArabic = lang === "ar";
    return (
        <html lang={lang} dir={isArabic ? "rtl" : "ltr"} className={`${playfair.variable} ${inter.variable} ${vazirmatn.variable}`} suppressHydrationWarning>
            <head>
                <SchemaMarkup lang={lang} />
            </head>
            <body
                style={{
                    fontFamily: isArabic ? "var(--font-vazirmatn), system-ui, sans-serif" : "var(--font-inter), system-ui, sans-serif",
                    // @ts-expect-error - CSS variables in style attribute
                    "--font-heading": isArabic ? "var(--font-vazirmatn)" : "var(--font-inter)",
                    "--font-body": isArabic ? "var(--font-vazirmatn)" : "var(--font-inter)",
                }}
                suppressHydrationWarning
            >
                {children}
            </body>
        </html>
    );
}
