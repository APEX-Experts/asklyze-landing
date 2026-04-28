import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const WhyChooseContent: GlobalConfig = {
    slug: 'why-choose-content',
    label: 'Why Choose Section',
    hooks: {
        afterChange: [revalidateHook('why-choose-content')],
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
        { name: 'subtitle', type: 'text', localized: true, required: true },
        {
            name: 'features',
            type: 'array',
            required: true,
            fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'desc', type: 'textarea', localized: true, required: true }
            ]
        }
    ],
};
