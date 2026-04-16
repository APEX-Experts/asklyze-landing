import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const ContactHeroContent: GlobalConfig = {
    slug: 'contact-hero-content',
    label: 'Contact Hero Section',
    hooks: {
        afterChange: [revalidateHook('contact-hero-content')],
    },
    fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'desc', type: 'textarea', localized: true, required: true },
    ],
};
