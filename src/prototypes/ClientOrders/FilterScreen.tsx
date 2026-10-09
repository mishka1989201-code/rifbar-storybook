import { useState } from 'react';
import { Button } from '../../components/Button';
import { CheckListModal, type CheckListOption } from '../../components/CheckListModal';
import { DatePicker, type DateRange } from '../../components/DatePicker';
import { FilterMenu, type FilterMenuApplied } from '../../components/FilterMenu';
import { Modal } from '../../components/Modal';
import { STATUS_OPTIONS } from './data';

const DISCOUNTS: CheckListOption[] = [
  { value: 'off', label: 'Discounts off' },
  { value: 'active', label: 'Active Discounts' },
];
const toOptions = (labels: string[]): CheckListOption[] => labels.map((label) => ({ value: label, label }));
const FLAVORS = toOptions(['Malibu peach pineapple orange', 'Peach & Ice', 'Triple berry', 'Grey']);
const WAREHOUSES = toOptions(['Warsaw #345', 'Seattle #24', 'Idaho Falls #132']);
const MARKETERS = toOptions(['Paul Rudd', 'David Schwimmer', 'Matthew Perry', 'Matt LeBlanc']);

export interface FilterScreenProps {
  /** Figma `All Filters`: adds Discounts off, Flavor, Warehouse and Marketer under Status and Date range. */
  allFilters?: boolean;
  /** One month in the calendar instead of two (Figma 480 / 360px). */
  singleMonth?: boolean;
  statuses: string[];
  onStatusesChange: (value: string[]) => void;
  range: DateRange;
  onRangeChange: (range: DateRange) => void;
  chips: FilterMenuApplied[];
  onRemoveFilter: (id: string) => void;
  onClose: () => void;
}

/** Collapsible section: the `CheckListModal` header button toggles it. */
function useCollapse(initial = false) {
  const [collapsed, setCollapsed] = useState(initial);
  return { collapsed, onCollapse: () => setCollapsed((c) => !c) };
}

/** Figma `Filter menu` / `All Filters` at 768 / 480 / 360px: the filter screen that replaces the page on small screens. */
export function FilterScreen({
  allFilters = false,
  singleMonth = false,
  statuses,
  onStatusesChange,
  range,
  onRangeChange,
  chips,
  onRemoveFilter,
  onClose,
}: FilterScreenProps) {
  const status = useCollapse();
  const dates = useCollapse();
  const discounts = useCollapse();
  const flavor = useCollapse();
  const warehouse = useCollapse();
  const marketer = useCollapse();
  const [discount, setDiscount] = useState<string[]>(['off']);
  const [flavors, setFlavors] = useState<string[]>(['Peach & Ice']);
  const [warehouses, setWarehouses] = useState<string[]>(WAREHOUSES.map((o) => o.value));
  const [marketers, setMarketers] = useState<string[]>(['David Schwimmer']);

  return (
    <FilterMenu count={chips.length} filters={chips} onRemoveFilter={onRemoveFilter} onClose={onClose}>
      <CheckListModal
        title="Status"
        allLabel="All"
        options={STATUS_OPTIONS}
        value={statuses}
        onChange={onStatusesChange}
        {...status}
      />
      <Modal
        title="Date range"
        icon={null}
        size="list"
        elevated
        headerAction={
          <Button
            variant="light"
            iconOnly={dates.collapsed ? 'chevron-down' : 'chevron-up'}
            aria-label="Collapse"
            aria-expanded={!dates.collapsed}
            onClick={dates.onCollapse}
          />
        }
      >
        {dates.collapsed ? null : (
          <DatePicker
            mode="range"
            months={singleMonth ? 1 : 2}
            value={range}
            onChange={onRangeChange}
            defaultMonth={new Date(2023, 2, 1)}
            style={{ width: '100%' }}
          />
        )}
      </Modal>
      {allFilters && (
        <>
          <CheckListModal title="Discounts off" variant="radio" options={DISCOUNTS} value={discount} onChange={setDiscount} {...discounts} />
          <CheckListModal title="Flavor" variant="pick" options={FLAVORS} value={flavors} onChange={setFlavors} {...flavor} />
          <CheckListModal
            title="Warehouse"
            allLabel="All"
            accent
            searchable
            searchPlaceholder="Search by keyword"
            options={WAREHOUSES}
            value={warehouses}
            onChange={setWarehouses}
            {...warehouse}
          />
          <CheckListModal
            title="Marketer"
            variant="pick"
            searchable
            searchPlaceholder="Search by keyword"
            options={MARKETERS}
            value={marketers}
            onChange={setMarketers}
            {...marketer}
          />
        </>
      )}
    </FilterMenu>
  );
}
