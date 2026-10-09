import type { Meta, StoryObj } from '@storybook/react';
import { TooltipBordered, type TooltipBorderedPosition, type TooltipBorderedTone, type TooltipBorderedWidth } from './TooltipBordered';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=73-57190';

const BODY = 'The Big Oxmox advised her not to do so, because there were thousands of bad Commas.';
const POSITIONS: TooltipBorderedPosition[] = ['left', 'top', 'bottom', 'right'];
const WIDTHS: TooltipBorderedWidth[] = ['fixed', 'hug'];

const meta = {
  title: 'Atoms/TooltipBordered',
  component: TooltipBordered,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    position: {
      control: 'inline-radio',
      options: POSITIONS,
      description: 'Figma `Position` — side of the target the bubble is on (the arrow is on the opposite side)',
      table: { defaultValue: { summary: 'left' } },
    },
    widthMode: {
      control: 'inline-radio',
      options: WIDTHS,
      description: 'Figma `Width mode`: fixed = 300px, text wraps; hug = one line',
      table: { defaultValue: { summary: 'fixed' } },
    },
    tone: {
      control: 'inline-radio',
      options: ['default', 'subtle'] satisfies TooltipBorderedTone[],
      description: '`subtle` = BG Color fill, Stroke Light V2 border, Secondary Grey headline (Figma `Hover Row in Table`)',
      table: { defaultValue: { summary: 'default' } },
    },
    title: { control: 'text', description: 'Headline. Empty = hidden (Figma `Show headline`)' },
    children: { control: 'text', description: 'Body text. Empty = hidden (Figma `Show body text`)' },
  },
  args: { title: 'Title text', children: BODY },
  // Room for the shadow, which falls 50px down.
  decorators: [(Story) => <div style={{ padding: '16px 16px 64px' }}>{Story()}</div>],
} satisfies Meta<typeof TooltipBordered>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = { args: { position: 'left', widthMode: 'fixed' } };

// ─── POSITIONS (Figma Position) ──────────────────────────────────────────────
export const Left: Story = { args: { position: 'left' }, parameters: { docs: { description: { story: 'Bubble to the left of the target, arrow points right.' } } } };
export const Right: Story = { args: { position: 'right' }, parameters: { docs: { description: { story: 'Bubble to the right of the target, arrow points left.' } } } };
export const Top: Story = { args: { position: 'top' }, parameters: { docs: { description: { story: 'Bubble above the target, arrow points down.' } } } };
export const Bottom: Story = { args: { position: 'bottom' }, parameters: { docs: { description: { story: 'Bubble below the target, arrow points up.' } } } };

// ─── WIDTH MODE (Figma Width mode) ───────────────────────────────────────────
export const Hug: Story = {
  args: { widthMode: 'hug', children: 'Short hint on one line' },
  parameters: { docs: { description: { story: '`hug`: no wrapping, the bubble is as wide as its longest line.' } } },
};

// ─── CONTENT (Figma Show headline / Show body text) ──────────────────────────
export const BodyOnly: Story = { name: 'Body only', args: { title: undefined } };
export const TitleOnly: Story = { name: 'Title only', args: { children: undefined } };

// ─── TONE (Figma: Hover Row in Table) ────────────────────────────────────────
const SUBTLE_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3352-240745';

export const Subtle: Story = {
  args: { tone: 'subtle', position: 'bottom', title: 'Detailed information' },
  parameters: {
    design: { type: 'figma', url: SUBTLE_URL },
    docs: { description: { story: 'The tooltip as used in `Hover Row in Table`: arrow on top, centred; the width is set by the caller (899px there).' } },
  },
};

export const SubtleDark: Story = {
  name: 'Subtle (dark)',
  args: { tone: 'subtle', position: 'bottom', title: 'Detailed information' },
  parameters: { design: { type: 'figma', url: SUBTLE_URL }, docs: { description: { story: 'Dark theme values of the same tooltip.' } } },
  render: (args) => (
    <div data-theme="dark" style={{ padding: 'var(--spacing-16) var(--spacing-16) 64px', background: 'var(--color-primary-blue-dark-dark)' }}>
      <TooltipBordered {...args} />
    </div>
  ),
};

export const MultiParagraph: Story = {
  name: 'Several paragraphs',
  args: {
    tone: 'subtle',
    position: 'bottom',
    title: 'Detailed information',
    children: (
      <>
        <p>First paragraph of the detailed information.</p>
        <p>Second paragraph, set directly under the first one.</p>
      </>
    ),
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongWord: Story = {
  name: 'Long unbroken word',
  args: { children: 'Supercalifragilisticexpialidocious_Supercalifragilisticexpialidocious_ORD-2026-000000123456' },
  parameters: { docs: { description: { story: 'In `fixed` mode a word that does not fit is broken so it never leaves the bubble.' } } },
};

// ─── ALL VARIANTS (mirrors the Figma frame) ──────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px 32px', alignItems: 'flex-start', paddingBottom: 56 }}>
      {WIDTHS.flatMap((w) =>
        POSITIONS.map((p) => (
          <TooltipBordered key={`${w}-${p}`} position={p} widthMode={w} title="Title text">
            {w === 'hug' ? 'Short hint on one line' : BODY}
          </TooltipBordered>
        )),
      )}
    </div>
  ),
};

// ─── IN CONTEXT ──────────────────────────────────────────────────────────────
export const Example: Story = {
  name: 'Example: next to a target',
  parameters: { docs: { description: { story: 'Placement is up to the caller. Demo styles are not part of the atom.' } } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      <TooltipBordered position="left" widthMode="hug" title="Credit limit">
        Used 8 400 of 10 000 ₴
      </TooltipBordered>
      <span
        style={{
          width: 40,
          height: 40,
          borderRadius: 'var(--radius-round)',
          background: 'var(--color-hover-blue)',
          color: 'var(--color-white)',
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'var(--font-family-base)',
        }}
      >
        i
      </span>
    </div>
  ),
};
