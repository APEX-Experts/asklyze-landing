import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const FeatureGridContent: GlobalConfig = {
    slug: 'feature-grid-content',
    label: 'Feature Grid Section',
    hooks: {
        afterChange: [revalidateHook('feature-grid-content')],
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
        { name: 'tag', type: 'text', localized: true, required: true },
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'desc', type: 'textarea', localized: true, required: true },
        {
            name: 'features',
            type: 'array',
            required: true,
            fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'desc', type: 'textarea', localized: true, required: true },
                { name: 'image', type: 'text', required: true }
            ]
        }
    ],
};
