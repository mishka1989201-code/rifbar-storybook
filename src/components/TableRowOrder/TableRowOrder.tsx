import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../Button';
import { ChevronStatus, type ChevronStatusColor } from '../ChevronStatus';
import './TableRowOrder.css';

/** Order statuses of the Figma frame and the `ChevronStatus` colour each one uses. */
export type OrderStatusKey =
  | 'pending'
  | 'in-work'
  | 'approved'
  | 'awaiting-payment'
  | 'in-shipping'
  | 'rejected'
  | 'received';

export const ORDER_STATUSES: Record<OrderStatusKey, { label: string; color: ChevronStatusColor }> = {
  pending: { label: 'Pending', color: 'secondary' },
  'in-work': { label: 'In work', color: 'info' },
  approved: { label: 'Approved', color: 'dark' },
  'awaiting-payment': { label: 'Awaiting payment', color: 'light' },
  'in-shipping': { label: 'In shipping', color: 'success' },
  rejected: { label: 'Rejected', color: 'danger' },
  received: { label: 'Received', color: 'primary' },
};

/** `ChevronStatus` of one order status: `<OrderStatus value="in-work" />`. */
export function OrderStatus({ value }: { value: OrderStatusKey }) {
  const { label, color } = ORDER_STATUSES[value];
  return <ChevronStatus color={color}>{label}</ChevronStatus>;
}

/** `row` = Figma `Table Row 14` (desktop); `card` = Figma `Card Row 4` (768px and below). */
export type TableRowOrderLayout = 'row' | 'card';

export interface TableRowOrderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  layout?: TableRowOrderLayout;
  /** Order name (Semi-Bold), e.g. “Order #3”. Becomes a link when `nameHref` or `onNameClick` is set. */
  name?: ReactNode;
  nameHref?: string;
  onNameClick?: () => void;
  /** Price, right-aligned in the table row, e.g. `$1200`. */
  price?: ReactNode;
  /** Order type (Semi-Bold in the card), e.g. “Purchase”. */
  type?: ReactNode;
  /** Figma card variant “Fry's / +44 …”: client in the place of `price`. */
  client?: ReactNode;
  /** Figma card variant: phone in the place of `type`. */
  phone?: ReactNode;
  /** Date, right-aligned in the table row. */
  date?: ReactNode;
  /** The status chip: `<OrderStatus value="pending" />` or any `ChevronStatus`. */
  status?: ReactNode;
  /** Label of the action button (Figma `More`). */
  actionLabel?: ReactNode;
  onAction?: () => void;
}

/**
 * Figma `Table Row 14` / `Card Row 4` of the client's Orders tab as ONE component with a `layout`.
 * `row`: six fixed cells like the `orders` preset of `TableHeader`. `card`: the cells wrap into
 * a white card, with the status chip after them and the `More` button at the right of the last line.
 */
export function TableRowOrder({
  layout = 'row',
  name,
  nameHref,
  onNameClick,
  price,
  type,
  client,
  phone,
  date,
  status,
  actionLabel = 'More',
  onAction,
  className,
  ...rest
}: TableRowOrderProps) {
  const classes = ['ds-table-row-order', `ds-table-row-order--${layout}`, className].filter(Boolean).join(' ');

  const nameNode = nameHref ? (
    <a className="ds-table-row-order__link" href={nameHref}>{name}</a>
  ) : onNameClick ? (
    <button type="button" className="ds-table-row-order__link" onClick={onNameClick}>{name}</button>
  ) : (
    <span className="ds-table-row-order__link">{name}</span>
  );

  const second = price ?? client;
  const third = type ?? phone;
  const action = (
    <Button variant="light" iconLeft="info" onClick={onAction}>
      {actionLabel}
    </Button>
  );

  if (layout === 'card') {
    return (
      <div role="row" className={classes} {...rest}>
        <div className="ds-table-row-order__info">
          <div role="cell" className="ds-table-row-order__cell ds-table-row-order__name">{nameNode}</div>
          {second != null && <div role="cell" className="ds-table-row-order__cell">{second}</div>}
          {third != null && <div role="cell" className="ds-table-row-order__cell ds-table-row-order__strong">{third}</div>}
          {date != null && <div role="cell" className="ds-table-row-order__cell">{date}</div>}
          {status != null && <div role="cell" className="ds-table-row-order__cell ds-table-row-order__status">{status}</div>}
        </div>
        <div role="cell" className="ds-table-row-order__actions">{action}</div>
      </div>
    );
  }

  return (
    <div role="row" className={classes} {...rest}>
      <div role="cell" className="ds-table-row-order__cell ds-table-row-order__name">{nameNode}</div>
      <div role="cell" className="ds-table-row-order__cell ds-table-row-order__price">{second}</div>
      <div role="cell" className="ds-table-row-order__cell ds-table-row-order__type">{third}</div>
      <div role="cell" className="ds-table-row-order__cell ds-table-row-order__date">{date}</div>
      <div role="cell" className="ds-table-row-order__cell ds-table-row-order__status">{status}</div>
      <div role="cell" className="ds-table-row-order__cell ds-table-row-order__actions">{action}</div>
    </div>
  );
}
