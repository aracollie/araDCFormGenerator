export const RAW_MANE_TYPES = [
  'Natural',
  'Half',
  'Short',
  'Rough',
  'Sphinx',
  'Curly',
  'Yeti',
  'Barbary',
  'Razor',
  'Long',
  'Silky',
  'Wire',
  'Wrinkle',
  'Crested',
  'Caribou',
  'Bison',
  'Regal',
] as const;

export const VARIANT_MANE_TYPES = [
  'Natural (Spicy)',
  'Half (Royal)',
  'Sphinx (Xolo)',
  'Razor (Mop)',
  'Razor (Royal)',
  'Long (Gala)',

  'Wrinkle (Devon)',
] as const;

export const MANE_TYPES: readonly (
  (typeof RAW_MANE_TYPES)[number] | (typeof VARIANT_MANE_TYPES)[number]
)[] = [...RAW_MANE_TYPES, ...VARIANT_MANE_TYPES].sort();
