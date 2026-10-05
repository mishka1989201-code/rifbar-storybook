import type { Meta, StoryObj } from '@storybook/react';
import { TimeScale } from './TimeScale';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=662-271469';

const meta = {
  title: 'Molecules/TimeTracker/TimeScale',
  component: TimeScale,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: {
    segments: [
      { start: 8, end: 9.6 },
      { start: 10, end: 10.15 },
    ],
  },
  argTypes: {
    segments: { control: 'object' },
    startHour: { control: 'number' },
    hours: { control: 'number' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1492 }}><Story /></div>],
} satisfies Meta<typeof TimeScale>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: two worked periods in the morning) ──────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Empty: Story = { name: 'Nothing worked', args: { segments: [] } };

export const FullDay: Story = { name: 'Full day', args: { segments: [{ start: 8, end: 20 }] } };

export const OtherHours: Story = {
  name: 'Other hours (06:00 – 18:00)',
  args: { startHour: 6, segments: [{ start: 7.5, end: 12 }, { start: 13, end: 16.25 }] },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const OutOfRange: Story = {
  name: 'Period outside the scale',
  args: { segments: [{ start: 6, end: 9 }, { start: 19, end: 23 }] },
};
