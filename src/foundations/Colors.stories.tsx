import type { Meta, StoryObj } from '@storybook/react';
import { DarkBoard, FIGMA_COLORS_URL, LightBoard } from './ColorsDocs';

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_COLORS_URL } },
} satisfies Meta;
export default meta;

export const Light: StoryObj = { render: () => <LightBoard />, name: 'Colors — Light' };
export const Dark: StoryObj = { render: () => <DarkBoard />, name: 'Colors — Dark' };
