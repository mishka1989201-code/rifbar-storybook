import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterChevron, type FilterChevronVariant } from './FilterChevron';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=746-387100';

const VARIANTS: FilterChevronVariant[] = ['outline', 'outline-v2', 'filled'];

const meta = {
  title: 'Atoms/FilterChevron',
  component: FilterChevron,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  args: { label: 'Status', children: 'Primary', onRemove: () => {} },
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'Figma `Style` property',
      table: { defaultValue: { summary: 'outline' } },
    },
    label: { control: 'text', description: 'Filter name (before the colon)' },
    children: { control: 'text', description: 'Selected value' },
    removeLabel: { control: 'text', description: 'Accessible name of ×' },
    forceHover: { control: 'boolean', description: 'Storybook only: show the hover look' },
  },
} satisfies Meta<typeof FilterChevron>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = { args: { variant: 'outline' } };

// ─── STYLES (Figma Style) ────────────────────────────────────────────────────
export const Outline: Story = { args: { variant: 'outline' } };
export const OutlineV2: Story = { name: 'Outline V2', args: { variant: 'outline-v2' } };
export const Filled: Story = { args: { variant: 'filled' } };

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Hover: Story = {
  name: 'Outline Hover',
  args: { variant: 'outline', forceHover: true },
  parameters: {
    docs: { description: { story: 'Figma `Style=Outline Hover`: Secondary Light fill, Grey Dark stroke. Shown on mouse hover.' } },
  },
};

export const Decorative: Story = {
  name: 'Without remove action',
  args: { onRemove: undefined },
  parameters: {
    docs: { description: { story: 'Without `onRemove` the × is only a picture: no button, not focusable.' } },
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongValue: Story = {
  args: { label: 'Client', children: 'Kyiv Market — central warehouse, Podil district' },
  decorators: [(Story) => <div style={{ width: 200 }}>{Story()}</div>],
  parameters: {
    docs: { description: { story: 'The filter name stays whole; the value is cut with “…” when the container is narrow.' } },
  },
};

// ─── ALL STYLES (mirrors the Figma frame `Filter Chevron`) ───────────────────
export const AllVariants: Story = {
  name: 'All Styles',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24 }}>
      <FilterChevron {...args} variant="outline" />
      <FilterChevron {...args} variant="filled" />
      <FilterChevron {...args} variant="outline-v2" />
      <FilterChevron {...args} variant="outline" forceHover />
    </div>
  ),
};

// ─── IN CONTEXT: applied filters above a table (incl. empty state) ───────────
const INITIAL = [
  { id: 'status', label: 'Status', value: 'Paid' },
  { id: 'client', label: 'Client', value: 'Lviv Coffee' },
  { id: 'date', label: 'Date', value: '01.10 – 03.10' },
];

function FilterBar({ variant }: { variant: FilterChevronVariant }) {
  const [filters, setFilters] = useState(INITIAL);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, minHeight: 22, fontFamily: 'var(--font-family-base)' }}>
      {filters.length === 0 ? (
        <>
          <span style={{ fontSize: 12, color: 'var(--color-grey-dark)' }}>No filters applied.</span>
          <button type="button" onClick={() => setFilters(INITIAL)} style={{ fontSize: 12 }}>
            Reset demo
          </button>
        </>
      ) : (
        filters.map((f) => (
          <FilterChevron
            key={f.id}
            variant={variant}
            label={f.label}
            removeLabel={`Remove filter ${f.label}: ${f.value}`}
            onRemove={() => setFilters((list) => list.filter((x) => x.id !== f.id))}
          >
            {f.value}
          </FilterChevron>
        ))
      )}
    </div>
  );
}

export const FilterBarExample: Story = {
  name: 'Example: Applied filters',
  render: (args) => <FilterBar variant={args.variant ?? 'outline'} />,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Click × to remove a filter. When all are removed the row shows the empty state. ' +
          'Gap 8px, the empty text and the reset button are demo-only (AI-defined), not part of the atom.',
      },
    },
  },
};

/** Figma "Dark Atoms Components" → Filter Chevron. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const AllVariantsDark: Story = {
  ...AllVariants,
  name: 'All Styles (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content' }}>
        <Story />
      </div>
    ),
  ],
};
