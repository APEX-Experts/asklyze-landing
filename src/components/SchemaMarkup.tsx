
import React from 'react';

export default function SchemaMarkup({ lang }: { lang: string }) {
    const isArabic = lang === 'ar';

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ASKLYZE",
        "url": "https://asklyze.com",
        "logo": "https://asklyze.com/logo.png",
        "sameAs": [
            "https://www.linkedin.com/company/asklyze",
            "https://twitter.com/asklyze"
        ]
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
            "priceCurrency": "USD"
        }
    };

    return (
        <>
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
