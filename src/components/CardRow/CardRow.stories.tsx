import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { ChevronStatus } from '../ChevronStatus';
import { CardRow } from './CardRow';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=7038-307795';

const IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="#1D2542"/><rect x="28" y="14" width="24" height="52" rx="4" fill="#F68F57"/></svg>',
  );

const more = <Button variant="light" iconLeft="info">More</Button>;

const meta = {
  title: 'Molecules/CardRow',
  component: CardRow,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    direction: { control: 'inline-radio', options: ['row', 'column'] },
    selectable: { control: 'boolean' },
    fields: { control: 'object' },
    actions: { control: false },
    checkboxProps: { control: 'object' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
} satisfies Meta<typeof CardRow>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma V1: product) ─────────────────────────────────────────────
export const Default: Story = {
  name: 'Product (V1)',
  args: {
    selectable: true,
    image: IMG,
    imageAlt: 'Astro',
    checkboxProps: { 'aria-label': 'Select Astro' },
    fields: [
      { id: 'name', content: 'Astro', weight: 'semibold' },
      { id: 'qty', content: '20' },
      { id: 'boxes', content: '8', weight: 'semibold' },
      { id: 'limit', content: 'up to 7500' },
      { id: 'volume', content: '15ml' },
    ],
    actions: more,
  },
};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const Delivery: Story = {
  name: 'Delivery (V2)',
  args: {
    direction: 'column',
    index: '1',
    fields: [
      { id: 'name', content: 'Warsaw #345', weight: 'semibold' },
      { id: 'address', content: 'Poland, Warsaw, Męcińska Street, 18', grow: true },
      { id: 'status', content: <ChevronStatus color="success">In delivery</ChevronStatus> },
      { id: 'from', content: '08.24.2023' },
      { id: 'to', content: '09.19.2023' },
    ],
    actions: more,
  },
};

export const Order: Story = {
  name: 'Order (V3)',
  args: {
    direction: 'column',
    fields: [
      { id: 'client', content: 'David Schwimmer', weight: 'semibold', underline: true },
      { id: 'manager', content: 'Paul Rudd', underline: true },
      { id: 'items', content: '246' },
      { id: 'sum', content: '$13250' },
      { id: 'date', content: '09.19.2023' },
      { id: 'status', content: <ChevronStatus color="dark">Approved</ChevronStatus> },
    ],
    actions: more,
  },
};

export const Request: Story = {
  name: 'Request (V4)',
  args: {
    direction: 'column',
    fields: [
      { id: 'client', content: 'David Schwimmer', weight: 'semibold', underline: true },
      { id: 'email', content: 'davidschwimmer23@gmail.com', grow: true },
      { id: 'text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', grow: true },
      { id: 'date', content: '09.05.2023 / 11:54 am' },
      { id: 'status', content: <ChevronStatus color="primary">Open</ChevronStatus> },
    ],
    actions: <Button variant="dark" iconOnly="call" aria-label="Call" />,
  },
};

export const WithDelete: Story = {
  name: 'Delete + info (V5)',
  args: {
    direction: 'column',
    index: '1',
    fields: [
      { id: 'name', content: 'Warsaw #345', weight: 'semibold' },
      { id: 'address', content: 'Poland, Warsaw, Męcińska Street, 18', grow: true },
      { id: 'client', content: 'David Schwimmer', underline: true },
      { id: 'date', content: '08.24.2023 / 08:00 am' },
    ],
    actions: (
      <>
        <Button variant="danger" iconOnly="delete" aria-label="Delete" />
        <Button variant="light" iconOnly="info" aria-label="More" />
      </>
    ),
  },
};

export const Wide: Story = {
  name: 'Wide, index on the left (V6)',
  decorators: [(Story) => <div style={{ maxWidth: 476 }}><Story /></div>],
  args: {
    index: '1',
    fields: [
      { id: 'name', content: 'Warsaw #345', weight: 'semibold' },
      { id: 'address', content: 'Poland, Warsaw, Męcińska Street, 18', grow: true },
      { id: 'client', content: 'David Schwimmer', underline: true },
      { id: 'date', content: '08.24.2023 / 08:00 am' },
    ],
    actions: more,
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongText: Story = {
  name: 'Long text',
  args: {
    ...Order.args,
    fields: [
      { id: 'client', content: 'Wolfeschlegelsteinhausenbergerdorff Construction Supplies International', weight: 'semibold', underline: true },
      { id: 'text', content: 'Very long comment that has to wrap onto several lines without breaking the card layout.', grow: true },
      { id: 'sum', content: '$13250' },
    ],
  },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  decorators: [(Story) => <div style={{ maxWidth: 229 }}><Story /></div>],
  args: Order.args,
};

export const NoActions: Story = {
  name: 'No actions',
  args: { ...Wide.args, actions: undefined },
};
