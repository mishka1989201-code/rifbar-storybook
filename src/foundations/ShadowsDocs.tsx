// Documentation-only components for Foundations/Shadows.
// Not exported from the rifbar-ds package.
import type { CSSProperties } from 'react';
import { tokens } from '../tokens/build/tokens.js';

export const FIGMA_SHADOWS_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=818-307704';

const v = (name: string) => `var(${name})`;
const tokenValue = (name: string) => tokens.find((t) => t.name === name)?.value ?? '—';

const text: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-small)',
  lineHeight: 'var(--font-line-height-small)',
};

export type ShadowSpec = {
  token: string;
  /** Name of the effect style in Figma */
  figma: string;
  usage: string;
  /** Adds the 1px Headlines stroke that Figma draws together with the shadow */
  border?: boolean;
  /** Sample fill instead of white (No shadow is grey in Figma so the tile is visible) */
  fill?: string;
};

export const shadows: ShadowSpec[] = [
  { token: '--shadow-none', figma: 'No shadow', usage: 'Flat blocks inside a card; fill or stroke separates them instead of a shadow.', fill: '--color-gray-200' },
  { token: '--shadow-header', figma: 'Header Shadow', usage: 'Page header and other bars fixed to the top: the shadow goes up and to the sides.' },
  { token: '--shadow-card', figma: 'Cards shadow', usage: 'Cards and blocks lying on the page background.' },
  { token: '--shadow-table-row', figma: 'Table shadow', usage: 'Table and its rows, a light lift from the background.' },
  { token: '--shadow-tooltip', figma: 'Tooltip shadow', usage: 'Tooltips, drop-downs, pop-overs — elements above the content.' },
  { token: '--shadow-focus', figma: 'Focus or pressed', usage: 'Glow around a focused or pressed control.' },
  { token: '--shadow-dark-1', figma: 'Dark Mode Shadow 1', usage: 'Cards in the dark theme; also used in light mockups.' },
  { token: '--shadow-hover-card-lg', figma: 'Hover Large Cards', usage: 'Hover state of large cards.' },
  { token: '--shadow-hover-card-sm', figma: 'Hover Small Cards', usage: 'Hover state of small cards, always with the 1px stroke --theme-card-hover-border.', border: true },
  { token: '--shadow-dark-2', figma: 'Dark Mode Shadow 2', usage: 'Dark theme only: a soft light edge that lifts dark blocks off a dark background.' },
];

const byToken = (token: string) => shadows.find((s) => s.token === token)!;

export function ShadowTile({ spec, theme = 'light' }: { spec: ShadowSpec; theme?: 'light' | 'dark' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', width: 136 }}>
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 4,
          boxSizing: 'border-box',
          background: v(spec.fill ?? (theme === 'dark' ? '--color-primary-blue-dark-dark' : '--color-white')),
          boxShadow: v(spec.token),
          border: spec.border ? `var(--border-width-sm) solid var(--theme-card-hover-border)` : undefined,
        }}
      />
      <div style={{ ...text, fontWeight: 'var(--font-weight-medium)' as never, color: theme === 'dark' ? v('--color-white') : v('--color-primary-blue-dark') }}>
        {spec.figma}
        <div style={{ fontSize: 'var(--font-size-micro)', lineHeight: 'var(--font-line-height-micro)', fontWeight: 'var(--font-weight-regular)' as never, opacity: 0.7 }}>
          <code>{spec.token}</code>
        </div>
      </div>
    </div>
  );
}

const board = (bg: string): CSSProperties => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing-48) var(--spacing-40)',
  padding: 'var(--spacing-48)',
  background: v(bg),
  borderRadius: 'var(--radius-lg)',
});

/** Figma board "Shadows Light". */
export function LightBoard() {
  const order = ['--shadow-none', '--shadow-header', '--shadow-card', '--shadow-table-row', '--shadow-tooltip', '--shadow-focus', '--shadow-dark-1', '--shadow-hover-card-lg', '--shadow-hover-card-sm'];
  return (
    <div data-theme="light" style={board('--color-bg')}>
      {order.map((t) => <ShadowTile key={t} spec={byToken(t)} />)}
    </div>
  );
}

/** Figma board "Shadows Dark". */
export function DarkBoard() {
  const order = ['--shadow-dark-1', '--shadow-dark-2', '--shadow-hover-card-sm'];
  return (
    <div data-theme="dark" style={board('--color-stroke-button-dark')}>
      {order.map((t) => <ShadowTile key={t} spec={byToken(t)} theme="dark" />)}
    </div>
  );
}

const cell: CSSProperties = { ...text, color: 'var(--color-primary-blue-dark)', padding: '8px 12px', borderBottom: '1px solid var(--color-stroke-light-v1)', textAlign: 'left', verticalAlign: 'top' };

/** Token, Figma style, value and when to use it. */
export function ShadowTable() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>{['Figma style', 'Token', 'When to use', 'Value'].map((h) => <th key={h} style={{ ...cell, fontWeight: 600 }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {shadows.map((s) => (
            <tr key={s.token}>
              <td style={{ ...cell, whiteSpace: 'nowrap' }}>{s.figma}</td>
              <td style={{ ...cell, whiteSpace: 'nowrap' }}><code>{s.token}</code></td>
              <td style={{ ...cell, minWidth: 240 }}>{s.usage}</td>
              <td style={{ ...cell, fontSize: 12 }}><code>{tokenValue(s.token)}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
