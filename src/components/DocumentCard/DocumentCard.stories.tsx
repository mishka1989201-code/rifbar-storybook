import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { DocumentCard } from './DocumentCard';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=4632-522811';

const actions = (
  <>
    <Button variant="outline" iconLeft="save-fill">Download</Button>
    <Button variant="dark" iconLeft="mail">Send via Email</Button>
  </>
);

const meta = {
  title: 'Molecules/DocumentCard',
  component: DocumentCard,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { title: 'Invoice#', value: 'hfjFhOFKlKLljkjkjgkJrutJFj', actions },
  argTypes: { title: { control: 'text' }, value: { control: 'text' }, actions: { control: false } },
  decorators: [(Story) => <div style={{ maxWidth: 384 }}><Story /></div>],
} satisfies Meta<typeof DocumentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma) ─────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const OneAction: Story = {
  name: 'One action',
  args: { actions: <Button variant="outline" iconLeft="save-fill">Download</Button> },
};

export const NoActions: Story = { name: 'No actions', args: { actions: undefined } };

export const OtherIcon: Story = {
  name: 'Other icon',
  args: { icon: 'doc', title: 'Contract#', value: '2023-0845' },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongValue: Story = {
  name: 'Long value',
  args: { value: 'hfjFhOFKlKLljkjkjgkJrutJFjhfjFhOFKlKLljkjkjgkJrutJFjhfjFhOFKlKLljkjkjgkJrutJFj' },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 220 }}><Story /></div>],
};
