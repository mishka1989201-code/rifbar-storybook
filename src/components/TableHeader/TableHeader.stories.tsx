import type { Meta, StoryObj } from '@storybook/react';
import { TableHeader } from './TableHeader';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=587-173767';

const meta = {
  title: 'Molecules/TableHeader',
  component: TableHeader,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    preset: {
      control: 'inline-radio',
      options: ['warehouses', 'categories', 'clients', 'productsAnalytics', 'paymentsAnalytics'],
      description: 'Column set drawn in Figma. Ignored when `columns` is set.',
    },
    columns: {
      control: 'object',
      description: 'Custom cells: `{ id, label, width?, align?, sortable?, group? }`. Overrides `preset`.',
    },
    onSort: { action: 'sort' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1524 }}><Story /></div>],
} satisfies Meta<typeof TableHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── FIGMA PRESETS ───────────────────────────────────────────────────────────
export const Warehouses: Story = {
  parameters: { design: { type: 'figma', url: FIGMA_URL } },
  args: { preset: 'warehouses' },
};

export const Categories: Story = {
  args: { preset: 'categories' },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL.replace('587-173767', '1299-436979') },
  },
};

export const Clients: Story = {
  args: { preset: 'clients' },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL.replace('587-173767', '1226-374723') },
  },
};

export const ProductsAnalytics: Story = {
  name: 'Products analytics',
  args: { preset: 'productsAnalytics' },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3697-291914' },
  },
};

export const PaymentsAnalytics: Story = {
  name: 'Payments analytics',
  args: { preset: 'paymentsAnalytics' },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=4631-289272' },
  },
};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const CustomColumns: Story = {
  name: 'Custom columns',
  args: {
    columns: [
      { id: 'title', label: 'Title', width: 320, sortable: true },
      { id: 'brand', label: 'Brand', width: 200, sortable: true },
      { id: 'actions', label: 'Actions', width: 84, align: 'end' },
    ],
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongLabel: Story = {
  name: 'Long label',
  args: {
    columns: [
      { id: 'image', label: 'Image', width: 64, group: 'lead' },
      { id: 'category', label: 'Category of the product with a very long name', width: 170, sortable: true, group: 'lead' },
      { id: 'actions', label: 'Actions', width: 84, align: 'end' },
    ],
  },
  parameters: { docs: { description: { story: 'Labels never wrap: overflow is cut with an ellipsis, the sort icon stays visible.' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 900 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Cells have fixed widths and never shrink; the row is meant for desktop width (the mockup is 1524px).' } } },
};
