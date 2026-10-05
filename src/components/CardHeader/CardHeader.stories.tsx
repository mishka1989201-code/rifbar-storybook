import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { CardHeader } from './CardHeader';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=32-10560';

const meta = {
  title: 'Molecules/CardHeader',
  component: CardHeader,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  args: { title: 'Client info' },
  argTypes: {
    title: { control: 'text' },
    icon: { control: 'text', description: 'Icon name from the 16px set' },
    actions: { control: false, description: 'Right-aligned slot (AI-defined, not in Figma)' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1290 }}><Story /></div>],
} satisfies Meta<typeof CardHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const CustomIcon: Story = {
  name: 'Custom icon',
  args: { title: 'Payment details', icon: 'cart' },
};

export const WithActions: Story = {
  name: 'With actions',
  args: { actions: <Button variant="outline">Edit</Button> },
  parameters: { docs: { description: { story: 'The `actions` slot is pushed to the right edge. It is not drawn in Figma.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongTitle: Story = {
  name: 'Long title',
  args: { title: 'Client information and delivery details for the current order' },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
  parameters: { docs: { description: { story: 'The title never wraps: overflow is cut with an ellipsis, the badge keeps its size.' } } },
};
