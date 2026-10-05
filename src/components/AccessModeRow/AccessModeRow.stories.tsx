import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AccessModeRow, type AccessMode } from './AccessModeRow';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=147-86490';

const meta = {
  title: 'Molecules/AccessModeRow',
  component: AccessModeRow,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { value: 'custom', onChange: () => {}, onEdit: () => {} },
  argTypes: {
    value: { control: 'inline-radio', options: ['default', 'custom'] },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
    onEdit: { action: 'edit' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 577 }}><Story /></div>],
} satisfies Meta<typeof AccessModeRow>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Property 1=Custom) ──────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const DefaultChosen: Story = { name: 'Default chosen (Edit off)', args: { value: 'default' } };

export const Disabled: Story = { args: { value: 'default', disabled: true } };

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<AccessMode>('default');
    return <AccessModeRow {...args} value={value} onChange={setValue} />;
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const CustomLabels: Story = {
  name: 'Custom labels',
  args: { defaultLabel: 'За замовчуванням', customLabel: 'Власні права', editLabel: 'Змінити' },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 300 }}><Story /></div>],
};
