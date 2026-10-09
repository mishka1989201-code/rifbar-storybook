import type { HTMLAttributes } from 'react';
import { LOGO_SIGN } from '../Logo/Logo';
import './NoRowsTable.css';

/** Maps 1:1 to the Figma `Property 1` property: `desktop` 495×328, `phone-large` 384×254, `phone-small` 300×198. */
export type NoRowsTableSize = 'desktop' | 'phone-large' | 'phone-small';

export interface NoRowsTableProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  size?: NoRowsTableSize;
  /** The text over the chart. Figma: `Table has no rows`. */
  label?: string;
}

// Geometry of the illustration in the 495×328 Figma frame (the three Figma sizes are the same drawing scaled).
const VIEW_W = 495;
const VIEW_H = 328;
const GRID_LEFT = 25;
const GRID_RIGHT = 438;
const GRID_TOP = 37.5;
const GRID_BOTTOM = 264.5;
const COLUMNS = 21;
const COLUMN_STEP = 20.6;
const ROWS = 5;
const Y_LABELS = ['60', '50', '40', '30', '20', '0'];
const X_LABELS: [string, number][] = [['3', 69], ['2', 194.5], ['1', 321], ['0', 446.5]];
/** The sign is 33.9×46 in the logo; here it is 302px tall, 131px from the left and 12px from the top. */
const WATERMARK = `translate(131 12) scale(${302 / 46})`;

/**
 * Figma `No Rows table`: the placeholder of a table that has no rows — a pale chart (grid, axis numbers) with the Rifbar sign as a
 * watermark and the text “Table has no rows” over it. Static illustration; the light and dark themes come from `--no-rows-*` tokens.
 * The Figma file draws it as vectors that could not be downloaded (asset proxy 403), so it is redrawn here as inline SVG.
 */
export function NoRowsTable({ size = 'desktop', label = 'Table has no rows', className, ...rest }: NoRowsTableProps) {
  const classes = ['ds-no-rows', `ds-no-rows--${size}`, className].filter(Boolean).join(' ');
  const rowStep = (GRID_BOTTOM - GRID_TOP) / ROWS;

  return (
    <div className={classes} role="status" {...rest}>
      <svg className="ds-no-rows__chart" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} aria-hidden="true" focusable="false">
        <path className="ds-no-rows__watermark" d={LOGO_SIGN} fillRule="evenodd" transform={WATERMARK} />
        <g className="ds-no-rows__grid">
          {Array.from({ length: COLUMNS }, (_, i) => (
            <line key={`v${i}`} x1={GRID_LEFT + i * COLUMN_STEP} x2={GRID_LEFT + i * COLUMN_STEP} y1={GRID_TOP} y2={GRID_BOTTOM} />
          ))}
          {Array.from({ length: ROWS }, (_, i) => (
            <line key={`h${i}`} x1={GRID_LEFT} x2={GRID_RIGHT} y1={GRID_TOP + i * rowStep} y2={GRID_TOP + i * rowStep} />
          ))}
        </g>
        <line className="ds-no-rows__axis" x1={24} x2={GRID_RIGHT} y1={GRID_BOTTOM} y2={GRID_BOTTOM} />
        <g className="ds-no-rows__numbers">
          {Y_LABELS.map((text, i) => (
            <text key={`y${i}`} x={469} y={GRID_TOP + i * rowStep + 4.3} textAnchor="end">{text}</text>
          ))}
          {X_LABELS.map(([text, x]) => (
            <text key={`x${text}`} x={x} y={293} textAnchor="middle">{text}</text>
          ))}
        </g>
        <text className="ds-no-rows__title" x={53} y={164}>{label}</text>
      </svg>
      <span className="ds-no-rows__sr">{label}</span>
    </div>
  );
}
