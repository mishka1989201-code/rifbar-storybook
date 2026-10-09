import type { Meta, StoryObj } from '@storybook/react';
import { InfoTable, type InfoTableRow } from './InfoTable';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=112-32328';

const ROUTE: InfoTableRow[] = [
  { label: 'Warehouse from', value: 'Chongqing #3' },
  { label: 'Address from', value: 'Fenghuangtai, Yuzhong District, Chongqing, China, 400012' },
  { label: 'Warehouse to', value: 'Warsaw #345' },
  { label: 'Address to', value: 'Poland, Warsaw, Męcińska Street, 18' },
  { label: 'Status', value: 'In delivery' },
  { label: 'Cargo details', value: '4 seats/68 kg/0.900 m3' },
  { label: 'Delivery services', value: '$160' },
  { label: 'Delivery services', value: '$160' },
];

const DELIVERY: InfoTableRow[] = [
  { label: 'Start date', value: '24.08.2023' },
  { label: 'Estimated delivery date', value: '19.09.2023' },
  { label: 'Delivery service name', value: 'FedEx' },
  { label: 'Tracking number', value: '125385764323' },
  { label: 'Service email', value: 'fedexcompany2023@gmail.com' },
  { label: 'Service phone', value: '+48 79 1362547' },
  { label: 'Service website', value: 'https://www.fedex.com/...' },
];

const meta = {
  title: 'Molecules/InfoTable',
  component: InfoTable,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { columns: [ROUTE, DELIVERY] },
  argTypes: { columns: { control: 'object' } },
  decorators: [(Story) => <div style={{ maxWidth: 1524 }}><Story /></div>],
} satisfies Meta<typeof InfoTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: InfoTable/V2) ───────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const SingleColumn: Story = { name: 'Single column', args: { columns: [DELIVERY] } };
export const ThreeColumns: Story = {
  name: 'Three columns',
  args: { columns: [ROUTE.slice(0, 4), DELIVERY.slice(0, 4), DELIVERY.slice(3)] },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const Empty: Story = { args: { columns: [] } };
export const LongValues: Story = {
  name: 'Long values',
  args: {
    columns: [[
      { label: 'Address', value: 'Fenghuangtai, Yuzhong District, Chongqing, China, 400012, Building 7, Floor 14, Office 1402' },
      { label: 'Link', value: 'https://www.fedex.com/very/long/tracking/path/without/any/spaces/125385764323125385764323' },
    ]],
  },
};
export const Narrow: Story = {
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      <InfoTable columns={[ROUTE, DELIVERY]} />
      <InfoTable columns={[DELIVERY]} />
      <InfoTable columns={[ROUTE.slice(0, 3), DELIVERY.slice(0, 3), DELIVERY.slice(4)]} />
    </div>
  ),
};

/** Figma "Dark Molecules Components" → Info v2 Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
