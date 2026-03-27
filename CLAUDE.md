# mono-3d

A React + TypeScript app featuring animated 3D dice rolled via CSS transforms.

## Stack

- **React** 18 + TypeScript
- **Vite** (build tool)
- **Material UI** (`@mui/material`) for app shell UI
- **react-router-dom** v7 for routing
- **SCSS** for 3D dice component styling (CSS transforms, animations)
- **Yarn** (package manager — do not use npm)

## Commands

```bash
yarn start    # dev server
yarn build    # type-check + production build
yarn preview  # preview production build
yarn lint     # tsc + eslint
```

## Project Structure

```
src/
├── components/
│   └── Dice/          # 3D dice component (SCSS animations, do not replace with MUI)
├── pages/
│   └── Game/          # /game route — "Under development" placeholder
├── tools/
│   └── sleep.ts
├── App.tsx            # home page (/ route)
├── App.css            # logo animation keyframes only
├── styles.ts          # sx style objects for App.tsx
└── index.tsx          # BrowserRouter + ThemeProvider + CssBaseline + Routes
```

## Routing

| Path    | Component       |
|---------|-----------------|
| `/`     | `App`           |
| `/game` | `pages/Game`    |

## Conventions

- MUI imports: use named imports from `@mui/material` (tree-shaking is supported)
  ```ts
  import { Box, Button, Stack } from '@mui/material';
  ```
- MUI `sx` styles: never use inline object literals — extract to a `styles.ts` file in the same directory as the `.tsx` file, typed as `SxProps<Theme>`, imported as a namespace
  ```ts
  // src/styles.ts
  import { SxProps, Theme } from '@mui/material';
  export const root: SxProps<Theme> = { textAlign: 'center' };
  ```
  ```tsx
  // src/App.tsx
  import * as styles from './styles';
  <Box sx={styles.root} />
  ```
- Always add an empty line before `return` statements in functions
- Import order enforced by `@trivago/prettier-plugin-sort-imports`:
  1. Third-party packages (alphabetical — `@mui` before `react`)
  2. `src/` aliases
  3. Relative imports (CSS files first, then others, alphabetical)
- The `Dice` component uses complex CSS 3D transforms — keep its SCSS untouched

## Known Issues

- `vite.config.ts` is excluded from `tsconfig.json`, causing a pre-existing ESLint parse error on that file
