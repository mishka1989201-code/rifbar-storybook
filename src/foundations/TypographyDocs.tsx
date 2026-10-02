// Documentation-only components for Foundations/Typography.
// Not exported from the rifbar-ds package.
import type { CSSProperties } from 'react';
import { tokens } from '../tokens/build/tokens.js';

export const FIGMA_TYPOGRAPHY_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=818-307709';

const tokenValue = (name: string) => tokens.find((t) => t.name === name)?.value ?? '—';
const px = (name: string) => tokenValue(name).replace('px', '');

const LOREM =
  'In ultricies fermentum aliquet. Pellentesque dui magna, condimentum non ullamcorper at, cursus in sem. Nunc condimentum, purus ac sagittis ultricies, metus leo pharetra mi, non vehicula felis elit et nisi. Etiam venenatis commodo libero, vel ullamcorper nibh lobortis vel.';

const meta: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-mini)',
  lineHeight: 'var(--font-line-height-mini)',
  color: 'var(--color-grey-dark)',
};
const sectionTitle: CSSProperties = {
  margin: 0,
  color: 'var(--color-primary-blue-dark)',
};

export type Weight = { name: string; figma: string; className: string; token: string; levels: number };

export const weights: Weight[] = [
  { name: 'Light', figma: 'Light Headings', className: 'ds-light', token: '--font-weight-light', levels: 7 },
  { name: 'Medium', figma: 'Medium Headings', className: 'ds-medium', token: '--font-weight-medium', levels: 7 },
  { name: 'Semi-Bold', figma: 'Semi-Bold Headings', className: 'ds-semibold', token: '--font-weight-semibold', levels: 7 },
  { name: 'Bold', figma: 'Bold Headings', className: 'ds-bold', token: '--font-weight-bold', levels: 6 },
  { name: 'Extra-Bold', figma: 'Extra-Bold Headings', className: 'ds-extrabold', token: '--font-weight-extrabold', levels: 6 },
];

/** One "<weight> Headings" section of the Figma board. */
export function HeadingScale({ weight }: { weight: Weight }) {
  const levels = Array.from({ length: weight.levels }, (_, i) => i + 1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', color: 'var(--color-text)' }}>
      {levels.map((n) => (
        <div
          key={n}
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 140px', gap: 'var(--spacing-24)', alignItems: 'baseline' }}
        >
          <div className={`ds-h${n} ${weight.className}`} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            h{n}. Heading Title
          </div>
          <div style={meta}>
            {px(`--font-size-h${n}`)}/{px(`--font-line-height-h${n}`)} · {tokenValue(weight.token)}
            <br />
            <code>.ds-h{n}.{weight.className}</code>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AllHeadings() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-48)' }}>
      {weights.map((w) => (
        <section key={w.name} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
          <h3 className="ds-h4 ds-semibold" style={sectionTitle}>{w.figma}</h3>
          <HeadingScale weight={w} />
        </section>
      ))}
    </div>
  );
}

export type BodyStyle = { figma: string; className: string; size: string; lineHeight: string; weight: string };

export const bodyStyles: BodyStyle[] = [
  { figma: 'Body/Standart', className: 'ds-body-standard', size: '--font-size-standard', lineHeight: '--font-line-height-standard', weight: '--font-weight-regular' },
  { figma: 'Body/Small Regular', className: 'ds-body-small', size: '--font-size-small', lineHeight: '--font-line-height-small', weight: '--font-weight-regular' },
  { figma: 'Body/Small Medium', className: 'ds-body-small ds-medium', size: '--font-size-small', lineHeight: '--font-line-height-small', weight: '--font-weight-medium' },
  { figma: 'Body/Mini Regular', className: 'ds-body-mini', size: '--font-size-mini', lineHeight: '--font-line-height-mini', weight: '--font-weight-regular' },
  { figma: 'Body/Mini Meduim', className: 'ds-body-mini ds-medium', size: '--font-size-mini', lineHeight: '--font-line-height-mini', weight: '--font-weight-medium' },
  { figma: 'Body/Mini Semi-Bold', className: 'ds-body-mini ds-semibold', size: '--font-size-mini', lineHeight: '--font-line-height-mini', weight: '--font-weight-semibold' },
  { figma: 'Body/Button Big', className: 'ds-button-big', size: '--font-size-button-big', lineHeight: '--font-line-height-button-big', weight: '--font-weight-medium' },
  { figma: 'Body/Micro Medium', className: 'ds-body-micro', size: '--font-size-micro', lineHeight: '--font-line-height-micro', weight: '--font-weight-medium' },
  { figma: 'Body/Micro Semi-Bold', className: 'ds-body-micro ds-semibold', size: '--font-size-micro', lineHeight: '--font-line-height-micro', weight: '--font-weight-semibold' },
];

export function BodyText() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-32)', maxWidth: 1110 }}>
      {bodyStyles.map((s) => (
        <section key={s.figma} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
          <div style={{ display: 'flex', gap: 'var(--spacing-16)', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <span className="ds-h6 ds-semibold" style={{ color: 'var(--color-primary-blue-dark)' }}>{s.figma}</span>
            <span style={meta}>
              {px(s.size)}/{px(s.lineHeight)} · {tokenValue(s.weight)} · <code>.{s.className.split(' ').join('.')}</code>
            </span>
          </div>
          <p className={s.className} style={{ margin: 0, color: 'var(--color-text)' }}>{LOREM}</p>
        </section>
      ))}
    </div>
  );
}

const cell: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-small)',
  lineHeight: 'var(--font-line-height-small)',
  color: 'var(--color-primary-blue-dark)',
  padding: '8px 12px',
  borderBottom: '1px solid var(--color-stroke-light-v1)',
  textAlign: 'left',
  verticalAlign: 'top',
  whiteSpace: 'nowrap',
};

/** Figma text style → CSS class → tokens. */
export function TypographyTable() {
  const rows = [
    ...[1, 2, 3, 4, 5, 6, 7].map((n) => ({
      figma: `<Weight> Headings/h${n}`,
      className: `ds-h${n} + weight class`,
      size: `--font-size-h${n}`,
      lineHeight: `--font-line-height-h${n}`,
      weight: 'see weights below',
    })),
    ...bodyStyles.map((s) => ({ figma: s.figma, className: s.className, size: s.size, lineHeight: s.lineHeight, weight: s.weight })),
  ];
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>{['Figma text style', 'CSS class', 'Size', 'Line height', 'Weight'].map((h) => <th key={h} style={{ ...cell, fontWeight: 600 }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.figma}>
              <td style={cell}>{r.figma}</td>
              <td style={cell}><code style={{ fontSize: 12 }}>{r.className}</code></td>
              <td style={cell}><code style={{ fontSize: 12 }}>{r.size}</code> {tokenValue(r.size)}</td>
              <td style={cell}><code style={{ fontSize: 12 }}>{r.lineHeight}</code> {tokenValue(r.lineHeight)}</td>
              <td style={cell}>{r.weight.startsWith('--') ? <><code style={{ fontSize: 12 }}>{r.weight}</code> {tokenValue(r.weight)}</> : r.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table style={{ borderCollapse: 'collapse', marginTop: 24 }}>
        <thead>
          <tr>{['Weight', 'Figma group', 'Class', 'Token'].map((h) => <th key={h} style={{ ...cell, fontWeight: 600 }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {weights.map((w) => (
            <tr key={w.name}>
              <td style={{ ...cell, fontWeight: tokenValue(w.token) as never }}>{w.name}</td>
              <td style={cell}>{w.figma}</td>
              <td style={cell}><code style={{ fontSize: 12 }}>.{w.className}</code></td>
              <td style={cell}><code style={{ fontSize: 12 }}>{w.token}</code> {tokenValue(w.token)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
