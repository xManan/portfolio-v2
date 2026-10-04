import * as migration_20261003_134413_initial from './20261003_134413_initial';
import * as migration_20261003_173953_about_objects from './20261003_173953_about_objects';
import * as migration_20261003_183213_contact_messages from './20261003_183213_contact_messages';
import * as migration_20261003_184234_remove_contact_messages from './20261003_184234_remove_contact_messages';
import * as migration_20261003_194106_remove_approach_section from './20261003_194106_remove_approach_section';
import * as migration_20261003_195610_about_object_stories from './20261003_195610_about_object_stories';
import * as migration_20261003_203138_remove_photo_credit from './20261003_203138_remove_photo_credit';
import * as migration_20261003_210343_profile_photo from './20261003_210343_profile_photo';
import * as migration_20261004_102008_blob_storage_fields from './20261004_102008_blob_storage_fields';

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
    name: '20261003_194106_remove_approach_section',
  },
  {
    up: migration_20261003_195610_about_object_stories.up,
    down: migration_20261003_195610_about_object_stories.down,
    name: '20261003_195610_about_object_stories',
  },
  {
    up: migration_20261003_203138_remove_photo_credit.up,
    down: migration_20261003_203138_remove_photo_credit.down,
    name: '20261003_203138_remove_photo_credit',
  },
  {
    up: migration_20261003_210343_profile_photo.up,
    down: migration_20261003_210343_profile_photo.down,
    name: '20261003_210343_profile_photo',
  },
  {
    up: migration_20261004_102008_blob_storage_fields.up,
    down: migration_20261004_102008_blob_storage_fields.down,
    name: '20261004_102008_blob_storage_fields'
  },
];
