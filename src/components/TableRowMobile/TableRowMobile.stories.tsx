import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { TableRowMobile } from './TableRowMobile';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=7047-352588';

const meta = {
  title: 'Molecules/TableRowMobile',
  component: TableRowMobile,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    size: { control: 'inline-radio', options: ['360', '480'] },
    label: { control: 'text' },
    value: { control: 'text' },
    result: { control: 'text' },
    actionLabel: { control: 'text' },
    actionProps: { control: 'object', description: 'Props of the default `Button`' },
    action: { control: false },
  },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
} satisfies Meta<typeof TableRowMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: 360px) ──────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Size480: Story = {
  name: 'Size 480',
  args: { size: '480' },
  decorators: [(Story) => <div style={{ maxWidth: 416 }}><Story /></div>],
};

export const NoAction: Story = {
  name: 'No action',
  args: { action: null },
};

export const CustomAction: Story = {
  name: 'Custom action',
  args: { action: <Button variant="outline" size="small" style={{ flex: 1 }}>Details</Button> },
};

export const OtherData: Story = {
  name: 'Other data',
  args: { label: 'Orders', value: '86 / 100', result: '86%', actionLabel: 'Open', actionProps: { iconLeft: 'doc' } },
};

export const InTable: Story = {
  name: 'In a table',
  render: () => (
    <div role="table">
      <TableRowMobile label="KPI" value="1440 / 1200" result="116%" />
      <TableRowMobile label="Orders" value="86 / 100" result="86%" />
      <TableRowMobile label="Returns" value="3 / 10" result="30%" />
    </div>
  ),
};

// ─── STATES / EDGE CASES ─────────────────────────────────────────────────────
export const DisabledAction: Story = {
  name: 'Disabled action',
  args: { actionProps: { disabled: true } },
};

export const LongText: Story = {
  name: 'Long text',
  args: { label: 'Monthly sales plan fulfilment', value: '1 440 000 / 1 200 000' },
};

export const Narrow: Story = {
  decorators: [(Story) => <div style={{ maxWidth: 240 }}><Story /></div>],
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      <div style={{ maxWidth: 320 }}><TableRowMobile size="360" /></div>
      <div style={{ maxWidth: 416 }}><TableRowMobile size="480" /></div>
    </div>
  ),
};
