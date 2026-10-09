import type { Meta, StoryObj } from '@storybook/react';
import { FIGMA_FAVICONS_URL, FaviconResolutions, FaviconTemplate } from './FaviconsDocs';

const meta = {
  title: 'Foundations/Favicons',
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_FAVICONS_URL } },
} satisfies Meta;
export default meta;

export const Template: StoryObj = { render: () => <FaviconTemplate />, name: 'Template' };
export const Resolutions: StoryObj = { render: () => <FaviconResolutions />, name: 'Resolutions' };
