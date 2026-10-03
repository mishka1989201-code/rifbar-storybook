import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ReactNode } from 'react';
import { Logo } from './Logo';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=1029-249366';

/** Draws the Navbar background, so the inverse logo is seen where it lives. */
function NavbarSurface({ theme = 'light', children }: { theme?: 'light' | 'dark'; children: ReactNode }) {
  const style: CSSProperties = {
    display: 'inline-flex',
    padding: 16,
    borderRadius: 8,
    background: 'var(--theme-app-bg)',
  };
  return (
    <div data-theme={theme} style={style}>
      {children}
    </div>
  );
}

const meta = {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['lg', 'md'],
      description: '`lg` 184×46 (≥ 1920px), `md` 165×40 (1440–1920px)',
      table: { defaultValue: { summary: 'lg' } },
    },
    tone: {
      control: 'inline-radio',
      options: ['default', 'inverse'],
      description: '`default` Primary Blue Dark (Figma), `inverse` for dark surfaces (AI-defined)',
      table: { defaultValue: { summary: 'default' } },
    },
    title: { control: 'text', description: 'Accessible name. Empty string hides the logo from screen readers.' },
  },
  decorators: [
    (Story, ctx) =>
      ctx.args.tone === 'inverse' && !ctx.parameters.noSurface ? <NavbarSurface>{Story()}</NavbarSurface> : Story(),
  ],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = { args: { size: 'lg', tone: 'default' } };

// ─── SIZES (--size-logo-* tokens) ────────────────────────────────────────────
export const Large: Story = {
  name: 'Size: lg (184×46)',
  args: { size: 'lg' },
  parameters: { docs: { description: { story: 'Figma size of V2 - Approved. Screens ≥ 1920px.' } } },
};

export const Medium: Story = {
  name: 'Size: md (165×40)',
  args: { size: 'md' },
  parameters: {
    docs: {
      description: {
        story: 'Screens 1440–1920px. The box is 165×40 (Figma Grids); the logo keeps its ratio, so it draws at 160×40 centered.',
      },
    },
  },
};

// ─── TONES ───────────────────────────────────────────────────────────────────
export const Inverse: Story = {
  name: 'Tone: inverse (on Navbar)',
  args: { tone: 'inverse' },
  parameters: { docs: { description: { story: 'AI-defined. On the dark Navbar background (`--theme-app-bg`).' } } },
};

export const InverseDarkTheme: Story = {
  name: 'Tone: inverse, dark theme',
  args: { tone: 'inverse' },
  render: (args) => (
    <NavbarSurface theme="dark">
      <Logo {...args} />
    </NavbarSurface>
  ),
  parameters: { noSurface: true, docs: { description: { story: 'In the dark theme the logo follows White (Light).' } } },
};
