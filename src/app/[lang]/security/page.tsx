import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";
import DataSecurityContent from "./DataSecurityContent";

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
        subtitle: "الحماية الشاملة للبيانات",
        lastUpdated: "آخر تحديث: يناير 2026",
        intro: "يعتمد ASKLYZE على نهج متعدد الطبقات لأمن البيانات، مما يضمن بقاء بيانات Oracle الخاصة بك محمية في كل مرحلة من مراحل دورة حياة الاستعلام. من البنية الأساسية إلى أمن الذكاء الاصطناعي، نقوم بتنفيذ أفضل الممارسات في الصناعة لحماية أصولك الأكثر قيمة.",
        sections: [
            {
                iconKey: "Shield",
                title: "1. بنية عدم نقل البيانات",
                content: "مبدأنا الأساسي للأمان: بياناتك لا تغادر بيئة Oracle الخاصة بك أبداً. يعمل محرك الذكاء الاصطناعي لدينا كطبقة منطقية تترجم اللغة الطبيعية إلى SQL، ولكن يتم تنفيذ جميع الاستعلامات محلياً. يضمن هذا النهج المعماري عدم نقل بيانات الإنتاج الخام أبداً عبر الشبكة أو تخزينها خارجياً.",
                points: [
                    "**معالجة محلية للبيانات**: يتم تنفيذ جميع استعلامات SQL داخل قاعدة بيانات Oracle الخاصة بك",
                    "**عدم وجود تخزين خارجي**: لا توجد بيانات أولية مُخزنة على خوادم ASKLYZE",
                    "**نقل بيانات وصفية فقط**: يتم إرسال معلومات المخطط فقط لتحسين الاستعلام",
                    "**عزل تام**: كل عميل يعمل في بيئة معزولة تماماً"
                ]
            },
            {
                iconKey: "Lock",
                title: "2. التشفير وأمن النقل",
                content: "يتم تشفير جميع الاتصالات بين مكونات ASKLYZE باستخدام بروتوكولات متوافقة مع معايير الصناعة. نستخدم TLS 1.3 لجميع عمليات نقل البيانات، مما يضمن أنه حتى البيانات الوصفية محمية أثناء النقل.",
                points: [
                    "**TLS 1.3**: أحدث معايير التشفير لجميع اتصالات HTTPS",
                    "**تثبيت الشهادة**: حماية من هجمات الوسيط (MITM)",
                    "**التشفير الشامل**: من متصفح المستخدم إلى قاعدة بيانات Oracle",
                    "**تدوير المفاتيح الآمن**: التحديث التلقائي لمفاتيح التشفير"
                ]
            },
            {
                iconKey: "Key",
                title: "3. التحكم في الوصول والمصادقة",
                content: "يستخدم ASKLYZE التحكم في الوصول القائم على الأدوار (RBAC) متعدد الطبقات ويتكامل بسلاسة مع إطار أمان Oracle الحالي لديك، بما في ذلك VPD وRow-Level Security.",
                points: [
                    "**المصادقة متعددة العوامل (MFA)**: دعم TOTP وSMS وOTP القائمة على البريد الإلكتروني",
                    "**تكامل SSO**: SAML 2.0 وOpenID Connect للمؤسسات",
                    "**Oracle VPD**: احترام سياسات الأمان على مستوى الصف الموجودة",
                    "**التحكم في الوصول القائم على الأدوار**: أذونات دقيقة لكل مستخدم وفريق"
                ]
            },
            {
                iconKey: "Eye",
                title: "4. التدقيق والمراقبة",
                content: "التسجيل الشامل والتدقيق في كل تفاعل مع ASKLYZE. يتم تخزين جميع سجلات الاستعلام في ASKLYZE_AI_QUERY_STORE داخل قاعدة بياناتك الخاصة لأغراض الامتثال والطب الشرعي.",
                points: [
                    "**تسجيل كامل للاستعلام**: من يسأل ماذا ومتى ومن أين",
                    "**تتبع توليد SQL**: سجل كامل للتدقيق لترجمة الذكاء الاصطناعي",
                    "**التنبيهات الأمنية**: إشعارات فورية لأنماط الوصول غير العادية",
                    "**الاحتفاظ القابل للتكوين**: سياسات الاحتفاظ بالسجلات وفقاً لمتطلبات الامتثال الخاصة بك"
                ]
            },
            {
                iconKey: "Server",
                title: "5. أمن البنية التحتية",
                content: "بالنسبة لعمليات النشر المستضافة على السحابة، نستخدم منصات معتمدة SOC 2 وISO 27001 مع تصحيح منتظم وعزل الشبكة واكتشاف التسلل. بالنسبة لعمليات النشر المحلية، ترث ASKLYZE وضع أمان البنية التحتية الخاصة بك.",
                points: [
                    "**الاستضافة المعتمدة**: مراكز بيانات SOC 2 Type II وISO 27001",
                    "**عزل الشبكة**: شبكات فرعية خاصة وجدران حماية لكل عميل",
                    "**كشف التسلل**: المراقبة في الوقت الفعلي للتهديدات",
                    "**تحديثات الأمان التلقائية**: التصحيح الفوري للثغرات الحرجة"
                ]
            },
            {
                iconKey: "ShieldCheck",
                title: "6. أمن الذكاء الاصطناعي ونماذج اللغة الكبيرة",
                content: "يتم إرسال استعلامات الذكاء الاصطناعي الخاصة بنا إلى مزودي نماذج لغوية موثوقين (OpenAI، Anthropic) مع ضمانات صارمة. يتلقون فقط أسئلة اللغة الطبيعية المُجردة ومعلومات المخطط - لا توجد بيانات أولية أبداً.",
                points: [
                    "**تجريد الاستعلام**: إزالة جميع البيانات الحساسة قبل إرسالها إلى نماذج اللغة الكبيرة",
                    "**عدم وجود تدريب**: بياناتك غير مستخدمة لتدريب نماذج الذكاء الاصطناعي",
                    "**أمن نقطة النهاية**: اتصالات HTTPS مُشفرة بـ Azure OpenAI أو Anthropic Claude",
                    "**تدقيق SQL**: التحقق التلقائي من الاستعلامات المُنشأة من الأمان"
                ]
            }
        ],
        additionalSections: [
            {
                title: "7. الامتثال والشهادات",
                content: "تم تصميم ASKLYZE للامتثال للائحة العامة لحماية البيانات (GDPR) وCCPA وHIPAA وSOC 2 Type II وISO 27001 وشهادات ISO 9001. نحن نوفر وثائق الامتثال ونجري عمليات تدقيق منتظمة لضمان التوافق المستمر.",
                points: [
                    "**GDPR**: حماية البيانات للمقيمين في الاتحاد الأوروبي وحقوق موضوع البيانات",
                    "**CCPA**: خصوصية المستهلك للمقيمين في كاليفورنيا",
                    "**HIPAA**: إرشادات الامتثال لبيانات الرعاية الصحية (النشر المحلي)",
                    "**SOC 2 Type II**: الضوابط الأمنية المُدققة سنوياً",
                    "**ISO 27001 & 9001**: معايير إدارة أمن المعلومات والجودة",
                    "**خصوصية البيانات الإقليمية**: الامتثال لقوانين حماية البيانات المحلية في الإمارات والمملكة العربية السعودية وأوروبا"
                ]
            },
            {
                title: "8. النسخ الاحتياطي للبيانات والتعافي من الكوارث",
                content: "بالنسبة لعمليات النشر السحابية، نحتفظ بنسخ احتياطية مشفرة آمنة مع التكرار الجغرافي. بالنسبة لعمليات النشر المحلية، تتكامل ASKLYZE مع إستراتيجيات النسخ الاحتياطي والتعافي من الكوارث الموجودة في Oracle RMAN.",
                points: [
                    "**نسخ احتياطية تلقائية**: نسخ احتياطية كاملة يومية ونسخ احتياطية إضافية كل ساعة",
                    "**نسخ احتياطية مُشفرة**: تشفير AES-256 للبيانات المُخزنة",
                    "**التكرار الجغرافي**: نسخ احتياطية مُخزنة في مناطق متعددة",
                    "**استعادة نقطة زمنية**: استعادة إلى أي نقطة زمنية خلال 30 يوماً",
                    "**تخطيط التعافي من الكوارث**: وثائق وإجراءات RTO/RPO"
                ]
            },
            {
                title: "9. إدارة الثغرات",
                content: "نحن نحافظ على برنامج نشط لإدارة الثغرات مع فحص منتظم واختبار الاختراق والكشف عن الثغرات المسؤول. جميع مكتباتنا ومُعتمداتنا يتم فحصها تلقائياً للثغرات المعروفة.",
                points: [
                    "**فحص أمان منتظم**: اختبار اختراق ربع سنوي من قبل شركات خارجية",
                    "**فحص الثغرات التلقائي**: المراقبة المستمرة لمُعتمدات التعليمات البرمجية",
                    "**الكشف المسؤول**: سياسة الكشف عن الثغرات ونظام المكافآت",
                    "**تصحيح سريع**: SLA لمدة 24 ساعة للثغرات الحرجة، 7 أيام للمتوسطة"
                ]
            },
            {
                title: "10. الاستجابة للحوادث",
                content: "لدينا فريق رسمي للاستجابة للحوادث الأمنية (SIRT) وإجراءات موثقة للتعامل مع انتهاكات الأمان المحتملة. يتم إخطار العملاء خلال 24 ساعة من أي حادث يؤثر على بياناتهم.",
                points: [
                    "**فريق SIRT مخصص**: متخصصون في الأمان متاحون على مدار الساعة طوال أيام الأسبوع",
                    "**خطة الاستجابة للحوادث**: إجراءات موثقة للاحتواء والتخفيف والاستعادة",
                    "**إخطار العملاء**: إخطار فوري بالحوادث الأمنية ذات الصلة",
                    "**تحليل ما بعد الحادث**: مراجعات شاملة وإجراءات تصحيحية"
                ]
            },
            {
                title: "11. التدريب والتوعية الأمنية",
                content: "يخضع جميع موظفي ASKLYZE لتدريب أمني منتظم وفحوصات خلفية شاملة. نحن نعزز ثقافة الأمان أولاً في جميع أنحاء المنظمة من خلال التدريب المستمر وبرامج التوعية.",
                points: [
                    "**تدريب أمني إلزامي**: تدريب سنوي لجميع الموظفين",
                    "**تمارين التصيد الاحتيالي**: محاكاة منتظمة للهجمات للحفاظ على يقظة الموظفين",
                    "**فحوصات الخلفية**: فحص شامل لجميع الموظفين الذين لديهم وصول إلى الأنظمة",
                    "**تدريب مطور آمن**: ممارسات تطوير OWASP وSDLC آمن"
                ]
            },
            {
                title: "12. أمان النشر المحلي",
                content: "بالنسبة لعمليات النشر المحلية، يعمل ASKLYZE بالكامل داخل شبكتك، دون اتصالات خارجية مطلوبة لوظائف الذكاء الاصطناعي الأساسية. يمكن تكوين جميع الاتصالات بنماذج اللغة الكبيرة للعمل عبر نقاط نهاية آمنة داخلية أو نقاط نهاية Azure الخاصة.",
                points: [
                    "**نشر Air-Gapped**: تشغيل كامل دون الوصول إلى الإنترنت (باستخدام نماذج لغوية محلية)",
                    "**تكامل نقطة النهاية الخاصة**: Azure OpenAI أو Anthropic عبر روابط خاصة",
                    "**مقيم بالكامل**: جميع المكونات داخل البنية التحتية الخاصة بك",
                    "**الامتثال للشبكة**: احترام سياسات جدار الحماية والوكيل الخاصة بك"
                ]
            }
        ],
        contact: {
            title: "مركز عمليات الأمان",
            content: "لأي مخاوف أو أسئلة أمنية، اتصل بفريق الأمان لدينا على:",
            email: "security@apexexperts.net",
            address: "مكتب رقم 43-44 - الفهيدي، دبي بر دبي، الإمارات العربية المتحدة"
        }
    } : {
        title: "Data Security",
        subtitle: "Comprehensive Data Protection",
        lastUpdated: "Last Updated: January 2026",
        intro: "ASKLYZE employs a multi-layered approach to data security, ensuring your Oracle data remains protected at every stage of the query lifecycle. From infrastructure to AI security, we implement industry best practices to safeguard your most valuable assets.",
        sections: [
            {
                iconKey: "Shield",
                title: "1. Zero Data Movement Architecture",
                content: "Our foundational security principle: your data never leaves your Oracle environment. Our AI engine acts as a logic layer that translates natural language to SQL, but all query execution happens locally. This architectural approach ensures raw production data is never transmitted over the network or stored externally.",
                points: [
                    "**Local Data Processing**: All SQL queries execute within your Oracle database",
                    "**No External Storage**: No raw data stored on ASKLYZE servers",
                    "**Metadata-Only Transfer**: Only schema information sent for query optimization",
                    "**Complete Isolation**: Each client operates in a fully isolated environment"
                ]
            },
            {
                iconKey: "Lock",
                title: "2. Encryption and Transport Security",
                content: "All communication between ASKLYZE components is encrypted using industry-standard protocols. We use TLS 1.3 for all data transfers, ensuring that even metadata is protected in transit.",
                points: [
                    "**TLS 1.3**: Latest encryption standards for all HTTPS connections",
                    "**Certificate Pinning**: Protection against man-in-the-middle (MITM) attacks",
                    "**End-to-End Encryption**: From user browser to Oracle database",
                    "**Secure Key Rotation**: Automated encryption key updates"
                ]
            },
            {
                iconKey: "Key",
                title: "3. Access Control and Authentication",
                content: "ASKLYZE uses multi-layered Role-Based Access Control (RBAC) and integrates seamlessly with your existing Oracle security framework, including VPD and Row-Level Security.",
                points: [
                    "**Multi-Factor Authentication (MFA)**: Support for TOTP, SMS, and email-based OTP",
                    "**SSO Integration**: SAML 2.0 and OpenID Connect for enterprise environments",
                    "**Oracle VPD**: Respect existing row-level security policies",
                    "**Role-Based Access Control**: Granular permissions per user and team"
                ]
            },
            {
                iconKey: "Eye",
                title: "4. Audit and Monitoring",
                content: "Comprehensive logging and auditing of every interaction with ASKLYZE. All query logs are stored in ASKLYZE_AI_QUERY_STORE within your own database for compliance and forensics purposes.",
                points: [
                    "**Full Query Logging**: Who asked what, when, and from where",
                    "**SQL Generation Tracking**: Complete audit trail of AI translations",
                    "**Security Alerts**: Real-time notifications for unusual access patterns",
                    "**Configurable Retention**: Log retention policies per your compliance requirements"
                ]
            },
            {
                iconKey: "Server",
                title: "5. Infrastructure Security",
                content: "For cloud-hosted deployments, we use SOC 2 and ISO 27001 certified platforms with regular patching, network isolation, and intrusion detection. For On-Premise deployments, ASKLYZE inherits your infrastructure security posture.",
                points: [
                    "**Certified Hosting**: SOC 2 Type II and ISO 27001 data centers",
                    "**Network Isolation**: Private subnets and firewalls per client",
                    "**Intrusion Detection**: Real-time monitoring for threats",
                    "**Automated Security Updates**: Immediate patching of critical vulnerabilities"
                ]
            },
            {
                iconKey: "ShieldCheck",
                title: "6. AI and LLM Security",
                content: "Our AI queries are sent to trusted LLM providers (OpenAI, Anthropic) with strict safeguards. They receive only abstracted natural language questions and schema information - never raw data.",
                points: [
                    "**Query Abstraction**: Strip all sensitive data before sending to LLMs",
                    "**No Training**: Your data is not used to train AI models",
                    "**Endpoint Security**: Encrypted HTTPS connections to Azure OpenAI or Anthropic Claude",
                    "**SQL Auditing**: Automatic validation of generated queries for security"
                ]
            }
        ],
        additionalSections: [
            {
                title: "7. Compliance and Certifications",
                content: "ASKLYZE is designed for GDPR, CCPA, HIPAA, SOC 2 Type II, ISO 27001, and ISO 9001 compliance. We provide compliance documentation and conduct regular audits to ensure ongoing conformance.",
                points: [
                    "**GDPR**: Data protection for EU residents and data subject rights",
                    "**CCPA**: Consumer privacy for California residents",
                    "**HIPAA**: Compliance guidance for healthcare data (On-Premise deployment)",
                    "**SOC 2 Type II**: Annually audited security controls",
                    "**ISO 27001 & 9001**: Information security management and quality standards",
                    "**Regional Data Privacy**: Compliance with local data protection laws in UAE, Saudi Arabia, and Europe"
                ]
            },
            {
                title: "8. Data Backup and Disaster Recovery",
                content: "For cloud deployments, we maintain secure encrypted backups with geo-redundancy. For On-Premise deployments, ASKLYZE integrates with your existing Oracle RMAN backup and disaster recovery strategies.",
                points: [
                    "**Automated Backups**: Daily full backups and hourly incremental backups",
                    "**Encrypted Backups**: AES-256 encryption for data at rest",
                    "**Geo-Redundancy**: Backups stored across multiple regions",
                    "**Point-in-Time Recovery**: Restore to any point in time within 30 days",
                    "**Disaster Recovery Planning**: Documented RTO/RPO procedures"
                ]
            },
            {
                title: "9. Vulnerability Management",
                content: "We maintain an active vulnerability management program with regular scanning, penetration testing, and responsible disclosure. All our libraries and dependencies are automatically scanned for known vulnerabilities.",
                points: [
                    "**Regular Security Scans**: Quarterly penetration testing by third-party firms",
                    "**Automated Vulnerability Scanning**: Continuous monitoring of code dependencies",
                    "**Responsible Disclosure**: Vulnerability disclosure policy and bug bounty program",
                    "**Rapid Patching**: 24-hour SLA for critical vulnerabilities, 7 days for medium"
                ]
            },
            {
                title: "10. Incident Response",
                content: "We have a formal Security Incident Response Team (SIRT) and documented procedures for handling potential security breaches. Customers are notified within 24 hours of any incident affecting their data.",
                points: [
                    "**Dedicated SIRT**: Security specialists on-call 24/7",
                    "**Incident Response Plan**: Documented procedures for containment, mitigation, and recovery",
                    "**Customer Notification**: Immediate notification of relevant security incidents",
                    "**Post-Incident Analysis**: Comprehensive reviews and corrective actions"
                ]
            },
            {
                title: "11. Security Training and Awareness",
                content: "All ASKLYZE employees undergo regular security training and comprehensive background checks. We foster a security-first culture throughout the organization through continuous training and awareness programs.",
                points: [
                    "**Mandatory Security Training**: Annual training for all employees",
                    "**Phishing Exercises**: Regular simulated attacks to keep employees vigilant",
                    "**Background Checks**: Comprehensive screening for all employees with system access",
                    "**Secure Developer Training**: OWASP practices and secure SDLC"
                ]
            },
            {
                title: "12. On-Premise Deployment Security",
                content: "For On-Premise deployments, ASKLYZE operates entirely within your network, with no external connections required for core AI functionality. All LLM connections can be configured to work via secure internal endpoints or Azure private endpoints.",
                points: [
                    "**Air-Gapped Deployment**: Complete operation without internet access (using local LLM models)",
                    "**Private Endpoint Integration**: Azure OpenAI or Anthropic via private links",
                    "**Fully Resident**: All components within your infrastructure",
                    "**Network Compliance**: Respect your firewall and proxy policies"
                ]
            }
        ],
        contact: {
            title: "Security Operations Center",
            content: "For any security concerns or questions, contact our security team at:",
            email: "security@apexexperts.net",
            address: "Office No. 43-44 - Al Fahidi, Dubai Bur Dubai, UAE"
        }
    };

    return (
        <>
            <Navbar dict={dict.navbar} />
            <DataSecurityContent lang={lang} isArabic={isArabic} content={content} />
            <Footer dict={dict.footer} />
        </>
    );
}
