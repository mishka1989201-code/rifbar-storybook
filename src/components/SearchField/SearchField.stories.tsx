import type { Meta, StoryObj } from '@storybook/react';
import { useState, type CSSProperties } from 'react';
import { SearchField } from './SearchField';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=255-127339';

// Figma sample width is 232px; the field fills its container.
const width = (w: number) => (Story: () => JSX.Element) => <div style={{ width: w }}>{Story()}</div>;

const meta = {
  title: 'Atoms/SearchField',
  component: SearchField,
  decorators: [width(232)],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'canvas' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['desktop', 'mobile'], description: 'Figma `Property 1`' },
    placeholder: { control: 'text' },
    defaultValue: { control: 'text', description: 'Has text → Figma `Style=Active`' },
    disabled: { control: 'boolean', description: 'Figma `Style=Disabled`' },
    forceFocus: { control: 'boolean', description: 'Focus visuals (preview only)' },
    onSearch: { action: 'searched' },
  },
  args: { 'aria-label': 'Search' },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DESKTOP (32px) ──────────────────────────────────────────────────────────
export const Default: Story = {};

export const Static: Story = {};

export const Active: Story = {
  args: { defaultValue: 'China Warehouse' },
  parameters: { docs: { description: { story: 'Has text: text Color Text, border Input field, dark button.' } } },
};

export const Focus: Story = {
  args: { forceFocus: true },
  parameters: { docs: { description: { story: 'Not drawn in Figma. Input field border + Focus shadow, same as InputField.' } } },
};

export const Disabled: Story = {
  args: { disabled: true },
};

// ─── MOBILE (40px) ───────────────────────────────────────────────────────────
export const MobileStatic: Story = { args: { size: 'mobile' } };

export const MobileActive: Story = { args: { size: 'mobile', defaultValue: 'China Warehouse' } };

export const MobileDisabled: Story = {
  args: { size: 'mobile', disabled: true },
  parameters: {
    docs: {
      description: {
        story: 'In Figma this variant is named `Mobile, Static` (a duplicate); it is drawn at 20% opacity, i.e. Disabled.',
      },
    },
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  args: { defaultValue: 'Central distribution warehouse — Kyiv, Left bank, building 4' },
  parameters: { docs: { description: { story: 'Long text does not push the button out: the text is cut inside the field.' } } },
};

export const Narrow: Story = {
  decorators: [width(140)],
  args: { placeholder: 'Search by keyword' },
  parameters: { docs: { description: { story: 'The field fills its container; the button keeps its size.' } } },
};

// ─── STATE MATRIX (mirrors the Figma frame `SearchField`) ────────────────────
const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16, width: 232 };

export const AllVariants: Story = {
  name: 'All Sizes × Styles',
  decorators: [],
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 48 }}>
      {(['desktop', 'mobile'] as const).map((size) => (
        <div key={size} style={col}>
          <SearchField size={size} aria-label={`${size} static`} />
          <SearchField size={size} defaultValue="China Warehouse" aria-label={`${size} active`} />
          <SearchField size={size} disabled aria-label={`${size} disabled`} />
        </div>
      ))}
    </div>
  ),
};

// ─── IN CONTEXT ──────────────────────────────────────────────────────────────
const ITEMS = ['China Warehouse', 'Kyiv Warehouse', 'Lviv Warehouse', 'Odesa Warehouse'];

function SearchDemo() {
  const [query, setQuery] = useState('');
  const [applied, setApplied] = useState('');
  const results = ITEMS.filter((i) => i.toLowerCase().includes(applied.toLowerCase()));
  const text: CSSProperties = { fontFamily: 'var(--font-family-base)', fontSize: 14, color: 'var(--color-text)' };
  return (
    <div style={{ ...col, ...text }}>
      <SearchField value={query} onChange={(e) => setQuery(e.target.value)} onSearch={setApplied} aria-label="Warehouses" />
      {results.length === 0 ? (
        <p style={{ margin: 0, color: 'var(--color-grey-dark)' }}>Nothing found for “{applied}”</p>
      ) : (
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {results.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const SearchExample: Story = {
  name: 'Example: Search a list',
  decorators: [],
  render: () => <SearchDemo />,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Interactive. Type and press Enter or the button. The list is demo-only; “Nothing found” is the empty state.',
      },
    },
  },
};

/** Figma "Dark Atoms Components" → search Field. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const AllVariantsDark: Story = {
  ...AllVariants,
  name: 'All Sizes × Styles (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content' }}>
        <Story />
      </div>
    ),
  ],
};
