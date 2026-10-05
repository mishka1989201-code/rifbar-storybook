import type { Meta, StoryObj } from '@storybook/react';
import { DepartmentSection } from './DepartmentSection';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=139-47444';

const meta = {
  title: 'Molecules/DepartmentSection',
  component: DepartmentSection,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    actionLabel: { control: 'text' },
    actionProps: { control: 'object', description: 'Props of the default `ChevronDropDown`' },
    action: { control: false },
  },
  decorators: [(Story) => <div style={{ maxWidth: 368 }}><Story /></div>],
} satisfies Meta<typeof DepartmentSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS / STATES ───────────────────────────────────────────────────────
export const Open: Story = {
  args: { actionProps: { open: true } },
  parameters: { docs: { description: { story: 'The pill is open (arrow up). AI-defined — Figma draws only the static pill.' } } },
};

export const Disabled: Story = {
  args: { actionProps: { disabled: true } },
};

export const ChosenValue: Story = {
  name: 'Chosen value',
  args: { description: 'Customer support', actionLabel: 'Support' },
};

export const NoDescription: Story = {
  name: 'No description',
  args: { description: null },
};

export const OtherSection: Story = {
  name: 'Other section',
  args: { title: 'Priority', description: 'Choose how urgent this ticket is', actionLabel: 'Change' },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  name: 'Long text',
  args: {
    title: 'Department responsible for this particular support ticket',
    description: 'Select the department responsible for this ticket, it will receive a notification right after the change',
  },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 240 }}><Story /></div>],
};
