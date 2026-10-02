// Documentation-only components for Foundations/Responsive. Not exported from the rifbar-ds package.
// Reproduces the Figma "Responsive design screens template" frames (Light 6979:21249, Dark 6979:21252).
import type { CSSProperties } from 'react';
import { tokens } from '../tokens/build/tokens.js';
import { useWidth } from './GridDocs';

export const FIGMA_RESPONSIVE_LIGHT_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=6979-21249';
export const FIGMA_RESPONSIVE_DARK_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=6979-21252';

export type Theme = 'light' | 'dark';

/** Template screen sizes from Figma, widest first. */
export const templates = [
  { width: 1920, height: 1080, label: 'Large computers', sidebar: 'desktop-lg' },
  { width: 1440, height: 1024, label: 'Standard computers', sidebar: 'desktop' },
  { width: 1280, height: 832, label: 'Small computers', sidebar: null },
  { width: 1024, height: 1366, label: 'Large tablets', sidebar: null },
  { width: 768, height: 1024, label: 'Small tablets', sidebar: null },
  { width: 480, height: 1024, label: 'Small mobiles', sidebar: null },
  { width: 360, height: 800, label: 'Very small mobiles', sidebar: null },
] as const;

/** Side menu density: 1920px is roomy, 1440px is compact. Values are spacing/size tokens. */
export const navDensity = {
  'desktop-lg': {
    width: '--layout-sidebar-desktop-lg',
    inset: '--spacing-32',
    paddingBottom: '--spacing-32',
    logoGap: '--spacing-32',
    burgerGap: '--spacing-24',
    logoWidth: '--size-logo-desktop-lg-width',
    logoHeight: '--size-logo-desktop-lg-height',
    subtabIndent: '--spacing-56',
  },
  desktop: {
    width: '--layout-sidebar-desktop',
    inset: '--spacing-16',
    paddingBottom: '--spacing-16',
    logoGap: '--spacing-16',
    burgerGap: '--spacing-16',
    logoWidth: '--size-logo-desktop-width',
    logoHeight: '--size-logo-desktop-height',
    subtabIndent: '--spacing-40',
  },
} as const;

const v = (name: string) => `var(${name})`;
const tokenValue = (name: string) => tokens.find((t) => t.name === name)?.value ?? '—';

const body = (weight: 'regular' | 'medium'): CSSProperties => ({
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-small)',
  lineHeight: 'var(--font-line-height-small)',
  fontWeight: v(`--font-weight-${weight}`) as never,
  whiteSpace: 'nowrap',
});

/** 16px icon placeholder — real icons arrive with the Navbar component. */
const IconStub = () => (
  <span style={{ width: 'var(--size-icon)', height: 'var(--size-icon)', borderRadius: 3, background: 'currentColor', opacity: 0.7, flex: 'none' }} />
);

function Burger() {
  const bar: CSSProperties = { height: 2, borderRadius: 1, background: 'var(--theme-nav-text-active)' };
  return (
    <span style={{ width: 'var(--size-icon-lg)', height: 'var(--size-icon-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5, padding: '0 3px', boxSizing: 'border-box', flex: 'none' }}>
      <span style={bar} />
      <span style={bar} />
      <span style={bar} />
    </span>
  );
}

const tabs = ['Clients', 'Online Shop', 'Contact Us', 'Orders'];
const tabsAfter = ['Product Settings', 'Tickets', 'All notes', 'Emails', 'Groups'];
const subtabs = ['Warehouse / POS', 'Legal', 'Finance'];

/** Side menu as drawn in the templates (navbar on). */
function SideMenu({ density }: { density: keyof typeof navDensity }) {
  const d = navDensity[density];
  const tab: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-8)',
    height: 'var(--size-nav-tab)',
    paddingLeft: v(d.inset),
    paddingRight: v(d.inset),
    color: 'var(--theme-nav-text)',
    ...body('regular'),
  };
  return (
    <div
      style={{
        position: 'absolute',
        inset: '0 auto 0 0',
        width: v(d.width),
        background: 'var(--theme-app-bg)',
        paddingTop: 'var(--spacing-16)',
        paddingBottom: v(d.paddingBottom),
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: v(d.logoGap) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: v(d.burgerGap), paddingLeft: v(d.inset) }}>
          <Burger />
          <span
            style={{
              width: v(d.logoWidth),
              height: v(d.logoHeight),
              display: 'flex',
              alignItems: 'center',
              color: 'var(--theme-nav-text-active)',
              ...body('medium'),
              fontSize: 22,
              letterSpacing: '0.45em',
            }}
          >
            RIFBAR
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
          {tabs.map((t) => (
            <div key={t} style={tab}><IconStub />{t}</div>
          ))}
          <div style={{ ...tab, background: 'var(--theme-nav-tab-active-bg)', color: 'var(--theme-nav-text-active)', ...body('medium') }}>
            <IconStub />Reports &amp; Analytics
          </div>
          {subtabs.map((t, i) => (
            <div
              key={t}
              style={{
                paddingLeft: v(d.subtabIndent),
                ...body(i === 0 ? 'medium' : 'regular'),
                color: i === 0 ? 'var(--theme-nav-subtab-active)' : 'var(--theme-nav-text)',
              }}
            >
              {t}
            </div>
          ))}
          {tabsAfter.map((t) => (
            <div key={t} style={tab}><IconStub />{t}</div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', height: 'var(--spacing-48)', paddingLeft: v(d.inset), color: 'var(--theme-nav-text-active)', ...body('medium') }}>
        <span
          style={{
            width: 'var(--size-avatar)',
            height: 'var(--size-avatar)',
            borderRadius: '50%',
            boxShadow: 'var(--theme-avatar-shadow), inset 0 0 0 1px var(--theme-nav-tab-active-bg)',
            display: 'grid',
            placeItems: 'center',
            ...body('regular'),
          }}
        >
          JC
        </span>
        Jennifer Corbett
      </div>
    </div>
  );
}

export type ScreenTemplateProps = {
  width: (typeof templates)[number]['width'];
  theme: Theme;
  /** Max height of the preview in px; the frame is scaled to fit. */
  maxHeight?: number;
};

/** Scaled Figma template screen in the chosen theme. */
export function ScreenTemplate({ width, theme, maxHeight = 420 }: ScreenTemplateProps) {
  const t = templates.find((x) => x.width === width) ?? templates[0];
  const [ref, boxWidth] = useWidth();
  const scale = boxWidth ? Math.min(boxWidth / t.width, maxHeight / t.height) : 0;
  return (
    <div ref={ref} style={{ width: '100%' }}>
      <div style={{ width: t.width * scale, height: t.height * scale, overflow: 'hidden', borderRadius: 'var(--radius-sm)' }}>
        <div
          data-theme={theme}
          style={{ position: 'relative', width: t.width, height: t.height, transform: `scale(${scale})`, transformOrigin: '0 0', background: 'var(--theme-app-bg)' }}
        >
          {t.sidebar && <SideMenu density={t.sidebar} />}
        </div>
      </div>
      <div style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-micro)', lineHeight: 'var(--font-line-height-micro)', color: 'var(--color-grey-dark)', marginTop: 'var(--spacing-4)' }}>
        {t.width}×{t.height} · {t.sidebar ? 'side menu visible' : 'side menu behind the burger'}
      </div>
    </div>
  );
}

/** All seven templates in a row, as on the Figma board. */
export function TemplateRow({ theme }: { theme: Theme }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-16)', alignItems: 'flex-start', overflowX: 'auto', paddingBottom: 'var(--spacing-8)' }}>
      {templates.map((t) => (
        <div key={t.width} style={{ flex: 'none', width: Math.round((t.width / t.height) * 220) }}>
          <ScreenTemplate width={t.width} theme={theme} maxHeight={220} />
        </div>
      ))}
    </div>
  );
}

/* ---------- Tables ---------- */

const cell: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-small)',
  lineHeight: 'var(--font-line-height-small)',
  color: 'var(--color-primary-blue-dark)',
  padding: '8px 12px',
  borderBottom: '1px solid var(--color-stroke-light-v1)',
  textAlign: 'left',
  verticalAlign: 'middle',
};

function Swatch({ color }: { color: string }) {
  return <span style={{ display: 'inline-block', width: 24, height: 24, borderRadius: 4, background: color, boxShadow: 'inset 0 0 0 1px #0002', verticalAlign: 'middle', marginRight: 8 }} />;
}

/** Light vs dark value of every themed token. */
export function ThemeTable() {
  const rows = tokens.filter((t) => t.dark !== undefined);
  const value = (raw: string, refName?: string) => (
    <span style={{ whiteSpace: 'nowrap' }}>
      {raw.startsWith('#') || raw.startsWith('rgb') ? <Swatch color={raw} /> : null}
      <code>{raw}</code>
      {refName && <code style={{ fontSize: 11, color: 'var(--color-grey-dark)' }}> {refName}</code>}
    </span>
  );
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>{['Token', 'Light', 'Dark', 'Source'].map((h) => <th key={h} style={{ ...cell, fontWeight: 600 }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.name}>
              <td style={{ ...cell, whiteSpace: 'nowrap' }}><code>{t.name}</code></td>
              <td style={cell}>{value(t.value, t.ref)}</td>
              <td style={cell}>{value(t.dark!, t.darkRef)}</td>
              <td style={cell}>{t.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** What changes in the side menu between 1920px and 1440px. */
export function NavDensityTable() {
  const rows: [string, keyof (typeof navDensity)['desktop']][] = [
    ['Side menu width', 'width'],
    ['Side inset (logo, tabs, user)', 'inset'],
    ['Bottom padding', 'paddingBottom'],
    ['Gap logo → tabs', 'logoGap'],
    ['Gap burger → logo', 'burgerGap'],
    ['Logo width', 'logoWidth'],
    ['Logo height', 'logoHeight'],
    ['Sub-tab indent', 'subtabIndent'],
  ];
  const tok = (name: string) => (
    <span style={{ whiteSpace: 'nowrap' }}>
      <b>{tokenValue(name)}</b> <code style={{ fontSize: 11, color: 'var(--color-grey-dark)' }}>{name}</code>
    </span>
  );
  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>{['', '1920px', '1440px'].map((h) => <th key={h} style={{ ...cell, fontWeight: 600 }}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map(([label, key]) => (
          <tr key={key}>
            <td style={{ ...cell, color: 'var(--color-grey-dark)' }}>{label}</td>
            <td style={cell}>{tok(navDensity['desktop-lg'][key])}</td>
            <td style={cell}>{tok(navDensity.desktop[key])}</td>
          </tr>
        ))}
        <tr>
          <td style={{ ...cell, color: 'var(--color-grey-dark)' }}>Same on both</td>
          <td style={cell} colSpan={2}>
            top padding {tok('--spacing-16')} · tab height {tok('--size-nav-tab')} · gap between tabs {tok('--spacing-8')} ·
            icon {tok('--size-icon')} · user block {tok('--spacing-48')}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
