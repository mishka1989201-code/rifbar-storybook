import { useState, type HTMLAttributes } from 'react';
import './RegionSwitch.css';

/** The two regions of the business: `us` — United States, `eu` — Europe. */
export type Region = 'us' | 'eu';

export interface RegionSwitchProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Selected region (controlled). */
  value?: Region;
  /** Initial region when uncontrolled. */
  defaultValue?: Region;
  /** Called with the new region. */
  onChange?: (region: Region) => void;
  /** Accessible names of the regions. */
  labels?: Record<Region, string>;
}

const DEFAULT_LABELS: Record<Region, string> = { us: 'United States', eu: 'Europe' };

const starPoints = (cx: number, cy: number, outer: number) => {
  const inner = outer * 0.382;
  return Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
};

/** Figma `UM - United States Minor Outlying Islands` (32×24). The Figma vectors could not be downloaded: the flag is drawn from its measured colours, with a simplified canton. */
function FlagUs() {
  const h = 24 / 13;
  return (
    <svg className="ds-region-switch__flag-img" viewBox="0 0 32 24" aria-hidden focusable="false">
      <rect width="32" height="24" className="ds-flag-us-white" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} y={i * 2 * h} width="32" height={h} className="ds-flag-us-red" />
      ))}
      <rect width="14" height={h * 7} className="ds-flag-us-blue" />
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: row % 2 === 0 ? 4 : 3 }, (_, col) => (
          <circle key={`${row}-${col}`} cx={(row % 2 === 0 ? 2 : 4) + col * 3.4} cy={1.9 + row * 3.1} r="0.7" className="ds-flag-us-white" />
        )),
      )}
    </svg>
  );
}

/** Figma `Flag_of_Europe 1` (32×24): twelve stars on a circle. */
function FlagEu() {
  return (
    <svg className="ds-region-switch__flag-img" viewBox="0 0 32 24" aria-hidden focusable="false">
      <rect width="32" height="24" className="ds-flag-eu-blue" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (Math.PI / 6) * i - Math.PI / 2;
        return <polygon key={i} points={starPoints(16 + 8 * Math.cos(a), 12 + 8 * Math.sin(a), 1.5)} className="ds-flag-eu-star" />;
      })}
    </svg>
  );
}

/**
 * Figma `Header Menu` → `toggle`: the region switch — the US flag, a 48×24 pill with a knob and the EU flag. The knob sits on the side of the
 * selected region; a click on a flag or on the pill selects it. The app shows the clients and settings of the selected region.
 */
export function RegionSwitch({ value, defaultValue = 'us', onChange, labels = DEFAULT_LABELS, className, ...rest }: RegionSwitchProps) {
  const [inner, setInner] = useState<Region>(defaultValue);
  const region = value ?? inner;
  const select = (next: Region) => {
    if (value === undefined) setInner(next);
    if (next !== region) onChange?.(next);
  };
  const classes = ['ds-region-switch', `ds-region-switch--${region}`, className].filter(Boolean).join(' ');

  return (
    <div role="group" aria-label="Region" className={classes} {...rest}>
      <button type="button" className="ds-region-switch__flag" aria-pressed={region === 'us'} aria-label={labels.us} onClick={() => select('us')}>
        <FlagUs />
      </button>
      <button
        type="button"
        role="switch"
        aria-checked={region === 'eu'}
        aria-label={`Region: ${labels[region]}`}
        className="ds-region-switch__pill"
        onClick={() => select(region === 'us' ? 'eu' : 'us')}
      >
        <span className="ds-region-switch__knob" aria-hidden />
      </button>
      <button type="button" className="ds-region-switch__flag" aria-pressed={region === 'eu'} aria-label={labels.eu} onClick={() => select('eu')}>
        <FlagEu />
      </button>
    </div>
  );
}
