import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import * as dotenv from 'dotenv';
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Posts } from "./collections/Posts.ts";
import { Users } from "./collections/Users.ts";

import {
  NavbarContent, HeroContent, WorkingProcessContent, TrustedByContent,
  WhyChooseContent, ContactContent, ContactHeroContent, FeatureGridContent,
  CommonCtaContent, ContactCtaContent, ContentSplitContent, TabbedShowcaseContent, TestimonialsContent,
  FaqContent, PricingContent, GradientCtaContent, ContactUsContent,
  FooterContent, BlogSectionContent, BlogContent, MetadataContent,
  PrivacyContent, TermsContent, SecurityContent
} from "./globals";

dotenv.config()


export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Posts],
  globals: [
    NavbarContent, HeroContent, WorkingProcessContent, TrustedByContent,
    WhyChooseContent, ContactContent, ContactHeroContent, FeatureGridContent,
    CommonCtaContent, ContactCtaContent, ContentSplitContent, TabbedShowcaseContent, TestimonialsContent,
    FaqContent, PricingContent, GradientCtaContent, ContactUsContent,
    FooterContent, BlogSectionContent, BlogContent, MetadataContent,
    PrivacyContent, TermsContent, SecurityContent
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(process.cwd(), "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  sharp,
  localization: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  }
});
