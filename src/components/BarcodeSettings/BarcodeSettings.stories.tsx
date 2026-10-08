import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BarcodeSettings } from './BarcodeSettings';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=7064-74791';

/** A drawn stand-in for the barcode picture (the Figma asset is a raster image). */
const BARCODE_BARS = [2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1];
const BARCODE_IMAGE = (() => {
  let x = 10;
  let rects = '';
  BARCODE_BARS.forEach((w, i) => {
    if (i % 2 === 0) rects += `<rect x="${x}" y="8" width="${w * 3}" height="70" fill="black"/>`;
    x += w * 3;
  });
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${x + 10} 96"><rect width="100%" height="100%" fill="white"/>${rects}<text x="10" y="92" font-size="10" font-family="monospace">7 50015 00000 6</text></svg>`,
  )}`;
})();

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
