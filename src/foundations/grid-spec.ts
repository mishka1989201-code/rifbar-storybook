// Grid specification per breakpoint — from Figma "Grid styles and Spaces" (node 3640:250563).
// Every value is a CSS variable from src/tokens/tokens.json; `frame` sizes are the Figma example frames.

export const FIGMA_GRID_URL =
  'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=3640-250563';

type Frame = { width: number; height: number };

export type GridSpec = {
  id: string;
  label: string;
  range: string;
  breakpoint: string;
  /** right = fixed column widths aligned to the right; stretch = columns share the free space */
  alignment: 'right' | 'stretch';
  columns: string;
  margin: string;
  /** Fixed column width; only for alignment "right" */
  column?: { on: string; off: string };
  /** push = side menu takes its own space; overlay = side menu opens over content (burger) */
  sidebar:
    | { mode: 'push'; on: string; off: string; contentOn: string; contentOff: string; inset: string }
    | { mode: 'overlay'; on: string; contentOn: string; inset: string };
  frame: Frame;
  landscape?: { frame: Frame; columns: string; label: string };
  note?: string;
};

const overlaySidebar = {
  mode: 'overlay',
  on: '--layout-sidebar-overlay',
  contentOn: '--layout-sidebar-content-overlay',
  inset: '--spacing-32',
} as const;

export const gridSpecs: GridSpec[] = [
  {
    id: 'desktop-lg',
    label: 'Large computers',
    range: '≥ 1920px',
    breakpoint: '--breakpoint-desktop-lg',
    alignment: 'right',
    columns: '--grid-columns',
    margin: '--grid-margin-desktop-lg',
    column: { on: '--grid-column-desktop-lg', off: '--grid-column-desktop-lg-collapsed' },
    sidebar: {
      mode: 'push',
      on: '--layout-sidebar-desktop-lg',
      off: '--layout-sidebar-desktop-lg-collapsed',
      contentOn: '--layout-sidebar-content-desktop-lg',
      contentOff: '--layout-sidebar-content-collapsed',
      inset: '--spacing-32',
    },
    frame: { width: 1920, height: 1080 },
  },
  {
    id: 'desktop',
    label: 'Standard computers',
    range: '1440–1920px',
    breakpoint: '--breakpoint-desktop',
    alignment: 'right',
    columns: '--grid-columns',
    margin: '--grid-margin',
    column: { on: '--grid-column-desktop', off: '--grid-column-desktop-collapsed' },
    sidebar: {
      mode: 'push',
      on: '--layout-sidebar-desktop',
      off: '--layout-sidebar-desktop-collapsed',
      contentOn: '--layout-sidebar-content-desktop',
      contentOff: '--layout-sidebar-content-collapsed',
      inset: '--spacing-16',
    },
    frame: { width: 1440, height: 1024 },
  },
  {
    id: 'desktop-sm',
    label: 'Small computers',
    range: '1280–1440px',
    breakpoint: '--breakpoint-desktop-sm',
    alignment: 'stretch',
    columns: '--grid-columns',
    margin: '--grid-margin',
    sidebar: overlaySidebar,
    frame: { width: 1280, height: 720 },
    note: 'The side menu opens from the burger button on top of the content; the 12-column grid does not change, and the content is dimmed.',
  },
  {
    id: 'tablet-lg',
    label: 'Large tablets',
    range: '1024–1280px',
    breakpoint: '--breakpoint-tablet-lg',
    alignment: 'stretch',
    columns: '--grid-columns',
    margin: '--grid-margin',
    sidebar: overlaySidebar,
    frame: { width: 1024, height: 1366 },
    landscape: { frame: { width: 1366, height: 1024 }, columns: '--grid-columns', label: 'Horizontal' },
  },
  {
    id: 'tablet',
    label: 'Small tablets',
    range: '768–1024px',
    breakpoint: '--breakpoint-tablet',
    alignment: 'stretch',
    columns: '--grid-columns',
    margin: '--grid-margin',
    sidebar: overlaySidebar,
    frame: { width: 768, height: 1024 },
    landscape: { frame: { width: 1024, height: 768 }, columns: '--grid-columns', label: 'Horizontal' },
  },
  {
    id: 'mobile',
    label: 'Small mobiles',
    range: '480–768px',
    breakpoint: '--breakpoint-mobile',
    alignment: 'stretch',
    columns: '--grid-columns-mobile',
    margin: '--grid-margin',
    sidebar: overlaySidebar,
    frame: { width: 480, height: 1024 },
    landscape: { frame: { width: 1024, height: 480 }, columns: '--grid-columns-mobile-landscape', label: 'Horizontal' },
  },
  {
    id: 'mobile-sm',
    label: 'Very small mobiles',
    range: '360–480px',
    breakpoint: '--breakpoint-mobile-sm',
    alignment: 'stretch',
    columns: '--grid-columns-mobile',
    margin: '--grid-margin-mobile-sm',
    sidebar: overlaySidebar,
    frame: { width: 360, height: 800 },
    landscape: { frame: { width: 800, height: 360 }, columns: '--grid-columns-mobile-landscape', label: 'Horizontal' },
  },
];

export const getGridSpec = (id: string) => gridSpecs.find((s) => s.id === id) ?? gridSpecs[0];
