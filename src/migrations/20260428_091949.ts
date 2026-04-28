import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "navbar_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "hero_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "working_process_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "trusted_by_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "why_choose_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "contact_hero_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "feature_grid_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "common_cta_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "contact_cta_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "faq_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "pricing_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "contact_us_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "footer_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "blog_section_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "blog_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "privacy_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "terms_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "security_content" ADD COLUMN "is_enabled" boolean DEFAULT true;
  ALTER TABLE "about_page_content" ADD COLUMN "is_enabled" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "navbar_content" DROP COLUMN "is_enabled";
  ALTER TABLE "hero_content" DROP COLUMN "is_enabled";
  ALTER TABLE "working_process_content" DROP COLUMN "is_enabled";
  ALTER TABLE "trusted_by_content" DROP COLUMN "is_enabled";
  ALTER TABLE "why_choose_content" DROP COLUMN "is_enabled";
  ALTER TABLE "contact_hero_content" DROP COLUMN "is_enabled";
  ALTER TABLE "feature_grid_content" DROP COLUMN "is_enabled";
  ALTER TABLE "common_cta_content" DROP COLUMN "is_enabled";
  ALTER TABLE "contact_cta_content" DROP COLUMN "is_enabled";
  ALTER TABLE "faq_content" DROP COLUMN "is_enabled";
  ALTER TABLE "pricing_content" DROP COLUMN "is_enabled";
  ALTER TABLE "contact_us_content" DROP COLUMN "is_enabled";
  ALTER TABLE "footer_content" DROP COLUMN "is_enabled";
  ALTER TABLE "blog_section_content" DROP COLUMN "is_enabled";
  ALTER TABLE "blog_content" DROP COLUMN "is_enabled";
  ALTER TABLE "privacy_content" DROP COLUMN "is_enabled";
  ALTER TABLE "terms_content" DROP COLUMN "is_enabled";
  ALTER TABLE "security_content" DROP COLUMN "is_enabled";
  ALTER TABLE "about_page_content" DROP COLUMN "is_enabled";`)
}
