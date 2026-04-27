export default function SchemaMarkup({ lang }: { lang: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  const isArabic = lang === "ar";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}#website`,
        url: baseUrl,
        name: "ASKLYZE",
        inLanguage: lang,
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}#organization`,
        name: "ASKLYZE",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        sameAs: [
          "https://www.linkedin.com/showcase/asklyze-ai",
          "https://github.com/APEX-Experts",
          "https://apexexperts.net",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "support@asklyze.ai",
          contactType: "sales",
          areaServed: ["AE", "SA", "US", "GB"],
          availableLanguage: ["en", "ar"],
        },
      },
      {
        "@type": "WebApplication",
        name: "ASKLYZE",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: lang,
        description: isArabic
          ? "منصة تحليلات مدعومة بالذكاء الاصطناعي لـ Oracle APEX"
          : "AI-powered analytics for Oracle APEX",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
