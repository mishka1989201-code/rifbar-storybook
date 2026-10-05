import type { Meta, StoryObj } from '@storybook/react';
import { DepartmentItem } from './DepartmentItem';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=139-48594';

const meta = {
  title: 'Molecules/DepartmentItem',
  component: DepartmentItem,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { name: 'Management', initials: 'MG' },
  argTypes: { name: { control: 'text' }, initials: { control: 'text' }, src: { control: 'text' } },
  decorators: [(Story) => <div style={{ maxWidth: 368 }}><Story /></div>],
} satisfies Meta<typeof DepartmentItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const AutoInitials: Story = {
  name: 'Auto initials',
  args: { name: 'Customer Support', initials: undefined },
};

export const InList: Story = {
  name: 'In a list',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
      <DepartmentItem name="Management" initials="MG" />
      <DepartmentItem name="Logistics" initials="LG" />
      <DepartmentItem name="Customer Support" initials="CS" />
    </div>
  ),
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongName: Story = {
  name: 'Long name',
  args: { name: 'International logistics and customs clearance department' },
  decorators: [(Story) => <div style={{ maxWidth: 240 }}><Story /></div>],
};
