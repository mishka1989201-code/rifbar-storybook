import type { Meta, StoryObj } from '@storybook/react';
import { BaseModule, SemiModule, SpacingScale } from './GridDocs';
import { FIGMA_GRID_URL } from './grid-spec';

const meta = {
  title: 'Foundations/Spacing',
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_GRID_URL } },
} satisfies Meta;
export default meta;

export const Module: StoryObj = { render: () => <BaseModule />, name: 'Base module 8×8' };
export const Scale: StoryObj = { render: () => <SpacingScale />, name: 'Proportions and spaces' };
export const SemiModuleStory: StoryObj = { render: () => <SemiModule />, name: 'Semi-module' };
