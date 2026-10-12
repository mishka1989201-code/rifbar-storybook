import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DiscountModal, type DiscountValue } from './DiscountModal';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=818-308102';

const meta = {
  title: 'Molecules/DiscountModal',
  component: DiscountModal,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    defaultChoice: { control: 'inline-radio', options: [null, 'percent', 'currency'] },
    error: { control: 'text' },
    onApply: { action: 'apply' },
    onCancel: { action: 'cancel' },
    onClose: { action: 'close' },
  },
} satisfies Meta<typeof DiscountModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ErrorState: Story = {
  name: 'Error (empty value)',
  args: { defaultChoice: 'percent', error: 'To continue - enter the value in the input field!' },
};
export const PercentChosen: Story = { name: 'Percent chosen', args: { defaultChoice: 'percent', defaultPercent: '15' } };
export const CurrencyChosen: Story = { name: 'Currency chosen', args: { defaultChoice: 'currency', defaultAmount: '1200' } };

export const Narrow: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};

export const Interactive: Story = {
  render: (args) => {
    const [result, setResult] = useState<DiscountValue | null>(null);
    return (
      <>
        <DiscountModal {...args} onApply={setResult} />
        <p style={{ fontFamily: 'var(--font-family-base)' }}>Applied: {result ? `${result.value}${result.kind === 'percent' ? '%' : ' USD'}` : '—'}</p>
      </>
    );
  },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      <DiscountModal />
      <DiscountModal defaultChoice="percent" error="To continue - enter the value in the input field!" />
      <DiscountModal defaultChoice="percent" defaultPercent="15" />
      <DiscountModal defaultChoice="currency" defaultAmount="1200" />
    </div>
  ),
};

/** No dark Figma frame draws the Discount Modal: dark values are AI-defined (see the MDX). */
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
