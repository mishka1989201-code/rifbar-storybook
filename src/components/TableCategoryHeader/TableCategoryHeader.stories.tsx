import type { Meta, StoryObj } from '@storybook/react';
import { TableCategoryHeader } from './TableCategoryHeader';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=1299-436979';

const meta = {
  title: 'Molecules/TableCategoryHeader',
  component: TableCategoryHeader,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    columns: {
      control: 'object',
      description: 'Cells: `{ id, label, width?, align?, sortable?, group? }`. Defaults to the Figma frame.',
    },
    onSort: { action: 'sort' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1524 }}><Story /></div>],
} satisfies Meta<typeof TableCategoryHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

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
