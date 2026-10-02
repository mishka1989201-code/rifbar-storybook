import type { Meta, StoryObj } from '@storybook/react';
import { FIGMA_RESPONSIVE_LIGHT_URL, ScreenTemplate, TemplateRow, templates, type ScreenTemplateProps } from './ResponsiveDocs';

const meta = {
  title: 'Foundations/Responsive',
  component: ScreenTemplate,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_RESPONSIVE_LIGHT_URL } },
  argTypes: {
    width: {
      control: 'select',
      options: templates.map((t) => t.width),
      labels: Object.fromEntries(templates.map((t) => [t.width, `${t.width}px — ${t.label}`])),
    },
    theme: { control: 'inline-radio', options: ['light', 'dark'] },
    maxHeight: { control: { type: 'range', min: 200, max: 1000, step: 20 } },
  },
  args: { width: 1920, theme: 'light', maxHeight: 560 },
} satisfies Meta<ScreenTemplateProps>;
export default meta;

type Story = StoryObj<typeof meta>;

/** One template screen: pick the width and the theme. */
export const Playground: Story = {};

export const LightTheme: Story = {
  name: 'Templates — Light',
  render: () => <TemplateRow theme="light" />,
  parameters: { controls: { disable: true } },
};

export const DarkTheme: Story = {
  name: 'Templates — Dark',
  render: () => <TemplateRow theme="dark" />,
  parameters: { controls: { disable: true } },
};

export const SideMenu1920: Story = {
  name: 'Side menu 1920 vs 1440',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-24)', flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).flatMap((theme) =>
        ([1920, 1440] as const).map((width) => (
          <div key={`${theme}-${width}`} style={{ flex: '1 1 240px', minWidth: 0 }}>
            <ScreenTemplate width={width} theme={theme} maxHeight={360} />
          </div>
        )),
      )}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
