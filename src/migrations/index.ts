import * as migration_20261003_134413_initial from './20261003_134413_initial';

export const migrations = [
  {
    up: migration_20261003_134413_initial.up,
    down: migration_20261003_134413_initial.down,
    name: '20261003_134413_initial'
  },
];
