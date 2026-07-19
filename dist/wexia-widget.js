import { n as e } from "./rolldown-runtime-3b4jIN3o.js";
//#region src/ui.ts
var t = "wexia";
function n(e, n) {
	let r = document.getElementById(`${t}-styles`);
	r && r.remove();
	let i = n === "bottom-left" ? "left: 24px;" : "right: 24px;", a = `
    #${t}-btn {
      position: fixed;
      bottom: 24px;
      ${i}
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: ${e};
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
    #${t}-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 20px rgba(0,0,0,0.36);
    }
    #${t}-panel {
      position: fixed;
      bottom: 88px;
      ${i}
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
    #${t}-panel.${t}-open {
      display: flex;
    }
    .${t}-panel-header {
      background: ${e};
      color: #fff;
      padding: 14px 16px;
      font-weight: 600;
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .${t}-close-btn {
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
    .${t}-close-btn:hover { opacity: 1; }
    .${t}-panel-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .${t}-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: #555;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .${t}-select,
    .${t}-textarea,
    .${t}-input {
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
    .${t}-select:focus,
    .${t}-textarea:focus,
    .${t}-input:focus {
      border-color: ${e};
      background: #fff;
    }
    .${t}-textarea {
      resize: vertical;
      min-height: 80px;
    }
    .${t}-pick-row {
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
    .${t}-pick-row:hover {
      border-color: ${e};
      background: #fef2f2;
    }
    .${t}-pick-row.${t}-active {
      border-color: ${e};
      background: #fef2f2;
      color: ${e};
      font-weight: 600;
    }
    .${t}-pick-icon { font-size: 16px; }
    .${t}-screenshot-preview {
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid #e0e0e0;
      max-height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f0f0f0;
    }
    .${t}-screenshot-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .${t}-submit-btn {
      background: ${e};
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
    .${t}-submit-btn:hover:not(:disabled) { opacity: 0.88; }
    .${t}-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .${t}-error {
      color: #c0392b;
      font-size: 12px;
      background: #fef2f2;
      border-radius: 6px;
      padding: 6px 10px;
    }
    .${t}-success {
      text-align: center;
      padding: 24px 16px;
      color: #16a34a;
      font-size: 15px;
      font-weight: 600;
    }
    .${t}-success-icon { font-size: 36px; margin-bottom: 8px; }
    .${t}-overlay {
      position: fixed;
      inset: 0;
      z-index: 2147483602;
      cursor: crosshair;
    }
    .${t}-overlay-hint {
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
    .${t}-toast {
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
  `, o = document.createElement("style");
	o.id = `${t}-styles`, o.textContent = a, document.head.appendChild(o);
}
function r(e) {
	let n = e.primaryColor ?? "#C0392B", r = e.categories ?? [
		"Bug",
		"Nápad",
		"Dotaz",
		"Jiné"
	], i = document.createElement("button");
	i.id = `${t}-btn`, i.title = "Odeslat feedback", i.innerHTML = "<svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/></svg>";
	let a = document.createElement("div");
	a.id = `${t}-panel`;
	let o = document.createElement("div");
	o.className = `${t}-panel-header`, o.innerHTML = "<span>Odeslat feedback</span>";
	let s = document.createElement("button");
	s.className = `${t}-close-btn`, s.innerHTML = "✕", s.title = "Zavřít", o.appendChild(s);
	let c = document.createElement("div");
	c.className = `${t}-panel-body`;
	let l = document.createElement("div"), u = document.createElement("label");
	u.className = `${t}-label`, u.textContent = "Kategorie";
	let d = document.createElement("select");
	d.className = `${t}-select`, r.forEach((e) => {
		let t = document.createElement("option");
		t.value = e.toLowerCase(), t.textContent = e, d.appendChild(t);
	}), l.appendChild(u), l.appendChild(d);
	let f = document.createElement("div"), p = document.createElement("label");
	p.className = `${t}-label`, p.textContent = "Komentář";
	let m = document.createElement("textarea");
	m.className = `${t}-textarea`, m.placeholder = "Co se stalo? Popiš prosím podrobněji...", f.appendChild(p), f.appendChild(m);
	let h = document.createElement("div");
	h.className = `${t}-pick-row`, h.innerHTML = `<span class="${t}-pick-icon">🎯</span><span>Označit element na stránce</span>`;
	let g = document.createElement("div");
	g.className = `${t}-screenshot-preview`, g.style.display = "none";
	let _ = document.createElement("div"), v = document.createElement("label");
	v.className = `${t}-label`, v.textContent = "Váš e-mail (volitelné)";
	let y = document.createElement("input");
	y.type = "email", y.className = `${t}-input`, y.placeholder = "vas@email.cz", y.value = e.userEmail ?? "", _.appendChild(v), _.appendChild(y);
	let b = document.createElement("div");
	b.className = `${t}-error`, b.style.display = "none";
	let x = document.createElement("button");
	return x.className = `${t}-submit-btn`, x.textContent = "Odeslat feedback", x.style.setProperty("--primary", n), c.appendChild(l), c.appendChild(f), c.appendChild(h), c.appendChild(g), c.appendChild(_), c.appendChild(b), c.appendChild(x), a.appendChild(o), a.appendChild(c), document.body.appendChild(i), document.body.appendChild(a), s.addEventListener("click", () => {
		a.classList.remove(`${t}-open`);
	}), {
		button: i,
		panel: a,
		categorySelect: d,
		commentTextarea: m,
		emailInput: y,
		pickRow: h,
		screenshotPreview: g,
		submitBtn: x,
		errorEl: b,
		panelBody: c
	};
}
function i(e, n) {
	let r = document.createElement("div");
	r.className = `${t}-overlay`;
	let i = document.createElement("div");
	i.className = `${t}-overlay-hint`, i.textContent = "Klikni na prvek který chceš označit · Esc = zrušit", document.body.appendChild(r), document.body.appendChild(i);
	let a = null, o = null;
	function s(e) {
		r.style.pointerEvents = "none";
		let t = document.elementFromPoint(e.clientX, e.clientY);
		if (r.style.pointerEvents = "", !t || t === a || (a = t, o?.remove(), !t || t.tagName === "HTML" || t.tagName === "BODY")) return;
		let n = t.getBoundingClientRect();
		o = document.createElement("div"), Object.assign(o.style, {
			position: "fixed",
			left: `${n.left - 2}px`,
			top: `${n.top - 2}px`,
			width: `${n.width + 4}px`,
			height: `${n.height + 4}px`,
			border: "2px dashed #C0392B",
			borderRadius: "3px",
			zIndex: "2147483601",
			pointerEvents: "none",
			boxSizing: "border-box"
		}), document.body.appendChild(o);
	}
	function c(t) {
		t.preventDefault(), t.stopPropagation(), r.style.pointerEvents = "none";
		let i = document.elementFromPoint(t.clientX, t.clientY);
		r.style.pointerEvents = "", u(), i && i.tagName !== "HTML" && i.tagName !== "BODY" ? e(i) : n();
	}
	function l(e) {
		e.key === "Escape" && (u(), n());
	}
	function u() {
		r.remove(), i.remove(), o?.remove(), r.removeEventListener("mousemove", s), r.removeEventListener("click", c), document.removeEventListener("keydown", l);
	}
	return r.addEventListener("mousemove", s), r.addEventListener("click", c), document.addEventListener("keydown", l), u;
}
function a(e) {
	document.querySelector(`.${t}-toast`)?.remove();
	let n = document.createElement("div");
	n.className = `${t}-toast`, n.textContent = e, document.body.appendChild(n), setTimeout(() => n.remove(), 3500);
}
//#endregion
//#region src/screenshot.ts
var o = null;
function s() {
	o?.remove(), o = null;
}
async function c() {
	return (await import("./html2canvas-BkIoAdp_.js").then((t) => /* @__PURE__ */ e(t.default, 1))).default;
}
async function l() {
	let e = await c(), t = document.documentElement.clientWidth, n = document.documentElement.clientHeight, r = document.documentElement.scrollWidth, i = document.documentElement.scrollHeight, a = 16e3, o = Math.max(1, Math.min(2, a / r, a / i)), s = await e(document.body, {
		scale: o,
		useCORS: !0,
		logging: !1,
		windowWidth: t,
		windowHeight: n,
		scrollX: 0,
		scrollY: 0,
		x: 0,
		y: 0,
		width: r,
		height: i
	}), l = Math.min(window.scrollX, Math.max(0, r - t)), u = Math.min(window.scrollY, Math.max(0, i - n)), d = document.createElement("canvas");
	d.width = Math.round(t * o), d.height = Math.round(n * o);
	let f = d.getContext("2d");
	return f ? (f.drawImage(s, Math.round(l * o), Math.round(u * o), d.width, d.height, 0, 0, d.width, d.height), d.toDataURL("image/png").split(",")[1]) : s.toDataURL("image/png").split(",")[1];
}
async function u(e) {
	s();
	let t = e.getBoundingClientRect();
	o = document.createElement("div"), Object.assign(o.style, {
		position: "fixed",
		left: `${t.left - 4}px`,
		top: `${t.top - 4}px`,
		width: `${t.width + 8}px`,
		height: `${t.height + 8}px`,
		border: "4px solid #C0392B",
		borderRadius: "4px",
		background: "rgba(192,57,43,0.07)",
		zIndex: "2147480000",
		pointerEvents: "none",
		boxSizing: "border-box"
	}), document.body.appendChild(o), await new Promise((e) => setTimeout(e, 100));
	let n = await l();
	return s(), n;
}
//#endregion
//#region src/widget.ts
var d = "wexia", f = class {
	constructor(e) {
		this.screenshotBase64 = null, this.pickCleanup = null, this.initialized = !1, this.config = {
			position: "bottom-right",
			primaryColor: "#C0392B",
			categories: [
				"Bug",
				"Nápad",
				"Dotaz",
				"Jiné"
			],
			...e
		};
	}
	init() {
		if (this.initialized) return this;
		this.initialized = !0, n(this.config.primaryColor, this.config.position);
		let e = r(this.config);
		return e.button.addEventListener("click", () => {
			e.panel.classList.contains(`${d}-open`) ? e.panel.classList.remove(`${d}-open`) : (this.resetForm(e), e.panel.classList.add(`${d}-open`));
		}), e.pickRow.addEventListener("click", () => {
			e.panel.classList.remove(`${d}-open`), this.pickCleanup = i(async (t) => {
				e.pickRow.classList.add(`${d}-active`), e.pickRow.innerHTML = `<span class="${d}-pick-icon">⏳</span><span>Pořizuji screenshot…</span>`;
				try {
					this.screenshotBase64 = await u(t), this.showScreenshotPreview(e), e.pickRow.innerHTML = `<span class="${d}-pick-icon">✅</span><span>Element označen — změnit</span>`;
				} catch {
					e.pickRow.innerHTML = `<span class="${d}-pick-icon">🎯</span><span>Označit element na stránce</span>`, e.pickRow.classList.remove(`${d}-active`);
				}
				e.panel.classList.add(`${d}-open`), this.pickCleanup = null;
			}, () => {
				e.panel.classList.add(`${d}-open`), this.pickCleanup = null;
			});
		}), e.submitBtn.addEventListener("click", async () => {
			let t = e.commentTextarea.value.trim();
			if (!t) {
				this.showError(e, "Prosím napiš komentář.");
				return;
			}
			e.submitBtn.disabled = !0, e.submitBtn.textContent = "Odesílám…", e.errorEl.style.display = "none";
			let n = {
				source_app: this.config.sourceApp,
				category: e.categorySelect.value,
				comment: t,
				screenshot_base64: this.screenshotBase64 ?? void 0,
				url: window.location.href,
				user_agent: navigator.userAgent,
				user_email: e.emailInput.value.trim() || void 0,
				user_name: this.config.userName || void 0,
				timestamp: (/* @__PURE__ */ new Date()).toISOString()
			};
			try {
				await this.submit(n), this.showSuccess(e), a("✓ Feedback úspěšně odeslán"), setTimeout(() => {
					e.panel.classList.remove(`${d}-open`);
				}, 2500);
			} catch (t) {
				let n = t instanceof Error ? t.message : "Chyba při odesílání.";
				this.showError(e, n), e.submitBtn.disabled = !1, e.submitBtn.textContent = "Odeslat feedback";
			}
		}), this;
	}
	async submit(e) {
		let t = `${this.config.apiUrl.replace(/\/$/, "")}/api/feedback-public`, n = await fetch(t, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-wexia-key": this.config.apiKey
			},
			body: JSON.stringify(e)
		});
		if (!n.ok) {
			let e = await n.json().catch(() => ({}));
			throw Error(e.error ?? `HTTP ${n.status}`);
		}
	}
	showScreenshotPreview(e) {
		this.screenshotBase64 && (e.screenshotPreview.style.display = "flex", e.screenshotPreview.innerHTML = `<img src="data:image/png;base64,${this.screenshotBase64}" alt="Screenshot" />`);
	}
	showError(e, t) {
		e.errorEl.textContent = t, e.errorEl.style.display = "block";
	}
	showSuccess(e) {
		e.panelBody.innerHTML = `
      <div class="${d}-success">
        <div class="${d}-success-icon">✓</div>
        <div>Děkujeme za feedback!</div>
        <div style="font-size:13px;font-weight:400;color:#555;margin-top:4px">Tým Wexia se na to podívá.</div>
      </div>
    `;
	}
	resetForm(e) {
		this.screenshotBase64 = null, s(), e.commentTextarea.value = "", e.screenshotPreview.style.display = "none", e.screenshotPreview.innerHTML = "", e.pickRow.classList.remove(`${d}-active`), e.pickRow.innerHTML = `<span class="${d}-pick-icon">🎯</span><span>Označit element na stránce</span>`, e.errorEl.style.display = "none", e.submitBtn.disabled = !1, e.submitBtn.textContent = "Odeslat feedback";
	}
	destroy() {
		this.pickCleanup?.(), s(), document.getElementById(`${d}-btn`)?.remove(), document.getElementById(`${d}-panel`)?.remove(), document.getElementById(`${d}-styles`)?.remove(), this.initialized = !1;
	}
};
window.WexiaWidget = f;
//#endregion
export { f as WexiaWidget, f as default };
