//#region src/ui.ts
var e = "wexia";
function t(t, n) {
	let r = document.getElementById(`${e}-styles`);
	r && r.remove();
	let i = n === "bottom-left" ? "left: 24px;" : "right: 24px;", a = `
    #${e}-btn {
      position: fixed;
      bottom: 24px;
      ${i}
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: ${t};
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
    #${e}-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 20px rgba(0,0,0,0.36);
    }
    .${e}-btn-logo {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-weight: 800;
      font-size: 24px;
      line-height: 1;
      letter-spacing: -0.5px;
      color: #fff;
    }
    #${e}-panel {
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
    #${e}-panel.${e}-open {
      display: flex;
    }
    .${e}-panel-header {
      background: ${t};
      color: #fff;
      padding: 14px 16px;
      font-weight: 600;
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .${e}-close-btn {
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
    .${e}-close-btn:hover { opacity: 1; }
    .${e}-panel-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .${e}-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: #555;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .${e}-select,
    .${e}-textarea,
    .${e}-input {
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
    .${e}-select:focus,
    .${e}-textarea:focus,
    .${e}-input:focus {
      border-color: ${t};
      background: #fff;
    }
    .${e}-textarea {
      resize: vertical;
      min-height: 80px;
    }
    .${e}-pick-row {
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
    .${e}-pick-row:hover {
      border-color: ${t};
      background: #fef2f2;
    }
    .${e}-pick-row.${e}-active {
      border-color: ${t};
      background: #fef2f2;
      color: ${t};
      font-weight: 600;
    }
    .${e}-pick-icon { font-size: 16px; }
    .${e}-screenshot-preview {
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid #e0e0e0;
      max-height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f0f0f0;
    }
    .${e}-screenshot-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .${e}-submit-btn {
      background: ${t};
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
    .${e}-submit-btn:hover:not(:disabled) { opacity: 0.88; }
    .${e}-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .${e}-error {
      color: #c0392b;
      font-size: 12px;
      background: #fef2f2;
      border-radius: 6px;
      padding: 6px 10px;
    }
    .${e}-success {
      text-align: center;
      padding: 24px 16px;
      color: #16a34a;
      font-size: 15px;
      font-weight: 600;
    }
    .${e}-success-icon { font-size: 36px; margin-bottom: 8px; }
    .${e}-again-btn {
      margin-top: 4px;
      width: 100%;
      background: #fff;
      color: ${t};
      border: 1.5px solid ${t};
      border-radius: 8px;
      padding: 9px 16px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.15s;
    }
    .${e}-again-btn:hover { background: #fef2f2; }
    .${e}-overlay {
      position: fixed;
      inset: 0;
      z-index: 2147483602;
      cursor: crosshair;
    }
    .${e}-overlay-hint {
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
    .${e}-toast {
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
	o.id = `${e}-styles`, o.textContent = a, document.head.appendChild(o);
}
function n(t) {
	let n = t.primaryColor ?? "#C0392B", r = t.categories ?? [
		"Bug",
		"Nápad",
		"Dotaz",
		"Jiné"
	], i = document.createElement("button");
	i.id = `${e}-btn`, i.title = "Odeslat feedback", i.innerHTML = `<span class="${e}-btn-logo">W</span>`;
	let a = document.createElement("div");
	a.id = `${e}-panel`;
	let o = document.createElement("div");
	o.className = `${e}-panel-header`, o.innerHTML = "<span>Odeslat feedback</span>";
	let s = document.createElement("button");
	s.className = `${e}-close-btn`, s.innerHTML = "✕", s.title = "Zavřít", o.appendChild(s);
	let c = document.createElement("div");
	c.className = `${e}-panel-body`;
	let l = document.createElement("div"), u = document.createElement("label");
	u.className = `${e}-label`, u.textContent = "Kategorie";
	let d = document.createElement("select");
	d.className = `${e}-select`, r.forEach((e) => {
		let t = document.createElement("option");
		t.value = e.toLowerCase(), t.textContent = e, d.appendChild(t);
	}), l.appendChild(u), l.appendChild(d);
	let f = document.createElement("div"), p = document.createElement("label");
	p.className = `${e}-label`, p.textContent = "Komentář";
	let m = document.createElement("textarea");
	m.className = `${e}-textarea`, m.placeholder = "Co se stalo? Popiš prosím podrobněji...", f.appendChild(p), f.appendChild(m);
	let h = document.createElement("div");
	h.className = `${e}-pick-row`, h.innerHTML = `<span class="${e}-pick-icon">🎯</span><span>Označit element na stránce</span>`;
	let g = document.createElement("div");
	g.className = `${e}-screenshot-preview`, g.style.display = "none";
	let _ = document.createElement("div"), v = document.createElement("label");
	v.className = `${e}-label`, v.textContent = "Váš e-mail (volitelné)";
	let y = document.createElement("input");
	y.type = "email", y.className = `${e}-input`, y.placeholder = "vas@email.cz", y.value = t.userEmail ?? "", _.appendChild(v), _.appendChild(y);
	let b = document.createElement("div");
	b.className = `${e}-error`, b.style.display = "none";
	let x = document.createElement("button");
	return x.className = `${e}-submit-btn`, x.textContent = "Odeslat feedback", x.style.setProperty("--primary", n), c.appendChild(l), c.appendChild(f), c.appendChild(h), c.appendChild(g), c.appendChild(_), c.appendChild(b), c.appendChild(x), a.appendChild(o), a.appendChild(c), document.body.appendChild(i), document.body.appendChild(a), s.addEventListener("click", () => {
		a.classList.remove(`${e}-open`);
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
function r(t, n) {
	let r = document.createElement("div");
	r.className = `${e}-overlay`;
	let i = document.createElement("div");
	i.className = `${e}-overlay-hint`, i.textContent = "Klikni na prvek který chceš označit · Esc = zrušit", document.body.appendChild(r), document.body.appendChild(i);
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
	function c(e) {
		e.preventDefault(), e.stopPropagation(), r.style.pointerEvents = "none";
		let i = document.elementFromPoint(e.clientX, e.clientY);
		r.style.pointerEvents = "", u(), i && i.tagName !== "HTML" && i.tagName !== "BODY" ? t(i) : n();
	}
	function l(e) {
		e.key === "Escape" && (u(), n());
	}
	function u() {
		r.remove(), i.remove(), o?.remove(), r.removeEventListener("mousemove", s), r.removeEventListener("click", c), document.removeEventListener("keydown", l);
	}
	return r.addEventListener("mousemove", s), r.addEventListener("click", c), document.addEventListener("keydown", l), u;
}
function i(t) {
	document.querySelector(`.${e}-toast`)?.remove();
	let n = document.createElement("div");
	n.className = `${e}-toast`, n.textContent = t, document.body.appendChild(n), setTimeout(() => n.remove(), 3500);
}
//#endregion
//#region src/screenshot.ts
var a = null;
function o() {
	a?.remove(), a = null;
}
async function s() {
	return (await import("./html2canvas-pro.esm-DwjqUudL.js")).default;
}
function c(e) {
	let t = [
		.85,
		.7,
		.55,
		.4
	], n = "";
	for (let r of t) if (n = e.toDataURL("image/jpeg", r).split(",")[1], n.length <= 35e5) return n;
	return n;
}
async function l(e) {
	let t = await s(), n = document.documentElement.clientWidth, r = document.documentElement.clientHeight, i = window.scrollX, a = window.scrollY, o = 16e3, l = Math.max(1, Math.min(2, o / n, o / r)), u = await t(document.documentElement, {
		scale: l,
		useCORS: !0,
		logging: !1,
		imageTimeout: 15e3,
		backgroundColor: "#ffffff",
		x: i,
		y: a,
		width: n,
		height: r,
		windowWidth: n,
		windowHeight: r
	}), d = document.createElement("canvas");
	d.width = u.width, d.height = u.height;
	let f = d.getContext("2d");
	if (!f) return c(u);
	if (f.drawImage(u, 0, 0), e) {
		let t = (e.left - 4) * l, n = (e.top - 4) * l, r = (e.width + 8) * l, i = (e.height + 8) * l;
		f.fillStyle = "rgba(192,57,43,0.07)", f.fillRect(t, n, r, i), f.strokeStyle = "#C0392B", f.lineWidth = Math.max(2, 4 * l), f.strokeRect(t, n, r, i);
	}
	return c(d);
}
async function u(e) {
	let t = e.getBoundingClientRect();
	return l({
		left: t.left,
		top: t.top,
		width: t.width,
		height: t.height
	});
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
		this.initialized = !0, t(this.config.primaryColor, this.config.position);
		let e = n(this.config);
		return e.button.addEventListener("click", () => {
			e.panel.classList.contains(`${d}-open`) ? e.panel.classList.remove(`${d}-open`) : (this.resetForm(e), e.panel.classList.add(`${d}-open`));
		}), e.pickRow.addEventListener("click", () => {
			e.panel.classList.remove(`${d}-open`), this.pickCleanup = r(async (t) => {
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
				await this.submit(n), this.showSuccess(e), i("✓ Feedback úspěšně odeslán");
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
		this.screenshotBase64 && (e.screenshotPreview.style.display = "flex", e.screenshotPreview.innerHTML = `<img src="data:image/jpeg;base64,${this.screenshotBase64}" alt="Screenshot" />`);
	}
	showError(e, t) {
		e.errorEl.textContent = t, e.errorEl.style.display = "block";
	}
	showSuccess(e) {
		Array.from(e.panelBody.children).forEach((e) => {
			e.style.display = "none";
		});
		let t = e.panelBody.querySelector(`.${d}-success-wrap`);
		t || (t = document.createElement("div"), t.className = `${d}-success-wrap`, e.panelBody.appendChild(t)), t.style.display = "block", t.innerHTML = `
      <div class="${d}-success">
        <div class="${d}-success-icon">✓</div>
        <div>Děkujeme za feedback!</div>
        <div style="font-size:13px;font-weight:400;color:#555;margin-top:4px">Tým Wexia se na to podívá.</div>
      </div>
      <button type="button" class="${d}-again-btn">Odeslat další feedback</button>
    `, t.querySelector(`.${d}-again-btn`)?.addEventListener("click", () => this.resetForm(e));
	}
	resetForm(e) {
		let t = e.panelBody.querySelector(`.${d}-success-wrap`);
		t && (t.style.display = "none"), Array.from(e.panelBody.children).forEach((e) => {
			e !== t && (e.style.display = "");
		}), this.screenshotBase64 = null, o(), e.commentTextarea.value = "", e.screenshotPreview.style.display = "none", e.screenshotPreview.innerHTML = "", e.pickRow.classList.remove(`${d}-active`), e.pickRow.innerHTML = `<span class="${d}-pick-icon">🎯</span><span>Označit element na stránce</span>`, e.errorEl.style.display = "none", e.submitBtn.disabled = !1, e.submitBtn.textContent = "Odeslat feedback";
	}
	destroy() {
		this.pickCleanup?.(), o(), document.getElementById(`${d}-btn`)?.remove(), document.getElementById(`${d}-panel`)?.remove(), document.getElementById(`${d}-styles`)?.remove(), this.initialized = !1;
	}
};
window.WexiaWidget = f;
//#endregion
export { f as WexiaWidget, f as default };
