import { useId, useState, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { Button } from '../Button';
import { TooltipBordered } from '../TooltipBordered';
import './TableRowClient.css';

export interface TableRowClientProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Client name (Semi-Bold). Becomes a link when `nameHref` or `onNameClick` is set. */
  name?: ReactNode;
  /** Makes the name an `<a>`. */
  nameHref?: string;
  /** Makes the name a `<button>` (when there is no `nameHref`). */
  onNameClick?: () => void;
  company?: ReactNode;
  phone?: ReactNode;
  email?: ReactNode;
  /** Figma `Joined` date, right-aligned in an 80px cell. */
  joined?: ReactNode;
  /** Second date (Figma `Date 3`), right-aligned in a 119px cell. */
  updated?: ReactNode;
  /** Label of the action button (Figma `More`). */
  actionLabel?: ReactNode;
  /** Called when the action button is pressed. */
  onAction?: () => void;
  /** Adds the red delete button before `More` (Figma `Hover Row in Table`). */
  onDelete?: () => void;
  /** Adds the dark phone button. */
  onCall?: () => void;
  /** Adds the dark notes button (drawn in the dark frame only). */
  onNotes?: () => void;
  /**
   * Detailed information shown under the row on hover or keyboard focus inside the row
   * (Figma `Tooltip with border + shadow`). Several `<p>` paragraphs are allowed.
   */
  tooltip?: ReactNode;
  /** Headline of the tooltip. */
  tooltipTitle?: ReactNode;
  /** Preview only: draws the hovered row with its tooltip (Figma `Hover Row in Table`). Real hover comes from CSS. */
  forceHover?: boolean;
  /** Preview only: draws Figma `Table Row Hover Name`. Real hover comes from CSS. */
  forceNameHover?: boolean;
}

/**
 * Figma `Table Row 14` / `Table Row Hover Name`: card-like row of the clients table — white card with
 * a Stroke Light V1 border and the Table Row shadow, seven fixed cells and a `More` button.
 * The name turns Hover Blue Light and underlined on hover. The row itself gets the Row Hover fill, and an optional
 * `tooltip` (Figma `Hover Row in Table`) opens under it. Light and dark values come from `--table-row-*` tokens.
 */
export function TableRowClient({
  name,
  nameHref,
  onNameClick,
  company,
  phone,
  email,
  joined,
  updated,
  actionLabel = 'More',
  onAction,
  onDelete,
  onCall,
  onNotes,
  tooltip,
  tooltipTitle,
  forceHover = false,
  forceNameHover = false,
  className,
  onKeyDown,
  onMouseLeave,
  onBlur,
  ...rest
}: TableRowClientProps) {
  const tooltipId = useId();
  // WCAG 1.4.13: Escape hides the tooltip until the pointer or focus leaves the row.
  const [dismissed, setDismissed] = useState(false);
  const classes = [
    'ds-table-row-client',
    forceHover && 'is-hover',
    forceNameHover && 'is-name-hover',
    dismissed && 'is-tooltip-dismissed',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && tooltip) setDismissed(true);
    onKeyDown?.(e);
  };

  const nameNode = nameHref ? (
    <a className="ds-table-row-client__link" href={nameHref}>{name}</a>
  ) : onNameClick ? (
    <button type="button" className="ds-table-row-client__link" onClick={onNameClick}>{name}</button>
  ) : (
    <span className="ds-table-row-client__link">{name}</span>
  );

  return (
    <div
      role="row"
      className={classes}
      aria-describedby={tooltip ? tooltipId : undefined}
      onKeyDown={handleKeyDown}
      onMouseLeave={(e) => {
        setDismissed(false);
        onMouseLeave?.(e);
      }}
      onBlur={(e) => {
        setDismissed(false);
        onBlur?.(e);
      }}
      {...rest}
    >
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__name">{nameNode}</div>
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__company">{company}</div>
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__phone">{phone}</div>
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__email">{email}</div>
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__joined">{joined}</div>
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__updated">{updated}</div>
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__actions">
        {onDelete && <Button variant="danger" iconOnly="delete" iconSize={16} aria-label="Delete" onClick={onDelete} />}
        {onCall && <Button variant="dark" iconOnly="call-v2" iconSize={16} aria-label="Call" onClick={onCall} />}
        {onNotes && <Button variant="dark" iconOnly="notes" iconSize={16} aria-label="Notes" onClick={onNotes} />}
        <Button variant="light" iconLeft="info" onClick={onAction}>{actionLabel}</Button>
      </div>
      {tooltip && (
        <div className="ds-table-row-client__tooltip">
          <TooltipBordered id={tooltipId} position="bottom" tone="subtle" widthMode="fixed" title={tooltipTitle}>
            {tooltip}
          </TooltipBordered>
        </div>
      )}
    </div>
  );
}
