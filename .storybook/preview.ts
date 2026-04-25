import type { Preview } from '@storybook/react';
import '@microsoft/flipcard-themes/base.css';
import '@microsoft/flipcard-themes/light.css';
import '@microsoft/flipcard-themes/dark.css';
import '@microsoft/flipcard-themes/midnight-sapphire.css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fafbfc' },
        { name: 'dark', value: '#0c0f14' },
        { name: 'midnight', value: '#0a0e27' },
      ],
    },
  },
};

export default preview;
