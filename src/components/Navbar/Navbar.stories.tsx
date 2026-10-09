import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Navbar } from './Navbar';
import type { NavbarMenuItem } from '../NavbarMenu';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=48-13204';

/** The tabs of Figma `Navbar/Full` at 1920px. Icons are matched by look (Figma icons are unnamed vectors). */
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

const ADMIN_ITEM: NavbarMenuItem = {
  id: 'admin',
  label: 'Admin',
  icon: 'admin',
  expandable: true,
  expanded: true,
  children: [
    { id: 'admins', label: 'Admins & Users' },
    { id: 'agents', label: 'Sale Agents' },
    { id: 'roles', label: 'Roles' },
    { id: 'departments', label: 'Departments' },
  ],
};

const REPORT_CHILDREN = [
  { id: 'warehouse', label: 'Warehouse / POS' },
  { id: 'legal', label: 'Legal' },
  { id: 'finance', label: 'Finance' },
];

const PRODUCT_CHILDREN = ['Flavors', 'Colors', 'Images', 'Puffs', 'Capacity', 'Nicotines', 'Types'].map((label) => ({
  id: label.toLowerCase(),
  label,
}));

/** Figma 1440px / 1280px / 1024px: the Admin group and the open Reports group are drawn. */
const WITH_GROUPS: NavbarMenuItem[] = [
  ADMIN_ITEM,
  ...ITEMS.map((i) => (i.id === 'reports' ? { ...i, expanded: true, children: REPORT_CHILDREN } : i)),
];

/** Figma dark frame: Product Settings is open. */
const PRODUCTS_OPEN: NavbarMenuItem[] = ITEMS.map((i) =>
  i.id === 'products' ? { ...i, expanded: true, children: PRODUCT_CHILDREN } : i,
);

const USER = { name: 'Jennifer Corbett' };

const meta = {
  title: 'Organisms/Navbar',
  component: Navbar,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    items: { control: 'object', description: 'Tabs: see `NavbarMenu`. Groups use `expanded` and `children`.' },
    value: { control: 'text', description: 'Id of the active tab or sub-tab' },
    size: { control: 'select', options: ['1920', '1440', '1280', '1024', '768', '480', '360'] },
    collapsed: { control: 'boolean' },
    user: { control: 'object' },
    userOpen: { control: 'boolean' },
    onChange: { action: 'changed' },
    onMenuClick: { action: 'menu' },
    onUserClick: { action: 'user' },
  },
  args: { items: ITEMS, value: 'clients', size: '1920', collapsed: false, user: USER },
  decorators: [
    (Story) => (
      // Figma frames are 1000px high.
      <div style={{ height: 1000, display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Style=On, Size=1920px, Theme=Light) ─────────────────────
export const Default: Story = {};

// ─── SIZES ───────────────────────────────────────────────────────────────────
export const Collapsed: Story = {
  name: 'Collapsed (Figma Style=Off, 1920px)',
  args: { collapsed: true },
};

export const Size1440: Story = { name: 'Size 1440px', args: { size: '1440', items: WITH_GROUPS } };

export const Size1440Collapsed: Story = {
  name: 'Size 1440px collapsed',
  args: { size: '1440', collapsed: true, items: WITH_GROUPS },
};

export const Size1280: Story = { name: 'Size 1280px', args: { size: '1280', items: WITH_GROUPS } };
export const Size1024: Story = { name: 'Size 1024px', args: { size: '1024', items: WITH_GROUPS } };
export const Size768: Story = { name: 'Size 768px', args: { size: '768' } };
export const Size480: Story = { name: 'Size 480px', args: { size: '480' } };
export const Size360: Story = { name: 'Size 360px', args: { size: '360' } };

// ─── THEME ───────────────────────────────────────────────────────────────────
export const Dark: Story = {
  name: 'Dark (Figma Theme=Dark)',
  args: { items: PRODUCTS_OPEN },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ height: 1000, display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
  parameters: { docs: { description: { story: 'Dark colors come from the `--theme-nav-*` tokens. Switch the toolbar theme to see the whole page dark.' } } },
};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const GroupExpanded: Story = {
  name: 'Group expanded',
  args: { items: PRODUCTS_OPEN, value: 'flavors' },
  parameters: { docs: { description: { story: 'Sub-tabs show while a group is `expanded`. The active sub-tab is AI-defined: Hover Blue Light, Medium.' } } },
};

export const UserMenuOpen: Story = {
  name: 'User menu open',
  args: { userOpen: true },
  parameters: { docs: { description: { story: 'Chevron up is AI-defined — Figma only draws the closed state.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const NoUser: Story = { name: 'No user', args: { user: undefined } };

export const FewItems: Story = { name: 'Few items', args: { items: ITEMS.slice(0, 3) } };

export const LongContent: Story = {
  name: 'Long content',
  args: {
    items: ITEMS.map((i) => (i.id === 'reports' ? { ...i, label: 'Reports & Analytics for all warehouses and clients' } : i)),
    user: { name: 'Jennifer Alexandra Corbett-Hargreaves' },
  },
  parameters: { docs: { description: { story: 'Long tab labels and user names are cut with an ellipsis; the chevron stays visible.' } } },
};

export const ShortScreen: Story = {
  name: 'Short screen',
  decorators: [
    (Story) => (
      <div style={{ height: 480, display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
  parameters: { docs: { description: { story: 'On a short screen the menu keeps its height: the user block sits below the tabs instead of overlapping them.' } } },
};

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState<string | undefined>('products');
    const items = PRODUCTS_OPEN.map((i) => (i.expandable ? { ...i, expanded: open === i.id } : i));
    return (
      <Navbar
        {...args}
        items={items}
        value={value}
        collapsed={collapsed}
        onMenuClick={() => setCollapsed((c) => !c)}
        onChange={(id) => {
          setValue(id);
          if (items.find((i) => i.id === id)?.expandable) setOpen((o) => (o === id ? undefined : id));
          args.onChange?.(id);
        }}
      />
    );
  },
  parameters: { docs: { description: { story: 'The burger collapses the menu, tabs switch the active page, groups open and close.' } } },
};

// ─── ALL VARIANTS (Figma frame: 11 variants) ─────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-32)', flexWrap: 'wrap', height: 'auto' }}>
      {([
        ['1920', false, ITEMS],
        ['1920', true, ITEMS],
        ['1440', false, WITH_GROUPS],
        ['1440', true, WITH_GROUPS],
        ['1280', false, WITH_GROUPS],
        ['1024', false, WITH_GROUPS],
        ['768', false, ITEMS],
        ['480', false, ITEMS],
        ['360', false, ITEMS],
      ] as const).map(([size, collapsed, items]) => (
        <div key={`${size}-${collapsed}`} style={{ height: 1000, display: 'flex' }}>
          <Navbar {...args} size={size} collapsed={collapsed} items={[...items]} aria-label={`${size}${collapsed ? ' collapsed' : ''}`} />
        </div>
      ))}
      <div data-theme="dark" style={{ height: 1000, display: 'flex' }}>
        <Navbar {...args} items={PRODUCTS_OPEN} aria-label="Dark" />
      </div>
    </div>
  ),
};
