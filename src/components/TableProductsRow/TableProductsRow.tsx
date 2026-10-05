import type { HTMLAttributes, ReactNode } from 'react';
import './TableProductsRow.css';

export interface TableProductsRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Row number (“#” column). */
  index?: ReactNode;
  /** Product name. */
  name?: ReactNode;
  /** Flavor / group; wraps to several lines in its 230px cell. */
  flavor?: ReactNode;
  /** Product type. */
  type?: ReactNode;
  /** Nicotine strength, e.g. `5%`. */
  nicotine?: ReactNode;
  quantity?: ReactNode;
  /** Amount, right-aligned, e.g. `$150`. */
  amount?: ReactNode;
}

/**
 * Figma `Table Products Row`: white body row of the products table with a 1px bottom stroke.
 * Same column grid as `TableProductsHeader`; `#` and name are Semi-Bold, the rest Medium.
 */
export function TableProductsRow({
  index,
  name,
  flavor,
  type,
  nicotine,
  quantity,
  amount,
  className,
  ...rest
}: TableProductsRowProps) {
  const classes = ['ds-table-products-row', className].filter(Boolean).join(' ');
  return (
    <div role="row" className={classes} {...rest}>
      <div className="ds-table-products-row__lead">
        <div role="cell" className="ds-table-products-row__cell ds-table-products-row__id">{index}</div>
        <div role="cell" className="ds-table-products-row__cell ds-table-products-row__name">{name}</div>
      </div>
      <div role="cell" className="ds-table-products-row__cell ds-table-products-row__flavor">{flavor}</div>
      <div role="cell" className="ds-table-products-row__cell ds-table-products-row__type">{type}</div>
      <div role="cell" className="ds-table-products-row__cell ds-table-products-row__nicotine">{nicotine}</div>
      <div role="cell" className="ds-table-products-row__cell ds-table-products-row__quantity">{quantity}</div>
      <div role="cell" className="ds-table-products-row__cell ds-table-products-row__amount">{amount}</div>
    </div>
  );
}
