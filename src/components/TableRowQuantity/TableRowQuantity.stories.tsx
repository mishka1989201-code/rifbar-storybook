import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TableRowQuantity } from './TableRowQuantity';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=631-216083';

const meta = {
  title: 'Molecules/TableRowQuantity',
  component: TableRowQuantity,
  parameters: { layout: 'padded', backgrounds: { default: 'light' }, design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    name: { control: 'text' },
    prices: { control: 'object', description: 'Values before the field, e.g. `[\'$15\', \'$15\']`' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    forceHover: { control: 'boolean', description: 'Preview only' },
    forceFocus: { control: 'boolean', description: 'Preview only' },
    onChange: { action: 'changed' },
  },
  args: { name: 'Banana Ice', prices: ['$15', '$15'] },
  // Figma list is 746px wide (714 inside the padding).
  decorators: [(Story) => <div style={{ maxWidth: 714 }}><Story /></div>],
} satisfies Meta<typeof TableRowQuantity>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: empty field) ────────────────────────────────────────────
export const Default: Story = {};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Filled: Story = { args: { name: 'Mint Ice', defaultValue: '15' } };

export const Hover: Story = { args: { forceHover: true } };

export const Focus: Story = { args: { forceFocus: true, defaultValue: '15' } };

export const Invalid: Story = {
  args: { invalid: true, defaultValue: '-3' },
  parameters: { docs: { description: { story: 'Danger border from `InputField` (not drawn in Figma).' } } },
};

export const Disabled: Story = { args: { disabled: true } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongName: Story = {
  name: 'Long name',
  args: { name: 'Malibu (Peach Pineapple Orange) with an extra long description of the flavor' },
};

export const WithoutPrices: Story = { name: 'Without prices', args: { prices: [] } };

export const WithImage: Story = {
  name: 'With image',
  args: {
    image: (
      <span
        aria-hidden
        style={{ width: 40, height: 40, borderRadius: 'var(--radius-image-card)', background: 'var(--color-secondary-light)' }}
      />
    ),
  },
  parameters: { docs: { description: { story: 'Figma has an `Image and Name` container but no image in this frame — the slot takes e.g. an `ImageCard`.' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  parameters: { docs: { description: { story: 'The prices and the field wrap under the name (AI-defined).' } } },
};

// ─── LIST (Figma frame: 10 rows, the second one filled) ──────────────────────
const NAMES = [
  'Banana Ice',
  'Mint Ice',
  'Pineapple Ice',
  'Strawberry Mango',
  'Triple Berry',
  'Kiwi Passion Fruit Guava',
  'Strawberry Pina Colada',
  'Peach mango Watermelon',
  'Strazz',
  'Malibu (Peach Pineapple Orange)',
];

export const List: Story = {
  render: function Render(args) {
    const [values, setValues] = useState<Record<string, string>>({ 'Mint Ice': '15' });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        {NAMES.map((name) => (
          <TableRowQuantity
            key={name}
            {...args}
            name={name}
            value={values[name] ?? ''}
            onChange={(v) => setValues((s) => ({ ...s, [name]: v }))}
          />
        ))}
      </div>
    );
  },
  parameters: { docs: { description: { story: 'Figma `TableRows / Choice of quantity`: rows 8px apart. Type in any field to see the Activated border.' } } },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
      <TableRowQuantity {...args} />
      <TableRowQuantity {...args} name="Mint Ice" defaultValue="15" />
      <TableRowQuantity {...args} name="Hover" forceHover />
      <TableRowQuantity {...args} name="Focus" forceFocus defaultValue="15" />
      <TableRowQuantity {...args} name="Invalid" invalid defaultValue="-3" />
      <TableRowQuantity {...args} name="Disabled" disabled />
    </div>
  ),
};

/** Figma "Dark Molecules Components" → Products 1 Dark (Choice of quantity). Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
