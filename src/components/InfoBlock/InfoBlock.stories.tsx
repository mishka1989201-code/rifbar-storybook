import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { ChevronDropDown } from '../ChevronDropDown';
import { ClientDetails } from '../ClientDetails';
import { InfoBlock } from './InfoBlock';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=32-10609';

const meta = {
  title: 'Molecules/InfoBlock',
  component: InfoBlock,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  args: { title: 'Client info' },
  argTypes: {
    title: { control: 'text' },
    variant: { control: 'inline-radio', options: ['info', 'ticket', 'details'] },
    sections: { control: 'object', description: '`ticket` variant: props of the `DepartmentSection`s' },
    rows: { control: 'object', description: '`details` variant: caption / value rows' },
    icon: { control: 'text', description: 'Icon name from the 16px set' },
    infoProps: { control: 'object', description: 'Props of the default `InfoClient` body' },
    actions: { control: false },
    children: { control: false },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1290, paddingBottom: 40 }}><Story /></div>],
} satisfies Meta<typeof InfoBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
/** Figma `TicketInfo/v1` (node 139:47455). */
export const Ticket: Story = {
  name: 'Ticket info (TicketInfo/v1)',
  decorators: [(Story) => <div style={{ maxWidth: 400, paddingBottom: 40 }}><Story /></div>],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=139-47455',
    },
  },
  args: {
    variant: 'ticket',
    title: 'Responsibility',
    sections: [{ title: 'Department' }, { title: 'Manager' }],
  },
};

const TICKET_ROWS = [
  { id: 'requester', label: 'Requester:', value: 'David Schwimmer' },
  { id: 'contacts', label: 'Requester contacts', value: 'matthewperry56@gmail.com' },
  { id: 'created', label: 'Date created:', value: '07.05.2023' },
  { id: 'last', label: 'Last message', value: '09.05.2023, 11:56 am' },
  { id: 'status', label: 'Status', value: <ChevronDropDown>Open</ChevronDropDown> },
];

/** Figma `TicketInfo/V2` (node 400:199822). */
export const TicketDetails: Story = {
  name: 'Ticket details (TicketInfo/V2)',
  decorators: [(Story) => <div style={{ maxWidth: 455, paddingBottom: 40 }}><Story /></div>],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=400-199890',
    },
  },
  args: { variant: 'details', title: 'Ticket info', icon: 'ticket', rows: TICKET_ROWS },
};

export const TicketDetailsLongValues: Story = {
  name: 'Ticket details, long values',
  decorators: [(Story) => <div style={{ maxWidth: 320, paddingBottom: 40 }}><Story /></div>],
  args: {
    variant: 'details',
    title: 'Ticket info',
    icon: 'ticket',
    rows: [
      { label: 'Requester contacts', value: 'matthewperry56.with.a.very.long.address@example-company-domain.com' },
      { label: 'Last message', value: '09.05.2023, 11:56 am — waiting for the warehouse to confirm the delivery date' },
    ],
  },
};

export const TicketPair: Story = {
  name: 'Ticket info + Responsibility (Figma frame)',
  decorators: [(Story) => <div style={{ maxWidth: 960, paddingBottom: 40 }}><Story /></div>],
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-16)', alignItems: 'flex-start' }}>
      <InfoBlock variant="details" title="Ticket info" icon="ticket" rows={TICKET_ROWS} />
      <InfoBlock variant="ticket" title="Responsibility" sections={[{ title: 'Department' }, { title: 'Manager' }]} />
    </div>
  ),
};

export const TicketWithValues: Story = {
  name: 'Ticket info with chosen values',
  decorators: [(Story) => <div style={{ maxWidth: 400, paddingBottom: 40 }}><Story /></div>],
  args: {
    variant: 'ticket',
    title: 'Responsibility',
    sections: [
      { title: 'Department', description: 'Support', actionLabel: 'Change' },
      { title: 'Manager', description: 'Paul Rudd', actionLabel: 'Change' },
      { title: 'Priority', description: null, actionLabel: 'High' },
    ],
  },
};

export const CustomFields: Story = {
  name: 'Custom fields',
  args: {
    title: 'Order info',
    icon: 'cart',
    infoProps: {
      justify: 'start',
      fields: [
        { id: 'order', label: 'Order', value: '#10428' },
        { id: 'status', label: 'Status', value: 'Shipped' },
        { id: 'total', label: 'Total', value: '$19140' },
      ],
    },
  },
};

export const WithActions: Story = {
  name: 'With actions',
  args: { actions: <Button variant="outline">Edit</Button> },
};

export const CustomBody: Story = {
  name: 'Custom body',
  args: {
    children: <ClientDetails>{`Delivery only on weekdays.\n\nCall before arrival.`}</ClientDetails>,
  },
  parameters: { docs: { description: { story: 'Any content can replace the `InfoClient` body, e.g. `ClientDetails`.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const TicketNarrow: Story = {
  name: 'Ticket info, narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 260, paddingBottom: 40 }}><Story /></div>],
  args: { variant: 'ticket', title: 'Responsibility for this support ticket', sections: [{ title: 'Department responsible for this particular ticket' }] },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 520, paddingBottom: 40 }}><Story /></div>],
  parameters: { docs: { description: { story: 'InfoClient fields wrap onto the next line.' } } },
};
