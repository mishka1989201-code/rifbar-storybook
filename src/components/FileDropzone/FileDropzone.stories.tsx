import type { Meta, StoryObj } from '@storybook/react';
import { FileDropzone } from './FileDropzone';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=7064-74791';

const meta = {
  title: 'Atoms/FileDropzone',
  component: FileDropzone,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { disabled: false, forceDragOver: false },
  argTypes: {
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    forceDragOver: { control: 'boolean' },
    label: { control: 'text' },
    browseLabel: { control: 'text' },
    onFiles: { action: 'files' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 476 }}><Story /></div>],
} satisfies Meta<typeof FileDropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Drag Files) ─────────────────────────────────────────────
export const Default: Story = {};

// ─── STATES (not in Figma) ───────────────────────────────────────────────────
export const DragOver: Story = { name: 'Drag over', args: { forceDragOver: true } };
export const Disabled: Story = { args: { disabled: true } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const ImagesOnly: Story = { name: 'Images only', args: { accept: 'image/*' } };
export const LongLabel: Story = {
  name: 'Long label',
  args: { label: 'Drag your barcode image or PDF with the delivery documents here' },
};
export const Narrow: Story = { decorators: [(Story) => <div style={{ width: 180 }}><Story /></div>] };

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', maxWidth: 476 }}>
      <FileDropzone />
      <FileDropzone forceDragOver />
      <FileDropzone disabled />
    </div>
  ),
};
