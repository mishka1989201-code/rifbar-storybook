import type { Meta, StoryObj } from '@storybook/react';
import { StepCard } from './StepCard';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=7038-332399';

const meta = {
  title: 'Molecules/StepCard',
  component: StepCard,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { title: 'New', caption: '08/12/2022' },
  argTypes: { icon: { control: 'text', description: 'Icon name from the 24px set' } },
  decorators: [(Story) => <div style={{ maxWidth: 274 }}><Story /></div>],
} satisfies Meta<typeof StepCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const OtherIcon: Story = {
  name: 'Other icon',
  args: { icon: 'doc', title: 'Approved' },
};

export const NoCaption: Story = {
  name: 'No caption',
  args: { caption: undefined },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongTitle: Story = {
  name: 'Long title',
  args: { title: 'Waiting for the warehouse confirmation and payment' },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 140 }}><Story /></div>],
};
