import type { Meta, StoryObj } from '@storybook/react';
import { NotificationLine } from './NotificationLine';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=146-62601';

const POPUP_FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=145-57855';

const MESSAGE = 'Check the warehouse “Warsaw #345” - problems with the quantity!';

const meta = {
  title: 'Molecules/NotificationLine',
  component: NotificationLine,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { message: MESSAGE, date: '06/23/2023', type: 'old', disabled: false, forceHover: false },
  argTypes: {
    variant: { control: 'inline-radio', options: ['row', 'popup'] },
    type: { control: 'inline-radio', options: ['old', 'new'] },
    disabled: { control: 'boolean' },
    forceHover: { control: 'boolean' },
    message: { control: 'text' },
    date: { control: 'text' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 1524 }}><Story /></div>],
} satisfies Meta<typeof NotificationLine>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Type=Old, Property 1=Static) ────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const New: Story = { args: { type: 'new' } };

// ─── STATES ──────────────────────────────────────────────────────────────────
export const OldHover: Story = { name: 'Old / Hover', args: { forceHover: true } };
export const NewHover: Story = { name: 'New / Hover', args: { type: 'new', forceHover: true } };
export const OldDisabled: Story = { name: 'Old / Disabled', args: { disabled: true } };
export const NewDisabled: Story = { name: 'New / Disabled', args: { type: 'new', disabled: true } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  name: 'Long text',
  args: {
    message:
      'Check the warehouse “Warsaw #345” - problems with the quantity! The stock count differs from the system by more than 120 units across several categories, please verify before the shipment is released.',
  },
};

export const WithoutDate: Story = { name: 'Without date', args: { date: undefined } };

export const Narrow: Story = {
  name: 'Narrow',
  decorators: [(Story) => <div style={{ maxWidth: 280 }}><Story /></div>],
};

export const InList: Story = {
  name: 'In a list',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      <NotificationLine type="new" message={MESSAGE} date="06/23/2023" />
      <NotificationLine type="new" message="Order #4521 is ready for shipment." date="06/22/2023" />
      <NotificationLine message="Invoice #118 has been paid." date="06/20/2023" />
      <NotificationLine message={MESSAGE} date="06/19/2023" />
    </div>
  ),
};

// ─── POPUP (Figma: Notification Line PopUp) ──────────────────────────────────
export const Popup: Story = {
  name: 'Popup',
  parameters: { design: { type: 'figma', url: POPUP_FIGMA_URL } },
  args: { variant: 'popup', date: undefined },
};
export const PopupUnread: Story = { name: 'Popup / New (unread)', args: { variant: 'popup', type: 'new', date: undefined } };
export const PopupHover: Story = { name: 'Popup / Hover', args: { variant: 'popup', forceHover: true, date: undefined } };
export const PopupDisabled: Story = { name: 'Popup / Disabled', args: { variant: 'popup', disabled: true, date: undefined } };
export const PopupLongText: Story = {
  name: 'Popup / Long text',
  args: { variant: 'popup', date: undefined, message: `${MESSAGE} ${MESSAGE}` },
};
export const PopupWithDate: Story = { name: 'Popup / With date', args: { variant: 'popup' } };

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      <NotificationLine message={MESSAGE} date="06/23/2023" />
      <NotificationLine message={MESSAGE} date="06/23/2023" forceHover />
      <NotificationLine message={MESSAGE} date="06/23/2023" disabled />
      <NotificationLine type="new" message={MESSAGE} date="06/23/2023" />
      <NotificationLine type="new" message={MESSAGE} date="06/23/2023" forceHover />
      <NotificationLine type="new" message={MESSAGE} date="06/23/2023" disabled />
      <NotificationLine variant="popup" message={MESSAGE} />
      <NotificationLine variant="popup" type="new" message={MESSAGE} />
      <NotificationLine variant="popup" message={MESSAGE} forceHover />
      <NotificationLine variant="popup" message={MESSAGE} disabled />
    </div>
  ),
};
