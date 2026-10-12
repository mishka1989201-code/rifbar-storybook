import { useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Checkbox } from '../Checkbox';
import { ImageCard } from '../ImageCard';
import './SelectProducts.css';

export interface SelectProductsItem {
  id: string;
  /** Product / flavour name. */
  name: ReactNode;
  /** Photo URL. Any item with a photo makes all rows show the 32px `ImageCard` (Figma `Backpacks`). */
  image?: string;
  /** Current price, e.g. `$15`. */
  price: ReactNode;
  /** Price before the discount: drawn crossed out in Secondary Grey, and `price` turns Violet (Figma `$15 → $13`). */
  oldPrice?: ReactNode;
  disabled?: boolean;
}

export interface SelectProductsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  items: SelectProductsItem[];
  /** Controlled: ids of the chosen products. */
  selected?: string[];
  /** Uncontrolled initial choice. */
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
  /** Label of the “select all” checkbox. */
  selectAllLabel?: ReactNode;
  /** Columns of the list. The items fill the left column first (Figma). Below 640px of width it is always one column. */
  columns?: 1 | 2;
}

/**
 * Figma `Select Products` (1299:429127): the opened part of a product row on the Custom price tab — a “Select all”
 * checkbox and the product lines to pick, in two columns. Each line is a card (checkbox, optional photo, name, price).
 * Figma draws “Select all” checked only when every line is checked; no partial state.
 */
export function SelectProducts({
  items,
  selected,
  defaultSelected = [],
  onChange,
  selectAllLabel = 'Select all',
  columns = 2,
  className,
  ...rest
}: SelectProductsProps) {
  const uid = useId();
  const [inner, setInner] = useState<string[]>(defaultSelected);
  const chosen = selected ?? inner;
  const enabled = items.filter((i) => !i.disabled);
  const allChosen = enabled.length > 0 && enabled.every((i) => chosen.includes(i.id));
  const withImages = items.some((i) => i.image);

  const commit = (next: string[]) => {
    setInner(next);
    onChange?.(next);
  };
  const toggle = (id: string) => commit(chosen.includes(id) ? chosen.filter((c) => c !== id) : [...chosen, id]);
  const toggleAll = () =>
    commit(allChosen ? chosen.filter((c) => !enabled.some((i) => i.id === c)) : [...new Set([...chosen, ...enabled.map((i) => i.id)])]);

  const classes = ['ds-select-products', columns === 1 && 'ds-select-products--single', className].filter(Boolean).join(' ');
  const rows = columns === 1 ? items.length : Math.ceil(items.length / 2);

  return (
    <div className={classes} {...rest}>
      <div className="ds-select-products__head">
        <Checkbox checked={allChosen} onChange={toggleAll} disabled={enabled.length === 0}>
          <span className="ds-select-products__all">{selectAllLabel}</span>
        </Checkbox>
      </div>
      <ul className="ds-select-products__list" style={{ ['--ds-select-products-rows' as string]: rows }}>
        {items.map((item) => {
          const checked = chosen.includes(item.id);
          const inputId = `${uid}-${item.id}`;
          return (
            <li key={item.id} className={`ds-select-products__item${item.disabled ? ' is-disabled' : ''}`}>
              <Checkbox id={inputId} aria-labelledby={`${inputId}-name`} checked={checked} disabled={item.disabled} onChange={() => toggle(item.id)} />
              {withImages && <ImageCard src={item.image} alt="" size="sm" />}
              <label id={`${inputId}-name`} htmlFor={inputId} className="ds-select-products__name">
                {item.name}
              </label>
              <span className="ds-select-products__prices">
                {item.oldPrice != null && <s className="ds-select-products__old">{item.oldPrice}</s>}
                <span className={item.oldPrice != null ? 'ds-select-products__new' : 'ds-select-products__price'}>{item.price}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
