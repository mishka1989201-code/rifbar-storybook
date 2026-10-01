# Storybook Setup — Config, Addons, and Folder Structure

---

## Installation

Always pin to a specific major version to avoid dependency conflicts.

**React + Vite (recommended for most projects):**
```bash
npm create storybook@8 -- --type react
# or for existing projects:
npx storybook@8 init
```

**React + TypeScript:**
```bash
npx storybook@8 init
# Storybook auto-detects TypeScript
```

**Vue 3:**
```bash
npx storybook@8 init
# auto-detects Vue
```

**React Native:**
Storybook for React Native uses a separate package:
```bash
npx sb@8 init --type react_native
```

**Pin all packages to the same major version to prevent conflicts:**
```bash
npm install storybook@8 @storybook/react@8 @storybook/react-vite@8 @storybook/addon-essentials@8
```

---

## Essential addons

Install these for every project:

```bash
npm install -D \
  @storybook/addon-essentials@8 \
  @storybook/addon-a11y@8 \
  @storybook/addon-designs \
  @chromatic-com/storybook
```

| Addon | Purpose |
|-------|---------|
| `addon-essentials` | Controls, Docs, Viewport, Backgrounds, Actions — all in one |
| `addon-a11y` | Accessibility audit panel on every story |
| `addon-designs` | Embed Figma designs alongside stories |
| `@chromatic-com/storybook` | Visual testing + publishing (required for Storybook Connect) |

---

## .storybook/main.ts

```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',  // auto-generate docs for tagged stories
  },
};

export default config;
```

---

## .storybook/preview.ts

```typescript
import type { Preview } from '@storybook/react';
import '../src/tokens/build/tokens.css'; // import design tokens

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: 'var(--bg-canvas)' },
        { name: 'dark', value: '#0B0D12' },
      ],
    },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
};

export default preview;
```

---

## Project folder structure

```
project-root/
├── .storybook/
│   ├── main.ts              ← Storybook config, addons
│   └── preview.ts           ← global decorators, token imports
│
├── src/
│   ├── components/
│   │   └── Button/
│   │       ├── Button.tsx
│   │       ├── Button.css
│   │       ├── Button.stories.tsx   ← stories
│   │       ├── Button.mdx           ← documentation page
│   │       └── index.ts
│   │
│   ├── foundations/                 ← token documentation stories
│   │   ├── Colors.stories.tsx
│   │   ├── Typography.stories.tsx
│   │   ├── Spacing.stories.tsx
│   │   ├── Radius.stories.tsx
│   │   └── Changelog.stories.tsx
│   │
│   └── tokens/
│       ├── tokens.json              ← source (synced from Figma or manual)
│       ├── tokens.dark.json         ← dark mode values
│       ├── guidelines.json          ← usage descriptions from Figma
│       └── build/                   ← auto-generated, never edit manually
│           ├── tokens.css
│           └── tokens.js
│
├── build-tokens.js                  ← Style Dictionary config
├── generate-changelog.js            ← changelog generator
└── package.json
```

---

## Foundations stories — what to create

Every design system Storybook needs these foundation pages:

**Colors.stories.tsx** — shows all semantic tokens as color swatches with hex values, token names, and usage descriptions pulled from guidelines.json.

**Typography.stories.tsx** — shows each text style (heading-1 through caption) rendered at actual size with token name, font-size, weight, line-height.

**Spacing.stories.tsx** — shows each spacing token as a horizontal bar with pixel value and token name.

**Radius.stories.tsx** — shows each radius token applied to a square with label.

**Changelog.stories.tsx** — shows before/after comparisons with color swatches for every token change. Much more useful than a text changelog.

---

## Running Storybook

```bash
# Development
npm run storybook

# Build static site
npm run build-storybook

# Publish to Chromatic (required for Storybook Connect with Figma)
npx chromatic --project-token=<your-token>
```

---

## Deploying Storybook

**Option 1 — Chromatic (recommended, free tier available):**
```bash
npm install -D chromatic
npx chromatic --project-token=YOUR_TOKEN
```
Connect GitHub repo → auto-deploys on every push. Gives you visual regression testing and enables the Storybook Connect Figma plugin.

**Option 2 — Vercel / Netlify:**
Build command: `npm run build-storybook`  
Output directory: `storybook-static`  
Works on free tier for both platforms.

**Option 3 — GitHub Pages:**
```bash
npm install -D storybook-deployer
npx storybook-to-ghpages
```

---

## Dark mode support

Install the dark mode addon:
```bash
npm install -D storybook-dark-mode
```

Add to `.storybook/main.ts` addons array: `'storybook-dark-mode'`

In `preview.ts`:
```typescript
import { themes } from '@storybook/theming';

const preview: Preview = {
  parameters: {
    darkMode: {
      dark: { ...themes.dark },
      light: { ...themes.normal },
      stylePreview: true,
    },
  },
};
```

Apply theme class to preview root:
```typescript
// preview.ts
export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    return <Story />;
  },
];
```

---

## Troubleshooting

**"Storybook shows blank pages"**  
Style Dictionary transforms token names. `color/primary/500` becomes `ColorPrimary500` in JS output (PascalCase). Check `build/json/tokens.json` for actual key names and match your story filters to those.

**"Version conflicts"**  
All Storybook packages must be on the same major version. Check `package.json` and align: `storybook@8`, `@storybook/react@8`, `@storybook/react-vite@8`, `@storybook/addon-essentials@8`.

**"npm run build:tokens fails"**  
Add `"type": "module"` to `package.json`. Style Dictionary 4 uses ES modules.

**"Tokens not loading in Storybook"**  
Make sure `tokens.css` is imported in `.storybook/preview.ts`, not in individual component files.
