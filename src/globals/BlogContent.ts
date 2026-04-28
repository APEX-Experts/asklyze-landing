import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const BlogContent: GlobalConfig = {
    slug: 'blog-content',
    label: 'Blog Page Content',
    hooks: {
        afterChange: [revalidateHook('blog-content')],
    },
    fields: [
        {
            name: 'isEnabled',
            type: 'checkbox',
            defaultValue: true,
            admin: {
                position: 'sidebar',
            },
        },
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true, required: true },
        { name: 'noPosts', type: 'text', localized: true, required: true },
        { name: 'emptyMessage', type: 'text', localized: true, required: true },
        {
            name: 'topics', type: 'group', fields: [
                { name: 'All', type: 'text', localized: true, required: true },
                { name: 'Tutorial', type: 'text', localized: true, required: true },
                { name: 'Industry Trends', type: 'text', localized: true, required: true },
                { name: 'Features', type: 'text', localized: true, required: true },
                { name: 'Security', type: 'text', localized: true, required: true },
                { name: 'Case Study', type: 'text', localized: true, required: true },
                { name: 'Product Update', type: 'text', localized: true, required: true }
            ]
        },
        {
            name: 'article', type: 'group', fields: [
                { name: 'authorLabel', type: 'text', localized: true, required: true },
                { name: 'readTimeLabel', type: 'text', localized: true, required: true },
                { name: 'mins', type: 'text', localized: true, required: true },
                { name: 'dateLabel', type: 'text', localized: true, required: true },
                { name: 'back', type: 'text', localized: true, required: true },
                { name: 'relatedArticles', type: 'text', localized: true, required: true },
                { name: 'unknownAuthor', type: 'text', localized: true, required: true },
                { name: 'generalCategory', type: 'text', localized: true, required: true },
                { name: 'postNotFound', type: 'text', localized: true, required: true }
            ]
        },
    ],
};
