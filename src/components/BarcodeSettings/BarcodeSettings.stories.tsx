import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BarcodeSettings } from './BarcodeSettings';
import BARCODE_IMAGE from '../../assets/demo/barcode.png';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=7064-74791';

/** A drawn stand-in for the barcode picture (the Figma asset is a raster image). */
const meta = {
  title: 'Molecules/BarcodeSettings',
  component: BarcodeSettings,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { mode: 'generate' },
  argTypes: {
    mode: { control: 'inline-radio', options: ['generate', 'upload', 'preview'] },
    value: { control: 'text' },
    canSubmit: { control: 'boolean' },
    title: { control: 'text' },
    submitLabel: { control: 'text' },
    clearLabel: { control: 'text' },
    image: { control: 'text' },
    onChange: { action: 'change' },
    onSubmit: { action: 'submit' },
    onClear: { action: 'clear' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 508 }}><Story /></div>],
} satisfies Meta<typeof BarcodeSettings>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Information1 — Generate) ────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Upload: Story = { name: 'Upload (Information2)', args: { mode: 'upload' } };
export const Preview: Story = { name: 'Preview (Information3)', args: { mode: 'preview', image: BARCODE_IMAGE, imageAlt: 'Barcode 7 50015 00000 6' } };

// ─── STATES ──────────────────────────────────────────────────────────────────
export const GenerateFilled: Story = { name: 'Generate / filled (button enabled)', args: { defaultValue: '750015000006' } };
export const UploadReady: Story = { name: 'Upload / file chosen (button enabled)', args: { mode: 'upload', canSubmit: true } };

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const PreviewEmpty: Story = { name: 'Preview / no image', args: { mode: 'preview' } };
export const LongText: Story = {
  name: 'Generate / long text',
  args: { defaultValue: 'A very long text to encode into a barcode that does not fit on one line of the field and has to wrap' },
};
export const Narrow: Story = {
  decorators: [(Story) => <div style={{ width: 260 }}><Story /></div>],
};

export const Interactive: Story = {
  render: () => {
    const [text, setText] = useState('');
    return <BarcodeSettings value={text} onChange={setText} />;
  },
};

// ─── ALL VARIANTS (Figma card: three panels in a column) ─────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <BarcodeSettings mode="generate" />
      <BarcodeSettings mode="upload" />
      <BarcodeSettings mode="preview" image={BARCODE_IMAGE} />
    </div>
  ),
};

/** Figma "Dark Molecules Components" → Information 1 / 3 / 4 Dark. Forces the dark theme for this story; the toolbar theme switch does the same for every story. */
export const AllVariantsDark: Story = {
  ...AllVariants,
  name: 'All variants (dark theme)',
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'var(--color-white-dark)', padding: 16, margin: -16, width: 'max-content', minWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
