import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const TabbedShowcaseContent: GlobalConfig = {
    slug: 'tabbed-showcase-content',
    label: 'Tabbed Showcase Section',
    hooks: {
        afterChange: [revalidateHook('tabbed-showcase-content')],
    },
    fields: [
        { name: 'tag', type: 'text', localized: true, required: true },
        { name: 'title', type: 'text', localized: true, required: true },
        { 
            name: 'tabs', 
            type: 'array', localized: true, 
            required: true,
            fields: [
                { name: 'text', type: 'text', localized: true, required: true }
            ]
        },
        { name: 'dashboard', type: 'text', localized: true, required: true },
    ],
};
