import type { HTMLAttributes } from 'react';
import './TimeScale.css';

export interface TimeScaleSegment {
  /** Start of the worked period, in hours of the day (24h), e.g. `8` or `9.5` for 09:30. */
  start: number;
  /** End of the worked period, same units. */
  end: number;
}

export interface TimeScaleProps extends HTMLAttributes<HTMLDivElement> {
  /** Worked periods drawn in green over the scale. */
  segments?: TimeScaleSegment[];
  /** First hour of the scale (24h). Figma: 8 (08:00 am). */
  startHour?: number;
  /** Number of one-hour parts. Figma: 12 → labels from 08:00 am to 08:00 pm. */
  hours?: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/** 8 → “08:00 am”, 12 → “12:00 pm”, 13 → “01:00 pm” (two lines in the label). */
function formatHour(hour24: number): [string, string] {
  const h = ((hour24 % 24) + 24) % 24;
  const suffix = h < 12 ? 'am' : 'pm';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return [`${String(h12).padStart(2, '0')}:00`, suffix];
}

/**
 * Figma `TimeTracker/Time Scale and Numbers`: a pill split into hour parts with worked periods in green,
 * and hour labels (“08:00 / am”) under the part borders.
 */
export function TimeScale({ segments = [], startHour = 8, hours = 12, className, ...rest }: TimeScaleProps) {
  const classes = ['ds-time-scale', className].filter(Boolean).join(' ');
  const endHour = startHour + hours;
  const labels = Array.from({ length: hours + 1 }, (_, i) => formatHour(startHour + i));

  return (
    <div className={classes} {...rest}>
      <div className="ds-time-scale__track" role="img" aria-label={segmentsLabel(segments, startHour, endHour)}>
        {Array.from({ length: hours }, (_, i) => (
          <span key={i} className={`ds-time-scale__part${i === hours - 1 ? ' ds-time-scale__part--last' : ''}`} />
        ))}
        {segments.map((segment, i) => {
          const from = clamp(segment.start, startHour, endHour);
          const to = clamp(segment.end, startHour, endHour);
          if (to <= from) return null;
          return (
            <span
              key={i}
              className="ds-time-scale__worked"
              style={{
                left: `${((from - startHour) / hours) * 100}%`,
                width: `${((to - from) / hours) * 100}%`,
              }}
            />
          );
        })}
      </div>
      <div className="ds-time-scale__numbers" aria-hidden="true">
        {labels.map(([time, suffix], i) => (
          <span key={i} className="ds-time-scale__number">
            <span>{time}</span>
            <span>{suffix}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function segmentsLabel(segments: TimeScaleSegment[], startHour: number, endHour: number) {
  const fmt = (h: number) => {
    const whole = Math.floor(h);
    const [time, suffix] = formatHour(whole);
    const minutes = Math.round((h - whole) * 60);
    return `${time.slice(0, 3)}${String(minutes).padStart(2, '0')} ${suffix}`;
  };
  const worked = segments.map((s) => `${fmt(s.start)} – ${fmt(s.end)}`).join(', ');
  return `Time scale ${fmt(startHour)} – ${fmt(endHour)}${worked ? `, worked: ${worked}` : ', nothing worked'}`;
}
