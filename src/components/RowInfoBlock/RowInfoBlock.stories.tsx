import type { Meta, StoryObj } from '@storybook/react';
import { RowInfoBlock } from './RowInfoBlock';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=7045-348261';

const meta = {
  title: 'Molecules/RowInfoBlock',
  component: RowInfoBlock,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    variant: { control: 'inline-radio', options: ['pair', 'line', 'cells'] },
    label: { control: 'text' },
    value: { control: 'text' },
    cells: { control: 'object' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 582 }}><Story /></div>],
} satisfies Meta<typeof RowInfoBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: order-list__item) ───────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const InfoLine: Story = {
  name: 'Info Line',
  args: { variant: 'line', label: 'Warehouse from', value: 'Chongqing #3' },
  decorators: [(Story) => <div style={{ maxWidth: 516 }}><Story /></div>],
};

export const Cells: Story = {
  name: 'Cells',
  args: { variant: 'cells', cells: ['Astro', 'Banana Ice', '120'] },
  decorators: [(Story) => <div style={{ maxWidth: 518 }}><Story /></div>],
};

export const TwoCells: Story = {
  name: 'Two cells',
  args: { variant: 'cells', cells: ['Astro', '120'] },
  decorators: [(Story) => <div style={{ maxWidth: 518 }}><Story /></div>],
};

export const InList: Story = {
  name: 'In a list',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <RowInfoBlock label="Name" value="David Schwimmer" />
      <RowInfoBlock label="Phone" value="+44325678473" />
      <RowInfoBlock label="Country" value="USA" />
    </div>
  ),
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongValue: Story = {
  name: 'Long value',
  args: { value: 'David Schwimmer the Third of Greater Manchester and Surrounding Areas' },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};

export const LongInfoLine: Story = {
  name: 'Long Info Line',
  args: { variant: 'line', label: 'Warehouse from the main distribution center', value: 'Chongqing #3, Yuzhong District, Building 12' },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
};

export const NarrowCells: Story = {
  name: 'Narrow cells',
  args: { variant: 'cells', cells: ['Astro Ultra Long Name', 'Banana Ice', '120'] },
  decorators: [(Story) => <div style={{ maxWidth: 260 }}><Story /></div>],
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      <RowInfoBlock variant="pair" label="Name" value="David Schwimmer" />
      <RowInfoBlock variant="line" label="Warehouse from" value="Chongqing #3" />
      <RowInfoBlock variant="cells" cells={['Astro', 'Banana Ice', '120']} />
    </div>
  ),
};
