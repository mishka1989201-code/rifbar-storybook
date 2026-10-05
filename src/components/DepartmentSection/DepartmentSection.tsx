import type { HTMLAttributes, ReactNode } from 'react';
import { ChevronDropDown, type ChevronDropDownProps } from '../ChevronDropDown';
import './DepartmentSection.css';

export interface DepartmentSectionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Section title, e.g. “Department”. */
  title?: ReactNode;
  /** Hint under the title. Pass `null` to hide it. */
  description?: ReactNode;
  /** Label of the pill on the right. Ignored when `action` is set. */
  actionLabel?: ReactNode;
  /** Props forwarded to the default `ChevronDropDown` pill (`onClick`, `open`, `disabled`, `color`…). */
  actionProps?: Omit<ChevronDropDownProps, 'children'>;
  /** Replaces the default pill. */
  action?: ReactNode;
}

/**
 * Figma `Section.Department`: a title row with a “Change” dropdown pill on the right,
 * a grey hint below and a Stroke Light V2 line at the bottom. The dropdown list itself
 * is rendered by the parent (see `ChevronDropDown`).
 */
export function DepartmentSection({
  title = 'Department',
  description = 'Select the department responsible for this ticket',
  actionLabel = 'Change',
  actionProps,
  action,
  className,
  ...rest
}: DepartmentSectionProps) {
  const classes = ['ds-department-section', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <div className="ds-department-section__head">
        <span className="ds-department-section__title">{title}</span>
        {action ?? <ChevronDropDown {...actionProps}>{actionLabel}</ChevronDropDown>}
      </div>
      {description != null && <p className="ds-department-section__description">{description}</p>}
    </div>
  );
}
