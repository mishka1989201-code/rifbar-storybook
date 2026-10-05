import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ShowSelect } from './ShowSelect';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=68-33107';

const meta = {
  title: 'Molecules/ShowSelect',
  component: ShowSelect,
  parameters: { layout: 'centered', design: { type: 'figma', url: FIGMA_URL } },
  args: { value: 8 },
  argTypes: {
    value: { control: 'number' },
    options: { control: 'object' },
    label: { control: 'text' },
    onChange: { action: 'changed' },
  },
  // The list opens upwards: leave room above in the docs canvas.
  decorators: [(Story) => <div style={{ paddingTop: 140 }}><Story /></div>],
} satisfies Meta<typeof ShowSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState(8);
    return <ShowSelect {...args} value={value} onChange={setValue} />;
  },
};

export const CustomLabel: Story = {
  name: 'Custom label and options',
  args: { label: 'Рядків:', options: [10, 25, 50, 100], value: 25 },
};
