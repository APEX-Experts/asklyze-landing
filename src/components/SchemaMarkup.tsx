
import React from 'react';

export default function SchemaMarkup({ lang }: { lang: string }) {
    const isArabic = lang === 'ar';
    const baseUrl = 'https://asklyze.ai';

    const webSiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "ASKLYZE",
        "url": baseUrl,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${baseUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ASKLYZE",
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "sameAs": [
            "https://www.linkedin.com/company/asklyze",
            "https://twitter.com/asklyze"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+971-50-1234567", // Replace with actual phone if available
            "contactType": "sales",
            "areaServed": ["AE", "SA", "US", "GB"],
            "availableLanguage": ["en", "ar"]
        }
    };

    const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "ASKLYZE",
        "operatingSystem": "Oracle APEX 19c, Oracle APEX 23ai",
        "applicationCategory": "BusinessApplication",
        "description": isArabic
            ? "حول Oracle APEX إلى مركز تحليلات مدعوم بالذكاء الاصطناعي. استعلم عن بياناتك باللغة الطبيعية."
            : "Transform Oracle APEX into an AI-powered analytics hub. Query your data with natural language.",
        "offers": {
            "@type": "Offer",
            "price": "499.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/OnlineOnly"
        },
        "screenshot": `${baseUrl}/og-image.jpg`,
        "featureList": isArabic
            ? ["تحليلات باللغة الطبيعية", "لوحات تحكم ذكية", "أمان على مستوى المؤسسات", "بدون نقل بيانات"]
            : ["Natural Language Analytics", "AI Dashboards", "Enterprise Security", "Zero Data Movement"]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
            />
        </>
    );
}
