import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LogoBar } from './LogoBar';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=48-12690';

const meta = {
  title: 'Molecules/LogoBar',
  component: LogoBar,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { onMenuClick: () => {} },
  argTypes: {
    expanded: { control: 'boolean' },
    hideMenu: { control: 'boolean' },
    logoSize: { control: 'inline-radio', options: ['lg', 'md'] },
    href: { control: 'text' },
    onMenuClick: { action: 'menu clicked' },
  },
  // Figma: white burger and logo on the dark Navbar.
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-primary-blue-dark)', padding: 'var(--spacing-16)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LogoBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Expanded: Story = { args: { expanded: true } };

export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return <LogoBar {...args} expanded={open} onMenuClick={() => setOpen((v) => !v)} />;
  },
};

export const Medium: Story = { args: { logoSize: 'md' } };

export const WithoutMenu: Story = { name: 'Without burger', args: { hideMenu: true } };

export const AsLink: Story = { name: 'Logo as a link', args: { href: '/' } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 180, overflow: 'hidden' }}><Story /></div>],
};
