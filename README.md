# Vite RSC dependency optimisation reproduction

This is a minimal reproduction for the interaction between Vite dependency optimisation, `@vitejs/plugin-rsc`, and a React library with a large barrel entry such as `lucide-react`.

## Setup

```sh
npm install
```

## Reproduce

Start the default case:

```sh
npm run dev
```

Open the URL printed by Vite. The RSC server transforms the Lucide icon imported by `app.tsx`, while the client dependency optimiser processes `lucide-react`. The RSC plugin reports:

```text
client component dependency is inconsistently optimized. It's recommended to add the dependency to 'optimizeDeps.exclude'.
```

Stop the server and run the recommended configuration:

```sh
EXCLUDE_LUCIDE=1 npm run dev
```

The warning is removed, but the browser receives the unoptimised Lucide barrel graph. This is visible in the Network panel as requests for many individual icon modules even though the app renders only `Check`.

The direct-subpath variant avoids the large development graph:

```diff
- import { Check } from 'lucide-react'
+ import Check from 'lucide-react/icons/check'
```
