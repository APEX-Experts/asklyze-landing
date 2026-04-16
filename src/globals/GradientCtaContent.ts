import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const GradientCtaContent: GlobalConfig = {
    slug: 'gradient-cta-content',
    label: 'Gradient CTA Section',
    hooks: {
        afterChange: [revalidateHook('gradient-cta-content')],
    },
    fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'desc', type: 'textarea', localized: true, required: true },
        { name: 'cta', type: 'text', localized: true, required: true }
    ],
};
