import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CheckListModal, type CheckListOption } from './CheckListModal';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=769-306160';

/** The rows of the Figma frame (after `All`). */
const STATUSES: CheckListOption[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-work', label: 'In work' },
  { value: 'approved', label: 'Approved' },
  { value: 'awaiting-payment', label: 'Awaiting payment' },
  { value: 'in-shipping', label: 'In shipping' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'received', label: 'Received' },
];

const ALL_VALUES = STATUSES.map((s) => s.value);

const meta = {
  title: 'Molecules/CheckListModal',
  component: CheckListModal,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    title: { control: 'text' },
    options: { control: 'object' },
    value: { control: 'object' },
    allLabel: { control: 'text' },
    description: { control: 'text' },
    searchable: { control: 'boolean' },
    onChange: { action: 'changed' },
    onCollapse: { action: 'collapse' },
  },
  // Figma: every row is checked.
  args: { title: 'Status', options: STATUSES, value: ALL_VALUES, allLabel: 'All' },
} satisfies Meta<typeof CheckListModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma Info Modal: everything checked) ──────────────────────────
export const Default: Story = {};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const SomeChecked: Story = { name: 'Some checked', args: { value: ['pending', 'approved'] } };
export const NoneChecked: Story = { name: 'None checked', args: { value: [] } };

export const DisabledRow: Story = {
  name: 'Disabled row',
  args: { options: STATUSES.map((s) => (s.value === 'rejected' ? { ...s, disabled: true } : s)), value: ['rejected'] },
  parameters: { docs: { description: { story: 'A disabled row is shown at 20% opacity (AI-defined) and is not changed by `All`.' } } },
};

export const Collapsed: Story = {
  args: { collapsed: true },
  parameters: { docs: { description: { story: 'The chevron points down and the list is hidden (AI-defined). Used by `FilterMenu`.' } } },
};

// ─── FIGMA HIDDEN LAYERS ─────────────────────────────────────────────────────
export const WithDescription: Story = {
  name: 'With description',
  args: { description: 'You have selected one product category for the customer. Select the interest rate for the discount.' },
};

export const Searchable: Story = {
  name: 'With search',
  args: { searchable: true, value: ['pending'] },
  parameters: { docs: { description: { story: 'Figma has a hidden `Search Box`. Typing filters the rows by their text; `All` is hidden while a search is active.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const WithoutAll: Story = { name: 'Without “All”', args: { allLabel: undefined, value: ['pending'] } };

export const FewOptions: Story = { name: 'Few options', args: { options: STATUSES.slice(0, 2), value: ['pending'] } };

export const LongLabels: Story = {
  name: 'Long labels',
  args: {
    options: [
      { value: 'a', label: 'Awaiting payment confirmation from the customer’s bank and the accounting department' },
      { value: 'b', label: 'Supercalifragilisticexpialidocious_status_name_without_any_spaces_at_all_1234567890' },
    ],
    value: ['a'],
  },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
  parameters: { docs: { description: { story: 'The dialog never exceeds its container; text wraps.' } } },
};

export const NothingFound: Story = {
  name: 'Nothing found',
  render: (args) => <CheckListModal {...args} searchable />,
  parameters: { docs: { description: { story: 'Type text that matches no row — “Nothing found” is shown (AI-defined).' } } },
};

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string[]>(['pending']);
    const [open, setOpen] = useState(true);
    return open ? (
      <CheckListModal {...args} value={value} onChange={setValue} onCollapse={() => setOpen(false)} searchable />
    ) : (
      <button type="button" onClick={() => setOpen(true)}>Open “Status” ({value.length})</button>
    );
  },
  parameters: { docs: { description: { story: 'Tick rows, use `All`, search, and collapse the dialog with the chevron.' } } },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-32)' }}>
      <CheckListModal {...args} />
      <CheckListModal {...args} value={['pending', 'approved']} searchable description="Select the statuses to show." />
      <CheckListModal {...args} options={STATUSES.slice(0, 3)} value={[]} allLabel={undefined} />
    </div>
  ),
};
