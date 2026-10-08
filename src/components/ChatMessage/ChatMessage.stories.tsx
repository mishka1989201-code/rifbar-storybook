import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessage } from './ChatMessage';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=7067-76889';

const TEXT =
  'Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.';

const meta = {
  title: 'Molecules/ChatMessage',
  component: ChatMessage,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'light' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    direction: { control: 'inline-radio', options: ['received', 'sent'] },
    children: { control: 'text', description: 'Message text' },
    author: { control: 'text', description: 'Sender name (received): avatar initials' },
    avatarSrc: { control: 'text' },
    time: { control: 'text' },
    dateTime: { control: 'text' },
    checked: { control: 'boolean', description: 'Double check after the time (sent)' },
  },
  args: { children: TEXT, direction: 'received', author: 'David Schwimmer', time: '11.54 am' },
  // Figma frame is 600px wide.
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 600 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Recieved +Avatar +Time) ─────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Sent: Story = {
  name: 'Sent (Time & Check)',
  args: { direction: 'sent', author: undefined },
};

export const ReceivedWithPhoto: Story = {
  name: 'Received with photo',
  args: { avatarSrc: 'https://i.pravatar.cc/56?img=12' },
};

// ─── STATES / OPTIONAL PARTS ─────────────────────────────────────────────────
export const ReceivedWithoutAvatar: Story = {
  name: 'Received without avatar',
  args: { author: undefined },
  parameters: { docs: { description: { story: 'Without `author` no avatar is drawn (grouped messages of one sender — AI-defined).' } } },
};

export const WithoutTime: Story = { name: 'Without time', args: { time: undefined } };

export const SentWithoutCheck: Story = {
  name: 'Sent without check',
  args: { direction: 'sent', author: undefined, checked: false },
  parameters: { docs: { description: { story: 'Not read yet — the check is hidden (AI-defined: Figma draws only the checked state).' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const ShortText: Story = { name: 'Short text', args: { children: 'Ok' } };

export const LongText: Story = {
  name: 'Long text',
  args: { children: `${TEXT} ${TEXT} ${TEXT}` },
};

export const LongWordSent: Story = {
  name: 'Long word (sent)',
  args: {
    direction: 'sent',
    author: undefined,
    children: 'https://example.com/a/very/long/link/that/has/no/spaces/and/must/wrap/inside/the/card/instead/of/overflowing',
  },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
};

// ─── CONVERSATION ────────────────────────────────────────────────────────────
export const Conversation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      <ChatMessage author="David Schwimmer" time="11.52 am">Hello! Is the order ready for shipping?</ChatMessage>
      <ChatMessage direction="sent" time="11.54 am">{TEXT}</ChatMessage>
      <ChatMessage author="David Schwimmer" time="11.55 am">Thank you!</ChatMessage>
    </div>
  ),
};

// ─── ALL VARIANTS (Figma frame: received + sent) ─────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-48)' }}>
      <ChatMessage {...args} direction="received" />
      <ChatMessage {...args} direction="sent" author={undefined} />
    </div>
  ),
};
