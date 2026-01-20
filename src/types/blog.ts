export interface BlogPost {
    id: number | string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: {
        name: string;
        image: string;
        jobTitle?: string;
    };
    date: string;
    image: string;
}
