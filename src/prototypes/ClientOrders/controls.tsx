import { useEffect, useRef, type ReactNode } from 'react';

/**
 * A trigger with a panel under it (the menus of Figma `Sort by` and `Status Filter`). The Dropdown molecule draws
 * only the panel; opening, positioning and closing (outside click, Escape) are done here.
 */
export function Popover({
  open,
  onClose,
  trigger,
  children,
  align = 'start',
}: {
  open: boolean;
  onClose: () => void;
  trigger: ReactNode;
  children: ReactNode;
  align?: 'start' | 'end';
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div className="proto-popover" ref={ref}>
      {trigger}
      {open && <div className={`proto-popover__panel proto-popover__panel--${align}`}>{children}</div>}
    </div>
  );
}
