# Developer Guidelines — What Developers Need from Storybook

Storybook in this workflow replaces Figma as the developer's reference. Developers should be able to open Storybook and find everything they need without asking the designer.

---

## What every component page must provide

### 1. Live interactive example
The default story shows the component working in the browser. Developers can toggle controls to see how props affect appearance and behavior. This is more valuable than a static screenshot.

### 2. Copy-paste code snippet
Every MDX doc must include a ready-to-use code example:
```tsx
// Ready to copy, no modifications needed for the basic case
<Button variant="primary" size="md" onClick={handleClick}>
  Save changes
</Button>
```

### 3. Props table
Auto-generated via `autodocs` tag + `argTypes`. Must include:
- Prop name
- Type (exact TypeScript type, not just "string")
- Default value
- Description of what it does

### 4. Token list
Which CSS custom properties does this component use? Developers need this to:
- Understand how to theme/override the component
- Debug visual issues
- Know what changes if a token changes globally

Format:
```
| Token | Property | Current value |
|-------|----------|---------------|
| --action-primary-default | background-color | #0097DB |
| --spacing-4 | padding (horizontal) | 16px |
| --radius-md | border-radius | 8px |
```

### 5. All states visible
Developers need to see and test:
- Every variant
- Disabled state
- Loading state
- Error state
- Empty state (for data components)

Without these, developers guess at edge case styling and get it wrong.

### 6. Accessibility notes
- Is this component keyboard-navigable? How?
- What ARIA attributes are needed?
- What is the minimum touch target size?
- Does it pass contrast in both light and dark mode?

---

## Installation and import instructions

Every design system Storybook should have a "Getting Started" story:

```typescript
// src/foundations/GettingStarted.stories.tsx

export default {
  title: 'Documentation/Getting Started',
};

export const ForDevelopers = {
  render: () => (
    <div>
      <h1>Getting Started</h1>
      
      <h2>Install</h2>
      <pre>npm install @your-package/design-system</pre>
      
      <h2>Import tokens (CSS)</h2>
      <pre>import '@your-package/design-system/tokens.css';</pre>
      
      <h2>Import a component</h2>
      <pre>import {'{ Button }'} from '@your-package/design-system';</pre>
      
      <h2>Using design tokens directly</h2>
      <pre>.my-element {'{'} color: var(--text-primary); {'}'}</pre>
    </div>
  ),
};
```

---

## Component specification format

When a component needs detailed specs beyond what Storybook auto-generates, document in MDX:

```mdx
## Sizes

| Size | Height | H. Padding | V. Padding | Font size |
|------|--------|------------|------------|-----------|
| sm   | 32px   | 12px       | 8px        | 14px      |
| md   | 40px   | 16px       | 12px       | 15px      |
| lg   | 48px   | 20px       | 16px       | 16px      |

## States

| State | Background token | Border token | Text token |
|-------|-----------------|--------------|------------|
| Default | --action-primary-default | transparent | --text-inverse |
| Hover | --action-primary-hover | transparent | --text-inverse |
| Pressed | --action-primary-pressed | transparent | --text-inverse |
| Disabled | --action-primary-default | transparent | --text-inverse |
| Loading | --action-primary-default | transparent | --text-inverse |

## Behavior

- Hover: background darkens 10% (handled via token)
- Pressed: background darkens 20%, scale 0.98
- Disabled: opacity 40%, no pointer events, no hover/focus styles
- Loading: spinner replaces or precedes label, interaction disabled
- Focus: 2px outline with 2px offset using --action-primary-default
```

---

## What developers should NOT have to ask the designer

If a developer has to ask any of these questions, the Storybook documentation is incomplete:

- "What color is the button on hover?" → Missing: hover state story + token table
- "What happens if the text is too long?" → Missing: edge case story
- "Is there a dark mode version?" → Missing: dark mode story or token docs
- "What do I show when there's no data?" → Missing: empty state story
- "Is this accessible?" → Missing: accessibility section in MDX
- "What's the font size for the label?" → Missing: typography token documentation
- "How do I import this?" → Missing: Getting Started page

---

## Maturity labels

Use status badges to communicate component readiness. Add to story metadata:

```typescript
parameters: {
  status: {
    type: 'stable',  // or: 'beta', 'alpha', 'deprecated'
  },
},
```

| Status | Meaning |
|--------|---------|
| `alpha` | In development, API may change, don't use in production |
| `beta` | Mostly stable, being tested, API unlikely to change |
| `stable` | Production-ready, fully documented, covered by tests |
| `deprecated` | Will be removed, use the replacement listed in docs |

---

## Linking between components

Storybook docs should cross-reference related components. In MDX:

```mdx
## Related components

- **[IconButton](/story/atoms-iconbutton--default)** — use when only an icon is needed
- **[LinkButton](/story/atoms-linkbutton--default)** — use for navigation (renders as `<a>`)
- **[ButtonGroup](/story/molecules-buttongroup--default)** — use when multiple actions need grouping
```

---

## Changelog visibility

Developers need to know what changed between versions. The Changelog story makes this visible inside Storybook instead of requiring someone to read commit history.

When tokens change, update `Changelog.stories.tsx`:

```typescript
const changes = [
  {
    date: '2025-06-10',
    token: '--action-primary-default',
    before: '#0080CC',
    after: '#0097DB',
    reason: 'Updated to meet WCAG AA contrast on light backgrounds',
  },
];
```

Render before/after swatches so the visual change is immediately obvious.

---

## Code organization standards

### CSS class naming (BEM-style)
```
.ds-[component]                    block
.ds-[component]__[element]         element
.ds-[component]--[modifier]        modifier

Examples:
.ds-button
.ds-button__label
.ds-button--primary
.ds-button--sm
.ds-card__header
.ds-card--elevated
```

### TypeScript component interface
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  // Avoid: color?: string (too open), type?: any (never)
}
```

Rules:
- Extend the native HTML element's attributes (allows `onClick`, `aria-*`, `data-*` passthrough)
- Use `forwardRef` for elements that need `ref` (inputs, buttons in forms)
- Default values match the most common use case
- Export named types alongside components

### Icon handling
Use lucide-react or similar:
```typescript
import type { LucideIcon } from 'lucide-react';

interface ButtonProps {
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
}
```

---

## Accessibility checklist per component

| Requirement | How to verify |
|-------------|--------------|
| Focus ring visible | Tab to component in Default story |
| Keyboard operable | Tab + Enter/Space activates |
| ARIA label on icon-only | Check in a11y addon panel |
| Sufficient contrast | a11y addon → Accessibility tab |
| Touch target ≥ 44×44px | Measure in browser dev tools |
| `disabled` attribute (not just CSS) | Inspect element |
| `aria-busy` on loading | Inspect element during Loading story |
| No color-only information | Visible even in grayscale |
