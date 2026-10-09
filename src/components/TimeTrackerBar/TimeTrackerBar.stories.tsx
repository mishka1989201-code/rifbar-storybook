import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TimeTrackerBar } from './TimeTrackerBar';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=662-271087';

const meta = {
  title: 'Molecules/TimeTracker/Bar',
  component: TimeTrackerBar,
  parameters: { layout: 'fullscreen', design: { type: 'figma', url: FIGMA_URL } },
  args: { titleProps: { title: 'My Time' }, dateProps: { label: 'Today' } },
  argTypes: { titleProps: { control: 'object' }, dateProps: { control: 'object' } },
  decorators: [(Story) => <div style={{ background: 'var(--color-bg)' }}><Story /></div>],
} satisfies Meta<typeof TimeTrackerBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma, 1492px in the mockup, here 100%) ───────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: (args) => {
    const [running, setRunning] = useState(false);
    const [offset, setOffset] = useState(0);
    const label = offset === 0 ? 'Today' : `${Math.abs(offset)} day${Math.abs(offset) > 1 ? 's' : ''} ${offset < 0 ? 'ago' : 'ahead'}`;
    return (
      <TimeTrackerBar
        {...args}
        titleProps={{ title: 'My Time', playProps: { kind: running ? 'stop' : 'play', onClick: () => setRunning((r) => !r) } }}
        dateProps={{
          label,
          onPrev: () => setOffset((o) => o - 1),
          onNext: () => setOffset((o) => o + 1),
          onReset: () => setOffset(0),
        }}
      />
    );
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};

/** Figma "Dark Molecules Components" → Play Actions Menu Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
