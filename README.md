# Tokotna DC Form Generator

An Angular web app that turns Tokotna Geno and lineage information into copy-ready Design Central Import and Design Central forms.

## Requirements

- Node.js and npm

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200). The development server reloads when source files change.

## Deploy to Netlify

The repository's `netlify.toml` configures Netlify to run `npm run build` and publish `dist/tokoDCFormGenerator/browser`. Keep the publish directory aligned with Angular's browser output if the build configuration changes.

## Use the generator

1. Paste the Geno into **Geno**. For an on-site Geno, paste from **Build** through **Lineage**.
2. Paste litter or lineage information into **Litter or Abando Result**.
3. Enter the required proof-of-ownership link, owner (or tribe), and designer.
4. Review the parsed physical traits. Check **Carried** where applicable.
5. Optionally add physical traits, select a special base coat, configure Soul Pool decor, or fill in names and design credits.
6. Choose a Design Central form type and select **Generate result**.
7. Review both generated forms for correctness before copying them.

Required fields and values that need manual attention are highlighted in red. The app does not submit forms to Tokotna.

## Geno parsing

The parser supports standard Geno text as well as labeled fields whose values appear on the same line or the following line. It recognizes gender, mane, genotype, phenotype, hierarchy, health, build, breed, physical traits, hereditary/non-physical traits, and lineage.

Trait sections may use headers such as `--Physical Traits:--`, `Hereditary Traits:`, or `Non-Physical Traits`. List prefixes and an existing `Trait -` prefix are removed before traits are formatted in the Import Form.

Build and mane values are checked against registries in `src/app/app.ts`:

- `BUILD_TYPES` maps a Geno line to its breed. Matching is case-insensitive and checks whether a normalized Geno line contains the configured `genoLine`. Current mappings include Tokota, Tokhara, Sinaka, Odonyx, Akota, Dakino, Miralta, Makhata, Toki, and Dire percentages from 10% to 100%.
- `MANE_TYPES` lists the accepted mane names. Unrecognized mane values are highlighted for review.
- `ADDABLE_PHYSICAL_TRAIT_NAMES` lists physical traits available when **ADDING TRAITS** is enabled.

To add a build, append an entry to `BUILD_TYPES`, for example:

```ts
{ genoLine: 'New Build', breed: 'Canarctos example' },
```

The Geno line must contain the configured `genoLine`. Because matching uses containment, choose a distinctive string to avoid unintended matches.

## Optional form features

- **Physical traits:** Geno physical traits can be marked as carried. Added traits are included in the Import Form; adding traits requires Soul Pool and lists one SPW per added trait in the Design Central form.
- **Soul Pool:** Select decor and quantities. BG Stones are limited to one item with a quantity of one.
- **Special Base Coat:** Shows coat choices detected from the Geno and validates selections against the detected bases.
- **Lineage:** Sire, Dam, and Tokotna ancestry IDs/links can be read from the Geno or the litter/lineage input.
- **Form type:** Main Thread, New Members, Design Den, or Soul Pool.

## Commands

```bash
npm start       # Start the development server
npm run build   # Create a production build in dist/
npm test        # Run the configured unit-test runner
```

## Technology

- Angular
- Bootstrap 5
