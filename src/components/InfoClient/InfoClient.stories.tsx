import type { Meta, StoryObj } from '@storybook/react';
import { InfoClient } from './InfoClient';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=4539-268692';

const meta = {
  title: 'Molecules/InfoClient',
  component: InfoClient,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'light' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    justify: {
      control: 'inline-radio',
      options: ['between', 'start'],
      description: '`between` = Figma Direction=Line, `start` = Figma Direction=Wrap',
    },
    fields: { control: 'object', description: 'Pairs: `{ id, label, value }`. Defaults to the Figma frame.' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1290 }}><Story /></div>],
} satisfies Meta<typeof InfoClient>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma Direction=Line) ──────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Start: Story = {
  name: 'Justify start (Figma Wrap)',
  args: { justify: 'start' },
};

export const CustomFields: Story = {
  name: 'Custom fields',
  args: {
    fields: [
      { id: 'order', label: 'Order', value: '#10428' },
      { id: 'status', label: 'Status', value: 'Shipped' },
      { id: 'total', label: 'Total', value: '$19140' },
    ],
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const NarrowContainer: Story = {
  name: 'Narrow container (wraps)',
  decorators: [(Story) => <div style={{ maxWidth: 520 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Fields wrap onto the next line with a 16px row gap and keep their natural width.' } } },
};

export const LongValue: Story = {
  name: 'Long value',
  args: {
    fields: [
      { id: 'name', label: 'Name', value: 'Mickey Herman' },
      { id: 'email', label: 'Email', value: 'a.very.long.email.address.for.testing.truncation@example-company.com' },
    ],
  },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
  parameters: { docs: { description: { story: 'A value wider than the container is cut with an ellipsis.' } } },
};

/** Figma "Dark Molecules Components" → info_client dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
