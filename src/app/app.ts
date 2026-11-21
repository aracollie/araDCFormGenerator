import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

const BASE_COAT_ORDER = ['Tundra', 'Tawny', 'Brown', 'Black'] as const;
const BUILD_TYPES = [
  { genoLine: 'Tokota', breed: 'Canarctos venatori' },
  { genoLine: 'Tokhara', breed: 'Canarctos fervidus' },
  { genoLine: 'Sinaka', breed: 'Canarctos callidus' },
  { genoLine: 'Odonyx', breed: 'Canarctos mordere' },
  { genoLine: 'Akota', breed: 'Canarctos rex' },
  { genoLine: 'Dakino', breed: 'Canarctos dulcis' },
  { genoLine: 'Miralta', breed: 'Canarctos visio' },
  { genoLine: 'Makhata', breed: 'Canarctos ensurio' },
  { genoLine: 'Toki', breed: 'Canarctos brevis' },
  { genoLine: '10%', breed: 'Canarctos dirus [10%]' },
  { genoLine: '25%', breed: 'Canarctos dirus [25%]' },
  { genoLine: '50%', breed: 'Canarctos dirus [50%]' },
  { genoLine: '75%', breed: 'Canarctos dirus [75%]' },
  { genoLine: '100%', breed: 'Canarctos dirus [100%]' },
] as const;
const GENOTYPE_LINE_PATTERN =
  /^(?:Genotype\s*:\s*)?[A-Za-z0-9+.-]+(?:\/[A-Za-z0-9+.-]+)+(?:\s*\/\/\s*[A-Za-z0-9+.-]+(?:\/[A-Za-z0-9+.-]+)+)?$/i;
const MANE_TYPES = [
  'Natural',
  'Natural (Spicy)',
  'Half',
  'Half (Royal)',
  'Short',
  'Rough',
  'Sphinx',
  'Sphinx (Xolo)',
  'Curly',
  'Yeti',
  'Barbary',
  'Razor',
  'Razor (Mop)',
  'Razor (Royal)',
  'Long',
  'Long (Gala)',
  'Silky',
  'Wire',
  'Wrinkle',
  'Wrinkle (Devon)',
  'Crested',
  'Caribou',
  'Bison',
  'Regal',
] as const;
type BaseName = (typeof BASE_COAT_ORDER)[number];
type BaseCoatOption = { base: BaseName; name: string; selected: boolean };
type DecorOption = { name: string; checked: boolean; quantity: number | null };
type DecorGroup = { type: string; options: DecorOption[] };
type GenoPhysicalTrait = { name: string; carried: boolean };
type AddablePhysicalTrait = { name: string; selected: boolean; carried: boolean };

const ADDABLE_PHYSICAL_TRAIT_NAMES = [
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

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('DC Form Generator');
  protected geno = '';
  protected genoPhysicalTraits: GenoPhysicalTrait[] = [];
  protected addingTraits = false;
  protected addablePhysicalTraits: AddablePhysicalTrait[] = ADDABLE_PHYSICAL_TRAIT_NAMES.map(
    (name) => ({ name, selected: false, carried: false }),
  );
  protected litter = '';
  protected proofOfOwnership = '';
  protected registeredName = '';
  protected nicknames = '';
  protected ownerOrTribe = '';
  protected tribeOwned = false;
  protected soulPool = false;
  protected formType = 'Main Thread Form';
  protected decorGroups: DecorGroup[] = [
    {
      type: 'BG Stones',
      options: [
        { name: 'Borgas Stone', checked: false, quantity: 1 },
        { name: 'Festive Stone', checked: false, quantity: 1 },
        { name: 'Sikrinerks Stone', checked: false, quantity: 1 },
        { name: 'Tribe Stone', checked: false, quantity: 1 },
      ],
    },
    {
      type: 'Handpaints',
      options: [
        { name: 'Aippaqs Hand Paint Dyes', checked: false, quantity: 1 },
        { name: 'Aurora Paint', checked: false, quantity: 1 },
        { name: 'Celestial Paint', checked: false, quantity: 1 },
        { name: 'Crafted Hand Paint Dyes', checked: false, quantity: 1 },
        { name: 'Event Shop Hand Paint Dyes', checked: false, quantity: 1 },
        { name: 'Hand Paint Dyes', checked: false, quantity: 1 },
        { name: 'Sparkling Hand Paint Dyes', checked: false, quantity: 1 },
        { name: 'Totem Tattoo', checked: false, quantity: 1 },
      ],
    },
    {
      type: 'Body Items',
      options: [
        { name: 'Event Shop Large Item', checked: false, quantity: 1 },
        { name: 'Event Shop Small Item', checked: false, quantity: 1 },
        { name: 'Homemade Large Item', checked: false, quantity: 1 },
        { name: 'Homemade Small Item', checked: false, quantity: 1 },
        { name: 'Large Item', checked: false, quantity: 1 },
        { name: 'Small Item', checked: false, quantity: 1 },
      ],
    },
    {
      type: 'Eye Items',
      options: [
        { name: 'Meelaniks Jinx', checked: false, quantity: 1 },
        { name: 'Sivoganiks Charm', checked: false, quantity: 1 },
      ],
    },
    {
      type: 'Talismans',
      options: [
        { name: 'Forest Guardian Talisman', checked: false, quantity: 1 },
        { name: 'Good Fortune Talisman', checked: false, quantity: 1 },
        { name: 'Hollow Maw Talisman', checked: false, quantity: 1 },
        { name: 'Partnership Talisman', checked: false, quantity: 1 },
        { name: 'Storm Caller Talisman', checked: false, quantity: 1 },
        { name: 'Sun Chaser Talisman', checked: false, quantity: 1 },
        { name: 'Watchful Eye Talisman', checked: false, quantity: 1 },
      ],
    },
    {
      type: 'Charity Decor',
      options: [
        { name: 'Bouquet of Sunflowers', checked: false, quantity: 1 },
        { name: 'Cozy Reading Nook', checked: false, quantity: 1 },
        { name: 'Love For All Pack', checked: false, quantity: 1 },
        { name: 'Ribbons of Endless Hope', checked: false, quantity: 1 },
        { name: 'Seeds of Peace', checked: false, quantity: 1 },
        { name: 'Tokens of Hope', checked: false, quantity: 1 },
        { name: 'Well-Loved Book', checked: false, quantity: 1 },
      ],
    },

    {
      type: 'Other',
      options: [
        { name: 'Agas Charm', checked: false, quantity: 1 },
        { name: 'Nagruks Charm', checked: false, quantity: 1 },
        { name: 'Scar Pack', checked: false, quantity: 1 },
        { name: 'Sikrinerk Bauble', checked: false, quantity: 1 },
      ],
    },
  ];
  protected specialBaseCoat = false;
  protected baseCoatOptions: BaseCoatOption[] = [
    { base: 'Tundra', name: 'Senad 253', selected: false },
    { base: 'Tundra', name: 'Saint Val 24692', selected: false },
    { base: 'Tundra', name: 'Lemon 25971', selected: false },
    { base: 'Tundra', name: 'Fowl 73965', selected: false },
    { base: 'Tundra', name: 'Orchid 73966', selected: false },
    { base: 'Tawny', name: 'Voltaire 02', selected: false },
    { base: 'Tawny', name: 'Bear and Bird 134', selected: false },
    { base: 'Tawny', name: 'Tonga 182', selected: false },
    { base: 'Tawny', name: 'Antique Rose 445', selected: false },
    { base: 'Tawny', name: 'Keeper of Souls 4181', selected: false },
    { base: 'Tawny', name: 'Mearwen 6560', selected: false },
    { base: 'Tawny', name: 'Queen Bee 12580', selected: false },
    { base: 'Tawny', name: 'Corchran 21457', selected: false },
    { base: 'Tawny', name: 'Percy FT01', selected: false },
    { base: 'Tawny', name: 'Twonga 60032', selected: false },
    { base: 'Brown', name: 'Melisandre 45', selected: false },
    { base: 'Brown', name: 'Mythic 100', selected: false },
    { base: 'Brown', name: 'Drogo 515', selected: false },
    { base: 'Brown', name: 'Epona 600', selected: false },
    { base: 'Brown', name: 'Morzia 608', selected: false },
    { base: 'Brown', name: 'Jimothy WM31', selected: false },
    { base: 'Brown', name: 'Sundance 4300', selected: false },
    { base: 'Brown', name: 'Fenix 4600', selected: false },
    { base: 'Brown', name: 'Oogie Boogie 6310', selected: false },
    { base: 'Brown', name: 'Mabon 6420', selected: false },
    { base: 'Brown', name: 'Railyard 6666', selected: false },
    { base: 'Brown', name: 'John WM37', selected: false },
    { base: 'Brown', name: 'Vine 7234', selected: false },
    { base: 'Brown', name: 'Melanthios 7709', selected: false },
    { base: 'Brown', name: 'Redcap 9083', selected: false },
    { base: 'Brown', name: 'Whistler 23244', selected: false },
    { base: 'Brown', name: 'Artemis 63319', selected: false },
    { base: 'Brown', name: 'Dvora 65923', selected: false },
    { base: 'Black', name: 'Salem 73964', selected: false },
  ];
  protected designer = '';
  protected collaborativeDesigner = '';
  protected editsBy = '';
  protected resourcesBy = '';
  protected result = '';
  protected formResult = '';

  protected get selectedBaseCoatCount(): number {
    const detectedBases = new Set(this.getBaseCoatSelection().bases);
    return this.baseCoatOptions.filter(
      (option) => option.selected && detectedBases.has(option.base),
    ).length;
  }

  protected get maximumBaseCoats(): number {
    return this.getBaseCoatSelection().maxSelections;
  }

  protected get selectedBgStoneCount(): number {
    return (
      this.decorGroups
        .find((group) => group.type === 'BG Stones')
        ?.options.filter((option) => option.checked).length ?? 0
    );
  }

  protected get additionalPhysicalTraits(): AddablePhysicalTrait[] {
    const genoTraitNames = new Set(
      this.genoPhysicalTraits.map((trait) => trait.name.toLowerCase()),
    );
    return this.addablePhysicalTraits.filter(
      (trait) => !genoTraitNames.has(trait.name.toLowerCase()),
    );
  }

  protected get selectedAddedPhysicalTraits(): AddablePhysicalTrait[] {
    return this.addingTraits ? this.additionalPhysicalTraits.filter((trait) => trait.selected) : [];
  }

  protected get ownerHasSpaces(): boolean {
    return /\s/.test(this.ownerOrTribe);
  }

  protected get availableBaseCoatGroups(): { base: BaseName; options: BaseCoatOption[] }[] {
    const detectedBases = new Set(this.getBaseCoatSelection().bases);
    return BASE_COAT_ORDER.filter((base) => detectedBases.has(base)).map((base) => ({
      base,
      options: this.baseCoatOptions.filter((option) => option.base === base),
    }));
  }

  protected setSoulPool(enabled: boolean): void {
    this.soulPool = enabled || this.addingTraits;
    if (this.soulPool) this.formType = 'Soul Pool Form';
  }

  protected setAddingTraits(enabled: boolean): void {
    this.addingTraits = enabled;
    if (enabled) {
      this.setSoulPool(true);
    } else {
      this.addablePhysicalTraits.forEach((trait) => {
        trait.selected = false;
        trait.carried = false;
      });
    }
  }

  protected setAddedPhysicalTraitSelected(trait: AddablePhysicalTrait, selected: boolean): void {
    trait.selected = selected;
    if (selected) {
      this.setSoulPool(true);
    } else {
      trait.carried = false;
    }
  }

  protected setGeno(value: string): void {
    const carriedTraits = new Map<string, boolean>();
    this.genoPhysicalTraits.forEach((trait) => carriedTraits.set(trait.name, trait.carried));
    this.geno = value;
    this.genoPhysicalTraits = this.sectionValues(value, 'Physical Traits')
      .map((trait) => this.normalizePhysicalTrait(trait))
      .filter(Boolean)
      .map((name) => ({ name, carried: carriedTraits.get(name) ?? false }));
    const genoTraitNames = new Set(
      this.genoPhysicalTraits.map((trait) => trait.name.toLowerCase()),
    );
    this.addablePhysicalTraits.forEach((trait) => {
      if (genoTraitNames.has(trait.name.toLowerCase())) {
        trait.selected = false;
        trait.carried = false;
      }
    });
  }

  protected clearForm(): void {
    this.geno = '';
    this.genoPhysicalTraits = [];
    this.addingTraits = false;
    this.addablePhysicalTraits.forEach((trait) => {
      trait.selected = false;
      trait.carried = false;
    });
    this.litter = '';
    this.proofOfOwnership = '';
    this.registeredName = '';
    this.nicknames = '';
    this.ownerOrTribe = '';
    this.tribeOwned = false;
    this.soulPool = false;
    this.formType = 'Main Thread Form';
    this.specialBaseCoat = false;
    this.designer = '';
    this.collaborativeDesigner = '';
    this.editsBy = '';
    this.resourcesBy = '';
    this.result = '';
    this.formResult = '';
    this.decorGroups
      .flatMap((group) => group.options)
      .forEach((option) => {
        option.checked = false;
        option.quantity = 1;
      });
    this.baseCoatOptions.forEach((option) => {
      option.selected = false;
    });
  }

  private getBaseCoatSelection(): {
    bases: BaseName[];
    maxSelections: number;
  } {
    const cross = this.geno.match(/\b(Silver|Gold|Bronze)\s+Cross\b/i);
    if (cross) {
      const crossBases: Record<string, BaseName[]> = {
        Silver: ['Tundra', 'Black'],
        Gold: ['Tawny', 'Black'],
        Bronze: ['Brown', 'Black'],
      };
      const crossType = cross[1][0].toUpperCase() + cross[1].slice(1).toLowerCase();
      return { bases: crossBases[crossType], maxSelections: 2 };
    }

    if (/\bbloodmark(?:ed)?\b/i.test(this.geno)) {
      return { bases: ['Tundra', 'Brown'], maxSelections: 2 };
    }

    const roanBases: Array<[RegExp, BaseName]> = [
      [/\bsnow\s+roan\b/i, 'Tundra'],
      [/\bsand\s+roan\b/i, 'Tawny'],
      [/\bchocolate\s+roan\b/i, 'Brown'],
      [/\bslate\s+roan\b/i, 'Black'],
    ];
    const roan = roanBases.find(([pattern]) => pattern.test(this.geno));
    if (roan) return { bases: [roan[1]], maxSelections: 1 };

    const phenotype = this.extractPhenotype() ?? this.geno;
    const isChimera = /\bchimer(?:a|ism)\b/i.test(this.geno) || this.hasChimericGenotype();
    if (isChimera) {
      const sides = phenotype.split(/\s*\/\/\s*/);
      const bases = (sides.length > 1 ? sides.slice(0, 2) : [phenotype])
        .map((side) => this.findBase(side))
        .filter((base): base is BaseName => base !== undefined);
      return { bases, maxSelections: 2 };
    }

    const base = this.findBase(phenotype) ?? this.findBase(this.geno);
    return { bases: base ? [base] : [], maxSelections: 1 };
  }

  private findBase(text: string): BaseName | undefined {
    return BASE_COAT_ORDER.find((base) => new RegExp(`\\b${base}\\b`, 'i').test(text));
  }

  private normalizePhysicalTrait(value: string): string {
    return value
      .trim()
      .replace(/^Physical Trait\s*-\s*/i, '')
      .replace(/^-\s*/, '')
      .trim();
  }

  private normalizeTrait(value: string): string {
    return value
      .trim()
      .replace(/^Trait\s*-\s*/i, '')
      .replace(/^(?:-\s*)+/, '')
      .trim();
  }

  private sectionValues(source: string, heading: string): string[] {
    const lines = source.split(/\r?\n/);
    const headerName = (line: string): string =>
      line
        .trim()
        .replace(/^--\s*/, '')
        .replace(/\s*--$/, '')
        .split(':')[0]
        .trim()
        .toLowerCase();
    const start = lines.findIndex((line) => headerName(line) === heading.toLowerCase());
    if (start < 0) return [];

    const isSectionHeading = (value: string): boolean =>
      /^(?:build|breed|gender|mane(?: type)?|genotype|phenotype|hierarchy(?: status)?|health status|lineage|mutations?|non-physical traits|physical traits|hereditary traits|traits|base coats?)$/i.test(
        headerName(value),
      );
    const values: string[] = [];
    for (const line of lines.slice(start + 1)) {
      const value = line.trim();
      if (!value) continue;
      if (
        headerName(value) !== value.toLowerCase() ||
        isSectionHeading(value) ||
        /^(?:SS|SD|DS|DD|SSS|SSD|SDS|SDD|DSS|DSD|DDS|DDD|Sire|Dam)\s*:/i.test(value)
      ) {
        break;
      }
      values.push(value);
    }
    return values;
  }

  private extractPhenotype(): string | undefined {
    const labeledPhenotype = this.geno.match(/^\s*Phenotype\s*:\s*(.+)$/im)?.[1]?.trim();
    if (labeledPhenotype) return labeledPhenotype;

    const lines = this.geno.split(/\r?\n/).map((line) => line.trim());
    const phenotypeLabelIndex = lines.findIndex((line) => /^Phenotype\s*:\s*$/i.test(line));
    if (phenotypeLabelIndex >= 0) {
      for (const line of lines.slice(phenotypeLabelIndex + 1)) {
        if (!line) continue;
        if (
          /^(?:--|Build|Breed|Gender|Mane(?: Type)?|Genotype|Hierarchy(?: Status)?|Health Status|Physical Traits|Non-Physical Traits|Hereditary Traits|Traits|Base Coats?|Lineage)\s*:?\s*$/i.test(
            line,
          )
        ) {
          return undefined;
        }
        return line;
      }
      return undefined;
    }

    const genotypeIndex = lines.findIndex((line) => GENOTYPE_LINE_PATTERN.test(line));
    if (genotypeIndex < 0) return undefined;

    for (const line of lines.slice(genotypeIndex + 1)) {
      if (!line) continue;
      if (
        /^(?:--|Build|Breed|Gender|Mane(?: Type)?|Phenotype|Hierarchy(?: Status)?|Health Status|Hereditary Traits|Non-Physical Traits|Physical Traits|Traits|Base Coats?|Lineage)\s*:?\s*$/i.test(
          line,
        )
      ) {
        return undefined;
      }
      return line;
    }
    return undefined;
  }

  private hasChimericGenotype(): boolean {
    return this.geno
      .split(/\r?\n/)
      .some((line) => GENOTYPE_LINE_PATTERN.test(line.trim()) && line.includes('//'));
  }

  protected generarResultado(): void {
    var error = false;
    this.result = '';
    this.formResult = '';
    if (
      !this.geno.trim() ||
      !this.litter.trim() ||
      !this.proofOfOwnership.trim() ||
      !this.ownerOrTribe.trim() ||
      !this.designer.trim()
    ) {
      this.result += 'Please fill all the required values before generating.';
      error = true;
    }
    if (!this.tribeOwned && this.ownerHasSpaces) {
      this.result += '<br>Owner usernames cannot contain spaces.';
      error = true;
    }
    const selectedDecor = this.decorGroups
      .flatMap((group) => group.options)
      .filter((option) => option.checked);
    const selectedAddedTraits = this.selectedAddedPhysicalTraits;
    if (this.addingTraits && selectedAddedTraits.length === 0) {
      this.result += '<br>Select at least one physical trait to add.';
      error = true;
    }
    const selectedBgStones =
      this.decorGroups
        .find((group) => group.type === 'BG Stones')
        ?.options.filter((option) => option.checked) ?? [];
    if (selectedBgStones.length > 1 || selectedBgStones.some((option) => option.quantity !== 1)) {
      this.result += '<br>Select only one BG stone with a quantity of 1.';
      error = true;
    }
    if (
      this.soulPool &&
      selectedDecor.length === 0 &&
      selectedAddedTraits.length === 0 &&
      !this.addingTraits
    ) {
      this.result += '<br>Select at least one decor item for Soul Pool.';
      error = true;
    }
    if (
      this.soulPool &&
      selectedDecor.some(
        (option) =>
          !Number.isInteger(option.quantity) || option.quantity === null || option.quantity < 1,
      )
    ) {
      this.result += '<br>Enter a whole quantity of at least 1 for each selected decor item.';
      error = true;
    }
    const baseCoatSelection = this.getBaseCoatSelection();
    const detectedBases = new Set(baseCoatSelection.bases);
    if (this.specialBaseCoat && detectedBases.size === 0) {
      this.result += '<br>No base could be detected. Please provide a clearer Geno.';
      error = true;
    }
    if (this.specialBaseCoat) {
      const staleSelections = this.baseCoatOptions.filter(
        (option) => option.selected && !detectedBases.has(option.base),
      );
      if (staleSelections.length > 0) {
        staleSelections.forEach((option) => (option.selected = false));
        this.result += '<br>Selections for bases not present in this Geno were cleared.';
        error = true;
      }
    }
    const selectedBaseCoats = this.baseCoatOptions.filter(
      (option) => option.selected && detectedBases.has(option.base),
    );
    if (this.specialBaseCoat && selectedBaseCoats.length === 0) {
      this.result += '<br>Select at least one special base coat from the detected bases.';
      error = true;
    }
    if (this.specialBaseCoat && selectedBaseCoats.length > baseCoatSelection.maxSelections) {
      this.result += `<br>Select no more than ${baseCoatSelection.maxSelections} base coat${baseCoatSelection.maxSelections === 1 ? '' : 's'} for this Geno.`;
      error = true;
    }
    if (error) {
      this.formResult = this.result;
      return;
    }

    const genoLines = this.geno.split(/\r?\n/).map((line) => line.trim());
    const fieldLabelPattern =
      /^(?:Build|Breed|Gender|Mane(?: Type)?|Genotype|Phenotype|Hierarchy(?: Status)?|Health Status|Physical Traits|Non-Physical Traits|Hereditary Traits|Traits|Base Coats?|Lineage|Sire|Dam)\s*:?\s*$/i;
    const ancestryLabelPattern = /^(?:SS|SD|DS|DD|SSS|SSD|SDS|SDD|DSS|DSD|DDS|DDD)\s*:\s*$/i;
    const getValue = (source: string, label: string): string | undefined => {
      const lines = source.split(/\r?\n/);
      const labelPattern = new RegExp(`^\\s*${label}\\s*:\\s*(.*)$`, 'i');
      const index = lines.findIndex((line) => labelPattern.test(line));
      if (index < 0) return undefined;

      const inlineValue = lines[index].match(labelPattern)?.[1]?.trim();
      if (inlineValue) return inlineValue;

      for (const line of lines.slice(index + 1)) {
        const value = line.trim();
        if (!value) continue;
        if (
          fieldLabelPattern.test(value) ||
          ancestryLabelPattern.test(value) ||
          /^--.*--$/.test(value)
        ) {
          return undefined;
        }
        return value;
      }
      return undefined;
    };
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
    const identityLine = genoLines.find((line) =>
      /^(?:\d+\)\s*)?(?:Male|Female)\s*(?:-|,)\s*.+\bMane\b/i.test(line),
    );
    const identity = identityLine?.match(
      /^(?:\d+\)\s*)?(Male|Female)\s*(?:-|,)\s*(.+?)\s*Mane\b(?:\s*\(([^)]+?)\s+Variant\))?/i,
    );
    const rawManeType =
      getValue(this.geno, 'Mane Type') ??
      getValue(this.geno, 'Mane') ??
      (identity ? `${identity[2]}${identity[3] ? ` (${identity[3]})` : ''}` : undefined);
    const maneType = MANE_TYPES.find(
      (mane) => mane.toLowerCase() === rawManeType?.trim().toLowerCase(),
    );
    const maneTypePlaceholder = `(${MANE_TYPES.join('/')})`;
    const statusLine = genoLines.find((line) =>
      /^(?:Submissive|Average)\s*-\s*(?:Healthy|Inbred)\b/i.test(line),
    );
    const status = statusLine?.match(
      /^(Submissive|Average)\s*-\s*(Healthy|Inbred)(?:\s*-\s*(.+))?/i,
    );
    const normalizeBuildLine = (line: string): string =>
      line
        .trim()
        .toLowerCase()
        .replace(/\s*-\s*/g, '-')
        .replace(/\s+/g, ' ');
    const buildType = BUILD_TYPES.find((build) =>
      genoLines.some((line) =>
        normalizeBuildLine(line).includes(normalizeBuildLine(build.genoLine)),
      ),
    );
    const breed = buildType?.breed ?? getValue(this.geno, 'Breed');
    const genotypeIndex = genoLines.findIndex((line) => GENOTYPE_LINE_PATTERN.test(line));
    const genotype =
      getValue(this.geno, 'Genotype') ??
      (genotypeIndex >= 0 ? genoLines[genotypeIndex].replace(/^Genotype\s*:\s*/i, '') : undefined);
    const phenotype = getValue(this.geno, 'Phenotype') ?? this.extractPhenotype();
    const mutationRules: Array<[string, RegExp]> = [
      ['Albino', /\balbino\b/i],
      ['Bloodmarked', /\bbloodmark(?:ed)?\b/i],
      ['Bronze Cross', /\bbronze cross\b/i],
      ['Chimerism', /\b(?:chimerism|chimera)\b/i],
      ['Gold Cross', /\bgold cross\b/i],
      ['Harlequin', /\bharlequin\b/i],
      ['Iridescent', /\b(?:iridescent|iridescence)\b/i],
      ['Leucistic', /\bleucistic\b/i],
      ['Marbled', /\bmarbled\b/i],
      ['Melanistic', /\bmelanistic\b/i],
      ['Obsidian', /\bobsidian\b/i],
      ['Reversal', /\breversal\b/i],
      ['Silver Cross', /\bsilver cross\b/i],
    ];
    const mutations = mutationRules
      .filter(
        ([name, pattern]) =>
          pattern.test(phenotype ?? '') || (name === 'Chimerism' && genotype?.includes('//')),
      )
      .map(([name]) => `Mutation - ${name}`);

    const lineageSources = [this.litter, this.geno];
    const ancestryKeys = [
      'SS',
      'SD',
      'DS',
      'DD',
      'SSS',
      'SSD',
      'SDS',
      'SDD',
      'DSS',
      'DSD',
      'DDS',
      'DDD',
    ] as const;
    const ancestry = new Map<string, string>();
    for (const source of lineageSources) {
      const lines = source.split(/\r?\n/);
      for (let index = 0; index < lines.length; index++) {
        const match = lines[index].match(
          /^\s*(SS|SD|DS|DD|SSS|SSD|SDS|SDD|DSS|DSD|DDS|DDD)\s*:\s*(.*?)\s*$/i,
        );
        if (!match || ancestry.has(match[1].toUpperCase())) continue;

        const inlineValue = match[2].trim();
        const nextLine = lines
          .slice(index + 1)
          .map((line) => line.trim())
          .find(Boolean);
        const nextValue =
          nextLine &&
          !fieldLabelPattern.test(nextLine) &&
          !ancestryLabelPattern.test(nextLine) &&
          !/^--.*--$/.test(nextLine)
            ? nextLine
            : undefined;
        const value = inlineValue || nextValue;
        if (value) ancestry.set(match[1].toUpperCase(), value);
      }
    }
    const parentLine = this.litter
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => /\s+[x×]\s+/i.test(line));
    const parents = parentLine?.match(/^(.+?)\s+[x×]\s+(.+)$/i);
    const sire =
      lineageSources.map((source) => getValue(source, 'Sire')).find((value) => value) ??
      parents?.[1]?.trim();
    const dam =
      lineageSources.map((source) => getValue(source, 'Dam')).find((value) => value) ??
      parents?.[2]?.trim();
    const formatLineageValue = (value: string | undefined): string => {
      if (!value) return 'Unknown';
      const link = value.match(
        /^\[([^\]]+)\]\((https:\/\/(?:www\.)?tokotna\.com\/imports\/index\.php\?id=\d+)\)$/i,
      );
      if (link) {
        return `<a href="${escapeHtml(link[2])}" target="_blank" rel="noopener noreferrer">${escapeHtml(link[1])}</a>`;
      }

      const numberedParent = value.match(/^(.+?)\s+(\d+)$/);
      if (!numberedParent) return escapeHtml(value);
      return `<a href="https://tokotna.com/imports/index.php?id=${numberedParent[2]}" target="_blank" rel="noopener noreferrer">${escapeHtml(value)}</a>`;
    };
    const ancestryLines = ancestryKeys.flatMap((key) => {
      const value = ancestry.get(key);
      return value && !/^unknown$/i.test(value) ? [`${key}: ${formatLineageValue(value)}`] : [];
    });
    const physicalTraits =
      this.sectionValues(this.litter, 'Physical Traits').length > 0
        ? this.sectionValues(this.litter, 'Physical Traits')
        : this.sectionValues(this.geno, 'Physical Traits');
    const importedPhysicalTraits = [
      ...physicalTraits.map((trait) => {
        const name = this.normalizePhysicalTrait(trait);
        const carried = this.genoPhysicalTraits.some(
          (genoTrait) => genoTrait.name.toLowerCase() === name.toLowerCase() && genoTrait.carried,
        );
        return `Physical Trait - ${escapeHtml(name)}${carried ? ' (Carried)' : ''}`;
      }),
      ...selectedAddedTraits.map(
        (trait) => `Physical Trait - ${escapeHtml(trait.name)}${trait.carried ? ' (Carried)' : ''}`,
      ),
    ];
    const traits = [
      ...this.sectionValues(this.geno, 'Hereditary Traits'),
      ...this.sectionValues(this.geno, 'Non-Physical Traits'),
      ...this.sectionValues(this.geno, 'Traits'),
    ];
    const baseCoats = this.specialBaseCoat
      ? selectedBaseCoats.map((option) => `Base Coat - ${option.name}`)
      : ['Base Coat - Guide Swatch'];
    const health = status?.[3]
      ? `${status[2]} - ${status[3]}`
      : (status?.[2] ?? getValue(this.geno, 'Health Status'));
    const redPlaceholder = (value: string): string =>
      `<span class="text-danger">${escapeHtml(value)}</span>`;
    const renderValue = (value: string | undefined, placeholder: string): string =>
      value?.trim() && !/^unknown$/i.test(value.trim())
        ? escapeHtml(value)
        : redPlaceholder(placeholder);
    const informationPlaceholder = redPlaceholder('add information here');
    const ownerOrTribe = this.ownerOrTribe.trim()
      ? escapeHtml(this.ownerOrTribe.trim())
      : informationPlaceholder;
    const registeredName = escapeHtml(this.registeredName.trim());
    const nicknames = escapeHtml(this.nicknames.trim());
    const bracketedName = (value: string): string => {
      const trimmed = value.trim();
      const bracketed = trimmed.startsWith('[') && trimmed.endsWith(']') ? trimmed : `[${trimmed}]`;
      return escapeHtml(bracketed);
    };
    const formatProofOfOwnership = (value: string): string => {
      const trimmed = value.trim();
      const markdownLink = trimmed.match(/^\[([^\]]+)\]\((https:\/\/[^\s)]+)\)$/i);
      if (markdownLink) {
        return `<a href="${escapeHtml(markdownLink[2])}" target="_blank" rel="noopener noreferrer">${escapeHtml(markdownLink[1])}</a>`;
      }
      if (/^https:\/\/[^\s<>]+$/i.test(trimmed)) {
        const safeUrl = escapeHtml(trimmed);
        return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${safeUrl}</a>`;
      }
      return escapeHtml(trimmed);
    };

    const profile = [
      `**Registered Name:** ${registeredName}`,
      `**Nickname(s):** ${nicknames}`,
      this.tribeOwned ? `**Tribe:** ${ownerOrTribe}` : `**Owner:** ${ownerOrTribe}`,
      '**Species:** [Tokotas](https://www.deviantart.com/tokotas)',
      `**Breed:** ${renderValue(breed, 'add information here')}`,
      `**Gender:** ${renderValue(getValue(this.geno, 'Gender') ?? identity?.[1], '(Male/Female)')}`,
      `**Mane Type:** ${renderValue(maneType, maneTypePlaceholder)}`,
      `**Genotype:** ${renderValue(genotype, 'add information here')}`,
      `**Phenotype:** ${renderValue(phenotype, 'add information here')}`,
      `**Hierarchy Status:** ${renderValue(getValue(this.geno, 'Hierarchy Status') ?? getValue(this.geno, 'Hierarchy') ?? status?.[1], '(Submissive/Average)')}`,
      `**Health Status:** ${renderValue(health, '(Healthy/Inbred) - (Infertile, Sterile, Spinal Defects, Blind, Deaf, Frail, Lame)')}`,
      '**Mutations:**',
      ...mutations,
      '',
      ...(this.soulPool
        ? [
            '**-- SOUL POOL ONLY --',
            'Items:**',
            ...selectedDecor.map(
              (option) =>
                `Decor - ${escapeHtml(option.name)} x${option.quantity} <span class="text-danger">(Decor Comment Here)</span>`,
            ),
            '**-- SOUL POOL ONLY -- Remove for Main Thread**',
            '',
          ]
        : []),
      '',
      '**Physical Traits:**',
      ...(importedPhysicalTraits.length > 0
        ? importedPhysicalTraits
        : ['Copy and Paste from [Import Item References](https://tokotna.com/refs/)']),
      '',
      '**Traits:**',
      ...(traits.length > 0
        ? traits.map((trait) => `Trait - ${escapeHtml(this.normalizeTrait(trait))}`)
        : ['Copy and Paste from [Import Item References](https://tokotna.com/refs/)']),
      '',
      '**Base Coats:**',
      ...(baseCoats.length > 0
        ? baseCoats.map(escapeHtml)
        : ['Copy and Paste from [Import Item References](https://tokotna.com/refs/)']),
      '',
      '**Lineage:**',
      `Sire: ${formatLineageValue(sire)}`,
      `Dam: ${formatLineageValue(dam)}`,
      ...ancestryLines,
      '',
      `**Designer:** ${bracketedName(this.designer.trim() || '[da name]')}`,
      ...(this.collaborativeDesigner.trim()
        ? [`and: ${bracketedName(this.collaborativeDesigner)}`]
        : []),
      ...(this.editsBy.trim() ? [`with edits by: ${bracketedName(this.editsBy)}`] : []),
      ...(this.resourcesBy.trim()
        ? [`using resources by: ${bracketedName(this.resourcesBy)}`]
        : []),
    ].join('\n');

    const formTemplate = [
      this.tribeOwned
        ? '**Bonuses & Monthly Limits**: (Provide link to your Tokotna Bonuses & Monthly Limits Page)'
        : `**Bonuses & Monthly Limits**: [${escapeHtml(this.ownerOrTribe.trim())}'s Bonuses & Monthly Limits](https://tokotna.com/profile/limits/index.php?user=${encodeURIComponent(this.ownerOrTribe.trim())})`,
      ...(this.formType === 'Soul Pool Form'
        ? ['**-- Using Dire Dunks Macchiato**: <span class="text-danger">Yes/No</span>']
        : []),
      '**Full Geno**:',
      escapeHtml(this.geno.trim()),
      `**Proof of Ownership**: ${formatProofOfOwnership(this.proofOfOwnership)}`,
      ...(this.formType === 'Design Den Form'
        ? [
            '**Design Requests**: <span class="text-danger">(eye color, choice of free background, design preferences, etc.)</span>',
          ]
        : [
            this.specialBaseCoat
              ? `**Base coat from**: ${selectedBaseCoats.map((option) => option.name).join(' / ')} <span class="text-danger">Swatch available due to [Sire/DS/SDD/etc.] [Tokotna link] **OR** Directly picked from [Sire/DS/SDD/etc.] [Tokotna link]</span>`
              : '**Base coat from**: Guide Swatch',
          ]),
      ...(this.formType === 'Soul Pool Form'
        ? [
            '**Items Using**:',
            '**-- Special**: <span class="text-danger">(PotA Token / SPW / HP Tokens, etc.)</span>',
            ...(selectedAddedTraits.length > 0
              ? [
                  `x${selectedAddedTraits.length} SPW (${selectedAddedTraits.map((trait) => escapeHtml(trait.name)).join(', ')})`,
                ]
              : []),
            '**-- Decor**:',
            ...selectedDecor.map(
              (option) =>
                `x${option.quantity} ${escapeHtml(option.name)} <span class="text-danger">(Decor Comment Here)</span>`,
            ),
            '',
            '**Remove/Buy for You?**:  <span class="text-danger">Yes/No</span> ([See description](https://tokotna.com/tokopedia/index.php?name=Design+Central+Rules#spbuy))',
            '',
            '<span class="text-danger">PotAing Double Merle? [Add these lines to your form](https://tokotna.com/tokopedia/index.php?name=Design+Central+Rules#mrlmrl)</span>',
          ]
        : []),
    ].join('\n');
    const renderText = (text: string): string =>
      text
        .replace(
          /\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g,
          '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
        )
        .replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\r?\n/g, '<br>');
    this.result = renderText(profile);
    this.formResult = renderText(formTemplate);
  }
}
