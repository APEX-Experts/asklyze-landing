import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_navbar_content_links_icon" AS ENUM('Home', 'Zap', 'CreditCard', 'Newspaper', 'FileText', 'Users', 'Mail');
  CREATE TABLE "navbar_content_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"external" boolean DEFAULT false,
  	"icon" "enum_navbar_content_links_icon"
  );
  
  CREATE TABLE "navbar_content_links_locales" (
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "navbar_content_links" ADD CONSTRAINT "navbar_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navbar_content_links_locales" ADD CONSTRAINT "navbar_content_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar_content_links"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "navbar_content_links_order_idx" ON "navbar_content_links" USING btree ("_order");
  CREATE INDEX "navbar_content_links_parent_id_idx" ON "navbar_content_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navbar_content_links_locales_locale_parent_id_unique" ON "navbar_content_links_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "navbar_content_locales" DROP COLUMN "home";
  ALTER TABLE "navbar_content_locales" DROP COLUMN "features";
  ALTER TABLE "navbar_content_locales" DROP COLUMN "pricing";
  ALTER TABLE "navbar_content_locales" DROP COLUMN "blog";
  ALTER TABLE "navbar_content_locales" DROP COLUMN "docs";
  ALTER TABLE "navbar_content_locales" DROP COLUMN "about";
  ALTER TABLE "navbar_content_locales" DROP COLUMN "contact";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "navbar_content_links" CASCADE;
  DROP TABLE "navbar_content_links_locales" CASCADE;
  ALTER TABLE "navbar_content_locales" ADD COLUMN "home" varchar NOT NULL;
  ALTER TABLE "navbar_content_locales" ADD COLUMN "features" varchar NOT NULL;
  ALTER TABLE "navbar_content_locales" ADD COLUMN "pricing" varchar NOT NULL;
  ALTER TABLE "navbar_content_locales" ADD COLUMN "blog" varchar NOT NULL;
  ALTER TABLE "navbar_content_locales" ADD COLUMN "docs" varchar NOT NULL;
  ALTER TABLE "navbar_content_locales" ADD COLUMN "about" varchar NOT NULL;
  ALTER TABLE "navbar_content_locales" ADD COLUMN "contact" varchar NOT NULL;
  DROP TYPE "public"."enum_navbar_content_links_icon";`)
}
