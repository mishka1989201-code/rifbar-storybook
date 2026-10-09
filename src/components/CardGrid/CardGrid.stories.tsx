import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { CardRow } from '../CardRow';
import { CardGrid } from './CardGrid';

const FIGMA_URL =
  '';

const PEOPLE = [
  ['David Schwimmer', 'Management', 'Admin'],
  ['Matthew Perry', 'Warehouse', 'Admin'],
  ['Matt LeBlanc', 'Management', 'Manager'],
  ['James Michael Tyler', 'Warehouse', 'Manager'],
  ['Paul Rudd', 'Management', 'User'],
  ['Matthew Perry', 'Management', 'Admin'],
];

/** A user card of Figma `Pagination Responsive`: number, name (underlined), e-mail, department, role, date and a Delete button. */
export function UserCard({ index, name, department, role }: { index: number; name: string; department: string; role: string }) {
  return (
    <CardRow
      direction="column"
      index={String(index)}
      fields={[
        { id: 'name', content: name, weight: 'semibold', underline: true },
        { id: 'email', content: 'davidschwimmer23@gmail.com' },
        { id: 'department', content: department },
        { id: 'role', content: role },
        { id: 'date', content: '07.23.2023' },
      ]}
      actions={<Button variant="danger" iconOnly="delete" aria-label="Delete" />}
    />
  );
}

const cards = (count = 6) =>
  PEOPLE.slice(0, count).map(([name, department, role], i) => (
    <UserCard key={i} index={i + 1} name={name} department={department} role={role} />
  ));

const meta = {
  title: 'Molecules/CardGrid',
  component: CardGrid,
  parameters: { layout: 'padded', backgrounds: { default: 'canvas' }, design: { type: 'figma', url: FIGMA_URL } },
  args: { children: cards() },
  // Figma `Table 1 - Management` at 768px is 672px wide.
  decorators: [(Story) => <div style={{ maxWidth: 672 }}><Story /></div>],
} satisfies Meta<typeof CardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma 768px: two columns) ──────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const SingleColumn: Story = {
  name: 'One column (480 / 360px)',
  decorators: [(Story) => <div style={{ width: 384 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Below 608px of content (two cards of at least 300px and the gap) the grid has one column.' } } },
};

export const ThreeColumns: Story = {
  name: 'Three columns',
  decorators: [(Story) => <div style={{ width: 960 }}><Story /></div>],
  parameters: { docs: { description: { story: 'Not drawn in Figma: wider containers get more columns (AI-defined).' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const OddCount: Story = { name: 'Odd number of cards', args: { children: cards(5) } };

export const OneCard: Story = { name: 'One card', args: { children: cards(1) } };

export const Empty: Story = { name: 'No cards', args: { children: undefined } };

export const NarrowContainer: Story = {
  name: 'Narrow container (300px)',
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
};

export const LongText: Story = {
  name: 'Long text',
  args: {
    children: [
      <UserCard key="a" index={1} name="Maximilian Alexander Montgomery-Winchester III" department="Management and operations of the north-east warehouses" role="Administrator" />,
      <UserCard key="b" index={2} name="Paul Rudd" department="Management" role="User" />,
    ],
  },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-32)' }}>
      <div style={{ width: 672 }}><CardGrid {...args} /></div>
      <div style={{ width: 384 }}><CardGrid {...args}>{cards(2)}</CardGrid></div>
      <div style={{ width: 960 }}><CardGrid {...args} /></div>
    </div>
  ),
};
