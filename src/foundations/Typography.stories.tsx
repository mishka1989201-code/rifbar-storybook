import type { Meta, StoryObj } from '@storybook/react';
import { AllHeadings, BodyText, FIGMA_TYPOGRAPHY_URL } from './TypographyDocs';

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_TYPOGRAPHY_URL } },
} satisfies Meta;
export default meta;

export const Headings: StoryObj = { render: () => <AllHeadings /> };
export const Body: StoryObj = { render: () => <BodyText /> };
