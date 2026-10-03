import * as migration_20261003_134413_initial from './20261003_134413_initial';
import * as migration_20261003_173953_about_objects from './20261003_173953_about_objects';

export const migrations = [
  {
    up: migration_20261003_134413_initial.up,
    down: migration_20261003_134413_initial.down,
    name: '20261003_134413_initial',
  },
  {
    up: migration_20261003_173953_about_objects.up,
    down: migration_20261003_173953_about_objects.down,
    name: '20261003_173953_about_objects'
  },
];
