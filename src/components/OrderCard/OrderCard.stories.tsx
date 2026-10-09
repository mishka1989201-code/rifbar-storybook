import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { ChevronStatus } from '../ChevronStatus';
import { OrderCard } from './OrderCard';
import DOC from '../../assets/demo/invoice.png';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=7038-332399';

const meta = {
  title: 'Molecules/OrderCard',
  component: OrderCard,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: {
    title: 'Order #4645',
    action: <Button variant="light" iconOnly="chevron-down" aria-label="Expand" />,
    preview: DOC,
    previewAlt: 'Invoice preview',
    fields: [
      { id: 'client', label: 'Client:', value: 'David Schwimmer', underline: true },
      { id: 'price', label: 'Price:', value: '$1200' },
      { id: 'date', label: 'Date created:', value: '06/12/2023' },
      { id: 'status', label: 'Status:', value: <ChevronStatus color="light">Awaiting payment</ChevronStatus> },
    ],
  },
  argTypes: { fields: { control: 'object' }, action: { control: false } },
  decorators: [(Story) => <div style={{ maxWidth: 292 }}><Story /></div>],
} satisfies Meta<typeof OrderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const NoPreview: Story = {
  name: 'No preview',
  args: { preview: undefined },
};

export const NoAction: Story = {
  name: 'No action',
  args: { action: undefined },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  name: 'Long text',
  args: {
    fields: [
      { id: 'client', label: 'Client:', value: 'Wolfeschlegelsteinhausenbergerdorff Construction', underline: true },
      { id: 'price', label: 'Price:', value: '$1200' },
    ],
  },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 240 }}><Story /></div>],
};
