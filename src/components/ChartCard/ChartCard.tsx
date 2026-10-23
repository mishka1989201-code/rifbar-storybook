import { useId, type HTMLAttributes, type ReactNode } from 'react';
import { ChartLegendItem } from '../ChartLegendItem';
import './ChartCard.css';

/** Figma `Chart 1` (bar), `Chart 2` (donut), `Chart 3` (line), `Chart 4` (smooth line) as ONE component. */
export type ChartCardVariant = 'bar' | 'donut' | 'line' | 'smooth';
export type ChartCardStatus = 'ready' | 'loading' | 'empty' | 'error';

export interface ChartSeries {
  id: string;
  /** Legend text, e.g. “Previous indicators”. */
  label: string;
  /** Any CSS colour, preferably a token. Default: `--chart-series-1…4` in order. */
  color?: string;
  /** One value per category (`bar`) or one per point (`line` / `smooth`), in the scale of `yMax`. */
  values: number[];
}

export interface ChartSlice {
  id: string;
  label: string;
  /** The value drawn in the slice (a percent in Figma); the arc is `value / sum of all values`. */
  value: number;
  color?: string;
}

export interface ChartCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  variant?: ChartCardVariant;
  /** Card title (Figma `Medium Headings/h6`). */
  title: ReactNode;
  /** Line under the title (Figma “Basen on the scale of 0% to 130%”). */
  subtitle?: ReactNode;
  /** `bar` / `line` / `smooth`: the series. */
  series?: ChartSeries[];
  /** `bar`: the groups under the x axis (“Week 1” …); `line` / `smooth`: the labels spread along the x axis. */
  categories?: string[];
  /** `donut`: the slices. */
  slices?: ChartSlice[];
  /** Top of the y axis (Figma 125). */
  yMax?: number;
  /** Distance between y labels / grid lines (Figma 25). */
  yStep?: number;
  /** Text of a y label and of a slice label. Default adds a percent sign. */
  formatValue?: (value: number) => string;
  /** The value before each legend text (Figma draws “-”). `null` hides it. */
  legendValue?: ReactNode;
  /** `loading`, `empty` and `error` replace the plot with a message (AI-defined: Figma draws only the filled chart). */
  status?: ChartCardStatus;
  emptyText?: ReactNode;
  loadingText?: ReactNode;
  errorText?: ReactNode;
}

const DEFAULT_COLORS = ['var(--chart-series-1)', 'var(--chart-series-2)', 'var(--chart-series-3)', 'var(--chart-series-4)'];

// Plot geometry in viewBox units, measured from Figma `Chart 3` (613 × 174 plot, 38px for the y labels).
const W = 660;
const H = 206;
const PLOT_L = 38;
const PLOT_R = 651;
const PLOT_T = 5;
const AXIS_Y = 179;
const PLOT_W = PLOT_R - PLOT_L;
const PLOT_H = AXIS_Y - PLOT_T;
const LABEL_Y = 196;
const BAR_W = 14;
const BAR_GAP = 2;
const VERTICAL_LINES = 10;

const defaultFormat = (v: number) => (Number.isInteger(v) ? `${v}%` : `${v.toFixed(1)}%`);
const r = (n: number) => Math.round(n * 100) / 100;

/** Figma group centres: 28px from the left edge of the plot, 35px from the right one (4 groups → 183.3px apart). */
const centerX = (i: number, n: number) => (n <= 1 ? PLOT_L + PLOT_W / 2 : PLOT_L + 28 + (i * (PLOT_W - 63)) / (n - 1));

/** Points of a line: the first on the y axis, the last on the right edge of the plot. */
const pointsOf = (values: number[], yMax: number) =>
  values.map((v, i) => ({
    x: values.length <= 1 ? PLOT_L : PLOT_L + (i * PLOT_W) / (values.length - 1),
    y: AXIS_Y - (Math.max(0, Math.min(v, yMax)) / yMax) * PLOT_H,
  }));

const linePath = (pts: { x: number; y: number }[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${r(p.x)} ${r(p.y)}`).join(' ');

/** Catmull-Rom spline through the points as cubic Béziers (Figma `Chart 4`). */
const smoothPath = (pts: { x: number; y: number }[]) => {
  if (pts.length < 3) return linePath(pts);
  let d = `M${r(pts[0].x)} ${r(pts[0].y)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    // Keep the curve inside the plot.
    const clamp = (y: number) => Math.max(PLOT_T, Math.min(AXIS_Y, y));
    d += ` C${r(c1.x)} ${r(clamp(c1.y))} ${r(c2.x)} ${r(clamp(c2.y))} ${r(p2.x)} ${r(p2.y)}`;
  }
  return d;
};

const polar = (cx: number, cy: number, radius: number, angle: number) => ({ x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) });

/**
 * Figma `Chart 1–4` of `Reports & Analytics`: a white card (radius 16, Cards Shadow) with a title, an optional subtitle,
 * the plot (bars, donut, line or smooth line drawn as SVG) and the legend (`ChartLegendItem`s).
 * Every colour is a token; the plot scales with the card and scrolls sideways when the card is narrower than `--size-chart-min-width`.
 */
export function ChartCard({
  variant = 'bar',
  title,
  subtitle,
  series = [],
  categories = [],
  slices = [],
  yMax = 125,
  yStep = 25,
  formatValue = defaultFormat,
  legendValue = '-',
  status = 'ready',
  emptyText = 'No data for this period.',
  loadingText = 'Loading…',
  errorText = 'Could not load the chart.',
  className,
  ...rest
}: ChartCardProps) {
  const titleId = useId();
  const donut = variant === 'donut';
  const items = donut
    ? slices.map((s, i) => ({ id: s.id, label: s.label, color: s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] }))
    : series.map((s, i) => ({ id: s.id, label: s.label, color: s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] }));
  const hasData = donut ? slices.some((s) => s.value > 0) : series.some((s) => s.values.length > 0);
  const state: ChartCardStatus = status === 'ready' && !hasData ? 'empty' : status;
  const classes = ['ds-chart-card', `ds-chart-card--${variant}`, className].filter(Boolean).join(' ');

  // The text alternative of the plot: the numbers behind it.
  const summary = donut
    ? slices.map((s) => `${s.label}: ${formatValue(s.value)}`).join('; ')
    : series.map((s) => `${s.label}: ${s.values.map(formatValue).join(', ')}`).join('. ');

  const ticks: number[] = [];
  for (let v = 0; v <= yMax + 1e-9; v += yStep) ticks.push(v);
  const yOf = (v: number) => AXIS_Y - (v / yMax) * PLOT_H;

  const cartesian = (
    <svg className="ds-chart-card__plot" viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={titleId} focusable="false">
      <desc>{summary}</desc>
      {/* vertical lines (Figma #F0F0F0), then the horizontal ones */}
      {Array.from({ length: VERTICAL_LINES + 1 }, (_, i) => (
        <line key={`v${i}`} className="ds-chart-card__grid-minor" x1={r(PLOT_L + (i * PLOT_W) / VERTICAL_LINES)} x2={r(PLOT_L + (i * PLOT_W) / VERTICAL_LINES)} y1={PLOT_T} y2={AXIS_Y} />
      ))}
      {ticks.slice(1).map((v) => (
        <line key={`h${v}`} className="ds-chart-card__grid" x1={PLOT_L} x2={PLOT_R} y1={r(yOf(v))} y2={r(yOf(v))} />
      ))}
      <line className="ds-chart-card__axis" x1={PLOT_L} x2={PLOT_R} y1={AXIS_Y + 1} y2={AXIS_Y + 1} />
      {ticks.map((v) => (
        <text key={`t${v}`} className="ds-chart-card__label ds-chart-card__label--y" x={PLOT_L - 8} y={r(yOf(v))}>
          {v === 0 ? '0' : formatValue(v)}
        </text>
      ))}
      {categories.map((c, i) => (
        <text key={`c${i}`} className="ds-chart-card__label ds-chart-card__label--x" x={r(centerX(i, categories.length))} y={LABEL_Y}>
          {c}
        </text>
      ))}
      {variant === 'bar'
        ? series.map((s, si) =>
            s.values.map((v, i) => {
              const total = series.length * BAR_W + (series.length - 1) * BAR_GAP;
              const x = centerX(i, Math.max(categories.length, s.values.length)) - total / 2 + si * (BAR_W + BAR_GAP);
              const h = (Math.max(0, Math.min(v, yMax)) / yMax) * PLOT_H;
              return <rect key={`${s.id}${i}`} x={r(x)} y={r(AXIS_Y - h)} width={BAR_W} height={r(h)} fill={items[si].color} />;
            }),
          )
        : series.map((s, si) => {
            const pts = pointsOf(s.values, yMax);
            return <path key={s.id} className="ds-chart-card__line" d={variant === 'smooth' ? smoothPath(pts) : linePath(pts)} stroke={items[si].color} />;
          })}
    </svg>
  );

  const total = slices.reduce((sum, s) => sum + Math.max(0, s.value), 0);
  const OUT = 120.5;
  const IN = 43;
  let angle = -Math.PI / 2;
  const ring = (
    <svg className="ds-chart-card__donut" viewBox="0 0 241 241" role="img" aria-labelledby={titleId} focusable="false">
      <desc>{summary}</desc>
      {slices.map((s, i) => {
        const sweep = total > 0 ? (Math.max(0, s.value) / total) * Math.PI * 2 : 0;
        if (sweep <= 0) return null;
        const a0 = angle;
        const a1 = angle + Math.min(sweep, Math.PI * 2 - 0.0001);
        angle += sweep;
        const o0 = polar(OUT, OUT, OUT, a0);
        const o1 = polar(OUT, OUT, OUT, a1);
        const i1 = polar(OUT, OUT, IN, a1);
        const i0 = polar(OUT, OUT, IN, a0);
        const large = a1 - a0 > Math.PI ? 1 : 0;
        const d = `M${r(o0.x)} ${r(o0.y)} A${OUT} ${OUT} 0 ${large} 1 ${r(o1.x)} ${r(o1.y)} L${r(i1.x)} ${r(i1.y)} A${IN} ${IN} 0 ${large} 0 ${r(i0.x)} ${r(i0.y)}Z`;
        const mid = polar(OUT, OUT, (OUT + IN) / 2, (a0 + a1) / 2);
        return (
          <g key={s.id}>
            <path d={d} fill={items[i].color} />
            {sweep > 0.25 && (
              <text className="ds-chart-card__slice-label" x={r(mid.x)} y={r(mid.y)}>
                {formatValue(s.value)}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );

  return (
    <section className={classes} aria-labelledby={titleId} aria-busy={state === 'loading' || undefined} {...rest}>
      <div className="ds-chart-card__head">
        <p className="ds-chart-card__title" id={titleId}>{title}</p>
        {subtitle && <p className="ds-chart-card__subtitle">{subtitle}</p>}
      </div>
      <div className="ds-chart-card__body">
        {state === 'ready' ? (
          donut ? ring : cartesian
        ) : (
          <p className={`ds-chart-card__message${state === 'error' ? ' is-error' : ''}`} role={state === 'error' ? 'alert' : 'status'}>
            {state === 'loading' ? loadingText : state === 'error' ? errorText : emptyText}
          </p>
        )}
      </div>
      {state === 'ready' && items.length > 0 && (
        <div className="ds-chart-card__legend">
          {items.map((it) => (
            <ChartLegendItem key={it.id} label={it.label} value={legendValue} color={it.color} />
          ))}
        </div>
      )}
    </section>
  );
}
