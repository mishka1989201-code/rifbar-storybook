import type { Meta, StoryObj } from '@storybook/react';
import { useState, type CSSProperties } from 'react';
import { Toggle } from './Toggle';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=1685-19822';

const meta = {
  title: 'Atoms/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'canvas' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    defaultChecked: { control: 'boolean', description: 'Figma `State=On State` (uncontrolled)' },
    checked: { control: 'boolean', description: 'Figma `State=On State` (controlled)' },
    disabled: { control: 'boolean', description: 'Figma `Status=Disabled`' },
    forceHover: { control: 'boolean', description: 'Figma `Status=Hover` (preview only)' },
    forceFocus: { control: 'boolean', description: 'Figma `Status=Focus Enabled` (preview only)' },
    children: { control: 'text', description: 'Optional label (not part of the Figma atom)' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: { defaultChecked: true, 'aria-label': 'Notifications' },
};

// ─── STATES (Figma State) ────────────────────────────────────────────────────
export const On: Story = { args: { defaultChecked: true, 'aria-label': 'On' } };

export const Off: Story = { args: { defaultChecked: false, 'aria-label': 'Off' } };

// ─── STATUSES ────────────────────────────────────────────────────────────────
export const OnHover: Story = { args: { defaultChecked: true, forceHover: true, 'aria-label': 'On hover' } };

export const OffHover: Story = {
  args: { defaultChecked: false, forceHover: true, 'aria-label': 'Off hover' },
};

export const OnFocus: Story = { args: { defaultChecked: true, forceFocus: true, 'aria-label': 'On focus' } };

export const OffFocus: Story = { args: { defaultChecked: false, forceFocus: true, 'aria-label': 'Off focus' } };

export const OnDisabled: Story = { args: { defaultChecked: true, disabled: true, 'aria-label': 'On disabled' } };

export const OffDisabled: Story = { args: { defaultChecked: false, disabled: true, 'aria-label': 'Off disabled' } };

// ─── WITH LABEL / EDGE CASES ─────────────────────────────────────────────────
export const WithLabel: Story = { args: { defaultChecked: true, children: 'Email notifications' } };

export const LongLabel: Story = {
  args: {
    defaultChecked: false,
    children: 'Send a copy of every invoice to the accountant and to the warehouse manager',
  },
  decorators: [(Story) => <div style={{ width: 280 }}>{Story()}</div>],
  parameters: { docs: { description: { story: 'Long label wraps; the toggle stays 48×24.' } } },
};

// ─── STATE MATRIX (mirrors the Figma frame `Toggle.atom`) ────────────────────
const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'max-content repeat(2, 72px)',
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

const statuses = [
  { label: 'Enabled', props: {} },
  { label: 'Hover', props: { forceHover: true } },
  { label: 'Focus Enabled', props: { forceFocus: true } },
  { label: 'Disabled', props: { disabled: true } },
];

export const AllVariants: Story = {
  name: 'All States × Statuses',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={grid}>
      <span />
      <span style={{ ...caption, justifySelf: 'center' }}>On State</span>
      <span style={{ ...caption, justifySelf: 'center' }}>Off State</span>
      {statuses.map(({ label, props }) => (
        <div key={label} style={{ display: 'contents' }}>
          <span style={caption}>{label}</span>
          <Toggle defaultChecked aria-label={`On ${label}`} {...props} />
          <Toggle aria-label={`Off ${label}`} {...props} />
        </div>
      ))}
    </div>
  ),
};

// ─── IN CONTEXT: settings list ───────────────────────────────────────────────
function SettingsDemo() {
  const [settings, setSettings] = useState({ email: true, sms: false, push: true });
  const row: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16 };
  return (
    <div style={row}>
      {(Object.keys(settings) as (keyof typeof settings)[]).map((key) => (
        <Toggle
          key={key}
          checked={settings[key]}
          onChange={(e) => setSettings({ ...settings, [key]: e.target.checked })}
        >
          {{ email: 'Email notifications', sms: 'SMS notifications', push: 'Push notifications' }[key]}
        </Toggle>
      ))}
      <Toggle disabled defaultChecked>
        Security alerts (always on)
      </Toggle>
    </div>
  );
}

export const SettingsExample: Story = {
  name: 'Example: Settings list',
  render: () => <SettingsDemo />,
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Interactive, controlled. Gap 16px between rows is AI-defined (demo only).' } },
  },
};

/** Figma "Dark Atoms Components" → atom. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const AllVariantsDark: Story = {
  ...AllVariants,
  name: 'All States × Statuses (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16 }}>
        <Story />
      </div>
    ),
  ],
};
