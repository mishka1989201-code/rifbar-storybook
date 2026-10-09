import type { Meta, StoryObj } from '@storybook/react';
import { DepartmentUsersScreen, type DepartmentUsersBreakpoint } from './DepartmentUsersScreen';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=3739-305804';

const meta = {
  title: 'Prototypes/DepartmentUsers',
  component: DepartmentUsersScreen,
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: { story: { inline: false, iframeHeight: 900 } },
  },
  argTypes: {
    breakpoint: { control: 'inline-radio', options: ['768', '480', '360'] },
    pagination: { control: 'inline-radio', options: ['v1', 'v2'] },
  },
  args: { breakpoint: '768', pagination: 'v1' },
  // The frame has the width of the Figma artboard.
  decorators: [
    (Story, { args }) => (
      <div style={{ width: Number(args.breakpoint), minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DepartmentUsersScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

const at = (breakpoint: DepartmentUsersBreakpoint, pagination: 'v1' | 'v2'): Story => ({ args: { breakpoint, pagination } });

// ─── DEFAULT (Figma 768px Pagination v1) ─────────────────────────────────────
export const Default: Story = at('768', 'v1');

// ─── PAGINATION v1 / v2 AT EVERY WIDTH (Figma Pagination Responsive) ─────────
export const Tablet768V1: Story = { ...at('768', 'v1'), name: '768px, pagination v1' };
export const Tablet768V2: Story = { ...at('768', 'v2'), name: '768px, pagination v2' };
export const Mobile480V1: Story = { ...at('480', 'v1'), name: '480px, pagination v1' };
export const Mobile480V2: Story = { ...at('480', 'v2'), name: '480px, pagination v2' };
export const Mobile360V1: Story = { ...at('360', 'v1'), name: '360px, pagination v1' };
export const Mobile360V2: Story = { ...at('360', 'v2'), name: '360px, pagination v2' };
