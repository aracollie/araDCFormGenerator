import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RAW_MANE_TYPES } from '../shared/mane-types';
import { BUILDS, type Build, COMPATIBLE } from '../shared/builds';
import { escapeHtml } from '../shared/text-utils';
import { AGA_SPRITE, BOOSTERS, CONSUMABLE_EXTRA_SPOT_WORDS, CONSUMABLE_ROOTS, CONSUMABLE_SUPP_COUNT, createTraitItems, DEFAULT_SUPP_ITEMS, EXTRA_SLOT_OPTIONS, FACTIONS, FormType, LitterMode, OTHER_GROUPS, PotlTo, ROOT_TYPES, SUPP_RULES, TALISMAN_EXTRA_SLOT, TALISMAN_EXTRA_SLOT_CHOICES, TraitItem } from './breeding-data';



function toggleIn(list: string[], name: string, checked: boolean): string[] {
  return checked ? [...list, name] : list.filter((item) => item !== name);
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
  protected extraSlot = '';
  protected extraSlotChoice = '';
  protected readonly talismanExtraSpot = TALISMAN_EXTRA_SLOT;
  protected readonly talismanExtraSpotChoices = TALISMAN_EXTRA_SLOT_CHOICES;
  usingRoot = false;
  protected selectedBoosters: string[] = [];
  protected selectedOther: string[] = [];
  protected traitItems: TraitItem[] = createTraitItems();
  protected stylistToken = { checked: false, target: '' };
  protected soulPoolPebble = { checked: false, target: '' };
  protected maneTypes = RAW_MANE_TYPES;
  protected meelSprite = { checked: false, target: '' };
  protected result = '';
  protected massRemove = '';

  protected get title(): string {
    return this.formType + ' Thread Breeding Request Form';
  }

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
    return EXTRA_SLOT_OPTIONS[this.formType];
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

  setExtraSpot(value: string): void {
    this.extraSlot = value;
    this.extraSlotChoice = '';
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
      this.extraSlot = '';
      this.extraSlotChoice = '';
    } else {
      this.litterSupps = '';
      this.extraSlot = '';
      this.extraSlotChoice = '';
    }

    this.formType = value;
  }

  setLitterMode(value: LitterMode) {
    if (value === 'full') {
      this.splitPartner = '';
      this.potlTo = '';
    }
    this.litterMode = value;
  }

  private cleanUsername(input: HTMLInputElement): string {
    const clean = input.value.replace(/\s/g, '');
    input.value = clean;
    return clean;
  }

  setUsername(input: HTMLInputElement): void {
    this.username = this.cleanUsername(input);
  }

  setSplitPartner(input: HTMLInputElement): void {
    this.splitPartner = this.cleanUsername(input);
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
      item.increase = null;
      item.target = '';
    }
  }
  clearForm() {
    this.sireBuild = 'Tokota';
    this.damBuild = 'Tokota';
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
    this.extraSlot = '';
    this.extraSlotChoice = '';
    this.usingRoot = false;
    this.selectedBoosters = [];
    this.selectedOther = [];
    this.traitItems = createTraitItems();
    this.stylistToken = { checked: false, target: '' };
    this.soulPoolPebble = { checked: false, target: '' };
    this.result = '';
    this.massRemove = '';
    this.meelSprite = { checked: false, target: '' };
  }

  generate() {
    const errors: string[] = [];
    const rollIfInjuriesLine = this.rollInjuries ? 'Yes' : 'No';
    const usingTribeBonusLine = this.useTribeBonus ? 'Yes' : 'No';
    const selectedExtraSpot =
      this.extraSlot === TALISMAN_EXTRA_SLOT ? this.extraSlotChoice : this.extraSlot;
    const extraSlotLine = this.useExtraSpot ? `Yes - ${selectedExtraSpot}` : 'No';

    if (!this.sireBuild) errors.push('Select a Sire build.');
    if (!this.damBuild) errors.push('Select a Dam build.');
    if (!this.username.trim()) {
      errors.push('Enter your username.');
    } else if (/\s/.test(this.username)) {
      errors.push('Your username cannot contain spaces.');
    }
    if (!this.canPair(this.sireBuild, this.damBuild)) {
      errors.push('The selected builds are not compatible.');
    }

    if (this.litterMode === 'split') {
      if (!this.splitPartner.trim()) {
        errors.push('Enter the split partner.');
      } else if (/\s/.test(this.splitPartner)) {
        errors.push('The split partner username cannot contain spaces.');
      }
      if (!this.potlTo) errors.push('Choose who receives the POTL.');
    }

    if (this.useExtraSpot && !this.extraSlot) {
      errors.push('Select an extra breeding spot.');
    }
    if (this.useExtraSpot && this.extraSlot === TALISMAN_EXTRA_SLOT && !this.extraSlotChoice) {
      errors.push('Choose an option for the Talisman extra spot.');
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
        if (item.name !== 'Blessed Union' && item.increase === null) {
          errors.push(`Choose Increase or Decrease for ${item.name}.`);
        }
      });
    if (this.stylistToken.checked && !this.stylistToken.target.trim()) {
      errors.push(
        'For Stylist Token: Enter selected Gene, Mane, Physical Trait, or Non-Physical Trait',
      );
    }

    if (this.meelSprite.checked && !this.meelSprite.target.trim()) {
      errors.push(
        'For Meelanik Sprite: Enter selected Gene, Mane, Physical Trait, or Non-Physical Trait',
      );
    }
    if (this.soulPoolPebble.checked && !this.soulPoolPebble.target) {
      errors.push('Select a Mane for Soul Pool Pebble.');
    }
    const hasBlessedUnion = this.traitItems.some((i) => i.checked && i.name === 'Blessed Union');
    if (hasBlessedUnion && !(this.useExtraSpot && selectedExtraSpot === 'Breeding Image')) {
      errors.push('Blessed Union can only be used with a Breeding Image');
    }

    if (
      (this.stylistToken.checked && this.meelSprite.checked) ||
      (this.stylistToken.checked && hasBlessedUnion) ||
      (this.meelSprite.checked && hasBlessedUnion)
    ) {
      errors.push(
        'Only one of these can be selected: [Stylist Token, Meelanik Sprite, Blessed Union]',
      );
    }

    if (
      this.selectedOther.includes('Feminine Potion') &&
      this.selectedOther.includes('Masculine Potion')
    ) {
      errors.push('You can only select One Gender Potion.');
    }
    if (errors.length > 0) {
      this.massRemove = '';
      this.result = errors.join('<br>');
      return;
    }

    let litterLine = 'Full to me';
    if (this.litterMode === 'split') {
      const partner = this.splitPartner.trim();
      const safePartner = escapeHtml(partner);
      const potl = this.potlTo === 'me' ? 'me' : safePartner;
      litterLine = `Split with @${safePartner} - POTL to ${potl}`;
    }

    let splitLimitsLine = '-';
    if (this.litterMode === 'split') {
      const partner = this.splitPartner.trim();
      splitLimitsLine = `[${escapeHtml(partner)}'s Tokotna Bonuses & Monthly Limits](https://tokotna.com/profile/limits/index.php?user=${encodeURIComponent(partner)})`;
    }
    let inbreedingLine = 'No';
    if (this.inbreeding) {
      inbreedingLine = 'Yes';
      if (this.lastLineInbreeding) {
        inbreedingLine += ' - Last Line';
      }
    }

    let largeBag = 0;
    let smallBag = 0;
    const traitLines = this.traitItems
      .filter((i) => i.checked)
      .map((i) => {
        const target = escapeHtml(i.target.trim());
        const name = escapeHtml(i.name);
        const direction = i.increase === null ? '' : `${i.increase ? 'Increase' : 'Decrease'} `;
        if (i.hasBag) {
          if (i.bag === 'Large') {
            largeBag += 1;
          } else {
            smallBag += 1;
          }
        }
        return i.hasBag
          ? `${i.bag} Sacrificial Bag (${name} - ${direction}${target})`
          : `${name} (${target})`;
      });
    const stylistTokenLine = this.stylistToken.checked
      ? `Stylist Token (${escapeHtml(this.stylistToken.target.trim())})`
      : undefined;

    const meelSpriteLine = this.meelSprite.checked
      ? `Meelanik Sprite (${escapeHtml(this.meelSprite.target.trim())})`
      : undefined;
    const soulPoolPebbleLine = this.soulPoolPebble.checked
      ? `Soul Pool Pebble (${escapeHtml(this.soulPoolPebble.target)})`
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
    ];
    const massResultSupp: string[] = [];

    let middlePart: string[] = [];
    if (this.formType === 'Main') {
      middlePart = [`**- Litter Size Supps:** ${this.litterSupps.trim() ? this.litterSupps : '-'}`];
      if (this.suppItems.indexOf(this.litterSupps) < CONSUMABLE_SUPP_COUNT && this.litterSupps)
        massResultSupp.push(this.litterSupps);
    } else {
      middlePart = [`**- Fertility Root:** ${this.usingRoot ? `Yes - ${this.rootType}` : 'No'}`];
      if (this.usingRoot) {
        if (CONSUMABLE_ROOTS.includes(this.rootType)) massResultSupp.push(this.rootType);
      }
    }
    const otherLines = [
      ...this.selectedOther,
      ...(stylistTokenLine ? [stylistTokenLine] : []),
      ...(meelSpriteLine ? [meelSpriteLine] : []),
      ...(soulPoolPebbleLine ? [soulPoolPebbleLine] : []),
    ];
    otherLines.sort();
    otherLines.push(...traitLines);

    const lastPart = [
      `**- Build Supps**: ${[...this.selectedBoosters].sort().join(', ') || '-'}`,
      `**- Other:** ${otherLines.length > 0 ? otherLines.join(', ') : '-'}`,
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

    const itemUsed = [
      ...massResultSupp,
      ...this.selectedBoosters,
      ...[...this.selectedOther].sort(),
    ];

    if (this.stylistToken.checked) {
      itemUsed.push('Stylist Token');
    }
    if (this.soulPoolPebble.checked) {
      itemUsed.push('Soul Pool Pebble');
    }

    const extraItem = this.useExtraSpot ? selectedExtraSpot : '';
    const extraConsumed = CONSUMABLE_EXTRA_SPOT_WORDS.some((k) => extraItem.includes(k));
    let massRemoveResult = '';
    massRemoveResult += [
      ...itemUsed.map((item) => `${item} x 1`),
      ...(largeBag > 0 ? [`Large Sacrificial Bag x ${largeBag}`] : []),
      ...(smallBag > 0 ? [`Small Sacrificial Bag x ${smallBag}`] : []),
      ...(extraConsumed ? [`${extraItem} x 1`] : []),
    ].join(', ');

    this.massRemove = massRemoveResult;
    this.result = renderText(profile);
  }
}
