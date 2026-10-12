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
 * `history` — Figma `Table Row 25` (client page → Last updates): ID, name, status, call date, change date; no buttons.
 * `calls` — Figma `Table Row 16` (client page → Call records): call icon + seller, phone, date, duration, date, play button or result text; opens a player under the row.
 */
export type TableRowClientLayout = 'default' | 'management' | 'history' | 'calls';

/** `calls` layout: `answered` draws the green phone_callback icon (Figma `Table Row 16`), `missed` the blue phone_forwarded one (`Table Row 3`). */
export type TableRowClientCallState = 'answered' | 'missed';

export interface TableRowClientProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Client name (Semi-Bold). Becomes a link when `nameHref` or `onNameClick` is set. */
  name?: ReactNode;
  /** Makes the name an `<a>`. */
  nameHref?: string;
  /** Makes the name a `<button>` (when there is no `nameHref`). */
  onNameClick?: () => void;
  /** Figma `Table Row 14` or `Table Row 15` (see `TableRowClientLayout`). */
  layout?: TableRowClientLayout;
  /** `history` layout only: the number before the name (Figma `ID`, centred in 30px). */
  index?: ReactNode;
  /** `history` layout only: date of the call (Figma `Call date`, 81px). */
  callDate?: ReactNode;
  /** `history` layout only: date of the change (Figma `Change date`, right-aligned in 110px). */
  changeDate?: ReactNode;
  /** `calls` layout only: which phone icon is drawn before the name. */
  callState?: TableRowClientCallState;
  /** `calls` layout only: length of the call, e.g. “00:02:30” (right-aligned, 66px). */
  duration?: ReactNode;
  /** `calls` layout only: text instead of the buttons for a call that has no recording, e.g. “cancel”, “busy”, “no day limit” (Headlines). */
  callResult?: ReactNode;
  /** `calls` layout only: the dark play button of a recording. */
  onPlay?: () => void;
  /** `calls` layout only: while `player` is shown the play button turns into the light close button. */
  onClose?: () => void;
  /** `calls` layout only: the player under the row (Figma `Table Row 16` open), e.g. `<AudioPlayer embedded />`. */
  player?: ReactNode;
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
  index,
  callState = 'answered',
  duration,
  callResult,
  onPlay,
  onClose,
  player,
  callDate,
  changeDate,
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
    layout === 'history' && 'ds-table-row-client--history',
    layout === 'calls' && 'ds-table-row-client--calls',
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

  const nameCell = (
    <div role="cell" className="ds-table-row-client__cell ds-table-row-client__name">
      {source && (
        <span className="ds-table-row-client__source" tabIndex={0} aria-label={typeof source === 'string' ? `Source: ${source}` : undefined}>
          <Icon name="output-circle" size={16} color="current" />
          <span className="ds-table-row-client__source-tip">
            <TooltipBordered position="top" widthMode="hug">{source}</TooltipBordered>
          </span>
        </span>
      )}
      {layout === 'calls' && (
        <Icon name={callState === 'missed' ? 'phone-forwarded' : 'phone-callback'} size={16} color="current" className={`ds-table-row-client__call-icon ds-table-row-client__call-icon--${callState}`} />
      )}
      {nameNode}
    </div>
  );

  // Figma `Buttons`: the dark play button; while the player is open it is the light close button; a call without a recording shows its result.
  const callActionsCell = (
    <div role="cell" className="ds-table-row-client__cell ds-table-row-client__call-actions">
      {player && onClose ? (
        <Button variant="light" iconOnly="xmark" iconSize={16} aria-label="Close player" onClick={onClose} />
      ) : onPlay ? (
        <Button variant="dark" iconOnly="play" iconSize={16} aria-label="Play recording" onClick={onPlay} />
      ) : (
        <span className="ds-table-row-client__call-result">{callResult}</span>
      )}
    </div>
  );

  const actionsCell = (
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
      {layout === 'calls' ? (
        <>
          <div className="ds-table-row-client__main">
            {nameCell}
            <div role="cell" className="ds-table-row-client__cell ds-table-row-client__phone">{phone}</div>
            <div role="cell" className="ds-table-row-client__cell ds-table-row-client__call-day">{callDate}</div>
            <div role="cell" className="ds-table-row-client__cell ds-table-row-client__duration">{duration}</div>
            <div role="cell" className="ds-table-row-client__cell ds-table-row-client__updated">{updated}</div>
            {callActionsCell}
          </div>
          {player && <div className="ds-table-row-client__player">{player}</div>}
        </>
      ) : layout === 'history' ? (
        <>
          <div className="ds-table-row-client__lead">
            <div role="cell" className="ds-table-row-client__cell ds-table-row-client__index">{index}</div>
            {nameCell}
          </div>
          <div role="cell" className="ds-table-row-client__cell ds-table-row-client__status">{status}</div>
          <div role="cell" className="ds-table-row-client__cell ds-table-row-client__call-date">{callDate}</div>
          <div role="cell" className="ds-table-row-client__cell ds-table-row-client__change-date">{changeDate}</div>
        </>
      ) : (
        <>
          {nameCell}
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
          {actionsCell}
        </>
      )}
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
