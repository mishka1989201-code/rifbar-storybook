import type { HTMLAttributes, ReactNode } from 'react';
import { CardHeader, type CardHeaderProps } from '../CardHeader';
import { InfoClient, type InfoClientProps } from '../InfoClient';
import './InfoBlock.css';

export interface InfoBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
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
 * Figma `InfoBlock.board_all-orders`: bordered card (radius 10, Cards Shadow) made of
 * a `CardHeader` title row and an `InfoClient` body. Pass `children` to put other content in the body.
 */
export function InfoBlock({
  title,
  icon,
  actions,
  infoProps,
  children,
  className,
  ...rest
}: InfoBlockProps) {
  const classes = ['ds-info-block', className].filter(Boolean).join(' ');
  return (
    <section className={classes} {...rest}>
      <CardHeader title={title} icon={icon} actions={actions} />
      <div className="ds-info-block__body">{children ?? <InfoClient {...infoProps} />}</div>
    </section>
  );
}
