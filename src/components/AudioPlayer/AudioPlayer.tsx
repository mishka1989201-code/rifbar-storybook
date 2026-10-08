import type { CSSProperties, HTMLAttributes } from 'react';
import { Icon } from '../Icon';
import './AudioPlayer.css';

/**
 * Bar heights (0–1) of the Figma `Visualizer`, traced from the render: two full bars, a fast decay and
 * a tail of dots. The Figma asset itself could not be downloaded, so the bars are drawn in CSS.
 */
export const DEFAULT_PLAYER_LEVELS = [
  1, 1, 0.82, 0.55, 0.51, 0.51, 0.44, 0.35, 0.3, 0.3, 0.3, 0.28, 0.28, 0.28, 0.28, 0.28, 0.24, 0.24, 0.24, 0.24,
  0.24, 0.21, 0.12, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04,
];

export interface AudioPlayerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onVolumeChange'> {
  /** Visualizer bar heights, 0–1. */
  levels?: number[];
  /** Current position in seconds. */
  currentTime?: number;
  /** Total length in seconds. */
  duration?: number;
  /** Playing: the button shows “pause”; otherwise “play”. Figma draws the playing state. */
  playing?: boolean;
  /** Volume 0–1. */
  volume?: number;
  /** Called when the play / pause button is pressed. */
  onPlayPause?: () => void;
  /** Called with the new position in seconds. */
  onSeek?: (seconds: number) => void;
  /** Called with the new volume 0–1. */
  onVolumeChange?: (volume: number) => void;
}

const formatTime = (seconds: number) => {
  const total = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
};

/**
 * Figma `Player - Time Tracker`: a card with the audio visualizer, elapsed / total time with a timeline,
 * a play / pause button and a volume control.
 */
export function AudioPlayer({
  levels = DEFAULT_PLAYER_LEVELS,
  currentTime = 1,
  duration = 150,
  playing = true,
  volume = 0.25,
  onPlayPause,
  onSeek,
  onVolumeChange,
  className,
  ...rest
}: AudioPlayerProps) {
  const classes = ['ds-audio-player', className].filter(Boolean).join(' ');
  const progress = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;

  return (
    <div role="group" aria-label="Audio player" className={classes} {...rest}>
      <div className="ds-audio-player__visualizer" aria-hidden>
        {levels.map((level, index) => (
          <span
            key={index}
            className="ds-audio-player__bar"
            style={{ '--ds-player-level': Math.min(1, Math.max(0, level)) } as CSSProperties}
          />
        ))}
      </div>

      <div className="ds-audio-player__progress">
        <span className="ds-audio-player__time">
          <span>{formatTime(currentTime)}</span>
          <span aria-hidden>/</span>
          <span>{formatTime(duration)}</span>
        </span>
        <input
          type="range"
          className="ds-audio-player__range ds-audio-player__range--timeline"
          aria-label="Seek"
          min={0}
          max={duration}
          step={1}
          value={Math.min(currentTime, duration)}
          style={{ '--ds-range-fill': progress } as CSSProperties}
          onChange={(e) => onSeek?.(Number(e.target.value))}
        />
      </div>

      <div className="ds-audio-player__controls">
        <button
          type="button"
          className="ds-audio-player__button"
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={onPlayPause}
        >
          <Icon name={playing ? 'pause' : 'play'} size={16} color="current" />
        </button>
        <div className="ds-audio-player__volume">
          <input
            type="range"
            className="ds-audio-player__range ds-audio-player__range--volume"
            aria-label="Volume"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            style={{ '--ds-range-fill': volume } as CSSProperties}
            onChange={(e) => onVolumeChange?.(Number(e.target.value))}
          />
          <Icon name="volume-up" size={16} color="current" className="ds-audio-player__volume-icon" />
        </div>
      </div>
    </div>
  );
}
