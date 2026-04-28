import * as migration_20260303_180215_init_postgres from './20260303_180215_init_postgres';
import * as migration_20260416_114117_setup_globals from './20260416_114117_setup_globals';
import * as migration_20260416_123615_fix_array_localization from './20260416_123615_fix_array_localization';
import * as migration_20260416_145707_about_page_content from './20260416_145707_about_page_content';
import * as migration_20260416_152858_remove_unused_globals from './20260416_152858_remove_unused_globals';
import * as migration_20260416_155855_add_imageUrl_to_members from './20260416_155855_add_imageUrl_to_members';
import * as migration_20260427_074334 from './20260427_074334';
import * as migration_20260427_141624 from './20260427_141624';
import * as migration_20260428_081918 from './20260428_081918';

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
    name: '20260416_123615_fix_array_localization',
  },
  {
    up: migration_20260416_145707_about_page_content.up,
    down: migration_20260416_145707_about_page_content.down,
    name: '20260416_145707_about_page_content',
  },
  {
    up: migration_20260416_152858_remove_unused_globals.up,
    down: migration_20260416_152858_remove_unused_globals.down,
    name: '20260416_152858_remove_unused_globals',
  },
  {
    up: migration_20260416_155855_add_imageUrl_to_members.up,
    down: migration_20260416_155855_add_imageUrl_to_members.down,
    name: '20260416_155855_add_imageUrl_to_members',
  },
  {
    up: migration_20260427_074334.up,
    down: migration_20260427_074334.down,
    name: '20260427_074334',
  },
  {
    up: migration_20260427_141624.up,
    down: migration_20260427_141624.down,
    name: '20260427_141624',
  },
  {
    up: migration_20260428_081918.up,
    down: migration_20260428_081918.down,
    name: '20260428_081918'
  },
];
