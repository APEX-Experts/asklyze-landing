import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const FaqContent: GlobalConfig = {
    slug: 'faq-content',
    label: 'FAQ Section',
    hooks: {
        afterChange: [revalidateHook('faq-content')],
    },
    fields: [
        { name: 'tag', type: 'text', localized: true, required: true },
        { name: 'title', type: 'text', localized: true, required: true },
        { 
            name: 'categories', 
            type: 'array',
            required: true,
            fields: [
                { name: 'text', type: 'text', localized: true, required: true }
            ]
        },
        {
            name: 'list',
            type: 'array',
            required: true,
            fields: [
                { name: 'question', type: 'text', localized: true, required: true },
                { name: 'answer', type: 'textarea', localized: true, required: true },
                { name: 'category', type: 'text', localized: true, required: true }
            ]
        }
    ],
};
