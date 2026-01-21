import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";
import { Users } from "./collections/Users.ts";
import { Posts } from "./collections/Posts.ts";
import sharp from "sharp";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Posts],
  editor: lexicalEditor({}),
  secret:  process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:/app/data/payload-sqlite.db",
    },
  }),
  sharp,
  localization: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  }
});
