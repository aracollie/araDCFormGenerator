export const DECOR_NAMES: { type: string; names: string[] }[] = [
  {
    type: 'BG Stones',
    names: ['Borgas Stone', 'Festive Stone', 'Sikrinerks Stone', 'Tribe Stone'],
  },
  {
    type: 'Handpaints',
    names: [
      'Aippaqs Hand Paint Dyes',
      'Aurora Paint',
      'Celestial Paint',
      'Crafted Hand Paint Dyes',
      'Event Shop Hand Paint Dyes',
      'Hand Paint Dyes',
      'Sparkling Hand Paint Dyes',
      'Totem Tattoo',
    ],
  },
  {
    type: 'Body Items',
    names: [
      'Event Shop Large Item',
      'Event Shop Small Item',
      'Homemade Large Item',
      'Homemade Small Item',
      'Large Item',
      'Small Item',
    ],
  },
  { type: 'Eye Items', names: ['Meelaniks Jinx', 'Sivoganiks Charm'] },
  {
    type: 'Talismans',
    names: [
      'Forest Guardian Talisman',
      'Good Fortune Talisman',
      'Hollow Maw Talisman',
      'Partnership Talisman',
      'Storm Caller Talisman',
      'Sun Chaser Talisman',
      'Watchful Eye Talisman',
    ],
  },
  {
    type: 'Charity Decor',
    names: [
      'Bouquet of Sunflowers',
      'Cozy Reading Nook',
      'Love For All Pack',
      'Ribbons of Endless Hope',
      'Seeds of Peace',
      'Tokens of Hope',
      'Well-Loved Book',
    ],
  },
  { type: 'Other', names: ['Agas Charm', 'Nagruks Charm', 'Scar Pack', 'Sikrinerk Bauble'] },
];


export const BASE_COAT_ORDER = ['Tundra', 'Tawny', 'Brown', 'Black'] as const;
export type BaseName = (typeof BASE_COAT_ORDER)[number];

export const SPECIAL_BASE_COATS: Record<BaseName, string[]> = {
  Tundra: ['Senad 253', 'Saint Val 24692', 'Lemon 25971', 'Fowl 73965', 'Orchid 73966'],
  Tawny: [
    'Voltaire 02',
    'Bear and Bird 134',
    'Tonga 182',
    'Antique Rose 445',
    'Keeper of Souls 4181',
    'Mearwen 6560',
    'Queen Bee 12580',
    'Corchran 21457',
    'Percy FT01',
    'Twonga 60032',
  ],
  Brown: [
    'Melisandre 45',
    'Mythic 100',
    'Drogo 515',
    'Epona 600',
    'Morzia 608',
    'Jimothy WM31',
    'Sundance 4300',
    'Fenix 4600',
    'Oogie Boogie 6310',
    'Mabon 6420',
    'Railyard 6666',
    'John WM37',
    'Vine 7234',
    'Melanthios 7709',
    'Redcap 9083',
    'Whistler 23244',
    'Artemis 63319',
    'Dvora 65923',
  ],
  Black: ['Salem 73964'],
};

export const HEALTH_STATUSES = ['Healthy', 'Inbred'] as const;
export const HEALTH_DEFECTS = [
  'Infertile',
  'Sterile',
  'Spinal Defects',
  'Blind',
  'Deaf',
  'Frail',
  'Lame',
] as const;

export const ADDABLE_PHYSICAL_TRAIT_NAMES = [
  'Beard',
  'Bob Tail',
  'Cheek Fur',
  'Curled Tail',
  'Fangs',
  'Floppy Ears',
  'Lion Tail',
  'Lop Ears',
  'Raptor Claws',
  'Roman Nose',
  'Rose Ears',
  'Short Claws',
  'Small Ears',
  'Tall Ears',
  'Talon Claws',
  'Tusks',
] as const;
