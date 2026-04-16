import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "about_page_content_trusted_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "about_page_content_trusted_s_c1_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "about_page_content_solutions_what_we_build_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "about_page_content_guides_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "about_page_content_leaders_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"social_facebook" varchar,
  	"social_linkedin" varchar,
  	"social_instagram" varchar
  );
  
  CREATE TABLE "about_page_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_content_locales" (
  	"alts_apex_logo" varchar,
  	"alts_feature" varchar,
  	"alts_vision_logo" varchar,
  	"alts_vision_image" varchar,
  	"alts_mission_logo" varchar,
  	"alts_mission_image" varchar,
  	"header_title" varchar,
  	"header_intro" varchar,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"trusted_title" varchar,
  	"trusted_subtitle" varchar,
  	"trusted_footer" varchar,
  	"trusted_s_c1_title" varchar,
  	"trusted_s_c1_subtitle" varchar,
  	"trusted_s_c1_footer" varchar,
  	"solutions_title" varchar,
  	"solutions_description" varchar,
  	"solutions_what_we_build_title" varchar,
  	"solutions_what_we_build_subtitle" varchar,
  	"guides_title" varchar,
  	"guides_subtitle" varchar,
  	"vision_mission_vision_title" varchar,
  	"vision_mission_vision_description" varchar,
  	"vision_mission_mission_title" varchar,
  	"vision_mission_mission_description" varchar,
  	"leaders_title" varchar,
  	"leaders_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "about_page_content_trusted_stats" ADD CONSTRAINT "about_page_content_trusted_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_content_trusted_s_c1_stats" ADD CONSTRAINT "about_page_content_trusted_s_c1_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_content_solutions_what_we_build_points" ADD CONSTRAINT "about_page_content_solutions_what_we_build_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_content_guides_cards" ADD CONSTRAINT "about_page_content_guides_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_content_leaders_members" ADD CONSTRAINT "about_page_content_leaders_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_content_locales" ADD CONSTRAINT "about_page_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "about_page_content_trusted_stats_order_idx" ON "about_page_content_trusted_stats" USING btree ("_order");
  CREATE INDEX "about_page_content_trusted_stats_parent_id_idx" ON "about_page_content_trusted_stats" USING btree ("_parent_id");
  CREATE INDEX "about_page_content_trusted_stats_locale_idx" ON "about_page_content_trusted_stats" USING btree ("_locale");
  CREATE INDEX "about_page_content_trusted_s_c1_stats_order_idx" ON "about_page_content_trusted_s_c1_stats" USING btree ("_order");
  CREATE INDEX "about_page_content_trusted_s_c1_stats_parent_id_idx" ON "about_page_content_trusted_s_c1_stats" USING btree ("_parent_id");
  CREATE INDEX "about_page_content_trusted_s_c1_stats_locale_idx" ON "about_page_content_trusted_s_c1_stats" USING btree ("_locale");
  CREATE INDEX "about_page_content_solutions_what_we_build_points_order_idx" ON "about_page_content_solutions_what_we_build_points" USING btree ("_order");
  CREATE INDEX "about_page_content_solutions_what_we_build_points_parent_id_idx" ON "about_page_content_solutions_what_we_build_points" USING btree ("_parent_id");
  CREATE INDEX "about_page_content_solutions_what_we_build_points_locale_idx" ON "about_page_content_solutions_what_we_build_points" USING btree ("_locale");
  CREATE INDEX "about_page_content_guides_cards_order_idx" ON "about_page_content_guides_cards" USING btree ("_order");
  CREATE INDEX "about_page_content_guides_cards_parent_id_idx" ON "about_page_content_guides_cards" USING btree ("_parent_id");
  CREATE INDEX "about_page_content_guides_cards_locale_idx" ON "about_page_content_guides_cards" USING btree ("_locale");
  CREATE INDEX "about_page_content_leaders_members_order_idx" ON "about_page_content_leaders_members" USING btree ("_order");
  CREATE INDEX "about_page_content_leaders_members_parent_id_idx" ON "about_page_content_leaders_members" USING btree ("_parent_id");
  CREATE INDEX "about_page_content_leaders_members_locale_idx" ON "about_page_content_leaders_members" USING btree ("_locale");
  CREATE UNIQUE INDEX "about_page_content_locales_locale_parent_id_unique" ON "about_page_content_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "about_page_content_trusted_stats" CASCADE;
  DROP TABLE "about_page_content_trusted_s_c1_stats" CASCADE;
  DROP TABLE "about_page_content_solutions_what_we_build_points" CASCADE;
  DROP TABLE "about_page_content_guides_cards" CASCADE;
  DROP TABLE "about_page_content_leaders_members" CASCADE;
  DROP TABLE "about_page_content" CASCADE;
  DROP TABLE "about_page_content_locales" CASCADE;`)
}
