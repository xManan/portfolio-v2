import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`home_about_objects\` ADD \`story\` text;`)
  await db.run(sql`ALTER TABLE \`home_about_objects\` ADD \`credit\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`home_about_objects\` DROP COLUMN \`story\`;`)
  await db.run(sql`ALTER TABLE \`home_about_objects\` DROP COLUMN \`credit\`;`)
}
