import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`settings\` ADD \`portrait_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`settings_portrait_idx\` ON \`settings\` (\`portrait_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`first_name\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`location\` text,
  	\`email\` text NOT NULL,
  	\`quote_text\` text NOT NULL,
  	\`quote_author\` text NOT NULL,
  	\`hero_greeting\` text NOT NULL,
  	\`hero_headline\` text NOT NULL,
  	\`hero_intro\` text NOT NULL,
  	\`contact_heading\` text NOT NULL,
  	\`contact_body\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_settings\`("id", "name", "first_name", "role", "location", "email", "quote_text", "quote_author", "hero_greeting", "hero_headline", "hero_intro", "contact_heading", "contact_body", "updated_at", "created_at") SELECT "id", "name", "first_name", "role", "location", "email", "quote_text", "quote_author", "hero_greeting", "hero_headline", "hero_intro", "contact_heading", "contact_body", "updated_at", "created_at" FROM \`settings\`;`)
  await db.run(sql`DROP TABLE \`settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_settings\` RENAME TO \`settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
}
