import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";

export async function generateMetadata({ params }: { params: Promise<{ lang: "en" | "ar" }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: lang === "en" ? "Terms & Conditions | ASKLYZE" : "الشروط والأحكام | ASKLYZE",
        description: lang === "en"
            ? "Read ASKLYZE's terms and conditions for using our AI-powered Oracle APEX analytics platform."
            : "اقرأ شروط وأحكام ASKLYZE لاستخدام منصة تحليلات Oracle APEX المدعومة بالذكاء الاصطناعي.",
    };
}

export default async function TermsConditions({ params }: { params: Promise<{ lang: "en" | "ar" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const isArabic = lang === "ar";

    const content = isArabic ? {
        title: "الشروط والأحكام",
        lastUpdated: "آخر تحديث: يناير 2026",
        intro: "مرحباً بك في ASKLYZE. باستخدام خدماتنا، فإنك توافق على هذه الشروط. يرجى قراءتها بعناية.",
        sections: [
            {
                title: "1. قبول الشروط",
                content: "من خلال الوصول أو استخدام ASKLYZE ('الخدمة')، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، فلا يجوز لك استخدام الخدمة."
            },
            {
                title: "2. ترخيص الخدمة",
                points: [
                    "**النشر المحلي**: رخصة دائمة لعدد غير محدود من المستخدمين والمثيلات على خوادمك",
                    "**SaaS (السحابة)**: اشتراك شهري/سنوي لمثيل واحد من قاعدة البيانات مع مستخدمين غير محدودين",
                    "**الملكية الفكرية**: تحتفظ APEX Experts بجميع حقوق البرنامج. أنت تحتفظ بجميع حقوق بياناتك",
                    "**القيود**: لا يجوز إعادة البيع أو إعادة التوزيع أو الهندسة العكسية للبرنامج"
                ]
            },
            {
                title: "3. استخدام الخدمة",
                points: [
                    "يجب أن يكون عمرك 18 عاماً أو أكبر لاستخدام ASKLYZE",
                    "يجب عليك تقديم معلومات دقيقة وكاملة عند إنشاء حساب",
                    "أنت مسؤول عن الحفاظ على أمان بيانات اعتماد حسابك",
                    "يجب عليك استخدام الخدمة فقط للأغراض القانونية ووفقاً لهذه الشروط"
                ]
            },
            {
                title: "4. الاستخدامات المحظورة",
                content: "يجب عدم استخدام ASKLYZE من أجل:",
                points: [
                    "انتهاك أي قوانين أو لوائح محلية أو وطنية أو دولية",
                    "نقل محتوى ضار (فيروسات، برامج ضارة، رموز ضارة)",
                    "محاولة الوصول غير المصرح به إلى أنظمة أو بيانات أخرى",
                    "إرباك أو تعطيل الخدمة بحركة مرور مفرطة",
                    "استخدام الخدمة لإنشاء منتجات منافسة"
                ]
            },
            {
                title: "5. توافر الخدمة والضمانات",
                points: [
                    "**وقت التشغيل**: نستهدف توفر 99.5٪ لعمليات نشر SaaS (باستثناء الصيانة المجدولة)",
                    "**النشر المحلي**: أنت مسؤول عن توافر البنية التحتية الخاصة بك",
                    "**الدعم**: يشمل دعم البريد الإلكتروني على مدار 24 ساعة للسحابة؛ دعم الأولوية للمؤسسة",
                    "**عدم وجود ضمانات**: يتم توفير الخدمة 'كما هي' دون ضمانات صريحة أو ضمنية"
                ]
            },
            {
                title: "6. الدفع والفوترة",
                points: [
                    "**خطة السحابة**: 499 دولار/شهر أو 4,990 دولار/سنة (يتم إصدار الفواتير مقدماً)",
                    "**المؤسسة المحلية**: تسعير مخصص بناءً على نطاق النشر",
                    "**استرداد الأموال**: ضمان استرداد الأموال لمدة 30 يوماً للمشتركين الجدد",
                    "**الدفعات المتأخرة**: قد تؤدي إلى تعليق الخدمة بعد 15 يوماً"
                ]
            },
            {
                title: "7. إنهاء الخدمة",
                content: "يجوز لأي من الطرفين إنهاء الخدمة:",
                points: [
                    "**من قبلك**: إلغاء في أي وقت من لوحة الحساب الخاصة بك",
                    "**من قبلنا**: للانتهاكات المادية لهذه الشروط أو عدم الدفع",
                    "**الأثر**: الوصول الفوري إلى الإيقاف؛ بيانات متاحة للتصدير لمدة 30 يوماً",
                    "**عدم استرداد الأموال**: لا توجد مبالغ مستردة للإلغاءات في منتصف الدورة (ما لم يُنص على خلاف ذلك)"
                ]
            },
            {
                title: "8. حدود المسؤولية",
                content: "إلى أقصى حد يسمح به القانون:",
                points: [
                    "مسؤوليتنا الإجمالية محدودة بالرسوم المدفوعة في الأشهر الـ 12 السابقة",
                    "لسنا مسؤولين عن الأضرار غير المباشرة أو التبعية أو الخاصة",
                    "لسنا مسؤولين عن فقدان البيانات أو انتهاكات الأمان الناجمة عن أخطائك",
                    "أنت مسؤول عن النسخ الاحتياطية وتعافي البيانات"
                ]
            },
            {
                title: "9. التعويض",
                content: "توافق على تعويضنا والدفاع عنا ضد أي مطالبات ناشئة عن:",
                points: [
                    "استخدامك لـ ASKLYZE",
                    "انتهاكك لهذه الشروط",
                    "انتهاكك لأي حقوق لطرف ثالث",
                    "أي محتوى أو بيانات تحملها أو تعالجها"
                ]
            },
            {
                title: "10. التغييرات على الشروط",
                content: "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. ستصبح التغييرات المادية سارية بعد 30 يوماً من الإخطار. يشكل استمرار استخدامك قبولاً للشروط المحدثة."
            },
            {
                title: "11. القانون الحاكم",
                content: "تخضع هذه الشروط لقوانين دولة الإمارات العربية المتحدة. يتم حل أي نزاعات عبر التحكيم في دبي، الإمارات العربية المتحدة."
            },
            {
                title: "12. شراكة Oracle",
                content: "ASKLYZE مطور بواسطة APEX Experts، شريك معتمد لـ Oracle. نحن نلتزم بإرشادات شراكة Oracle وأفضل الممارسات."
            }
        ],
        contact: {
            title: "أسئلة حول الشروط",
            content: "إذا كان لديك أي أسئلة حول هذه الشروط، يرجى الاتصال:",
            email: "legal@apexexperts.net",
            address: "مكتب رقم 43-44 - الفهيدي، دبي بر دبي، الإمارات العربية المتحدة"
        }
    } : {
        title: "Terms & Conditions",
        lastUpdated: "Last Updated: January 2026",
        intro: "Welcome to ASKLYZE. By using our services, you agree to these terms. Please read them carefully.",
        sections: [
            {
                title: "1. Acceptance of Terms",
                content: "By accessing or using ASKLYZE ('the Service'), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not use the Service."
            },
            {
                title: "2. Service License",
                points: [
                    "**On-Premise**: Perpetual license for unlimited users and instances on your servers",
                    "**SaaS (Cloud)**: Monthly/annual subscription for one database instance with unlimited users",
                    "**Intellectual Property**: APEX Experts retains all rights to the software. You retain all rights to your data",
                    "**Restrictions**: No reselling, redistributing, or reverse-engineering the software"
                ]
            },
            {
                title: "3. Use of Service",
                points: [
                    "You must be 18 years or older to use ASKLYZE",
                    "You must provide accurate and complete information when creating an account",
                    "You are responsible for maintaining the security of your account credentials",
                    "You must use the Service only for lawful purposes and in accordance with these Terms"
                ]
            },
            {
                title: "4. Prohibited Uses",
                content: "You must not use ASKLYZE to:",
                points: [
                    "Violate any local, national, or international laws or regulations",
                    "Transmit harmful content (viruses, malware, malicious code)",
                    "Attempt unauthorized access to other systems or data",
                    "Overwhelm or disrupt the Service with excessive traffic",
                    "Use the Service to create competing products"
                ]
            },
            {
                title: "5. Service Availability and Warranties",
                points: [
                    "**Uptime**: We target 99.5% availability for SaaS deployments (excluding scheduled maintenance)",
                    "**On-Premise**: You are responsible for your own infrastructure availability",
                    "**Support**: Includes 24h email support for Cloud; Priority support for Enterprise",
                    "**No Warranties**: Service is provided 'as is' without express or implied warranties"
                ]
            },
            {
                title: "6. Payment and Billing",
                points: [
                    "**Cloud Plan**: $499/month or $4,990/year (billed in advance)",
                    "**Enterprise On-Premise**: Custom pricing based on deployment scope",
                    "**Refunds**: 30-day money-back guarantee for new subscribers",
                    "**Late Payments**: May result in service suspension after 15 days"
                ]
            },
            {
                title: "7. Termination",
                content: "Either party may terminate the Service:",
                points: [
                    "**By You**: Cancel anytime from your account dashboard",
                    "**By Us**: For material violations of these Terms or non-payment",
                    "**Effect**: Immediate cessation of access; data available for export for 30 days",
                    "**No Refunds**: No refunds for mid-cycle cancellations (unless otherwise stated)"
                ]
            },
            {
                title: "8. Limitation of Liability",
                content: "To the maximum extent permitted by law:",
                points: [
                    "Our total liability is limited to fees paid in the preceding 12 months",
                    "We are not liable for indirect, consequential, or special damages",
                    "We are not responsible for data loss or security breaches caused by your errors",
                    "You are responsible for backups and disaster recovery"
                ]
            },
            {
                title: "9. Indemnification",
                content: "You agree to indemnify and defend us against any claims arising from:",
                points: [
                    "Your use of ASKLYZE",
                    "Your violation of these Terms",
                    "Your violation of any third-party rights",
                    "Any content or data you upload or process"
                ]
            },
            {
                title: "10. Changes to Terms",
                content: "We reserve the right to modify these Terms at any time. Material changes become effective 30 days after notice. Your continued use constitutes acceptance of updated Terms."
            },
            {
                title: "11. Governing Law",
                content: "These Terms are governed by the laws of the United Arab Emirates. Any disputes are resolved via arbitration in Dubai, UAE."
            },
            {
                title: "12. Oracle Partnership",
                content: "ASKLYZE is developed by APEX Experts, a certified Oracle partner. We adhere to Oracle partnership guidelines and best practices."
            }
        ],
        contact: {
            title: "Questions About Terms",
            content: "If you have any questions about these Terms, please contact:",
            email: "legal@apexexperts.net",
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
