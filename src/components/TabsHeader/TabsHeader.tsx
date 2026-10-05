import type { HTMLAttributes } from 'react';
import { Tab } from '../Tabs';
import './TabsHeader.css';

export interface TabsHeaderItem {
  /** Stable id, returned by `onChange`. */
  id: string;
  label: string;
  disabled?: boolean;
}

export interface TabsHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Tabs in order. Figma shows 7. */
  items: TabsHeaderItem[];
  /** Id of the active tab. */
  value: string;
  /** Called with the id of the tab the user picked. */
  onChange?: (id: string) => void;
  /** Accessible name of the tab list. */
  'aria-label'?: string;
}

/**
 * Figma `Tabs Header`: white bar with a row of `Tab` atoms. Top corners are rounded (6px),
 * the bar stretches to the width of its container.
 */
export function TabsHeader({
  items,
  value,
  onChange,
  className,
  'aria-label': ariaLabel = 'Tabs',
  ...rest
}: TabsHeaderProps) {
  const classes = ['ds-tabs-header', className].filter(Boolean).join(' ');
  return (
    <div role="tablist" aria-label={ariaLabel} className={classes} {...rest}>
      {items.map((item) => (
        <Tab
          key={item.id}
          active={item.id === value}
          disabled={item.disabled}
          onClick={() => onChange?.(item.id)}
        >
          {item.label}
        </Tab>
      ))}
    </div>
  );
}
