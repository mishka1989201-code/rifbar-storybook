import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ChatLayout, type ChatLayoutItem } from './ChatLayout';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=139-41787';

const TEXT =
  'Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.';

/** The thread drawn in Figma `chat  layout v2`. */
const FIGMA_ITEMS: ChatLayoutItem[] = [
  { type: 'date', label: 'May 7, 2023' },
  { type: 'message', id: 1, author: 'David Schwimmer', text: TEXT, time: '11.54 am' },
  { type: 'message', id: 2, direction: 'sent', text: TEXT, time: '11.54 am' },
  { type: 'message', id: 3, direction: 'sent', text: 'Hello. I will be happy to help you!', time: '11.54 am' },
  { type: 'message', id: 4, author: 'David Schwimmer', text: TEXT, time: '11.54 am' },
  { type: 'message', id: 5, direction: 'sent', text: 'Give me some time to research this question.', time: '11.54 am' },
  { type: 'date', label: 'May 9, 2023' },
  { type: 'message', id: 6, author: 'David Schwimmer', text: 'Thank you!', time: '11.54 am' },
];

const meta = {
  title: 'Organisms/ChatLayout',
  component: ChatLayout,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'light' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    title: { control: 'text' },
    quote: { control: 'text' },
    emptyText: { control: 'text' },
    height: { control: 'text', description: 'Fixed height; the thread then scrolls' },
    onSend: { action: 'sent' },
  },
  args: { title: 'Help please with Contract.', quote: TEXT, items: FIGMA_ITEMS },
  // Figma frame is 893px wide.
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 893 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: chat  layout v2) ────────────────────────────────────────
export const Default: Story = {};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Empty: Story = {
  args: { items: [], quote: undefined },
  parameters: { docs: { description: { story: 'No messages yet (AI-defined: Figma draws only a filled thread).' } } },
};

export const Disabled: Story = {
  args: { messageBoxProps: { disabled: true } },
  parameters: { docs: { description: { story: 'Closed conversation: the `MessageBox` is disabled (its Figma Disabled state).' } } },
};

export const FixedHeight: Story = {
  name: 'Fixed height (scrolls)',
  args: { height: 480 },
  parameters: { docs: { description: { story: 'With `height` the thread scrolls and stays pinned to the newest message (AI-defined).' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const NoQuote: Story = { name: 'Without quote', args: { quote: undefined } };

export const LongContent: Story = {
  name: 'Long title and long words',
  args: {
    title: 'Help please with the contract of the Rifbar supply agreement number 2023/05/07-A and its annexes',
    items: [
      { type: 'message', id: 1, author: 'David Schwimmer', text: `${TEXT} ${TEXT} ${TEXT}`, time: '11.54 am' },
      {
        type: 'message',
        id: 2,
        direction: 'sent',
        text: 'https://example.com/a/very/long/link/that/has/no/spaces/and/must/wrap/inside/the/card/instead/of/overflowing',
        time: '11.55 am',
      },
    ],
  },
};

export const NarrowContainer: Story = {
  name: 'Narrow container (360px)',
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: (args) => {
    const [items, setItems] = useState<ChatLayoutItem[]>(FIGMA_ITEMS);
    return (
      <ChatLayout
        {...args}
        height={560}
        items={items}
        onSend={(text) =>
          setItems((prev) => [...prev, { type: 'message', id: prev.length + 1, direction: 'sent', text, time: 'now' }])
        }
      />
    );
  },
  parameters: { docs: { description: { story: 'Type a message and press Enter or the arrow: it is appended as a sent message.' } } },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-48)' }}>
      <ChatLayout {...args} />
      <ChatLayout {...args} items={[]} quote={undefined} />
      <ChatLayout {...args} messageBoxProps={{ disabled: true }} height={360} />
    </div>
  ),
};

/** Figma "Dark Molecules Components" → Chat (AI-defined panel). Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const DefaultDark: Story = {
  ...Default,
  name: 'Default (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content', minWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
