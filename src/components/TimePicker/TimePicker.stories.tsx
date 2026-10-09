import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from './TimePicker';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=3923-227845';

const meta = {
  title: 'Molecules/TimePicker',
  component: TimePicker,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    hours: { control: { type: 'number', min: 0, max: 23 } },
    minutes: { control: { type: 'number', min: 0, max: 59 } },
    minuteStep: { control: 'number' },
    disabled: { control: 'boolean' },
    onChange: { action: 'change' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 262 }}><Story /></div>],
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: 01:20 PM) ───────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Morning: Story = { args: { defaultHours: 9, defaultMinutes: 45 } };
export const Midnight: Story = { args: { defaultHours: 0, defaultMinutes: 0 } };
export const Noon: Story = { args: { defaultHours: 12, defaultMinutes: 0 } };
export const FiveMinuteStep: Story = { name: 'Minute step 5', args: { minuteStep: 5, defaultMinutes: 25 } };

export const Controlled: Story = {
  render: () => {
    const [time, setTime] = useState({ h: 17, m: 30 });
    return <TimePicker hours={time.h} minutes={time.m} onChange={(h, m) => setTime({ h, m })} />;
  },
};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Disabled: Story = { args: { disabled: true } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const Narrow: Story = {
  decorators: [(Story) => <div style={{ maxWidth: 200 }}><Story /></div>],
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      <TimePicker />
      <TimePicker defaultHours={9} defaultMinutes={45} />
      <TimePicker defaultHours={0} defaultMinutes={0} />
      <TimePicker disabled />
    </div>
  ),
};

/** Figma "Dark Molecules Components" → Time picker. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
