import type { OrderStatusKey } from '../../components/TableRowOrder';

export interface OrderRecord {
  id: number;
  name: string;
  price: number;
  type: string;
  client: string;
  phone: string;
  date: Date;
  status: OrderStatusKey;
}

/** The statuses in the order of the Figma filter list. */
export const STATUS_OPTIONS: { value: OrderStatusKey; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-work', label: 'In work' },
  { value: 'approved', label: 'Approved' },
  { value: 'awaiting-payment', label: 'Awaiting payment' },
  { value: 'in-shipping', label: 'In shipping' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'received', label: 'Received' },
];

export const SORT_OPTIONS = [
  { value: 'name', label: 'Order name' },
  { value: 'price', label: 'Price' },
  { value: 'type', label: 'Type' },
  { value: 'date', label: 'Date' },
];

/** The eleven rows of the Figma frame (statuses, names), then 19 more so that 11 rows per page give 3 pages. */
const FIRST: [string, OrderStatusKey][] = [
  ['Order #3', 'pending'],
  ['Order #123', 'in-work'],
  ['Order #1433', 'approved'],
  ['Order #34', 'awaiting-payment'],
  ['Order #65', 'in-shipping'],
  ['Order #123', 'rejected'],
  ['Order #13', 'approved'],
  ['Order #67', 'received'],
  ['Order #2', 'rejected'],
  ['Order #644', 'received'],
  ['Order #87', 'received'],
];

const CLIENTS = [
  { client: "Fry's", phone: '+44 32 567 8473' },
  { client: 'Central Perk', phone: '+44 32 567 1120' },
  { client: "Sam's Club", phone: '+44 32 567 9021' },
];

export const ORDERS: OrderRecord[] = Array.from({ length: 30 }, (_, i) => {
  const [name, status] = FIRST[i] ?? [`Order #${200 + i * 7}`, STATUS_OPTIONS[(i * 3) % STATUS_OPTIONS.length].value];
  return {
    id: i + 1,
    name,
    price: 1200,
    type: 'Purchase',
    ...CLIENTS[i % CLIENTS.length],
    // The Figma date 08.24.2023 for the first rows, then a day back each row.
    date: new Date(2023, 7, 24 - Math.max(0, i - 10)),
    status,
  };
});

export const formatDate = (d: Date) =>
  `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}.${d.getFullYear()}`;

export const formatPrice = (n: number) => `$${n}`;
