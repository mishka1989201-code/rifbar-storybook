import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SwitchButton, type SwitchButtonStyle } from './SwitchButton';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=13-14035';

const meta = {
  title: 'Atoms/SwitchButtons',
  component: SwitchButton,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    active: { control: 'boolean', description: 'Figma `Tab=Active`' },
    variant: {
      control: 'inline-radio',
      options: ['dark', 'light'],
      description: 'Figma `Style` (Dark / Light)',
      table: { defaultValue: { summary: 'dark' } },
    },
    disabled: { control: 'boolean', description: 'Not in Figma — AI-defined 20% opacity' },
    forceHover: { control: 'boolean', description: 'Hover look (preview only, not in Figma)' },
    children: { control: 'text', description: 'Label' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof SwitchButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = { args: { active: true, variant: 'dark', children: 'All clients' } };

// ─── VARIANTS (Figma Tab × Style) ────────────────────────────────────────────
export const ActiveDark: Story = {
  name: 'Active, Dark',
  args: { active: true, variant: 'dark', children: 'All clients' },
};

export const ActiveLight: Story = {
  name: 'Active, Light',
  args: { active: true, variant: 'light', children: 'All clients' },
};

export const NotActive: Story = {
  name: 'Not Active',
  args: { active: false, children: 'Pending (8)' },
  parameters: { docs: { description: { story: 'Same for both styles in Figma: no fill, Grey Dark text.' } } },
};

// ─── STATES (not designed in Figma) ──────────────────────────────────────────
export const Hover: Story = {
  args: { forceHover: true, children: 'Pending (8)' },
  parameters: { docs: { description: { story: 'AI-defined: Not Active → Headlines text. Active buttons do not change.' } } },
};

export const Focused: Story = {
  args: { autoFocus: true, children: 'Pending (8)' },
  parameters: { docs: { description: { story: 'Keyboard focus ring. AI-defined, same as Button.' } } },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Pending (8)' },
  parameters: { docs: { description: { story: 'AI-defined: 20% opacity, as in other atoms.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongLabel: Story = {
  name: 'Long label',
  args: { active: true, children: 'Waiting for payment confirmation (128)' },
  parameters: { docs: { description: { story: 'The label never wraps; the button grows with its text.' } } },
};

// ─── IN CONTEXT: a group that filters a list ─────────────────────────────────
const OPTIONS = ['All clients', 'Pending (8)', 'Archived'];

function GroupDemo({ variant }: { variant: SwitchButtonStyle }) {
  const [current, setCurrent] = useState(0);
  return (
    <div role="group" aria-label="Clients filter" style={{ display: 'flex', gap: 'var(--spacing-8)' }}>
      {OPTIONS.map((label, i) => (
        <SwitchButton key={label} variant={variant} active={i === current} onClick={() => setCurrent(i)}>
          {label}
        </SwitchButton>
      ))}
    </div>
  );
}

export const GroupDarkExample: Story = {
  name: 'Example: Group, Dark',
  args: { children: '' },
  render: () => <GroupDemo variant="dark" />,
  parameters: { docs: { description: { story: 'Interactive. Gap 8px is AI-defined.' } } },
};

export const GroupLightExample: Story = {
  name: 'Example: Group, Light',
  args: { children: '' },
  render: () => <GroupDemo variant="light" />,
  parameters: { docs: { description: { story: 'Interactive. Gap 8px is AI-defined.' } } },
};
