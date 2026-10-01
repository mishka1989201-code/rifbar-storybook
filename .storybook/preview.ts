import type { Preview } from '@storybook/react';
import '@fontsource/poppins/500.css';
import '../src/tokens/build/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'canvas', value: '#F5F5F5' },
      ],
    },
  },
};

export default preview;
