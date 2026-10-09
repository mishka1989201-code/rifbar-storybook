import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { OrderStatus, type OrderStatusKey } from '../TableRowOrder';
import { TableOrders, type TableOrdersItem } from './TableOrders';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=818-311771';

const row = (id: number, name: string, status: OrderStatusKey, extra: Partial<TableOrdersItem> = {}): TableOrdersItem => ({
  id,
  name,
  price: '$1200',
  type: 'Purchase',
  date: '08.24.2023',
  status: <OrderStatus value={status} />,
  ...extra,
});

/** The eleven rows of the Figma frame. */
export const ORDERS: TableOrdersItem[] = [
  row(1, 'Order #3', 'pending'),
  row(2, 'Order #123', 'in-work'),
  row(3, 'Order #1433', 'approved'),
  row(4, 'Order #34', 'awaiting-payment'),
  row(5, 'Order #65', 'in-shipping'),
  row(6, 'Order #123', 'rejected'),
  row(7, 'Order #13', 'approved'),
  row(8, 'Order #67', 'received'),
  row(9, 'Order #2', 'rejected'),
  row(10, 'Order #644', 'received'),
  row(11, 'Order #87', 'received'),
];

const meta = {
  title: 'Organisms/TableOrders',
  component: TableOrders,
  parameters: { layout: 'padded', backgrounds: { default: 'canvas' }, design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    layout: { control: 'inline-radio', options: ['table', 'cards'] },
    status: { control: 'inline-radio', options: ['ready', 'loading', 'error'] },
    emptyText: { control: 'text' },
    loadingText: { control: 'text' },
    errorText: { control: 'text' },
    label: { control: 'text' },
    onSort: { action: 'sort' },
  },
  args: { rows: ORDERS.slice(0, 4) },
  // Figma frame is 1524px wide.
  decorators: [(Story) => <div style={{ maxWidth: 1524 }}><Story /></div>],
} satisfies Meta<typeof TableOrders>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma Table 1 - Management) ────────────────────────────────────
export const Default: Story = { args: { rows: ORDERS } };

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Cards: Story = {
  args: { layout: 'cards', rows: ORDERS },
  decorators: [(Story) => <div style={{ maxWidth: 704 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Figma `Cards Line` at 768px: two cards per line, 8px apart.' } } },
};

export const CardsSingleColumn: Story = {
  name: 'Cards, one column',
  args: { layout: 'cards', rows: ORDERS.slice(0, 4) },
  decorators: [(Story) => <div style={{ maxWidth: 448 }}><Story /></div>],
  parameters: { docs: { description: { story: 'At 480px (448px of content) and below the grid drops to one column.' } } },
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
  parameters: { docs: { description: { story: '`role="alert"` message in Danger Strong (AI-defined).' } } },
};

export const CardsEmpty: Story = {
  name: 'Cards: empty',
  args: { layout: 'cards', rows: [] },
  decorators: [(Story) => <div style={{ maxWidth: 448 }}><Story /></div>],
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  name: 'Long text',
  args: {
    rows: [row(1, 'Order #123456789 for the Central Perk wholesale account', 'awaiting-payment', { type: 'Purchase with delayed payment', price: '$1 200 000.00' })],
  },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  args: { rows: ORDERS.slice(0, 3) },
  decorators: [(Story) => <div style={{ width: 640 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Below the width of the columns the table scrolls horizontally; use `layout="cards"` instead on phones.' } } },
};

export const Sortable: Story = {
  args: { rows: ORDERS },
  render: function Render(args) {
    const [by, setBy] = useState('name');
    const sorted = [...(args.rows ?? [])].sort((a, b) => String(a[by as keyof TableOrdersItem] ?? '').localeCompare(String(b[by as keyof TableOrdersItem] ?? ''), undefined, { numeric: true }));
    return <TableOrders {...args} rows={sorted} onSort={setBy} />;
  },
  parameters: { docs: { description: { story: 'The table does not sort by itself: `onSort` gets the column id and the story sorts the rows (status chips are not sorted).' } } },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-32)' }}>
      <TableOrders {...args} />
      <div style={{ maxWidth: 704 }}><TableOrders {...args} layout="cards" /></div>
      <TableOrders {...args} rows={[]} />
      <TableOrders {...args} status="loading" />
      <TableOrders {...args} status="error" />
    </div>
  ),
};
