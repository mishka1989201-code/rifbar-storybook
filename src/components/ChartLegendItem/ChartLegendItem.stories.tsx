import type { Meta, StoryObj } from '@storybook/react';
import { ChartLegendItem } from './ChartLegendItem';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=88-76033';

const meta = {
  title: 'Molecules/ChartLegendItem',
  component: ChartLegendItem,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { label: 'Previous indicators' },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    color: { control: 'text', description: 'Any CSS color, e.g. `var(--color-green-light)`' },
  },
} satisfies Meta<typeof ChartLegendItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const WithValue: Story = {
  name: 'With value',
  args: { value: '1 240', label: 'Current indicators' },
};

export const NoValue: Story = {
  name: 'No value',
  args: { value: null },
};

export const OtherColor: Story = {
  name: 'Other color',
  args: { color: 'var(--color-green-light)', label: 'Delivered' },
};

export const LegendRow: Story = {
  name: 'Legend row',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-16)' }}>
      <ChartLegendItem label="Previous indicators" />
      <ChartLegendItem color="var(--color-green-light)" label="Current indicators" />
      <ChartLegendItem color="var(--color-warning)" label="Forecast" />
    </div>
  ),
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongLabel: Story = {
  name: 'Long label',
  args: { label: 'Previous indicators for the same period of the last financial year' },
  decorators: [(Story) => <div style={{ maxWidth: 220 }}><Story /></div>],
};

/** Figma "Dark Molecules Components" → Chart Description Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const DefaultDark: Story = {
  ...Default,
  name: 'Default (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content', minWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
