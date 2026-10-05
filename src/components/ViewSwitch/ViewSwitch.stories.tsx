import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ViewSwitch, type ViewMode } from './ViewSwitch';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=68-25756';

const meta = {
  title: 'Molecules/ViewSwitch',
  component: ViewSwitch,
  parameters: { layout: 'centered', design: { type: 'figma', url: FIGMA_URL } },
  args: { value: 'list' },
  argTypes: {
    value: { control: 'inline-radio', options: ['cards', 'list'] },
    label: { control: 'text' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof ViewSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: list chosen, cards Secondary Grey) ──────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const CardsChosen: Story = { name: 'Cards chosen', args: { value: 'cards' } };

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<ViewMode>('cards');
    return <ViewSwitch {...args} value={value} onChange={setValue} />;
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const CustomLabel: Story = {
  name: 'Custom label',
  args: { label: 'Вигляд:', cardsLabel: 'Картки', listLabel: 'Список' },
};
