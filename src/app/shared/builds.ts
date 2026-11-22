type BuildEntry = { buildGroup: string, family: string; genoLine: string; breed: string };

// Master list: the only place to edit when a new build appears.
// Order = order of the radios in Breeding Forms.
export const BUILD_DATA = [
  { buildGroup: 'Standard', family: 'Tokota', genoLine: 'Tokota', breed: 'Canarctos venatori' },
  { buildGroup: 'Tiny', family: 'Toki', genoLine: 'Toki', breed: 'Canarctos brevis' },
  { buildGroup: 'Tiny', family: 'Tokhara', genoLine: 'Tokhara', breed: 'Canarctos fervidus' },
  { buildGroup: 'Tiny', family: 'Sinaka', genoLine: 'Sinaka', breed: 'Canarctos callidus' },
  { buildGroup: 'Hefty', family: 'Miralta', genoLine: 'Miralta', breed: 'Canarctos visio' },
  { buildGroup: 'Hefty', family: 'Dire', genoLine: '10%', breed: 'Canarctos dirus [10%]' },
  { buildGroup: 'Hefty', family: 'Dire', genoLine: '25%', breed: 'Canarctos dirus [25%]' },
  { buildGroup: 'Hefty', family: 'Dire', genoLine: '50%', breed: 'Canarctos dirus [50%]' },
  { buildGroup: 'Hefty', family: 'Dire', genoLine: '75%', breed: 'Canarctos dirus [75%]' },
  { buildGroup: 'Hefty', family: 'Dire', genoLine: '100%', breed: 'Canarctos dirus [100%]' },
  { buildGroup: 'Hefty', family: 'Akota', genoLine: 'Akota', breed: 'Canarctos rex' },
  { buildGroup: 'Modest', family: 'Odonyx', genoLine: 'Odonyx', breed: 'Canarctos mordere' },
  { buildGroup: 'Modest', family: 'Dakino', genoLine: 'Dakino', breed: 'Canarctos dulcis' },
  { buildGroup: 'Modest', family: 'Makhata', genoLine: 'Makhata', breed: 'Canarctos ensurio' },
] as const satisfies readonly BuildEntry[];

// 'Tokota' | 'Toki' | ... | 'Dire' (one per family, built from the data above)
export type Build = (typeof BUILD_DATA)[number]['family'];

// For Breeding Forms: the 10 families, in order, without repeats
export const BUILDS: readonly Build[] = [...new Set(BUILD_DATA.map((b) => b.family))];

// For DC Forms: all 14 entries, with Dire split by percentage
export const BUILD_TYPES = BUILD_DATA.map(({ genoLine, breed }) => ({ genoLine, breed }));

// Breeding Compatibility
export const COMPATIBLE: Record<Build, Build[]> = {
  Tokota: ['Tokota', 'Tokhara', 'Sinaka', 'Toki', 'Odonyx', 'Dakino', 'Makhata', 'Miralta', 'Dire'],
  Tokhara: ['Tokhara', 'Sinaka', 'Toki', 'Tokota'],
  Sinaka: ['Tokhara', 'Sinaka', 'Toki', 'Tokota'],
  Toki: ['Tokhara', 'Sinaka', 'Toki', 'Tokota'],
  Odonyx: ['Odonyx', 'Dakino', 'Makhata', 'Tokota'],
  Dakino: ['Odonyx', 'Dakino', 'Makhata', 'Tokota'],
  Makhata: ['Odonyx', 'Dakino', 'Makhata', 'Tokota'],
  Miralta: ['Miralta', 'Tokota', 'Dire'],
  Akota: ['Akota', 'Dire'],
  Dire: ['Dire', 'Tokota', 'Miralta', 'Akota'],
};
