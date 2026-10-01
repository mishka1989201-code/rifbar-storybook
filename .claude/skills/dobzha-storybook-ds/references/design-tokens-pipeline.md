# Design Tokens Pipeline — Figma → tokens.json → CSS/JS → Storybook

---

## Overview

```
Figma Variables
    ↓ (via Figma MCP or manual export)
tokens/tokens.json
    ↓ (Style Dictionary)
build/css/tokens.css        ← imported in Storybook preview.ts
build/ts/tokens.js          ← used in TypeScript/JS code
build/json/tokens.json      ← used by Storybook foundation stories
    ↓
Storybook displays tokens as color swatches, spacing bars, etc.
    ↓
Developers use CSS custom properties in components
```

---

## Token hierarchy (three-tier)

```
Primitive → Semantic → Component-specific (optional)

colors/blue/500           → #0097DB
action/primary/default    → {colors/blue/500}
button/bg/primary         → {action/primary/default}  (use sparingly)
```

**Rule:** Components must only reference semantic tokens. Never reference primitives directly from components. Primitives are internal to the token system.

---

## tokens.json structure

```json
{
  "color": {
    "gray": {
      "50":  { "value": "#FAFAFA", "type": "color" },
      "100": { "value": "#F5F5F5", "type": "color" },
      "900": { "value": "#212121", "type": "color" }
    },
    "blue": {
      "500": { "value": "#0097DB", "type": "color" }
    }
  },
  "semantic": {
    "bg": {
      "canvas":   { "value": "{color.gray.50}", "type": "color" },
      "surface":  { "value": "{color.gray.100}", "type": "color" }
    },
    "text": {
      "primary":   { "value": "{color.gray.900}", "type": "color" },
      "secondary": { "value": "{color.gray.600}", "type": "color" }
    },
    "action": {
      "primary": {
        "default": { "value": "{color.blue.500}", "type": "color" }
      }
    }
  },
  "spacing": {
    "1": { "value": "4",  "type": "spacing" },
    "2": { "value": "8",  "type": "spacing" },
    "3": { "value": "12", "type": "spacing" },
    "4": { "value": "16", "type": "spacing" },
    "5": { "value": "20", "type": "spacing" },
    "6": { "value": "24", "type": "spacing" }
  },
  "radius": {
    "sm":   { "value": "4",    "type": "borderRadius" },
    "md":   { "value": "8",    "type": "borderRadius" },
    "lg":   { "value": "12",   "type": "borderRadius" },
    "full": { "value": "9999", "type": "borderRadius" }
  }
}
```

---

## Style Dictionary setup

**Install:**
```bash
npm install style-dictionary
```

**build-tokens.js:**
```javascript
import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: {
          outputReferences: true,  // keeps references like var(--color-blue-500)
        },
      }],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/ts/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6',
      }],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'build/json/',
      files: [{
        destination: 'tokens.json',
        format: 'json/flat',
      }],
    },
  },
});

await sd.buildAllPlatforms();
```

**Add to package.json:**
```json
{
  "type": "module",
  "scripts": {
    "build:tokens": "node build-tokens.js",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

**Run the build:**
```bash
npm run build:tokens
```

**Output:**
```
build/
├── css/tokens.css      ← CSS custom properties
├── ts/tokens.js        ← JS exports (PascalCase)
└── json/tokens.json    ← flat JSON (camelCase keys)
```

---

## CSS output example

```css
:root {
  /* Primitives */
  --color-gray-50: #FAFAFA;
  --color-gray-100: #F5F5F5;
  --color-gray-900: #212121;
  --color-blue-500: #0097DB;

  /* Semantic */
  --bg-canvas: var(--color-gray-50);
  --bg-surface: var(--color-gray-100);
  --text-primary: var(--color-gray-900);
  --action-primary-default: var(--color-blue-500);

  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

---

## Dark mode tokens

Create a separate file `tokens/tokens.dark.json`:
```json
{
  "semantic": {
    "bg": {
      "canvas":  { "value": "#0B0D12", "type": "color" },
      "surface": { "value": "#141821", "type": "color" }
    },
    "text": {
      "primary":   { "value": "#F2F4F8", "type": "color" },
      "secondary": { "value": "#A7B0BF", "type": "color" }
    }
  }
}
```

Apply via data attribute in Storybook:
```css
[data-theme="dark"] {
  --bg-canvas: #0B0D12;
  --bg-surface: #141821;
  --text-primary: #F2F4F8;
}
```

---

## Required dark mode token pairs (minimum)

| Semantic token | Light | Dark |
|---------------|-------|------|
| `--bg-canvas` | `#FFFFFF` | `#0B0D12` |
| `--bg-surface` | `#F7F8FA` | `#141821` |
| `--text-primary` | `#0F1420` | `#F2F4F8` |
| `--text-secondary` | `#4A5261` | `#A7B0BF` |
| `--border-default` | `#E4E7EC` | `#2A2F3A` |
| `--action-primary-default` | `#0097DB` | `#3AB7F2` |

---

## Importing tokens into Storybook

In `.storybook/preview.ts`:
```typescript
import '../src/tokens/build/tokens.css';
```

This makes all CSS custom properties available globally in every story.

---

## Foundation stories — displaying tokens visually

**Colors.stories.tsx example:**
```typescript
import tokensJson from '../tokens/build/json/tokens.json';
import guidelines from '../tokens/guidelines.json';

export const SemanticColors: Story = {
  render: () => {
    // Style Dictionary outputs PascalCase keys: ColorGray50, BgCanvas, etc.
    // Check your actual build/json/tokens.json for the real key format
    const colorTokens = Object.entries(tokensJson)
      .filter(([key]) => key.startsWith('Bg') || key.startsWith('Text'));
    
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {colorTokens.map(([key, value]) => (
          <div key={key}>
            <div style={{
              width: '100%',
              height: '64px',
              backgroundColor: value as string,
              borderRadius: '8px',
              border: '1px solid var(--border-default)',
            }} />
            <p style={{ fontSize: '12px', marginTop: '8px', fontFamily: 'monospace' }}>
              {key}
            </p>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              {value as string}
            </p>
            {guidelines[key] && (
              <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                {guidelines[key]}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  },
};
```

**Important:** Check the actual key format in `build/json/tokens.json` before writing filter logic. Style Dictionary transforms `color/gray/50` → `ColorGray50` (PascalCase). If your filter uses `color-` it will return empty.

---

## Changelog system

**generate-changelog.js:**
```javascript
import { readFileSync, writeFileSync, existsSync } from 'fs';

const current = JSON.parse(readFileSync('tokens/tokens.json', 'utf8'));
const previous = existsSync('tokens/.snapshot.json')
  ? JSON.parse(readFileSync('tokens/.snapshot.json', 'utf8'))
  : {};

const changes = [];

function diff(prev, curr, path = '') {
  for (const key of Object.keys(curr)) {
    const fullPath = path ? `${path}.${key}` : key;
    if (typeof curr[key] === 'object' && curr[key].value !== undefined) {
      const prevVal = prev[key]?.value;
      const currVal = curr[key].value;
      if (prevVal !== currVal) {
        changes.push({ token: fullPath, before: prevVal || 'NEW', after: currVal });
      }
    } else if (typeof curr[key] === 'object') {
      diff(prev[key] || {}, curr[key], fullPath);
    }
  }
}

diff(previous, current);

const changelog = {
  date: new Date().toISOString(),
  changes,
};

writeFileSync('tokens/changelog.json', JSON.stringify(changelog, null, 2));
writeFileSync('tokens/.snapshot.json', JSON.stringify(current, null, 2));

console.log(`Found ${changes.length} changes`);
```

Add to package.json scripts:
```json
"sync:tokens": "node generate-changelog.js && npm run build:tokens"
```

---

## Token naming rules

| Do | Don't |
|----|-------|
| `--action-primary-default` | `--blue-button` |
| `--destructive-default` | `--red-hover` |
| `--text-secondary` | `--gray-text` |
| `--bg-surface` | `--light-background` |

Never encode appearance in the name. Names describe purpose, not visuals.
