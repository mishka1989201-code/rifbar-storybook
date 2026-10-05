import type { Meta, StoryObj } from '@storybook/react';
import { CategoryCard } from './CategoryCard';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=3843-306191';

const IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="172" height="172"><rect width="172" height="172" fill="#1D2542"/><rect x="62" y="30" width="48" height="104" rx="8" fill="#F68F57"/></svg>',
  );

const meta = {
  title: 'Molecules/CategoryCard',
  component: CategoryCard,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { image: IMG, title: 'Name of Image' },
  argTypes: { title: { control: 'text' }, href: { control: 'text' } },
  decorators: [(Story) => <div style={{ maxWidth: 177 }}><Story /></div>],
} satisfies Meta<typeof CategoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Static) ─────────────────────────────────────────────────
export const Default: Story = {};

// ─── STATES ──────────────────────────────────────────────────────────────────
/** Figma Property 1=Hover. Real hover is the same look; the class is only to show it in docs. */
export const Hover: Story = {
  render: (args) => (
    <div style={{ maxWidth: 177 }} className="sb-force-hover">
      <style>{`.sb-force-hover .ds-category-card{border-color:var(--theme-card-hover-border);box-shadow:var(--shadow-hover-card-sm)}`}</style>
      <CategoryCard {...args} />
    </div>
  ),
};

export const AsLink: Story = {
  name: 'As a link',
  args: { href: '#' },
};

export const Grid: Story = {
  decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>],
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      <CategoryCard {...args} title="Disposables" />
      <CategoryCard {...args} title="Rechargeable" />
      <CategoryCard {...args} title="Pods" />
    </div>
  ),
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const NoImage: Story = {
  name: 'No image',
  args: { image: undefined },
};

export const LongText: Story = {
  name: 'Long text',
  args: { title: 'Astro Ultra Premium Limited Edition Collector Series' },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 120 }}><Story /></div>],
};
