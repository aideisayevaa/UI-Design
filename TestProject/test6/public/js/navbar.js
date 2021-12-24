/*!
 * Bootstrap v5.0.0 (https://getbootstrap.com/)
 * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e()
}(this, (function () {
    "use strict";
    const t = t => {
            do {
                t += Math.floor(1e6 * Math.random())
            } while (document.getElementById(t));
            return t
        },
        e = t => {
            let e = t.getAttribute("data-bs-target");
            if (!e || "#" === e) {
                let i = t.getAttribute("href");
                if (!i || !i.includes("#") && !i.startsWith(".")) return null;
                i.includes("#") && !i.startsWith("#") && (i = "#" + i.split("#")[1]), e = i && "#" !== i ? i.trim() : null
            }
            return e
        },
        i = t => {
            const i = e(t);
            return i && document.querySelector(i) ? i : null
        },
        n = t => {
            const i = e(t);
            return i ? document.querySelector(i) : null
        },
        s = t => {
            if (!t) return 0;
            let {
                transitionDuration: e,
                transitionDelay: i
            } = window.getComputedStyle(t);
            const n = Number.parseFloat(e),
                s = Number.parseFloat(i);
            return n || s ? (e = e.split(",")[0], i = i.split(",")[0], 1e3 * (Number.parseFloat(e) + Number.parseFloat(i))) : 0
        },
        o = t => {
            t.dispatchEvent(new Event("transitionend"))
        },
        r = t => (t[0] || t).nodeType,
        a = (t, e) => {
            let i = !1;
            const n = e + 5;
            t.addEventListener("transitionend", (function e() {
                i = !0, t.removeEventListener("transitionend", e)
            })), setTimeout(() => {
                i || o(t)
            }, n)
        },
        l = (t, e, i) => {
            Object.keys(i).forEach(n => {
                const s = i[n],
                    o = e[n],
                    a = o && r(o) ? "element" : null == (l = o) ? "" + l : {}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase();
                var l;
                if (!new RegExp(s).test(a)) throw new TypeError(`${t.toUpperCase()}: Option "${n}" provided type "${a}" but expected type "${s}".`)
            })
        },
        c = t => {
            if (!t) return !1;
            if (t.style && t.parentNode && t.parentNode.style) {
                const e = getComputedStyle(t),
                    i = getComputedStyle(t.parentNode);
                return "none" !== e.display && "none" !== i.display && "hidden" !== e.visibility
            }
            return !1
        },
        d = t => !t || t.nodeType !== Node.ELEMENT_NODE || !!t.classList.contains("disabled") || (void 0 !== t.disabled ? t.disabled : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled")),
        h = t => {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof t.getRootNode) {
                const e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null
            }
            return t instanceof ShadowRoot ? t : t.parentNode ? h(t.parentNode) : null
        },
        u = () => {},
        f = t => t.offsetHeight,
        p = () => {
            const {
                jQuery: t
            } = window;
            return t && !document.body.hasAttribute("data-bs-no-jquery") ? t : null
        },
        g = () => "rtl" === document.documentElement.dir,
        m = (t, e) => {
            var i;
            i = () => {
                const i = p();
                if (i) {
                    const n = i.fn[t];
                    i.fn[t] = e.jQueryInterface, i.fn[t].Constructor = e, i.fn[t].noConflict = () => (i.fn[t] = n, e.jQueryInterface)
                }
            }, "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", i) : i()
        },
        _ = t => {
            "function" == typeof t && t()
        },
        b = new Map;
    var v = {
        set(t, e, i) {
            b.has(t) || b.set(t, new Map);
            const n = b.get(t);
            n.has(e) || 0 === n.size ? n.set(e, i) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`)
        },
        get: (t, e) => b.has(t) && b.get(t).get(e) || null,
        remove(t, e) {
            if (!b.has(t)) return;
            const i = b.get(t);
            i.delete(e), 0 === i.size && b.delete(t)
        }
    };
    const y = /[^.]*(?=\..*)\.|.*/,
        w = /\..*/,
        E = /::\d+$/,
        T = {};
    let A = 1;
    const L = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        },
        O = /^(mouseenter|mouseleave)/i,
        k = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

    function D(t, e) {
        return e && `${e}::${A++}` || t.uidEvent || A++
    }

    function x(t) {
        const e = D(t);
        return t.uidEvent = e, T[e] = T[e] || {}, T[e]
    }

    function C(t, e, i = null) {
        const n = Object.keys(t);
        for (let s = 0, o = n.length; s < o; s++) {
            const o = t[n[s]];
            if (o.originalHandler === e && o.delegationSelector === i) return o
        }
        return null
    }

    function S(t, e, i) {
        const n = "string" == typeof e,
            s = n ? i : e;
        let o = P(t);
        return k.has(o) || (o = t), [n, s, o]
    }

    function N(t, e, i, n, s) {
        if ("string" != typeof e || !t) return;
        if (i || (i = n, n = null), O.test(e)) {
            const t = t => function (e) {
                if (!e.relatedTarget || e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget)) return t.call(this, e)
            };
            n ? n = t(n) : i = t(i)
        }
        const [o, r, a] = S(e, i, n), l = x(t), c = l[a] || (l[a] = {}), d = C(c, r, o ? i : null);
        if (d) return void(d.oneOff = d.oneOff && s);
        const h = D(r, e.replace(y, "")),
            u = o ? function (t, e, i) {
                return function n(s) {
                    const o = t.querySelectorAll(e);
                    for (let {
                            target: r
                        } = s; r && r !== this; r = r.parentNode)
                        for (let a = o.length; a--;)
                            if (o[a] === r) return s.delegateTarget = r, n.oneOff && I.off(t, s.type, e, i), i.apply(r, [s]);
                    return null
                }
            }(t, i, n) : function (t, e) {
                return function i(n) {
                    return n.delegateTarget = t, i.oneOff && I.off(t, n.type, e), e.apply(t, [n])
                }
            }(t, i);
        u.delegationSelector = o ? i : null, u.originalHandler = r, u.oneOff = s, u.uidEvent = h, c[h] = u, t.addEventListener(a, u, o)
    }

    function j(t, e, i, n, s) {
        const o = C(e[i], n, s);
        o && (t.removeEventListener(i, o, Boolean(s)), delete e[i][o.uidEvent])
    }

    function P(t) {
        return t = t.replace(w, ""), L[t] || t
    }
    const I = {
        on(t, e, i, n) {
            N(t, e, i, n, !1)
        },
        one(t, e, i, n) {
            N(t, e, i, n, !0)
        },
        off(t, e, i, n) {
            if ("string" != typeof e || !t) return;
            const [s, o, r] = S(e, i, n), a = r !== e, l = x(t), c = e.startsWith(".");
            if (void 0 !== o) {
                if (!l || !l[r]) return;
                return void j(t, l, r, o, s ? i : null)
            }
            c && Object.keys(l).forEach(i => {
                ! function (t, e, i, n) {
                    const s = e[i] || {};
                    Object.keys(s).forEach(o => {
                        if (o.includes(n)) {
                            const n = s[o];
                            j(t, e, i, n.originalHandler, n.delegationSelector)
                        }
                    })
                }(t, l, i, e.slice(1))
            });
            const d = l[r] || {};
            Object.keys(d).forEach(i => {
                const n = i.replace(E, "");
                if (!a || e.includes(n)) {
                    const e = d[i];
                    j(t, l, r, e.originalHandler, e.delegationSelector)
                }
            })
        },
        trigger(t, e, i) {
            if ("string" != typeof e || !t) return null;
            const n = p(),
                s = P(e),
                o = e !== s,
                r = k.has(s);
            let a, l = !0,
                c = !0,
                d = !1,
                h = null;
            return o && n && (a = n.Event(e, i), n(t).trigger(a), l = !a.isPropagationStopped(), c = !a.isImmediatePropagationStopped(), d = a.isDefaultPrevented()), r ? (h = document.createEvent("HTMLEvents"), h.initEvent(s, l, !0)) : h = new CustomEvent(e, {
                bubbles: l,
                cancelable: !0
            }), void 0 !== i && Object.keys(i).forEach(t => {
                Object.defineProperty(h, t, {
                    get: () => i[t]
                })
            }), d && h.preventDefault(), c && t.dispatchEvent(h), h.defaultPrevented && void 0 !== a && a.preventDefault(), h
        }
    };
    class M {
        constructor(t) {
            (t = "string" == typeof t ? document.querySelector(t) : t) && (this._element = t, v.set(this._element, this.constructor.DATA_KEY, this))
        }
        dispose() {
            v.remove(this._element, this.constructor.DATA_KEY), I.off(this._element, "." + this.constructor.DATA_KEY), this._element = null
        }
        static getInstance(t) {
            return v.get(t, this.DATA_KEY)
        }
        static get VERSION() {
            return "5.0.0"
        }
    }
    class H extends M {
        static get DATA_KEY() {
            return "bs.alert"
        }
        close(t) {
            const e = t ? this._getRootElement(t) : this._element,
                i = this._triggerCloseEvent(e);
            null === i || i.defaultPrevented || this._removeElement(e)
        }
        _getRootElement(t) {
            return n(t) || t.closest(".alert")
        }
        _triggerCloseEvent(t) {
            return I.trigger(t, "close.bs.alert")
        }
        _removeElement(t) {
            if (t.classList.remove("show"), !t.classList.contains("fade")) return void this._destroyElement(t);
            const e = s(t);
            I.one(t, "transitionend", () => this._destroyElement(t)), a(t, e)
        }
        _destroyElement(t) {
            t.parentNode && t.parentNode.removeChild(t), I.trigger(t, "closed.bs.alert")
        }
        static jQueryInterface(t) {
            return this.each((function () {
                let e = v.get(this, "bs.alert");
                e || (e = new H(this)), "close" === t && e[t](this)
            }))
        }
        static handleDismiss(t) {
            return function (e) {
                e && e.preventDefault(), t.close(this)
            }
        }
    }
    I.on(document, "click.bs.alert.data-api", '[data-bs-dismiss="alert"]', H.handleDismiss(new H)), m("alert", H);
    class R extends M {
        static get DATA_KEY() {
            return "bs.button"
        }
        toggle() {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
        }
        static jQueryInterface(t) {
            return this.each((function () {
                let e = v.get(this, "bs.button");
                e || (e = new R(this)), "toggle" === t && e[t]()
            }))
        }
    }

    function B(t) {
        return "true" === t || "false" !== t && (t === Number(t).toString() ? Number(t) : "" === t || "null" === t ? null : t)
    }

    function W(t) {
        return t.replace(/[A-Z]/g, t => "-" + t.toLowerCase())
    }
    I.on(document, "click.bs.button.data-api", '[data-bs-toggle="button"]', t => {
        t.preventDefault();
        const e = t.target.closest('[data-bs-toggle="button"]');
        let i = v.get(e, "bs.button");
        i || (i = new R(e)), i.toggle()
    }), m("button", R);
    const z = {
            setDataAttribute(t, e, i) {
                t.setAttribute("data-bs-" + W(e), i)
            },
            removeDataAttribute(t, e) {
                t.removeAttribute("data-bs-" + W(e))
            },
            getDataAttributes(t) {
                if (!t) return {};
                const e = {};
                return Object.keys(t.dataset).filter(t => t.startsWith("bs")).forEach(i => {
                    let n = i.replace(/^bs/, "");
                    n = n.charAt(0).toLowerCase() + n.slice(1, n.length), e[n] = B(t.dataset[i])
                }), e
            },
            getDataAttribute: (t, e) => B(t.getAttribute("data-bs-" + W(e))),
            offset(t) {
                const e = t.getBoundingClientRect();
                return {
                    top: e.top + document.body.scrollTop,
                    left: e.left + document.body.scrollLeft
                }
            },
            position: t => ({
                top: t.offsetTop,
                left: t.offsetLeft
            })
        },
        U = {
            find: (t, e = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e, t)),
            findOne: (t, e = document.documentElement) => Element.prototype.querySelector.call(e, t),
            children: (t, e) => [].concat(...t.children).filter(t => t.matches(e)),
            parents(t, e) {
                const i = [];
                let n = t.parentNode;
                for (; n && n.nodeType === Node.ELEMENT_NODE && 3 !== n.nodeType;) n.matches(e) && i.push(n), n = n.parentNode;
                return i
            },
            prev(t, e) {
                let i = t.previousElementSibling;
                for (; i;) {
                    if (i.matches(e)) return [i];
                    i = i.previousElementSibling
                }
                return []
            },
            next(t, e) {
                let i = t.nextElementSibling;
                for (; i;) {
                    if (i.matches(e)) return [i];
                    i = i.nextElementSibling
                }
                return []
            }
        },
        $ = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        F = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        K = "next",
        Y = "prev",
        q = "left",
        V = "right";
    class X extends M {
        constructor(t, e) {
            super(t), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._indicatorsElement = U.findOne(".carousel-indicators", this._element), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent), this._addEventListeners()
        }
        static get Default() {
            return $
        }
        static get DATA_KEY() {
            return "bs.carousel"
        }
        next() {
            this._isSliding || this._slide(K)
        }
        nextWhenVisible() {
            !document.hidden && c(this._element) && this.next()
        }
        prev() {
            this._isSliding || this._slide(Y)
        }
        pause(t) {
            t || (this._isPaused = !0), U.findOne(".carousel-item-next, .carousel-item-prev", this._element) && (o(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
        }
        cycle(t) {
            t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config && this._config.interval && !this._isPaused && (this._updateInterval(), this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
        }
        to(t) {
            this._activeElement = U.findOne(".active.carousel-item", this._element);
            const e = this._getItemIndex(this._activeElement);
            if (t > this._items.length - 1 || t < 0) return;
            if (this._isSliding) return void I.one(this._element, "slid.bs.carousel", () => this.to(t));
            if (e === t) return this.pause(), void this.cycle();
            const i = t > e ? K : Y;
            this._slide(i, this._items[t])
        }
        dispose() {
            this._items = null, this._config = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null, super.dispose()
        }
        _getConfig(t) {
            return t = {
                ...$,
                ...t
            }, l("carousel", t, F), t
        }
        _handleSwipe() {
            const t = Math.abs(this.touchDeltaX);
            if (t <= 40) return;
            const e = t / this.touchDeltaX;
            this.touchDeltaX = 0, e && this._slide(e > 0 ? V : q)
        }
        _addEventListeners() {
            this._config.keyboard && I.on(this._element, "keydown.bs.carousel", t => this._keydown(t)), "hover" === this._config.pause && (I.on(this._element, "mouseenter.bs.carousel", t => this.pause(t)), I.on(this._element, "mouseleave.bs.carousel", t => this.cycle(t))), this._config.touch && this._touchSupported && this._addTouchEventListeners()
        }
        _addTouchEventListeners() {
            const t = t => {
                    !this._pointerEvent || "pen" !== t.pointerType && "touch" !== t.pointerType ? this._pointerEvent || (this.touchStartX = t.touches[0].clientX) : this.touchStartX = t.clientX
                },
                e = t => {
                    this.touchDeltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this.touchStartX
                },
                i = t => {
                    !this._pointerEvent || "pen" !== t.pointerType && "touch" !== t.pointerType || (this.touchDeltaX = t.clientX - this.touchStartX), this._handleSwipe(), "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(t => this.cycle(t), 500 + this._config.interval))
                };
            U.find(".carousel-item img", this._element).forEach(t => {
                I.on(t, "dragstart.bs.carousel", t => t.preventDefault())
            }), this._pointerEvent ? (I.on(this._element, "pointerdown.bs.carousel", e => t(e)), I.on(this._element, "pointerup.bs.carousel", t => i(t)), this._element.classList.add("pointer-event")) : (I.on(this._element, "touchstart.bs.carousel", e => t(e)), I.on(this._element, "touchmove.bs.carousel", t => e(t)), I.on(this._element, "touchend.bs.carousel", t => i(t)))
        }
        _keydown(t) {
            /input|textarea/i.test(t.target.tagName) || ("ArrowLeft" === t.key ? (t.preventDefault(), this._slide(V)) : "ArrowRight" === t.key && (t.preventDefault(), this._slide(q)))
        }
        _getItemIndex(t) {
            return this._items = t && t.parentNode ? U.find(".carousel-item", t.parentNode) : [], this._items.indexOf(t)
        }
        _getItemByOrder(t, e) {
            const i = t === K,
                n = t === Y,
                s = this._getItemIndex(e),
                o = this._items.length - 1;
            if ((n && 0 === s || i && s === o) && !this._config.wrap) return e;
            const r = (s + (n ? -1 : 1)) % this._items.length;
            return -1 === r ? this._items[this._items.length - 1] : this._items[r]
        }
        _triggerSlideEvent(t, e) {
            const i = this._getItemIndex(t),
                n = this._getItemIndex(U.findOne(".active.carousel-item", this._element));
            return I.trigger(this._element, "slide.bs.carousel", {
                relatedTarget: t,
                direction: e,
                from: n,
                to: i
            })
        }
        _setActiveIndicatorElement(t) {
            if (this._indicatorsElement) {
                const e = U.findOne(".active", this._indicatorsElement);
                e.classList.remove("active"), e.removeAttribute("aria-current");
                const i = U.find("[data-bs-target]", this._indicatorsElement);
                for (let e = 0; e < i.length; e++)
                    if (Number.parseInt(i[e].getAttribute("data-bs-slide-to"), 10) === this._getItemIndex(t)) {
                        i[e].classList.add("active"), i[e].setAttribute("aria-current", "true");
                        break
                    }
            }
        }
        _updateInterval() {
            const t = this._activeElement || U.findOne(".active.carousel-item", this._element);
            if (!t) return;
            const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
            e ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = e) : this._config.interval = this._config.defaultInterval || this._config.interval
        }
        _slide(t, e) {
            const i = this._directionToOrder(t),
                n = U.findOne(".active.carousel-item", this._element),
                o = this._getItemIndex(n),
                r = e || this._getItemByOrder(i, n),
                l = this._getItemIndex(r),
                c = Boolean(this._interval),
                d = i === K,
                h = d ? "carousel-item-start" : "carousel-item-end",
                u = d ? "carousel-item-next" : "carousel-item-prev",
                p = this._orderToDirection(i);
            if (r && r.classList.contains("active")) this._isSliding = !1;
            else if (!this._triggerSlideEvent(r, p).defaultPrevented && n && r) {
                if (this._isSliding = !0, c && this.pause(), this._setActiveIndicatorElement(r), this._activeElement = r, this._element.classList.contains("slide")) {
                    r.classList.add(u), f(r), n.classList.add(h), r.classList.add(h);
                    const t = s(n);
                    I.one(n, "transitionend", () => {
                        r.classList.remove(h, u), r.classList.add("active"), n.classList.remove("active", u, h), this._isSliding = !1, setTimeout(() => {
                            I.trigger(this._element, "slid.bs.carousel", {
                                relatedTarget: r,
                                direction: p,
                                from: o,
                                to: l
                            })
                        }, 0)
                    }), a(n, t)
                } else n.classList.remove("active"), r.classList.add("active"), this._isSliding = !1, I.trigger(this._element, "slid.bs.carousel", {
                    relatedTarget: r,
                    direction: p,
                    from: o,
                    to: l
                });
                c && this.cycle()
            }
        }
        _directionToOrder(t) {
            return [V, q].includes(t) ? g() ? t === q ? Y : K : t === q ? K : Y : t
        }
        _orderToDirection(t) {
            return [K, Y].includes(t) ? g() ? t === Y ? q : V : t === Y ? V : q : t
        }
        static carouselInterface(t, e) {
            let i = v.get(t, "bs.carousel"),
                n = {
                    ...$,
                    ...z.getDataAttributes(t)
                };
            "object" == typeof e && (n = {
                ...n,
                ...e
            });
            const s = "string" == typeof e ? e : n.slide;
            if (i || (i = new X(t, n)), "number" == typeof e) i.to(e);
            else if ("string" == typeof s) {
                if (void 0 === i[s]) throw new TypeError(`No method named "${s}"`);
                i[s]()
            } else n.interval && n.ride && (i.pause(), i.cycle())
        }
        static jQueryInterface(t) {
            return this.each((function () {
                X.carouselInterface(this, t)
            }))
        }
        static dataApiClickHandler(t) {
            const e = n(this);
            if (!e || !e.classList.contains("carousel")) return;
            const i = {
                    ...z.getDataAttributes(e),
                    ...z.getDataAttributes(this)
                },
                s = this.getAttribute("data-bs-slide-to");
            s && (i.interval = !1), X.carouselInterface(e, i), s && v.get(e, "bs.carousel").to(s), t.preventDefault()
        }
    }
    I.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", X.dataApiClickHandler), I.on(window, "load.bs.carousel.data-api", () => {
        const t = U.find('[data-bs-ride="carousel"]');
        for (let e = 0, i = t.length; e < i; e++) X.carouselInterface(t[e], v.get(t[e], "bs.carousel"))
    }), m("carousel", X);
    const Q = {
            toggle: !0,
            parent: ""
        },
        G = {
            toggle: "boolean",
            parent: "(string|element)"
        };
    class Z extends M {
        constructor(t, e) {
            super(t), this._isTransitioning = !1, this._config = this._getConfig(e), this._triggerArray = U.find(`[data-bs-toggle="collapse"][href="#${this._element.id}"],[data-bs-toggle="collapse"][data-bs-target="#${this._element.id}"]`);
            const n = U.find('[data-bs-toggle="collapse"]');
            for (let t = 0, e = n.length; t < e; t++) {
                const e = n[t],
                    s = i(e),
                    o = U.find(s).filter(t => t === this._element);
                null !== s && o.length && (this._selector = s, this._triggerArray.push(e))
            }
            this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
        }
        static get Default() {
            return Q
        }
        static get DATA_KEY() {
            return "bs.collapse"
        }
        toggle() {
            this._element.classList.contains("show") ? this.hide() : this.show()
        }
        show() {
            if (this._isTransitioning || this._element.classList.contains("show")) return;
            let t, e;
            this._parent && (t = U.find(".show, .collapsing", this._parent).filter(t => "string" == typeof this._config.parent ? t.getAttribute("data-bs-parent") === this._config.parent : t.classList.contains("collapse")), 0 === t.length && (t = null));
            const i = U.findOne(this._selector);
            if (t) {
                const n = t.find(t => i !== t);
                if (e = n ? v.get(n, "bs.collapse") : null, e && e._isTransitioning) return
            }
            if (I.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
            t && t.forEach(t => {
                i !== t && Z.collapseInterface(t, "hide"), e || v.set(t, "bs.collapse", null)
            });
            const n = this._getDimension();
            this._element.classList.remove("collapse"), this._element.classList.add("collapsing"), this._element.style[n] = 0, this._triggerArray.length && this._triggerArray.forEach(t => {
                t.classList.remove("collapsed"), t.setAttribute("aria-expanded", !0)
            }), this.setTransitioning(!0);
            const o = "scroll" + (n[0].toUpperCase() + n.slice(1)),
                r = s(this._element);
            I.one(this._element, "transitionend", () => {
                this._element.classList.remove("collapsing"), this._element.classList.add("collapse", "show"), this._element.style[n] = "", this.setTransitioning(!1), I.trigger(this._element, "shown.bs.collapse")
            }), a(this._element, r), this._element.style[n] = this._element[o] + "px"
        }
        hide() {
            if (this._isTransitioning || !this._element.classList.contains("show")) return;
            if (I.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
            const t = this._getDimension();
            this._element.style[t] = this._element.getBoundingClientRect()[t] + "px", f(this._element), this._element.classList.add("collapsing"), this._element.classList.remove("collapse", "show");
            const e = this._triggerArray.length;
            if (e > 0)
                for (let t = 0; t < e; t++) {
                    const e = this._triggerArray[t],
                        i = n(e);
                    i && !i.classList.contains("show") && (e.classList.add("collapsed"), e.setAttribute("aria-expanded", !1))
                }
            this.setTransitioning(!0), this._element.style[t] = "";
            const i = s(this._element);
            I.one(this._element, "transitionend", () => {
                this.setTransitioning(!1), this._element.classList.remove("collapsing"), this._element.classList.add("collapse"), I.trigger(this._element, "hidden.bs.collapse")
            }), a(this._element, i)
        }
        setTransitioning(t) {
            this._isTransitioning = t
        }
        dispose() {
            super.dispose(), this._config = null, this._parent = null, this._triggerArray = null, this._isTransitioning = null
        }
        _getConfig(t) {
            return (t = {
                ...Q,
                ...t
            }).toggle = Boolean(t.toggle), l("collapse", t, G), t
        }
        _getDimension() {
            return this._element.classList.contains("width") ? "width" : "height"
        }
        _getParent() {
            let {
                parent: t
            } = this._config;
            r(t) ? void 0 === t.jquery && void 0 === t[0] || (t = t[0]) : t = U.findOne(t);
            const e = `[data-bs-toggle="collapse"][data-bs-parent="${t}"]`;
            return U.find(e, t).forEach(t => {
                const e = n(t);
                this._addAriaAndCollapsedClass(e, [t])
            }), t
        }
        _addAriaAndCollapsedClass(t, e) {
            if (!t || !e.length) return;
            const i = t.classList.contains("show");
            e.forEach(t => {
                i ? t.classList.remove("collapsed") : t.classList.add("collapsed"), t.setAttribute("aria-expanded", i)
            })
        }
        static collapseInterface(t, e) {
            let i = v.get(t, "bs.collapse");
            const n = {
                ...Q,
                ...z.getDataAttributes(t),
                ..."object" == typeof e && e ? e : {}
            };
            if (!i && n.toggle && "string" == typeof e && /show|hide/.test(e) && (n.toggle = !1), i || (i = new Z(t, n)), "string" == typeof e) {
                if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
                i[e]()
            }
        }
        static jQueryInterface(t) {
            return this.each((function () {
                Z.collapseInterface(this, t)
            }))
        }
    }
    I.on(document, "click.bs.collapse.data-api", '[data-bs-toggle="collapse"]', (function (t) {
        ("A" === t.target.tagName || t.delegateTarget && "A" === t.delegateTarget.tagName) && t.preventDefault();
        const e = z.getDataAttributes(this),
            n = i(this);
        U.find(n).forEach(t => {
            const i = v.get(t, "bs.collapse");
            let n;
            i ? (null === i._parent && "string" == typeof e.parent && (i._config.parent = e.parent, i._parent = i._getParent()), n = "toggle") : n = e, Z.collapseInterface(t, n)
        })
    })), m("collapse", Z);
    var J = "top",
        tt = "bottom",
        et = "right",
        it = "left",
        nt = [J, tt, et, it],
        st = nt.reduce((function (t, e) {
            return t.concat([e + "-start", e + "-end"])
        }), []),
        ot = [].concat(nt, ["auto"]).reduce((function (t, e) {
            return t.concat([e, e + "-start", e + "-end"])
        }), []),
        rt = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

    function at(t) {
        return t ? (t.nodeName || "").toLowerCase() : null
    }

    function lt(t) {
        if (null == t) return window;
        if ("[object Window]" !== t.toString()) {
            var e = t.ownerDocument;
            return e && e.defaultView || window
        }
        return t
    }

    function ct(t) {
        return t instanceof lt(t).Element || t instanceof Element
    }

    function dt(t) {
        return t instanceof lt(t).HTMLElement || t instanceof HTMLElement
    }

    function ht(t) {
        return "undefined" != typeof ShadowRoot && (t instanceof lt(t).ShadowRoot || t instanceof ShadowRoot)
    }
    var ut = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function (t) {
            var e = t.state;
            Object.keys(e.elements).forEach((function (t) {
                var i = e.styles[t] || {},
                    n = e.attributes[t] || {},
                    s = e.elements[t];
                dt(s) && at(s) && (Object.assign(s.style, i), Object.keys(n).forEach((function (t) {
                    var e = n[t];
                    !1 === e ? s.removeAttribute(t) : s.setAttribute(t, !0 === e ? "" : e)
                })))
            }))
        },
        effect: function (t) {
            var e = t.state,
                i = {
                    popper: {
                        position: e.options.strategy,
                        left: "0",
                        top: "0",
                        margin: "0"
                    },
                    arrow: {
                        position: "absolute"
                    },
                    reference: {}
                };
            return Object.assign(e.elements.popper.style, i.popper), e.styles = i, e.elements.arrow && Object.assign(e.elements.arrow.style, i.arrow),
                function () {
                    Object.keys(e.elements).forEach((function (t) {
                        var n = e.elements[t],
                            s = e.attributes[t] || {},
                            o = Object.keys(e.styles.hasOwnProperty(t) ? e.styles[t] : i[t]).reduce((function (t, e) {
                                return t[e] = "", t
                            }), {});
                        dt(n) && at(n) && (Object.assign(n.style, o), Object.keys(s).forEach((function (t) {
                            n.removeAttribute(t)
                        })))
                    }))
                }
        },
        requires: ["computeStyles"]
    };

    function ft(t) {
        return t.split("-")[0]
    }

    function pt(t) {
        var e = t.getBoundingClientRect();
        return {
            width: e.width,
            height: e.height,
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            left: e.left,
            x: e.left,
            y: e.top
        }
    }

    function gt(t) {
        var e = pt(t),
            i = t.offsetWidth,
            n = t.offsetHeight;
        return Math.abs(e.width - i) <= 1 && (i = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
            x: t.offsetLeft,
            y: t.offsetTop,
            width: i,
            height: n
        }
    }

    function mt(t, e) {
        var i = e.getRootNode && e.getRootNode();
        if (t.contains(e)) return !0;
        if (i && ht(i)) {
            var n = e;
            do {
                if (n && t.isSameNode(n)) return !0;
                n = n.parentNode || n.host
            } while (n)
        }
        return !1
    }

    function _t(t) {
        return lt(t).getComputedStyle(t)
    }

    function bt(t) {
        return ["table", "td", "th"].indexOf(at(t)) >= 0
    }

    function vt(t) {
        return ((ct(t) ? t.ownerDocument : t.document) || window.document).documentElement
    }

    function yt(t) {
        return "html" === at(t) ? t : t.assignedSlot || t.parentNode || (ht(t) ? t.host : null) || vt(t)
    }

    function wt(t) {
        return dt(t) && "fixed" !== _t(t).position ? t.offsetParent : null
    }

    function Et(t) {
        for (var e = lt(t), i = wt(t); i && bt(i) && "static" === _t(i).position;) i = wt(i);
        return i && ("html" === at(i) || "body" === at(i) && "static" === _t(i).position) ? e : i || function (t) {
            var e = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (-1 !== navigator.userAgent.indexOf("Trident") && dt(t) && "fixed" === _t(t).position) return null;
            for (var i = yt(t); dt(i) && ["html", "body"].indexOf(at(i)) < 0;) {
                var n = _t(i);
                if ("none" !== n.transform || "none" !== n.perspective || "paint" === n.contain || -1 !== ["transform", "perspective"].indexOf(n.willChange) || e && "filter" === n.willChange || e && n.filter && "none" !== n.filter) return i;
                i = i.parentNode
            }
            return null
        }(t) || e
    }

    function Tt(t) {
        return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y"
    }
    var At = Math.max,
        Lt = Math.min,
        Ot = Math.round;

    function kt(t, e, i) {
        return At(t, Lt(e, i))
    }

    function Dt(t) {
        return Object.assign({}, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, t)
    }

    function xt(t, e) {
        return e.reduce((function (e, i) {
            return e[i] = t, e
        }), {})
    }
    var Ct = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function (t) {
                var e, i = t.state,
                    n = t.name,
                    s = t.options,
                    o = i.elements.arrow,
                    r = i.modifiersData.popperOffsets,
                    a = ft(i.placement),
                    l = Tt(a),
                    c = [it, et].indexOf(a) >= 0 ? "height" : "width";
                if (o && r) {
                    var d = function (t, e) {
                            return Dt("number" != typeof (t = "function" == typeof t ? t(Object.assign({}, e.rects, {
                                placement: e.placement
                            })) : t) ? t : xt(t, nt))
                        }(s.padding, i),
                        h = gt(o),
                        u = "y" === l ? J : it,
                        f = "y" === l ? tt : et,
                        p = i.rects.reference[c] + i.rects.reference[l] - r[l] - i.rects.popper[c],
                        g = r[l] - i.rects.reference[l],
                        m = Et(o),
                        _ = m ? "y" === l ? m.clientHeight || 0 : m.clientWidth || 0 : 0,
                        b = p / 2 - g / 2,
                        v = d[u],
                        y = _ - h[c] - d[f],
                        w = _ / 2 - h[c] / 2 + b,
                        E = kt(v, w, y),
                        T = l;
                    i.modifiersData[n] = ((e = {})[T] = E, e.centerOffset = E - w, e)
                }
            },
            effect: function (t) {
                var e = t.state,
                    i = t.options.element,
                    n = void 0 === i ? "[data-popper-arrow]" : i;
                null != n && ("string" != typeof n || (n = e.elements.popper.querySelector(n))) && mt(e.elements.popper, n) && (e.elements.arrow = n)
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"]
        },
        St = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        };

    function Nt(t) {
        var e, i = t.popper,
            n = t.popperRect,
            s = t.placement,
            o = t.offsets,
            r = t.position,
            a = t.gpuAcceleration,
            l = t.adaptive,
            c = t.roundOffsets,
            d = !0 === c ? function (t) {
                var e = t.x,
                    i = t.y,
                    n = window.devicePixelRatio || 1;
                return {
                    x: Ot(Ot(e * n) / n) || 0,
                    y: Ot(Ot(i * n) / n) || 0
                }
            }(o) : "function" == typeof c ? c(o) : o,
            h = d.x,
            u = void 0 === h ? 0 : h,
            f = d.y,
            p = void 0 === f ? 0 : f,
            g = o.hasOwnProperty("x"),
            m = o.hasOwnProperty("y"),
            _ = it,
            b = J,
            v = window;
        if (l) {
            var y = Et(i),
                w = "clientHeight",
                E = "clientWidth";
            y === lt(i) && "static" !== _t(y = vt(i)).position && (w = "scrollHeight", E = "scrollWidth"), y = y, s === J && (b = tt, p -= y[w] - n.height, p *= a ? 1 : -1), s === it && (_ = et, u -= y[E] - n.width, u *= a ? 1 : -1)
        }
        var T, A = Object.assign({
            position: r
        }, l && St);
        return a ? Object.assign({}, A, ((T = {})[b] = m ? "0" : "", T[_] = g ? "0" : "", T.transform = (v.devicePixelRatio || 1) < 2 ? "translate(" + u + "px, " + p + "px)" : "translate3d(" + u + "px, " + p + "px, 0)", T)) : Object.assign({}, A, ((e = {})[b] = m ? p + "px" : "", e[_] = g ? u + "px" : "", e.transform = "", e))
    }
    var jt = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function (t) {
                var e = t.state,
                    i = t.options,
                    n = i.gpuAcceleration,
                    s = void 0 === n || n,
                    o = i.adaptive,
                    r = void 0 === o || o,
                    a = i.roundOffsets,
                    l = void 0 === a || a,
                    c = {
                        placement: ft(e.placement),
                        popper: e.elements.popper,
                        popperRect: e.rects.popper,
                        gpuAcceleration: s
                    };
                null != e.modifiersData.popperOffsets && (e.styles.popper = Object.assign({}, e.styles.popper, Nt(Object.assign({}, c, {
                    offsets: e.modifiersData.popperOffsets,
                    position: e.options.strategy,
                    adaptive: r,
                    roundOffsets: l
                })))), null != e.modifiersData.arrow && (e.styles.arrow = Object.assign({}, e.styles.arrow, Nt(Object.assign({}, c, {
                    offsets: e.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: l
                })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
                    "data-popper-placement": e.placement
                })
            },
            data: {}
        },
        Pt = {
            passive: !0
        },
        It = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function () {},
            effect: function (t) {
                var e = t.state,
                    i = t.instance,
                    n = t.options,
                    s = n.scroll,
                    o = void 0 === s || s,
                    r = n.resize,
                    a = void 0 === r || r,
                    l = lt(e.elements.popper),
                    c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
                return o && c.forEach((function (t) {
                        t.addEventListener("scroll", i.update, Pt)
                    })), a && l.addEventListener("resize", i.update, Pt),
                    function () {
                        o && c.forEach((function (t) {
                            t.removeEventListener("scroll", i.update, Pt)
                        })), a && l.removeEventListener("resize", i.update, Pt)
                    }
            },
            data: {}
        },
        Mt = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };

    function Ht(t) {
        return t.replace(/left|right|bottom|top/g, (function (t) {
            return Mt[t]
        }))
    }
    var Rt = {
        start: "end",
        end: "start"
    };

    function Bt(t) {
        return t.replace(/start|end/g, (function (t) {
            return Rt[t]
        }))
    }

    function Wt(t) {
        var e = lt(t);
        return {
            scrollLeft: e.pageXOffset,
            scrollTop: e.pageYOffset
        }
    }

    function zt(t) {
        return pt(vt(t)).left + Wt(t).scrollLeft
    }

    function Ut(t) {
        var e = _t(t),
            i = e.overflow,
            n = e.overflowX,
            s = e.overflowY;
        return /auto|scroll|overlay|hidden/.test(i + s + n)
    }

    function $t(t, e) {
        var i;
        void 0 === e && (e = []);
        var n = function t(e) {
                return ["html", "body", "#document"].indexOf(at(e)) >= 0 ? e.ownerDocument.body : dt(e) && Ut(e) ? e : t(yt(e))
            }(t),
            s = n === (null == (i = t.ownerDocument) ? void 0 : i.body),
            o = lt(n),
            r = s ? [o].concat(o.visualViewport || [], Ut(n) ? n : []) : n,
            a = e.concat(r);
        return s ? a : a.concat($t(yt(r)))
    }

    function Ft(t) {
        return Object.assign({}, t, {
            left: t.x,
            top: t.y,
            right: t.x + t.width,
            bottom: t.y + t.height
        })
    }

    function Kt(t, e) {
        return "viewport" === e ? Ft(function (t) {
            var e = lt(t),
                i = vt(t),
                n = e.visualViewport,
                s = i.clientWidth,
                o = i.clientHeight,
                r = 0,
                a = 0;
            return n && (s = n.width, o = n.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (r = n.offsetLeft, a = n.offsetTop)), {
                width: s,
                height: o,
                x: r + zt(t),
                y: a
            }
        }(t)) : dt(e) ? function (t) {
            var e = pt(t);
            return e.top = e.top + t.clientTop, e.left = e.left + t.clientLeft, e.bottom = e.top + t.clientHeight, e.right = e.left + t.clientWidth, e.width = t.clientWidth, e.height = t.clientHeight, e.x = e.left, e.y = e.top, e
        }(e) : Ft(function (t) {
            var e, i = vt(t),
                n = Wt(t),
                s = null == (e = t.ownerDocument) ? void 0 : e.body,
                o = At(i.scrollWidth, i.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0),
                r = At(i.scrollHeight, i.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0),
                a = -n.scrollLeft + zt(t),
                l = -n.scrollTop;
            return "rtl" === _t(s || i).direction && (a += At(i.clientWidth, s ? s.clientWidth : 0) - o), {
                width: o,
                height: r,
                x: a,
                y: l
            }
        }(vt(t)))
    }

    function Yt(t) {
        return t.split("-")[1]
    }

    function qt(t) {
        var e, i = t.reference,
            n = t.element,
            s = t.placement,
            o = s ? ft(s) : null,
            r = s ? Yt(s) : null,
            a = i.x + i.width / 2 - n.width / 2,
            l = i.y + i.height / 2 - n.height / 2;
        switch (o) {
            case J:
                e = {
                    x: a,
                    y: i.y - n.height
                };
                break;
            case tt:
                e = {
                    x: a,
                    y: i.y + i.height
                };
                break;
            case et:
                e = {
                    x: i.x + i.width,
                    y: l
                };
                break;
            case it:
                e = {
                    x: i.x - n.width,
                    y: l
                };
                break;
            default:
                e = {
                    x: i.x,
                    y: i.y
                }
        }
        var c = o ? Tt(o) : null;
        if (null != c) {
            var d = "y" === c ? "height" : "width";
            switch (r) {
                case "start":
                    e[c] = e[c] - (i[d] / 2 - n[d] / 2);
                    break;
                case "end":
                    e[c] = e[c] + (i[d] / 2 - n[d] / 2)
            }
        }
        return e
    }

    function Vt(t, e) {
        void 0 === e && (e = {});
        var i = e,
            n = i.placement,
            s = void 0 === n ? t.placement : n,
            o = i.boundary,
            r = void 0 === o ? "clippingParents" : o,
            a = i.rootBoundary,
            l = void 0 === a ? "viewport" : a,
            c = i.elementContext,
            d = void 0 === c ? "popper" : c,
            h = i.altBoundary,
            u = void 0 !== h && h,
            f = i.padding,
            p = void 0 === f ? 0 : f,
            g = Dt("number" != typeof p ? p : xt(p, nt)),
            m = "popper" === d ? "reference" : "popper",
            _ = t.elements.reference,
            b = t.rects.popper,
            v = t.elements[u ? m : d],
            y = function (t, e, i) {
                var n = "clippingParents" === e ? function (t) {
                        var e = $t(yt(t)),
                            i = ["absolute", "fixed"].indexOf(_t(t).position) >= 0 && dt(t) ? Et(t) : t;
                        return ct(i) ? e.filter((function (t) {
                            return ct(t) && mt(t, i) && "body" !== at(t)
                        })) : []
                    }(t) : [].concat(e),
                    s = [].concat(n, [i]),
                    o = s[0],
                    r = s.reduce((function (e, i) {
                        var n = Kt(t, i);
                        return e.top = At(n.top, e.top), e.right = Lt(n.right, e.right), e.bottom = Lt(n.bottom, e.bottom), e.left = At(n.left, e.left), e
                    }), Kt(t, o));
                return r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r
            }(ct(v) ? v : v.contextElement || vt(t.elements.popper), r, l),
            w = pt(_),
            E = qt({
                reference: w,
                element: b,
                strategy: "absolute",
                placement: s
            }),
            T = Ft(Object.assign({}, b, E)),
            A = "popper" === d ? T : w,
            L = {
                top: y.top - A.top + g.top,
                bottom: A.bottom - y.bottom + g.bottom,
                left: y.left - A.left + g.left,
                right: A.right - y.right + g.right
            },
            O = t.modifiersData.offset;
        if ("popper" === d && O) {
            var k = O[s];
            Object.keys(L).forEach((function (t) {
                var e = [et, tt].indexOf(t) >= 0 ? 1 : -1,
                    i = [J, tt].indexOf(t) >= 0 ? "y" : "x";
                L[t] += k[i] * e
            }))
        }
        return L
    }

    function Xt(t, e) {
        void 0 === e && (e = {});
        var i = e,
            n = i.placement,
            s = i.boundary,
            o = i.rootBoundary,
            r = i.padding,
            a = i.flipVariations,
            l = i.allowedAutoPlacements,
            c = void 0 === l ? ot : l,
            d = Yt(n),
            h = d ? a ? st : st.filter((function (t) {
                return Yt(t) === d
            })) : nt,
            u = h.filter((function (t) {
                return c.indexOf(t) >= 0
            }));
        0 === u.length && (u = h);
        var f = u.reduce((function (e, i) {
            return e[i] = Vt(t, {
                placement: i,
                boundary: s,
                rootBoundary: o,
                padding: r
            })[ft(i)], e
        }), {});
        return Object.keys(f).sort((function (t, e) {
            return f[t] - f[e]
        }))
    }
    var Qt = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function (t) {
            var e = t.state,
                i = t.options,
                n = t.name;
            if (!e.modifiersData[n]._skip) {
                for (var s = i.mainAxis, o = void 0 === s || s, r = i.altAxis, a = void 0 === r || r, l = i.fallbackPlacements, c = i.padding, d = i.boundary, h = i.rootBoundary, u = i.altBoundary, f = i.flipVariations, p = void 0 === f || f, g = i.allowedAutoPlacements, m = e.options.placement, _ = ft(m), b = l || (_ !== m && p ? function (t) {
                        if ("auto" === ft(t)) return [];
                        var e = Ht(t);
                        return [Bt(t), e, Bt(e)]
                    }(m) : [Ht(m)]), v = [m].concat(b).reduce((function (t, i) {
                        return t.concat("auto" === ft(i) ? Xt(e, {
                            placement: i,
                            boundary: d,
                            rootBoundary: h,
                            padding: c,
                            flipVariations: p,
                            allowedAutoPlacements: g
                        }) : i)
                    }), []), y = e.rects.reference, w = e.rects.popper, E = new Map, T = !0, A = v[0], L = 0; L < v.length; L++) {
                    var O = v[L],
                        k = ft(O),
                        D = "start" === Yt(O),
                        x = [J, tt].indexOf(k) >= 0,
                        C = x ? "width" : "height",
                        S = Vt(e, {
                            placement: O,
                            boundary: d,
                            rootBoundary: h,
                            altBoundary: u,
                            padding: c
                        }),
                        N = x ? D ? et : it : D ? tt : J;
                    y[C] > w[C] && (N = Ht(N));
                    var j = Ht(N),
                        P = [];
                    if (o && P.push(S[k] <= 0), a && P.push(S[N] <= 0, S[j] <= 0), P.every((function (t) {
                            return t
                        }))) {
                        A = O, T = !1;
                        break
                    }
                    E.set(O, P)
                }
                if (T)
                    for (var I = function (t) {
                            var e = v.find((function (e) {
                                var i = E.get(e);
                                if (i) return i.slice(0, t).every((function (t) {
                                    return t
                                }))
                            }));
                            if (e) return A = e, "break"
                        }, M = p ? 3 : 1; M > 0 && "break" !== I(M); M--);
                e.placement !== A && (e.modifiersData[n]._skip = !0, e.placement = A, e.reset = !0)
            }
        },
        requiresIfExists: ["offset"],
        data: {
            _skip: !1
        }
    };

    function Gt(t, e, i) {
        return void 0 === i && (i = {
            x: 0,
            y: 0
        }), {
            top: t.top - e.height - i.y,
            right: t.right - e.width + i.x,
            bottom: t.bottom - e.height + i.y,
            left: t.left - e.width - i.x
        }
    }

    function Zt(t) {
        return [J, et, tt, it].some((function (e) {
            return t[e] >= 0
        }))
    }
    var Jt = {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function (t) {
                var e = t.state,
                    i = t.name,
                    n = e.rects.reference,
                    s = e.rects.popper,
                    o = e.modifiersData.preventOverflow,
                    r = Vt(e, {
                        elementContext: "reference"
                    }),
                    a = Vt(e, {
                        altBoundary: !0
                    }),
                    l = Gt(r, n),
                    c = Gt(a, s, o),
                    d = Zt(l),
                    h = Zt(c);
                e.modifiersData[i] = {
                    referenceClippingOffsets: l,
                    popperEscapeOffsets: c,
                    isReferenceHidden: d,
                    hasPopperEscaped: h
                }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
                    "data-popper-reference-hidden": d,
                    "data-popper-escaped": h
                })
            }
        },
        te = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function (t) {
                var e = t.state,
                    i = t.options,
                    n = t.name,
                    s = i.offset,
                    o = void 0 === s ? [0, 0] : s,
                    r = ot.reduce((function (t, i) {
                        return t[i] = function (t, e, i) {
                            var n = ft(t),
                                s = [it, J].indexOf(n) >= 0 ? -1 : 1,
                                o = "function" == typeof i ? i(Object.assign({}, e, {
                                    placement: t
                                })) : i,
                                r = o[0],
                                a = o[1];
                            return r = r || 0, a = (a || 0) * s, [it, et].indexOf(n) >= 0 ? {
                                x: a,
                                y: r
                            } : {
                                x: r,
                                y: a
                            }
                        }(i, e.rects, o), t
                    }), {}),
                    a = r[e.placement],
                    l = a.x,
                    c = a.y;
                null != e.modifiersData.popperOffsets && (e.modifiersData.popperOffsets.x += l, e.modifiersData.popperOffsets.y += c), e.modifiersData[n] = r
            }
        },
        ee = {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function (t) {
                var e = t.state,
                    i = t.name;
                e.modifiersData[i] = qt({
                    reference: e.rects.reference,
                    element: e.rects.popper,
                    strategy: "absolute",
                    placement: e.placement
                })
            },
            data: {}
        },
        ie = {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function (t) {
                var e = t.state,
                    i = t.options,
                    n = t.name,
                    s = i.mainAxis,
                    o = void 0 === s || s,
                    r = i.altAxis,
                    a = void 0 !== r && r,
                    l = i.boundary,
                    c = i.rootBoundary,
                    d = i.altBoundary,
                    h = i.padding,
                    u = i.tether,
                    f = void 0 === u || u,
                    p = i.tetherOffset,
                    g = void 0 === p ? 0 : p,
                    m = Vt(e, {
                        boundary: l,
                        rootBoundary: c,
                        padding: h,
                        altBoundary: d
                    }),
                    _ = ft(e.placement),
                    b = Yt(e.placement),
                    v = !b,
                    y = Tt(_),
                    w = "x" === y ? "y" : "x",
                    E = e.modifiersData.popperOffsets,
                    T = e.rects.reference,
                    A = e.rects.popper,
                    L = "function" == typeof g ? g(Object.assign({}, e.rects, {
                        placement: e.placement
                    })) : g,
                    O = {
                        x: 0,
                        y: 0
                    };
                if (E) {
                    if (o || a) {
                        var k = "y" === y ? J : it,
                            D = "y" === y ? tt : et,
                            x = "y" === y ? "height" : "width",
                            C = E[y],
                            S = E[y] + m[k],
                            N = E[y] - m[D],
                            j = f ? -A[x] / 2 : 0,
                            P = "start" === b ? T[x] : A[x],
                            I = "start" === b ? -A[x] : -T[x],
                            M = e.elements.arrow,
                            H = f && M ? gt(M) : {
                                width: 0,
                                height: 0
                            },
                            R = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0
                            },
                            B = R[k],
                            W = R[D],
                            z = kt(0, T[x], H[x]),
                            U = v ? T[x] / 2 - j - z - B - L : P - z - B - L,
                            $ = v ? -T[x] / 2 + j + z + W + L : I + z + W + L,
                            F = e.elements.arrow && Et(e.elements.arrow),
                            K = F ? "y" === y ? F.clientTop || 0 : F.clientLeft || 0 : 0,
                            Y = e.modifiersData.offset ? e.modifiersData.offset[e.placement][y] : 0,
                            q = E[y] + U - Y - K,
                            V = E[y] + $ - Y;
                        if (o) {
                            var X = kt(f ? Lt(S, q) : S, C, f ? At(N, V) : N);
                            E[y] = X, O[y] = X - C
                        }
                        if (a) {
                            var Q = "x" === y ? J : it,
                                G = "x" === y ? tt : et,
                                Z = E[w],
                                nt = Z + m[Q],
                                st = Z - m[G],
                                ot = kt(f ? Lt(nt, q) : nt, Z, f ? At(st, V) : st);
                            E[w] = ot, O[w] = ot - Z
                        }
                    }
                    e.modifiersData[n] = O
                }
            },
            requiresIfExists: ["offset"]
        };

    function ne(t, e, i) {
        void 0 === i && (i = !1);
        var n, s, o = vt(e),
            r = pt(t),
            a = dt(e),
            l = {
                scrollLeft: 0,
                scrollTop: 0
            },
            c = {
                x: 0,
                y: 0
            };
        return (a || !a && !i) && (("body" !== at(e) || Ut(o)) && (l = (n = e) !== lt(n) && dt(n) ? {
            scrollLeft: (s = n).scrollLeft,
            scrollTop: s.scrollTop
        } : Wt(n)), dt(e) ? ((c = pt(e)).x += e.clientLeft, c.y += e.clientTop) : o && (c.x = zt(o))), {
            x: r.left + l.scrollLeft - c.x,
            y: r.top + l.scrollTop - c.y,
            width: r.width,
            height: r.height
        }
    }
    var se = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
    };

    function oe() {
        for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
        return !e.some((function (t) {
            return !(t && "function" == typeof t.getBoundingClientRect)
        }))
    }

    function re(t) {
        void 0 === t && (t = {});
        var e = t,
            i = e.defaultModifiers,
            n = void 0 === i ? [] : i,
            s = e.defaultOptions,
            o = void 0 === s ? se : s;
        return function (t, e, i) {
            void 0 === i && (i = o);
            var s, r, a = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, se, o),
                    modifiersData: {},
                    elements: {
                        reference: t,
                        popper: e
                    },
                    attributes: {},
                    styles: {}
                },
                l = [],
                c = !1,
                d = {
                    state: a,
                    setOptions: function (i) {
                        h(), a.options = Object.assign({}, o, a.options, i), a.scrollParents = {
                            reference: ct(t) ? $t(t) : t.contextElement ? $t(t.contextElement) : [],
                            popper: $t(e)
                        };
                        var s, r, c = function (t) {
                            var e = function (t) {
                                var e = new Map,
                                    i = new Set,
                                    n = [];
                                return t.forEach((function (t) {
                                    e.set(t.name, t)
                                })), t.forEach((function (t) {
                                    i.has(t.name) || function t(s) {
                                        i.add(s.name), [].concat(s.requires || [], s.requiresIfExists || []).forEach((function (n) {
                                            if (!i.has(n)) {
                                                var s = e.get(n);
                                                s && t(s)
                                            }
                                        })), n.push(s)
                                    }(t)
                                })), n
                            }(t);
                            return rt.reduce((function (t, i) {
                                return t.concat(e.filter((function (t) {
                                    return t.phase === i
                                })))
                            }), [])
                        }((s = [].concat(n, a.options.modifiers), r = s.reduce((function (t, e) {
                            var i = t[e.name];
                            return t[e.name] = i ? Object.assign({}, i, e, {
                                options: Object.assign({}, i.options, e.options),
                                data: Object.assign({}, i.data, e.data)
                            }) : e, t
                        }), {}), Object.keys(r).map((function (t) {
                            return r[t]
                        }))));
                        return a.orderedModifiers = c.filter((function (t) {
                            return t.enabled
                        })), a.orderedModifiers.forEach((function (t) {
                            var e = t.name,
                                i = t.options,
                                n = void 0 === i ? {} : i,
                                s = t.effect;
                            if ("function" == typeof s) {
                                var o = s({
                                    state: a,
                                    name: e,
                                    instance: d,
                                    options: n
                                });
                                l.push(o || function () {})
                            }
                        })), d.update()
                    },
                    forceUpdate: function () {
                        if (!c) {
                            var t = a.elements,
                                e = t.reference,
                                i = t.popper;
                            if (oe(e, i)) {
                                a.rects = {
                                    reference: ne(e, Et(i), "fixed" === a.options.strategy),
                                    popper: gt(i)
                                }, a.reset = !1, a.placement = a.options.placement, a.orderedModifiers.forEach((function (t) {
                                    return a.modifiersData[t.name] = Object.assign({}, t.data)
                                }));
                                for (var n = 0; n < a.orderedModifiers.length; n++)
                                    if (!0 !== a.reset) {
                                        var s = a.orderedModifiers[n],
                                            o = s.fn,
                                            r = s.options,
                                            l = void 0 === r ? {} : r,
                                            h = s.name;
                                        "function" == typeof o && (a = o({
                                            state: a,
                                            options: l,
                                            name: h,
                                            instance: d
                                        }) || a)
                                    } else a.reset = !1, n = -1
                            }
                        }
                    },
                    update: (s = function () {
                        return new Promise((function (t) {
                            d.forceUpdate(), t(a)
                        }))
                    }, function () {
                        return r || (r = new Promise((function (t) {
                            Promise.resolve().then((function () {
                                r = void 0, t(s())
                            }))
                        }))), r
                    }),
                    destroy: function () {
                        h(), c = !0
                    }
                };
            if (!oe(t, e)) return d;

            function h() {
                l.forEach((function (t) {
                    return t()
                })), l = []
            }
            return d.setOptions(i).then((function (t) {
                !c && i.onFirstUpdate && i.onFirstUpdate(t)
            })), d
        }
    }
    var ae = re(),
        le = re({
            defaultModifiers: [It, ee, jt, ut]
        }),
        ce = re({
            defaultModifiers: [It, ee, jt, ut, te, Qt, ie, Ct, Jt]
        }),
        de = Object.freeze({
            __proto__: null,
            popperGenerator: re,
            detectOverflow: Vt,
            createPopperBase: ae,
            createPopper: ce,
            createPopperLite: le,
            top: J,
            bottom: tt,
            right: et,
            left: it,
            auto: "auto",
            basePlacements: nt,
            start: "start",
            end: "end",
            clippingParents: "clippingParents",
            viewport: "viewport",
            popper: "popper",
            reference: "reference",
            variationPlacements: st,
            placements: ot,
            beforeRead: "beforeRead",
            read: "read",
            afterRead: "afterRead",
            beforeMain: "beforeMain",
            main: "main",
            afterMain: "afterMain",
            beforeWrite: "beforeWrite",
            write: "write",
            afterWrite: "afterWrite",
            modifierPhases: rt,
            applyStyles: ut,
            arrow: Ct,
            computeStyles: jt,
            eventListeners: It,
            flip: Qt,
            hide: Jt,
            offset: te,
            popperOffsets: ee,
            preventOverflow: ie
        });
    const he = new RegExp("ArrowUp|ArrowDown|Escape"),
        ue = g() ? "top-end" : "top-start",
        fe = g() ? "top-start" : "top-end",
        pe = g() ? "bottom-end" : "bottom-start",
        ge = g() ? "bottom-start" : "bottom-end",
        me = g() ? "left-start" : "right-start",
        _e = g() ? "right-start" : "left-start",
        be = {
            offset: [0, 2],
            boundary: "clippingParents",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null,
            autoClose: !0
        },
        ve = {
            offset: "(array|string|function)",
            boundary: "(string|element)",
            reference: "(string|element|object)",
            display: "string",
            popperConfig: "(null|object|function)",
            autoClose: "(boolean|string)"
        };
    class ye extends M {
        constructor(t, e) {
            super(t), this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
        }
        static get Default() {
            return be
        }
        static get DefaultType() {
            return ve
        }
        static get DATA_KEY() {
            return "bs.dropdown"
        }
        toggle() {
            d(this._element) || (this._element.classList.contains("show") ? this.hide() : this.show())
        }
        show() {
            if (d(this._element) || this._menu.classList.contains("show")) return;
            const t = ye.getParentFromElement(this._element),
                e = {
                    relatedTarget: this._element
                };
            if (!I.trigger(this._element, "show.bs.dropdown", e).defaultPrevented) {
                if (this._inNavbar) z.setDataAttribute(this._menu, "popper", "none");
                else {
                    if (void 0 === de) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
                    let e = this._element;
                    "parent" === this._config.reference ? e = t : r(this._config.reference) ? (e = this._config.reference, void 0 !== this._config.reference.jquery && (e = this._config.reference[0])) : "object" == typeof this._config.reference && (e = this._config.reference);
                    const i = this._getPopperConfig(),
                        n = i.modifiers.find(t => "applyStyles" === t.name && !1 === t.enabled);
                    this._popper = ce(e, this._menu, i), n && z.setDataAttribute(this._menu, "popper", "static")
                }
                "ontouchstart" in document.documentElement && !t.closest(".navbar-nav") && [].concat(...document.body.children).forEach(t => I.on(t, "mouseover", u)), this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.toggle("show"), this._element.classList.toggle("show"), I.trigger(this._element, "shown.bs.dropdown", e)
            }
        }
        hide() {
            if (d(this._element) || !this._menu.classList.contains("show")) return;
            const t = {
                relatedTarget: this._element
            };
            this._completeHide(t)
        }
        dispose() {
            this._menu = null, this._popper && (this._popper.destroy(), this._popper = null), super.dispose()
        }
        update() {
            this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
        }
        _addEventListeners() {
            I.on(this._element, "click.bs.dropdown", t => {
                t.preventDefault(), this.toggle()
            })
        }
        _completeHide(t) {
            I.trigger(this._element, "hide.bs.dropdown", t).defaultPrevented || ("ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach(t => I.off(t, "mouseover", u)), this._popper && this._popper.destroy(), this._menu.classList.remove("show"), this._element.classList.remove("show"), this._element.setAttribute("aria-expanded", "false"), z.removeDataAttribute(this._menu, "popper"), I.trigger(this._element, "hidden.bs.dropdown", t))
        }
        _getConfig(t) {
            if (t = {
                    ...this.constructor.Default,
                    ...z.getDataAttributes(this._element),
                    ...t
                }, l("dropdown", t, this.constructor.DefaultType), "object" == typeof t.reference && !r(t.reference) && "function" != typeof t.reference.getBoundingClientRect) throw new TypeError("dropdown".toUpperCase() + ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.');
            return t
        }
        _getMenuElement() {
            return U.next(this._element, ".dropdown-menu")[0]
        }
        _getPlacement() {
            const t = this._element.parentNode;
            if (t.classList.contains("dropend")) return me;
            if (t.classList.contains("dropstart")) return _e;
            const e = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
            return t.classList.contains("dropup") ? e ? fe : ue : e ? ge : pe
        }
        _detectNavbar() {
            return null !== this._element.closest(".navbar")
        }
        _getOffset() {
            const {
                offset: t
            } = this._config;
            return "string" == typeof t ? t.split(",").map(t => Number.parseInt(t, 10)) : "function" == typeof t ? e => t(e, this._element) : t
        }
        _getPopperConfig() {
            const t = {
                placement: this._getPlacement(),
                modifiers: [{
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }]
            };
            return "static" === this._config.display && (t.modifiers = [{
                name: "applyStyles",
                enabled: !1
            }]), {
                ...t,
                ..."function" == typeof this._config.popperConfig ? this._config.popperConfig(t) : this._config.popperConfig
            }
        }
        _selectMenuItem(t) {
            const e = U.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter(c);
            if (!e.length) return;
            let i = e.indexOf(t.target);
            "ArrowUp" === t.key && i > 0 && i--, "ArrowDown" === t.key && i < e.length - 1 && i++, i = -1 === i ? 0 : i, e[i].focus()
        }
        static dropdownInterface(t, e) {
            let i = v.get(t, "bs.dropdown");
            if (i || (i = new ye(t, "object" == typeof e ? e : null)), "string" == typeof e) {
                if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
                i[e]()
            }
        }
        static jQueryInterface(t) {
            return this.each((function () {
                ye.dropdownInterface(this, t)
            }))
        }
        static clearMenus(t) {
            if (t) {
                if (2 === t.button || "keyup" === t.type && "Tab" !== t.key) return;
                if (/input|select|option|textarea|form/i.test(t.target.tagName)) return
            }
            const e = U.find('[data-bs-toggle="dropdown"]');
            for (let i = 0, n = e.length; i < n; i++) {
                const n = v.get(e[i], "bs.dropdown");
                if (!n || !1 === n._config.autoClose) continue;
                if (!n._element.classList.contains("show")) continue;
                const s = {
                    relatedTarget: n._element
                };
                if (t) {
                    const e = t.composedPath(),
                        i = e.includes(n._menu);
                    if (e.includes(n._element) || "inside" === n._config.autoClose && !i || "outside" === n._config.autoClose && i) continue;
                    if ("keyup" === t.type && "Tab" === t.key && n._menu.contains(t.target)) continue;
                    "click" === t.type && (s.clickEvent = t)
                }
                n._completeHide(s)
            }
        }
        static getParentFromElement(t) {
            return n(t) || t.parentNode
        }
        static dataApiKeydownHandler(t) {
            if (/input|textarea/i.test(t.target.tagName) ? "Space" === t.key || "Escape" !== t.key && ("ArrowDown" !== t.key && "ArrowUp" !== t.key || t.target.closest(".dropdown-menu")) : !he.test(t.key)) return;
            const e = this.classList.contains("show");
            if (!e && "Escape" === t.key) return;
            if (t.preventDefault(), t.stopPropagation(), d(this)) return;
            const i = () => this.matches('[data-bs-toggle="dropdown"]') ? this : U.prev(this, '[data-bs-toggle="dropdown"]')[0];
            if ("Escape" === t.key) return i().focus(), void ye.clearMenus();
            e || "ArrowUp" !== t.key && "ArrowDown" !== t.key ? e && "Space" !== t.key ? ye.getInstance(i())._selectMenuItem(t) : ye.clearMenus() : i().click()
        }
    }
    I.on(document, "keydown.bs.dropdown.data-api", '[data-bs-toggle="dropdown"]', ye.dataApiKeydownHandler), I.on(document, "keydown.bs.dropdown.data-api", ".dropdown-menu", ye.dataApiKeydownHandler), I.on(document, "click.bs.dropdown.data-api", ye.clearMenus), I.on(document, "keyup.bs.dropdown.data-api", ye.clearMenus), I.on(document, "click.bs.dropdown.data-api", '[data-bs-toggle="dropdown"]', (function (t) {
        t.preventDefault(), ye.dropdownInterface(this)
    })), m("dropdown", ye);
    const we = () => {
            const t = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - t)
        },
        Ee = (t = we()) => {
            Te(), Ae("body", "paddingRight", e => e + t), Ae(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", "paddingRight", e => e + t), Ae(".sticky-top", "marginRight", e => e - t)
        },
        Te = () => {
            const t = document.body.style.overflow;
            t && z.setDataAttribute(document.body, "overflow", t), document.body.style.overflow = "hidden"
        },
        Ae = (t, e, i) => {
            const n = we();
            U.find(t).forEach(t => {
                if (t !== document.body && window.innerWidth > t.clientWidth + n) return;
                const s = t.style[e],
                    o = window.getComputedStyle(t)[e];
                z.setDataAttribute(t, e, s), t.style[e] = i(Number.parseFloat(o)) + "px"
            })
        },
        Le = () => {
            Oe("body", "overflow"), Oe("body", "paddingRight"), Oe(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", "paddingRight"), Oe(".sticky-top", "marginRight")
        },
        Oe = (t, e) => {
            U.find(t).forEach(t => {
                const i = z.getDataAttribute(t, e);
                void 0 === i ? t.style.removeProperty(e) : (z.removeDataAttribute(t, e), t.style[e] = i)
            })
        },
        ke = {
            isVisible: !0,
            isAnimated: !1,
            rootElement: document.body,
            clickCallback: null
        },
        De = {
            isVisible: "boolean",
            isAnimated: "boolean",
            rootElement: "element",
            clickCallback: "(function|null)"
        };
    class xe {
        constructor(t) {
            this._config = this._getConfig(t), this._isAppended = !1, this._element = null
        }
        show(t) {
            this._config.isVisible ? (this._append(), this._config.isAnimated && f(this._getElement()), this._getElement().classList.add("show"), this._emulateAnimation(() => {
                _(t)
            })) : _(t)
        }
        hide(t) {
            this._config.isVisible ? (this._getElement().classList.remove("show"), this._emulateAnimation(() => {
                this.dispose(), _(t)
            })) : _(t)
        }
        _getElement() {
            if (!this._element) {
                const t = document.createElement("div");
                t.className = "modal-backdrop", this._config.isAnimated && t.classList.add("fade"), this._element = t
            }
            return this._element
        }
        _getConfig(t) {
            return t = {
                ...ke,
                ..."object" == typeof t ? t : {}
            }, l("backdrop", t, De), t
        }
        _append() {
            this._isAppended || (this._config.rootElement.appendChild(this._getElement()), I.on(this._getElement(), "mousedown.bs.backdrop", () => {
                _(this._config.clickCallback)
            }), this._isAppended = !0)
        }
        dispose() {
            this._isAppended && (I.off(this._element, "mousedown.bs.backdrop"), this._getElement().parentNode.removeChild(this._element), this._isAppended = !1)
        }
        _emulateAnimation(t) {
            if (!this._config.isAnimated) return void _(t);
            const e = s(this._getElement());
            I.one(this._getElement(), "transitionend", () => _(t)), a(this._getElement(), e)
        }
    }
    const Ce = {
            backdrop: !0,
            keyboard: !0,
            focus: !0
        },
        Se = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean"
        };
    class Ne extends M {
        constructor(t, e) {
            super(t), this._config = this._getConfig(e), this._dialog = U.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._isShown = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1
        }
        static get Default() {
            return Ce
        }
        static get DATA_KEY() {
            return "bs.modal"
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t)
        }
        show(t) {
            if (this._isShown || this._isTransitioning) return;
            this._isAnimated() && (this._isTransitioning = !0);
            const e = I.trigger(this._element, "show.bs.modal", {
                relatedTarget: t
            });
            this._isShown || e.defaultPrevented || (this._isShown = !0, Ee(), document.body.classList.add("modal-open"), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), I.on(this._element, "click.dismiss.bs.modal", '[data-bs-dismiss="modal"]', t => this.hide(t)), I.on(this._dialog, "mousedown.dismiss.bs.modal", () => {
                I.one(this._element, "mouseup.dismiss.bs.modal", t => {
                    t.target === this._element && (this._ignoreBackdropClick = !0)
                })
            }), this._showBackdrop(() => this._showElement(t)))
        }
        hide(t) {
            if (t && t.preventDefault(), !this._isShown || this._isTransitioning) return;
            if (I.trigger(this._element, "hide.bs.modal").defaultPrevented) return;
            this._isShown = !1;
            const e = this._isAnimated();
            if (e && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), I.off(document, "focusin.bs.modal"), this._element.classList.remove("show"), I.off(this._element, "click.dismiss.bs.modal"), I.off(this._dialog, "mousedown.dismiss.bs.modal"), e) {
                const t = s(this._element);
                I.one(this._element, "transitionend", t => this._hideModal(t)), a(this._element, t)
            } else this._hideModal()
        }
        dispose() {
            [window, this._dialog].forEach(t => I.off(t, ".bs.modal")), super.dispose(), I.off(document, "focusin.bs.modal"), this._config = null, this._dialog = null, this._backdrop.dispose(), this._backdrop = null, this._isShown = null, this._ignoreBackdropClick = null, this._isTransitioning = null
        }
        handleUpdate() {
            this._adjustDialog()
        }
        _initializeBackDrop() {
            return new xe({
                isVisible: Boolean(this._config.backdrop),
                isAnimated: this._isAnimated()
            })
        }
        _getConfig(t) {
            return t = {
                ...Ce,
                ...z.getDataAttributes(this._element),
                ...t
            }, l("modal", t, Se), t
        }
        _showElement(t) {
            const e = this._isAnimated(),
                i = U.findOne(".modal-body", this._dialog);
            this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0, i && (i.scrollTop = 0), e && f(this._element), this._element.classList.add("show"), this._config.focus && this._enforceFocus();
            const n = () => {
                this._config.focus && this._element.focus(), this._isTransitioning = !1, I.trigger(this._element, "shown.bs.modal", {
                    relatedTarget: t
                })
            };
            if (e) {
                const t = s(this._dialog);
                I.one(this._dialog, "transitionend", n), a(this._dialog, t)
            } else n()
        }
        _enforceFocus() {
            I.off(document, "focusin.bs.modal"), I.on(document, "focusin.bs.modal", t => {
                document === t.target || this._element === t.target || this._element.contains(t.target) || this._element.focus()
            })
        }
        _setEscapeEvent() {
            this._isShown ? I.on(this._element, "keydown.dismiss.bs.modal", t => {
                this._config.keyboard && "Escape" === t.key ? (t.preventDefault(), this.hide()) : this._config.keyboard || "Escape" !== t.key || this._triggerBackdropTransition()
            }) : I.off(this._element, "keydown.dismiss.bs.modal")
        }
        _setResizeEvent() {
            this._isShown ? I.on(window, "resize.bs.modal", () => this._adjustDialog()) : I.off(window, "resize.bs.modal")
        }
        _hideModal() {
            this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(() => {
                document.body.classList.remove("modal-open"), this._resetAdjustments(), Le(), I.trigger(this._element, "hidden.bs.modal")
            })
        }
        _showBackdrop(t) {
            I.on(this._element, "click.dismiss.bs.modal", t => {
                this._ignoreBackdropClick ? this._ignoreBackdropClick = !1 : t.target === t.currentTarget && (!0 === this._config.backdrop ? this.hide() : "static" === this._config.backdrop && this._triggerBackdropTransition())
            }), this._backdrop.show(t)
        }
        _isAnimated() {
            return this._element.classList.contains("fade")
        }
        _triggerBackdropTransition() {
            if (I.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) return;
            const t = this._element.scrollHeight > document.documentElement.clientHeight;
            t || (this._element.style.overflowY = "hidden"), this._element.classList.add("modal-static");
            const e = s(this._dialog);
            I.off(this._element, "transitionend"), I.one(this._element, "transitionend", () => {
                this._element.classList.remove("modal-static"), t || (I.one(this._element, "transitionend", () => {
                    this._element.style.overflowY = ""
                }), a(this._element, e))
            }), a(this._element, e), this._element.focus()
        }
        _adjustDialog() {
            const t = this._element.scrollHeight > document.documentElement.clientHeight,
                e = we(),
                i = e > 0;
            (!i && t && !g() || i && !t && g()) && (this._element.style.paddingLeft = e + "px"), (i && !t && !g() || !i && t && g()) && (this._element.style.paddingRight = e + "px")
        }
        _resetAdjustments() {
            this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
        }
        static jQueryInterface(t, e) {
            return this.each((function () {
                const i = Ne.getInstance(this) || new Ne(this, "object" == typeof t ? t : {});
                if ("string" == typeof t) {
                    if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                    i[t](e)
                }
            }))
        }
    }
    I.on(document, "click.bs.modal.data-api", '[data-bs-toggle="modal"]', (function (t) {
        const e = n(this);
        ["A", "AREA"].includes(this.tagName) && t.preventDefault(), I.one(e, "show.bs.modal", t => {
            t.defaultPrevented || I.one(e, "hidden.bs.modal", () => {
                c(this) && this.focus()
            })
        }), (Ne.getInstance(e) || new Ne(e)).toggle(this)
    })), m("modal", Ne);
    const je = {
            backdrop: !0,
            keyboard: !0,
            scroll: !1
        },
        Pe = {
            backdrop: "boolean",
            keyboard: "boolean",
            scroll: "boolean"
        };
    class Ie extends M {
        constructor(t, e) {
            super(t), this._config = this._getConfig(e), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._addEventListeners()
        }
        static get Default() {
            return je
        }
        static get DATA_KEY() {
            return "bs.offcanvas"
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t)
        }
        show(t) {
            if (this._isShown) return;
            if (I.trigger(this._element, "show.bs.offcanvas", {
                    relatedTarget: t
                }).defaultPrevented) return;
            this._isShown = !0, this._element.style.visibility = "visible", this._backdrop.show(), this._config.scroll || (Ee(), this._enforceFocusOnElement(this._element)), this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add("show");
            const e = s(this._element);
            I.one(this._element, "transitionend", () => {
                I.trigger(this._element, "shown.bs.offcanvas", {
                    relatedTarget: t
                })
            }), a(this._element, e)
        }
        hide() {
            if (!this._isShown) return;
            if (I.trigger(this._element, "hide.bs.offcanvas").defaultPrevented) return;
            I.off(document, "focusin.bs.offcanvas"), this._element.blur(), this._isShown = !1, this._element.classList.remove("show"), this._backdrop.hide();
            const t = s(this._element);
            I.one(this._element, "transitionend", () => {
                this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._element.style.visibility = "hidden", this._config.scroll || Le(), I.trigger(this._element, "hidden.bs.offcanvas")
            }), a(this._element, t)
        }
        dispose() {
            this._backdrop.dispose(), super.dispose(), I.off(document, "focusin.bs.offcanvas"), this._config = null, this._backdrop = null
        }
        _getConfig(t) {
            return t = {
                ...je,
                ...z.getDataAttributes(this._element),
                ..."object" == typeof t ? t : {}
            }, l("offcanvas", t, Pe), t
        }
        _initializeBackDrop() {
            return new xe({
                isVisible: this._config.backdrop,
                isAnimated: !0,
                rootElement: this._element.parentNode,
                clickCallback: () => this.hide()
            })
        }
        _enforceFocusOnElement(t) {
            I.off(document, "focusin.bs.offcanvas"), I.on(document, "focusin.bs.offcanvas", e => {
                document === e.target || t === e.target || t.contains(e.target) || t.focus()
            }), t.focus()
        }
        _addEventListeners() {
            I.on(this._element, "click.dismiss.bs.offcanvas", '[data-bs-dismiss="offcanvas"]', () => this.hide()), I.on(this._element, "keydown.dismiss.bs.offcanvas", t => {
                this._config.keyboard && "Escape" === t.key && this.hide()
            })
        }
        static jQueryInterface(t) {
            return this.each((function () {
                const e = v.get(this, "bs.offcanvas") || new Ie(this, "object" == typeof t ? t : {});
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            }))
        }
    }
    I.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', (function (t) {
        const e = n(this);
        if (["A", "AREA"].includes(this.tagName) && t.preventDefault(), d(this)) return;
        I.one(e, "hidden.bs.offcanvas", () => {
            c(this) && this.focus()
        });
        const i = U.findOne(".offcanvas.show");
        i && i !== e && Ie.getInstance(i).hide(), (v.get(e, "bs.offcanvas") || new Ie(e)).toggle(this)
    })), I.on(window, "load.bs.offcanvas.data-api", () => {
        U.find(".offcanvas.show").forEach(t => (v.get(t, "bs.offcanvas") || new Ie(t)).show())
    }), m("offcanvas", Ie);
    const Me = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
        He = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i,
        Re = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
        Be = (t, e) => {
            const i = t.nodeName.toLowerCase();
            if (e.includes(i)) return !Me.has(i) || Boolean(He.test(t.nodeValue) || Re.test(t.nodeValue));
            const n = e.filter(t => t instanceof RegExp);
            for (let t = 0, e = n.length; t < e; t++)
                if (n[t].test(i)) return !0;
            return !1
        };

    function We(t, e, i) {
        if (!t.length) return t;
        if (i && "function" == typeof i) return i(t);
        const n = (new window.DOMParser).parseFromString(t, "text/html"),
            s = Object.keys(e),
            o = [].concat(...n.body.querySelectorAll("*"));
        for (let t = 0, i = o.length; t < i; t++) {
            const i = o[t],
                n = i.nodeName.toLowerCase();
            if (!s.includes(n)) {
                i.parentNode.removeChild(i);
                continue
            }
            const r = [].concat(...i.attributes),
                a = [].concat(e["*"] || [], e[n] || []);
            r.forEach(t => {
                Be(t, a) || i.removeAttribute(t.nodeName)
            })
        }
        return n.body.innerHTML
    }
    const ze = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        Ue = new Set(["sanitize", "allowList", "sanitizeFn"]),
        $e = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(array|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacements: "array",
            boundary: "(string|element)",
            customClass: "(string|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            allowList: "object",
            popperConfig: "(null|object|function)"
        },
        Fe = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: g() ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: g() ? "right" : "left"
        },
        Ke = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: [0, 0],
            container: !1,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            boundary: "clippingParents",
            customClass: "",
            sanitize: !0,
            sanitizeFn: null,
            allowList: {
                "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "srcset", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: []
            },
            popperConfig: null
        },
        Ye = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip"
        };
    class qe extends M {
        constructor(t, e) {
            if (void 0 === de) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            super(t), this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.config = this._getConfig(e), this.tip = null, this._setListeners()
        }
        static get Default() {
            return Ke
        }
        static get NAME() {
            return "tooltip"
        }
        static get DATA_KEY() {
            return "bs.tooltip"
        }
        static get Event() {
            return Ye
        }
        static get EVENT_KEY() {
            return ".bs.tooltip"
        }
        static get DefaultType() {
            return $e
        }
        enable() {
            this._isEnabled = !0
        }
        disable() {
            this._isEnabled = !1
        }
        toggleEnabled() {
            this._isEnabled = !this._isEnabled
        }
        toggle(t) {
            if (this._isEnabled)
                if (t) {
                    const e = this._initializeOnDelegatedTarget(t);
                    e._activeTrigger.click = !e._activeTrigger.click, e._isWithActiveTrigger() ? e._enter(null, e) : e._leave(null, e)
                } else {
                    if (this.getTipElement().classList.contains("show")) return void this._leave(null, this);
                    this._enter(null, this)
                }
        }
        dispose() {
            clearTimeout(this._timeout), I.off(this._element.closest(".modal"), "hide.bs.modal", this._hideModalHandler), this.tip && this.tip.parentNode && this.tip.parentNode.removeChild(this.tip), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), this._popper = null, this.config = null, this.tip = null, super.dispose()
        }
        show() {
            if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
            if (!this.isWithContent() || !this._isEnabled) return;
            const e = I.trigger(this._element, this.constructor.Event.SHOW),
                i = h(this._element),
                n = null === i ? this._element.ownerDocument.documentElement.contains(this._element) : i.contains(this._element);
            if (e.defaultPrevented || !n) return;
            const o = this.getTipElement(),
                r = t(this.constructor.NAME);
            o.setAttribute("id", r), this._element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && o.classList.add("fade");
            const l = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this._element) : this.config.placement,
                c = this._getAttachment(l);
            this._addAttachmentClass(c);
            const d = this._getContainer();
            v.set(o, this.constructor.DATA_KEY, this), this._element.ownerDocument.documentElement.contains(this.tip) || (d.appendChild(o), I.trigger(this._element, this.constructor.Event.INSERTED)), this._popper ? this._popper.update() : this._popper = ce(this._element, o, this._getPopperConfig(c)), o.classList.add("show");
            const f = "function" == typeof this.config.customClass ? this.config.customClass() : this.config.customClass;
            f && o.classList.add(...f.split(" ")), "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach(t => {
                I.on(t, "mouseover", u)
            });
            const p = () => {
                const t = this._hoverState;
                this._hoverState = null, I.trigger(this._element, this.constructor.Event.SHOWN), "out" === t && this._leave(null, this)
            };
            if (this.tip.classList.contains("fade")) {
                const t = s(this.tip);
                I.one(this.tip, "transitionend", p), a(this.tip, t)
            } else p()
        }
        hide() {
            if (!this._popper) return;
            const t = this.getTipElement(),
                e = () => {
                    this._isWithActiveTrigger() || ("show" !== this._hoverState && t.parentNode && t.parentNode.removeChild(t), this._cleanTipClass(), this._element.removeAttribute("aria-describedby"), I.trigger(this._element, this.constructor.Event.HIDDEN), this._popper && (this._popper.destroy(), this._popper = null))
                };
            if (!I.trigger(this._element, this.constructor.Event.HIDE).defaultPrevented) {
                if (t.classList.remove("show"), "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach(t => I.off(t, "mouseover", u)), this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, this.tip.classList.contains("fade")) {
                    const i = s(t);
                    I.one(t, "transitionend", e), a(t, i)
                } else e();
                this._hoverState = ""
            }
        }
        update() {
            null !== this._popper && this._popper.update()
        }
        isWithContent() {
            return Boolean(this.getTitle())
        }
        getTipElement() {
            if (this.tip) return this.tip;
            const t = document.createElement("div");
            return t.innerHTML = this.config.template, this.tip = t.children[0], this.tip
        }
        setContent() {
            const t = this.getTipElement();
            this.setElementContent(U.findOne(".tooltip-inner", t), this.getTitle()), t.classList.remove("fade", "show")
        }
        setElementContent(t, e) {
            if (null !== t) return "object" == typeof e && r(e) ? (e.jquery && (e = e[0]), void(this.config.html ? e.parentNode !== t && (t.innerHTML = "", t.appendChild(e)) : t.textContent = e.textContent)) : void(this.config.html ? (this.config.sanitize && (e = We(e, this.config.allowList, this.config.sanitizeFn)), t.innerHTML = e) : t.textContent = e)
        }
        getTitle() {
            let t = this._element.getAttribute("data-bs-original-title");
            return t || (t = "function" == typeof this.config.title ? this.config.title.call(this._element) : this.config.title), t
        }
        updateAttachment(t) {
            return "right" === t ? "end" : "left" === t ? "start" : t
        }
        _initializeOnDelegatedTarget(t, e) {
            const i = this.constructor.DATA_KEY;
            return (e = e || v.get(t.delegateTarget, i)) || (e = new this.constructor(t.delegateTarget, this._getDelegateConfig()), v.set(t.delegateTarget, i, e)), e
        }
        _getOffset() {
            const {
                offset: t
            } = this.config;
            return "string" == typeof t ? t.split(",").map(t => Number.parseInt(t, 10)) : "function" == typeof t ? e => t(e, this._element) : t
        }
        _getPopperConfig(t) {
            const e = {
                placement: t,
                modifiers: [{
                    name: "flip",
                    options: {
                        fallbackPlacements: this.config.fallbackPlacements
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }, {
                    name: "preventOverflow",
                    options: {
                        boundary: this.config.boundary
                    }
                }, {
                    name: "arrow",
                    options: {
                        element: `.${this.constructor.NAME}-arrow`
                    }
                }, {
                    name: "onChange",
                    enabled: !0,
                    phase: "afterWrite",
                    fn: t => this._handlePopperPlacementChange(t)
                }],
                onFirstUpdate: t => {
                    t.options.placement !== t.placement && this._handlePopperPlacementChange(t)
                }
            };
            return {
                ...e,
                ..."function" == typeof this.config.popperConfig ? this.config.popperConfig(e) : this.config.popperConfig
            }
        }
        _addAttachmentClass(t) {
            this.getTipElement().classList.add("bs-tooltip-" + this.updateAttachment(t))
        }
        _getContainer() {
            return !1 === this.config.container ? document.body : r(this.config.container) ? this.config.container : U.findOne(this.config.container)
        }
        _getAttachment(t) {
            return Fe[t.toUpperCase()]
        }
        _setListeners() {
            this.config.trigger.split(" ").forEach(t => {
                if ("click" === t) I.on(this._element, this.constructor.Event.CLICK, this.config.selector, t => this.toggle(t));
                else if ("manual" !== t) {
                    const e = "hover" === t ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN,
                        i = "hover" === t ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
                    I.on(this._element, e, this.config.selector, t => this._enter(t)), I.on(this._element, i, this.config.selector, t => this._leave(t))
                }
            }), this._hideModalHandler = () => {
                this._element && this.hide()
            }, I.on(this._element.closest(".modal"), "hide.bs.modal", this._hideModalHandler), this.config.selector ? this.config = {
                ...this.config,
                trigger: "manual",
                selector: ""
            } : this._fixTitle()
        }
        _fixTitle() {
            const t = this._element.getAttribute("title"),
                e = typeof this._element.getAttribute("data-bs-original-title");
            (t || "string" !== e) && (this._element.setAttribute("data-bs-original-title", t || ""), !t || this._element.getAttribute("aria-label") || this._element.textContent || this._element.setAttribute("aria-label", t), this._element.setAttribute("title", ""))
        }
        _enter(t, e) {
            e = this._initializeOnDelegatedTarget(t, e), t && (e._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0), e.getTipElement().classList.contains("show") || "show" === e._hoverState ? e._hoverState = "show" : (clearTimeout(e._timeout), e._hoverState = "show", e.config.delay && e.config.delay.show ? e._timeout = setTimeout(() => {
                "show" === e._hoverState && e.show()
            }, e.config.delay.show) : e.show())
        }
        _leave(t, e) {
            e = this._initializeOnDelegatedTarget(t, e), t && (e._activeTrigger["focusout" === t.type ? "focus" : "hover"] = e._element.contains(t.relatedTarget)), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = "out", e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(() => {
                "out" === e._hoverState && e.hide()
            }, e.config.delay.hide) : e.hide())
        }
        _isWithActiveTrigger() {
            for (const t in this._activeTrigger)
                if (this._activeTrigger[t]) return !0;
            return !1
        }
        _getConfig(t) {
            const e = z.getDataAttributes(this._element);
            return Object.keys(e).forEach(t => {
                Ue.has(t) && delete e[t]
            }), t && "object" == typeof t.container && t.container.jquery && (t.container = t.container[0]), "number" == typeof (t = {
                ...this.constructor.Default,
                ...e,
                ..."object" == typeof t && t ? t : {}
            }).delay && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), l("tooltip", t, this.constructor.DefaultType), t.sanitize && (t.template = We(t.template, t.allowList, t.sanitizeFn)), t
        }
        _getDelegateConfig() {
            const t = {};
            if (this.config)
                for (const e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
            return t
        }
        _cleanTipClass() {
            const t = this.getTipElement(),
                e = t.getAttribute("class").match(ze);
            null !== e && e.length > 0 && e.map(t => t.trim()).forEach(e => t.classList.remove(e))
        }
        _handlePopperPlacementChange(t) {
            const {
                state: e
            } = t;
            e && (this.tip = e.elements.popper, this._cleanTipClass(), this._addAttachmentClass(this._getAttachment(e.placement)))
        }
        static jQueryInterface(t) {
            return this.each((function () {
                let e = v.get(this, "bs.tooltip");
                const i = "object" == typeof t && t;
                if ((e || !/dispose|hide/.test(t)) && (e || (e = new qe(this, i)), "string" == typeof t)) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    m("tooltip", qe);
    const Ve = new RegExp("(^|\\s)bs-popover\\S+", "g"),
        Xe = {
            ...qe.Default,
            placement: "right",
            offset: [0, 8],
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        },
        Qe = {
            ...qe.DefaultType,
            content: "(string|element|function)"
        },
        Ge = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover"
        };
    class Ze extends qe {
        static get Default() {
            return Xe
        }
        static get NAME() {
            return "popover"
        }
        static get DATA_KEY() {
            return "bs.popover"
        }
        static get Event() {
            return Ge
        }
        static get EVENT_KEY() {
            return ".bs.popover"
        }
        static get DefaultType() {
            return Qe
        }
        isWithContent() {
            return this.getTitle() || this._getContent()
        }
        setContent() {
            const t = this.getTipElement();
            this.setElementContent(U.findOne(".popover-header", t), this.getTitle());
            let e = this._getContent();
            "function" == typeof e && (e = e.call(this._element)), this.setElementContent(U.findOne(".popover-body", t), e), t.classList.remove("fade", "show")
        }
        _addAttachmentClass(t) {
            this.getTipElement().classList.add("bs-popover-" + this.updateAttachment(t))
        }
        _getContent() {
            return this._element.getAttribute("data-bs-content") || this.config.content
        }
        _cleanTipClass() {
            const t = this.getTipElement(),
                e = t.getAttribute("class").match(Ve);
            null !== e && e.length > 0 && e.map(t => t.trim()).forEach(e => t.classList.remove(e))
        }
        static jQueryInterface(t) {
            return this.each((function () {
                let e = v.get(this, "bs.popover");
                const i = "object" == typeof t ? t : null;
                if ((e || !/dispose|hide/.test(t)) && (e || (e = new Ze(this, i), v.set(this, "bs.popover", e)), "string" == typeof t)) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    m("popover", Ze);
    const Je = {
            offset: 10,
            method: "auto",
            target: ""
        },
        ti = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        };
    class ei extends M {
        constructor(t, e) {
            super(t), this._scrollElement = "BODY" === this._element.tagName ? window : this._element, this._config = this._getConfig(e), this._selector = `${this._config.target} .nav-link, ${this._config.target} .list-group-item, ${this._config.target} .dropdown-item`, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, I.on(this._scrollElement, "scroll.bs.scrollspy", () => this._process()), this.refresh(), this._process()
        }
        static get Default() {
            return Je
        }
        static get DATA_KEY() {
            return "bs.scrollspy"
        }
        refresh() {
            const t = this._scrollElement === this._scrollElement.window ? "offset" : "position",
                e = "auto" === this._config.method ? t : this._config.method,
                n = "position" === e ? this._getScrollTop() : 0;
            this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), U.find(this._selector).map(t => {
                const s = i(t),
                    o = s ? U.findOne(s) : null;
                if (o) {
                    const t = o.getBoundingClientRect();
                    if (t.width || t.height) return [z[e](o).top + n, s]
                }
                return null
            }).filter(t => t).sort((t, e) => t[0] - e[0]).forEach(t => {
                this._offsets.push(t[0]), this._targets.push(t[1])
            })
        }
        dispose() {
            super.dispose(), I.off(this._scrollElement, ".bs.scrollspy"), this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
        }
        _getConfig(e) {
            if ("string" != typeof (e = {
                    ...Je,
                    ...z.getDataAttributes(this._element),
                    ..."object" == typeof e && e ? e : {}
                }).target && r(e.target)) {
                let {
                    id: i
                } = e.target;
                i || (i = t("scrollspy"), e.target.id = i), e.target = "#" + i
            }
            return l("scrollspy", e, ti), e
        }
        _getScrollTop() {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
        }
        _getScrollHeight() {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
        }
        _getOffsetHeight() {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
        }
        _process() {
            const t = this._getScrollTop() + this._config.offset,
                e = this._getScrollHeight(),
                i = this._config.offset + e - this._getOffsetHeight();
            if (this._scrollHeight !== e && this.refresh(), t >= i) {
                const t = this._targets[this._targets.length - 1];
                this._activeTarget !== t && this._activate(t)
            } else {
                if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                for (let e = this._offsets.length; e--;) this._activeTarget !== this._targets[e] && t >= this._offsets[e] && (void 0 === this._offsets[e + 1] || t < this._offsets[e + 1]) && this._activate(this._targets[e])
            }
        }
        _activate(t) {
            this._activeTarget = t, this._clear();
            const e = this._selector.split(",").map(e => `${e}[data-bs-target="${t}"],${e}[href="${t}"]`),
                i = U.findOne(e.join(","));
            i.classList.contains("dropdown-item") ? (U.findOne(".dropdown-toggle", i.closest(".dropdown")).classList.add("active"), i.classList.add("active")) : (i.classList.add("active"), U.parents(i, ".nav, .list-group").forEach(t => {
                U.prev(t, ".nav-link, .list-group-item").forEach(t => t.classList.add("active")), U.prev(t, ".nav-item").forEach(t => {
                    U.children(t, ".nav-link").forEach(t => t.classList.add("active"))
                })
            })), I.trigger(this._scrollElement, "activate.bs.scrollspy", {
                relatedTarget: t
            })
        }
        _clear() {
            U.find(this._selector).filter(t => t.classList.contains("active")).forEach(t => t.classList.remove("active"))
        }
        static jQueryInterface(t) {
            return this.each((function () {
                const e = ei.getInstance(this) || new ei(this, "object" == typeof t ? t : {});
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    I.on(window, "load.bs.scrollspy.data-api", () => {
        U.find('[data-bs-spy="scroll"]').forEach(t => new ei(t))
    }), m("scrollspy", ei);
    class ii extends M {
        static get DATA_KEY() {
            return "bs.tab"
        }
        show() {
            if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains("active")) return;
            let t;
            const e = n(this._element),
                i = this._element.closest(".nav, .list-group");
            if (i) {
                const e = "UL" === i.nodeName || "OL" === i.nodeName ? ":scope > li > .active" : ".active";
                t = U.find(e, i), t = t[t.length - 1]
            }
            const s = t ? I.trigger(t, "hide.bs.tab", {
                relatedTarget: this._element
            }) : null;
            if (I.trigger(this._element, "show.bs.tab", {
                    relatedTarget: t
                }).defaultPrevented || null !== s && s.defaultPrevented) return;
            this._activate(this._element, i);
            const o = () => {
                I.trigger(t, "hidden.bs.tab", {
                    relatedTarget: this._element
                }), I.trigger(this._element, "shown.bs.tab", {
                    relatedTarget: t
                })
            };
            e ? this._activate(e, e.parentNode, o) : o()
        }
        _activate(t, e, i) {
            const n = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? U.children(e, ".active") : U.find(":scope > li > .active", e))[0],
                o = i && n && n.classList.contains("fade"),
                r = () => this._transitionComplete(t, n, i);
            if (n && o) {
                const t = s(n);
                n.classList.remove("show"), I.one(n, "transitionend", r), a(n, t)
            } else r()
        }
        _transitionComplete(t, e, i) {
            if (e) {
                e.classList.remove("active");
                const t = U.findOne(":scope > .dropdown-menu .active", e.parentNode);
                t && t.classList.remove("active"), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
            }
            t.classList.add("active"), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), f(t), t.classList.contains("fade") && t.classList.add("show");
            let n = t.parentNode;
            if (n && "LI" === n.nodeName && (n = n.parentNode), n && n.classList.contains("dropdown-menu")) {
                const e = t.closest(".dropdown");
                e && U.find(".dropdown-toggle", e).forEach(t => t.classList.add("active")), t.setAttribute("aria-expanded", !0)
            }
            i && i()
        }
        static jQueryInterface(t) {
            return this.each((function () {
                const e = v.get(this, "bs.tab") || new ii(this);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    I.on(document, "click.bs.tab.data-api", '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', (function (t) {
        ["A", "AREA"].includes(this.tagName) && t.preventDefault(), d(this) || (v.get(this, "bs.tab") || new ii(this)).show()
    })), m("tab", ii);
    const ni = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        si = {
            animation: !0,
            autohide: !0,
            delay: 5e3
        };
    class oi extends M {
        constructor(t, e) {
            super(t), this._config = this._getConfig(e), this._timeout = null, this._setListeners()
        }
        static get DefaultType() {
            return ni
        }
        static get Default() {
            return si
        }
        static get DATA_KEY() {
            return "bs.toast"
        }
        show() {
            if (I.trigger(this._element, "show.bs.toast").defaultPrevented) return;
            this._clearTimeout(), this._config.animation && this._element.classList.add("fade");
            const t = () => {
                this._element.classList.remove("showing"), this._element.classList.add("show"), I.trigger(this._element, "shown.bs.toast"), this._config.autohide && (this._timeout = setTimeout(() => {
                    this.hide()
                }, this._config.delay))
            };
            if (this._element.classList.remove("hide"), f(this._element), this._element.classList.add("showing"), this._config.animation) {
                const e = s(this._element);
                I.one(this._element, "transitionend", t), a(this._element, e)
            } else t()
        }
        hide() {
            if (!this._element.classList.contains("show")) return;
            if (I.trigger(this._element, "hide.bs.toast").defaultPrevented) return;
            const t = () => {
                this._element.classList.add("hide"), I.trigger(this._element, "hidden.bs.toast")
            };
            if (this._element.classList.remove("show"), this._config.animation) {
                const e = s(this._element);
                I.one(this._element, "transitionend", t), a(this._element, e)
            } else t()
        }
        dispose() {
            this._clearTimeout(), this._element.classList.contains("show") && this._element.classList.remove("show"), super.dispose(), this._config = null
        }
        _getConfig(t) {
            return t = {
                ...si,
                ...z.getDataAttributes(this._element),
                ..."object" == typeof t && t ? t : {}
            }, l("toast", t, this.constructor.DefaultType), t
        }
        _setListeners() {
            I.on(this._element, "click.dismiss.bs.toast", '[data-bs-dismiss="toast"]', () => this.hide())
        }
        _clearTimeout() {
            clearTimeout(this._timeout), this._timeout = null
        }
        static jQueryInterface(t) {
            return this.each((function () {
                let e = v.get(this, "bs.toast");
                if (e || (e = new oi(this, "object" == typeof t && t)), "string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            }))
        }
    }
    return m("toast", oi), {
        Alert: H,
        Button: R,
        Carousel: X,
        Collapse: Z,
        Dropdown: ye,
        Modal: Ne,
        Offcanvas: Ie,
        Popover: Ze,
        ScrollSpy: ei,
        Tab: ii,
        Toast: oi,
        Tooltip: qe
    }
}));
//# sourceMappingURL=bootstrap.bundle.min.js.map