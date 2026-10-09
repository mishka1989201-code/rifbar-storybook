import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../Button';
import { CardHeader } from '../CardHeader';
import { FilterField } from '../InputField';
import './ScheduledCallCard.css';

/** Figma `Property 1`: `static` — white card, orange badge; `time-to-call` — the call is due: warning tint, green badge. */
export type ScheduledCallState = 'static' | 'time-to-call';

export interface ScheduledCallCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma `Property 1`. */
  state?: ScheduledCallState;
  /** Card title. Default “Scheduled call”. */
  title?: ReactNode;
  /** Caption above the date field. Default “Date - Time”. */
  dateLabel?: ReactNode;
  /** Formatted date and time, e.g. “03/28/2024 10:23 AM”. Empty → `placeholder`. */
  value?: ReactNode;
  /** Text of the empty date field. */
  placeholder?: ReactNode;
  /** The date field was pressed — the page opens a `DatePicker`. */
  onDateClick?: () => void;
  /** Label of the button. Default “Refresh”. */
  refreshLabel?: ReactNode;
  /** The button was pressed. Omit it to hide the button. */
  onRefresh?: () => void;
}

/**
 * Figma `scheduled-call-menu` (Property 1 Static / Time to call): a card with a `CardHeader`, the date and time of
 * the planned call as a `FilterField` with a calendar icon, and a `Refresh` button.
 */
export function ScheduledCallCard({
  state = 'static',
  title = 'Scheduled call',
  dateLabel = 'Date - Time',
  value,
  placeholder = 'Choose date and time',
  onDateClick,
  refreshLabel = 'Refresh',
  onRefresh,
  className,
  ...rest
}: ScheduledCallCardProps) {
  const due = state === 'time-to-call';
  const classes = ['ds-scheduled-call-card', due && 'is-due', className].filter(Boolean).join(' ');
  return (
    <section className={classes} {...rest}>
      <CardHeader title={title} icon="call" tone={due ? 'success' : 'warning'} />
      <div className="ds-scheduled-call-card__body">
        <label className="ds-scheduled-call-card__date">
          <span className="ds-scheduled-call-card__label">{dateLabel}</span>
          <FilterField
            icon="date"
            value={value}
            placeholder={placeholder}
            aria-haspopup="dialog"
            onClick={onDateClick}
          />
        </label>
        {onRefresh && (
          <Button variant="light" iconLeft="reboot" onClick={onRefresh}>
            {refreshLabel}
          </Button>
        )}
      </div>
    </section>
  );
}
