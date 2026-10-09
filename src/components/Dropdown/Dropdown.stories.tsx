import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, type DropdownOption } from './Dropdown';
import { FilterField } from '../InputField';
import { Button } from '../Button';
import { UserDropdown as UserTrigger } from '../UserDropdown';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=32-55784';

const STATUSES: DropdownOption[] = [
  { value: 'none', label: 'None' },
  { value: 'pending', label: 'Pending' },
  { value: 'shipping', label: 'In shipping', forceHover: true },
  { value: 'received', label: 'Received' },
];

const STATUSES_WITH_ALL: DropdownOption[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'shipping', label: 'In shipping', forceHover: true },
  { value: 'received', label: 'Received' },
];

const PEOPLE: DropdownOption[] = [
  { value: 'all', label: 'All' },
  { value: 'david', label: 'David Schwimmer' },
  { value: 'matthew', label: 'Matthew Perry', forceHover: true },
  { value: 'matt', label: 'Matt LeBlanc' },
];

const SORT_FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=7061-44267';

const SORT_OPTIONS: DropdownOption[] = [
  { value: 'name', label: 'Order name' },
  { value: 'price', label: 'Price' },
  { value: 'type', label: 'Type', forceHover: true },
  { value: 'date', label: 'Date' },
  { value: 'status', label: 'Status' },
  { value: 'client', label: 'Client' },
];

const DISCOUNTS: DropdownOption[] = [
  { value: 'off', label: 'Discounts off' },
  { value: 'active', label: 'Active discounts' },
];

const meta = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { variant: 'list', control: 'none', searchable: false, options: STATUSES, defaultValue: 'pending' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['list', 'notifications', 'user'] },
    control: { control: 'inline-radio', options: ['none', 'radio', 'checkbox'] },
    searchable: { control: 'boolean' },
    options: { control: 'object' },
    onChange: { action: 'change' },
    onSeeAll: { action: 'see all' },
    onAction: { action: 'action' },
    onNotificationClick: { action: 'notification' },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Style=Standart) ─────────────────────────────────────────
export const Default: Story = {};

// ─── LIST VARIANTS ───────────────────────────────────────────────────────────
export const RadioButton: Story = { name: 'Radio Button', args: { control: 'radio' } };
export const Checkbox: Story = { args: { control: 'checkbox', defaultValue: ['pending'] } };
export const StandartAndSearch: Story = { name: 'Standart & Search', args: { searchable: true } };
export const RadioButtonAndSearch: Story = {
  name: 'Radio Button & Search',
  args: { control: 'radio', searchable: true, options: STATUSES_WITH_ALL },
};
export const CheckboxAndSearch: Story = {
  name: 'Checkbox & Search',
  args: { control: 'checkbox', searchable: true, options: PEOPLE, defaultValue: ['david'] },
};

// ─── SPECIAL PANELS ──────────────────────────────────────────────────────────
export const Notification: Story = { args: { variant: 'notifications' } };
export const UserDropdown: Story = {
  name: 'User Dropdown',
  args: { variant: 'user', actions: [{ value: 'settings', label: 'Settings', forceHover: true }, { value: 'logout', label: 'Logout' }] },
};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const NothingSelected: Story = { name: 'Nothing selected', args: { defaultValue: undefined } };
export const DisabledOption: Story = {
  name: 'Disabled option',
  args: { options: STATUSES.map((o) => (o.value === 'received' ? { ...o, disabled: true } : o)) },
};

export const InteractiveCheckbox: Story = {
  name: 'Interactive (checkbox)',
  render: () => {
    const [value, setValue] = useState<string[]>(['pending']);
    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-24)', alignItems: 'flex-start' }}>
        <Dropdown control="checkbox" searchable options={PEOPLE} value={value} onChange={(v) => setValue(v as string[])} />
        <code>{JSON.stringify(value)}</code>
      </div>
    );
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongLabels: Story = {
  name: 'Long labels',
  args: {
    control: 'checkbox',
    options: [
      { value: 'a', label: 'Warehouse Chongqing #3 — northern distribution region' },
      { value: 'b', label: 'In shipping' },
    ],
  },
  decorators: [(Story) => <div style={{ width: 180 }}><Story /></div>],
};

export const EmptySearch: Story = {
  name: 'Empty (search finds nothing)',
  args: { searchable: true, options: [] },
};

export const LongNotifications: Story = {
  name: 'Long notifications',
  args: {
    variant: 'notifications',
    notifications: [
      { id: '1', unread: true, text: 'Check the warehouse “Warsaw #345” - problems with the quantity! The stock count differs from the system by more than 120 units across several categories.' },
      { id: '2', text: 'Order #4521 is ready.' },
    ],
  },
};

export const NoNotifications: Story = { name: 'No notifications', args: { variant: 'notifications', notifications: [] } };

// ─── SCROLLING LIST (Figma: Property 1=SortBy) ───────────────────────────────
export const SortBy: Story = {
  name: 'Sort by (scrolling list)',
  parameters: { design: { type: 'figma', url: SORT_FIGMA_URL } },
  args: { options: SORT_OPTIONS, defaultValue: 'price', maxRows: 4, listLabel: 'Sort by' },
};

export const FewerRowsThanMax: Story = {
  name: 'Fewer rows than maxRows (no scrollbar)',
  args: { maxRows: 4 },
};

// ─── TRIGGER + PANEL (Figma: Property 1=Default / SortBy / User) ──────────────
export const WithFilterTrigger: Story = {
  name: 'With filter trigger (Figma Default)',
  parameters: { design: { type: 'figma', url: SORT_FIGMA_URL } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
      <FilterField value="Discounts off" open />
      <Dropdown control="radio" options={DISCOUNTS} defaultValue="off" />
    </div>
  ),
};

export const WithSortTrigger: Story = {
  name: 'With sort trigger (Figma SortBy)',
  parameters: { design: { type: 'figma', url: SORT_FIGMA_URL } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
      <Button variant="outline" iconOnly="sort" aria-label="Sort by" aria-expanded />
      <Dropdown options={SORT_OPTIONS} defaultValue="price" maxRows={4} listLabel="Sort by" />
    </div>
  ),
};

export const WithUserTrigger: Story = {
  name: 'With user trigger (Figma User)',
  parameters: { design: { type: 'figma', url: SORT_FIGMA_URL } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
      <Dropdown variant="user" actions={[{ value: 'settings', label: 'Settings', forceHover: true }, { value: 'logout', label: 'Logout' }]} />
      <UserTrigger name="Jennifer Corbett" open />
    </div>
  ),
};

// ─── ALL VARIANTS (Figma layout) ─────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, max-content)', gap: 'var(--spacing-24)', alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
        <Dropdown options={STATUSES} defaultValue="pending" />
        <Dropdown searchable options={STATUSES} defaultValue="pending" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
        <Dropdown control="radio" options={STATUSES} defaultValue="pending" />
        <Dropdown control="radio" searchable options={STATUSES_WITH_ALL} defaultValue="pending" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
        <Dropdown control="checkbox" options={STATUSES} defaultValue={['pending']} />
        <Dropdown control="checkbox" searchable options={PEOPLE} defaultValue={['david']} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
        <Dropdown variant="notifications" />
        <Dropdown variant="user" actions={[{ value: 'settings', label: 'Settings', forceHover: true }, { value: 'logout', label: 'Logout' }]} />
      </div>
    </div>
  ),
};

/** Figma "Dark Molecules Components" → Dropdown Dark (all styles). Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
