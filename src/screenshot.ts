let highlightEl: HTMLDivElement | null = null

function removeHighlight() {
  highlightEl?.remove()
  highlightEl = null
}

// html2canvas-pro (fork) místo originálu: podporuje moderní CSS barvy
// `color-mix()`, `oklch()`, `lab()`, `color()`. Originál html2canvas 1.4.1 na
// nich hází chybu a screenshot spadne — Tailwind v4 (Wexia admin) je používá.
async function loadHtml2Canvas() {
  const mod = await import('html2canvas-pro')
  return mod.default
}

interface HighlightRect {
  left: number
  top: number
  width: number
  height: number
}

// Zakóduje canvas jako JPEG a hlídá velikost. PNG screenshoty stránek s
// fotkami snadno přesáhnou ~4,5 MB limit request body na Vercelu (→ "Failed to
// fetch"). JPEG je pro fotky násobně menší; při přesahu snižujeme kvalitu.
function encodeUnderLimit(canvas: HTMLCanvasElement): string {
  const MAX_B64 = 3_500_000 // ~3,5 MB base64, bezpečně pod Vercel limitem
  const qualities = [0.85, 0.7, 0.55, 0.4]
  let b64 = ''
  for (const q of qualities) {
    b64 = canvas.toDataURL('image/jpeg', q).split(',')[1]
    if (b64.length <= MAX_B64) return b64
  }
  return b64
}

export async function captureScreenshot(highlight?: HighlightRect): Promise<string> {
  const html2canvas = await loadHtml2Canvas()

  const vw = document.documentElement.clientWidth
  const vh = document.documentElement.clientHeight
  const sx = window.scrollX
  const sy = window.scrollY

  // Renderujeme přímo viditelný výřez: html2canvas dostane `documentElement`
  // (ne `body`) s cropem na aktuální scroll (x/y = scroll) a rozměry okna.
  // Tímhle se scroll pozice i position:sticky/fixed prvky vykreslí správně —
  // dřívější "full page render + ruční crop" je u sticky/fixed rozházel přes
  // sebe. Adaptivní scale drží hranu canvasu pod limitem prohlížeče (~16384 px).
  const MAX_EDGE = 16000
  const scale = Math.max(1, Math.min(2, MAX_EDGE / vw, MAX_EDGE / vh))

  const rendered = await html2canvas(document.documentElement, {
    scale,
    useCORS: true,
    logging: false,
    imageTimeout: 15000,
    backgroundColor: '#ffffff',
    x: sx,
    y: sy,
    width: vw,
    height: vh,
    windowWidth: vw,
    windowHeight: vh,
  })

  // Highlight kreslíme na VLASTNÍ canvas (kopie přes drawImage), ne na ten
  // vrácený z html2canvas — na něm se post-render kreslení zahazuje (interní
  // stav contextu). rect z getBoundingClientRect je viewport-relativní, takže
  // pozice v canvasu = rect * scale (bez scroll offsetu).
  const out = document.createElement('canvas')
  out.width = rendered.width
  out.height = rendered.height
  const ctx = out.getContext('2d')
  if (!ctx) return encodeUnderLimit(rendered)
  ctx.drawImage(rendered, 0, 0)

  if (highlight) {
    const pad = 4
    const fx = (highlight.left - pad) * scale
    const fy = (highlight.top - pad) * scale
    const fw = (highlight.width + pad * 2) * scale
    const fh = (highlight.height + pad * 2) * scale
    ctx.fillStyle = 'rgba(192,57,43,0.07)'
    ctx.fillRect(fx, fy, fw, fh)
    ctx.strokeStyle = '#C0392B'
    ctx.lineWidth = Math.max(2, 4 * scale)
    ctx.strokeRect(fx, fy, fw, fh)
  }

  return encodeUnderLimit(out)
}

export async function captureElementWithHighlight(element: HTMLElement): Promise<string> {
  const rect = element.getBoundingClientRect()
  return captureScreenshot({
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  })
}

export { removeHighlight }
