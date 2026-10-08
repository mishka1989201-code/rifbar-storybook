import type { Meta, StoryObj } from '@storybook/react';
import { TableRowClient } from './TableRowClient';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=17-6506';
const FIGMA_HOVER_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=828-255423';

const meta = {
  title: 'Molecules/TableRowClient',
  component: TableRowClient,
  parameters: { layout: 'padded', backgrounds: { default: 'canvas' }, design: { type: 'figma', url: FIGMA_URL } },
  args: {
    name: 'Mickey Herman',
    company: "Sam's Club",
    phone: '+44 32 567 8473',
    email: 'mickeyherman23@gmail.com',
    joined: '07.23.2023',
    updated: '07.23.2023',
    forceNameHover: false,
  },
  argTypes: {
    nameHref: { control: 'text' },
    forceNameHover: { control: 'boolean', description: 'Preview only: Figma Table Row Hover Name' },
    onNameClick: { action: 'name clicked' },
    onAction: { action: 'action pressed' },
  },
  // Figma frame is 1524px wide.
  decorators: [(Story) => <div style={{ maxWidth: 1524 }}><Story /></div>],
} satisfies Meta<typeof TableRowClient>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Table Row 14) ───────────────────────────────────────────
export const Default: Story = {};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const HoverName: Story = {
  name: 'Hover name',
  args: { nameHref: '#', forceNameHover: true },
  parameters: { design: { type: 'figma', url: FIGMA_HOVER_URL } },
};

export const NameAsLink: Story = {
  name: 'Name as link',
  args: { nameHref: '#' },
  parameters: { docs: { description: { story: 'Hover or focus the name: Hover Blue Light, underlined (Figma Hover Name).' } } },
};

export const NameAsButton: Story = {
  name: 'Name as button',
  args: { onNameClick: () => undefined },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  name: 'Long text',
  args: {
    name: 'Bartholomew Montgomery-Featherstonehaugh',
    company: 'International Wholesale and Distribution Company',
    email: 'bartholomew.montgomery.featherstonehaugh@example.com',
  },
  parameters: { docs: { description: { story: 'Every cell is cut with an ellipsis (AI-defined: Figma shows only short text).' } } },
};

export const EmptyCells: Story = {
  name: 'Empty cells',
  args: { company: '—', phone: '—', email: '—', joined: '—', updated: '—' },
};

export const CustomAction: Story = {
  name: 'Custom action label',
  args: { actionLabel: 'Details' },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      <TableRowClient {...args} />
      <TableRowClient {...args} nameHref="#" forceNameHover />
      <TableRowClient {...args} company="—" phone="—" email="—" />
    </div>
  ),
};
