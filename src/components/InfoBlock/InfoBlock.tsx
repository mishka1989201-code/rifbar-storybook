import type { HTMLAttributes, ReactNode } from 'react';
import { CardHeader, type CardHeaderProps } from '../CardHeader';
import { DepartmentSection, type DepartmentSectionProps } from '../DepartmentSection';
import { RowInfoBlock } from '../RowInfoBlock';
import { InfoClient, type InfoClientProps } from '../InfoClient';
import './InfoBlock.css';

/**
 * `info` — Figma `InfoBlock.board_all-orders`: blue badge, label/value body.
 * `ticket` — Figma `TicketInfo/v1`: violet badge, Stroke Light V2 border, body of `DepartmentSection`s.
 * `details` — Figma `TicketInfo/V2`: blue badge, Stroke Light V2 border, body of caption / value `rows`.
 */
export type InfoBlockVariant = 'info' | 'ticket' | 'details';

export interface InfoBlockRow {
  id?: string;
  label: ReactNode;
  /** Text or any node, e.g. a `ChevronDropDown` for “Status”. */
  value: ReactNode;
}

export interface InfoBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card look. Default `info`. */
  variant?: InfoBlockVariant;
  /** `mobile` = Figma `board_all-orders` at 320px: title row and body padded 10px instead of 16px. */
  size?: 'default' | 'mobile';
  /** `ticket` only: sections of the body (title + “Change” pill + hint). Ignored when `children` is set. */
  sections?: (DepartmentSectionProps & { id?: string })[];
  /** `details` only: caption / value rows (`RowInfoBlock variant="compact"`). Ignored when `children` is set. */
  rows?: InfoBlockRow[];
  /** Card title, e.g. “Client info”. */
  title: ReactNode;
  /** Icon of the title badge. Default `user`. */
  icon?: CardHeaderProps['icon'];
  /** Optional content on the right of the title row (not in Figma). */
  actions?: ReactNode;
  /** Props of the default `InfoClient` body (`fields`, `justify`). Ignored when `children` is set. */
  infoProps?: InfoClientProps;
  /** Custom body under the title row. Defaults to `<InfoClient {...infoProps} />`. */
  children?: ReactNode;
}

/**
 * Figma `InfoBlock.board_all-orders` (and its `TicketInfo/v1` variant): bordered card (radius 10, Cards Shadow) made of
 * a `CardHeader` title row and an `InfoClient` body. Pass `children` to put other content in the body.
 */
export function InfoBlock({
  variant = 'info',
  size = 'default',
  sections,
  rows,
  title,
  icon,
  actions,
  infoProps,
  children,
  className,
  ...rest
}: InfoBlockProps) {
  const classes = ['ds-info-block', `ds-info-block--${variant}`, size === 'mobile' && 'ds-info-block--mobile', className].filter(Boolean).join(' ');
  const isTicket = variant === 'ticket';
  const detailsBody = rows?.map((row, i) => (
    <RowInfoBlock key={row.id ?? i} variant="compact" label={row.label} value={row.value} />
  ));
  const ticketBody = sections?.map((section, i) => <DepartmentSection key={section.id ?? i} {...section} />);
  return (
    <section className={classes} {...rest}>
      <CardHeader title={title} icon={icon} actions={actions} tone={isTicket ? 'violet' : 'blue'} />
      <div className="ds-info-block__body">{children ?? (isTicket ? ticketBody : variant === 'details' ? detailsBody : <InfoClient {...infoProps} />)}</div>
    </section>
  );
}
