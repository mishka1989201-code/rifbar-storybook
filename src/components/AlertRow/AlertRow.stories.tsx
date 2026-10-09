import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AlertRow } from './AlertRow';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3738-298541';

const meta = {
  title: 'Molecules/AlertRow',
  component: AlertRow,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    tone: { control: 'inline-radio', options: ['warning', 'info'] },
    lead: { control: 'text' },
    children: { control: 'text', description: 'Regular rest of the sentence' },
    actionLabel: { control: 'text' },
    onAction: { action: 'action' },
  },
  args: { tone: 'info', lead: '7 orders', children: 'are still waiting for payment', actionLabel: 'View payments' },
  // Figma row is 810px wide.
  decorators: [(Story) => <div style={{ maxWidth: 810 }}><Story /></div>],
} satisfies Meta<typeof AlertRow>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma Option 4 / 5) ────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Warning: Story = {
  name: 'Warning (Figma Option 1)',
  args: { tone: 'warning', lead: '5 types of products', children: 'will soon be out of stock', actionLabel: 'View products' },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const NoAction: Story = { name: 'No action', args: { actionLabel: undefined } };

export const LeadOnly: Story = { name: 'Lead only', args: { children: undefined } };

export const LongText: Story = {
  name: 'Long text',
  args: {
    lead: '1,248 orders from 312 clients in 14 warehouses',
    children: 'are still waiting for payment, confirmation of the delivery address and approval by the sales manager',
  },
  parameters: { docs: { description: { story: 'The sentence wraps; the action stays at the right and never shrinks.' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export const DisabledAction: Story = {
  name: 'Disabled action',
  args: { actionProps: { disabled: true } },
  parameters: { docs: { description: { story: 'Disabled at 20% opacity (AI-defined, as other buttons).' } } },
};

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: function Render(args) {
    const [count, setCount] = useState(0);
    return <AlertRow {...args} onAction={() => setCount((c) => c + 1)} actionLabel={`View payments (${count})`} />;
  },
  parameters: { docs: { description: { story: 'The action is a real button: click it or reach it with Tab and Enter.' } } },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <AlertRow {...args} tone="warning" lead="5 types of products" actionLabel="View products">
        will soon be out of stock
      </AlertRow>
      <AlertRow {...args} tone="info" lead="7 orders" actionLabel="View payments">
        are still waiting for payment
      </AlertRow>
      <AlertRow {...args} tone="info" lead="50+ orders" actionLabel="View orders">
        need to approve
      </AlertRow>
    </div>
  ),
};

/** Figma "Dark Organisms Components" → Welcome Card Dark (rows). Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const AllVariantsDark: Story = {
  ...AllVariants,
  name: 'All variants (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content', minWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
