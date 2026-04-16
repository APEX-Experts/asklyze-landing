import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "why_choose_content_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_content_location_lines_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "feature_grid_content_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_split_content_section2_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tabbed_showcase_content_tabs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_content_list_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq_content_categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq_content_list_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_content_plans_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_content_plans_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_us_content_form_company_size_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_content_sections_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_content_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_content_additional_sections_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_content_additional_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "terms_content_sections_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "terms_content_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "terms_content_additional_sections_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "terms_content_additional_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "security_content_sections_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "security_content_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "security_content_additional_sections_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "security_content_additional_sections_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "why_choose_content_features_locales" CASCADE;
  DROP TABLE "contact_content_location_lines_locales" CASCADE;
  DROP TABLE "feature_grid_content_features_locales" CASCADE;
  DROP TABLE "content_split_content_section2_features_locales" CASCADE;
  DROP TABLE "tabbed_showcase_content_tabs_locales" CASCADE;
  DROP TABLE "testimonials_content_list_locales" CASCADE;
  DROP TABLE "faq_content_categories_locales" CASCADE;
  DROP TABLE "faq_content_list_locales" CASCADE;
  DROP TABLE "pricing_content_plans_features_locales" CASCADE;
  DROP TABLE "pricing_content_plans_locales" CASCADE;
  DROP TABLE "contact_us_content_form_company_size_options_locales" CASCADE;
  DROP TABLE "privacy_content_sections_points_locales" CASCADE;
  DROP TABLE "privacy_content_sections_locales" CASCADE;
  DROP TABLE "privacy_content_additional_sections_points_locales" CASCADE;
  DROP TABLE "privacy_content_additional_sections_locales" CASCADE;
  DROP TABLE "terms_content_sections_points_locales" CASCADE;
  DROP TABLE "terms_content_sections_locales" CASCADE;
  DROP TABLE "terms_content_additional_sections_points_locales" CASCADE;
  DROP TABLE "terms_content_additional_sections_locales" CASCADE;
  DROP TABLE "security_content_sections_points_locales" CASCADE;
  DROP TABLE "security_content_sections_locales" CASCADE;
  DROP TABLE "security_content_additional_sections_points_locales" CASCADE;
  DROP TABLE "security_content_additional_sections_locales" CASCADE;
  ALTER TABLE "why_choose_content_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "why_choose_content_features" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "why_choose_content_features" ADD COLUMN "desc" varchar NOT NULL;
  ALTER TABLE "contact_content_location_lines" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "contact_content_location_lines" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "feature_grid_content_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "feature_grid_content_features" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "feature_grid_content_features" ADD COLUMN "desc" varchar NOT NULL;
  ALTER TABLE "content_split_content_section2_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "content_split_content_section2_features" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "tabbed_showcase_content_tabs" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "tabbed_showcase_content_tabs" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "testimonials_content_list" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "testimonials_content_list" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "testimonials_content_list" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "testimonials_content_list" ADD COLUMN "role" varchar NOT NULL;
  ALTER TABLE "faq_content_categories" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "faq_content_categories" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "faq_content_list" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "faq_content_list" ADD COLUMN "question" varchar NOT NULL;
  ALTER TABLE "faq_content_list" ADD COLUMN "answer" varchar NOT NULL;
  ALTER TABLE "faq_content_list" ADD COLUMN "category" varchar NOT NULL;
  ALTER TABLE "pricing_content_plans_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pricing_content_plans_features" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "pricing_content_plans" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pricing_content_plans" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "pricing_content_plans" ADD COLUMN "price" varchar NOT NULL;
  ALTER TABLE "pricing_content_plans" ADD COLUMN "period_label" varchar;
  ALTER TABLE "contact_us_content_form_company_size_options" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "contact_us_content_form_company_size_options" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "privacy_content_sections_points" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "privacy_content_sections_points" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "privacy_content_sections" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "privacy_content_sections" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "privacy_content_sections" ADD COLUMN "content" varchar;
  ALTER TABLE "privacy_content_additional_sections_points" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "privacy_content_additional_sections_points" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "privacy_content_additional_sections" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "privacy_content_additional_sections" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "privacy_content_additional_sections" ADD COLUMN "content" varchar;
  ALTER TABLE "terms_content_sections_points" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "terms_content_sections_points" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "terms_content_sections" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "terms_content_sections" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "terms_content_sections" ADD COLUMN "content" varchar;
  ALTER TABLE "terms_content_additional_sections_points" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "terms_content_additional_sections_points" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "terms_content_additional_sections" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "terms_content_additional_sections" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "terms_content_additional_sections" ADD COLUMN "content" varchar;
  ALTER TABLE "security_content_sections_points" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "security_content_sections_points" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "security_content_sections" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "security_content_sections" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "security_content_sections" ADD COLUMN "content" varchar;
  ALTER TABLE "security_content_additional_sections_points" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "security_content_additional_sections_points" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "security_content_additional_sections" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "security_content_additional_sections" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "security_content_additional_sections" ADD COLUMN "content" varchar;
  CREATE INDEX "why_choose_content_features_locale_idx" ON "why_choose_content_features" USING btree ("_locale");
  CREATE INDEX "contact_content_location_lines_locale_idx" ON "contact_content_location_lines" USING btree ("_locale");
  CREATE INDEX "feature_grid_content_features_locale_idx" ON "feature_grid_content_features" USING btree ("_locale");
  CREATE INDEX "content_split_content_section2_features_locale_idx" ON "content_split_content_section2_features" USING btree ("_locale");
  CREATE INDEX "tabbed_showcase_content_tabs_locale_idx" ON "tabbed_showcase_content_tabs" USING btree ("_locale");
  CREATE INDEX "testimonials_content_list_locale_idx" ON "testimonials_content_list" USING btree ("_locale");
  CREATE INDEX "faq_content_categories_locale_idx" ON "faq_content_categories" USING btree ("_locale");
  CREATE INDEX "faq_content_list_locale_idx" ON "faq_content_list" USING btree ("_locale");
  CREATE INDEX "pricing_content_plans_features_locale_idx" ON "pricing_content_plans_features" USING btree ("_locale");
  CREATE INDEX "pricing_content_plans_locale_idx" ON "pricing_content_plans" USING btree ("_locale");
  CREATE INDEX "contact_us_content_form_company_size_options_locale_idx" ON "contact_us_content_form_company_size_options" USING btree ("_locale");
  CREATE INDEX "privacy_content_sections_points_locale_idx" ON "privacy_content_sections_points" USING btree ("_locale");
  CREATE INDEX "privacy_content_sections_locale_idx" ON "privacy_content_sections" USING btree ("_locale");
  CREATE INDEX "privacy_content_additional_sections_points_locale_idx" ON "privacy_content_additional_sections_points" USING btree ("_locale");
  CREATE INDEX "privacy_content_additional_sections_locale_idx" ON "privacy_content_additional_sections" USING btree ("_locale");
  CREATE INDEX "terms_content_sections_points_locale_idx" ON "terms_content_sections_points" USING btree ("_locale");
  CREATE INDEX "terms_content_sections_locale_idx" ON "terms_content_sections" USING btree ("_locale");
  CREATE INDEX "terms_content_additional_sections_points_locale_idx" ON "terms_content_additional_sections_points" USING btree ("_locale");
  CREATE INDEX "terms_content_additional_sections_locale_idx" ON "terms_content_additional_sections" USING btree ("_locale");
  CREATE INDEX "security_content_sections_points_locale_idx" ON "security_content_sections_points" USING btree ("_locale");
  CREATE INDEX "security_content_sections_locale_idx" ON "security_content_sections" USING btree ("_locale");
  CREATE INDEX "security_content_additional_sections_points_locale_idx" ON "security_content_additional_sections_points" USING btree ("_locale");
  CREATE INDEX "security_content_additional_sections_locale_idx" ON "security_content_additional_sections" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "why_choose_content_features_locales" (
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_content_location_lines_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "feature_grid_content_features_locales" (
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "content_split_content_section2_features_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "tabbed_showcase_content_tabs_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "testimonials_content_list_locales" (
  	"text" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "faq_content_categories_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "faq_content_list_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"category" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pricing_content_plans_features_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pricing_content_plans_locales" (
  	"name" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"period_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_us_content_form_company_size_options_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_content_sections_points_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_content_sections_locales" (
  	"title" varchar NOT NULL,
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_content_additional_sections_points_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_content_additional_sections_locales" (
  	"title" varchar NOT NULL,
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "terms_content_sections_points_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "terms_content_sections_locales" (
  	"title" varchar NOT NULL,
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "terms_content_additional_sections_points_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "terms_content_additional_sections_locales" (
  	"title" varchar NOT NULL,
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "security_content_sections_points_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "security_content_sections_locales" (
  	"title" varchar NOT NULL,
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "security_content_additional_sections_points_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "security_content_additional_sections_locales" (
  	"title" varchar NOT NULL,
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  DROP INDEX "why_choose_content_features_locale_idx";
  DROP INDEX "contact_content_location_lines_locale_idx";
  DROP INDEX "feature_grid_content_features_locale_idx";
  DROP INDEX "content_split_content_section2_features_locale_idx";
  DROP INDEX "tabbed_showcase_content_tabs_locale_idx";
  DROP INDEX "testimonials_content_list_locale_idx";
  DROP INDEX "faq_content_categories_locale_idx";
  DROP INDEX "faq_content_list_locale_idx";
  DROP INDEX "pricing_content_plans_features_locale_idx";
  DROP INDEX "pricing_content_plans_locale_idx";
  DROP INDEX "contact_us_content_form_company_size_options_locale_idx";
  DROP INDEX "privacy_content_sections_points_locale_idx";
  DROP INDEX "privacy_content_sections_locale_idx";
  DROP INDEX "privacy_content_additional_sections_points_locale_idx";
  DROP INDEX "privacy_content_additional_sections_locale_idx";
  DROP INDEX "terms_content_sections_points_locale_idx";
  DROP INDEX "terms_content_sections_locale_idx";
  DROP INDEX "terms_content_additional_sections_points_locale_idx";
  DROP INDEX "terms_content_additional_sections_locale_idx";
  DROP INDEX "security_content_sections_points_locale_idx";
  DROP INDEX "security_content_sections_locale_idx";
  DROP INDEX "security_content_additional_sections_points_locale_idx";
  DROP INDEX "security_content_additional_sections_locale_idx";
  ALTER TABLE "why_choose_content_features_locales" ADD CONSTRAINT "why_choose_content_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."why_choose_content_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_content_location_lines_locales" ADD CONSTRAINT "contact_content_location_lines_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_content_location_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "feature_grid_content_features_locales" ADD CONSTRAINT "feature_grid_content_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."feature_grid_content_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_split_content_section2_features_locales" ADD CONSTRAINT "content_split_content_section2_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_split_content_section2_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabbed_showcase_content_tabs_locales" ADD CONSTRAINT "tabbed_showcase_content_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabbed_showcase_content_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_content_list_locales" ADD CONSTRAINT "testimonials_content_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials_content_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_content_categories_locales" ADD CONSTRAINT "faq_content_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_content_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_content_list_locales" ADD CONSTRAINT "faq_content_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_content_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_content_plans_features_locales" ADD CONSTRAINT "pricing_content_plans_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_content_plans_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_content_plans_locales" ADD CONSTRAINT "pricing_content_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_content_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_us_content_form_company_size_options_locales" ADD CONSTRAINT "contact_us_content_form_company_size_options_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_us_content_form_company_size_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_content_sections_points_locales" ADD CONSTRAINT "privacy_content_sections_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_content_sections_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_content_sections_locales" ADD CONSTRAINT "privacy_content_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_content_additional_sections_points_locales" ADD CONSTRAINT "privacy_content_additional_sections_points_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_content_additional_sections_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_content_additional_sections_locales" ADD CONSTRAINT "privacy_content_additional_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_content_additional_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_content_sections_points_locales" ADD CONSTRAINT "terms_content_sections_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_content_sections_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_content_sections_locales" ADD CONSTRAINT "terms_content_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_content_additional_sections_points_locales" ADD CONSTRAINT "terms_content_additional_sections_points_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_content_additional_sections_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_content_additional_sections_locales" ADD CONSTRAINT "terms_content_additional_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_content_additional_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "security_content_sections_points_locales" ADD CONSTRAINT "security_content_sections_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."security_content_sections_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "security_content_sections_locales" ADD CONSTRAINT "security_content_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."security_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "security_content_additional_sections_points_locales" ADD CONSTRAINT "security_content_additional_sections_points_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."security_content_additional_sections_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "security_content_additional_sections_locales" ADD CONSTRAINT "security_content_additional_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."security_content_additional_sections"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "why_choose_content_features_locales_locale_parent_id_unique" ON "why_choose_content_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_content_location_lines_locales_locale_parent_id_uniq" ON "contact_content_location_lines_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "feature_grid_content_features_locales_locale_parent_id_uniqu" ON "feature_grid_content_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "content_split_content_section2_features_locales_locale_paren" ON "content_split_content_section2_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "tabbed_showcase_content_tabs_locales_locale_parent_id_unique" ON "tabbed_showcase_content_tabs_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "testimonials_content_list_locales_locale_parent_id_unique" ON "testimonials_content_list_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "faq_content_categories_locales_locale_parent_id_unique" ON "faq_content_categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "faq_content_list_locales_locale_parent_id_unique" ON "faq_content_list_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pricing_content_plans_features_locales_locale_parent_id_uniq" ON "pricing_content_plans_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pricing_content_plans_locales_locale_parent_id_unique" ON "pricing_content_plans_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_us_content_form_company_size_options_locales_locale_" ON "contact_us_content_form_company_size_options_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "privacy_content_sections_points_locales_locale_parent_id_uni" ON "privacy_content_sections_points_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "privacy_content_sections_locales_locale_parent_id_unique" ON "privacy_content_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "privacy_content_additional_sections_points_locales_locale_pa" ON "privacy_content_additional_sections_points_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "privacy_content_additional_sections_locales_locale_parent_id" ON "privacy_content_additional_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "terms_content_sections_points_locales_locale_parent_id_uniqu" ON "terms_content_sections_points_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "terms_content_sections_locales_locale_parent_id_unique" ON "terms_content_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "terms_content_additional_sections_points_locales_locale_pare" ON "terms_content_additional_sections_points_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "terms_content_additional_sections_locales_locale_parent_id_u" ON "terms_content_additional_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "security_content_sections_points_locales_locale_parent_id_un" ON "security_content_sections_points_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "security_content_sections_locales_locale_parent_id_unique" ON "security_content_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "security_content_additional_sections_points_locales_locale_p" ON "security_content_additional_sections_points_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "security_content_additional_sections_locales_locale_parent_i" ON "security_content_additional_sections_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "why_choose_content_features" DROP COLUMN "_locale";
  ALTER TABLE "why_choose_content_features" DROP COLUMN "title";
  ALTER TABLE "why_choose_content_features" DROP COLUMN "desc";
  ALTER TABLE "contact_content_location_lines" DROP COLUMN "_locale";
  ALTER TABLE "contact_content_location_lines" DROP COLUMN "text";
  ALTER TABLE "feature_grid_content_features" DROP COLUMN "_locale";
  ALTER TABLE "feature_grid_content_features" DROP COLUMN "title";
  ALTER TABLE "feature_grid_content_features" DROP COLUMN "desc";
  ALTER TABLE "content_split_content_section2_features" DROP COLUMN "_locale";
  ALTER TABLE "content_split_content_section2_features" DROP COLUMN "text";
  ALTER TABLE "tabbed_showcase_content_tabs" DROP COLUMN "_locale";
  ALTER TABLE "tabbed_showcase_content_tabs" DROP COLUMN "text";
  ALTER TABLE "testimonials_content_list" DROP COLUMN "_locale";
  ALTER TABLE "testimonials_content_list" DROP COLUMN "text";
  ALTER TABLE "testimonials_content_list" DROP COLUMN "name";
  ALTER TABLE "testimonials_content_list" DROP COLUMN "role";
  ALTER TABLE "faq_content_categories" DROP COLUMN "_locale";
  ALTER TABLE "faq_content_categories" DROP COLUMN "text";
  ALTER TABLE "faq_content_list" DROP COLUMN "_locale";
  ALTER TABLE "faq_content_list" DROP COLUMN "question";
  ALTER TABLE "faq_content_list" DROP COLUMN "answer";
  ALTER TABLE "faq_content_list" DROP COLUMN "category";
  ALTER TABLE "pricing_content_plans_features" DROP COLUMN "_locale";
  ALTER TABLE "pricing_content_plans_features" DROP COLUMN "text";
  ALTER TABLE "pricing_content_plans" DROP COLUMN "_locale";
  ALTER TABLE "pricing_content_plans" DROP COLUMN "name";
  ALTER TABLE "pricing_content_plans" DROP COLUMN "price";
  ALTER TABLE "pricing_content_plans" DROP COLUMN "period_label";
  ALTER TABLE "contact_us_content_form_company_size_options" DROP COLUMN "_locale";
  ALTER TABLE "contact_us_content_form_company_size_options" DROP COLUMN "text";
  ALTER TABLE "privacy_content_sections_points" DROP COLUMN "_locale";
  ALTER TABLE "privacy_content_sections_points" DROP COLUMN "text";
  ALTER TABLE "privacy_content_sections" DROP COLUMN "_locale";
  ALTER TABLE "privacy_content_sections" DROP COLUMN "title";
  ALTER TABLE "privacy_content_sections" DROP COLUMN "content";
  ALTER TABLE "privacy_content_additional_sections_points" DROP COLUMN "_locale";
  ALTER TABLE "privacy_content_additional_sections_points" DROP COLUMN "text";
  ALTER TABLE "privacy_content_additional_sections" DROP COLUMN "_locale";
  ALTER TABLE "privacy_content_additional_sections" DROP COLUMN "title";
  ALTER TABLE "privacy_content_additional_sections" DROP COLUMN "content";
  ALTER TABLE "terms_content_sections_points" DROP COLUMN "_locale";
  ALTER TABLE "terms_content_sections_points" DROP COLUMN "text";
  ALTER TABLE "terms_content_sections" DROP COLUMN "_locale";
  ALTER TABLE "terms_content_sections" DROP COLUMN "title";
  ALTER TABLE "terms_content_sections" DROP COLUMN "content";
  ALTER TABLE "terms_content_additional_sections_points" DROP COLUMN "_locale";
  ALTER TABLE "terms_content_additional_sections_points" DROP COLUMN "text";
  ALTER TABLE "terms_content_additional_sections" DROP COLUMN "_locale";
  ALTER TABLE "terms_content_additional_sections" DROP COLUMN "title";
  ALTER TABLE "terms_content_additional_sections" DROP COLUMN "content";
  ALTER TABLE "security_content_sections_points" DROP COLUMN "_locale";
  ALTER TABLE "security_content_sections_points" DROP COLUMN "text";
  ALTER TABLE "security_content_sections" DROP COLUMN "_locale";
  ALTER TABLE "security_content_sections" DROP COLUMN "title";
  ALTER TABLE "security_content_sections" DROP COLUMN "content";
  ALTER TABLE "security_content_additional_sections_points" DROP COLUMN "_locale";
  ALTER TABLE "security_content_additional_sections_points" DROP COLUMN "text";
  ALTER TABLE "security_content_additional_sections" DROP COLUMN "_locale";
  ALTER TABLE "security_content_additional_sections" DROP COLUMN "title";
  ALTER TABLE "security_content_additional_sections" DROP COLUMN "content";`)
}
