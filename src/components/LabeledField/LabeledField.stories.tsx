import type { Meta, StoryObj } from '@storybook/react';
import { FilterField, InputField, TextField } from '../InputField';
import { LabeledField } from './LabeledField';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=147-86319';

const meta = {
  title: 'Molecules/LabeledField',
  component: LabeledField,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { title: 'Name', children: <InputField placeholder="Enter the product name" /> },
  argTypes: { title: { control: 'text' }, children: { control: false } },
  decorators: [(Story) => <div style={{ width: 189 }}><Story /></div>],
} satisfies Meta<typeof LabeledField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Input/Title) ────────────────────────────────────────────
export const Default: Story = {};

// ─── CONTROLS ────────────────────────────────────────────────────────────────
export const Filled: Story = { args: { children: <InputField defaultValue="Wireless headphones" /> } };
export const WithFilterField: Story = { args: { title: 'Category', children: <FilterField placeholder="Choose a category" /> } };
export const WithTextField: Story = { args: { title: 'Description', children: <TextField placeholder="Enter a description" /> } };

// ─── STATES (delegated to the field) ─────────────────────────────────────────
export const Focus: Story = { args: { children: <InputField placeholder="Enter the product name" forceFocus /> } };
export const Error: Story = { args: { children: <InputField placeholder="Enter the product name" invalid /> } };
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
      <LabeledField title="Name"><InputField placeholder="Enter the product name" disabled /></LabeledField>
      <LabeledField title="Category"><FilterField placeholder="Choose a category" /></LabeledField>
      <LabeledField title="Description"><TextField placeholder="Enter a description" /></LabeledField>
    </div>
  ),
};
