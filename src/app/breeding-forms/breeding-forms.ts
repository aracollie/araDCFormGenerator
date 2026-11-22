import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type FormType = 'Main' | 'Starter';
type LitterMode = 'full' | 'split';
type PotlTo = 'me' | 'partner';
type SuppRule = { builds: string[]; items: string[] };
type TraitItem = {
  name: string;
  checked: boolean;
  hasBag: boolean;
  bag: '' | 'Small' | 'Large';
  target: string;
  placeholder: string;
};

const FACTIONS = ['PL', 'PB', 'LK', 'KS', 'WT', 'TB', 'Neutral'];
const BUILDS = [
  'Tokota',
  'Tokhara',
  'Sinaka',
  'Odonyx',
  'Akota',
  'Dakino',
  'Miralta',
  'Makhata',
  'Toki',
  'Dire',
] as const;
type Build = (typeof BUILDS)[number];
const COMPATIBLE: Record<Build, Build[]> = {
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

const SUPP_RULES: SuppRule[] = [
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
    builds: ['Dire', 'Miralta'],
    items: ['Close Care', 'Homemade Close Care', "Amber's Blessing", 'Moose Totem', 'Kinkajou'],
  },
  {
    builds: ['Dakino', 'Odonyx'],
    items: [
      'Breeder Box',
      'Homemade Breeders Box',
      "Bede's Blessing",
      'Capybara Totem',
      'Capybara',
    ],
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

const DEFAULT_SUPP_ITEMS = [
  'Fertility Supplements',
  'Homemade Fertility Supplements',
  "Oona's Blessing",
  'Bumblebee Totem',
  'Swan',
];

const AGA_SPRITE = 'Aga Sprite';

const ROOT_TYPES = ['Fertility Root', 'Homemade Fertility Root', 'Rabbit Totem', 'Chimera Totem'];

const BOOSTERS: Record<Build, string> = {
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

const EXTRA_SPOT_OPTIONS: Record<FormType, string[]> = {
  Main: ['Talisman', 'Passionate I', 'Passionate II', 'Starbarks'],
  Starter: ['Ardent', 'Shikoku', 'Nestoko Tea'],
};

const OTHER_GROUPS: { title: string; items: string[] }[] = [
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
  { title: 'Other', items: ['Chocolates', 'Lavender'] },
];

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"'*\[\]]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '*': '&#42;',
      '[': '&#91;',
      ']': '&#93;',
    };
    return entities[character];
  });

function toggleIn(list: string[], name: string, checked: boolean): string[] {
  return checked ? [...list, name] : list.filter((item) => item !== name);
}

function createTraitItems(): TraitItem[] {
  return [
    {
      name: 'Offering to the Gods',
      checked: false,
      hasBag: true,
      bag: '',
      target: '',
      placeholder: 'Include: Increase OR Decrease and which Gene',
    },
    {
      name: 'Devotion to the Spirits',
      checked: false,
      hasBag: true,
      bag: '',
      target: '',
      placeholder: 'Include: Which Mane Variant are you Increasing',
    },
    {
      name: 'Tribute to the Fates',
      checked: false,
      hasBag: true,
      bag: '',
      target: '',
      placeholder: 'Include: Increase OR Decrease and which Mutation',
    },
  ];
}

@Component({
  imports: [FormsModule],
  selector: 'app-breeding-forms',
  styleUrl: './breeding-forms.css',
  templateUrl: './breeding-forms.html',
})
export class BreedingForms {
  protected builds = BUILDS;
  protected factions = FACTIONS;
  protected otherGroups = OTHER_GROUPS;
  protected sireBuild: Build | '' = 'Tokota';
  protected damBuild: Build | '' = 'Tokota';
  formType: FormType = 'Main';
  protected title = this.formType + ' Thread Breeding Request Form';
  username = '';
  faction = 'Neutral';
  protected litterMode: LitterMode = 'full';
  protected potlTo: PotlTo | '' = '';
  splitPartner = '';
  inbreeding = false;
  lastLineInbreeding = false;
  rollInjuries = false;
  useTribeBonus = false;
  useExtraSpot = false;
  protected litterSupps = '';
  protected rootType = '';
  protected extraSpot = '';
  usingRoot = false;
  protected selectedBoosters: string[] = [];
  protected selectedOther: string[] = [];
  protected traitItems: TraitItem[] = createTraitItems();
  protected stylistToken = { checked: false, target: '' };
  protected result = '';

  protected get rootOptions(): string[] {
    return [...ROOT_TYPES, AGA_SPRITE];
  }
  protected get suppItems(): string[] {
    const rule = SUPP_RULES.find((r) =>
      r.builds.some((b) => b === this.sireBuild || b === this.damBuild),
    );
    return [...(rule?.items ?? DEFAULT_SUPP_ITEMS), AGA_SPRITE];
  }

  protected get boosterItems(): string[] {
    const items = new Set<string>();
    // Booster of each parent's build (skips the empty '' state)
    [this.sireBuild, this.damBuild].forEach((build) => {
      if (build) items.add(BOOSTERS[build]);
    });

    // Only Akota x Dire (in any order) cannot produce Tokotas
    const akotaDire =
      (this.sireBuild === 'Akota' && this.damBuild === 'Dire') ||
      (this.sireBuild === 'Dire' && this.damBuild === 'Akota');
    if (!akotaDire) items.add(BOOSTERS.Tokota);

    return [...items];
  }

  protected get extraSpotOptions(): string[] {
    return EXTRA_SPOT_OPTIONS[this.formType];
  }

  canPair(a: Build | '', b: Build | ''): boolean {
    if (!a || !b) return true;
    return COMPATIBLE[a].includes(b);
  }

  setSire(s: Build | '') {
    this.sireBuild = s;
    this.cleanSelections();
  }
  setDam(d: Build | '') {
    this.damBuild = d;
    this.cleanSelections();
  }

  resetBuilds(): void {
    this.sireBuild = 'Tokota';
    this.damBuild = 'Tokota';
    this.cleanSelections();
  }

  private cleanSelections(): void {
    if (!this.canPair(this.sireBuild, this.damBuild)) this.damBuild = '';
    if (!this.suppItems.includes(this.litterSupps)) this.litterSupps = '';
    this.selectedBoosters = this.selectedBoosters.filter((b) => this.boosterItems.includes(b));
  }

  setFormType(value: FormType) {
    if (value === 'Main') {
      this.usingRoot = false;
      this.rootType = '';
      this.extraSpot = '';
    } else {
      this.litterSupps = '';
      this.extraSpot = '';
    }

    this.formType = value;
    this.title = this.formType + ' Thread Breeding Request Form';
  }

  setLitterMode(value: LitterMode) {
    if (value === 'full') {
      this.splitPartner = '';
      this.potlTo = '';
    }
    this.litterMode = value;
  }

  setInbreeding(checked: boolean): void {
    this.inbreeding = checked;
    if (!checked) this.lastLineInbreeding = false;
  }
  toggleBooster(name: string, checked: boolean) {
    this.selectedBoosters = toggleIn(this.selectedBoosters, name, checked);
  }
  toggleOther(name: string, checked: boolean) {
    this.selectedOther = toggleIn(this.selectedOther, name, checked);
  }

  setItemChecked(item: TraitItem, checked: boolean) {
    item.checked = checked;
    if (!checked) {
      item.bag = '';
      item.target = '';
    }
  }
  clearForm() {
    this.sireBuild = 'Tokota';
    this.damBuild = 'Tokota';
    this.formType = 'Main';
    this.username = '';
    this.faction = 'Neutral';
    this.litterMode = 'full';
    this.potlTo = '';
    this.splitPartner = '';
    this.inbreeding = false;
    this.lastLineInbreeding = false;
    this.rollInjuries = false;
    this.useTribeBonus = false;
    this.useExtraSpot = false;
    this.litterSupps = '';
    this.rootType = '';
    this.extraSpot = '';
    this.usingRoot = false;
    this.selectedBoosters = [];
    this.selectedOther = [];
    this.traitItems = createTraitItems();
    this.stylistToken = { checked: false, target: '' };
    this.result = '';
  }

  generate() {
    const errors: string[] = [];

    if (!this.sireBuild) errors.push('Select a Sire build.');
    if (!this.damBuild) errors.push('Select a Dam build.');
    if (!this.username.trim()) errors.push('Enter your username.');
    if (!this.canPair(this.sireBuild, this.damBuild)) {
      errors.push('The selected builds are not compatible.');
    }

    if (this.litterMode === 'split') {
      if (!this.splitPartner.trim()) errors.push('Enter the split partner.');
      if (!this.potlTo) errors.push('Choose who receives the POTL.');
    }

    if (this.useExtraSpot && !this.extraSpot) {
      errors.push('Select an extra breeding spot.');
    }

    if (this.formType === 'Starter' && this.usingRoot && !this.rootType) {
      errors.push('Select a fertility root.');
    }

    this.traitItems
      .filter((item) => item.checked)
      .forEach((item) => {
        if (!item.target.trim()) errors.push(`Enter what ${item.name} affects.`);
        if (item.hasBag && !item.bag) {
          errors.push(`Select a sacrificial bag size for ${item.name}.`);
        }
      });
    if (this.stylistToken.checked && !this.stylistToken.target.trim()) {
      errors.push('Enter selected Gene, Mane, Physical Trait, or Non-Physical Trait');
    }

    if (errors.length > 0) {
      this.result = errors.join('<br>');
      return;
    }

    let litterLine = 'Full to me';
    if (this.litterMode === 'split') {
      const potl = this.potlTo === 'me' ? 'me' : this.splitPartner;
      litterLine = `Split with ${this.splitPartner} - POTL to ${potl}`;
    }

    let splitLimitsLine = '-';
    if (this.litterMode === 'split') {
      const partner = this.splitPartner.trim();
      splitLimitsLine = `[${escapeHtml(partner)}'s Bonuses & Monthly Limits](https://tokotna.com/profile/limits/index.php?user=${encodeURIComponent(partner)})`;
    }
    let inbreedingLine = 'No';
    if (this.inbreeding) {
      inbreedingLine = 'Yes';
      if (this.lastLineInbreeding) {
        inbreedingLine += ' - Last line';
      }
    }
    const rollIfInjuriesLine = this.rollInjuries ? 'Yes' : 'No';
    const usingTribeBonusLine = this.useTribeBonus ? 'Yes' : 'No';
    const extraSlotLine = this.useExtraSpot ? `Yes - ${this.extraSpot}` : 'No';

    const traitLines = this.traitItems
      .filter((i) => i.checked)
      .map((i) => {
        const target = escapeHtml(i.target.trim());
        const name = escapeHtml(i.name);
        return i.hasBag
          ? `${i.bag} Sacrificial Bag (${name} - ${target})`
          : `${name} (${target})`;
      });
    const stylistTokenLine = this.stylistToken.checked
      ? `Stylist Token (${escapeHtml(this.stylistToken.target.trim())})`
      : undefined;

    const firstPart = [
      `<span class="text-danger">**Sire:** (Link to Tokotna Import page)</span>`,
      `<span class="text-danger">**Owner Approval:**  (Leave blank if you are the owner) </span>`,
      `<span class="text-danger">**Sire's Hereditary Mutations/Traits/Breeding Companions:** </span>`,
      `<span class="text-danger">**.** </span>`,
      `<span class="text-danger">**x** </span>`,
      `<span class="text-danger">**.** </span>`,
      `<span class="text-danger">**Dam:** (Link to Tokotna Import page)</span>`,
      `<span class="text-danger">**Owner Approval:**  (Leave blank if you are the owner) </span>`,
      `<span class="text-danger">**Dam's Hereditary Mutations/Traits/Breeding Companions:**</span>`,
      `**.**`,
      `**Bonuses & Monthly Limits**: [${escapeHtml(this.username.trim())}'s Bonuses & Monthly Limits](https://tokotna.com/profile/limits/index.php?user=${encodeURIComponent(this.username.trim())})`,
      `**Litter Specifications**: ${litterLine}`,
      `**- Split Partner’s Bonuses and Monthly Limits**: ${splitLimitsLine}`,
      `**Faction**: ${this.faction}`,
      `**Is inbreeding present?:** ${inbreedingLine}`,
      `**Roll if injuries present:** ${rollIfInjuriesLine}`,
      `**.**`,
      `**Supplementary Items:**`,
      `**.**`,
    ];
    let middlePart: string[] = [];
    if (this.formType === 'Main') {
      middlePart = [`**- Litter Size Supps:**: ${this.litterSupps}`];
    } else {
      middlePart = [`**- Fertility Root:** ${this.usingRoot ? `Yes - ${this.rootType}` : 'No'}`];
    }
    const otherLines = [
      ...this.selectedOther,
      ...traitLines,
      ...(stylistTokenLine ? [stylistTokenLine] : []),
    ];
    const lastPart = [
      `**- Build Supps**: ${this.selectedBoosters.join(',')}`,
      `**- Other:**: ${otherLines.length > 0 ? otherLines.join(', ') : '-'}`,
      `**.**`,
      `**Using Tribe Rare Mane Bonus?**: ${usingTribeBonusLine}`,
      `**.**`,
      `**Using Extra Breeding Spot?** ${extraSlotLine}`,
      `**.**`,
      `<span class="text-danger">**Filled Breeding Roller ID Link:** (Link to the filled out Breeding Roller, leave blank if unable)</span> `,
    ];

    const profile = [...firstPart, ...middlePart, ...lastPart].join('\n');

    const renderText = (text: string): string =>
      text
        .replace(
          /\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g,
          '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
        )
        .replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\r?\n/g, '<br>');

    this.result = renderText(profile);
  }
}
