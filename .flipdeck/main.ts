import type { flipdeckConfig } from '@flipdeck/react-vite';

const config: flipdeckConfig = {
  stories: [
    '../packages/*/src/**/*.stories.@(ts|tsx|mdx)',
    '../packages/*/stories/**/*.stories.@(ts|tsx|mdx)',
  ],
  addons: ['@flipdeck/addon-essentials', '@flipdeck/addon-interactions'],
  framework: { name: '@flipdeck/react-vite', options: {} },
  docs: { autodocs: 'tag' },
  typescript: { reactDocgen: 'react-docgen-typescript' },
};

export default config;
