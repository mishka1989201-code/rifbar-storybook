import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Notification } from './Notification';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=996-395949';

const TEXT = 'Borem ipsum dolor sit amet, consectetur adipiscing elit.';

const meta = {
  title: 'Molecules/Notification',
  component: Notification,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { kind: 'success', layout: 'toast', children: TEXT, onClose: () => {}, style: { maxWidth: 500 } },
  argTypes: {
    kind: { control: 'inline-radio', options: ['success', 'info', 'warning', 'error'] },
    layout: { control: 'inline-radio', options: ['toast', 'banner'] },
    actions: { control: false },
    onClose: { control: false },
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma Success) ─────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Info: Story = { args: { kind: 'info' } };
export const Warning: Story = { args: { kind: 'warning' } };
export const Error: Story = { args: { kind: 'error' } };

export const SignTheContract: Story = {
  name: 'Sign the Contract (banner)',
  args: {
    kind: 'info',
    layout: 'banner',
    style: { maxWidth: 1524 },
    title: 'Important Notice:',
    children: 'In order to make purchases, you need to sign a contract.',
    actions: (
      <>
        <Button variant="outline" iconLeft="reboot">Upload Contract</Button>
        <Button variant="dark" iconLeft="export">Sign the Contract</Button>
      </>
    ),
  },
};

export const NoClose: Story = {
  name: 'No close button',
  args: { onClose: undefined },
};

export const Dismissable: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return open ? <Notification {...args} onClose={() => setOpen(false)} /> : <Button onClick={() => setOpen(true)}>Show again</Button>;
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  name: 'Long text',
  args: { children: TEXT.repeat(4) },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  args: { style: { maxWidth: 260 } },
};

export const NarrowBanner: Story = {
  name: 'Narrow banner',
  args: { ...SignTheContract.args, style: { maxWidth: 420 } },
};
