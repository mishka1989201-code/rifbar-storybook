import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ReactNode } from 'react';
import { Button, type ButtonVariant } from './Button';
import { iconNames } from '../Icon';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=17-5741';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'canvas' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'dark', 'light', 'danger', 'gray', 'text-arrow', 'text-checkmarks'],
      description: 'Figma `Style` property',
      table: { defaultValue: { summary: 'outline' } },
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'big'],
      description: 'Figma `Size` property (ignored by text variants)',
      table: { defaultValue: { summary: 'small' } },
    },
    iconLeft: { control: 'select', options: [undefined, ...iconNames] },
    iconRight: { control: 'select', options: [undefined, ...iconNames] },
    iconOnly: { control: 'select', options: [undefined, ...iconNames] },
    iconSize: { control: 'radio', options: [16, 24], description: 'Figma `Icon=Icon 24px` → 24' },
    counter: { control: 'number' },
    disabled: { control: 'boolean', description: 'Figma `Status=Disabled`' },
    forceHover: { control: 'boolean', description: 'Figma `Status=Hover` (preview only)' },
    children: { control: 'text', description: 'Label' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: { variant: 'outline', size: 'small', iconLeft: 'clear', children: 'Clear' },
};

// ─── VARIANTS (Figma Style) ──────────────────────────────────────────────────
export const OutlineLightBG: Story = {
  name: 'Outline Light BG',
  args: { variant: 'outline', iconLeft: 'clear', children: 'Clear' },
};

export const DarkBG: Story = {
  name: 'Dark BG',
  args: { variant: 'dark', iconLeft: 'export', children: 'Export' },
};

export const LightFill: Story = {
  args: { variant: 'light', iconLeft: 'info', children: 'More' },
};

export const Red: Story = {
  args: { variant: 'danger', iconLeft: 'delete', children: 'Reject' },
};

export const GrayBG: Story = {
  name: 'Gray BG',
  args: { variant: 'gray', iconLeft: 'back', children: 'Back' },
};

export const TextAndArrow: Story = {
  name: 'Text & Arrow',
  args: { variant: 'text-arrow', children: 'See all' },
};

export const TextAndCheckmarks: Story = {
  name: 'Text & Checkmarks',
  args: { variant: 'text-checkmarks', children: 'Mark all as read' },
};

// ─── SIZES ───────────────────────────────────────────────────────────────────
export const Medium: Story = {
  args: { variant: 'dark', size: 'medium', iconLeft: 'export', children: 'Export' },
};

export const Big: Story = {
  args: { variant: 'dark', size: 'big', children: 'Make a discount' },
};

// ─── ICON CONFIGURATIONS ─────────────────────────────────────────────────────
export const IconOnly: Story = {
  args: { variant: 'dark', iconOnly: 'export', 'aria-label': 'Export' },
};

export const IconOnly24px: Story = {
  name: 'Icon Only 24px',
  args: { variant: 'outline', iconOnly: 'csv', iconSize: 24, 'aria-label': 'Download CSV' },
};

export const LeftAndRightIcons: Story = {
  name: 'Left & Right Icons',
  args: { variant: 'dark', iconLeft: 'export', iconRight: 'export', children: 'Export' },
};

export const WithCounter: Story = {
  args: { variant: 'outline', iconLeft: 'clear', counter: 2, children: 'Clear' },
};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Hover: Story = {
  args: { ...DarkBG.args, forceHover: true },
};

export const Disabled: Story = {
  args: { ...DarkBG.args, disabled: true },
};

export const Focused: Story = {
  args: { ...DarkBG.args, autoFocus: true },
  parameters: { docs: { description: { story: 'Keyboard focus ring. Not designed in Figma — AI-defined.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongLabel: Story = {
  args: {
    variant: 'dark',
    iconLeft: 'export',
    children: 'Export all invoices for the selected period to accounting',
  },
};

export const ShortLabel: Story = {
  args: { variant: 'light', size: 'medium', children: 'OK' },
};

// ─── STATE MATRIX (mirrors the Figma frame `button_action`) ──────────────────
const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, max-content)',
  gap: '16px 24px',
  alignItems: 'center',
  justifyItems: 'start',
};
const caption: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 12,
  color: 'var(--color-grey-dark)',
};

function Row({ render }: { render: (s: { forceHover?: boolean; disabled?: boolean }) => ReactNode }) {
  return (
    <>
      {render({})}
      {render({ forceHover: true })}
      {render({ disabled: true })}
    </>
  );
}

const rows: { variant: ButtonVariant; icon?: 'clear' | 'export' | 'info' | 'delete' | 'back'; label: string }[] = [
  { variant: 'outline', icon: 'clear', label: 'Clear' },
  { variant: 'dark', icon: 'export', label: 'Export' },
  { variant: 'light', icon: 'info', label: 'More' },
  { variant: 'danger', icon: 'delete', label: 'Reject' },
  { variant: 'gray', icon: 'back', label: 'Back' },
];

export const AllVariants: Story = {
  name: 'All Variants × States',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {(['small', 'medium'] as const).map((size) => (
        <section key={size}>
          <p style={caption}>Size={size} · Static / Hover / Disabled</p>
          <div style={grid}>
            {rows.map((r) => (
              <Row
                key={r.variant}
                render={(s) => (
                  <Button variant={r.variant} size={size} iconLeft={r.icon} {...s}>
                    {r.label}
                  </Button>
                )}
              />
            ))}
          </div>
        </section>
      ))}

      <section>
        <p style={caption}>Icon only · Static / Hover / Disabled</p>
        <div style={grid}>
          {(['dark', 'light', 'danger', 'outline'] as const).map((v) => (
            <Row
              key={v}
              render={(s) => (
                <Button
                  variant={v}
                  iconOnly={v === 'dark' ? 'export' : v === 'danger' ? 'delete' : 'info'}
                  aria-label="Action"
                  {...s}
                />
              )}
            />
          ))}
          <Row render={(s) => <Button variant="outline" iconOnly="csv" iconSize={24} aria-label="Download CSV" {...s} />} />
        </div>
      </section>

      <section>
        <p style={caption}>Left & Right · Static / Hover / Disabled</p>
        <div style={grid}>
          <Row render={(s) => <Button variant="outline" iconLeft="clear" counter={2} {...s}>Clear</Button>} />
          <Row
            render={(s) => (
              <Button variant="dark" iconLeft="export" iconRight="export" {...s}>
                Export
              </Button>
            )}
          />
        </div>
      </section>

      <section>
        <p style={caption}>Size=big · Static / Hover / Disabled</p>
        <div style={grid}>
          <Row render={(s) => <Button variant="dark" size="big" {...s}>Make a discount</Button>} />
          <Row render={(s) => <Button variant="light" size="big" {...s}>Make a discount</Button>} />
          <Row render={(s) => <Button variant="danger" size="big" {...s}>Delete</Button>} />
        </div>
      </section>

      <section>
        <p style={caption}>Text buttons · Static / Hover / Disabled</p>
        <div style={grid}>
          <Row render={(s) => <Button variant="text-arrow" {...s}>See all</Button>} />
          <Row render={(s) => <Button variant="text-checkmarks" {...s}>Mark all as read</Button>} />
        </div>
      </section>
    </div>
  ),
};

/** Figma "Dark Atoms Components" → button_actio_dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const AllVariantsDark: Story = {
  ...AllVariants,
  name: 'All Variants × States (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16 }}>
        <Story />
      </div>
    ),
  ],
};
