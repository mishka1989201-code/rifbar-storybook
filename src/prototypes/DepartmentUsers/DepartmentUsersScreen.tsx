import { useMemo, useState } from 'react';
import { Button } from '../../components/Button';
import { CardGrid } from '../../components/CardGrid';
import { CardRow } from '../../components/CardRow';
import { Dropdown } from '../../components/Dropdown';
import { HeaderMenu, HeaderMenuItem } from '../../components/HeaderMenu';
import { InfoBlock } from '../../components/InfoBlock';
import { InputField } from '../../components/InputField';
import { LabeledField } from '../../components/LabeledField';
import { PageHeader } from '../../components/PageHeader';
import { PaginationBar } from '../../components/PaginationBar';
import { TableToolbar } from '../../components/TableToolbar';
import { Popover } from '../ClientOrders/controls';
import './DepartmentUsersScreen.css';

export type DepartmentUsersBreakpoint = '768' | '480' | '360';

export interface DepartmentUsersScreenProps {
  /** Figma frame width (`Pagination Responsive`). */
  breakpoint?: DepartmentUsersBreakpoint;
  /** Figma “Pagination v1” (1 2 3 4 5 6 … 14, page 4) or “v2” (1 … 4 5 6 … 14, page 5). */
  pagination?: 'v1' | 'v2';
}

interface UserRecord {
  id: number;
  name: string;
  department: string;
  role: string;
  date: string;
}

const PEOPLE: [string, string, string][] = [
  ['David Schwimmer', 'Management', 'Admin'],
  ['Matthew Perry', 'Warehouse', 'Admin'],
  ['Matt LeBlanc', 'Management', 'Manager'],
  ['James Michael Tyler', 'Warehouse', 'Manager'],
  ['Paul Rudd', 'Management', 'User'],
  ['David Schwimmer', 'Management', 'Admin'],
  ['Matthew Perry', 'Management', 'Admin'],
  ['Matt LeBlanc', 'Management', 'Manager'],
  ['James Michael Tyler', 'Management', 'Admin'],
  ['Paul Rudd', 'Management', 'User'],
];

/** 14 pages of 10 users (Figma shows “… 14”); the first ten are the Figma cards, the rest repeat them. */
const USERS: UserRecord[] = Array.from({ length: 140 }, (_, i) => {
  const [name, department, role] = PEOPLE[i % PEOPLE.length];
  return { id: i + 1, name, department, role, date: '07.23.2023' };
});

const SORT = [
  { value: 'name', label: 'Name' },
  { value: 'department', label: 'Department' },
  { value: 'role', label: 'Role' },
];

const PAGE_SIZES = [10, 20, 50];

/**
 * Prototype: a department page (Figma `Pagination Responsive`, “Management”): the `Main info` card and the
 * `Users in department` list with the responsive pagination at 768 / 480 / 360px, in both Figma versions.
 * Only existing components; the data is fake and in memory.
 */
export function DepartmentUsersScreen({ breakpoint = '768', pagination = 'v1' }: DepartmentUsersScreenProps) {
  const width = Number(breakpoint);
  const small = width <= 480;
  const v2 = pagination === 'v2';

  const [page, setPage] = useState(v2 ? 5 : 4);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [removed, setRemoved] = useState<number[]>([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOpen, setSortOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const users = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = USERS.filter(
      (u) => !removed.includes(u.id) && (!needle || `${u.name} ${u.department} ${u.role}`.toLowerCase().includes(needle)),
    );
    return sortBy ? [...list].sort((a, b) => String(a[sortBy as 'name']).localeCompare(String(b[sortBy as 'name']))) : list;
  }, [removed, query, sortBy]);

  // Figma shows 14 pages of 10; with fewer users (a search, deleted cards) the count follows the data.
  const pageCount = Math.max(1, Math.ceil(users.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const shown = users.slice((safePage - 1) * pageSize, safePage * pageSize);

  const bar = (
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
      siblingCount={v2 ? 1 : 2}
      stacked={small}
      flat
    />
  );

  return (
    <div className="proto-department-users" data-bp={breakpoint}>
      <main className="proto-department-users__panel">
        <PageHeader
          title="Management"
          size={small ? 'compact' : 'default'}
          menu={
            <HeaderMenu>
              <HeaderMenuItem icon="bell" label="Notifications" dot="warning" />
            </HeaderMenu>
          }
          breadcrumbs={{ variant: 'back', items: [{ label: 'Management', href: '#' }, { label: 'Management' }] }}
          onMenuClick={() => setMenuOpen((o) => !o)}
          menuLabel={menuOpen ? 'Close menu' : 'Open menu'}
        />
        <div className="proto-department-users__content">
          <InfoBlock
            variant="form"
            size={width === 360 ? 'mobile' : 'default'}
            title="Main info"
            icon="info"
            columns={[
              <LabeledField key="name" title="Roli's Name">
                <InputField value="Management" readOnly aria-label="Roli's Name" />
              </LabeledField>,
            ]}
          />
          <InfoBlock title="Users in department" icon="user">
            <div className="proto-department-users__users">
              <TableToolbar
                compact
                showClear
                filterCount={8}
                onClear={() => {
                  setQuery('');
                  setSortBy('');
                  setRemoved([]);
                }}
                sort={
                  <Popover
                    open={sortOpen}
                    onClose={() => setSortOpen(false)}
                    trigger={
                      <Button
                        variant="outline"
                        iconOnly="sort"
                        aria-label="Sort by"
                        aria-haspopup="listbox"
                        aria-expanded={sortOpen}
                        onClick={() => setSortOpen((o) => !o)}
                      />
                    }
                  >
                    <Dropdown
                      options={SORT}
                      value={sortBy}
                      listLabel="Sort by"
                      onChange={(v) => {
                        setSortBy(v as string);
                        setSortOpen(false);
                      }}
                    />
                  </Popover>
                }
                searchProps={{
                  value: query,
                  onChange: (e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  },
                }}
              />
              {bar}
              <CardGrid role="list" aria-label="Users in department">
                {shown.map((u, i) => (
                  <div key={u.id} role="listitem">
                    <CardRow
                      direction="column"
                      index={String((safePage - 1) * pageSize + i + 1)}
                      fields={[
                        { id: 'name', content: u.name, weight: 'semibold', underline: true },
                        { id: 'email', content: 'davidschwimmer23@gmail.com' },
                        { id: 'department', content: u.department },
                        { id: 'role', content: u.role },
                        { id: 'date', content: u.date },
                      ]}
                      actions={
                        <Button
                          variant="danger"
                          iconOnly="delete"
                          aria-label={`Delete ${u.name}`}
                          onClick={() => setRemoved((r) => [...r, u.id])}
                        />
                      }
                    />
                  </div>
                ))}
              </CardGrid>
              {shown.length === 0 && <p className="proto-department-users__empty">No users.</p>}
              {bar}
            </div>
          </InfoBlock>
        </div>
      </main>
    </div>
  );
}
