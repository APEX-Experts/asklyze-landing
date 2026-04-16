import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const NavbarContent: GlobalConfig = {
    slug: 'navbar-content',
    label: 'Navbar Section',
    hooks: {
        afterChange: [revalidateHook('navbar-content')],
    },
    fields: [
        { name: 'home', type: 'text', localized: true, required: true },
        { name: 'features', type: 'text', localized: true, required: true },
        { name: 'pricing', type: 'text', localized: true, required: true },
        { name: 'blog', type: 'text', localized: true, required: true },
        { name: 'docs', type: 'text', localized: true, required: true },
        { name: 'about', type: 'text', localized: true, required: true },
        { name: 'contact', type: 'text', localized: true, required: true },
        { name: 'getStarted', type: 'text', localized: true, required: true },
    ],
};
