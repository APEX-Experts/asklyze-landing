import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const ContactContent: GlobalConfig = {
    slug: 'contact-content',
    label: 'Contact Info Section',
    hooks: {
        afterChange: [revalidateHook('contact-content')],
    },
    fields: [
        { name: 'locationTitle', type: 'text', localized: true, required: true },
        { 
            name: 'locationLines', 
            type: 'array', localized: true, 
            required: true,
            fields: [
                { name: 'text', type: 'text', localized: true, required: true }
            ] 
        },
        { name: 'emailTitle', type: 'text', localized: true, required: true },
        { name: 'callTitle', type: 'text', localized: true, required: true },
        { name: 'followTitle', type: 'text', localized: true, required: true },
        { name: 'followDesc', type: 'textarea', localized: true, required: true },
    ],
};
