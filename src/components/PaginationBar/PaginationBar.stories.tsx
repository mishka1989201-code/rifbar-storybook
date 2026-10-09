import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PaginationBar } from './PaginationBar';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=68-33100';

const meta = {
  title: 'Molecules/PaginationBar',
  component: PaginationBar,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    pageCount: { control: { type: 'number', min: 1 } },
    pageSize: { control: 'number' },
    pageSizeOptions: { control: 'object' },
    onPageChange: { action: 'page changed' },
    onPageSizeChange: { action: 'page size changed' },
  },
  args: { page: 1, pageCount: 3, pageSize: 8 },
  // Controlled wrapper so the bar is interactive in Storybook.
  render: function Render(args) {
    const [page, setPage] = useState(args.page);
    const [size, setSize] = useState(args.pageSize);
    return (
      <div style={{ maxWidth: 1524, paddingTop: 140 }}>
        <PaginationBar
          {...args}
          page={page}
          pageSize={size}
          onPageChange={(p) => {
            setPage(p);
            args.onPageChange?.(p);
          }}
          onPageSizeChange={(s) => {
            setSize(s);
            args.onPageSizeChange?.(s);
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof PaginationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: Show 8, pages 1 2 3, first active) ──────────────────────
export const Default: Story = {};

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const MiddlePage: Story = { name: 'Middle page', args: { page: 2 } };

export const ManyPages: Story = {
  name: 'Many pages',
  args: { page: 7, pageCount: 14 },
  parameters: { docs: { description: { story: 'Long lists collapse into “...” (Pagination `Version=2`).' } } },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const SinglePage: Story = {
  name: 'Single page',
  args: { pageCount: 1 },
  parameters: { docs: { description: { story: 'Both arrows are disabled.' } } },
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <PaginationBar {...args} />
    </div>
  ),
  parameters: { docs: { description: { story: 'Below the width of both groups the pagination wraps under “Show:” (Figma 360px draws it stacked; AI-defined threshold: it wraps when it no longer fits).' } } },
};

// ─── RESPONSIVE (Figma Pagination Responsive: 768 / 480 / 360px) ─────────────
const CARD = (width: number) => [
  (Story: () => JSX.Element) => (
    <div style={{ width, padding: '0 16px', background: 'var(--color-white)', borderRadius: 'var(--radius-lg)' }}>
      <Story />
    </div>
  ),
];

export const FlatV1: Story = {
  name: 'Flat in a card, v1 (768px)',
  args: { page: 4, pageCount: 14, flat: true },
  decorators: CARD(704),
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3739-305804' }, docs: { description: { story: 'Inside a white card the bar has no shadow (Figma `Pagination Responsive`).' } } },
};

export const FlatV2: Story = {
  name: 'Flat in a card, v2 (768px)',
  args: { page: 5, pageCount: 14, flat: true, siblingCount: 1 },
  decorators: CARD(704),
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3739-305804' } },
};

export const StackedV1: Story = {
  name: 'Stacked, v1 (480 / 360px)',
  args: { page: 4, pageCount: 14, flat: true, stacked: true },
  decorators: CARD(348),
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3739-305804' }, docs: { description: { story: '“Show:” above, the 24px pagination under it across the whole width.' } } },
};

export const StackedV2: Story = {
  name: 'Stacked, v2 (480 / 360px)',
  args: { page: 5, pageCount: 14, flat: true, stacked: true, siblingCount: 1 },
  decorators: CARD(348),
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3739-305804' } },
};

export const StackedNarrow: Story = {
  name: 'Stacked, 300px',
  args: { page: 4, pageCount: 14, flat: true, stacked: true },
  decorators: CARD(332),
};
