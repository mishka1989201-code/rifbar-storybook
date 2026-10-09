import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tab } from './Tab';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=13-13502';

const meta = {
  title: 'Atoms/Tabs',
  component: Tab,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    active: { control: 'boolean', description: 'Figma `Tab #=Active`' },
    disabled: { control: 'boolean', description: 'Figma `Tab #=Disabled`' },
    forceHover: { control: 'boolean', description: 'Hover look (preview only, not in Figma)' },
    children: { control: 'text', description: 'Tab label' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = { args: { active: true, children: 'Tab 1' } };

// ─── VARIANTS (Figma Tab #) ──────────────────────────────────────────────────
export const Active: Story = { args: { active: true, children: 'Tab 1' } };

export const NotActive: Story = { name: 'Not Active', args: { active: false, children: 'Tab 2' } };

export const Disabled: Story = { args: { disabled: true, children: 'Tab 2' } };

// ─── STATES (not designed in Figma) ──────────────────────────────────────────
export const Hover: Story = {
  args: { forceHover: true, children: 'Tab 2' },
  parameters: { docs: { description: { story: 'AI-defined: Headlines text, no underline.' } } },
};

export const Focused: Story = {
  args: { autoFocus: true, children: 'Tab 2' },
  parameters: { docs: { description: { story: 'Keyboard focus ring. AI-defined, same as Button.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongLabel: Story = {
  name: 'Long label',
  args: { active: true, children: 'Contracts and signed documents (24)' },
  parameters: { docs: { description: { story: 'The label never wraps; the tab grows with its text.' } } },
};

// ─── IN CONTEXT: a tab bar ───────────────────────────────────────────────────
const TABS = ['General', 'Contacts', 'Orders (12)', 'Archive'];

function TabBarDemo() {
  const [current, setCurrent] = useState(0);
  return (
    <div role="tablist" aria-label="Client" style={{ display: 'flex' }}>
      {TABS.map((label, i) => (
        <Tab key={label} active={i === current} disabled={label === 'Archive'} onClick={() => setCurrent(i)}>
          {label}
        </Tab>
      ))}
    </div>
  );
}

export const TabBarExample: Story = {
  name: 'Example: Tab bar',
  args: { children: '' },
  render: () => <TabBarDemo />,
  parameters: {
    docs: { description: { story: 'Interactive. Tabs sit next to each other with no gap (AI-defined: the tab padding already separates them). “Archive” is disabled.' } },
  },
};

/** Figma "Dark Atoms Components" → Tab 1 - Active. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const DarkTheme: Story = {
  args: { children: 'Tab' },
  name: 'Active, Not Active, Disabled (dark theme)',
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex' }}>
      <Tab active>Tab 1</Tab>
      <Tab>Tab 2</Tab>
      <Tab disabled>Tab 3</Tab>
    </div>
  ),
};
