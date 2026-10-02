import type { Meta, StoryObj } from '@storybook/react';
import { GridBreakpoint, GridPreview, type GridPreviewProps } from './GridDocs';
import { FIGMA_GRID_URL, gridSpecs } from './grid-spec';

const meta = {
  title: 'Foundations/Grid',
  component: GridPreview,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_GRID_URL } },
  argTypes: {
    breakpoint: {
      control: 'select',
      options: gridSpecs.map((s) => s.id),
      labels: Object.fromEntries(gridSpecs.map((s) => [s.id, `${s.label} (${s.range})`])),
    },
    navbar: { control: 'inline-radio', options: ['on', 'off'] },
    orientation: { control: 'inline-radio', options: ['portrait', 'landscape'] },
    maxHeight: { control: { type: 'range', min: 200, max: 900, step: 20 } },
  },
  args: { breakpoint: 'desktop-lg', navbar: 'on', orientation: 'portrait', maxHeight: 560 },
} satisfies Meta<GridPreviewProps>;
export default meta;

type Story = StoryObj<typeof meta>;

/** Pick any breakpoint and toggle the side menu. Landscape applies to tablets and mobiles. */
export const Playground: Story = {};

const breakpointStory = (id: string): Story => ({
  render: () => <GridBreakpoint breakpoint={id} />,
  parameters: { controls: { disable: true } },
});

export const DesktopLarge = { ...breakpointStory('desktop-lg'), name: 'Large computers ≥ 1920' };
export const Desktop = { ...breakpointStory('desktop'), name: 'Standard computers 1440–1920' };
export const DesktopSmall = { ...breakpointStory('desktop-sm'), name: 'Small computers 1280–1440' };
export const TabletLarge = { ...breakpointStory('tablet-lg'), name: 'Large tablets 1024–1280' };
export const Tablet = { ...breakpointStory('tablet'), name: 'Small tablets 768–1024' };
export const Mobile = { ...breakpointStory('mobile'), name: 'Small mobiles 480–768' };
export const MobileSmall = { ...breakpointStory('mobile-sm'), name: 'Very small mobiles 360–480' };
