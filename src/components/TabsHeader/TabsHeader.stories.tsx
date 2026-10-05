import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TabsHeader, type TabsHeaderItem } from './TabsHeader';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=13-13595';

const SEVEN: TabsHeaderItem[] = Array.from({ length: 7 }, (_, i) => ({
  id: `tab-${i + 1}`,
  label: `Tab ${i + 1}`,
}));

const meta = {
  title: 'Molecules/TabsHeader',
  component: TabsHeader,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'light' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    items: { control: 'object', description: 'Tabs: `{ id, label, disabled? }`' },
    value: { control: 'text', description: 'Id of the active tab' },
    onChange: { action: 'changed' },
  },
  args: { items: SEVEN, value: 'tab-1' },
  // Controlled wrapper so tabs switch in Storybook.
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return (
      <div style={{ maxWidth: 1202 }}>
        <TabsHeader
          {...args}
          value={value}
          onChange={(id) => {
            setValue(id);
            args.onChange?.(id);
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof TabsHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: 7 tabs, first active) ───────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const MiddleTabActive: Story = { name: 'Middle tab active', args: { value: 'tab-4' } };

export const WithDisabledTab: Story = {
  name: 'With disabled tab',
  args: {
    items: SEVEN.map((t) => (t.id === 'tab-7' ? { ...t, disabled: true } : t)),
  },
  parameters: { docs: { description: { story: 'Disabled tab uses the Tab atom’s disabled look (20% opacity).' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const TwoTabs: Story = {
  name: 'Two tabs',
  args: { items: SEVEN.slice(0, 2) },
};

export const LongLabels: Story = {
  name: 'Long labels',
  args: {
    items: [
      { id: 'a', label: 'Contracts and signed documents (24)' },
      { id: 'b', label: 'Payment history' },
      { id: 'c', label: 'Delivery addresses' },
    ],
    value: 'a',
  },
};

export const Overflow: Story = {
  name: 'Overflow (narrow container)',
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <TabsHeader {...args} />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'AI-defined: when tabs do not fit, the bar scrolls horizontally; tabs never wrap or shrink.' } },
  },
};
