import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ProductFormModal, type ProductFormField, type ProductFormValues } from './ProductFormModal';
import PLACEHOLDER_IMAGE from '../../assets/demo/product-red.png';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=7084-21639';

/**
 * Placeholder for the product photo. The Figma photo could not be downloaded (asset proxy 403),
 * so the stories draw a neutral dark shape; pass your own `image` in the app.
 */
const FILLED: ProductFormValues = {
  group: 'Disposables',
  category: 'Vapes',
  name: 'Elf Bar BC5000',
  color: 'Black',
  flavor: 'Blue razz',
  price: '12.50',
  currency: 'US dollar',
};

const meta = {
  title: 'Organisms/ProductFormModal',
  component: ProductFormModal,
  parameters: { layout: 'padded', backgrounds: { default: 'canvas' }, design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    mode: { control: 'inline-radio', options: ['add', 'edit'] },
    size: { control: 'inline-radio', options: ['480', '360'] },
    title: { control: 'text' },
    values: { control: 'object' },
    image: { control: 'text' },
    onValueChange: { action: 'value' },
    onFieldClick: { action: 'field' },
    onLibrary: { action: 'library' },
    onFiles: { action: 'files' },
    onReplaceImage: { action: 'replace' },
    onDeleteImage: { action: 'delete' },
    onClose: { action: 'close' },
    onCancel: { action: 'cancel' },
    onSubmit: { action: 'submit' },
  },
  // Figma frames: `currency` is the only filled field.
  args: { mode: 'add', size: '480', values: { currency: 'US dollar' }, image: PLACEHOLDER_IMAGE },
} satisfies Meta<typeof ProductFormModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma AddProduct, 480) ─────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS (Figma Property 1 × Property 2) ────────────────────────────────
export const Add360: Story = { name: 'Add product 360', args: { size: '360' } };
export const Edit480: Story = { name: 'Edit product 480', args: { mode: 'edit' } };
export const Edit360: Story = { name: 'Edit product 360', args: { mode: 'edit', size: '360' } };

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Filled: Story = { args: { values: FILLED } };

export const EditFilled: Story = { name: 'Edit filled', args: { mode: 'edit', values: FILLED } };

export const EditWithoutImage: Story = {
  name: 'Edit without photo',
  args: { mode: 'edit', image: undefined },
  parameters: { docs: { description: { story: 'The photo box shows the `ImageCard` placeholder icon (AI-defined).' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongValues: Story = {
  name: 'Long values',
  args: {
    title: 'Add a new product to the catalogue of the Warsaw central warehouse',
    values: { ...FILLED, name: 'Elf Bar BC5000 Ultra Disposable Vape Pod Device Triple Mango Peach Strawberry Ice 5000 puffs' },
  },
  parameters: { docs: { description: { story: 'The title wraps; long values are cut with an ellipsis in the fields.' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
  parameters: { docs: { description: { story: 'The dialog never exceeds its container.' } } },
};

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: function Render(args) {
    const [values, setValues] = useState<ProductFormValues>({ currency: 'US dollar' });
    const [image, setImage] = useState<string | undefined>(args.mode === 'edit' ? PLACEHOLDER_IMAGE : undefined);
    const pick = (field: ProductFormField) =>
      setValues((v) => ({ ...v, [field]: v[field] ? undefined : `Sample ${field}` }));
    return (
      <ProductFormModal
        {...args}
        values={values}
        image={image}
        onValueChange={(field, value) => setValues((v) => ({ ...v, [field]: value }))}
        onFieldClick={pick}
        onDeleteImage={() => setImage(undefined)}
        onReplaceImage={() => setImage(PLACEHOLDER_IMAGE)}
      />
    );
  },
  parameters: { docs: { description: { story: 'Type in Name and Price; a list field toggles a sample value when pressed; the photo buttons work in `edit` mode.' } } },
};

// ─── ALL VARIANTS (Figma frame: 4 variants) ──────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'var(--spacing-32)' }}>
      <ProductFormModal {...args} mode="add" size="480" />
      <ProductFormModal {...args} mode="add" size="360" />
      <ProductFormModal {...args} mode="edit" size="480" />
      <ProductFormModal {...args} mode="edit" size="360" />
    </div>
  ),
};

/** Figma "Dark Organisms Components" → Add Product Modal-dark / Edit Product Modal Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
