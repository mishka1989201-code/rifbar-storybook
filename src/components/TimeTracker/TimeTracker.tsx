import type { HTMLAttributes, ReactNode } from 'react';
import { TimeScale, type TimeScaleProps, type TimeScaleSegment } from '../TimeScale';
import { TimeTrackerBar, type TimeTrackerBarProps } from '../TimeTrackerBar';
import './TimeTracker.css';

/** Figma `Property 1`: `static` = Play, `active` = the timer runs (Stop), `disabled` = Play is disabled. */
export type TimeTrackerState = 'static' | 'active' | 'disabled';

export interface TimeTrackerStat {
  /** Small caption, e.g. “Total”. */
  label: ReactNode;
  /** Big value, e.g. “1 h 59 min”. */
  value: ReactNode;
}

export interface TimeTrackerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma `Property 1`. */
  state?: TimeTrackerState;
  /** Name next to the Play button, e.g. “David Schwimmer”. */
  title?: ReactNode;
  /** Date caption of the right part, e.g. “Today”. */
  dateLabel?: ReactNode;
  /** Figma `Statistic`: caption + value pairs separated by a vertical line. Figma: Total, Break. */
  stats?: TimeTrackerStat[];
  /** Worked periods drawn on the scale, in hours of the day (see `TimeScale`). */
  segments?: TimeScaleSegment[];
  /** Called when the Play / Stop button is pressed. */
  onToggle?: () => void;
  onPrev?: () => void;
  onReset?: () => void;
  onNext?: () => void;
  /** Extra props for the top bar (`titleProps`, `dateProps`) — they win over the shortcuts above. */
  barProps?: TimeTrackerBarProps;
  /** Extra props for the scale (`startHour`, `hours`). */
  scaleProps?: Omit<TimeScaleProps, 'segments'>;
}

/**
 * Figma `TimeTracker`: a white card with the top bar (`TimeTrackerBar`), the statistic and the day scale (`TimeScale`).
 * An organism composed only of existing molecules.
 */
export function TimeTracker({
  state = 'static',
  title = 'My Time',
  dateLabel = 'Today',
  stats = [],
  segments = [],
  onToggle,
  onPrev,
  onReset,
  onNext,
  barProps,
  scaleProps,
  className,
  ...rest
}: TimeTrackerProps) {
  const classes = ['ds-time-tracker', `ds-time-tracker--${state}`, className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <TimeTrackerBar
        {...barProps}
        titleProps={{
          title,
          playProps: { kind: state === 'active' ? 'stop' : 'play', disabled: state === 'disabled', onClick: onToggle },
          ...barProps?.titleProps,
        }}
        dateProps={{ label: dateLabel, onPrev, onReset, onNext, ...barProps?.dateProps }}
      />
      <div className="ds-time-tracker__body">
        {stats.length > 0 && (
          <dl className="ds-time-tracker__stats">
            {stats.map((stat, i) => (
              <div key={i} className="ds-time-tracker__stat">
                <dt className="ds-time-tracker__label">{stat.label}</dt>
                <dd className="ds-time-tracker__value">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <TimeScale {...scaleProps} segments={segments} />
      </div>
    </div>
  );
}
