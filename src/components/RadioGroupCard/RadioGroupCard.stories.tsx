import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroupCard } from './RadioGroupCard';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=4078-332535';

const OPTIONS = [
  { value: 'rifbar', label: 'Rifbar' },
  { value: 'quickbooks', label: 'QuickBooks' },
];

const meta = {
  title: 'Molecules/RadioGroupCard',
  component: RadioGroupCard,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { title: 'Integrations for invoices', options: OPTIONS, defaultValue: 'rifbar' },
  argTypes: {
    title: { control: 'text' },
    options: { control: 'object' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    onChange: { action: 'change' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 698 }}><Story /></div>],
} satisfies Meta<typeof RadioGroupCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Rifbar chosen) ──────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const SecondChosen: Story = { name: 'Second chosen', args: { defaultValue: 'quickbooks' } };
export const NothingChosen: Story = { name: 'Nothing chosen', args: { defaultValue: undefined } };
export const WithoutTitle: Story = { name: 'Without title', args: { title: undefined } };
export const ThreeOptions: Story = {
  name: 'Three options',
  args: { options: [...OPTIONS, { value: 'xero', label: 'Xero' }] },
};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Disabled: Story = { args: { disabled: true } };
export const OneOptionDisabled: Story = {
  name: 'One option disabled',
  args: { options: [OPTIONS[0], { ...OPTIONS[1], disabled: true }] },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const ManyOptionsWrap: Story = {
  name: 'Many options (wrap)',
  args: {
    options: ['Rifbar', 'QuickBooks', 'Xero', 'FreshBooks', 'Zoho Books', 'Sage Accounting', 'Wave'].map((label) => ({
      value: label,
      label,
    })),
  },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      <RadioGroupCard title="Integrations for invoices" options={OPTIONS} defaultValue="rifbar" />
      <RadioGroupCard title="Integrations for invoices" options={OPTIONS} defaultValue="quickbooks" />
      <RadioGroupCard title="Integrations for invoices" options={OPTIONS} />
      <RadioGroupCard title="Integrations for invoices" options={OPTIONS} defaultValue="rifbar" disabled />
    </div>
  ),
};

/** Figma "Dark Molecules Components" → Integrations for invoices. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
