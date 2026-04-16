import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const TestimonialsContent: GlobalConfig = {
    slug: 'testimonials-content',
    label: 'Testimonials Section',
    hooks: {
        afterChange: [revalidateHook('testimonials-content')],
    },
    fields: [
        { name: 'tag', type: 'text', localized: true, required: true },
        { name: 'title', type: 'text', localized: true, required: true },
        {
            name: 'list',
            type: 'array', localized: true,
            required: true,
            fields: [
                { name: 'text', type: 'textarea', localized: true, required: true },
                { name: 'name', type: 'text', localized: true, required: true },
                { name: 'role', type: 'text', localized: true, required: true }
            ]
        }
    ],
};
