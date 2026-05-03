import { Field } from 'payload';

export const MediaField = (overrides?: Partial<Field>): Field => {
  return {
    name: 'media',
    type: 'relationship',
    relationTo: 'media',
    required: true,
    ...overrides,
  } as Field;
};
