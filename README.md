# @wexia/widget

Standalone feedback widget pro weby. Umožňuje uživatelům odeslat zpětnou vazbu včetně screenshotu a označeného elementu — bez nutnosti Supabase nebo jiných závislostí na straně webu.

Data putují na `wexia-feedback` backend přes jednoduchý API klíč.

## Instalace

### Způsob 1 — Script tag (jakýkoliv web)

```html
<script src="https://cdn.wexia.cz/widget/wexia-widget.umd.cjs"></script>
<script>
  new WexiaWidget({
    apiUrl: 'https://wexia-feedback.vercel.app',
    apiKey: 'TVUJ_API_KLIC',
    sourceApp: 'nazev-webu'
  }).init()
</script>
```

### Způsob 2 — npm (React / Next.js / Vue...)

```bash
npm install @wexia/widget
```

```ts
import WexiaWidget from '@wexia/widget'

const widget = new WexiaWidget({
  apiUrl: 'https://wexia-feedback.vercel.app',
  apiKey: 'TVUJ_API_KLIC',
  sourceApp: 'nazev-webu',
})
widget.init()
```

V Next.js (App Router) vytvoř komponentu s `'use client'`:

```tsx
'use client'
import { useEffect } from 'react'
import WexiaWidget from '@wexia/widget'

export function FeedbackWidget() {
  useEffect(() => {
    const w = new WexiaWidget({
      apiUrl: process.env.NEXT_PUBLIC_WEXIA_API_URL!,
      apiKey: process.env.NEXT_PUBLIC_WEXIA_API_KEY!,
      sourceApp: 'muj-projekt',
    })
    w.init()
    return () => w.destroy()
  }, [])
  return null
}
```

## Konfigurace

```ts
new WexiaWidget({
  // Povinné
  apiUrl: 'https://wexia-feedback.vercel.app',  // URL backendu
  apiKey: 'abc123...',                           // API klíč (z wexia-feedback env)
  sourceApp: 'ai-laborator',                     // Identifikátor webu

  // Volitelné
  position: 'bottom-right',                      // nebo 'bottom-left'
  primaryColor: '#C0392B',                       // Barva tlačítka a akcentů
  categories: ['Bug', 'Nápad', 'Dotaz', 'Jiné'],// Kategorie feedbacku
  userEmail: 'user@example.com',                 // Předvyplněný email
  userName: 'Jan Novák',                         // Jméno uživatele (v metadatech)
})
```

## API

```ts
const widget = new WexiaWidget(config)

widget.init()     // Přidá widget na stránku
widget.destroy()  // Odstraní widget ze stránky
```

## Backend setup

Endpoint `/api/feedback-public` na wexia-feedback backendu:

- Ověří hlavičku `x-wexia-key` proti env proměnné `WIDGET_API_KEY`
- Uloží feedback do Supabase (tabulka `feedback`)
- Nahraje screenshot do Supabase Storage (bucket `feedback-screenshots`)
- Vrátí `{ success: true, id: uuid }`

Přidej do Vercel env vars wexia-feedback:
```
WIDGET_API_KEY=<náhodný 32-znakový string>
```

## Velikost

| Soubor | Velikost | Gzip |
|---|---|---|
| `wexia-widget.umd.cjs` | ~214 kB | ~52 kB |
| `wexia-widget.js` (ESM) | ~16 kB + html2canvas chunk | ~55 kB celkem |

html2canvas (~200 kB) je bundlován dovnitř UMD. Při npm použití ho bundler může deduplikovat pokud ho používáš i jinde.

## Build

```bash
npm run build     # tsc check + vite build + type declarations
npm run typecheck # pouze TypeScript check
npm run dev       # vite dev server (pro testování)
```

## Licence

Interní nástroj Wexia. Není určen pro veřejnou distribuci.
