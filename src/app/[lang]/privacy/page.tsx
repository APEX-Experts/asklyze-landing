import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";

export async function generateMetadata({ params }: { params: Promise<{ lang: "en" | "ar" }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: lang === "en" ? "Privacy Policy | ASKLYZE" : "سياسة الخصوصية | ASKLYZE",
        description: lang === "en"
            ? "Learn how ASKLYZE protects your data with our comprehensive privacy policy and zero data movement architecture."
            : "تعرف على كيفية حماية ASKLYZE لبياناتك من خلال سياسة الخصوصية الشاملة وبنية عدم نقل البيانات.",
    };
}

export default async function PrivacyPolicy({ params }: { params: Promise<{ lang: "en" | "ar" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const isArabic = lang === "ar";

    const content = isArabic ? {
        title: "سياسة الخصوصية",
        lastUpdated: "آخر تحديث: يناير 2026",
        intro: "في ASKLYZE، خصوصيتك وأمن بياناتك هي أولويتنا القصوى. تشرح هذه السياسة كيفية التزامنا بحماية معلوماتك عبر بنية 'عدم نقل البيانات' (Zero Data Movement) الفريدة.",
        sections: [
            {
                title: "1. بنية عدم نقل البيانات",
                content: "يعمل ASKLYZE على مبدأ أساسي: بياناتك لا تغادر بيئة Oracle الخاصة بك أبداً. يعمل محرك الذكاء الاصطناعي لدينا كطبقة منطقية فقط، حيث يترجم استعلامات اللغة الطبيعية إلى SQL، ولكن يتم تنفيذ جميع الاستعلامات محلياً داخل قاعدة بياناتك."
            },
            {
                title: "2. المعلومات التي نجمعها",
                points: [
                    "**البيانات الوصفية**: معلومات المخطط وهياكل الجداول والعلاقات (لتحسين دقة الاستعلام)",
                    "**سجلات الاستعلام**: الأسئلة المطروحة واستعلامات SQL المُنشأة (المخزنة في ASKLYZE_AI_QUERY_STORE المحلي)",
                    "**بيانات الاستخدام**: الأنماط الإحصائية لتحسين الأداء (مجهولة الهوية ومُجمعة)",
                    "**معلومات الحساب**: بيانات اعتماد المستخدم وأدوار الوصول (لأغراض المصادقة فقط)"
                ]
            },
            {
                title: "3. المعلومات التي لا نجمعها",
                points: [
                    "بيانات الأعمال الأولية أو الصفوف الفعلية من قاعدة بياناتك",
                    "معلومات التعريف الشخصية (PII) لعملائك",
                    "البيانات المالية أو المعاملات",
                    "المعلومات الحساسة المُخزنة في الجداول الخاصة بك"
                ]
            },
            {
                title: "4. كيف نستخدم المعلومات",
                points: [
                    "**معالجة الاستعلام**: لتحويل أسئلتك إلى استعلامات SQL دقيقة",
                    "**تحسين الأداء**: لتحسين دقة الذكاء الاصطناعي واستجابته بمرور الوقت",
                    "**التدقيق والامتثال**: لتوفير سجلات لمراقبة الأمان وتتبع الامتثال",
                    "**الدعم الفني**: للمساعدة في استكشاف الأخطاء وإصلاحها وتحسين الخدمة"
                ]
            },
            {
                title: "5. إقامة البيانات والسيادة",
                content: "بالنسبة لعمليات النشر المحلية، تظل جميع البيانات داخل مراكز البيانات الخاصة بك. بالنسبة لعمليات نشر SaaS عبر ORDS، يتم معالجة البيانات الوصفية فقط، ونحن نلتزم بمتطلبات إقامة البيانات المحددة في اتفاقيتك."
            },
            {
                title: "6. الأمان والتشفير",
                points: [
                    "تشفير HTTPS/TLS لجميع الاتصالات",
                    "التكامل مع Oracle VPD والأمان على مستوى الصف (RLS)",
                    "التحكم في الوصول القائم على الأدوار (RBAC)",
                    "تدقيق شامل في ASKLYZE_AI_QUERY_STORE"
                ]
            },
            {
                title: "7. مشاركة البيانات والجهات الخارجية",
                content: "نحن لا نبيع أو نشارك أو نكشف عن بياناتك لأطراف ثالثة. مقدمو خدمات الذكاء الاصطناعي لدينا (OpenAI، Anthropic) يتلقون فقط استعلامات مجردة ومعلومات المخطط - لا توجد بيانات أولية أبداً."
            },
            {
                title: "8. الاحتفاظ بالبيانات",
                content: "يتم تخزين سجلات الاستعلام محلياً في قاعدة بياناتك وفقاً لسياسات الاحتفاظ الخاصة بك. نحتفظ بالبيانات الوصفية المُجمعة (مجهولة الهوية) لمدة تصل إلى 24 شهراً لأغراض تحسين الخدمة."
            },
            {
                title: "9. حقوقك",
                points: [
                    "**الوصول**: مراجعة سجلات الاستعلام الخاصة بك في أي وقت",
                    "**الحذف**: حذف سجلات معينة أو حسابك بالكامل",
                    "**قابلية النقل**: تصدير بياناتك بتنسيقات قابلة للقراءة آلياً",
                    "**إلغاء الاشتراك**: إلغاء الاشتراك في البيانات الوصفية المُجمعة لتحسين الخدمة"
                ]
            },
            {
                title: "10. الامتثال",
                content: "تم تصميم ASKLYZE للامتثال للائحة العامة لحماية البيانات (GDPR) وCCPA وSOC 2 وشهادات ISO 27001. بالنسبة للقطاعات المنظمة (الرعاية الصحية، المالية، الحكومة)، يضمن النشر المحلي الامتثال الكامل للسيادة."
            }
        ],
        contact: {
            title: "اتصل بنا",
            content: "لأي أسئلة تتعلق بالخصوصية، اتصل بمسؤول حماية البيانات لدينا على:",
            email: "privacy@apexexperts.net",
            address: "مكتب رقم 43-44 - الفهيدي، دبي بر دبي، الإمارات العربية المتحدة"
        }
    } : {
        title: "Privacy Policy",
        lastUpdated: "Last Updated: January 2026",
        intro: "At ASKLYZE, your privacy and data security are our top priorities. This policy explains how we are committed to protecting your information through our unique 'Zero Data Movement' architecture.",
        sections: [
            {
                title: "1. Zero Data Movement Architecture",
                content: "ASKLYZE operates on a fundamental principle: your data never leaves your Oracle environment. Our AI engine acts solely as a logic layer, translating natural language queries into SQL, but all query execution happens locally within your database."
            },
            {
                title: "2. Information We Collect",
                points: [
                    "**Metadata**: Schema information, table structures, and relationships (for query optimization)",
                    "**Query Logs**: Questions asked and SQL queries generated (stored in local ASKLYZE_AI_QUERY_STORE)",
                    "**Usage Analytics**: Statistical patterns to improve performance (anonymized and aggregated)",
                    "**Account Information**: User credentials and access roles (for authentication purposes only)"
                ]
            },
            {
                title: "3. Information We Do NOT Collect",
                points: [
                    "Raw business data or actual rows from your database",
                    "Personally Identifiable Information (PII) of your customers",
                    "Financial data or transaction records",
                    "Sensitive information stored in your tables"
                ]
            },
            {
                title: "4. How We Use Information",
                points: [
                    "**Query Processing**: To convert your questions into accurate SQL queries",
                    "**Performance Optimization**: To improve AI accuracy and responsiveness over time",
                    "**Audit & Compliance**: To provide logs for security monitoring and compliance tracking",
                    "**Technical Support**: To assist with troubleshooting and service improvements"
                ]
            },
            {
                title: "5. Data Residency and Sovereignty",
                content: "For On-Premise deployments, all data remains within your data centers. For SaaS deployments via ORDS, only metadata is processed, and we comply with data residency requirements as specified in your agreement."
            },
            {
                title: "6. Security and Encryption",
                points: [
                    "HTTPS/TLS encryption for all communications",
                    "Integration with Oracle VPD and Row-Level Security (RLS)",
                    "Role-Based Access Control (RBAC)",
                    "Comprehensive auditing in ASKLYZE_AI_QUERY_STORE"
                ]
            },
            {
                title: "7. Data Sharing and Third Parties",
                content: "We do not sell, share, or disclose your data to third parties. Our AI service providers (OpenAI, Anthropic) receive only abstracted queries and schema information - never raw data."
            },
            {
                title: "8. Data Retention",
                content: "Query logs are stored locally in your database according to your retention policies. We retain aggregated metadata (anonymized) for up to 24 months for service improvement purposes."
            },
            {
                title: "9. Your Rights",
                points: [
                    "**Access**: Review your query logs at any time",
                    "**Deletion**: Delete specific logs or your entire account",
                    "**Portability**: Export your data in machine-readable formats",
                    "**Opt-Out**: Opt out of aggregated metadata for service improvements"
                ]
            },
            {
                title: "10. Compliance",
                content: "ASKLYZE is designed for GDPR, CCPA, SOC 2, and ISO 27001 compliance. For regulated sectors (healthcare, finance, government), On-Premise deployment ensures full sovereignty compliance."
            }
        ],
        contact: {
            title: "Contact Us",
            content: "For any privacy-related questions, contact our Data Protection Officer at:",
            email: "privacy@apexexperts.net",
            address: "Office No. 43-44 - Al Fahidi, Dubai Bur Dubai, UAE"
        }
    };

    return (
        <>
            <Navbar dict={dict.navbar} />
            <main className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-24">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#2c234d] mb-4">{content.title}</h1>
                        <p className="text-sm text-gray-500 mb-8">{content.lastUpdated}</p>

                        <p className="text-lg text-gray-700 leading-relaxed mb-12">{content.intro}</p>

                        <div className="space-y-8">
                            {content.sections.map((section, index) => (
                                <div key={index} className="border-l-4 border-[#ff705a] pl-6">
                                    <h2 className="text-2xl font-bold text-[#2c234d] mb-4">{section.title}</h2>
                                    {section.content && (
                                        <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
                                    )}
                                    {section.points && (
                                        <ul className="space-y-3">
                                            {section.points.map((point, idx) => (
                                                <li key={idx} className="text-gray-700 leading-relaxed flex items-start gap-3">
                                                    <span className="text-[#ff705a] mt-1">•</span>
                                                    <span dangerouslySetInnerHTML={{ __html: point }} />
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}

                            <div className="bg-[#faebe8] rounded-xl p-8 mt-12">
                                <h2 className="text-2xl font-bold text-[#2c234d] mb-4">{content.contact.title}</h2>
                                <p className="text-gray-700 mb-4">{content.contact.content}</p>
                                <p className="text-[#ff705a] font-semibold mb-2">{content.contact.email}</p>
                                <p className="text-gray-600 text-sm">{content.contact.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer dict={dict.footer} />
        </>
    );
}
