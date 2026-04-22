import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { FlipCard } from './FlipCard';

const sampleAsset: import('./types').FlipCardRenderableAsset = {
  id: 'sample',
  category: 'kpi',
  title: 'Sample asset',
  summary: 'A sample summary.',
  theme: 'light',
  manifest: {
    id: 'sample',
    title: 'Sample asset',
    design: {
      kind: 'kpi',
      eyebrow: 'Demo',
      headline: '42 active signals',
      summary: 'Asset front content',
      badge: 'Healthy',
      stats: [{ label: 'Coverage', value: '98%' }],
    },
    schema: { hello: 'world' },
    metadata: { category: 'kpi', theme: 'light', tags: ['demo'] },
  },
};

describe('FlipCard', () => {
  it('renders the front face and flips to manifest content', async () => {
    const user = userEvent.setup();
    render(<FlipCard asset={sampleAsset} />);

    expect(screen.getByText('42 active signals')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: /sample asset flip card/i }));
    expect(screen.getByText('Manifest')).toBeTruthy();
    expect(screen.getByText(/"hello": "world"/)).toBeTruthy();
  });
});