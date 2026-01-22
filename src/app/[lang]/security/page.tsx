import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";

export async function generateMetadata({ params }: { params: Promise<{ lang: "en" | "ar" }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: lang === "en" ? "Data Security | ASKLYZE" : "أمن البيانات | ASKLYZE",
        description: lang === "en"
            ? "Learn about ASKLYZE's comprehensive data security measures, Zero Data Movement architecture, and enterprise-grade protection."
            : "تعرف على تدابير أمن البيانات الشاملة لـ ASKLYZE وبنية عدم نقل البيانات والحماية على مستوى المؤسسات.",
    };
}

export default async function DataSecurity({ params }: { params: Promise<{ lang: "en" | "ar" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const isArabic = lang === "ar";

    const content = isArabic ? {
        title: "أمن البيانات",
        lastUpdated: "آخر تحديث: يناير 2026",
        intro: "في ASKLYZE، الأمان ليس ميزة - إنه الأساس. بنية 'عدم نقل البيانات' الخاصة بنا تضمن أن بياناتك الحساسة لا تغادر بيئة Oracle الخاصة بك أبداً، مما يوفر أمناً وامتثالاً لا مثيل لهما.",
        sections: [
            {
                title: "1. بنية عدم نقل البيانات (Zero Data Movement)",
                content: "مبدأنا الأساسي في الأمان بسيط ولكنه قوي: بياناتك تبقى في مكانها. يعمل ASKLYZE كطبقة ذكاء فوق قاعدة بيانات Oracle الخاصة بك، حيث يترجم الاستعلامات باللغة الطبيعية إلى SQL دون أن يلمس أو ينقل بياناتك الأولية.",
                points: [
                    "**لا يوجد استخراج للبيانات**: البيانات الأولية لا تغادر قاعدة البيانات الخاصة بك أبداً",
                    "**التنفيذ المحلي**: جميع الاستعلامات تعمل محلياً داخل Oracle Database الخاص بك",
                    "**البيانات الوصفية فقط**: يعالج محرك الذكاء الاصطناعي فقط معلومات المخطط، وليس البيانات الفعلية",
                    "**الامتثال حسب التصميم**: يفي بطبيعته بمتطلبات إقامة البيانات والسيادة"
                ]
            },
            {
                title: "2. التشفير وأمان النقل",
                points: [
                    "**TLS 1.3**: تشفير HTTPS/TLS القياسي في الصناعة لجميع الاتصالات",
                    "**التشفير من النهاية إلى النهاية**: جميع البيانات المنقولة مشفرة في النقل",
                    "**تكامل Oracle ORDS**: اتصالات آمنة عبر Oracle REST Data Services",
                    "**تثبيت الشهادة**: تحقق صارم من شهادة SSL/TLS",
                    "**لا توجد بيانات نصية عادية**: لا يتم نقل أي بيانات حساسة بدون تشفير"
                ]
            },
            {
                title: "3. التحكم في الوصول والمصادقة",
                points: [
                    "**التحكم في الوصول القائم على الأدوار (RBAC)**: صلاحيات دقيقة بناءً على أدوار المستخدمين",
                    "**تكامل Oracle VPD**: دعم كامل لـ Virtual Private Database",
                    "**الأمان على مستوى الصف (RLS)**: يحترم سياسات RLS الموجودة في Oracle",
                    "**المصادقة الموحدة (SSO)**: التكامل مع LDAP وActive Directory وOAuth",
                    "**المصادقة متعددة العوامل (MFA)**: دعم اختياري لـ MFA للحسابات ذات الامتياز",
                    "**إدارة الجلسات**: انتهاء صلاحية آمن للجلسات وإلغاء الرموز المميزة"
                ]
            },
            {
                title: "4. التدقيق والمراقبة",
                content: "يوفر ASKLYZE قدرات تدقيق شاملة لتتبع الأمان والامتثال:",
                points: [
                    "**ASKLYZE_AI_QUERY_STORE**: جدول تدقيق محلي يسجل جميع الاستعلامات والأنشطة",
                    "**سجلات نشاط المستخدم**: تتبع كامل لمن سأل ماذا ومتى",
                    "**تدقيق SQL المُنشأ**: جميع استعلامات SQL المُنشأة مسجلة للمراجعة",
                    "**تنبيهات الأمان**: إشعارات فورية لأنماط الوصول المشبوهة",
                    "**تقارير الامتثال**: سجلات جاهزة للتدقيق لمتطلبات SOC 2 وISO 27001",
                    "**الاحتفاظ بالسجلات**: سجلات قابلة للتكوين وفقاً لسياسات مؤسستك"
                ]
            },
            {
                title: "5. أمان البنية التحتية",
                points: [
                    "**عزل الشبكة**: نشر VPC لعمليات نشر SaaS",
                    "**إعدادات الجدار الناري**: تصفية صارمة لحركة المرور الداخلة والخارجة",
                    "**اكتشاف التسلل**: المراقبة في الوقت الفعلي للأنشطة الشاذة",
                    "**إدارة التصحيحات**: تحديثات أمان منتظمة ومحددة زمنياً",
                    "**خطة استمرارية الأعمال**: أنظمة فائضة وإجراءات التعافي من الكوارث",
                    "**Oracle Cloud Infrastructure (OCI)**: للنشر السحابي، نستخدم أمان OCI على مستوى المؤسسات"
                ]
            },
            {
                title: "6. أمان الذكاء الاصطناعي ونماذج اللغة الكبيرة",
                content: "تتطلب معالجة الذكاء الاصطناعي لدينا تدابير أمان محددة:",
                points: [
                    "**تجريد الاستعلام**: تتلقى نماذج اللغة الكبيرة فقط أسئلة مجردة + معلومات المخطط",
                    "**لا توجد بيانات PII**: لا يتم إرسال معلومات تعريف شخصية إلى موفري الذكاء الاصطناعي",
                    "**حدود المعدل**: حماية ضد إساءة استخدام نقطة نهاية الذكاء الاصطناعي",
                    "**تحقق من الإخراج**: مراجعة تلقائية لسلامة SQL المُنشأ",
                    "**قوائم الحظر والسماح**: قوائم الجداول والعمليات القابلة للتكوين",
                    "**عزل النموذج**: مثيلات نموذج منفصلة للعملاء ذوي الأمان العالي"
                ]
            },
            {
                title: "7. الامتثال والشهادات",
                content: "ASKLYZE مصمم للامتثال لأطر الأمان والخصوصية الرائدة في الصناعة:",
                points: [
                    "**SOC 2 Type II**: ضوابط تنظيمية شاملة (جارية)",
                    "**ISO 27001**: شهادة نظام إدارة أمن المعلومات (مخطط لها)",
                    "**الامتثال للائحة العامة لحماية البيانات (GDPR)**: التزام كامل بحماية البيانات في الاتحاد الأوروبي",
                    "**الامتثال لـ CCPA**: متطلبات خصوصية كاليفورنيا",
                    "**HIPAA (للرعاية الصحية)**: النشر المحلي يدعم متطلبات HIPAA",
                    "**PCI DSS (للمدفوعات)**: متوافق مع معايير أمان بيانات البطاقات",
                    "**FedRAMP (للحكومة الأمريكية)**: على خارطة الطريق للنشر الحكومي"
                ]
            },
            {
                title: "8. النسخ الاحتياطي للبيانات والتعافي من الكوارث",
                points: [
                    "**النسخ الاحتياطية المحلية**: تتبع بياناتك سياسات النسخ الاحتياطي الخاصة بـ Oracle",
                    "**النسخ الاحتياطي لبيانات التكوين**: نسخ احتياطية يومية لإعدادات ASKLYZE والبيانات الوصفية",
                    "**استعادة نقطة في الوقت (PITR)**: للنشر السحابي، استعادة حتى 30 يوماً",
                    "**اختبار التعافي من الكوارث**: اختبارات استعادة ربع سنوية",
                    "**نسخ جغرافية متماثلة (للسحابة)**: تكرار البيانات عبر المناطق للمرونة",
                    "**اتفاقية مستوى الخدمة (SLA)**: 99.5٪ من وقت التشغيل المضمون لـ SaaS، RTO < 4 ساعات"
                ]
            },
            {
                title: "9. إدارة الثغرات الأمنية",
                points: [
                    "**فحص الأمان المنتظم**: فحوصات ربع سنوية للثغرات",
                    "**اختبار الاختراق**: اختبار القلم السنوي من قبل شركات أمنية مستقلة",
                    "**برنامج الإفصاح المسؤول**: إرشادات واضحة للإبلاغ عن الثغرات",
                    "**مكافآت الأخطاء**: مكافآت للباحثين الأمنيين (خطط مستقبلية)",
                    "**تصحيح الأمان**: تحديثات حرجة خلال 24 ساعة من الاكتشاف",
                    "**تتبع CVE**: مراقبة نشطة لثغرات التبعيات"
                ]
            },
            {
                title: "10. الاستجابة للحوادث",
                content: "في حالة حدوث حادث أمني، تتبع ASKLYZE بروتوكولاً صارماً:",
                points: [
                    "**الكشف**: مراقبة على مدار الساعة طوال أيام الأسبوع ونظم تنبيه تلقائية",
                    "**الاحتواء**: عزل فوري للأنظمة المتأثرة",
                    "**التحقيق**: تحليل السبب الجذري والتقييم الجنائي",
                    "**الإخطار**: إشعار العملاء المتأثرين خلال 72 ساعة (متطلبات GDPR)",
                    "**المعالجة**: إصلاح الثغرات وتعزيز الدفاعات",
                    "**مراجعة ما بعد الحادث**: توثيق الدروس المستفادة وتحسينات العملية"
                ]
            },
            {
                title: "11. التدريب الأمني والوعي",
                points: [
                    "**تدريب الموظفين**: تدريب أمني إلزامي لجميع موظفي APEX Experts",
                    "**الوعي بالتصيد الاحتيالي**: اختبارات وتدريب منتظم للتصيد الاحتيالي",
                    "**معالجة البيانات الآمنة**: بروتوكولات صارمة لجميع الموظفين ذوي الوصول",
                    "**فحوصات الخلفية**: فحص شامل للموظفين في الأدوار الحساسة",
                    "**الحد الأدنى من الامتياز**: يتلقى الموظفون فقط الحد الأدنى من الوصول المطلوب",
                    "**مراجعات الوصول**: مراجعات ربع سنوية لصلاحيات الموظفين"
                ]
            },
            {
                title: "12. أمان النشر المحلي",
                content: "بالنسبة لعمليات النشر المحلية، لديك سيطرة كاملة على الأمان:",
                points: [
                    "**شبكتك، قواعدك**: ASKLYZE يعمل ضمن سياسات الأمان الموجودة لديك",
                    "**لا توجد استدعاءات خارجية**: يمكن تكوينها للعمل بشكل كامل على شبكة مغلقة",
                    "**النماذج المحلية للذكاء الاصطناعي**: خيار استضافة نماذج اللغة الكبيرة محلياً (الإصدار المؤسسي)",
                    "**المراجعات الأمنية**: يتوفر كود المصدر للمراجعة من قبل فريق الأمان الخاص بك",
                    "**تحديثات معزولة**: آلية تحديث آمنة وخاضعة للرقابة",
                    "**الامتثال الكامل للسيادة**: بياناتك تبقى في بلدك/منطقتك"
                ]
            }
        ],
        contact: {
            title: "فريق الأمان",
            content: "لأي مخاوف أمنية أو للإبلاغ عن ثغرة أمنية، اتصل بفريق الأمان لدينا على:",
            email: "security@apexexperts.net",
            address: "مكتب رقم 43-44 - الفهيدي، دبي بر دبي، الإمارات العربية المتحدة",
            responsible: "للإفصاح المسؤول عن الثغرات، يرجى تضمين تفاصيل الاكتشاف وخطوات الاستنساخ والتأثير المحتمل."
        }
    } : {
        title: "Data Security",
        lastUpdated: "Last Updated: January 2026",
        intro: "At ASKLYZE, security is not a feature—it's the foundation. Our 'Zero Data Movement' architecture ensures your sensitive data never leaves your Oracle environment, providing unmatched security and compliance.",
        sections: [
            {
                title: "1. Zero Data Movement Architecture",
                content: "Our foundational security principle is simple yet powerful: your data stays where it belongs. ASKLYZE operates as an intelligence layer on top of your Oracle database, translating natural language queries into SQL without ever touching or moving your raw data.",
                points: [
                    "**No Data Extraction**: Raw data never leaves your database",
                    "**Local Execution**: All queries execute locally within your Oracle Database",
                    "**Metadata Only**: The AI engine processes only schema information, never actual data",
                    "**Compliance by Design**: Inherently meets data residency and sovereignty requirements"
                ]
            },
            {
                title: "2. Encryption and Transport Security",
                points: [
                    "**TLS 1.3**: Industry-standard HTTPS/TLS encryption for all communications",
                    "**End-to-End Encryption**: All data in transit is encrypted",
                    "**Oracle ORDS Integration**: Secure connections via Oracle REST Data Services",
                    "**Certificate Pinning**: Strict SSL/TLS certificate validation",
                    "**No Plaintext Data**: No sensitive data is transmitted unencrypted"
                ]
            },
            {
                title: "3. Access Control and Authentication",
                points: [
                    "**Role-Based Access Control (RBAC)**: Granular permissions based on user roles",
                    "**Oracle VPD Integration**: Full support for Virtual Private Database",
                    "**Row-Level Security (RLS)**: Respects existing Oracle RLS policies",
                    "**Single Sign-On (SSO)**: Integration with LDAP, Active Directory, and OAuth",
                    "**Multi-Factor Authentication (MFA)**: Optional MFA support for privileged accounts",
                    "**Session Management**: Secure session expiration and token revocation"
                ]
            },
            {
                title: "4. Audit and Monitoring",
                content: "ASKLYZE provides comprehensive auditing capabilities for security tracking and compliance:",
                points: [
                    "**ASKLYZE_AI_QUERY_STORE**: Local audit table logging all queries and activity",
                    "**User Activity Logs**: Complete tracking of who asked what and when",
                    "**Generated SQL Audit**: All generated SQL queries are logged for review",
                    "**Security Alerts**: Real-time notifications for suspicious access patterns",
                    "**Compliance Reports**: Audit-ready logs for SOC 2 and ISO 27001 requirements",
                    "**Log Retention**: Configurable retention according to your organization's policies"
                ]
            },
            {
                title: "5. Infrastructure Security",
                points: [
                    "**Network Isolation**: VPC deployment for SaaS deployments",
                    "**Firewall Configuration**: Strict ingress/egress traffic filtering",
                    "**Intrusion Detection**: Real-time monitoring for anomalous activity",
                    "**Patch Management**: Regular, time-bound security updates",
                    "**Business Continuity**: Redundant systems and disaster recovery procedures",
                    "**Oracle Cloud Infrastructure (OCI)**: For cloud deployment, we leverage enterprise-grade OCI security"
                ]
            },
            {
                title: "6. AI and LLM Security",
                content: "Our AI processing requires specific security measures:",
                points: [
                    "**Query Abstraction**: LLMs receive only abstracted questions + schema information",
                    "**No PII Data**: No personally identifiable information is sent to AI providers",
                    "**Rate Limiting**: Protection against AI endpoint abuse",
                    "**Output Validation**: Automatic review of generated SQL for safety",
                    "**Blacklist/Whitelist**: Configurable table and operation lists",
                    "**Model Isolation**: Separate model instances for high-security customers"
                ]
            },
            {
                title: "7. Compliance and Certifications",
                content: "ASKLYZE is designed for compliance with industry-leading security and privacy frameworks:",
                points: [
                    "**SOC 2 Type II**: Comprehensive organizational controls (in progress)",
                    "**ISO 27001**: Information Security Management System certification (planned)",
                    "**GDPR Compliance**: Full adherence to EU data protection regulations",
                    "**CCPA Compliance**: California privacy requirements",
                    "**HIPAA (Healthcare)**: On-Premise deployment supports HIPAA requirements",
                    "**PCI DSS (Payments)**: Compatible with card data security standards",
                    "**FedRAMP (US Government)**: Roadmapped for government deployment"
                ]
            },
            {
                title: "8. Data Backup and Disaster Recovery",
                points: [
                    "**Local Backups**: Your data follows your own Oracle backup policies",
                    "**Configuration Data Backup**: Daily backups of ASKLYZE settings and metadata",
                    "**Point-in-Time Recovery (PITR)**: For cloud deployment, restore up to 30 days",
                    "**Disaster Recovery Testing**: Quarterly restore drills",
                    "**Geo-Replication (Cloud)**: Data replication across regions for resilience",
                    "**SLA Guarantees**: 99.5% uptime for SaaS, RTO < 4 hours"
                ]
            },
            {
                title: "9. Vulnerability Management",
                points: [
                    "**Regular Security Scanning**: Quarterly vulnerability assessments",
                    "**Penetration Testing**: Annual pen testing by independent security firms",
                    "**Responsible Disclosure Program**: Clear guidelines for reporting vulnerabilities",
                    "**Bug Bounty**: Rewards for security researchers (future plans)",
                    "**Security Patching**: Critical updates within 24 hours of discovery",
                    "**CVE Tracking**: Active monitoring for dependency vulnerabilities"
                ]
            },
            {
                title: "10. Incident Response",
                content: "In the event of a security incident, ASKLYZE follows a strict protocol:",
                points: [
                    "**Detection**: 24/7 monitoring and automated alerting systems",
                    "**Containment**: Immediate isolation of affected systems",
                    "**Investigation**: Root cause analysis and forensic assessment",
                    "**Notification**: Affected customers notified within 72 hours (GDPR requirement)",
                    "**Remediation**: Patch vulnerabilities and strengthen defenses",
                    "**Post-Incident Review**: Document lessons learned and process improvements"
                ]
            },
            {
                title: "11. Security Training and Awareness",
                points: [
                    "**Employee Training**: Mandatory security training for all APEX Experts staff",
                    "**Phishing Awareness**: Regular phishing tests and training",
                    "**Secure Data Handling**: Strict protocols for all personnel with access",
                    "**Background Checks**: Comprehensive screening for employees in sensitive roles",
                    "**Least Privilege**: Employees receive only minimum required access",
                    "**Access Reviews**: Quarterly reviews of employee permissions"
                ]
            },
            {
                title: "12. On-Premise Deployment Security",
                content: "For On-Premise deployments, you have full control over security:",
                points: [
                    "**Your Network, Your Rules**: ASKLYZE operates within your existing security policies",
                    "**No External Calls**: Can be configured to work entirely air-gapped",
                    "**Local AI Models**: Option to host LLMs locally (Enterprise edition)",
                    "**Security Audits**: Source code available for review by your security team",
                    "**Isolated Updates**: Secure, controlled update mechanism",
                    "**Full Sovereignty Compliance**: Your data stays in your country/region"
                ]
            }
        ],
        contact: {
            title: "Security Team",
            content: "For any security concerns or to report a vulnerability, contact our security team at:",
            email: "security@apexexperts.net",
            address: "Office No. 43-44 - Al Fahidi, Dubai Bur Dubai, UAE",
            responsible: "For responsible vulnerability disclosure, please include details of the discovery, steps to reproduce, and potential impact."
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
                                <p className="text-gray-600 text-sm mb-4">{content.contact.address}</p>
                                {content.contact.responsible && (
                                    <p className="text-gray-600 text-sm italic">{content.contact.responsible}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer dict={dict.footer} />
        </>
    );
}
