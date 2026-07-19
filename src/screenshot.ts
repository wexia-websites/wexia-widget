let highlightEl: HTMLDivElement | null = null

function removeHighlight() {
  highlightEl?.remove()
  highlightEl = null
}

async function loadHtml2Canvas() {
  const mod = await import('html2canvas')
  return mod.default
}

export async function captureScreenshot(): Promise<string> {
  const html2canvas = await loadHtml2Canvas()

  const vw = document.documentElement.clientWidth
  const vh = document.documentElement.clientHeight
  const pageW = document.documentElement.scrollWidth
  const pageH = document.documentElement.scrollHeight

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

  const cropX = Math.min(window.scrollX, Math.max(0, pageW - vw))
  const cropY = Math.min(window.scrollY, Math.max(0, pageH - vh))

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
  return out.toDataURL('image/png').split(',')[1]
}

export async function captureElementWithHighlight(element: HTMLElement): Promise<string> {
  removeHighlight()

  const rect = element.getBoundingClientRect()
  highlightEl = document.createElement('div')
  Object.assign(highlightEl.style, {
    position:    'fixed',
    left:        `${rect.left - 4}px`,
    top:         `${rect.top - 4}px`,
    width:       `${rect.width + 8}px`,
    height:      `${rect.height + 8}px`,
    border:      '4px solid #C0392B',
    borderRadius: '4px',
    background:  'rgba(192,57,43,0.07)',
    zIndex:      '2147480000',
    pointerEvents: 'none',
    boxSizing:   'border-box',
  })
  document.body.appendChild(highlightEl)

  // Wait one frame for highlight to render
  await new Promise(r => setTimeout(r, 100))

  const base64 = await captureScreenshot()
  removeHighlight()
  return base64
}

export { removeHighlight }
