import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { FlipCardManifest } from '@microsoft/flipcard-core';
import { FlipCard, type FlipCardProps } from '../src';

const baseBackJson = {
  id: 'flipcard.demo',
  schema: 'v0.1',
  title: 'Hello FlipCard',
  workflow: {
    onFlip: 'open-manifest',
    actions: [{ id: 'copy-manifest', type: 'copy' }],
  },
};

const manifest: FlipCardManifest = {
  $schema: 'https://microsoft.github.io/flipcard/schema/v0.1.json',
  version: '0.1.0',
  id: 'agent-shell.tile',
  title: 'Agent Shell Tile',
  design: {
    component: 'tile',
    density: 'comfortable',
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
    domain: 'm365',
    audience: 'makers',
  },
};

const longJson = Object.fromEntries(
  Array.from({ length: 60 }, (_, index) => [
    `field${String(index + 1).padStart(2, '0')}`,
    `Value ${index + 1}`,
  ]),
);

function ExampleFront() {
  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <strong>Adaptive shell tile</strong>
      <span>Front = design. Back = inspectable schema.</span>
      <small>Status: Ready to compose</small>
    </div>
  );
}

function ControlledExample(args: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <button type="button" onClick={() => setFlipped((value) => !value)}>
        Toggle externally
      </button>
      <FlipCard {...args} flipped={flipped} onFlip={setFlipped} />
    </div>
  );
}

const meta = {
  title: 'React/FlipCard',
  component: FlipCard,
  tags: ['autodocs'],
  args: {
    front: <ExampleFront />,
    backJson: baseBackJson,
    frontTitle: 'Design',
    category: 'teal',
    minHeight: 320,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FlipCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithCustomBack: Story = {
  args: {
    back: (
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <strong>Custom back face</strong>
        <p>This back face is JSX instead of generated JSON.</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          <li>Composable</li>
          <li>Framework-aware</li>
          <li>Workflow independent</li>
        </ul>
      </div>
    ),
  },
};

export const WithBackTitle: Story = {
  args: {
    backTitle: 'Manifest',
  },
};

export const Controlled: Story = {
  render: (args) => <ControlledExample {...args} />,
};

export const DefaultFlipped: Story = {
  args: {
    defaultFlipped: true,
  },
};

export const Categories: Story = {
  render: (args) => {
    const categories = ['teal', 'navy', 'gold', 'green', 'red', 'plum', 'slate'] as const;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          width: 'min(100%, 1100px)',
        }}
      >
        {categories.map((category) => (
          <FlipCard
            key={category}
            {...args}
            category={category}
            front={
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <strong>{category}</strong>
                <span>Category accent preview</span>
              </div>
            }
            backJson={{ ...baseBackJson, category }}
          />
        ))}
      </div>
    );
  },
};

export const WithManifest: Story = {
  args: {
    manifest,
    backJson: undefined,
    backTitle: undefined,
  },
};

export const LongJSON: Story = {
  args: {
    backJson: longJson,
  },
};

export const NoCopyButton: Story = {
  args: {
    showCopyButton: false,
  },
};

export const CustomLabels: Story = {
  args: {
    flipHint: 'Flip to inspect',
    copyLabel: 'Copy manifest',
    copiedLabel: 'Manifest copied',
  },
};
