import type { WexiaWidgetConfig, FeedbackPayload } from './types'
import { injectStyles, createUI, showPickOverlay, showToast } from './ui'
import { captureElementWithHighlight, removeHighlight } from './screenshot'

const PREFIX = 'wexia'

class WexiaWidget {
  private config: Required<Pick<WexiaWidgetConfig, 'position' | 'primaryColor' | 'categories'>> & WexiaWidgetConfig
  private screenshotBase64: string | null = null
  private pickCleanup: (() => void) | null = null
  private initialized = false

  constructor(config: WexiaWidgetConfig) {
    this.config = {
      position: 'bottom-right',
      primaryColor: '#C0392B',
      categories: ['Bug', 'Nápad', 'Dotaz', 'Jiné'],
      ...config,
    }
  }

  init(): this {
    if (this.initialized) return this
    this.initialized = true

    injectStyles(this.config.primaryColor, this.config.position)
    const ui = createUI(this.config)

    // Toggle panel
    ui.button.addEventListener('click', () => {
      const isOpen = ui.panel.classList.contains(`${PREFIX}-open`)
      if (isOpen) {
        ui.panel.classList.remove(`${PREFIX}-open`)
      } else {
        this.resetForm(ui)
        ui.panel.classList.add(`${PREFIX}-open`)
      }
    })

    // Pick element
    ui.pickRow.addEventListener('click', () => {
      ui.panel.classList.remove(`${PREFIX}-open`)

      this.pickCleanup = showPickOverlay(
        async (element) => {
          ui.pickRow.classList.add(`${PREFIX}-active`)
          ui.pickRow.innerHTML = `<span class="${PREFIX}-pick-icon">⏳</span><span>Pořizuji screenshot…</span>`

          try {
            this.screenshotBase64 = await captureElementWithHighlight(element)
            this.showScreenshotPreview(ui)
            ui.pickRow.innerHTML = `<span class="${PREFIX}-pick-icon">✅</span><span>Element označen — změnit</span>`
          } catch {
            ui.pickRow.innerHTML = `<span class="${PREFIX}-pick-icon">🎯</span><span>Označit element na stránce</span>`
            ui.pickRow.classList.remove(`${PREFIX}-active`)
          }

          ui.panel.classList.add(`${PREFIX}-open`)
          this.pickCleanup = null
        },
        () => {
          ui.panel.classList.add(`${PREFIX}-open`)
          this.pickCleanup = null
        }
      )
    })

    // Submit
    ui.submitBtn.addEventListener('click', async () => {
      const comment = ui.commentTextarea.value.trim()
      if (!comment) {
        this.showError(ui, 'Prosím napiš komentář.')
        return
      }

      ui.submitBtn.disabled = true
      ui.submitBtn.textContent = 'Odesílám…'
      ui.errorEl.style.display = 'none'

      const payload: FeedbackPayload = {
        source_app:        this.config.sourceApp,
        category:          ui.categorySelect.value,
        comment,
        screenshot_base64: this.screenshotBase64 ?? undefined,
        url:               window.location.href,
        user_agent:        navigator.userAgent,
        user_email:        ui.emailInput.value.trim() || undefined,
        user_name:         this.config.userName || undefined,
        timestamp:         new Date().toISOString(),
      }

      try {
        await this.submit(payload)
        this.showSuccess(ui)
        showToast('✓ Feedback úspěšně odeslán')
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Chyba při odesílání.'
        this.showError(ui, msg)
        ui.submitBtn.disabled = false
        ui.submitBtn.textContent = 'Odeslat feedback'
      }
    })

    return this
  }

  private async submit(payload: FeedbackPayload): Promise<void> {
    const url = `${this.config.apiUrl.replace(/\/$/, '')}/api/feedback-public`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-wexia-key': this.config.apiKey,
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error ?? `HTTP ${res.status}`)
    }
  }

  private showScreenshotPreview(ui: ReturnType<typeof createUI>) {
    if (!this.screenshotBase64) return
    ui.screenshotPreview.style.display = 'flex'
    ui.screenshotPreview.innerHTML = `<img src="data:image/jpeg;base64,${this.screenshotBase64}" alt="Screenshot" />`
  }

  private showError(ui: ReturnType<typeof createUI>, msg: string) {
    ui.errorEl.textContent = msg
    ui.errorEl.style.display = 'block'
  }

  private showSuccess(ui: ReturnType<typeof createUI>) {
    // Formulář schováme (ne zahodíme) — necháme ho pro "Odeslat další feedback".
    Array.from(ui.panelBody.children).forEach((c) => {
      ;(c as HTMLElement).style.display = 'none'
    })

    let success = ui.panelBody.querySelector<HTMLDivElement>(`.${PREFIX}-success-wrap`)
    if (!success) {
      success = document.createElement('div')
      success.className = `${PREFIX}-success-wrap`
      ui.panelBody.appendChild(success)
    }
    success.style.display = 'block'
    success.innerHTML = `
      <div class="${PREFIX}-success">
        <div class="${PREFIX}-success-icon">✓</div>
        <div>Děkujeme za feedback!</div>
        <div style="font-size:13px;font-weight:400;color:#555;margin-top:4px">Tým Wexia se na to podívá.</div>
      </div>
      <button type="button" class="${PREFIX}-again-btn">Odeslat další feedback</button>
    `
    success
      .querySelector<HTMLButtonElement>(`.${PREFIX}-again-btn`)
      ?.addEventListener('click', () => this.resetForm(ui))
  }

  private resetForm(ui: ReturnType<typeof createUI>) {
    // Zpět z "děkujeme" na čistý formulář bez reloadu stránky.
    const success = ui.panelBody.querySelector<HTMLElement>(`.${PREFIX}-success-wrap`)
    if (success) success.style.display = 'none'
    Array.from(ui.panelBody.children).forEach((c) => {
      if (c !== success) (c as HTMLElement).style.display = ''
    })

    this.screenshotBase64 = null
    removeHighlight()
    ui.commentTextarea.value = ''
    ui.screenshotPreview.style.display = 'none'
    ui.screenshotPreview.innerHTML = ''
    ui.pickRow.classList.remove(`${PREFIX}-active`)
    ui.pickRow.innerHTML = `<span class="${PREFIX}-pick-icon">🎯</span><span>Označit element na stránce</span>`
    ui.errorEl.style.display = 'none'
    ui.submitBtn.disabled = false
    ui.submitBtn.textContent = 'Odeslat feedback'
  }

  destroy(): void {
    this.pickCleanup?.()
    removeHighlight()
    document.getElementById(`${PREFIX}-btn`)?.remove()
    document.getElementById(`${PREFIX}-panel`)?.remove()
    document.getElementById(`${PREFIX}-styles`)?.remove()
    this.initialized = false
  }
}

// Global API for <script> tag usage
declare global {
  interface Window {
    WexiaWidget: typeof WexiaWidget
  }
}
window.WexiaWidget = WexiaWidget

// ESM export
export default WexiaWidget
export { WexiaWidget }
