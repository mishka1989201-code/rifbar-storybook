import type { HTMLAttributes, ReactNode } from 'react';
import { PlayButton, type PlayButtonProps } from '../PlayButton';
import './TimeTrackerTitle.css';

export interface TimeTrackerTitleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Text next to the button, e.g. “My Time”. */
  title?: ReactNode;
  /** Props of the `PlayButton` (`kind`, `onClick`, `disabled`, `aria-label`…). */
  playProps?: PlayButtonProps;
}

/**
 * Figma `TimeTracker/Play Buttons and Title`: the 38px green Play button and a grey Medium h5 title.
 */
export function TimeTrackerTitle({ title = 'My Time', playProps, className, ...rest }: TimeTrackerTitleProps) {
  const classes = ['ds-time-tracker-title', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <PlayButton {...playProps} />
      <span className="ds-time-tracker-title__text">{title}</span>
    </div>
  );
}
