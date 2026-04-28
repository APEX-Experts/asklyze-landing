import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const FooterContent: GlobalConfig = {
    slug: 'footer-content',
    label: 'Footer Section',
    hooks: {
        afterChange: [revalidateHook('footer-content')],
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
        { name: 'company', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true, required: true },
        { name: 'services', type: 'text', localized: true, required: true },
        { name: 'digitalExperience', type: 'text', localized: true, required: true },
        { name: 'address', type: 'text', localized: true, required: true },
        { name: 'nycOffice', type: 'text', localized: true, required: true },
        { name: 'alexOffice', type: 'text', localized: true, required: true },
        { name: 'legal', type: 'text', localized: true, required: true },
        { name: 'quickLinks', type: 'text', localized: true, required: true },
        { name: 'location', type: 'text', localized: true, required: true },
        {
            name: 'social', type: 'group', fields: [
                { name: 'facebook', type: 'text', required: true },
                { name: 'linkedin', type: 'text', required: true },
                { name: 'instagram', type: 'text', required: true },
                { name: 'twitter', type: 'text', required: true },
                { name: 'youtube', type: 'text', required: true }
            ]
        },
        {
            name: 'socialLabels', type: 'group', fields: [
                { name: 'facebook', type: 'text', localized: true, required: true },
                { name: 'linkedin', type: 'text', localized: true, required: true },
                { name: 'instagram', type: 'text', localized: true, required: true },
                { name: 'twitter', type: 'text', localized: true, required: true },
                { name: 'youtube', type: 'text', localized: true, required: true }
            ]
        },
        {
            name: 'links', type: 'group', fields: [
                { name: 'features', type: 'text', localized: true, required: true },
                { name: 'dashboard', type: 'text', localized: true, required: true },
                { name: 'portfolio', type: 'text', localized: true, required: true },
                { name: 'about', type: 'text', localized: true, required: true },
                { name: 'contact', type: 'text', localized: true, required: true },
                { name: 'blog', type: 'text', localized: true, required: true },
                { name: 'docs', type: 'text', localized: true, required: true }
            ]
        },
        { name: 'rights', type: 'text', localized: true, required: true },
        { name: 'copyright', type: 'text', localized: true, required: true },
        {
            name: 'bottomLinks', type: 'group', fields: [
                { name: 'privacy', type: 'text', localized: true, required: true },
                { name: 'terms', type: 'text', localized: true, required: true },
                { name: 'security', type: 'text', localized: true, required: true }
            ]
        }
    ],
};
