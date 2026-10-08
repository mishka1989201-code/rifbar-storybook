import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { FilterField, InputField } from '../InputField';
import { Modal, ModalField, ModalSection } from './Modal';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=7058-30262';

const meta = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { title: 'Create warehouse', size: 'desktop', onClose: () => {} },
  argTypes: {
    title: { control: 'text' },
    size: { control: 'inline-radio', options: ['desktop', 'mobile'] },
    icon: { control: 'text' },
    children: { control: false },
    actions: { control: false },
    onClose: { action: 'close' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const Fields = ({ idPrefix }: { idPrefix: string }) => (
  <>
    <ModalSection>
      <ModalField label="Warehouse name" htmlFor={`${idPrefix}-name`}>
        <InputField id={`${idPrefix}-name`} placeholder="Enter the name of the warehouse" />
      </ModalField>
      <ModalField label="Location" htmlFor={`${idPrefix}-location`}>
        <InputField id={`${idPrefix}-location`} placeholder="Enter the warehouse address" />
      </ModalField>
    </ModalSection>
    <ModalSection>
      <ModalField label="Manager" htmlFor={`${idPrefix}-manager`}>
        <FilterField id={`${idPrefix}-manager`} placeholder="Choose a warehouse manager" />
      </ModalField>
    </ModalSection>
  </>
);

const Actions = ({ accept = 'Accept' }: { accept?: string }) => (
  <>
    <Button variant="light" iconLeft="xmark">Close</Button>
    <Button variant="dark" iconLeft="tick">{accept}</Button>
  </>
);

// ─── DEFAULT (Figma: Property 1=Desktop) ─────────────────────────────────────
export const Default: Story = {
  render: (args) => (
    <Modal {...args} actions={<Actions />}>
      <Fields idPrefix="desktop" />
    </Modal>
  ),
};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Mobile: Story = {
  name: 'Mobile',
  args: { size: 'mobile' },
  render: (args) => (
    <Modal {...args} actions={<Actions accept="Save" />}>
      <Fields idPrefix="mobile" />
    </Modal>
  ),
};

export const WithoutIcon: Story = {
  name: 'Without icon',
  args: { icon: null },
  render: (args) => (
    <Modal {...args} actions={<Actions />}>
      <Fields idPrefix="noicon" />
    </Modal>
  ),
};

export const WithoutFooter: Story = {
  name: 'Without footer',
  args: { title: 'Warehouse details' },
  render: (args) => (
    <Modal {...args}>
      <Fields idPrefix="nofooter" />
    </Modal>
  ),
};

export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    if (!open) return <Button variant="dark" onClick={() => setOpen(true)}>Open pop-up</Button>;
    return (
      <Modal {...args} onClose={() => setOpen(false)} actions={
        <>
          <Button variant="light" iconLeft="xmark" onClick={() => setOpen(false)}>Close</Button>
          <Button variant="dark" iconLeft="tick" onClick={() => setOpen(false)}>Accept</Button>
        </>
      }>
        <Fields idPrefix="interactive" />
      </Modal>
    );
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongTitle: Story = {
  name: 'Long title',
  args: { title: 'Create a new warehouse for the northern distribution region' },
  render: (args) => (
    <Modal {...args} actions={<Actions />}>
      <Fields idPrefix="longtitle" />
    </Modal>
  ),
};

export const LongTitleMobile: Story = {
  name: 'Long title (mobile)',
  args: { size: 'mobile', title: 'Create a new warehouse for the northern distribution region' },
  render: (args) => (
    <Modal {...args} actions={<Actions accept="Save" />}>
      <Fields idPrefix="longtitlemobile" />
    </Modal>
  ),
};

export const InvalidField: Story = {
  name: 'Field with error',
  render: (args) => (
    <Modal {...args} actions={<Actions />}>
      <ModalSection>
        <ModalField label="Warehouse name" htmlFor="invalid-name">
          <InputField id="invalid-name" defaultValue="" invalid placeholder="Enter the name of the warehouse" />
        </ModalField>
      </ModalSection>
    </Modal>
  ),
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  render: (args) => (
    <div style={{ maxWidth: 280 }}>
      <Modal {...args} actions={<Actions />}>
        <Fields idPrefix="narrow" />
      </Modal>
    </div>
  ),
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-32)', alignItems: 'flex-start' }}>
      <div style={{ flex: '1 1 450px', maxWidth: 450 }}>
        <Modal title="Create warehouse" actions={<Actions />}>
          <Fields idPrefix="all-desktop" />
        </Modal>
      </div>
      <div style={{ flex: '1 1 340px', maxWidth: 340 }}>
        <Modal title="Create warehouse" size="mobile" actions={<Actions accept="Save" />}>
          <Fields idPrefix="all-mobile" />
        </Modal>
      </div>
    </div>
  ),
};
