import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ChevronDropDown, type ChevronDropDownColor } from './ChevronDropDown';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=78-15533';

const COLORS: ChevronDropDownColor[] = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark', 'white'];
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

const meta = {
  title: 'Atoms/ChevronDropDown',
  component: ChevronDropDown,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'canvas' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  args: { color: 'primary', children: 'Primary' },
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
      description: 'Figma `Color`',
      table: { defaultValue: { summary: 'primary' } },
    },
    children: { control: 'text', description: 'Label (usually the chosen value)' },
    open: { control: 'boolean', description: 'List is open — Figma Active column (`Status=Hover`)' },
    forceHover: { control: 'boolean', description: 'Hover / Focus glow (preview only)' },
    disabled: { control: 'boolean', description: 'Figma Disabled column (20% opacity)' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof ChevronDropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── ALL COLORS × STATES (the Figma board) ───────────────────────────────────
const head: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-mini)',
  fontWeight: 600,
  color: 'var(--color-text)',
};
const STATES = [
  ['Static', {}],
  ['Hover / Focus', { forceHover: true }],
  ['Active (open)', { open: true }],
  ['Disabled', { disabled: true }],
] as const;

export const AllStates: Story = {
  name: 'All colors × states',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, max-content)', gap: '20px 40px', alignItems: 'center' }}>
      {STATES.map(([label]) => (
        <span key={label} style={head}>
          {label}
        </span>
      ))}
      {COLORS.map((color) =>
        STATES.map(([label, props]) => (
          <div
            key={color + label}
            style={color === 'white' ? { justifySelf: 'start', background: 'var(--color-primary-blue-dark)', padding: '0 8px', borderRadius: 6 } : undefined}
          >
            <ChevronDropDown color={color} {...props}>
              {cap(color)}
            </ChevronDropDown>
          </div>
        )),
      )}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Same layout as the Figma board. White is shown on Primary Blue Dark — it is meant for dark backgrounds.',
      },
    },
  },
};

// ─── STATES (single) ─────────────────────────────────────────────────────────
export const HoverFocus: Story = { name: 'Hover / Focus', args: { forceHover: true } };
export const Open: Story = { name: 'Active (open)', args: { open: true } };
export const Disabled: Story = { args: { disabled: true } };

export const White: Story = {
  args: { color: 'white', children: 'All warehouses' },
  decorators: [(Story) => <div style={{ padding: 16, background: 'var(--color-primary-blue-dark)' }}>{Story()}</div>],
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongLabel: Story = {
  args: { color: 'secondary', children: 'Central warehouse, Lviv — building 2, section B' },
  decorators: [(Story) => <div style={{ width: 180 }}>{Story()}</div>],
  parameters: { docs: { description: { story: 'Label is cut with “…” when the container is narrow; the arrow stays.' } } },
};

export const ShortLabel: Story = { args: { children: 'All' } };

// ─── EXAMPLE: opens a list ───────────────────────────────────────────────────
const OPTIONS = ['All statuses', 'New', 'In progress', 'Shipped', 'Cancelled'];

function WithMenu() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(OPTIONS[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', height: 220 }}>
      <ChevronDropDown open={open} aria-controls="status-menu" onClick={() => setOpen((o) => !o)}>
        {value}
      </ChevronDropDown>
      {open && (
        <ul
          id="status-menu"
          role="menu"
          style={{
            position: 'absolute',
            top: 32,
            left: 0,
            minWidth: 160,
            margin: 0,
            padding: 4,
            listStyle: 'none',
            background: 'var(--color-white)',
            borderRadius: 6,
            boxShadow: 'var(--shadow-tooltip)',
            fontFamily: 'var(--font-family-base)',
            fontSize: 12,
          }}
        >
          {OPTIONS.map((o) => (
            <li key={o} role="none">
              <button
                role="menuitem"
                type="button"
                onClick={() => {
                  setValue(o);
                  setOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: 'none',
                  borderRadius: 4,
                  textAlign: 'left',
                  font: 'inherit',
                  cursor: 'pointer',
                  color: o === value ? 'var(--color-hover-blue)' : 'var(--color-text)',
                  background: o === value ? 'var(--color-secondary-light)' : 'transparent',
                }}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const WithMenuExample: Story = {
  name: 'Example: opens a list',
  render: () => <WithMenu />,
  parameters: {
    docs: {
      description: {
        story: 'The list here is a quick demo, not a DS component yet. Click outside or press Esc to close.',
      },
    },
  },
};
