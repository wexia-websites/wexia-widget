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
  const canvas = await html2canvas(document.body, {
    scale: 2,
    useCORS: true,
    logging: false,
    x: window.scrollX,
    y: window.scrollY,
    width: window.innerWidth,
    height: window.innerHeight,
    windowWidth: document.documentElement.scrollWidth,
    windowHeight: document.documentElement.scrollHeight,
  })
  return canvas.toDataURL('image/png').split(',')[1]
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
