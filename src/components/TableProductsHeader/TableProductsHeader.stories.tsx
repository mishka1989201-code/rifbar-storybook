import type { Meta, StoryObj } from '@storybook/react';
import { TableProductsHeader } from './TableProductsHeader';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=78-26106';

const meta = {
  title: 'Molecules/TableProductsHeader',
  component: TableProductsHeader,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    columns: {
      control: 'object',
      description: 'Cells: `{ id, label, width?, align?, group? }`. Defaults to the Figma frame.',
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1524 }}><Story /></div>],
} satisfies Meta<typeof TableProductsHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const CustomColumns: Story = {
  name: 'Custom columns',
  args: {
    columns: [
      { id: 'sku', label: 'SKU', width: 120 },
      { id: 'title', label: 'Title', width: 320 },
      { id: 'stock', label: 'In stock', width: 100, align: 'end' },
    ],
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongLabel: Story = {
  name: 'Long label',
  args: {
    columns: [
      { id: 'id', label: '#', width: 30, align: 'center', group: 'lead' },
      { id: 'name', label: 'Very long product name header that does not fit', width: 170, group: 'lead' },
      { id: 'amount', label: 'Amount', width: 75, align: 'end' },
    ],
  },
  parameters: { docs: { description: { story: 'Labels never wrap: overflow is cut with an ellipsis inside the fixed-width cell.' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 900 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Cells have fixed widths and never shrink; the row is meant for desktop width (the mockup is 1524px). Wrap it in a horizontally scrollable table container on smaller screens.' } } },
};
