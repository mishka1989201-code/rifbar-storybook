import { useId, useState, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { TooltipBordered } from '../TooltipBordered';
import './TableRowClient.css';

/** Colour of the Groups swatch (Figma `Groups`: a 16px square before the group name). */
export type TableRowClientGroupColor = 'green' | 'teal';

export interface TableRowClientGroup {
  label: ReactNode;
  color?: TableRowClientGroupColor;
}

/**
 * `default` — Figma `Table Row 14`: company, phone, email, two dates.
 * `management` — Figma `Table Row 15` (Clients → All clients): company, phone, group, status, two dates.
 */
export type TableRowClientLayout = 'default' | 'management';

export interface TableRowClientProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Client name (Semi-Bold). Becomes a link when `nameHref` or `onNameClick` is set. */
  name?: ReactNode;
  /** Makes the name an `<a>`. */
  nameHref?: string;
  /** Makes the name a `<button>` (when there is no `nameHref`). */
  onNameClick?: () => void;
  /** Figma `Table Row 14` or `Table Row 15` (see `TableRowClientLayout`). */
  layout?: TableRowClientLayout;
  company?: ReactNode;
  phone?: ReactNode;
  /** `default` layout only. */
  email?: ReactNode;
  /** `management` layout only: the client group (Figma `Groups`). */
  group?: TableRowClientGroup;
  /** `management` layout only: the status pill, e.g. `<ChevronStatus color="success">Active</ChevronStatus>` (Figma `Status Client`). */
  status?: ReactNode;
  /** Date of joining. `default`: the first date cell (80px); `management`: the second one (119px). */
  joined?: ReactNode;
  /** Date of the last update. `default`: the second date cell (119px); `management`: the first one (80px). */
  updated?: ReactNode;
  /** Draws the row as needing attention: Warning BG fill and Warning border (Figma `Table Row 15`). */
  attention?: boolean;
  /** Where the client came from (e.g. “Outbrain”). Adds an icon before the name with this text as a tooltip on hover / focus. */
  source?: ReactNode;
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
  /** Tooltip next to the delete button on hover / focus (Figma: “Delete User”). */
  deleteTooltip?: ReactNode;
  /** Tooltip next to the notes button on hover / focus (Figma: “Add a note”). */
  notesTooltip?: ReactNode;
  /** Menu under the phone button on hover / focus, e.g. `<CallMenu />` (Figma `tooltip-call`). */
  callMenu?: ReactNode;
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
  layout = 'default',
  group,
  status,
  attention = false,
  source,
  deleteTooltip,
  notesTooltip,
  callMenu,
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
    layout === 'management' && 'ds-table-row-client--management',
    attention && 'is-attention',
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
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__name">
        {source && (
          <span className="ds-table-row-client__source" tabIndex={0} aria-label={typeof source === 'string' ? `Source: ${source}` : undefined}>
            <Icon name="output-circle" size={16} color="current" />
            <span className="ds-table-row-client__source-tip">
              <TooltipBordered position="top" widthMode="hug">{source}</TooltipBordered>
            </span>
          </span>
        )}
        {nameNode}
      </div>
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__company">{company}</div>
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__phone">{phone}</div>
      {layout === 'management' ? (
        <>
          <div role="cell" className="ds-table-row-client__cell ds-table-row-client__group">
            {group && (
              <>
                <span className={`ds-table-row-client__swatch ds-table-row-client__swatch--${group.color ?? 'green'}`} aria-hidden="true" />
                <span className="ds-table-row-client__group-label">{group.label}</span>
              </>
            )}
          </div>
          <div role="cell" className="ds-table-row-client__cell ds-table-row-client__status">{status}</div>
          <div role="cell" className="ds-table-row-client__cell ds-table-row-client__joined">{updated}</div>
          <div role="cell" className="ds-table-row-client__cell ds-table-row-client__updated">{joined}</div>
        </>
      ) : (
        <>
          <div role="cell" className="ds-table-row-client__cell ds-table-row-client__email">{email}</div>
          <div role="cell" className="ds-table-row-client__cell ds-table-row-client__joined">{joined}</div>
          <div role="cell" className="ds-table-row-client__cell ds-table-row-client__updated">{updated}</div>
        </>
      )}
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__actions">
        {onDelete && (
          <span className="ds-table-row-client__action">
            <Button variant="danger" iconOnly="delete" iconSize={16} aria-label="Delete" onClick={onDelete} />
            {deleteTooltip && (
              <span className="ds-table-row-client__action-tip">
                <TooltipBordered position="left" widthMode="fixed" title={deleteTooltip} />
              </span>
            )}
          </span>
        )}
        {onCall && (
          <span className="ds-table-row-client__action">
            <Button variant="dark" iconOnly="call-v2" iconSize={16} aria-label="Call" aria-haspopup={callMenu ? 'menu' : undefined} onClick={onCall} />
            {callMenu && <span className="ds-table-row-client__call-menu">{callMenu}</span>}
          </span>
        )}
        {onNotes && (
          <span className="ds-table-row-client__action">
            <Button variant="dark" iconOnly="notes" iconSize={16} aria-label="Notes" onClick={onNotes} />
            {notesTooltip && (
              <span className="ds-table-row-client__action-tip">
                <TooltipBordered position="left" widthMode="fixed" title={notesTooltip} />
              </span>
            )}
          </span>
        )}
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
