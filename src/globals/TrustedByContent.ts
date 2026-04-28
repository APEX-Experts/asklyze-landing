import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const TrustedByContent: GlobalConfig = {
    slug: 'trusted-by-content',
    label: 'Trusted By Section',
    hooks: {
        afterChange: [revalidateHook('trusted-by-content')],
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
    ],
};
