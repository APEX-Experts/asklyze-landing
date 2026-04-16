import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const BlogSectionContent: GlobalConfig = {
    slug: 'blog-section-content',
    label: 'Blog Section',
    hooks: {
        afterChange: [revalidateHook('blog-section-content')],
    },
    fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'subtitle', type: 'text', localized: true, required: true },
        { name: 'showAll', type: 'text', localized: true, required: true },
    ],
};
