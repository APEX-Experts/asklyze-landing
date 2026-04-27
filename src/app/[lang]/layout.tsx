import type { Metadata } from "next";
import { Playfair_Display, Inter, Almarai } from "next/font/google";
import "../globals.css";
import SchemaMarkup from "@/components/SchemaMarkup";
import Preloader from "@/components/Preloader";
import GoogleTag from "@/components/GoogleTag";

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

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
  display: "swap",
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  return {
    metadataBase: new URL(baseUrl),

    title: {
      default:
        lang === "ar"
          ? "ASKLYZE | منصة تحليلات مدعومة بالذكاء الاصطناعي لـ Oracle APEX"
          : "ASKLYZE | AI-Powered Analytics for Oracle APEX",
      template: "%s",
    },

    description:
      lang === "ar"
        ? "حوّل Oracle APEX إلى مركز تحليلات ذكي باستخدام الذكاء الاصطناعي."
        : "Transform Oracle APEX into an AI-powered analytics hub.",

    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
        "x-default": `${baseUrl}/en`,
      },
    },
    applicationName: "ASKLYZE",
    authors: [
      { name: "APEX Experts AI Solutions", url: "https://apexexperts.net" },
    ],
    creator: "APEX Experts AI Solutions",
    publisher: "APEX Experts AI Solutions",
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
      "Zero Data Movement",
    ],
    referrer: "origin-when-cross-origin",

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      url: `${baseUrl}/${lang}`,
      siteName: "ASKLYZE",
      title: {
        default:
          lang === "ar"
            ? "ASKLYZE | منصة تحليلات مدعومة بالذكاء الاصطناعي لـ Oracle APEX"
            : "ASKLYZE | AI-Powered Analytics for Oracle APEX",
        template: "%s",
      },
      description:
        lang === "ar"
          ? "حوّل Oracle APEX إلى مركز تحليلات ذكي باستخدام الذكاء الاصطناعي."
          : "Transform Oracle APEX into an AI-powered analytics hub.",
      locale: lang === "ar" ? "ar_EG" : "en_US",
      type: "website",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: "ASKLYZE",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/logo.png"],
      title: {
        default:
          lang === "ar"
            ? "ASKLYZE | منصة تحليلات مدعومة بالذكاء الاصطناعي لـ Oracle APEX"
            : "ASKLYZE | AI-Powered Analytics for Oracle APEX",
        template: "%s",
      },
      description:
        lang === "ar"
          ? "حوّل Oracle APEX إلى مركز تحليلات ذكي باستخدام الذكاء الاصطناعي."
          : "Transform Oracle APEX into an AI-powered analytics hub.",
    },
    other: {
      "theme-color": "#000000",
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
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isArabic = lang === "ar";

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const adsId = process.env.NEXT_PUBLIC_ADS_ID;

  return (
    <html
      lang={lang}
      dir={isArabic ? "rtl" : "ltr"}
      className={`${playfair.variable} ${inter.variable} ${almarai.variable}`}
      suppressHydrationWarning
    >
      <body
        style={{
          fontFamily: isArabic
            ? "var(--font-almarai), system-ui, sans-serif"
            : "var(--font-inter), system-ui, sans-serif",
        }}
        suppressHydrationWarning
      >
        <SchemaMarkup lang={lang} />
        <GoogleTag gaId={gaId} adsId={adsId} />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
