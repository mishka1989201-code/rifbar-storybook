import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { ConfirmModal } from './ConfirmModal';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=72-40342';

const Actions = ({ danger = false, accept = 'Accept' }: { danger?: boolean; accept?: string }) => (
  <>
    <Button variant="light" iconLeft="xmark">Cancel</Button>
    <Button variant={danger ? 'danger' : 'dark'} iconLeft="tick">{accept}</Button>
  </>
);

const meta = {
  title: 'Molecules/ConfirmModal',
  component: ConfirmModal,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: {
    title: 'Do you want approve?',
    description: 'Accept user registration for further cooperation.',
    onClose: () => {},
    actions: <Actions />,
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    closeLabel: { control: 'text' },
    actions: { control: false },
    onClose: { action: 'close' },
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Approve Modal) ──────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Destructive: Story = {
  args: {
    title: 'Delete this warehouse?',
    description: 'The warehouse and its stock history will be removed. This cannot be undone.',
    actions: <Actions danger accept="Delete" />,
  },
};
export const WithoutDescription: Story = { name: 'Without description', args: { description: undefined } };
export const WithoutFooter: Story = { name: 'Without footer', args: { actions: undefined } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  name: 'Long text',
  args: {
    title: 'Do you want to approve this user registration and give access to all the warehouses?',
    description:
      'Accepting the request gives the user access to every warehouse of the company and sends them a confirmation e-mail. You can change their access later in the user settings.',
  },
};
export const Narrow: Story = {
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
};

export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return open ? (
      <ConfirmModal {...args} onClose={() => setOpen(false)} actions={
        <>
          <Button variant="light" iconLeft="xmark" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="dark" iconLeft="tick" onClick={() => setOpen(false)}>Accept</Button>
        </>
      } />
    ) : (
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
    );
  },
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      <ConfirmModal title="Do you want approve?" description="Accept user registration for further cooperation." actions={<Actions />} />
      <ConfirmModal title="Delete this warehouse?" description="This cannot be undone." actions={<Actions danger accept="Delete" />} />
      <ConfirmModal title="Do you want approve?" actions={<Actions />} />
    </div>
  ),
};
