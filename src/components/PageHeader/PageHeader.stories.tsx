import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HeaderMenu, HeaderMenuItem } from '../HeaderMenu';
import { PageHeader } from './PageHeader';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=29-18673';

const MENU = (
  <HeaderMenu>
    <HeaderMenuItem icon="bell" label="Notifications" dot="warning" />
  </HeaderMenu>
);

const CRUMBS = { items: [{ label: 'Clients' }, { label: 'All' }, { label: 'All' }, { label: 'All' }, { label: 'All' }] };

const TABS = {
  items: [
    { id: 'all', label: 'All clients' },
    { id: 'pending', label: 'Pending (8)' },
  ],
  value: 'all',
};

const meta = {
  title: 'Molecules/PageHeader',
  component: PageHeader,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { title: 'Clients', menu: MENU },
  argTypes: {
    title: { control: 'text' },
    menu: { control: false },
    breadcrumbs: { control: 'object' },
    tabs: { control: 'object' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1556 }}><Story /></div>],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Header=Default) ─────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Tabs: Story = { args: { tabs: TABS } };
export const BreadCrumbsOnly: Story = { name: 'Bread Crumbs', args: { breadcrumbs: CRUMBS } };
export const BreadCrumbsAndTabs: Story = { name: 'Bread Crumbs & Tabs', args: { breadcrumbs: CRUMBS, tabs: TABS } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const WithoutMenu: Story = { name: 'Without menu', args: { menu: undefined } };
export const LongTitle: Story = {
  name: 'Long title',
  args: { title: 'Clients with unpaid invoices from the previous quarter and active shipping contracts in all regions' },
};
export const ManyTabs: Story = {
  name: 'Many tabs (scrolls)',
  args: {
    tabs: {
      items: Array.from({ length: 12 }, (_, i) => ({ id: `t${i}`, label: `Status ${i + 1} (${i * 3})` })),
      value: 't0',
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
};
export const Narrow: Story = {
  args: { breadcrumbs: CRUMBS, tabs: TABS },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState('all');
    return <PageHeader {...args} tabs={{ ...TABS, value, onChange: setValue }} />;
  },
};

export const WithMenuButton: Story = {
  name: 'With menu button',
  args: { breadcrumbs: CRUMBS, tabs: TABS, onMenuClick: () => undefined },
  parameters: { docs: { description: { story: 'Figma header at 1280px and below: the side menu is hidden, the burger (`burger-rolled-up`, 24px) sits before the title.' } } },
};
export const BackBreadcrumbs: Story = {
  name: 'Back breadcrumbs',
  args: {
    title: 'Mickey Herman',
    breadcrumbs: { variant: 'back', items: [{ label: 'Clients', href: '#' }, { label: 'All clients', href: '#' }, { label: 'Mickey Herman' }] },
    tabs: TABS,
    onMenuClick: () => undefined,
  },
  decorators: [(Story) => <div style={{ maxWidth: 736 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Figma header at 768px and below: only the current page after a back chevron; it goes to the previous crumb.' } } },
};

export const Compact: Story = {
  name: 'Compact (480 / 360px)',
  args: {
    title: 'Management',
    size: 'compact',
    breadcrumbs: { variant: 'back', items: [{ label: 'Management', href: '#' }, { label: 'Management' }] },
    onMenuClick: () => undefined,
  },
  decorators: [(Story) => <div style={{ maxWidth: 448 }}><Story /></div>],
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3739-305804' }, docs: { description: { story: 'Figma header at 480px and below: the title is Light Headings/h5 (20 / 30px).' } } },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      <PageHeader title="Clients" menu={MENU} />
      <PageHeader title="Clients" menu={MENU} tabs={TABS} />
      <PageHeader title="Clients" menu={MENU} breadcrumbs={CRUMBS} />
      <PageHeader title="Clients" menu={MENU} breadcrumbs={CRUMBS} tabs={TABS} />
    </div>
  ),
};

/** Figma "Dark Molecules Components" → Header Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const AllVariantsDark: Story = {
  ...AllVariants,
  name: 'All variants (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content', minWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
