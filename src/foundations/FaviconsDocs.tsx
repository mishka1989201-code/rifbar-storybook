// Documentation-only components for Foundations/Favicons.
// Not exported from the rifbar-ds package.
import type { CSSProperties } from 'react';
import { LOGO_SIGN } from '../components/Logo/Logo';

export const FIGMA_FAVICONS_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3644-633411';

const text: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-small)',
  lineHeight: 'var(--font-line-height-small)',
  color: 'var(--color-text)',
};

// The Figma template `v2`: 310×311, the sign is 263px tall, 24px from the top, centred.
const VIEW_W = 310;
const VIEW_H = 311;
const SIGN_SCALE = 263 / 46;
const SIGN_X = (VIEW_W - 33.9 * SIGN_SCALE) / 2;

/** The Rifbar app icon: the white sign on the brand gradient. Scales with `size` (px). */
export function AppIcon({ size, label = '' }: { size: number; label?: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        flex: 'none',
        borderRadius: 'var(--radius-app-icon)',
        background: 'var(--gradient-button-menu-active)',
        overflow: 'hidden',
      }}
    >
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} width="100%" height="100%" role={label ? 'img' : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true}>
        <path d={LOGO_SIGN} fill="var(--color-white)" fillRule="evenodd" transform={`translate(${SIGN_X} 24) scale(${SIGN_SCALE})`} />
      </svg>
    </div>
  );
}

/** Names and sizes of the exports in the Figma `Favicons` board (the board repeats some of them). */
export const FAVICONS: { name: string; size: number; use: string }[] = [
  { name: 'favicon', size: 500, use: 'Master export' },
  { name: 'android-icon-192x192', size: 192, use: 'Android home screen, manifest' },
  { name: 'android-icon-96x96', size: 96, use: 'Android' },
  { name: 'android-icon-72x72', size: 72, use: 'Android' },
  { name: 'android-icon-48x48', size: 48, use: 'Android' },
  { name: 'android-icon-36x36', size: 36, use: 'Android' },
  { name: 'apple-icon-180x180', size: 180, use: 'iPhone Retina (apple-touch-icon)' },
  { name: 'apple-icon-152x152', size: 152, use: 'iPad Retina' },
  { name: 'apple-icon-120x120', size: 120, use: 'iPhone' },
  { name: 'apple-icon-114x114', size: 114, use: 'iPhone Retina (old)' },
  { name: 'apple-icon-76x76', size: 76, use: 'iPad' },
  { name: 'apple-icon-60x60', size: 60, use: 'iPhone (old)' },
  { name: 'apple-icon-57x57', size: 57, use: 'iPhone (oldest)' },
  { name: 'ms-icon-150x150', size: 150, use: 'Windows tile (medium)' },
  { name: 'ms-icon-144x144', size: 144, use: 'Windows tile, browserconfig' },
  { name: 'ms-icon-70x70', size: 70, use: 'Windows tile (small)' },
  { name: 'favicon-32x32', size: 32, use: 'Browser tab' },
  { name: 'favicon-16x16', size: 16, use: 'Browser tab' },
];

export function FaviconTemplate() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-24)', alignItems: 'flex-end', ...text }}>
      <AppIcon size={310} label="Rifbar app icon" />
      <div>
        <p style={{ margin: 0 }}>Template <b>v2</b>: 310×311, white sign 263px tall on the brand gradient.</p>
        <p style={{ margin: 0, color: 'var(--color-secondary-grey)' }}>Gradient <code>--gradient-button-menu-active</code> · radius <code>--radius-app-icon</code></p>
      </div>
    </div>
  );
}

export function FaviconResolutions() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--spacing-16)', ...text }}>
      {FAVICONS.map(({ name, size, use }) => (
        <div key={name} style={{ display: 'flex', gap: 'var(--spacing-12)', alignItems: 'center' }}>
          <div style={{ width: 120, display: 'flex', justifyContent: 'center', flex: 'none' }}>
            <AppIcon size={Math.min(size, 120)} />
          </div>
          <div>
            <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>{name}</div>
            <div>{size}×{size}px</div>
            <div style={{ color: 'var(--color-secondary-grey)' }}>{use}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
