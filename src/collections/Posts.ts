import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'titleAr',
            label: 'Title (Arabic)',
            type: 'text',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.title) {
                            return data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                        }
                        return value;
                    },
                ],
            },
        },
        {
            name: 'author',
            type: 'group',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'image',
                    type: 'text', // Simple URL for now to match current mock data style
                    label: 'Author Avatar URL',
                },
                {
                    name: 'jobTitle',
                    type: 'text',
                    label: 'Author Job Title',
                },
                {
                    name: 'jobTitleAr',
                    type: 'text',
                    label: 'Author Job Title (Arabic)',
                },
            ],
        },
        {
            name: 'category',
            type: 'select',
            options: [
                'Tutorial', 'Industry Trends', 'Features', 'Security', 'Case Study', 'Product Update'
            ],
            required: true,
        },
        {
            name: 'publishedDate',
            type: 'date',
            required: true,
        },
        {
            name: 'image',
            type: 'text', // Using text URL for simplicity to match mock data
            label: 'Featured Image URL',
            required: true,
        },
        {
            name: 'excerpt',
            type: 'textarea',
            required: true,
        },
        {
            name: 'excerptAr',
            label: 'Excerpt (Arabic)',
            type: 'textarea',
        },
        {
            name: 'content',
            type: 'richText',
        },
        {
            name: 'contentAr',
            label: 'Content (Arabic)',
            type: 'richText',
        },
    ],
}
