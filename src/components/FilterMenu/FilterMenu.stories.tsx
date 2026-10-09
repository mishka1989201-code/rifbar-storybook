import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button';
import { CheckListModal, type CheckListOption } from '../CheckListModal';
import { DatePicker, type DateRange } from '../DatePicker';
import { Modal } from '../Modal';
import { FilterMenu, type FilterMenuApplied } from './FilterMenu';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=7079-92966';

const STATUSES: CheckListOption[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-work', label: 'In work' },
  { value: 'approved', label: 'Approved' },
  { value: 'awaiting-payment', label: 'Awaiting payment' },
  { value: 'in-shipping', label: 'In shipping' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'received', label: 'Received' },
];

/** The chips of the Figma frame (it repeats “Approved”; each value is used once here). */
const CHIPS: FilterMenuApplied[] = STATUSES.map((s) => ({ id: s.value, label: 'Status', value: s.label }));

/** Figma `Info Modal` “Date range”: the dialog surface with a `DatePicker` (range, two months) inside. */
function DateRangeSection({ defaultCollapsed = false }: { defaultCollapsed?: boolean }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [range, setRange] = useState<DateRange>({ start: new Date(2023, 2, 16), end: new Date(2023, 2, 25) });
  return (
    <Modal
      title="Date range"
      icon={null}
      size="list"
      elevated
      headerAction={
        <Button
          variant="light"
          iconOnly={collapsed ? 'chevron-down' : 'chevron-up'}
          aria-label="Collapse"
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((c) => !c)}
        />
      }
    >
      {collapsed ? null : (
        <DatePicker mode="range" value={range} onChange={setRange} defaultMonth={new Date(2023, 2, 1)} style={{ width: '100%' }} />
      )}
    </Modal>
  );
}

const meta = {
  title: 'Organisms/FilterMenu',
  component: FilterMenu,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    title: { control: 'text' },
    count: { control: 'number' },
    filters: { control: 'object' },
    onClose: { action: 'close' },
    onRemoveFilter: { action: 'remove' },
    children: { control: false },
  },
  args: { title: 'Filters', count: 8, filters: CHIPS },
  // Figma frame is 768px wide.
  decorators: [(Story) => <div style={{ maxWidth: 768 }}><Story /></div>],
} satisfies Meta<typeof FilterMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const AllStatuses = STATUSES.map((s) => s.value);

// ─── DEFAULT (Figma Filter Responsive Menu) ──────────────────────────────────
export const Default: Story = {
  render: (args) => (
    <FilterMenu {...args}>
      <CheckListModal title="Status" allLabel="All" options={STATUSES} value={AllStatuses} />
      <DateRangeSection />
    </FilterMenu>
  ),
};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const NoFilters: Story = {
  name: 'No applied filters',
  args: { filters: [], count: 0 },
  render: (args) => (
    <FilterMenu {...args}>
      <CheckListModal title="Status" allLabel="All" options={STATUSES} value={[]} />
      <DateRangeSection defaultCollapsed />
    </FilterMenu>
  ),
};

export const SectionsCollapsed: Story = {
  name: 'Sections collapsed',
  render: (args) => (
    <FilterMenu {...args}>
      <CheckListModal title="Status" allLabel="All" options={STATUSES} value={AllStatuses} collapsed />
      <DateRangeSection defaultCollapsed />
    </FilterMenu>
  ),
  parameters: { docs: { description: { story: 'The chevron in each section header collapses it (AI-defined: Figma draws only the open state).' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const NoSections: Story = { name: 'No sections' };

export const ManyFilters: Story = {
  name: 'Many filters',
  args: {
    count: 24,
    filters: Array.from({ length: 24 }, (_, i) => ({ id: String(i), label: i % 2 ? 'Warehouse' : 'Status', value: `Value number ${i + 1}` })),
  },
  parameters: { docs: { description: { story: 'The chips wrap onto as many lines as needed.' } } },
};

export const LongTitle: Story = {
  name: 'Long title',
  args: { title: 'Filters for orders, invoices, payments and shipments of all warehouses', count: 128 },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  render: (args) => (
    <FilterMenu {...args}>
      <CheckListModal title="Status" allLabel="All" options={STATUSES.slice(0, 3)} value={['pending']} />
    </FilterMenu>
  ),
};

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: function Render(args) {
    const [selected, setSelected] = useState<string[]>(AllStatuses);
    const [open, setOpen] = useState(true);
    const filters = selected.map((v) => ({ id: v, label: 'Status', value: STATUSES.find((s) => s.value === v)?.label }));
    return open ? (
      <FilterMenu
        {...args}
        count={selected.length}
        filters={filters}
        onRemoveFilter={(id) => setSelected((s) => s.filter((v) => v !== id))}
        onClose={() => setOpen(false)}
      >
        <CheckListModal title="Status" allLabel="All" options={STATUSES} value={selected} onChange={setSelected} />
        <DateRangeSection />
      </FilterMenu>
    ) : (
      <button type="button" onClick={() => setOpen(true)}>Open filters ({selected.length})</button>
    );
  },
  parameters: { docs: { description: { story: 'Remove a chip with × — its row is unticked; tick rows — chips and the count follow.' } } },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-32)' }}>
      <FilterMenu {...args}>
        <CheckListModal title="Status" allLabel="All" options={STATUSES} value={AllStatuses} />
        <DateRangeSection />
      </FilterMenu>
      <FilterMenu {...args} filters={[]} count={0}>
        <CheckListModal title="Status" allLabel="All" options={STATUSES} value={[]} collapsed />
      </FilterMenu>
    </div>
  ),
};

/** Figma "Dark Molecules Components" → Filter Responsive Dark (menu: AI-defined). Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
