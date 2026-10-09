import type { Meta, StoryObj } from '@storybook/react';
import { TableProducts, type TableProductsItem } from './TableProducts';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=78-27042';

/** The five rows drawn in Figma `Table - Products`. */
const FIGMA_ROWS: TableProductsItem[] = [
  { id: 1, name: 'Astro', flavor: 'Malibu peach pineapple orange', type: 'RECHARGEABLE / DISPOSABLE', nicotine: '5%', quantity: 15, amount: '$150' },
  { id: 2, name: 'Castor', flavor: 'Peach & Ice', type: 'RECHARGEABLE / DISPOSABLE', nicotine: '5%', quantity: 15, amount: '$260' },
  { id: 3, name: 'Lynx', flavor: 'Strawberry & Mango', type: 'DISPOSABLE', nicotine: '5%', quantity: 15, amount: '$1200' },
  { id: 4, name: 'Orion', flavor: 'Triple berry', type: 'DISPOSABLE', nicotine: '5%', quantity: 15, amount: '$900' },
  { id: 5, name: 'T-shirt', flavor: 'Accessories', type: '-', nicotine: '-', quantity: 30, amount: '$250' },
];

const meta = {
  title: 'Organisms/TableProducts',
  component: TableProducts,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'light' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    status: { control: 'inline-radio', options: ['ready', 'loading', 'error'] },
    emptyText: { control: 'text' },
    loadingText: { control: 'text' },
    errorText: { control: 'text' },
    label: { control: 'text' },
  },
  args: { rows: FIGMA_ROWS },
  // Figma frame is 1524px wide.
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 1524 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TableProducts>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Table - Products) ───────────────────────────────────────
export const Default: Story = {};

// ─── STATES (data display) ───────────────────────────────────────────────────
export const Empty: Story = {
  args: { rows: [] },
  parameters: { docs: { description: { story: 'Header stays, a message replaces the rows (AI-defined: Figma draws only the filled table).' } } },
};

export const Loading: Story = {
  args: { status: 'loading' },
  parameters: { docs: { description: { story: '`aria-busy` table with a status message (AI-defined).' } } },
};

export const ErrorState: Story = {
  name: 'Error',
  args: { status: 'error' },
  parameters: { docs: { description: { story: 'Message in Danger Strong, announced with `role="alert"` (AI-defined).' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const SingleRow: Story = { name: 'Single row', args: { rows: FIGMA_ROWS.slice(0, 1) } };

export const LongText: Story = {
  name: 'Long text',
  args: {
    rows: [
      {
        id: 1,
        name: 'Very long product name that does not fit the cell',
        flavor: 'Strawberry watermelon kiwi passion fruit guava mango lychee coconut cream',
        type: 'RECHARGEABLE / DISPOSABLE / REFILLABLE',
        nicotine: '5%',
        quantity: 15,
        amount: '$150',
      },
      ...FIGMA_ROWS.slice(1, 3),
    ],
  },
  parameters: { docs: { description: { story: 'Flavor wraps; name and type are cut with an ellipsis (inherited from `TableProductsRow`).' } } },
};

export const ManyRows: Story = {
  name: 'Many rows (20)',
  args: {
    rows: Array.from({ length: 20 }, (_, i) => ({ ...FIGMA_ROWS[i % FIGMA_ROWS.length], id: i + 1 })),
  },
};

export const NarrowContainer: Story = {
  name: 'Narrow container (480px, scrolls)',
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  parameters: { docs: { description: { story: 'Columns keep their widths; the table scrolls horizontally (AI-defined).' } } },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-48)' }}>
      <TableProducts {...args} />
      <TableProducts {...args} rows={[]} />
      <TableProducts {...args} status="loading" />
      <TableProducts {...args} status="error" />
    </div>
  ),
};

/** Figma "Dark Organisms Components" → Table - Products. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
