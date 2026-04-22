import { FlipCardController, type FlipState } from '@microsoft/flipcard-core';
import { Fragment, type CSSProperties, useEffect, useMemo, useState } from 'react';
import type {
  FlipCardAssetDesign,
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

export function FlipCard({ asset, defaultState = 'front', interactive = true, className, onFlip }: FlipCardProps) {
  const controller = useMemo(() => new FlipCardController({ defaultState }), [defaultState]);
  const [state, setState] = useState<FlipState>(controller.state);

  useEffect(() => controller.subscribe(setState), [controller]);

  const handleFlip = () => {
    const stateAfterFlip = interactive ? controller.flip() : controller.state;
    onFlip?.(stateAfterFlip);
  };

  const design = asset.manifest.design;
  const classes = ['flip-card', 'fc-asset-card', getThemeClassName(asset.theme), className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      data-state={state}
      aria-pressed={state === 'back'}
      aria-label={`${asset.title} flip card showing ${nextState(state)} on click`}
      style={asset.accent ? ({ ['--fc-accent' as string]: asset.accent } as CSSProperties) : undefined}
      onClick={handleFlip}
    >
      <div className="flip-inner">
        <div className="flip-front fc-asset-face">
          <div className="fc-asset-face-shell">
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
          </div>
        </div>
        <div className="flip-back fc-asset-face">
          <div className="fc-asset-face-shell fc-asset-back-shell">
            <span className="fc-asset-eyebrow">Manifest</span>
            <h3 className="fc-asset-headline">{asset.manifest.title}</h3>
            <pre className="fc-asset-json">{JSON.stringify(asset.manifest, null, 2)}</pre>
          </div>
        </div>
      </div>
    </button>
  );
}