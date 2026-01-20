export interface BlogPost {
    id: number | string;
    slug: string;
    title: string;
    titleAr?: string;
    excerpt: string;
    excerptAr?: string;
    category: string;
    author: {
        name: string;
        image: string;
        jobTitle?: string;
        jobTitleAr?: string;
    };
    date: string;
    image: string;
}
