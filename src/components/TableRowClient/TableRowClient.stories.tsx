import type { Meta, StoryObj } from '@storybook/react';
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

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
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
      <div style={{ paddingBottom: 200 }}>
        <TableRowClient {...args} forceHover onDelete={() => undefined} onCall={() => undefined} tooltipTitle="Detailed information" tooltip={tooltipBody} />
      </div>
    </div>
  ),
};
