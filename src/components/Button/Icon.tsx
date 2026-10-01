import type { CSSProperties } from 'react';
import arrowRight from './icons/arrow-right.svg';
import back from './icons/back.svg';
import checkmarks from './icons/checkmarks.svg';
import clear from './icons/clear.svg';
import csv from './icons/csv.svg';
import del from './icons/delete.svg';
import exportIcon from './icons/export.svg';
import info from './icons/info.svg';

/** SVGs exported 1:1 from the Figma "Icons 16px" / "Icons 24px" components. */
const ICONS = {
  'arrow-right': { src: arrowRight, size: 16 },
  back: { src: back, size: 16 },
  checkmarks: { src: checkmarks, size: 16 },
  clear: { src: clear, size: 16 },
  csv: { src: csv, size: 24 },
  delete: { src: del, size: 16 },
  export: { src: exportIcon, size: 16 },
  info: { src: info, size: 16 },
} as const;

export type IconName = keyof typeof ICONS;
export const iconNames = Object.keys(ICONS) as IconName[];

export interface IconProps {
  name: IconName;
  className?: string;
}

/**
 * Renders a Figma icon as a CSS mask so it inherits `currentColor` —
 * the button's text-color token drives the icon color in every state.
 */
export function Icon({ name, className }: IconProps) {
  const { src, size } = ICONS[name];
  const style = { '--ds-icon-url': `url("${src}")` } as CSSProperties;
  return (
    <span
      aria-hidden="true"
      className={['ds-icon', size === 24 ? 'ds-icon--lg' : '', className].filter(Boolean).join(' ')}
      style={style}
    />
  );
}
