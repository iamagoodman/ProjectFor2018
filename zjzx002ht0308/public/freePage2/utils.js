! function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).utils = {})
  }(this, (function(e) {
      "use strict";
  
      function t(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
              var r = Object.getOwnPropertySymbols(e);
              t && (r = r.filter((function(t) {
                  return Object.getOwnPropertyDescriptor(e, t).enumerable
              }))), n.push.apply(n, r)
          }
          return n
      }
  
      function n(e) {
          for (var n = 1; n < arguments.length; n++) {
              var i = null != arguments[n] ? arguments[n] : {};
              n % 2 ? t(Object(i), !0).forEach((function(t) {
                  r(e, t, i[t])
              })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : t(Object(i)).forEach((function(t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
              }))
          }
          return e
      }
  
      function r(e, t, n) {
          return t in e ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0
          }) : e[t] = n, e
      }
  
      function i(e, t) {
          return function(e) {
              if (Array.isArray(e)) return e
          }(e) || function(e, t) {
              var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
              if (null == n) return;
              var r, i, a = [],
                  o = !0,
                  s = !1;
              try {
                  for (n = n.call(e); !(o = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); o = !0);
              } catch (e) {
                  s = !0, i = e
              } finally {
                  try {
                      o || null == n.return || n.return()
                  } finally {
                      if (s) throw i
                  }
              }
              return a
          }(e, t) || o(e, t) || function() {
              throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
          }()
      }
  
      function a(e) {
          return function(e) {
              if (Array.isArray(e)) return s(e)
          }(e) || function(e) {
              if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
          }(e) || o(e) || function() {
              throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
          }()
      }
  
      function o(e, t) {
          if (e) {
              if ("string" == typeof e) return s(e, t);
              var n = Object.prototype.toString.call(e).slice(8, -1);
              return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s(e, t) : void 0
          }
      }
  
      function s(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
          return r
      }
  
      function l(e, t) {
          var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
          if (!n) {
              if (Array.isArray(e) || (n = o(e)) || t && e && "number" == typeof e.length) {
                  n && (e = n);
                  var r = 0,
                      i = function() {};
                  return {
                      s: i,
                      n: function() {
                          return r >= e.length ? {
                              done: !0
                          } : {
                              done: !1,
                              value: e[r++]
                          }
                      },
                      e: function(e) {
                          throw e
                      },
                      f: i
                  }
              }
              throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
          }
          var a, s = !0,
              l = !1;
          return {
              s: function() {
                  n = n.call(e)
              },
              n: function() {
                  var e = n.next();
                  return s = e.done, e
              },
              e: function(e) {
                  l = !0, a = e
              },
              f: function() {
                  try {
                      s || null == n.return || n.return()
                  } finally {
                      if (l) throw a
                  }
              }
          }
      }
      var u = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
  
      function c(e, t) {
          return e(t = {
              exports: {}
          }, t.exports), t.exports
      }
      for (var d = c((function(e) {
              (function() {
                  var t, n, r, i, a, o;
                  "undefined" != typeof performance && null !== performance && performance.now ? e.exports = function() {
                      return performance.now()
                  } : "undefined" != typeof process && null !== process && process.hrtime ? (e.exports = function() {
                      return (t() - a) / 1e6
                  }, n = process.hrtime, i = (t = function() {
                      var e;
                      return 1e9 * (e = n())[0] + e[1]
                  })(), o = 1e9 * process.uptime(), a = i - o) : Date.now ? (e.exports = function() {
                      return Date.now() - r
                  }, r = Date.now()) : (e.exports = function() {
                      return (new Date).getTime() - r
                  }, r = (new Date).getTime())
              }).call(u)
          })), f = "undefined" == typeof window ? u : window, h = ["moz", "webkit"], p = "AnimationFrame", m = f["request" + p], v = f["cancel" + p] || f["cancelRequest" + p], g = 0; !m && g < h.length; g++) m = f[h[g] + "Request" + p], v = f[h[g] + "Cancel" + p] || f[h[g] + "CancelRequest" + p];
      if (!m || !v) {
          var y = 0,
              b = 0,
              w = [];
          m = function(e) {
              if (0 === w.length) {
                  var t = d(),
                      n = Math.max(0, 16.666666666666668 - (t - y));
                  y = n + t, setTimeout((function() {
                      var e = w.slice(0);
                      w.length = 0;
                      for (var t = 0; t < e.length; t++)
                          if (!e[t].cancelled) try {
                              e[t].callback(y)
                          } catch (e) {
                              setTimeout((function() {
                                  throw e
                              }), 0)
                          }
                  }), Math.round(n))
              }
              return w.push({
                  handle: ++b,
                  callback: e,
                  cancelled: !1
              }), b
          }, v = function(e) {
              for (var t = 0; t < w.length; t++) w[t].handle === e && (w[t].cancelled = !0)
          }
      }
      var _ = function(e) {
          return m.call(f, e)
      };
      _.cancel = function() {
          v.apply(f, arguments)
      }, _.polyfill = function(e) {
          e || (e = f), e.requestAnimationFrame = m, e.cancelAnimationFrame = v
      };
      var k = c((function(e, t) {
              e.exports = function() {
                  var e = 1e3,
                      t = 6e4,
                      n = 36e5,
                      r = "millisecond",
                      i = "second",
                      a = "minute",
                      o = "hour",
                      s = "day",
                      l = "week",
                      u = "month",
                      c = "quarter",
                      d = "year",
                      f = "date",
                      h = "Invalid Date",
                      p = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
                      m = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
                      v = {
                          name: "en",
                          weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                          months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
                      },
                      g = function(e, t, n) {
                          var r = String(e);
                          return !r || r.length >= t ? e : "" + Array(t + 1 - r.length).join(n) + e
                      },
                      y = {
                          s: g,
                          z: function(e) {
                              var t = -e.utcOffset(),
                                  n = Math.abs(t),
                                  r = Math.floor(n / 60),
                                  i = n % 60;
                              return (t <= 0 ? "+" : "-") + g(r, 2, "0") + ":" + g(i, 2, "0")
                          },
                          m: function e(t, n) {
                              if (t.date() < n.date()) return -e(n, t);
                              var r = 12 * (n.year() - t.year()) + (n.month() - t.month()),
                                  i = t.clone().add(r, u),
                                  a = n - i < 0,
                                  o = t.clone().add(r + (a ? -1 : 1), u);
                              return +(-(r + (n - i) / (a ? i - o : o - i)) || 0)
                          },
                          a: function(e) {
                              return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
                          },
                          p: function(e) {
                              return {
                                  M: u,
                                  y: d,
                                  w: l,
                                  d: s,
                                  D: f,
                                  h: o,
                                  m: a,
                                  s: i,
                                  ms: r,
                                  Q: c
                              } [e] || String(e || "").toLowerCase().replace(/s$/, "")
                          },
                          u: function(e) {
                              return void 0 === e
                          }
                      },
                      b = "en",
                      w = {};
                  w[b] = v;
                  var _ = function(e) {
                          return e instanceof E
                      },
                      k = function(e, t, n) {
                          var r;
                          if (!e) return b;
                          if ("string" == typeof e) w[e] && (r = e), t && (w[e] = t, r = e);
                          else {
                              var i = e.name;
                              w[i] = e, r = i
                          }
                          return !n && r && (b = r), r || !n && b
                      },
                      S = function(e, t) {
                          if (_(e)) return e.clone();
                          var n = "object" == typeof t ? t : {};
                          return n.date = e, n.args = arguments, new E(n)
                      },
                      x = y;
                  x.l = k, x.i = _, x.w = function(e, t) {
                      return S(e, {
                          locale: t.$L,
                          utc: t.$u,
                          x: t.$x,
                          $offset: t.$offset
                      })
                  };
                  var E = function() {
                          function v(e) {
                              this.$L = k(e.locale, null, !0), this.parse(e)
                          }
                          var g = v.prototype;
                          return g.parse = function(e) {
                              this.$d = function(e) {
                                  var t = e.date,
                                      n = e.utc;
                                  if (null === t) return new Date(NaN);
                                  if (x.u(t)) return new Date;
                                  if (t instanceof Date) return new Date(t);
                                  if ("string" == typeof t && !/Z$/i.test(t)) {
                                      var r = t.match(p);
                                      if (r) {
                                          var i = r[2] - 1 || 0,
                                              a = (r[7] || "0").substring(0, 3);
                                          return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, a)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, a)
                                      }
                                  }
                                  return new Date(t)
                              }(e), this.$x = e.x || {}, this.init()
                          }, g.init = function() {
                              var e = this.$d;
                              this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds()
                          }, g.$utils = function() {
                              return x
                          }, g.isValid = function() {
                              return !(this.$d.toString() === h)
                          }, g.isSame = function(e, t) {
                              var n = S(e);
                              return this.startOf(t) <= n && n <= this.endOf(t)
                          }, g.isAfter = function(e, t) {
                              return S(e) < this.startOf(t)
                          }, g.isBefore = function(e, t) {
                              return this.endOf(t) < S(e)
                          }, g.$g = function(e, t, n) {
                              return x.u(e) ? this[t] : this.set(n, e)
                          }, g.unix = function() {
                              return Math.floor(this.valueOf() / 1e3)
                          }, g.valueOf = function() {
                              return this.$d.getTime()
                          }, g.startOf = function(e, t) {
                              var n = this,
                                  r = !!x.u(t) || t,
                                  c = x.p(e),
                                  h = function(e, t) {
                                      var i = x.w(n.$u ? Date.UTC(n.$y, t, e) : new Date(n.$y, t, e), n);
                                      return r ? i : i.endOf(s)
                                  },
                                  p = function(e, t) {
                                      return x.w(n.toDate()[e].apply(n.toDate("s"), (r ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(t)), n)
                                  },
                                  m = this.$W,
                                  v = this.$M,
                                  g = this.$D,
                                  y = "set" + (this.$u ? "UTC" : "");
                              switch (c) {
                                  case d:
                                      return r ? h(1, 0) : h(31, 11);
                                  case u:
                                      return r ? h(1, v) : h(0, v + 1);
                                  case l:
                                      var b = this.$locale().weekStart || 0,
                                          w = (m < b ? m + 7 : m) - b;
                                      return h(r ? g - w : g + (6 - w), v);
                                  case s:
                                  case f:
                                      return p(y + "Hours", 0);
                                  case o:
                                      return p(y + "Minutes", 1);
                                  case a:
                                      return p(y + "Seconds", 2);
                                  case i:
                                      return p(y + "Milliseconds", 3);
                                  default:
                                      return this.clone()
                              }
                          }, g.endOf = function(e) {
                              return this.startOf(e, !1)
                          }, g.$set = function(e, t) {
                              var n, l = x.p(e),
                                  c = "set" + (this.$u ? "UTC" : ""),
                                  h = (n = {}, n[s] = c + "Date", n[f] = c + "Date", n[u] = c + "Month", n[d] = c + "FullYear", n[o] = c + "Hours", n[a] = c + "Minutes", n[i] = c + "Seconds", n[r] = c + "Milliseconds", n)[l],
                                  p = l === s ? this.$D + (t - this.$W) : t;
                              if (l === u || l === d) {
                                  var m = this.clone().set(f, 1);
                                  m.$d[h](p), m.init(), this.$d = m.set(f, Math.min(this.$D, m.daysInMonth())).$d
                              } else h && this.$d[h](p);
                              return this.init(), this
                          }, g.set = function(e, t) {
                              return this.clone().$set(e, t)
                          }, g.get = function(e) {
                              return this[x.p(e)]()
                          }, g.add = function(r, c) {
                              var f, h = this;
                              r = Number(r);
                              var p = x.p(c),
                                  m = function(e) {
                                      var t = S(h);
                                      return x.w(t.date(t.date() + Math.round(e * r)), h)
                                  };
                              if (p === u) return this.set(u, this.$M + r);
                              if (p === d) return this.set(d, this.$y + r);
                              if (p === s) return m(1);
                              if (p === l) return m(7);
                              var v = (f = {}, f[a] = t, f[o] = n, f[i] = e, f)[p] || 1,
                                  g = this.$d.getTime() + r * v;
                              return x.w(g, this)
                          }, g.subtract = function(e, t) {
                              return this.add(-1 * e, t)
                          }, g.format = function(e) {
                              var t = this,
                                  n = this.$locale();
                              if (!this.isValid()) return n.invalidDate || h;
                              var r = e || "YYYY-MM-DDTHH:mm:ssZ",
                                  i = x.z(this),
                                  a = this.$H,
                                  o = this.$m,
                                  s = this.$M,
                                  l = n.weekdays,
                                  u = n.months,
                                  c = function(e, n, i, a) {
                                      return e && (e[n] || e(t, r)) || i[n].substr(0, a)
                                  },
                                  d = function(e) {
                                      return x.s(a % 12 || 12, e, "0")
                                  },
                                  f = n.meridiem || function(e, t, n) {
                                      var r = e < 12 ? "AM" : "PM";
                                      return n ? r.toLowerCase() : r
                                  },
                                  p = {
                                      YY: String(this.$y).slice(-2),
                                      YYYY: this.$y,
                                      M: s + 1,
                                      MM: x.s(s + 1, 2, "0"),
                                      MMM: c(n.monthsShort, s, u, 3),
                                      MMMM: c(u, s),
                                      D: this.$D,
                                      DD: x.s(this.$D, 2, "0"),
                                      d: String(this.$W),
                                      dd: c(n.weekdaysMin, this.$W, l, 2),
                                      ddd: c(n.weekdaysShort, this.$W, l, 3),
                                      dddd: l[this.$W],
                                      H: String(a),
                                      HH: x.s(a, 2, "0"),
                                      h: d(1),
                                      hh: d(2),
                                      a: f(a, o, !0),
                                      A: f(a, o, !1),
                                      m: String(o),
                                      mm: x.s(o, 2, "0"),
                                      s: String(this.$s),
                                      ss: x.s(this.$s, 2, "0"),
                                      SSS: x.s(this.$ms, 3, "0"),
                                      Z: i
                                  };
                              return r.replace(m, (function(e, t) {
                                  return t || p[e] || i.replace(":", "")
                              }))
                          }, g.utcOffset = function() {
                              return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
                          }, g.diff = function(r, f, h) {
                              var p, m = x.p(f),
                                  v = S(r),
                                  g = (v.utcOffset() - this.utcOffset()) * t,
                                  y = this - v,
                                  b = x.m(this, v);
                              return b = (p = {}, p[d] = b / 12, p[u] = b, p[c] = b / 3, p[l] = (y - g) / 6048e5, p[s] = (y - g) / 864e5, p[o] = y / n, p[a] = y / t, p[i] = y / e, p)[m] || y, h ? b : x.a(b)
                          }, g.daysInMonth = function() {
                              return this.endOf(u).$D
                          }, g.$locale = function() {
                              return w[this.$L]
                          }, g.locale = function(e, t) {
                              if (!e) return this.$L;
                              var n = this.clone(),
                                  r = k(e, t, !0);
                              return r && (n.$L = r), n
                          }, g.clone = function() {
                              return x.w(this.$d, this)
                          }, g.toDate = function() {
                              return new Date(this.valueOf())
                          }, g.toJSON = function() {
                              return this.isValid() ? this.toISOString() : null
                          }, g.toISOString = function() {
                              return this.$d.toISOString()
                          }, g.toString = function() {
                              return this.$d.toUTCString()
                          }, v
                      }(),
                      T = E.prototype;
                  return S.prototype = T, [
                      ["$ms", r],
                      ["$s", i],
                      ["$m", a],
                      ["$H", o],
                      ["$W", s],
                      ["$M", u],
                      ["$y", d],
                      ["$D", f]
                  ].forEach((function(e) {
                      T[e[1]] = function(t) {
                          return this.$g(t, e[0], e[1])
                      }
                  })), S.extend = function(e, t) {
                      return e.$i || (e(t, E, S), e.$i = !0), S
                  }, S.locale = k, S.isDayjs = _, S.unix = function(e) {
                      return S(1e3 * e)
                  }, S.en = w[b], S.Ls = w, S.p = {}, S
              }()
          })),
          S = function(e) {
              /*! *****************************************************************************
                    Copyright (c) Microsoft Corporation.
                     Permission to use, copy, modify, and/or distribute this software for any
                    purpose with or without fee is hereby granted.
                     THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
                    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
                    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
                    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
                    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
                    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
                    PERFORMANCE OF THIS SOFTWARE.
                    ***************************************************************************** */
              var t, n = function() {
                  return (n = Object.assign || function(e) {
                      for (var t, n = 1, r = arguments.length; n < r; n++)
                          for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                      return e
                  }).apply(this, arguments)
              };
  
              function r(e) {
                  var t = "function" == typeof Symbol && Symbol.iterator,
                      n = t && e[t],
                      r = 0;
                  if (n) return n.call(e);
                  if (e && "number" == typeof e.length) return {
                      next: function() {
                          return e && r >= e.length && (e = void 0), {
                              value: e && e[r++],
                              done: !e
                          }
                      }
                  };
                  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
              }
  
              function i(e, t) {
                  var n = "function" == typeof Symbol && e[Symbol.iterator];
                  if (!n) return e;
                  var r, i, a = n.call(e),
                      o = [];
                  try {
                      for (;
                          (void 0 === t || t-- > 0) && !(r = a.next()).done;) o.push(r.value)
                  } catch (e) {
                      i = {
                          error: e
                      }
                  } finally {
                      try {
                          r && !r.done && (n = a.return) && n.call(a)
                      } finally {
                          if (i) throw i.error
                      }
                  }
                  return o
              }
  
              function a() {
                  for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(i(arguments[t]));
                  return e
              }
  
              function o(e) {
                  return e.nodeType === e.ELEMENT_NODE
              }
  
              function s(e) {
                  var t, n = null === (t = e) || void 0 === t ? void 0 : t.host;
                  return Boolean(n && n.shadowRoot && n.shadowRoot === e)
              }
  
              function l(e) {
                  var t = e.maskInputOptions,
                      n = e.tagName,
                      r = e.type,
                      i = e.value,
                      a = e.maskInputFn,
                      o = i || "";
                  return (t[n.toLowerCase()] || t[r]) && (o = a ? a(o) : "*".repeat(o.length)), o
              }! function(e) {
                  e[e.Document = 0] = "Document", e[e.DocumentType = 1] = "DocumentType", e[e.Element = 2] = "Element", e[e.Text = 3] = "Text", e[e.CDATA = 4] = "CDATA", e[e.Comment = 5] = "Comment"
              }(t || (t = {}));
              var u = 1,
                  c = RegExp("[^a-z0-9-_:]");
  
              function d(e) {
                  try {
                      var t = e.rules || e.cssRules;
                      return t ? Array.from(t).map(f).join("") : null
                  } catch (e) {
                      return null
                  }
              }
  
              function f(e) {
                  return function(e) {
                      return "styleSheet" in e
                  }(e) ? d(e.styleSheet) || "" : e.cssText
              }
              var h = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm,
                  p = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|#).*/,
                  m = /^(data:)([^,]*),(.*)/i;
  
              function v(e, t) {
                  return (e || "").replace(h, (function(e, n, r, i, a, o) {
                      var s, l = r || a || o,
                          u = n || i || "";
                      if (!l) return e;
                      if (!p.test(l)) return "url(" + u + l + u + ")";
                      if (m.test(l)) return "url(" + u + l + u + ")";
                      if ("/" === l[0]) return "url(" + u + (((s = t).indexOf("//") > -1 ? s.split("/").slice(0, 3).join("/") : s.split("/")[0]).split("?")[0] + l) + u + ")";
                      var c = t.split("/"),
                          d = l.split("/");
                      c.pop();
                      for (var f = 0, h = d; f < h.length; f++) {
                          var v = h[f];
                          "." !== v && (".." === v ? c.pop() : c.push(v))
                      }
                      return "url(" + u + c.join("/") + u + ")"
                  }))
              }
              var g = /^[^ \t\n\r\u000c]+/,
                  y = /^[, \t\n\r\u000c]+/;
  
              function b(e, t) {
                  if (!t || "" === t.trim()) return t;
                  var n = e.createElement("a");
                  return n.href = t, n.href
              }
  
              function w() {
                  var e = document.createElement("a");
                  return e.href = "", e.href
              }
  
              function _(e, t, n, r) {
                  return "src" === n || ("href" === n || "xlink:href" === n) && r ? b(e, r) : "background" !== n || !r || "table" !== t && "td" !== t && "th" !== t ? "srcset" === n && r ? function(e, t) {
                      if ("" === t.trim()) return t;
                      var n = 0;
  
                      function r(e) {
                          var r, i = e.exec(t.substring(n));
                          return i ? (r = i[0], n += r.length, r) : ""
                      }
                      for (var i = []; r(y), !(n >= t.length);) {
                          var a = r(g);
                          if ("," === a.slice(-1)) a = b(e, a.substring(0, a.length - 1)), i.push(a);
                          else {
                              var o = "";
                              a = b(e, a);
                              for (var s = !1;;) {
                                  var l = t.charAt(n);
                                  if ("" === l) {
                                      i.push((a + o).trim());
                                      break
                                  }
                                  if (s) ")" === l && (s = !1);
                                  else {
                                      if ("," === l) {
                                          n += 1, i.push((a + o).trim());
                                          break
                                      }
                                      "(" === l && (s = !0)
                                  }
                                  o += l, n += 1
                              }
                          }
                      }
                      return i.join(", ")
                  }(e, r) : "style" === n && r ? v(r, w()) : r : b(e, r)
              }
  
              function k(e, t, n) {
                  if (!e) return !1;
                  if (e.nodeType === e.ELEMENT_NODE) {
                      if ("string" == typeof t) {
                          if (e.classList.contains(t)) return !0
                      } else e.classList.forEach((function(e) {
                          if (t.test(e)) return !0
                      }));
                      return !(!n || !e.matches(n)) || k(e.parentNode, t, n)
                  }
                  return e.nodeType, e.TEXT_NODE, k(e.parentNode, t, n)
              }
  
              function S(e, n) {
                  var r, i, a = n.doc,
                      o = n.blockClass,
                      s = n.blockSelector,
                      u = n.maskTextClass,
                      f = n.maskTextSelector,
                      h = n.inlineStylesheet,
                      p = n.maskInputOptions,
                      m = void 0 === p ? {} : p,
                      g = n.maskTextFn,
                      y = n.maskInputFn,
                      b = n.recordCanvas,
                      S = n.keepIframeSrcFn;
                  if (a.__sn) {
                      var x = a.__sn.id;
                      r = 1 === x ? void 0 : x
                  }
                  switch (e.nodeType) {
                      case e.DOCUMENT_NODE:
                          return {
                              type: t.Document, childNodes: [], rootId: r
                          };
                      case e.DOCUMENT_TYPE_NODE:
                          return {
                              type: t.DocumentType, name: e.name, publicId: e.publicId, systemId: e.systemId, rootId: r
                          };
                      case e.ELEMENT_NODE:
                          for (var E = function(e, t, n) {
                                  if ("string" == typeof t) {
                                      if (e.classList.contains(t)) return !0
                                  } else
                                      for (var r = 0; r < e.classList.length; r++) {
                                          var i = e.classList[r];
                                          if (t.test(i)) return !0
                                      }
                                  return !!n && e.matches(n)
                              }(e, o, s), T = function(e) {
                                  if (e instanceof HTMLFormElement) return "form";
                                  var t = e.tagName.toLowerCase().trim();
                                  return c.test(t) ? "div" : t
                              }(e), C = {}, I = 0, M = Array.from(e.attributes); I < M.length; I++) {
                              var N = M[I],
                                  O = N.name,
                                  D = N.value;
                              C[O] = _(a, T, O, D)
                          }
                          if ("link" === T && h) {
                              var A, R = Array.from(a.styleSheets).find((function(t) {
                                  return t.href === e.href
                              }));
                              (A = d(R)) && (delete C.rel, delete C.href, C._cssText = v(A, R.href))
                          }
                          if ("style" === T && e.sheet && !(e.innerText || e.textContent || "").trim().length && (A = d(e.sheet)) && (C._cssText = v(A, w())), "input" !== T && "textarea" !== T && "select" !== T || (D = e.value, "radio" !== C.type && "checkbox" !== C.type && "submit" !== C.type && "button" !== C.type && D ? C.value = l({
                                  type: C.type,
                                  tagName: T,
                                  value: D,
                                  maskInputOptions: m,
                                  maskInputFn: y
                              }) : e.checked && (C.checked = e.checked)), "option" === T) {
                              var $ = e.parentElement;
                              C.value === $.value && (C.selected = e.selected)
                          }
                          if ("canvas" === T && b && (C.rr_dataURL = e.toDataURL()), "audio" !== T && "video" !== T || (C.rr_mediaState = e.paused ? "paused" : "played", C.rr_mediaCurrentTime = e.currentTime), e.scrollLeft && (C.rr_scrollLeft = e.scrollLeft), e.scrollTop && (C.rr_scrollTop = e.scrollTop), E) {
                              var F = e.getBoundingClientRect(),
                                  z = F.width,
                                  L = F.height;
                              C = {
                                  class: C.class,
                                  rr_width: z + "px",
                                  rr_height: L + "px"
                              }
                          }
                          return "iframe" !== T || S(C.src) || delete C.src, {
                              type: t.Element,
                              tagName: T,
                              attributes: C,
                              childNodes: [],
                              isSVG: (i = e, "svg" === i.tagName || i instanceof SVGElement || void 0),
                              needBlock: E,
                              rootId: r
                          };
                      case e.TEXT_NODE:
                          var P = e.parentNode && e.parentNode.tagName,
                              j = e.textContent,
                              B = "STYLE" === P || void 0,
                              U = "SCRIPT" === P || void 0;
                          return B && j && (j = v(j, w())), U && (j = "SCRIPT_PLACEHOLDER"), !B && !U && k(e, u, f) && j && (j = g ? g(j) : j.replace(/[\S]/g, "*")), {
                              type: t.Text,
                              textContent: j || "",
                              isStyle: B,
                              rootId: r
                          };
                      case e.CDATA_SECTION_NODE:
                          return {
                              type: t.CDATA, textContent: "", rootId: r
                          };
                      case e.COMMENT_NODE:
                          return {
                              type: t.Comment, textContent: e.textContent || "", rootId: r
                          };
                      default:
                          return !1
                  }
              }
  
              function x(e) {
                  return void 0 === e ? "" : e.toLowerCase()
              }
  
              function E(e, n) {
                  var r, i = n.doc,
                      a = n.map,
                      l = n.blockClass,
                      c = n.blockSelector,
                      d = n.maskTextClass,
                      f = n.maskTextSelector,
                      h = n.skipChild,
                      p = void 0 !== h && h,
                      m = n.inlineStylesheet,
                      v = void 0 === m || m,
                      g = n.maskInputOptions,
                      y = void 0 === g ? {} : g,
                      b = n.maskTextFn,
                      w = n.maskInputFn,
                      _ = n.slimDOMOptions,
                      k = n.recordCanvas,
                      T = void 0 !== k && k,
                      C = n.onSerialize,
                      I = n.onIframeLoad,
                      M = n.iframeLoadTimeout,
                      N = void 0 === M ? 5e3 : M,
                      O = n.keepIframeSrcFn,
                      D = void 0 === O ? function() {
                          return !1
                      } : O,
                      A = n.preserveWhiteSpace,
                      R = void 0 === A || A,
                      $ = S(e, {
                          doc: i,
                          blockClass: l,
                          blockSelector: c,
                          maskTextClass: d,
                          maskTextSelector: f,
                          inlineStylesheet: v,
                          maskInputOptions: y,
                          maskTextFn: b,
                          maskInputFn: w,
                          recordCanvas: T,
                          keepIframeSrcFn: D
                      });
                  if (!$) return console.warn(e, "not serialized"), null;
                  r = "__sn" in e ? e.__sn.id : ! function(e, n) {
                      if (n.comment && e.type === t.Comment) return !0;
                      if (e.type === t.Element) {
                          if (n.script && ("script" === e.tagName || "link" === e.tagName && "preload" === e.attributes.rel && "script" === e.attributes.as || "link" === e.tagName && "prefetch" === e.attributes.rel && "string" == typeof e.attributes.href && e.attributes.href.endsWith(".js"))) return !0;
                          if (n.headFavicon && ("link" === e.tagName && "shortcut icon" === e.attributes.rel || "meta" === e.tagName && (x(e.attributes.name).match(/^msapplication-tile(image|color)$/) || "application-name" === x(e.attributes.name) || "icon" === x(e.attributes.rel) || "apple-touch-icon" === x(e.attributes.rel) || "shortcut icon" === x(e.attributes.rel)))) return !0;
                          if ("meta" === e.tagName) {
                              if (n.headMetaDescKeywords && x(e.attributes.name).match(/^description|keywords$/)) return !0;
                              if (n.headMetaSocial && (x(e.attributes.property).match(/^(og|twitter|fb):/) || x(e.attributes.name).match(/^(og|twitter):/) || "pinterest" === x(e.attributes.name))) return !0;
                              if (n.headMetaRobots && ("robots" === x(e.attributes.name) || "googlebot" === x(e.attributes.name) || "bingbot" === x(e.attributes.name))) return !0;
                              if (n.headMetaHttpEquiv && void 0 !== e.attributes["http-equiv"]) return !0;
                              if (n.headMetaAuthorship && ("author" === x(e.attributes.name) || "generator" === x(e.attributes.name) || "framework" === x(e.attributes.name) || "publisher" === x(e.attributes.name) || "progid" === x(e.attributes.name) || x(e.attributes.property).match(/^article:/) || x(e.attributes.property).match(/^product:/))) return !0;
                              if (n.headMetaVerification && ("google-site-verification" === x(e.attributes.name) || "yandex-verification" === x(e.attributes.name) || "csrf-token" === x(e.attributes.name) || "p:domain_verify" === x(e.attributes.name) || "verify-v1" === x(e.attributes.name) || "verification" === x(e.attributes.name) || "shopify-checkout-api-token" === x(e.attributes.name))) return !0
                          }
                      }
                      return !1
                  }($, _) && (R || $.type !== t.Text || $.isStyle || $.textContent.replace(/^\s+|\s+$/gm, "").length) ? u++ : -2;
                  var F = Object.assign($, {
                      id: r
                  });
                  if (e.__sn = F, -2 === r) return null;
                  a[r] = e, C && C(e);
                  var z = !p;
                  if (F.type === t.Element && (z = z && !F.needBlock, delete F.needBlock), (F.type === t.Document || F.type === t.Element) && z) {
                      _.headWhitespace && $.type === t.Element && "head" === $.tagName && (R = !1);
                      for (var L = {
                              doc: i,
                              map: a,
                              blockClass: l,
                              blockSelector: c,
                              maskTextClass: d,
                              maskTextSelector: f,
                              skipChild: p,
                              inlineStylesheet: v,
                              maskInputOptions: y,
                              maskTextFn: b,
                              maskInputFn: w,
                              slimDOMOptions: _,
                              recordCanvas: T,
                              preserveWhiteSpace: R,
                              onSerialize: C,
                              onIframeLoad: I,
                              iframeLoadTimeout: N,
                              keepIframeSrcFn: D
                          }, P = 0, j = Array.from(e.childNodes); P < j.length; P++)(H = E(j[P], L)) && F.childNodes.push(H);
                      if (o(e) && e.shadowRoot) {
                          F.isShadowHost = !0;
                          for (var B = 0, U = Array.from(e.shadowRoot.childNodes); B < U.length; B++) {
                              var H;
                              (H = E(U[B], L)) && (H.isShadow = !0, F.childNodes.push(H))
                          }
                      }
                  }
                  return e.parentNode && s(e.parentNode) && (F.isShadow = !0), F.type === t.Element && "iframe" === F.tagName && function(e, t, n) {
                      var r = e.contentWindow;
                      if (r) {
                          var i, a = !1;
                          try {
                              i = r.document.readyState
                          } catch (e) {
                              return
                          }
                          if ("complete" === i) "about:blank" === r.location.href && "about:blank" !== e.src && "" !== e.src ? e.addEventListener("load", t) : setTimeout(t, 0);
                          else {
                              var o = setTimeout((function() {
                                  a || (t(), a = !0)
                              }), n);
                              e.addEventListener("load", (function() {
                                  clearTimeout(o), a = !0, t()
                              }))
                          }
                      }
                  }(e, (function() {
                      var t = e.contentDocument;
                      if (t && I) {
                          var n = E(t, {
                              doc: t,
                              map: a,
                              blockClass: l,
                              blockSelector: c,
                              maskTextClass: d,
                              maskTextSelector: f,
                              skipChild: !1,
                              inlineStylesheet: v,
                              maskInputOptions: y,
                              maskTextFn: b,
                              maskInputFn: w,
                              slimDOMOptions: _,
                              recordCanvas: T,
                              preserveWhiteSpace: R,
                              onSerialize: C,
                              onIframeLoad: I,
                              iframeLoadTimeout: N,
                              keepIframeSrcFn: D
                          });
                          n && I(e, n)
                      }
                  }), N), F
              }
              var T = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
  
              function C(e) {
                  return e ? e.replace(/^\s+|\s+$/g, "") : ""
              }
              var I, M, N, O, D, A = {
                      script: "noscript",
                      altglyph: "altGlyph",
                      altglyphdef: "altGlyphDef",
                      altglyphitem: "altGlyphItem",
                      animatecolor: "animateColor",
                      animatemotion: "animateMotion",
                      animatetransform: "animateTransform",
                      clippath: "clipPath",
                      feblend: "feBlend",
                      fecolormatrix: "feColorMatrix",
                      fecomponenttransfer: "feComponentTransfer",
                      fecomposite: "feComposite",
                      feconvolvematrix: "feConvolveMatrix",
                      fediffuselighting: "feDiffuseLighting",
                      fedisplacementmap: "feDisplacementMap",
                      fedistantlight: "feDistantLight",
                      fedropshadow: "feDropShadow",
                      feflood: "feFlood",
                      fefunca: "feFuncA",
                      fefuncb: "feFuncB",
                      fefuncg: "feFuncG",
                      fefuncr: "feFuncR",
                      fegaussianblur: "feGaussianBlur",
                      feimage: "feImage",
                      femerge: "feMerge",
                      femergenode: "feMergeNode",
                      femorphology: "feMorphology",
                      feoffset: "feOffset",
                      fepointlight: "fePointLight",
                      fespecularlighting: "feSpecularLighting",
                      fespotlight: "feSpotLight",
                      fetile: "feTile",
                      feturbulence: "feTurbulence",
                      foreignobject: "foreignObject",
                      glyphref: "glyphRef",
                      lineargradient: "linearGradient",
                      radialgradient: "radialGradient"
                  },
                  R = /([^\\]):hover/,
                  $ = new RegExp(R, "g");
  
              function F(e) {
                  var t = function(e, t) {
                      void 0 === t && (t = {});
                      var n = 1,
                          r = 1;
  
                      function i(e) {
                          var t = e.match(/\n/g);
                          t && (n += t.length);
                          var i = e.lastIndexOf("\n");
                          r = -1 === i ? r + e.length : e.length - i
                      }
  
                      function a() {
                          var e = {
                              line: n,
                              column: r
                          };
                          return function(t) {
                              return t.position = new o(e), h(), t
                          }
                      }
                      var o = function(e) {
                          this.start = e, this.end = {
                              line: n,
                              column: r
                          }, this.source = t.source
                      };
                      o.prototype.content = e;
                      var s = [];
  
                      function l(i) {
                          var a = new Error(t.source + ":" + n + ":" + r + ": " + i);
                          if (a.reason = i, a.filename = t.source, a.line = n, a.column = r, a.source = e, !t.silent) throw a;
                          s.push(a)
                      }
  
                      function u() {
                          return f(/^{\s*/)
                      }
  
                      function c() {
                          return f(/^}/)
                      }
  
                      function d() {
                          var t, n = [];
                          for (h(), p(n); e.length && "}" !== e.charAt(0) && (t = E() || I());) !1 !== t && (n.push(t), p(n));
                          return n
                      }
  
                      function f(t) {
                          var n = t.exec(e);
                          if (n) {
                              var r = n[0];
                              return i(r), e = e.slice(r.length), n
                          }
                      }
  
                      function h() {
                          f(/^\s*/)
                      }
  
                      function p(e) {
                          var t;
                          for (void 0 === e && (e = []); t = m();) !1 !== t && e.push(t), t = m();
                          return e
                      }
  
                      function m() {
                          var t = a();
                          if ("/" === e.charAt(0) && "*" === e.charAt(1)) {
                              for (var n = 2;
                                  "" !== e.charAt(n) && ("*" !== e.charAt(n) || "/" !== e.charAt(n + 1));) ++n;
                              if (n += 2, "" === e.charAt(n - 1)) return l("End of comment missing");
                              var o = e.slice(2, n - 2);
                              return r += 2, i(o), e = e.slice(n), r += 2, t({
                                  type: "comment",
                                  comment: o
                              })
                          }
                      }
  
                      function v() {
                          var e = f(/^([^{]+)/);
                          if (e) return C(e[0]).replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, "").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, (function(e) {
                              return e.replace(/,/g, "‌")
                          })).split(/\s*(?![^(]*\)),\s*/).map((function(e) {
                              return e.replace(/\u200C/g, ",")
                          }))
                      }
  
                      function g() {
                          var e = a(),
                              t = f(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
                          if (t) {
                              var n = C(t[0]);
                              if (!f(/^:\s*/)) return l("property missing ':'");
                              var r = f(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/),
                                  i = e({
                                      type: "declaration",
                                      property: n.replace(T, ""),
                                      value: r ? C(r[0]).replace(T, "") : ""
                                  });
                              return f(/^[;\s]*/), i
                          }
                      }
  
                      function y() {
                          var e, t = [];
                          if (!u()) return l("missing '{'");
                          for (p(t); e = g();) !1 !== e && (t.push(e), p(t)), e = g();
                          return c() ? t : l("missing '}'")
                      }
  
                      function b() {
                          for (var e, t = [], n = a(); e = f(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);) t.push(e[1]), f(/^,\s*/);
                          if (t.length) return n({
                              type: "keyframe",
                              values: t,
                              declarations: y()
                          })
                      }
                      var w, _ = x("import"),
                          k = x("charset"),
                          S = x("namespace");
  
                      function x(e) {
                          var t = new RegExp("^@" + e + "\\s*([^;]+);");
                          return function() {
                              var n = a(),
                                  r = f(t);
                              if (r) {
                                  var i = {
                                      type: e
                                  };
                                  return i[e] = r[1].trim(), n(i)
                              }
                          }
                      }
  
                      function E() {
                          if ("@" === e[0]) return function() {
                              var e = a(),
                                  t = f(/^@([-\w]+)?keyframes\s*/);
                              if (t) {
                                  var n = t[1];
                                  if (!(t = f(/^([-\w]+)\s*/))) return l("@keyframes missing name");
                                  var r, i = t[1];
                                  if (!u()) return l("@keyframes missing '{'");
                                  for (var o = p(); r = b();) o.push(r), o = o.concat(p());
                                  return c() ? e({
                                      type: "keyframes",
                                      name: i,
                                      vendor: n,
                                      keyframes: o
                                  }) : l("@keyframes missing '}'")
                              }
                          }() || function() {
                              var e = a(),
                                  t = f(/^@media *([^{]+)/);
                              if (t) {
                                  var n = C(t[1]);
                                  if (!u()) return l("@media missing '{'");
                                  var r = p().concat(d());
                                  return c() ? e({
                                      type: "media",
                                      media: n,
                                      rules: r
                                  }) : l("@media missing '}'")
                              }
                          }() || function() {
                              var e = a(),
                                  t = f(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
                              if (t) return e({
                                  type: "custom-media",
                                  name: C(t[1]),
                                  media: C(t[2])
                              })
                          }() || function() {
                              var e = a(),
                                  t = f(/^@supports *([^{]+)/);
                              if (t) {
                                  var n = C(t[1]);
                                  if (!u()) return l("@supports missing '{'");
                                  var r = p().concat(d());
                                  return c() ? e({
                                      type: "supports",
                                      supports: n,
                                      rules: r
                                  }) : l("@supports missing '}'")
                              }
                          }() || _() || k() || S() || function() {
                              var e = a(),
                                  t = f(/^@([-\w]+)?document *([^{]+)/);
                              if (t) {
                                  var n = C(t[1]),
                                      r = C(t[2]);
                                  if (!u()) return l("@document missing '{'");
                                  var i = p().concat(d());
                                  return c() ? e({
                                      type: "document",
                                      document: r,
                                      vendor: n,
                                      rules: i
                                  }) : l("@document missing '}'")
                              }
                          }() || function() {
                              var e = a();
                              if (f(/^@page */)) {
                                  var t = v() || [];
                                  if (!u()) return l("@page missing '{'");
                                  for (var n, r = p(); n = g();) r.push(n), r = r.concat(p());
                                  return c() ? e({
                                      type: "page",
                                      selectors: t,
                                      declarations: r
                                  }) : l("@page missing '}'")
                              }
                          }() || function() {
                              var e = a();
                              if (f(/^@host\s*/)) {
                                  if (!u()) return l("@host missing '{'");
                                  var t = p().concat(d());
                                  return c() ? e({
                                      type: "host",
                                      rules: t
                                  }) : l("@host missing '}'")
                              }
                          }() || function() {
                              var e = a();
                              if (f(/^@font-face\s*/)) {
                                  if (!u()) return l("@font-face missing '{'");
                                  for (var t, n = p(); t = g();) n.push(t), n = n.concat(p());
                                  return c() ? e({
                                      type: "font-face",
                                      declarations: n
                                  }) : l("@font-face missing '}'")
                              }
                          }()
                      }
  
                      function I() {
                          var e = a(),
                              t = v();
                          return t ? (p(), e({
                              type: "rule",
                              selectors: t,
                              declarations: y()
                          })) : l("selector missing")
                      }
                      return function e(t, n) {
                          for (var r = t && "string" == typeof t.type, i = r ? t : n, a = 0, o = Object.keys(t); a < o.length; a++) {
                              var s = t[o[a]];
                              Array.isArray(s) ? s.forEach((function(t) {
                                  e(t, i)
                              })) : s && "object" == typeof s && e(s, i)
                          }
                          return r && Object.defineProperty(t, "parent", {
                              configurable: !0,
                              writable: !0,
                              enumerable: !1,
                              value: n || null
                          }), t
                      }((w = d(), {
                          type: "stylesheet",
                          stylesheet: {
                              source: t.source,
                              rules: w,
                              parsingErrors: s
                          }
                      }))
                  }(e, {
                      silent: !0
                  });
                  if (!t.stylesheet) return e;
                  var n = [];
                  if (t.stylesheet.rules.forEach((function(e) {
                          "selectors" in e && (e.selectors || []).forEach((function(e) {
                              R.test(e) && n.push(e)
                          }))
                      })), 0 === n.length) return e;
                  var r = new RegExp(n.filter((function(e, t) {
                      return n.indexOf(e) === t
                  })).sort((function(e, t) {
                      return t.length - e.length
                  })).map((function(e) {
                      return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                  })).join("|"), "g");
                  return e.replace(r, (function(e) {
                      var t = e.replace($, "$1.\\:hover");
                      return e + ", " + t
                  }))
              }
  
              function z(e, n) {
                  var r = n.doc,
                      i = n.map,
                      a = n.skipChild,
                      s = void 0 !== a && a,
                      l = n.hackCss,
                      u = void 0 === l || l,
                      c = n.afterAppend,
                      d = function(e, n) {
                          var r = n.doc,
                              i = n.hackCss;
                          switch (e.type) {
                              case t.Document:
                                  return r.implementation.createDocument(null, "", null);
                              case t.DocumentType:
                                  return r.implementation.createDocumentType(e.name || "html", e.publicId, e.systemId);
                              case t.Element:
                                  var a, o = function(e) {
                                      var t = A[e.tagName] ? A[e.tagName] : e.tagName;
                                      return "link" === t && e.attributes._cssText && (t = "style"), t
                                  }(e);
                                  a = e.isSVG ? r.createElementNS("http://www.w3.org/2000/svg", o) : r.createElement(o);
                                  var s = function(t) {
                                      if (!e.attributes.hasOwnProperty(t)) return "continue";
                                      var n = e.attributes[t];
                                      if (n = "boolean" == typeof n || "number" == typeof n ? "" : n, t.startsWith("rr_")) {
                                          if ("canvas" === o && "rr_dataURL" === t) {
                                              var s = document.createElement("img");
                                              s.src = n, s.onload = function() {
                                                  var e = a.getContext("2d");
                                                  e && e.drawImage(s, 0, 0, s.width, s.height)
                                              }
                                          }
                                          if ("rr_width" === t && (a.style.width = n), "rr_height" === t && (a.style.height = n), "rr_mediaCurrentTime" === t && (a.currentTime = e.attributes.rr_mediaCurrentTime), "rr_mediaState" === t) switch (n) {
                                              case "played":
                                                  a.play().catch((function(e) {
                                                      return console.warn("media playback error", e)
                                                  }));
                                                  break;
                                              case "paused":
                                                  a.pause()
                                          }
                                      } else {
                                          var l = "textarea" === o && "value" === t,
                                              u = "style" === o && "_cssText" === t;
                                          if (u && i && (n = F(n)), l || u) {
                                              for (var c = r.createTextNode(n), d = 0, f = Array.from(a.childNodes); d < f.length; d++) {
                                                  var h = f[d];
                                                  h.nodeType === a.TEXT_NODE && a.removeChild(h)
                                              }
                                              return a.appendChild(c), "continue"
                                          }
                                          try {
                                              if (e.isSVG && "xlink:href" === t) a.setAttributeNS("http://www.w3.org/1999/xlink", t, n);
                                              else if ("onload" === t || "onclick" === t || "onmouse" === t.substring(0, 7)) a.setAttribute("_" + t, n);
                                              else {
                                                  if ("meta" === o && "Content-Security-Policy" === e.attributes["http-equiv"] && "content" === t) return a.setAttribute("csp-content", n), "continue";
                                                  "link" === o && "preload" === e.attributes.rel && "script" === e.attributes.as || "link" === o && "prefetch" === e.attributes.rel && "string" == typeof e.attributes.href && e.attributes.href.endsWith(".js") || a.setAttribute(t, n)
                                              }
                                          } catch (e) {}
                                      }
                                  };
                                  for (var l in e.attributes) s(l);
                                  if (e.isShadowHost)
                                      if (a.shadowRoot)
                                          for (; a.shadowRoot.firstChild;) a.shadowRoot.removeChild(a.shadowRoot.firstChild);
                                      else a.attachShadow({
                                          mode: "open"
                                      });
                                  return a;
                              case t.Text:
                                  return r.createTextNode(e.isStyle && i ? F(e.textContent) : e.textContent);
                              case t.CDATA:
                                  return r.createCDATASection(e.textContent);
                              case t.Comment:
                                  return r.createComment(e.textContent);
                              default:
                                  return null
                          }
                      }(e, {
                          doc: r,
                          hackCss: u
                      });
                  if (!d) return null;
                  if (e.rootId && console.assert(i[e.rootId] === r, "Target document should has the same root id."), e.type === t.Document && (r.close(), r.open(), d = r), d.__sn = e, i[e.id] = d, (e.type === t.Document || e.type === t.Element) && !s)
                      for (var f = 0, h = e.childNodes; f < h.length; f++) {
                          var p = h[f],
                              m = z(p, {
                                  doc: r,
                                  map: i,
                                  skipChild: !1,
                                  hackCss: u,
                                  afterAppend: c
                              });
                          m ? (p.isShadow && o(d) && d.shadowRoot ? d.shadowRoot.appendChild(m) : d.appendChild(m), c && c(m)) : console.warn("Failed to rebuild", p)
                      }
                  return d
              }
  
              function L(e, n) {
                  var r = n.doc,
                      i = n.onVisit,
                      a = n.hackCss,
                      o = {},
                      s = z(e, {
                          doc: r,
                          map: o,
                          skipChild: !1,
                          hackCss: void 0 === a || a,
                          afterAppend: n.afterAppend
                      });
                  return function(e, t) {
                      for (var n in e) e[n] && t(e[n])
                  }(o, (function(e) {
                      i && i(e),
                          function(e) {
                              var n = e.__sn;
                              if (n.type === t.Element) {
                                  var r = e;
                                  for (var i in n.attributes)
                                      if (n.attributes.hasOwnProperty(i) && i.startsWith("rr_")) {
                                          var a = n.attributes[i];
                                          "rr_scrollLeft" === i && (r.scrollLeft = a), "rr_scrollTop" === i && (r.scrollTop = a)
                                      }
                              }
                          }(e)
                  })), [s, o]
              }
  
              function P(e, t, n) {
                  void 0 === n && (n = document);
                  var r = {
                      capture: !0,
                      passive: !0
                  };
                  return n.addEventListener(e, t, r),
                      function() {
                          return n.removeEventListener(e, t, r)
                      }
              }(I = e.EventType || (e.EventType = {}))[I.DomContentLoaded = 0] = "DomContentLoaded", I[I.Load = 1] = "Load", I[I.FullSnapshot = 2] = "FullSnapshot", I[I.IncrementalSnapshot = 3] = "IncrementalSnapshot", I[I.Meta = 4] = "Meta", I[I.Custom = 5] = "Custom", I[I.Plugin = 6] = "Plugin", (M = e.IncrementalSource || (e.IncrementalSource = {}))[M.Mutation = 0] = "Mutation", M[M.MouseMove = 1] = "MouseMove", M[M.MouseInteraction = 2] = "MouseInteraction", M[M.Scroll = 3] = "Scroll", M[M.ViewportResize = 4] = "ViewportResize", M[M.Input = 5] = "Input", M[M.TouchMove = 6] = "TouchMove", M[M.MediaInteraction = 7] = "MediaInteraction", M[M.StyleSheetRule = 8] = "StyleSheetRule", M[M.CanvasMutation = 9] = "CanvasMutation", M[M.Font = 10] = "Font", M[M.Log = 11] = "Log", M[M.Drag = 12] = "Drag", (N = e.MouseInteractions || (e.MouseInteractions = {}))[N.MouseUp = 0] = "MouseUp", N[N.MouseDown = 1] = "MouseDown", N[N.Click = 2] = "Click", N[N.ContextMenu = 3] = "ContextMenu", N[N.DblClick = 4] = "DblClick", N[N.Focus = 5] = "Focus", N[N.Blur = 6] = "Blur", N[N.TouchStart = 7] = "TouchStart", N[N.TouchMove_Departed = 8] = "TouchMove_Departed", N[N.TouchEnd = 9] = "TouchEnd",
                  function(e) {
                      e[e.Play = 0] = "Play", e[e.Pause = 1] = "Pause", e[e.Seeked = 2] = "Seeked"
                  }(O || (O = {})), (D = e.ReplayerEvents || (e.ReplayerEvents = {})).Start = "start", D.Pause = "pause", D.Resume = "resume", D.Resize = "resize", D.Finish = "finish", D.FullsnapshotRebuilded = "fullsnapshot-rebuilded", D.LoadStylesheetStart = "load-stylesheet-start", D.LoadStylesheetEnd = "load-stylesheet-end", D.SkipStart = "skip-start", D.SkipEnd = "skip-end", D.MouseInteraction = "mouse-interaction", D.EventCast = "event-cast", D.CustomEvent = "custom-event", D.Flush = "flush", D.StateChange = "state-change", D.PlayBack = "play-back";
              var j = "Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.";
  
              function B(e, t, n) {
                  void 0 === n && (n = {});
                  var r = null,
                      i = 0;
                  return function(a) {
                      var o = Date.now();
                      i || !1 !== n.leading || (i = o);
                      var s = t - (o - i),
                          l = this,
                          u = arguments;
                      s <= 0 || s > t ? (r && (window.clearTimeout(r), r = null), i = o, e.apply(l, u)) : r || !1 === n.trailing || (r = window.setTimeout((function() {
                          i = !1 === n.leading ? 0 : Date.now(), r = null, e.apply(l, u)
                      }), s))
                  }
              }
  
              function U(e, t, n, r, i) {
                  void 0 === i && (i = window);
                  var a = i.Object.getOwnPropertyDescriptor(e, t);
                  return i.Object.defineProperty(e, t, r ? n : {
                          set: function(e) {
                              var t = this;
                              setTimeout((function() {
                                  n.set.call(t, e)
                              }), 0), a && a.set && a.set.call(this, e)
                          }
                      }),
                      function() {
                          return U(e, t, a || {}, !0)
                      }
              }
  
              function H(e, t, n) {
                  try {
                      if (!(t in e)) return function() {};
                      var r = e[t],
                          i = n(r);
                      return "function" == typeof i && (i.prototype = i.prototype || {}, Object.defineProperties(i, {
                              __rrweb_original__: {
                                  enumerable: !1,
                                  value: r
                              }
                          })), e[t] = i,
                          function() {
                              e[t] = r
                          }
                  } catch (e) {
                      return function() {}
                  }
              }
  
              function Y() {
                  return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight
              }
  
              function q() {
                  return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth
              }
  
              function W(e, t) {
                  if (!e) return !1;
                  if (e.nodeType === e.ELEMENT_NODE) {
                      var n = !1;
                      return "string" == typeof t ? n = e.classList.contains(t) : e.classList.forEach((function(e) {
                          t.test(e) && (n = !0)
                      })), n || W(e.parentNode, t)
                  }
                  return e.nodeType, e.TEXT_NODE, W(e.parentNode, t)
              }
  
              function Z(e) {
                  return "__sn" in e && -2 === e.__sn.id
              }
  
              function V(e, t) {
                  if (s(e)) return !1;
                  var n = t.getId(e);
                  return !t.has(n) || (!e.parentNode || e.parentNode.nodeType !== e.DOCUMENT_NODE) && (!e.parentNode || V(e.parentNode, t))
              }
  
              function X(e) {
                  return Boolean(e.changedTouches)
              }
  
              function J(e) {
                  void 0 === e && (e = window), "NodeList" in e && !e.NodeList.prototype.forEach && (e.NodeList.prototype.forEach = Array.prototype.forEach), "DOMTokenList" in e && !e.DOMTokenList.prototype.forEach && (e.DOMTokenList.prototype.forEach = Array.prototype.forEach), Node.prototype.contains || (Node.prototype.contains = function(e) {
                      if (!(0 in arguments)) throw new TypeError("1 argument is required");
                      do {
                          if (this === e) return !0
                      } while (e = e && e.parentNode);
                      return !1
                  })
              }
  
              function K(t) {
                  switch (t.type) {
                      case e.EventType.DomContentLoaded:
                      case e.EventType.Load:
                      case e.EventType.Custom:
                          return !1;
                      case e.EventType.FullSnapshot:
                      case e.EventType.Meta:
                      case e.EventType.Plugin:
                          return !0
                  }
                  switch (t.data.source) {
                      case e.IncrementalSource.MouseMove:
                      case e.IncrementalSource.MouseInteraction:
                      case e.IncrementalSource.TouchMove:
                      case e.IncrementalSource.MediaInteraction:
                          return !1;
                      case e.IncrementalSource.ViewportResize:
                      case e.IncrementalSource.StyleSheetRule:
                      case e.IncrementalSource.Scroll:
                      case e.IncrementalSource.Input:
                          return !0
                  }
                  return !0
              }
              e.mirror = {
                  map: {},
                  getId: function() {
                      return console.error(j), -1
                  },
                  getNode: function() {
                      return console.error(j), null
                  },
                  removeNodeFromMap: function() {
                      console.error(j)
                  },
                  has: function() {
                      return console.error(j), !1
                  },
                  reset: function() {
                      console.error(j)
                  }
              }, "undefined" != typeof window && window.Proxy && window.Reflect && (e.mirror = new Proxy(e.mirror, {
                  get: function(e, t, n) {
                      return "map" === t && console.error(j), Reflect.get(e, t, n)
                  }
              }));
              var G = function() {
                  function t() {
                      this.reset()
                  }
                  return t.prototype.add = function(e) {
                      var t = this.indexes.get(e.parentId),
                          n = {
                              id: e.node.id,
                              mutation: e,
                              children: [],
                              texts: [],
                              attributes: []
                          };
                      t ? (n.parent = t, t.children[n.id] = n) : this.tree[n.id] = n, this.indexes.set(n.id, n)
                  }, t.prototype.remove = function(e, t) {
                      var n = this,
                          r = this.indexes.get(e.parentId),
                          i = this.indexes.get(e.id),
                          a = function(e) {
                              n.removeIdSet.add(e);
                              var r = t.getNode(e);
                              null == r || r.childNodes.forEach((function(e) {
                                  "__sn" in e && a(e.__sn.id)
                              }))
                          },
                          o = function(t) {
                              n.removeIdSet.add(t.id), Object.values(t.children).forEach((function(e) {
                                  return o(e)
                              }));
                              var r = n.indexes.get(t.id);
                              if (r) {
                                  var i = r.parent;
                                  i && (delete r.parent, delete i.children[r.id], n.indexes.delete(e.id))
                              }
                          };
                      i ? r ? (delete i.parent, delete r.children[i.id], this.indexes.delete(e.id), o(i)) : (delete this.tree[i.id], this.indexes.delete(i.id), o(i)) : (this.removeNodeMutations.push(e), a(e.id))
                  }, t.prototype.text = function(e) {
                      var t = this.indexes.get(e.id);
                      t ? t.texts.push(e) : this.textMutations.push(e)
                  }, t.prototype.attribute = function(e) {
                      var t = this.indexes.get(e.id);
                      t ? t.attributes.push(e) : this.attributeMutations.push(e)
                  }, t.prototype.scroll = function(e) {
                      this.scrollMap.set(e.id, e)
                  }, t.prototype.input = function(e) {
                      this.inputMap.set(e.id, e)
                  }, t.prototype.flush = function() {
                      var t, n, i, a, o = this,
                          s = this.tree,
                          l = this.removeNodeMutations,
                          u = this.textMutations,
                          c = this.attributeMutations,
                          d = {
                              source: e.IncrementalSource.Mutation,
                              removes: l,
                              texts: u,
                              attributes: c,
                              adds: []
                          },
                          f = function(e, t) {
                              t && o.removeIdSet.add(e.id), d.texts = d.texts.concat(t ? [] : e.texts).filter((function(e) {
                                  return !o.removeIdSet.has(e.id)
                              })), d.attributes = d.attributes.concat(t ? [] : e.attributes).filter((function(e) {
                                  return !o.removeIdSet.has(e.id)
                              })), o.removeIdSet.has(e.id) || o.removeIdSet.has(e.mutation.parentId) || t ? Object.values(e.children).forEach((function(e) {
                                  return f(e, !0)
                              })) : (d.adds.push(e.mutation), e.children && Object.values(e.children).forEach((function(e) {
                                  return f(e, !1)
                              })))
                          };
                      Object.values(s).forEach((function(e) {
                          return f(e, !1)
                      }));
                      try {
                          for (var h = r(this.scrollMap.keys()), p = h.next(); !p.done; p = h.next()) {
                              var m = p.value;
                              this.removeIdSet.has(m) && this.scrollMap.delete(m)
                          }
                      } catch (e) {
                          t = {
                              error: e
                          }
                      } finally {
                          try {
                              p && !p.done && (n = h.return) && n.call(h)
                          } finally {
                              if (t) throw t.error
                          }
                      }
                      try {
                          for (var v = r(this.inputMap.keys()), g = v.next(); !g.done; g = v.next()) m = g.value, this.removeIdSet.has(m) && this.inputMap.delete(m)
                      } catch (e) {
                          i = {
                              error: e
                          }
                      } finally {
                          try {
                              g && !g.done && (a = v.return) && a.call(v)
                          } finally {
                              if (i) throw i.error
                          }
                      }
                      var y = new Map(this.scrollMap),
                          b = new Map(this.inputMap);
                      return this.reset(), {
                          mutationData: d,
                          scrollMap: y,
                          inputMap: b
                      }
                  }, t.prototype.reset = function() {
                      this.tree = [], this.indexes = new Map, this.removeNodeMutations = [], this.textMutations = [], this.attributeMutations = [], this.removeIdSet = new Set, this.scrollMap = new Map, this.inputMap = new Map
                  }, t
              }();
  
              function Q(e) {
                  var t, n, i = {},
                      a = function(e, t) {
                          var n = {
                              value: e,
                              parent: t,
                              children: []
                          };
                          return i[e.node.id] = n, n
                      },
                      o = [];
                  try {
                      for (var s = r(e), l = s.next(); !l.done; l = s.next()) {
                          var u = l.value,
                              c = u.nextId,
                              d = u.parentId;
                          if (c && c in i) {
                              var f = i[c];
                              if (f.parent) {
                                  var h = f.parent.children.indexOf(f);
                                  f.parent.children.splice(h, 0, a(u, f.parent))
                              } else h = o.indexOf(f), o.splice(h, 0, a(u, null))
                          } else if (d in i) {
                              var p = i[d];
                              p.children.push(a(u, p))
                          } else o.push(a(u, null))
                      }
                  } catch (e) {
                      t = {
                          error: e
                      }
                  } finally {
                      try {
                          l && !l.done && (n = s.return) && n.call(s)
                      } finally {
                          if (t) throw t.error
                      }
                  }
                  return o
              }
  
              function ee(e, t) {
                  t(e.value);
                  for (var n = e.children.length - 1; n >= 0; n--) ee(e.children[n], t)
              }
  
              function te(e) {
                  return "__sn" in e && e.__sn.type === t.Element && "iframe" === e.__sn.tagName
              }
  
              function ne(e, t) {
                  var n, r, i = null === (r = null === (n = e.ownerDocument) || void 0 === n ? void 0 : n.defaultView) || void 0 === r ? void 0 : r.frameElement;
                  if (!i || i === t) return {
                      x: 0,
                      y: 0,
                      relativeScale: 1,
                      absoluteScale: 1
                  };
                  var a = i.getBoundingClientRect(),
                      o = ne(i, t),
                      s = a.height / i.clientHeight;
                  return {
                      x: a.x * o.relativeScale + o.x,
                      y: a.y * o.relativeScale + o.y,
                      relativeScale: s,
                      absoluteScale: o.absoluteScale * s
                  }
              }
  
              function re(e) {
                  var t;
                  return Boolean(null === (t = e) || void 0 === t ? void 0 : t.shadowRoot)
              }
              var ie = Object.freeze({
                  __proto__: null,
                  on: P,
                  createMirror: function() {
                      return {
                          map: {},
                          getId: function(e) {
                              return e.__sn ? e.__sn.id : -1
                          },
                          getNode: function(e) {
                              return this.map[e] || null
                          },
                          removeNodeFromMap: function(e) {
                              var t = this,
                                  n = e.__sn && e.__sn.id;
                              delete this.map[n], e.childNodes && e.childNodes.forEach((function(e) {
                                  return t.removeNodeFromMap(e)
                              }))
                          },
                          has: function(e) {
                              return this.map.hasOwnProperty(e)
                          },
                          reset: function() {
                              this.map = {}
                          }
                      }
                  },
                  get _mirror() {
                      return e.mirror
                  },
                  throttle: B,
                  hookSetter: U,
                  patch: H,
                  getWindowHeight: Y,
                  getWindowWidth: q,
                  isBlocked: W,
                  isIgnored: Z,
                  isAncestorRemoved: V,
                  isTouchEvent: X,
                  polyfill: J,
                  needCastInSyncMode: K,
                  TreeIndex: G,
                  queueToResolveTrees: Q,
                  iterateResolveTree: ee,
                  isIframeINode: te,
                  getBaseDimension: ne,
                  hasShadowRoot: re
              });
  
              function ae(e) {
                  return "__ln" in e
              }
              var oe = function() {
                      function e() {
                          this.length = 0, this.head = null
                      }
                      return e.prototype.get = function(e) {
                          if (e >= this.length) throw new Error("Position outside of list range");
                          for (var t = this.head, n = 0; n < e; n++) t = (null == t ? void 0 : t.next) || null;
                          return t
                      }, e.prototype.addNode = function(e) {
                          var t = {
                              value: e,
                              previous: null,
                              next: null
                          };
                          if (e.__ln = t, e.previousSibling && ae(e.previousSibling)) {
                              var n = e.previousSibling.__ln.next;
                              t.next = n, t.previous = e.previousSibling.__ln, e.previousSibling.__ln.next = t, n && (n.previous = t)
                          } else e.nextSibling && ae(e.nextSibling) && e.nextSibling.__ln.previous ? (n = e.nextSibling.__ln.previous, t.previous = n, t.next = e.nextSibling.__ln, e.nextSibling.__ln.previous = t, n && (n.next = t)) : (this.head && (this.head.previous = t), t.next = this.head, this.head = t);
                          this.length++
                      }, e.prototype.removeNode = function(e) {
                          var t = e.__ln;
                          this.head && (t.previous ? (t.previous.next = t.next, t.next && (t.next.previous = t.previous)) : (this.head = t.next, this.head && (this.head.previous = null)), e.__ln && delete e.__ln, this.length--)
                      }, e
                  }(),
                  se = function(e, t) {
                      return e + "@" + t
                  };
  
              function le(e) {
                  return "__sn" in e
              }
              var ue = function() {
                  function e() {
                      var e = this;
                      this.frozen = !1, this.locked = !1, this.texts = [], this.attributes = [], this.removes = [], this.mapRemoves = [], this.movedMap = {}, this.addedSet = new Set, this.movedSet = new Set, this.droppedSet = new Set, this.processMutations = function(t) {
                          t.forEach(e.processMutation), e.emit()
                      }, this.emit = function() {
                          var t, n, i, a;
                          if (!e.frozen && !e.locked) {
                              for (var o = [], l = new oe, u = function(t) {
                                      for (var n = t, r = -2; - 2 === r;) r = (n = n && n.nextSibling) && e.mirror.getId(n);
                                      return -1 === r && W(t.nextSibling, e.blockClass) && (r = null), r
                                  }, c = function(t) {
                                      var n, r = t.getRootNode ? null === (n = t.getRootNode()) || void 0 === n ? void 0 : n.host : null,
                                          i = !e.doc.contains(t) && !e.doc.contains(r);
                                      if (t.parentNode && !i) {
                                          var a = s(t.parentNode) ? e.mirror.getId(r) : e.mirror.getId(t.parentNode),
                                              c = u(t);
                                          if (-1 === a || -1 === c) return l.addNode(t);
                                          var d = E(t, {
                                              doc: e.doc,
                                              map: e.mirror.map,
                                              blockClass: e.blockClass,
                                              blockSelector: e.blockSelector,
                                              maskTextClass: e.maskTextClass,
                                              maskTextSelector: e.maskTextSelector,
                                              skipChild: !0,
                                              inlineStylesheet: e.inlineStylesheet,
                                              maskInputOptions: e.maskInputOptions,
                                              maskTextFn: e.maskTextFn,
                                              maskInputFn: e.maskInputFn,
                                              slimDOMOptions: e.slimDOMOptions,
                                              recordCanvas: e.recordCanvas,
                                              onSerialize: function(n) {
                                                  te(n) && e.iframeManager.addIframe(n), re(t) && e.shadowDomManager.addShadowRoot(t.shadowRoot, document)
                                              },
                                              onIframeLoad: function(t, n) {
                                                  e.iframeManager.attachIframe(t, n)
                                              }
                                          });
                                          d && o.push({
                                              parentId: a,
                                              nextId: c,
                                              node: d
                                          })
                                      }
                                  }; e.mapRemoves.length;) e.mirror.removeNodeFromMap(e.mapRemoves.shift());
                              try {
                                  for (var d = r(e.movedSet), f = d.next(); !f.done; f = d.next()) {
                                      var h = f.value;
                                      de(e.removes, h, e.mirror) && !e.movedSet.has(h.parentNode) || c(h)
                                  }
                              } catch (e) {
                                  t = {
                                      error: e
                                  }
                              } finally {
                                  try {
                                      f && !f.done && (n = d.return) && n.call(d)
                                  } finally {
                                      if (t) throw t.error
                                  }
                              }
                              try {
                                  for (var p = r(e.addedSet), m = p.next(); !m.done; m = p.next()) h = m.value, fe(e.droppedSet, h) || de(e.removes, h, e.mirror) ? fe(e.movedSet, h) ? c(h) : e.droppedSet.add(h) : c(h)
                              } catch (e) {
                                  i = {
                                      error: e
                                  }
                              } finally {
                                  try {
                                      m && !m.done && (a = p.return) && a.call(p)
                                  } finally {
                                      if (i) throw i.error
                                  }
                              }
                              for (var v = null; l.length;) {
                                  var g = null;
                                  if (v) {
                                      var y = e.mirror.getId(v.value.parentNode),
                                          b = u(v.value); - 1 !== y && -1 !== b && (g = v)
                                  }
                                  if (!g)
                                      for (var w = l.length - 1; w >= 0; w--) {
                                          var _ = l.get(w);
                                          if (y = e.mirror.getId(_.value.parentNode), b = u(_.value), -1 !== y && -1 !== b) {
                                              g = _;
                                              break
                                          }
                                      }
                                  if (!g) {
                                      for (; l.head;) l.removeNode(l.head.value);
                                      break
                                  }
                                  v = g.previous, l.removeNode(g.value), c(g.value)
                              }
                              var k = {
                                  texts: e.texts.map((function(t) {
                                      return {
                                          id: e.mirror.getId(t.node),
                                          value: t.value
                                      }
                                  })).filter((function(t) {
                                      return e.mirror.has(t.id)
                                  })),
                                  attributes: e.attributes.map((function(t) {
                                      return {
                                          id: e.mirror.getId(t.node),
                                          attributes: t.attributes
                                      }
                                  })).filter((function(t) {
                                      return e.mirror.has(t.id)
                                  })),
                                  removes: e.removes,
                                  adds: o
                              };
                              (k.texts.length || k.attributes.length || k.removes.length || k.adds.length) && (e.texts = [], e.attributes = [], e.removes = [], e.addedSet = new Set, e.movedSet = new Set, e.droppedSet = new Set, e.movedMap = {}, e.emissionCallback(k))
                          }
                      }, this.processMutation = function(t) {
                          if (!Z(t.target)) switch (t.type) {
                              case "characterData":
                                  var n = t.target.textContent;
                                  W(t.target, e.blockClass) || n === t.oldValue || e.texts.push({
                                      value: k(t.target, e.maskTextClass, e.maskTextSelector) && n ? e.maskTextFn ? e.maskTextFn(n) : n.replace(/[\S]/g, "*") : n,
                                      node: t.target
                                  });
                                  break;
                              case "attributes":
                                  var r = t.target;
                                  if (n = t.target.getAttribute(t.attributeName), "value" === t.attributeName && (n = l({
                                          maskInputOptions: e.maskInputOptions,
                                          tagName: t.target.tagName,
                                          type: t.target.getAttribute("type"),
                                          value: n,
                                          maskInputFn: e.maskInputFn
                                      })), W(t.target, e.blockClass) || n === t.oldValue) return;
                                  var i = e.attributes.find((function(e) {
                                      return e.node === t.target
                                  }));
                                  if (i || (i = {
                                          node: t.target,
                                          attributes: {}
                                      }, e.attributes.push(i)), "style" === t.attributeName) {
                                      var a = e.doc.createElement("span");
                                      t.oldValue && a.setAttribute("style", t.oldValue), void 0 !== i.attributes.style && null !== i.attributes.style || (i.attributes.style = {});
                                      for (var o = i.attributes.style, u = 0; u < r.style.length; u++) {
                                          var c = r.style[u],
                                              d = r.style.getPropertyValue(c),
                                              f = r.style.getPropertyPriority(c);
                                          d == a.style.getPropertyValue(c) && f == a.style.getPropertyPriority(c) || (o[c] = "" == f ? d : [d, f])
                                      }
                                      for (u = 0; u < a.style.length; u++) c = a.style[u], "" !== r.style.getPropertyValue(c) && r.style.getPropertyValue(c) || (o[c] = !1)
                                  } else i.attributes[t.attributeName] = _(e.doc, t.target.tagName, t.attributeName, n);
                                  break;
                              case "childList":
                                  t.addedNodes.forEach((function(n) {
                                      return e.genAdds(n, t.target)
                                  })), t.removedNodes.forEach((function(n) {
                                      var r = e.mirror.getId(n),
                                          i = s(t.target) ? e.mirror.getId(t.target.host) : e.mirror.getId(t.target);
                                      W(n, e.blockClass) || W(t.target, e.blockClass) || Z(n) || (e.addedSet.has(n) ? (ce(e.addedSet, n), e.droppedSet.add(n)) : e.addedSet.has(t.target) && -1 === r || V(t.target, e.mirror) || (e.movedSet.has(n) && e.movedMap[se(r, i)] ? ce(e.movedSet, n) : e.removes.push({
                                          parentId: i,
                                          id: r,
                                          isShadow: !!s(t.target) || void 0
                                      })), e.mapRemoves.push(n))
                                  }))
                          }
                      }, this.genAdds = function(t, n) {
                          if (!(W(t, e.blockClass) || n && W(n, e.blockClass))) {
                              if (le(t)) {
                                  if (Z(t)) return;
                                  e.movedSet.add(t);
                                  var r = null;
                                  n && le(n) && (r = n.__sn.id), r && (e.movedMap[se(t.__sn.id, r)] = !0)
                              } else e.addedSet.add(t), e.droppedSet.delete(t);
                              t.childNodes.forEach((function(t) {
                                  return e.genAdds(t)
                              }))
                          }
                      }
                  }
                  return e.prototype.init = function(e, t, n, r, i, a, o, s, l, u, c, d, f, h, p) {
                      this.blockClass = t, this.blockSelector = n, this.maskTextClass = r, this.maskTextSelector = i, this.inlineStylesheet = a, this.maskInputOptions = o, this.maskTextFn = s, this.maskInputFn = l, this.recordCanvas = u, this.slimDOMOptions = c, this.emissionCallback = e, this.doc = d, this.mirror = f, this.iframeManager = h, this.shadowDomManager = p
                  }, e.prototype.freeze = function() {
                      this.frozen = !0
                  }, e.prototype.unfreeze = function() {
                      this.frozen = !1, this.emit()
                  }, e.prototype.isFrozen = function() {
                      return this.frozen
                  }, e.prototype.lock = function() {
                      this.locked = !0
                  }, e.prototype.unlock = function() {
                      this.locked = !1, this.emit()
                  }, e
              }();
  
              function ce(e, t) {
                  e.delete(t), t.childNodes.forEach((function(t) {
                      return ce(e, t)
                  }))
              }
  
              function de(e, t, n) {
                  var r = t.parentNode;
                  if (!r) return !1;
                  var i = n.getId(r);
                  return !!e.some((function(e) {
                      return e.id === i
                  })) || de(e, r, n)
              }
  
              function fe(e, t) {
                  var n = t.parentNode;
                  return !!n && (!!e.has(n) || fe(e, n))
              }
              var he = [];
  
              function pe(e) {
                  try {
                      if ("composedPath" in e) {
                          var t = e.composedPath();
                          if (t.length) return t[0]
                      } else if ("path" in e && e.path.length) return e.path[0];
                      return e.target
                  } catch (t) {
                      return e.target
                  }
              }
  
              function me(e, t, n, r, i, a, o, s, l, u, c, d, f, h, p, m) {
                  var v, g, y, b = new ue;
                  he.push(b), b.init(e, n, r, i, a, o, s, l, u, c, d, t, f, h, p);
                  var w = window.MutationObserver || window.__rrMutationObserver,
                      _ = null === (y = null === (g = null === (v = window) || void 0 === v ? void 0 : v.Zone) || void 0 === g ? void 0 : g.__symbol__) || void 0 === y ? void 0 : y.call(g, "MutationObserver");
                  _ && window[_] && (w = window[_]);
                  var k = new w(b.processMutations.bind(b));
                  return k.observe(m, {
                      attributes: !0,
                      attributeOldValue: !0,
                      characterData: !0,
                      characterDataOldValue: !0,
                      childList: !0,
                      subtree: !0
                  }), k
              }
  
              function ve(e, t, n, r, i) {
                  return P("scroll", B((function(i) {
                      var a = pe(i);
                      if (a && !W(a, r)) {
                          var o = n.getId(a);
                          if (a === t) {
                              var s = t.scrollingElement || t.documentElement;
                              e({
                                  id: o,
                                  x: s.scrollLeft,
                                  y: s.scrollTop
                              })
                          } else e({
                              id: o,
                              x: a.scrollLeft,
                              y: a.scrollTop
                          })
                      }
                  }), i.scroll || 100), t)
              }
  
              function ge(e, t) {
                  var r = n({}, e);
                  return t || delete r.userTriggered, r
              }
              var ye = ["INPUT", "TEXTAREA", "SELECT"],
                  be = new WeakMap;
  
              function we(t, i) {
                  var o, s;
                  void 0 === i && (i = {}),
                      function(e, t) {
                          var n = e.mutationCb,
                              r = e.mousemoveCb,
                              i = e.mouseInteractionCb,
                              o = e.scrollCb,
                              s = e.viewportResizeCb,
                              l = e.inputCb,
                              u = e.mediaInteractionCb,
                              c = e.styleSheetRuleCb,
                              d = e.canvasMutationCb,
                              f = e.fontCb;
                          e.mutationCb = function() {
                              for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
                              t.mutation && t.mutation.apply(t, a(e)), n.apply(void 0, a(e))
                          }, e.mousemoveCb = function() {
                              for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                              t.mousemove && t.mousemove.apply(t, a(e)), r.apply(void 0, a(e))
                          }, e.mouseInteractionCb = function() {
                              for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                              t.mouseInteraction && t.mouseInteraction.apply(t, a(e)), i.apply(void 0, a(e))
                          }, e.scrollCb = function() {
                              for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                              t.scroll && t.scroll.apply(t, a(e)), o.apply(void 0, a(e))
                          }, e.viewportResizeCb = function() {
                              for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                              t.viewportResize && t.viewportResize.apply(t, a(e)), s.apply(void 0, a(e))
                          }, e.inputCb = function() {
                              for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                              t.input && t.input.apply(t, a(e)), l.apply(void 0, a(e))
                          }, e.mediaInteractionCb = function() {
                              for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                              t.mediaInteaction && t.mediaInteaction.apply(t, a(e)), u.apply(void 0, a(e))
                          }, e.styleSheetRuleCb = function() {
                              for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                              t.styleSheetRule && t.styleSheetRule.apply(t, a(e)), c.apply(void 0, a(e))
                          }, e.canvasMutationCb = function() {
                              for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                              t.canvasMutation && t.canvasMutation.apply(t, a(e)), d.apply(void 0, a(e))
                          }, e.fontCb = function() {
                              for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                              t.font && t.font.apply(t, a(e)), f.apply(void 0, a(e))
                          }
                      }(t, i);
                  var u, c, d, f = me(t.mutationCb, t.doc, t.blockClass, t.blockSelector, t.maskTextClass, t.maskTextSelector, t.inlineStylesheet, t.maskInputOptions, t.maskTextFn, t.maskInputFn, t.recordCanvas, t.slimDOMOptions, t.mirror, t.iframeManager, t.shadowDomManager, t.doc),
                      h = function(t, n, r, i) {
                          if (!1 === n.mousemove) return function() {};
                          var a, o = "number" == typeof n.mousemove ? n.mousemove : 50,
                              s = "number" == typeof n.mousemoveCallback ? n.mousemoveCallback : 500,
                              l = [],
                              u = B((function(e) {
                                  var n = Date.now() - a;
                                  t(l.map((function(e) {
                                      return e.timeOffset -= n, e
                                  })), e), l = [], a = null
                              }), s),
                              c = B((function(t) {
                                  var n = pe(t),
                                      r = X(t) ? t.changedTouches[0] : t,
                                      o = r.clientX,
                                      s = r.clientY;
                                  a || (a = Date.now()), l.push({
                                      x: o,
                                      y: s,
                                      id: i.getId(n),
                                      timeOffset: Date.now() - a
                                  }), u(t instanceof DragEvent ? e.IncrementalSource.Drag : t instanceof MouseEvent ? e.IncrementalSource.MouseMove : e.IncrementalSource.TouchMove)
                              }), o, {
                                  trailing: !1
                              }),
                              d = [P("mousemove", c, r), P("touchmove", c, r), P("drag", c, r)];
                          return function() {
                              d.forEach((function(e) {
                                  return e()
                              }))
                          }
                      }(t.mousemoveCb, t.sampling, t.doc, t.mirror),
                      p = function(t, n, r, i, a) {
                          if (!1 === a.mouseInteraction) return function() {};
                          var o = !0 === a.mouseInteraction || void 0 === a.mouseInteraction ? {} : a.mouseInteraction,
                              s = [];
                          return Object.keys(e.MouseInteractions).filter((function(e) {
                                  return Number.isNaN(Number(e)) && !e.endsWith("_Departed") && !1 !== o[e]
                              })).forEach((function(a) {
                                  var o = a.toLowerCase(),
                                      l = function(n) {
                                          return function(a) {
                                              var o = pe(a);
                                              if (!W(o, i)) {
                                                  var s = X(a) ? a.changedTouches[0] : a;
                                                  if (s) {
                                                      var l = r.getId(o),
                                                          u = s.clientX,
                                                          c = s.clientY;
                                                      t({
                                                          type: e.MouseInteractions[n],
                                                          id: l,
                                                          x: u,
                                                          y: c
                                                      })
                                                  }
                                              }
                                          }
                                      }(a);
                                  s.push(P(o, l, n))
                              })),
                              function() {
                                  s.forEach((function(e) {
                                      return e()
                                  }))
                              }
                      }(t.mouseInteractionCb, t.doc, t.mirror, t.blockClass, t.sampling),
                      m = ve(t.scrollCb, t.doc, t.mirror, t.blockClass, t.sampling),
                      v = (u = t.viewportResizeCb, c = -1, d = -1, P("resize", B((function() {
                          var e = Y(),
                              t = q();
                          c === e && d === t || (u({
                              width: Number(t),
                              height: Number(e)
                          }), c = e, d = t)
                      }), 200), window)),
                      g = function(e, t, r, i, o, s, u, c, d) {
                          function f(e) {
                              var n = pe(e),
                                  r = e.isTrusted;
                              if (n && n.tagName && !(ye.indexOf(n.tagName) < 0) && !W(n, i)) {
                                  var a = n.type;
                                  if (!n.classList.contains(o)) {
                                      var c = n.value,
                                          f = !1;
                                      "radio" === a || "checkbox" === a ? f = n.checked : (s[n.tagName.toLowerCase()] || s[a]) && (c = l({
                                          maskInputOptions: s,
                                          tagName: n.tagName,
                                          type: a,
                                          value: c,
                                          maskInputFn: u
                                      })), h(n, ge({
                                          text: c,
                                          isChecked: f,
                                          userTriggered: r
                                      }, d));
                                      var p = n.name;
                                      "radio" === a && p && f && t.querySelectorAll('input[type="radio"][name="' + p + '"]').forEach((function(e) {
                                          e !== n && h(e, ge({
                                              text: e.value,
                                              isChecked: !f,
                                              userTriggered: !1
                                          }, d))
                                      }))
                                  }
                              }
                          }
  
                          function h(t, i) {
                              var a = be.get(t);
                              if (!a || a.text !== i.text || a.isChecked !== i.isChecked) {
                                  be.set(t, i);
                                  var o = r.getId(t);
                                  e(n(n({}, i), {
                                      id: o
                                  }))
                              }
                          }
                          var p = ("last" === c.input ? ["change"] : ["input", "change"]).map((function(e) {
                                  return P(e, f, t)
                              })),
                              m = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value"),
                              v = [
                                  [HTMLInputElement.prototype, "value"],
                                  [HTMLInputElement.prototype, "checked"],
                                  [HTMLSelectElement.prototype, "value"],
                                  [HTMLTextAreaElement.prototype, "value"],
                                  [HTMLSelectElement.prototype, "selectedIndex"]
                              ];
                          return m && m.set && p.push.apply(p, a(v.map((function(e) {
                                  return U(e[0], e[1], {
                                      set: function() {
                                          f({
                                              target: this
                                          })
                                      }
                                  })
                              })))),
                              function() {
                                  p.forEach((function(e) {
                                      return e()
                                  }))
                              }
                      }(t.inputCb, t.doc, t.mirror, t.blockClass, t.ignoreClass, t.maskInputOptions, t.maskInputFn, t.sampling, t.userTriggeredOnInput),
                      y = function(e, t, n) {
                          var r = function(r) {
                                  return function(i) {
                                      var a = pe(i);
                                      a && !W(a, t) && e({
                                          type: r,
                                          id: n.getId(a),
                                          currentTime: a.currentTime
                                      })
                                  }
                              },
                              i = [P("play", r(O.Play)), P("pause", r(O.Pause)), P("seeked", r(O.Seeked))];
                          return function() {
                              i.forEach((function(e) {
                                  return e()
                              }))
                          }
                      }(t.mediaInteractionCb, t.blockClass, t.mirror),
                      b = function(e, t) {
                          var n = CSSStyleSheet.prototype.insertRule;
                          CSSStyleSheet.prototype.insertRule = function(r, i) {
                              var a = t.getId(this.ownerNode);
                              return -1 !== a && e({
                                  id: a,
                                  adds: [{
                                      rule: r,
                                      index: i
                                  }]
                              }), n.apply(this, arguments)
                          };
                          var r = CSSStyleSheet.prototype.deleteRule;
                          return CSSStyleSheet.prototype.deleteRule = function(n) {
                                  var i = t.getId(this.ownerNode);
                                  return -1 !== i && e({
                                      id: i,
                                      removes: [{
                                          index: n
                                      }]
                                  }), r.apply(this, arguments)
                              },
                              function() {
                                  CSSStyleSheet.prototype.insertRule = n, CSSStyleSheet.prototype.deleteRule = r
                              }
                      }(t.styleSheetRuleCb, t.mirror),
                      w = t.recordCanvas ? function(e, t, n) {
                          var i, o, s = Object.getOwnPropertyNames(CanvasRenderingContext2D.prototype),
                              l = [],
                              u = function(r) {
                                  try {
                                      if ("function" != typeof CanvasRenderingContext2D.prototype[r]) return "continue";
                                      var i = H(CanvasRenderingContext2D.prototype, r, (function(i) {
                                          return function() {
                                              for (var o = this, s = [], l = 0; l < arguments.length; l++) s[l] = arguments[l];
                                              return W(this.canvas, t) || setTimeout((function() {
                                                  var t = a(s);
                                                  if ("drawImage" === r && t[0] && t[0] instanceof HTMLCanvasElement) {
                                                      var i = t[0],
                                                          l = i.getContext("2d"),
                                                          u = null == l ? void 0 : l.getImageData(0, 0, i.width, i.height),
                                                          c = null == u ? void 0 : u.data;
                                                      t[0] = JSON.stringify(c)
                                                  }
                                                  e({
                                                      id: n.getId(o.canvas),
                                                      property: r,
                                                      args: t
                                                  })
                                              }), 0), i.apply(this, s)
                                          }
                                      }));
                                      l.push(i)
                                  } catch (t) {
                                      var o = U(CanvasRenderingContext2D.prototype, r, {
                                          set: function(t) {
                                              e({
                                                  id: n.getId(this.canvas),
                                                  property: r,
                                                  args: [t],
                                                  setter: !0
                                              })
                                          }
                                      });
                                      l.push(o)
                                  }
                              };
                          try {
                              for (var c = r(s), d = c.next(); !d.done; d = c.next()) u(d.value)
                          } catch (e) {
                              i = {
                                  error: e
                              }
                          } finally {
                              try {
                                  d && !d.done && (o = c.return) && o.call(c)
                              } finally {
                                  if (i) throw i.error
                              }
                          }
                          return function() {
                              l.forEach((function(e) {
                                  return e()
                              }))
                          }
                      }(t.canvasMutationCb, t.blockClass, t.mirror) : function() {},
                      _ = t.collectFonts ? function(e) {
                          var t = [],
                              n = new WeakMap,
                              r = FontFace;
                          window.FontFace = function(e, t, i) {
                              var a = new r(e, t, i);
                              return n.set(a, {
                                  family: e,
                                  buffer: "string" != typeof t,
                                  descriptors: i,
                                  fontSource: "string" == typeof t ? t : JSON.stringify(Array.from(new Uint8Array(t)))
                              }), a
                          };
                          var i = H(document.fonts, "add", (function(t) {
                              return function(r) {
                                  return setTimeout((function() {
                                      var t = n.get(r);
                                      t && (e(t), n.delete(r))
                                  }), 0), t.apply(this, [r])
                              }
                          }));
                          return t.push((function() {
                                  window.FonFace = r
                              })), t.push(i),
                              function() {
                                  t.forEach((function(e) {
                                      return e()
                                  }))
                              }
                      }(t.fontCb) : function() {},
                      k = [];
                  try {
                      for (var S = r(t.plugins), x = S.next(); !x.done; x = S.next()) {
                          var E = x.value;
                          k.push(E.observer(E.callback, E.options))
                      }
                  } catch (e) {
                      o = {
                          error: e
                      }
                  } finally {
                      try {
                          x && !x.done && (s = S.return) && s.call(S)
                      } finally {
                          if (o) throw o.error
                      }
                  }
                  return function() {
                      f.disconnect(), h(), p(), m(), v(), g(), y(), b(), w(), _(), k.forEach((function(e) {
                          return e()
                      }))
                  }
              }
              var _e, ke, Se = function() {
                      function e(e) {
                          this.iframes = new WeakMap, this.mutationCb = e.mutationCb
                      }
                      return e.prototype.addIframe = function(e) {
                          this.iframes.set(e, !0)
                      }, e.prototype.addLoadListener = function(e) {
                          this.loadListener = e
                      }, e.prototype.attachIframe = function(e, t) {
                          var n;
                          this.mutationCb({
                              adds: [{
                                  parentId: e.__sn.id,
                                  nextId: null,
                                  node: t
                              }],
                              removes: [],
                              texts: [],
                              attributes: [],
                              isAttachIframe: !0
                          }), null === (n = this.loadListener) || void 0 === n || n.call(this, e)
                      }, e
                  }(),
                  xe = function() {
                      function e(e) {
                          this.mutationCb = e.mutationCb, this.scrollCb = e.scrollCb, this.bypassOptions = e.bypassOptions, this.mirror = e.mirror
                      }
                      return e.prototype.addShadowRoot = function(e, t) {
                          me(this.mutationCb, t, this.bypassOptions.blockClass, this.bypassOptions.blockSelector, this.bypassOptions.maskTextClass, this.bypassOptions.maskTextSelector, this.bypassOptions.inlineStylesheet, this.bypassOptions.maskInputOptions, this.bypassOptions.maskTextFn, this.bypassOptions.maskInputFn, this.bypassOptions.recordCanvas, this.bypassOptions.slimDOMOptions, this.mirror, this.bypassOptions.iframeManager, this, e), ve(this.scrollCb, e, this.mirror, this.bypassOptions.blockClass, this.bypassOptions.sampling)
                      }, e
                  }();
  
              function Ee(e) {
                  return n(n({}, e), {
                      timestamp: Date.now()
                  })
              }
              var Te = {
                  map: {},
                  getId: function(e) {
                      return e.__sn ? e.__sn.id : -1
                  },
                  getNode: function(e) {
                      return this.map[e] || null
                  },
                  removeNodeFromMap: function(e) {
                      var t = this,
                          n = e.__sn && e.__sn.id;
                      delete this.map[n], e.childNodes && e.childNodes.forEach((function(e) {
                          return t.removeNodeFromMap(e)
                      }))
                  },
                  has: function(e) {
                      return this.map.hasOwnProperty(e)
                  },
                  reset: function() {
                      this.map = {}
                  }
              };
  
              function Ce(t) {
                  void 0 === t && (t = {});
                  var r = t.emit,
                      a = t.checkoutEveryNms,
                      o = t.checkoutEveryNth,
                      s = t.blockClass,
                      l = void 0 === s ? "rr-block" : s,
                      u = t.blockSelector,
                      c = void 0 === u ? null : u,
                      d = t.ignoreClass,
                      f = void 0 === d ? "rr-ignore" : d,
                      h = t.maskTextClass,
                      p = void 0 === h ? "rr-mask" : h,
                      m = t.maskTextSelector,
                      v = void 0 === m ? null : m,
                      g = t.inlineStylesheet,
                      y = void 0 === g || g,
                      b = t.maskAllInputs,
                      w = t.maskInputOptions,
                      _ = t.slimDOMOptions,
                      k = t.maskInputFn,
                      S = t.maskTextFn,
                      x = t.hooks,
                      T = t.packFn,
                      C = t.sampling,
                      I = void 0 === C ? {} : C,
                      M = t.mousemoveWait,
                      N = t.recordCanvas,
                      O = void 0 !== N && N,
                      D = t.userTriggeredOnInput,
                      A = void 0 !== D && D,
                      R = t.collectFonts,
                      $ = void 0 !== R && R,
                      F = t.plugins,
                      z = t.keepIframeSrcFn,
                      L = void 0 === z ? function() {
                          return !1
                      } : z;
                  if (!r) throw new Error("emit function is required");
                  void 0 !== M && void 0 === I.mousemove && (I.mousemove = M);
                  var j, B = !0 === b ? {
                          color: !0,
                          date: !0,
                          "datetime-local": !0,
                          email: !0,
                          month: !0,
                          number: !0,
                          range: !0,
                          search: !0,
                          tel: !0,
                          text: !0,
                          time: !0,
                          url: !0,
                          week: !0,
                          textarea: !0,
                          select: !0,
                          password: !0
                      } : void 0 !== w ? w : {
                          password: !0
                      },
                      U = !0 === _ || "all" === _ ? {
                          script: !0,
                          comment: !0,
                          headFavicon: !0,
                          headWhitespace: !0,
                          headMetaSocial: !0,
                          headMetaRobots: !0,
                          headMetaHttpEquiv: !0,
                          headMetaVerification: !0,
                          headMetaAuthorship: "all" === _,
                          headMetaDescKeywords: "all" === _
                      } : _ || {};
                  J();
                  var H = 0;
                  _e = function(t, n) {
                      var i;
                      if (!(null === (i = he[0]) || void 0 === i ? void 0 : i.isFrozen()) || t.type === e.EventType.FullSnapshot || t.type === e.EventType.IncrementalSnapshot && t.data.source === e.IncrementalSource.Mutation || he.forEach((function(e) {
                              return e.unfreeze()
                          })), r(T ? T(t) : t, n), t.type === e.EventType.FullSnapshot) j = t, H = 0;
                      else if (t.type === e.EventType.IncrementalSnapshot) {
                          if (t.data.source === e.IncrementalSource.Mutation && t.data.isAttachIframe) return;
                          H++;
                          var s = o && H >= o,
                              l = a && t.timestamp - j.timestamp > a;
                          (s || l) && ke(!0)
                      }
                  };
                  var W = function(t) {
                          _e(Ee({
                              type: e.EventType.IncrementalSnapshot,
                              data: n({
                                  source: e.IncrementalSource.Mutation
                              }, t)
                          }))
                      },
                      Z = function(t) {
                          return _e(Ee({
                              type: e.EventType.IncrementalSnapshot,
                              data: n({
                                  source: e.IncrementalSource.Scroll
                              }, t)
                          }))
                      },
                      V = new Se({
                          mutationCb: W
                      }),
                      X = new xe({
                          mutationCb: W,
                          scrollCb: Z,
                          bypassOptions: {
                              blockClass: l,
                              blockSelector: c,
                              maskTextClass: p,
                              maskTextSelector: v,
                              inlineStylesheet: y,
                              maskInputOptions: B,
                              maskTextFn: S,
                              maskInputFn: k,
                              recordCanvas: O,
                              sampling: I,
                              slimDOMOptions: U,
                              iframeManager: V
                          },
                          mirror: Te
                      });
                  ke = function(t) {
                      var n, r, a, o;
                      void 0 === t && (t = !1), _e(Ee({
                          type: e.EventType.Meta,
                          data: {
                              href: window.location.href,
                              width: q(),
                              height: Y()
                          }
                      }), t), he.forEach((function(e) {
                          return e.lock()
                      }));
                      var s = i(function(e, t) {
                              var n = t || {},
                                  r = n.blockClass,
                                  i = n.blockSelector,
                                  a = n.maskTextClass,
                                  o = n.maskTextSelector,
                                  s = n.inlineStylesheet,
                                  l = n.recordCanvas,
                                  u = n.maskAllInputs,
                                  c = void 0 !== u && u,
                                  d = n.slimDOM,
                                  f = void 0 !== d && d,
                                  h = n.keepIframeSrcFn,
                                  p = {};
                              return [E(e, {
                                  doc: e,
                                  map: p,
                                  blockClass: void 0 === r ? "rr-block" : r,
                                  blockSelector: void 0 === i ? null : i,
                                  maskTextClass: void 0 === a ? "rr-mask" : a,
                                  maskTextSelector: void 0 === o ? null : o,
                                  skipChild: !1,
                                  inlineStylesheet: void 0 === s || s,
                                  maskInputOptions: !0 === c ? {
                                      color: !0,
                                      date: !0,
                                      "datetime-local": !0,
                                      email: !0,
                                      month: !0,
                                      number: !0,
                                      range: !0,
                                      search: !0,
                                      tel: !0,
                                      text: !0,
                                      time: !0,
                                      url: !0,
                                      week: !0,
                                      textarea: !0,
                                      select: !0,
                                      password: !0
                                  } : !1 === c ? {
                                      password: !0
                                  } : c,
                                  maskTextFn: n.maskTextFn,
                                  maskInputFn: n.maskInputFn,
                                  slimDOMOptions: !0 === f || "all" === f ? {
                                      script: !0,
                                      comment: !0,
                                      headFavicon: !0,
                                      headWhitespace: !0,
                                      headMetaDescKeywords: "all" === f,
                                      headMetaSocial: !0,
                                      headMetaRobots: !0,
                                      headMetaHttpEquiv: !0,
                                      headMetaAuthorship: !0,
                                      headMetaVerification: !0
                                  } : !1 === f ? {} : f,
                                  recordCanvas: void 0 !== l && l,
                                  preserveWhiteSpace: n.preserveWhiteSpace,
                                  onSerialize: n.onSerialize,
                                  onIframeLoad: n.onIframeLoad,
                                  iframeLoadTimeout: n.iframeLoadTimeout,
                                  keepIframeSrcFn: void 0 === h ? function() {
                                      return !1
                                  } : h
                              }), p]
                          }(document, {
                              blockClass: l,
                              blockSelector: c,
                              maskTextClass: p,
                              maskTextSelector: v,
                              inlineStylesheet: y,
                              maskAllInputs: B,
                              maskTextFn: S,
                              slimDOM: U,
                              recordCanvas: O,
                              onSerialize: function(e) {
                                  te(e) && V.addIframe(e), re(e) && X.addShadowRoot(e.shadowRoot, document)
                              },
                              onIframeLoad: function(e, t) {
                                  V.attachIframe(e, t)
                              },
                              keepIframeSrcFn: L
                          }), 2),
                          u = s[0],
                          d = s[1];
                      if (!u) return console.warn("Failed to snapshot the document");
                      Te.map = d, _e(Ee({
                          type: e.EventType.FullSnapshot,
                          data: {
                              node: u,
                              initialOffset: {
                                  left: void 0 !== window.pageXOffset ? window.pageXOffset : (null === document || void 0 === document ? void 0 : document.documentElement.scrollLeft) || (null === (r = null === (n = null === document || void 0 === document ? void 0 : document.body) || void 0 === n ? void 0 : n.parentElement) || void 0 === r ? void 0 : r.scrollLeft) || (null === document || void 0 === document ? void 0 : document.body.scrollLeft) || 0,
                                  top: void 0 !== window.pageYOffset ? window.pageYOffset : (null === document || void 0 === document ? void 0 : document.documentElement.scrollTop) || (null === (o = null === (a = null === document || void 0 === document ? void 0 : document.body) || void 0 === a ? void 0 : a.parentElement) || void 0 === o ? void 0 : o.scrollTop) || (null === document || void 0 === document ? void 0 : document.body.scrollTop) || 0
                              }
                          }
                      })), he.forEach((function(e) {
                          return e.unlock()
                      }))
                  };
                  try {
                      var K = [];
                      K.push(P("DOMContentLoaded", (function() {
                          _e(Ee({
                              type: e.EventType.DomContentLoaded,
                              data: {}
                          }))
                      })));
                      var G = function(t) {
                          return we({
                              mutationCb: W,
                              mousemoveCb: function(t, n) {
                                  return _e(Ee({
                                      type: e.EventType.IncrementalSnapshot,
                                      data: {
                                          source: n,
                                          positions: t
                                      }
                                  }))
                              },
                              mouseInteractionCb: function(t) {
                                  return _e(Ee({
                                      type: e.EventType.IncrementalSnapshot,
                                      data: n({
                                          source: e.IncrementalSource.MouseInteraction
                                      }, t)
                                  }))
                              },
                              scrollCb: Z,
                              viewportResizeCb: function(t) {
                                  return _e(Ee({
                                      type: e.EventType.IncrementalSnapshot,
                                      data: n({
                                          source: e.IncrementalSource.ViewportResize
                                      }, t)
                                  }))
                              },
                              inputCb: function(t) {
                                  return _e(Ee({
                                      type: e.EventType.IncrementalSnapshot,
                                      data: n({
                                          source: e.IncrementalSource.Input
                                      }, t)
                                  }))
                              },
                              mediaInteractionCb: function(t) {
                                  return _e(Ee({
                                      type: e.EventType.IncrementalSnapshot,
                                      data: n({
                                          source: e.IncrementalSource.MediaInteraction
                                      }, t)
                                  }))
                              },
                              styleSheetRuleCb: function(t) {
                                  return _e(Ee({
                                      type: e.EventType.IncrementalSnapshot,
                                      data: n({
                                          source: e.IncrementalSource.StyleSheetRule
                                      }, t)
                                  }))
                              },
                              canvasMutationCb: function(t) {
                                  return _e(Ee({
                                      type: e.EventType.IncrementalSnapshot,
                                      data: n({
                                          source: e.IncrementalSource.CanvasMutation
                                      }, t)
                                  }))
                              },
                              fontCb: function(t) {
                                  return _e(Ee({
                                      type: e.EventType.IncrementalSnapshot,
                                      data: n({
                                          source: e.IncrementalSource.Font
                                      }, t)
                                  }))
                              },
                              blockClass: l,
                              ignoreClass: f,
                              maskTextClass: p,
                              maskTextSelector: v,
                              maskInputOptions: B,
                              inlineStylesheet: y,
                              sampling: I,
                              recordCanvas: O,
                              userTriggeredOnInput: A,
                              collectFonts: $,
                              doc: t,
                              maskInputFn: k,
                              maskTextFn: S,
                              blockSelector: c,
                              slimDOMOptions: U,
                              mirror: Te,
                              iframeManager: V,
                              shadowDomManager: X,
                              plugins: (null == F ? void 0 : F.map((function(t) {
                                  return {
                                      observer: t.observer,
                                      options: t.options,
                                      callback: function(n) {
                                          return _e(Ee({
                                              type: e.EventType.Plugin,
                                              data: {
                                                  plugin: t.name,
                                                  payload: n
                                              }
                                          }))
                                      }
                                  }
                              }))) || []
                          }, x)
                      };
                      V.addLoadListener((function(e) {
                          K.push(G(e.contentDocument))
                      }));
                      var Q = function() {
                          ke(), K.push(G(document))
                      };
                      return "interactive" === document.readyState || "complete" === document.readyState ? Q() : K.push(P("load", (function() {
                              _e(Ee({
                                  type: e.EventType.Load,
                                  data: {}
                              })), Q()
                          }), window)),
                          function() {
                              K.forEach((function(e) {
                                  return e()
                              }))
                          }
                  } catch (e) {
                      console.warn(e)
                  }
              }
  
              function Ie(e) {
                  return e = e || Object.create(null), {
                      on: function(t, n) {
                          (e[t] || (e[t] = [])).push(n)
                      },
                      off: function(t, n) {
                          e[t] && e[t].splice(e[t].indexOf(n) >>> 0, 1)
                      },
                      emit: function(t, n) {
                          (e[t] || []).slice().map((function(e) {
                              e(n)
                          })), (e["*"] || []).slice().map((function(e) {
                              e(t, n)
                          }))
                      }
                  }
              }
              Ce.addCustomEvent = function(t, n) {
                  if (!_e) throw new Error("please add custom event after start recording");
                  _e(Ee({
                      type: e.EventType.Custom,
                      data: {
                          tag: t,
                          payload: n
                      }
                  }))
              }, Ce.freezePage = function() {
                  he.forEach((function(e) {
                      return e.freeze()
                  }))
              }, Ce.takeFullSnapshot = function(e) {
                  if (!ke) throw new Error("please take full snapshot after start recording");
                  ke(e)
              }, Ce.mirror = Te;
              var Me = Object.freeze({
                  __proto__: null,
                  default: Ie
              });
  
              function Ne(e, t) {
                  if (void 0 === e && (e = window), void 0 === t && (t = document), !("scrollBehavior" in t.documentElement.style) || !0 === e.__forceSmoothScrollPolyfill__) {
                      var n, r = e.HTMLElement || e.Element,
                          i = {
                              scroll: e.scroll || e.scrollTo,
                              scrollBy: e.scrollBy,
                              elementScroll: r.prototype.scroll || s,
                              scrollIntoView: r.prototype.scrollIntoView
                          },
                          a = e.performance && e.performance.now ? e.performance.now.bind(e.performance) : Date.now,
                          o = (n = e.navigator.userAgent, new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(n) ? 1 : 0);
                      e.scroll = e.scrollTo = function() {
                          void 0 !== arguments[0] && (!0 !== l(arguments[0]) ? p.call(e, t.body, void 0 !== arguments[0].left ? ~~arguments[0].left : e.scrollX || e.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : e.scrollY || e.pageYOffset) : i.scroll.call(e, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : e.scrollX || e.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : e.scrollY || e.pageYOffset))
                      }, e.scrollBy = function() {
                          void 0 !== arguments[0] && (l(arguments[0]) ? i.scrollBy.call(e, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : p.call(e, t.body, ~~arguments[0].left + (e.scrollX || e.pageXOffset), ~~arguments[0].top + (e.scrollY || e.pageYOffset)))
                      }, r.prototype.scroll = r.prototype.scrollTo = function() {
                          if (void 0 !== arguments[0])
                              if (!0 !== l(arguments[0])) {
                                  var e = arguments[0].left,
                                      t = arguments[0].top;
                                  p.call(this, this, void 0 === e ? this.scrollLeft : ~~e, void 0 === t ? this.scrollTop : ~~t)
                              } else {
                                  if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
                                  i.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop)
                              }
                      }, r.prototype.scrollBy = function() {
                          void 0 !== arguments[0] && (!0 !== l(arguments[0]) ? this.scroll({
                              left: ~~arguments[0].left + this.scrollLeft,
                              top: ~~arguments[0].top + this.scrollTop,
                              behavior: arguments[0].behavior
                          }) : i.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop))
                      }, r.prototype.scrollIntoView = function() {
                          if (!0 !== l(arguments[0])) {
                              var n = f(this),
                                  r = n.getBoundingClientRect(),
                                  a = this.getBoundingClientRect();
                              n !== t.body ? (p.call(this, n, n.scrollLeft + a.left - r.left, n.scrollTop + a.top - r.top), "fixed" !== e.getComputedStyle(n).position && e.scrollBy({
                                  left: r.left,
                                  top: r.top,
                                  behavior: "smooth"
                              })) : e.scrollBy({
                                  left: a.left,
                                  top: a.top,
                                  behavior: "smooth"
                              })
                          } else i.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0])
                      }
                  }
  
                  function s(e, t) {
                      this.scrollLeft = e, this.scrollTop = t
                  }
  
                  function l(e) {
                      if (null === e || "object" != typeof e || void 0 === e.behavior || "auto" === e.behavior || "instant" === e.behavior) return !0;
                      if ("object" == typeof e && "smooth" === e.behavior) return !1;
                      throw new TypeError("behavior member of ScrollOptions " + e.behavior + " is not a valid value for enumeration ScrollBehavior.")
                  }
  
                  function u(e, t) {
                      return "Y" === t ? e.clientHeight + o < e.scrollHeight : "X" === t ? e.clientWidth + o < e.scrollWidth : void 0
                  }
  
                  function c(t, n) {
                      var r = e.getComputedStyle(t, null)["overflow" + n];
                      return "auto" === r || "scroll" === r
                  }
  
                  function d(e) {
                      var t = u(e, "Y") && c(e, "Y"),
                          n = u(e, "X") && c(e, "X");
                      return t || n
                  }
  
                  function f(e) {
                      for (; e !== t.body && !1 === d(e);) e = e.parentNode || e.host;
                      return e
                  }
  
                  function h(t) {
                      var n, r, i, o, s = (a() - t.startTime) / 468;
                      o = s = s > 1 ? 1 : s, n = .5 * (1 - Math.cos(Math.PI * o)), r = t.startX + (t.x - t.startX) * n, i = t.startY + (t.y - t.startY) * n, t.method.call(t.scrollable, r, i), r === t.x && i === t.y || e.requestAnimationFrame(h.bind(e, t))
                  }
  
                  function p(n, r, o) {
                      var l, u, c, d, f = a();
                      n === t.body ? (l = e, u = e.scrollX || e.pageXOffset, c = e.scrollY || e.pageYOffset, d = i.scroll) : (l = n, u = n.scrollLeft, c = n.scrollTop, d = s), h({
                          scrollable: l,
                          method: d,
                          startTime: f,
                          startX: u,
                          startY: c,
                          x: r,
                          y: o
                      })
                  }
              }
              var Oe, De = function() {
                  function e(e, t) {
                      void 0 === e && (e = []), this.timeOffset = 0, this.raf = null, this.actions = e, this.speed = t
                  }
                  return e.prototype.addAction = function(e) {
                      var t = this.findActionIndex(e);
                      this.actions.splice(t, 0, e)
                  }, e.prototype.addActions = function(e) {
                      this.actions = this.actions.concat(e)
                  }, e.prototype.start = function() {
                      this.timeOffset = 0;
                      var e = performance.now(),
                          t = this.actions,
                          n = this;
                      this.raf = requestAnimationFrame((function r() {
                          var i = performance.now();
                          for (n.timeOffset += (i - e) * n.speed, e = i; t.length;) {
                              var a = t[0];
                              if (!(n.timeOffset >= a.delay)) break;
                              t.shift(), a.doAction()
                          }(t.length > 0 || n.liveMode) && (n.raf = requestAnimationFrame(r))
                      }))
                  }, e.prototype.clear = function() {
                      this.raf && (cancelAnimationFrame(this.raf), this.raf = null), this.actions.length = 0
                  }, e.prototype.setSpeed = function(e) {
                      this.speed = e
                  }, e.prototype.toggleLiveMode = function(e) {
                      this.liveMode = e
                  }, e.prototype.isActive = function() {
                      return null !== this.raf
                  }, e.prototype.findActionIndex = function(e) {
                      for (var t = 0, n = this.actions.length - 1; t <= n;) {
                          var r = Math.floor((t + n) / 2);
                          if (this.actions[r].delay < e.delay) t = r + 1;
                          else {
                              if (!(this.actions[r].delay > e.delay)) return r;
                              n = r - 1
                          }
                      }
                      return t
                  }, e
              }();
  
              function Ae(t, n) {
                  if (t.type === e.EventType.IncrementalSnapshot && t.data.source === e.IncrementalSource.MouseMove) {
                      var r = t.data.positions[0].timeOffset,
                          i = t.timestamp + r;
                      return t.delay = i - n, i - n
                  }
                  return t.delay = t.timestamp - n, t.delay;
                  /*! *****************************************************************************
                          Copyright (c) Microsoft Corporation. All rights reserved.
                          Licensed under the Apache License, Version 2.0 (the "License"); you may not use
                          this file except in compliance with the License. You may obtain a copy of the
                          License at http://www.apache.org/licenses/LICENSE-2.0
                           THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
                          KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
                          WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
                          MERCHANTABLITY OR NON-INFRINGEMENT.
                           See the Apache Version 2.0 License for specific language governing permissions
                          and limitations under the License.
                          ***************************************************************************** */
              }! function(e) {
                  e[e.NotStarted = 0] = "NotStarted", e[e.Running = 1] = "Running", e[e.Stopped = 2] = "Stopped"
              }(Oe || (Oe = {}));
              var Re = {
                  type: "xstate.init"
              };
  
              function $e(e) {
                  return void 0 === e ? [] : [].concat(e)
              }
  
              function Fe(e) {
                  return {
                      type: "xstate.assign",
                      assignment: e
                  }
              }
  
              function ze(e, t) {
                  return "string" == typeof(e = "string" == typeof e && t && t[e] ? t[e] : e) ? {
                      type: e
                  } : "function" == typeof e ? {
                      type: e.name,
                      exec: e
                  } : e
              }
  
              function Le(e) {
                  return function(t) {
                      return e === t
                  }
              }
  
              function Pe(e) {
                  return "string" == typeof e ? {
                      type: e
                  } : e
              }
  
              function je(e, t) {
                  return {
                      value: e,
                      context: t,
                      actions: [],
                      changed: !1,
                      matches: Le(e)
                  }
              }
  
              function Be(e, t) {
                  void 0 === t && (t = {});
                  var n = {
                      config: e,
                      _options: t,
                      initialState: {
                          value: e.initial,
                          actions: $e(e.states[e.initial].entry).map((function(e) {
                              return ze(e, t.actions)
                          })),
                          context: e.context,
                          matches: Le(e.initial)
                      },
                      transition: function(t, r) {
                          var i, a, o = "string" == typeof t ? {
                                  value: t,
                                  context: e.context
                              } : t,
                              s = o.value,
                              l = o.context,
                              u = Pe(r),
                              c = e.states[s];
                          if (c.on) {
                              var d = $e(c.on[u.type]),
                                  f = function(t) {
                                      if (void 0 === t) return {
                                          value: je(s, l)
                                      };
                                      var r = "string" == typeof t ? {
                                              target: t
                                          } : t,
                                          i = r.target,
                                          a = void 0 === i ? s : i,
                                          o = r.actions,
                                          d = void 0 === o ? [] : o,
                                          f = r.cond,
                                          h = l;
                                      if ((void 0 === f ? function() {
                                              return !0
                                          } : f)(l, u)) {
                                          var p = e.states[a],
                                              m = !1,
                                              v = [].concat(c.exit, d, p.entry).filter((function(e) {
                                                  return e
                                              })).map((function(e) {
                                                  return ze(e, n._options.actions)
                                              })).filter((function(e) {
                                                  if ("xstate.assign" === e.type) {
                                                      m = !0;
                                                      var t = Object.assign({}, h);
                                                      return "function" == typeof e.assignment ? t = e.assignment(h, u) : Object.keys(e.assignment).forEach((function(n) {
                                                          t[n] = "function" == typeof e.assignment[n] ? e.assignment[n](h, u) : e.assignment[n]
                                                      })), h = t, !1
                                                  }
                                                  return !0
                                              }));
                                          return {
                                              value: {
                                                  value: a,
                                                  context: h,
                                                  actions: v,
                                                  changed: a !== s || v.length > 0 || m,
                                                  matches: Le(a)
                                              }
                                          }
                                      }
                                  };
                              try {
                                  for (var h = function(e) {
                                          var t = "function" == typeof Symbol && e[Symbol.iterator],
                                              n = 0;
                                          return t ? t.call(e) : {
                                              next: function() {
                                                  return e && n >= e.length && (e = void 0), {
                                                      value: e && e[n++],
                                                      done: !e
                                                  }
                                              }
                                          }
                                      }(d), p = h.next(); !p.done; p = h.next()) {
                                      var m = f(p.value);
                                      if ("object" == typeof m) return m.value
                                  }
                              } catch (e) {
                                  i = {
                                      error: e
                                  }
                              } finally {
                                  try {
                                      p && !p.done && (a = h.return) && a.call(h)
                                  } finally {
                                      if (i) throw i.error
                                  }
                              }
                          }
                          return je(s, l)
                      }
                  };
                  return n
              }
              var Ue, He = function(e, t) {
                  return e.actions.forEach((function(n) {
                      var r = n.exec;
                      return r && r(e.context, t)
                  }))
              };
  
              function Ye(e) {
                  var t = e.initialState,
                      n = Oe.NotStarted,
                      r = new Set,
                      i = {
                          _machine: e,
                          send: function(i) {
                              n === Oe.Running && (t = e.transition(t, i), He(t, Pe(i)), r.forEach((function(e) {
                                  return e(t)
                              })))
                          },
                          subscribe: function(e) {
                              return r.add(e), e(t), {
                                  unsubscribe: function() {
                                      return r.delete(e)
                                  }
                              }
                          },
                          start: function(r) {
                              if (r) {
                                  var a = "object" == typeof r ? r : {
                                      context: e.config.context,
                                      value: r
                                  };
                                  t = {
                                      value: a.value,
                                      actions: [],
                                      context: a.context,
                                      matches: Le(a.value)
                                  }
                              }
                              return n = Oe.Running, He(t, Re), i
                          },
                          stop: function() {
                              return n = Oe.Stopped, r.clear(), i
                          },
                          get state() {
                              return t
                          },
                          get status() {
                              return n
                          }
                      };
                  return i
              }
  
              function qe(t, i) {
                  var a = i.getCastFn,
                      o = i.emitter;
                  return Ye(Be({
                      id: "player",
                      context: t,
                      initial: "paused",
                      states: {
                          playing: {
                              on: {
                                  PAUSE: {
                                      target: "paused",
                                      actions: ["pause"]
                                  },
                                  CAST_EVENT: {
                                      target: "playing",
                                      actions: "castEvent"
                                  },
                                  END: {
                                      target: "paused",
                                      actions: ["resetLastPlayedEvent", "pause"]
                                  },
                                  ADD_EVENT: {
                                      target: "playing",
                                      actions: ["addEvent"]
                                  }
                              }
                          },
                          paused: {
                              on: {
                                  PLAY: {
                                      target: "playing",
                                      actions: ["recordTimeOffset", "play"]
                                  },
                                  CAST_EVENT: {
                                      target: "paused",
                                      actions: "castEvent"
                                  },
                                  TO_LIVE: {
                                      target: "live",
                                      actions: ["startLive"]
                                  },
                                  ADD_EVENT: {
                                      target: "paused",
                                      actions: ["addEvent"]
                                  }
                              }
                          },
                          live: {
                              on: {
                                  ADD_EVENT: {
                                      target: "live",
                                      actions: ["addEvent"]
                                  },
                                  CAST_EVENT: {
                                      target: "live",
                                      actions: ["castEvent"]
                                  }
                              }
                          }
                      }
                  }, {
                      actions: {
                          castEvent: Fe({
                              lastPlayedEvent: function(e, t) {
                                  return "CAST_EVENT" === t.type ? t.payload.event : e.lastPlayedEvent
                              }
                          }),
                          recordTimeOffset: Fe((function(e, t) {
                              var r = e.timeOffset;
                              return "payload" in t && "timeOffset" in t.payload && (r = t.payload.timeOffset), n(n({}, e), {
                                  timeOffset: r,
                                  baselineTime: e.events[0].timestamp + r
                              })
                          })),
                          play: function(t) {
                              var n, i, s, l, u, c = t.timer,
                                  d = t.events,
                                  f = t.baselineTime,
                                  h = t.lastPlayedEvent;
                              c.clear();
                              try {
                                  for (var p = r(d), m = p.next(); !m.done; m = p.next()) Ae(m.value, f)
                              } catch (e) {
                                  n = {
                                      error: e
                                  }
                              } finally {
                                  try {
                                      m && !m.done && (i = p.return) && i.call(p)
                                  } finally {
                                      if (n) throw n.error
                                  }
                              }
                              var v = function(t, n) {
                                      for (var r = t.length - 1; r >= 0; r--) {
                                          var i = t[r];
                                          if (i.type === e.EventType.Meta && i.timestamp <= n) return t.slice(r)
                                      }
                                      return t
                                  }(d, f),
                                  g = null == h ? void 0 : h.timestamp;
                              (null == h ? void 0 : h.type) === e.EventType.IncrementalSnapshot && h.data.source === e.IncrementalSource.MouseMove && (g = h.timestamp + (null === (u = h.data.positions[0]) || void 0 === u ? void 0 : u.timeOffset)), f < (g || 0) && o.emit(e.ReplayerEvents.PlayBack);
                              var y = new Array,
                                  b = function(t) {
                                      if (g && g < f && (t.timestamp <= g || t === h)) return "continue";
                                      var n = t.timestamp < f;
                                      if (n && !K(t)) return "continue";
                                      var r = a(t, n);
                                      n ? r() : y.push({
                                          doAction: function() {
                                              r(), o.emit(e.ReplayerEvents.EventCast, t)
                                          },
                                          delay: t.delay
                                      })
                                  };
                              try {
                                  for (var w = r(v), _ = w.next(); !_.done; _ = w.next()) b(_.value)
                              } catch (e) {
                                  s = {
                                      error: e
                                  }
                              } finally {
                                  try {
                                      _ && !_.done && (l = w.return) && l.call(w)
                                  } finally {
                                      if (s) throw s.error
                                  }
                              }
                              o.emit(e.ReplayerEvents.Flush), c.addActions(y), c.start()
                          },
                          pause: function(e) {
                              e.timer.clear()
                          },
                          resetLastPlayedEvent: Fe((function(e) {
                              return n(n({}, e), {
                                  lastPlayedEvent: null
                              })
                          })),
                          startLive: Fe({
                              baselineTime: function(e, t) {
                                  return e.timer.toggleLiveMode(!0), e.timer.start(), "TO_LIVE" === t.type && t.payload.baselineTime ? t.payload.baselineTime : Date.now()
                              }
                          }),
                          addEvent: Fe((function(t, r) {
                              var i = t.baselineTime,
                                  s = t.timer,
                                  l = t.events;
                              if ("ADD_EVENT" === r.type) {
                                  var u = r.payload.event;
                                  Ae(u, i);
                                  var c = l.length - 1;
                                  if (!l[c] || l[c].timestamp <= u.timestamp) l.push(u);
                                  else {
                                      for (var d = -1, f = 0; f <= c;) {
                                          var h = Math.floor((f + c) / 2);
                                          l[h].timestamp <= u.timestamp ? f = h + 1 : c = h - 1
                                      } - 1 === d && (d = f), l.splice(d, 0, u)
                                  }
                                  var p = u.timestamp < i,
                                      m = a(u, p);
                                  p ? m() : s.isActive() && s.addAction({
                                      doAction: function() {
                                          m(), o.emit(e.ReplayerEvents.EventCast, u)
                                      },
                                      delay: u.delay
                                  })
                              }
                              return n(n({}, t), {
                                  events: l
                              })
                          }))
                      }
                  }))
              }
  
              function We(e, t) {
                  e.forEach((function(e) {
                      var n, r;
                      if (e.type === Ue.Insert) try {
                          null === (n = t.sheet) || void 0 === n || n.insertRule(e.cssText, e.index)
                      } catch (e) {} else if (e.type === Ue.Remove) try {
                          null === (r = t.sheet) || void 0 === r || r.deleteRule(e.index)
                      } catch (e) {} else e.type === Ue.Snapshot && function(e, t) {
                          var n;
                          try {
                              var r = Array.from((null === (n = t.sheet) || void 0 === n ? void 0 : n.cssRules) || []).map((function(e) {
                                      return e.cssText
                                  })),
                                  a = Object.entries(r).reverse(),
                                  o = r.length;
                              a.forEach((function(n) {
                                  var r, a = i(n, 2),
                                      s = a[0],
                                      l = a[1],
                                      u = e.indexOf(l);
                                  if (-1 === u || u > o) try {
                                      null === (r = t.sheet) || void 0 === r || r.deleteRule(Number(s))
                                  } catch (e) {}
                                  o = u
                              })), e.forEach((function(e, n) {
                                  var r, i, a;
                                  try {
                                      (null === (i = null === (r = t.sheet) || void 0 === r ? void 0 : r.cssRules[n]) || void 0 === i ? void 0 : i.cssText) !== e && (null === (a = t.sheet) || void 0 === a || a.insertRule(e, n))
                                  } catch (e) {}
                              }))
                          } catch (e) {}
                      }(e.cssTexts, t)
                  }))
              }! function(e) {
                  e[e.Insert = 0] = "Insert", e[e.Remove = 1] = "Remove", e[e.Snapshot = 2] = "Snapshot"
              }(Ue || (Ue = {}));
              var Ze = Ie || Me,
                  Ve = {
                      duration: 500,
                      lineCap: "round",
                      lineWidth: 3,
                      strokeStyle: "red"
                  },
                  Xe = function() {
                      function i(t, n) {
                          var i = this;
                          if (this.mouseTail = null, this.tailPositions = [], this.emitter = Ze(), this.legacy_missingNodeRetryMap = {}, this.imageMap = new Map, this.mirror = {
                                  map: {},
                                  getId: function(e) {
                                      return e.__sn ? e.__sn.id : -1
                                  },
                                  getNode: function(e) {
                                      return this.map[e] || null
                                  },
                                  removeNodeFromMap: function(e) {
                                      var t = this,
                                          n = e.__sn && e.__sn.id;
                                      delete this.map[n], e.childNodes && e.childNodes.forEach((function(e) {
                                          return t.removeNodeFromMap(e)
                                      }))
                                  },
                                  has: function(e) {
                                      return this.map.hasOwnProperty(e)
                                  },
                                  reset: function() {
                                      this.map = {}
                                  }
                              }, this.firstFullSnapshot = null, this.newDocumentQueue = [], !(null == n ? void 0 : n.liveMode) && t.length < 2) throw new Error("Replayer need at least 2 events.");
                          var a = {
                              speed: 1,
                              maxSpeed: 360,
                              root: document.body,
                              loadTimeout: 0,
                              skipInactive: !1,
                              showWarning: !0,
                              showDebug: !1,
                              blockClass: "rr-block",
                              liveMode: !1,
                              insertStyleRules: [],
                              triggerFocus: !0,
                              UNSAFE_replayCanvas: !1,
                              pauseAnimation: !0,
                              mouseTail: Ve
                          };
                          this.config = Object.assign({}, a, n), this.handleResize = this.handleResize.bind(this), this.getCastFn = this.getCastFn.bind(this), this.emitter.on(e.ReplayerEvents.Resize, this.handleResize), this.setupDom(), this.treeIndex = new G, this.fragmentParentMap = new Map, this.elementStateMap = new Map, this.virtualStyleRulesMap = new Map, this.emitter.on(e.ReplayerEvents.Flush, (function() {
                              var e, t, n, a, o, s, l = i.treeIndex.flush(),
                                  u = l.scrollMap,
                                  c = l.inputMap;
                              i.fragmentParentMap.forEach((function(e, t) {
                                  return i.restoreRealParent(t, e)
                              }));
                              try {
                                  for (var d = r(i.virtualStyleRulesMap.keys()), f = d.next(); !f.done; f = d.next()) {
                                      var h = f.value;
                                      i.restoreNodeSheet(h)
                                  }
                              } catch (t) {
                                  e = {
                                      error: t
                                  }
                              } finally {
                                  try {
                                      f && !f.done && (t = d.return) && t.call(d)
                                  } finally {
                                      if (e) throw e.error
                                  }
                              }
                              i.fragmentParentMap.clear(), i.elementStateMap.clear(), i.virtualStyleRulesMap.clear();
                              try {
                                  for (var p = r(u.values()), m = p.next(); !m.done; m = p.next()) {
                                      var v = m.value;
                                      i.applyScroll(v)
                                  }
                              } catch (e) {
                                  n = {
                                      error: e
                                  }
                              } finally {
                                  try {
                                      m && !m.done && (a = p.return) && a.call(p)
                                  } finally {
                                      if (n) throw n.error
                                  }
                              }
                              try {
                                  for (var g = r(c.values()), y = g.next(); !y.done; y = g.next()) v = y.value, i.applyInput(v)
                              } catch (e) {
                                  o = {
                                      error: e
                                  }
                              } finally {
                                  try {
                                      y && !y.done && (s = g.return) && s.call(g)
                                  } finally {
                                      if (o) throw o.error
                                  }
                              }
                          })), this.emitter.on(e.ReplayerEvents.PlayBack, (function() {
                              i.firstFullSnapshot = null, i.mirror.reset()
                          }));
                          var o = new De([], (null == n ? void 0 : n.speed) || a.speed);
                          this.service = qe({
                              events: t.map((function(e) {
                                  return n && n.unpackFn ? n.unpackFn(e) : e
                              })).sort((function(e, t) {
                                  return e.timestamp - t.timestamp
                              })),
                              timer: o,
                              timeOffset: 0,
                              baselineTime: 0,
                              lastPlayedEvent: null
                          }, {
                              getCastFn: this.getCastFn,
                              emitter: this.emitter
                          }), this.service.start(), this.service.subscribe((function(t) {
                              i.emitter.emit(e.ReplayerEvents.StateChange, {
                                  player: t
                              })
                          })), this.speedService = Ye(Be({
                              id: "speed",
                              context: {
                                  normalSpeed: -1,
                                  timer: o
                              },
                              initial: "normal",
                              states: {
                                  normal: {
                                      on: {
                                          FAST_FORWARD: {
                                              target: "skipping",
                                              actions: ["recordSpeed", "setSpeed"]
                                          },
                                          SET_SPEED: {
                                              target: "normal",
                                              actions: ["setSpeed"]
                                          }
                                      }
                                  },
                                  skipping: {
                                      on: {
                                          BACK_TO_NORMAL: {
                                              target: "normal",
                                              actions: ["restoreSpeed"]
                                          },
                                          SET_SPEED: {
                                              target: "normal",
                                              actions: ["setSpeed"]
                                          }
                                      }
                                  }
                              }
                          }, {
                              actions: {
                                  setSpeed: function(e, t) {
                                      "payload" in t && e.timer.setSpeed(t.payload.speed)
                                  },
                                  recordSpeed: Fe({
                                      normalSpeed: function(e) {
                                          return e.timer.speed
                                      }
                                  }),
                                  restoreSpeed: function(e) {
                                      e.timer.setSpeed(e.normalSpeed)
                                  }
                              }
                          })), this.speedService.start(), this.speedService.subscribe((function(t) {
                              i.emitter.emit(e.ReplayerEvents.StateChange, {
                                  speed: t
                              })
                          }));
                          var s = this.service.state.context.events.find((function(t) {
                                  return t.type === e.EventType.Meta
                              })),
                              l = this.service.state.context.events.find((function(t) {
                                  return t.type === e.EventType.FullSnapshot
                              }));
                          if (s) {
                              var u = s.data,
                                  c = u.width,
                                  d = u.height;
                              setTimeout((function() {
                                  i.emitter.emit(e.ReplayerEvents.Resize, {
                                      width: c,
                                      height: d
                                  })
                              }), 0)
                          }
                          l && setTimeout((function() {
                              i.firstFullSnapshot || (i.firstFullSnapshot = l, i.rebuildFullSnapshot(l), i.iframe.contentWindow.scrollTo(l.data.initialOffset))
                          }), 1)
                      }
                      return Object.defineProperty(i.prototype, "timer", {
                          get: function() {
                              return this.service.state.context.timer
                          },
                          enumerable: !1,
                          configurable: !0
                      }), i.prototype.on = function(e, t) {
                          return this.emitter.on(e, t), this
                      }, i.prototype.off = function(e, t) {
                          return this.emitter.off(e, t), this
                      }, i.prototype.setConfig = function(e) {
                          var t = this;
                          Object.keys(e).forEach((function(n) {
                              t.config[n] = e[n]
                          })), this.config.skipInactive || this.backToNormal(), void 0 !== e.speed && this.speedService.send({
                              type: "SET_SPEED",
                              payload: {
                                  speed: e.speed
                              }
                          }), void 0 !== e.mouseTail && (!1 === e.mouseTail ? this.mouseTail && (this.mouseTail.style.display = "none") : (this.mouseTail || (this.mouseTail = document.createElement("canvas"), this.mouseTail.width = Number.parseFloat(this.iframe.width), this.mouseTail.height = Number.parseFloat(this.iframe.height), this.mouseTail.classList.add("replayer-mouse-tail"), this.wrapper.insertBefore(this.mouseTail, this.iframe)), this.mouseTail.style.display = "inherit"))
                      }, i.prototype.getMetaData = function() {
                          var e = this.service.state.context.events[0],
                              t = this.service.state.context.events[this.service.state.context.events.length - 1];
                          return {
                              startTime: e.timestamp,
                              endTime: t.timestamp,
                              totalTime: t.timestamp - e.timestamp
                          }
                      }, i.prototype.getCurrentTime = function() {
                          return this.timer.timeOffset + this.getTimeOffset()
                      }, i.prototype.getTimeOffset = function() {
                          var e = this.service.state.context;
                          return e.baselineTime - e.events[0].timestamp
                      }, i.prototype.getMirror = function() {
                          return this.mirror
                      }, i.prototype.play = function(t) {
                          var n;
                          void 0 === t && (t = 0), this.service.state.matches("paused") || this.service.send({
                              type: "PAUSE"
                          }), this.service.send({
                              type: "PLAY",
                              payload: {
                                  timeOffset: t
                              }
                          }), null === (n = this.iframe.contentDocument) || void 0 === n || n.getElementsByTagName("html")[0].classList.remove("rrweb-paused"), this.emitter.emit(e.ReplayerEvents.Start)
                      }, i.prototype.pause = function(t) {
                          var n;
                          void 0 === t && this.service.state.matches("playing") && this.service.send({
                              type: "PAUSE"
                          }), "number" == typeof t && (this.play(t), this.service.send({
                              type: "PAUSE"
                          })), null === (n = this.iframe.contentDocument) || void 0 === n || n.getElementsByTagName("html")[0].classList.add("rrweb-paused"), this.emitter.emit(e.ReplayerEvents.Pause)
                      }, i.prototype.resume = function(t) {
                          void 0 === t && (t = 0), console.warn("The 'resume' will be departed in 1.0. Please use 'play' method which has the same interface."), this.play(t), this.emitter.emit(e.ReplayerEvents.Resume)
                      }, i.prototype.startLive = function(e) {
                          this.service.send({
                              type: "TO_LIVE",
                              payload: {
                                  baselineTime: e
                              }
                          })
                      }, i.prototype.addEvent = function(e) {
                          var t = this,
                              n = this.config.unpackFn ? this.config.unpackFn(e) : e;
                          Promise.resolve().then((function() {
                              return t.service.send({
                                  type: "ADD_EVENT",
                                  payload: {
                                      event: n
                                  }
                              })
                          }))
                      }, i.prototype.enableInteract = function() {
                          this.iframe.setAttribute("scrolling", "auto"), this.iframe.style.pointerEvents = "auto"
                      }, i.prototype.disableInteract = function() {
                          this.iframe.setAttribute("scrolling", "no"), this.iframe.style.pointerEvents = "none"
                      }, i.prototype.setupDom = function() {
                          this.wrapper = document.createElement("div"), this.wrapper.classList.add("replayer-wrapper"), this.config.root.appendChild(this.wrapper), this.mouse = document.createElement("div"), this.mouse.classList.add("replayer-mouse"), this.wrapper.appendChild(this.mouse), !1 !== this.config.mouseTail && (this.mouseTail = document.createElement("canvas"), this.mouseTail.classList.add("replayer-mouse-tail"), this.mouseTail.style.display = "inherit", this.wrapper.appendChild(this.mouseTail)), this.iframe = document.createElement("iframe");
                          var e = ["allow-same-origin"];
                          this.config.UNSAFE_replayCanvas && e.push("allow-scripts"), this.iframe.style.display = "none", this.iframe.setAttribute("sandbox", e.join(" ")), this.disableInteract(), this.wrapper.appendChild(this.iframe), this.iframe.contentWindow && this.iframe.contentDocument && (Ne(this.iframe.contentWindow, this.iframe.contentDocument), J(this.iframe.contentWindow))
                      }, i.prototype.handleResize = function(e) {
                          var t, n;
                          this.iframe.style.display = "inherit";
                          try {
                              for (var i = r([this.mouseTail, this.iframe]), a = i.next(); !a.done; a = i.next()) {
                                  var o = a.value;
                                  o && (o.setAttribute("width", String(e.width)), o.setAttribute("height", String(e.height)))
                              }
                          } catch (e) {
                              t = {
                                  error: e
                              }
                          } finally {
                              try {
                                  a && !a.done && (n = i.return) && n.call(i)
                              } finally {
                                  if (t) throw t.error
                              }
                          }
                      }, i.prototype.getCastFn = function(t, n) {
                          var i, a = this;
                          switch (void 0 === n && (n = !1), t.type) {
                              case e.EventType.DomContentLoaded:
                              case e.EventType.Load:
                                  break;
                              case e.EventType.Custom:
                                  i = function() {
                                      a.emitter.emit(e.ReplayerEvents.CustomEvent, t)
                                  };
                                  break;
                              case e.EventType.Meta:
                                  i = function() {
                                      return a.emitter.emit(e.ReplayerEvents.Resize, {
                                          width: t.data.width,
                                          height: t.data.height
                                      })
                                  };
                                  break;
                              case e.EventType.FullSnapshot:
                                  i = function() {
                                      if (a.firstFullSnapshot) {
                                          if (a.firstFullSnapshot === t) return void(a.firstFullSnapshot = !0)
                                      } else a.firstFullSnapshot = !0;
                                      a.rebuildFullSnapshot(t, n), a.iframe.contentWindow.scrollTo(t.data.initialOffset)
                                  };
                                  break;
                              case e.EventType.IncrementalSnapshot:
                                  i = function() {
                                      var i, o;
                                      if (a.applyIncremental(t, n), !n && (t === a.nextUserInteractionEvent && (a.nextUserInteractionEvent = null, a.backToNormal()), a.config.skipInactive && !a.nextUserInteractionEvent)) {
                                          try {
                                              for (var s = r(a.service.state.context.events), l = s.next(); !l.done; l = s.next()) {
                                                  var u = l.value;
                                                  if (!(u.timestamp <= t.timestamp) && a.isUserInteraction(u)) {
                                                      u.delay - t.delay > 1e4 * a.speedService.state.context.timer.speed && (a.nextUserInteractionEvent = u);
                                                      break
                                                  }
                                              }
                                          } catch (e) {
                                              i = {
                                                  error: e
                                              }
                                          } finally {
                                              try {
                                                  l && !l.done && (o = s.return) && o.call(s)
                                              } finally {
                                                  if (i) throw i.error
                                              }
                                          }
                                          if (a.nextUserInteractionEvent) {
                                              var c = a.nextUserInteractionEvent.delay - t.delay,
                                                  d = {
                                                      speed: Math.min(Math.round(c / 5e3), a.config.maxSpeed)
                                                  };
                                              a.speedService.send({
                                                  type: "FAST_FORWARD",
                                                  payload: d
                                              }), a.emitter.emit(e.ReplayerEvents.SkipStart, d)
                                          }
                                      }
                                  }
                          }
                          return function() {
                              var o, s;
                              i && i();
                              try {
                                  for (var l = r(a.config.plugins || []), u = l.next(); !u.done; u = l.next()) u.value.handler(t, n, {
                                      replayer: a
                                  })
                              } catch (e) {
                                  o = {
                                      error: e
                                  }
                              } finally {
                                  try {
                                      u && !u.done && (s = l.return) && s.call(l)
                                  } finally {
                                      if (o) throw o.error
                                  }
                              }
                              a.service.send({
                                  type: "CAST_EVENT",
                                  payload: {
                                      event: t
                                  }
                              });
                              var c = a.service.state.context.events.length - 1;
                              if (t === a.service.state.context.events[c]) {
                                  var d = function() {
                                      c < a.service.state.context.events.length - 1 || (a.backToNormal(), a.service.send("END"), a.emitter.emit(e.ReplayerEvents.Finish))
                                  };
                                  t.type === e.EventType.IncrementalSnapshot && t.data.source === e.IncrementalSource.MouseMove && t.data.positions.length ? setTimeout((function() {
                                      d()
                                  }), Math.max(0, 50 - t.data.positions[0].timeOffset)) : d()
                              }
                          }
                      }, i.prototype.rebuildFullSnapshot = function(t, n) {
                          var i, a, o = this;
                          if (void 0 === n && (n = !1), !this.iframe.contentDocument) return console.warn("Looks like your replayer has been destroyed.");
                          Object.keys(this.legacy_missingNodeRetryMap).length && console.warn("Found unresolved missing node map", this.legacy_missingNodeRetryMap), this.legacy_missingNodeRetryMap = {};
                          var s = [];
                          this.mirror.map = L(t.data.node, {
                              doc: this.iframe.contentDocument,
                              afterAppend: function(e) {
                                  o.collectIframeAndAttachDocument(s, e)
                              }
                          })[1];
                          var l = function(e, t) {
                                  if (u.attachDocumentToIframe(e, t), u.newDocumentQueue = u.newDocumentQueue.filter((function(t) {
                                          return t !== e
                                      })), t.contentDocument) {
                                      var n = t.contentDocument,
                                          r = n.documentElement,
                                          i = n.head;
                                      u.insertStyleRules(r, i)
                                  }
                              },
                              u = this;
                          try {
                              for (var c = r(s), d = c.next(); !d.done; d = c.next()) {
                                  var f = d.value;
                                  l(f.mutationInQueue, f.builtNode)
                              }
                          } catch (e) {
                              i = {
                                  error: e
                              }
                          } finally {
                              try {
                                  d && !d.done && (a = c.return) && a.call(c)
                              } finally {
                                  if (i) throw i.error
                              }
                          }
                          var h = this.iframe.contentDocument,
                              p = h.documentElement,
                              m = h.head;
                          this.insertStyleRules(p, m), this.service.state.matches("playing") || this.iframe.contentDocument.getElementsByTagName("html")[0].classList.add("rrweb-paused"), this.emitter.emit(e.ReplayerEvents.FullsnapshotRebuilded, t), n || this.waitForStylesheetLoad(), this.config.UNSAFE_replayCanvas && this.preloadAllImages()
                      }, i.prototype.insertStyleRules = function(e, t) {
                          var n = document.createElement("style");
                          e.insertBefore(n, t);
                          var r, i = (r = this.config.blockClass, ["." + r + " { background: #ccc }", "noscript { display: none !important; }"]).concat(this.config.insertStyleRules);
                          this.config.pauseAnimation && i.push("html.rrweb-paused * { animation-play-state: paused !important; }");
                          for (var a = 0; a < i.length; a++) n.sheet.insertRule(i[a], a)
                      }, i.prototype.attachDocumentToIframe = function(e, t) {
                          var n, i, a = this,
                              o = [];
                          if (!t.contentDocument)
                              for (var s = t.parentNode; s;) {
                                  if (this.fragmentParentMap.has(s)) {
                                      var l = s,
                                          u = this.fragmentParentMap.get(l);
                                      this.restoreRealParent(l, u);
                                      break
                                  }
                                  s = s.parentNode
                              }
                          z(e.node, {
                              doc: t.contentDocument,
                              map: this.mirror.map,
                              hackCss: !0,
                              skipChild: !1,
                              afterAppend: function(e) {
                                  a.collectIframeAndAttachDocument(o, e)
                              }
                          });
                          var c = function(e, t) {
                                  if (d.attachDocumentToIframe(e, t), d.newDocumentQueue = d.newDocumentQueue.filter((function(t) {
                                          return t !== e
                                      })), t.contentDocument) {
                                      var n = t.contentDocument,
                                          r = n.documentElement,
                                          i = n.head;
                                      d.insertStyleRules(r, i)
                                  }
                              },
                              d = this;
                          try {
                              for (var f = r(o), h = f.next(); !h.done; h = f.next()) {
                                  var p = h.value;
                                  c(p.mutationInQueue, p.builtNode)
                              }
                          } catch (e) {
                              n = {
                                  error: e
                              }
                          } finally {
                              try {
                                  h && !h.done && (i = f.return) && i.call(f)
                              } finally {
                                  if (n) throw n.error
                              }
                          }
                      }, i.prototype.collectIframeAndAttachDocument = function(e, t) {
                          if (te(t)) {
                              var n = this.newDocumentQueue.find((function(e) {
                                  return e.parentId === t.__sn.id
                              }));
                              n && e.push({
                                  mutationInQueue: n,
                                  builtNode: t
                              })
                          }
                      }, i.prototype.waitForStylesheetLoad = function() {
                          var t, n = this,
                              r = null === (t = this.iframe.contentDocument) || void 0 === t ? void 0 : t.head;
                          if (r) {
                              var i, a = new Set,
                                  o = this.service.state,
                                  s = function() {
                                      o = n.service.state
                                  };
                              this.emitter.on(e.ReplayerEvents.Start, s), this.emitter.on(e.ReplayerEvents.Pause, s);
                              var l = function() {
                                  n.emitter.off(e.ReplayerEvents.Start, s), n.emitter.off(e.ReplayerEvents.Pause, s)
                              };
                              r.querySelectorAll('link[rel="stylesheet"]').forEach((function(t) {
                                  t.sheet || (a.add(t), t.addEventListener("load", (function() {
                                      a.delete(t), 0 === a.size && -1 !== i && (o.matches("playing") && n.play(n.getCurrentTime()), n.emitter.emit(e.ReplayerEvents.LoadStylesheetEnd), i && window.clearTimeout(i), l())
                                  })))
                              })), a.size > 0 && (this.service.send({
                                  type: "PAUSE"
                              }), this.emitter.emit(e.ReplayerEvents.LoadStylesheetStart), i = window.setTimeout((function() {
                                  o.matches("playing") && n.play(n.getCurrentTime()), i = -1, l()
                              }), this.config.loadTimeout))
                          }
                      }, i.prototype.preloadAllImages = function() {
                          var t, n, i = this,
                              a = (this.service.state, function() {
                                  i.service.state
                              });
                          this.emitter.on(e.ReplayerEvents.Start, a), this.emitter.on(e.ReplayerEvents.Pause, a);
                          var o = 0;
                          try {
                              for (var s = r(this.service.state.context.events), l = s.next(); !l.done; l = s.next()) {
                                  var u = l.value;
                                  if (u.type === e.EventType.IncrementalSnapshot && u.data.source === e.IncrementalSource.CanvasMutation && "drawImage" === u.data.property && "string" == typeof u.data.args[0] && !this.imageMap.has(u)) {
                                      o++;
                                      var c = document.createElement("canvas"),
                                          d = c.getContext("2d"),
                                          f = null == d ? void 0 : d.createImageData(c.width, c.height);
                                      null == f || f.data, JSON.parse(u.data.args[0]), null == d || d.putImageData(f, 0, 0)
                                  }
                              }
                          } catch (e) {
                              t = {
                                  error: e
                              }
                          } finally {
                              try {
                                  l && !l.done && (n = s.return) && n.call(s)
                              } finally {
                                  if (t) throw t.error
                              }
                          }
                          0 !== o && this.service.send({
                              type: "PAUSE"
                          })
                      }, i.prototype.applyIncremental = function(t, n) {
                          var r, i, a = this,
                              o = t.data;
                          switch (o.source) {
                              case e.IncrementalSource.Mutation:
                                  n && (o.adds.forEach((function(e) {
                                      return a.treeIndex.add(e)
                                  })), o.texts.forEach((function(e) {
                                      return a.treeIndex.text(e)
                                  })), o.attributes.forEach((function(e) {
                                      return a.treeIndex.attribute(e)
                                  })), o.removes.forEach((function(e) {
                                      return a.treeIndex.remove(e, a.mirror)
                                  })));
                                  try {
                                      this.applyMutation(o, n)
                                  } catch (e) {
                                      this.warn("Exception in mutation " + (e.message || e), o)
                                  }
                                  break;
                              case e.IncrementalSource.Drag:
                              case e.IncrementalSource.TouchMove:
                              case e.IncrementalSource.MouseMove:
                                  if (n) {
                                      var s = o.positions[o.positions.length - 1];
                                      this.moveAndHover(o, s.x, s.y, s.id)
                                  } else o.positions.forEach((function(e) {
                                      var n = {
                                          doAction: function() {
                                              a.moveAndHover(o, e.x, e.y, e.id)
                                          },
                                          delay: e.timeOffset + t.timestamp - a.service.state.context.baselineTime
                                      };
                                      a.timer.addAction(n)
                                  })), this.timer.addAction({
                                      doAction: function() {},
                                      delay: t.delay - (null === (r = o.positions[0]) || void 0 === r ? void 0 : r.timeOffset)
                                  });
                                  break;
                              case e.IncrementalSource.MouseInteraction:
                                  if (-1 === o.id) break;
                                  var l = new Event(e.MouseInteractions[o.type].toLowerCase());
                                  if (!(v = this.mirror.getNode(o.id))) return this.debugNodeNotFound(o, o.id);
                                  this.emitter.emit(e.ReplayerEvents.MouseInteraction, {
                                      type: o.type,
                                      target: v
                                  });
                                  var u = this.config.triggerFocus;
                                  switch (o.type) {
                                      case e.MouseInteractions.Blur:
                                          "blur" in v && v.blur();
                                          break;
                                      case e.MouseInteractions.Focus:
                                          u && v.focus && v.focus({
                                              preventScroll: !0
                                          });
                                          break;
                                      case e.MouseInteractions.Click:
                                      case e.MouseInteractions.TouchStart:
                                      case e.MouseInteractions.TouchEnd:
                                          n || (this.moveAndHover(o, o.x, o.y, o.id), this.mouse.classList.remove("active"), this.mouse.offsetWidth, this.mouse.classList.add("active"));
                                          break;
                                      default:
                                          v.dispatchEvent(l)
                                  }
                                  break;
                              case e.IncrementalSource.Scroll:
                                  if (-1 === o.id) break;
                                  if (n) {
                                      this.treeIndex.scroll(o);
                                      break
                                  }
                                  this.applyScroll(o);
                                  break;
                              case e.IncrementalSource.ViewportResize:
                                  this.emitter.emit(e.ReplayerEvents.Resize, {
                                      width: o.width,
                                      height: o.height
                                  });
                                  break;
                              case e.IncrementalSource.Input:
                                  if (-1 === o.id) break;
                                  if (n) {
                                      this.treeIndex.input(o);
                                      break
                                  }
                                  this.applyInput(o);
                                  break;
                              case e.IncrementalSource.MediaInteraction:
                                  if (!(v = this.mirror.getNode(o.id))) return this.debugNodeNotFound(o, o.id);
                                  var c = v;
                                  try {
                                      o.currentTime && (c.currentTime = o.currentTime), o.type === O.Pause && c.pause(), o.type === O.Play && c.play()
                                  } catch (e) {
                                      this.config.showWarning && console.warn("Failed to replay media interactions: " + (e.message || e))
                                  }
                                  break;
                              case e.IncrementalSource.StyleSheetRule:
                                  if (!(v = this.mirror.getNode(o.id))) return this.debugNodeNotFound(o, o.id);
                                  var d, f = v,
                                      h = v.parentNode,
                                      p = this.fragmentParentMap.has(h),
                                      m = p ? null : f.sheet;
                                  m || (this.virtualStyleRulesMap.has(v) ? d = this.virtualStyleRulesMap.get(v) : (d = [], this.virtualStyleRulesMap.set(v, d))), o.adds && o.adds.forEach((function(e) {
                                      var t = e.rule,
                                          n = e.index;
                                      if (m) try {
                                          var r = void 0 === n ? void 0 : Math.min(n, m.cssRules.length);
                                          try {
                                              m.insertRule(t, r)
                                          } catch (e) {}
                                      } catch (e) {} else null == d || d.push({
                                          cssText: t,
                                          index: n,
                                          type: Ue.Insert
                                      })
                                  })), o.removes && o.removes.forEach((function(e) {
                                      var t = e.index;
                                      if (p) null == d || d.push({
                                          index: t,
                                          type: Ue.Remove
                                      });
                                      else try {
                                          null == m || m.deleteRule(t)
                                      } catch (e) {}
                                  }));
                                  break;
                              case e.IncrementalSource.CanvasMutation:
                                  if (!this.config.UNSAFE_replayCanvas) return;
                                  var v;
                                  if (!(v = this.mirror.getNode(o.id))) return this.debugNodeNotFound(o, o.id);
                                  try {
                                      var g = v.getContext("2d");
                                      if (o.setter) return void(g[o.property] = o.args[0]);
                                      var y = g[o.property];
                                      if ("drawImage" === o.property && "string" == typeof o.args[0]) {
                                          var b = this.imageMap.get(t);
                                          o.args[0] = b, y.apply(g, o.args)
                                      } else y.apply(g, o.args)
                                  } catch (e) {
                                      this.warnCanvasMutationFailed(o, o.id, e)
                                  }
                                  break;
                              case e.IncrementalSource.Font:
                                  try {
                                      var w = new FontFace(o.family, o.buffer ? new Uint8Array(JSON.parse(o.fontSource)) : o.fontSource, o.descriptors);
                                      null === (i = this.iframe.contentDocument) || void 0 === i || i.fonts.add(w)
                                  } catch (e) {
                                      this.config.showWarning && console.warn(e)
                                  }
                          }
                      }, i.prototype.applyMutation = function(e, i) {
                          var a, o, s = this;
                          e.removes.forEach((function(t) {
                              var n = s.mirror.getNode(t.id);
                              if (!n) {
                                  if (e.removes.find((function(e) {
                                          return e.id === t.parentId
                                      }))) return;
                                  return s.warnNodeNotFound(e, t.id)
                              }
                              var r = s.mirror.getNode(t.parentId);
                              if (!r) return s.warnNodeNotFound(e, t.parentId);
                              if (t.isShadow && re(r) && (r = r.shadowRoot), s.mirror.removeNodeFromMap(n), r) {
                                  var i = null,
                                      a = "__sn" in r ? s.fragmentParentMap.get(r) : void 0;
                                  a && a.contains(n) ? r = a : s.fragmentParentMap.has(n) && (i = s.fragmentParentMap.get(n), s.fragmentParentMap.delete(n), n = i);
                                  try {
                                      r.removeChild(n)
                                  } catch (t) {
                                      if (!(t instanceof DOMException)) throw t;
                                      s.warn("parent could not remove child in mutation", r, a, n, i, e)
                                  }
                              }
                          }));
                          var l = n({}, this.legacy_missingNodeRetryMap),
                              u = [],
                              c = function(e) {
                                  var n, r;
                                  if (!s.iframe.contentDocument) return console.warn("Looks like your replayer has been destroyed.");
                                  var a = s.mirror.getNode(e.parentId);
                                  if (!a) return e.node.type === t.Document ? s.newDocumentQueue.push(e) : u.push(e);
                                  var o = null;
                                  s.iframe.contentDocument.contains ? o = s.iframe.contentDocument.contains(a) : s.iframe.contentDocument.body.contains && (o = s.iframe.contentDocument.body.contains(a));
                                  var c = (null === (r = (n = a).getElementsByTagName) || void 0 === r ? void 0 : r.call(n, "iframe").length) > 0;
                                  if (i && o && !te(a) && !c) {
                                      var d = document.createDocumentFragment();
                                      for (s.mirror.map[e.parentId] = d, s.fragmentParentMap.set(d, a), s.storeState(a); a.firstChild;) d.appendChild(a.firstChild);
                                      a = d
                                  }
                                  e.node.isShadow && re(a) && (a = a.shadowRoot);
                                  var f = null,
                                      h = null;
                                  if (e.previousId && (f = s.mirror.getNode(e.previousId)), e.nextId && (h = s.mirror.getNode(e.nextId)), function(e) {
                                          var t = null;
                                          return e.nextId && (t = s.mirror.getNode(e.nextId)), null !== e.nextId && void 0 !== e.nextId && -1 !== e.nextId && !t
                                      }(e)) return u.push(e);
                                  if (!e.node.rootId || s.mirror.getNode(e.node.rootId)) {
                                      var p = e.node.rootId ? s.mirror.getNode(e.node.rootId) : s.iframe.contentDocument;
                                      if (te(a)) s.attachDocumentToIframe(e, a);
                                      else {
                                          var m = z(e.node, {
                                              doc: p,
                                              map: s.mirror.map,
                                              skipChild: !0,
                                              hackCss: !0
                                          });
                                          if (-1 !== e.previousId && -1 !== e.nextId) {
                                              if (f && f.nextSibling && f.nextSibling.parentNode) a.insertBefore(m, f.nextSibling);
                                              else if (h && h.parentNode) a.contains(h) ? a.insertBefore(m, h) : a.insertBefore(m, null);
                                              else {
                                                  if (a === p)
                                                      for (; p.firstChild;) p.removeChild(p.firstChild);
                                                  a.appendChild(m)
                                              }
                                              if (te(m)) {
                                                  var v = s.newDocumentQueue.find((function(e) {
                                                      return e.parentId === m.__sn.id
                                                  }));
                                                  if (v && (s.attachDocumentToIframe(v, m), s.newDocumentQueue = s.newDocumentQueue.filter((function(e) {
                                                          return e !== v
                                                      }))), m.contentDocument) {
                                                      var g = m.contentDocument,
                                                          y = g.documentElement,
                                                          b = g.head;
                                                      s.insertStyleRules(y, b)
                                                  }
                                              }(e.previousId || e.nextId) && s.legacy_resolveMissingNode(l, a, m, e)
                                          } else l[e.node.id] = {
                                              node: m,
                                              mutation: e
                                          }
                                      }
                                  }
                              };
                          e.adds.forEach((function(e) {
                              c(e)
                          }));
                          for (var d = Date.now(); u.length;) {
                              var f = Q(u);
                              if (u.length = 0, Date.now() - d > 500) {
                                  this.warn("Timeout in the loop, please check the resolve tree data:", f);
                                  break
                              }
                              try {
                                  for (var h = (a = void 0, r(f)), p = h.next(); !p.done; p = h.next()) {
                                      var m = p.value;
                                      this.mirror.getNode(m.value.parentId) ? ee(m, (function(e) {
                                          c(e)
                                      })) : this.debug("Drop resolve tree since there is no parent for the root node.", m)
                                  }
                              } catch (e) {
                                  a = {
                                      error: e
                                  }
                              } finally {
                                  try {
                                      p && !p.done && (o = h.return) && o.call(h)
                                  } finally {
                                      if (a) throw a.error
                                  }
                              }
                          }
                          Object.keys(l).length && Object.assign(this.legacy_missingNodeRetryMap, l), e.texts.forEach((function(t) {
                              var n = s.mirror.getNode(t.id);
                              if (!n) {
                                  if (e.removes.find((function(e) {
                                          return e.id === t.id
                                      }))) return;
                                  return s.warnNodeNotFound(e, t.id)
                              }
                              s.fragmentParentMap.has(n) && (n = s.fragmentParentMap.get(n)), n.textContent = t.value
                          })), e.attributes.forEach((function(t) {
                              var n = s.mirror.getNode(t.id);
                              if (!n) {
                                  if (e.removes.find((function(e) {
                                          return e.id === t.id
                                      }))) return;
                                  return s.warnNodeNotFound(e, t.id)
                              }
                              for (var r in s.fragmentParentMap.has(n) && (n = s.fragmentParentMap.get(n)), t.attributes)
                                  if ("string" == typeof r) {
                                      var i = t.attributes[r];
                                      if (null === i) n.removeAttribute(r);
                                      else if ("string" == typeof i) try {
                                          n.setAttribute(r, i)
                                      } catch (e) {
                                          s.config.showWarning && console.warn("An error occurred may due to the checkout feature.", e)
                                      } else if ("style" === r) {
                                          var a = i,
                                              o = n;
                                          for (var l in a)
                                              if (!1 === a[l]) o.style.removeProperty(l);
                                              else if (a[l] instanceof Array) {
                                              var u = a[l];
                                              o.style.setProperty(l, u[0], u[1])
                                          } else {
                                              var c = a[l];
                                              o.style.setProperty(l, c)
                                          }
                                      }
                                  }
                          }))
                      }, i.prototype.applyScroll = function(e) {
                          var t = this.mirror.getNode(e.id);
                          if (!t) return this.debugNodeNotFound(e, e.id);
                          if (t === this.iframe.contentDocument) this.iframe.contentWindow.scrollTo({
                              top: e.y,
                              left: e.x,
                              behavior: "smooth"
                          });
                          else try {
                              t.scrollTop = e.y, t.scrollLeft = e.x
                          } catch (e) {}
                      }, i.prototype.applyInput = function(e) {
                          var t = this.mirror.getNode(e.id);
                          if (!t) return this.debugNodeNotFound(e, e.id);
                          try {
                              t.checked = e.isChecked, t.value = e.text
                          } catch (e) {}
                      }, i.prototype.legacy_resolveMissingNode = function(e, t, n, r) {
                          var i = r.previousId,
                              a = r.nextId,
                              o = i && e[i],
                              s = a && e[a];
                          if (o) {
                              var l = o,
                                  u = l.node,
                                  c = l.mutation;
                              t.insertBefore(u, n), delete e[c.node.id], delete this.legacy_missingNodeRetryMap[c.node.id], (c.previousId || c.nextId) && this.legacy_resolveMissingNode(e, t, u, c)
                          }
                          if (s) {
                              var d = s;
                              u = d.node, c = d.mutation, t.insertBefore(u, n.nextSibling), delete e[c.node.id], delete this.legacy_missingNodeRetryMap[c.node.id], (c.previousId || c.nextId) && this.legacy_resolveMissingNode(e, t, u, c)
                          }
                      }, i.prototype.moveAndHover = function(e, t, n, r) {
                          var i = this.mirror.getNode(r);
                          if (!i) return this.debugNodeNotFound(e, r);
                          var a = ne(i, this.iframe),
                              o = t * a.absoluteScale + a.x,
                              s = n * a.absoluteScale + a.y;
                          this.mouse.style.left = o + "px", this.mouse.style.top = s + "px", this.drawMouseTail({
                              x: o,
                              y: s
                          }), this.hoverElements(i)
                      }, i.prototype.drawMouseTail = function(e) {
                          var t = this;
                          if (this.mouseTail) {
                              var n = !0 === this.config.mouseTail ? Ve : Object.assign({}, Ve, this.config.mouseTail),
                                  r = n.lineCap,
                                  i = n.lineWidth,
                                  a = n.strokeStyle,
                                  o = n.duration,
                                  s = function() {
                                      if (t.mouseTail) {
                                          var e = t.mouseTail.getContext("2d");
                                          e && t.tailPositions.length && (e.clearRect(0, 0, t.mouseTail.width, t.mouseTail.height), e.beginPath(), e.lineWidth = i, e.lineCap = r, e.strokeStyle = a, e.moveTo(t.tailPositions[0].x, t.tailPositions[0].y), t.tailPositions.forEach((function(t) {
                                              return e.lineTo(t.x, t.y)
                                          })), e.stroke())
                                      }
                                  };
                              this.tailPositions.push(e), s(), setTimeout((function() {
                                  t.tailPositions = t.tailPositions.filter((function(t) {
                                      return t !== e
                                  })), s()
                              }), o / this.speedService.state.context.timer.speed)
                          }
                      }, i.prototype.hoverElements = function(e) {
                          var t;
                          null === (t = this.iframe.contentDocument) || void 0 === t || t.querySelectorAll(".\\:hover").forEach((function(e) {
                              e.classList.remove(":hover")
                          }));
                          for (var n = e; n;) n.classList && n.classList.add(":hover"), n = n.parentElement
                      }, i.prototype.isUserInteraction = function(t) {
                          return t.type === e.EventType.IncrementalSnapshot && t.data.source > e.IncrementalSource.Mutation && t.data.source <= e.IncrementalSource.Input
                      }, i.prototype.backToNormal = function() {
                          this.nextUserInteractionEvent = null, this.speedService.state.matches("normal") || (this.speedService.send({
                              type: "BACK_TO_NORMAL"
                          }), this.emitter.emit(e.ReplayerEvents.SkipEnd, {
                              speed: this.speedService.state.context.normalSpeed
                          }))
                      }, i.prototype.restoreRealParent = function(e, n) {
                          this.mirror.map[n.__sn.id] = n, n.__sn.type === t.Element && "textarea" === n.__sn.tagName && e.textContent && (n.value = e.textContent), n.appendChild(e), this.restoreState(n)
                      }, i.prototype.storeState = function(e) {
                          var t, n;
                          if (e && e.nodeType === e.ELEMENT_NODE) {
                              var i = e;
                              (i.scrollLeft || i.scrollTop) && this.elementStateMap.set(e, {
                                  scroll: [i.scrollLeft, i.scrollTop]
                              }), "STYLE" === i.tagName && function(e, t) {
                                  var n;
                                  try {
                                      var r = Array.from((null === (n = e.sheet) || void 0 === n ? void 0 : n.cssRules) || []).map((function(e) {
                                          return e.cssText
                                      }));
                                      t.set(e, [{
                                          type: Ue.Snapshot,
                                          cssTexts: r
                                      }])
                                  } catch (e) {}
                              }(i, this.virtualStyleRulesMap);
                              var a = i.children;
                              try {
                                  for (var o = r(Array.from(a)), s = o.next(); !s.done; s = o.next()) {
                                      var l = s.value;
                                      this.storeState(l)
                                  }
                              } catch (e) {
                                  t = {
                                      error: e
                                  }
                              } finally {
                                  try {
                                      s && !s.done && (n = o.return) && n.call(o)
                                  } finally {
                                      if (t) throw t.error
                                  }
                              }
                          }
                      }, i.prototype.restoreState = function(e) {
                          var t, n;
                          if (e.nodeType === e.ELEMENT_NODE) {
                              var i = e;
                              if (this.elementStateMap.has(e)) {
                                  var a = this.elementStateMap.get(e);
                                  a.scroll && (i.scrollLeft = a.scroll[0], i.scrollTop = a.scroll[1]), this.elementStateMap.delete(e)
                              }
                              var o = i.children;
                              try {
                                  for (var s = r(Array.from(o)), l = s.next(); !l.done; l = s.next()) {
                                      var u = l.value;
                                      this.restoreState(u)
                                  }
                              } catch (e) {
                                  t = {
                                      error: e
                                  }
                              } finally {
                                  try {
                                      l && !l.done && (n = s.return) && n.call(s)
                                  } finally {
                                      if (t) throw t.error
                                  }
                              }
                          }
                      }, i.prototype.restoreNodeSheet = function(e) {
                          var t = this.virtualStyleRulesMap.get(e);
                          "STYLE" === e.nodeName && t && We(t, e)
                      }, i.prototype.warnNodeNotFound = function(e, t) {
                          this.treeIndex.removeIdSet.has(t) ? this.warn("Node with id '" + t + "' was previously removed. ", e) : this.warn("Node with id '" + t + "' not found. ", e)
                      }, i.prototype.warnCanvasMutationFailed = function(e, t, n) {
                          this.warn("Has error on update canvas '" + t + "'", e, n)
                      }, i.prototype.debugNodeNotFound = function(e, t) {
                          this.treeIndex.removeIdSet.has(t) ? this.debug("[replayer]", "Node with id '" + t + "' was previously removed. ", e) : this.debug("[replayer]", "Node with id '" + t + "' not found. ", e)
                      }, i.prototype.warn = function() {
                          for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                          this.config.showWarning && console.warn.apply(console, a(["[replayer]"], e))
                      }, i.prototype.debug = function() {
                          for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                          this.config.showDebug && console.log.apply(console, a(["[replayer]"], e))
                      }, i
                  }(),
                  Je = Ce.addCustomEvent,
                  Ke = Ce.freezePage;
              return e.Replayer = Xe, e.addCustomEvent = Je, e.freezePage = Ke, e.record = Ce, e.utils = ie, Object.defineProperty(e, "__esModule", {
                  value: !0
              }), e
          }({});
  
      function x() {
          throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs")
      }
  
      function E(e, t) {
          return e(t = {
              exports: {}
          }, t.exports), t.exports
      }! function(e) {
          function t() {}
  
          function n(e, t) {
              for (const n in t) e[n] = t[n];
              return e
          }
  
          function r(e) {
              return e()
          }
  
          function i() {
              return Object.create(null)
          }
  
          function a(e) {
              e.forEach(r)
          }
  
          function o(e) {
              return "function" == typeof e
          }
  
          function s(e, t) {
              return e != e ? t == t : e !== t || e && "object" == typeof e || "function" == typeof e
          }
  
          function l(e) {
              const t = {};
              for (const n in e) "$" !== n[0] && (t[n] = e[n]);
              return t
          }
  
          function u(e, t) {
              e.appendChild(t)
          }
  
          function c(e, t, n) {
              e.insertBefore(t, n || null)
          }
  
          function d(e) {
              e.parentNode.removeChild(e)
          }
  
          function f(e, t) {
              for (let n = 0; n < e.length; n += 1) e[n] && e[n].d(t)
          }
  
          function h(e) {
              return document.createElement(e)
          }
  
          function p(e) {
              return document.createElementNS("http://www.w3.org/2000/svg", e)
          }
  
          function m(e) {
              return document.createTextNode(e)
          }
  
          function v() {
              return m(" ")
          }
  
          function g(e, t, n, r) {
              return e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)
          }
  
          function y(e, t, n) {
              null == n ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n)
          }
  
          function b(e, t) {
              "" + t, e.wholeText !== t && (e.data = t)
          }
  
          function w(e, t, n, r) {
              e.style.setProperty(t, n, r ? "important" : "")
          }
  
          function _(e, t, n) {
              e.classList[n ? "add" : "remove"](t)
          }
          let k;
  
          function S(e) {
              e
          }
  
          function x() {
              if (!k) throw new Error("Function called outside component initialization");
              return k
          }
  
          function E(e) {
              x().$$.on_mount.push(e)
          }
  
          function T(e) {
              x().$$.on_destroy.push(e)
          }
          const C = [],
              I = [],
              M = [],
              N = [],
              O = Promise.resolve();
          let D = !1;
  
          function A(e) {
              M.push(e)
          }
          let R = !1;
          const $ = new Set;
  
          function F() {
              if (!R) {
                  !0;
                  do {
                      for (let e = 0; e < C.length; e += 1) {
                          const t = C[e];
                          S(t), z(t.$$)
                      }
                      for (S(null), C.length = 0; I.length;) I.pop()();
                      for (let e = 0; e < M.length; e += 1) {
                          const t = M[e];
                          $.has(t) || ($.add(t), t())
                      }
                      M.length = 0
                  } while (C.length);
                  for (; N.length;) N.pop()();
                  !1, !1, $.clear()
              }
          }
  
          function z(e) {
              if (null !== e.fragment) {
                  e.update(), a(e.before_update);
                  const t = e.dirty;
                  e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(A)
              }
          }
          const L = new Set;
          let P;
  
          function j() {
              ({
                  r: 0,
                  c: [],
                  p: P
              })
          }
  
          function B() {
              P.r || a(P.c), P.p
          }
  
          function U(e, t) {
              e && e.i && (L.delete(e), e.i(t))
          }
  
          function H(e, t, n, r) {
              if (e && e.o) {
                  if (L.has(e)) return;
                  L.add(e), P.c.push((() => {
                      L.delete(e), r && (n && e.d(1), r())
                  })), e.o(t)
              }
          }
  
          function Y(e) {
              e && e.c()
          }
  
          function q(e, t, n, i) {
              const {
                  fragment: s,
                  on_mount: l,
                  on_destroy: u,
                  after_update: c
              } = e.$$;
              s && s.m(t, n), i || A((() => {
                  const t = l.map(r).filter(o);
                  u ? u.push(...t) : a(t), e.$$.on_mount = []
              })), c.forEach(A)
          }
  
          function W(e, t) {
              const n = e.$$;
              null !== n.fragment && (a(n.on_destroy), n.fragment && n.fragment.d(t), n.on_destroy = n.fragment = null, n.ctx = [])
          }
  
          function Z(e, n, r, o, s, l, u, c = [-1]) {
              const f = k;
              S(e);
              const h = e.$$ = {
                  fragment: null,
                  ctx: null,
                  props: l,
                  update: t,
                  not_equal: s,
                  bound: i(),
                  on_mount: [],
                  on_destroy: [],
                  on_disconnect: [],
                  before_update: [],
                  after_update: [],
                  context: new Map(f ? f.$$.context : n.context || []),
                  callbacks: i(),
                  dirty: c,
                  skip_bound: !1,
                  root: n.target || f.$$.root
              };
              u && u(h.root);
              let p = !1;
              if (h.ctx = r ? r(e, n.props || {}, ((t, n, ...r) => {
                      const i = r.length ? r[0] : n;
                      return h.ctx && s(h.ctx[t], h.ctx[t] = i) && (!h.skip_bound && h.bound[t] && h.bound[t](i), p && function(e, t) {
                          -1 === e.$$.dirty[0] && (C.push(e), D || (!0, O.then(F)), e.$$.dirty.fill(0)), e.$$.dirty[t / 31 | 0] |= 1 << t % 31
                      }(e, t)), n
                  })) : [], h.update(), !0, a(h.before_update), h.fragment = !!o && o(h.ctx), n.target) {
                  if (n.hydrate) {
                      const e = function(e) {
                          return Array.from(e.childNodes)
                      }(n.target);
                      h.fragment && h.fragment.l(e), e.forEach(d)
                  } else h.fragment && h.fragment.c();
                  n.intro && U(e.$$.fragment), q(e, n.target, n.anchor, n.customElement), F()
              }
              S(f)
          }
          class V {
              $destroy() {
                  W(this, 1), this.$destroy = t
              }
              $on(e, t) {
                  const n = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
                  return n.push(t), () => {
                      const e = n.indexOf(t); - 1 !== e && n.splice(e, 1)
                  }
              }
              $set(e) {
                  var t;
                  this.$$set && (e, 0 !== Object.keys(t).length) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1)
              }
          }
  
          function X(e) {
              let t = "";
              return Object.keys(e).forEach((t => {
                  `${t}: ${e[t]};`
              })), t
          }
  
          function J(e, t = 2) {
              let n = String(e);
              const r = Math.pow(10, t - 1);
              if (e < r)
                  for (; String(r).length > n.length;) "0" + e;
              return n
          }
          const K = 36e5;
  
          function G(e) {
              if (e <= 0) return "00:00";
              const t = Math.floor(e / K);
              K;
              const n = Math.floor(e / 6e4);
              6e4;
              const r = Math.floor(e / 1e3);
              return t ? `${J(t)}:${J(n)}:${J(r)}` : `${J(n)}:${J(r)}`
          }
  
          function Q() {
              return document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement
          }
  
          function ee(e) {
              return {
                  "[object Boolean]": "boolean",
                  "[object Number]": "number",
                  "[object String]": "string",
                  "[object Function]": "function",
                  "[object Array]": "array",
                  "[object Date]": "date",
                  "[object RegExp]": "regExp",
                  "[object Undefined]": "undefined",
                  "[object Null]": "null",
                  "[object Object]": "object"
              } [Object.prototype.toString.call(e)]
          }
  
          function te(e) {
              let n, r, i, a, o, s, l, f, p;
              return {
                  c() {
                      h("div"), h("input"), v(), h("label"), v(), h("span"), m(e[3]), y(r, "type", "checkbox"), y(r, "id", e[2]), r.disabled = e[1], y(r, "class", "svelte-9brlez"), y(a, "for", e[2]), y(a, "class", "svelte-9brlez"), y(s, "class", "label svelte-9brlez"), y(n, "class", "switch svelte-9brlez"), _(n, "disabled", e[1])
                  },
                  m(t, d) {
                      c(t, n, d), u(n, r), r.checked = e[0], u(n, i), u(n, a), u(n, o), u(n, s), u(s, l), f || (g(r, "change", e[4]), !0)
                  },
                  p(e, [t]) {
                      4 & t && y(r, "id", e[2]), 2 & t && (r.disabled = e[1]), 1 & t && (r.checked = e[0]), 4 & t && y(a, "for", e[2]), 8 & t && b(l, e[3]), 2 & t && _(n, "disabled", e[1])
                  },
                  i: t,
                  o: t,
                  d(e) {
                      e && d(n), !1, p()
                  }
              }
          }
  
          function ne(e, t, n) {
              let {
                  disabled: r
              } = t, {
                  checked: i
              } = t, {
                  id: a
              } = t, {
                  label: o
              } = t;
              return e.$$set = e => {
                  "disabled" in e && n(1, e.disabled), "checked" in e && n(0, e.checked), "id" in e && n(2, e.id), "label" in e && n(3, e.label)
              }, [i, r, a, o, function() {
                  this.checked, n(0, i)
              }]
          }
          class re extends V {
              constructor(e) {
                  super(), Z(this, e, ne, te, s, {
                      disabled: 1,
                      checked: 0,
                      id: 2,
                      label: 3
                  })
              }
          }
  
          function ie(e, t, n) {
              const r = e.slice();
              return r[33] = t[n], r
          }
  
          function ae(e, t, n) {
              const r = e.slice();
              return r[36] = t[n], r
          }
  
          function oe(e) {
              let t, n, r, i, o, s, l, p, k, S, x, E, T, C, M, O, D, A, R, $, F, z, L, P, j, B = G(e[6]) + "",
                  Z = G(e[8].totalTime) + "",
                  V = e[9],
                  X = [];
              for (let t = 0; t < V.length; t += 1) X[t] = se(ae(e, V, t));
  
              function J(e, t) {
                  return "playing" === e[7] ? ue : le
              }
              let K = J(e),
                  Q = K(e),
                  ee = e[3],
                  te = [];
              for (let t = 0; t < ee.length; t += 1) te[t] = ce(ie(e, ee, t));
  
              function ne(t) {
                  e[27](t)
              }
              let oe = {
                  id: "skip",
                  disabled: "skipping" === e[10],
                  label: "skip inactive"
              };
              return void 0 !== e[0] && (oe.checked = e[0]), new re({
                  props: oe
              }), I.push((() => function(e, t, n) {
                  const r = e.$$.props.checked;
                  void 0 !== r && (e.$$.bound[r] = n, n(e.$$.ctx[r]))
              }(R, 0, ne))), {
                  c() {
                      h("div"), h("div"), h("span"), m(B), v(), h("div"), h("div"), v();
                      for (let e = 0; e < X.length; e += 1) X[e].c();
                      v(), h("div"), v(), h("span"), m(Z), v(), h("div"), h("button"), Q.c(), v();
                      for (let e = 0; e < te.length; e += 1) te[e].c();
                      v(), Y(R.$$.fragment), v(), h("button"), z.innerHTML = '<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><defs><style type="text/css"></style></defs><path d="M916 380c-26.4 0-48-21.6-48-48L868 223.2 613.6 477.6c-18.4\n            18.4-48.8 18.4-68 0-18.4-18.4-18.4-48.8 0-68L800 156 692 156c-26.4\n            0-48-21.6-48-48 0-26.4 21.6-48 48-48l224 0c26.4 0 48 21.6 48 48l0\n            224C964 358.4 942.4 380 916 380zM231.2 860l108.8 0c26.4 0 48 21.6 48\n            48s-21.6 48-48 48l-224 0c-26.4 0-48-21.6-48-48l0-224c0-26.4 21.6-48\n            48-48 26.4 0 48 21.6 48 48L164 792l253.6-253.6c18.4-18.4 48.8-18.4\n            68 0 18.4 18.4 18.4 48.8 0 68L231.2 860z" p-id="1286"></path></svg>', y(r, "class", "rr-timeline__time svelte-19ke1iv"), y(l, "class", "rr-progress__step svelte-19ke1iv"), w(l, "width", e[13]), y(S, "class", "rr-progress__handler svelte-19ke1iv"), w(S, "left", e[13]), y(s, "class", "rr-progress svelte-19ke1iv"), _(s, "disabled", "skipping" === e[10]), y(E, "class", "rr-timeline__time svelte-19ke1iv"), y(n, "class", "rr-timeline svelte-19ke1iv"), y(O, "class", "svelte-19ke1iv"), y(z, "class", "svelte-19ke1iv"), y(M, "class", "rr-controller__btns svelte-19ke1iv"), y(t, "class", "rr-controller svelte-19ke1iv")
                  },
                  m(a, d) {
                      c(a, t, d), u(t, n), u(n, r), u(r, i), u(n, o), u(n, s), u(s, l), e[23](l), u(s, p);
                      for (let e = 0; e < X.length; e += 1) X[e].m(s, null);
                      u(s, k), u(s, S), e[24](s), u(n, x), u(n, E), u(E, T), u(t, C), u(t, M), u(M, O), Q.m(O, null), u(M, D);
                      for (let e = 0; e < te.length; e += 1) te[e].m(M, null);
                      u(M, A), q(R, M, null), u(M, F), u(M, z), !0, P || ([g(s, "click", e[25]), g(O, "click", e[4]), g(z, "click", e[28])], !0)
                  },
                  p(e, t) {
                      if ((!L || 64 & t[0]) && B !== G(e[6]) + "" && b(i, B), (!L || 8192 & t[0]) && w(l, "width", e[13]), 512 & t[0]) {
                          let n;
                          for (e[9], 0; n < V.length; n += 1) {
                              const r = ae(e, V, n);
                              X[n] ? X[n].p(r, t) : (X[n] = se(r), X[n].c(), X[n].m(s, k))
                          }
                          for (; n < X.length; n += 1) X[n].d(1);
                          X.length = V.length
                      }
                      if ((!L || 8192 & t[0]) && w(S, "left", e[13]), 1024 & t[0] && _(s, "disabled", "skipping" === e[10]), (!L || 256 & t[0]) && Z !== G(e[8].totalTime) + "" && b(T, Z), K !== J(e) && (Q.d(1), K(e), Q && (Q.c(), Q.m(O, null))), 1066 & t[0]) {
                          let n;
                          for (e[3], 0; n < ee.length; n += 1) {
                              const r = ie(e, ee, n);
                              te[n] ? te[n].p(r, t) : (te[n] = ce(r), te[n].c(), te[n].m(M, A))
                          }
                          for (; n < te.length; n += 1) te[n].d(1);
                          te.length = ee.length
                      }
                      const n = {};
                      var r;
                      1024 & t[0] && (n.disabled = "skipping" === e[10]), !$ && 1 & t[0] && (!0, n.checked = e[0], () => !1, N.push(r)), R.$set(n)
                  },
                  i(e) {
                      L || (U(R.$$.fragment, e), !0)
                  },
                  o(e) {
                      H(R.$$.fragment, e), !1
                  },
                  d(n) {
                      n && d(t), e[23](null), f(X, n), e[24](null), Q.d(), f(te, n), W(R), !1, a(j)
                  }
              }
          }
  
          function se(e) {
              let t, n;
              return {
                  c() {
                      h("div"), y(t, "title", e[36].name), w(t, "width", "10px"), w(t, "height", "5px"), w(t, "position", "absolute"), w(t, "top", "2px"), w(t, "transform", "translate(-50%, -50%)"), w(t, "background", e[36].background), w(t, "left", e[36].position)
                  },
                  m(e, n) {
                      c(e, t, n)
                  },
                  p(e, r) {
                      512 & r[0] && n !== e[36].name && y(t, "title", n), 512 & r[0] && w(t, "background", e[36].background), 512 & r[0] && w(t, "left", e[36].position)
                  },
                  d(e) {
                      e && d(t)
                  }
              }
          }
  
          function le(e) {
              let t, n;
              return {
                  c() {
                      p("svg"), p("path"), y(n, "d", "M170.65984 896l0-768 640 384zM644.66944\n              512l-388.66944-233.32864 0 466.65728z"), y(t, "class", "icon"), y(t, "viewBox", "0 0 1024 1024"), y(t, "version", "1.1"), y(t, "xmlns", "http://www.w3.org/2000/svg"), y(t, "xmlns:xlink", "http://www.w3.org/1999/xlink"), y(t, "width", "16"), y(t, "height", "16")
                  },
                  m(e, r) {
                      c(e, t, r), u(t, n)
                  },
                  d(e) {
                      e && d(t)
                  }
              }
          }
  
          function ue(e) {
              let t, n;
              return {
                  c() {
                      p("svg"), p("path"), y(n, "d", "M682.65984 128q53.00224 0 90.50112 37.49888t37.49888 90.50112l0\n              512q0 53.00224-37.49888 90.50112t-90.50112\n              37.49888-90.50112-37.49888-37.49888-90.50112l0-512q0-53.00224\n              37.49888-90.50112t90.50112-37.49888zM341.34016 128q53.00224 0\n              90.50112 37.49888t37.49888 90.50112l0 512q0 53.00224-37.49888\n              90.50112t-90.50112\n              37.49888-90.50112-37.49888-37.49888-90.50112l0-512q0-53.00224\n              37.49888-90.50112t90.50112-37.49888zM341.34016 213.34016q-17.67424\n              0-30.16704 12.4928t-12.4928 30.16704l0 512q0 17.67424 12.4928\n              30.16704t30.16704 12.4928 30.16704-12.4928\n              12.4928-30.16704l0-512q0-17.67424-12.4928-30.16704t-30.16704-12.4928zM682.65984\n              213.34016q-17.67424 0-30.16704 12.4928t-12.4928 30.16704l0 512q0\n              17.67424 12.4928 30.16704t30.16704 12.4928 30.16704-12.4928\n              12.4928-30.16704l0-512q0-17.67424-12.4928-30.16704t-30.16704-12.4928z"), y(t, "class", "icon"), y(t, "viewBox", "0 0 1024 1024"), y(t, "version", "1.1"), y(t, "xmlns", "http://www.w3.org/2000/svg"), y(t, "xmlns:xlink", "http://www.w3.org/1999/xlink"), y(t, "width", "16"), y(t, "height", "16")
                  },
                  m(e, r) {
                      c(e, t, r), u(t, n)
                  },
                  d(e) {
                      e && d(t)
                  }
              }
          }
  
          function ce(e) {
              let t, n, r, i, a, o, s = e[33] + "";
  
              function l() {
                  return e[26](e[33])
              }
              return {
                  c() {
                      h("button"), m(s), m("x"), t.disabled = "skipping" === e[10], y(t, "class", "svelte-19ke1iv"), _(t, "active", e[33] === e[1] && "skipping" !== e[10])
                  },
                  m(e, i) {
                      c(e, t, i), u(t, n), u(t, r), a || (g(t, "click", l), !0)
                  },
                  p(r, a) {
                      r,
                      8 & a[0] && s !== e[33] + "" && b(n, s),
                      1024 & a[0] && i !== ("skipping" === e[10]) && (t.disabled = i),
                      1034 & a[0] && _(t, "active", e[33] === e[1] && "skipping" !== e[10])
                  },
                  d(e) {
                      e && d(t), !1, o()
                  }
              }
          }
  
          function de(e) {
              let t, n, r = e[2] && oe(e);
              return {
                  c() {
                      r && r.c(), m("")
                  },
                  m(e, n) {
                      r && r.m(e, n), c(e, t, n), !0
                  },
                  p(e, n) {
                      e[2] ? r ? (r.p(e, n), 4 & n[0] && U(r, 1)) : (oe(e), r.c(), U(r, 1), r.m(t.parentNode, t)) : r && (j(), H(r, 1, 1, (() => {
                          null
                      })), B())
                  },
                  i(e) {
                      n || (U(r), !0)
                  },
                  o(e) {
                      H(r), !1
                  },
                  d(e) {
                      r && r.d(e), e && d(t)
                  }
              }
          }
  
          function fe(t, n, r) {
              const i = function() {
                  const e = x();
                  return (t, n) => {
                      const r = e.$$.callbacks[t];
                      if (r) {
                          const i = function(e, t, n = !1) {
                              const r = document.createEvent("CustomEvent");
                              return r.initCustomEvent(e, n, !1, t), r
                          }(t, n);
                          r.slice().forEach((t => {
                              t.call(e, i)
                          }))
                      }
                  }
              }();
              let a, o, s, l, u, c, d, f, {
                      replayer: h
                  } = n,
                  {
                      showController: p
                  } = n,
                  {
                      autoPlay: m
                  } = n,
                  {
                      skipInactive: v
                  } = n,
                  {
                      speedOption: g
                  } = n,
                  {
                      speed: y = (g.length ? g[0] : 1)
                  } = n,
                  {
                      tags: b = {}
                  } = n,
                  w = 0,
                  _ = null;
              const k = () => {
                      _ && (cancelAnimationFrame(_), null)
                  },
                  S = () => {
                      "paused" === a && (u ? (h.play(), !1) : h.play(w))
                  },
                  C = () => {
                      "playing" === a && h.pause()
                  },
                  M = (e, t) => {
                      r(6, e), ("boolean" == typeof t ? t : "playing" === a) ? h.play(e) : h.pause(e)
                  },
                  N = e => {
                      if ("skipping" === o) return;
                      const t = s.getBoundingClientRect();
                      let n = (e.clientX - t.left) / t.width;
                      n < 0 ? 0 : n > 1 && 1;
                      const r = c.totalTime * n;
                      M(r)
                  },
                  O = e => {
                      let t = "playing" === a;
                      r(1, e), t && h.pause(), h.setConfig({
                          speed: y
                      }), t && h.play(w)
                  };
              var D;
              return E((() => {
                  r(7, h.service.state.value), r(10, h.speedService.state.value), h.on("state-change", (e => {
                      const {
                          player: t,
                          speed: n
                      } = e;
                      if ((null == t ? void 0 : t.value) && a !== t.value) switch (r(7, t.value), a) {
                          case "playing":
                              k(), requestAnimationFrame((function e() {
                                  r(6, h.getCurrentTime()), w < c.totalTime && requestAnimationFrame(e)
                              }));
                              break;
                          case "paused":
                              k()
                      }(null == n ? void 0 : n.value) && o !== n.value && r(10, n.value)
                  })), h.on("finish", (() => {
                      !0
                  })), m && h.play()
              })), () => {
                  v !== h.config.skipInactive && h.setConfig({
                      skipInactive: v
                  })
              }, x().$$.after_update.push(D), T((() => {
                  h.pause(), k()
              })), t.$$set = e => {
                  "replayer" in e && r(16, e.replayer), "showController" in e && r(2, e.showController), "autoPlay" in e && r(17, e.autoPlay), "skipInactive" in e && r(0, e.skipInactive), "speedOption" in e && r(3, e.speedOption), "speed" in e && r(1, e.speed), "tags" in e && r(18, e.tags)
              }, t.$$.update = () => {
                  if (64 & t.$$.dirty[0] && i("ui-update-current-time", {
                          payload: w
                      }), 128 & t.$$.dirty[0] && i("ui-update-player-state", {
                          payload: a
                      }), 65536 & t.$$.dirty[0] && r(8, h.getMetaData()), 320 & t.$$.dirty[0]) {
                      const e = Math.min(1, w / c.totalTime);
                      r(13, 100 * e + "%"), i("ui-update-progress", {
                          payload: e
                      })
                  }
                  327680 & t.$$.dirty[0] && r(9, (() => {
                      const {
                          context: t
                      } = h.service.state, n = t.events.length, r = t.events[0].timestamp, i = t.events[n - 1].timestamp, a = [];
                      return t.events.forEach((t => {
                          if (t.type === e.EventType.Custom) {
                              const e = {
                                  name: t.data.tag,
                                  background: b[t.data.tag] || "rgb(73, 80, 246)",
                                  position: `${r,i,t.timestamp,(100-(o-s)/(o-n)*100).toFixed(2)}%`
                              };
                              a.push(e)
                          }
                          var n, o, s
                      })), a
                  })())
              }, [v, y, p, g, () => {
                  switch (a) {
                      case "playing":
                          C();
                          break;
                      case "paused":
                          S()
                  }
              }, O, w, a, c, f, o, s, l, d, i, N, h, m, b, S, C, M, () => {
                  r(0, !v)
              }, function(e) {
                  I[e ? "unshift" : "push"]((() => {
                      e,
                      r(12, l)
                  }))
              }, function(e) {
                  I[e ? "unshift" : "push"]((() => {
                      e,
                      r(11, s)
                  }))
              }, e => N(e), e => O(e), function(e) {
                  e,
                  r(0, v)
              }, () => i("fullscreen")]
          }
          class he extends V {
              constructor(e) {
                  super(), Z(this, e, fe, de, s, {
                      replayer: 16,
                      showController: 2,
                      autoPlay: 17,
                      skipInactive: 0,
                      speedOption: 3,
                      speed: 1,
                      tags: 18,
                      toggle: 4,
                      play: 19,
                      pause: 20,
                      goto: 21,
                      setSpeed: 5,
                      toggleSkipInactive: 22
                  }, null, [-1, -1])
              }
              get toggle() {
                  return this.$$.ctx[4]
              }
              get play() {
                  return this.$$.ctx[19]
              }
              get pause() {
                  return this.$$.ctx[20]
              }
              get goto() {
                  return this.$$.ctx[21]
              }
              get setSpeed() {
                  return this.$$.ctx[5]
              }
              get toggleSkipInactive() {
                  return this.$$.ctx[22]
              }
          }
  
          function pe(e) {
              let t, n, r = {
                  replayer: e[6],
                  showController: e[3],
                  autoPlay: e[1],
                  speedOption: e[2],
                  skipInactive: e[0],
                  tags: e[4]
              };
              return new he({
                  props: r
              }), e[29](t), t.$on("fullscreen", e[30]), {
                  c() {
                      Y(t.$$.fragment)
                  },
                  m(e, n) {
                      q(t, e, n), !0
                  },
                  p(e, n) {
                      const r = {};
                      64 & n[0] && (r.replayer = e[6]), 8 & n[0] && (r.showController = e[3]), 2 & n[0] && (r.autoPlay = e[1]), 4 & n[0] && (r.speedOption = e[2]), 1 & n[0] && (r.skipInactive = e[0]), 16 & n[0] && (r.tags = e[4]), t.$set(r)
                  },
                  i(e) {
                      n || (U(t.$$.fragment, e), !0)
                  },
                  o(e) {
                      H(t.$$.fragment, e), !1
                  },
                  d(n) {
                      e[29](null), W(t, n)
                  }
              }
          }
  
          function me(e) {
              let t, n, r, i, a = e[6] && pe(e);
              return {
                  c() {
                      h("div"), h("div"), v(), a && a.c(), y(n, "class", "rr-player__frame"), y(n, "style", e[10]), y(t, "class", "rr-player"), y(t, "style", e[11])
                  },
                  m(i, o) {
                      c(i, t, o), u(t, n), e[28](n), u(t, r), a && a.m(t, null), e[31](t), !0
                  },
                  p(e, r) {
                      (!i || 1024 & r[0]) && y(n, "style", e[10]), e[6] ? a ? (a.p(e, r), 64 & r[0] && U(a, 1)) : (pe(e), a.c(), U(a, 1), a.m(t, null)) : a && (j(), H(a, 1, 1, (() => {
                          null
                      })), B()), (!i || 2048 & r[0]) && y(t, "style", e[11])
                  },
                  i(e) {
                      i || (U(a), !0)
                  },
                  o(e) {
                      H(a), !1
                  },
                  d(n) {
                      n && d(t), e[28](null), a && a.d(), e[31](null)
                  }
              }
          }
  
          function ve(t, r, i) {
              let a, o, s, u, c, d, f, {
                      width: h = 1024
                  } = r,
                  {
                      height: p = 576
                  } = r,
                  {
                      events: m = []
                  } = r,
                  {
                      skipInactive: v = !0
                  } = r,
                  {
                      autoPlay: g = !0
                  } = r,
                  {
                      speedOption: y = [1, 2, 4, 8]
                  } = r,
                  {
                      speed: b = 1
                  } = r,
                  {
                      showController: w = !0
                  } = r,
                  {
                      tags: _ = {}
                  } = r,
                  k = h,
                  S = p;
              const x = (e, t) => {
                      const n = h / t.width,
                          r = p / t.height;
                      e.style.transform = `scale(${Math.min(n,r,1)})translate(-50%, -50%)`
                  },
                  C = () => {
                      var e;
                      o && (Q() ? document.exitFullscreen ? document.exitFullscreen() : document.mozExitFullscreen ? document.mozExitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen() : o.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen())
                  };
              return E((() => {
                  if (void 0 !== y && "array" !== ee(y)) throw new Error("speedOption must be array");
                  if (y.forEach((e => {
                          if ("number" !== ee(e)) throw new Error("item of speedOption must be number")
                      })), y.indexOf(b) < 0) throw new Error(`speed must be one of speedOption,\n        current config:\n        {\n          ...\n          speed: ${b},\n          speedOption: [${y.toString()}]\n          ...\n        }\n        `);
                  var t;
                  i(6, new e.Replayer(m, Object.assign({
                      speed: b,
                      root: s,
                      unpackFn: e.unpack
                  }, r))), a.on("resize", (e => {
                      x(a.wrapper, e)
                  })), () => {
                      Q() ? setTimeout((() => {
                          h,
                          p,
                          i(12, o.offsetWidth),
                          i(13, o.offsetHeight),
                          x(a.wrapper, {
                              width: a.iframe.offsetWidth,
                              height: a.iframe.offsetHeight
                          })
                      }), 0) : (i(12, k), i(13, S), x(a.wrapper, {
                          width: a.iframe.offsetWidth,
                          height: a.iframe.offsetHeight
                      }))
                  }, document.addEventListener("fullscreenchange", t), document.addEventListener("webkitfullscreenchange", t), document.addEventListener("mozfullscreenchange", t), document.addEventListener("MSFullscreenChange", t), () => {
                      document.removeEventListener("fullscreenchange", t), document.removeEventListener("webkitfullscreenchange", t), document.removeEventListener("mozfullscreenchange", t), document.removeEventListener("MSFullscreenChange", t)
                  }
              })), T((() => {
                  u && u()
              })), t.$$set = e => {
                  i(36, n(n({}, r), l(e))), "width" in e && i(12, e.width), "height" in e && i(13, e.height), "events" in e && i(14, e.events), "skipInactive" in e && i(0, e.skipInactive), "autoPlay" in e && i(1, e.autoPlay), "speedOption" in e && i(2, e.speedOption), "speed" in e && i(15, e.speed), "showController" in e && i(3, e.showController), "tags" in e && i(4, e.tags)
              }, t.$$.update = () => {
                  12288 & t.$$.dirty[0] && i(10, X({
                      width: `${h}px`,
                      height: `${p}px`
                  })), 12296 & t.$$.dirty[0] && i(11, X({
                      width: `${h}px`,
                      height: `${p+(w?80:0)}px`
                  }))
              }, l(r), [v, g, y, w, _, C, a, o, s, c, d, f, h, p, m, b, () => a.getMirror(), () => {
                  x(a.wrapper, {
                      width: a.iframe.offsetWidth,
                      height: a.iframe.offsetHeight
                  })
              }, (e, t) => {
                  switch (a.on(e, t), e) {
                      case "ui-update-current-time":
                      case "ui-update-progress":
                      case "ui-update-player-state":
                          c.$on(e, (({
                              detail: e
                          }) => t(e)))
                  }
              }, e => {
                  a.addEvent(e)
              }, () => a.getMetaData(), () => a, () => {
                  c.toggle()
              }, e => {
                  c.setSpeed(e)
              }, () => {
                  c.toggleSkipInactive()
              }, () => {
                  c.play()
              }, () => {
                  c.pause()
              }, (e, t) => {
                  c.goto(e, t)
              }, function(e) {
                  I[e ? "unshift" : "push"]((() => {
                      e,
                      i(8, s)
                  }))
              }, function(e) {
                  I[e ? "unshift" : "push"]((() => {
                      e,
                      i(9, c)
                  }))
              }, () => C(), function(e) {
                  I[e ? "unshift" : "push"]((() => {
                      e,
                      i(7, o)
                  }))
              }]
          }
          class ge extends V {
              constructor(e) {
                  super(), Z(this, e, ve, me, s, {
                      width: 12,
                      height: 13,
                      events: 14,
                      skipInactive: 0,
                      autoPlay: 1,
                      speedOption: 2,
                      speed: 15,
                      showController: 3,
                      tags: 4,
                      getMirror: 16,
                      triggerResize: 17,
                      toggleFullscreen: 5,
                      addEventListener: 18,
                      addEvent: 19,
                      getMetaData: 20,
                      getReplayer: 21,
                      toggle: 22,
                      setSpeed: 23,
                      toggleSkipInactive: 24,
                      play: 25,
                      pause: 26,
                      goto: 27
                  }, null, [-1, -1])
              }
              get getMirror() {
                  return this.$$.ctx[16]
              }
              get triggerResize() {
                  return this.$$.ctx[17]
              }
              get toggleFullscreen() {
                  return this.$$.ctx[5]
              }
              get addEventListener() {
                  return this.$$.ctx[18]
              }
              get addEvent() {
                  return this.$$.ctx[19]
              }
              get getMetaData() {
                  return this.$$.ctx[20]
              }
              get getReplayer() {
                  return this.$$.ctx[21]
              }
              get toggle() {
                  return this.$$.ctx[22]
              }
              get setSpeed() {
                  return this.$$.ctx[23]
              }
              get toggleSkipInactive() {
                  return this.$$.ctx[24]
              }
              get play() {
                  return this.$$.ctx[25]
              }
              get pause() {
                  return this.$$.ctx[26]
              }
              get goto() {
                  return this.$$.ctx[27]
              }
          }
      }(S);
      var T = E((function(e, t) {
              e.exports = function e(t, n, r) {
                  function i(o, s) {
                      if (!n[o]) {
                          if (!t[o]) {
                              if (!s && x) return x();
                              if (a) return a(o, !0);
                              var l = new Error("Cannot find module '" + o + "'");
                              throw l.code = "MODULE_NOT_FOUND", l
                          }
                          var u = n[o] = {
                              exports: {}
                          };
                          t[o][0].call(u.exports, (function(e) {
                              return i(t[o][1][e] || e)
                          }), u, u.exports, e, t, n, r)
                      }
                      return n[o].exports
                  }
                  for (var a = x, o = 0; o < r.length; o++) i(r[o]);
                  return i
              }({
                  1: [function(e, t, n) {
                      var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
  
                      function i(e, t) {
                          return Object.prototype.hasOwnProperty.call(e, t)
                      }
                      n.assign = function(e) {
                          for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
                              var n = t.shift();
                              if (n) {
                                  if ("object" != typeof n) throw new TypeError(n + "must be non-object");
                                  for (var r in n) i(n, r) && (e[r] = n[r])
                              }
                          }
                          return e
                      }, n.shrinkBuf = function(e, t) {
                          return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e)
                      };
                      var a = {
                              arraySet: function(e, t, n, r, i) {
                                  if (t.subarray && e.subarray) e.set(t.subarray(n, n + r), i);
                                  else
                                      for (var a = 0; a < r; a++) e[i + a] = t[n + a]
                              },
                              flattenChunks: function(e) {
                                  var t, n, r, i, a, o;
                                  for (r = 0, t = 0, n = e.length; t < n; t++) r += e[t].length;
                                  for (o = new Uint8Array(r), i = 0, t = 0, n = e.length; t < n; t++) a = e[t], o.set(a, i), i += a.length;
                                  return o
                              }
                          },
                          o = {
                              arraySet: function(e, t, n, r, i) {
                                  for (var a = 0; a < r; a++) e[i + a] = t[n + a]
                              },
                              flattenChunks: function(e) {
                                  return [].concat.apply([], e)
                              }
                          };
                      n.setTyped = function(e) {
                          e ? (n.Buf8 = Uint8Array, n.Buf16 = Uint16Array, n.Buf32 = Int32Array, n.assign(n, a)) : (n.Buf8 = Array, n.Buf16 = Array, n.Buf32 = Array, n.assign(n, o))
                      }, n.setTyped(r)
                  }, {}],
                  2: [function(e, t, n) {
                      var r = e("./common"),
                          i = !0,
                          a = !0;
                      try {
                          String.fromCharCode.apply(null, [0])
                      } catch (e) {
                          i = !1
                      }
                      try {
                          String.fromCharCode.apply(null, new Uint8Array(1))
                      } catch (e) {
                          a = !1
                      }
                      for (var o = new r.Buf8(256), s = 0; s < 256; s++) o[s] = s >= 252 ? 6 : s >= 248 ? 5 : s >= 240 ? 4 : s >= 224 ? 3 : s >= 192 ? 2 : 1;
  
                      function l(e, t) {
                          if (t < 65534 && (e.subarray && a || !e.subarray && i)) return String.fromCharCode.apply(null, r.shrinkBuf(e, t));
                          for (var n = "", o = 0; o < t; o++) n += String.fromCharCode(e[o]);
                          return n
                      }
                      o[254] = o[254] = 1, n.string2buf = function(e) {
                          var t, n, i, a, o, s = e.length,
                              l = 0;
                          for (a = 0; a < s; a++) 55296 == (64512 & (n = e.charCodeAt(a))) && a + 1 < s && 56320 == (64512 & (i = e.charCodeAt(a + 1))) && (n = 65536 + (n - 55296 << 10) + (i - 56320), a++), l += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
                          for (t = new r.Buf8(l), o = 0, a = 0; o < l; a++) 55296 == (64512 & (n = e.charCodeAt(a))) && a + 1 < s && 56320 == (64512 & (i = e.charCodeAt(a + 1))) && (n = 65536 + (n - 55296 << 10) + (i - 56320), a++), n < 128 ? t[o++] = n : n < 2048 ? (t[o++] = 192 | n >>> 6, t[o++] = 128 | 63 & n) : n < 65536 ? (t[o++] = 224 | n >>> 12, t[o++] = 128 | n >>> 6 & 63, t[o++] = 128 | 63 & n) : (t[o++] = 240 | n >>> 18, t[o++] = 128 | n >>> 12 & 63, t[o++] = 128 | n >>> 6 & 63, t[o++] = 128 | 63 & n);
                          return t
                      }, n.buf2binstring = function(e) {
                          return l(e, e.length)
                      }, n.binstring2buf = function(e) {
                          for (var t = new r.Buf8(e.length), n = 0, i = t.length; n < i; n++) t[n] = e.charCodeAt(n);
                          return t
                      }, n.buf2string = function(e, t) {
                          var n, r, i, a, s = t || e.length,
                              u = new Array(2 * s);
                          for (r = 0, n = 0; n < s;)
                              if ((i = e[n++]) < 128) u[r++] = i;
                              else if ((a = o[i]) > 4) u[r++] = 65533, n += a - 1;
                          else {
                              for (i &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && n < s;) i = i << 6 | 63 & e[n++], a--;
                              a > 1 ? u[r++] = 65533 : i < 65536 ? u[r++] = i : (i -= 65536, u[r++] = 55296 | i >> 10 & 1023, u[r++] = 56320 | 1023 & i)
                          }
                          return l(u, r)
                      }, n.utf8border = function(e, t) {
                          var n;
                          for ((t = t || e.length) > e.length && (t = e.length), n = t - 1; n >= 0 && 128 == (192 & e[n]);) n--;
                          return n < 0 || 0 === n ? t : n + o[e[n]] > t ? n : t
                      }
                  }, {
                      "./common": 1
                  }],
                  3: [function(e, t, n) {
                      t.exports = function(e, t, n, r) {
                          for (var i = 65535 & e | 0, a = e >>> 16 & 65535 | 0, o = 0; 0 !== n;) {
                              n -= o = n > 2e3 ? 2e3 : n;
                              do {
                                  a = a + (i = i + t[r++] | 0) | 0
                              } while (--o);
                              i %= 65521, a %= 65521
                          }
                          return i | a << 16 | 0
                      }
                  }, {}],
                  4: [function(e, t, n) {
                      t.exports = {
                          Z_NO_FLUSH: 0,
                          Z_PARTIAL_FLUSH: 1,
                          Z_SYNC_FLUSH: 2,
                          Z_FULL_FLUSH: 3,
                          Z_FINISH: 4,
                          Z_BLOCK: 5,
                          Z_TREES: 6,
                          Z_OK: 0,
                          Z_STREAM_END: 1,
                          Z_NEED_DICT: 2,
                          Z_ERRNO: -1,
                          Z_STREAM_ERROR: -2,
                          Z_DATA_ERROR: -3,
                          Z_BUF_ERROR: -5,
                          Z_NO_COMPRESSION: 0,
                          Z_BEST_SPEED: 1,
                          Z_BEST_COMPRESSION: 9,
                          Z_DEFAULT_COMPRESSION: -1,
                          Z_FILTERED: 1,
                          Z_HUFFMAN_ONLY: 2,
                          Z_RLE: 3,
                          Z_FIXED: 4,
                          Z_DEFAULT_STRATEGY: 0,
                          Z_BINARY: 0,
                          Z_TEXT: 1,
                          Z_UNKNOWN: 2,
                          Z_DEFLATED: 8
                      }
                  }, {}],
                  5: [function(e, t, n) {
                      var r = function() {
                          for (var e, t = [], n = 0; n < 256; n++) {
                              e = n;
                              for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                              t[n] = e
                          }
                          return t
                      }();
                      t.exports = function(e, t, n, i) {
                          var a = r,
                              o = i + n;
                          e ^= -1;
                          for (var s = i; s < o; s++) e = e >>> 8 ^ a[255 & (e ^ t[s])];
                          return -1 ^ e
                      }
                  }, {}],
                  6: [function(e, t, n) {
                      t.exports = function() {
                          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
                      }
                  }, {}],
                  7: [function(e, t, n) {
                      t.exports = function(e, t) {
                          var n, r, i, a, o, s, l, u, c, d, f, h, p, m, v, g, y, b, w, _, k, S, x, E, T;
                          n = e.state, r = e.next_in, E = e.input, i = r + (e.avail_in - 5), a = e.next_out, T = e.output, o = a - (t - e.avail_out), s = a + (e.avail_out - 257), l = n.dmax, u = n.wsize, c = n.whave, d = n.wnext, f = n.window, h = n.hold, p = n.bits, m = n.lencode, v = n.distcode, g = (1 << n.lenbits) - 1, y = (1 << n.distbits) - 1;
                          e: do {
                              p < 15 && (h += E[r++] << p, p += 8, h += E[r++] << p, p += 8), b = m[h & g];
                              t: for (;;) {
                                  if (h >>>= w = b >>> 24, p -= w, 0 == (w = b >>> 16 & 255)) T[a++] = 65535 & b;
                                  else {
                                      if (!(16 & w)) {
                                          if (0 == (64 & w)) {
                                              b = m[(65535 & b) + (h & (1 << w) - 1)];
                                              continue t
                                          }
                                          if (32 & w) {
                                              n.mode = 12;
                                              break e
                                          }
                                          e.msg = "invalid literal/length code", n.mode = 30;
                                          break e
                                      }
                                      _ = 65535 & b, (w &= 15) && (p < w && (h += E[r++] << p, p += 8), _ += h & (1 << w) - 1, h >>>= w, p -= w), p < 15 && (h += E[r++] << p, p += 8, h += E[r++] << p, p += 8), b = v[h & y];
                                      n: for (;;) {
                                          if (h >>>= w = b >>> 24, p -= w, !(16 & (w = b >>> 16 & 255))) {
                                              if (0 == (64 & w)) {
                                                  b = v[(65535 & b) + (h & (1 << w) - 1)];
                                                  continue n
                                              }
                                              e.msg = "invalid distance code", n.mode = 30;
                                              break e
                                          }
                                          if (k = 65535 & b, p < (w &= 15) && (h += E[r++] << p, (p += 8) < w && (h += E[r++] << p, p += 8)), (k += h & (1 << w) - 1) > l) {
                                              e.msg = "invalid distance too far back", n.mode = 30;
                                              break e
                                          }
                                          if (h >>>= w, p -= w, k > (w = a - o)) {
                                              if ((w = k - w) > c && n.sane) {
                                                  e.msg = "invalid distance too far back", n.mode = 30;
                                                  break e
                                              }
                                              if (S = 0, x = f, 0 === d) {
                                                  if (S += u - w, w < _) {
                                                      _ -= w;
                                                      do {
                                                          T[a++] = f[S++]
                                                      } while (--w);
                                                      S = a - k, x = T
                                                  }
                                              } else if (d < w) {
                                                  if (S += u + d - w, (w -= d) < _) {
                                                      _ -= w;
                                                      do {
                                                          T[a++] = f[S++]
                                                      } while (--w);
                                                      if (S = 0, d < _) {
                                                          _ -= w = d;
                                                          do {
                                                              T[a++] = f[S++]
                                                          } while (--w);
                                                          S = a - k, x = T
                                                      }
                                                  }
                                              } else if (S += d - w, w < _) {
                                                  _ -= w;
                                                  do {
                                                      T[a++] = f[S++]
                                                  } while (--w);
                                                  S = a - k, x = T
                                              }
                                              for (; _ > 2;) T[a++] = x[S++], T[a++] = x[S++], T[a++] = x[S++], _ -= 3;
                                              _ && (T[a++] = x[S++], _ > 1 && (T[a++] = x[S++]))
                                          } else {
                                              S = a - k;
                                              do {
                                                  T[a++] = T[S++], T[a++] = T[S++], T[a++] = T[S++], _ -= 3
                                              } while (_ > 2);
                                              _ && (T[a++] = T[S++], _ > 1 && (T[a++] = T[S++]))
                                          }
                                          break
                                      }
                                  }
                                  break
                              }
                          } while (r < i && a < s);
                          r -= _ = p >> 3, h &= (1 << (p -= _ << 3)) - 1, e.next_in = r, e.next_out = a, e.avail_in = r < i ? i - r + 5 : 5 - (r - i), e.avail_out = a < s ? s - a + 257 : 257 - (a - s), n.hold = h, n.bits = p
                      }
                  }, {}],
                  8: [function(e, t, n) {
                      var r = e("../utils/common"),
                          i = e("./adler32"),
                          a = e("./crc32"),
                          o = e("./inffast"),
                          s = e("./inftrees"),
                          l = -2,
                          u = 12,
                          c = 30;
  
                      function d(e) {
                          return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
                      }
  
                      function f() {
                          this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new r.Buf16(320), this.work = new r.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
                      }
  
                      function h(e) {
                          var t;
                          return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = 1, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new r.Buf32(852), t.distcode = t.distdyn = new r.Buf32(592), t.sane = 1, t.back = -1, 0) : l
                      }
  
                      function p(e) {
                          var t;
                          return e && e.state ? ((t = e.state).wsize = 0, t.whave = 0, t.wnext = 0, h(e)) : l
                      }
  
                      function m(e, t) {
                          var n, r;
                          return e && e.state ? (r = e.state, t < 0 ? (n = 0, t = -t) : (n = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? l : (null !== r.window && r.wbits !== t && (r.window = null), r.wrap = n, r.wbits = t, p(e))) : l
                      }
  
                      function v(e, t) {
                          var n, r;
                          return e ? (r = new f, e.state = r, r.window = null, 0 !== (n = m(e, t)) && (e.state = null), n) : l
                      }
                      var g, y, b = !0;
  
                      function w(e) {
                          if (b) {
                              var t;
                              for (g = new r.Buf32(512), y = new r.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;
                              for (; t < 256;) e.lens[t++] = 9;
                              for (; t < 280;) e.lens[t++] = 7;
                              for (; t < 288;) e.lens[t++] = 8;
                              for (s(1, e.lens, 0, 288, g, 0, e.work, {
                                      bits: 9
                                  }), t = 0; t < 32;) e.lens[t++] = 5;
                              s(2, e.lens, 0, 32, y, 0, e.work, {
                                  bits: 5
                              }), b = !1
                          }
                          e.lencode = g, e.lenbits = 9, e.distcode = y, e.distbits = 5
                      }
  
                      function _(e, t, n, i) {
                          var a, o = e.state;
                          return null === o.window && (o.wsize = 1 << o.wbits, o.wnext = 0, o.whave = 0, o.window = new r.Buf8(o.wsize)), i >= o.wsize ? (r.arraySet(o.window, t, n - o.wsize, o.wsize, 0), o.wnext = 0, o.whave = o.wsize) : ((a = o.wsize - o.wnext) > i && (a = i), r.arraySet(o.window, t, n - i, a, o.wnext), (i -= a) ? (r.arraySet(o.window, t, n - i, i, 0), o.wnext = i, o.whave = o.wsize) : (o.wnext += a, o.wnext === o.wsize && (o.wnext = 0), o.whave < o.wsize && (o.whave += a))), 0
                      }
                      n.inflateReset = p, n.inflateReset2 = m, n.inflateResetKeep = h, n.inflateInit = function(e) {
                          return v(e, 15)
                      }, n.inflateInit2 = v, n.inflate = function(e, t) {
                          var n, f, h, p, m, v, g, y, b, k, S, x, E, T, C, I, M, N, O, D, A, R, $, F, z = 0,
                              L = new r.Buf8(4),
                              P = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                          if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return l;
                          (n = e.state).mode === u && (n.mode = 13), m = e.next_out, h = e.output, g = e.avail_out, p = e.next_in, f = e.input, v = e.avail_in, y = n.hold, b = n.bits, k = v, S = g, R = 0;
                          e: for (;;) switch (n.mode) {
                              case 1:
                                  if (0 === n.wrap) {
                                      n.mode = 13;
                                      break
                                  }
                                  for (; b < 16;) {
                                      if (0 === v) break e;
                                      v--, y += f[p++] << b, b += 8
                                  }
                                  if (2 & n.wrap && 35615 === y) {
                                      n.check = 0, L[0] = 255 & y, L[1] = y >>> 8 & 255, n.check = a(n.check, L, 2, 0), y = 0, b = 0, n.mode = 2;
                                      break
                                  }
                                  if (n.flags = 0, n.head && (n.head.done = !1), !(1 & n.wrap) || (((255 & y) << 8) + (y >> 8)) % 31) {
                                      e.msg = "incorrect header check", n.mode = c;
                                      break
                                  }
                                  if (8 != (15 & y)) {
                                      e.msg = "unknown compression method", n.mode = c;
                                      break
                                  }
                                  if (b -= 4, A = 8 + (15 & (y >>>= 4)), 0 === n.wbits) n.wbits = A;
                                  else if (A > n.wbits) {
                                      e.msg = "invalid window size", n.mode = c;
                                      break
                                  }
                                  n.dmax = 1 << A, e.adler = n.check = 1, n.mode = 512 & y ? 10 : u, y = 0, b = 0;
                                  break;
                              case 2:
                                  for (; b < 16;) {
                                      if (0 === v) break e;
                                      v--, y += f[p++] << b, b += 8
                                  }
                                  if (n.flags = y, 8 != (255 & n.flags)) {
                                      e.msg = "unknown compression method", n.mode = c;
                                      break
                                  }
                                  if (57344 & n.flags) {
                                      e.msg = "unknown header flags set", n.mode = c;
                                      break
                                  }
                                  n.head && (n.head.text = y >> 8 & 1), 512 & n.flags && (L[0] = 255 & y, L[1] = y >>> 8 & 255, n.check = a(n.check, L, 2, 0)), y = 0, b = 0, n.mode = 3;
                              case 3:
                                  for (; b < 32;) {
                                      if (0 === v) break e;
                                      v--, y += f[p++] << b, b += 8
                                  }
                                  n.head && (n.head.time = y), 512 & n.flags && (L[0] = 255 & y, L[1] = y >>> 8 & 255, L[2] = y >>> 16 & 255, L[3] = y >>> 24 & 255, n.check = a(n.check, L, 4, 0)), y = 0, b = 0, n.mode = 4;
                              case 4:
                                  for (; b < 16;) {
                                      if (0 === v) break e;
                                      v--, y += f[p++] << b, b += 8
                                  }
                                  n.head && (n.head.xflags = 255 & y, n.head.os = y >> 8), 512 & n.flags && (L[0] = 255 & y, L[1] = y >>> 8 & 255, n.check = a(n.check, L, 2, 0)), y = 0, b = 0, n.mode = 5;
                              case 5:
                                  if (1024 & n.flags) {
                                      for (; b < 16;) {
                                          if (0 === v) break e;
                                          v--, y += f[p++] << b, b += 8
                                      }
                                      n.length = y, n.head && (n.head.extra_len = y), 512 & n.flags && (L[0] = 255 & y, L[1] = y >>> 8 & 255, n.check = a(n.check, L, 2, 0)), y = 0, b = 0
                                  } else n.head && (n.head.extra = null);
                                  n.mode = 6;
                              case 6:
                                  if (1024 & n.flags && ((x = n.length) > v && (x = v), x && (n.head && (A = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Array(n.head.extra_len)), r.arraySet(n.head.extra, f, p, x, A)), 512 & n.flags && (n.check = a(n.check, f, x, p)), v -= x, p += x, n.length -= x), n.length)) break e;
                                  n.length = 0, n.mode = 7;
                              case 7:
                                  if (2048 & n.flags) {
                                      if (0 === v) break e;
                                      x = 0;
                                      do {
                                          A = f[p + x++], n.head && A && n.length < 65536 && (n.head.name += String.fromCharCode(A))
                                      } while (A && x < v);
                                      if (512 & n.flags && (n.check = a(n.check, f, x, p)), v -= x, p += x, A) break e
                                  } else n.head && (n.head.name = null);
                                  n.length = 0, n.mode = 8;
                              case 8:
                                  if (4096 & n.flags) {
                                      if (0 === v) break e;
                                      x = 0;
                                      do {
                                          A = f[p + x++], n.head && A && n.length < 65536 && (n.head.comment += String.fromCharCode(A))
                                      } while (A && x < v);
                                      if (512 & n.flags && (n.check = a(n.check, f, x, p)), v -= x, p += x, A) break e
                                  } else n.head && (n.head.comment = null);
                                  n.mode = 9;
                              case 9:
                                  if (512 & n.flags) {
                                      for (; b < 16;) {
                                          if (0 === v) break e;
                                          v--, y += f[p++] << b, b += 8
                                      }
                                      if (y !== (65535 & n.check)) {
                                          e.msg = "header crc mismatch", n.mode = c;
                                          break
                                      }
                                      y = 0, b = 0
                                  }
                                  n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), e.adler = n.check = 0, n.mode = u;
                                  break;
                              case 10:
                                  for (; b < 32;) {
                                      if (0 === v) break e;
                                      v--, y += f[p++] << b, b += 8
                                  }
                                  e.adler = n.check = d(y), y = 0, b = 0, n.mode = 11;
                              case 11:
                                  if (0 === n.havedict) return e.next_out = m, e.avail_out = g, e.next_in = p, e.avail_in = v, n.hold = y, n.bits = b, 2;
                                  e.adler = n.check = 1, n.mode = u;
                              case u:
                                  if (5 === t || 6 === t) break e;
                              case 13:
                                  if (n.last) {
                                      y >>>= 7 & b, b -= 7 & b, n.mode = 27;
                                      break
                                  }
                                  for (; b < 3;) {
                                      if (0 === v) break e;
                                      v--, y += f[p++] << b, b += 8
                                  }
                                  switch (n.last = 1 & y, b -= 1, 3 & (y >>>= 1)) {
                                      case 0:
                                          n.mode = 14;
                                          break;
                                      case 1:
                                          if (w(n), n.mode = 20, 6 === t) {
                                              y >>>= 2, b -= 2;
                                              break e
                                          }
                                          break;
                                      case 2:
                                          n.mode = 17;
                                          break;
                                      case 3:
                                          e.msg = "invalid block type", n.mode = c
                                  }
                                  y >>>= 2, b -= 2;
                                  break;
                              case 14:
                                  for (y >>>= 7 & b, b -= 7 & b; b < 32;) {
                                      if (0 === v) break e;
                                      v--, y += f[p++] << b, b += 8
                                  }
                                  if ((65535 & y) != (y >>> 16 ^ 65535)) {
                                      e.msg = "invalid stored block lengths", n.mode = c;
                                      break
                                  }
                                  if (n.length = 65535 & y, y = 0, b = 0, n.mode = 15, 6 === t) break e;
                              case 15:
                                  n.mode = 16;
                              case 16:
                                  if (x = n.length) {
                                      if (x > v && (x = v), x > g && (x = g), 0 === x) break e;
                                      r.arraySet(h, f, p, x, m), v -= x, p += x, g -= x, m += x, n.length -= x;
                                      break
                                  }
                                  n.mode = u;
                                  break;
                              case 17:
                                  for (; b < 14;) {
                                      if (0 === v) break e;
                                      v--, y += f[p++] << b, b += 8
                                  }
                                  if (n.nlen = 257 + (31 & y), y >>>= 5, b -= 5, n.ndist = 1 + (31 & y), y >>>= 5, b -= 5, n.ncode = 4 + (15 & y), y >>>= 4, b -= 4, n.nlen > 286 || n.ndist > 30) {
                                      e.msg = "too many length or distance symbols", n.mode = c;
                                      break
                                  }
                                  n.have = 0, n.mode = 18;
                              case 18:
                                  for (; n.have < n.ncode;) {
                                      for (; b < 3;) {
                                          if (0 === v) break e;
                                          v--, y += f[p++] << b, b += 8
                                      }
                                      n.lens[P[n.have++]] = 7 & y, y >>>= 3, b -= 3
                                  }
                                  for (; n.have < 19;) n.lens[P[n.have++]] = 0;
                                  if (n.lencode = n.lendyn, n.lenbits = 7, $ = {
                                          bits: n.lenbits
                                      }, R = s(0, n.lens, 0, 19, n.lencode, 0, n.work, $), n.lenbits = $.bits, R) {
                                      e.msg = "invalid code lengths set", n.mode = c;
                                      break
                                  }
                                  n.have = 0, n.mode = 19;
                              case 19:
                                  for (; n.have < n.nlen + n.ndist;) {
                                      for (; I = (z = n.lencode[y & (1 << n.lenbits) - 1]) >>> 16 & 255, M = 65535 & z, !((C = z >>> 24) <= b);) {
                                          if (0 === v) break e;
                                          v--, y += f[p++] << b, b += 8
                                      }
                                      if (M < 16) y >>>= C, b -= C, n.lens[n.have++] = M;
                                      else {
                                          if (16 === M) {
                                              for (F = C + 2; b < F;) {
                                                  if (0 === v) break e;
                                                  v--, y += f[p++] << b, b += 8
                                              }
                                              if (y >>>= C, b -= C, 0 === n.have) {
                                                  e.msg = "invalid bit length repeat", n.mode = c;
                                                  break
                                              }
                                              A = n.lens[n.have - 1], x = 3 + (3 & y), y >>>= 2, b -= 2
                                          } else if (17 === M) {
                                              for (F = C + 3; b < F;) {
                                                  if (0 === v) break e;
                                                  v--, y += f[p++] << b, b += 8
                                              }
                                              b -= C, A = 0, x = 3 + (7 & (y >>>= C)), y >>>= 3, b -= 3
                                          } else {
                                              for (F = C + 7; b < F;) {
                                                  if (0 === v) break e;
                                                  v--, y += f[p++] << b, b += 8
                                              }
                                              b -= C, A = 0, x = 11 + (127 & (y >>>= C)), y >>>= 7, b -= 7
                                          }
                                          if (n.have + x > n.nlen + n.ndist) {
                                              e.msg = "invalid bit length repeat", n.mode = c;
                                              break
                                          }
                                          for (; x--;) n.lens[n.have++] = A
                                      }
                                  }
                                  if (n.mode === c) break;
                                  if (0 === n.lens[256]) {
                                      e.msg = "invalid code -- missing end-of-block", n.mode = c;
                                      break
                                  }
                                  if (n.lenbits = 9, $ = {
                                          bits: n.lenbits
                                      }, R = s(1, n.lens, 0, n.nlen, n.lencode, 0, n.work, $), n.lenbits = $.bits, R) {
                                      e.msg = "invalid literal/lengths set", n.mode = c;
                                      break
                                  }
                                  if (n.distbits = 6, n.distcode = n.distdyn, $ = {
                                          bits: n.distbits
                                      }, R = s(2, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, $), n.distbits = $.bits, R) {
                                      e.msg = "invalid distances set", n.mode = c;
                                      break
                                  }
                                  if (n.mode = 20, 6 === t) break e;
                              case 20:
                                  n.mode = 21;
                              case 21:
                                  if (v >= 6 && g >= 258) {
                                      e.next_out = m, e.avail_out = g, e.next_in = p, e.avail_in = v, n.hold = y, n.bits = b, o(e, S), m = e.next_out, h = e.output, g = e.avail_out, p = e.next_in, f = e.input, v = e.avail_in, y = n.hold, b = n.bits, n.mode === u && (n.back = -1);
                                      break
                                  }
                                  for (n.back = 0; I = (z = n.lencode[y & (1 << n.lenbits) - 1]) >>> 16 & 255, M = 65535 & z, !((C = z >>> 24) <= b);) {
                                      if (0 === v) break e;
                                      v--, y += f[p++] << b, b += 8
                                  }
                                  if (I && 0 == (240 & I)) {
                                      for (N = C, O = I, D = M; I = (z = n.lencode[D + ((y & (1 << N + O) - 1) >> N)]) >>> 16 & 255, M = 65535 & z, !(N + (C = z >>> 24) <= b);) {
                                          if (0 === v) break e;
                                          v--, y += f[p++] << b, b += 8
                                      }
                                      y >>>= N, b -= N, n.back += N
                                  }
                                  if (y >>>= C, b -= C, n.back += C, n.length = M, 0 === I) {
                                      n.mode = 26;
                                      break
                                  }
                                  if (32 & I) {
                                      n.back = -1, n.mode = u;
                                      break
                                  }
                                  if (64 & I) {
                                      e.msg = "invalid literal/length code", n.mode = c;
                                      break
                                  }
                                  n.extra = 15 & I, n.mode = 22;
                              case 22:
                                  if (n.extra) {
                                      for (F = n.extra; b < F;) {
                                          if (0 === v) break e;
                                          v--, y += f[p++] << b, b += 8
                                      }
                                      n.length += y & (1 << n.extra) - 1, y >>>= n.extra, b -= n.extra, n.back += n.extra
                                  }
                                  n.was = n.length, n.mode = 23;
                              case 23:
                                  for (; I = (z = n.distcode[y & (1 << n.distbits) - 1]) >>> 16 & 255, M = 65535 & z, !((C = z >>> 24) <= b);) {
                                      if (0 === v) break e;
                                      v--, y += f[p++] << b, b += 8
                                  }
                                  if (0 == (240 & I)) {
                                      for (N = C, O = I, D = M; I = (z = n.distcode[D + ((y & (1 << N + O) - 1) >> N)]) >>> 16 & 255, M = 65535 & z, !(N + (C = z >>> 24) <= b);) {
                                          if (0 === v) break e;
                                          v--, y += f[p++] << b, b += 8
                                      }
                                      y >>>= N, b -= N, n.back += N
                                  }
                                  if (y >>>= C, b -= C, n.back += C, 64 & I) {
                                      e.msg = "invalid distance code", n.mode = c;
                                      break
                                  }
                                  n.offset = M, n.extra = 15 & I, n.mode = 24;
                              case 24:
                                  if (n.extra) {
                                      for (F = n.extra; b < F;) {
                                          if (0 === v) break e;
                                          v--, y += f[p++] << b, b += 8
                                      }
                                      n.offset += y & (1 << n.extra) - 1, y >>>= n.extra, b -= n.extra, n.back += n.extra
                                  }
                                  if (n.offset > n.dmax) {
                                      e.msg = "invalid distance too far back", n.mode = c;
                                      break
                                  }
                                  n.mode = 25;
                              case 25:
                                  if (0 === g) break e;
                                  if (x = S - g, n.offset > x) {
                                      if ((x = n.offset - x) > n.whave && n.sane) {
                                          e.msg = "invalid distance too far back", n.mode = c;
                                          break
                                      }
                                      x > n.wnext ? (x -= n.wnext, E = n.wsize - x) : E = n.wnext - x, x > n.length && (x = n.length), T = n.window
                                  } else T = h, E = m - n.offset, x = n.length;
                                  x > g && (x = g), g -= x, n.length -= x;
                                  do {
                                      h[m++] = T[E++]
                                  } while (--x);
                                  0 === n.length && (n.mode = 21);
                                  break;
                              case 26:
                                  if (0 === g) break e;
                                  h[m++] = n.length, g--, n.mode = 21;
                                  break;
                              case 27:
                                  if (n.wrap) {
                                      for (; b < 32;) {
                                          if (0 === v) break e;
                                          v--, y |= f[p++] << b, b += 8
                                      }
                                      if (S -= g, e.total_out += S, n.total += S, S && (e.adler = n.check = n.flags ? a(n.check, h, S, m - S) : i(n.check, h, S, m - S)), S = g, (n.flags ? y : d(y)) !== n.check) {
                                          e.msg = "incorrect data check", n.mode = c;
                                          break
                                      }
                                      y = 0, b = 0
                                  }
                                  n.mode = 28;
                              case 28:
                                  if (n.wrap && n.flags) {
                                      for (; b < 32;) {
                                          if (0 === v) break e;
                                          v--, y += f[p++] << b, b += 8
                                      }
                                      if (y !== (4294967295 & n.total)) {
                                          e.msg = "incorrect length check", n.mode = c;
                                          break
                                      }
                                      y = 0, b = 0
                                  }
                                  n.mode = 29;
                              case 29:
                                  R = 1;
                                  break e;
                              case c:
                                  R = -3;
                                  break e;
                              case 31:
                                  return -4;
                              default:
                                  return l
                          }
                          return e.next_out = m, e.avail_out = g, e.next_in = p, e.avail_in = v, n.hold = y, n.bits = b, (n.wsize || S !== e.avail_out && n.mode < c && (n.mode < 27 || 4 !== t)) && _(e, e.output, e.next_out, S - e.avail_out), k -= e.avail_in, S -= e.avail_out, e.total_in += k, e.total_out += S, n.total += S, n.wrap && S && (e.adler = n.check = n.flags ? a(n.check, h, S, e.next_out - S) : i(n.check, h, S, e.next_out - S)), e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === u ? 128 : 0) + (20 === n.mode || 15 === n.mode ? 256 : 0), (0 === k && 0 === S || 4 === t) && 0 === R && (R = -5), R
                      }, n.inflateEnd = function(e) {
                          if (!e || !e.state) return l;
                          var t = e.state;
                          return t.window && (t.window = null), e.state = null, 0
                      }, n.inflateGetHeader = function(e, t) {
                          var n;
                          return e && e.state ? 0 == (2 & (n = e.state).wrap) ? l : (n.head = t, t.done = !1, 0) : l
                      }, n.inflateSetDictionary = function(e, t) {
                          var n, r = t.length;
                          return e && e.state ? 0 !== (n = e.state).wrap && 11 !== n.mode ? l : 11 === n.mode && i(1, t, r, 0) !== n.check ? -3 : _(e, t, r, r) ? (n.mode = 31, -4) : (n.havedict = 1, 0) : l
                      }, n.inflateInfo = "pako inflate (from Nodeca project)"
                  }, {
                      "../utils/common": 1,
                      "./adler32": 3,
                      "./crc32": 5,
                      "./inffast": 7,
                      "./inftrees": 9
                  }],
                  9: [function(e, t, n) {
                      var r = e("../utils/common"),
                          i = 15,
                          a = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                          o = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                          s = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                          l = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
                      t.exports = function(e, t, n, u, c, d, f, h) {
                          var p, m, v, g, y, b, w, _, k, S = h.bits,
                              x = 0,
                              E = 0,
                              T = 0,
                              C = 0,
                              I = 0,
                              M = 0,
                              N = 0,
                              O = 0,
                              D = 0,
                              A = 0,
                              R = null,
                              $ = 0,
                              F = new r.Buf16(16),
                              z = new r.Buf16(16),
                              L = null,
                              P = 0;
                          for (x = 0; x <= i; x++) F[x] = 0;
                          for (E = 0; E < u; E++) F[t[n + E]]++;
                          for (I = S, C = i; C >= 1 && 0 === F[C]; C--);
                          if (I > C && (I = C), 0 === C) return c[d++] = 20971520, c[d++] = 20971520, h.bits = 1, 0;
                          for (T = 1; T < C && 0 === F[T]; T++);
                          for (I < T && (I = T), O = 1, x = 1; x <= i; x++)
                              if (O <<= 1, (O -= F[x]) < 0) return -1;
                          if (O > 0 && (0 === e || 1 !== C)) return -1;
                          for (z[1] = 0, x = 1; x < i; x++) z[x + 1] = z[x] + F[x];
                          for (E = 0; E < u; E++) 0 !== t[n + E] && (f[z[t[n + E]]++] = E);
                          if (0 === e ? (R = L = f, b = 19) : 1 === e ? (R = a, $ -= 257, L = o, P -= 257, b = 256) : (R = s, L = l, b = -1), A = 0, E = 0, x = T, y = d, M = I, N = 0, v = -1, g = (D = 1 << I) - 1, 1 === e && D > 852 || 2 === e && D > 592) return 1;
                          for (;;) {
                              w = x - N, f[E] < b ? (_ = 0, k = f[E]) : f[E] > b ? (_ = L[P + f[E]], k = R[$ + f[E]]) : (_ = 96, k = 0), p = 1 << x - N, T = m = 1 << M;
                              do {
                                  c[y + (A >> N) + (m -= p)] = w << 24 | _ << 16 | k | 0
                              } while (0 !== m);
                              for (p = 1 << x - 1; A & p;) p >>= 1;
                              if (0 !== p ? (A &= p - 1, A += p) : A = 0, E++, 0 == --F[x]) {
                                  if (x === C) break;
                                  x = t[n + f[E]]
                              }
                              if (x > I && (A & g) !== v) {
                                  for (0 === N && (N = I), y += T, O = 1 << (M = x - N); M + N < C && !((O -= F[M + N]) <= 0);) M++, O <<= 1;
                                  if (D += 1 << M, 1 === e && D > 852 || 2 === e && D > 592) return 1;
                                  c[v = A & g] = I << 24 | M << 16 | y - d | 0
                              }
                          }
                          return 0 !== A && (c[y + A] = x - N << 24 | 64 << 16 | 0), h.bits = I, 0
                      }
                  }, {
                      "../utils/common": 1
                  }],
                  10: [function(e, t, n) {
                      t.exports = {
                          2: "need dictionary",
                          1: "stream end",
                          0: "",
                          "-1": "file error",
                          "-2": "stream error",
                          "-3": "data error",
                          "-4": "insufficient memory",
                          "-5": "buffer error",
                          "-6": "incompatible version"
                      }
                  }, {}],
                  11: [function(e, t, n) {
                      t.exports = function() {
                          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
                      }
                  }, {}],
                  "/lib/inflate.js": [function(e, t, n) {
                      var r = e("./zlib/inflate"),
                          i = e("./utils/common"),
                          a = e("./utils/strings"),
                          o = e("./zlib/constants"),
                          s = e("./zlib/messages"),
                          l = e("./zlib/zstream"),
                          u = e("./zlib/gzheader"),
                          c = Object.prototype.toString;
  
                      function d(e) {
                          if (!(this instanceof d)) return new d(e);
                          this.options = i.assign({
                              chunkSize: 16384,
                              windowBits: 0,
                              to: ""
                          }, e || {});
                          var t = this.options;
                          t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new l, this.strm.avail_out = 0;
                          var n = r.inflateInit2(this.strm, t.windowBits);
                          if (n !== o.Z_OK) throw new Error(s[n]);
                          if (this.header = new u, r.inflateGetHeader(this.strm, this.header), t.dictionary && ("string" == typeof t.dictionary ? t.dictionary = a.string2buf(t.dictionary) : "[object ArrayBuffer]" === c.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (n = r.inflateSetDictionary(this.strm, t.dictionary)) !== o.Z_OK)) throw new Error(s[n])
                      }
  
                      function f(e, t) {
                          var n = new d(t);
                          if (n.push(e, !0), n.err) throw n.msg || s[n.err];
                          return n.result
                      }
                      d.prototype.push = function(e, t) {
                          var n, s, l, u, d, f = this.strm,
                              h = this.options.chunkSize,
                              p = this.options.dictionary,
                              m = !1;
                          if (this.ended) return !1;
                          s = t === ~~t ? t : !0 === t ? o.Z_FINISH : o.Z_NO_FLUSH, "string" == typeof e ? f.input = a.binstring2buf(e) : "[object ArrayBuffer]" === c.call(e) ? f.input = new Uint8Array(e) : f.input = e, f.next_in = 0, f.avail_in = f.input.length;
                          do {
                              if (0 === f.avail_out && (f.output = new i.Buf8(h), f.next_out = 0, f.avail_out = h), (n = r.inflate(f, o.Z_NO_FLUSH)) === o.Z_NEED_DICT && p && (n = r.inflateSetDictionary(this.strm, p)), n === o.Z_BUF_ERROR && !0 === m && (n = o.Z_OK, m = !1), n !== o.Z_STREAM_END && n !== o.Z_OK) return this.onEnd(n), this.ended = !0, !1;
                              f.next_out && (0 !== f.avail_out && n !== o.Z_STREAM_END && (0 !== f.avail_in || s !== o.Z_FINISH && s !== o.Z_SYNC_FLUSH) || ("string" === this.options.to ? (l = a.utf8border(f.output, f.next_out), u = f.next_out - l, d = a.buf2string(f.output, l), f.next_out = u, f.avail_out = h - u, u && i.arraySet(f.output, f.output, l, u, 0), this.onData(d)) : this.onData(i.shrinkBuf(f.output, f.next_out)))), 0 === f.avail_in && 0 === f.avail_out && (m = !0)
                          } while ((f.avail_in > 0 || 0 === f.avail_out) && n !== o.Z_STREAM_END);
                          return n === o.Z_STREAM_END && (s = o.Z_FINISH), s === o.Z_FINISH ? (n = r.inflateEnd(this.strm), this.onEnd(n), this.ended = !0, n === o.Z_OK) : s !== o.Z_SYNC_FLUSH || (this.onEnd(o.Z_OK), f.avail_out = 0, !0)
                      }, d.prototype.onData = function(e) {
                          this.chunks.push(e)
                      }, d.prototype.onEnd = function(e) {
                          e === o.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = i.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
                      }, n.Inflate = d, n.inflate = f, n.inflateRaw = function(e, t) {
                          return (t = t || {}).raw = !0, f(e, t)
                      }, n.ungzip = f
                  }, {
                      "./utils/common": 1,
                      "./utils/strings": 2,
                      "./zlib/constants": 4,
                      "./zlib/gzheader": 6,
                      "./zlib/inflate": 8,
                      "./zlib/messages": 10,
                      "./zlib/zstream": 11
                  }]
              }, {}, [])("/lib/inflate.js")
          })).inflate,
          C = function() {
              return C = Object.assign || function(e) {
                  for (var t, n = 1, r = arguments.length; n < r; n++)
                      for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                  return e
              }, C.apply(this, arguments)
          },
          I = E((function(e, t) {
              e.exports = function e(t, n, r) {
                  function i(o, s) {
                      if (!n[o]) {
                          if (!t[o]) {
                              if (!s && x) return x();
                              if (a) return a(o, !0);
                              var l = new Error("Cannot find module '" + o + "'");
                              throw l.code = "MODULE_NOT_FOUND", l
                          }
                          var u = n[o] = {
                              exports: {}
                          };
                          t[o][0].call(u.exports, (function(e) {
                              return i(t[o][1][e] || e)
                          }), u, u.exports, e, t, n, r)
                      }
                      return n[o].exports
                  }
                  for (var a = x, o = 0; o < r.length; o++) i(r[o]);
                  return i
              }({
                  1: [function(e, t, n) {
                      var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
  
                      function i(e, t) {
                          return Object.prototype.hasOwnProperty.call(e, t)
                      }
                      n.assign = function(e) {
                          for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
                              var n = t.shift();
                              if (n) {
                                  if ("object" != typeof n) throw new TypeError(n + "must be non-object");
                                  for (var r in n) i(n, r) && (e[r] = n[r])
                              }
                          }
                          return e
                      }, n.shrinkBuf = function(e, t) {
                          return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e)
                      };
                      var a = {
                              arraySet: function(e, t, n, r, i) {
                                  if (t.subarray && e.subarray) e.set(t.subarray(n, n + r), i);
                                  else
                                      for (var a = 0; a < r; a++) e[i + a] = t[n + a]
                              },
                              flattenChunks: function(e) {
                                  var t, n, r, i, a, o;
                                  for (r = 0, t = 0, n = e.length; t < n; t++) r += e[t].length;
                                  for (o = new Uint8Array(r), i = 0, t = 0, n = e.length; t < n; t++) a = e[t], o.set(a, i), i += a.length;
                                  return o
                              }
                          },
                          o = {
                              arraySet: function(e, t, n, r, i) {
                                  for (var a = 0; a < r; a++) e[i + a] = t[n + a]
                              },
                              flattenChunks: function(e) {
                                  return [].concat.apply([], e)
                              }
                          };
                      n.setTyped = function(e) {
                          e ? (n.Buf8 = Uint8Array, n.Buf16 = Uint16Array, n.Buf32 = Int32Array, n.assign(n, a)) : (n.Buf8 = Array, n.Buf16 = Array, n.Buf32 = Array, n.assign(n, o))
                      }, n.setTyped(r)
                  }, {}],
                  2: [function(e, t, n) {
                      var r = e("./common"),
                          i = !0,
                          a = !0;
                      try {
                          String.fromCharCode.apply(null, [0])
                      } catch (e) {
                          i = !1
                      }
                      try {
                          String.fromCharCode.apply(null, new Uint8Array(1))
                      } catch (e) {
                          a = !1
                      }
                      for (var o = new r.Buf8(256), s = 0; s < 256; s++) o[s] = s >= 252 ? 6 : s >= 248 ? 5 : s >= 240 ? 4 : s >= 224 ? 3 : s >= 192 ? 2 : 1;
  
                      function l(e, t) {
                          if (t < 65534 && (e.subarray && a || !e.subarray && i)) return String.fromCharCode.apply(null, r.shrinkBuf(e, t));
                          for (var n = "", o = 0; o < t; o++) n += String.fromCharCode(e[o]);
                          return n
                      }
                      o[254] = o[254] = 1, n.string2buf = function(e) {
                          var t, n, i, a, o, s = e.length,
                              l = 0;
                          for (a = 0; a < s; a++) 55296 == (64512 & (n = e.charCodeAt(a))) && a + 1 < s && 56320 == (64512 & (i = e.charCodeAt(a + 1))) && (n = 65536 + (n - 55296 << 10) + (i - 56320), a++), l += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
                          for (t = new r.Buf8(l), o = 0, a = 0; o < l; a++) 55296 == (64512 & (n = e.charCodeAt(a))) && a + 1 < s && 56320 == (64512 & (i = e.charCodeAt(a + 1))) && (n = 65536 + (n - 55296 << 10) + (i - 56320), a++), n < 128 ? t[o++] = n : n < 2048 ? (t[o++] = 192 | n >>> 6, t[o++] = 128 | 63 & n) : n < 65536 ? (t[o++] = 224 | n >>> 12, t[o++] = 128 | n >>> 6 & 63, t[o++] = 128 | 63 & n) : (t[o++] = 240 | n >>> 18, t[o++] = 128 | n >>> 12 & 63, t[o++] = 128 | n >>> 6 & 63, t[o++] = 128 | 63 & n);
                          return t
                      }, n.buf2binstring = function(e) {
                          return l(e, e.length)
                      }, n.binstring2buf = function(e) {
                          for (var t = new r.Buf8(e.length), n = 0, i = t.length; n < i; n++) t[n] = e.charCodeAt(n);
                          return t
                      }, n.buf2string = function(e, t) {
                          var n, r, i, a, s = t || e.length,
                              u = new Array(2 * s);
                          for (r = 0, n = 0; n < s;)
                              if ((i = e[n++]) < 128) u[r++] = i;
                              else if ((a = o[i]) > 4) u[r++] = 65533, n += a - 1;
                          else {
                              for (i &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && n < s;) i = i << 6 | 63 & e[n++], a--;
                              a > 1 ? u[r++] = 65533 : i < 65536 ? u[r++] = i : (i -= 65536, u[r++] = 55296 | i >> 10 & 1023, u[r++] = 56320 | 1023 & i)
                          }
                          return l(u, r)
                      }, n.utf8border = function(e, t) {
                          var n;
                          for ((t = t || e.length) > e.length && (t = e.length), n = t - 1; n >= 0 && 128 == (192 & e[n]);) n--;
                          return n < 0 || 0 === n ? t : n + o[e[n]] > t ? n : t
                      }
                  }, {
                      "./common": 1
                  }],
                  3: [function(e, t, n) {
                      t.exports = function(e, t, n, r) {
                          for (var i = 65535 & e | 0, a = e >>> 16 & 65535 | 0, o = 0; 0 !== n;) {
                              n -= o = n > 2e3 ? 2e3 : n;
                              do {
                                  a = a + (i = i + t[r++] | 0) | 0
                              } while (--o);
                              i %= 65521, a %= 65521
                          }
                          return i | a << 16 | 0
                      }
                  }, {}],
                  4: [function(e, t, n) {
                      var r = function() {
                          for (var e, t = [], n = 0; n < 256; n++) {
                              e = n;
                              for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                              t[n] = e
                          }
                          return t
                      }();
                      t.exports = function(e, t, n, i) {
                          var a = r,
                              o = i + n;
                          e ^= -1;
                          for (var s = i; s < o; s++) e = e >>> 8 ^ a[255 & (e ^ t[s])];
                          return -1 ^ e
                      }
                  }, {}],
                  5: [function(e, t, n) {
                      var r, i = e("../utils/common"),
                          a = e("./trees"),
                          o = e("./adler32"),
                          s = e("./crc32"),
                          l = e("./messages"),
                          u = -2,
                          c = 258,
                          d = 262,
                          f = 103,
                          h = 113,
                          p = 666;
  
                      function m(e, t) {
                          return e.msg = l[t], t
                      }
  
                      function v(e) {
                          return (e << 1) - (e > 4 ? 9 : 0)
                      }
  
                      function g(e) {
                          for (var t = e.length; --t >= 0;) e[t] = 0
                      }
  
                      function y(e) {
                          var t = e.state,
                              n = t.pending;
                          n > e.avail_out && (n = e.avail_out), 0 !== n && (i.arraySet(e.output, t.pending_buf, t.pending_out, n, e.next_out), e.next_out += n, t.pending_out += n, e.total_out += n, e.avail_out -= n, t.pending -= n, 0 === t.pending && (t.pending_out = 0))
                      }
  
                      function b(e, t) {
                          a._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, y(e.strm)
                      }
  
                      function w(e, t) {
                          e.pending_buf[e.pending++] = t
                      }
  
                      function _(e, t) {
                          e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = 255 & t
                      }
  
                      function k(e, t, n, r) {
                          var a = e.avail_in;
                          return a > r && (a = r), 0 === a ? 0 : (e.avail_in -= a, i.arraySet(t, e.input, e.next_in, a, n), 1 === e.state.wrap ? e.adler = o(e.adler, t, a, n) : 2 === e.state.wrap && (e.adler = s(e.adler, t, a, n)), e.next_in += a, e.total_in += a, a)
                      }
  
                      function S(e, t) {
                          var n, r, i = e.max_chain_length,
                              a = e.strstart,
                              o = e.prev_length,
                              s = e.nice_match,
                              l = e.strstart > e.w_size - d ? e.strstart - (e.w_size - d) : 0,
                              u = e.window,
                              f = e.w_mask,
                              h = e.prev,
                              p = e.strstart + c,
                              m = u[a + o - 1],
                              v = u[a + o];
                          e.prev_length >= e.good_match && (i >>= 2), s > e.lookahead && (s = e.lookahead);
                          do {
                              if (u[(n = t) + o] === v && u[n + o - 1] === m && u[n] === u[a] && u[++n] === u[a + 1]) {
                                  a += 2, n++;
                                  do {} while (u[++a] === u[++n] && u[++a] === u[++n] && u[++a] === u[++n] && u[++a] === u[++n] && u[++a] === u[++n] && u[++a] === u[++n] && u[++a] === u[++n] && u[++a] === u[++n] && a < p);
                                  if (r = c - (p - a), a = p - c, r > o) {
                                      if (e.match_start = t, o = r, r >= s) break;
                                      m = u[a + o - 1], v = u[a + o]
                                  }
                              }
                          } while ((t = h[t & f]) > l && 0 != --i);
                          return o <= e.lookahead ? o : e.lookahead
                      }
  
                      function x(e) {
                          var t, n, r, a, o, s = e.w_size;
                          do {
                              if (a = e.window_size - e.lookahead - e.strstart, e.strstart >= s + (s - d)) {
                                  i.arraySet(e.window, e.window, s, s, 0), e.match_start -= s, e.strstart -= s, e.block_start -= s, t = n = e.hash_size;
                                  do {
                                      r = e.head[--t], e.head[t] = r >= s ? r - s : 0
                                  } while (--n);
                                  t = n = s;
                                  do {
                                      r = e.prev[--t], e.prev[t] = r >= s ? r - s : 0
                                  } while (--n);
                                  a += s
                              }
                              if (0 === e.strm.avail_in) break;
                              if (n = k(e.strm, e.window, e.strstart + e.lookahead, a), e.lookahead += n, e.lookahead + e.insert >= 3)
                                  for (o = e.strstart - e.insert, e.ins_h = e.window[o], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + 3 - 1]) & e.hash_mask, e.prev[o & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = o, o++, e.insert--, !(e.lookahead + e.insert < 3)););
                          } while (e.lookahead < d && 0 !== e.strm.avail_in)
                      }
  
                      function E(e, t) {
                          for (var n, r;;) {
                              if (e.lookahead < d) {
                                  if (x(e), e.lookahead < d && 0 === t) return 1;
                                  if (0 === e.lookahead) break
                              }
                              if (n = 0, e.lookahead >= 3 && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 3 - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 !== n && e.strstart - n <= e.w_size - d && (e.match_length = S(e, n)), e.match_length >= 3)
                                  if (r = a._tr_tally(e, e.strstart - e.match_start, e.match_length - 3), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= 3) {
                                      e.match_length--;
                                      do {
                                          e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 3 - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart
                                      } while (0 != --e.match_length);
                                      e.strstart++
                                  } else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
                              else r = a._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
                              if (r && (b(e, !1), 0 === e.strm.avail_out)) return 1
                          }
                          return e.insert = e.strstart < 2 ? e.strstart : 2, 4 === t ? (b(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (b(e, !1), 0 === e.strm.avail_out) ? 1 : 2
                      }
  
                      function T(e, t) {
                          for (var n, r, i;;) {
                              if (e.lookahead < d) {
                                  if (x(e), e.lookahead < d && 0 === t) return 1;
                                  if (0 === e.lookahead) break
                              }
                              if (n = 0, e.lookahead >= 3 && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 3 - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = 2, 0 !== n && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - d && (e.match_length = S(e, n), e.match_length <= 5 && (1 === e.strategy || 3 === e.match_length && e.strstart - e.match_start > 4096) && (e.match_length = 2)), e.prev_length >= 3 && e.match_length <= e.prev_length) {
                                  i = e.strstart + e.lookahead - 3, r = a._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - 3), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
                                  do {
                                      ++e.strstart <= i && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 3 - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart)
                                  } while (0 != --e.prev_length);
                                  if (e.match_available = 0, e.match_length = 2, e.strstart++, r && (b(e, !1), 0 === e.strm.avail_out)) return 1
                              } else if (e.match_available) {
                                  if ((r = a._tr_tally(e, 0, e.window[e.strstart - 1])) && b(e, !1), e.strstart++, e.lookahead--, 0 === e.strm.avail_out) return 1
                              } else e.match_available = 1, e.strstart++, e.lookahead--
                          }
                          return e.match_available && (r = a._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < 2 ? e.strstart : 2, 4 === t ? (b(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (b(e, !1), 0 === e.strm.avail_out) ? 1 : 2
                      }
  
                      function C(e, t, n, r, i) {
                          this.good_length = e, this.max_lazy = t, this.nice_length = n, this.max_chain = r, this.func = i
                      }
  
                      function I() {
                          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = 8, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new i.Buf16(1146), this.dyn_dtree = new i.Buf16(122), this.bl_tree = new i.Buf16(78), g(this.dyn_ltree), g(this.dyn_dtree), g(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new i.Buf16(16), this.heap = new i.Buf16(573), g(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new i.Buf16(573), g(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
                      }
  
                      function M(e) {
                          var t;
                          return e && e.state ? (e.total_in = e.total_out = 0, e.data_type = 2, (t = e.state).pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? 42 : h, e.adler = 2 === t.wrap ? 0 : 1, t.last_flush = 0, a._tr_init(t), 0) : m(e, u)
                      }
  
                      function N(e) {
                          var t = M(e);
                          return 0 === t && function(e) {
                              e.window_size = 2 * e.w_size, g(e.head), e.max_lazy_match = r[e.level].max_lazy, e.good_match = r[e.level].good_length, e.nice_match = r[e.level].nice_length, e.max_chain_length = r[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = 2, e.match_available = 0, e.ins_h = 0
                          }(e.state), t
                      }
  
                      function O(e, t, n, r, a, o) {
                          if (!e) return u;
                          var s = 1;
                          if (-1 === t && (t = 6), r < 0 ? (s = 0, r = -r) : r > 15 && (s = 2, r -= 16), a < 1 || a > 9 || 8 !== n || r < 8 || r > 15 || t < 0 || t > 9 || o < 0 || o > 4) return m(e, u);
                          8 === r && (r = 9);
                          var l = new I;
                          return e.state = l, l.strm = e, l.wrap = s, l.gzhead = null, l.w_bits = r, l.w_size = 1 << l.w_bits, l.w_mask = l.w_size - 1, l.hash_bits = a + 7, l.hash_size = 1 << l.hash_bits, l.hash_mask = l.hash_size - 1, l.hash_shift = ~~((l.hash_bits + 3 - 1) / 3), l.window = new i.Buf8(2 * l.w_size), l.head = new i.Buf16(l.hash_size), l.prev = new i.Buf16(l.w_size), l.lit_bufsize = 1 << a + 6, l.pending_buf_size = 4 * l.lit_bufsize, l.pending_buf = new i.Buf8(l.pending_buf_size), l.d_buf = 1 * l.lit_bufsize, l.l_buf = 3 * l.lit_bufsize, l.level = t, l.strategy = o, l.method = n, N(e)
                      }
                      r = [new C(0, 0, 0, 0, (function(e, t) {
                          var n = 65535;
                          for (n > e.pending_buf_size - 5 && (n = e.pending_buf_size - 5);;) {
                              if (e.lookahead <= 1) {
                                  if (x(e), 0 === e.lookahead && 0 === t) return 1;
                                  if (0 === e.lookahead) break
                              }
                              e.strstart += e.lookahead, e.lookahead = 0;
                              var r = e.block_start + n;
                              if ((0 === e.strstart || e.strstart >= r) && (e.lookahead = e.strstart - r, e.strstart = r, b(e, !1), 0 === e.strm.avail_out)) return 1;
                              if (e.strstart - e.block_start >= e.w_size - d && (b(e, !1), 0 === e.strm.avail_out)) return 1
                          }
                          return e.insert = 0, 4 === t ? (b(e, !0), 0 === e.strm.avail_out ? 3 : 4) : (e.strstart > e.block_start && (b(e, !1), e.strm.avail_out), 1)
                      })), new C(4, 4, 8, 4, E), new C(4, 5, 16, 8, E), new C(4, 6, 32, 32, E), new C(4, 4, 16, 16, T), new C(8, 16, 32, 32, T), new C(8, 16, 128, 128, T), new C(8, 32, 128, 256, T), new C(32, 128, 258, 1024, T), new C(32, 258, 258, 4096, T)], n.deflateInit = function(e, t) {
                          return O(e, t, 8, 15, 8, 0)
                      }, n.deflateInit2 = O, n.deflateReset = N, n.deflateResetKeep = M, n.deflateSetHeader = function(e, t) {
                          return e && e.state ? 2 !== e.state.wrap ? u : (e.state.gzhead = t, 0) : u
                      }, n.deflate = function(e, t) {
                          var n, i, o, l;
                          if (!e || !e.state || t > 5 || t < 0) return e ? m(e, u) : u;
                          if (i = e.state, !e.output || !e.input && 0 !== e.avail_in || i.status === p && 4 !== t) return m(e, 0 === e.avail_out ? -5 : u);
                          if (i.strm = e, n = i.last_flush, i.last_flush = t, 42 === i.status)
                              if (2 === i.wrap) e.adler = 0, w(i, 31), w(i, 139), w(i, 8), i.gzhead ? (w(i, (i.gzhead.text ? 1 : 0) + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)), w(i, 255 & i.gzhead.time), w(i, i.gzhead.time >> 8 & 255), w(i, i.gzhead.time >> 16 & 255), w(i, i.gzhead.time >> 24 & 255), w(i, 9 === i.level ? 2 : i.strategy >= 2 || i.level < 2 ? 4 : 0), w(i, 255 & i.gzhead.os), i.gzhead.extra && i.gzhead.extra.length && (w(i, 255 & i.gzhead.extra.length), w(i, i.gzhead.extra.length >> 8 & 255)), i.gzhead.hcrc && (e.adler = s(e.adler, i.pending_buf, i.pending, 0)), i.gzindex = 0, i.status = 69) : (w(i, 0), w(i, 0), w(i, 0), w(i, 0), w(i, 0), w(i, 9 === i.level ? 2 : i.strategy >= 2 || i.level < 2 ? 4 : 0), w(i, 3), i.status = h);
                              else {
                                  var d = 8 + (i.w_bits - 8 << 4) << 8;
                                  d |= (i.strategy >= 2 || i.level < 2 ? 0 : i.level < 6 ? 1 : 6 === i.level ? 2 : 3) << 6, 0 !== i.strstart && (d |= 32), d += 31 - d % 31, i.status = h, _(i, d), 0 !== i.strstart && (_(i, e.adler >>> 16), _(i, 65535 & e.adler)), e.adler = 1
                              } if (69 === i.status)
                              if (i.gzhead.extra) {
                                  for (o = i.pending; i.gzindex < (65535 & i.gzhead.extra.length) && (i.pending !== i.pending_buf_size || (i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), y(e), o = i.pending, i.pending !== i.pending_buf_size));) w(i, 255 & i.gzhead.extra[i.gzindex]), i.gzindex++;
                                  i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), i.gzindex === i.gzhead.extra.length && (i.gzindex = 0, i.status = 73)
                              } else i.status = 73;
                          if (73 === i.status)
                              if (i.gzhead.name) {
                                  o = i.pending;
                                  do {
                                      if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), y(e), o = i.pending, i.pending === i.pending_buf_size)) {
                                          l = 1;
                                          break
                                      }
                                      l = i.gzindex < i.gzhead.name.length ? 255 & i.gzhead.name.charCodeAt(i.gzindex++) : 0, w(i, l)
                                  } while (0 !== l);
                                  i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), 0 === l && (i.gzindex = 0, i.status = 91)
                              } else i.status = 91;
                          if (91 === i.status)
                              if (i.gzhead.comment) {
                                  o = i.pending;
                                  do {
                                      if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), y(e), o = i.pending, i.pending === i.pending_buf_size)) {
                                          l = 1;
                                          break
                                      }
                                      l = i.gzindex < i.gzhead.comment.length ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++) : 0, w(i, l)
                                  } while (0 !== l);
                                  i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), 0 === l && (i.status = f)
                              } else i.status = f;
                          if (i.status === f && (i.gzhead.hcrc ? (i.pending + 2 > i.pending_buf_size && y(e), i.pending + 2 <= i.pending_buf_size && (w(i, 255 & e.adler), w(i, e.adler >> 8 & 255), e.adler = 0, i.status = h)) : i.status = h), 0 !== i.pending) {
                              if (y(e), 0 === e.avail_out) return i.last_flush = -1, 0
                          } else if (0 === e.avail_in && v(t) <= v(n) && 4 !== t) return m(e, -5);
                          if (i.status === p && 0 !== e.avail_in) return m(e, -5);
                          if (0 !== e.avail_in || 0 !== i.lookahead || 0 !== t && i.status !== p) {
                              var k = 2 === i.strategy ? function(e, t) {
                                  for (var n;;) {
                                      if (0 === e.lookahead && (x(e), 0 === e.lookahead)) {
                                          if (0 === t) return 1;
                                          break
                                      }
                                      if (e.match_length = 0, n = a._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, n && (b(e, !1), 0 === e.strm.avail_out)) return 1
                                  }
                                  return e.insert = 0, 4 === t ? (b(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (b(e, !1), 0 === e.strm.avail_out) ? 1 : 2
                              }(i, t) : 3 === i.strategy ? function(e, t) {
                                  for (var n, r, i, o, s = e.window;;) {
                                      if (e.lookahead <= c) {
                                          if (x(e), e.lookahead <= c && 0 === t) return 1;
                                          if (0 === e.lookahead) break
                                      }
                                      if (e.match_length = 0, e.lookahead >= 3 && e.strstart > 0 && (r = s[i = e.strstart - 1]) === s[++i] && r === s[++i] && r === s[++i]) {
                                          o = e.strstart + c;
                                          do {} while (r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && i < o);
                                          e.match_length = c - (o - i), e.match_length > e.lookahead && (e.match_length = e.lookahead)
                                      }
                                      if (e.match_length >= 3 ? (n = a._tr_tally(e, 1, e.match_length - 3), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (n = a._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), n && (b(e, !1), 0 === e.strm.avail_out)) return 1
                                  }
                                  return e.insert = 0, 4 === t ? (b(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (b(e, !1), 0 === e.strm.avail_out) ? 1 : 2
                              }(i, t) : r[i.level].func(i, t);
                              if (3 !== k && 4 !== k || (i.status = p), 1 === k || 3 === k) return 0 === e.avail_out && (i.last_flush = -1), 0;
                              if (2 === k && (1 === t ? a._tr_align(i) : 5 !== t && (a._tr_stored_block(i, 0, 0, !1), 3 === t && (g(i.head), 0 === i.lookahead && (i.strstart = 0, i.block_start = 0, i.insert = 0))), y(e), 0 === e.avail_out)) return i.last_flush = -1, 0
                          }
                          return 4 !== t ? 0 : i.wrap <= 0 ? 1 : (2 === i.wrap ? (w(i, 255 & e.adler), w(i, e.adler >> 8 & 255), w(i, e.adler >> 16 & 255), w(i, e.adler >> 24 & 255), w(i, 255 & e.total_in), w(i, e.total_in >> 8 & 255), w(i, e.total_in >> 16 & 255), w(i, e.total_in >> 24 & 255)) : (_(i, e.adler >>> 16), _(i, 65535 & e.adler)), y(e), i.wrap > 0 && (i.wrap = -i.wrap), 0 !== i.pending ? 0 : 1)
                      }, n.deflateEnd = function(e) {
                          var t;
                          return e && e.state ? 42 !== (t = e.state.status) && 69 !== t && 73 !== t && 91 !== t && t !== f && t !== h && t !== p ? m(e, u) : (e.state = null, t === h ? m(e, -3) : 0) : u
                      }, n.deflateSetDictionary = function(e, t) {
                          var n, r, a, s, l, c, d, f, h = t.length;
                          if (!e || !e.state) return u;
                          if (2 === (s = (n = e.state).wrap) || 1 === s && 42 !== n.status || n.lookahead) return u;
                          for (1 === s && (e.adler = o(e.adler, t, h, 0)), n.wrap = 0, h >= n.w_size && (0 === s && (g(n.head), n.strstart = 0, n.block_start = 0, n.insert = 0), f = new i.Buf8(n.w_size), i.arraySet(f, t, h - n.w_size, n.w_size, 0), t = f, h = n.w_size), l = e.avail_in, c = e.next_in, d = e.input, e.avail_in = h, e.next_in = 0, e.input = t, x(n); n.lookahead >= 3;) {
                              r = n.strstart, a = n.lookahead - 2;
                              do {
                                  n.ins_h = (n.ins_h << n.hash_shift ^ n.window[r + 3 - 1]) & n.hash_mask, n.prev[r & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = r, r++
                              } while (--a);
                              n.strstart = r, n.lookahead = 2, x(n)
                          }
                          return n.strstart += n.lookahead, n.block_start = n.strstart, n.insert = n.lookahead, n.lookahead = 0, n.match_length = n.prev_length = 2, n.match_available = 0, e.next_in = c, e.input = d, e.avail_in = l, n.wrap = s, 0
                      }, n.deflateInfo = "pako deflate (from Nodeca project)"
                  }, {
                      "../utils/common": 1,
                      "./adler32": 3,
                      "./crc32": 4,
                      "./messages": 6,
                      "./trees": 7
                  }],
                  6: [function(e, t, n) {
                      t.exports = {
                          2: "need dictionary",
                          1: "stream end",
                          0: "",
                          "-1": "file error",
                          "-2": "stream error",
                          "-3": "data error",
                          "-4": "insufficient memory",
                          "-5": "buffer error",
                          "-6": "incompatible version"
                      }
                  }, {}],
                  7: [function(e, t, n) {
                      var r = e("../utils/common");
  
                      function i(e) {
                          for (var t = e.length; --t >= 0;) e[t] = 0
                      }
                      var a = 256,
                          o = 286,
                          s = 30,
                          l = 15,
                          u = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                          c = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                          d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                          f = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                          h = new Array(576);
                      i(h);
                      var p = new Array(60);
                      i(p);
                      var m = new Array(512);
                      i(m);
                      var v = new Array(256);
                      i(v);
                      var g = new Array(29);
                      i(g);
                      var y, b, w, _ = new Array(s);
  
                      function k(e, t, n, r, i) {
                          this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = r, this.max_length = i, this.has_stree = e && e.length
                      }
  
                      function S(e, t) {
                          this.dyn_tree = e, this.max_code = 0, this.stat_desc = t
                      }
  
                      function x(e) {
                          return e < 256 ? m[e] : m[256 + (e >>> 7)]
                      }
  
                      function E(e, t) {
                          e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255
                      }
  
                      function T(e, t, n) {
                          e.bi_valid > 16 - n ? (e.bi_buf |= t << e.bi_valid & 65535, E(e, e.bi_buf), e.bi_buf = t >> 16 - e.bi_valid, e.bi_valid += n - 16) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n)
                      }
  
                      function C(e, t, n) {
                          T(e, n[2 * t], n[2 * t + 1])
                      }
  
                      function I(e, t) {
                          var n = 0;
                          do {
                              n |= 1 & e, e >>>= 1, n <<= 1
                          } while (--t > 0);
                          return n >>> 1
                      }
  
                      function M(e, t, n) {
                          var r, i, a = new Array(16),
                              o = 0;
                          for (r = 1; r <= l; r++) a[r] = o = o + n[r - 1] << 1;
                          for (i = 0; i <= t; i++) {
                              var s = e[2 * i + 1];
                              0 !== s && (e[2 * i] = I(a[s]++, s))
                          }
                      }
  
                      function N(e) {
                          var t;
                          for (t = 0; t < o; t++) e.dyn_ltree[2 * t] = 0;
                          for (t = 0; t < s; t++) e.dyn_dtree[2 * t] = 0;
                          for (t = 0; t < 19; t++) e.bl_tree[2 * t] = 0;
                          e.dyn_ltree[512] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0
                      }
  
                      function O(e) {
                          e.bi_valid > 8 ? E(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0
                      }
  
                      function D(e, t, n, i) {
                          O(e), i && (E(e, n), E(e, ~n)), r.arraySet(e.pending_buf, e.window, t, n, e.pending), e.pending += n
                      }
  
                      function A(e, t, n, r) {
                          var i = 2 * t,
                              a = 2 * n;
                          return e[i] < e[a] || e[i] === e[a] && r[t] <= r[n]
                      }
  
                      function R(e, t, n) {
                          for (var r = e.heap[n], i = n << 1; i <= e.heap_len && (i < e.heap_len && A(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !A(t, r, e.heap[i], e.depth));) e.heap[n] = e.heap[i], n = i, i <<= 1;
                          e.heap[n] = r
                      }
  
                      function $(e, t, n) {
                          var r, i, o, s, l = 0;
                          if (0 !== e.last_lit)
                              do {
                                  r = e.pending_buf[e.d_buf + 2 * l] << 8 | e.pending_buf[e.d_buf + 2 * l + 1], i = e.pending_buf[e.l_buf + l], l++, 0 === r ? C(e, i, t) : (C(e, (o = v[i]) + a + 1, t), 0 !== (s = u[o]) && T(e, i -= g[o], s), C(e, o = x(--r), n), 0 !== (s = c[o]) && T(e, r -= _[o], s))
                              } while (l < e.last_lit);
                          C(e, 256, t)
                      }
  
                      function F(e, t) {
                          var n, r, i, a = t.dyn_tree,
                              o = t.stat_desc.static_tree,
                              s = t.stat_desc.has_stree,
                              u = t.stat_desc.elems,
                              c = -1;
                          for (e.heap_len = 0, e.heap_max = 573, n = 0; n < u; n++) 0 !== a[2 * n] ? (e.heap[++e.heap_len] = c = n, e.depth[n] = 0) : a[2 * n + 1] = 0;
                          for (; e.heap_len < 2;) a[2 * (i = e.heap[++e.heap_len] = c < 2 ? ++c : 0)] = 1, e.depth[i] = 0, e.opt_len--, s && (e.static_len -= o[2 * i + 1]);
                          for (t.max_code = c, n = e.heap_len >> 1; n >= 1; n--) R(e, a, n);
                          i = u;
                          do {
                              n = e.heap[1], e.heap[1] = e.heap[e.heap_len--], R(e, a, 1), r = e.heap[1], e.heap[--e.heap_max] = n, e.heap[--e.heap_max] = r, a[2 * i] = a[2 * n] + a[2 * r], e.depth[i] = (e.depth[n] >= e.depth[r] ? e.depth[n] : e.depth[r]) + 1, a[2 * n + 1] = a[2 * r + 1] = i, e.heap[1] = i++, R(e, a, 1)
                          } while (e.heap_len >= 2);
                          e.heap[--e.heap_max] = e.heap[1],
                              function(e, t) {
                                  var n, r, i, a, o, s, u = t.dyn_tree,
                                      c = t.max_code,
                                      d = t.stat_desc.static_tree,
                                      f = t.stat_desc.has_stree,
                                      h = t.stat_desc.extra_bits,
                                      p = t.stat_desc.extra_base,
                                      m = t.stat_desc.max_length,
                                      v = 0;
                                  for (a = 0; a <= l; a++) e.bl_count[a] = 0;
                                  for (u[2 * e.heap[e.heap_max] + 1] = 0, n = e.heap_max + 1; n < 573; n++)(a = u[2 * u[2 * (r = e.heap[n]) + 1] + 1] + 1) > m && (a = m, v++), u[2 * r + 1] = a, r > c || (e.bl_count[a]++, o = 0, r >= p && (o = h[r - p]), s = u[2 * r], e.opt_len += s * (a + o), f && (e.static_len += s * (d[2 * r + 1] + o)));
                                  if (0 !== v) {
                                      do {
                                          for (a = m - 1; 0 === e.bl_count[a];) a--;
                                          e.bl_count[a]--, e.bl_count[a + 1] += 2, e.bl_count[m]--, v -= 2
                                      } while (v > 0);
                                      for (a = m; 0 !== a; a--)
                                          for (r = e.bl_count[a]; 0 !== r;)(i = e.heap[--n]) > c || (u[2 * i + 1] !== a && (e.opt_len += (a - u[2 * i + 1]) * u[2 * i], u[2 * i + 1] = a), r--)
                                  }
                              }(e, t), M(a, c, e.bl_count)
                      }
  
                      function z(e, t, n) {
                          var r, i, a = -1,
                              o = t[1],
                              s = 0,
                              l = 7,
                              u = 4;
                          for (0 === o && (l = 138, u = 3), t[2 * (n + 1) + 1] = 65535, r = 0; r <= n; r++) i = o, o = t[2 * (r + 1) + 1], ++s < l && i === o || (s < u ? e.bl_tree[2 * i] += s : 0 !== i ? (i !== a && e.bl_tree[2 * i]++, e.bl_tree[32]++) : s <= 10 ? e.bl_tree[34]++ : e.bl_tree[36]++, s = 0, a = i, 0 === o ? (l = 138, u = 3) : i === o ? (l = 6, u = 3) : (l = 7, u = 4))
                      }
  
                      function L(e, t, n) {
                          var r, i, a = -1,
                              o = t[1],
                              s = 0,
                              l = 7,
                              u = 4;
                          for (0 === o && (l = 138, u = 3), r = 0; r <= n; r++)
                              if (i = o, o = t[2 * (r + 1) + 1], !(++s < l && i === o)) {
                                  if (s < u)
                                      do {
                                          C(e, i, e.bl_tree)
                                      } while (0 != --s);
                                  else 0 !== i ? (i !== a && (C(e, i, e.bl_tree), s--), C(e, 16, e.bl_tree), T(e, s - 3, 2)) : s <= 10 ? (C(e, 17, e.bl_tree), T(e, s - 3, 3)) : (C(e, 18, e.bl_tree), T(e, s - 11, 7));
                                  s = 0, a = i, 0 === o ? (l = 138, u = 3) : i === o ? (l = 6, u = 3) : (l = 7, u = 4)
                              }
                      }
  
                      function P(e) {
                          var t, n = 4093624447;
                          for (t = 0; t <= 31; t++, n >>>= 1)
                              if (1 & n && 0 !== e.dyn_ltree[2 * t]) return 0;
                          if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return 1;
                          for (t = 32; t < a; t++)
                              if (0 !== e.dyn_ltree[2 * t]) return 1;
                          return 0
                      }
                      i(_);
                      var j = !1;
  
                      function B(e, t, n, r) {
                          T(e, 0 + (r ? 1 : 0), 3), D(e, t, n, !0)
                      }
                      n._tr_init = function(e) {
                          j || (function() {
                              var e, t, n, r, i, a = new Array(16);
                              for (n = 0, r = 0; r < 28; r++)
                                  for (g[r] = n, e = 0; e < 1 << u[r]; e++) v[n++] = r;
                              for (v[n - 1] = r, i = 0, r = 0; r < 16; r++)
                                  for (_[r] = i, e = 0; e < 1 << c[r]; e++) m[i++] = r;
                              for (i >>= 7; r < s; r++)
                                  for (_[r] = i << 7, e = 0; e < 1 << c[r] - 7; e++) m[256 + i++] = r;
                              for (t = 0; t <= l; t++) a[t] = 0;
                              for (e = 0; e <= 143;) h[2 * e + 1] = 8, e++, a[8]++;
                              for (; e <= 255;) h[2 * e + 1] = 9, e++, a[9]++;
                              for (; e <= 279;) h[2 * e + 1] = 7, e++, a[7]++;
                              for (; e <= 287;) h[2 * e + 1] = 8, e++, a[8]++;
                              for (M(h, 287, a), e = 0; e < s; e++) p[2 * e + 1] = 5, p[2 * e] = I(e, 5);
                              y = new k(h, u, 257, o, l), b = new k(p, c, 0, s, l), w = new k(new Array(0), d, 0, 19, 7)
                          }(), j = !0), e.l_desc = new S(e.dyn_ltree, y), e.d_desc = new S(e.dyn_dtree, b), e.bl_desc = new S(e.bl_tree, w), e.bi_buf = 0, e.bi_valid = 0, N(e)
                      }, n._tr_stored_block = B, n._tr_flush_block = function(e, t, n, r) {
                          var i, a, o = 0;
                          e.level > 0 ? (2 === e.strm.data_type && (e.strm.data_type = P(e)), F(e, e.l_desc), F(e, e.d_desc), o = function(e) {
                              var t;
                              for (z(e, e.dyn_ltree, e.l_desc.max_code), z(e, e.dyn_dtree, e.d_desc.max_code), F(e, e.bl_desc), t = 18; t >= 3 && 0 === e.bl_tree[2 * f[t] + 1]; t--);
                              return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t
                          }(e), i = e.opt_len + 3 + 7 >>> 3, (a = e.static_len + 3 + 7 >>> 3) <= i && (i = a)) : i = a = n + 5, n + 4 <= i && -1 !== t ? B(e, t, n, r) : 4 === e.strategy || a === i ? (T(e, 2 + (r ? 1 : 0), 3), $(e, h, p)) : (T(e, 4 + (r ? 1 : 0), 3), function(e, t, n, r) {
                              var i;
                              for (T(e, t - 257, 5), T(e, n - 1, 5), T(e, r - 4, 4), i = 0; i < r; i++) T(e, e.bl_tree[2 * f[i] + 1], 3);
                              L(e, e.dyn_ltree, t - 1), L(e, e.dyn_dtree, n - 1)
                          }(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, o + 1), $(e, e.dyn_ltree, e.dyn_dtree)), N(e), r && O(e)
                      }, n._tr_tally = function(e, t, n) {
                          return e.pending_buf[e.d_buf + 2 * e.last_lit] = t >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, e.pending_buf[e.l_buf + e.last_lit] = 255 & n, e.last_lit++, 0 === t ? e.dyn_ltree[2 * n]++ : (e.matches++, t--, e.dyn_ltree[2 * (v[n] + a + 1)]++, e.dyn_dtree[2 * x(t)]++), e.last_lit === e.lit_bufsize - 1
                      }, n._tr_align = function(e) {
                          T(e, 2, 3), C(e, 256, h),
                              function(e) {
                                  16 === e.bi_valid ? (E(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8)
                              }(e)
                      }
                  }, {
                      "../utils/common": 1
                  }],
                  8: [function(e, t, n) {
                      t.exports = function() {
                          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
                      }
                  }, {}],
                  "/lib/deflate.js": [function(e, t, n) {
                      var r = e("./zlib/deflate"),
                          i = e("./utils/common"),
                          a = e("./utils/strings"),
                          o = e("./zlib/messages"),
                          s = e("./zlib/zstream"),
                          l = Object.prototype.toString;
  
                      function u(e) {
                          if (!(this instanceof u)) return new u(e);
                          this.options = i.assign({
                              level: -1,
                              method: 8,
                              chunkSize: 16384,
                              windowBits: 15,
                              memLevel: 8,
                              strategy: 0,
                              to: ""
                          }, e || {});
                          var t = this.options;
                          t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new s, this.strm.avail_out = 0;
                          var n = r.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
                          if (0 !== n) throw new Error(o[n]);
                          if (t.header && r.deflateSetHeader(this.strm, t.header), t.dictionary) {
                              var c;
                              if (c = "string" == typeof t.dictionary ? a.string2buf(t.dictionary) : "[object ArrayBuffer]" === l.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary, 0 !== (n = r.deflateSetDictionary(this.strm, c))) throw new Error(o[n]);
                              this._dict_set = !0
                          }
                      }
  
                      function c(e, t) {
                          var n = new u(t);
                          if (n.push(e, !0), n.err) throw n.msg || o[n.err];
                          return n.result
                      }
                      u.prototype.push = function(e, t) {
                          var n, o, s = this.strm,
                              u = this.options.chunkSize;
                          if (this.ended) return !1;
                          o = t === ~~t ? t : !0 === t ? 4 : 0, "string" == typeof e ? s.input = a.string2buf(e) : "[object ArrayBuffer]" === l.call(e) ? s.input = new Uint8Array(e) : s.input = e, s.next_in = 0, s.avail_in = s.input.length;
                          do {
                              if (0 === s.avail_out && (s.output = new i.Buf8(u), s.next_out = 0, s.avail_out = u), 1 !== (n = r.deflate(s, o)) && 0 !== n) return this.onEnd(n), this.ended = !0, !1;
                              0 !== s.avail_out && (0 !== s.avail_in || 4 !== o && 2 !== o) || ("string" === this.options.to ? this.onData(a.buf2binstring(i.shrinkBuf(s.output, s.next_out))) : this.onData(i.shrinkBuf(s.output, s.next_out)))
                          } while ((s.avail_in > 0 || 0 === s.avail_out) && 1 !== n);
                          return 4 === o ? (n = r.deflateEnd(this.strm), this.onEnd(n), this.ended = !0, 0 === n) : 2 !== o || (this.onEnd(0), s.avail_out = 0, !0)
                      }, u.prototype.onData = function(e) {
                          this.chunks.push(e)
                      }, u.prototype.onEnd = function(e) {
                          0 === e && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = i.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
                      }, n.Deflate = u, n.deflate = c, n.deflateRaw = function(e, t) {
                          return (t = t || {}).raw = !0, c(e, t)
                      }, n.gzip = function(e, t) {
                          return (t = t || {}).gzip = !0, c(e, t)
                      }
                  }, {
                      "./utils/common": 1,
                      "./utils/strings": 2,
                      "./zlib/deflate": 5,
                      "./zlib/messages": 6,
                      "./zlib/zstream": 8
                  }]
              }, {}, [])("/lib/deflate.js")
          })).deflate;
  
      function M(e) {
          if ("string" != typeof e) return e;
          try {
              const t = JSON.parse(e);
              if (t.timestamp) return t
          } catch (e) {}
          try {
              const t = JSON.parse(T(e, {
                  to: "string"
              }));
              if ("v1" === t.v) return t;
              throw new Error(`These events were packed with packer ${t.v} which is incompatible with current packer v1.`)
          } catch (e) {
              throw console.error(e), new Error("Unknown data format.")
          }
      }
      const N = function(e) {
              const t = C(C({}, e), {
                  v: "v1"
              });
              return I(JSON.stringify(t), {
                  to: "string"
              })
          },
          O = S.record;
      var D = [];
      e.stopMemory = function() {};
      var A = "__CACHE_RECALL__",
          R = !1;
  
      function $(e) {
          return I(JSON.stringify(e), {
              to: "string"
          })
      }
  
      function F(e) {
            console.log('save');
          if (!R) {
              var t = JSON.stringify(e);
              try {
                  sessionStorage.setItem(A, t)
              } catch (e) {
                  sessionStorage.removeItem(A), R = !0, console.log("cache", e)
              }
          }
      }
  
      function z() {
          return vt(sessionStorage.getItem(A)) || []
      }
  
      function L() {
          var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
              t = P(z()),
              n = P(D);
          return e && t || n
      }
  
      function P(e) {
          var t, n = [],
              r = l(vt(e));
          try {
              for (r.s(); !(t = r.n()).done;) {
                  var i = t.value;
                  n.push(M(i))
              }
          } catch (e) {
              r.e(e)
          } finally {
              r.f()
          }
          return $(n)
      }
    //   window.addEventListener("load", (function() {
    //       var t = z();
    //       e.stopMemory = O({
    //         //   packFn: N,
    //           packFn: rrweb.pack,
    //           emit: function(e) {
    //               D.push(e), t.push(e), F(t)
    //           }
    //       })
    //   }));
      var j = {
          mobile: [{
              message: "手机号不能为空",
              test: function(e) {
                  return !!e
              }
          }, {
              message: "手机号码格式不正确",
              test: function(e) {
                  return at(e)
              }
          }],
          captcha: [{
              message: "验证码不能为空",
              test: function(e) {
                  return !!e
              }
          }, {
              message: "验证码格式不正确",
              test: function(e) {
                  return /^\d{4}$/.test(e)
              }
          }],
          name: [{
              message: "姓名不能为空",
              test: function(e) {
                  return !!e
              }
          }, {
              message: "姓名格式不正确",
              test: function(e) {
                  return ft(e)
              }
          }],
          idNumber: [{
              message: "身份证号码不能为空",
              test: function(e) {
                  return !!e
              }
          }, {
              message: "身份证号码格式不正确",
              test: function(e) {
                  return st(e)
              }
          }]
      };
  
      function B(e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              r = "";
          if (t instanceof Array)
              for (var i = 0; i < t.length; i++) {
                  var a = t[i];
                  if (r = U(e, a, n) || "") break
              } else r = U(e, t, n) || "";
          return r
      }
  
      function U(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {},
              n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          if (n || e) return t.test(e) ? void 0 : t.message
      }
  
      function H(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : j,
              r = [];
          return Object.keys(e).forEach((function(i) {
              var a = n[i] || j[i],
                  o = B(e[i], a, t);
              o && r.push({
                  key: i,
                  message: o
              })
          })), r
      }
  
      function Y(e) {
          var t, n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : j,
              i = [],
              o = l(e);
          try {
              for (o.s(); !(t = o.n()).done;) {
                  var s = t.value,
                      u = [].concat(a(r[s.key]), a(s.rules || [])),
                      c = B(s.value, u, n);
                  c && i.push({
                      key: key,
                      message: c
                  })
              }
          } catch (e) {
              o.e(e)
          } finally {
              o.f()
          }
          return i
      }
      var q = function(e, t) {
              return function() {
                  for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
                  return e.apply(t, n)
              }
          },
          W = Object.prototype.toString;
  
      function Z(e) {
          return "[object Array]" === W.call(e)
      }
  
      function V(e) {
          return void 0 === e
      }
  
      function X(e) {
          return null !== e && "object" == typeof e
      }
  
      function J(e) {
          if ("[object Object]" !== W.call(e)) return !1;
          var t = Object.getPrototypeOf(e);
          return null === t || t === Object.prototype
      }
  
      function K(e) {
          return "[object Function]" === W.call(e)
      }
  
      function G(e, t) {
          if (null != e)
              if ("object" != typeof e && (e = [e]), Z(e))
                  for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
              else
                  for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e)
      }
      var Q = {
          isArray: Z,
          isArrayBuffer: function(e) {
              return "[object ArrayBuffer]" === W.call(e)
          },
          isBuffer: function(e) {
              return null !== e && !V(e) && null !== e.constructor && !V(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
          },
          isFormData: function(e) {
              return "undefined" != typeof FormData && e instanceof FormData
          },
          isArrayBufferView: function(e) {
              return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
          },
          isString: function(e) {
              return "string" == typeof e
          },
          isNumber: function(e) {
              return "number" == typeof e
          },
          isObject: X,
          isPlainObject: J,
          isUndefined: V,
          isDate: function(e) {
              return "[object Date]" === W.call(e)
          },
          isFile: function(e) {
              return "[object File]" === W.call(e)
          },
          isBlob: function(e) {
              return "[object Blob]" === W.call(e)
          },
          isFunction: K,
          isStream: function(e) {
              return X(e) && K(e.pipe)
          },
          isURLSearchParams: function(e) {
              return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
          },
          isStandardBrowserEnv: function() {
              return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document)
          },
          forEach: G,
          merge: function e() {
              var t = {};
  
              function n(n, r) {
                  J(t[r]) && J(n) ? t[r] = e(t[r], n) : J(n) ? t[r] = e({}, n) : Z(n) ? t[r] = n.slice() : t[r] = n
              }
              for (var r = 0, i = arguments.length; r < i; r++) G(arguments[r], n);
              return t
          },
          extend: function(e, t, n) {
              return G(t, (function(t, r) {
                  e[r] = n && "function" == typeof t ? q(t, n) : t
              })), e
          },
          trim: function(e) {
              return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
          },
          stripBOM: function(e) {
              return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e
          }
      };
  
      function ee(e) {
          return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
      }
      var te = function(e, t, n) {
          if (!t) return e;
          var r;
          if (n) r = n(t);
          else if (Q.isURLSearchParams(t)) r = t.toString();
          else {
              var i = [];
              Q.forEach(t, (function(e, t) {
                  null != e && (Q.isArray(e) ? t += "[]" : e = [e], Q.forEach(e, (function(e) {
                      Q.isDate(e) ? e = e.toISOString() : Q.isObject(e) && (e = JSON.stringify(e)), i.push(ee(t) + "=" + ee(e))
                  })))
              })), r = i.join("&")
          }
          if (r) {
              var a = e.indexOf("#"); - 1 !== a && (e = e.slice(0, a)), e += (-1 === e.indexOf("?") ? "?" : "&") + r
          }
          return e
      };
  
      function ne() {
          this.handlers = []
      }
      ne.prototype.use = function(e, t, n) {
          return this.handlers.push({
              fulfilled: e,
              rejected: t,
              synchronous: !!n && n.synchronous,
              runWhen: n ? n.runWhen : null
          }), this.handlers.length - 1
      }, ne.prototype.eject = function(e) {
          this.handlers[e] && (this.handlers[e] = null)
      }, ne.prototype.forEach = function(e) {
          Q.forEach(this.handlers, (function(t) {
              null !== t && e(t)
          }))
      };
      var re = ne,
          ie = function(e, t) {
              Q.forEach(e, (function(n, r) {
                  r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r])
              }))
          },
          ae = function(e, t, n, r, i) {
              return e.config = t, n && (e.code = n), e.request = r, e.response = i, e.isAxiosError = !0, e.toJSON = function() {
                  return {
                      message: this.message,
                      name: this.name,
                      description: this.description,
                      number: this.number,
                      fileName: this.fileName,
                      lineNumber: this.lineNumber,
                      columnNumber: this.columnNumber,
                      stack: this.stack,
                      config: this.config,
                      code: this.code
                  }
              }, e
          },
          oe = function(e, t, n, r, i) {
              var a = new Error(e);
              return ae(a, t, n, r, i)
          },
          se = Q.isStandardBrowserEnv() ? {
              write: function(e, t, n, r, i, a) {
                  var o = [];
                  o.push(e + "=" + encodeURIComponent(t)), Q.isNumber(n) && o.push("expires=" + new Date(n).toGMTString()), Q.isString(r) && o.push("path=" + r), Q.isString(i) && o.push("domain=" + i), !0 === a && o.push("secure"), document.cookie = o.join("; ")
              },
              read: function(e) {
                  var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                  return t ? decodeURIComponent(t[3]) : null
              },
              remove: function(e) {
                  this.write(e, "", Date.now() - 864e5)
              }
          } : {
              write: function() {},
              read: function() {
                  return null
              },
              remove: function() {}
          },
          le = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"],
          ue = Q.isStandardBrowserEnv() ? function() {
              var e, t = /(msie|trident)/i.test(navigator.userAgent),
                  n = document.createElement("a");
  
              function r(e) {
                  var r = e;
                  return t && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), {
                      href: n.href,
                      protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                      host: n.host,
                      search: n.search ? n.search.replace(/^\?/, "") : "",
                      hash: n.hash ? n.hash.replace(/^#/, "") : "",
                      hostname: n.hostname,
                      port: n.port,
                      pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname
                  }
              }
              return e = r(window.location.href),
                  function(t) {
                      var n = Q.isString(t) ? r(t) : t;
                      return n.protocol === e.protocol && n.host === e.host
                  }
          }() : function() {
              return !0
          },
          ce = function(e) {
              return new Promise((function(t, n) {
                  var r = e.data,
                      i = e.headers,
                      a = e.responseType;
                  Q.isFormData(r) && delete i["Content-Type"];
                  var o = new XMLHttpRequest;
                  if (e.auth) {
                      var s = e.auth.username || "",
                          l = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
                      i.Authorization = "Basic " + btoa(s + ":" + l)
                  }
                  var u, c, d = (u = e.baseURL, c = e.url, u && !/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(c) ? function(e, t) {
                      return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
                  }(u, c) : c);
  
                  function f() {
                      if (o) {
                          var r = "getAllResponseHeaders" in o ? function(e) {
                                  var t, n, r, i = {};
                                  return e ? (Q.forEach(e.split("\n"), (function(e) {
                                      if (r = e.indexOf(":"), t = Q.trim(e.substr(0, r)).toLowerCase(), n = Q.trim(e.substr(r + 1)), t) {
                                          if (i[t] && le.indexOf(t) >= 0) return;
                                          i[t] = "set-cookie" === t ? (i[t] ? i[t] : []).concat([n]) : i[t] ? i[t] + ", " + n : n
                                      }
                                  })), i) : i
                              }(o.getAllResponseHeaders()) : null,
                              i = {
                                  data: a && "text" !== a && "json" !== a ? o.response : o.responseText,
                                  status: o.status,
                                  statusText: o.statusText,
                                  headers: r,
                                  config: e,
                                  request: o
                              };
                          ! function(e, t, n) {
                              var r = n.config.validateStatus;
                              n.status && r && !r(n.status) ? t(oe("Request failed with status code " + n.status, n.config, null, n.request, n)) : e(n)
                          }(t, n, i), o = null
                      }
                  }
                  if (o.open(e.method.toUpperCase(), te(d, e.params, e.paramsSerializer), !0), o.timeout = e.timeout, "onloadend" in o ? o.onloadend = f : o.onreadystatechange = function() {
                          o && 4 === o.readyState && (0 !== o.status || o.responseURL && 0 === o.responseURL.indexOf("file:")) && setTimeout(f)
                      }, o.onabort = function() {
                          o && (n(oe("Request aborted", e, "ECONNABORTED", o)), o = null)
                      }, o.onerror = function() {
                          n(oe("Network Error", e, null, o)), o = null
                      }, o.ontimeout = function() {
                          var t = "timeout of " + e.timeout + "ms exceeded";
                          e.timeoutErrorMessage && (t = e.timeoutErrorMessage), n(oe(t, e, e.transitional && e.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", o)), o = null
                      }, Q.isStandardBrowserEnv()) {
                      var h = (e.withCredentials || ue(d)) && e.xsrfCookieName ? se.read(e.xsrfCookieName) : void 0;
                      h && (i[e.xsrfHeaderName] = h)
                  }
                  "setRequestHeader" in o && Q.forEach(i, (function(e, t) {
                      void 0 === r && "content-type" === t.toLowerCase() ? delete i[t] : o.setRequestHeader(t, e)
                  })), Q.isUndefined(e.withCredentials) || (o.withCredentials = !!e.withCredentials), a && "json" !== a && (o.responseType = e.responseType), "function" == typeof e.onDownloadProgress && o.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && o.upload && o.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then((function(e) {
                      o && (o.abort(), n(e), o = null)
                  })), r || (r = null), o.send(r)
              }))
          },
          de = {
              "Content-Type": "application/x-www-form-urlencoded"
          };
  
      function fe(e, t) {
          !Q.isUndefined(e) && Q.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
      }
      var he, pe = {
          transitional: {
              silentJSONParsing: !0,
              forcedJSONParsing: !0,
              clarifyTimeoutError: !1
          },
          adapter: (("undefined" != typeof XMLHttpRequest || "undefined" != typeof process && "[object process]" === Object.prototype.toString.call(process)) && (he = ce), he),
          transformRequest: [function(e, t) {
              return ie(t, "Accept"), ie(t, "Content-Type"), Q.isFormData(e) || Q.isArrayBuffer(e) || Q.isBuffer(e) || Q.isStream(e) || Q.isFile(e) || Q.isBlob(e) ? e : Q.isArrayBufferView(e) ? e.buffer : Q.isURLSearchParams(e) ? (fe(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : Q.isObject(e) || t && "application/json" === t["Content-Type"] ? (fe(t, "application/json"), function(e, t, n) {
                  if (Q.isString(e)) try {
                      return (t || JSON.parse)(e), Q.trim(e)
                  } catch (e) {
                      if ("SyntaxError" !== e.name) throw e
                  }
                  return (n || JSON.stringify)(e)
              }(e)) : e
          }],
          transformResponse: [function(e) {
              var t = this.transitional,
                  n = t && t.silentJSONParsing,
                  r = t && t.forcedJSONParsing,
                  i = !n && "json" === this.responseType;
              if (i || r && Q.isString(e) && e.length) try {
                  return JSON.parse(e)
              } catch (e) {
                  if (i) {
                      if ("SyntaxError" === e.name) throw ae(e, this, "E_JSON_PARSE");
                      throw e
                  }
              }
              return e
          }],
          timeout: 0,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
          maxContentLength: -1,
          maxBodyLength: -1,
          validateStatus: function(e) {
              return e >= 200 && e < 300
          }
      };
      pe.headers = {
          common: {
              Accept: "application/json, text/plain, */*"
          }
      }, Q.forEach(["delete", "get", "head"], (function(e) {
          pe.headers[e] = {}
      })), Q.forEach(["post", "put", "patch"], (function(e) {
          pe.headers[e] = Q.merge(de)
      }));
      var me = pe,
          ve = function(e, t, n) {
              var r = this || me;
              return Q.forEach(n, (function(n) {
                  e = n.call(r, e, t)
              })), e
          },
          ge = function(e) {
              return !(!e || !e.__CANCEL__)
          };
  
      function ye(e) {
          e.cancelToken && e.cancelToken.throwIfRequested()
      }
      var be = function(e) {
              return ye(e), e.headers = e.headers || {}, e.data = ve.call(e, e.data, e.headers, e.transformRequest), e.headers = Q.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), Q.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function(t) {
                  delete e.headers[t]
              })), (e.adapter || me.adapter)(e).then((function(t) {
                  return ye(e), t.data = ve.call(e, t.data, t.headers, e.transformResponse), t
              }), (function(t) {
                  return ge(t) || (ye(e), t && t.response && (t.response.data = ve.call(e, t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t)
              }))
          },
          we = function(e, t) {
              t = t || {};
              var n = {},
                  r = ["url", "method", "data"],
                  i = ["headers", "auth", "proxy", "params"],
                  a = ["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "timeoutMessage", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "decompress", "maxContentLength", "maxBodyLength", "maxRedirects", "transport", "httpAgent", "httpsAgent", "cancelToken", "socketPath", "responseEncoding"],
                  o = ["validateStatus"];
  
              function s(e, t) {
                  return Q.isPlainObject(e) && Q.isPlainObject(t) ? Q.merge(e, t) : Q.isPlainObject(t) ? Q.merge({}, t) : Q.isArray(t) ? t.slice() : t
              }
  
              function l(r) {
                  Q.isUndefined(t[r]) ? Q.isUndefined(e[r]) || (n[r] = s(void 0, e[r])) : n[r] = s(e[r], t[r])
              }
              Q.forEach(r, (function(e) {
                  Q.isUndefined(t[e]) || (n[e] = s(void 0, t[e]))
              })), Q.forEach(i, l), Q.forEach(a, (function(r) {
                  Q.isUndefined(t[r]) ? Q.isUndefined(e[r]) || (n[r] = s(void 0, e[r])) : n[r] = s(void 0, t[r])
              })), Q.forEach(o, (function(r) {
                  r in t ? n[r] = s(e[r], t[r]) : r in e && (n[r] = s(void 0, e[r]))
              }));
              var u = r.concat(i).concat(a).concat(o),
                  c = Object.keys(e).concat(Object.keys(t)).filter((function(e) {
                      return -1 === u.indexOf(e)
                  }));
              return Q.forEach(c, l), n
          },
          _e = "axios",
          ke = "0.21.4",
          Se = "Promise based HTTP client for the browser and node.js",
          xe = "index.js",
          Ee = {
              test: "grunt test",
              start: "node ./sandbox/server.js",
              build: "NODE_ENV=production grunt build",
              preversion: "npm test",
              version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
              postversion: "git push && git push --tags",
              examples: "node ./examples/server.js",
              coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
              fix: "eslint --fix lib/**/*.js"
          },
          Te = {
              type: "git",
              url: "https://github.com/axios/axios.git"
          },
          Ce = ["xhr", "http", "ajax", "promise", "node"],
          Ie = "Matt Zabriskie",
          Me = {
              url: "https://github.com/axios/axios/issues"
          },
          Ne = "https://axios-http.com",
          Oe = {
              coveralls: "^3.0.0",
              "es6-promise": "^4.2.4",
              grunt: "^1.3.0",
              "grunt-banner": "^0.6.0",
              "grunt-cli": "^1.2.0",
              "grunt-contrib-clean": "^1.1.0",
              "grunt-contrib-watch": "^1.0.0",
              "grunt-eslint": "^23.0.0",
              "grunt-karma": "^4.0.0",
              "grunt-mocha-test": "^0.13.3",
              "grunt-ts": "^6.0.0-beta.19",
              "grunt-webpack": "^4.0.2",
              "istanbul-instrumenter-loader": "^1.0.0",
              "jasmine-core": "^2.4.1",
              karma: "^6.3.2",
              "karma-chrome-launcher": "^3.1.0",
              "karma-firefox-launcher": "^2.1.0",
              "karma-jasmine": "^1.1.1",
              "karma-jasmine-ajax": "^0.1.13",
              "karma-safari-launcher": "^1.0.0",
              "karma-sauce-launcher": "^4.3.6",
              "karma-sinon": "^1.0.5",
              "karma-sourcemap-loader": "^0.3.8",
              "karma-webpack": "^4.0.2",
              "load-grunt-tasks": "^3.5.2",
              minimist: "^1.2.0",
              mocha: "^8.2.1",
              sinon: "^4.5.0",
              "terser-webpack-plugin": "^4.2.3",
              typescript: "^4.0.5",
              "url-search-params": "^0.10.0",
              webpack: "^4.44.2",
              "webpack-dev-server": "^3.11.0"
          },
          De = {
              "./lib/adapters/http.js": "./lib/adapters/xhr.js"
          },
          Ae = "dist/axios.min.js",
          Re = "dist/axios.min.js",
          $e = "./index.d.ts",
          Fe = {
              "follow-redirects": "^1.14.0"
          },
          ze = [{
              path: "./dist/axios.min.js",
              threshold: "5kB"
          }],
          Le = {
              name: _e,
              version: ke,
              description: Se,
              main: xe,
              scripts: Ee,
              repository: Te,
              keywords: Ce,
              author: Ie,
              license: "MIT",
              bugs: Me,
              homepage: Ne,
              devDependencies: Oe,
              browser: De,
              jsdelivr: Ae,
              unpkg: Re,
              typings: $e,
              dependencies: Fe,
              bundlesize: ze
          },
          Pe = function(e) {
              return e && e.default || e
          }(Object.freeze({
              __proto__: null,
              name: _e,
              version: ke,
              description: Se,
              main: xe,
              scripts: Ee,
              repository: Te,
              keywords: Ce,
              author: Ie,
              license: "MIT",
              bugs: Me,
              homepage: Ne,
              devDependencies: Oe,
              browser: De,
              jsdelivr: Ae,
              unpkg: Re,
              typings: $e,
              dependencies: Fe,
              bundlesize: ze,
              default: Le
          })),
          je = {};
      ["object", "boolean", "number", "function", "string", "symbol"].forEach((function(e, t) {
          je[e] = function(n) {
              return typeof n === e || "a" + (t < 1 ? "n " : " ") + e
          }
      }));
      var Be = {},
          Ue = Pe.version.split(".");
  
      function He(e, t) {
          for (var n = t ? t.split(".") : Ue, r = e.split("."), i = 0; i < 3; i++) {
              if (n[i] > r[i]) return !0;
              if (n[i] < r[i]) return !1
          }
          return !1
      }
      je.transitional = function(e, t, n) {
          var r = t && He(t);
  
          function i(e, t) {
              return "[Axios v" + Pe.version + "] Transitional option '" + e + "'" + t + (n ? ". " + n : "")
          }
          return function(n, a, o) {
              if (!1 === e) throw new Error(i(a, " has been removed in " + t));
              return r && !Be[a] && (Be[a] = !0, console.warn(i(a, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(n, a, o)
          }
      };
      var Ye = {
              isOlderVersion: He,
              assertOptions: function(e, t, n) {
                  if ("object" != typeof e) throw new TypeError("options must be an object");
                  for (var r = Object.keys(e), i = r.length; i-- > 0;) {
                      var a = r[i],
                          o = t[a];
                      if (o) {
                          var s = e[a],
                              l = void 0 === s || o(s, a, e);
                          if (!0 !== l) throw new TypeError("option " + a + " must be " + l)
                      } else if (!0 !== n) throw Error("Unknown option " + a)
                  }
              },
              validators: je
          },
          qe = Ye.validators;
  
      function We(e) {
          this.defaults = e, this.interceptors = {
              request: new re,
              response: new re
          }
      }
      We.prototype.request = function(e) {
          "string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = we(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";
          var t = e.transitional;
          void 0 !== t && Ye.assertOptions(t, {
              silentJSONParsing: qe.transitional(qe.boolean, "1.0.0"),
              forcedJSONParsing: qe.transitional(qe.boolean, "1.0.0"),
              clarifyTimeoutError: qe.transitional(qe.boolean, "1.0.0")
          }, !1);
          var n = [],
              r = !0;
          this.interceptors.request.forEach((function(t) {
              "function" == typeof t.runWhen && !1 === t.runWhen(e) || (r = r && t.synchronous, n.unshift(t.fulfilled, t.rejected))
          }));
          var i, a = [];
          if (this.interceptors.response.forEach((function(e) {
                  a.push(e.fulfilled, e.rejected)
              })), !r) {
              var o = [be, void 0];
              for (Array.prototype.unshift.apply(o, n), o = o.concat(a), i = Promise.resolve(e); o.length;) i = i.then(o.shift(), o.shift());
              return i
          }
          for (var s = e; n.length;) {
              var l = n.shift(),
                  u = n.shift();
              try {
                  s = l(s)
              } catch (e) {
                  u(e);
                  break
              }
          }
          try {
              i = be(s)
          } catch (e) {
              return Promise.reject(e)
          }
          for (; a.length;) i = i.then(a.shift(), a.shift());
          return i
      }, We.prototype.getUri = function(e) {
          return e = we(this.defaults, e), te(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
      }, Q.forEach(["delete", "get", "head", "options"], (function(e) {
          We.prototype[e] = function(t, n) {
              return this.request(we(n || {}, {
                  method: e,
                  url: t,
                  data: (n || {}).data
              }))
          }
      })), Q.forEach(["post", "put", "patch"], (function(e) {
          We.prototype[e] = function(t, n, r) {
              return this.request(we(r || {}, {
                  method: e,
                  url: t,
                  data: n
              }))
          }
      }));
      var Ze = We;
  
      function Ve(e) {
          this.message = e
      }
      Ve.prototype.toString = function() {
          return "Cancel" + (this.message ? ": " + this.message : "")
      }, Ve.prototype.__CANCEL__ = !0;
      var Xe = Ve;
  
      function Je(e) {
          if ("function" != typeof e) throw new TypeError("executor must be a function.");
          var t;
          this.promise = new Promise((function(e) {
              t = e
          }));
          var n = this;
          e((function(e) {
              n.reason || (n.reason = new Xe(e), t(n.reason))
          }))
      }
      Je.prototype.throwIfRequested = function() {
          if (this.reason) throw this.reason
      }, Je.source = function() {
          var e;
          return {
              token: new Je((function(t) {
                  e = t
              })),
              cancel: e
          }
      };
      var Ke = Je;
  
      function Ge(e) {
          var t = new Ze(e),
              n = q(Ze.prototype.request, t);
          return Q.extend(n, Ze.prototype, t), Q.extend(n, t), n
      }
      var Qe = Ge(me);
      Qe.Axios = Ze, Qe.create = function(e) {
          return Ge(we(Qe.defaults, e))
      }, Qe.Cancel = Xe, Qe.CancelToken = Ke, Qe.isCancel = ge, Qe.all = function(e) {
          return Promise.all(e)
      }, Qe.spread = function(e) {
          return function(t) {
              return e.apply(null, t)
          }
      }, Qe.isAxiosError = function(e) {
          return "object" == typeof e && !0 === e.isAxiosError
      };
      var et = Qe,
          tt = Qe;
      et.default = tt;
      var nt = et;
  
      function rt() {
          var e = location,
              t = e.search,
              n = e.hash,
              r = n.indexOf("?");
          return !t && r > -1 ? t = n.substring(r) : t && r > -1 && (t += "&" + n.substring(r + 1)), t
      }
  
      function it() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "?",
              t = {};
          return e.replace(/([^?&]+)=([^?&]+)/g, (function(e, n, r) {
              return t[n] = decodeURIComponent(r), r + "=" + n
          })), t
      }
  
      function at() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
          return e && /^1\d{10}$/.test(e) || /^1\d{2}\s\d{4}\s\d{4}$/.test(e)
      }
  
      function ot() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
          return e && /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}[0-9X]$/.test(e)
      }
  
      function st() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
          if (ot(e)) {
              for (var t = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], n = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"], r = 0, i = 0; i < 17; i++) r += Number(e[i]) * t[i];
              var a = r % 11;
              return n[a] === e[17]
          }
          return !1
      }
  
      function lt(e) {
          return e < 10 ? "0".concat(e) : "".concat(e)
      }
  
      function ut(e) {
          var t = e ? e.match(/^\d{6}((?:19|20)\d{2})(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{2}(\d)[0-9X]$/) : null;
          if (t) {
              var n = Number(t[1]),
                  r = Number(t[2]),
                  i = Number(t[3]);
              return {
                  day: i,
                  month: r,
                  year: n,
                  gender: Number(t[4]) % 2 ? 1 : 2,
                  birthday: "".concat(n, "-").concat(lt(r), "-").concat(lt(i))
              }
          }
          return {}
      }
  
      function ct(e) {
          var t = e instanceof Date ? e : new Date(e);
          return [t.getFullYear(), t.getMonth() + 1, t.getDate()]
      }
      var dt = 864e5;
  
      function ft() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
              t = /^[\u4e00-\u9fa5]+[˙•.·．\u4e00-\u9fa5]*[\u4e00-\u9fa5]+$/;
          return e && t.test(e)
      }
      var ht = ["productNo", "channelNo", "channelSec", "activityNo", "link", "companyNo", "h5No", "channel", "tbbchannelNo", "tbbproductNo", "tbbchannelSec", "tbbactivityNo", "tbblink", "tbbcompanyNo", "tbbh5No", "tbbchannel", "fromUrl", "channelUrl", "extfromUrl", "extchannelUrl"];
  
      function pt(e) {
          var t = {};
          (e.extchannelUrl || e.channelUrl) && (t = it(e.extchannelUrl || e.channelUrl));
          var r = n(n({}, e), t);
          return Object.keys(r).filter((function(e) {
              return -1 === ht.indexOf(e)
          })).reduce((function(e, t) {
              return e[t] = r[t], e
          }), {})
      }
  
      function mt(e) {
          var t = {},
              r = e.dkey,
              i = e.extdkey,
              a = e.status,
              o = e.extstatus,
              s = e.trackParam,
              l = e.exttrackParam,
              u = e.bxm_id,
              c = e.extbxm_id,
              d = e.bc_tag,
              f = e.extbc_tag;
          return (r || i) && (t.douM = {
              dkey: r || i,
              status: a || o,
              trackParam: s || l
          }), (u || c) && (t.bxm = {
              imei: "",
              idfa: "",
              bxmId: u || c,
              type: 1
          }), (d || f) && (t.baichuan = {
              bc_tag: d || f,
              type: 3
          }), t.common = n({}, pt(e)), t
      }
  
      function vt(e) {
          try {
              return "string" == typeof e ? JSON.parse(e) : e
          } catch (e) {
              console.log(e)
          }
      }
      var gt = "__session_storage_key__";
  
      function yt(e) {
          sessionStorage[e] || (sessionStorage[e] = "{}");
          var t = vt(sessionStorage[e]) || {};
          return {
              storage: t,
              getItem: function(e) {
                  return t[e]
              },
              setItem: function(i, a) {
                  var o = n(n({}, t), {}, r({}, i, a));
                  sessionStorage[e] = JSON.stringify(o)
              },
              getStorage: function() {
                  return vt(sessionStorage[e]) || {}
              }
          }
      }
      var bt = yt(gt);
  
      function wt(e, t) {
          if ("undefined" == typeof window) return 0;
          var n = t ? "scrollTop" : "scrollLeft",
              r = e === window,
              i = r ? e[t ? "pageYOffset" : "pageXOffset"] : e[n];
          return r && "number" != typeof i && (i = document.documentElement[n]), i
      }
  
      function _t(e, t, n, r) {
          var i = n - t;
          return (e /= r / 2) < 1 ? i / 2 * e * e * e + t : i / 2 * ((e -= 2) * e * e + 2) + t
      }
      var kt = "undefined" != typeof window,
          St = function(e) {
              return e && "[object Array]" === Object.prototype.toString.call(e)
          };
  
      function xt(e, t) {
          return " " !== e[t] ? e.substr(0, t) + " " + e.substr(t) : e
      }
  
      function Et(e) {
          return null != e && /\S+/.test(e)
      }
      var Tt = function(e) {
              var t = k().format("YYYY-MM-DD");
              return [{
                  payNo: 1,
                  planFee: e,
                  planStartDate: t + " 00:00:00",
                  planEndDate: t + " 23:59:59"
              }]
          },
          Ct = function(e) {
              for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 30, n = k(), r = [{
                      payNo: 1,
                      planFee: e,
                      planStartDate: n.format("YYYY-MM-DD 00:00:00"),
                      planEndDate: n.format("YYYY-MM-DD 23:59:59")
                  }], i = null, a = null, o = 2; o <= 12; o++) a = (i = n.add(1, "d").add(o - 1, "M")).add(t, "d"), r.push({
                  payNo: o,
                  planFee: e,
                  planStartDate: i.format("YYYY-MM-DD 00:00:00"),
                  planEndDate: a.format("YYYY-MM-DD 23:59:59")
              });
              return r
          };
  
      function It() {
          return "micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)
      }
  
      function Mt() {
          for (var e = navigator.userAgent, t = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"], n = !0, r = 0; r < t.length; r++)
              if (e.indexOf(t[r]) > 0) {
                  n = !1;
                  break
              } return n
      }
      e.RECALL_KEY = A, e.addComma = function(e) {
          return String(e).replace(/\B(?=(\d{3})+$)/g, ",")
      }, e.addZero = lt, e.basicStrategyMap = j, e.clearCacheRecallData = function() {
          sessionStorage.removeItem(A)
      }, e.customSessionStorage = bt, e.deflateData = P, e.easeInOutCubic = _t, e.encryptionMobile = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
          return e.substr(0, 3) + "****" + e.substr(7, 4)
      }, e.filterEmpty = function(e) {
          var t = {};
          for (var n in e) Et(e[n]) && (t[n] = e[n]);
          return t
      }, e.formatMobile = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
          return e.replace(/\s/g, "")
      }, e.formatterMobile = function(e) {
          if (e.length > 3 && e.length < 8) return xt(e, 3);
          if (e.length > 8) {
              var t = xt(e, 3);
              return xt(t, 8)
          }
          return e
      }, e.getBasicPolicyData = function(e) {
          var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
              n = mt(e);
          return {
              channelTranslate: n,
              basic: {
                  channel: e.tbbchannel || e.channel,
                  link: e.tbblink || e.link,
                  recallResource: L(t)
              },
              common: {
                  companyNo: e.tbbcompanyNo || e.companyNo,
                  channelNo: e.tbbchannelNo || e.channelNo,
                  channelSec: e.tbbchannelSec || e.channelSec,
                  productNo: e.tbbproductNo || e.productNo,
                  activityNo: e.tbbactivityNo || e.activityNo
              }
          }
      }, e.getBirthById = ut, e.getCacheRecallData = z, e.getChannelTranslate = mt, e.getGenderByIdCard = function(e) {
          var t = e ? e.match(/^\d{6}((?:19|20)\d{2})(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{2}(\d)[0-9X]$/) : null;
          return Number(t[4]) % 2 ? "1" : "2"
      }, e.getInfoById = function(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
              n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 28,
              r = Date.now() + dt * t,
              a = ct(r),
              o = i(a, 3),
              s = o[0],
              l = o[1],
              u = o[2],
              c = ct(r + dt * n),
              d = i(c, 3),
              f = d[0],
              h = d[1],
              p = d[2],
              m = -1;
          if (st(e)) {
              var v = ut(e),
                  g = v.year,
                  y = v.month,
                  b = v.day,
                  w = v.birthday,
                  _ = v.gender;
              return m = s - g, "".concat(f, "-").concat(h, "-").concat(p) < w ? m = -1 : (y > l || y === l && b > u) && (m -= 1), {
                  age: m,
                  birthday: w,
                  gender: _
              }
          }
          return {
              age: m
          }
      }, e.getJumpUrl = function(e) {
          var t = "sourceLink=".concat(e.link, "&name=").concat(e.applicant.applicantName, "&mobile=").concat(e.applicant.mobile, "&id=").concat(e.applicant.id, "&already=").concat(e.already, "&productNo=").concat(e.productNo || e.common.productNo, "&policyNo=").concat(e.policyNo),
              n = Object.keys(pt(e.locationParams)).map((function(t) {
                  return "".concat(t, "=").concat(e.locationParams[t])
              })).join("&"),
              r = "".concat(location.origin, "/").concat(e.data, "?fromUrl=").concat(encodeURIComponent(t), "&channelUrl=").concat(encodeURIComponent(n)),
              i = e.locationParams,
              a = i.dkey,
              o = i.trackParam,
              s = i.bxm_id,
              l = i.bc_tag;
          return a && (r = "".concat(r, "&dkey=").concat(a, "&extdkey=").concat(a)), o && (r = "".concat(r, "&trackParam=").concat(o, "&exttrackParam=").concat(o)), s && (r = "".concat(r, "&bxm_id=").concat(s, "&extbxm_id=").concat(s)), l && (r = "".concat(r, "&bc_tag=").concat(l, "&extbc_tag=").concat(l)), r
      }, e.getLocationParams = pt, e.getLocationSearch = rt, e.getNextDate = function() {
          var e = new Date;
          e.setMonth(e.getMonth() + 1), e.setDate(e.getDate() - 1);
          var t = e.getFullYear(),
              n = lt(e.getMonth() + 1),
              r = lt(e.getDate());
          return {
              date: e,
              year: t,
              month: n,
              day: r
          }
      }, e.getPaymentList = function(e, t) {
          return t ? Tt(e.year) : Ct(e.month)
      }, e.getPaymentListMonth = Ct, e.getPaymentListYear = Tt, e.getPrice = function(e, t, n) {
          var r = 1 === t ? 0 : 1,
              i = Object.keys(n).filter((function(t) {
                  var n = t.split("~");
                  return e >= n[0] && e <= n[1]
              }));
          return n[i[0]] && n[i[0]][r]
      }, e.getRand = function(e, t) {
          return Math.round(Math.random() * (t - e) + e)
      }, e.getScroll = wt, e.getSessionStorage = yt, e.getSumPremium = function(e, t) {
          return t ? e.year : 100 * e.month * 12 / 100
      }, e.getTradeType = function() {
          return Mt() ? "NATIVE" : It() ? "JSAPI" : "MWEB"
      }, e.getYMDByDate = ct, e.getZipData = $, e.getZipDataToServer = L, e.giftActivationGuaranteeCallback = function() {}, e.giftReceiveCallback = function() {
          try {
              "undefined" != typeof _ai_analysis && _ai_analysis()
          } catch (e) {
              console.log(e)
          }
      }, e.isArray = St, e.isClient = kt, e.isIdNumber = ot, e.isMobile = at, e.isName = ft, e.isNotEmpty = Et, e.isPc = Mt, e.isString = function(e) {
          return "string" == typeof e
      }, e.isValidIdNumber = st, e.isWeiXin = It, e.memoryList = D, e.parseJson = vt, e.parseLocationSearch = it, e.referCallback = function() {}, e.scrollTo = function(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = t.getContainer,
              r = void 0 === n ? function() {
                  return window
              } : n,
              i = t.duration,
              a = void 0 === i ? 450 : i,
              o = r(),
              s = wt(o, !0),
              l = Date.now(),
              u = function t() {
                  var n = Date.now() - l,
                      r = _t(n > a ? a : n, s, e, a);
                  o === window ? window.scrollTo(window.pageXOffset, r) : o.scrollTop = r, n < a && _(t)
              };
          _(u)
      }, e.setCacheRecallData = F, e.track = function(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              r = it(rt()),
              i = n({
                  link: r.link,
                  trackKey: e
              }, t);
          return nt.post("/track/save", i).then((function() {})).catch((function(e) {
              console.log(e)
          }))
      }, e.validate = function(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : j;
          return St(e) ? Y(e, t, n) : H(e, t, n)
      }, e.validateArr = Y, e.validateItem = B, e.validateMap = H, e.validateTest = U, e.zxStorageKey = gt, Object.defineProperty(e, "__esModule", {
          value: !0
      })
  }));