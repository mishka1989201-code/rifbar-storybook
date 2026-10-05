import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { ClientDetails } from '../ClientDetails';
import { InfoBlock } from './InfoBlock';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=32-10609';

const meta = {
  title: 'Molecules/InfoBlock',
  component: InfoBlock,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  args: { title: 'Client info' },
  argTypes: {
    title: { control: 'text' },
    icon: { control: 'text', description: 'Icon name from the 16px set' },
    infoProps: { control: 'object', description: 'Props of the default `InfoClient` body' },
    actions: { control: false },
    children: { control: false },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1290, paddingBottom: 40 }}><Story /></div>],
} satisfies Meta<typeof InfoBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const CustomFields: Story = {
  name: 'Custom fields',
  args: {
    title: 'Order info',
    icon: 'cart',
    infoProps: {
      justify: 'start',
      fields: [
        { id: 'order', label: 'Order', value: '#10428' },
        { id: 'status', label: 'Status', value: 'Shipped' },
        { id: 'total', label: 'Total', value: '$19140' },
      ],
    },
  },
};

export const WithActions: Story = {
  name: 'With actions',
  args: { actions: <Button variant="outline">Edit</Button> },
};

export const CustomBody: Story = {
  name: 'Custom body',
  args: {
    children: <ClientDetails>{`Delivery only on weekdays.\n\nCall before arrival.`}</ClientDetails>,
  },
  parameters: { docs: { description: { story: 'Any content can replace the `InfoClient` body, e.g. `ClientDetails`.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 520, paddingBottom: 40 }}><Story /></div>],
  parameters: { docs: { description: { story: 'InfoClient fields wrap onto the next line.' } } },
};
