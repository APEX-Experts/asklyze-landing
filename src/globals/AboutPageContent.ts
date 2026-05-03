import { GlobalConfig } from "payload";
import { revalidateHook } from './revalidateHook';
import { MediaField } from "../fields/MediaField";

export const AboutPageContent: GlobalConfig = {
    slug: 'about-page-content',
    access: {
        read: () => true,
    },
    hooks: {
        afterChange: [revalidateHook('about-page-content')],
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
        MediaField({
            name: 'apexLogoUrl',
            label: 'Apex Logo',
        }),
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
                    fields: [
                        { name: 'value', type: 'text', localized: true },
                        { name: 'label', type: 'text', localized: true },
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
                    fields: [
                        { name: 'value', type: 'text', localized: true },
                        { name: 'label', type: 'text', localized: true },
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
                            fields: [
                                { name: 'text', type: 'text', localized: true },
                                MediaField({
                                    name: 'iconUrl',
                                    label: 'Icon',
                                }),
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
                    fields: [
                        { name: 'title', type: 'text', localized: true },
                        { name: 'description', type: 'text', localized: true },
                        MediaField({
                            name: 'iconUrl',
                            label: 'Icon',
                        }),
                    ],
                },
            ],
        },
        {
            name: 'visionMission',
            type: 'group',
            fields: [
                MediaField({
                    name: 'visionBackgroundPatternUrl',
                    label: 'Vision Background Pattern',
                }),
                {
                    name: 'vision',
                    type: 'group',
                    fields: [
                        { name: 'title', type: 'text', localized: true },
                        { name: 'description', type: 'text', localized: true },
                        MediaField({
                            name: 'logoUrl',
                            label: 'Logo',
                        }),
                        MediaField({
                            name: 'imageUrl',
                            label: 'Image',
                        }),
                    ],
                },
                {
                    name: 'mission',
                    type: 'group',
                    fields: [
                        { name: 'title', type: 'text', localized: true },
                        { name: 'description', type: 'text', localized: true },
                        MediaField({
                            name: 'logoUrl',
                            label: 'Logo',
                        }),
                        MediaField({
                            name: 'imageUrl',
                            label: 'Image',
                        }),
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
                    fields: [
                        { name: 'name', type: 'text', localized: true },
                        { name: 'role', type: 'text', localized: true },
                        {
                            name: 'social',
                            type: 'group',
                            fields: [
                                { name: 'facebook', type: 'text' },
                                { name: 'linkedin', type: 'text' },
                                { name: 'instagram', type: 'text' },
                            ],
                        },
                        MediaField({
                            name: 'imageUrl',
                            label: 'Member Image',
                        })
                    ],
                },
            ],
        },
    ],
};
