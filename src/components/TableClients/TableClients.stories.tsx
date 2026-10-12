import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AudioPlayer } from '../AudioPlayer';
import { CallMenu } from '../CallMenu';
import { ChevronStatus } from '../ChevronStatus';
import { TableClients, type TableClientsItem } from './TableClients';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=93-34229';

const MICKEY: TableClientsItem = {
  id: 1,
  name: 'Mickey Herman',
  nameHref: '#',
  company: "Sam's Club",
  phone: '+44 32 567 8473',
  email: 'mickeyherman23@gmail.com',
  joined: '07.23.2023',
  updated: '07.23.2023',
};

const MORE_ROWS: TableClientsItem[] = [
  MICKEY,
  { ...MICKEY, id: 2, name: 'Rachel Green', company: 'Central Perk', phone: '+44 32 567 1120', email: 'rachel.green@example.com' },
  { ...MICKEY, id: 3, name: 'Ross Geller', company: 'NYU Museum', phone: '+44 32 567 9021', email: 'ross.geller@example.com', joined: '08.02.2023', updated: '09.14.2023' },
  { ...MICKEY, id: 4, name: 'Monica Geller', company: 'Alessandro', phone: '+44 32 567 3344', email: 'monica.geller@example.com', joined: '08.19.2023', updated: '09.30.2023' },
];

const meta = {
  title: 'Organisms/TableClients',
  component: TableClients,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'canvas' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    status: { control: 'inline-radio', options: ['ready', 'loading', 'error'] },
    emptyText: { control: 'text' },
    loadingText: { control: 'text' },
    errorText: { control: 'text' },
    label: { control: 'text' },
    onSort: { action: 'sort' },
  },
  args: { rows: [MICKEY] },
  // Figma frame is 1524px wide.
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 1524 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TableClients>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Table/Row & Header) ─────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const ManyRows: Story = {
  name: 'Several rows',
  args: { rows: MORE_ROWS },
  parameters: { docs: { description: { story: 'Rows are 8px apart, as the header is from the first row (AI-defined: Figma draws one row).' } } },
};

export const HoverName: Story = {
  name: 'Hover name',
  args: { rows: [{ ...MICKEY }, { ...MORE_ROWS[1] }] },
  parameters: { docs: { description: { story: 'Hover a name: Hover Blue Light, underlined (Figma Table Row Hover Name).' } } },
};

// ─── STATES (data display) ───────────────────────────────────────────────────
export const Empty: Story = {
  args: { rows: [] },
  parameters: { docs: { description: { story: 'Header stays, a message replaces the rows (AI-defined).' } } },
};

export const Loading: Story = {
  args: { status: 'loading' },
  parameters: { docs: { description: { story: '`aria-busy` table with a status message (AI-defined).' } } },
};

export const ErrorState: Story = {
  name: 'Error',
  args: { status: 'error' },
  parameters: { docs: { description: { story: 'Message in Danger Strong, announced with `role="alert"` (AI-defined).' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  name: 'Long text',
  args: {
    rows: [
      {
        ...MICKEY,
        name: 'Bartholomew Montgomery-Featherstonehaugh',
        company: 'International Wholesale and Distribution Company',
        email: 'bartholomew.montgomery.featherstonehaugh@example.com',
      },
    ],
  },
  parameters: { docs: { description: { story: 'Cells are cut with an ellipsis (inherited from `TableRowClient`).' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container (600px, scrolls)',
  args: { rows: MORE_ROWS.slice(0, 2) },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
  parameters: { docs: { description: { story: 'Columns keep their widths; the table scrolls horizontally (AI-defined).' } } },
};

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────
export const Sortable: Story = {
  name: 'Interactive sort (by name)',
  render: (args) => {
    const [dir, setDir] = useState<'asc' | 'desc'>('asc');
    const rows = [...MORE_ROWS].sort((a, b) => String(a.name).localeCompare(String(b.name)) * (dir === 'asc' ? 1 : -1));
    return <TableClients {...args} rows={rows} onSort={(id) => id === 'name' && setDir((d) => (d === 'asc' ? 'desc' : 'asc'))} />;
  },
  parameters: { docs: { description: { story: 'Press the Name header: the story reverses the order (the table itself does not sort).' } } },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-48)' }}>
      <TableClients {...args} rows={MORE_ROWS} />
      <TableClients {...args} rows={[]} />
      <TableClients {...args} status="loading" />
      <TableClients {...args} status="error" />
    </div>
  ),
};

/** Figma "Dark Organisms Components" → Table - Clients / Table Row Hover Name Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
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

// ─── MANAGEMENT LAYOUT (Figma: Clients → All Clients Tab) ────────────────────
const MANAGEMENT_BASE: TableClientsItem[] = [
  { id: 1, name: 'Mickey Herman', nameHref: '#', company: "Sam's Club", phone: '+44 32 567 8473', group: { label: 'Large Distrib.' }, status: <ChevronStatus color="dark">Not interested</ChevronStatus>, updated: '07.23.2023', joined: '07.23.2023', attention: true, source: 'Outbrain' },
  { id: 2, name: 'Dave Filoni', nameHref: '#', company: 'Costco', phone: '+44 32 567 8473', group: { label: 'Large Distrib.' }, status: <ChevronStatus color="primary">Active</ChevronStatus>, updated: '06.17.2022', joined: '07.23.2023' },
  { id: 3, name: 'Justin Ridge', nameHref: '#', company: 'WinCo Foods', phone: '+44 32 567 8473', group: { label: 'Small Distrib.', color: 'teal' as const }, status: <ChevronStatus color="secondary">Inactive</ChevronStatus>, updated: '06.17.2022', joined: '07.23.2023' },
  { id: 4, name: 'Jennifer Corbett', nameHref: '#', company: "Fry's", phone: '+44 32 567 8473', group: { label: 'Small Distrib.', color: 'teal' as const }, status: <ChevronStatus color="success">Follow up</ChevronStatus>, updated: '06.17.2022', joined: '07.23.2023' },
];
const MANAGEMENT_ROWS: TableClientsItem[] = MANAGEMENT_BASE.map((r) => ({ ...r, onDelete: () => undefined, onCall: () => undefined, onNotes: () => undefined, deleteTooltip: 'Delete User', notesTooltip: 'Add a note', callMenu: <CallMenu /> }));

export const Management: Story = {
  args: { layout: 'management', rows: MANAGEMENT_ROWS },
  parameters: { docs: { description: { story: 'Figma `Manager User - Clients - All Clients Tab`: group + status columns, action buttons with tooltips and the call menu.' } } },
  decorators: [(Story) => <div style={{ maxWidth: 1524, paddingBottom: 100 }}><Story /></div>],
};

// ─── CARDS VIEW (Figma: Clients → All Clients Tab, 768px and below) ──────────
export const Cards: Story = {
  args: { layout: 'management', view: 'cards', rows: MANAGEMENT_ROWS },
  parameters: { docs: { description: { story: 'Figma `Cards Line` (768 / 480 / 360px): `TableRowClient layout="card"` in a `CardGrid`, no header. The card shows one date (`joined`).' } } },
  decorators: [(Story) => <div style={{ maxWidth: 736 }}><Story /></div>],
};
export const CardsNarrow: Story = {
  name: 'Cards (360px)',
  args: { layout: 'management', view: 'cards', rows: MANAGEMENT_ROWS.slice(0, 2) },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
};

export const ManagementNarrow: Story = {
  name: 'Management (1132px panel)',
  args: { layout: 'management', rows: MANAGEMENT_ROWS },
  parameters: { docs: { description: { story: 'Figma `1440 Navbar` frame: the text columns shrink instead of the table scrolling sideways.' } } },
  decorators: [(Story) => <div style={{ maxWidth: 1132, paddingBottom: 100 }}><Story /></div>],
};

// ─── HISTORY LAYOUT (Figma: client page → Last updates) ──────────────────────
export const History: Story = {
  args: {
    layout: 'history',
    rows: [1, 2, 3].map((n) => ({
      id: n,
      index: n,
      name: 'David Schwimmer',
      onNameClick: () => undefined,
      status: <ChevronStatus color="dark">Not interested</ChevronStatus>,
      callDate: '08.24.2023',
      changeDate: '08.24.2023',
    })),
  },
  parameters: { docs: { description: { story: 'Figma `Table Header` + `Table Row 25..28` of `Last updates`: ID and name packed, status, call date, change date.' } } },
};

export const HistoryCards: Story = {
  name: 'History cards (480 / 360px)',
  args: {
    layout: 'history',
    view: 'cards',
    rows: [1, 2, 3].map((n) => ({
      id: n,
      index: n,
      name: 'David Schwimmer',
      onNameClick: () => undefined,
      status: <ChevronStatus color="dark">Not interested</ChevronStatus>,
      callDate: '08.24.2023',
      changeDate: '08.24.2023',
    })),
  },
  parameters: { docs: { description: { story: 'Figma `Last updates` at 480 / 360px: `TableRowClient layout="history-card"` — ID, then name, status and the dates in one wrapping line.' } } },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
};

const CALL = { phone: '+44 32 567 8473', callDate: '06.17.2022', duration: '00:02:30', updated: '07.23.2023', onNameClick: () => undefined };
export const CallsCards: Story = {
  name: 'Calls cards (768px and below)',
  args: {
    layout: 'calls',
    view: 'cards',
    label: 'Call records',
    rows: [
      { id: 1, name: 'Mickey Herman', ...CALL, onClose: () => undefined, player: <AudioPlayer embedded /> },
      { id: 2, name: 'Dave Filoni', ...CALL, onPlay: () => undefined },
      { id: 3, name: 'Justin Ridge', ...CALL, callState: 'missed', updated: undefined, callResult: 'cancel' },
    ],
  },
  parameters: { docs: { description: { story: 'AI-defined (Figma draws no narrow Call records): `TableRowClient layout="calls-card"` in a `CardGrid`.' } } },
  decorators: [(Story) => <div style={{ maxWidth: 416 }}><Story /></div>],
};

export const HistoryNoHeader: Story = {
  name: 'History without header (768px)',
  args: { ...History.args, header: false },
  parameters: { docs: { description: { story: 'Figma `Last updates` at 768px draws the rows without the header; `header={false}`.' } } },
};

// ─── CALLS LAYOUT (Figma: client page → Call records) ────────────────────────
export const Calls: Story = {
  args: {
    layout: 'calls',
    label: 'Call records',
    rows: [
      { id: 1, name: 'Mickey Herman', ...CALL, onClose: () => undefined, player: <AudioPlayer embedded /> },
      { id: 2, name: 'Dave Filoni', ...CALL, onPlay: () => undefined },
      { id: 3, name: 'Justin Ridge', ...CALL, callState: 'missed', updated: undefined, callResult: 'cancel' },
      { id: 4, name: 'Jennifer Corbett', ...CALL, callState: 'missed', updated: undefined, callResult: 'busy' },
      { id: 5, name: 'Gennady Tartakov', ...CALL, onPlay: () => undefined },
      { id: 6, name: 'Deborah Chow', ...CALL, callState: 'missed', updated: undefined, callResult: 'no day limit' },
    ],
  },
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=5339-218843' }, docs: { description: { story: 'Figma `Table Header 5` + rows of `Call records`: `CALLS_CLIENTS_COLUMNS` = Seller, Phone, Date, Time, Updated, Actions; the first row has its player open.' } } },
};
