import { GlobalConfig } from "payload";

export const AboutPageContent: GlobalConfig = {
    slug: 'about-page-content',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alts',
            type: 'group',
            fields: [
                { name: 'apexLogo', type: 'text', localized: true },
                { name: 'feature', type: 'text', localized: true },
                { name: 'visionLogo', type: 'text', localized: true },
                { name: 'visionImage', type: 'text', localized: true },
                { name: 'missionLogo', type: 'text', localized: true },
                { name: 'missionImage', type: 'text', localized: true },
            ],
        },
        {
            name: 'header',
            type: 'group',
            fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'intro', type: 'text', localized: true },
            ],
        },
        {
            name: 'hero',
            type: 'group',
            fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'subtitle', type: 'text', localized: true },
            ],
        },
        {
            name: 'trusted',
            type: 'group',
            fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'subtitle', type: 'text', localized: true },
                { name: 'footer', type: 'text', localized: true },
                {
                    name: 'stats',
                    type: 'array',
                    localized: true,
                    fields: [
                        { name: 'value', type: 'text' },
                        { name: 'label', type: 'text' },
                    ],
                },
            ],
        },
        {
            name: 'trustedSC1',
            type: 'group',
            fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'subtitle', type: 'text', localized: true },
                { name: 'footer', type: 'text', localized: true },
                {
                    name: 'stats',
                    type: 'array',
                    localized: true,
                    fields: [
                        { name: 'value', type: 'text' },
                        { name: 'label', type: 'text' },
                    ],
                },
            ],
        },
        {
            name: 'solutions',
            type: 'group',
            fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'description', type: 'text', localized: true },
                {
                    name: 'whatWeBuild',
                    type: 'group',
                    fields: [
                        { name: 'title', type: 'text', localized: true },
                        { name: 'subtitle', type: 'text', localized: true },
                        {
                            name: 'points',
                            type: 'array',
                            localized: true,
                            fields: [
                                { name: 'text', type: 'text' },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'guides',
            type: 'group',
            fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'subtitle', type: 'text', localized: true },
                {
                    name: 'cards',
                    type: 'array',
                    localized: true,
                    fields: [
                        { name: 'title', type: 'text' },
                        { name: 'description', type: 'text' },
                    ],
                },
            ],
        },
        {
            name: 'visionMission',
            type: 'group',
            fields: [
                {
                    name: 'vision',
                    type: 'group',
                    fields: [
                        { name: 'title', type: 'text', localized: true },
                        { name: 'description', type: 'text', localized: true },
                    ],
                },
                {
                    name: 'mission',
                    type: 'group',
                    fields: [
                        { name: 'title', type: 'text', localized: true },
                        { name: 'description', type: 'text', localized: true },
                    ],
                },
            ],
        },
        {
            name: 'leaders',
            type: 'group',
            fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'subtitle', type: 'text', localized: true },
                {
                    name: 'members',
                    type: 'array',
                    localized: true,
                    fields: [
                        { name: 'name', type: 'text' },
                        { name: 'role', type: 'text' },
                        {
                            name: 'social',
                            type: 'group',
                            fields: [
                                { name: 'facebook', type: 'text' },
                                { name: 'linkedin', type: 'text' },
                                { name: 'instagram', type: 'text' },
                            ],
                        },
                        { name: 'imageUrl', type: 'text' }
                    ],
                },
            ],
        },
    ],
};
