import type { Meta, StoryObj } from '@storybook/react';
import { InfoRowCard } from './InfoRowCard';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=181-81235';

const meta = {
  title: 'Molecules/InfoRowCard',
  component: InfoRowCard,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { label: 'Mickey Herman', value: "Sam's Club" },
  argTypes: { label: { control: 'text' }, value: { control: 'text' } },
  decorators: [(Story) => <div style={{ maxWidth: 412 }}><Story /></div>],
} satisfies Meta<typeof InfoRowCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const InList: Story = {
  name: 'In a list',
  render: () => (
    <div>
      <InfoRowCard label="Mickey Herman" value="Sam's Club" />
      <InfoRowCard label="Work phone" value="+44325678473" />
      <InfoRowCard label="Email" value="mickeyherman23@gmail.com" />
    </div>
  ),
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  name: 'Long text',
  args: {
    label: 'Mickey Herman the Third of Greater Manchester',
    value: "Sam's Club, wholesale warehouse distribution and retail partnership programme",
  },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 220 }}><Story /></div>],
};
