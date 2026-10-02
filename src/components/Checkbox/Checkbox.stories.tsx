import type { Meta, StoryObj } from '@storybook/react';
import { useState, type CSSProperties } from 'react';
import { Checkbox, type CheckboxSize, type CheckboxType } from './Checkbox';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=32-45267';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'canvas' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['checkbox', 'radio'],
      description: 'Figma `Type` property',
      table: { defaultValue: { summary: 'checkbox' } },
    },
    size: {
      control: 'radio',
      options: [24, 16],
      description: 'Figma `Size` property',
      table: { defaultValue: { summary: '24' } },
    },
    checked: { control: 'boolean', description: 'Figma `Status=Chosen`' },
    disabled: { control: 'boolean', description: 'Figma `Status=… Disabled`' },
    forceHover: { control: 'boolean', description: 'Figma `Status=… Hover` (preview only)' },
    children: { control: 'text', description: 'Optional label (not in the Figma atom)' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: { type: 'checkbox', size: 24, defaultChecked: true, 'aria-label': 'Select row' },
};

// ─── VARIANTS (Figma Type × Size) ────────────────────────────────────────────
export const Checkbox24: Story = {
  name: 'Checkbox 24px',
  args: { type: 'checkbox', size: 24, defaultChecked: true, 'aria-label': 'Select row' },
};

export const Checkbox16: Story = {
  name: 'Checkbox 16px',
  args: { type: 'checkbox', size: 16, defaultChecked: true, 'aria-label': 'Select row' },
};

export const Radiobutton24: Story = {
  name: 'Radiobutton 24px',
  args: { type: 'radio', size: 24, defaultChecked: true, 'aria-label': 'Option' },
};

export const Radiobutton16: Story = {
  name: 'Radiobutton 16px',
  args: { type: 'radio', size: 16, defaultChecked: true, 'aria-label': 'Option' },
};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Unchosen: Story = {
  args: { type: 'checkbox', checked: false, readOnly: true, 'aria-label': 'Select row' },
};

export const ChosenHover: Story = {
  args: { type: 'checkbox', checked: true, readOnly: true, forceHover: true, 'aria-label': 'Select row' },
};

export const UnchosenHover: Story = {
  args: { type: 'checkbox', checked: false, readOnly: true, forceHover: true, 'aria-label': 'Select row' },
};

export const ChosenDisabled: Story = {
  args: { type: 'checkbox', checked: true, readOnly: true, disabled: true, 'aria-label': 'Select row' },
};

export const UnchosenDisabled: Story = {
  args: { type: 'checkbox', checked: false, readOnly: true, disabled: true, 'aria-label': 'Select row' },
};

export const Focused: Story = {
  args: { type: 'checkbox', defaultChecked: true, autoFocus: true, 'aria-label': 'Select row' },
  parameters: { docs: { description: { story: 'Keyboard focus ring. Not designed in Figma — AI-defined.' } } },
};

// ─── WITH LABEL / EDGE CASES ─────────────────────────────────────────────────
export const WithLabel: Story = {
  args: { type: 'checkbox', defaultChecked: true, children: 'Show archived orders' },
  parameters: { docs: { description: { story: 'Label is not part of the Figma atom — 8px gap and Body/Small Regular are AI-defined.' } } },
};

export const LongLabel: Story = {
  args: {
    type: 'checkbox',
    size: 16,
    children: 'Send a copy of every invoice to the accounting department and to the warehouse manager',
  },
  decorators: [(S) => <div style={{ width: 280 }}><S /></div>],
};

// ─── STATE MATRIX (mirrors the Figma frame `Checkbox`) ───────────────────────
const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'max-content repeat(4, 88px)',
  gap: '16px 8px',
  alignItems: 'center',
  justifyItems: 'center',
};
const caption: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 12,
  color: 'var(--color-grey-dark)',
};

const columns: { type: CheckboxType; size: CheckboxSize; label: string }[] = [
  { type: 'checkbox', size: 24, label: 'Checkbox 24' },
  { type: 'radio', size: 24, label: 'Radio 24' },
  { type: 'checkbox', size: 16, label: 'Checkbox 16' },
  { type: 'radio', size: 16, label: 'Radio 16' },
];

const statuses = [
  { label: 'Chosen', checked: true },
  { label: 'Chosen Hover', checked: true, forceHover: true },
  { label: 'Chosen Disabled', checked: true, disabled: true },
  { label: 'Unchosen', checked: false },
  { label: 'Unchosen Hover', checked: false, forceHover: true },
  { label: 'Unchosen Disabled', checked: false, disabled: true },
];

export const AllVariants: Story = {
  name: 'All Types × Sizes × States',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={grid}>
      <span />
      {columns.map((c) => (
        <span key={c.label} style={caption}>{c.label}</span>
      ))}
      {statuses.map(({ label, ...s }) => (
        <div key={label} style={{ display: 'contents' }}>
          <span style={{ ...caption, justifySelf: 'start' }}>{label}</span>
          {columns.map((c) => (
            <Checkbox key={c.label} type={c.type} size={c.size} readOnly aria-label={label} {...s} />
          ))}
        </div>
      ))}
    </div>
  ),
};

// ─── IN CONTEXT ──────────────────────────────────────────────────────────────
function GroupDemo() {
  const [delivery, setDelivery] = useState('courier');
  const [flags, setFlags] = useState({ sms: true, email: false });
  return (
    <div style={{ display: 'flex', gap: 48 }}>
      <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'grid', gap: 12 }}>
        <legend style={{ ...caption, marginBottom: 12 }}>Delivery (radio)</legend>
        {['courier', 'pickup', 'post'].map((v) => (
          <Checkbox key={v} type="radio" name="delivery" value={v} checked={delivery === v} onChange={() => setDelivery(v)}>
            {v[0].toUpperCase() + v.slice(1)}
          </Checkbox>
        ))}
        <Checkbox type="radio" name="delivery" disabled>
          Drone
        </Checkbox>
      </fieldset>
      <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'grid', gap: 12, alignContent: 'start' }}>
        <legend style={{ ...caption, marginBottom: 12 }}>Notify (checkbox)</legend>
        <Checkbox checked={flags.sms} onChange={(e) => setFlags({ ...flags, sms: e.target.checked })}>SMS</Checkbox>
        <Checkbox checked={flags.email} onChange={(e) => setFlags({ ...flags, email: e.target.checked })}>Email</Checkbox>
      </fieldset>
    </div>
  );
}

export const GroupExample: Story = {
  name: 'Example: Groups',
  render: () => <GroupDemo />,
  parameters: { docs: { description: { story: 'Interactive. Spacing between options is AI-defined.' } } },
};
