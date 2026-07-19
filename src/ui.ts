import type { WexiaWidgetConfig } from './types'

const PREFIX = 'wexia'

export function injectStyles(primaryColor: string, position: 'bottom-right' | 'bottom-left') {
  const existing = document.getElementById(`${PREFIX}-styles`)
  if (existing) existing.remove()

  const side = position === 'bottom-left' ? 'left: 24px;' : 'right: 24px;'

  const css = `
    #${PREFIX}-btn {
      position: fixed;
      bottom: 24px;
      ${side}
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: ${primaryColor};
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.28);
      z-index: 2147483600;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.15s, box-shadow 0.15s;
      color: #fff;
      font-size: 22px;
      line-height: 1;
    }
    #${PREFIX}-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 20px rgba(0,0,0,0.36);
    }
    .${PREFIX}-btn-logo {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-weight: 800;
      font-size: 24px;
      line-height: 1;
      letter-spacing: -0.5px;
      color: #fff;
    }
    #${PREFIX}-panel {
      position: fixed;
      bottom: 88px;
      ${side}
      width: 340px;
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.22);
      z-index: 2147483601;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      color: #1a1a1a;
      display: none;
      flex-direction: column;
      overflow: hidden;
    }
    #${PREFIX}-panel.${PREFIX}-open {
      display: flex;
    }
    .${PREFIX}-panel-header {
      background: ${primaryColor};
      color: #fff;
      padding: 14px 16px;
      font-weight: 600;
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .${PREFIX}-close-btn {
      background: none;
      border: none;
      color: #fff;
      cursor: pointer;
      font-size: 18px;
      line-height: 1;
      padding: 0;
      opacity: 0.8;
      transition: opacity 0.1s;
    }
    .${PREFIX}-close-btn:hover { opacity: 1; }
    .${PREFIX}-panel-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .${PREFIX}-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: #555;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .${PREFIX}-select,
    .${PREFIX}-textarea,
    .${PREFIX}-input {
      width: 100%;
      box-sizing: border-box;
      border: 1.5px solid #e0e0e0;
      border-radius: 8px;
      padding: 8px 10px;
      font-size: 13px;
      font-family: inherit;
      color: #1a1a1a;
      background: #fafafa;
      transition: border-color 0.15s;
      outline: none;
    }
    .${PREFIX}-select:focus,
    .${PREFIX}-textarea:focus,
    .${PREFIX}-input:focus {
      border-color: ${primaryColor};
      background: #fff;
    }
    .${PREFIX}-textarea {
      resize: vertical;
      min-height: 80px;
    }
    .${PREFIX}-pick-row {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #f5f5f5;
      border-radius: 8px;
      padding: 8px 10px;
      cursor: pointer;
      border: 1.5px solid #e0e0e0;
      transition: border-color 0.15s, background 0.15s;
      user-select: none;
    }
    .${PREFIX}-pick-row:hover {
      border-color: ${primaryColor};
      background: #fef2f2;
    }
    .${PREFIX}-pick-row.${PREFIX}-active {
      border-color: ${primaryColor};
      background: #fef2f2;
      color: ${primaryColor};
      font-weight: 600;
    }
    .${PREFIX}-pick-icon { font-size: 16px; }
    .${PREFIX}-screenshot-preview {
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid #e0e0e0;
      max-height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f0f0f0;
    }
    .${PREFIX}-screenshot-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .${PREFIX}-submit-btn {
      background: ${primaryColor};
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 10px 16px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      transition: opacity 0.15s;
      font-family: inherit;
    }
    .${PREFIX}-submit-btn:hover:not(:disabled) { opacity: 0.88; }
    .${PREFIX}-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .${PREFIX}-error {
      color: #c0392b;
      font-size: 12px;
      background: #fef2f2;
      border-radius: 6px;
      padding: 6px 10px;
    }
    .${PREFIX}-success {
      text-align: center;
      padding: 24px 16px;
      color: #16a34a;
      font-size: 15px;
      font-weight: 600;
    }
    .${PREFIX}-success-icon { font-size: 36px; margin-bottom: 8px; }
    .${PREFIX}-again-btn {
      margin-top: 4px;
      width: 100%;
      background: #fff;
      color: ${primaryColor};
      border: 1.5px solid ${primaryColor};
      border-radius: 8px;
      padding: 9px 16px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.15s;
    }
    .${PREFIX}-again-btn:hover { background: #fef2f2; }
    .${PREFIX}-overlay {
      position: fixed;
      inset: 0;
      z-index: 2147483602;
      cursor: crosshair;
    }
    .${PREFIX}-overlay-hint {
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.8);
      color: #fff;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      z-index: 2147483603;
      pointer-events: none;
      white-space: nowrap;
    }
    .${PREFIX}-toast {
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: #16a34a;
      color: #fff;
      padding: 12px 24px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      z-index: 2147483647;
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
      pointer-events: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
  `
  const style = document.createElement('style')
  style.id = `${PREFIX}-styles`
  style.textContent = css
  document.head.appendChild(style)
}

export interface UIElements {
  button: HTMLButtonElement
  panel: HTMLDivElement
  categorySelect: HTMLSelectElement
  commentTextarea: HTMLTextAreaElement
  emailInput: HTMLInputElement
  pickRow: HTMLDivElement
  screenshotPreview: HTMLDivElement
  submitBtn: HTMLButtonElement
  errorEl: HTMLDivElement
  panelBody: HTMLDivElement
}

export function createUI(config: WexiaWidgetConfig): UIElements {
  const primaryColor = config.primaryColor ?? '#C0392B'
  const categories = config.categories ?? ['Bug', 'Nápad', 'Dotaz', 'Jiné']

  // Button
  const button = document.createElement('button')
  button.id = `${PREFIX}-btn`
  button.title = 'Odeslat feedback'
  button.innerHTML = `<span class="${PREFIX}-btn-logo">W</span>`

  // Panel
  const panel = document.createElement('div')
  panel.id = `${PREFIX}-panel`

  // Header
  const header = document.createElement('div')
  header.className = `${PREFIX}-panel-header`
  header.innerHTML = `<span>Odeslat feedback</span>`
  const closeBtn = document.createElement('button')
  closeBtn.className = `${PREFIX}-close-btn`
  closeBtn.innerHTML = '✕'
  closeBtn.title = 'Zavřít'
  header.appendChild(closeBtn)

  // Body
  const panelBody = document.createElement('div')
  panelBody.className = `${PREFIX}-panel-body`

  // Category
  const catLabel = document.createElement('div')
  const catLabelEl = document.createElement('label')
  catLabelEl.className = `${PREFIX}-label`
  catLabelEl.textContent = 'Kategorie'
  const categorySelect = document.createElement('select')
  categorySelect.className = `${PREFIX}-select`
  categories.forEach(cat => {
    const opt = document.createElement('option')
    opt.value = cat.toLowerCase()
    opt.textContent = cat
    categorySelect.appendChild(opt)
  })
  catLabel.appendChild(catLabelEl)
  catLabel.appendChild(categorySelect)

  // Comment
  const commentLabel = document.createElement('div')
  const commentLabelEl = document.createElement('label')
  commentLabelEl.className = `${PREFIX}-label`
  commentLabelEl.textContent = 'Komentář'
  const commentTextarea = document.createElement('textarea')
  commentTextarea.className = `${PREFIX}-textarea`
  commentTextarea.placeholder = 'Co se stalo? Popiš prosím podrobněji...'
  commentLabel.appendChild(commentLabelEl)
  commentLabel.appendChild(commentTextarea)

  // Pick element row
  const pickRow = document.createElement('div')
  pickRow.className = `${PREFIX}-pick-row`
  pickRow.innerHTML = `<span class="${PREFIX}-pick-icon">🎯</span><span>Označit element na stránce</span>`

  // Screenshot preview (hidden by default)
  const screenshotPreview = document.createElement('div')
  screenshotPreview.className = `${PREFIX}-screenshot-preview`
  screenshotPreview.style.display = 'none'

  // Email
  const emailLabel = document.createElement('div')
  const emailLabelEl = document.createElement('label')
  emailLabelEl.className = `${PREFIX}-label`
  emailLabelEl.textContent = 'Váš e-mail (volitelné)'
  const emailInput = document.createElement('input')
  emailInput.type = 'email'
  emailInput.className = `${PREFIX}-input`
  emailInput.placeholder = 'vas@email.cz'
  emailInput.value = config.userEmail ?? ''
  emailLabel.appendChild(emailLabelEl)
  emailLabel.appendChild(emailInput)

  // Error
  const errorEl = document.createElement('div')
  errorEl.className = `${PREFIX}-error`
  errorEl.style.display = 'none'

  // Submit
  const submitBtn = document.createElement('button')
  submitBtn.className = `${PREFIX}-submit-btn`
  submitBtn.textContent = 'Odeslat feedback'
  submitBtn.style.setProperty('--primary', primaryColor)

  panelBody.appendChild(catLabel)
  panelBody.appendChild(commentLabel)
  panelBody.appendChild(pickRow)
  panelBody.appendChild(screenshotPreview)
  panelBody.appendChild(emailLabel)
  panelBody.appendChild(errorEl)
  panelBody.appendChild(submitBtn)

  panel.appendChild(header)
  panel.appendChild(panelBody)

  document.body.appendChild(button)
  document.body.appendChild(panel)

  // Close button handler
  closeBtn.addEventListener('click', () => {
    panel.classList.remove(`${PREFIX}-open`)
  })

  return { button, panel, categorySelect, commentTextarea, emailInput, pickRow, screenshotPreview, submitBtn, errorEl, panelBody }
}

export function showPickOverlay(
  onPick: (element: HTMLElement) => void,
  onCancel: () => void
): () => void {
  const overlay = document.createElement('div')
  overlay.className = `${PREFIX}-overlay`

  const hint = document.createElement('div')
  hint.className = `${PREFIX}-overlay-hint`
  hint.textContent = 'Klikni na prvek který chceš označit · Esc = zrušit'

  document.body.appendChild(overlay)
  document.body.appendChild(hint)

  let hoverEl: HTMLElement | null = null
  let hoverBorder: HTMLDivElement | null = null

  function updateHover(e: MouseEvent) {
    // Find element under the overlay
    overlay.style.pointerEvents = 'none'
    const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
    overlay.style.pointerEvents = ''

    if (!target || target === hoverEl) return
    hoverEl = target

    hoverBorder?.remove()
    if (!target || target.tagName === 'HTML' || target.tagName === 'BODY') return

    const rect = target.getBoundingClientRect()
    hoverBorder = document.createElement('div')
    Object.assign(hoverBorder.style, {
      position:      'fixed',
      left:          `${rect.left - 2}px`,
      top:           `${rect.top - 2}px`,
      width:         `${rect.width + 4}px`,
      height:        `${rect.height + 4}px`,
      border:        '2px dashed #C0392B',
      borderRadius:  '3px',
      zIndex:        '2147483601',
      pointerEvents: 'none',
      boxSizing:     'border-box',
    })
    document.body.appendChild(hoverBorder)
  }

  function handleClick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    overlay.style.pointerEvents = 'none'
    const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
    overlay.style.pointerEvents = ''

    cleanup()

    if (target && target.tagName !== 'HTML' && target.tagName !== 'BODY') {
      onPick(target)
    } else {
      onCancel()
    }
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      cleanup()
      onCancel()
    }
  }

  function cleanup() {
    overlay.remove()
    hint.remove()
    hoverBorder?.remove()
    overlay.removeEventListener('mousemove', updateHover)
    overlay.removeEventListener('click', handleClick)
    document.removeEventListener('keydown', handleKey)
  }

  overlay.addEventListener('mousemove', updateHover)
  overlay.addEventListener('click', handleClick)
  document.addEventListener('keydown', handleKey)

  return cleanup
}

export function showToast(message: string) {
  document.querySelector(`.${PREFIX}-toast`)?.remove()
  const el = document.createElement('div')
  el.className = `${PREFIX}-toast`
  el.textContent = message
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 3500)
}
