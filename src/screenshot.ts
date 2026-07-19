let highlightEl: HTMLDivElement | null = null

function removeHighlight() {
  highlightEl?.remove()
  highlightEl = null
}

async function loadHtml2Canvas() {
  const mod = await import('html2canvas')
  return mod.default
}

interface HighlightRect {
  left: number
  top: number
  width: number
  height: number
}

export async function captureScreenshot(highlight?: HighlightRect): Promise<string> {
  const html2canvas = await loadHtml2Canvas()

  const vw = document.documentElement.clientWidth
  const vh = document.documentElement.clientHeight
  const pageW = document.documentElement.scrollWidth
  const pageH = document.documentElement.scrollHeight
  const sx = window.scrollX
  const sy = window.scrollY

  // html2canvas při přímém viewport-crop (x/y = scroll) ignoruje scroll pozici
  // a zachytí vršek stránky. Proto vyrenderujeme celou stránku ve správné
  // velikosti okna (kvůli 100vh, media queries) a viditelný výřez vyřízneme sami.
  // Adaptivní scale drží canvas pod limitem prohlížeče (~16384 px/hranu).
  const MAX_EDGE = 16000
  const scale = Math.max(1, Math.min(2, MAX_EDGE / pageW, MAX_EDGE / pageH))

  const full = await html2canvas(document.body, {
    scale,
    useCORS: true,
    logging: false,
    windowWidth: vw,
    windowHeight: vh,
    scrollX: 0,
    scrollY: 0,
    x: 0,
    y: 0,
    width: pageW,
    height: pageH,
  })

  const cropX = Math.min(sx, Math.max(0, pageW - vw))
  const cropY = Math.min(sy, Math.max(0, pageH - vh))

  const out = document.createElement('canvas')
  out.width = Math.round(vw * scale)
  out.height = Math.round(vh * scale)
  const ctx = out.getContext('2d')
  if (!ctx) return full.toDataURL('image/png').split(',')[1]
  ctx.drawImage(
    full,
    Math.round(cropX * scale), Math.round(cropY * scale), out.width, out.height,
    0, 0, out.width, out.height,
  )

  // Rámeček kolem vybraného elementu domalujeme přímo na výřez. Spoléhat na
  // html2canvas u position:fixed highlightu je nespolehlivé (umístí ho vůči
  // vršku full-page renderu, ne vůči reálné pozici prvku). rect je
  // viewport-relativní → absolutní pozice = rect + scroll, v canvasu = (abs - crop) * scale.
  if (highlight) {
    const pad = 4
    const fx = (highlight.left + sx - cropX - pad) * scale
    const fy = (highlight.top + sy - cropY - pad) * scale
    const fw = (highlight.width + pad * 2) * scale
    const fh = (highlight.height + pad * 2) * scale
    ctx.fillStyle = 'rgba(192,57,43,0.07)'
    ctx.fillRect(fx, fy, fw, fh)
    ctx.strokeStyle = '#C0392B'
    ctx.lineWidth = Math.max(2, 4 * scale)
    ctx.strokeRect(fx, fy, fw, fh)
  }

  return out.toDataURL('image/png').split(',')[1]
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
