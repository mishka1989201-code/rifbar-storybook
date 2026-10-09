import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { NoRowsTable, type NoRowsTableSize } from './NoRowsTable';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=4319-33338';

const SIZES: NoRowsTableSize[] = ['desktop', 'phone-large', 'phone-small'];

/** Draws the page background of the theme, so the card is seen where it lives. */
function Surface({ theme, children }: { theme: 'light' | 'dark'; children: ReactNode }) {
  return (
    <div
      data-theme={theme}
      style={{ padding: 'var(--spacing-16)', background: theme === 'dark' ? 'var(--color-primary-blue-dark-dark)' : 'var(--color-bg)' }}
    >
      {children}
    </div>
  );
}

const meta = {
  title: 'Atoms/NoRowsTable',
  component: NoRowsTable,
  parameters: { layout: 'centered', design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: SIZES,
      description: 'Figma `Property 1`: desktop 495×328, phone-large 384×254, phone-small 300×198',
      table: { defaultValue: { summary: 'desktop' } },
    },
    label: { control: 'text', description: 'Text over the chart (Figma: “Table has no rows”)' },
  },
  args: { size: 'desktop' },
} satisfies Meta<typeof NoRowsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Property 1=desktop, theme=light) ────────────────────────
export const Default: Story = {};

// ─── SIZES (Figma Property 1) ────────────────────────────────────────────────
export const PhoneLarge: Story = { name: 'Phone large', args: { size: 'phone-large' } };
export const PhoneSmall: Story = { name: 'Phone small', args: { size: 'phone-small' } };

// ─── THEME (Figma theme=dark) ────────────────────────────────────────────────
export const Dark: Story = {
  render: (args) => (
    <Surface theme="dark">
      <NoRowsTable {...args} />
    </Surface>
  ),
  parameters: { docs: { description: { story: 'Figma `theme=dark`. Follows `data-theme`; the Storybook theme switch does the same.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const CustomLabel: Story = {
  name: 'Custom label',
  args: { label: 'No orders yet' },
  parameters: { docs: { description: { story: 'AI-defined: Figma draws only “Table has no rows”. The text keeps its size relative to the card, so a long label overflows it.' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  args: { size: 'desktop' },
  parameters: { docs: { description: { story: 'In a container narrower than the card it shrinks proportionally (`max-width: 100%`, fixed aspect ratio).' } } },
  render: (args) => (
    <div style={{ width: 240 }}>
      <NoRowsTable {...args} />
    </div>
  ),
};

// ─── ALL VARIANTS (mirrors the Figma frame: 3 sizes × light / dark) ──────────
export const AllVariants: Story = {
  name: 'All variants',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-24)', alignItems: 'flex-start' }}>
      {(['light', 'dark'] as const).map((theme) => (
        <Surface key={theme} theme={theme}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
            {SIZES.map((size) => (
              <NoRowsTable key={size} size={size} />
            ))}
          </div>
        </Surface>
      ))}
    </div>
  ),
};
