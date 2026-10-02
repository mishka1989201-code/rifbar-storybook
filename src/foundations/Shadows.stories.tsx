import type { Meta, StoryObj } from '@storybook/react';
import { DarkBoard, FIGMA_SHADOWS_URL, LightBoard } from './ShadowsDocs';

const meta = {
  title: 'Foundations/Shadows',
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_SHADOWS_URL } },
} satisfies Meta;
export default meta;

export const Light: StoryObj = { render: () => <LightBoard />, name: 'Shadows — Light' };
export const Dark: StoryObj = { render: () => <DarkBoard />, name: 'Shadows — Dark' };

