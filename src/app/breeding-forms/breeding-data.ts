import { Build } from "../shared/builds";

// Types of Breeding Forms
export type FormType = 'Main' | 'Starter';
export type LitterMode = 'full' | 'split';
export type PotlTo = 'me' | 'partner';
export type SuppRule = { builds: string[]; items: string[] };

// For traits like OttG, TToF and items like Meel Sprite or
export type TraitItem = {
  name: string;
  checked: boolean;
  hasBag: boolean;
  bag: '' | 'Small' | 'Large';
  increase: boolean | null;
  target: string;
  placeholder: string;
};

// Items at index 0 and 1 of every supp group are consumables (go to Mass Remove)
export const CONSUMABLE_SUPP_COUNT = 2;

// Extra breeding spot items that are consumables (any item containing one of these words)
export const CONSUMABLE_EXTRA_SPOT_WORDS = ['Tea', 'Talisman', 'Starbarks'];

export const CONSUMABLE_ROOTS = ['Fertility Root', 'Homemade Fertility Root'];

export const FACTIONS = ['PL', 'PB', 'LK', 'KS', 'WT', 'TB', 'Neutral'];

// Items at 0 and 1 are items and are added to Mass Remove, rest are just Totems or companions
export const SUPP_RULES: SuppRule[] = [
  {
    builds: ['Odonyx'],
    items: [
      'Breeder Box',
      'Homemade Breeders Box',
      "Bede's Blessing",
      'Capybara Totem',
      'Capybara',
    ],
  },
  {
    builds: ['Akota', 'Makhata'],
    items: [
      'Chonk Chews',
      'Homemade Chonk Chews',
      "Kodiak's Blessing",
      'Rhinoceros Totem',
      'Panda',
    ],
  },
  {
    builds: ['Dakino'],
    items: [
      'Breeder Box',
      'Homemade Breeders Box',
      "Bede's Blessing",
      'Capybara Totem',
      'Capybara',
    ],
  },
  {
    builds: ['Dire', 'Miralta'],
    items: ['Close Care', 'Homemade Close Care', "Amber's Blessing", 'Moose Totem', 'Kinkajou'],
  },

  {
    builds: ['Tokhara', 'Sinaka'],
    items: [
      'Runner Rations',
      'Homemade Runner Rations',
      "Shenzi's Blessing",
      'Okapi Totem',
      'Koala',
    ],
  },
];

// Items at 0 and 1 are items and are added to Mass Remove, rest are just Totems or companions
export const DEFAULT_SUPP_ITEMS = [
  'Fertility Supplements',
  'Homemade Fertility Supplements',
  "Oona's Blessing",
  'Bumblebee Totem',
  'Swan',
];

export const AGA_SPRITE = 'Aga Sprite';

export const ROOT_TYPES = [
  'Fertility Root',
  'Homemade Fertility Root',
  'Rabbit Totem',
  'Chimera Totem',
];

export const BOOSTERS: Record<Build, string> = {
  Tokota: 'Standard Spritzer',
  Toki: 'Tiny Terror Tincture',
  Dire: 'Dire Remedy',
  Tokhara: 'Sprinter Solution',
  Odonyx: 'Timeless Draft',
  Akota: 'Primal Potion',
  Dakino: 'Kino Tonic',
  Miralta: 'Tall Draught',
  Makhata: 'Fearsome Serum',
  Sinaka: 'Foxy Brew',
};

export const TALISMAN_EXTRA_SLOT = 'Talisman / Breeding Image / Shikoku + Shiba / Woodpecker Totem';
export const TALISMAN_EXTRA_SLOT_CHOICES = [
  'Inukshuk Talisman',
  'Breeding Image',
  'Shikoku + Shiba',
  'Woodpecker Totem',
] as const;

export const EXTRA_SLOT_OPTIONS: Record<FormType, string[]> = {
  Main: [TALISMAN_EXTRA_SLOT, 'Passionate I', 'Passionate II', 'Starbarks Latte'],
  Starter: ['Ardent', 'Shikoku', 'Nestoko Tea'],
};

export const OTHER_GROUPS: { title: string; items: string[] }[] = [
  {
    title: 'Litter Gender Potions',
    items: ['Masculine Potion', 'Feminine Potion'],
  },
  {
    title: 'Marking Reducers',
    items: [
      'Bearmark Blender',
      'Blanket-B-Gone',
      'Collar Concealer',
      'Fade-Away Flecking',
      'Fur Foundation',
      'Lilac Liquefier',
      'Marked Makeup',
      'Moss Mask',
      'Move-it Merle',
      'Pangare Pouf',
      'Piebald Purger',
      'Quagga Quasher',
      'Rainmark Remover',
      'Rose Relaxer',
      'Sable Scrubber',
      'Saddle Separator',
      'Saturation Shake',
      'Seal Sealant',
      'Thylacine Twont-B-Seen',
    ],
  },
  {
    title: 'Misc Crafting',
    items: [
      'Iwalani Stone',
      'Dark Elixir',
      'Light Elixir',
      "Shyo's Hairclip",
      'Shallow Carved Trinket',
      'Deep Carved Trinket',
      'Sunrise in a Bottle',
      'Nighttime in a Bottle',
      'Mirage in a Bottle',
      'Rainbow in a Bottle',
      'Snowstorm in a Bottle',
      'Aurora in a Bottle',
    ],
  },
  { title: 'Other', items: ['Box of Chocolates', 'Lavender'] },
];

export function createTraitItems(): TraitItem[] {
  return [
    {
      name: 'Blessed Union',
      checked: false,
      hasBag: false,
      bag: '',
      increase: null,
      target: '',
      placeholder: 'Enter selected Gene, Mane, Physical Trait, or Non-Physical Trait',
    },
    {
      name: 'Offering to the Gods',
      checked: false,
      hasBag: true,
      bag: '',
      increase: null,
      target: '',
      placeholder: 'Which Gene does it affect?',
    },
    {
      name: 'Devotion to the Spirits',
      checked: false,
      hasBag: true,
      bag: '',
      increase: null,
      target: '',
      placeholder: 'Which Mane Variant does it affect?',
    },
    {
      name: 'Tribute to the Fates',
      checked: false,
      hasBag: true,
      bag: '',
      increase: null,
      target: '',
      placeholder: 'Which Mutation does it affect?',
    },
  ];
}
