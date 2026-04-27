import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const PricingContent: GlobalConfig = {
    slug: 'pricing-content',
    label: 'Pricing Section',
    hooks: {
        afterChange: [revalidateHook('pricing-content')],
    },
    fields: [
        { name: 'tag', type: 'text', localized: true, required: true },
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'desc', type: 'textarea', localized: true, required: true },
        { name: 'cta', type: 'text', localized: true, required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'recommended', type: 'text', localized: true, required: true },
        { name: 'monthly', type: 'text', localized: true, required: true },
        { name: 'yearly', type: 'text', localized: true, required: true },
        {
            name: 'plans',
            type: 'array',
            required: true,
            fields: [
                { name: 'name', type: 'text', localized: true, required: true },
                { name: 'price', type: 'text', localized: true, required: true },
                { name: 'period', type: 'text' },
                { name: 'periodLabel', type: 'text', localized: true },
                { name: 'isRecommended', type: 'checkbox' },
                { name: 'href', type: 'text' },
                { 
                    name: 'features', 
                    type: 'array',
                    required: true,
                    fields: [
                        { name: 'text', type: 'text', localized: true, required: true }
                    ]
                }
            ]
        }
    ],
};
