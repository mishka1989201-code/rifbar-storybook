import type { Meta, StoryObj } from '@storybook/react';
import { OrderStatus, ORDER_STATUSES, TableRowOrder, type OrderStatusKey } from './TableRowOrder';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=818-311773';

const meta = {
  title: 'Molecules/TableRowOrder',
  component: TableRowOrder,
  parameters: { layout: 'padded', backgrounds: { default: 'canvas' }, design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    layout: { control: 'inline-radio', options: ['row', 'card'] },
    name: { control: 'text' },
    price: { control: 'text' },
    type: { control: 'text' },
    client: { control: 'text' },
    phone: { control: 'text' },
    date: { control: 'text' },
    actionLabel: { control: 'text' },
    status: { control: false },
    onAction: { action: 'more' },
    onNameClick: { action: 'name' },
  },
  args: {
    name: 'Order #3',
    price: '$1200',
    type: 'Purchase',
    date: '08.24.2023',
    status: <OrderStatus value="pending" />,
  },
  // Figma `Table Row 14` is 1524px wide; the card is 348–448px.
  decorators: [(Story) => <div style={{ maxWidth: 1524 }}><Story /></div>],
} satisfies Meta<typeof TableRowOrder>;

export default meta;
type Story = StoryObj<typeof meta>;

const CARD = [(Story: () => JSX.Element) => <div style={{ maxWidth: 448 }}><Story /></div>];

// ─── DEFAULT (Figma Table Row 14) ────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Card: Story = {
  args: { layout: 'card' },
  decorators: CARD,
  parameters: { docs: { description: { story: 'Figma `Card Row 4` (768px and below): the info wraps, the `More` button is at the right of the last line.' } } },
};

export const CardClientPhone: Story = {
  name: 'Card: client and phone',
  args: { layout: 'card', name: 'Order #123', price: undefined, type: undefined, client: "Fry's", phone: '+44 32 567 8473', status: <OrderStatus value="in-work" /> },
  decorators: CARD,
  parameters: { docs: { description: { story: 'The second card variant of Figma: a client and a phone instead of the price and the type.' } } },
};

export const NameLink: Story = {
  name: 'Name link',
  args: { nameHref: '#' },
  parameters: { docs: { description: { story: 'Hover or focus the name: Hover Blue Light, underlined (as `TableRowClient`).' } } },
};

// ─── STATUSES ────────────────────────────────────────────────────────────────
export const Statuses: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
      {(Object.keys(ORDER_STATUSES) as OrderStatusKey[]).map((key) => (
        <TableRowOrder key={key} {...args} status={<OrderStatus value={key} />} />
      ))}
    </div>
  ),
  parameters: { docs: { description: { story: 'The seven statuses of Figma and their `ChevronStatus` colours.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  name: 'Long text',
  args: { name: 'Order #123456789 for the Central Perk wholesale account', type: 'Purchase with delayed payment', price: '$1 200 000.00' },
  parameters: { docs: { description: { story: 'Row cells are fixed: long text is cut with an ellipsis. In the card it wraps (see the next story).' } } },
};

export const CardLongText: Story = {
  name: 'Card: long text',
  args: { layout: 'card', name: 'Order #123456789 for the Central Perk wholesale account', type: 'Purchase with delayed payment', status: <OrderStatus value="awaiting-payment" /> },
  decorators: CARD,
};

export const CardNarrow: Story = {
  name: 'Card: narrow container',
  args: { layout: 'card' },
  decorators: [(Story) => <div style={{ width: 308 }}><Story /></div>],
};

export const Empty: Story = {
  name: 'Only the name',
  args: { price: undefined, type: undefined, date: undefined, status: undefined },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      <TableRowOrder {...args} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 348px))', gap: 'var(--spacing-8)' }}>
        <TableRowOrder {...args} layout="card" />
        <TableRowOrder {...args} layout="card" name="Order #123" price={undefined} type={undefined} client="Fry's" phone="+44 32 567 8473" status={<OrderStatus value="in-work" />} />
      </div>
    </div>
  ),
};

/** Figma "Dark Molecules Components" → order-list__item / board_all-orders Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
