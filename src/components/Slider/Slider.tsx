import type { InputHTMLAttributes } from 'react';
import './Slider.css';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * Forces the focus visuals. For documentation only —
   * real focus is handled by CSS `:focus-visible`.
   */
  forceFocus?: boolean;
}

/**
 * Figma `Slider Light`: a thin track with a round handle (Material "enabled discrete slider").
 * A native `<input type="range">`, so keyboard (arrows, Home/End, PageUp/Down), forms and
 * screen readers work as usual. Use `step` for a discrete slider. The Figma frame shows the
 * handle in the middle: `min=0 max=100 value=50`.
 */
export function Slider({ forceFocus = false, className, min = 0, max = 100, ...rest }: SliderProps) {
  const classes = ['ds-slider', forceFocus && 'is-focus', className].filter(Boolean).join(' ');
  return <input type="range" className={classes} min={min} max={max} {...rest} />;
}
