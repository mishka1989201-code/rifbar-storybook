import { Fragment, type HTMLAttributes, type ReactNode } from 'react';
import './TableRowAnalytics.css';

export interface TableRowAnalyticsCell {
  /** Stable key. */
  id: string;
  /** The value: text or any node (an `ImageCard` for the image column). */
  value: ReactNode;
  /** Small caption above the value (Figma `Date`, `Type`, `Amount`). Omit in a table with a header row. */
  label?: ReactNode;
  /** Fixed column width in px. Omit to size by content. Use the same widths as the `TableHeader` columns. */
  width?: number;
  /** Text alignment inside the cell. Default `start`. */
  align?: 'start' | 'end';
  /** Semi-Bold value (Figma: the name and the first value of the three-cell card). Default Medium. */
  strong?: boolean;
  /** Cuts a value that does not fit its `width` with an ellipsis. Default: the text is not cut. */
  truncate?: boolean;
  /** Adjacent cells with the same `group` are packed together with a 32px gap (Figma: image + name). */
  group?: string;
}

export interface TableRowAnalyticsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Cells of the row in order. */
  cells: TableRowAnalyticsCell[];
}

/**
 * Figma `Table Row Analytics 1 / 2 / 3`: a white 10px row card (Stroke Light V1, Table Row shadow) with
 * padding 12 / 16 and cells spread with `justify-between`. One component for both looks:
 * a plain row under a `TableHeader` (image + name + numbers) and a card whose cells carry their own small captions.
 * In a narrow container the cells wrap onto the next line (10px between lines).
 */
export function TableRowAnalytics({ cells, className, ...rest }: TableRowAnalyticsProps) {
  const classes = ['ds-table-row-analytics', className].filter(Boolean).join(' ');

  // Pack consecutive cells with the same `group` into one flex container.
  const blocks: TableRowAnalyticsCell[][] = [];
  cells.forEach((cell) => {
    const last = blocks[blocks.length - 1];
    if (cell.group && last && last[0].group === cell.group) last.push(cell);
    else blocks.push([cell]);
  });

  const renderCell = (cell: TableRowAnalyticsCell) => (
    <div
      key={cell.id}
      role="cell"
      className={[
        'ds-table-row-analytics__cell',
        `ds-table-row-analytics__cell--${cell.align ?? 'start'}`,
        cell.strong && 'is-strong',
        cell.truncate && 'is-truncate',
      ]
        .filter(Boolean)
        .join(' ')}
      style={cell.width ? { width: cell.width } : undefined}
    >
      {cell.label != null && <span className="ds-table-row-analytics__label">{cell.label}</span>}
      <span className="ds-table-row-analytics__value">{cell.value}</span>
    </div>
  );

  return (
    <div role="row" className={classes} {...rest}>
      {blocks.map((block) =>
        block.length > 1 ? (
          <div key={block[0].group} className="ds-table-row-analytics__group">
            {block.map(renderCell)}
          </div>
        ) : (
          <Fragment key={block[0].id}>{renderCell(block[0])}</Fragment>
        ),
      )}
    </div>
  );
}
