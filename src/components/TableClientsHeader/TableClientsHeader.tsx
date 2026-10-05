import {
  TableCategoryHeader,
  type TableCategoryHeaderColumn,
  type TableCategoryHeaderProps,
} from '../TableCategoryHeader';

export type TableClientsHeaderColumn = TableCategoryHeaderColumn;
export type TableClientsHeaderProps = TableCategoryHeaderProps;

/** Figma frame: five sortable columns (the last one, `Joined`, right-aligned) and `Actions`. */
export const DEFAULT_CLIENTS_COLUMNS: TableClientsHeaderColumn[] = [
  { id: 'name', label: 'Name', width: 170, sortable: true },
  { id: 'company', label: 'Company', width: 170, sortable: true },
  { id: 'phone', label: 'Phone', width: 150, sortable: true },
  { id: 'email', label: 'Email', width: 220, sortable: true },
  { id: 'joined', label: 'Joined', width: 80, align: 'end', sortable: true },
  { id: 'actions', label: 'Actions', width: 166, align: 'end' },
];

/**
 * Figma `Table Header 5`: header row of the clients table. Same look as
 * `TableCategoryHeader` (transparent, Headlines color, sort icons) with the clients column set.
 */
export function TableClientsHeader({ columns = DEFAULT_CLIENTS_COLUMNS, ...rest }: TableClientsHeaderProps) {
  return <TableCategoryHeader columns={columns} {...rest} />;
}
