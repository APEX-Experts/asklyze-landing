import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "metadata_content_locales" ADD COLUMN "about_title" varchar NOT NULL;
  ALTER TABLE "metadata_content_locales" ADD COLUMN "about_description" varchar NOT NULL;
  ALTER TABLE "about_page_content_leaders_members" ADD COLUMN "image_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "metadata_content_locales" DROP COLUMN "about_title";
  ALTER TABLE "metadata_content_locales" DROP COLUMN "about_description";
  ALTER TABLE "about_page_content_leaders_members" DROP COLUMN "image_url";`)
}
