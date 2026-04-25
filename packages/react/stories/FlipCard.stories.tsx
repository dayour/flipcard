import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FlipCard } from '../src';
import type { FlipCardRenderableAsset } from '../src/types';

function createAsset(overrides: Partial<FlipCardRenderableAsset> = {}): FlipCardRenderableAsset {
  const baseAsset: FlipCardRenderableAsset = {
    id: 'agent-shell-tile',
    category: 'tile',
    title: 'Agent Shell Tile',
    summary: 'Inspect the manifest that defines this adaptive tile.',
    theme: 'light',
    manifest: {
      id: 'agent-shell-tile',
      title: 'Agent Shell Tile',
      design: {
        kind: 'tile',
        eyebrow: 'Agent shell',
        headline: 'Ready to compose',
        summary: 'Front = rendered design. Back = manifest schema.',
        badge: 'Healthy',
        stats: [
          { label: 'Agents', value: '42', trend: '+6 this week', tone: 'positive' },
          { label: 'Latency', value: '214 ms', tone: 'neutral' },
        ],
        items: [
          { label: 'Owner', value: 'M365 Makers' },
          { label: 'Environment', value: 'Production' },
        ],
        bullets: ['Manifest-backed', 'Composable', 'Inspectable'],
      },
      schema: {
        entity: 'agent',
        slots: ['hero', 'status', 'actions'],
        bindings: {
          title: 'copilot.name',
          subtitle: 'copilot.status',
        },
      },
      workflow: {
        onFlip: 'inspect-manifest',
        actions: [
          { id: 'open', type: 'launch', data: { target: '/agents/42' } },
          { id: 'pin', type: 'pin-to-shell' },
        ],
      },
      metadata: {
        category: 'tile',
        theme: 'light',
        audience: 'makers',
      },
    },
  };

  return {
    ...baseAsset,
    ...overrides,
    manifest: {
      ...baseAsset.manifest,
      ...overrides.manifest,
      design: {
        ...baseAsset.manifest.design,
        ...overrides.manifest?.design,
      },
      schema: {
        ...baseAsset.manifest.schema,
        ...overrides.manifest?.schema,
      },
      workflow: {
        ...baseAsset.manifest.workflow,
        ...overrides.manifest?.workflow,
      },
      metadata: {
        ...baseAsset.manifest.metadata,
        ...overrides.manifest?.metadata,
      },
    },
  };
}

function FlipStateExample() {
  const [state, setState] = useState('front');

  return (
    <div style={{ display: 'grid', gap: '0.75rem', width: 320 }}>
      <span>Last emitted state: {state}</span>
      <FlipCard asset={createAsset()} onFlip={setState} />
    </div>
  );
}

const chartAsset = createAsset({
  id: 'basic-line-chart',
  category: 'chart',
  title: 'Basic line chart',
  summary: 'Single-series line chart with default axis configuration.',
  manifest: {
    id: 'basic-line-chart',
    title: 'Basic line chart',
    design: {
      kind: 'chart',
      eyebrow: 'Line Charts',
      headline: 'Basic line chart',
      summary: 'Single-series line chart with default axis configuration.',
      badge: 'Unovis',
    },
    schema: {
      collection: 'Line Charts',
      pathname: 'basic-line-chart',
      demoUrl: 'https://unovis.dev/gallery/basic-line-chart',
      repo: 'https://github.com/f5/unovis',
      frameworks: ['React', 'Angular'],
    },
    metadata: {
      category: 'chart',
      theme: 'light',
    },
  },
});

const adaptiveCardAsset = createAsset({
  id: 'adaptive-shell-card',
  category: 'pattern',
  title: 'Adaptive shell card',
  summary: 'Adaptive Card payloads render directly on the front face.',
  manifest: {
    id: 'adaptive-shell-card',
    title: 'Adaptive shell card',
    design: {
      kind: 'pattern',
      headline: 'Fallback headline',
      summary: 'Fallback summary',
    },
    schema: {
      $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
      type: 'AdaptiveCard',
      version: '1.5',
      body: [
        { type: 'TextBlock', text: 'Adaptive schema front face', weight: 'Bolder' },
        { type: 'TextBlock', text: 'The component renders the card payload instead of fallback text.' },
      ],
    },
    metadata: {
      category: 'pattern',
      theme: 'light',
    },
  },
});

const meta = {
  title: 'React/FlipCard',
  component: FlipCard,
  tags: ['autodocs'],
  args: {
    asset: createAsset(),
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FlipCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const DefaultFlipped: Story = {
  args: {
    defaultState: 'back',
  },
};

export const NonInteractive: Story = {
  args: {
    interactive: false,
  },
};

export const WithFlipCallback: Story = {
  render: () => <FlipStateExample />,
};

export const Categories: Story = {
  render: () => {
    const categories = ['kpi', 'status', 'profile', 'code', 'timeline', 'faq', 'security', 'media', 'metric'] as const;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          width: 'min(100%, 1100px)',
        }}
      >
        {categories.map((category, index) => (
          <FlipCard
            key={category}
            asset={createAsset({
              id: `${category}-asset`,
              category,
              title: `${category[0].toUpperCase()}${category.slice(1)} asset`,
              summary: `Preview of the ${category} category.`,
              manifest: {
                id: `${category}-asset`,
                title: `${category[0].toUpperCase()}${category.slice(1)} asset`,
                design: {
                  kind: category,
                  eyebrow: 'Category preview',
                  headline: `${category[0].toUpperCase()}${category.slice(1)} asset`,
                  summary: `Preview of the ${category} category.`,
                  badge: index % 2 === 0 ? 'Ready' : 'Preview',
                },
                metadata: {
                  category,
                  theme: 'light',
                },
              },
            })}
          />
        ))}
      </div>
    );
  },
};

export const ChartAsset: Story = {
  args: {
    asset: chartAsset,
  },
};

export const AdaptiveCardFront: Story = {
  args: {
    asset: adaptiveCardAsset,
  },
};
