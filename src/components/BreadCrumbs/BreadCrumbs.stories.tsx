import type { Meta, StoryObj } from '@storybook/react';
import { BreadCrumbs } from './BreadCrumbs';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=32-9619';

const meta = {
  title: 'Molecules/BreadCrumbs',
  component: BreadCrumbs,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    items: { control: 'object', description: '`{ label, href?, onClick? }`; the last item is the current page' },
  },
  args: {
    items: [
      { label: 'Clients', href: '#' },
      { label: 'All', href: '#' },
      { label: 'All', href: '#' },
      { label: 'All', href: '#' },
      { label: 'All' },
    ],
  },
} satisfies Meta<typeof BreadCrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: root + 4 crumbs) ────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Short: Story = {
  args: { items: [{ label: 'Clients', href: '#' }, { label: 'Acme Ltd.' }] },
};

export const SingleItem: Story = {
  name: 'Single item',
  args: { items: [{ label: 'Clients' }] },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongPath: Story = {
  name: 'Long path (wraps)',
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <BreadCrumbs {...args} />
    </div>
  ),
  args: {
    items: [
      { label: 'Clients', href: '#' },
      { label: 'Wholesale customers', href: '#' },
      { label: 'Kyiv region', href: '#' },
      { label: 'Contracts and signed documents', href: '#' },
      { label: 'Contract 2023/04-117' },
    ],
  },
  parameters: { docs: { description: { story: 'Figma frame is `flex-wrap`: crumbs wrap to the next line with a 16px row gap.' } } },
};
