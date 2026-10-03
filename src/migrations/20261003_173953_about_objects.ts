import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`home_about_objects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`size\` text DEFAULT 'medium',
  	\`label\` text NOT NULL,
  	\`caption\` text NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_about_objects_order_idx\` ON \`home_about_objects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_about_objects_parent_id_idx\` ON \`home_about_objects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_about_objects_image_idx\` ON \`home_about_objects\` (\`image_id\`);`)
  await db.run(sql`DROP TABLE \`home_about_facts\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`home_about_facts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_about_facts_order_idx\` ON \`home_about_facts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_about_facts_parent_id_idx\` ON \`home_about_facts\` (\`_parent_id\`);`)
  await db.run(sql`DROP TABLE \`home_about_objects\`;`)
}
