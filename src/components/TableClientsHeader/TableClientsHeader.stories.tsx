import type { Meta, StoryObj } from '@storybook/react';
import { TableClientsHeader } from './TableClientsHeader';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=1226-374723';

const meta = {
  title: 'Molecules/TableClientsHeader',
  component: TableClientsHeader,
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
} satisfies Meta<typeof TableClientsHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const CustomColumns: Story = {
  name: 'Custom columns',
  args: {
    columns: [
      { id: 'name', label: 'Name', width: 240, sortable: true },
      { id: 'city', label: 'City', width: 200, sortable: true },
      { id: 'actions', label: 'Actions', width: 120, align: 'end' },
    ],
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongLabel: Story = {
  name: 'Long label',
  args: {
    columns: [
      { id: 'name', label: 'Full name of the contact person', width: 170, sortable: true },
      { id: 'joined', label: 'Joined', width: 80, align: 'end', sortable: true },
      { id: 'actions', label: 'Actions', width: 166, align: 'end' },
    ],
  },
  parameters: { docs: { description: { story: 'Labels never wrap: overflow is cut with an ellipsis, the sort icon stays visible.' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 800 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Cells have fixed widths and never shrink; the row is meant for desktop width (the mockup is 1524px).' } } },
};
