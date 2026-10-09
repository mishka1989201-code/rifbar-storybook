import type { Meta, StoryObj } from '@storybook/react';
import { CardStrokeRow } from './CardStrokeRow';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=68-24983';

const meta = {
  title: 'Molecules/CardStrokeRow',
  component: CardStrokeRow,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { label: 'Colors:', value: '8' },
  argTypes: { label: { control: 'text' }, value: { control: 'text' } },
  decorators: [(Story) => <div style={{ maxWidth: 298 }}><Story /></div>],
} satisfies Meta<typeof CardStrokeRow>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const InList: Story = {
  name: 'In a list',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
      <CardStrokeRow label="Colors:" value="8" />
      <CardStrokeRow label="Sizes:" value="S, M, L" />
      <CardStrokeRow label="In stock:" value="1 240" />
    </div>
  ),
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongLabel: Story = {
  name: 'Long label',
  args: { label: 'Available colors in the main warehouse and showroom' },
};

export const LongValue: Story = {
  name: 'Long value',
  args: { value: 'Black, white, navy, green, red, beige' },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 160 }}><Story /></div>],
};

/** Figma "Dark Molecules Components" → Card Stroke Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const DefaultDark: Story = {
  ...Default,
  name: 'Default (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content', minWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
