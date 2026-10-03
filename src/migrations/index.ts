import * as migration_20261003_134413_initial from './20261003_134413_initial';
import * as migration_20261003_173953_about_objects from './20261003_173953_about_objects';
import * as migration_20261003_183213_contact_messages from './20261003_183213_contact_messages';
import * as migration_20261003_184234_remove_contact_messages from './20261003_184234_remove_contact_messages';
import * as migration_20261003_194106_remove_approach_section from './20261003_194106_remove_approach_section';

export const migrations = [
  {
    up: migration_20261003_134413_initial.up,
    down: migration_20261003_134413_initial.down,
    name: '20261003_134413_initial',
  },
  {
    up: migration_20261003_173953_about_objects.up,
    down: migration_20261003_173953_about_objects.down,
    name: '20261003_173953_about_objects',
  },
  {
    up: migration_20261003_183213_contact_messages.up,
    down: migration_20261003_183213_contact_messages.down,
    name: '20261003_183213_contact_messages',
  },
  {
    up: migration_20261003_184234_remove_contact_messages.up,
    down: migration_20261003_184234_remove_contact_messages.down,
    name: '20261003_184234_remove_contact_messages',
  },
  {
    up: migration_20261003_194106_remove_approach_section.up,
    down: migration_20261003_194106_remove_approach_section.down,
    name: '20261003_194106_remove_approach_section'
  },
];
