import type { Meta, StoryObj } from '@storybook/react';
import { useState, type CSSProperties } from 'react';
import { Icon, iconNames, type IconColor, type IconSize } from './Icon';
import { ICONS_16, ICONS_24, type IconDef } from './icons.generated';
import { Button } from '../Button';

const FILE = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'canvas' },
    design: { type: 'figma', url: `${FILE}?node-id=5-8779` },
  },
  argTypes: {
    name: { control: 'select', options: iconNames },
    size: {
      control: 'radio',
      options: [16, 24],
      description: 'Figma frame `Icons 16px` / `Icons 24px`. Default: 16 if the icon exists there, else 24',
    },
    color: {
      control: 'radio',
      options: ['primary', 'secondary', 'hover', 'current'],
      description: 'Figma `Color` / `Status`',
      table: { defaultValue: { summary: 'primary' } },
    },
    dot: { control: 'radio', options: [undefined, 'warning', 'success'], description: 'Figma `… New Notif`' },
    label: { control: 'text', description: 'Accessible name; omit for decorative icons' },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: { name: 'search' },
};

// ─── VARIANTS (Figma Color / Status) ─────────────────────────────────────────
const row: CSSProperties = { display: 'flex', gap: 24, alignItems: 'center' };
const caption: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-micro)',
  lineHeight: 'var(--font-line-height-micro)',
  color: 'var(--color-grey-dark)',
};
const COLORS: { color: IconColor; label: string }[] = [
  { color: 'primary', label: 'Primary · Static' },
  { color: 'secondary', label: 'Secondary · Not Active' },
  { color: 'hover', label: 'Hover' },
];

function ColorRow({ name, size }: { name: 'user' | 'info'; size: IconSize }) {
  return (
    <div style={row}>
      {COLORS.map(({ color, label }) => (
        <div key={color} style={{ display: 'grid', justifyItems: 'center', gap: 8 }}>
          <Icon name={name} size={size} color={color} />
          <span style={caption}>{label}</span>
        </div>
      ))}
    </div>
  );
}

export const Colors: Story = {
  args: { name: 'user' },
  parameters: {
    docs: {
      description: {
        story: '16px icons have Primary / Secondary. 24px icons add Hover (Status=Hover).',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <ColorRow name="user" size={16} />
      <ColorRow name="user" size={24} />
    </div>
  ),
};

export const Sizes: Story = {
  args: { name: 'info' },
  render: (args) => (
    <div style={row}>
      <Icon {...args} size={16} />
      <Icon {...args} size={24} />
    </div>
  ),
};

export const InheritColor: Story = {
  name: 'Inherit color (current)',
  args: { name: 'export', color: 'current' },
  parameters: {
    docs: { description: { story: '`color="current"` takes the parent text color — this is how Button uses icons.' } },
  },
  render: (args) => (
    <div style={row}>
      <span style={{ color: 'var(--color-danger)' }}><Icon {...args} /></span>
      <Button variant="dark" iconLeft="export">Export</Button>
      <Button variant="danger" iconLeft="delete">Reject</Button>
    </div>
  ),
};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const NewNotification: Story = {
  name: 'New Notif (dot)',
  args: { name: 'bell', size: 24, color: 'secondary', dot: 'warning' },
  parameters: {
    design: { type: 'figma', url: `${FILE}?node-id=6-9187` },
    docs: { description: { story: 'Figma `Bell New Notif` (orange), `Bag New Notif` and `Support New Notif` (green).' } },
  },
  render: (args) => (
    <div style={row}>
      <Icon {...args} name="bell" dot="warning" />
      <Icon {...args} name="bag" dot="success" />
      <Icon {...args} name="support" dot="success" />
    </div>
  ),
};

export const WithLabel: Story = {
  args: { name: 'warning-v1', size: 24, label: 'Warning' },
  parameters: { docs: { description: { story: 'Meaningful icon: `label` adds `role="img"` + `aria-label`.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const SizeFallback: Story = {
  name: 'Only in 24px set',
  args: { name: 'bell' },
  parameters: {
    docs: { description: { story: '`bell` exists only in `Icons 24px`, so without `size` it renders at 24px.' } },
  },
};

export const UnknownName: Story = {
  args: { name: 'does-not-exist' as never },
  parameters: { docs: { description: { story: 'Unknown names render nothing (and warn in dev).' } } },
  render: (args) => (
    <div style={row}>
      <span style={caption}>before</span>
      <Icon {...args} />
      <span style={caption}>after</span>
    </div>
  ),
};

// ─── GALLERY (mirrors the Figma frames) ──────────────────────────────────────
const tile: CSSProperties = {
  display: 'grid',
  justifyItems: 'center',
  alignContent: 'center',
  gap: 8,
  width: 96,
  height: 80,
  padding: 4,
  border: 0,
  borderRadius: 'var(--radius-sm)',
  background: 'var(--color-white)',
  boxShadow: 'inset 0 0 0 1px var(--color-stroke-light-v2)',
  cursor: 'copy',
};

function Gallery({ size, icons }: { size: IconSize; icons: Record<string, IconDef> }) {
  const [query, setQuery] = useState('');
  const [color, setColor] = useState<IconColor>('primary');
  const [copied, setCopied] = useState('');
  const entries = Object.entries(icons).filter(([n]) => n.includes(query.trim().toLowerCase()));
  // Main frame first, then the `solid` frame (same order as in Figma).
  const groups = [...new Set(entries.map(([, d]) => d.group))].sort((a, b) => a.length - b.length);

  const copy = (name: string) => {
    const code = `<Icon name="${name}"${size === 24 ? ' size={24}' : ''} />`;
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(name);
  };

  return (
    <div style={{ fontFamily: 'var(--font-family-base)', display: 'grid', gap: 16 }}>
      <div style={{ ...row, gap: 16, flexWrap: 'wrap' }}>
        <label style={{ ...row, gap: 8 }}>
          <Icon name="search" color="secondary" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search icons"
            style={{ font: 'inherit', padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-stroke-button)' }}
          />
        </label>
        {COLORS.map(({ color: c, label }) => (
          <label key={c} style={{ ...caption, ...row, gap: 4 }}>
            <input type="radio" checked={color === c} onChange={() => setColor(c)} />
            {label}
          </label>
        ))}
        <span style={caption}>{copied ? `Copied <Icon name="${copied}" />` : 'Click an icon to copy its code'}</span>
      </div>
      {groups.map((group) => (
        <section key={group}>
          <h4 style={{ margin: '0 0 8px', fontSize: 'var(--font-size-small)', color: 'var(--color-primary-blue-dark)' }}>{group}</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {entries
              .filter(([, d]) => d.group === group)
              .map(([name, d]) => (
                <button key={name} type="button" style={tile} title={`Figma: ${d.figma}`} onClick={() => copy(name)}>
                  <Icon name={name as never} size={size} color={color} />
                  <span style={{ ...caption, wordBreak: 'break-word', textAlign: 'center' }}>{name}</span>
                </button>
              ))}
          </div>
        </section>
      ))}
      {entries.length === 0 && <p style={caption}>No icons match “{query}”.</p>}
    </div>
  );
}

export const AllIcons16: Story = {
  name: 'All icons · 16px',
  args: { name: 'search' },
  parameters: { layout: 'padded', design: { type: 'figma', url: `${FILE}?node-id=5-8779` } },
  render: () => <Gallery size={16} icons={ICONS_16} />,
};

export const AllIcons24: Story = {
  name: 'All icons · 24px',
  args: { name: 'bell' },
  parameters: { layout: 'padded', design: { type: 'figma', url: `${FILE}?node-id=6-9039` } },
  render: () => <Gallery size={24} icons={ICONS_24} />,
};

/** Figma "Dark Atoms Components" → Icons 16px / 24px. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const ColorsDark: Story = {
  ...Colors,
  name: 'Colors (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content' }}>
        <Story />
      </div>
    ),
  ],
};
