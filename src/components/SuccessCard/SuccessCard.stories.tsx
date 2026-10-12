import type { Meta, StoryObj } from '@storybook/react';
import { SuccessCard } from './SuccessCard';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=1334-460992';

const meta = {
  title: 'Molecules/SuccessCard',
  component: SuccessCard,
  parameters: { layout: 'centered', design: { type: 'figma', url: FIGMA_URL } },
  argTypes: { title: { control: 'text' }, illustration: { control: false } },
} satisfies Meta<typeof SuccessCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const OtherMessage: Story = { name: 'Other message', args: { title: 'Password was sent' } };
export const LongMessage: Story = {
  name: 'Long message (wraps)',
  args: { title: 'The discount for 22 products was applied to the customer successfully' },
  decorators: [(Story) => <div style={{ width: 478 }}><Story /></div>],
};
export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};
export const CustomIllustration: Story = {
  name: 'Custom illustration',
  args: { illustration: <span style={{ fontSize: 96 }}>✓</span> },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)', alignItems: 'flex-start' }}>
      <SuccessCard />
      <SuccessCard title="Password was sent" />
    </div>
  ),
};

/** No dark Figma frame draws this card: dark values are AI-defined (see the MDX). */
export const AllVariantsDark: Story = {
  ...AllVariants,
  name: 'All variants (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content' }}>
        <Story />
      </div>
    ),
  ],
};
