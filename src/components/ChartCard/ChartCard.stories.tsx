import type { Meta, StoryObj } from '@storybook/react';
import { ChartCard, type ChartSeries, type ChartSlice } from './ChartCard';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=93-26020';

const WEEKS = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

const BAR: ChartSeries[] = [
  { id: 'prev', label: 'Previous indicators', values: [46, 60, 78, 92] },
  { id: 'latest', label: 'Latest indicators', values: [66, 84, 108, 124] },
];

const SLICES: ChartSlice[] = [
  { id: 'w1', label: 'Week 1', value: 65.8 },
  { id: 'w2', label: 'Week 2', value: 30.2 },
  { id: 'w3', label: 'Week 3', value: 24.6 },
  { id: 'w4', label: 'Week 4', value: 10 },
];

const LINE: ChartSeries[] = [
  { id: 'prev', label: 'Previous indicators', values: [0, 46, 72, 96, 85, 74, 92, 98, 101, 83, 117, 100, 108, 116, 96, 107, 115, 110, 105, 115, 102, 99, 96, 88, 104, 125] },
  { id: 'latest', label: 'Latest indicators', values: [0, 22, 62, 49, 52, 62, 50, 68, 62, 73, 66, 68, 67, 73, 66, 64, 77, 61, 70, 79, 66, 51, 62, 52, 60, 75] },
];

const SMOOTH: ChartSeries[] = [
  { id: 'prev', label: 'Previous indicators', values: [50, 28, 16, 22, 60, 112, 118, 70, 40, 46, 62, 108] },
  { id: 'latest', label: 'Latest indicators', values: [76, 106, 122, 118, 98, 84, 78, 92, 108, 110, 104, 96] },
];

const TITLE = "Comparison of the worker's KPI with the previous period";

const meta = {
  title: 'Molecules/ChartCard',
  component: ChartCard,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: {
    variant: 'bar',
    title: TITLE,
    subtitle: 'Basen on the scale of 0% to 130%',
    series: BAR,
    categories: WEEKS,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['bar', 'donut', 'line', 'smooth'] },
    status: { control: 'inline-radio', options: ['ready', 'loading', 'empty', 'error'] },
    series: { control: 'object' },
    slices: { control: 'object' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 754 }}><Story /></div>],
} satisfies Meta<typeof ChartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma Chart 1) ─────────────────────────────────────────────────
export const Default: Story = { name: 'Bar (Chart 1)' };

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Donut: Story = {
  name: 'Donut (Chart 2)',
  args: { variant: 'donut', series: undefined, categories: undefined, slices: SLICES },
};

export const Line: Story = {
  name: 'Line (Chart 3)',
  args: { variant: 'line', title: "The growth of the worker's KPI with the previous period", subtitle: undefined, series: LINE },
};

export const Smooth: Story = {
  name: 'Smooth line (Chart 4)',
  args: { variant: 'smooth', title: "The growth of the worker's KPI with the previous period", subtitle: undefined, series: SMOOTH },
};

// ─── STATES (AI-defined: Figma draws only the filled chart) ──────────────────
export const Empty: Story = { args: { status: 'empty', series: [] } };
export const Loading: Story = { args: { status: 'loading' } };
export const ErrorState: Story = { name: 'Error', args: { status: 'error' } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  name: 'Long title and legend',
  args: {
    title: "Comparison of the worker's key performance indicators with the previous reporting period across all warehouses",
    subtitle: 'Based on the scale of 0% to 130%, calculated from the first to the last working day of the month',
    series: [
      { id: 'a', label: 'Previous indicators of the same period last year', values: [46, 60, 78, 92] },
      { id: 'b', label: 'Latest indicators', values: [66, 84, 108, 124] },
      { id: 'c', label: 'Planned', values: [70, 80, 90, 100] },
    ],
  },
};

export const ValuesOutOfRange: Story = {
  name: 'Values above the scale',
  args: { series: [{ id: 'a', label: 'Latest indicators', values: [0, 90, 140, 300] }] },
  parameters: { docs: { description: { story: 'Values above `yMax` are cut at the top of the plot; negative values are drawn as 0.' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container (plot scrolls)',
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Below `--size-chart-min-width` the plot keeps its size and scrolls sideways so the labels stay readable.' } } },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    // The meta decorator limits the width to one card (754px); the matrix is two cards wide as in Figma.
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 754px)', gap: 16, width: 1524 }}>
      <ChartCard variant="bar" title={TITLE} subtitle="Basen on the scale of 0% to 130%" series={BAR} categories={WEEKS} />
      <ChartCard variant="donut" title={TITLE} subtitle="Basen on the scale of 0% to 130%" slices={SLICES} />
      <ChartCard variant="line" title="The growth of the worker's KPI with the previous period" series={LINE} categories={WEEKS} />
      <ChartCard variant="smooth" title="The growth of the worker's KPI with the previous period" series={SMOOTH} categories={WEEKS} />
    </div>
  ),
};

/** AI-defined dark theme (no dark chart frame): forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const AllVariantsDark: Story = {
  ...AllVariants,
  name: 'All variants (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content', maxWidth: 'none' }}>
        <Story />
      </div>
    ),
  ],
};
