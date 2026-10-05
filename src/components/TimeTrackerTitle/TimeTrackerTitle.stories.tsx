import type { Meta, StoryObj } from '@storybook/react';
import { TimeTrackerTitle } from './TimeTrackerTitle';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=662-271081';

const meta = {
  title: 'Molecules/TimeTracker/Title',
  component: TimeTrackerTitle,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { title: 'My Time' },
  argTypes: { title: { control: 'text' }, playProps: { control: 'object' } },
} satisfies Meta<typeof TimeTrackerTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Running: Story = {
  name: 'Running (Stop button)',
  args: { title: 'My Time', playProps: { kind: 'stop' } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongTitle: Story = {
  name: 'Long title',
  decorators: [(Story) => <div style={{ maxWidth: 240 }}><Story /></div>],
  args: { title: 'My time for the whole running week of the project' },
};
