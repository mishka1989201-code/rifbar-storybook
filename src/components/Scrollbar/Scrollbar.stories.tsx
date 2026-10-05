import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import { Scrollbar } from './Scrollbar';

const FIGMA_CONTENT =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=4216-477062';
const FIGMA_DROPDOWN =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=7030-226168';

const text: CSSProperties = {
  margin: 0,
  fontFamily: 'var(--font-family-base)',
  fontSize: 14,
  lineHeight: '21px',
  color: 'var(--color-text)',
};

/** Demo-only rows; `count` sets how long the content is (and so the thumb length). */
function Rows({ count, label = 'Item' }: { count: number; label?: string }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <p key={i} style={{ ...text, padding: '0 8px' }}>
          {label} {i + 1}
        </p>
      ))}
    </>
  );
}

const meta = {
  title: 'Atoms/Scrollbar',
  component: Scrollbar,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'canvas' },
    design: { type: 'figma', url: FIGMA_CONTENT },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['content', 'dropdown'] },
    axis: { control: 'inline-radio', options: ['y', 'x', 'both'] },
  },
  args: { 'aria-label': 'Scrollable list', style: { width: 240, height: 200 } },
} satisfies Meta<typeof Scrollbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── CONTENT (Figma: Scrollbar Content) ──────────────────────────────────────
export const Default: Story = {
  render: (args) => (
    <Scrollbar {...args}>
      <Rows count={30} />
    </Scrollbar>
  ),
};

/** Figma `Property 1=Big`: a 342px-high scroll area; the thumb fills almost all of it. */
export const ContentBig: Story = {
  name: 'Content — Big (342px)',
  args: { style: { width: 240, height: 342 } },
  render: (args) => (
    <Scrollbar {...args}>
      <Rows count={17} />
    </Scrollbar>
  ),
  parameters: { docs: { description: { story: 'Thumb length follows the content: a bit more content than fits gives a long thumb.' } } },
};

/** Figma `Property 1=Small`: an 81px-high scroll area. */
export const ContentSmall: Story = {
  name: 'Content — Small (81px)',
  args: { style: { width: 240, height: 81 } },
  render: (args) => (
    <Scrollbar {...args}>
      <Rows count={5} />
    </Scrollbar>
  ),
};

// ─── DROPDOWN & POP-UP (Figma: Scrollbar.DropdownAndPopUp) ───────────────────
export const Dropdown: Story = {
  args: { variant: 'dropdown', style: { width: 240, height: 154 }, 'aria-label': 'Options' },
  parameters: {
    design: { type: 'figma', url: FIGMA_DROPDOWN },
    docs: { description: { story: 'Figma: 154px list, thumb is 25% of the track, i.e. content 4× the height.' } },
  },
  render: (args) => (
    <Scrollbar {...args}>
      <Rows count={28} label="Option" />
    </Scrollbar>
  ),
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const NoOverflow: Story = {
  render: (args) => (
    <Scrollbar {...args}>
      <Rows count={3} />
    </Scrollbar>
  ),
  parameters: { docs: { description: { story: 'Content fits: no scrollbar is drawn.' } } },
};

export const Horizontal: Story = {
  args: { axis: 'x', style: { width: 240, height: 80 } },
  render: (args) => (
    <Scrollbar {...args}>
      <p style={{ ...text, whiteSpace: 'nowrap', padding: 8 }}>
        A very long line that does not fit in the container and has to be scrolled sideways to read it to the end.
      </p>
    </Scrollbar>
  ),
};

// ─── MATRIX ──────────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All Variants',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <Scrollbar aria-label="Content, big" style={{ width: 160, height: 342 }}>
        <Rows count={17} />
      </Scrollbar>
      <Scrollbar aria-label="Content, small" style={{ width: 160, height: 81 }}>
        <Rows count={5} />
      </Scrollbar>
      <Scrollbar variant="dropdown" aria-label="Dropdown" style={{ width: 160, height: 154 }}>
        <Rows count={28} label="Option" />
      </Scrollbar>
    </div>
  ),
};
