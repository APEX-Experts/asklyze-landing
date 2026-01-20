export interface BlogPost {
    id: number | string;
    slug: string;
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
