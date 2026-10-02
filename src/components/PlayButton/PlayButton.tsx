import type { ButtonHTMLAttributes } from 'react';
import './PlayButton.css';

/** Maps 1:1 to the Figma `Type` property of `Button.Play`. */
export type PlayButtonKind = 'play' | 'stop';

export interface PlayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma `Type`: `play` (Type=Play, green) or `stop` (Type=Stop, red). */
  kind?: PlayButtonKind;
  /**
   * Forces the hover visuals (Figma `Status=Static Hover`). For documentation only —
   * real hover is handled by CSS `:hover`.
   */
  forceHover?: boolean;
}

const DEFAULT_LABEL: Record<PlayButtonKind, string> = {
  play: 'Play',
  stop: 'Stop',
};

// Glyphs are copied from the Figma vectors (38×38 frame) and filled with currentColor.
const GLYPH: Record<PlayButtonKind, JSX.Element> = {
  play: (
    <path
      d="M15 14.5155C15 13.826 15 13.4812 15.1441 13.2887C15.2697 13.121 15.4619 13.016 15.6709 13.0011C15.9108 12.984 16.2008 13.1704 16.7809 13.5433L23.6011 17.9277C24.1044 18.2513 24.3561 18.4131 24.443 18.6188C24.519 18.7986 24.519 19.0014 24.443 19.1812C24.3561 19.3869 24.1044 19.5487 23.6011 19.8723L16.7809 24.2567C16.2008 24.6296 15.9108 24.816 15.6709 24.7989C15.4619 24.784 15.2697 24.679 15.1441 24.5113C15 24.3188 15 23.974 15 23.2844V14.5155Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2.88957"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  stop: <rect x="12" y="12" width="14" height="14" rx="3" fill="currentColor" />,
};

export function PlayButton({
  kind = 'play',
  forceHover = false,
  className,
  type = 'button',
  ...rest
}: PlayButtonProps) {
  const classes = ['ds-play-button', `ds-play-button--${kind}`, forceHover && 'is-hover', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} aria-label={DEFAULT_LABEL[kind]} {...rest}>
      <svg viewBox="0 0 38 38" fill="none" aria-hidden focusable="false">
        {GLYPH[kind]}
      </svg>
    </button>
  );
}
