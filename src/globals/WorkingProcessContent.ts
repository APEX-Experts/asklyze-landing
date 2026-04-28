import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const WorkingProcessContent: GlobalConfig = {
    slug: 'working-process-content',
    label: 'Working Process Section',
    hooks: {
        afterChange: [revalidateHook('working-process-content')],
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
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'step1Title', type: 'text', localized: true, required: true },
        { name: 'step1Desc', type: 'textarea', localized: true, required: true },
        { name: 'step2Title', type: 'text', localized: true, required: true },
        { name: 'step2Desc', type: 'textarea', localized: true, required: true },
        { name: 'step3Title', type: 'text', localized: true, required: true },
        { name: 'step3Desc', type: 'textarea', localized: true, required: true },
    ],
};
