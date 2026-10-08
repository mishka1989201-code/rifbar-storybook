import { useState, type HTMLAttributes } from 'react';
import { Slider } from '../Slider';
import './TimePicker.css';

export interface TimePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Controlled hours, 0–23. */
  hours?: number;
  /** Controlled minutes, 0–59. */
  minutes?: number;
  /** Initial hours when uncontrolled (Figma shows `13` = 01:20 PM). */
  defaultHours?: number;
  /** Initial minutes when uncontrolled. */
  defaultMinutes?: number;
  /** Step of the minutes slider. */
  minuteStep?: number;
  /** Called with the new time in 24h values. */
  onChange?: (hours: number, minutes: number) => void;
  disabled?: boolean;
  /** Accessible names of the two sliders. */
  hoursLabel?: string;
  minutesLabel?: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Figma `Time picker`: the chosen time as “01:20 PM” on the left and two `Slider`s on the right —
 * the top one picks hours (0–23), the bottom one minutes (0–59). The value is shown in the 12-hour format.
 */
export function TimePicker({
  hours,
  minutes,
  defaultHours = 13,
  defaultMinutes = 20,
  minuteStep = 1,
  onChange,
  disabled = false,
  hoursLabel = 'Hours',
  minutesLabel = 'Minutes',
  className,
  ...rest
}: TimePickerProps) {
  const [innerHours, setInnerHours] = useState(defaultHours);
  const [innerMinutes, setInnerMinutes] = useState(defaultMinutes);
  const h = hours ?? innerHours;
  const m = minutes ?? innerMinutes;

  const update = (nextHours: number, nextMinutes: number) => {
    setInnerHours(nextHours);
    setInnerMinutes(nextMinutes);
    onChange?.(nextHours, nextMinutes);
  };

  const classes = ['ds-time-picker', disabled && 'is-disabled', className].filter(Boolean).join(' ');

  return (
    <div role="group" aria-label="Time picker" className={classes} {...rest}>
      <div className="ds-time-picker__value" aria-live="polite">
        <span className="ds-time-picker__time">
          {pad(h % 12 === 0 ? 12 : h % 12)}:{pad(m)}
        </span>
        <span className="ds-time-picker__period">{h >= 12 ? 'PM' : 'AM'}</span>
      </div>
      <div className="ds-time-picker__sliders">
        <Slider
          className="ds-time-picker__slider"
          aria-label={hoursLabel}
          min={0}
          max={23}
          step={1}
          value={h}
          disabled={disabled}
          onChange={(e) => update(Number(e.target.value), m)}
        />
        <Slider
          className="ds-time-picker__slider"
          aria-label={minutesLabel}
          min={0}
          max={59}
          step={minuteStep}
          value={m}
          disabled={disabled}
          onChange={(e) => update(h, Number(e.target.value))}
        />
      </div>
    </div>
  );
}
