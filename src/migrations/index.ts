import * as migration_20260121_145511 from './20260121_145511';

export const migrations = [
  {
    up: migration_20260121_145511.up,
    down: migration_20260121_145511.down,
    name: '20260121_145511'
  },
];
