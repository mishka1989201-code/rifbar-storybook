import type { Meta, StoryObj } from '@storybook/react';
import { useState, type CSSProperties } from 'react';
import { HeaderMenu, HeaderMenuItem } from './HeaderMenu';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=9-9215';

const meta = {
  title: 'Atoms/HeaderMenu',
  component: HeaderMenuItem,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  args: { icon: 'bell', label: 'Notifications', dot: 'warning' },
  argTypes: {
    icon: { control: 'select', options: ['support', 'bag', 'bell'], description: '24px icon' },
    label: { control: 'text', description: 'Accessible name (also the tooltip)' },
    dot: {
      control: 'select',
      options: [undefined, 'warning', 'success'],
      description: 'Notification dot (Figma `… New Notif`)',
    },
    active: { control: 'boolean', description: 'Figma `Active`' },
    forceHover: { control: 'boolean', description: 'Figma `Hover` (preview only)' },
    disabled: { control: 'boolean', description: 'Not designed — 20% opacity' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof HeaderMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma Header Menu: only the bell is visible) ───────────────────
export const Default: Story = {};

// ─── FULL MENU (Figma Header Menu Variants, row 1) ───────────────────────────
export const FullMenu: Story = {
  name: 'Full menu',
  render: () => (
    <HeaderMenu aria-label="Header actions">
      <HeaderMenuItem icon="support" label="Support" dot="success" />
      <HeaderMenuItem icon="bag" label="Orders" dot="success" />
      <HeaderMenuItem icon="bell" label="Notifications" dot="warning" />
    </HeaderMenu>
  ),
  parameters: { docs: { description: { story: 'Support, Bag and Bell, 16px apart, aligned to the right.' } } },
};

// ─── STATES (Figma Header Menu Variants: Static / Hover / Active) ────────────
const rowLabel: CSSProperties = {
  width: 80,
  fontFamily: 'var(--font-family-base)',
  fontWeight: 'var(--font-weight-medium)' as CSSProperties['fontWeight'],
  fontSize: 'var(--font-size-small)',
  color: 'var(--color-text)',
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 32 }}>
      {(['Static', 'Hover', 'Active'] as const).map((state) => (
        <div key={state} style={{ display: 'flex', alignItems: 'center' }}>
          <span style={rowLabel}>{state}</span>
          <HeaderMenu aria-label={`${state} example`}>
            {(
              [
                ['support', 'Support', 'success'],
                ['bag', 'Orders', 'success'],
                ['bell', 'Notifications', 'warning'],
              ] as const
            ).map(([icon, label, dot]) => (
              <HeaderMenuItem
                key={icon}
                icon={icon}
                label={label}
                dot={dot}
                forceHover={state === 'Hover'}
                active={state === 'Active'}
              />
            ))}
          </HeaderMenu>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Static — Grey Dark, Hover — Hover Blue Light, Active — Headlines. The dot does not change.' } },
  },
};

export const Active: Story = { args: { active: true } };
export const Hover: Story = { args: { forceHover: true } };
export const Disabled: Story = {
  args: { disabled: true },
  parameters: { docs: { description: { story: 'Not designed in Figma — same 20% opacity as other atoms.' } } },
};

// ─── EMPTY STATE: no notifications ───────────────────────────────────────────
export const NoNotifications: Story = {
  name: 'No notifications (empty)',
  render: () => (
    <HeaderMenu aria-label="Header actions">
      <HeaderMenuItem icon="support" label="Support" />
      <HeaderMenuItem icon="bag" label="Orders" />
      <HeaderMenuItem icon="bell" label="Notifications" />
    </HeaderMenu>
  ),
  parameters: { docs: { description: { story: 'Without `dot` the icons are drawn plain — nothing new to look at.' } } },
};

// ─── IN CONTEXT: clicking opens a panel ──────────────────────────────────────
function Interactive() {
  const [open, setOpen] = useState<string | null>(null);
  const [unread, setUnread] = useState(true);
  const toggle = (id: string) => setOpen((cur) => (cur === id ? null : id));
  return (
    <div style={{ width: 360, display: 'grid', gap: 12 }}>
      <HeaderMenu aria-label="Header actions">
        <HeaderMenuItem icon="support" label="Support" dot="success" active={open === 'support'} aria-expanded={open === 'support'} onClick={() => toggle('support')} />
        <HeaderMenuItem icon="bag" label="Orders" dot="success" active={open === 'bag'} aria-expanded={open === 'bag'} onClick={() => toggle('bag')} />
        <HeaderMenuItem
          icon="bell"
          label="Notifications"
          dot={unread ? 'warning' : undefined}
          active={open === 'bell'}
          aria-expanded={open === 'bell'}
          onClick={() => {
            toggle('bell');
            setUnread(false);
          }}
        />
      </HeaderMenu>
      <p style={{ margin: 0, textAlign: 'right', fontFamily: 'var(--font-family-base)', fontSize: 12, color: 'var(--color-grey-dark)' }}>
        {open ? `Panel “${open}” is open` : 'Click an icon'}
      </p>
    </div>
  );
}

export const InteractiveExample: Story = {
  name: 'Example: opens a panel',
  render: () => <Interactive />,
  parameters: {
    docs: { description: { story: 'The open panel’s icon is Active. Opening the bell clears its dot.' } },
  },
};

// ─── DARK THEME (Figma Dark Atoms Components → Header Menu Static Dark: Static / Hover / Active) ──
export const DarkTheme: Story = {
  name: 'Dark theme',
  render: () => (
    <div data-theme="dark" style={{ padding: 24, background: 'var(--color-white-dark)', display: 'grid', gap: 24 }}>
      {(['Static', 'Hover', 'Active'] as const).map((state) => (
        <HeaderMenu key={state} aria-label={`${state} example`}>
          <HeaderMenuItem icon="support" label="Support" dot="success" forceHover={state === 'Hover'} active={state === 'Active'} />
          <HeaderMenuItem icon="bag" label="Orders" dot="success" forceHover={state === 'Hover'} active={state === 'Active'} />
          <HeaderMenuItem icon="bell" label="Notifications" dot="warning" forceHover={state === 'Hover'} active={state === 'Active'} />
        </HeaderMenu>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Figma "Dark Atoms Components" → Header Menu Static Dark: Static Grey Dark `#5D6E82`, Hover Headlines `#4549A1`, Active Hover Blue Light `#888CF6` (swapped relative to the light theme).',
      },
    },
  },
};
