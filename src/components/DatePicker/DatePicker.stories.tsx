import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker, type DatePickerProps, type DateRange } from './DatePicker';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3922-225782';
const figma = (node: string) => ({ design: { type: 'figma' as const, url: `https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=${node}` } });

/** Figma draws March 2023 with the 16th selected. */
const MARCH = new Date(2023, 2, 1);
const PICKED = new Date(2023, 2, 16);
const RANGE: DateRange = { start: new Date(2023, 2, 16), end: new Date(2023, 2, 25) };

const meta = {
  title: 'Organisms/DatePicker',
  component: DatePicker,
  parameters: { layout: 'padded', backgrounds: { default: 'canvas' }, design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    mode: { control: 'inline-radio', options: ['single', 'range'] },
    footer: { control: 'inline-radio', options: ['actions', 'today', 'none'] },
    months: { control: 'inline-radio', options: [1, 2] },
    withTime: { control: 'boolean' },
    locale: { control: 'text' },
    onChange: { action: 'changed' },
    onApply: { action: 'applied' },
    onCancel: { action: 'cancelled' },
    onMonthChange: { action: 'month changed' },
  },
  args: { defaultMonth: MARCH, defaultValue: PICKED },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Property 1=date) ────────────────────────────────────────
export const Default: Story = { parameters: figma('3773-296145') };

// ─── VARIANTS (Figma Property 1) ─────────────────────────────────────────────
export const DateAndTime: Story = {
  name: 'Date and time',
  args: { withTime: true, defaultValue: new Date(2023, 2, 16, 13, 20) },
  parameters: figma('3923-227673'),
};

export const OneButtonApply: Story = {
  name: 'One button (Today)',
  args: { footer: 'today' },
  parameters: figma('3773-296759'),
};

export const Range: Story = {
  name: 'Range (Full)',
  args: { mode: 'range', defaultValue: RANGE },
  parameters: figma('93-37858'),
};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const NothingPicked: Story = {
  name: 'Nothing picked',
  args: { defaultValue: null },
  parameters: { docs: { description: { story: '`Apply` is disabled until a day is picked (AI-defined: Figma draws only the picked state).' } } },
};

export const RangeNothingPicked: Story = {
  name: 'Range: nothing picked',
  args: { mode: 'range', defaultValue: { start: null, end: null } },
  parameters: { docs: { description: { story: 'The summary shows a placeholder; `Apply` waits for both ends (AI-defined).' } } },
};

export const RangeStartOnly: Story = {
  name: 'Range: start only',
  args: { mode: 'range', defaultValue: { start: PICKED, end: null } },
  parameters: { docs: { description: { story: 'First click of a range: the start is marked, the summary shows `…` (AI-defined).' } } },
};

export const NoFooter: Story = {
  name: 'Without footer',
  args: { footer: 'none' },
  parameters: { docs: { description: { story: 'Live selection, e.g. inside a filter that applies on change (AI-defined).' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const SixWeekMonth: Story = {
  name: 'Month of six weeks',
  args: { defaultMonth: new Date(2023, 3, 1), defaultValue: new Date(2023, 3, 12) },
  parameters: { docs: { description: { story: 'April 2023 needs six rows; the panel grows (Figma shows five).' } } },
};

export const RangeAcrossMonths: Story = {
  name: 'Range across two months',
  args: { mode: 'range', defaultValue: { start: new Date(2023, 2, 27), end: new Date(2023, 3, 6) } },
};

export const Ukrainian: Story = {
  name: 'Ukrainian locale',
  args: { locale: 'uk-UA', defaultValue: PICKED },
  parameters: { docs: { description: { story: 'Month, weekday and date names come from `Intl`; the week still starts on Sunday, as in Figma.' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container (240px)',
  args: { mode: 'range', defaultValue: RANGE },
  decorators: [(Story) => <div style={{ width: 240, overflow: 'auto' }}><Story /></div>],
  parameters: { docs: { description: { story: 'The panel keeps its calendar width and scrolls inside the container (AI-defined).' } } },
};

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: (args) => {
    const [applied, setApplied] = useState<string>('—');
    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-24)', alignItems: 'flex-start' }}>
        <DatePicker
          mode="range"
          defaultMonth={args.defaultMonth}
          defaultValue={{ start: null, end: null }}
          onApply={(v) => setApplied(`${v.start?.toDateString()} – ${v.end?.toDateString()}`)}
        />
        <p style={{ margin: 0, fontFamily: 'var(--font-family-base)' }}>Applied: {applied}</p>
      </div>
    );
  },
  parameters: { docs: { description: { story: 'Pick two days (a click before the start restarts the range), then press `Apply`. Arrow keys, Home / End and PageUp / PageDown move between days.' } } },
};

// ─── ALL VARIANTS (Figma frame: date, date-time, OneButtonApply, Full) ───────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => {
    const base = { defaultMonth: args.defaultMonth, defaultValue: PICKED };
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-24)', alignItems: 'flex-start' }}>
        <DatePicker {...base} />
        <DatePicker {...base} withTime defaultValue={new Date(2023, 2, 16, 13, 20)} />
        <DatePicker {...base} footer="today" />
        <DatePicker {...({ ...base, mode: 'range', defaultValue: RANGE } as DatePickerProps)} />
      </div>
    );
  },
};

/** Figma "Dark Organisms Components" → Date-range-dark / date-range-apply-dark / date-range-today-dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
