import type { Meta, StoryObj } from '@storybook/react';
import { useState, type CSSProperties, type ReactNode } from 'react';
import { Switcher, type SwitcherTheme } from './Switcher';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=3366-257630';

/** Draws the Navbar background of the given theme, so the Switcher is seen where it lives. */
function NavbarSurface({ theme, children }: { theme: SwitcherTheme; children: ReactNode }) {
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
  title: 'Atoms/Switcher',
  component: Switcher,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Figma `Property 1` (Light / Dark)',
      table: { defaultValue: { summary: 'light' } },
    },
    onThemeChange: { action: 'themeChange' },
  },
  decorators: [
    (Story, ctx) =>
      ctx.parameters.noSurface ? (
        Story()
      ) : (
        <NavbarSurface theme={(ctx.args.theme as SwitcherTheme) ?? 'light'}>{Story()}</NavbarSurface>
      ),
  ],
} satisfies Meta<typeof Switcher>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = { args: { theme: 'light' } };

// ─── VARIANTS (Figma Property 1) ─────────────────────────────────────────────
export const Light: Story = { args: { theme: 'light' } };

export const Dark: Story = { args: { theme: 'dark' } };

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Focused: Story = {
  args: { theme: 'light', autoFocus: true },
  parameters: { docs: { description: { story: 'Keyboard focus ring. Not designed in Figma — AI-defined.' } } },
};

// ─── IN CONTEXT: switches the theme of its surface ───────────────────────────
function ThemeDemo() {
  const [theme, setTheme] = useState<SwitcherTheme>('light');
  return (
    <div
      data-theme={theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        borderRadius: 8,
        background: 'var(--theme-app-bg)',
        color: 'var(--theme-nav-text-active)',
        fontFamily: 'var(--font-family-base)',
        fontSize: 14,
      }}
    >
      <Switcher theme={theme} onThemeChange={setTheme} />
      <span>{theme === 'light' ? 'Light theme' : 'Dark theme'}</span>
    </div>
  );
}

export const ThemeExample: Story = {
  name: 'Example: Theme switch',
  render: () => <ThemeDemo />,
  parameters: {
    noSurface: true,
    docs: { description: { story: 'Interactive. Click to switch the theme of the surface (sets `data-theme`). Gap 12px is AI-defined.' } },
  },
};
