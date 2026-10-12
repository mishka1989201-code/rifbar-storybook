import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from '../Dropdown';
import { FilterField } from '../InputField';
import { TableActionsRow } from './TableActionsRow';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=29-18706';

const meta = {
  title: 'Molecules/TableActionsRow',
  component: TableActionsRow,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    exportLabel: { control: 'text' },
    clearLabel: { control: 'text' },
    searchProps: { control: 'object', description: 'Props of the SearchField (`value`, `onSearch`, `placeholder`…)' },
    onExport: { action: 'export' },
    onClear: { action: 'clear' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1556 }}><Story /></div>],
} satisfies Meta<typeof TableActionsRow>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const WithSearchText: Story = {
  name: 'With search text',
  args: { searchProps: { defaultValue: 'Acme' } },
  parameters: { docs: { description: { story: 'SearchField `Style=Active`: dark search button.' } } },
};

export const CustomLabels: Story = {
  name: 'Custom labels',
  args: { exportLabel: 'Export to Excel', clearLabel: 'Reset filters', searchProps: { placeholder: 'Search clients' } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const SearchDisabled: Story = {
  name: 'Search disabled',
  args: { searchProps: { disabled: true } },
};

export const ExportMenu: Story = {
  name: 'Export menu',
  args: {
    exportOpen: true,
    exportMenu: <Dropdown options={[{ value: 'csv', label: 'CSV' }, { value: 'pdf', label: 'PDF', forceHover: true }, { value: 'xlsx', label: 'Excel' }]} />,
  },
  decorators: [(Story) => <div style={{ paddingBottom: 140 }}><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=79-60265' },
    docs: { description: { story: 'Figma `Export DropDown`: the standard `Dropdown` (180px) 4px under Export. Opening and closing belong to the caller.' } },
  },
};

export const CustomPriceFilters: Story = {
  name: 'Without Export, with filters (Custom price)',
  args: {
    showExport: false,
    searchProps: { placeholder: 'Search by keyword' },
    filters: (
      <>
        <FilterField placeholder="Group" />
        <FilterField value="Discounts on" />
      </>
    ),
  },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=1299-429122' },
    docs: { description: { story: 'Figma `TableActionsRow` of the client\'s Custom price tab: “Clear”, two `FilterField`s (`Group`, `Discounts on`) and the search. No Export button (`showExport={false}`).' } },
  },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 520 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Buttons and the 232px search never shrink; the row is meant for tablet width and up.' } } },
};

/** Figma "Dark Molecules Components" → Actions Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
