import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HeaderMenu, HeaderMenuItem } from '../HeaderMenu';
import { RegionSwitch, type Region } from './RegionSwitch';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=5640-252833';

const meta = {
  title: 'Molecules/RegionSwitch',
  component: RegionSwitch,
  parameters: { layout: 'centered', design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    value: { control: 'inline-radio', options: ['us', 'eu'], description: 'Selected region (controlled)' },
    defaultValue: { control: 'inline-radio', options: ['us', 'eu'] },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof RegionSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: knob on the US side) ────────────────────────────────────
export const Default: Story = {};

// ─── REGIONS ─────────────────────────────────────────────────────────────────
export const Europe: Story = {
  args: { defaultValue: 'eu' },
  parameters: { docs: { description: { story: 'Not drawn in Figma (AI-defined): the knob moves to the EU flag.' } } },
};

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: () => {
    const [region, setRegion] = useState<Region>('us');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-16)' }}>
        <RegionSwitch value={region} onChange={setRegion} />
        <span>Region: {region === 'us' ? 'United States' : 'Europe'}</span>
      </div>
    );
  },
  parameters: { docs: { description: { story: 'A click on a flag or on the pill selects the region.' } } },
};

// ─── IN THE HEADER (Figma Header Menu: switch, 24px, bell) ───────────────────
export const InHeader: Story = {
  name: 'In the header',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-24)' }}>
      <RegionSwitch />
      <HeaderMenu>
        <HeaderMenuItem icon="bell" label="Notifications" dot="warning" />
      </HeaderMenu>
    </div>
  ),
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      <RegionSwitch defaultValue="us" />
      <RegionSwitch defaultValue="eu" />
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
