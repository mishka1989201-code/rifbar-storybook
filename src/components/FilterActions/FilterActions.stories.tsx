import type { Meta, StoryObj } from '@storybook/react';
import { FilterActions } from './FilterActions';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=1114-420275';

const meta = {
  title: 'Molecules/FilterActions',
  component: FilterActions,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { filterCount: 4 },
  argTypes: {
    filterLabel: { control: 'text' },
    filterCount: { control: 'number' },
    searchProps: { control: 'object', description: 'Props of the SearchField (`value`, `onSearch`, `placeholder`…)' },
    onFilter: { action: 'filter' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 672 }}><Story /></div>],
} satisfies Meta<typeof FilterActions>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const NoFilters: Story = { name: 'No filters applied', args: { filterCount: undefined } };

export const WithSearchText: Story = {
  name: 'With search text',
  args: { searchProps: { defaultValue: 'Astro' } },
};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const SearchDisabled: Story = {
  name: 'Search disabled',
  args: { searchProps: { disabled: true } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const ManyFilters: Story = { name: 'Many filters', args: { filterCount: 12 } };

export const Narrow: Story = {
  name: 'Narrow',
  decorators: [(Story) => <div style={{ maxWidth: 280 }}><Story /></div>],
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-32)' }}>
      <FilterActions filterCount={4} />
      <FilterActions />
      <FilterActions filterCount={4} searchProps={{ defaultValue: 'Astro' }} />
      <FilterActions filterCount={4} searchProps={{ disabled: true }} />
    </div>
  ),
};

/** Figma "Dark Molecules Components" → Filter Responsive Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const AllVariantsDark: Story = {
  ...AllVariants,
  name: 'All variants (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content', minWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
