import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NoteCard } from './NoteCard';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3843-307004';

const SHORT = 'Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.';

const TEXT = `Forem ipsum dolor sit amet, consectetur adipiscing elit.  Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus...`;

const meta = {
  title: 'Molecules/NoteCard',
  component: NoteCard,
  parameters: { layout: 'padded', backgrounds: { default: 'light' }, design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    children: { control: 'text', description: 'Note text; blank lines split paragraphs' },
    date: { control: 'text' },
    dateTime: { control: 'text' },
    moreLabel: { control: 'text' },
    forceHover: { control: 'boolean', description: 'Preview only: Figma Hover' },
    onMore: { action: 'more' },
  },
  args: { children: TEXT, date: '07.23.2023', dateTime: '2023-07-23', onMore: () => {} },
  // Figma frame is 1524px wide.
  decorators: [(Story) => <div style={{ maxWidth: 1524, paddingBottom: 40 }}><Story /></div>],
} satisfies Meta<typeof NoteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Static) ─────────────────────────────────────────────────
export const Default: Story = {};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Hover: Story = { args: { forceHover: true } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const ShortText: Story = { name: 'Short text', args: { children: SHORT } };

export const WithoutMore: Story = {
  name: 'Without "more"',
  args: { onMore: undefined },
  parameters: { docs: { description: { story: 'The link is drawn only when `onMore` is passed.' } } },
};

export const WithoutDate: Story = { name: 'Without date', args: { date: undefined } };

export const LongWord: Story = {
  name: 'Long word',
  args: { children: 'https://example.com/a/very/long/link/with/no/spaces/that/must/wrap/inside/the/note/box/instead/of/overflowing/the/card' },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 320, paddingBottom: 40 }}><Story /></div>],
};

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: function Render(args) {
    const [expanded, setExpanded] = useState(false);
    return (
      <NoteCard {...args} onMore={expanded ? undefined : () => setExpanded(true)}>
        {expanded ? `${TEXT.replace(/\.\.\.$/, '.')}\n\nDonec ac nibh a justo mollis laoreet. Nulla facilisi.` : TEXT}
      </NoteCard>
    );
  },
  parameters: { docs: { description: { story: 'The card does not cut the text itself: the parent decides what to show and hides the link when everything is visible.' } } },
};

// ─── ALL VARIANTS (Figma frame: Static + Hover) ──────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      <NoteCard {...args} />
      <NoteCard {...args} forceHover />
    </div>
  ),
};
