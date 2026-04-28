import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const NavbarContent: GlobalConfig = {
    slug: 'navbar-content',
    label: 'Navbar Section',
    hooks: {
        afterChange: [revalidateHook('navbar-content')],
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
        {
            name: 'links',
            type: 'array',
            label: 'Navbar Links',
            fields: [
                { name: 'label', type: 'text', localized: true, required: true },
                { name: 'href', type: 'text', localized: true, required: true },
                { name: 'external', type: 'checkbox', defaultValue: false },
                { name: 'icon', type: 'select', options: ['Home', 'Zap', 'CreditCard', 'Newspaper', 'FileText', 'Users', 'Mail'], required: false },
            ]
        },
        { name: 'getStarted', type: 'text', localized: true, required: true },
    ],
};
