import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_tablet_url" varchar,
  	"sizes_tablet_width" numeric,
  	"sizes_tablet_height" numeric,
  	"sizes_tablet_mime_type" varchar,
  	"sizes_tablet_filesize" numeric,
  	"sizes_tablet_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "hero_content_mockup_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "trusted_by_content_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer NOT NULL
  );
  
  ALTER TABLE "posts" ADD COLUMN "author_image_id" integer NOT NULL;
  ALTER TABLE "posts" ADD COLUMN "image_id" integer NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "hero_content" ADD COLUMN "hero_image_url_id" integer NOT NULL;
  ALTER TABLE "feature_grid_content_features" ADD COLUMN "image_id" integer NOT NULL;
  ALTER TABLE "about_page_content_solutions_what_we_build_points" ADD COLUMN "icon_url_id" integer NOT NULL;
  ALTER TABLE "about_page_content_guides_cards" ADD COLUMN "icon_url_id" integer NOT NULL;
  ALTER TABLE "about_page_content_leaders_members" ADD COLUMN "image_url_id" integer NOT NULL;
  ALTER TABLE "about_page_content" ADD COLUMN "apex_logo_url_id" integer NOT NULL;
  ALTER TABLE "about_page_content" ADD COLUMN "vision_mission_vision_background_pattern_url_id" integer NOT NULL;
  ALTER TABLE "about_page_content" ADD COLUMN "vision_mission_vision_logo_url_id" integer NOT NULL;
  ALTER TABLE "about_page_content" ADD COLUMN "vision_mission_vision_image_url_id" integer NOT NULL;
  ALTER TABLE "about_page_content" ADD COLUMN "vision_mission_mission_logo_url_id" integer NOT NULL;
  ALTER TABLE "about_page_content" ADD COLUMN "vision_mission_mission_image_url_id" integer NOT NULL;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_content_mockup_images" ADD CONSTRAINT "hero_content_mockup_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hero_content_mockup_images" ADD CONSTRAINT "hero_content_mockup_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hero_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trusted_by_content_partners" ADD CONSTRAINT "trusted_by_content_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trusted_by_content_partners" ADD CONSTRAINT "trusted_by_content_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trusted_by_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "hero_content_mockup_images_order_idx" ON "hero_content_mockup_images" USING btree ("_order");
  CREATE INDEX "hero_content_mockup_images_parent_id_idx" ON "hero_content_mockup_images" USING btree ("_parent_id");
  CREATE INDEX "hero_content_mockup_images_image_idx" ON "hero_content_mockup_images" USING btree ("image_id");
  CREATE INDEX "trusted_by_content_partners_order_idx" ON "trusted_by_content_partners" USING btree ("_order");
  CREATE INDEX "trusted_by_content_partners_parent_id_idx" ON "trusted_by_content_partners" USING btree ("_parent_id");
  CREATE INDEX "trusted_by_content_partners_logo_idx" ON "trusted_by_content_partners" USING btree ("logo_id");
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_content" ADD CONSTRAINT "hero_content_hero_image_url_id_media_id_fk" FOREIGN KEY ("hero_image_url_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "feature_grid_content_features" ADD CONSTRAINT "feature_grid_content_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_content_solutions_what_we_build_points" ADD CONSTRAINT "about_page_content_solutions_what_we_build_points_icon_url_id_media_id_fk" FOREIGN KEY ("icon_url_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_content_guides_cards" ADD CONSTRAINT "about_page_content_guides_cards_icon_url_id_media_id_fk" FOREIGN KEY ("icon_url_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_content_leaders_members" ADD CONSTRAINT "about_page_content_leaders_members_image_url_id_media_id_fk" FOREIGN KEY ("image_url_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_content" ADD CONSTRAINT "about_page_content_apex_logo_url_id_media_id_fk" FOREIGN KEY ("apex_logo_url_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_content" ADD CONSTRAINT "about_page_content_vision_mission_vision_background_pattern_url_id_media_id_fk" FOREIGN KEY ("vision_mission_vision_background_pattern_url_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_content" ADD CONSTRAINT "about_page_content_vision_mission_vision_logo_url_id_media_id_fk" FOREIGN KEY ("vision_mission_vision_logo_url_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_content" ADD CONSTRAINT "about_page_content_vision_mission_vision_image_url_id_media_id_fk" FOREIGN KEY ("vision_mission_vision_image_url_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_content" ADD CONSTRAINT "about_page_content_vision_mission_mission_logo_url_id_media_id_fk" FOREIGN KEY ("vision_mission_mission_logo_url_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_content" ADD CONSTRAINT "about_page_content_vision_mission_mission_image_url_id_media_id_fk" FOREIGN KEY ("vision_mission_mission_image_url_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "posts_author_author_image_idx" ON "posts" USING btree ("author_image_id");
  CREATE INDEX "posts_image_idx" ON "posts" USING btree ("image_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "hero_content_hero_image_url_idx" ON "hero_content" USING btree ("hero_image_url_id");
  CREATE INDEX "feature_grid_content_features_image_idx" ON "feature_grid_content_features" USING btree ("image_id");
  CREATE INDEX "about_page_content_solutions_what_we_build_points_icon_u_idx" ON "about_page_content_solutions_what_we_build_points" USING btree ("icon_url_id");
  CREATE INDEX "about_page_content_guides_cards_icon_url_idx" ON "about_page_content_guides_cards" USING btree ("icon_url_id");
  CREATE INDEX "about_page_content_leaders_members_image_url_idx" ON "about_page_content_leaders_members" USING btree ("image_url_id");
  CREATE INDEX "about_page_content_apex_logo_url_idx" ON "about_page_content" USING btree ("apex_logo_url_id");
  CREATE INDEX "about_page_content_vision_mission_vision_mission_vision__idx" ON "about_page_content" USING btree ("vision_mission_vision_background_pattern_url_id");
  CREATE INDEX "about_page_content_vision_mission_vision_vision_mission__idx" ON "about_page_content" USING btree ("vision_mission_vision_logo_url_id");
  CREATE INDEX "about_page_content_vision_mission_vision_vision_missio_1_idx" ON "about_page_content" USING btree ("vision_mission_vision_image_url_id");
  CREATE INDEX "about_page_content_vision_mission_mission_vision_mission_idx" ON "about_page_content" USING btree ("vision_mission_mission_logo_url_id");
  CREATE INDEX "about_page_content_vision_mission_mission_vision_missi_1_idx" ON "about_page_content" USING btree ("vision_mission_mission_image_url_id");
  ALTER TABLE "posts" DROP COLUMN "author_image";
  ALTER TABLE "posts" DROP COLUMN "image";
  ALTER TABLE "hero_content" DROP COLUMN "hero_image_url";
  ALTER TABLE "feature_grid_content_features" DROP COLUMN "image";
  ALTER TABLE "about_page_content_solutions_what_we_build_points" DROP COLUMN "icon_url";
  ALTER TABLE "about_page_content_guides_cards" DROP COLUMN "icon_url";
  ALTER TABLE "about_page_content_leaders_members" DROP COLUMN "image_url";
  ALTER TABLE "about_page_content" DROP COLUMN "apex_logo_url";
  ALTER TABLE "about_page_content" DROP COLUMN "vision_mission_vision_background_pattern_url";
  ALTER TABLE "about_page_content" DROP COLUMN "vision_mission_vision_logo_url";
  ALTER TABLE "about_page_content" DROP COLUMN "vision_mission_vision_image_url";
  ALTER TABLE "about_page_content" DROP COLUMN "vision_mission_mission_logo_url";
  ALTER TABLE "about_page_content" DROP COLUMN "vision_mission_mission_image_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hero_content_mockup_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "trusted_by_content_partners" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "hero_content_mockup_images" CASCADE;
  DROP TABLE "trusted_by_content_partners" CASCADE;
  ALTER TABLE "posts" DROP CONSTRAINT "posts_author_image_id_media_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_media_fk";
  
  ALTER TABLE "hero_content" DROP CONSTRAINT "hero_content_hero_image_url_id_media_id_fk";
  
  ALTER TABLE "feature_grid_content_features" DROP CONSTRAINT "feature_grid_content_features_image_id_media_id_fk";
  
  ALTER TABLE "about_page_content_solutions_what_we_build_points" DROP CONSTRAINT "about_page_content_solutions_what_we_build_points_icon_url_id_media_id_fk";
  
  ALTER TABLE "about_page_content_guides_cards" DROP CONSTRAINT "about_page_content_guides_cards_icon_url_id_media_id_fk";
  
  ALTER TABLE "about_page_content_leaders_members" DROP CONSTRAINT "about_page_content_leaders_members_image_url_id_media_id_fk";
  
  ALTER TABLE "about_page_content" DROP CONSTRAINT "about_page_content_apex_logo_url_id_media_id_fk";
  
  ALTER TABLE "about_page_content" DROP CONSTRAINT "about_page_content_vision_mission_vision_background_pattern_url_id_media_id_fk";
  
  ALTER TABLE "about_page_content" DROP CONSTRAINT "about_page_content_vision_mission_vision_logo_url_id_media_id_fk";
  
  ALTER TABLE "about_page_content" DROP CONSTRAINT "about_page_content_vision_mission_vision_image_url_id_media_id_fk";
  
  ALTER TABLE "about_page_content" DROP CONSTRAINT "about_page_content_vision_mission_mission_logo_url_id_media_id_fk";
  
  ALTER TABLE "about_page_content" DROP CONSTRAINT "about_page_content_vision_mission_mission_image_url_id_media_id_fk";
  
  DROP INDEX "posts_author_author_image_idx";
  DROP INDEX "posts_image_idx";
  DROP INDEX "payload_locked_documents_rels_media_id_idx";
  DROP INDEX "hero_content_hero_image_url_idx";
  DROP INDEX "feature_grid_content_features_image_idx";
  DROP INDEX "about_page_content_solutions_what_we_build_points_icon_u_idx";
  DROP INDEX "about_page_content_guides_cards_icon_url_idx";
  DROP INDEX "about_page_content_leaders_members_image_url_idx";
  DROP INDEX "about_page_content_apex_logo_url_idx";
  DROP INDEX "about_page_content_vision_mission_vision_mission_vision__idx";
  DROP INDEX "about_page_content_vision_mission_vision_vision_mission__idx";
  DROP INDEX "about_page_content_vision_mission_vision_vision_missio_1_idx";
  DROP INDEX "about_page_content_vision_mission_mission_vision_mission_idx";
  DROP INDEX "about_page_content_vision_mission_mission_vision_missi_1_idx";
  ALTER TABLE "posts" ADD COLUMN "author_image" varchar;
  ALTER TABLE "posts" ADD COLUMN "image" varchar NOT NULL;
  ALTER TABLE "hero_content" ADD COLUMN "hero_image_url" varchar;
  ALTER TABLE "feature_grid_content_features" ADD COLUMN "image" varchar NOT NULL;
  ALTER TABLE "about_page_content_solutions_what_we_build_points" ADD COLUMN "icon_url" varchar;
  ALTER TABLE "about_page_content_guides_cards" ADD COLUMN "icon_url" varchar;
  ALTER TABLE "about_page_content_leaders_members" ADD COLUMN "image_url" varchar;
  ALTER TABLE "about_page_content" ADD COLUMN "apex_logo_url" varchar;
  ALTER TABLE "about_page_content" ADD COLUMN "vision_mission_vision_background_pattern_url" varchar;
  ALTER TABLE "about_page_content" ADD COLUMN "vision_mission_vision_logo_url" varchar;
  ALTER TABLE "about_page_content" ADD COLUMN "vision_mission_vision_image_url" varchar;
  ALTER TABLE "about_page_content" ADD COLUMN "vision_mission_mission_logo_url" varchar;
  ALTER TABLE "about_page_content" ADD COLUMN "vision_mission_mission_image_url" varchar;
  ALTER TABLE "posts" DROP COLUMN "author_image_id";
  ALTER TABLE "posts" DROP COLUMN "image_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "media_id";
  ALTER TABLE "hero_content" DROP COLUMN "hero_image_url_id";
  ALTER TABLE "feature_grid_content_features" DROP COLUMN "image_id";
  ALTER TABLE "about_page_content_solutions_what_we_build_points" DROP COLUMN "icon_url_id";
  ALTER TABLE "about_page_content_guides_cards" DROP COLUMN "icon_url_id";
  ALTER TABLE "about_page_content_leaders_members" DROP COLUMN "image_url_id";
  ALTER TABLE "about_page_content" DROP COLUMN "apex_logo_url_id";
  ALTER TABLE "about_page_content" DROP COLUMN "vision_mission_vision_background_pattern_url_id";
  ALTER TABLE "about_page_content" DROP COLUMN "vision_mission_vision_logo_url_id";
  ALTER TABLE "about_page_content" DROP COLUMN "vision_mission_vision_image_url_id";
  ALTER TABLE "about_page_content" DROP COLUMN "vision_mission_mission_logo_url_id";
  ALTER TABLE "about_page_content" DROP COLUMN "vision_mission_mission_image_url_id";`)
}
