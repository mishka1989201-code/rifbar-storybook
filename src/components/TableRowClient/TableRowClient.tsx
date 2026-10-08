import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../Button';
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
  /** Preview only: draws Figma `Table Row Hover Name`. Real hover comes from CSS. */
  forceNameHover?: boolean;
}

/**
 * Figma `Table Row 14` / `Table Row Hover Name`: card-like row of the clients table — white card with
 * a Stroke Light V1 border and the Table Row shadow, seven fixed cells and a `More` button.
 * The name turns Hover Blue Light and underlined on hover.
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
  forceNameHover = false,
  className,
  ...rest
}: TableRowClientProps) {
  const classes = ['ds-table-row-client', forceNameHover && 'is-name-hover', className].filter(Boolean).join(' ');

  const nameNode = nameHref ? (
    <a className="ds-table-row-client__link" href={nameHref}>{name}</a>
  ) : onNameClick ? (
    <button type="button" className="ds-table-row-client__link" onClick={onNameClick}>{name}</button>
  ) : (
    <span className="ds-table-row-client__link">{name}</span>
  );

  return (
    <div role="row" className={classes} {...rest}>
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__name">{nameNode}</div>
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__company">{company}</div>
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__phone">{phone}</div>
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__email">{email}</div>
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__joined">{joined}</div>
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__updated">{updated}</div>
      <div role="cell" className="ds-table-row-client__cell ds-table-row-client__actions">
        <Button variant="light" iconLeft="info" onClick={onAction}>{actionLabel}</Button>
      </div>
    </div>
  );
}
