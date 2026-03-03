import * as migration_20260303_180215_init_postgres from './20260303_180215_init_postgres';

export const migrations = [
  {
    up: migration_20260303_180215_init_postgres.up,
    down: migration_20260303_180215_init_postgres.down,
    name: '20260303_180215_init_postgres'
  },
];
