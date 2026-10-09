import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ScheduledCallCard } from './ScheduledCallCard';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3896-260429';

const meta = {
  title: 'Organisms/ScheduledCallCard',
  component: ScheduledCallCard,
  parameters: { layout: 'padded', backgrounds: { default: 'canvas' }, design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    state: { control: 'inline-radio', options: ['static', 'time-to-call'] },
    title: { control: 'text' },
    dateLabel: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    refreshLabel: { control: 'text' },
    onDateClick: { action: 'date' },
    onRefresh: { action: 'refresh' },
  },
  args: { state: 'static', value: '03/28/2024 10:23 AM', onRefresh: () => {} },
  // Figma card is 1524px wide.
  decorators: [(Story) => <div style={{ maxWidth: 1524 }}><Story /></div>],
} satisfies Meta<typeof ScheduledCallCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma Property 1=Static) ───────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const TimeToCall: Story = { name: 'Time to call (Figma Property 1=Time to call)', args: { state: 'time-to-call' } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const NoDate: Story = { name: 'No date', args: { value: undefined } };

export const NoRefresh: Story = {
  name: 'No refresh button',
  render: ({ onRefresh: _omit, ...args }) => <ScheduledCallCard {...args} />,
  parameters: { docs: { description: { story: 'The button is drawn only when `onRefresh` is passed.' } } },
};

export const LongTitle: Story = {
  name: 'Long title',
  args: { title: 'Scheduled call with the client about the delayed delivery of the autumn collection' },
  parameters: { docs: { description: { story: 'The title is cut with an ellipsis (`CardHeader`).' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
  parameters: { docs: { description: { story: 'The button drops under the date field.' } } },
};

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: function Render(args) {
    const [due, setDue] = useState(false);
    const [count, setCount] = useState(0);
    return (
      <ScheduledCallCard
        {...args}
        state={due ? 'time-to-call' : 'static'}
        onDateClick={() => setDue((d) => !d)}
        refreshLabel={`Refresh (${count})`}
        onRefresh={() => setCount((c) => c + 1)}
      />
    );
  },
  parameters: { docs: { description: { story: 'Press the date to switch between the two states (a stand-in for the timer); Refresh counts clicks.' } } },
};

// ─── ALL VARIANTS (Figma frame: Static, Time to call) ────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      <ScheduledCallCard {...args} state="static" onRefresh={() => {}} />
      <ScheduledCallCard {...args} state="time-to-call" onRefresh={() => {}} />
    </div>
  ),
};
