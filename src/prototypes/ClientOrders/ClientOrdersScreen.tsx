import { useMemo, useState } from 'react';
import { Button } from '../../components/Button';
import { DatePicker, type DateRange } from '../../components/DatePicker';
import { Dropdown } from '../../components/Dropdown';
import { FilterChevron } from '../../components/FilterChevron';
import { HeaderMenu, HeaderMenuItem } from '../../components/HeaderMenu';
import { FilterField } from '../../components/InputField';
import { Navbar, type NavbarSize } from '../../components/Navbar';
import type { NavbarMenuItem } from '../../components/NavbarMenu';
import { PageHeader } from '../../components/PageHeader';
import { PaginationBar } from '../../components/PaginationBar';
import { TableOrders, type TableOrdersItem } from '../../components/TableOrders';
import { OrderStatus } from '../../components/TableRowOrder';
import { TableToolbar } from '../../components/TableToolbar';
import type { ViewMode } from '../../components/ViewSwitch';
import { Popover } from './controls';
import { formatDate, formatPrice, ORDERS, SORT_OPTIONS, STATUS_OPTIONS } from './data';
import { FilterScreen } from './FilterScreen';
import './ClientOrdersScreen.css';

export type ClientOrdersBreakpoint = '1920' | '1440' | '1280' | '1024' | '768' | '480' | '360';

export interface ClientOrdersScreenProps {
  /** Figma frame width. The layout follows it: side menu from 1440px, cards from 768px. */
  breakpoint?: ClientOrdersBreakpoint;
  /** Start with the table (`list`) or the card grid (`cards`). Below 1024px both show cards, as Figma. */
  initialView?: ViewMode;
  /** Start with the filter screen open (Figma `Filter menu`, 768 / 480 / 360px). */
  initialFiltersOpen?: boolean;
  /** Figma `All Filters`: the filter screen with all six sections. */
  allFilters?: boolean;
  /** Start with this text in the search field (the empty result: a text that matches no order). */
  initialQuery?: string;
}

const MENU_ITEMS: NavbarMenuItem[] = [
  { id: 'clients', label: 'Clients', icon: 'user' },
  { id: 'shop', label: 'Online Shop', icon: 'cart' },
  { id: 'contact', label: 'Contact Us', icon: 'call' },
  { id: 'orders', label: 'Orders', icon: 'order' },
  { id: 'reports', label: 'Reports & Analytics', icon: 'graph', expandable: true },
  { id: 'products', label: 'Product Settings', icon: 'product-box', expandable: true },
  { id: 'tickets', label: 'Tickets', icon: 'ticket', secondary: true },
  { id: 'notes', label: 'All notes', icon: 'notes', secondary: true },
  { id: 'emails', label: 'Emails', icon: 'email', secondary: true },
  { id: 'groups', label: 'Groups', icon: 'groups', secondary: true },
];

const TABS = [
  { id: 'main', label: 'Main info' },
  { id: 'price', label: 'Custom price' },
  { id: 'orders', label: 'Orders' },
];

const ALL_STATUSES = STATUS_OPTIONS.map((s) => s.value as string);
const PAGE_SIZES = [11, 22, 33];
const NO_RANGE: DateRange = { start: null, end: null };
const rangeText = (r: DateRange) =>
  r.start && r.end ? `${formatDate(r.start)} – ${formatDate(r.end)}` : r.start ? formatDate(r.start) : '';

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

/**
 * Prototype: the client page, *Orders* tab (Figma `Manager User - Clients - All Clients Tab - Details (Orders Tab)`),
 * at 1920 / 1440 / 1280 / 1024 / 768 / 480 / 360px. Only existing components: `Navbar`, `PageHeader`, `PaginationBar`,
 * `TableToolbar`, `FilterChevron`, `TableOrders`, `FilterMenu` (see `FilterScreen`). The data is fake and lives in memory.
 */
export function ClientOrdersScreen({
  breakpoint = '1920',
  initialView = 'list',
  initialFiltersOpen = false,
  allFilters = false,
  initialQuery = '',
}: ClientOrdersScreenProps) {
  const width = Number(breakpoint);
  const compact = width <= 768;
  const withSideMenu = width >= 1440;

  const [view, setView] = useState<ViewMode>(initialView);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [statuses, setStatuses] = useState<string[]>(ALL_STATUSES);
  const [range, setRange] = useState<DateRange>(NO_RANGE);
  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('');
  const [tab, setTab] = useState('orders');
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(initialFiltersOpen);
  const [openMenu, setOpenMenu] = useState<'status' | 'range' | 'sort' | null>(null);
  const closeMenu = () => setOpenMenu(null);

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = ORDERS.filter((o) => {
      if (!statuses.includes(o.status)) return false;
      if (range.start && range.end) {
        const t = startOfDay(o.date);
        if (t < startOfDay(range.start) || t > startOfDay(range.end)) return false;
      }
      return !needle || `${o.name} ${o.type} ${o.client} ${o.phone}`.toLowerCase().includes(needle);
    });
    if (!sortBy) return filtered;
    const key = sortBy as 'name' | 'price' | 'type' | 'date';
    return [...filtered].sort((a, b) => {
      const x = a[key];
      const y = b[key];
      return x instanceof Date && y instanceof Date
        ? x.getTime() - y.getTime()
        : String(x).localeCompare(String(y), undefined, { numeric: true });
    });
  }, [statuses, range, query, sortBy]);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const shown = rows.slice((safePage - 1) * pageSize, safePage * pageSize);

  const items: TableOrdersItem[] = shown.map((o) => ({
    id: o.id,
    name: o.name,
    price: compact && o.id % 2 === 0 ? undefined : formatPrice(o.price),
    type: compact && o.id % 2 === 0 ? undefined : o.type,
    client: compact && o.id % 2 === 0 ? o.client : undefined,
    phone: compact && o.id % 2 === 0 ? o.phone : undefined,
    date: formatDate(o.date),
    status: <OrderStatus value={o.status} />,
  }));

  const chips = [
    ...statuses.map((s) => ({ id: s, label: 'Status', value: STATUS_OPTIONS.find((o) => o.value === s)?.label })),
    ...(range.start && range.end ? [{ id: 'range', label: 'Date', value: rangeText(range) }] : []),
  ];
  const removeFilter = (id: string) => {
    if (id === 'range') setRange(NO_RANGE);
    else setStatuses((s) => s.filter((v) => v !== id));
    setPage(1);
  };
  const clear = () => {
    setStatuses(ALL_STATUSES);
    setRange(NO_RANGE);
    setQuery('');
    setPage(1);
  };

  if (compact && filtersOpen) {
    return (
      <div className="proto-client-orders proto-client-orders--filters" data-bp={breakpoint}>
        <FilterScreen
          allFilters={allFilters}
          singleMonth={width < 768}
          statuses={statuses}
          onStatusesChange={(v) => {
            setStatuses(v);
            setPage(1);
          }}
          range={range}
          onRangeChange={setRange}
          chips={chips}
          onRemoveFilter={removeFilter}
          onClose={() => setFiltersOpen(false)}
        />
      </div>
    );
  }

  const statusMenu = (
    <Popover
      open={openMenu === 'status'}
      onClose={closeMenu}
      trigger={
        <FilterField
          placeholder="Status"
          open={openMenu === 'status'}
          style={{ width: 120 }}
          aria-label="Status"
          onClick={() => setOpenMenu(openMenu === 'status' ? null : 'status')}
        />
      }
    >
      <Dropdown
        control="checkbox"
        options={STATUS_OPTIONS}
        value={statuses}
        maxRows={4}
        listLabel="Status"
        onChange={(v) => {
          setStatuses(v as string[]);
          setPage(1);
        }}
      />
    </Popover>
  );

  const rangeMenu = (
    <Popover
      open={openMenu === 'range'}
      onClose={closeMenu}
      trigger={
        <FilterField
          icon="date"
          placeholder="Date range"
          value={rangeText(range) || undefined}
          style={{ minWidth: 120 }}
          aria-label="Date range"
          onClick={() => setOpenMenu(openMenu === 'range' ? null : 'range')}
        />
      }
    >
      <DatePicker
        mode="range"
        value={range}
        defaultMonth={new Date(2023, 7, 1)}
        onApply={(r) => {
          setRange(r);
          setPage(1);
          closeMenu();
        }}
        onCancel={closeMenu}
      />
    </Popover>
  );

  const sortMenu = (
    <Popover
      open={openMenu === 'sort'}
      onClose={closeMenu}
      trigger={
        <Button
          variant="outline"
          iconOnly="sort"
          aria-label="Sort by"
          aria-haspopup="listbox"
          aria-expanded={openMenu === 'sort'}
          onClick={() => setOpenMenu(openMenu === 'sort' ? null : 'sort')}
        />
      }
    >
      <Dropdown
        options={SORT_OPTIONS}
        value={sortBy}
        maxRows={4}
        listLabel="Sort by"
        onChange={(v) => {
          setSortBy(v as string);
          closeMenu();
        }}
      />
    </Popover>
  );

  const pagination = (
    <PaginationBar
      page={safePage}
      pageCount={pageCount}
      onPageChange={setPage}
      pageSize={pageSize}
      pageSizeOptions={PAGE_SIZES}
      onPageSizeChange={(s) => {
        setPageSize(s);
        setPage(1);
      }}
    />
  );

  return (
    <div className="proto-client-orders" data-bp={breakpoint} data-side-menu={withSideMenu || undefined}>
      {withSideMenu && (
        <Navbar
          size={breakpoint as NavbarSize}
          items={MENU_ITEMS}
          value="clients"
          user={{ name: 'Jennifer Corbett' }}
          className="proto-client-orders__navbar"
        />
      )}
      {!withSideMenu && menuOpen && (
        <Navbar
          size={breakpoint as NavbarSize}
          items={MENU_ITEMS}
          value="clients"
          user={{ name: 'Jennifer Corbett' }}
          onMenuClick={() => setMenuOpen(false)}
          className="proto-client-orders__overlay"
        />
      )}
      <main className="proto-client-orders__panel">
        <PageHeader
          title="Mickey Herman"
          menu={
            <HeaderMenu>
              <HeaderMenuItem icon="bell" label="Notifications" dot="warning" />
            </HeaderMenu>
          }
          breadcrumbs={{
            variant: compact ? 'back' : 'path',
            items: [{ label: 'Clients', href: '#' }, { label: 'All clients', href: '#' }, { label: 'Mickey Herman' }],
          }}
          tabs={{ items: TABS, value: tab, onChange: setTab, 'aria-label': 'Client' }}
          onMenuClick={withSideMenu ? undefined : () => setMenuOpen(true)}
        />
        <div className="proto-client-orders__content">
          {pagination}
          <div className="proto-client-orders__table">
            <TableToolbar
              compact={compact}
              onClear={clear}
              onFilterClick={() => setFiltersOpen(true)}
              filterCount={chips.length}
              filters={
                <>
                  {rangeMenu}
                  {statusMenu}
                </>
              }
              sort={sortMenu}
              view={view}
              onViewChange={setView}
              searchProps={{
                value: query,
                onChange: (e) => {
                  setQuery(e.target.value);
                  setPage(1);
                },
              }}
            />
            {!compact && chips.length > 0 && (
              <div className="proto-client-orders__chips">
                {chips.map((c) => (
                  <FilterChevron key={c.id} label={c.label} onRemove={() => removeFilter(c.id)}>
                    {c.value}
                  </FilterChevron>
                ))}
              </div>
            )}
            <TableOrders
              layout={compact || view === 'cards' ? 'cards' : 'table'}
              rows={items}
              onSort={(id) => setSortBy(id === 'status' ? sortBy : id)}
              emptyText="No orders match the filters."
            />
          </div>
          {pagination}
        </div>
      </main>
    </div>
  );
}
