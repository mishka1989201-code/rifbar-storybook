import type { Meta, StoryObj } from '@storybook/react';
import { TableProductsHeader } from '../TableProductsHeader';
import { TableProductsRow } from './TableProductsRow';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=78-26107';

const meta = {
  title: 'Molecules/TableProductsRow',
  component: TableProductsRow,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  args: {
    index: 1,
    name: 'Astro',
    flavor: 'Malibu peach pineapple orange',
    type: 'RECHARGEABLE / DISPOSABLE',
    nicotine: '5%',
    quantity: 15,
    amount: '$150',
  },
  decorators: [(Story) => <div style={{ maxWidth: 1524 }}><Story /></div>],
} satisfies Meta<typeof TableProductsRow>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const WithHeader: Story = {
  name: 'With header and rows',
  render: (args) => (
    <div role="table">
      <TableProductsHeader />
      <TableProductsRow {...args} />
      <TableProductsRow {...args} index={2} name="Elf Bar" flavor="Blueberry" nicotine="2%" quantity={40} amount="$320" />
      <TableProductsRow {...args} index={3} name="Lost Mary" flavor="Watermelon ice" nicotine="0%" quantity={8} amount="$64" />
    </div>
  ),
  parameters: { docs: { description: { story: 'Row and header share one column grid.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  name: 'Long text',
  args: {
    name: 'Very long product name that does not fit the cell',
    flavor: 'Strawberry watermelon kiwi passion fruit guava mango lychee coconut cream',
    type: 'RECHARGEABLE / DISPOSABLE / REFILLABLE',
  },
  parameters: { docs: { description: { story: 'Flavor wraps to several lines; name and type are cut with an ellipsis.' } } },
};

export const EmptyCells: Story = {
  name: 'Empty cells',
  args: { nicotine: '—', quantity: '—', amount: '—' },
};
