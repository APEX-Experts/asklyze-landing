import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const ContactCtaContent: GlobalConfig = {
    slug: 'contact-cta-content',
    label: 'Contact CTA Section',
    hooks: {
        afterChange: [revalidateHook('contact-cta-content')],
    },
    fields: [
        { name: 'title', type: 'text', localized: true, required: true },
    ],
};
