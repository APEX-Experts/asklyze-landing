import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const CommonCtaContent: GlobalConfig = {
    slug: 'common-cta-content',
    label: 'Common CTA Section',
    hooks: {
        afterChange: [revalidateHook('common-cta-content')],
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
        { name: 'getStarted', type: 'text', localized: true, required: true },
        { name: 'getStartedUrl', type: 'text', required: true },
        { name: 'watchDemo', type: 'text', localized: true, required: true },
        { name: 'watchDemoUrl', type: 'text', required: true },
        { name: 'disclaimer', type: 'text', localized: true, required: true },
    ],
};
