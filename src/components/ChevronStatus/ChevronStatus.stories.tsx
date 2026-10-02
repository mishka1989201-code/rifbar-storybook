import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import { ChevronStatus, type ChevronStatusColor } from './ChevronStatus';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=73-83771';

const COLORS: ChevronStatusColor[] = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'];

const meta = {
  title: 'Atoms/ChevronStatus',
  component: ChevronStatus,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
      description: 'Figma `Color` property',
      table: { defaultValue: { summary: 'primary' } },
    },
    children: { control: 'text', description: 'Status text' },
    icon: { control: 'boolean', description: 'Figma `Icon` property (arrow_drop_up)' },
    iconLabel: { control: 'text', description: 'Accessible name of the icon' },
  },
} satisfies Meta<typeof ChevronStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = { args: { color: 'primary', children: 'Primary' } };

// ─── COLORS (Figma Color) ────────────────────────────────────────────────────
export const Primary: Story = { args: { color: 'primary', children: 'Primary' } };
export const Secondary: Story = { args: { color: 'secondary', children: 'Secondary' } };
export const Success: Story = { args: { color: 'success', children: 'Success' } };
export const Info: Story = { args: { color: 'info', children: 'Info' } };
export const Warning: Story = { args: { color: 'warning', children: 'Warning' } };
export const Danger: Story = { args: { color: 'danger', children: 'Danger' } };
export const Light: Story = {
  args: { color: 'light', children: 'Light' },
  parameters: { docs: { description: { story: 'Fill is BG Color — on a BG Color page it has no visible edge. Use it on White.' } } },
};
export const Dark: Story = { args: { color: 'dark', children: 'Dark' } };

// ─── ICON (Figma Icon property) ──────────────────────────────────────────────
export const WithIcon: Story = {
  name: 'With Icon (trend)',
  args: { color: 'primary', icon: true, iconLabel: 'Up', children: '13.6%' },
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Icon=true`: arrow before the text. Used for KPI trends on the dashboard. ' +
          'Pass `iconLabel` so screen readers hear the direction (“Up 13.6%”).',
      },
    },
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  args: { color: 'info', children: 'Waiting for payment confirmation from the bank' },
  decorators: [(Story) => <div style={{ width: 160 }}>{Story()}</div>],
  parameters: { docs: { description: { story: 'Text stays on one line and is cut with “…” when the container is narrow.' } } },
};

export const ShortText: Story = { args: { color: 'success', children: 'OK' } };

// ─── ALL COLORS (mirrors the Figma frame `Chevron.Status`) ───────────────────
export const AllVariants: Story = {
  name: 'All Colors',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {COLORS.map((c) => (
        <ChevronStatus key={c} color={c}>
          {c[0].toUpperCase() + c.slice(1)}
        </ChevronStatus>
      ))}
    </div>
  ),
};

// ─── IN CONTEXT: orders table ────────────────────────────────────────────────
const ORDERS: { id: string; client: string; status: string; color: ChevronStatusColor }[] = [
  { id: '#1024', client: 'Kyiv Market', status: 'New', color: 'primary' },
  { id: '#1023', client: 'Lviv Coffee', status: 'Paid', color: 'success' },
  { id: '#1022', client: 'Odesa Port', status: 'In delivery', color: 'info' },
  { id: '#1021', client: 'Dnipro Foods', status: 'Awaiting payment', color: 'warning' },
  { id: '#1020', client: 'Kharkiv Tech', status: 'Cancelled', color: 'danger' },
  { id: '#1019', client: 'Poltava Farm', status: 'Draft', color: 'secondary' },
];

const cell: CSSProperties = {
  padding: '8px 16px',
  borderBottom: '1px solid var(--color-stroke-light-v1)',
  fontFamily: 'var(--font-family-base)',
  fontSize: 14,
  color: 'var(--color-text)',
  textAlign: 'left',
};

export const TableExample: Story = {
  name: 'Example: Orders table',
  render: () => (
    <table style={{ borderCollapse: 'collapse', background: 'var(--color-white)', borderRadius: 10 }}>
      <thead>
        <tr>
          {['Order', 'Client', 'Status'].map((h) => (
            <th key={h} style={{ ...cell, color: 'var(--color-grey-dark)', fontWeight: 500 }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ORDERS.map((o) => (
          <tr key={o.id}>
            <td style={cell}>{o.id}</td>
            <td style={cell}>{o.client}</td>
            <td style={cell}>
              <ChevronStatus color={o.color}>{o.status}</ChevronStatus>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'canvas' },
    docs: { description: { story: 'Table styles are demo-only (AI-defined), not part of the atom.' } },
  },
};
