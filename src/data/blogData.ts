export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    author: {
        name: string;
        image: string;
    };
    date: string;
    image: string;
}

export const blogData: BlogPost[] = [
    {
        id: 1,
        title: "How to Integrate AI with Oracle APEX in 10 Minutes",
        excerpt: "Learn the step-by-step process of setting up ASKLYZE to enable natural language querying on your existing Oracle databases.",
        category: "Tutorial",
        author: {
            name: "Sarah Johnson",
            image: "https://i.pravatar.cc/150?u=sarah",
        },
        date: "Jan 15, 2026",
        image: "https://placehold.co/600x400/ff705a/ffffff?text=Oracle+AI+Integration",
    },
    {
        id: 2,
        title: "The Future of Data Analytics: Zero Data Movement",
        excerpt: "Why moving your data to the cloud for analysis is a security risk, and how local execution is changing the enterprise landscape.",
        category: "Industry Trends",
        author: {
            name: "Michael Chen",
            image: "https://i.pravatar.cc/150?u=michael",
        },
        date: "Jan 10, 2026",
        image: "https://placehold.co/600x400/5e63ff/ffffff?text=Zero+Data+Movement",
    },
    {
        id: 3,
        title: "5 Visualizations That Will Transform Your Dashboard",
        excerpt: "Explore the new chart types available in ASKLYZE v2.0, from Heatmaps to advanced Pivot Tables tailored for executives.",
        category: "Features",
        author: {
            name: "Alex Smith",
            image: "https://i.pravatar.cc/150?u=alex",
        },
        date: "Jan 05, 2026",
        image: "https://placehold.co/600x400/1ad271/ffffff?text=Smart+Visuals",
    },
    {
        id: 4,
        title: "Enterprise Security: Understanding Oracle VPD",
        excerpt: "A deep dive into how ASKLYZE leverages Oracle's Virtual Private Database to ensure row-level security compliance.",
        category: "Security",
        author: {
            name: "David Miller",
            image: "https://i.pravatar.cc/150?u=david",
        },
        date: "Dec 28, 2025",
        image: "https://placehold.co/600x400/f39c12/ffffff?text=Security+Deep+Dive",
    },
    {
        id: 5,
        title: "Success Story: 200% Productivity Boost in Finance",
        excerpt: "How a leading fintech company automated their reporting workflow using natural language queries instead of manual SQL.",
        category: "Case Study",
        author: {
            name: "Emily Davis",
            image: "https://i.pravatar.cc/150?u=emily",
        },
        date: "Dec 20, 2025",
        image: "https://placehold.co/600x400/9b59b6/ffffff?text=Case+Study",
    },
    {
        id: 6,
        title: "ASKLYZE v2.1 Release Notes",
        excerpt: "We've added support for Oracle 23ai vector search and improved intent detection for complex analytical queries.",
        category: "Product Update",
        author: {
            name: "Team ASKLYZE",
            image: "https://i.pravatar.cc/150?u=team",
        },
        date: "Dec 15, 2025",
        image: "https://placehold.co/600x400/00cec9/ffffff?text=Release+Notes",
    },
];
