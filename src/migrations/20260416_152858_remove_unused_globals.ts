import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "contact_content_location_lines" CASCADE;
  DROP TABLE "contact_content" CASCADE;
  DROP TABLE "contact_content_locales" CASCADE;
  DROP TABLE "content_split_content_section2_features" CASCADE;
  DROP TABLE "content_split_content" CASCADE;
  DROP TABLE "content_split_content_locales" CASCADE;
  DROP TABLE "tabbed_showcase_content_tabs" CASCADE;
  DROP TABLE "tabbed_showcase_content" CASCADE;
  DROP TABLE "tabbed_showcase_content_locales" CASCADE;
  DROP TABLE "testimonials_content_list" CASCADE;
  DROP TABLE "testimonials_content" CASCADE;
  DROP TABLE "testimonials_content_locales" CASCADE;
  DROP TABLE "gradient_cta_content" CASCADE;
  DROP TABLE "gradient_cta_content_locales" CASCADE;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "contact_content_location_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "contact_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_content_locales" (
  	"location_title" varchar NOT NULL,
  	"email_title" varchar NOT NULL,
  	"call_title" varchar NOT NULL,
  	"follow_title" varchar NOT NULL,
  	"follow_desc" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "content_split_content_section2_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "content_split_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "content_split_content_locales" (
  	"section1_title" varchar NOT NULL,
  	"section1_desc" varchar NOT NULL,
  	"section1_cta" varchar NOT NULL,
  	"section1_badge_title" varchar NOT NULL,
  	"section1_badge_time" varchar NOT NULL,
  	"section2_title" varchar NOT NULL,
  	"section2_desc" varchar NOT NULL,
  	"section2_cta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tabbed_showcase_content_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "tabbed_showcase_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "tabbed_showcase_content_locales" (
  	"tag" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"dashboard" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials_content_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL
  );
  
  CREATE TABLE "testimonials_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "testimonials_content_locales" (
  	"tag" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "gradient_cta_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "gradient_cta_content_locales" (
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"cta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "contact_content_location_lines" ADD CONSTRAINT "contact_content_location_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_content_locales" ADD CONSTRAINT "contact_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_split_content_section2_features" ADD CONSTRAINT "content_split_content_section2_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_split_content_locales" ADD CONSTRAINT "content_split_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabbed_showcase_content_tabs" ADD CONSTRAINT "tabbed_showcase_content_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabbed_showcase_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabbed_showcase_content_locales" ADD CONSTRAINT "tabbed_showcase_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabbed_showcase_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_content_list" ADD CONSTRAINT "testimonials_content_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_content_locales" ADD CONSTRAINT "testimonials_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gradient_cta_content_locales" ADD CONSTRAINT "gradient_cta_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gradient_cta_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "contact_content_location_lines_order_idx" ON "contact_content_location_lines" USING btree ("_order");
  CREATE INDEX "contact_content_location_lines_parent_id_idx" ON "contact_content_location_lines" USING btree ("_parent_id");
  CREATE INDEX "contact_content_location_lines_locale_idx" ON "contact_content_location_lines" USING btree ("_locale");
  CREATE UNIQUE INDEX "contact_content_locales_locale_parent_id_unique" ON "contact_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "content_split_content_section2_features_order_idx" ON "content_split_content_section2_features" USING btree ("_order");
  CREATE INDEX "content_split_content_section2_features_parent_id_idx" ON "content_split_content_section2_features" USING btree ("_parent_id");
  CREATE INDEX "content_split_content_section2_features_locale_idx" ON "content_split_content_section2_features" USING btree ("_locale");
  CREATE UNIQUE INDEX "content_split_content_locales_locale_parent_id_unique" ON "content_split_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tabbed_showcase_content_tabs_order_idx" ON "tabbed_showcase_content_tabs" USING btree ("_order");
  CREATE INDEX "tabbed_showcase_content_tabs_parent_id_idx" ON "tabbed_showcase_content_tabs" USING btree ("_parent_id");
  CREATE INDEX "tabbed_showcase_content_tabs_locale_idx" ON "tabbed_showcase_content_tabs" USING btree ("_locale");
  CREATE UNIQUE INDEX "tabbed_showcase_content_locales_locale_parent_id_unique" ON "tabbed_showcase_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_content_list_order_idx" ON "testimonials_content_list" USING btree ("_order");
  CREATE INDEX "testimonials_content_list_parent_id_idx" ON "testimonials_content_list" USING btree ("_parent_id");
  CREATE INDEX "testimonials_content_list_locale_idx" ON "testimonials_content_list" USING btree ("_locale");
  CREATE UNIQUE INDEX "testimonials_content_locales_locale_parent_id_unique" ON "testimonials_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "gradient_cta_content_locales_locale_parent_id_unique" ON "gradient_cta_content_locales" USING btree ("_locale","_parent_id");`)
}
