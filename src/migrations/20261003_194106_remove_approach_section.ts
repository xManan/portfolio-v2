import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`home_thinking_steps\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`thinking_heading\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`home_thinking_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_thinking_steps_order_idx\` ON \`home_thinking_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_thinking_steps_parent_id_idx\` ON \`home_thinking_steps\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`thinking_heading\` text DEFAULT 'How I approach a problem' NOT NULL;`)
}
