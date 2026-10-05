import type { HTMLAttributes } from 'react';
import { Avatar } from '../Avatar';
import './DepartmentItem.css';

export interface DepartmentItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Department name, e.g. “Management”. */
  name: string;
  /** Two-letter abbreviation in the square avatar, e.g. “MG”. Defaults to the initials of `name`. */
  initials?: string;
  /** Avatar photo URL. Without it the initials are shown. */
  src?: string;
}

/**
 * Figma `Department`: a square `Department Avatar` and the department name.
 * Fills the width of its container; a long name is cut with an ellipsis.
 */
export function DepartmentItem({ name, initials, src, className, ...rest }: DepartmentItemProps) {
  const classes = ['ds-department-item', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <Avatar variant="department" name={name} initials={initials} src={src} decorative />
      <span className="ds-department-item__name">{name}</span>
    </div>
  );
}
