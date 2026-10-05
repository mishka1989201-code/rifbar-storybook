import type { Meta, StoryObj } from '@storybook/react';
import { useState, type CSSProperties } from 'react';
import { Pagination } from './Pagination';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=6294-253370';

/** Controlled wrapper so the stories are clickable. */
function Controlled(props: { page: number; pageCount: number; siblingCount?: number }) {
  const [page, setPage] = useState(props.page);
  return <Pagination {...props} page={page} onPageChange={setPage} />;
}

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'canvas' },
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    pageCount: { control: { type: 'number', min: 1 } },
    siblingCount: { control: { type: 'number', min: 0, max: 3 } },
    onPageChange: { action: 'page changed' },
  },
  args: { page: 1, pageCount: 3 },
  render: (args) => <Controlled {...args} />,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `Version=1`: 1 2 3, current page is dark. */
export const Short: Story = {};

/** Figma `Version=2`: 1 2 3 4 5 6 ... 14, current page 4. */
export const Long: Story = { args: { page: 4, pageCount: 14 } };

export const LongFirstPage: Story = {
  args: { page: 1, pageCount: 14 },
  parameters: { docs: { description: { story: 'The "previous" arrow is disabled on the first page.' } } },
};

export const LongMiddle: Story = {
  args: { page: 8, pageCount: 14 },
  parameters: { docs: { description: { story: 'Gaps on both sides of the current page ± 2.' } } },
};

export const LongLastPage: Story = {
  args: { page: 14, pageCount: 14 },
  parameters: { docs: { description: { story: 'The "next" arrow is disabled on the last page.' } } },
};

export const SinglePage: Story = {
  args: { page: 1, pageCount: 1 },
  parameters: { docs: { description: { story: 'Both arrows are disabled. Usually hide pagination for one page.' } } },
};

const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16 };

/** Mirrors the Figma frame: both versions. */
export const AllVersions: Story = {
  name: 'All Versions',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={col}>
      <Controlled page={1} pageCount={3} />
      <Controlled page={4} pageCount={14} />
    </div>
  ),
};
