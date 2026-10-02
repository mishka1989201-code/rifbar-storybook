import type { Meta, StoryObj } from '@storybook/react';
import { useState, type CSSProperties } from 'react';
import { PlayButton, type PlayButtonKind } from './PlayButton';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=657-268619';

const meta = {
  title: 'Atoms/PlayButton',
  component: PlayButton,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'canvas' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    kind: {
      control: 'inline-radio',
      options: ['play', 'stop'],
      description: 'Figma `Type` property',
      table: { defaultValue: { summary: 'play' } },
    },
    disabled: { control: 'boolean', description: 'Figma `Status=Disabled`' },
    forceHover: { control: 'boolean', description: 'Figma `Status=Static Hover` (preview only)' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof PlayButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: { kind: 'play' },
};

// ─── TYPES (Figma Type) ──────────────────────────────────────────────────────
export const Play: Story = { args: { kind: 'play' } };

export const Stop: Story = { args: { kind: 'stop' } };

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Hover: Story = { args: { kind: 'play', forceHover: true } };

export const StopHover: Story = { args: { kind: 'stop', forceHover: true } };

export const Disabled: Story = { args: { kind: 'play', disabled: true } };

export const StopDisabled: Story = { args: { kind: 'stop', disabled: true } };

export const Focused: Story = {
  args: { kind: 'play', autoFocus: true },
  parameters: { docs: { description: { story: 'Keyboard focus ring. Not designed in Figma — AI-defined.' } } },
};

// ─── STATE MATRIX (mirrors the Figma frame `Button.Play`) ────────────────────
const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'max-content repeat(3, 72px)',
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

const rows: { kind: PlayButtonKind; label: string }[] = [
  { kind: 'play', label: 'Play' },
  { kind: 'stop', label: 'Stop' },
];

export const AllVariants: Story = {
  name: 'All Types × States',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={grid}>
      <span />
      {['Static', 'Static Hover', 'Disabled'].map((s) => (
        <span key={s} style={{ ...caption, justifySelf: 'center' }}>{s}</span>
      ))}
      {rows.map(({ kind, label }) => (
        <div key={kind} style={{ display: 'contents' }}>
          <span style={caption}>{label}</span>
          <PlayButton kind={kind} />
          <PlayButton kind={kind} forceHover />
          <PlayButton kind={kind} disabled />
        </div>
      ))}
    </div>
  ),
};

// ─── IN CONTEXT: one button toggling between Play and Stop ───────────────────
function ToggleDemo() {
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-family-base)', fontSize: 14 }}>
      <PlayButton kind={playing ? 'stop' : 'play'} onClick={() => setPlaying(!playing)} />
      <span style={{ color: 'var(--color-primary-blue-dark)' }}>{playing ? 'Playing…' : 'Stopped'}</span>
    </div>
  );
}

export const ToggleExample: Story = {
  name: 'Example: Play / Stop toggle',
  render: () => <ToggleDemo />,
  parameters: {
    docs: { description: { story: 'Interactive. Click to switch between Play and Stop. Gap 12px is AI-defined (demo only).' } },
  },
};
