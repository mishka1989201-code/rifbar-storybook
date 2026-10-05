import type { HTMLAttributes, ReactNode } from 'react';
import { Checkbox, type CheckboxProps } from '../Checkbox';
import { InfoRowCard } from '../InfoRowCard';
import './CardRow.css';

export interface CardRowField {
  /** Stable key. */
  id: string;
  /** Text or any node, e.g. a `ChevronStatus`. */
  content: ReactNode;
  /** Caption. When set, the field is a two-column `InfoRowCard` line (Figma 1024 v3) with `content` as the value. */
  label?: ReactNode;
  /** `semibold` = Figma “First Info” / bold values, `medium` = Body/Small Medium. Default `medium`. */
  weight?: 'medium' | 'semibold';
  /** Underlined text (Figma: client / manager names). */
  underline?: boolean;
  /** Fixed-width block that wraps long text (Figma: address, comment). */
  grow?: boolean;
}

export interface CardRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Values of the info lines, in order. */
  fields: CardRowField[];
  /**
   * `row` — ID / checkbox / image on the left, lines and buttons on the right (Figma V1, V6).
   * `column` — everything stacked, ID sits before the first value (Figma V2–V5).
   */
  direction?: 'row' | 'column';
  /** Row number. Shown left of the lines (`row`) or before the first value (`column`). */
  index?: ReactNode;
  /** Shows a 16px checkbox on the left (Figma V1). */
  selectable?: boolean;
  /** Props of the checkbox, e.g. `checked`, `onChange`, `aria-label`. */
  checkboxProps?: Omit<CheckboxProps, 'size' | 'type'>;
  /** Thumbnail URL (Figma V1). */
  image?: string;
  /** Thumbnail size: `sm` = 80px (mobile), `lg` = 111px (Figma 1024 v2, 768 v1). Default `sm`. */
  imageSize?: 'sm' | 'lg';
  /** Alt text of the thumbnail. */
  imageAlt?: string;
  /** Buttons, right-aligned under the lines (Figma `Buttons`). */
  actions?: ReactNode;
}

/**
 * Figma `CardRow` (V1–V6) as ONE flex component: a white mobile card with a wrapping list of values
 * and a right-aligned row of buttons. The six Figma variants differ only in direction, ID/checkbox/image
 * and content, so they are props.
 */
export function CardRow({
  fields,
  direction = 'row',
  index,
  selectable = false,
  checkboxProps,
  image,
  imageAlt = '',
  imageSize = 'sm',
  actions,
  className,
  ...rest
}: CardRowProps) {
  const isRow = direction === 'row';
  const classes = ['ds-card-row', `ds-card-row--${direction}`, image && 'has-image', image && imageSize === 'lg' && 'has-image--lg', className]
    .filter(Boolean)
    .join(' ');

  const items = fields.map((field, i) => {
    const itemClasses = [
      'ds-card-row__field',
      field.weight === 'semibold' && 'ds-card-row__field--semibold',
      field.underline && 'ds-card-row__field--underline',
      field.grow && 'ds-card-row__field--grow',
    ]
      .filter(Boolean)
      .join(' ');
    if (field.label !== undefined) {
      return (
        <div key={field.id} className="ds-card-row__item ds-card-row__item--labeled">
          <InfoRowCard label={field.label} value={field.content} />
        </div>
      );
    }
    const node = <div className={itemClasses}>{field.content}</div>;
    if (i === 0 && !isRow && index !== undefined) {
      return (
        <div key={field.id} className="ds-card-row__first">
          <span className="ds-card-row__index">{index}</span>
          {node}
        </div>
      );
    }
    return <div key={field.id} className="ds-card-row__item">{node}</div>;
  });

  return (
    <div className={classes} {...rest}>
      {selectable && <Checkbox size={16} {...checkboxProps} />}
      {image && <img className="ds-card-row__image" src={image} alt={imageAlt} loading="lazy" />}
      {isRow && index !== undefined && <span className="ds-card-row__index ds-card-row__index--side">{index}</span>}
      <div className="ds-card-row__body">
        <div className="ds-card-row__lines">{items}</div>
        {actions && <div className="ds-card-row__actions">{actions}</div>}
      </div>
    </div>
  );
}
