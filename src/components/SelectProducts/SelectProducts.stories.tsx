import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import productRed from '../../assets/demo/product-red.png';
import productOrange from '../../assets/demo/product-orange.png';
import { SelectProducts, type SelectProductsItem } from './SelectProducts';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=1299-429127';

const meta = {
  title: 'Molecules/SelectProducts',
  component: SelectProducts,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    columns: { control: 'inline-radio', options: [1, 2] },
    selectAllLabel: { control: 'text' },
    items: { control: false },
    onChange: { action: 'change' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1524 }}><Story /></div>],
} satisfies Meta<typeof SelectProducts>;

export default meta;
type Story = StoryObj<typeof meta>;

const FLAVORS: SelectProductsItem[] = [
  { id: 'banana', name: 'Banana Ice', price: '$13', oldPrice: '$15' },
  { id: 'mint', name: 'Mint Ice', price: '$13', oldPrice: '$15' },
  { id: 'pineapple', name: 'Pineapple Ice', price: '$13', oldPrice: '$15' },
  { id: 'strawberry-mango', name: 'Strawberry Mango', price: '$15' },
  { id: 'triple-berry', name: 'Triple Berry', price: '$15' },
  { id: 'kiwi', name: 'Kiwi Passion Fruit Guava', price: '$15' },
  { id: 'double-apple', name: 'Double Apple', price: '$15' },
  { id: 'peach', name: 'Peach Ice', price: '$15' },
  { id: 'pina', name: 'Pina Colada', price: '$15' },
  { id: 'lush', name: 'Lush Ice', price: '$15' },
];

const BACKPACKS: SelectProductsItem[] = [
  { id: 'dark', name: 'Backpack Dark', price: '$13', oldPrice: '$15', image: productRed },
  { id: 'blue', name: 'Backpack Blue', price: '$15', image: productOrange },
  { id: 'gray', name: 'Backpack Gray', price: '$15', image: productRed },
  { id: 'sport', name: 'Backpack Blue Sport', price: '$15', image: productOrange },
];

// ─── DEFAULT (Figma: first Select Products, all chosen) ──────────────────────
export const Default: Story = {
  args: { items: FLAVORS, defaultSelected: FLAVORS.map((i) => i.id) },
};

// ─── WITH PHOTOS (Figma: second Select Products, Backpacks) ──────────────────
export const WithPhotos: Story = {
  name: 'With photos (Backpacks)',
  args: { items: BACKPACKS, defaultSelected: ['blue', 'gray'] },
};

export const NothingChosen: Story = { name: 'Nothing chosen', args: { items: FLAVORS } };
export const SingleColumn: Story = { name: 'Single column', args: { items: FLAVORS.slice(0, 5), columns: 1, defaultSelected: ['mint'] } };
export const OddCount: Story = { name: 'Odd number of items', args: { items: FLAVORS.slice(0, 7), defaultSelected: ['banana'] } };

export const LongNames: Story = {
  name: 'Long names',
  args: {
    items: [
      { id: 'a', name: 'Pineapple Strawberry Banana Passion Fruit Guava Orange Mango Peach Ice Deluxe Edition', price: '$15' },
      { id: 'b', name: 'Malibu (Peach Pineapple Orange)', price: '$13', oldPrice: '$15' },
    ],
  },
  decorators: [(Story) => <div style={{ maxWidth: 760 }}><Story /></div>],
};

export const DisabledItem: Story = {
  name: 'Disabled item',
  args: { items: [{ ...FLAVORS[0], disabled: true }, ...FLAVORS.slice(1, 4)], defaultSelected: ['mint'] },
};

export const Empty: Story = { name: 'Empty', args: { items: [] } };

export const NarrowContainer: Story = {
  name: 'Narrow container (one column)',
  args: { items: FLAVORS.slice(0, 6), defaultSelected: ['mint'] },
  decorators: [(Story) => <div style={{ maxWidth: 520 }}><Story /></div>],
};

export const Interactive: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string[]>(['banana']);
    return (
      <>
        <SelectProducts {...args} items={FLAVORS} selected={selected} onChange={setSelected} />
        <p style={{ fontFamily: 'var(--font-family-base)', padding: '0 var(--spacing-44)' }}>Chosen: {selected.length}</p>
      </>
    );
  },
  args: { items: FLAVORS },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  args: { items: FLAVORS },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      <SelectProducts items={FLAVORS.slice(0, 6)} defaultSelected={FLAVORS.slice(0, 6).map((i) => i.id)} />
      <SelectProducts items={BACKPACKS} defaultSelected={['blue', 'gray']} />
      <SelectProducts items={FLAVORS.slice(0, 4)} columns={1} />
    </div>
  ),
};

/** No dark Figma frame draws this block: dark values are AI-defined (see the MDX). */
export const AllVariantsDark: Story = {
  ...AllVariants,
  name: 'All variants (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content', minWidth: 1000 }}>
        <Story />
      </div>
    ),
  ],
};
