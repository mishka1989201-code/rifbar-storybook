// Documentation-only components for Foundations/Grid and Foundations/Spacing.
// Not exported from the rifbar-ds package.
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { tokens } from '../tokens/build/tokens.js';
import { gridSpecs, getGridSpec, type GridSpec } from './grid-spec';

const v = (name: string) => `var(${name})`;
const tokenValue = (name: string) => tokens.find((t) => t.name === name)?.value ?? '—';

const text: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-small)',
  lineHeight: 'var(--font-line-height-small)',
  color: 'var(--color-primary-blue-dark)',
};

/* ---------- Grid preview ---------- */

export type GridPreviewProps = {
  breakpoint: string;
  navbar: 'on' | 'off';
  orientation?: 'portrait' | 'landscape';
  /** Max height of the preview box in px; the frame is scaled to fit. */
  maxHeight?: number;
};

export function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

/** Scaled 1:1 reproduction of a Figma "Grid layouts" frame, built from tokens. */
export function GridPreview({ breakpoint, navbar, orientation = 'portrait', maxHeight = 360 }: GridPreviewProps) {
  const spec = getGridSpec(breakpoint);
  const land = orientation === 'landscape' && spec.landscape;
  const frame = land ? spec.landscape!.frame : spec.frame;
  const columns = land ? spec.landscape!.columns : spec.columns;
  const [ref, boxWidth] = useWidth();
  const scale = boxWidth ? Math.min(boxWidth / frame.width, maxHeight / frame.height) : 0;

  const sb = spec.sidebar;
  const on = navbar === 'on';
  const push = sb.mode === 'push';
  const sidebarWidth = push ? (on ? sb.on : sb.off) : sb.on;
  const sidebarContent = push ? (on ? sb.contentOn : sb.contentOff) : sb.contentOn;
  const showSidebar = push || on;

  const col: CSSProperties = { background: v('--grid-overlay-column'), height: '100%' };
  const columnCount = Number(tokenValue(columns));

  return (
    <div ref={ref} style={{ width: '100%' }}>
      <div
        style={{
          width: frame.width * scale,
          height: frame.height * scale,
          overflow: 'hidden',
          boxShadow: 'inset 0 0 0 1px var(--color-stroke-button)',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: frame.width,
            height: frame.height,
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
            background: 'var(--color-white)',
          }}
        >
          {/* Columns */}
          {spec.alignment === 'right' ? (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                left: v(sidebarWidth),
                display: 'flex',
                justifyContent: 'flex-end',
                gap: v('--grid-gutter'),
                paddingRight: v(spec.margin),
              }}
            >
              {Array.from({ length: columnCount }, (_, i) => (
                <div key={i} style={{ ...col, width: v(on ? spec.column!.on : spec.column!.off), flex: 'none' }} />
              ))}
            </div>
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
                gap: v('--grid-gutter'),
                padding: `0 ${v(spec.margin)}`,
              }}
            >
              {Array.from({ length: columnCount }, (_, i) => (
                <div key={i} style={col} />
              ))}
            </div>
          )}

          {/* Blackout behind the overlay side menu */}
          {!push && on && <div style={{ position: 'absolute', inset: 0, background: v('--layout-backdrop') }} />}

          {/* Side menu */}
          {showSidebar && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: v(sidebarWidth),
                background: v('--grid-overlay-navbar'),
                paddingLeft: v(sb.inset),
                boxSizing: 'border-box',
              }}
            >
              <div style={{ width: v(sidebarContent), height: '100%', background: v('--grid-overlay-navbar-content') }} />
            </div>
          )}

          {/* Header (navigation menu) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: v('--layout-header-height'),
              background: v('--grid-overlay-header'),
            }}
          />
        </div>
      </div>
      <div style={{ ...text, fontSize: 'var(--font-size-micro)', lineHeight: 'var(--font-line-height-micro)', color: 'var(--color-grey-dark)', marginTop: 'var(--spacing-4)' }}>
        {frame.width}×{frame.height} · navbar {navbar}
        {land ? ' · horizontal' : ''}
      </div>
    </div>
  );
}

/** Navbar on / off (and portrait / landscape when available) side by side, as on the Figma board. */
export function GridBreakpoint({ breakpoint }: { breakpoint: string }) {
  const spec = getGridSpec(breakpoint);
  const items: GridPreviewProps[] = [
    { breakpoint, navbar: 'on' },
    { breakpoint, navbar: 'off' },
    ...(spec.landscape ? [{ breakpoint, navbar: 'off', orientation: 'landscape' } as GridPreviewProps] : []),
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      <SpecList spec={spec} />
      <div style={{ display: 'flex', gap: 'var(--spacing-24)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {items.map((p) => (
          <div key={`${p.navbar}-${p.orientation}`} style={{ flex: '1 1 260px', minWidth: 0 }}>
            <GridPreview {...p} maxHeight={320} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Spec tables ---------- */

const cell: CSSProperties = { ...text, padding: '8px 12px', borderBottom: '1px solid var(--color-stroke-light-v1)', textAlign: 'left', verticalAlign: 'top' };

function Token({ name }: { name: string }) {
  return (
    <span style={{ whiteSpace: 'nowrap' }}>
      <b>{tokenValue(name)}</b> <code style={{ fontSize: 11, color: 'var(--color-grey-dark)' }}>{name}</code>
    </span>
  );
}

function SpecList({ spec }: { spec: GridSpec }) {
  const sb = spec.sidebar;
  const rows: [string, ReactNode][] = [
    ['Device sizes', spec.range],
    ['Columns', spec.landscape ? <><Token name={spec.columns} /> · horizontal <Token name={spec.landscape.columns} /></> : <Token name={spec.columns} />],
    ['Column width', spec.column ? <>navbar on <Token name={spec.column.on} /> · off <Token name={spec.column.off} /></> : 'Auto'],
    ['Alignment', spec.alignment === 'right' ? 'Right' : 'Stretched'],
    ['Column spacing', <Token name="--grid-gutter" />],
    ['Side margin', <Token name={spec.margin} />],
    ['Navigation menu height', <Token name="--layout-header-height" />],
    [
      'Side menu',
      sb.mode === 'push' ? (
        <>navbar on <Token name={sb.on} /> · off <Token name={sb.off} /></>
      ) : (
        <><Token name={sb.on} /> — over the content (burger)</>
      ),
    ],
    [
      'Side menu content',
      sb.mode === 'push' ? (
        <>navbar on <Token name={sb.contentOn} /> · off <Token name={sb.contentOff} /></>
      ) : (
        <Token name={sb.contentOn} />
      ),
    ],
  ];
  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <tbody>
        {rows.map(([k, val]) => (
          <tr key={k}>
            <th style={{ ...cell, color: 'var(--color-grey-dark)', fontWeight: 'normal', width: 200 }}>{k}</th>
            <td style={cell}>{val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** One-row-per-breakpoint overview. */
export function GridSummaryTable() {
  const heads = ['Breakpoint', 'Device sizes', 'Columns', 'Column width (on / off)', 'Alignment', 'Gutter', 'Margin', 'Side menu'];
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>{heads.map((h) => <th key={h} style={{ ...cell, fontWeight: 600 }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {gridSpecs.map((s) => (
            <tr key={s.id}>
              <td style={cell}><b>{s.label}</b><br /><code style={{ fontSize: 11 }}>{s.breakpoint}</code></td>
              <td style={cell}>{s.range}</td>
              <td style={cell}>{tokenValue(s.columns)}{s.landscape && s.landscape.columns !== s.columns ? ` (horizontal ${tokenValue(s.landscape.columns)})` : ''}</td>
              <td style={cell}>{s.column ? `${tokenValue(s.column.on)} / ${tokenValue(s.column.off)}` : 'Auto'}</td>
              <td style={cell}>{s.alignment === 'right' ? 'Right' : 'Stretched'}</td>
              <td style={cell}>{tokenValue('--grid-gutter')}</td>
              <td style={cell}>{tokenValue(s.margin)}</td>
              <td style={cell}>
                {s.sidebar.mode === 'push'
                  ? `${tokenValue(s.sidebar.on)} / ${tokenValue(s.sidebar.off)}`
                  : `${tokenValue(s.sidebar.on)}, over content`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Token table for any token group(s), same shape as Foundations/Tokens. */
export function TokenList({ prefix }: { prefix: string[] }) {
  const rows = tokens.filter((t) => prefix.some((p) => t.name.startsWith(p)));
  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>{['Token', 'Value', 'Source'].map((h) => <th key={h} style={{ ...cell, fontWeight: 600 }}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((t) => (
          <tr key={t.name}>
            <td style={cell}><code>{t.name}</code></td>
            <td style={cell}><code>{t.value}</code></td>
            <td style={cell}>{t.source}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------- Spacing ---------- */

const square = (size: string): CSSProperties => ({
  width: v(size),
  height: v(size),
  background: 'var(--color-primary-blue-dark)',
});

const caption: CSSProperties = { ...text, fontSize: 'var(--font-size-micro)', lineHeight: 'var(--font-line-height-micro)', color: 'var(--color-grey-dark)' };

/** 8×8 module shown on an 8px grid. */
export function BaseModule() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-32)', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'center' }}>
        <span style={caption}>8×8</span>
        <div style={square('--spacing-8')} />
      </div>
      <div
        style={{
          width: 320,
          height: 112,
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'inset 0 0 0 1px var(--grid-overlay-header)',
          backgroundImage:
            'linear-gradient(var(--grid-overlay-column) 1px, transparent 1px), linear-gradient(90deg, var(--grid-overlay-column) 1px, transparent 1px)',
          backgroundSize: 'var(--spacing-8) var(--spacing-8)',
          position: 'relative',
        }}
      >
        <div style={{ ...square('--spacing-8'), position: 'absolute', left: 160, top: 48 }} />
      </div>
    </div>
  );
}

const scale = ['8', '16', '24', '32', '40', '48', '56', '64', '72', '80', '88', '96'];

/** Squares for every step of the 8px scale. */
export function SpacingScale() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-16)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {scale.map((n) => (
        <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'center' }}>
          <span style={caption}>{n}×{n}</span>
          <div style={square(`--spacing-${n}`)} />
          <code style={{ fontSize: 10, color: 'var(--color-grey-dark)' }}>--spacing-{n}</code>
        </div>
      ))}
    </div>
  );
}

/** Semi-module (2px / 4px) exceptions next to the 8px module. */
export function SemiModule() {
  const item = (n: string, label: string) => (
    <div style={{ display: 'flex', gap: 'var(--spacing-16)', alignItems: 'center' }}>
      <div style={{ width: 'var(--spacing-8)', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 'var(--spacing-8)', height: v(`--spacing-${n}`), background: 'var(--color-danger)' }} />
      </div>
      <span style={text}>
        <b>{n}px</b> <code style={{ fontSize: 11, color: 'var(--color-grey-dark)' }}>--spacing-{n}</code> — {label}
      </span>
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
      {item('4', 'e.g. between the status field and its drop-down list')}
      {item('2', 'e.g. between the field name and the status field')}
    </div>
  );
}
