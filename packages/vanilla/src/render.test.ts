import { describe, expect, it } from 'vitest';
import { flipCardAssetLibrary, groupFlipCardAssetsByCategory } from './assets';
import { createFlipCardElement } from './render';

describe('flipCardAssetLibrary', () => {
  it('covers multiple catalog categories', () => {
    const grouped = groupFlipCardAssetsByCategory();
    expect(flipCardAssetLibrary.length).toBeGreaterThanOrEqual(8);
    expect(grouped.kpi).toHaveLength(1);
    expect(grouped.security).toHaveLength(1);
    expect(grouped.media).toHaveLength(1);
  });

  it('creates a flippable DOM element for vanilla hosts', () => {
    const element = createFlipCardElement(flipCardAssetLibrary[0]!);
    expect(element.dataset.state).toBe('front');
    element.click();
    expect(element.dataset.state).toBe('back');
    expect(element.textContent).toContain('Manifest');
  });
});