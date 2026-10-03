import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import { Avatar, type AvatarVariant } from './Avatar';

const FILE = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023';
const FIGMA: Record<AvatarVariant, string> = {
  user: `${FILE}?node-id=48-10482`,
  chat: `${FILE}?node-id=137-33886`,
  department: `${FILE}?node-id=139-48421`,
};

// Demo "photo": an inline SVG so stories don't depend on the network.
const PHOTO =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#F7B267"/><stop offset="1" stop-color="#F25C54"/></linearGradient></defs>' +
      '<rect width="64" height="64" fill="url(#g)"/><circle cx="32" cy="26" r="12" fill="#FFE8D6"/>' +
      '<path d="M10 64c2-14 12-22 22-22s20 8 22 22z" fill="#FFE8D6"/></svg>',
  );

// The ava lives on the dark Navbar.
const onNavbar = (Story: () => JSX.Element) => (
  <div style={{ padding: 16, borderRadius: 10, background: 'var(--theme-app-bg)' }}>
    <Story />
  </div>
);

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA.chat },
  },
  args: { name: 'David Schwimmer' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['user', 'chat', 'department'],
      description: 'Figma component: `ava` / `Chat Avatar` / `Department Avatar`',
      table: { defaultValue: { summary: 'chat' } },
    },
    size: {
      control: 'inline-radio',
      options: ['md', 'xs'],
      description: '`xs` = 20px (inside Email - Chevron). Ignored for `user`.',
      table: { defaultValue: { summary: 'md' } },
    },
    name: { control: 'text', description: 'Full name → initials + accessible name' },
    src: { control: 'text', description: 'Photo URL' },
    decorative: { control: 'boolean', description: 'Hide from screen readers (name is written next to it)' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = { args: { variant: 'chat' } };

// ─── VARIANTS (one per Figma component) ──────────────────────────────────────
export const User: Story = {
  name: 'User (ava)',
  args: { variant: 'user', name: 'John Carter' },
  decorators: [onNavbar],
  parameters: {
    design: { type: 'figma', url: FIGMA.user },
    docs: { description: { story: 'Figma `ava`: the signed-in user in the Navbar. 32px, dark fill, white 22% ring, soft shadow.' } },
  },
};

export const Chat: Story = {
  name: 'Chat Avatar',
  args: { variant: 'chat' },
  parameters: { design: { type: 'figma', url: FIGMA.chat } },
};

export const Department: Story = {
  name: 'Department Avatar',
  args: { variant: 'department', name: 'Delivery Service' },
  parameters: {
    design: { type: 'figma', url: FIGMA.department },
    docs: { description: { story: 'Figma `Department Avatar`: square with 4px corners, so a department never looks like a person.' } },
  },
};

export const ExtraSmall: Story = {
  name: 'Size xs (20px)',
  args: { variant: 'chat', size: 'xs' },
  parameters: { docs: { description: { story: 'The 20px avatar used inside [EmailChevron](?path=/docs/atoms-emailchevron--docs). Text: Body/Micro Medium.' } } },
};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const WithPhoto: Story = {
  args: { variant: 'chat', src: PHOTO },
  parameters: { docs: { description: { story: 'With `src` the photo fills the shape. (Demo picture, not a real person.)' } } },
};

export const UserWithPhoto: Story = {
  name: 'User with photo',
  args: { variant: 'user', name: 'John Carter', src: PHOTO },
  decorators: [onNavbar],
};

export const BrokenPhoto: Story = {
  name: 'Photo failed to load',
  args: { variant: 'chat', src: 'https://invalid.example/no-photo.jpg' },
  parameters: { docs: { description: { story: 'If the photo can’t be loaded, the initials are shown instead — never an empty circle.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const SingleName: Story = {
  name: 'One word name',
  args: { variant: 'department', name: 'Warehouse' },
  parameters: { docs: { description: { story: 'One word → one letter.' } } },
};

export const LongName: Story = {
  name: 'Long name',
  args: { variant: 'chat', name: 'Maria Anna Kowalska-Shevchenko' },
  parameters: { docs: { description: { story: 'Always max 2 letters: first letter of the first and of the last word.' } } },
};

// ─── ALL ─────────────────────────────────────────────────────────────────────
const label: CSSProperties = { fontFamily: 'var(--font-family-base)', fontSize: 12, color: 'var(--color-grey-dark)' };

export const AllVariants: Story = {
  name: 'All Variants',
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '12px 32px', alignItems: 'center', justifyItems: 'center' }}>
      <span style={label}>ava</span>
      <span style={label}>Chat</span>
      <span style={label}>Department</span>
      <span style={label}>xs</span>
      <Avatar {...args} variant="user" name="John Carter" />
      <Avatar {...args} variant="chat" />
      <Avatar {...args} variant="department" />
      <Avatar {...args} variant="chat" size="xs" />
      <Avatar {...args} variant="user" name="John Carter" src={PHOTO} />
      <Avatar {...args} variant="chat" src={PHOTO} />
      <Avatar {...args} variant="department" src={PHOTO} />
      <Avatar {...args} variant="chat" size="xs" src={PHOTO} />
    </div>
  ),
};

// ─── IN CONTEXT ──────────────────────────────────────────────────────────────
export const ChatListExample: Story = {
  name: 'Example: Chat list',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, background: 'var(--color-white)', borderRadius: 10, width: 260 }}>
      {[
        { name: 'David Schwimmer', text: 'Order #1024 is ready', variant: 'chat' as const },
        { name: 'Delivery Service', text: 'Courier is on the way', variant: 'department' as const },
        { name: 'Lisa Kudrow', text: 'Thanks!', variant: 'chat' as const, src: PHOTO },
      ].map((m) => (
        <div key={m.name} style={{ display: 'flex', gap: 8, alignItems: 'center', fontFamily: 'var(--font-family-base)' }}>
          <Avatar variant={m.variant} name={m.name} src={m.src} decorative />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-primary-blue-dark)' }}>{m.name}</div>
            <div style={{ fontSize: 12, color: 'var(--color-grey-dark)' }}>{m.text}</div>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    backgrounds: { default: 'canvas' },
    docs: { description: { story: 'The name is written next to the avatar, so the avatar is `decorative`. List styles are demo-only (AI-defined).' } },
  },
};
