import type { HTMLAttributes } from 'react';
import { TimeTrackerDate, type TimeTrackerDateProps } from '../TimeTrackerDate';
import { TimeTrackerTitle, type TimeTrackerTitleProps } from '../TimeTrackerTitle';
import './TimeTrackerBar.css';

export interface TimeTrackerBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Props of the left part: `title`, `playProps`. */
  titleProps?: TimeTrackerTitleProps;
  /** Props of the right part: `label`, `onPrev`, `onReset`, `onNext`… */
  dateProps?: TimeTrackerDateProps;
}

/**
 * Figma `TimeTracker/Play Actions Menu`: the top bar of the time tracker — `TimeTrackerTitle` on the left,
 * `TimeTrackerDate` on the right, white, 16px padding, Stroke Light V1 line below.
 */
export function TimeTrackerBar({ titleProps, dateProps, className, ...rest }: TimeTrackerBarProps) {
  const classes = ['ds-time-tracker-bar', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <TimeTrackerTitle {...titleProps} />
      <TimeTrackerDate {...dateProps} />
    </div>
  );
}
