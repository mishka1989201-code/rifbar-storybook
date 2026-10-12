import type { Meta, StoryObj } from '@storybook/react';
import { CallMenu } from './CallMenu';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=5318-243539';

const meta = {
  title: 'Molecules/CallMenu',
  component: CallMenu,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { forceCallActive: false, forceWhatsAppActive: false },
  argTypes: {
    onWhatsApp: { action: 'whatsapp' },
    onCall: { action: 'call' },
  },
} satisfies Meta<typeof CallMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: tooltip-call) ───────────────────────────────────────────
export const Default: Story = { args: { forceCallActive: true } };

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Resting: Story = { args: {}, parameters: { docs: { description: { story: 'No option hovered. Figma draws the call option filled (Stroke Light V2); the resting fill of both options is Stroke Light V1.' } } } };
export const WhatsAppHover: Story = { name: 'WhatsApp hover', args: { forceWhatsAppActive: true } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const CustomLabels: Story = { name: 'Custom labels', args: { whatsAppLabel: 'Message on WhatsApp', callLabel: 'Call now' } };

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)', alignItems: 'flex-start' }}>
      <CallMenu {...args} />
      <CallMenu {...args} forceCallActive />
      <CallMenu {...args} forceWhatsAppActive />
    </div>
  ),
};

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
