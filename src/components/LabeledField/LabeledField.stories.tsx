import type { Meta, StoryObj } from '@storybook/react';
import { FilterField, InputField, TextField } from '../InputField';
import { LabeledField } from './LabeledField';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=147-86319';

const meta = {
  title: 'Molecules/LabeledField',
  component: LabeledField,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { title: 'Name', children: <InputField placeholder="Enter the product name" /> },
  argTypes: { title: { control: 'text' },
    required: { control: 'boolean' }, children: { control: false } },
  decorators: [(Story) => <div style={{ width: 189 }}><Story /></div>],
} satisfies Meta<typeof LabeledField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Input/Title) ────────────────────────────────────────────
export const Default: Story = {};

// ─── CONTROLS ────────────────────────────────────────────────────────────────
export const Filled: Story = { args: { children: <InputField defaultValue="Wireless headphones" /> } };
export const Required: Story = {
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=1407-445305' } },
  args: { title: 'Client', required: true, children: <FilterField placeholder="Select a client" aria-required /> },
};
export const WithFilterField: Story = { args: { title: 'Category', children: <FilterField placeholder="Choose a category" /> } };
export const WithTextField: Story = { args: { title: 'Description', children: <TextField placeholder="Enter a description" /> } };

// ─── STATES (delegated to the field) ─────────────────────────────────────────
export const Focus: Story = { args: { children: <InputField placeholder="Enter the product name" forceFocus /> } };
export const Error: Story = { args: { children: <InputField placeholder="Enter the product name" invalid /> } };
export const ErrorMessage: Story = {
  name: 'Error with message',
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=818-308102' } },
  args: {
    title: 'Discount in percent',
    error: 'To continue - enter the value in the input field!',
    children: <InputField placeholder="Write the discount value here" invalid />,
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};
export const Disabled: Story = { args: { children: <InputField placeholder="Enter the product name" disabled /> } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongTitle: Story = {
  name: 'Long title',
  args: { title: 'Name of the product as it appears on the invoice and on the shipping label' },
};
export const Narrow: Story = {
  args: { children: <InputField placeholder="Enter the product name" /> },
  decorators: [(Story) => <div style={{ width: 120 }}><Story /></div>],
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  decorators: [],
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 189px)', gap: 'var(--spacing-24)', alignItems: 'start' }}>
      <LabeledField title="Name"><InputField placeholder="Enter the product name" /></LabeledField>
      <LabeledField title="Name"><InputField defaultValue="Wireless headphones" /></LabeledField>
      <LabeledField title="Name"><InputField placeholder="Enter the product name" invalid /></LabeledField>
      <LabeledField title="Name" error="Enter the product name!"><InputField placeholder="Enter the product name" invalid /></LabeledField>
      <LabeledField title="Name"><InputField placeholder="Enter the product name" disabled /></LabeledField>
      <LabeledField title="Category"><FilterField placeholder="Choose a category" /></LabeledField>
      <LabeledField title="Description"><TextField placeholder="Enter a description" /></LabeledField>
    </div>
  ),
};

/** Figma "Dark Molecules Components" → Add Product Modal Dark → fields. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
