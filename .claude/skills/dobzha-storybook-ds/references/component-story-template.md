# Component Story Template

Every component in this design system follows this structure. Copy and adapt.

---

## File structure per component

```
ComponentName/
├── ComponentName.tsx        ← component implementation
├── ComponentName.css        ← styles using CSS custom properties (tokens only)
├── ComponentName.stories.tsx ← all stories
├── ComponentName.mdx        ← documentation page
└── index.ts                 ← barrel export
```

---

## ComponentName.stories.tsx — Full template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Category/ComponentName',  // e.g. 'Forms/Button', 'Navigation/TabBar'
  component: ComponentName,
  tags: ['autodocs'],               // enables auto-generated docs page
  parameters: {
    layout: 'centered',             // or 'fullscreen' for page-level components
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YOUR_FILE_ID/...',  // link to Figma component
    },
  },
  argTypes: {
    // Define controls for each prop
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual style of the component',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the component',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all interaction',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading indicator, disables interaction',
    },
    label: {
      control: 'text',
      description: 'Text content',
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
// Most common use case. This is what developers will copy first.
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Button',
    disabled: false,
    loading: false,
  },
};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
  },
};

// ─── SIZES ───────────────────────────────────────────────────────────────────
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongLabel: Story = {
  args: {
    ...Default.args,
    label: 'This is a very long button label that might overflow',
  },
};

// ─── EMPTY STATE (for data-display components) ────────────────────────────────
// IMPORTANT: Every component that displays data must have this story.
// This is one of the main reasons Storybook exists — prototypes can't show empty states.
export const Empty: Story = {
  args: {
    items: [],
    emptyMessage: 'No items yet',
  },
};

// ─── ALL VARIANTS GRID ───────────────────────────────────────────────────────
// Useful for at-a-glance comparison in design reviews
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <ComponentName variant="primary" size="md" label="Primary" />
      <ComponentName variant="secondary" size="md" label="Secondary" />
      <ComponentName variant="ghost" size="md" label="Ghost" />
      <ComponentName variant="primary" size="md" label="Disabled" disabled />
      <ComponentName variant="primary" size="md" label="Loading" loading />
    </div>
  ),
};
```

---

## ComponentName.mdx — Documentation template

```mdx
import { Meta, Canvas, Controls, Story } from '@storybook/blocks';
import * as ComponentNameStories from './ComponentName.stories';

<Meta of={ComponentNameStories} />

# ComponentName

Brief description of the component — what it is, what problem it solves, 
and when to use it.

## Usage

<Canvas of={ComponentNameStories.Default} />
<Controls of={ComponentNameStories.Default} />

## When to use

- ✅ Use for primary actions that require the user's attention
- ✅ Use when there is one clear action on the page
- ✅ Use in forms for the submit action

## When NOT to use

- ❌ Don't use more than one Primary button per section
- ❌ Don't use for navigation — use a Link component instead
- ❌ Don't use for destructive actions without confirmation

## States

<Canvas of={ComponentNameStories.Disabled} />
<Canvas of={ComponentNameStories.Loading} />

## Empty state

<Canvas of={ComponentNameStories.Empty} />

## Design tokens used

This table must always be populated with real values and a real source — never leave a row with an abstract token name and no value. See the Source of Truth & Token Mapping Protocol in SKILL.md Section 3.

| Token | Property | Value | Source |
|-------|----------|-------|--------|
| `--action-primary-default` | background-color (primary variant) | #0097DB | Figma: action/primary/default |
| `--action-primary-hover` | background-color on hover | #0080BB | Figma: action/primary/hover |
| `--text-inverse` | text color on primary | #FFFFFF | Existing tokens.json |
| `--spacing-3` | vertical padding | 12px | AI-defined (standard 12px rhythm, no prior token) |
| `--spacing-4` | horizontal padding | 16px | AI-defined (standard 16px rhythm, no prior token) |
| `--radius-md` | border-radius | 8px | AI-defined (matches existing card/input radius) |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `disabled` | `boolean` | `false` | Disables interaction |
| `loading` | `boolean` | `false` | Shows loading state |
| `label` | `string` | — | Required text content |

## Code example

```tsx
import { ComponentName } from '@your-ds/components';

// Basic usage
<ComponentName label="Save changes" onClick={handleSave} />

// With variant
<ComponentName variant="secondary" label="Cancel" onClick={handleCancel} />

// Loading state
<ComponentName loading label="Saving..." />
```

## Accessibility

- Minimum touch target: 44×44px ✅
- Focus ring visible on keyboard navigation ✅
- `disabled` attribute used (not just `aria-disabled`) ✅
- `aria-busy="true"` on loading state ✅

## Related components

- [IconButton](/story/forms-iconbutton--default) — for icon-only actions
- [LinkButton](/story/forms-linkbutton--default) — for navigation actions
```

---

## ComponentName.css — Token-only styles

```css
.ds-button {
  /* Structure */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  
  /* Typography */
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--leading-tight);
  
  /* Shape */
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  
  /* Behavior */
  cursor: pointer;
  transition: background-color 150ms ease, border-color 150ms ease;
  
  /* Accessibility */
  min-height: 44px;
  min-width: 44px;
}

/* Sizes */
.ds-button--sm {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--text-xs);
  min-height: 32px;
}

.ds-button--md {
  padding: var(--spacing-3) var(--spacing-4);
}

.ds-button--lg {
  padding: var(--spacing-4) var(--spacing-5);
  font-size: var(--text-base);
}

/* Primary variant */
.ds-button--primary {
  background-color: var(--action-primary-default);
  color: var(--text-inverse);
  border-color: var(--action-primary-default);
}

.ds-button--primary:hover:not(:disabled) {
  background-color: var(--action-primary-hover);
  border-color: var(--action-primary-hover);
}

.ds-button--primary:active:not(:disabled) {
  background-color: var(--action-primary-pressed);
}

/* Focus state — required for accessibility */
.ds-button:focus-visible {
  outline: 2px solid var(--action-primary-default);
  outline-offset: 2px;
}

/* Disabled state */
.ds-button:disabled,
.ds-button--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
```

---

## Mandatory states per component type

### Interactive components (Button, Input, Select, Checkbox, etc.)
| State | Required | Story name |
|-------|----------|------------|
| Default | ✅ Always | `Default` |
| Hover | Design only (CSS :hover) | documented in MDX |
| Focus | ✅ Always (keyboard) | `Focused` or CSS :focus-visible |
| Active/Pressed | Design only | documented in MDX |
| Disabled | ✅ Always | `Disabled` |
| Loading | ✅ If async action | `Loading` |
| Error | ✅ For form inputs | `Error` |

### Data-display components (List, Table, Card feed, Dashboard widget, etc.)
| State | Required | Story name |
|-------|----------|------------|
| Populated (default) | ✅ Always | `Default` |
| Empty | ✅ Always | `Empty` |
| Loading/Skeleton | ✅ Always | `Loading` |
| Error | ✅ Always | `Error` |
| Partial data | If applicable | `PartialData` |

### Navigation components (Nav bar, Tabs, Breadcrumb, etc.)
| State | Required | Story name |
|-------|----------|------------|
| Default | ✅ Always | `Default` |
| Active item | ✅ Always | `WithActiveItem` |
| Mobile/collapsed | If responsive | `Mobile` |
| With badge/notification | If applicable | `WithBadge` |

---

## Story title naming convention

```
Category/SubCategory/ComponentName

Examples:
'Foundations/Colors'
'Atoms/Button'
'Atoms/IconButton'
'Molecules/SearchBar'
'Molecules/FormField'
'Organisms/NavigationBar'
'Organisms/DataTable'
'Templates/DashboardLayout'
'Templates/EmptyState'
```

---

## Figma link in stories

Always add a Figma link if a Figma file exists:

```typescript
parameters: {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/FILE_ID/file-name?node-id=NODE_ID',
  },
},
```

To get the correct URL: In Figma, right-click the component → Copy link. This links directly to that component in Figma Dev Mode.
