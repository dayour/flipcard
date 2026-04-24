import { FlipCardController, type FlipState } from '@microsoft/flipcard-core';
import {
  Fragment,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AdaptiveCardSurface } from './AdaptiveCardSurface';
import type {
  FlipCardAssetDesign,
  FlipCardRenderableAsset,
  FlipCardAssetTheme,
  FlipCardAssetTone,
  FlipCardProps,
} from './types';

function getThemeClassName(theme: FlipCardAssetTheme): string {
  switch (theme) {
    case 'dark':
      return 'fc-theme-dark';
    case 'midnight-sapphire':
      return 'fc-theme-midnight-sapphire';
    case 'light':
    default:
      return 'fc-theme-light';
  }
}

function toneClassName(tone: FlipCardAssetTone = 'neutral'): string {
  return `fc-tone-pill fc-tone-${tone}`;
}

const defaultChartPalette = {
  solid: '#0284c7',
  soft: 'rgba(2, 132, 199, 0.14)',
  translucent: '#0284c799',
};

function chartAccentPalette(collection: string) {
  const palettes: Record<string, { solid: string; soft: string; translucent: string }> = {
    'Line Charts': defaultChartPalette,
    'Area Charts': { solid: '#0f766e', soft: 'rgba(15, 118, 110, 0.14)', translucent: '#0f766e99' },
    'Bar Charts': { solid: '#7c3aed', soft: 'rgba(124, 58, 237, 0.14)', translucent: '#7c3aed99' },
    'Scatter Plots': { solid: '#b45309', soft: 'rgba(180, 83, 9, 0.14)', translucent: '#b4530999' },
    Maps: { solid: '#047857', soft: 'rgba(4, 120, 87, 0.14)', translucent: '#04785799' },
    'Networks and Flows': { solid: '#be123c', soft: 'rgba(190, 18, 60, 0.14)', translucent: '#be123c99' },
    'Circular Charts': { solid: '#4338ca', soft: 'rgba(67, 56, 202, 0.14)', translucent: '#4338ca99' },
    Treemap: { solid: '#6d28d9', soft: 'rgba(109, 40, 217, 0.14)', translucent: '#6d28d999' },
    'Composite Charts': { solid: '#0f766e', soft: 'rgba(15, 118, 110, 0.14)', translucent: '#0f766e99' },
    'Auxiliary Components': { solid: '#374151', soft: 'rgba(55, 65, 81, 0.14)', translucent: '#37415199' },
  };

  return palettes[collection] ?? defaultChartPalette;
}

function chartHeroSvg(collection: string): ReactNode {
  const accent = chartAccentPalette(collection);
  const axis = accent.soft;

  switch (collection) {
    case 'Line Charts':
      {
        const linePoints = [55, 40, 48, 22, 35, 18, 30, 12] as const;
      return (
        <svg viewBox="0 0 260 80" aria-hidden="true">
          <line x1="20" y1="70" x2="240" y2="70" stroke={axis} strokeWidth="1" />
          <line x1="20" y1="10" x2="20" y2="70" stroke={axis} strokeWidth="1" />
          <polyline points="30,55 60,40 90,48 120,22 150,35 180,18 210,30 240,12" stroke={accent.solid} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="30,60 60,52 90,58 120,42 150,50 180,38 210,45 240,35" stroke={accent.translucent} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" />
          {[30, 60, 90, 120, 150, 180, 210, 240].map((x, index) => (
            <circle key={x} cx={x} cy={linePoints[index] ?? linePoints[0]} r="3" fill={accent.solid} />
          ))}
        </svg>
      );
      }
    case 'Area Charts':
      return (
        <svg viewBox="0 0 260 80" aria-hidden="true">
          <line x1="20" y1="70" x2="240" y2="70" stroke={axis} strokeWidth="1" />
          <path d="M30,55 Q70,20 120,35 T210,18 L240,25 L240,70 L30,70 Z" fill={accent.soft} />
          <path d="M30,55 Q70,20 120,35 T210,18 L240,25" stroke={accent.solid} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M30,62 Q80,40 130,50 T220,35 L240,40 L240,70 L30,70 Z" fill={accent.translucent} fillOpacity="0.15" />
          <path d="M30,62 Q80,40 130,50 T220,35 L240,40" stroke={accent.translucent} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'Bar Charts':
      {
        const bars: ReadonlyArray<readonly [number, number]> = [
          [35, 25],
          [55, 40],
          [80, 15],
          [100, 35],
          [125, 45],
          [145, 20],
          [170, 30],
          [190, 50],
        ];
      return (
        <svg viewBox="0 0 260 80" aria-hidden="true">
          <line x1="20" y1="70" x2="240" y2="70" stroke={axis} strokeWidth="1" />
          {bars.map(([x, height], index) => (
            <rect key={`${x}-${height}`} x={x} y={70 - height} width="14" height={height} rx="3" fill={index % 2 === 0 ? accent.solid : accent.translucent} />
          ))}
        </svg>
      );
      }
    case 'Scatter Plots':
      {
        const points: ReadonlyArray<readonly [number, number, number]> = [
          [40, 50, 4],
          [65, 35, 6],
          [90, 55, 3],
          [110, 25, 5],
          [135, 42, 7],
          [160, 18, 4],
          [180, 48, 5],
          [205, 30, 6],
          [230, 15, 4],
          [55, 62, 3],
          [145, 58, 3],
          [195, 40, 4],
        ];
      return (
        <svg viewBox="0 0 260 80" aria-hidden="true">
          <line x1="20" y1="70" x2="240" y2="70" stroke={axis} strokeWidth="1" />
          <line x1="20" y1="10" x2="20" y2="70" stroke={axis} strokeWidth="1" />
          {points.map(([cx, cy, radius]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={radius} fill={accent.solid} fillOpacity="0.5" stroke={accent.solid} strokeWidth="1" />
          ))}
        </svg>
      );
      }
    case 'Maps':
      return (
        <svg viewBox="0 0 260 80" aria-hidden="true">
          <rect x="25" y="8" width="210" height="64" rx="6" fill={accent.soft} stroke={axis} strokeWidth="1" />
          <path d="M60,20 Q80,15 95,22 Q110,30 100,40 Q90,48 70,45 Q55,40 60,30 Z" fill={accent.soft} stroke={accent.translucent} strokeWidth="1" />
          <path d="M120,18 Q145,12 160,20 Q175,30 170,42 Q160,52 140,48 Q125,42 120,30 Z" fill={accent.soft} stroke={accent.translucent} strokeWidth="1" />
          <path d="M180,25 Q195,18 210,28 Q215,38 200,42 Q185,40 180,32 Z" fill={accent.soft} stroke={accent.translucent} strokeWidth="1" />
          <circle cx="85" cy="32" r="3" fill={accent.solid} />
          <circle cx="150" cy="30" r="3" fill={accent.solid} />
          <circle cx="195" cy="32" r="3" fill={accent.solid} />
          <line x1="85" y1="32" x2="150" y2="30" stroke={accent.solid} strokeWidth="1" strokeDasharray="3 2" />
          <line x1="150" y1="30" x2="195" y2="32" stroke={accent.solid} strokeWidth="1" strokeDasharray="3 2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 260 80" aria-hidden="true">
          <rect x="30" y="10" width="200" height="60" rx="8" fill={accent.soft} stroke={accent.translucent} strokeWidth="1" />
          <text x="130" y="45" textAnchor="middle" fontSize="12" fill={accent.solid}>{collection}</text>
        </svg>
      );
  }
}

function getChartCollection(asset: FlipCardRenderableAsset): string | undefined {
  const schemaCollection = asset.manifest.schema?.collection;
  const designEyebrow = asset.manifest.design?.eyebrow;
  return typeof schemaCollection === 'string' ? schemaCollection : designEyebrow;
}

function ChartCardFront({ asset }: { asset: FlipCardRenderableAsset }) {
  const collection = getChartCollection(asset) ?? 'Charts';
  const accent = chartAccentPalette(collection);
  const pathname = typeof asset.manifest.schema?.pathname === 'string' ? asset.manifest.schema.pathname : asset.id;
  const frameworks = Array.isArray(asset.manifest.schema?.frameworks)
    ? asset.manifest.schema.frameworks.filter((value): value is string => typeof value === 'string')
    : ['React', 'Angular', 'Svelte', 'Vue', 'Solid'];

  return (
    <>
      <header className="fc-chart-header">
        <div className="fc-chart-badge-row">
          <span className="fc-chart-badge">{collection.toUpperCase()}</span>
          <span className="fc-chart-badge">CHART</span>
        </div>
        <span className="fc-chart-brand">Unovis</span>
      </header>
      <div className="fc-chart-hero" style={{ ['--fc-chart-accent' as string]: accent.solid, ['--fc-chart-accent-soft' as string]: accent.soft }}>
        {chartHeroSvg(collection)}
      </div>
      <div className="fc-chart-body">
        <h3 className="fc-chart-title">{asset.title}</h3>
        <p className="fc-chart-summary">{asset.summary}</p>
        <span className="fc-chart-path">{pathname}</span>
        <div className="fc-chart-meta-grid">
          <div className="fc-chart-meta-cell">
            <span className="fc-chart-meta-label">Position</span>
            <div className="fc-chart-position-bar">
              <span className="fc-chart-position-pip active" />
              <span className="fc-chart-position-pip" />
              <span className="fc-chart-position-pip" />
            </div>
          </div>
          <div className="fc-chart-meta-cell">
            <span className="fc-chart-meta-label">Source</span>
            <span className="fc-chart-meta-value">{pathname}.tsx</span>
          </div>
        </div>
        <div className="fc-chart-lang-row">
          {frameworks.map((framework) => (
            <span key={framework} className="fc-chart-lang-badge">{framework}</span>
          ))}
        </div>
        <div className="fc-chart-link-row">
          <a className="fc-chart-link" href={`https://unovis.dev/gallery/view?collection=${encodeURIComponent(collection)}&title=${encodeURIComponent(asset.title)}`} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>
            Gallery
          </a>
          <a className="fc-chart-link" href={`https://github.com/f5/unovis/tree/main/packages/shared/examples/${pathname}`} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>
            Source
          </a>
        </div>
      </div>
    </>
  );
}

type ChartBackTab = 'details' | 'schema';

function ChartCardBack({ asset }: { asset: FlipCardRenderableAsset }) {
  const [tab, setTab] = useState<ChartBackTab>('details');
  const collection = getChartCollection(asset) ?? 'Charts';
  const schema = asset.manifest.schema ?? {};
  const detailRows = [
    ['Collection', collection],
    ['Pathname', typeof schema.pathname === 'string' ? schema.pathname : asset.id],
    ['Demo URL', typeof schema.demoUrl === 'string' ? schema.demoUrl : ''],
    ['Repo', typeof schema.repo === 'string' ? schema.repo : ''],
  ].filter(([, value]) => Boolean(value));

  const frameworks = Array.isArray(schema.frameworks)
    ? schema.frameworks.filter((value): value is string => typeof value === 'string')
    : [];

  return (
    <div className="fc-asset-face-shell fc-asset-back-shell fc-chart-back-shell">
      <div className="fc-chart-back-header-row">
        <span className="fc-asset-eyebrow">Unovis card</span>
        <div className="fc-chart-back-tabs" role="tablist" aria-label={`${asset.title} back face tabs`}>
          <button type="button" role="tab" className={`fc-chart-back-tab${tab === 'details' ? ' is-active' : ''}`} aria-selected={tab === 'details'} onClick={(event) => { event.stopPropagation(); setTab('details'); }}>
            Details
          </button>
          <button type="button" role="tab" className={`fc-chart-back-tab${tab === 'schema' ? ' is-active' : ''}`} aria-selected={tab === 'schema'} onClick={(event) => { event.stopPropagation(); setTab('schema'); }}>
            Schema
          </button>
        </div>
      </div>
      <h3 className="fc-asset-headline">{asset.manifest.title}</h3>
      {tab === 'details' ? (
        <div className="fc-chart-back-details">
          <p className="fc-chart-back-summary">{asset.summary}</p>
          <dl className="fc-chart-back-list">
            {detailRows.map(([label, value]) => (
              <Fragment key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </Fragment>
            ))}
            {frameworks.length ? (
              <>
                <dt>Frameworks</dt>
                <dd>{frameworks.join(' • ')}</dd>
              </>
            ) : null}
          </dl>
          <div className="fc-chart-link-row fc-chart-back-links">
            {typeof schema.demoUrl === 'string' ? (
              <a className="fc-chart-link" href={schema.demoUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>
                Open demo
              </a>
            ) : null}
            {typeof schema.repo === 'string' ? (
              <a className="fc-chart-link" href={schema.repo} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>
                Repository
              </a>
            ) : null}
          </div>
        </div>
      ) : (
        <pre className="fc-asset-json">{JSON.stringify(asset.manifest, null, 2)}</pre>
      )}
    </div>
  );
}

function renderStats(stats: NonNullable<FlipCardAssetDesign['stats']>) {
  return (
    <div className="fc-asset-stats">
      {stats.map((stat) => (
        <section key={`${stat.label}-${stat.value}`} className="fc-asset-stat">
          <span className="fc-asset-stat-label">{stat.label}</span>
          <strong className="fc-asset-stat-value">{stat.value}</strong>
          {stat.trend ? <span className={toneClassName(stat.tone)}>{stat.trend}</span> : null}
        </section>
      ))}
    </div>
  );
}

function renderItems(items: NonNullable<FlipCardAssetDesign['items']>) {
  return (
    <dl className="fc-asset-list">
      {items.map((item) => (
        <Fragment key={item.label}>
          <dt key={`${item.label}-label`} className="fc-asset-list-label">
            {item.label}
          </dt>
          <dd key={`${item.label}-value`} className="fc-asset-list-value">
            <span className={toneClassName(item.tone)}>{item.value}</span>
          </dd>
        </Fragment>
      ))}
    </dl>
  );
}

function renderDesignBody(design?: FlipCardAssetDesign) {
  if (!design) {
    return null;
  }

  return (
    <div className="fc-asset-body">
      {design.kind === 'profile' && design.person ? (
        <div className="fc-asset-profile">
          <strong className="fc-asset-profile-name">{design.person.name}</strong>
          <span className="fc-asset-profile-role">{design.person.role}</span>
          {design.person.team ? <span className="fc-asset-profile-meta">{design.person.team}</span> : null}
          {design.person.location ? (
            <span className="fc-asset-profile-meta">{design.person.location}</span>
          ) : null}
        </div>
      ) : null}

      {design.kind === 'code' && design.code ? (
        <>
          <div className="fc-asset-inline-meta">
            <span className={toneClassName()}>{design.code.language.toUpperCase()}</span>
          </div>
          <pre className="fc-asset-code">{design.code.snippet}</pre>
        </>
      ) : null}

      {design.kind === 'timeline' && design.timeline?.length ? (
        <ol className="fc-asset-timeline">
          {design.timeline.map((item) => (
            <li key={`${item.phase}-${item.date}`} className="fc-asset-timeline-item">
              <div className="fc-asset-timeline-phase">{item.phase}</div>
              <div className="fc-asset-timeline-meta">
                <span>{item.date}</span>
                <span className={toneClassName()}>{item.status}</span>
              </div>
            </li>
          ))}
        </ol>
      ) : null}

      {design.kind === 'faq' && design.faq?.length ? (
        <div className="fc-asset-faq">
          {design.faq.slice(0, 3).map((item) => (
            <section key={item.question} className="fc-asset-faq-item">
              <strong className="fc-asset-faq-question">{item.question}</strong>
              <p className="fc-asset-faq-answer">{item.answer}</p>
            </section>
          ))}
        </div>
      ) : null}

      {design.kind === 'media' && design.media ? (
        <div className="fc-asset-media">
          <div className="fc-asset-inline-meta">
            <span className={toneClassName()}>{design.media.format}</span>
            <span className={toneClassName()}>{design.media.duration}</span>
          </div>
          <p className="fc-asset-media-caption">{design.media.caption}</p>
          {design.quote ? <blockquote className="fc-asset-quote">{design.quote}</blockquote> : null}
        </div>
      ) : null}

      {design.stats?.length ? renderStats(design.stats) : null}
      {design.items?.length ? renderItems(design.items) : null}
      {design.bullets?.length ? (
        <ul className="fc-asset-bullets">
          {design.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function nextState(currentState: FlipState): FlipState {
  return currentState === 'front' ? 'back' : 'front';
}

function isAdaptiveCardPayload(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && (value as { type?: unknown }).type === 'AdaptiveCard';
}

function getAdaptiveCardPayload(asset: FlipCardRenderableAsset): Record<string, unknown> | undefined {
  const designPayload = asset.manifest.design?.adaptiveCard;
  if (designPayload) {
    return designPayload;
  }

  return isAdaptiveCardPayload(asset.manifest.schema) ? asset.manifest.schema : undefined;
}

export function FlipCard({ asset, defaultState = 'front', interactive = true, className, onFlip }: FlipCardProps) {
  const controller = useMemo(() => new FlipCardController({ defaultState }), [defaultState]);
  const [state, setState] = useState<FlipState>(controller.state);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const frontShellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => controller.subscribe(setState), [controller]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const shell = frontShellRef.current;
    if (!root || !shell) {
      return;
    }

    const updateHeight = () => {
      root.style.setProperty('--fc-face-height', `${Math.max(shell.scrollHeight, 320)}px`);
    };

    updateHeight();

    const images = Array.from(shell.querySelectorAll('img'));
    const removeImageListeners = images.map((image) => {
      const listener = () => updateHeight();
      image.addEventListener('load', listener);
      return () => image.removeEventListener('load', listener);
    });

    if (typeof ResizeObserver === 'undefined') {
      return () => {
        removeImageListeners.forEach((removeListener) => removeListener());
      };
    }

    const observer = new ResizeObserver(() => updateHeight());
    observer.observe(shell);

    return () => {
      observer.disconnect();
      removeImageListeners.forEach((removeListener) => removeListener());
    };
  }, [asset]);

  const handleFlip = () => {
    const stateAfterFlip = interactive ? controller.flip() : controller.state;
    onFlip?.(stateAfterFlip);
  };

  const design = asset.manifest.design;
  const adaptiveCardPayload = getAdaptiveCardPayload(asset);
  const isChartCard = asset.category === 'chart';
  const classes = ['flip-card', 'fc-asset-card', getThemeClassName(asset.theme), className]
    .filter(Boolean)
    .join(' ');

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleFlip();
    }
  };

  return (
    <div
      ref={rootRef}
      role="button"
      tabIndex={0}
      className={classes}
      data-state={state}
      aria-pressed={state === 'back'}
      aria-label={`${asset.title} flip card showing ${nextState(state)} on click`}
      style={asset.accent ? ({ ['--fc-accent' as string]: asset.accent } as CSSProperties) : undefined}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
    >
      <div className="flip-inner">
        <div className="flip-front fc-asset-face">
          {isChartCard ? (
            <div ref={frontShellRef} className="fc-asset-face-shell fc-chart-face-shell">
              <ChartCardFront asset={asset} />
            </div>
          ) : (
            <div
              ref={frontShellRef}
              className={adaptiveCardPayload ? 'fc-asset-face-shell fc-asset-face-shell-adaptive' : 'fc-asset-face-shell'}
            >
              {adaptiveCardPayload ? (
                <AdaptiveCardSurface payload={adaptiveCardPayload} />
              ) : (
                <>
                  <header className="fc-asset-header">
                    <div className="fc-asset-eyebrow-group">
                      {design?.eyebrow ? <span className="fc-asset-eyebrow">{design.eyebrow}</span> : null}
                      <span className={toneClassName()}>{asset.category.toUpperCase()}</span>
                    </div>
                    {design?.badge ? <span className={toneClassName()}>{design.badge}</span> : null}
                  </header>
                  <h3 className="fc-asset-headline">{design?.headline ?? asset.title}</h3>
                  <p className="fc-asset-summary">{design?.summary ?? asset.summary}</p>
                  {renderDesignBody(design)}
                </>
              )}
            </div>
          )}
        </div>
        <div className="flip-back fc-asset-face">
          {isChartCard ? <ChartCardBack asset={asset} /> : (
            <div className="fc-asset-face-shell fc-asset-back-shell">
              <span className="fc-asset-eyebrow">Manifest</span>
              <h3 className="fc-asset-headline">{asset.manifest.title}</h3>
              <pre className="fc-asset-json">{JSON.stringify(asset.manifest, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}