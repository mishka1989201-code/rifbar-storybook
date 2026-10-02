// Documentation-only components for Foundations/Colors.
// Not exported from the rifbar-ds package.
import type { CSSProperties } from 'react';
import { tokens } from '../tokens/build/tokens.js';

export const FIGMA_COLORS_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=818-307707';

const v = (name: string) => `var(${name})`;
const tokenValue = (name: string) => tokens.find((t) => t.name === name)?.value ?? '—';

const text: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-small)',
  lineHeight: 'var(--font-line-height-small)',
  color: 'var(--color-primary-blue-dark)',
};
const micro: CSSProperties = {
  ...text,
  fontSize: 'var(--font-size-micro)',
  lineHeight: 'var(--font-line-height-micro)',
  color: 'var(--color-grey-dark)',
};

/** One Figma colour variable and the tokens it resolves to in each theme. */
export type ColorSpec = {
  /** Variable name in Figma */
  figma: string;
  light: string;
  /** Dark-theme tokens. Two entries where the dark board splits one variable in two. */
  dark?: { token: string; label?: string }[];
  usage: string;
};

export const colors: ColorSpec[] = [
  { figma: 'White', light: '--color-white', dark: [{ token: '--color-white-dark', label: 'White (Dark)' }, { token: '--color-white-light', label: 'White (Light)' }], usage: 'Cards and surfaces; text on dark fills. In the dark theme surfaces become black and text #BBC7D6.' },
  { figma: 'Primary Blue Dark', light: '--color-primary-blue-dark', dark: [{ token: '--color-primary-blue-dark-light', label: 'Primary Blue Dark (Light)' }, { token: '--color-primary-blue-dark-dark', label: 'Primary Blue Dark (Dark)' }], usage: 'Main dark brand colour: app background, side menu, primary buttons.' },
  { figma: 'Color Text', light: '--color-text', dark: [{ token: '--color-text-dark' }], usage: 'Main body text.' },
  { figma: 'Grey Dark (Not Active menu)', light: '--color-grey-dark', dark: [{ token: '--color-grey-dark' }], usage: 'Inactive menu items, secondary labels, placeholders in form fields.' },
  { figma: 'Not Active', light: '--color-not-active', dark: [{ token: '--color-not-active' }], usage: 'Disabled and inactive elements.' },
  { figma: 'Secondary Grey', light: '--color-secondary-grey', dark: [{ token: '--color-secondary-grey-dark' }], usage: 'Hints and secondary text (decorative — 2.4:1, not for placeholders).' },
  { figma: 'BG Color', light: '--color-bg', dark: [{ token: '--color-bg-dark' }], usage: 'Page background under cards.' },
  { figma: 'Secondary  Light', light: '--color-secondary-light', dark: [{ token: '--color-secondary-light-dark' }], usage: 'Light fills: secondary buttons, selected rows, chips.' },
  { figma: 'Stroke  Light V1', light: '--color-stroke-light-v1', dark: [{ token: '--color-stroke-button-dark' }], usage: 'Faint dividers inside cards and tables.' },
  { figma: 'Stroke  Light V2', light: '--color-stroke-light-v2', dark: [{ token: '--color-stroke-button-dark' }], usage: 'Stronger dividers and card borders.' },
  { figma: 'Stroke  Button', light: '--color-stroke-button', dark: [{ token: '--color-stroke-button-dark' }], usage: 'Borders of buttons.' },
  { figma: 'Stroke Input', light: '--color-stroke-input', dark: [{ token: '--color-stroke-input' }], usage: 'Border of empty form fields (3:1+ contrast). No dark value in Figma yet.' },
  { figma: 'Input field', light: '--color-input-field', dark: [{ token: '--color-input-field' }], usage: 'Text and icons inside input fields.' },
  { figma: 'Headlines', light: '--color-headlines', dark: [{ token: '--color-hover-blue-light' }], usage: 'Headings, links, accent text.' },
  { figma: 'Hover Blue', light: '--color-hover-blue', dark: [{ token: '--color-headlines' }], usage: 'Hover and active state of blue elements.' },
  { figma: 'Hover Blue Light', light: '--color-hover-blue-light', dark: [{ token: '--color-hover-blue-light' }], usage: 'Light hover accent, active sub-tabs.' },
  { figma: 'Violet Icons', light: '--color-violet-icons', dark: [{ token: '--color-violet-icons' }], usage: 'Accent icons.' },
  { figma: 'Blue Light', light: '--color-blue-light', dark: [{ token: '--color-blue-light' }], usage: 'Info status, info icons.' },
  { figma: 'Warning', light: '--color-warning', dark: [{ token: '--color-warning', label: 'Warning (Light)' }, { token: '--color-warning-dark', label: 'Warning (Dark)' }], usage: 'Warning status.' },
  { figma: 'Danger', light: '--color-danger', dark: [{ token: '--color-danger' }], usage: 'Errors, destructive actions.' },
  { figma: 'Green Light', light: '--color-green-light', dark: [{ token: '--color-green-light' }], usage: 'Success status, positive values.' },
  { figma: 'Table Lines BG', light: '--color-table-lines-bg', dark: [{ token: '--color-table-lines-bg' }], usage: 'Highlighted table rows.' },
  { figma: 'Green Dark', light: '--color-green-dark', dark: [{ token: '--color-green-dark' }], usage: 'Success text on light fills.' },
  { figma: 'Success BG', light: '--color-success-bg', dark: [{ token: '--color-success-bg-dark' }], usage: 'Background of success messages.' },
  { figma: 'Info BG', light: '--color-info-bg', dark: [{ token: '--color-info-bg-dark' }], usage: 'Background of info messages.' },
  { figma: 'Warning BG', light: '--color-warning-bg', dark: [{ token: '--color-warning-bg-dark' }], usage: 'Background of warning messages.' },
  { figma: 'Error Bg', light: '--color-error-bg', dark: [{ token: '--color-error-bg-dark' }], usage: 'Background of error messages.' },
  { figma: 'White Gradient BG Card', light: '--color-white-gradient', usage: 'Card background that fades out. Light theme only.' },
  { figma: 'Row Hover', light: '--color-row-hover', dark: [{ token: '--color-primary-blue-dark' }], usage: 'Table row on hover.' },
  { figma: 'Caribbean Green', light: '--color-caribbean-green', usage: 'Chart and tag colour. Light board only.' },
  { figma: 'Dark Orchid', light: '--color-dark-orchid', usage: 'Chart and tag colour. Light board only.' },
  { figma: 'Arylide Yellow', light: '--color-arylide-yellow', usage: 'Chart and tag colour. Light board only.' },
];

export function Swatch({ token, label }: { token: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', minWidth: 0 }}>
      <div
        style={{
          height: 72,
          borderRadius: 8,
          background: v(token),
          boxShadow: 'inset 0 0 0 1px var(--color-stroke-light-v1)',
        }}
      />
      <div>
        <div style={{ ...text, fontWeight: 'var(--font-weight-medium)' as never }}>{label}</div>
        <div style={micro}><code>{token}</code></div>
        <div style={micro}>{token === '--color-white-gradient' ? '#FFFFFF 100% → 83% → 0%' : tokenValue(token)}</div>
      </div>
    </div>
  );
}

const board: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: 'var(--spacing-24) var(--spacing-24)',
  padding: 'var(--spacing-40)',
  background: v('--color-bg'),
  borderRadius: 'var(--radius-lg)',
};

/** Figma board "Colors Light Mode", in the same order. */
export function LightBoard() {
  return (
    <div style={board}>
      {colors.map((c) => <Swatch key={c.light} token={c.light} label={c.figma} />)}
    </div>
  );
}

/** Figma board "Colors Dark Mode", in the same order. */
export function DarkBoard() {
  const swatches = colors.flatMap((c) => (c.dark ?? []).map((d) => ({ token: d.token, label: d.label ?? c.figma })));
  return (
    <div style={board}>
      {swatches.map((s) => <Swatch key={s.label} token={s.token} label={s.label} />)}
    </div>
  );
}

const cell: CSSProperties = { ...text, padding: '8px 12px', borderBottom: '1px solid var(--color-stroke-light-v1)', textAlign: 'left', verticalAlign: 'top' };

function Chip({ token, label }: { token: string; label?: string }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center', whiteSpace: 'nowrap' }}>
      <span style={{ width: 16, height: 16, borderRadius: 4, flexShrink: 0, background: v(token), boxShadow: 'inset 0 0 0 1px var(--color-stroke-button)' }} />
      <span>
        <code style={{ fontSize: 12 }}>{token}</code>
        <span style={{ ...micro, marginLeft: 6 }}>{token === '--color-white-gradient' ? 'gradient' : tokenValue(token)}{label ? ` · ${label}` : ''}</span>
      </span>
    </div>
  );
}

/** Figma variable → token in the light and the dark theme. */
export function ColorTable() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>{['Figma variable', 'Light', 'Dark', 'When to use'].map((h) => <th key={h} style={{ ...cell, fontWeight: 600 }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {colors.map((c) => (
            <tr key={c.light}>
              <td style={{ ...cell, whiteSpace: 'nowrap' }}>{c.figma}</td>
              <td style={cell}><Chip token={c.light} /></td>
              <td style={cell}>
                {c.dark ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                    {c.dark.map((d) => <Chip key={d.token + d.label} token={d.token} label={d.label} />)}
                  </div>
                ) : '—'}
              </td>
              <td style={{ ...cell, minWidth: 220 }}>{c.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
