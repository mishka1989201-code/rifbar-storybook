import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { ProductCard } from './ProductCard';
import IMG from '../../assets/demo/product-orange.png';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=7038-332399';

const meta = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: {
    image: IMG,
    imageAlt: 'Astro',
    badge: '$25',
    selectable: true,
    checkboxProps: { 'aria-label': 'Select Astro' },
    title: 'Astro',
    subtitle: 'RECHARGEABLE / DISPOSABLE',
    specs: [
      { id: 'colors', label: 'Colors:', value: '8' },
      { id: 'flavors', label: 'Flavors:', value: '20' },
      { id: 'puffs', label: 'Puffs:', value: 'up to 7500' },
      { id: 'liquid', label: 'E-Liquid capacity:', value: '15ml' },
    ],
    action: <Button variant="dark" size="big">More info</Button>,
  },
  argTypes: {
    selectable: { control: 'boolean' },
    specs: { control: 'object' },
    action: { control: false },
    checkboxProps: { control: 'object' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 292 }}><Story /></div>],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Minimal: Story = {
  args: { badge: undefined, selectable: false, subtitle: undefined, specs: [], action: undefined },
};

export const Selected: Story = {
  args: { checkboxProps: { 'aria-label': 'Select Astro', defaultChecked: true } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const NoImage: Story = {
  name: 'No image',
  args: { image: undefined },
};

export const LongText: Story = {
  name: 'Long text',
  args: {
    title: 'Astro Ultra Premium Limited Edition Collector Series',
    specs: [{ id: 'long', label: 'E-Liquid capacity per cartridge:', value: 'up to 15ml in a refillable pod' }],
  },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 220 }}><Story /></div>],
};
