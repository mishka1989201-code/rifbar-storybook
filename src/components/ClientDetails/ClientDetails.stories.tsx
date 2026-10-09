import type { Meta, StoryObj } from '@storybook/react';
import { ClientDetails } from './ClientDetails';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=32-10673';

const TEXT = `Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.`;

const meta = {
  title: 'Molecules/ClientDetails',
  component: ClientDetails,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  args: { children: TEXT },
  argTypes: {
    title: { control: 'text' },
    children: { control: 'text', description: 'String (paragraphs split on blank lines) or any node' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1290 }}><Story /></div>],
} satisfies Meta<typeof ClientDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const CustomTitle: Story = {
  name: 'Custom title',
  args: { title: 'Comment', children: 'Delivery only on weekdays, call before arrival.' },
};

export const RichContent: Story = {
  name: 'Rich content',
  args: {
    children: (
      <>
        <p>First paragraph with a <strong>bold</strong> word.</p>
        <p>Second paragraph.</p>
      </>
    ),
  },
  parameters: { docs: { description: { story: 'Any node can be passed; `<p>` elements get the 12px gap.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongWord: Story = {
  name: 'Long unbroken word',
  args: { children: 'Reference: ' + 'A'.repeat(200) },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Unbroken strings wrap inside the card instead of overflowing.' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};

/** Figma "Dark Molecules Components" → Client Details Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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
