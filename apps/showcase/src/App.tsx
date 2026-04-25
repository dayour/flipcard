import { flipCardAssetLibrary, flipCardCategoryLabels, groupFlipCardAssetsByCategory } from '@microsoft/flipcard';
import { FlipCardCatalog } from '@microsoft/flipcard-react';

export function App() {
  const grouped = groupFlipCardAssetsByCategory(flipCardAssetLibrary);
  const categoryEntries = (
    Object.entries(grouped) as Array<[keyof typeof grouped, (typeof grouped)[keyof typeof grouped]]>
  ).filter(([, assets]) => assets.length > 0);

  return (
    <main className="showcase-shell fc-theme-light">
      <section className="showcase-hero">
        <div className="showcase-copy">
          <p className="showcase-kicker">FlipCard asset library</p>
          <h1>Reusable manifest-backed assets for KPI, profile, code, timeline, FAQ, security, media, and metric scenarios.</h1>
          <p className="showcase-description">
            This first pass seeds a practical catalog with front-face design patterns and back-face manifests so teams can browse,
            reuse, and evolve card assets consistently across hosts.
          </p>
        </div>
        <div className="showcase-summary-grid">
          <article className="showcase-summary-card">
            <span className="showcase-summary-label">Seeded assets</span>
            <strong>{flipCardAssetLibrary.length}</strong>
            <p>Cross-category examples ready for demos, docs, and prototyping.</p>
          </article>
          <article className="showcase-summary-card">
            <span className="showcase-summary-label">Categories</span>
            <strong>{categoryEntries.length}</strong>
            <p>Balanced coverage across operational, business, and technical use cases.</p>
          </article>
        </div>
      </section>

      <section className="showcase-category-strip" aria-label="Asset categories">
        {categoryEntries.map(([category, assets]) => (
          <article key={category} className="showcase-category-chip">
            <span>{flipCardCategoryLabels[category as keyof typeof flipCardCategoryLabels]}</span>
            <strong>{assets.length}</strong>
          </article>
        ))}
      </section>

      <FlipCardCatalog assets={flipCardAssetLibrary} />
    </main>
  );
}
