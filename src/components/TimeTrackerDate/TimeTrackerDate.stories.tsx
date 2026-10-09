import type { Meta, StoryObj } from '@storybook/react';
import { TimeTrackerDate } from './TimeTrackerDate';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=662-271082';

const meta = {
  title: 'Molecules/TimeTracker/Date',
  component: TimeTrackerDate,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { label: 'Today', onPrev: () => {}, onReset: () => {}, onNext: () => {} },
  argTypes: {
    label: { control: 'text' },
    prevDisabled: { control: 'boolean' },
    nextDisabled: { control: 'boolean' },
    onPrev: { action: 'prev' },
    onReset: { action: 'reset' },
    onNext: { action: 'next' },
  },
} satisfies Meta<typeof TimeTrackerDate>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const OtherDay: Story = { name: 'Other day', args: { label: 'Oct 4, 2026' } };

export const NextDisabled: Story = { name: 'Next disabled (today)', args: { nextDisabled: true } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 220 }}><Story /></div>],
  args: { label: 'Wednesday, October 4, 2026' },
};

/** Figma "Dark Molecules Components" → Date Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const DefaultDark: Story = {
  ...Default,
  name: 'Default (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content', minWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
