import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Posts } from "./collections/Posts.ts";
import { Users } from "./collections/Users.ts";
import { Media } from "./collections/Media.ts";
import { s3Storage } from "@payloadcms/storage-s3";

import {
  NavbarContent, HeroContent, WorkingProcessContent, TrustedByContent,
  WhyChooseContent, ContactHeroContent, FeatureGridContent,
  CommonCtaContent, ContactCtaContent,
  FaqContent, PricingContent, ContactUsContent,
  FooterContent, BlogSectionContent, BlogContent, MetadataContent,
  PrivacyContent, TermsContent, SecurityContent, AboutPageContent, SiteSettings
} from "./globals";



export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Posts, Media],
  globals: [
    NavbarContent, HeroContent, WorkingProcessContent, TrustedByContent,
    WhyChooseContent, ContactHeroContent, FeatureGridContent,
    CommonCtaContent, ContactCtaContent,
    FaqContent, PricingContent, ContactUsContent,
    FooterContent, BlogSectionContent, BlogContent, MetadataContent,
    PrivacyContent, TermsContent, SecurityContent, AboutPageContent, SiteSettings
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'fallback-dev-secret-do-not-use-in-prod',
  typescript: {
    outputFile: path.resolve(process.cwd(), "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  sharp,
   plugins: [
    ...(process.env.USE_CLOUD_STORAGE === "true"
      ? [
          s3Storage({
            collections: {
              // Map the plugin to your specific media collection slug
              media: true,
            },
            bucket: process.env.S3_BUCKET as string,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
              },
              region: process.env.S3_REGION,
              endpoint: process.env.S3_ENDPOINT,
            },
          }),
        ]
      : []),
  ],
  localization: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  }
});
