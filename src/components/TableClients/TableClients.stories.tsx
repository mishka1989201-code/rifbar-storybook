import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TableClients, type TableClientsItem } from './TableClients';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=93-34229';

const MICKEY: TableClientsItem = {
  id: 1,
  name: 'Mickey Herman',
  nameHref: '#',
  company: "Sam's Club",
  phone: '+44 32 567 8473',
  email: 'mickeyherman23@gmail.com',
  joined: '07.23.2023',
  updated: '07.23.2023',
};

const MORE_ROWS: TableClientsItem[] = [
  MICKEY,
  { ...MICKEY, id: 2, name: 'Rachel Green', company: 'Central Perk', phone: '+44 32 567 1120', email: 'rachel.green@example.com' },
  { ...MICKEY, id: 3, name: 'Ross Geller', company: 'NYU Museum', phone: '+44 32 567 9021', email: 'ross.geller@example.com', joined: '08.02.2023', updated: '09.14.2023' },
  { ...MICKEY, id: 4, name: 'Monica Geller', company: 'Alessandro', phone: '+44 32 567 3344', email: 'monica.geller@example.com', joined: '08.19.2023', updated: '09.30.2023' },
];

const meta = {
  title: 'Organisms/TableClients',
  component: TableClients,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'canvas' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    status: { control: 'inline-radio', options: ['ready', 'loading', 'error'] },
    emptyText: { control: 'text' },
    loadingText: { control: 'text' },
    errorText: { control: 'text' },
    label: { control: 'text' },
    onSort: { action: 'sort' },
  },
  args: { rows: [MICKEY] },
  // Figma frame is 1524px wide.
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 1524 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TableClients>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Table/Row & Header) ─────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const ManyRows: Story = {
  name: 'Several rows',
  args: { rows: MORE_ROWS },
  parameters: { docs: { description: { story: 'Rows are 8px apart, as the header is from the first row (AI-defined: Figma draws one row).' } } },
};

export const HoverName: Story = {
  name: 'Hover name',
  args: { rows: [{ ...MICKEY }, { ...MORE_ROWS[1] }] },
  parameters: { docs: { description: { story: 'Hover a name: Hover Blue Light, underlined (Figma Table Row Hover Name).' } } },
};

// ─── STATES (data display) ───────────────────────────────────────────────────
export const Empty: Story = {
  args: { rows: [] },
  parameters: { docs: { description: { story: 'Header stays, a message replaces the rows (AI-defined).' } } },
};

export const Loading: Story = {
  args: { status: 'loading' },
  parameters: { docs: { description: { story: '`aria-busy` table with a status message (AI-defined).' } } },
};

export const ErrorState: Story = {
  name: 'Error',
  args: { status: 'error' },
  parameters: { docs: { description: { story: 'Message in Danger Strong, announced with `role="alert"` (AI-defined).' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  name: 'Long text',
  args: {
    rows: [
      {
        ...MICKEY,
        name: 'Bartholomew Montgomery-Featherstonehaugh',
        company: 'International Wholesale and Distribution Company',
        email: 'bartholomew.montgomery.featherstonehaugh@example.com',
      },
    ],
  },
  parameters: { docs: { description: { story: 'Cells are cut with an ellipsis (inherited from `TableRowClient`).' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container (600px, scrolls)',
  args: { rows: MORE_ROWS.slice(0, 2) },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
  parameters: { docs: { description: { story: 'Columns keep their widths; the table scrolls horizontally (AI-defined).' } } },
};

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────
export const Sortable: Story = {
  name: 'Interactive sort (by name)',
  render: (args) => {
    const [dir, setDir] = useState<'asc' | 'desc'>('asc');
    const rows = [...MORE_ROWS].sort((a, b) => String(a.name).localeCompare(String(b.name)) * (dir === 'asc' ? 1 : -1));
    return <TableClients {...args} rows={rows} onSort={(id) => id === 'name' && setDir((d) => (d === 'asc' ? 'desc' : 'asc'))} />;
  },
  parameters: { docs: { description: { story: 'Press the Name header: the story reverses the order (the table itself does not sort).' } } },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-48)' }}>
      <TableClients {...args} rows={MORE_ROWS} />
      <TableClients {...args} rows={[]} />
      <TableClients {...args} status="loading" />
      <TableClients {...args} status="error" />
    </div>
  ),
};

/** Figma "Dark Organisms Components" → Table - Clients / Table Row Hover Name Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
