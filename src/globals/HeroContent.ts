import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';
import { MediaField } from '../fields/MediaField';

export const HeroContent: GlobalConfig = {
    slug: 'hero-content',
    label: 'Hero Section',
    hooks: {
        afterChange: [revalidateHook('hero-content')],
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
        { name: 'badge', type: 'text', localized: true, required: true },
        { name: 'titleBeforeSpan', type: 'text', localized: true, required: true },
        { name: 'titleSpan', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true, required: true },
        { name: 'getStarted', type: 'text', localized: true, required: true },
        { name: 'watchDemo', type: 'text', localized: true, required: true },
        { name: 'watchDemoUrl', type: 'text', required: true },
        { name: 'disclaimer', type: 'text', localized: true, required: true },
        {
            name: 'mockupImages',
            type: 'array',
            fields: [
                MediaField({
                    name: 'image',
                    label: 'Mockup Media',
                })
            ]
        },
    ],
};
