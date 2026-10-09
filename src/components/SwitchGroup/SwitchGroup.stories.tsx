import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SwitchGroup } from './SwitchGroup';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=41-8767';

const purchase = [
  { value: 'purchase', label: 'Purchase', icon: 'shipping-local' as const },
  { value: 'sample', label: 'Sample', icon: 'bag' as const },
];
const clients = [
  { value: 'all', label: 'All clients' },
  { value: 'pending', label: 'Pending (8)' },
];

const meta = {
  title: 'Molecules/SwitchGroup',
  component: SwitchGroup,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { options: purchase, value: 'purchase', tone: 'light', 'aria-label': 'Order type' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['light', 'dark'] },
    value: { control: 'text' },
    options: { control: 'object' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof SwitchGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Light) ──────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Dark: Story = {
  args: { tone: 'dark', options: clients, value: 'all', 'aria-label': 'Clients' },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState('all');
    return <SwitchGroup {...args} tone="dark" options={clients} value={value} onChange={setValue} aria-label="Clients" />;
  },
};

// ─── STATES ──────────────────────────────────────────────────────────────────
/** Figma Light Hover / Hover Dark: the Not Active button gets a fill on hover. Move the pointer over it. */
export const Hover: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16, justifyItems: 'start' }}>
      <SwitchGroup {...args} />
      <SwitchGroup {...args} tone="dark" options={clients} value="all" aria-label="Clients" />
    </div>
  ),
};

export const WithDisabledOption: Story = {
  name: 'Disabled option',
  args: { options: [purchase[0], { ...purchase[1], disabled: true }] },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const ThreeOptions: Story = {
  name: 'Three options',
  args: {
    tone: 'dark',
    value: 'all',
    options: [...clients, { value: 'archived', label: 'Archived' }],
  },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 220, overflow: 'hidden' }}><Story /></div>],
};

/** Figma "Dark Molecules Components" → Switch Dark → Light. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const DefaultDark: Story = {
  ...Default,
  name: 'Light track (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content', minWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

/** Figma "Dark Molecules Components" → Switch Dark → Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const DarkTrackDark: Story = {
  ...Dark,
  name: 'Dark track (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content', minWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
