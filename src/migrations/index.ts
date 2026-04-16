import * as migration_20260303_180215_init_postgres from './20260303_180215_init_postgres';
import * as migration_20260416_114117_setup_globals from './20260416_114117_setup_globals';
import * as migration_20260416_123615_fix_array_localization from './20260416_123615_fix_array_localization';

export const migrations = [
  {
    up: migration_20260303_180215_init_postgres.up,
    down: migration_20260303_180215_init_postgres.down,
    name: '20260303_180215_init_postgres',
  },
  {
    up: migration_20260416_114117_setup_globals.up,
    down: migration_20260416_114117_setup_globals.down,
    name: '20260416_114117_setup_globals',
  },
  {
    up: migration_20260416_123615_fix_array_localization.up,
    down: migration_20260416_123615_fix_array_localization.down,
    name: '20260416_123615_fix_array_localization'
  },
];
