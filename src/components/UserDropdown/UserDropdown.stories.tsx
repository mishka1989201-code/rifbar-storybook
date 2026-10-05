import type { Meta, StoryObj } from '@storybook/react';
import { UserDropdown } from './UserDropdown';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=48-10504';

const meta = {
  title: 'Molecules/UserDropdown',
  component: UserDropdown,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { name: 'Jennifer Corbett' },
  argTypes: {
    name: { control: 'text' },
    src: { control: 'text' },
    open: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof UserDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Open: Story = { args: { open: true } };
export const Disabled: Story = { args: { disabled: true } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const SingleName: Story = { name: 'Single name', args: { name: 'Rifbar' } };

export const LongName: Story = {
  name: 'Long name',
  args: { name: 'Jennifer Alexandra Corbett-Montgomery' },
  decorators: [(Story) => <div style={{ maxWidth: 200 }}><Story /></div>],
};

// ─── ALL STATES ──────────────────────────────────────────────────────────────
export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-32)' }}>
      <UserDropdown name="Jennifer Corbett" />
      <UserDropdown name="Jennifer Corbett" open />
      <UserDropdown name="Jennifer Corbett" disabled />
    </div>
  ),
};
