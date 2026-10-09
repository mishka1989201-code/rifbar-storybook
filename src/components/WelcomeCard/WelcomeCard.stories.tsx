import type { Meta, StoryObj } from '@storybook/react';
import { WelcomeCard, type WelcomeCardProps } from './WelcomeCard';
import PLACEHOLDER_IMAGE from '../../assets/demo/product-orange.png';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3738-298541';

/**
 * Placeholder for the header picture. The Figma picture (vape devices on a stage) could not be downloaded
 * (asset proxy 403), so the stories use a generated glow; pass your own `image` in the app.
 */
const ROWS: NonNullable<WelcomeCardProps['rows']> = [
  { tone: 'warning', lead: '5 types of products', children: 'will soon be out of stock', actionLabel: 'View products' },
  { tone: 'info', lead: '7 orders', children: 'are still waiting for payment', actionLabel: 'View payments' },
  { tone: 'info', lead: '50+ orders', children: 'need to approve', actionLabel: 'View orders' },
];

const STATS = [
  { label: 'New orders', value: '14,209' },
  { label: 'Paid invoices', value: '$32,456.00' },
];

const meta = {
  title: 'Organisms/WelcomeCard',
  component: WelcomeCard,
  parameters: { layout: 'padded', backgrounds: { default: 'canvas' }, design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    stats: { control: 'object' },
    image: { control: 'text', description: 'URL of the header picture' },
    rows: { control: 'object', description: '`AlertRow` props' },
  },
  args: {
    title: 'Good Afternoon, Arnold!',
    subtitle: 'Here’s what happening with our company today',
    stats: STATS,
    image: PLACEHOLDER_IMAGE,
    rows: ROWS,
  },
  // Figma card is 810px wide.
  decorators: [(Story) => <div style={{ maxWidth: 810 }}><Story /></div>],
} satisfies Meta<typeof WelcomeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma Welcome Card) ────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const NoImage: Story = { name: 'No image', args: { image: undefined } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const NoRows: Story = { name: 'No rows', args: { rows: [] } };

export const NoStats: Story = { name: 'No numbers', args: { stats: [], subtitle: undefined } };

export const OneRow: Story = { name: 'One row', args: { rows: ROWS.slice(0, 1) } };

export const LongText: Story = {
  name: 'Long text',
  args: {
    title: 'Good Afternoon, Alexander Maximilian Hargreaves-Schwimmer!',
    subtitle: 'Here’s what happening with all of our companies, warehouses and online shops today',
    stats: [...STATS, { label: 'Open tickets', value: '1,204,568' }],
  },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Text and numbers wrap; the picture stays behind the header and does not push the content.' } } },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-32)' }}>
      <WelcomeCard {...args} />
      <WelcomeCard {...args} image={undefined} />
      <WelcomeCard {...args} rows={[]} />
    </div>
  ),
};
