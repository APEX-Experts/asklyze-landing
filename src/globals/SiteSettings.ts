import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    label: 'Site Settings',
    hooks: {
        afterChange: [revalidateHook('site-settings')],
    },
    fields: [
        { name: 'siteUrl', type: 'text', required: true },
        { name: 'getStartedUrl', type: 'text', required: true },
        { name: 'customerPortalUrl', type: 'text', required: true },
        { name: 'docsUrl', type: 'text', required: true },
    ],
};
