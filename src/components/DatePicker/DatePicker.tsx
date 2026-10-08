import { useEffect, useMemo, useRef, useState, type HTMLAttributes, type KeyboardEvent } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { TimePicker } from '../TimePicker';
import './DatePicker.css';

/** Selected range; `end` is `null` until the second day is picked. */
export interface DateRange {
  start: Date | null;
  end: Date | null;
}

/** Figma `Property 1`: `date` / `date-time` → `actions`, `OneButtonApply` → `today`, `Full` → `actions` with `mode="range"`. */
export type DatePickerFooter = 'actions' | 'today' | 'none';

interface DatePickerBaseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Months drawn side by side. Default 1 for `single`, 2 for `range` (Figma `Full`). */
  months?: 1 | 2;
  /** Bottom bar: `Cancel` + `Apply` (default), the single `Today` button, or nothing. */
  footer?: DatePickerFooter;
  /** Month shown first (any day of it). Default: the month of the value, else today. */
  defaultMonth?: Date;
  /** Called with the first day of the first shown month after the arrows are used. */
  onMonthChange?: (firstOfMonth: Date) => void;
  /** BCP 47 tag for month, weekday and date names. */
  locale?: string;
  cancelLabel?: string;
  applyLabel?: string;
  todayLabel?: string;
  previousMonthLabel?: string;
  nextMonthLabel?: string;
  /** Shown in the range summary until a range is picked. */
  rangePlaceholder?: string;
  /** Called by `Cancel`. The picker does not close itself. */
  onCancel?: () => void;
}

interface SingleProps {
  mode?: 'single';
  /** Figma `date-time`: adds the `TimePicker` under the calendar. The value then carries the time. */
  withTime?: boolean;
  value?: Date | null;
  defaultValue?: Date | null;
  /** Called on every pick (the draft). */
  onChange?: (value: Date | null) => void;
  /** Called by `Apply` (and `Today`). */
  onApply?: (value: Date | null) => void;
}

interface RangeProps {
  mode: 'range';
  /** Ignored in range mode (Figma draws no time for a range). */
  withTime?: boolean;
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (value: DateRange) => void;
  onApply?: (value: DateRange) => void;
}

export type DatePickerProps = DatePickerBaseProps & (SingleProps | RangeProps);

const DEFAULT_TIME = { hours: 13, minutes: 20 };

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const firstOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1);
const sameDay = (a: Date | null, b: Date | null) => !!a && !!b && startOfDay(a).getTime() === startOfDay(b).getTime();
const key = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

/** Sunday-first grid of the weeks that cover `month`, with the days of the neighbouring months. */
function monthGrid(month: Date): Date[][] {
  const first = firstOfMonth(month);
  const offset = first.getDay();
  const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const weeks = Math.ceil((offset + days) / 7);
  const start = addDays(first, -offset);
  return Array.from({ length: weeks }, (_, w) => Array.from({ length: 7 }, (_, i) => addDays(start, w * 7 + i)));
}

/**
 * Figma `date-range-apply`: a calendar panel — month bar with two arrows, one or two months, an optional time
 * picker or range summary, and a `Cancel` / `Apply` (or `Today`) bar. Days are real buttons in a grid with
 * arrow-key navigation. Dates are local; the first day of the week is Sunday (as in Figma).
 */
export function DatePicker(props: DatePickerProps) {
  const {
    mode = 'single',
    withTime = false,
    value,
    defaultValue,
    onChange,
    onApply,
    months: monthsProp,
    footer = 'actions',
    defaultMonth,
    onMonthChange,
    locale = 'en-US',
    cancelLabel = 'Cancel',
    applyLabel = 'Apply',
    todayLabel = 'Today',
    previousMonthLabel = 'Previous month',
    nextMonthLabel = 'Next month',
    rangePlaceholder = 'Select a range',
    onCancel,
    className,
    ...rest
  } = props as DatePickerBaseProps &
    Partial<Omit<SingleProps, 'mode'>> &
    Partial<Omit<RangeProps, 'mode' | 'withTime'>> & { mode?: 'single' | 'range'; withTime?: boolean };

  const range = mode === 'range';
  const months = monthsProp ?? (range ? 2 : 1);

  // Draft selection: controlled by `value` when given, otherwise kept here.
  const [innerValue, setInnerValue] = useState<Date | null | DateRange>(
    defaultValue ?? (range ? { start: null, end: null } : null),
  );
  const draft = (value ?? innerValue) as Date | null | DateRange;
  const draftDate = range ? null : (draft as Date | null);
  const draftRange = range ? (draft as DateRange) : null;

  const [time, setTime] = useState(
    draftDate ? { hours: draftDate.getHours(), minutes: draftDate.getMinutes() } : DEFAULT_TIME,
  );

  const anchor = defaultMonth ?? draftDate ?? draftRange?.start ?? new Date();
  const [month, setMonth] = useState(() => firstOfMonth(anchor));
  const [focusDate, setFocusDate] = useState<Date>(() => startOfDay(draftDate ?? draftRange?.start ?? anchor));
  const rootRef = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef(false);

  const monthFmt = useMemo(() => new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }), [locale]);
  const dayFmt = useMemo(() => new Intl.DateTimeFormat(locale, { dateStyle: 'full' }), [locale]);
  const shortFmt = useMemo(
    () => new Intl.DateTimeFormat(locale, { year: 'numeric', month: '2-digit', day: '2-digit' }),
    [locale],
  );
  const weekdays = useMemo(() => {
    const sunday = new Date(2023, 0, 1); // a Sunday
    return Array.from({ length: 7 }, (_, i) => {
      const d = addDays(sunday, i);
      return {
        short: new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(d).slice(0, 2),
        long: new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(d),
      };
    });
  }, [locale]);

  const shown = Array.from({ length: months }, (_, i) => addMonths(month, i));
  const lastShown = shown[shown.length - 1];

  const goToMonth = (next: Date) => {
    const first = firstOfMonth(next);
    setMonth(first);
    onMonthChange?.(first);
  };

  const commit = (next: Date | null | DateRange) => {
    if (value === undefined) setInnerValue(next);
    (onChange as ((v: Date | null | DateRange) => void) | undefined)?.(next);
  };

  const withCurrentTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), time.hours, time.minutes);

  const pick = (day: Date) => {
    setFocusDate(day);
    if (range) {
      const { start, end } = draftRange!;
      if (!start || end || startOfDay(day) < startOfDay(start)) commit({ start: day, end: null });
      else commit({ start, end: day });
    } else {
      commit(withTime ? withCurrentTime(day) : startOfDay(day));
    }
  };

  const apply = (next: Date | null | DateRange = draft) =>
    (onApply as ((v: Date | null | DateRange) => void) | undefined)?.(next);

  const pickToday = () => {
    const today = startOfDay(new Date());
    goToMonth(today);
    setFocusDate(today);
    const next: Date | null | DateRange = range
      ? { start: today, end: today }
      : withTime
        ? withCurrentTime(today)
        : today;
    commit(next);
    apply(next);
  };

  // Keep the keyboard focus on the moved day after the month (and the buttons) have re-rendered.
  useEffect(() => {
    if (!pendingFocus.current) return;
    pendingFocus.current = false;
    const cells = rootRef.current?.querySelectorAll<HTMLButtonElement>(`[data-date="${key(focusDate)}"]`);
    (Array.from(cells ?? []).find((c) => !c.classList.contains('is-outside')) ?? cells?.[0])?.focus();
  }, [focusDate, month]);

  const onDayKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    let next: Date | null = null;
    if (e.key in step) next = addDays(focusDate, step[e.key]);
    else if (e.key === 'Home') next = addDays(focusDate, -focusDate.getDay());
    else if (e.key === 'End') next = addDays(focusDate, 6 - focusDate.getDay());
    else if (e.key === 'PageUp' || e.key === 'PageDown') {
      const n = e.key === 'PageUp' ? -1 : 1;
      const target = new Date(focusDate.getFullYear(), focusDate.getMonth() + n, 1);
      const dim = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
      next = new Date(target.getFullYear(), target.getMonth(), Math.min(focusDate.getDate(), dim));
    }
    if (!next) return;
    e.preventDefault();
    pendingFocus.current = true;
    setFocusDate(next);
    if (next < month) goToMonth(next);
    else if (next >= addMonths(lastShown, 1)) goToMonth(addMonths(next, -(months - 1)));
  };

  const inShown = shown.some((m) => m.getFullYear() === focusDate.getFullYear() && m.getMonth() === focusDate.getMonth());
  const tabDate = inShown ? focusDate : month;

  const hasSelection = range ? !!draftRange!.start && !!draftRange!.end : !!draftDate;
  const monthTitle = shown.map((m) => monthFmt.format(m)).join(' – ');
  const classes = ['ds-date-picker', className].filter(Boolean).join(' ');

  const dayCell = (day: Date, inMonth: boolean) => {
    let state = '';
    if (range) {
      const { start, end } = draftRange!;
      const isStart = sameDay(day, start);
      const isEnd = sameDay(day, end);
      if (isStart || isEnd) state = `is-selected${isStart ? ' is-start' : ''}${isEnd || !end ? ' is-end' : ''}`;
      else if (start && end && day > startOfDay(start) && day < startOfDay(end)) state = 'is-in-range';
    } else if (sameDay(day, draftDate)) state = 'is-selected is-start is-end';
    const selected = state.includes('is-selected');
    return (
      <div key={key(day)} role="gridcell" aria-selected={selected || state === 'is-in-range' || undefined} className="ds-date-picker__cell">
        <button
          type="button"
          className={`ds-date-picker__day ${state}${inMonth ? '' : ' is-outside'}`}
          data-date={key(day)}
          tabIndex={sameDay(day, tabDate) && inMonth ? 0 : -1}
          aria-label={dayFmt.format(day)}
          onClick={() => pick(day)}
          onKeyDown={onDayKeyDown}
        >
          {day.getDate()}
        </button>
      </div>
    );
  };

  return (
    <div ref={rootRef} role="group" aria-label="Date picker" className={classes} {...rest}>
      <div className="ds-date-picker__month">
        <button type="button" className="ds-date-picker__arrow" aria-label={previousMonthLabel} onClick={() => goToMonth(addMonths(month, -1))}>
          <Icon name="chevron-left" size={16} color="current" />
        </button>
        <span className="ds-date-picker__title" aria-live="polite">{monthTitle}</span>
        <button type="button" className="ds-date-picker__arrow" aria-label={nextMonthLabel} onClick={() => goToMonth(addMonths(month, 1))}>
          <Icon name="chevron-right" size={16} color="current" />
        </button>
      </div>

      <div className="ds-date-picker__calendars">
        {shown.map((m) => (
          <div key={key(m)} role="grid" aria-label={monthFmt.format(m)} className="ds-date-picker__calendar">
            <div role="row" className="ds-date-picker__week">
              {weekdays.map((w) => (
                <div key={w.long} role="columnheader" aria-label={w.long} className="ds-date-picker__weekday">{w.short}</div>
              ))}
            </div>
            {monthGrid(m).map((week) => (
              <div key={key(week[0])} role="row" className="ds-date-picker__week">
                {week.map((day) => dayCell(day, day.getMonth() === m.getMonth()))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {withTime && !range && (
        <TimePicker
          hours={time.hours}
          minutes={time.minutes}
          onChange={(hours, minutes) => {
            setTime({ hours, minutes });
            if (draftDate) commit(new Date(draftDate.getFullYear(), draftDate.getMonth(), draftDate.getDate(), hours, minutes));
          }}
        />
      )}

      {range && (
        <div className="ds-date-picker__summary">
          <output className={`ds-date-picker__range${draftRange!.start ? '' : ' is-empty'}`}>
            {draftRange!.start
              ? `${shortFmt.format(draftRange!.start)} - ${draftRange!.end ? shortFmt.format(draftRange!.end) : '…'}`
              : rangePlaceholder}
          </output>
        </div>
      )}

      {footer === 'actions' && (
        <div className="ds-date-picker__footer">
          <Button variant="light" size="medium" iconLeft="xmark" className="ds-date-picker__action" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="dark" size="medium" iconLeft="tick" className="ds-date-picker__action" disabled={!hasSelection} onClick={() => apply()}>
            {applyLabel}
          </Button>
        </div>
      )}
      {footer === 'today' && (
        <div className="ds-date-picker__footer">
          <Button variant="light" size="medium" className="ds-date-picker__action" onClick={pickToday}>
            {todayLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
