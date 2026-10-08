import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MessageBox } from './MessageBox';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=139-41662';

const meta = {
  title: 'Molecules/MessageBox',
  component: MessageBox,
  parameters: { layout: 'padded', backgrounds: { default: 'light' }, design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    forceFocus: { control: 'boolean', description: 'Preview only: Figma Focus' },
    forceHover: { control: 'boolean', description: 'Preview only: Figma Focus & Hover (send arrow)' },
    onChange: { action: 'changed' },
    onSend: { action: 'sent' },
  },
  // Figma frame is 893px wide.
  decorators: [(Story) => <div style={{ maxWidth: 893 }}><Story /></div>],
} satisfies Meta<typeof MessageBox>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Static) ─────────────────────────────────────────────────
export const Default: Story = {};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Focus: Story = {
  args: { forceFocus: true, defaultValue: 'Corem ipsum dolor sit amet, consectetur adipiscing elit.' },
};

export const FocusAndHover: Story = {
  name: 'Focus & Hover',
  args: { forceFocus: true, forceHover: true, defaultValue: 'Corem ipsum dolor sit amet, consectetur adipiscing elit.' },
};

export const Disabled: Story = { args: { disabled: true } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  name: 'Long text',
  args: { defaultValue: 'Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis, sed ultricies nisl.' },
  parameters: { docs: { description: { story: 'One-line field: long text scrolls inside the input, the arrow stays in place.' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  args: { defaultValue: 'Corem ipsum dolor sit amet' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('');
    const [sent, setSent] = useState<string[]>([]);
    return (
      <div>
        <ul aria-live="polite" style={{ minHeight: 48 }}>
          {sent.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
        <MessageBox
          {...args}
          value={value}
          onChange={setValue}
          onSend={(text) => {
            setSent((s) => [...s, text]);
            setValue('');
            args.onSend?.(text);
          }}
        />
      </div>
    );
  },
  parameters: { docs: { description: { story: 'Type and press Enter or click the arrow: the text is sent and the field is cleared. Empty text is not sent.' } } },
};

// ─── ALL VARIANTS (Figma frame: Static, Focus, Disabled, Focus & Hover) ──────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      <MessageBox />
      <MessageBox forceFocus defaultValue="Corem ipsum dolor sit amet, consectetur adipiscing elit." />
      <MessageBox disabled />
      <MessageBox forceFocus forceHover defaultValue="Corem ipsum dolor sit amet, consectetur adipiscing elit." />
    </div>
  ),
};
