import type { Meta, StoryObj } from '@storybook/react';
import { BreadCrumbs } from './BreadCrumbs';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=32-9619';

const meta = {
  title: 'Molecules/BreadCrumbs',
  component: BreadCrumbs,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    items: { control: 'object', description: '`{ label, href?, onClick? }`; the last item is the current page' },
  },
  args: {
    items: [
      { label: 'Clients', href: '#' },
      { label: 'All', href: '#' },
      { label: 'All', href: '#' },
      { label: 'All', href: '#' },
      { label: 'All' },
    ],
  },
} satisfies Meta<typeof BreadCrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: root + 4 crumbs) ────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Short: Story = {
  args: { items: [{ label: 'Clients', href: '#' }, { label: 'Acme Ltd.' }] },
};

export const SingleItem: Story = {
  name: 'Single item',
  args: { items: [{ label: 'Clients' }] },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongPath: Story = {
  name: 'Long path (wraps)',
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <BreadCrumbs {...args} />
    </div>
  ),
  args: {
    items: [
      { label: 'Clients', href: '#' },
      { label: 'Wholesale customers', href: '#' },
      { label: 'Kyiv region', href: '#' },
      { label: 'Contracts and signed documents', href: '#' },
      { label: 'Contract 2023/04-117' },
    ],
  },
  parameters: { docs: { description: { story: 'Figma frame is `flex-wrap`: crumbs wrap to the next line with a 16px row gap.' } } },
};

export const Back: Story = {
  name: 'Back (768px and below)',
  args: {
    variant: 'back',
    items: [{ label: 'Clients', href: '#' }, { label: 'All clients', href: '#' }, { label: 'Mickey Herman' }],
  },
  parameters: { docs: { description: { story: 'Figma `Bread Crumbs` at 768px and below: a back chevron and the current page; the link goes to the previous crumb.' } } },
};

export const BackWithoutParent: Story = {
  name: 'Back without a parent',
  args: { variant: 'back', items: [{ label: 'Mickey Herman' }] },
  parameters: { docs: { description: { story: 'With one crumb there is nowhere to go back: the chevron and the name are plain text (AI-defined).' } } },
};

/** Figma "Dark Molecules Components" → Bread Crumbs Dark / Bread Crumbs Hover Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
