import { Post } from '@/payload-types'
import { Payload } from 'payload'
import { getPayload } from 'payload';
import configPromise from '../payload.config';

const seedPosts: Omit<Post, 'id' | 'slug' | 'updatedAt' | 'createdAt'>[] = [
    {
        title: 'Harnessing Generative AI in Oracle APEX 24.1',
        titleAr: 'استخدام الذكاء الاصطناعي التوليدي في أوراكل أبيكس 24.1',
        category: 'Features',
        publishedDate: new Date('2024-05-15').toISOString(),
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
        author: {
            name: 'Alex Rivera',
            jobTitle: 'Senior APEX Developer',
            jobTitleAr: 'مطور أول أبيكس',
            image: 'https://i.pravatar.cc/150?u=alex',
        },
        excerpt: 'Explore how the new AI Assistant in Oracle APEX helps developers write SQL and PL/SQL faster than ever.',
        excerptAr: 'استكشف كيف يساعد مساعد الذكاء الاصطناعي الجديد في أوراكل أبيكس المطورين على كتابة SQL و PL/SQL بشكل أسرع.',
    },
    {
        title: 'Oracle Database 23ai: The Future of Data',
        titleAr: 'أوراكل 23ai: مستقبل البيانات',
        category: 'Industry Trends',
        publishedDate: new Date('2024-06-01').toISOString(),
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51',
        author: {
            name: 'Sarah Chen',
            jobTitle: 'Database Architect',
            jobTitleAr: 'مهندس قواعد بيانات',
            image: 'https://i.pravatar.cc/150?u=sarah',
        },
        excerpt: 'A deep dive into Vector Search and how Oracle is integrating AI directly into the database core.',
        excerptAr: 'تعمق في البحث الشعاعي وكيفية دمج أوراكل للذكاء الاصطناعي مباشرة في قلب قاعدة البيانات.',
    },
    {
        title: 'Building Low-Code Enterprise Apps with APEX',
        titleAr: 'بناء تطبيقات المؤسسات منخفضة البرمجة باستخدام أبيكس',
        category: 'Tutorial',
        publishedDate: new Date('2024-04-10').toISOString(),
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
        author: {
            name: 'Marco Rossi',
            jobTitle: 'Solutions Architect',
            jobTitleAr: 'مهندس حلول',
            image: 'https://i.pravatar.cc/150?u=marco',
        },
        excerpt: 'Step-by-step guide to migrating legacy spreadsheets into a secure, scalable Oracle APEX application.',
        excerptAr: 'دليل خطوة بخطوة لترحيل جداول البيانات القديمة إلى تطبيق أوراكل أبيكس آمن وقابل للتوسع.',
    },
    {
        title: 'Securing Your Oracle Cloud Infrastructure',
        titleAr: 'تأمين بنية أوراكل السحابية التحتية',
        category: 'Security',
        publishedDate: new Date('2024-07-20').toISOString(),
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
        author: {
            name: 'Elena Vance',
            jobTitle: 'Cloud Security Specialist',
            jobTitleAr: 'اختصاصي أمن سحابي',
            image: 'https://i.pravatar.cc/150?u=elena',
        },
        excerpt: 'Best practices for Identity and Access Management (IAM) in OCI to prevent unauthorized access.',
        excerptAr: 'أفضل الممارسات لإدارة الهوية والوصول في OCI لمنع الوصول غير المصرح به.',
    },
    {
        title: 'Automating Workflows with Oracle Integration Cloud',
        titleAr: 'أتمتة سير العمل باستخدام سحابة تكامل أوراكل',
        category: 'Product Update',
        publishedDate: new Date('2024-03-12').toISOString(),
        image: 'https://images.unsplash.com/photo-1518433278981-d702dc5c89b2',
        author: {
            name: 'Alex Rivera',
            jobTitle: 'Senior APEX Developer',
            jobTitleAr: 'مطور أول أبيكس',
            image: 'https://i.pravatar.cc/150?u=alex',
        },
        excerpt: 'Connecting SaaS and On-Premise applications seamlessly using OIC adapters.',
        excerptAr: 'ربط تطبيقات SaaS والتطبيقات المحلية بسلاسة باستخدام محولات OIC.',
    },
    {
        title: 'Machine Learning in the Autonomous Database',
        titleAr: 'تعلم الآلة في قاعدة البيانات ذاتية الإدارة',
        category: 'Industry Trends',
        publishedDate: new Date('2024-08-05').toISOString(),
        image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a',
        author: {
            name: 'Sarah Chen',
            jobTitle: 'Database Architect',
            jobTitleAr: 'مهندس قواعد بيانات',
            image: 'https://i.pravatar.cc/150?u=sarah',
        },
        excerpt: 'How to use OML (Oracle Machine Learning) to build predictive models without moving your data.',
        excerptAr: 'كيفية استخدام OML لبناء نماذج تنبؤية دون نقل بياناتك.',
    },
    {
        title: 'Mastering APEX Plug-ins for Custom UI',
        titleAr: 'إتقان إضافات أبيكس لواجهات المستخدم المخصصة',
        category: 'Tutorial',
        publishedDate: new Date('2024-02-28').toISOString(),
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
        author: {
            name: 'Marco Rossi',
            jobTitle: 'Solutions Architect',
            jobTitleAr: 'مهندس حلول',
            image: 'https://i.pravatar.cc/150?u=marco',
        },
        excerpt: 'Learn how to extend the native capabilities of APEX using community-driven plug-ins.',
        excerptAr: 'تعلم كيفية توسيع القدرات الأصلية لأبيكس باستخدام الإضافات التي يقدمها المجتمع.',
    },
    {
        title: 'Case Study: Modernizing Retail with Oracle AI',
        titleAr: 'دراسة حالة: تحديث قطاع التجزئة باستخدام ذكاء أوراكل الاصطناعي',
        category: 'Case Study',
        publishedDate: new Date('2024-09-11').toISOString(),
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
        author: {
            name: 'Elena Vance',
            jobTitle: 'Cloud Security Specialist',
            jobTitleAr: 'اختصاصي أمن سحابي',
            image: 'https://i.pravatar.cc/150?u=elena',
        },
        excerpt: 'How a global retailer used Oracle AI services to optimize inventory and sales forecasting.',
        excerptAr: 'كيف استخدم أحد بائعي التجزئة العالميين خدمات أوراكل للذكاء الاصطناعي لتحسين المخزون وتوقعات المبيعات.',
    },
    {
        title: 'The Rise of Vector Databases in 2024',
        titleAr: 'صعود قواعد البيانات الشعاعية في عام 2024',
        category: 'Industry Trends',
        publishedDate: new Date('2024-10-01').toISOString(),
        image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
        author: {
            name: 'Sarah Chen',
            jobTitle: 'Database Architect',
            jobTitleAr: 'مهندس قواعد بيانات',
            image: 'https://i.pravatar.cc/150?u=sarah',
        },
        excerpt: 'Understanding why vectors are the bridge between enterprise data and Large Language Models (LLMs).',
        excerptAr: 'فهم لماذا تعتبر المتجهات هي الجسر بين بيانات المؤسسة ونماذج اللغات الكبيرة.',
    },
    {
        title: 'Top 5 Security Features in APEX 23.2',
        titleAr: 'أفضل 5 ميزات أمان في أبيكس 23.2',
        category: 'Security',
        publishedDate: new Date('2024-01-15').toISOString(),
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3',
        author: {
            name: 'Elena Vance',
            jobTitle: 'Cloud Security Specialist',
            jobTitleAr: 'اختصاصي أمن سحابي',
            image: 'https://i.pravatar.cc/150?u=elena',
        },
        excerpt: 'From Session Isolation to improved Escape Syntax—keeping your low-code apps bulletproof.',
        excerptAr: 'من عزلة الجلسة إلى بناء جمل الهروب المحسن - الحفاظ على تطبيقاتك منخفضة البرمجة محمية تماماً.',
    },
]

export const seed = async (payload: Payload): Promise<void> => {
    payload.logger.info('---- Seeding Posts ----')

    await Promise.all(
        seedPosts.map(async (postData) => {
            await payload.create({
                collection: 'posts',
                data: {
                    ...postData,
                    // Content must now match the Lexical "root" structure
                    content: generateLexicalContent(`This is the full content for ${postData.title}.`),
                    contentAr: generateLexicalContent(`هذا هو المحتوى الكامل لـ ${postData.titleAr}.`),
                },
                draft: true
            })
        })
    )

    payload.logger.info('---- Seeded 10 Posts Successfully ----')
}


/**
 * Helper to generate a valid Lexical rich text object
 */
const generateLexicalContent = (text: string) => ({
    root: {
        type: 'root',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        children: [
            {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: text,
                        type: 'text',
                        version: 1,
                    },
                ],
            },
        ],
    },
})

async function main() {
    const payload = await getPayload({
        config: configPromise,
    });
    await seed(payload);
    process.exit(0);
}

main();
