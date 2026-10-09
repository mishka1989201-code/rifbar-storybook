import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { ChevronDropDown } from '../ChevronDropDown';
import { ClientDetails } from '../ClientDetails';
import { FilterField, TextField } from '../InputField';
import { LabeledField } from '../LabeledField';
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
    variant: { control: 'inline-radio', options: ['info', 'ticket', 'details', 'form'] },
    columns: { control: false, description: '`form` variant: one node per column' },
    size: { control: 'inline-radio', options: ['default', 'mobile'] },
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

/** Figma `Select Client menu` (node 1407:445305). */
export const Form: Story = {
  name: 'Form (Select Client menu)',
  decorators: [(Story) => <div style={{ maxWidth: 1524, paddingBottom: 40 }}><Story /></div>],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=1407-445305',
    },
  },
  args: {
    variant: 'form',
    title: 'Main information',
    columns: [
      <LabeledField key="client" title="Client" required><FilterField placeholder="Select a client" aria-required /></LabeledField>,
      <LabeledField key="seller" title="Seller" required><FilterField placeholder="Select a seller" aria-required /></LabeledField>,
    ],
  },
};

export const FormNarrow: Story = {
  name: 'Form, narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 360, paddingBottom: 40 }}><Story /></div>],
  args: Form.args,
};

const INVOICE_TEXT =
  'Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.';

export const FormWithWideRow: Story = {
  name: 'Form with a wide row (Create Invoice, Size=Big)',
  decorators: [(Story) => <div style={{ maxWidth: 1524, paddingBottom: 40 }}><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=1691-280240' },
    docs: { description: { story: 'Figma `Create Invoice` Size=Big: two 508px columns, then a double-width column with a `TextField`.' } },
  },
  args: {
    variant: 'form',
    title: 'Select order and terms',
    columns: [
      <LabeledField key="order" title="Order name" required><FilterField placeholder="Select the order" aria-required /></LabeledField>,
      <LabeledField key="terms" title="Terms"><FilterField value="16 Mar 2023" /></LabeledField>,
      {
        content: (
          <LabeledField title="Additionally">
            <TextField placeholder="Enter additional information for the order" />
          </LabeledField>
        ),
        wide: true,
      },
    ],
  },
};

export const FormWithWideRowFilled: Story = {
  name: 'Form with a wide row, filled (Create Invoice, Size=Small)',
  decorators: [(Story) => <div style={{ maxWidth: 416, paddingBottom: 40 }}><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=1696-464784' },
    docs: { description: { story: 'Figma `Create Invoice` Size=Small (416px): the columns stack, 32px apart; all fields are filled (Input field border). Figma clips the text of the text area to one line; a real `TextField` wraps and scrolls.' } },
  },
  args: {
    variant: 'form',
    title: 'Select order and terms',
    columns: [
      <LabeledField key="order" title="Order name" required><FilterField value="Order #4" aria-required /></LabeledField>,
      <LabeledField key="terms" title="Terms"><FilterField value="16 Mar 2023" /></LabeledField>,
      {
        content: (
          <LabeledField title="Additionally">
            <TextField defaultValue={INVOICE_TEXT} />
          </LabeledField>
        ),
        wide: true,
      },
    ],
  },
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

/** Figma `board_all-orders`, 320px (node 208:95123). */
export const Mobile: Story = {
  name: 'Mobile (320px)',
  decorators: [(Story) => <div style={{ width: 320, paddingBottom: 40 }}><Story /></div>],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=208-95123',
    },
  },
  args: { size: 'mobile', infoProps: { justify: 'start' } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 520, paddingBottom: 40 }}><Story /></div>],
  parameters: { docs: { description: { story: 'InfoClient fields wrap onto the next line.' } } },
};

/** Figma "Dark Molecules Components" → board_all-orders Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const DefaultDark: Story = {
  ...Default,
  name: 'Default (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content', minWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

/** Figma "Dark Molecules Components" → Ticket Info Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const TicketDark: Story = {
  ...Ticket,
  name: 'Ticket (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content', minWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
