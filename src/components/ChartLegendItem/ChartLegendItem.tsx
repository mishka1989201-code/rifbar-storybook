import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './ChartLegendItem.css';

export interface ChartLegendItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Legend text, e.g. “Previous indicators”. */
  label: ReactNode;
  /** Value or separator between the swatch and the label. Figma shows “-”. Pass `null` to hide it. */
  value?: ReactNode;
  /** Swatch fill: any CSS color, preferably a token such as `var(--color-hover-blue)`. Default Hover Blue. */
  color?: string;
}

/**
 * Figma `ChartDescription`: one legend entry of a chart — a 16px rounded color swatch,
 * a value (or “-”) and the series name.
 */
export function ChartLegendItem({ label, value = '-', color, className, style, ...rest }: ChartLegendItemProps) {
  const classes = ['ds-chart-legend-item', className].filter(Boolean).join(' ');
  const swatch = color ? ({ '--ds-legend-color': color, ...style } as CSSProperties) : style;
  return (
    <div className={classes} style={swatch} {...rest}>
      <span className="ds-chart-legend-item__swatch" aria-hidden="true" />
      {value != null && <span className="ds-chart-legend-item__value">{value}</span>}
      <span className="ds-chart-legend-item__label">{label}</span>
    </div>
  );
}
