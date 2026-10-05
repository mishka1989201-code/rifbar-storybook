import type { HTMLAttributes, ReactNode } from 'react';
import { CardHeader, type CardHeaderProps } from '../CardHeader';
import { DepartmentSection, type DepartmentSectionProps } from '../DepartmentSection';
import { InfoClient, type InfoClientProps } from '../InfoClient';
import './InfoBlock.css';

/**
 * `info` — Figma `InfoBlock.board_all-orders`: blue badge, label/value body.
 * `ticket` — Figma `TicketInfo/v1`: violet badge, Stroke Light V2 border, body of `DepartmentSection`s.
 */
export type InfoBlockVariant = 'info' | 'ticket';

export interface InfoBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card look. Default `info`. */
  variant?: InfoBlockVariant;
  /** `ticket` only: sections of the body (title + “Change” pill + hint). Ignored when `children` is set. */
  sections?: (DepartmentSectionProps & { id?: string })[];
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
  sections,
  title,
  icon,
  actions,
  infoProps,
  children,
  className,
  ...rest
}: InfoBlockProps) {
  const classes = ['ds-info-block', `ds-info-block--${variant}`, className].filter(Boolean).join(' ');
  const isTicket = variant === 'ticket';
  const ticketBody = sections?.map((section, i) => <DepartmentSection key={section.id ?? i} {...section} />);
  return (
    <section className={classes} {...rest}>
      <CardHeader title={title} icon={icon} actions={actions} tone={isTicket ? 'violet' : 'blue'} />
      <div className="ds-info-block__body">{children ?? (isTicket ? ticketBody : <InfoClient {...infoProps} />)}</div>
    </section>
  );
}
