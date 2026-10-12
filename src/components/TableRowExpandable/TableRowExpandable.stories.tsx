import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TableRowExpandable } from './TableRowExpandable';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=1364-429592';

const meta = {
  title: 'Molecules/TableRowExpandable',
  component: TableRowExpandable,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { expanded: false, disabled: false, forceHover: false },
  argTypes: {
    expanded: { control: 'boolean' },
    disabled: { control: 'boolean' },
    forceHover: { control: 'boolean' },
    onToggle: { control: false },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1492 }}><Story /></div>],
} satisfies Meta<typeof TableRowExpandable>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Style=Static) ───────────────────────────────────────────
export const Default: Story = {};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Card: Story = {
  args: { layout: 'card', sale: true },
  parameters: { docs: { description: { story: 'Figma `Card` of Custom price at 768px and below: ID + photo, then name, size, type, nicotine and price wrap; the toggle sits under them at the right.' } } },
  decorators: [(Story) => <div style={{ maxWidth: 416 }}><Story /></div>],
};
export const CardActive: Story = {
  name: 'Card (expanded)',
  args: { layout: 'card', expanded: true },
  decorators: [(Story) => <div style={{ maxWidth: 416 }}><Story /></div>],
};
export const Hover: Story = { args: { forceHover: true } };
export const Active: Story = { name: 'Active (expanded)', args: { expanded: true } };
export const Disabled: Story = { args: { disabled: true } };

export const Interactive: Story = {
  name: 'Interactive toggle',
  render: (args) => {
    const [open, setOpen] = useState(false);
    return <TableRowExpandable {...args} expanded={open} onToggle={() => setOpen((v) => !v)} />;
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  name: 'Long text',
  args: {
    name: 'Astro Ultra Long Product Name That Does Not Fit',
    type: 'RECHARGEABLE / DISPOSABLE / LIMITED EDITION',
  },
};

export const Narrow: Story = {
  name: 'Narrow',
  decorators: [(Story) => <div style={{ maxWidth: 760, overflowX: 'auto' }}><Story /></div>],
};

export const Sale: Story = {
  name: 'Discounted product (Sale badge)',
  args: { sale: true },
};

export const GroupRow: Story = {
  name: 'Group row (no data cells)',
  args: { index: 9, name: 'Caps', size: null, type: null, nicotine: null, price: null, sale: true },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=1299-429137' },
    docs: { description: { story: 'Figma `Table Row 21` (Caps, Glasses, Backpacks): the data columns are kept at their width but empty — pass `null`.' } },
  },
};

export const InList: Story = {
  name: 'In a list',
  render: () => (
    <div role="table" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
      <TableRowExpandable index={1} name="Astro" />
      <TableRowExpandable index={2} name="Elf Bar" size="10 ml" nicotine="2%" price="$12" expanded />
      <TableRowExpandable index={3} name="Lost Mary" size="20 ml" nicotine="0%" price="$18" />
    </div>
  ),
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      <TableRowExpandable />
      <TableRowExpandable forceHover />
      <TableRowExpandable expanded />
      <TableRowExpandable disabled />
    </div>
  ),
};

/** Figma "Dark Molecules Components" → Table Row 14 Dark (Static / Hover / Active / Disabled). Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
