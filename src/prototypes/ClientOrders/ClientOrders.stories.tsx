import type { Meta, StoryObj } from '@storybook/react';
import { ClientOrdersScreen, type ClientOrdersBreakpoint } from './ClientOrdersScreen';

const FIGMA_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/%F0%9F%93%B1-ERP-System-v-1.1--Mockups----Rifbar-2023%F0%9F%93%B1?node-id=818-310893';

const meta = {
  title: 'Prototypes/ClientOrders',
  component: ClientOrdersScreen,
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: { story: { inline: false, iframeHeight: 900 } },
  },
  argTypes: {
    breakpoint: { control: 'select', options: ['1920', '1440', '1280', '1024', '768', '480', '360'] },
    initialView: { control: 'inline-radio', options: ['list', 'cards'] },
    initialFiltersOpen: { control: 'boolean' },
    allFilters: { control: 'boolean' },
    initialQuery: { control: 'text' },
  },
  args: { breakpoint: '1920' },
  // The frame has the width of the Figma artboard; the canvas scrolls when it is wider than the window.
  decorators: [
    (Story, { args }) => (
      <div style={{ width: Number(args.breakpoint), minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ClientOrdersScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

const at = (breakpoint: ClientOrdersBreakpoint, extra: Partial<Story['args']> = {}): Story => ({ args: { breakpoint, ...extra } });

// ─── DEFAULT (Figma 1920px) ──────────────────────────────────────────────────
export const Default: Story = at('1920');

// ─── BREAKPOINTS (Figma: Details (Orders Tab) at seven widths) ───────────────
export const Desktop1440: Story = { ...at('1440'), name: '1440px' };
export const Desktop1280: Story = { ...at('1280'), name: '1280px (menu hidden)' };
export const Tablet1024: Story = { ...at('1024'), name: '1024px' };
export const Tablet768: Story = { ...at('768'), name: '768px (cards, compact toolbar)' };
export const Mobile480: Story = { ...at('480'), name: '480px' };
export const Mobile360: Story = { ...at('360'), name: '360px' };

// ─── FILTER MENU (Figma: (Filter menu) frames at 768 / 480 / 360px) ──────────
export const Filters768: Story = { ...at('768', { initialFiltersOpen: true }), name: 'Filter menu 768px' };
export const Filters480: Story = { ...at('480', { initialFiltersOpen: true }), name: 'Filter menu 480px' };
export const Filters360: Story = { ...at('360', { initialFiltersOpen: true }), name: 'Filter menu 360px' };

// ─── ALL FILTERS (Figma: (Filter menu) All Filters at 768 / 480 / 360px) ─────
export const AllFilters768: Story = { ...at('768', { initialFiltersOpen: true, allFilters: true }), name: 'All filters 768px' };
export const AllFilters480: Story = { ...at('480', { initialFiltersOpen: true, allFilters: true }), name: 'All filters 480px' };
export const AllFilters360: Story = { ...at('360', { initialFiltersOpen: true, allFilters: true }), name: 'All filters 360px' };

// ─── VIEW AND EDGE CASES (not in Figma) ──────────────────────────────────────
export const CardsView: Story = {
  ...at('1440', { initialView: 'cards' }),
  name: 'Cards view (desktop)',
  parameters: { docs: { description: { story: 'The “View” switch set to cards: the same card grid as at 768px (AI-defined: Figma draws the list only on desktop).' } } },
};

export const NoResults: Story = {
  ...at('1440', { initialQuery: 'no such order' }),
  name: 'No results',
  parameters: { docs: { description: { story: 'The search matches nothing: the header stays and a message replaces the rows (AI-defined).' } } },
};

export const NoResultsMobile: Story = { ...at('360', { initialQuery: 'no such order' }), name: 'No results 360px' };
