import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import './TimeTrackerDate.css';

export interface TimeTrackerDateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Date caption, e.g. “Today” or “Oct 5, 2026”. */
  label?: ReactNode;
  onPrev?: () => void;
  /** The middle button: back to today. */
  onReset?: () => void;
  onNext?: () => void;
  /** Accessible names of the three buttons. */
  prevLabel?: string;
  resetLabel?: string;
  nextLabel?: string;
  /** Disables the arrows, e.g. when there is no earlier day. */
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}

/**
 * Figma `TimeTracker/Date`: calendar icon and the date in Headlines Medium h5, then three light icon buttons —
 * previous day, reset (today) and next day.
 */
export function TimeTrackerDate({
  label = 'Today',
  onPrev,
  onReset,
  onNext,
  prevLabel = 'Previous day',
  resetLabel = 'Today',
  nextLabel = 'Next day',
  prevDisabled,
  nextDisabled,
  className,
  ...rest
}: TimeTrackerDateProps) {
  const classes = ['ds-time-tracker-date', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <div className="ds-time-tracker-date__title">
        <Icon name="date" size={24} color="current" />
        <span className="ds-time-tracker-date__text">{label}</span>
      </div>
      <div className="ds-time-tracker-date__buttons">
        <Button variant="light" iconOnly="chevron-left" aria-label={prevLabel} disabled={prevDisabled} onClick={onPrev} />
        <Button variant="light" iconOnly="reboot" aria-label={resetLabel} onClick={onReset} />
        <Button variant="light" iconOnly="chevron-right" aria-label={nextLabel} disabled={nextDisabled} onClick={onNext} />
      </div>
    </div>
  );
}
