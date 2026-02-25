import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";
import AboutContent from "./AboutContent";

export async function generateMetadata({ params }: { params: Promise<{ lang: "en" | "ar" }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: lang === "en" ? "About Us | ASKLYZE" : "من نحن | ASKLYZE",
        description: lang === "en"
            ? "Meet the team behind ASKLYZE, developed by APEX Experts AI Solutions. Learn about our mission, leadership, and values."
            : "تعرف على فريق ASKLYZE المطور بواسطة APEX Experts AI Solutions، ورسالتنا وقيادتنا وقيمنا.",
        alternates: {
            canonical: `https://asklyze.ai/${lang}/about`,
            languages: {
                'en': 'https://asklyze.ai/en/about',
                'ar': 'https://asklyze.ai/ar/about',
            },
        },
    };
}

export default async function About({ params }: { params: Promise<{ lang: "en" | "ar" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const isArabic = lang === "ar";

    const content = isArabic ? {
        hero: {
            badge: "من نحن",
            title: "نبني تحليلات ذكاء اصطناعي موثوقة",
            titleHighlight: "لـ Oracle APEX",
            subtitle: "ASKLYZE مطور بواسطة APEX Experts AI Solutions.",
            intro: "نساعد المؤسسات على تحويل البيانات المعقدة إلى إجابات واضحة دون نقل أي بيانات خارج بيئتهم.",
            highlights: [
                { value: "+17 سنة", label: "خبرة في Oracle APEX" },
                { value: "+200 تطبيق", label: "تطبيقات مُسلّمة للمؤسسات" },
                { value: "+10 شركات", label: "شراكات مع مؤسسات كبرى" },
            ],
        },
        about: {
            tag: "الشركة",
            title: "APEX Experts AI Solutions",
            subtitle: "الفريق الذي يقف خلف ASKLYZE",
            description:
                "نحن فريق متخصص في Oracle APEX والذكاء الاصطناعي على مستوى المؤسسات. بنينا ASKLYZE لإزالة التعقيد من التحليلات وإتاحة الوصول للبيانات بدون مخاطر أمنية.",
            bullets: [
                "تكامل أصيل مع Oracle APEX يحترم VPD وRLS",
                "طبقة ذكاء اصطناعي تحوّل الأسئلة التجارية إلى SQL",
                "حوكمة وتدقيق وامتثال مدمجة من اليوم الأول",
            ],
            card: {
                title: "ماذا نبني",
                description: "منصة ASKLYZE تجمع بين الأمان والسرعة وسهولة الاستخدام.",
                points: [
                    "تحليلات اللغة الطبيعية بالعربية والإنجليزية",
                    "لوحات معلومات قابلة للتخصيص بالكامل",
                    "تنفيذ محلي للاستعلامات مع عدم نقل البيانات",
                ],
            },
        },
        mission: {
            title: "رسالتنا",
            description: "إتاحة التحليلات الذكية لكل مؤسسة باستخدام Oracle APEX مع الحفاظ على السيادة والأمان.",
        },
        vision: {
            title: "رؤيتنا",
            description: "أن يصبح الوصول للبيانات سريعاً وآمناً وبديهياً لكل فريق عمل.",
        },
        values: {
            tag: "قيمنا",
            title: "ما يوجّه قراراتنا",
            subtitle: "نبني منتجات موثوقة تضع الأمن والوضوح وتجربة العميل أولاً.",
            items: [
                { iconKey: "Shield", title: "الأمان أولاً", description: "خصوصية البيانات والسيادة غير قابلة للتفاوض." },
                { iconKey: "Sparkles", title: "ذكاء عملي", description: "ذكاء اصطناعي يخدم العمل وليس العكس." },
                { iconKey: "Users", title: "تجربة واضحة", description: "تصميم بسيط لفرق تقنية وغير تقنية." },
                { iconKey: "Globe", title: "جاهزية عالمية", description: "دعم عربي/إنجليزي وإلتزام بالمعايير." },
            ],
        },
        founder: {
            tag: "المؤسس والرئيس التنفيذي",
            name: "Ahmed Alsaied",
            role: "Founder & CEO",
            image: "https://imagedelivery.net/lTxZgYILFzqBTIG5m0i9uA/9dd78696-971a-4658-3df1-e4427a36f500/public",
            bio:
                "يقود رؤية ASKLYZE لتوفير تحليلات آمنة وسريعة للمؤسسات. يمتلك خبرة عميقة في Oracle APEX وتحويل البيانات إلى قرارات.",
        },
        team: {
            tag: "فريق القيادة",
            title: "تعرف على فريق الإدارة",
            description: "فريق يجمع بين خبرة Oracle APEX والذكاء الاصطناعي وتصميم التجربة.",
            members: [
                {
                    name: "Karema Mohamed",
                    role: "CTO",
                    image: "",
                },
                {
                    name: "Amr Mohamed",
                    role: "Technical Lead",
                    image: "https://pub-676e1cb87e8247329da59049363213c6.r2.dev/Gemini_Generated_Image_hxa9abhxa9abhxa9.png",
                },
                {
                    name: "Abdulrahman Ebrahim",
                    role: "Sr. Software Engineering",
                    image: "",
                },
            ],
            employees: [

                {
                    name: "Michael Magdy",
                    role: "Sr. Software Engineer",
                    image: "https://imagedelivery.net/lTxZgYILFzqBTIG5m0i9uA/8676627d-692c-4b8b-564a-f0be8998f200/public",
                },
                {
                    name: "Mario Milad",
                    role: "Sr. Product Designer",
                    image: "https://imagedelivery.net/lTxZgYILFzqBTIG5m0i9uA/b897e444-0127-4ef4-ebbd-32d9f5b07800/public",
                },
                {
                    name: "Reham Samer",
                    role: "Quality Assurance Engineer",
                    image: "https://imagedelivery.net/lTxZgYILFzqBTIG5m0i9uA/6dfe99d6-1087-4cb0-7715-5c57fbd70500/public",
                },
            ],
        },
        cta: {
            title: "هل ترغب في العمل معنا؟",
            description: "تواصل معنا لتحويل بيانات Oracle APEX إلى ذكاء تنفيذي.",
            button: "تواصل معنا",
        },
    } : {
        hero: {
            badge: "About Us",
            title: "Building trusted AI analytics",
            titleHighlight: "for Oracle APEX",
            subtitle: "ASKLYZE is developed by APEX Experts AI Solutions.",
            intro: "We help enterprises turn complex Oracle data into clear answers without moving a single byte outside their environment.",
            highlights: [
                { value: "17+ Years", label: "Oracle APEX Experience" },
                { value: "200+ Apps", label: "Delivered across enterprise teams" },
                { value: "10+ Corporates", label: "Long-term enterprise partnerships" },
            ],
        },
        about: {
            tag: "Company",
            title: "APEX Experts AI Solutions",
            subtitle: "The team behind ASKLYZE",
            description:
                "We are a specialist Oracle APEX and enterprise AI team. We built ASKLYZE to eliminate analytics friction and give decision-makers instant, secure access to data.",
            bullets: [
                "Oracle APEX-native integrations that respect VPD and RLS",
                "AI reasoning layer that turns business questions into SQL",
                "Governance, audit, and compliance built in from day one",
            ],
            card: {
                title: "What we build",
                description: "ASKLYZE blends security, speed, and clarity for enterprise teams.",
                points: [
                    "Arabic & English natural language analytics",
                    "Fully customizable dashboards and narratives",
                    "Local query execution with zero data movement",
                ],
            },
        },
        mission: {
            title: "Our Mission",
            description: "Democratize AI analytics for Oracle APEX while preserving data sovereignty and trust.",
        },
        vision: {
            title: "Our Vision",
            description: "Make enterprise data instantly understandable for every team, in any language.",
        },
        values: {
            tag: "Our Values",
            title: "What guides our decisions",
            subtitle: "We build dependable products that put security, clarity, and customer experience first.",
            items: [
                { iconKey: "Shield", title: "Security First", description: "Data privacy and sovereignty are non-negotiable." },
                { iconKey: "Sparkles", title: "Practical AI", description: "AI that serves business outcomes, not hype." },
                { iconKey: "Users", title: "Clear Experience", description: "Simple workflows for technical and non-technical teams." },
                { iconKey: "Globe", title: "Global Ready", description: "Bilingual experiences and compliance-minded delivery." },
            ],
        },
        founder: {
            tag: "Founder & CEO",
            name: "Ahmed Alsaied",
            role: "Founder & CEO",
            image: "https://imagedelivery.net/lTxZgYILFzqBTIG5m0i9uA/9dd78696-971a-4658-3df1-e4427a36f500/public",
            bio:
                "Leads the ASKLYZE vision to deliver secure, fast analytics for enterprises. Deep expertise in Oracle APEX and data transformation.",
        },
        team: {
            tag: "Leadership Team",
            title: "Meet the leaders",
            description: "A team combining Oracle APEX expertise, AI delivery, and UX craft.",
            members: [
                {
                    name: "Karema Mohamed",
                    role: "CTO",
                    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop",
                },
                {
                    name: "Amr Mohamed",
                    role: "AI Lead | GenAI",
                    image: "https://pub-676e1cb87e8247329da59049363213c6.r2.dev/Gemini_Generated_Image_hxa9abhxa9abhxa9.png",
                },
                {
                    name: "Abdulrahman Ebrahim",
                    role: "Sr. Software Engineering",
                    image: "",
                },
            ],
            employees: [

                {
                    name: "Michael Magdy",
                    role: "Senior Software Engineer",
                    image: "https://imagedelivery.net/lTxZgYILFzqBTIG5m0i9uA/8676627d-692c-4b8b-564a-f0be8998f200/public",
                },
                {
                    name: "Mario Milad",
                    role: "Senior Product Designer",
                    image: "https://imagedelivery.net/lTxZgYILFzqBTIG5m0i9uA/b897e444-0127-4ef4-ebbd-32d9f5b07800/public",
                },
                {
                    name: "Reham Samer",
                    role: "Quality Assurance Engineer",
                    image: "https://imagedelivery.net/lTxZgYILFzqBTIG5m0i9uA/6dfe99d6-1087-4cb0-7715-5c57fbd70500/public",
                },
            ],
        },
        cta: {
            title: "Want to work with us?",
            description: "Let’s turn Oracle APEX data into executive intelligence.",
            button: "Contact Us",
        },
    };

    return (
        <>
            <Navbar dict={dict.navbar} />
            <AboutContent lang={lang} isArabic={isArabic} content={content} />
            <Footer dict={dict.footer} />
        </>
    );
}
