import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button';
import { FilterField } from '../InputField';
import type { ViewMode } from '../ViewSwitch';
import { TableToolbar } from './TableToolbar';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=818-311188';

/** Figma `InputField` Type=Filter: “Date range” (calendar icon) and “Status”. */
const FILTERS = (
  <>
    <FilterField icon="date" placeholder="Date range" style={{ width: 120 }} aria-label="Date range" />
    <FilterField placeholder="Status" style={{ width: 120 }} aria-label="Status" />
  </>
);

const SORT = <Button variant="outline" iconOnly="sort" aria-label="Sort by" />;

const meta = {
  title: 'Molecules/TableToolbar',
  component: TableToolbar,
  parameters: { layout: 'padded', backgrounds: { default: 'canvas' }, design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    compact: { control: 'boolean' },
    filterCount: { control: 'number' },
    view: { control: 'inline-radio', options: [undefined, 'cards', 'list'] },
    filters: { control: false },
    sort: { control: false },
    onExport: { action: 'export' },
    onClear: { action: 'clear' },
    onFilterClick: { action: 'filter' },
    onViewChange: { action: 'view' },
  },
  args: { filters: FILTERS, sort: SORT, filterCount: 8, view: 'list' },
  // Figma content width at 1920px.
  decorators: [(Story) => <div style={{ maxWidth: 1524 }}><Story /></div>],
} satisfies Meta<typeof TableToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const COMPACT = [(Story: () => JSX.Element) => <div style={{ maxWidth: 704 }}><Story /></div>];

// ─── DEFAULT (Figma Buttons & Filters, desktop) ──────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Compact: Story = {
  args: { compact: true },
  decorators: COMPACT,
  parameters: { docs: { description: { story: 'Figma `Buttons & Filters` at 768px and below.' } } },
};

export const CompactNoFilters: Story = {
  name: 'Compact, no applied filters',
  args: { compact: true, filterCount: 0 },
  decorators: COMPACT,
  parameters: { docs: { description: { story: 'Without applied filters the badge is hidden (AI-defined; Figma shows 8).' } } },
};

export const CompactWithClear: Story = {
  name: 'Compact with Clear',
  args: { compact: true, showClear: true, view: undefined },
  decorators: COMPACT,
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3739-305804' }, docs: { description: { story: 'Figma `Management` at 768px and below: Export, Clear, Filter 8 and the sort button, no view switch.' } } },
};

export const WithoutView: Story = {
  name: 'Without view switch',
  args: { view: undefined },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const CompactNarrow: Story = {
  name: 'Compact, 340px',
  args: { compact: true },
  decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
  parameters: { docs: { description: { story: 'At 360px Figma moves the view switch to its own line — plain flex wrapping with a 24px gap.' } } },
};

export const DesktopNarrow: Story = {
  name: 'Desktop in a narrow container',
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Not drawn: the controls wrap onto further lines (AI-defined); use `compact` below 768px.' } } },
};

export const LongLabels: Story = {
  name: 'Long labels',
  args: { exportLabel: 'Export all orders to a spreadsheet', clearLabel: 'Clear all filters and search' },
};

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: function Render(args) {
    const [view, setView] = useState<ViewMode>('list');
    const [q, setQ] = useState('');
    return <TableToolbar {...args} view={view} onViewChange={setView} searchProps={{ value: q, onChange: (e) => setQ(e.target.value) }} />;
  },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-32)' }}>
      <TableToolbar {...args} />
      <div style={{ maxWidth: 704 }}><TableToolbar {...args} compact /></div>
      <div style={{ maxWidth: 340 }}><TableToolbar {...args} compact /></div>
    </div>
  ),
};
