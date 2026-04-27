import { GlobalConfig } from 'payload';
import { revalidateHook } from './revalidateHook';

export const ContactUsContent: GlobalConfig = {
    slug: 'contact-us-content',
    label: 'Contact Us Section',
    hooks: {
        afterChange: [revalidateHook('contact-us-content')],
    },
    fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'subtitle', type: 'textarea', localized: true, required: true },
        { name: 'locationLabel', type: 'text', localized: true, required: true },
        { name: 'location1', type: 'text', localized: true, required: true },
        { name: 'location2', type: 'text', localized: true, required: true },
        { name: 'emailLabel', type: 'text', localized: true, required: true },
        { name: 'email1', type: 'text', required: true },
        { name: 'email2', type: 'text', required: true },
        { name: 'callLabel', type: 'text', localized: true, required: true },
        { name: 'phone1', type: 'text', required: true },
        { name: 'phone2', type: 'text', required: true },
        { name: 'callTimes', type: 'text', localized: true, required: true },
        {
            name: 'form',
            type: 'group',
            fields: [
                {
                    name: 'name', type: 'group', fields: [
                        { name: 'label', type: 'text', localized: true, required: true },
                        { name: 'placeholder', type: 'text', localized: true, required: true },
                        { name: 'required', type: 'text', localized: true, required: true }
                    ]
                },
                {
                    name: 'email', type: 'group', fields: [
                        { name: 'label', type: 'text', localized: true, required: true },
                        { name: 'placeholder', type: 'text', localized: true, required: true },
                        { name: 'required', type: 'text', localized: true, required: true },
                        { name: 'invalid', type: 'text', localized: true, required: true }
                    ]
                },
                {
                    name: 'country', type: 'group', fields: [
                        { name: 'label', type: 'text', localized: true, required: true },
                        { name: 'placeholder', type: 'text', localized: true, required: true },
                        { name: 'required', type: 'text', localized: true, required: true },
                        { name: 'countrySelect', type: 'checkbox' }
                    ]
                },
                {
                    name: 'phone', type: 'group', fields: [
                        { name: 'label', type: 'text', localized: true, required: true },
                        { name: 'placeholder', type: 'text', localized: true, required: true },
                        { name: 'invalid', type: 'text', localized: true, required: true }
                    ]
                },
                {
                    name: 'companyName', type: 'group', fields: [
                        { name: 'label', type: 'text', localized: true, required: true },
                        { name: 'placeholder', type: 'text', localized: true, required: true },
                        { name: 'required', type: 'text', localized: true, required: true }
                    ]
                },
                {
                    name: 'companySize', type: 'group', fields: [
                        { name: 'label', type: 'text', localized: true, required: true },
                        { name: 'placeholder', type: 'text', localized: true, required: true },
                        { name: 'required', type: 'text', localized: true, required: true },
                        { name: 'options', type: 'array', required: true, fields: [{ name: 'text', type: 'text', localized: true, required: true }] }
                    ]
                },
                {
                    name: 'role', type: 'group', fields: [
                        { name: 'label', type: 'text', localized: true, required: true },
                        { name: 'placeholder', type: 'text', localized: true, required: true },
                        { name: 'required', type: 'text', localized: true, required: true }
                    ]
                },
                {
                    name: 'subject', type: 'group', fields: [
                        { name: 'label', type: 'text', localized: true, required: true },
                        { name: 'placeholder', type: 'text', localized: true, required: true },
                        { name: 'required', type: 'text', localized: true, required: true }
                    ]
                },
                {
                    name: 'message', type: 'group', fields: [
                        { name: 'label', type: 'text', localized: true, required: true },
                        { name: 'placeholder', type: 'text', localized: true, required: true },
                        { name: 'required', type: 'text', localized: true, required: true },
                        { name: 'textarea', type: 'checkbox' }
                    ]
                },
                { name: 'submit', type: 'text', localized: true, required: true }
            ]
        }
    ],
};
