import type { Meta, StoryObj } from '@storybook/react';
import { ImageCard } from './ImageCard';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=883-338248';

// Demo pictures (drawn, not real products).
const svg = (w: number, h: number, body: string) =>
  'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${body}</svg>`);

const PRODUCT = svg(
  96,
  96,
  '<rect width="96" height="96" fill="#fff"/>' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2B2B2B"/><stop offset=".45" stop-color="#C8742F"/><stop offset="1" stop-color="#F2A65A"/></linearGradient></defs>' +
    '<rect x="30" y="16" width="36" height="66" rx="6" fill="url(#g)"/><rect x="40" y="8" width="16" height="10" rx="3" fill="#1E1E1E"/>' +
    '<path d="M42 30l10-6v8l-10 6z" fill="#fff" opacity=".85"/>',
);

const WIDE = svg(
  200,
  80,
  '<rect width="200" height="80" fill="#fff"/>' +
    '<rect x="8" y="22" width="56" height="36" rx="4" fill="#6368DF"/><rect x="72" y="22" width="56" height="36" rx="4" fill="#1FD246"/><rect x="136" y="22" width="56" height="36" rx="4" fill="#F68F57"/>',
);

const meta = {
  title: 'Atoms/ImageCard',
  component: ImageCard,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'canvas' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  args: { src: PRODUCT, alt: 'Disposable vape, Amber' },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['md', 'sm'],
      description: 'Figma `Property 1`: Middle (64px) / Small (32px)',
      table: { defaultValue: { summary: 'md' } },
    },
    fit: {
      control: 'inline-radio',
      options: ['cover', 'contain'],
      description: '`cover` crops to fill (Figma), `contain` shows the whole photo',
      table: { defaultValue: { summary: 'cover' } },
    },
    src: { control: 'text', description: 'Photo URL' },
    alt: { control: 'text', description: 'What the photo shows; empty = decorative' },
  },
} satisfies Meta<typeof ImageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT ─────────────────────────────────────────────────────────────────
export const Default: Story = {};

// ─── VARIANTS (Figma Property 1) ─────────────────────────────────────────────
export const Middle: Story = { args: { size: 'md' } };
export const Small: Story = { args: { size: 'sm' } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <ImageCard {...args} size="md" />
      <ImageCard {...args} size="sm" />
    </div>
  ),
};

// ─── EMPTY / ERROR ───────────────────────────────────────────────────────────
export const NoPhoto: Story = {
  name: 'No photo (empty)',
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <ImageCard {...args} src={undefined} size="md" />
      <ImageCard {...args} src={undefined} size="sm" />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Not designed in Figma. Without `src` a grey `image` icon is shown in the same frame.' } },
  },
};

export const BrokenPhoto: Story = {
  name: 'Photo failed to load (error)',
  args: { src: 'https://invalid.example/missing.png' },
  parameters: { docs: { description: { story: 'If the photo cannot load, the same placeholder as “No photo” is shown.' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const WidePhoto: Story = {
  name: 'Wide photo: cover vs contain',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <ImageCard src={WIDE} alt="Three colors, cropped" fit="cover" />
      <ImageCard src={WIDE} alt="Three colors, whole" fit="contain" />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Left — `cover` (Figma): fills the square, edges cut. Right — `contain`: whole photo, white around it.' } },
  },
};

// ─── IN CONTEXT: product list row ────────────────────────────────────────────
const ROWS = [
  { name: 'Disposable vape, Amber', sku: 'RB-1042', src: PRODUCT },
  { name: 'Color set, 3 pcs', sku: 'RB-2210', src: WIDE },
  { name: 'New product (photo coming)', sku: 'RB-3001', src: undefined },
];

export const InList: Story = {
  name: 'Example: product list',
  render: () => (
    <div style={{ width: 320, display: 'grid', gap: 8, fontFamily: 'var(--font-family-base)' }}>
      {ROWS.map((r) => (
        <div
          key={r.sku}
          style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, background: 'var(--color-white)', borderRadius: 6 }}
        >
          <ImageCard src={r.src} alt="" size="sm" />
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text)' }}>{r.name}</div>
            <div style={{ fontSize: 10, color: 'var(--color-grey-dark)' }}>{r.sku}</div>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Name is written next to the photo, so `alt=""` (decorative) — screen readers do not read it twice.' } },
  },
};

// ─── DARK THEME ──────────────────────────────────────────────────────────────
export const DarkTheme: Story = {
  name: 'Dark theme',
  render: (args) => (
    <div data-theme="dark" style={{ display: 'flex', alignItems: 'center', gap: 20, padding: 24, background: 'var(--color-bg-dark)' }}>
      <ImageCard {...args} />
      <ImageCard {...args} size="sm" />
      <ImageCard {...args} src={undefined} />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Figma "Dark Atoms Components" → Table Image: the frame stays white (photos are shot on white); the stroke becomes `#242424`.' } },
  },
};
