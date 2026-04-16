import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const ContentSplitContent: GlobalConfig = {
    slug: 'content-split-content',
    label: 'Content Split Section',
    hooks: {
        afterChange: [revalidateHook('content-split-content')],
    },
    fields: [
        {
            name: 'section1',
            type: 'group',
            fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'desc', type: 'textarea', localized: true, required: true },
                { name: 'cta', type: 'text', localized: true, required: true },
                { name: 'badgeTitle', type: 'text', localized: true, required: true },
                { name: 'badgeTime', type: 'text', localized: true, required: true }
            ]
        },
        {
            name: 'section2',
            type: 'group',
            fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'desc', type: 'textarea', localized: true, required: true },
                { name: 'cta', type: 'text', localized: true, required: true },
                { 
                    name: 'features', 
                    type: 'array', localized: true, 
                    required: true,
                    fields: [
                        { name: 'text', type: 'text', localized: true, required: true }
                    ]
                }
            ]
        }
    ],
};
