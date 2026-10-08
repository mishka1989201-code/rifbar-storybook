import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NavbarMenu, type NavbarMenuItem } from './NavbarMenu';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=48-12836';

/** The 10 tabs of the Figma frame. Icons are matched by look (Figma icons are unnamed vectors). */
const ITEMS: NavbarMenuItem[] = [
  { id: 'clients', label: 'Clients', icon: 'user' },
  { id: 'shop', label: 'Online Shop', icon: 'cart' },
  { id: 'contact', label: 'Contact Us', icon: 'call' },
  { id: 'orders', label: 'Orders', icon: 'order' },
  { id: 'reports', label: 'Reports & Analytics', icon: 'graph', expandable: true },
  { id: 'products', label: 'Product Settings', icon: 'product-box', expandable: true },
  { id: 'tickets', label: 'Tickets', icon: 'ticket', secondary: true },
  { id: 'notes', label: 'All notes', icon: 'notes', secondary: true },
  { id: 'emails', label: 'Emails', icon: 'email', secondary: true },
  { id: 'groups', label: 'Groups', icon: 'groups', secondary: true },
];

const meta = {
  title: 'Molecules/NavbarMenu',
  component: NavbarMenu,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    items: { control: 'object', description: 'Tabs: `{ id, label, icon, expandable?, expanded?, secondary?, disabled? }`' },
    value: { control: 'text', description: 'Id of the active tab' },
    size: { control: 'inline-radio', options: ['desktop', '768', '480', '360'] },
    collapsed: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
  args: { items: ITEMS, value: 'clients', size: 'desktop', collapsed: false },
  // The menu is drawn for the dark Navbar surface.
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--theme-app-bg)', padding: 'var(--spacing-16) 0', width: 'fit-content' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavbarMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Style=On, Size=Desktop) ─────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Collapsed: Story = {
  name: 'Collapsed (Figma Style=Icons)',
  args: { collapsed: true },
};

export const Size768: Story = { name: 'Size 768px', args: { size: '768' } };
export const Size480: Story = { name: 'Size 480px', args: { size: '480' } };
export const Size360: Story = { name: 'Size 360px', args: { size: '360' } };

// ─── STATES ──────────────────────────────────────────────────────────────────
export const MiddleTabActive: Story = { name: 'Middle tab active', args: { value: 'orders' } };

export const ExpandedItem: Story = {
  name: 'Expanded item',
  args: { items: ITEMS.map((i) => (i.id === 'reports' ? { ...i, expanded: true } : i)) },
  parameters: { docs: { description: { story: 'Chevron up is AI-defined — Figma only draws the closed state.' } } },
};

export const WithDisabledTab: Story = {
  name: 'With disabled tab',
  args: { items: ITEMS.map((i) => (i.id === 'groups' ? { ...i, disabled: true } : i)) },
};

export const Hover: Story = {
  parameters: { docs: { description: { story: 'Hover any inactive tab: the label turns Hover Blue Light (AI-defined).' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const FewItems: Story = { name: 'Few items', args: { items: ITEMS.slice(0, 3) } };

export const Empty: Story = { args: { items: [], value: undefined } };

export const LongLabel: Story = {
  name: 'Long label',
  args: {
    items: ITEMS.map((i) =>
      i.id === 'reports' ? { ...i, label: 'Reports & Analytics for all warehouses and clients' } : i,
    ),
  },
  parameters: { docs: { description: { story: 'A long label is cut with an ellipsis; the chevron stays visible.' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [
    (Story) => (
      <div style={{ width: 200 }}>
        <Story />
      </div>
    ),
  ],
  parameters: { docs: { description: { story: 'The menu never exceeds its container (`max-width: 100%`); labels are cut.' } } },
};

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    const [open, setOpen] = useState<string | undefined>();
    const items = args.items.map((i) => (i.expandable ? { ...i, expanded: open === i.id } : i));
    return (
      <NavbarMenu
        {...args}
        items={items}
        value={value}
        onChange={(id) => {
          setValue(id);
          if (items.find((i) => i.id === id)?.expandable) setOpen((o) => (o === id ? undefined : id));
          args.onChange?.(id);
        }}
      />
    );
  },
  parameters: { docs: { description: { story: 'Click a tab to make it active; expandable tabs toggle their chevron.' } } },
};

// ─── ALL VARIANTS (Figma frame: Desktop, Icons, 360, 480, 768) ───────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-32)', flexWrap: 'wrap' }}>
      <NavbarMenu {...args} size="desktop" aria-label="Desktop" />
      <NavbarMenu {...args} collapsed aria-label="Icons" />
      <NavbarMenu {...args} size="360" aria-label="360px" />
      <NavbarMenu {...args} size="480" aria-label="480px" />
      <NavbarMenu {...args} size="768" aria-label="768px" />
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--theme-app-bg)', padding: 'var(--spacing-16) 0' }}>
        <Story />
      </div>
    ),
  ],
};
