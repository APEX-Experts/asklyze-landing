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
    title: "ASKLYZE | AI-Powered Analytics for Oracle APEX",
    description:
        "Transform your Oracle APEX into an intelligent analytics center. Natural language queries, instant insights, zero data movement.",
    keywords: [
        "Oracle APEX",
        "AI Analytics",
        "Natural Language SQL",
        "Business Intelligence",
        "Data Democratization",
    ],
    openGraph: {
        title: "ASKLYZE | AI-Powered Analytics for Oracle APEX",
        description:
            "Transform your Oracle APEX into an intelligent analytics center.",
        type: "website",
    },
    alternates: {
        canonical: "https://asklyze.com/en",
        languages: {
            'en': 'https://asklyze.com/en',
            'ar': 'https://asklyze.com/ar',
        },
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
