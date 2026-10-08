import type { Meta, StoryObj } from '@storybook/react';
import { ChatHeader } from './ChatHeader';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=139-41695';

const QUOTE =
  'Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.';

const meta = {
  title: 'Molecules/ChatHeader',
  component: ChatHeader,
  parameters: { layout: 'padded', backgrounds: { default: 'light' }, design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    title: { control: 'text' },
    quote: { control: 'text', description: 'Quote of the first message (quotation marks are added)' },
    icon: { control: 'text', description: '24px icon name' },
  },
  args: { title: 'Help please with Contract.', quote: QUOTE },
  // Figma frame is 893px wide.
  decorators: [(Story) => <div style={{ maxWidth: 893 }}><Story /></div>],
} satisfies Meta<typeof ChatHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const WithoutQuote: Story = { name: 'Without quote', args: { quote: undefined } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongTitle: Story = {
  name: 'Long title',
  args: { title: 'Help please with the Contract for the warehouse delivery of the spring collection to all retail clients' },
};

export const LongQuote: Story = { name: 'Long quote', args: { quote: `${QUOTE} ${QUOTE} ${QUOTE}` } };

export const LongWord: Story = {
  name: 'Long word',
  args: { title: 'https://example.com/a/very/long/link/with/no/spaces/that/must/wrap/inside/the/header' },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-32)' }}>
      <ChatHeader {...args} />
      <ChatHeader {...args} quote={undefined} />
    </div>
  ),
};
