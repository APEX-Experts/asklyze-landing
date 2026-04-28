import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_url" varchar NOT NULL,
  	"get_started_url" varchar NOT NULL,
  	"customer_portal_url" varchar NOT NULL,
  	"docs_url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "hero_content" ADD COLUMN "hero_image_url" varchar;
  ALTER TABLE "blog_content_locales" ADD COLUMN "empty_message" varchar NOT NULL;
  ALTER TABLE "about_page_content_solutions_what_we_build_points" ADD COLUMN "icon_url" varchar;
  ALTER TABLE "about_page_content_guides_cards" ADD COLUMN "icon_url" varchar;
  ALTER TABLE "about_page_content" ADD COLUMN "apex_logo_url" varchar;
  ALTER TABLE "about_page_content" ADD COLUMN "vision_mission_vision_background_pattern_url" varchar;
  ALTER TABLE "about_page_content" ADD COLUMN "vision_mission_vision_logo_url" varchar;
  ALTER TABLE "about_page_content" ADD COLUMN "vision_mission_vision_image_url" varchar;
  ALTER TABLE "about_page_content" ADD COLUMN "vision_mission_mission_logo_url" varchar;
  ALTER TABLE "about_page_content" ADD COLUMN "vision_mission_mission_image_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_settings" CASCADE;
  ALTER TABLE "hero_content" DROP COLUMN "hero_image_url";
  ALTER TABLE "blog_content_locales" DROP COLUMN "empty_message";
  ALTER TABLE "about_page_content_solutions_what_we_build_points" DROP COLUMN "icon_url";
  ALTER TABLE "about_page_content_guides_cards" DROP COLUMN "icon_url";
  ALTER TABLE "about_page_content" DROP COLUMN "apex_logo_url";
  ALTER TABLE "about_page_content" DROP COLUMN "vision_mission_vision_background_pattern_url";
  ALTER TABLE "about_page_content" DROP COLUMN "vision_mission_vision_logo_url";
  ALTER TABLE "about_page_content" DROP COLUMN "vision_mission_vision_image_url";
  ALTER TABLE "about_page_content" DROP COLUMN "vision_mission_mission_logo_url";
  ALTER TABLE "about_page_content" DROP COLUMN "vision_mission_mission_image_url";`)
}
