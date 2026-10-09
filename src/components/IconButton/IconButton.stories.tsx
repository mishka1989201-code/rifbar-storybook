import type { Meta, StoryObj } from '@storybook/react';
import { useState, type CSSProperties } from 'react';
import { IconButton, type IconButtonKind } from './IconButton';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=17-7376';

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'canvas' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    kind: {
      control: 'select',
      options: ['search', 'page', 'prev', 'next', 'close'],
      description: 'Figma `Icon Button` property',
      table: { defaultValue: { summary: 'search' } },
    },
    active: { control: 'boolean', description: 'Figma `Status=Active`' },
    disabled: { control: 'boolean', description: 'Figma `Status=Disabled`' },
    forceHover: { control: 'boolean', description: 'Figma `Status=Hover` (preview only)' },
    children: { control: 'text', description: 'Page number (`kind="page"` only)' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: { kind: 'search' },
};

// ─── KINDS (Figma Icon Button) ───────────────────────────────────────────────
export const Search: Story = { args: { kind: 'search' } };

export const PaginationNumber: Story = { args: { kind: 'page', children: 1 } };

export const PaginationArrowLeft: Story = { args: { kind: 'prev' } };

export const PaginationArrowRight: Story = { args: { kind: 'next' } };

export const SmallPage: Story = {
  name: 'Small page (24px)',
  args: { kind: 'page', children: 4, size: 'sm' },
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3739-305804' } },
};
export const SmallActive: Story = { name: 'Small active', args: { kind: 'page', children: 4, size: 'sm', active: true } };
export const SmallArrows: Story = {
  name: 'Small arrows',
  render: (args) => (
    <div style={{ display: 'flex', gap: 4 }}>
      <IconButton {...args} kind="prev" size="sm" />
      <IconButton {...args} kind="next" size="sm" />
    </div>
  ),
};

export const Close: Story = { args: { kind: 'close' } };

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Hover: Story = { args: { kind: 'page', children: 1, forceHover: true } };

export const Active: Story = {
  args: { kind: 'page', children: 1, active: true },
  parameters: { docs: { description: { story: 'Current page. Adds `aria-current="page"`.' } } },
};

export const Disabled: Story = { args: { kind: 'prev', disabled: true } };

export const Focused: Story = {
  args: { kind: 'page', children: 1, autoFocus: true },
  parameters: { docs: { description: { story: 'Keyboard focus ring. Not designed in Figma — AI-defined.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongPageNumber: Story = {
  args: { kind: 'page', children: 1250 },
  parameters: {
    docs: { description: { story: 'Four digits still fit the 40px square; five digits overflow — flag to design.' } },
  },
};

// ─── STATE MATRIX (mirrors the Figma frame `Icon Button`) ────────────────────
const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'max-content repeat(4, 56px)',
  gap: '16px 8px',
  alignItems: 'center',
  justifyItems: 'center',
};
const caption: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 12,
  color: 'var(--color-grey-dark)',
  justifySelf: 'start',
};

const rows: { kind: IconButtonKind; label: string }[] = [
  { kind: 'search', label: 'Search' },
  { kind: 'page', label: 'Pagination Number' },
  { kind: 'prev', label: 'Pagination Arrow Left' },
  { kind: 'next', label: 'Pagination Arrow Right' },
  { kind: 'close', label: 'Close' },
];

export const AllVariants: Story = {
  name: 'All Kinds × States',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={grid}>
      <span />
      {['Static', 'Hover', 'Active', 'Disabled'].map((s) => (
        <span key={s} style={{ ...caption, justifySelf: 'center' }}>{s}</span>
      ))}
      {rows.map(({ kind, label }) => (
        <div key={kind} style={{ display: 'contents' }}>
          <span style={caption}>{label}</span>
          <IconButton kind={kind}>1</IconButton>
          <IconButton kind={kind} forceHover>1</IconButton>
          <IconButton kind={kind} active>1</IconButton>
          <IconButton kind={kind} disabled>1</IconButton>
        </div>
      ))}
    </div>
  ),
};

// ─── IN CONTEXT: pagination built from IconButtons ───────────────────────────
function PaginationDemo() {
  const total = 5;
  const [page, setPage] = useState(2);
  return (
    <nav aria-label="Pagination" style={{ display: 'flex', gap: 8 }}>
      <IconButton kind="prev" disabled={page === 1} onClick={() => setPage(page - 1)} />
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <IconButton key={n} kind="page" active={n === page} onClick={() => setPage(n)}>
          {n}
        </IconButton>
      ))}
      <IconButton kind="next" disabled={page === total} onClick={() => setPage(page + 1)} />
    </nav>
  );
}

export const PaginationExample: Story = {
  name: 'Example: Pagination',
  render: () => <PaginationDemo />,
  parameters: {
    docs: { description: { story: 'Interactive. Gap between buttons (8px) is AI-defined — Pagination molecule is not ported yet.' } },
  },
};

/** Figma "Dark Atoms Components" → Icon Button. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const AllVariantsDark: Story = {
  ...AllVariants,
  name: 'All Kinds × States (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16 }}>
        <Story />
      </div>
    ),
  ],
};
