import type { Meta, StoryObj } from '@storybook/react';
import { TotalRow } from './TotalRow';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=78-27027';

const meta = {
  title: 'Molecules/TotalRow',
  component: TotalRow,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  args: { total: '$19140', onDownload: () => {}, onViewDoc: () => {} },
  argTypes: {
    label: { control: 'text' },
    total: { control: 'text' },
    viewDocLabel: { control: 'text' },
    downloadLabel: { control: 'text' },
    onDownload: { action: 'download' },
    onViewDoc: { action: 'view doc' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1524, paddingBottom: 40 }}><Story /></div>],
} satisfies Meta<typeof TotalRow>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const CustomLabels: Story = {
  name: 'Custom labels',
  args: { label: 'Subtotal', total: '€1 250.00', viewDocLabel: 'Open invoice' },
};

export const WithoutActions: Story = {
  name: 'Without actions',
  args: { onDownload: undefined, onViewDoc: undefined },
  parameters: { docs: { description: { story: 'Without `onDownload` and `onViewDoc` the buttons are hidden.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LargeAmount: Story = {
  name: 'Large amount',
  args: { total: '$1 234 567 890.00' },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 360, paddingBottom: 40 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Buttons never shrink; the amount is cut with an ellipsis when it does not fit.' } } },
};

/** Figma "Dark Molecules Components" → Total Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
