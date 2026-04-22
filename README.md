# 🎴 flipcard

**The first primitive in an adaptive, manifest schema-driven, composable UI system.**

> Front = rendered design. Back = schema / manifest. Click to flip.  
> FlipCard separates **design ⟂ schema ⟂ workflow** so each can evolve independently.

## Vision

Inspired by Adaptive Cards, but generalized. Any UI element — a button, a dashboard tile, an OS shell pane — can be a flipcard. The schema is portable; the design is swappable; the workflow is independent.

FlipCard starts with a simple idea:

- **Front**: the designed experience people use
- **Back**: the manifest, schema, or system representation
- **Flip**: the bridge between what users see and what systems understand

That makes FlipCard a primitive for composable interfaces, adaptive surfaces, and eventually full UI shells built from schema-aware cards.

## Quickstart

### React

```tsx
import { FlipCard } from '@microsoft/flipcard-react';
import '@microsoft/flipcard-themes/base.css';
import '@microsoft/flipcard-themes/light.css';

<FlipCard front={<div>Hello</div>} backJson={{ id: 'demo', schema: 'v0.1' }} category="teal" />;
```

### Vanilla Web Component

```html
<script type="module">
  import '@microsoft/flipcard/auto';
</script>
<flip-card category="teal" back-title="Manifest">
  <div>Hello</div>
</flip-card>
```

## Packages

| Package                      | Description                                  | npm                                                        |
| ---------------------------- | -------------------------------------------- | ---------------------------------------------------------- |
| `@microsoft/flipcard-core`   | Framework-agnostic types, schema, controller | <https://www.npmjs.com/package/@microsoft/flipcard-core>   |
| `@microsoft/flipcard-react`  | React component bindings                     | <https://www.npmjs.com/package/@microsoft/flipcard-react>  |
| `@microsoft/flipcard`        | Web Component `<flip-card>`                  | <https://www.npmjs.com/package/@microsoft/flipcard>        |
| `@microsoft/flipcard-themes` | CSS themes & tokens                          | <https://www.npmjs.com/package/@microsoft/flipcard-themes> |

## Architecture

```text
Q:\flipcard
├─ packages
│  ├─ core       -> schema, controller, types
│  ├─ react      -> React FlipCard + hook
│  ├─ vanilla    -> <flip-card> custom element
│  └─ themes     -> CSS themes and tokens
├─ apps
│  └─ showcase   -> Vite demo app for GitHub Pages
├─ .storybook    -> shared Storybook 8 config
└─ .github
   └─ workflows  -> CI, Pages deploy, release automation
```

## Live Links

- Live demo: <https://microsoft.github.io/flipcard/>
- Storybook: <https://microsoft.github.io/flipcard/storybook/>

## Development

```bash
npm install
npm run dev
npm run storybook
npm test
npm run build
```

## Why FlipCard?

FlipCard is more than a component. It is the first primitive in a system where:

- design systems can swap skins without rewriting manifests
- schema can travel across frameworks and runtimes
- workflow can bind independently from rendering
- entire surfaces can be composed from inspectable, portable UI cards

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for local setup, stories, testing, and contribution guidance.

## License

MIT
