import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=155-52780';

const meta = {
  title: 'Molecules/Accordion',
  component: Accordion,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { title: 'Clients', disabled: false, forceHover: false },
  argTypes: {
    title: { control: 'text' },
    open: { control: 'boolean' },
    disabled: { control: 'boolean' },
    forceHover: { control: 'boolean' },
    onOpenChange: { action: 'open change' },
    children: { control: false },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1524 }}><Story /></div>],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const PANEL = 'Panel content goes here: any text, table or form.';

// ─── DEFAULT (Figma: Property 1=Static) ──────────────────────────────────────
export const Default: Story = {};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Hover: Story = { args: { forceHover: true } };
export const Focus: Story = { name: 'Focus (open)', args: { open: true } };
export const Disabled: Story = { args: { disabled: true } };

// ─── WITH PANEL (not drawn in Figma) ─────────────────────────────────────────
export const OpenWithPanel: Story = { name: 'Open with panel', args: { open: true, children: PANEL } };

export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <Accordion {...args} open={open} onOpenChange={setOpen}>
        {PANEL}
      </Accordion>
    );
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongTitle: Story = {
  name: 'Long title',
  args: { title: 'Clients with unpaid invoices from the previous quarter and active shipping contracts in all regions' },
};
export const Narrow: Story = {
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      <Accordion title="Clients" />
      <Accordion title="Clients" forceHover />
      <Accordion title="Clients" open />
      <Accordion title="Clients" disabled />
    </div>
  ),
};

/** Figma "Dark Molecules Components" → Accordion Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
