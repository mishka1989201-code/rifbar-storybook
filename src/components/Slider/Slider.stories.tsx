import type { Meta, StoryObj } from '@storybook/react';
import { useState, type CSSProperties } from 'react';
import { Slider } from './Slider';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=3923-227118';

// Figma sample width is 139px; the slider fills its container.
const width = (w: number) => (Story: () => JSX.Element) => <div style={{ width: w }}>{Story()}</div>;

const meta = {
  title: 'Atoms/Slider',
  component: Slider,
  decorators: [width(139)],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'canvas' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number', description: 'Set for a discrete slider' },
    defaultValue: { control: 'number' },
    disabled: { control: 'boolean' },
    forceFocus: { control: 'boolean', description: 'Focus visuals (preview only)' },
    onChange: { action: 'changed' },
  },
  args: { defaultValue: 50, 'aria-label': 'Value' },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `Slider Light`: handle in the middle of the track. */
export const Default: Story = {};

export const AtStart: Story = { args: { defaultValue: 0 } };

export const AtEnd: Story = { args: { defaultValue: 100 } };

export const Discrete: Story = {
  args: { min: 0, max: 5, step: 1, defaultValue: 2 },
  parameters: { docs: { description: { story: 'Figma: "Enabled discrete slider" — the handle jumps between steps.' } } },
};

export const Focus: Story = {
  args: { forceFocus: true },
  parameters: { docs: { description: { story: 'Not drawn in Figma. Focus shadow around the handle, same as InputField.' } } },
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: { docs: { description: { story: 'Not drawn in Figma. 20% opacity, same as the other atoms.' } } },
};

export const Wide: Story = {
  decorators: [width(400)],
  parameters: { docs: { description: { story: 'The slider fills its container; the handle keeps its size.' } } },
};

// ─── IN CONTEXT ──────────────────────────────────────────────────────────────
const text: CSSProperties = {
  margin: 0,
  fontFamily: 'var(--font-family-base)',
  fontSize: 14,
  lineHeight: '21px',
  color: 'var(--color-text)',
};

function VolumeDemo() {
  const [value, setValue] = useState(50);
  return (
    <div style={{ width: 240 }}>
      <label style={text} htmlFor="slider-demo">
        Volume: {value}
      </label>
      <Slider id="slider-demo" value={value} onChange={(e) => setValue(Number(e.target.value))} />
    </div>
  );
}

export const Example: Story = {
  name: 'Example: With a value',
  decorators: [],
  render: () => <VolumeDemo />,
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Interactive. The value text is demo-only; the Figma atom has no label or value.' } },
  },
};

/** Figma "Dark Atoms Components" → Slider Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const DarkTheme: Story = {
  name: 'Default, focus, disabled (dark theme)',
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 139 }}>
      <Slider defaultValue={50} aria-label="Default" />
      <Slider defaultValue={50} forceFocus aria-label="Focus" />
      <Slider defaultValue={50} disabled aria-label="Disabled" />
    </div>
  ),
};
