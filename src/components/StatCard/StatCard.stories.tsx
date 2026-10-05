import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { StatCard } from './StatCard';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=7038-332399';

const meta = {
  title: 'Molecules/StatCard',
  component: StatCard,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: {
    label: 'In processing',
    value: '19.39k',
    footer: <Button variant="text-arrow">See all</Button>,
    watermark: true,
  },
  argTypes: { footer: { control: false }, aside: { control: false }, watermark: { control: 'boolean' } },
  decorators: [(Story) => <div style={{ maxWidth: 397 }}><Story /></div>],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma InProcessingV1) ──────────────────────────────────────────
export const Default: Story = { name: 'With link (V1)' };

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const WithAside: Story = {
  name: 'With amount (V2)',
  args: {
    label: 'All transactions',
    value: '17',
    footer: undefined,
    watermark: false,
    aside: (
      <>
        <span>Full amount</span>
        <span>$326000</span>
      </>
    ),
  },
};

export const Minimal: Story = {
  args: { footer: undefined, watermark: false },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongValue: Story = {
  name: 'Long value',
  args: { value: '1 234 567 890.00', label: 'Total amount of all transactions this quarter' },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  args: WithAside.args,
  decorators: [(Story) => <div style={{ maxWidth: 240 }}><Story /></div>],
};
