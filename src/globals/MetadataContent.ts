import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const MetadataContent: GlobalConfig = {
    slug: 'metadata-content',
    label: 'SEO Metadata Section',
    hooks: {
        afterChange: [revalidateHook('metadata-content')],
    },
    fields: [
        {
            name: 'home', type: 'group', fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'description', type: 'textarea', localized: true, required: true }
            ]
        },
        {
            name: 'blog', type: 'group', fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'description', type: 'textarea', localized: true, required: true }
            ]
        },
        {
            name: 'contact', type: 'group', fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'description', type: 'textarea', localized: true, required: true }
            ]
        },
        {
            name: 'privacy', type: 'group', fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'description', type: 'textarea', localized: true, required: true }
            ]
        },
        {
            name: 'terms', type: 'group', fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'description', type: 'textarea', localized: true, required: true }
            ]
        },
        {
            name: 'security', type: 'group', fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'description', type: 'textarea', localized: true, required: true }
            ]
        },
        {
            name: 'about', type: 'group', fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'description', type: 'textarea', localized: true, required: true }
            ]
        }
    ],
};
