import type { Meta, StoryObj } from '@storybook/react';
import { AudioPlayer } from '../AudioPlayer';
import { CallMenu } from '../CallMenu';
import { ChevronStatus } from '../ChevronStatus';
import { TableRowClient } from './TableRowClient';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=17-6506';
const FIGMA_HOVER_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=828-255423';

const FIGMA_ROW_HOVER_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3352-240764';

const TOOLTIP = [
  'Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.',
  'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.',
];
const tooltipBody = (
  <>
    {TOOLTIP.map((t) => <p key={t}>{t}</p>)}
  </>
);

const meta = {
  title: 'Molecules/TableRowClient',
  component: TableRowClient,
  parameters: { layout: 'padded', backgrounds: { default: 'canvas' }, design: { type: 'figma', url: FIGMA_URL } },
  args: {
    name: 'Mickey Herman',
    company: "Sam's Club",
    phone: '+44 32 567 8473',
    email: 'mickeyherman23@gmail.com',
    joined: '07.23.2023',
    updated: '07.23.2023',
    forceNameHover: false,
    forceHover: false,
  },
  argTypes: {
    nameHref: { control: 'text' },
    forceNameHover: { control: 'boolean', description: 'Preview only: Figma Table Row Hover Name' },
    onNameClick: { action: 'name clicked' },
    forceHover: { control: 'boolean', description: 'Preview only: Figma Hover Row in Table (row fill + tooltip)' },
    tooltip: { control: false, description: 'Detailed information under the row on hover / focus' },
    onAction: { action: 'action pressed' },
    // No `action` here: Storybook would pass the handler to every story and always draw these buttons.
    onDelete: { control: false, description: 'Adds the delete button' },
    onCall: { control: false, description: 'Adds the phone button' },
    onNotes: { control: false, description: 'Adds the notes button' },
  },
  // Figma frame is 1524px wide; the bottom padding leaves room for the tooltip.
  decorators: [(Story) => <div style={{ maxWidth: 1524, paddingBottom: 220 }}><Story /></div>],
} satisfies Meta<typeof TableRowClient>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Table Row 14) ───────────────────────────────────────────
export const Default: Story = {};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const HoverName: Story = {
  name: 'Hover name',
  args: { nameHref: '#', forceNameHover: true },
  parameters: { design: { type: 'figma', url: FIGMA_HOVER_URL } },
};

export const NameAsLink: Story = {
  name: 'Name as link',
  args: { nameHref: '#' },
  parameters: { docs: { description: { story: 'Hover or focus the name: Hover Blue Light, underlined (Figma Hover Name).' } } },
};

export const NameAsButton: Story = {
  name: 'Name as button',
  args: { onNameClick: () => undefined },
};

// ─── HOVER ROW (Figma: Hover Row in Table) ──────────────────────────────────
export const HoverRow: Story = {
  name: 'Hover row with tooltip',
  args: {
    forceHover: true,
    nameHref: '#',
    onDelete: () => undefined,
    onCall: () => undefined,
    tooltipTitle: 'Detailed information',
    tooltip: tooltipBody,
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_ROW_HOVER_URL },
    docs: { description: { story: 'Figma `Hover Row in Table` (light). Real hover or focus inside the row opens the same tooltip; Escape hides it.' } },
  },
};

export const HoverRowDark: Story = {
  name: 'Hover row with tooltip (dark)',
  args: { ...HoverRow.args, onNotes: () => undefined },
  parameters: {
    design: { type: 'figma', url: FIGMA_ROW_HOVER_URL },
    docs: { description: { story: 'Figma `Hover Row in Table` (dark): the row and the tooltip take their values from the dark theme tokens.' } },
  },
  render: (args) => (
    <div data-theme="dark" style={{ padding: 'var(--spacing-16)', background: 'var(--color-bg-dark)' }}>
      <TableRowClient {...args} />
    </div>
  ),
};

export const Actions: Story = {
  name: 'With action buttons',
  args: { onDelete: () => undefined, onCall: () => undefined, onNotes: () => undefined },
  parameters: { design: { type: 'figma', url: FIGMA_ROW_HOVER_URL } },
};

export const TooltipOnHover: Story = {
  name: 'Tooltip on real hover / focus',
  args: { nameHref: '#', onDelete: () => undefined, onCall: () => undefined, tooltipTitle: 'Detailed information', tooltip: tooltipBody },
  parameters: { docs: { description: { story: 'Not forced: hover the row, or Tab to a control in it. Escape hides the tooltip until the pointer or focus leaves.' } } },
};

export const TooltipShortText: Story = {
  name: 'Tooltip with short text',
  args: { forceHover: true, tooltip: 'Short note.' },
  parameters: { docs: { description: { story: 'No headline, one line: the bubble keeps the Figma width (899px).' } } },
};

// ─── MANAGEMENT LAYOUT (Figma: Table Row 15, Clients → All clients) ──────────
const FIGMA_MANAGEMENT_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=47-11326';
const managementArgs = {
  layout: 'management',
  group: { label: 'Large Distrib.', color: 'green' },
  status: <ChevronStatus color="success">Follow up</ChevronStatus>,
  nameHref: '#',
  onDelete: () => undefined,
  onCall: () => undefined,
  onNotes: () => undefined,
} satisfies Story['args'];

export const Management: Story = {
  args: managementArgs,
  parameters: { design: { type: 'figma', url: FIGMA_MANAGEMENT_URL }, docs: { description: { story: 'Figma `Table Row 15` layout: group and status instead of the email.' } } },
};

export const Attention: Story = {
  args: { ...managementArgs, attention: true, status: <ChevronStatus color="dark">Not interested</ChevronStatus> },
  parameters: { design: { type: 'figma', url: FIGMA_MANAGEMENT_URL }, docs: { description: { story: 'Figma draws the first row of the clients table with the Warning BG fill and the Warning border.' } } },
};

export const Card: Story = {
  args: { ...managementArgs, layout: 'card', company: "Fry's", phone: '+44 32 567 8473', joined: '07.23.2023', status: <ChevronStatus color="primary">Active</ChevronStatus> },
  parameters: { design: { type: 'figma', url: FIGMA_MANAGEMENT_URL }, docs: { description: { story: 'Figma `Card Row` (768px and below): the info line wraps, the buttons sit under it at the right.' } } },
  decorators: [(Story) => <div style={{ maxWidth: 348 }}><Story /></div>],
};

export const CardAttention: Story = {
  name: 'Card (attention, narrow)',
  args: { ...Card.args, attention: true },
  decorators: [(Story) => <div style={{ maxWidth: 340 }}><Story /></div>],
};

export const GroupTeal: Story = {
  name: 'Group (teal)',
  args: { ...managementArgs, group: { label: 'Small Distrib.', color: 'teal' }, status: <ChevronStatus color="secondary">Inactive</ChevronStatus> },
};

export const WithSource: Story = {
  name: 'With source icon',
  args: { ...managementArgs, source: 'Outbrain', status: <ChevronStatus color="info">New</ChevronStatus> },
  decorators: [(Story) => <div style={{ maxWidth: 1524, paddingTop: 80, paddingBottom: 20 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Hover or focus the icon before the name: the source opens above it (Figma `Tooltip with border + shadow`, “Outbrain”).' } } },
};

export const ActionTooltips: Story = {
  name: 'Action tooltips',
  args: { ...managementArgs, deleteTooltip: 'Delete User', notesTooltip: 'Add a note' },
  parameters: { docs: { description: { story: 'Hover or focus the red or the notes button: the tooltip opens to its left (Figma `Delete User`, `Add a note`).' } } },
};

export const WithCallMenu: Story = {
  name: 'With call menu',
  args: { ...managementArgs, callMenu: <CallMenu /> },
  decorators: [(Story) => <div style={{ maxWidth: 1524, paddingBottom: 100 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Hover or focus the phone button: `CallMenu` opens under it (Figma `tooltip-call`).' } } },
};

// ─── HISTORY LAYOUT (Figma: Table Row 25, client page → Last updates) ───────
export const History: Story = {
  args: {
    layout: 'history',
    index: 2,
    name: 'David Schwimmer',
    onNameClick: () => undefined,
    status: <ChevronStatus color="dark">Not interested</ChevronStatus>,
    callDate: '08.24.2023',
    changeDate: '08.24.2023',
  },
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=55-16581' }, docs: { description: { story: 'Figma `Table Row 25`: ID, name, status, call date, change date; no buttons.' } } },
};

// ─── CALLS LAYOUT (Figma: Table Row 16 / 2 / 3, client page → Call records) ──
const callsArgs = {
  layout: 'calls' as const,
  name: 'Dave Filoni',
  onNameClick: () => undefined,
  phone: '+44 32 567 8473',
  callDate: '06.17.2022',
  duration: '00:02:30',
  updated: '07.23.2023',
};
const CALLS_DESIGN = { design: { type: 'figma' as const, url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=5339-218843' } };

export const Calls: Story = {
  args: { ...callsArgs, onPlay: () => undefined },
  parameters: { ...CALLS_DESIGN, docs: { description: { story: 'Figma `Table Row 2`: green phone icon, seller, phone, date, duration, date and the dark play button.' } } },
};

export const CallsPlayerOpen: Story = {
  name: 'Calls — player open',
  args: { ...callsArgs, name: 'Mickey Herman', onClose: () => undefined, player: <AudioPlayer embedded /> },
  parameters: { ...CALLS_DESIGN, docs: { description: { story: 'Figma `Table Row 16` + `Time Tracker`: while `player` is set the play button is the light close button and the player fills the card under the row.' } } },
};

export const CallsMissed: Story = {
  name: 'Calls — no recording',
  args: { ...callsArgs, name: 'Justin Ridge', callState: 'missed', updated: undefined, callResult: 'cancel' },
  parameters: { ...CALLS_DESIGN, docs: { description: { story: 'Figma `Table Row 3` / `4` / `6`: blue forwarded icon and the result (`cancel`, `busy`, `no day limit`) in Headlines instead of the button. The second date is not drawn there (assumed empty).' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
const USERS_DESIGN = { design: { type: 'figma' as const, url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=960-279890' } };

export const Users: Story = {
  args: {
    layout: 'users',
    index: '1',
    name: 'David Schwimmer',
    email: 'davidschwim1976@gmail.com',
    department: 'Management',
    userRole: 'Admin',
    joined: '08.24.2023',
    onDelete: () => undefined,
    deleteTooltip: 'Delete an employee',
  },
  parameters: { ...USERS_DESIGN, docs: { description: { story: 'Figma `Table Row 24` / `15` of `Departments - Edit`: ID + name, email, department, role, date and the red delete button (tooltip “Delete an employee”).' } } },
};

export const LongText: Story = {
  name: 'Long text',
  args: {
    name: 'Bartholomew Montgomery-Featherstonehaugh',
    company: 'International Wholesale and Distribution Company',
    email: 'bartholomew.montgomery.featherstonehaugh@example.com',
  },
  parameters: { docs: { description: { story: 'Every cell is cut with an ellipsis (AI-defined: Figma shows only short text).' } } },
};

export const EmptyCells: Story = {
  name: 'Empty cells',
  args: { company: '—', phone: '—', email: '—', joined: '—', updated: '—' },
};

export const CustomAction: Story = {
  name: 'Custom action label',
  args: { actionLabel: 'Details' },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      <TableRowClient {...args} />
      <TableRowClient {...args} nameHref="#" forceNameHover />
      <TableRowClient {...args} company="—" phone="—" email="—" />
      <TableRowClient {...args} onDelete={() => undefined} onCall={() => undefined} onNotes={() => undefined} />
      <TableRowClient {...args} {...managementArgs} attention />
      <TableRowClient {...args} layout="history" index={1} onNameClick={() => undefined} status={<ChevronStatus color="dark">Not interested</ChevronStatus>} callDate="08.24.2023" changeDate="08.24.2023" />
      <TableRowClient {...args} {...callsArgs} onPlay={() => undefined} />
      <TableRowClient {...args} {...callsArgs} callState="missed" updated={undefined} callResult="busy" />
      <TableRowClient {...args} {...callsArgs} name="Mickey Herman" onClose={() => undefined} player={<AudioPlayer embedded />} />
      <TableRowClient {...args} {...managementArgs} group={{ label: 'Small Distrib.', color: 'teal' }} status={<ChevronStatus color="primary">Active</ChevronStatus>} />
      <div style={{ paddingBottom: 200 }}>
        <TableRowClient {...args} forceHover onDelete={() => undefined} onCall={() => undefined} tooltipTitle="Detailed information" tooltip={tooltipBody} />
      </div>
    </div>
  ),
};
