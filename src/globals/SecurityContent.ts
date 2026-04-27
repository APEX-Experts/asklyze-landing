import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const SecurityContent: GlobalConfig = {
    slug: 'security-content',
    label: 'Data Security Page',
    hooks: {
        afterChange: [revalidateHook('security-content')],
    },
    fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'subtitle', type: 'text', localized: true, required: true },
        { name: 'lastUpdated', type: 'text', localized: true, required: true },
        { name: 'intro', type: 'textarea', localized: true, required: true },
        {
            name: 'sections', type: 'array', required: true, fields: [
                { name: 'iconKey', type: 'text', required: true },
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'content', type: 'textarea', localized: true },
                {
                    name: 'points', type: 'array', fields: [
                        { name: 'text', type: 'textarea', localized: true, required: true }
                    ]
                }
            ]
        },
        {
            name: 'additionalSections', type: 'array', required: true, fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'content', type: 'textarea', localized: true },
                {
                    name: 'points', type: 'array', fields: [
                        { name: 'text', type: 'textarea', localized: true, required: true }
                    ]
                }
            ]
        },
        {
            name: 'contact', type: 'group', fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'content', type: 'textarea', localized: true, required: true },
                { name: 'email', type: 'text', required: true },
                { name: 'address', type: 'textarea', localized: true, required: true }
            ]
        }
    ],
};
