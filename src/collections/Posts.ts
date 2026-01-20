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
            name: 'slug',
            type: 'text',
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
            name: 'content',
            type: 'richText',
        },
    ],
}
