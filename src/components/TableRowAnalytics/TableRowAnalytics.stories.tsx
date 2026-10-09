import type { Meta, StoryObj } from '@storybook/react';
import { ImageCard } from '../ImageCard';
import { TableHeader } from '../TableHeader';
import { TableRowAnalytics, type TableRowAnalyticsCell } from './TableRowAnalytics';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3697-291903';

// A small dark bottle, drawn inline so the story needs no network (Figma uses a product photo).
const BOTTLE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><rect width="32" height="32" fill="#0D082E"/><rect x="13" y="4" width="6" height="26" rx="2" fill="#B9C3E6"/></svg>',
  );

const photo = (alt: string) => <ImageCard size="sm" alt={alt} src={BOTTLE} />;

/** Figma `Table Row Analytics 1` (949px): image + name, then three numbers. */
const productCells = (name = 'Orion (de-08) - 2ml'): TableRowAnalyticsCell[] => [
  { id: 'image', value: photo(name), width: 47, group: 'lead' },
  { id: 'name', value: name, width: 157, strong: true, truncate: true, group: 'lead' },
  { id: 'newOrders', value: '18', width: 97, align: 'end' },
  { id: 'done', value: '12', width: 53, align: 'end' },
  { id: 'revenue', value: '$1311', width: 78, align: 'end' },
];

/** Figma `Table Row Analytics 2 / 3` (384px): every cell has its own caption. */
const captionCells: TableRowAnalyticsCell[] = [
  { id: 'date', label: 'Date', value: '08.24.2023', strong: true },
  { id: 'type', label: 'Type', value: 'Prepayment' },
  { id: 'amount', label: 'Amount', value: '$1311' },
];

/** The same three cells without captions, under `Table Header 7` (954px). */
const paymentCells: TableRowAnalyticsCell[] = [
  { id: 'date', value: '08.24.2023', width: 77, strong: true },
  { id: 'type', value: 'Prepayment', width: 97 },
  { id: 'amount', value: '$1311', width: 78, align: 'end' },
];

const meta = {
  title: 'Molecules/TableRowAnalytics',
  component: TableRowAnalytics,
  parameters: { layout: 'padded', backgrounds: { default: 'light' }, design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    cells: {
      control: 'object',
      description: 'Cells: `{ id, value, label?, width?, align?, strong?, group? }`',
    },
  },
  args: { cells: productCells() },
  // Figma frame is 949px wide.
  decorators: [(Story) => <div style={{ maxWidth: 949 }}><Story /></div>],
} satisfies Meta<typeof TableRowAnalytics>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Table Row Analytics 1) ──────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const WithCaptions: Story = {
  name: 'With captions (Table Row Analytics 2 / 3)',
  args: { cells: captionCells },
  decorators: [(Story) => <div style={{ maxWidth: 384 }}><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=4632-585231' },
    docs: { description: { story: 'The 384px card: captions in Secondary Grey above the values; the first value is Semi-Bold.' } },
  },
};

export const Payments: Story = {
  name: 'Under a Table Header 7',
  args: { cells: paymentCells },
  decorators: [(Story) => <div style={{ maxWidth: 954 }}><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=4631-289272' },
    docs: { description: { story: 'The same three cells without captions in a wide table; widths match the `paymentsAnalytics` header.' } },
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongName: Story = {
  name: 'Long name',
  args: { cells: productCells('Orion (de-08) - 2ml refill pack for the autumn collection') },
  parameters: { docs: { description: { story: 'The name cell has `truncate`: the text is cut with an ellipsis inside its 157px (AI-defined).' } } },
};

export const WithoutPhoto: Story = {
  name: 'Image without photo',
  args: {
    cells: productCells().map((c) => (c.id === 'image' ? { ...c, value: <ImageCard size="sm" alt="Orion" /> } : c)),
  },
  parameters: { docs: { description: { story: '`ImageCard` shows its placeholder icon when there is no photo.' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  args: { cells: captionCells },
  decorators: [(Story) => <div style={{ maxWidth: 240 }}><Story /></div>],
  parameters: { docs: { description: { story: 'The cells wrap onto the next line, 10px between lines (Figma `Table Row Analytics 3` has the same wrapping).' } } },
};

// ─── TABLE (header + rows) ───────────────────────────────────────────────────
export const Table: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
      <TableHeader preset="productsAnalytics" />
      <TableRowAnalytics cells={productCells('Orion (de-08) - 2ml')} />
      <TableRowAnalytics cells={productCells('Vega (de-12) - 5ml')} />
      <TableRowAnalytics cells={productCells('Lyra (de-03) - 2ml')} />
    </div>
  ),
  parameters: { docs: { description: { story: '`TableHeader preset="productsAnalytics"` (Figma `Table Header 6`) over the rows.' } } },
};

export const PaymentsTable: Story = {
  name: 'Payments table',
  decorators: [(Story) => <div style={{ maxWidth: 954 }}><Story /></div>],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
      <TableHeader preset="paymentsAnalytics" />
      <TableRowAnalytics cells={paymentCells} />
      <TableRowAnalytics cells={paymentCells.map((c) => (c.id === 'type' ? { ...c, value: 'Postpayment' } : c))} />
    </div>
  ),
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      <TableRowAnalytics cells={productCells()} />
      <div style={{ maxWidth: 384 }}>
        <TableRowAnalytics cells={captionCells} />
      </div>
      <TableRowAnalytics cells={paymentCells} />
    </div>
  ),
};

/** Figma "Dark Molecules Components" → AI-defined (analytics rows). Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
