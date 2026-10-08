import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TimeTracker, type TimeTrackerState } from './TimeTracker';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=662-271601';

/** The two worked periods drawn in Figma: 08:00 – 09:36 and 10:00 – 10:09. */
const SEGMENTS = [
  { start: 8, end: 9.6 },
  { start: 10, end: 10.15 },
];

const STATS = [
  { label: 'Total', value: '1 h 59 min' },
  { label: 'Break', value: '23 min' },
];

const meta = {
  title: 'Organisms/TimeTracker',
  component: TimeTracker,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'canvas' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    state: { control: 'inline-radio', options: ['static', 'active', 'disabled'] },
    title: { control: 'text' },
    dateLabel: { control: 'text' },
    stats: { control: 'object' },
    segments: { control: 'object' },
    onToggle: { action: 'toggle' },
    onPrev: { action: 'prev' },
    onReset: { action: 'reset' },
    onNext: { action: 'next' },
  },
  args: { state: 'static', title: 'David Schwimmer', dateLabel: 'Today', stats: STATS, segments: SEGMENTS },
  // Figma card is 1524px wide.
  decorators: [(Story) => <div style={{ maxWidth: 1524 }}><Story /></div>],
} satisfies Meta<typeof TimeTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma Property 1=Static) ───────────────────────────────────────
export const Default: Story = {};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Active: Story = { name: 'Active (Figma Property 1=Active)', args: { state: 'active' } };
export const Disabled: Story = { name: 'Disabled (Figma Property 1=Disabled)', args: { state: 'disabled' } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const NothingTracked: Story = {
  name: 'Nothing tracked',
  args: { segments: [], stats: [{ label: 'Total', value: '0 min' }, { label: 'Break', value: '0 min' }] },
};

export const NoStats: Story = { name: 'No statistic', args: { stats: [] } };

export const ThreeStats: Story = {
  name: 'Three statistics',
  args: { stats: [...STATS, { label: 'Overtime', value: '0 min' }] },
};

export const LongTitle: Story = {
  name: 'Long title',
  args: { title: 'David Alexander Schwimmer-Hargreaves, Senior Account Manager' },
};

export const FullDay: Story = {
  name: 'Full day',
  args: { segments: [{ start: 8, end: 20 }], stats: [{ label: 'Total', value: '12 h' }, { label: 'Break', value: '0 min' }] },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
  parameters: { docs: { description: { story: 'The bar wraps; the statistic wraps; the scale labels stay in one row and shrink with the scale.' } } },
};

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: function Render(args) {
    const [state, setState] = useState<TimeTrackerState>('static');
    const [offset, setOffset] = useState(0);
    const label = offset === 0 ? 'Today' : `${Math.abs(offset)} day${Math.abs(offset) > 1 ? 's' : ''} ${offset < 0 ? 'ago' : 'ahead'}`;
    return (
      <TimeTracker
        {...args}
        state={state}
        dateLabel={label}
        onToggle={() => setState((s) => (s === 'active' ? 'static' : 'active'))}
        onPrev={() => setOffset((o) => o - 1)}
        onNext={() => setOffset((o) => o + 1)}
        onReset={() => setOffset(0)}
      />
    );
  },
  parameters: { docs: { description: { story: 'Play ↔ Stop toggles the state; the arrows change the date caption.' } } },
};

// ─── ALL VARIANTS (Figma frame: Static, Active, Disabled) ────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-32)' }}>
      <TimeTracker {...args} state="static" />
      <TimeTracker {...args} state="active" />
      <TimeTracker {...args} state="disabled" />
    </div>
  ),
};
