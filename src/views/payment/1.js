/*! jQuery v1.12.4 | (c) jQuery Foundation | jquery.org/license */ ! function (a, b) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
    if (!a.document) throw new Error("jQuery requires a window with a document");
    return b(a)
  } : b(a)
}("undefined" != typeof window ? window : this, function (a, b) {
  var c = [],
    d = a.document,
    e = c.slice,
    f = c.concat,
    g = c.push,
    h = c.indexOf,
    i = {},
    j = i.toString,
    k = i.hasOwnProperty,
    l = {},
    m = "1.12.4",
    n = function (a, b) {
      return new n.fn.init(a, b)
    },
    o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    p = /^-ms-/,
    q = /-([\da-z])/gi,
    r = function (a, b) {
      return b.toUpperCase()
    };
  n.fn = n.prototype = {
    jquery: m,
    constructor: n,
    selector: "",
    length: 0,
    toArray: function () {
      return e.call(this)
    },
    get: function (a) {
      return null != a ? 0 > a ? this[a + this.length] : this[a] : e.call(this)
    },
    pushStack: function (a) {
      var b = n.merge(this.constructor(), a);
      return b.prevObject = this, b.context = this.context, b
    },
    each: function (a) {
      return n.each(this, a)
    },
    map: function (a) {
      return this.pushStack(n.map(this, function (b, c) {
        return a.call(b, c, b)
      }))
    },
    slice: function () {
      return this.pushStack(e.apply(this, arguments))
    },
    first: function () {
      return this.eq(0)
    },
    last: function () {
      return this.eq(-1)
    },
    eq: function (a) {
      var b = this.length,
        c = +a + (0 > a ? b : 0);
      return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
    },
    end: function () {
      return this.prevObject || this.constructor()
    },
    push: g,
    sort: c.sort,
    splice: c.splice
  }, n.extend = n.fn.extend = function () {
    var a, b, c, d, e, f, g = arguments[0] || {},
      h = 1,
      i = arguments.length,
      j = !1;
    for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
      if (null != (e = arguments[h]))
        for (d in e) a = g[d], c = e[d], g !== c && (j && c && (n.isPlainObject(c) || (b = n.isArray(c))) ? (b ? (b = !1, f = a && n.isArray(a) ? a : []) : f = a && n.isPlainObject(a) ? a : {}, g[d] = n.extend(j, f, c)) : void 0 !== c && (g[d] = c));
    return g
  }, n.extend({
    expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function (a) {
      throw new Error(a)
    },
    noop: function () {},
    isFunction: function (a) {
      return "function" === n.type(a)
    },
    isArray: Array.isArray || function (a) {
      return "array" === n.type(a)
    },
    isWindow: function (a) {
      return null != a && a == a.window
    },
    isNumeric: function (a) {
      var b = a && a.toString();
      return !n.isArray(a) && b - parseFloat(b) + 1 >= 0
    },
    isEmptyObject: function (a) {
      var b;
      for (b in a) return !1;
      return !0
    },
    isPlainObject: function (a) {
      var b;
      if (!a || "object" !== n.type(a) || a.nodeType || n.isWindow(a)) return !1;
      try {
        if (a.constructor && !k.call(a, "constructor") && !k.call(a.constructor.prototype, "isPrototypeOf")) return !1
      } catch (c) {
        return !1
      }
      if (!l.ownFirst)
        for (b in a) return k.call(a, b);
      for (b in a);
      return void 0 === b || k.call(a, b)
    },
    type: function (a) {
      return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? i[j.call(a)] || "object" : typeof a
    },
    globalEval: function (b) {
      b && n.trim(b) && (a.execScript || function (b) {
        a.eval.call(a, b)
      })(b)
    },
    camelCase: function (a) {
      return a.replace(p, "ms-").replace(q, r)
    },
    nodeName: function (a, b) {
      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
    },
    each: function (a, b) {
      var c, d = 0;
      if (s(a)) {
        for (c = a.length; c > d; d++)
          if (b.call(a[d], d, a[d]) === !1) break
      } else
        for (d in a)
          if (b.call(a[d], d, a[d]) === !1) break;
      return a
    },
    trim: function (a) {
      return null == a ? "" : (a + "").replace(o, "")
    },
    makeArray: function (a, b) {
      var c = b || [];
      return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : g.call(c, a)), c
    },
    inArray: function (a, b, c) {
      var d;
      if (b) {
        if (h) return h.call(b, a, c);
        for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
          if (c in b && b[c] === a) return c
      }
      return -1
    },
    merge: function (a, b) {
      var c = +b.length,
        d = 0,
        e = a.length;
      while (c > d) a[e++] = b[d++];
      if (c !== c)
        while (void 0 !== b[d]) a[e++] = b[d++];
      return a.length = e, a
    },
    grep: function (a, b, c) {
      for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
      return e
    },
    map: function (a, b, c) {
      var d, e, g = 0,
        h = [];
      if (s(a))
        for (d = a.length; d > g; g++) e = b(a[g], g, c), null != e && h.push(e);
      else
        for (g in a) e = b(a[g], g, c), null != e && h.push(e);
      return f.apply([], h)
    },
    guid: 1,
    proxy: function (a, b) {
      var c, d, f;
      return "string" == typeof b && (f = a[b], b = a, a = f), n.isFunction(a) ? (c = e.call(arguments, 2), d = function () {
        return a.apply(b || this, c.concat(e.call(arguments)))
      }, d.guid = a.guid = a.guid || n.guid++, d) : void 0
    },
    now: function () {
      return +new Date
    },
    support: l
  }), "function" == typeof Symbol && (n.fn[Symbol.iterator] = c[Symbol.iterator]), n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) {
    i["[object " + b + "]"] = b.toLowerCase()
  });

  function s(a) {
    var b = !!a && "length" in a && a.length,
      c = n.type(a);
    return "function" === c || n.isWindow(a) ? !1 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
  }
  var t = function (a) {
    var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date,
      v = a.document,
      w = 0,
      x = 0,
      y = ga(),
      z = ga(),
      A = ga(),
      B = function (a, b) {
        return a === b && (l = !0), 0
      },
      C = 1 << 31,
      D = {}.hasOwnProperty,
      E = [],
      F = E.pop,
      G = E.push,
      H = E.push,
      I = E.slice,
      J = function (a, b) {
        for (var c = 0, d = a.length; d > c; c++)
          if (a[c] === b) return c;
        return -1
      },
      K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      L = "[\\x20\\t\\r\\n\\f]",
      M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      N = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + M + "))|)" + L + "*\\]",
      O = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + N + ")*)|.*)\\)|)",
      P = new RegExp(L + "+", "g"),
      Q = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
      R = new RegExp("^" + L + "*," + L + "*"),
      S = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
      T = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
      U = new RegExp(O),
      V = new RegExp("^" + M + "$"),
      W = {
        ID: new RegExp("^#(" + M + ")"),
        CLASS: new RegExp("^\\.(" + M + ")"),
        TAG: new RegExp("^(" + M + "|[*])"),
        ATTR: new RegExp("^" + N),
        PSEUDO: new RegExp("^" + O),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + K + ")$", "i"),
        needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
      },
      X = /^(?:input|select|textarea|button)$/i,
      Y = /^h\d$/i,
      Z = /^[^{]+\{\s*\[native \w/,
      $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      _ = /[+~]/,
      aa = /'|\\/g,
      ba = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
      ca = function (a, b, c) {
        var d = "0x" + b - 65536;
        return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
      },
      da = function () {
        m()
      };
    try {
      H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType
    } catch (ea) {
      H = {
        apply: E.length ? function (a, b) {
          G.apply(a, I.call(b))
        } : function (a, b) {
          var c = a.length,
            d = 0;
          while (a[c++] = b[d++]);
          a.length = c - 1
        }
      }
    }

    function fa(a, b, d, e) {
      var f, h, j, k, l, o, r, s, w = b && b.ownerDocument,
        x = b ? b.nodeType : 9;
      if (d = d || [], "string" != typeof a || !a || 1 !== x && 9 !== x && 11 !== x) return d;
      if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
        if (11 !== x && (o = $.exec(a)))
          if (f = o[1]) {
            if (9 === x) {
              if (!(j = b.getElementById(f))) return d;
              if (j.id === f) return d.push(j), d
            } else if (w && (j = w.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), d
          } else {
            if (o[2]) return H.apply(d, b.getElementsByTagName(a)), d;
            if ((f = o[3]) && c.getElementsByClassName && b.getElementsByClassName) return H.apply(d, b.getElementsByClassName(f)), d
          } if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
          if (1 !== x) w = b, s = a;
          else if ("object" !== b.nodeName.toLowerCase()) {
            (k = b.getAttribute("id")) ? k = k.replace(aa, "\\$&"): b.setAttribute("id", k = u), r = g(a), h = r.length, l = V.test(k) ? "#" + k : "[id='" + k + "']";
            while (h--) r[h] = l + " " + qa(r[h]);
            s = r.join(","), w = _.test(a) && oa(b.parentNode) || b
          }
          if (s) try {
            return H.apply(d, w.querySelectorAll(s)), d
          } catch (y) {} finally {
            k === u && b.removeAttribute("id")
          }
        }
      }
      return i(a.replace(Q, "$1"), b, d, e)
    }

    function ga() {
      var a = [];

      function b(c, e) {
        return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
      }
      return b
    }

    function ha(a) {
      return a[u] = !0, a
    }

    function ia(a) {
      var b = n.createElement("div");
      try {
        return !!a(b)
      } catch (c) {
        return !1
      } finally {
        b.parentNode && b.parentNode.removeChild(b), b = null
      }
    }

    function ja(a, b) {
      var c = a.split("|"),
        e = c.length;
      while (e--) d.attrHandle[c[e]] = b
    }

    function ka(a, b) {
      var c = b && a,
        d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
      if (d) return d;
      if (c)
        while (c = c.nextSibling)
          if (c === b) return -1;
      return a ? 1 : -1
    }

    function la(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return "input" === c && b.type === a
      }
    }

    function ma(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return ("input" === c || "button" === c) && b.type === a
      }
    }

    function na(a) {
      return ha(function (b) {
        return b = +b, ha(function (c, d) {
          var e, f = a([], c.length, b),
            g = f.length;
          while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
        })
      })
    }

    function oa(a) {
      return a && "undefined" != typeof a.getElementsByTagName && a
    }
    c = fa.support = {}, f = fa.isXML = function (a) {
      var b = a && (a.ownerDocument || a).documentElement;
      return b ? "HTML" !== b.nodeName : !1
    }, m = fa.setDocument = function (a) {
      var b, e, g = a ? a.ownerDocument || a : v;
      return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, p = !f(n), (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), c.attributes = ia(function (a) {
        return a.className = "i", !a.getAttribute("className")
      }), c.getElementsByTagName = ia(function (a) {
        return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length
      }), c.getElementsByClassName = Z.test(n.getElementsByClassName), c.getById = ia(function (a) {
        return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length
      }), c.getById ? (d.find.ID = function (a, b) {
        if ("undefined" != typeof b.getElementById && p) {
          var c = b.getElementById(a);
          return c ? [c] : []
        }
      }, d.filter.ID = function (a) {
        var b = a.replace(ba, ca);
        return function (a) {
          return a.getAttribute("id") === b
        }
      }) : (delete d.find.ID, d.filter.ID = function (a) {
        var b = a.replace(ba, ca);
        return function (a) {
          var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
          return c && c.value === b
        }
      }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0
      } : function (a, b) {
        var c, d = [],
          e = 0,
          f = b.getElementsByTagName(a);
        if ("*" === a) {
          while (c = f[e++]) 1 === c.nodeType && d.push(c);
          return d
        }
        return f
      }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
        return "undefined" != typeof b.getElementsByClassName && p ? b.getElementsByClassName(a) : void 0
      }, r = [], q = [], (c.qsa = Z.test(n.querySelectorAll)) && (ia(function (a) {
        o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
      }), ia(function (a) {
        var b = n.createElement("input");
        b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
      })), (c.matchesSelector = Z.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ia(function (a) {
        c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", O)
      }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = Z.test(o.compareDocumentPosition), t = b || Z.test(o.contains) ? function (a, b) {
        var c = 9 === a.nodeType ? a.documentElement : a,
          d = b && b.parentNode;
        return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
      } : function (a, b) {
        if (b)
          while (b = b.parentNode)
            if (b === a) return !0;
        return !1
      }, B = b ? function (a, b) {
        if (a === b) return l = !0, 0;
        var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
        return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1)
      } : function (a, b) {
        if (a === b) return l = !0, 0;
        var c, d = 0,
          e = a.parentNode,
          f = b.parentNode,
          g = [a],
          h = [b];
        if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
        if (e === f) return ka(a, b);
        c = a;
        while (c = c.parentNode) g.unshift(c);
        c = b;
        while (c = c.parentNode) h.unshift(c);
        while (g[d] === h[d]) d++;
        return d ? ka(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0
      }, n) : n
    }, fa.matches = function (a, b) {
      return fa(a, null, null, b)
    }, fa.matchesSelector = function (a, b) {
      if ((a.ownerDocument || a) !== n && m(a), b = b.replace(T, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try {
        var d = s.call(a, b);
        if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
      } catch (e) {}
      return fa(b, n, null, [a]).length > 0
    }, fa.contains = function (a, b) {
      return (a.ownerDocument || a) !== n && m(a), t(a, b)
    }, fa.attr = function (a, b) {
      (a.ownerDocument || a) !== n && m(a);
      var e = d.attrHandle[b.toLowerCase()],
        f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
      return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
    }, fa.error = function (a) {
      throw new Error("Syntax error, unrecognized expression: " + a)
    }, fa.uniqueSort = function (a) {
      var b, d = [],
        e = 0,
        f = 0;
      if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
        while (b = a[f++]) b === a[f] && (e = d.push(f));
        while (e--) a.splice(d[e], 1)
      }
      return k = null, a
    }, e = fa.getText = function (a) {
      var b, c = "",
        d = 0,
        f = a.nodeType;
      if (f) {
        if (1 === f || 9 === f || 11 === f) {
          if ("string" == typeof a.textContent) return a.textContent;
          for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
        } else if (3 === f || 4 === f) return a.nodeValue
      } else
        while (b = a[d++]) c += e(b);
      return c
    }, d = fa.selectors = {
      cacheLength: 50,
      createPseudo: ha,
      match: W,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function (a) {
          return a[1] = a[1].replace(ba, ca), a[3] = (a[3] || a[4] || a[5] || "").replace(ba, ca), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
        },
        CHILD: function (a) {
          return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || fa.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && fa.error(a[0]), a
        },
        PSEUDO: function (a) {
          var b, c = !a[6] && a[2];
          return W.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && U.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
        }
      },
      filter: {
        TAG: function (a) {
          var b = a.replace(ba, ca).toLowerCase();
          return "*" === a ? function () {
            return !0
          } : function (a) {
            return a.nodeName && a.nodeName.toLowerCase() === b
          }
        },
        CLASS: function (a) {
          var b = y[a + " "];
          return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function (a) {
            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
          })
        },
        ATTR: function (a, b, c) {
          return function (d) {
            var e = fa.attr(d, a);
            return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(P, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
          }
        },
        CHILD: function (a, b, c, d, e) {
          var f = "nth" !== a.slice(0, 3),
            g = "last" !== a.slice(-4),
            h = "of-type" === b;
          return 1 === d && 0 === e ? function (a) {
            return !!a.parentNode
          } : function (b, c, i) {
            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
              q = b.parentNode,
              r = h && b.nodeName.toLowerCase(),
              s = !i && !h,
              t = !1;
            if (q) {
              if (f) {
                while (p) {
                  m = b;
                  while (m = m[p])
                    if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                  o = p = "only" === a && !o && "nextSibling"
                }
                return !0
              }
              if (o = [g ? q.firstChild : q.lastChild], g && s) {
                m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n];
                while (m = ++n && m && m[p] || (t = n = 0) || o.pop())
                  if (1 === m.nodeType && ++t && m === b) {
                    k[a] = [w, n, t];
                    break
                  }
              } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1)
                while (m = ++n && m && m[p] || (t = n = 0) || o.pop())
                  if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [w, t]), m === b)) break;
              return t -= e, t === d || t % d === 0 && t / d >= 0
            }
          }
        },
        PSEUDO: function (a, b) {
          var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fa.error("unsupported pseudo: " + a);
          return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ha(function (a, c) {
            var d, f = e(a, b),
              g = f.length;
            while (g--) d = J(a, f[g]), a[d] = !(c[d] = f[g])
          }) : function (a) {
            return e(a, 0, c)
          }) : e
        }
      },
      pseudos: {
        not: ha(function (a) {
          var b = [],
            c = [],
            d = h(a.replace(Q, "$1"));
          return d[u] ? ha(function (a, b, c, e) {
            var f, g = d(a, null, e, []),
              h = a.length;
            while (h--)(f = g[h]) && (a[h] = !(b[h] = f))
          }) : function (a, e, f) {
            return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop()
          }
        }),
        has: ha(function (a) {
          return function (b) {
            return fa(a, b).length > 0
          }
        }),
        contains: ha(function (a) {
          return a = a.replace(ba, ca),
            function (b) {
              return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
            }
        }),
        lang: ha(function (a) {
          return V.test(a || "") || fa.error("unsupported lang: " + a), a = a.replace(ba, ca).toLowerCase(),
            function (b) {
              var c;
              do
                if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
              return !1
            }
        }),
        target: function (b) {
          var c = a.location && a.location.hash;
          return c && c.slice(1) === b.id
        },
        root: function (a) {
          return a === o
        },
        focus: function (a) {
          return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
        },
        enabled: function (a) {
          return a.disabled === !1
        },
        disabled: function (a) {
          return a.disabled === !0
        },
        checked: function (a) {
          var b = a.nodeName.toLowerCase();
          return "input" === b && !!a.checked || "option" === b && !!a.selected
        },
        selected: function (a) {
          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
        },
        empty: function (a) {
          for (a = a.firstChild; a; a = a.nextSibling)
            if (a.nodeType < 6) return !1;
          return !0
        },
        parent: function (a) {
          return !d.pseudos.empty(a)
        },
        header: function (a) {
          return Y.test(a.nodeName)
        },
        input: function (a) {
          return X.test(a.nodeName)
        },
        button: function (a) {
          var b = a.nodeName.toLowerCase();
          return "input" === b && "button" === a.type || "button" === b
        },
        text: function (a) {
          var b;
          return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
        },
        first: na(function () {
          return [0]
        }),
        last: na(function (a, b) {
          return [b - 1]
        }),
        eq: na(function (a, b, c) {
          return [0 > c ? c + b : c]
        }),
        even: na(function (a, b) {
          for (var c = 0; b > c; c += 2) a.push(c);
          return a
        }),
        odd: na(function (a, b) {
          for (var c = 1; b > c; c += 2) a.push(c);
          return a
        }),
        lt: na(function (a, b, c) {
          for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
          return a
        }),
        gt: na(function (a, b, c) {
          for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
          return a
        })
      }
    }, d.pseudos.nth = d.pseudos.eq;
    for (b in {
        radio: !0,
        checkbox: !0,
        file: !0,
        password: !0,
        image: !0
      }) d.pseudos[b] = la(b);
    for (b in {
        submit: !0,
        reset: !0
      }) d.pseudos[b] = ma(b);

    function pa() {}
    pa.prototype = d.filters = d.pseudos, d.setFilters = new pa, g = fa.tokenize = function (a, b) {
      var c, e, f, g, h, i, j, k = z[a + " "];
      if (k) return b ? 0 : k.slice(0);
      h = a, i = [], j = d.preFilter;
      while (h) {
        c && !(e = R.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = S.exec(h)) && (c = e.shift(), f.push({
          value: c,
          type: e[0].replace(Q, " ")
        }), h = h.slice(c.length));
        for (g in d.filter) !(e = W[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
          value: c,
          type: g,
          matches: e
        }), h = h.slice(c.length));
        if (!c) break
      }
      return b ? h.length : h ? fa.error(a) : z(a, i).slice(0)
    };

    function qa(a) {
      for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
      return d
    }

    function ra(a, b, c) {
      var d = b.dir,
        e = c && "parentNode" === d,
        f = x++;
      return b.first ? function (b, c, f) {
        while (b = b[d])
          if (1 === b.nodeType || e) return a(b, c, f)
      } : function (b, c, g) {
        var h, i, j, k = [w, f];
        if (g) {
          while (b = b[d])
            if ((1 === b.nodeType || e) && a(b, c, g)) return !0
        } else
          while (b = b[d])
            if (1 === b.nodeType || e) {
              if (j = b[u] || (b[u] = {}), i = j[b.uniqueID] || (j[b.uniqueID] = {}), (h = i[d]) && h[0] === w && h[1] === f) return k[2] = h[2];
              if (i[d] = k, k[2] = a(b, c, g)) return !0
            }
      }
    }

    function sa(a) {
      return a.length > 1 ? function (b, c, d) {
        var e = a.length;
        while (e--)
          if (!a[e](b, c, d)) return !1;
        return !0
      } : a[0]
    }

    function ta(a, b, c) {
      for (var d = 0, e = b.length; e > d; d++) fa(a, b[d], c);
      return c
    }

    function ua(a, b, c, d, e) {
      for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
      return g
    }

    function va(a, b, c, d, e, f) {
      return d && !d[u] && (d = va(d)), e && !e[u] && (e = va(e, f)), ha(function (f, g, h, i) {
        var j, k, l, m = [],
          n = [],
          o = g.length,
          p = f || ta(b || "*", h.nodeType ? [h] : h, []),
          q = !a || !f && b ? p : ua(p, m, a, h, i),
          r = c ? e || (f ? a : o || d) ? [] : g : q;
        if (c && c(q, r, h, i), d) {
          j = ua(r, n), d(j, [], h, i), k = j.length;
          while (k--)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
        }
        if (f) {
          if (e || a) {
            if (e) {
              j = [], k = r.length;
              while (k--)(l = r[k]) && j.push(q[k] = l);
              e(null, r = [], j, i)
            }
            k = r.length;
            while (k--)(l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
          }
        } else r = ua(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r)
      })
    }

    function wa(a) {
      for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ra(function (a) {
          return a === b
        }, h, !0), l = ra(function (a) {
          return J(b, a) > -1
        }, h, !0), m = [function (a, c, d) {
          var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
          return b = null, e
        }]; f > i; i++)
        if (c = d.relative[a[i].type]) m = [ra(sa(m), c)];
        else {
          if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
            for (e = ++i; f > e; e++)
              if (d.relative[a[e].type]) break;
            return va(i > 1 && sa(m), i > 1 && qa(a.slice(0, i - 1).concat({
              value: " " === a[i - 2].type ? "*" : ""
            })).replace(Q, "$1"), c, e > i && wa(a.slice(i, e)), f > e && wa(a = a.slice(e)), f > e && qa(a))
          }
          m.push(c)
        } return sa(m)
    }

    function xa(a, b) {
      var c = b.length > 0,
        e = a.length > 0,
        f = function (f, g, h, i, k) {
          var l, o, q, r = 0,
            s = "0",
            t = f && [],
            u = [],
            v = j,
            x = f || e && d.find.TAG("*", k),
            y = w += null == v ? 1 : Math.random() || .1,
            z = x.length;
          for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
            if (e && l) {
              o = 0, g || l.ownerDocument === n || (m(l), h = !p);
              while (q = a[o++])
                if (q(l, g || n, h)) {
                  i.push(l);
                  break
                } k && (w = y)
            }
            c && ((l = !q && l) && r--, f && t.push(l))
          }
          if (r += s, c && s !== r) {
            o = 0;
            while (q = b[o++]) q(t, u, g, h);
            if (f) {
              if (r > 0)
                while (s--) t[s] || u[s] || (u[s] = F.call(i));
              u = ua(u)
            }
            H.apply(i, u), k && !f && u.length > 0 && r + b.length > 1 && fa.uniqueSort(i)
          }
          return k && (w = y, j = v), t
        };
      return c ? ha(f) : f
    }
    return h = fa.compile = function (a, b) {
      var c, d = [],
        e = [],
        f = A[a + " "];
      if (!f) {
        b || (b = g(a)), c = b.length;
        while (c--) f = wa(b[c]), f[u] ? d.push(f) : e.push(f);
        f = A(a, xa(e, d)), f.selector = a
      }
      return f
    }, i = fa.select = function (a, b, e, f) {
      var i, j, k, l, m, n = "function" == typeof a && a,
        o = !f && g(a = n.selector || a);
      if (e = e || [], 1 === o.length) {
        if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
          if (b = (d.find.ID(k.matches[0].replace(ba, ca), b) || [])[0], !b) return e;
          n && (b = b.parentNode), a = a.slice(j.shift().value.length)
        }
        i = W.needsContext.test(a) ? 0 : j.length;
        while (i--) {
          if (k = j[i], d.relative[l = k.type]) break;
          if ((m = d.find[l]) && (f = m(k.matches[0].replace(ba, ca), _.test(j[0].type) && oa(b.parentNode) || b))) {
            if (j.splice(i, 1), a = f.length && qa(j), !a) return H.apply(e, f), e;
            break
          }
        }
      }
      return (n || h(a, o))(f, b, !p, e, !b || _.test(a) && oa(b.parentNode) || b), e
    }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ia(function (a) {
      return 1 & a.compareDocumentPosition(n.createElement("div"))
    }), ia(function (a) {
      return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
    }) || ja("type|href|height|width", function (a, b, c) {
      return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
    }), c.attributes && ia(function (a) {
      return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
    }) || ja("value", function (a, b, c) {
      return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
    }), ia(function (a) {
      return null == a.getAttribute("disabled")
    }) || ja(K, function (a, b, c) {
      var d;
      return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
    }), fa
  }(a);
  n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.uniqueSort = n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
  var u = function (a, b, c) {
      var d = [],
        e = void 0 !== c;
      while ((a = a[b]) && 9 !== a.nodeType)
        if (1 === a.nodeType) {
          if (e && n(a).is(c)) break;
          d.push(a)
        } return d
    },
    v = function (a, b) {
      for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
      return c
    },
    w = n.expr.match.needsContext,
    x = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
    y = /^.[^:#\[\.,]*$/;

  function z(a, b, c) {
    if (n.isFunction(b)) return n.grep(a, function (a, d) {
      return !!b.call(a, d, a) !== c
    });
    if (b.nodeType) return n.grep(a, function (a) {
      return a === b !== c
    });
    if ("string" == typeof b) {
      if (y.test(b)) return n.filter(b, a, c);
      b = n.filter(b, a)
    }
    return n.grep(a, function (a) {
      return n.inArray(a, b) > -1 !== c
    })
  }
  n.filter = function (a, b, c) {
    var d = b[0];
    return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function (a) {
      return 1 === a.nodeType
    }))
  }, n.fn.extend({
    find: function (a) {
      var b, c = [],
        d = this,
        e = d.length;
      if ("string" != typeof a) return this.pushStack(n(a).filter(function () {
        for (b = 0; e > b; b++)
          if (n.contains(d[b], this)) return !0
      }));
      for (b = 0; e > b; b++) n.find(a, d[b], c);
      return c = this.pushStack(e > 1 ? n.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
    },
    filter: function (a) {
      return this.pushStack(z(this, a || [], !1))
    },
    not: function (a) {
      return this.pushStack(z(this, a || [], !0))
    },
    is: function (a) {
      return !!z(this, "string" == typeof a && w.test(a) ? n(a) : a || [], !1).length
    }
  });
  var A, B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    C = n.fn.init = function (a, b, c) {
      var e, f;
      if (!a) return this;
      if (c = c || A, "string" == typeof a) {
        if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : B.exec(a), !e || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
        if (e[1]) {
          if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), x.test(e[1]) && n.isPlainObject(b))
            for (e in b) n.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
          return this
        }
        if (f = d.getElementById(e[2]), f && f.parentNode) {
          if (f.id !== e[2]) return A.find(a);
          this.length = 1, this[0] = f
        }
        return this.context = d, this.selector = a, this
      }
      return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? "undefined" != typeof c.ready ? c.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this))
    };
  C.prototype = n.fn, A = n(d);
  var D = /^(?:parents|prev(?:Until|All))/,
    E = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  n.fn.extend({
    has: function (a) {
      var b, c = n(a, this),
        d = c.length;
      return this.filter(function () {
        for (b = 0; d > b; b++)
          if (n.contains(this, c[b])) return !0
      })
    },
    closest: function (a, b) {
      for (var c, d = 0, e = this.length, f = [], g = w.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++)
        for (c = this[d]; c && c !== b; c = c.parentNode)
          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
            f.push(c);
            break
          } return this.pushStack(f.length > 1 ? n.uniqueSort(f) : f)
    },
    index: function (a) {
      return a ? "string" == typeof a ? n.inArray(this[0], n(a)) : n.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function (a, b) {
      return this.pushStack(n.uniqueSort(n.merge(this.get(), n(a, b))))
    },
    addBack: function (a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
    }
  });

  function F(a, b) {
    do a = a[b]; while (a && 1 !== a.nodeType);
    return a
  }
  n.each({
    parent: function (a) {
      var b = a.parentNode;
      return b && 11 !== b.nodeType ? b : null
    },
    parents: function (a) {
      return u(a, "parentNode")
    },
    parentsUntil: function (a, b, c) {
      return u(a, "parentNode", c)
    },
    next: function (a) {
      return F(a, "nextSibling")
    },
    prev: function (a) {
      return F(a, "previousSibling")
    },
    nextAll: function (a) {
      return u(a, "nextSibling")
    },
    prevAll: function (a) {
      return u(a, "previousSibling")
    },
    nextUntil: function (a, b, c) {
      return u(a, "nextSibling", c)
    },
    prevUntil: function (a, b, c) {
      return u(a, "previousSibling", c)
    },
    siblings: function (a) {
      return v((a.parentNode || {}).firstChild, a)
    },
    children: function (a) {
      return v(a.firstChild)
    },
    contents: function (a) {
      return n.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : n.merge([], a.childNodes)
    }
  }, function (a, b) {
    n.fn[a] = function (c, d) {
      var e = n.map(this, b, c);
      return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), this.length > 1 && (E[a] || (e = n.uniqueSort(e)), D.test(a) && (e = e.reverse())), this.pushStack(e)
    }
  });
  var G = /\S+/g;

  function H(a) {
    var b = {};
    return n.each(a.match(G) || [], function (a, c) {
      b[c] = !0
    }), b
  }
  n.Callbacks = function (a) {
    a = "string" == typeof a ? H(a) : n.extend({}, a);
    var b, c, d, e, f = [],
      g = [],
      h = -1,
      i = function () {
        for (e = a.once, d = b = !0; g.length; h = -1) {
          c = g.shift();
          while (++h < f.length) f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1)
        }
        a.memory || (c = !1), b = !1, e && (f = c ? [] : "")
      },
      j = {
        add: function () {
          return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
            n.each(b, function (b, c) {
              n.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== n.type(c) && d(c)
            })
          }(arguments), c && !b && i()), this
        },
        remove: function () {
          return n.each(arguments, function (a, b) {
            var c;
            while ((c = n.inArray(b, f, c)) > -1) f.splice(c, 1), h >= c && h--
          }), this
        },
        has: function (a) {
          return a ? n.inArray(a, f) > -1 : f.length > 0
        },
        empty: function () {
          return f && (f = []), this
        },
        disable: function () {
          return e = g = [], f = c = "", this
        },
        disabled: function () {
          return !f
        },
        lock: function () {
          return e = !0, c || j.disable(), this
        },
        locked: function () {
          return !!e
        },
        fireWith: function (a, c) {
          return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this
        },
        fire: function () {
          return j.fireWith(this, arguments), this
        },
        fired: function () {
          return !!d
        }
      };
    return j
  }, n.extend({
    Deferred: function (a) {
      var b = [
          ["resolve", "done", n.Callbacks("once memory"), "resolved"],
          ["reject", "fail", n.Callbacks("once memory"), "rejected"],
          ["notify", "progress", n.Callbacks("memory")]
        ],
        c = "pending",
        d = {
          state: function () {
            return c
          },
          always: function () {
            return e.done(arguments).fail(arguments), this
          },
          then: function () {
            var a = arguments;
            return n.Deferred(function (c) {
              n.each(b, function (b, f) {
                var g = n.isFunction(a[b]) && a[b];
                e[f[1]](function () {
                  var a = g && g.apply(this, arguments);
                  a && n.isFunction(a.promise) ? a.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                })
              }), a = null
            }).promise()
          },
          promise: function (a) {
            return null != a ? n.extend(a, d) : d
          }
        },
        e = {};
      return d.pipe = d.then, n.each(b, function (a, f) {
        var g = f[2],
          h = f[3];
        d[f[1]] = g.add, h && g.add(function () {
          c = h
        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
          return e[f[0] + "With"](this === e ? d : this, arguments), this
        }, e[f[0] + "With"] = g.fireWith
      }), d.promise(e), a && a.call(e, e), e
    },
    when: function (a) {
      var b = 0,
        c = e.call(arguments),
        d = c.length,
        f = 1 !== d || a && n.isFunction(a.promise) ? d : 0,
        g = 1 === f ? a : n.Deferred(),
        h = function (a, b, c) {
          return function (d) {
            b[a] = this, c[a] = arguments.length > 1 ? e.call(arguments) : d, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
          }
        },
        i, j, k;
      if (d > 1)
        for (i = new Array(d), j = new Array(d), k = new Array(d); d > b; b++) c[b] && n.isFunction(c[b].promise) ? c[b].promise().progress(h(b, j, i)).done(h(b, k, c)).fail(g.reject) : --f;
      return f || g.resolveWith(k, c), g.promise()
    }
  });
  var I;
  n.fn.ready = function (a) {
    return n.ready.promise().done(a), this
  }, n.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function (a) {
      a ? n.readyWait++ : n.ready(!0)
    },
    ready: function (a) {
      (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (I.resolveWith(d, [n]), n.fn.triggerHandler && (n(d).triggerHandler("ready"), n(d).off("ready"))))
    }
  });

  function J() {
    d.addEventListener ? (d.removeEventListener("DOMContentLoaded", K), a.removeEventListener("load", K)) : (d.detachEvent("onreadystatechange", K), a.detachEvent("onload", K))
  }

  function K() {
    (d.addEventListener || "load" === a.event.type || "complete" === d.readyState) && (J(), n.ready())
  }
  n.ready.promise = function (b) {
    if (!I)
      if (I = n.Deferred(), "complete" === d.readyState || "loading" !== d.readyState && !d.documentElement.doScroll) a.setTimeout(n.ready);
      else if (d.addEventListener) d.addEventListener("DOMContentLoaded", K), a.addEventListener("load", K);
    else {
      d.attachEvent("onreadystatechange", K), a.attachEvent("onload", K);
      var c = !1;
      try {
        c = null == a.frameElement && d.documentElement
      } catch (e) {}
      c && c.doScroll && ! function f() {
        if (!n.isReady) {
          try {
            c.doScroll("left")
          } catch (b) {
            return a.setTimeout(f, 50)
          }
          J(), n.ready()
        }
      }()
    }
    return I.promise(b)
  }, n.ready.promise();
  var L;
  for (L in n(l)) break;
  l.ownFirst = "0" === L, l.inlineBlockNeedsLayout = !1, n(function () {
      var a, b, c, e;
      c = d.getElementsByTagName("body")[0], c && c.style && (b = d.createElement("div"), e = d.createElement("div"), e.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(e).appendChild(b), "undefined" != typeof b.style.zoom && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", l.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(e))
    }),
    function () {
      var a = d.createElement("div");
      l.deleteExpando = !0;
      try {
        delete a.test
      } catch (b) {
        l.deleteExpando = !1
      }
      a = null
    }();
  var M = function (a) {
      var b = n.noData[(a.nodeName + " ").toLowerCase()],
        c = +a.nodeType || 1;
      return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
    },
    N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    O = /([A-Z])/g;

  function P(a, b, c) {
    if (void 0 === c && 1 === a.nodeType) {
      var d = "data-" + b.replace(O, "-$1").toLowerCase();
      if (c = a.getAttribute(d), "string" == typeof c) {
        try {
          c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : N.test(c) ? n.parseJSON(c) : c
        } catch (e) {}
        n.data(a, b, c)
      } else c = void 0;
    }
    return c
  }

  function Q(a) {
    var b;
    for (b in a)
      if (("data" !== b || !n.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
    return !0
  }

  function R(a, b, d, e) {
    if (M(a)) {
      var f, g, h = n.expando,
        i = a.nodeType,
        j = i ? n.cache : a,
        k = i ? a[h] : a[h] && h;
      if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b) return k || (k = i ? a[h] = c.pop() || n.guid++ : h), j[k] || (j[k] = i ? {} : {
        toJSON: n.noop
      }), "object" != typeof b && "function" != typeof b || (e ? j[k] = n.extend(j[k], b) : j[k].data = n.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[n.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[n.camelCase(b)])) : f = g, f
    }
  }

  function S(a, b, c) {
    if (M(a)) {
      var d, e, f = a.nodeType,
        g = f ? n.cache : a,
        h = f ? a[n.expando] : n.expando;
      if (g[h]) {
        if (b && (d = c ? g[h] : g[h].data)) {
          n.isArray(b) ? b = b.concat(n.map(b, n.camelCase)) : b in d ? b = [b] : (b = n.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
          while (e--) delete d[b[e]];
          if (c ? !Q(d) : !n.isEmptyObject(d)) return
        }(c || (delete g[h].data, Q(g[h]))) && (f ? n.cleanData([a], !0) : l.deleteExpando || g != g.window ? delete g[h] : g[h] = void 0)
      }
    }
  }
  n.extend({
      cache: {},
      noData: {
        "applet ": !0,
        "embed ": !0,
        "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
      },
      hasData: function (a) {
        return a = a.nodeType ? n.cache[a[n.expando]] : a[n.expando], !!a && !Q(a)
      },
      data: function (a, b, c) {
        return R(a, b, c)
      },
      removeData: function (a, b) {
        return S(a, b)
      },
      _data: function (a, b, c) {
        return R(a, b, c, !0)
      },
      _removeData: function (a, b) {
        return S(a, b, !0)
      }
    }), n.fn.extend({
      data: function (a, b) {
        var c, d, e, f = this[0],
          g = f && f.attributes;
        if (void 0 === a) {
          if (this.length && (e = n.data(f), 1 === f.nodeType && !n._data(f, "parsedAttrs"))) {
            c = g.length;
            while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), P(f, d, e[d])));
            n._data(f, "parsedAttrs", !0)
          }
          return e
        }
        return "object" == typeof a ? this.each(function () {
          n.data(this, a)
        }) : arguments.length > 1 ? this.each(function () {
          n.data(this, a, b)
        }) : f ? P(f, a, n.data(f, a)) : void 0
      },
      removeData: function (a) {
        return this.each(function () {
          n.removeData(this, a)
        })
      }
    }), n.extend({
      queue: function (a, b, c) {
        var d;
        return a ? (b = (b || "fx") + "queue", d = n._data(a, b), c && (!d || n.isArray(c) ? d = n._data(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0
      },
      dequeue: function (a, b) {
        b = b || "fx";
        var c = n.queue(a, b),
          d = c.length,
          e = c.shift(),
          f = n._queueHooks(a, b),
          g = function () {
            n.dequeue(a, b)
          };
        "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
      },
      _queueHooks: function (a, b) {
        var c = b + "queueHooks";
        return n._data(a, c) || n._data(a, c, {
          empty: n.Callbacks("once memory").add(function () {
            n._removeData(a, b + "queue"), n._removeData(a, c)
          })
        })
      }
    }), n.fn.extend({
      queue: function (a, b) {
        var c = 2;
        return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function () {
          var c = n.queue(this, a, b);
          n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a)
        })
      },
      dequeue: function (a) {
        return this.each(function () {
          n.dequeue(this, a)
        })
      },
      clearQueue: function (a) {
        return this.queue(a || "fx", [])
      },
      promise: function (a, b) {
        var c, d = 1,
          e = n.Deferred(),
          f = this,
          g = this.length,
          h = function () {
            --d || e.resolveWith(f, [f])
          };
        "string" != typeof a && (b = a, a = void 0), a = a || "fx";
        while (g--) c = n._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
        return h(), e.promise(b)
      }
    }),
    function () {
      var a;
      l.shrinkWrapBlocks = function () {
        if (null != a) return a;
        a = !1;
        var b, c, e;
        return c = d.getElementsByTagName("body")[0], c && c.style ? (b = d.createElement("div"), e = d.createElement("div"), e.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(e).appendChild(b), "undefined" != typeof b.style.zoom && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(d.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(e), a) : void 0
      }
    }();
  var T = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    U = new RegExp("^(?:([+-])=|)(" + T + ")([a-z%]*)$", "i"),
    V = ["Top", "Right", "Bottom", "Left"],
    W = function (a, b) {
      return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a)
    };

  function X(a, b, c, d) {
    var e, f = 1,
      g = 20,
      h = d ? function () {
        return d.cur()
      } : function () {
        return n.css(a, b, "")
      },
      i = h(),
      j = c && c[3] || (n.cssNumber[b] ? "" : "px"),
      k = (n.cssNumber[b] || "px" !== j && +i) && U.exec(n.css(a, b));
    if (k && k[3] !== j) {
      j = j || k[3], c = c || [], k = +i || 1;
      do f = f || ".5", k /= f, n.style(a, b, k + j); while (f !== (f = h() / i) && 1 !== f && --g)
    }
    return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e
  }
  var Y = function (a, b, c, d, e, f, g) {
      var h = 0,
        i = a.length,
        j = null == c;
      if ("object" === n.type(c)) {
        e = !0;
        for (h in c) Y(a, b, h, c[h], !0, f, g)
      } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
          return j.call(n(a), c)
        })), b))
        for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
      return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    },
    Z = /^(?:checkbox|radio)$/i,
    $ = /<([\w:-]+)/,
    _ = /^$|\/(?:java|ecma)script/i,
    aa = /^\s+/,
    ba = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";

  function ca(a) {
    var b = ba.split("|"),
      c = a.createDocumentFragment();
    if (c.createElement)
      while (b.length) c.createElement(b.pop());
    return c
  }! function () {
    var a = d.createElement("div"),
      b = d.createDocumentFragment(),
      c = d.createElement("input");
    a.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", l.leadingWhitespace = 3 === a.firstChild.nodeType, l.tbody = !a.getElementsByTagName("tbody").length, l.htmlSerialize = !!a.getElementsByTagName("link").length, l.html5Clone = "<:nav></:nav>" !== d.createElement("nav").cloneNode(!0).outerHTML, c.type = "checkbox", c.checked = !0, b.appendChild(c), l.appendChecked = c.checked, a.innerHTML = "<textarea>x</textarea>", l.noCloneChecked = !!a.cloneNode(!0).lastChild.defaultValue, b.appendChild(a), c = d.createElement("input"), c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), a.appendChild(c), l.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, l.noCloneEvent = !!a.addEventListener, a[n.expando] = 1, l.attributes = !a.getAttribute(n.expando)
  }();
  var da = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    legend: [1, "<fieldset>", "</fieldset>"],
    area: [1, "<map>", "</map>"],
    param: [1, "<object>", "</object>"],
    thead: [1, "<table>", "</table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: l.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
  };
  da.optgroup = da.option, da.tbody = da.tfoot = da.colgroup = da.caption = da.thead, da.th = da.td;

  function ea(a, b) {
    var c, d, e = 0,
      f = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : void 0;
    if (!f)
      for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || n.nodeName(d, b) ? f.push(d) : n.merge(f, ea(d, b));
    return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], f) : f
  }

  function fa(a, b) {
    for (var c, d = 0; null != (c = a[d]); d++) n._data(c, "globalEval", !b || n._data(b[d], "globalEval"))
  }
  var ga = /<|&#?\w+;/,
    ha = /<tbody/i;

  function ia(a) {
    Z.test(a.type) && (a.defaultChecked = a.checked)
  }

  function ja(a, b, c, d, e) {
    for (var f, g, h, i, j, k, m, o = a.length, p = ca(b), q = [], r = 0; o > r; r++)
      if (g = a[r], g || 0 === g)
        if ("object" === n.type(g)) n.merge(q, g.nodeType ? [g] : g);
        else if (ga.test(g)) {
      i = i || p.appendChild(b.createElement("div")), j = ($.exec(g) || ["", ""])[1].toLowerCase(), m = da[j] || da._default, i.innerHTML = m[1] + n.htmlPrefilter(g) + m[2], f = m[0];
      while (f--) i = i.lastChild;
      if (!l.leadingWhitespace && aa.test(g) && q.push(b.createTextNode(aa.exec(g)[0])), !l.tbody) {
        g = "table" !== j || ha.test(g) ? "<table>" !== m[1] || ha.test(g) ? 0 : i : i.firstChild, f = g && g.childNodes.length;
        while (f--) n.nodeName(k = g.childNodes[f], "tbody") && !k.childNodes.length && g.removeChild(k)
      }
      n.merge(q, i.childNodes), i.textContent = "";
      while (i.firstChild) i.removeChild(i.firstChild);
      i = p.lastChild
    } else q.push(b.createTextNode(g));
    i && p.removeChild(i), l.appendChecked || n.grep(ea(q, "input"), ia), r = 0;
    while (g = q[r++])
      if (d && n.inArray(g, d) > -1) e && e.push(g);
      else if (h = n.contains(g.ownerDocument, g), i = ea(p.appendChild(g), "script"), h && fa(i), c) {
      f = 0;
      while (g = i[f++]) _.test(g.type || "") && c.push(g)
    }
    return i = null, p
  }! function () {
    var b, c, e = d.createElement("div");
    for (b in {
        submit: !0,
        change: !0,
        focusin: !0
      }) c = "on" + b, (l[b] = c in a) || (e.setAttribute(c, "t"), l[b] = e.attributes[c].expando === !1);
    e = null
  }();
  var ka = /^(?:input|select|textarea)$/i,
    la = /^key/,
    ma = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    na = /^(?:focusinfocus|focusoutblur)$/,
    oa = /^([^.]*)(?:\.(.+)|)/;

  function pa() {
    return !0
  }

  function qa() {
    return !1
  }

  function ra() {
    try {
      return d.activeElement
    } catch (a) {}
  }

  function sa(a, b, c, d, e, f) {
    var g, h;
    if ("object" == typeof b) {
      "string" != typeof c && (d = d || c, c = void 0);
      for (h in b) sa(a, h, c, d, b[h], f);
      return a
    }
    if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = qa;
    else if (!e) return a;
    return 1 === f && (g = e, e = function (a) {
      return n().off(a), g.apply(this, arguments)
    }, e.guid = g.guid || (g.guid = n.guid++)), a.each(function () {
      n.event.add(this, b, e, d, c)
    })
  }
  n.event = {
    global: {},
    add: function (a, b, c, d, e) {
      var f, g, h, i, j, k, l, m, o, p, q, r = n._data(a);
      if (r) {
        c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = n.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function (a) {
          return "undefined" == typeof n || a && n.event.triggered === a.type ? void 0 : n.event.dispatch.apply(k.elem, arguments)
        }, k.elem = a), b = (b || "").match(G) || [""], h = b.length;
        while (h--) f = oa.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), o && (j = n.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = n.event.special[o] || {}, l = n.extend({
          type: o,
          origType: q,
          data: d,
          handler: c,
          guid: c.guid,
          selector: e,
          needsContext: e && n.expr.match.needsContext.test(e),
          namespace: p.join(".")
        }, i), (m = g[o]) || (m = g[o] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), n.event.global[o] = !0);
        a = null
      }
    },
    remove: function (a, b, c, d, e) {
      var f, g, h, i, j, k, l, m, o, p, q, r = n.hasData(a) && n._data(a);
      if (r && (k = r.events)) {
        b = (b || "").match(G) || [""], j = b.length;
        while (j--)
          if (h = oa.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
            l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = k[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length;
            while (f--) g = m[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
            i && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete k[o])
          } else
            for (o in k) n.event.remove(a, o + b[j], c, d, !0);
        n.isEmptyObject(k) && (delete r.handle, n._removeData(a, "events"))
      }
    },
    trigger: function (b, c, e, f) {
      var g, h, i, j, l, m, o, p = [e || d],
        q = k.call(b, "type") ? b.type : b,
        r = k.call(b, "namespace") ? b.namespace.split(".") : [];
      if (i = m = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !na.test(q + n.event.triggered) && (q.indexOf(".") > -1 && (r = q.split("."), q = r.shift(), r.sort()), h = q.indexOf(":") < 0 && "on" + q, b = b[n.expando] ? b : new n.Event(q, "object" == typeof b && b), b.isTrigger = f ? 2 : 3, b.namespace = r.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : n.makeArray(c, [b]), l = n.event.special[q] || {}, f || !l.trigger || l.trigger.apply(e, c) !== !1)) {
        if (!f && !l.noBubble && !n.isWindow(e)) {
          for (j = l.delegateType || q, na.test(j + q) || (i = i.parentNode); i; i = i.parentNode) p.push(i), m = i;
          m === (e.ownerDocument || d) && p.push(m.defaultView || m.parentWindow || a)
        }
        o = 0;
        while ((i = p[o++]) && !b.isPropagationStopped()) b.type = o > 1 ? j : l.bindType || q, g = (n._data(i, "events") || {})[b.type] && n._data(i, "handle"), g && g.apply(i, c), g = h && i[h], g && g.apply && M(i) && (b.result = g.apply(i, c), b.result === !1 && b.preventDefault());
        if (b.type = q, !f && !b.isDefaultPrevented() && (!l._default || l._default.apply(p.pop(), c) === !1) && M(e) && h && e[q] && !n.isWindow(e)) {
          m = e[h], m && (e[h] = null), n.event.triggered = q;
          try {
            e[q]()
          } catch (s) {}
          n.event.triggered = void 0, m && (e[h] = m)
        }
        return b.result
      }
    },
    dispatch: function (a) {
      a = n.event.fix(a);
      var b, c, d, f, g, h = [],
        i = e.call(arguments),
        j = (n._data(this, "events") || {})[a.type] || [],
        k = n.event.special[a.type] || {};
      if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
        h = n.event.handlers.call(this, a, j), b = 0;
        while ((f = h[b++]) && !a.isPropagationStopped()) {
          a.currentTarget = f.elem, c = 0;
          while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped()) a.rnamespace && !a.rnamespace.test(g.namespace) || (a.handleObj = g, a.data = g.data, d = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()))
        }
        return k.postDispatch && k.postDispatch.call(this, a), a.result
      }
    },
    handlers: function (a, b) {
      var c, d, e, f, g = [],
        h = b.delegateCount,
        i = a.target;
      if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1))
        for (; i != this; i = i.parentNode || this)
          if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
            for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) > -1 : n.find(e, this, null, [i]).length), d[e] && d.push(f);
            d.length && g.push({
              elem: i,
              handlers: d
            })
          } return h < b.length && g.push({
        elem: this,
        handlers: b.slice(h)
      }), g
    },
    fix: function (a) {
      if (a[n.expando]) return a;
      var b, c, e, f = a.type,
        g = a,
        h = this.fixHooks[f];
      h || (this.fixHooks[f] = h = ma.test(f) ? this.mouseHooks : la.test(f) ? this.keyHooks : {}), e = h.props ? this.props.concat(h.props) : this.props, a = new n.Event(g), b = e.length;
      while (b--) c = e[b], a[c] = g[c];
      return a.target || (a.target = g.srcElement || d), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, h.filter ? h.filter(a, g) : a
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function (a, b) {
        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function (a, b) {
        var c, e, f, g = b.button,
          h = b.fromElement;
        return null == a.pageX && null != b.clientX && (e = a.target.ownerDocument || d, f = e.documentElement, c = e.body, a.pageX = b.clientX + (f && f.scrollLeft || c && c.scrollLeft || 0) - (f && f.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (f && f.scrollTop || c && c.scrollTop || 0) - (f && f.clientTop || c && c.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? b.toElement : h), a.which || void 0 === g || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
      }
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function () {
          if (this !== ra() && this.focus) try {
            return this.focus(), !1
          } catch (a) {}
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function () {
          return this === ra() && this.blur ? (this.blur(), !1) : void 0
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function () {
          return n.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
        },
        _default: function (a) {
          return n.nodeName(a.target, "a")
        }
      },
      beforeunload: {
        postDispatch: function (a) {
          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
        }
      }
    },
    simulate: function (a, b, c) {
      var d = n.extend(new n.Event, c, {
        type: a,
        isSimulated: !0
      });
      n.event.trigger(d, null, b), d.isDefaultPrevented() && c.preventDefault()
    }
  }, n.removeEvent = d.removeEventListener ? function (a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c)
  } : function (a, b, c) {
    var d = "on" + b;
    a.detachEvent && ("undefined" == typeof a[d] && (a[d] = null), a.detachEvent(d, c))
  }, n.Event = function (a, b) {
    return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? pa : qa) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void(this[n.expando] = !0)) : new n.Event(a, b)
  }, n.Event.prototype = {
    constructor: n.Event,
    isDefaultPrevented: qa,
    isPropagationStopped: qa,
    isImmediatePropagationStopped: qa,
    preventDefault: function () {
      var a = this.originalEvent;
      this.isDefaultPrevented = pa, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
    },
    stopPropagation: function () {
      var a = this.originalEvent;
      this.isPropagationStopped = pa, a && !this.isSimulated && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
    },
    stopImmediatePropagation: function () {
      var a = this.originalEvent;
      this.isImmediatePropagationStopped = pa, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
    }
  }, n.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (a, b) {
    n.event.special[a] = {
      delegateType: b,
      bindType: b,
      handle: function (a) {
        var c, d = this,
          e = a.relatedTarget,
          f = a.handleObj;
        return e && (e === d || n.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
      }
    }
  }), l.submit || (n.event.special.submit = {
    setup: function () {
      return n.nodeName(this, "form") ? !1 : void n.event.add(this, "click._submit keypress._submit", function (a) {
        var b = a.target,
          c = n.nodeName(b, "input") || n.nodeName(b, "button") ? n.prop(b, "form") : void 0;
        c && !n._data(c, "submit") && (n.event.add(c, "submit._submit", function (a) {
          a._submitBubble = !0
        }), n._data(c, "submit", !0))
      })
    },
    postDispatch: function (a) {
      a._submitBubble && (delete a._submitBubble, this.parentNode && !a.isTrigger && n.event.simulate("submit", this.parentNode, a))
    },
    teardown: function () {
      return n.nodeName(this, "form") ? !1 : void n.event.remove(this, "._submit")
    }
  }), l.change || (n.event.special.change = {
    setup: function () {
      return ka.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (n.event.add(this, "propertychange._change", function (a) {
        "checked" === a.originalEvent.propertyName && (this._justChanged = !0)
      }), n.event.add(this, "click._change", function (a) {
        this._justChanged && !a.isTrigger && (this._justChanged = !1), n.event.simulate("change", this, a)
      })), !1) : void n.event.add(this, "beforeactivate._change", function (a) {
        var b = a.target;
        ka.test(b.nodeName) && !n._data(b, "change") && (n.event.add(b, "change._change", function (a) {
          !this.parentNode || a.isSimulated || a.isTrigger || n.event.simulate("change", this.parentNode, a)
        }), n._data(b, "change", !0))
      })
    },
    handle: function (a) {
      var b = a.target;
      return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
    },
    teardown: function () {
      return n.event.remove(this, "._change"), !ka.test(this.nodeName)
    }
  }), l.focusin || n.each({
    focus: "focusin",
    blur: "focusout"
  }, function (a, b) {
    var c = function (a) {
      n.event.simulate(b, a.target, n.event.fix(a))
    };
    n.event.special[b] = {
      setup: function () {
        var d = this.ownerDocument || this,
          e = n._data(d, b);
        e || d.addEventListener(a, c, !0), n._data(d, b, (e || 0) + 1)
      },
      teardown: function () {
        var d = this.ownerDocument || this,
          e = n._data(d, b) - 1;
        e ? n._data(d, b, e) : (d.removeEventListener(a, c, !0), n._removeData(d, b))
      }
    }
  }), n.fn.extend({
    on: function (a, b, c, d) {
      return sa(this, a, b, c, d)
    },
    one: function (a, b, c, d) {
      return sa(this, a, b, c, d, 1)
    },
    off: function (a, b, c) {
      var d, e;
      if (a && a.preventDefault && a.handleObj) return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
      if ("object" == typeof a) {
        for (e in a) this.off(e, b, a[e]);
        return this
      }
      return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = qa), this.each(function () {
        n.event.remove(this, a, c, b)
      })
    },
    trigger: function (a, b) {
      return this.each(function () {
        n.event.trigger(a, b, this)
      })
    },
    triggerHandler: function (a, b) {
      var c = this[0];
      return c ? n.event.trigger(a, b, c, !0) : void 0
    }
  });
  var ta = / jQuery\d+="(?:null|\d+)"/g,
    ua = new RegExp("<(?:" + ba + ")[\\s/>]", "i"),
    va = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
    wa = /<script|<style|<link/i,
    xa = /checked\s*(?:[^=]|=\s*.checked.)/i,
    ya = /^true\/(.*)/,
    za = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    Aa = ca(d),
    Ba = Aa.appendChild(d.createElement("div"));

  function Ca(a, b) {
    return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
  }

  function Da(a) {
    return a.type = (null !== n.find.attr(a, "type")) + "/" + a.type, a
  }

  function Ea(a) {
    var b = ya.exec(a.type);
    return b ? a.type = b[1] : a.removeAttribute("type"), a
  }

  function Fa(a, b) {
    if (1 === b.nodeType && n.hasData(a)) {
      var c, d, e, f = n._data(a),
        g = n._data(b, f),
        h = f.events;
      if (h) {
        delete g.handle, g.events = {};
        for (c in h)
          for (d = 0, e = h[c].length; e > d; d++) n.event.add(b, c, h[c][d])
      }
      g.data && (g.data = n.extend({}, g.data))
    }
  }

  function Ga(a, b) {
    var c, d, e;
    if (1 === b.nodeType) {
      if (c = b.nodeName.toLowerCase(), !l.noCloneEvent && b[n.expando]) {
        e = n._data(b);
        for (d in e.events) n.removeEvent(b, d, e.handle);
        b.removeAttribute(n.expando)
      }
      "script" === c && b.text !== a.text ? (Da(b).text = a.text, Ea(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), l.html5Clone && a.innerHTML && !n.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Z.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
    }
  }

  function Ha(a, b, c, d) {
    b = f.apply([], b);
    var e, g, h, i, j, k, m = 0,
      o = a.length,
      p = o - 1,
      q = b[0],
      r = n.isFunction(q);
    if (r || o > 1 && "string" == typeof q && !l.checkClone && xa.test(q)) return a.each(function (e) {
      var f = a.eq(e);
      r && (b[0] = q.call(this, e, f.html())), Ha(f, b, c, d)
    });
    if (o && (k = ja(b, a[0].ownerDocument, !1, a, d), e = k.firstChild, 1 === k.childNodes.length && (k = e), e || d)) {
      for (i = n.map(ea(k, "script"), Da), h = i.length; o > m; m++) g = k, m !== p && (g = n.clone(g, !0, !0), h && n.merge(i, ea(g, "script"))), c.call(a[m], g, m);
      if (h)
        for (j = i[i.length - 1].ownerDocument, n.map(i, Ea), m = 0; h > m; m++) g = i[m], _.test(g.type || "") && !n._data(g, "globalEval") && n.contains(j, g) && (g.src ? n._evalUrl && n._evalUrl(g.src) : n.globalEval((g.text || g.textContent || g.innerHTML || "").replace(za, "")));
      k = e = null
    }
    return a
  }

  function Ia(a, b, c) {
    for (var d, e = b ? n.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || n.cleanData(ea(d)), d.parentNode && (c && n.contains(d.ownerDocument, d) && fa(ea(d, "script")), d.parentNode.removeChild(d));
    return a
  }
  n.extend({
    htmlPrefilter: function (a) {
      return a.replace(va, "<$1></$2>")
    },
    clone: function (a, b, c) {
      var d, e, f, g, h, i = n.contains(a.ownerDocument, a);
      if (l.html5Clone || n.isXMLDoc(a) || !ua.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (Ba.innerHTML = a.outerHTML, Ba.removeChild(f = Ba.firstChild)), !(l.noCloneEvent && l.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a)))
        for (d = ea(f), h = ea(a), g = 0; null != (e = h[g]); ++g) d[g] && Ga(e, d[g]);
      if (b)
        if (c)
          for (h = h || ea(a), d = d || ea(f), g = 0; null != (e = h[g]); g++) Fa(e, d[g]);
        else Fa(a, f);
      return d = ea(f, "script"), d.length > 0 && fa(d, !i && ea(a, "script")), d = h = e = null, f
    },
    cleanData: function (a, b) {
      for (var d, e, f, g, h = 0, i = n.expando, j = n.cache, k = l.attributes, m = n.event.special; null != (d = a[h]); h++)
        if ((b || M(d)) && (f = d[i], g = f && j[f])) {
          if (g.events)
            for (e in g.events) m[e] ? n.event.remove(d, e) : n.removeEvent(d, e, g.handle);
          j[f] && (delete j[f], k || "undefined" == typeof d.removeAttribute ? d[i] = void 0 : d.removeAttribute(i), c.push(f))
        }
    }
  }), n.fn.extend({
    domManip: Ha,
    detach: function (a) {
      return Ia(this, a, !0)
    },
    remove: function (a) {
      return Ia(this, a)
    },
    text: function (a) {
      return Y(this, function (a) {
        return void 0 === a ? n.text(this) : this.empty().append((this[0] && this[0].ownerDocument || d).createTextNode(a))
      }, null, a, arguments.length)
    },
    append: function () {
      return Ha(this, arguments, function (a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = Ca(this, a);
          b.appendChild(a)
        }
      })
    },
    prepend: function () {
      return Ha(this, arguments, function (a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = Ca(this, a);
          b.insertBefore(a, b.firstChild)
        }
      })
    },
    before: function () {
      return Ha(this, arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this)
      })
    },
    after: function () {
      return Ha(this, arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
      })
    },
    empty: function () {
      for (var a, b = 0; null != (a = this[b]); b++) {
        1 === a.nodeType && n.cleanData(ea(a, !1));
        while (a.firstChild) a.removeChild(a.firstChild);
        a.options && n.nodeName(a, "select") && (a.options.length = 0)
      }
      return this
    },
    clone: function (a, b) {
      return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
        return n.clone(this, a, b)
      })
    },
    html: function (a) {
      return Y(this, function (a) {
        var b = this[0] || {},
          c = 0,
          d = this.length;
        if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(ta, "") : void 0;
        if ("string" == typeof a && !wa.test(a) && (l.htmlSerialize || !ua.test(a)) && (l.leadingWhitespace || !aa.test(a)) && !da[($.exec(a) || ["", ""])[1].toLowerCase()]) {
          a = n.htmlPrefilter(a);
          try {
            for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (n.cleanData(ea(b, !1)), b.innerHTML = a);
            b = 0
          } catch (e) {}
        }
        b && this.empty().append(a)
      }, null, a, arguments.length)
    },
    replaceWith: function () {
      var a = [];
      return Ha(this, arguments, function (b) {
        var c = this.parentNode;
        n.inArray(this, a) < 0 && (n.cleanData(ea(this)), c && c.replaceChild(b, this))
      }, a)
    }
  }), n.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (a, b) {
    n.fn[a] = function (a) {
      for (var c, d = 0, e = [], f = n(a), h = f.length - 1; h >= d; d++) c = d === h ? this : this.clone(!0), n(f[d])[b](c), g.apply(e, c.get());
      return this.pushStack(e)
    }
  });
  var Ja, Ka = {
    HTML: "block",
    BODY: "block"
  };

  function La(a, b) {
    var c = n(b.createElement(a)).appendTo(b.body),
      d = n.css(c[0], "display");
    return c.detach(), d
  }

  function Ma(a) {
    var b = d,
      c = Ka[a];
    return c || (c = La(a, b), "none" !== c && c || (Ja = (Ja || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Ja[0].contentWindow || Ja[0].contentDocument).document, b.write(), b.close(), c = La(a, b), Ja.detach()), Ka[a] = c), c
  }
  var Na = /^margin/,
    Oa = new RegExp("^(" + T + ")(?!px)[a-z%]+$", "i"),
    Pa = function (a, b, c, d) {
      var e, f, g = {};
      for (f in b) g[f] = a.style[f], a.style[f] = b[f];
      e = c.apply(a, d || []);
      for (f in b) a.style[f] = g[f];
      return e
    },
    Qa = d.documentElement;
  ! function () {
    var b, c, e, f, g, h, i = d.createElement("div"),
      j = d.createElement("div");
    if (j.style) {
      j.style.cssText = "float:left;opacity:.5", l.opacity = "0.5" === j.style.opacity, l.cssFloat = !!j.style.cssFloat, j.style.backgroundClip = "content-box", j.cloneNode(!0).style.backgroundClip = "", l.clearCloneStyle = "content-box" === j.style.backgroundClip, i = d.createElement("div"), i.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", j.innerHTML = "", i.appendChild(j), l.boxSizing = "" === j.style.boxSizing || "" === j.style.MozBoxSizing || "" === j.style.WebkitBoxSizing, n.extend(l, {
        reliableHiddenOffsets: function () {
          return null == b && k(), f
        },
        boxSizingReliable: function () {
          return null == b && k(), e
        },
        pixelMarginRight: function () {
          return null == b && k(), c
        },
        pixelPosition: function () {
          return null == b && k(), b
        },
        reliableMarginRight: function () {
          return null == b && k(), g
        },
        reliableMarginLeft: function () {
          return null == b && k(), h
        }
      });

      function k() {
        var k, l, m = d.documentElement;
        m.appendChild(i), j.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", b = e = h = !1, c = g = !0, a.getComputedStyle && (l = a.getComputedStyle(j), b = "1%" !== (l || {}).top, h = "2px" === (l || {}).marginLeft, e = "4px" === (l || {
          width: "4px"
        }).width, j.style.marginRight = "50%", c = "4px" === (l || {
          marginRight: "4px"
        }).marginRight, k = j.appendChild(d.createElement("div")), k.style.cssText = j.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", k.style.marginRight = k.style.width = "0", j.style.width = "1px", g = !parseFloat((a.getComputedStyle(k) || {}).marginRight), j.removeChild(k)), j.style.display = "none", f = 0 === j.getClientRects().length, f && (j.style.display = "", j.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", j.childNodes[0].style.borderCollapse = "separate", k = j.getElementsByTagName("td"), k[0].style.cssText = "margin:0;border:0;padding:0;display:none", f = 0 === k[0].offsetHeight, f && (k[0].style.display = "", k[1].style.display = "none", f = 0 === k[0].offsetHeight)), m.removeChild(i)
      }
    }
  }();
  var Ra, Sa, Ta = /^(top|right|bottom|left)$/;
  a.getComputedStyle ? (Ra = function (b) {
    var c = b.ownerDocument.defaultView;
    return c && c.opener || (c = a), c.getComputedStyle(b)
  }, Sa = function (a, b, c) {
    var d, e, f, g, h = a.style;
    return c = c || Ra(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, "" !== g && void 0 !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), c && !l.pixelMarginRight() && Oa.test(g) && Na.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f), void 0 === g ? g : g + ""
  }) : Qa.currentStyle && (Ra = function (a) {
    return a.currentStyle
  }, Sa = function (a, b, c) {
    var d, e, f, g, h = a.style;
    return c = c || Ra(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Oa.test(g) && !Ta.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
  });

  function Ua(a, b) {
    return {
      get: function () {
        return a() ? void delete this.get : (this.get = b).apply(this, arguments)
      }
    }
  }
  var Va = /alpha\([^)]*\)/i,
    Wa = /opacity\s*=\s*([^)]*)/i,
    Xa = /^(none|table(?!-c[ea]).+)/,
    Ya = new RegExp("^(" + T + ")(.*)$", "i"),
    Za = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    $a = {
      letterSpacing: "0",
      fontWeight: "400"
    },
    _a = ["Webkit", "O", "Moz", "ms"],
    ab = d.createElement("div").style;

  function bb(a) {
    if (a in ab) return a;
    var b = a.charAt(0).toUpperCase() + a.slice(1),
      c = _a.length;
    while (c--)
      if (a = _a[c] + b, a in ab) return a
  }

  function cb(a, b) {
    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = n._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && W(d) && (f[g] = n._data(d, "olddisplay", Ma(d.nodeName)))) : (e = W(d), (c && "none" !== c || !e) && n._data(d, "olddisplay", e ? c : n.css(d, "display"))));
    for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
    return a
  }

  function db(a, b, c) {
    var d = Ya.exec(b);
    return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
  }

  function eb(a, b, c, d, e) {
    for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += n.css(a, c + V[f], !0, e)), d ? ("content" === c && (g -= n.css(a, "padding" + V[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + V[f] + "Width", !0, e))) : (g += n.css(a, "padding" + V[f], !0, e), "padding" !== c && (g += n.css(a, "border" + V[f] + "Width", !0, e)));
    return g
  }

  function fb(a, b, c) {
    var d = !0,
      e = "width" === b ? a.offsetWidth : a.offsetHeight,
      f = Ra(a),
      g = l.boxSizing && "border-box" === n.css(a, "boxSizing", !1, f);
    if (0 >= e || null == e) {
      if (e = Sa(a, b, f), (0 > e || null == e) && (e = a.style[b]), Oa.test(e)) return e;
      d = g && (l.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
    }
    return e + eb(a, b, c || (g ? "border" : "content"), d, f) + "px"
  }
  n.extend({
    cssHooks: {
      opacity: {
        get: function (a, b) {
          if (b) {
            var c = Sa(a, "opacity");
            return "" === c ? "1" : c
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": l.cssFloat ? "cssFloat" : "styleFloat"
    },
    style: function (a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e, f, g, h = n.camelCase(b),
          i = a.style;
        if (b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
        if (f = typeof c, "string" === f && (e = U.exec(c)) && e[1] && (c = X(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (n.cssNumber[h] ? "" : "px")), l.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
          i[b] = c
        } catch (j) {}
      }
    },
    css: function (a, b, c, d) {
      var e, f, g, h = n.camelCase(b);
      return b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h), g = n.cssHooks[b] || n.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = Sa(a, b, d)), "normal" === f && b in $a && (f = $a[b]), "" === c || c ? (e = parseFloat(f), c === !0 || isFinite(e) ? e || 0 : f) : f
    }
  }), n.each(["height", "width"], function (a, b) {
    n.cssHooks[b] = {
      get: function (a, c, d) {
        return c ? Xa.test(n.css(a, "display")) && 0 === a.offsetWidth ? Pa(a, Za, function () {
          return fb(a, b, d)
        }) : fb(a, b, d) : void 0
      },
      set: function (a, c, d) {
        var e = d && Ra(a);
        return db(a, c, d ? eb(a, b, d, l.boxSizing && "border-box" === n.css(a, "boxSizing", !1, e), e) : 0)
      }
    }
  }), l.opacity || (n.cssHooks.opacity = {
    get: function (a, b) {
      return Wa.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
    },
    set: function (a, b) {
      var c = a.style,
        d = a.currentStyle,
        e = n.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
        f = d && d.filter || c.filter || "";
      c.zoom = 1, (b >= 1 || "" === b) && "" === n.trim(f.replace(Va, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = Va.test(f) ? f.replace(Va, e) : f + " " + e)
    }
  }), n.cssHooks.marginRight = Ua(l.reliableMarginRight, function (a, b) {
    return b ? Pa(a, {
      display: "inline-block"
    }, Sa, [a, "marginRight"]) : void 0
  }), n.cssHooks.marginLeft = Ua(l.reliableMarginLeft, function (a, b) {
    return b ? (parseFloat(Sa(a, "marginLeft")) || (n.contains(a.ownerDocument, a) ? a.getBoundingClientRect().left - Pa(a, {
      marginLeft: 0
    }, function () {
      return a.getBoundingClientRect().left
    }) : 0)) + "px" : void 0
  }), n.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (a, b) {
    n.cssHooks[a + b] = {
      expand: function (c) {
        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + V[d] + b] = f[d] || f[d - 2] || f[0];
        return e
      }
    }, Na.test(a) || (n.cssHooks[a + b].set = db)
  }), n.fn.extend({
    css: function (a, b) {
      return Y(this, function (a, b, c) {
        var d, e, f = {},
          g = 0;
        if (n.isArray(b)) {
          for (d = Ra(a), e = b.length; e > g; g++) f[b[g]] = n.css(a, b[g], !1, d);
          return f
        }
        return void 0 !== c ? n.style(a, b, c) : n.css(a, b)
      }, a, b, arguments.length > 1)
    },
    show: function () {
      return cb(this, !0)
    },
    hide: function () {
      return cb(this)
    },
    toggle: function (a) {
      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
        W(this) ? n(this).show() : n(this).hide()
      })
    }
  });

  function gb(a, b, c, d, e) {
    return new gb.prototype.init(a, b, c, d, e)
  }
  n.Tween = gb, gb.prototype = {
    constructor: gb,
    init: function (a, b, c, d, e, f) {
      this.elem = a, this.prop = c, this.easing = e || n.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px")
    },
    cur: function () {
      var a = gb.propHooks[this.prop];
      return a && a.get ? a.get(this) : gb.propHooks._default.get(this)
    },
    run: function (a) {
      var b, c = gb.propHooks[this.prop];
      return this.options.duration ? this.pos = b = n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : gb.propHooks._default.set(this), this
    }
  }, gb.prototype.init.prototype = gb.prototype, gb.propHooks = {
    _default: {
      get: function (a) {
        var b;
        return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = n.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0)
      },
      set: function (a) {
        n.fx.step[a.prop] ? n.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[n.cssProps[a.prop]] && !n.cssHooks[a.prop] ? a.elem[a.prop] = a.now : n.style(a.elem, a.prop, a.now + a.unit)
      }
    }
  }, gb.propHooks.scrollTop = gb.propHooks.scrollLeft = {
    set: function (a) {
      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
    }
  }, n.easing = {
    linear: function (a) {
      return a
    },
    swing: function (a) {
      return .5 - Math.cos(a * Math.PI) / 2
    },
    _default: "swing"
  }, n.fx = gb.prototype.init, n.fx.step = {};
  var hb, ib, jb = /^(?:toggle|show|hide)$/,
    kb = /queueHooks$/;

  function lb() {
    return a.setTimeout(function () {
      hb = void 0
    }), hb = n.now()
  }

  function mb(a, b) {
    var c, d = {
        height: a
      },
      e = 0;
    for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = V[e], d["margin" + c] = d["padding" + c] = a;
    return b && (d.opacity = d.width = a), d
  }

  function nb(a, b, c) {
    for (var d, e = (qb.tweeners[b] || []).concat(qb.tweeners["*"]), f = 0, g = e.length; g > f; f++)
      if (d = e[f].call(c, b, a)) return d
  }

  function ob(a, b, c) {
    var d, e, f, g, h, i, j, k, m = this,
      o = {},
      p = a.style,
      q = a.nodeType && W(a),
      r = n._data(a, "fxshow");
    c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
      h.unqueued || i()
    }), h.unqueued++, m.always(function () {
      m.always(function () {
        h.unqueued--, n.queue(a, "fx").length || h.empty.fire()
      })
    })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY], j = n.css(a, "display"), k = "none" === j ? n._data(a, "olddisplay") || Ma(a.nodeName) : j, "inline" === k && "none" === n.css(a, "float") && (l.inlineBlockNeedsLayout && "inline" !== Ma(a.nodeName) ? p.zoom = 1 : p.display = "inline-block")), c.overflow && (p.overflow = "hidden", l.shrinkWrapBlocks() || m.always(function () {
      p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2]
    }));
    for (d in b)
      if (e = b[d], jb.exec(e)) {
        if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
          if ("show" !== e || !r || void 0 === r[d]) continue;
          q = !0
        }
        o[d] = r && r[d] || n.style(a, d)
      } else j = void 0;
    if (n.isEmptyObject(o)) "inline" === ("none" === j ? Ma(a.nodeName) : j) && (p.display = j);
    else {
      r ? "hidden" in r && (q = r.hidden) : r = n._data(a, "fxshow", {}), f && (r.hidden = !q), q ? n(a).show() : m.done(function () {
        n(a).hide()
      }), m.done(function () {
        var b;
        n._removeData(a, "fxshow");
        for (b in o) n.style(a, b, o[b])
      });
      for (d in o) g = nb(q ? r[d] : 0, d, m), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
    }
  }

  function pb(a, b) {
    var c, d, e, f, g;
    for (c in a)
      if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
        f = g.expand(f), delete a[d];
        for (c in f) c in a || (a[c] = f[c], b[c] = e)
      } else b[d] = e
  }

  function qb(a, b, c) {
    var d, e, f = 0,
      g = qb.prefilters.length,
      h = n.Deferred().always(function () {
        delete i.elem
      }),
      i = function () {
        if (e) return !1;
        for (var b = hb || lb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
        return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
      },
      j = h.promise({
        elem: a,
        props: n.extend({}, b),
        opts: n.extend(!0, {
          specialEasing: {},
          easing: n.easing._default
        }, c),
        originalProperties: b,
        originalOptions: c,
        startTime: hb || lb(),
        duration: c.duration,
        tweens: [],
        createTween: function (b, c) {
          var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
          return j.tweens.push(d), d
        },
        stop: function (b) {
          var c = 0,
            d = b ? j.tweens.length : 0;
          if (e) return this;
          for (e = !0; d > c; c++) j.tweens[c].run(1);
          return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this
        }
      }),
      k = j.props;
    for (pb(k, j.opts.specialEasing); g > f; f++)
      if (d = qb.prefilters[f].call(j, a, k, j.opts)) return n.isFunction(d.stop) && (n._queueHooks(j.elem, j.opts.queue).stop = n.proxy(d.stop, d)), d;
    return n.map(k, nb, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
      elem: a,
      anim: j,
      queue: j.opts.queue
    })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
  }
  n.Animation = n.extend(qb, {
      tweeners: {
        "*": [function (a, b) {
          var c = this.createTween(a, b);
          return X(c.elem, a, U.exec(b), c), c
        }]
      },
      tweener: function (a, b) {
        n.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(G);
        for (var c, d = 0, e = a.length; e > d; d++) c = a[d], qb.tweeners[c] = qb.tweeners[c] || [], qb.tweeners[c].unshift(b)
      },
      prefilters: [ob],
      prefilter: function (a, b) {
        b ? qb.prefilters.unshift(a) : qb.prefilters.push(a)
      }
    }), n.speed = function (a, b, c) {
      var d = a && "object" == typeof a ? n.extend({}, a) : {
        complete: c || !c && b || n.isFunction(a) && a,
        duration: a,
        easing: c && b || b && !n.isFunction(b) && b
      };
      return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function () {
        n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue)
      }, d
    }, n.fn.extend({
      fadeTo: function (a, b, c, d) {
        return this.filter(W).css("opacity", 0).show().end().animate({
          opacity: b
        }, a, c, d)
      },
      animate: function (a, b, c, d) {
        var e = n.isEmptyObject(a),
          f = n.speed(b, c, d),
          g = function () {
            var b = qb(this, n.extend({}, a), f);
            (e || n._data(this, "finish")) && b.stop(!0)
          };
        return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
      },
      stop: function (a, b, c) {
        var d = function (a) {
          var b = a.stop;
          delete a.stop, b(c)
        };
        return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
          var b = !0,
            e = null != a && a + "queueHooks",
            f = n.timers,
            g = n._data(this);
          if (e) g[e] && g[e].stop && d(g[e]);
          else
            for (e in g) g[e] && g[e].stop && kb.test(e) && d(g[e]);
          for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
          !b && c || n.dequeue(this, a)
        })
      },
      finish: function (a) {
        return a !== !1 && (a = a || "fx"), this.each(function () {
          var b, c = n._data(this),
            d = c[a + "queue"],
            e = c[a + "queueHooks"],
            f = n.timers,
            g = d ? d.length : 0;
          for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
          for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
          delete c.finish
        })
      }
    }), n.each(["toggle", "show", "hide"], function (a, b) {
      var c = n.fn[b];
      n.fn[b] = function (a, d, e) {
        return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(mb(b, !0), a, d, e)
      }
    }), n.each({
      slideDown: mb("show"),
      slideUp: mb("hide"),
      slideToggle: mb("toggle"),
      fadeIn: {
        opacity: "show"
      },
      fadeOut: {
        opacity: "hide"
      },
      fadeToggle: {
        opacity: "toggle"
      }
    }, function (a, b) {
      n.fn[a] = function (a, c, d) {
        return this.animate(b, a, c, d)
      }
    }), n.timers = [], n.fx.tick = function () {
      var a, b = n.timers,
        c = 0;
      for (hb = n.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
      b.length || n.fx.stop(), hb = void 0
    }, n.fx.timer = function (a) {
      n.timers.push(a), a() ? n.fx.start() : n.timers.pop()
    }, n.fx.interval = 13, n.fx.start = function () {
      ib || (ib = a.setInterval(n.fx.tick, n.fx.interval))
    }, n.fx.stop = function () {
      a.clearInterval(ib), ib = null
    }, n.fx.speeds = {
      slow: 600,
      fast: 200,
      _default: 400
    }, n.fn.delay = function (b, c) {
      return b = n.fx ? n.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function (c, d) {
        var e = a.setTimeout(c, b);
        d.stop = function () {
          a.clearTimeout(e)
        }
      })
    },
    function () {
      var a, b = d.createElement("input"),
        c = d.createElement("div"),
        e = d.createElement("select"),
        f = e.appendChild(d.createElement("option"));
      c = d.createElement("div"), c.setAttribute("className", "t"), c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = c.getElementsByTagName("a")[0], b.setAttribute("type", "checkbox"), c.appendChild(b), a = c.getElementsByTagName("a")[0], a.style.cssText = "top:1px", l.getSetAttribute = "t" !== c.className, l.style = /top/.test(a.getAttribute("style")), l.hrefNormalized = "/a" === a.getAttribute("href"), l.checkOn = !!b.value, l.optSelected = f.selected, l.enctype = !!d.createElement("form").enctype, e.disabled = !0, l.optDisabled = !f.disabled, b = d.createElement("input"), b.setAttribute("value", ""), l.input = "" === b.getAttribute("value"), b.value = "t", b.setAttribute("type", "radio"), l.radioValue = "t" === b.value
    }();
  var rb = /\r/g,
    sb = /[\x20\t\r\n\f]+/g;
  n.fn.extend({
    val: function (a) {
      var b, c, d, e = this[0]; {
        if (arguments.length) return d = n.isFunction(a), this.each(function (c) {
          var e;
          1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function (a) {
            return null == a ? "" : a + ""
          })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
        });
        if (e) return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(rb, "") : null == c ? "" : c)
      }
    }
  }), n.extend({
    valHooks: {
      option: {
        get: function (a) {
          var b = n.find.attr(a, "value");
          return null != b ? b : n.trim(n.text(a)).replace(sb, " ")
        }
      },
      select: {
        get: function (a) {
          for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
            if (c = d[i], (c.selected || i === e) && (l.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !n.nodeName(c.parentNode, "optgroup"))) {
              if (b = n(c).val(), f) return b;
              g.push(b)
            } return g
        },
        set: function (a, b) {
          var c, d, e = a.options,
            f = n.makeArray(b),
            g = e.length;
          while (g--)
            if (d = e[g], n.inArray(n.valHooks.option.get(d), f) > -1) try {
              d.selected = c = !0
            } catch (h) {
              d.scrollHeight
            } else d.selected = !1;
          return c || (a.selectedIndex = -1), e
        }
      }
    }
  }), n.each(["radio", "checkbox"], function () {
    n.valHooks[this] = {
      set: function (a, b) {
        return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) > -1 : void 0
      }
    }, l.checkOn || (n.valHooks[this].get = function (a) {
      return null === a.getAttribute("value") ? "on" : a.value
    })
  });
  var tb, ub, vb = n.expr.attrHandle,
    wb = /^(?:checked|selected)$/i,
    xb = l.getSetAttribute,
    yb = l.input;
  n.fn.extend({
    attr: function (a, b) {
      return Y(this, n.attr, a, b, arguments.length > 1)
    },
    removeAttr: function (a) {
      return this.each(function () {
        n.removeAttr(this, a)
      })
    }
  }), n.extend({
    attr: function (a, b, c) {
      var d, e, f = a.nodeType;
      if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), e = n.attrHooks[b] || (n.expr.match.bool.test(b) ? ub : tb)), void 0 !== c ? null === c ? void n.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = n.find.attr(a, b), null == d ? void 0 : d))
    },
    attrHooks: {
      type: {
        set: function (a, b) {
          if (!l.radioValue && "radio" === b && n.nodeName(a, "input")) {
            var c = a.value;
            return a.setAttribute("type", b), c && (a.value = c), b
          }
        }
      }
    },
    removeAttr: function (a, b) {
      var c, d, e = 0,
        f = b && b.match(G);
      if (f && 1 === a.nodeType)
        while (c = f[e++]) d = n.propFix[c] || c, n.expr.match.bool.test(c) ? yb && xb || !wb.test(c) ? a[d] = !1 : a[n.camelCase("default-" + c)] = a[d] = !1 : n.attr(a, c, ""), a.removeAttribute(xb ? c : d)
    }
  }), ub = {
    set: function (a, b, c) {
      return b === !1 ? n.removeAttr(a, c) : yb && xb || !wb.test(c) ? a.setAttribute(!xb && n.propFix[c] || c, c) : a[n.camelCase("default-" + c)] = a[c] = !0, c
    }
  }, n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
    var c = vb[b] || n.find.attr;
    yb && xb || !wb.test(b) ? vb[b] = function (a, b, d) {
      var e, f;
      return d || (f = vb[b], vb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, vb[b] = f), e
    } : vb[b] = function (a, b, c) {
      return c ? void 0 : a[n.camelCase("default-" + b)] ? b.toLowerCase() : null
    }
  }), yb && xb || (n.attrHooks.value = {
    set: function (a, b, c) {
      return n.nodeName(a, "input") ? void(a.defaultValue = b) : tb && tb.set(a, b, c)
    }
  }), xb || (tb = {
    set: function (a, b, c) {
      var d = a.getAttributeNode(c);
      return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
    }
  }, vb.id = vb.name = vb.coords = function (a, b, c) {
    var d;
    return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
  }, n.valHooks.button = {
    get: function (a, b) {
      var c = a.getAttributeNode(b);
      return c && c.specified ? c.value : void 0
    },
    set: tb.set
  }, n.attrHooks.contenteditable = {
    set: function (a, b, c) {
      tb.set(a, "" === b ? !1 : b, c)
    }
  }, n.each(["width", "height"], function (a, b) {
    n.attrHooks[b] = {
      set: function (a, c) {
        return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
      }
    }
  })), l.style || (n.attrHooks.style = {
    get: function (a) {
      return a.style.cssText || void 0
    },
    set: function (a, b) {
      return a.style.cssText = b + ""
    }
  });
  var zb = /^(?:input|select|textarea|button|object)$/i,
    Ab = /^(?:a|area)$/i;
  n.fn.extend({
    prop: function (a, b) {
      return Y(this, n.prop, a, b, arguments.length > 1)
    },
    removeProp: function (a) {
      return a = n.propFix[a] || a, this.each(function () {
        try {
          this[a] = void 0, delete this[a]
        } catch (b) {}
      })
    }
  }), n.extend({
    prop: function (a, b, c) {
      var d, e, f = a.nodeType;
      if (3 !== f && 8 !== f && 2 !== f) return 1 === f && n.isXMLDoc(a) || (b = n.propFix[b] || b, e = n.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
    },
    propHooks: {
      tabIndex: {
        get: function (a) {
          var b = n.find.attr(a, "tabindex");
          return b ? parseInt(b, 10) : zb.test(a.nodeName) || Ab.test(a.nodeName) && a.href ? 0 : -1
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  }), l.hrefNormalized || n.each(["href", "src"], function (a, b) {
    n.propHooks[b] = {
      get: function (a) {
        return a.getAttribute(b, 4)
      }
    }
  }), l.optSelected || (n.propHooks.selected = {
    get: function (a) {
      var b = a.parentNode;
      return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
    },
    set: function (a) {
      var b = a.parentNode;
      b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
    }
  }), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    n.propFix[this.toLowerCase()] = this
  }), l.enctype || (n.propFix.enctype = "encoding");
  var Bb = /[\t\r\n\f]/g;

  function Cb(a) {
    return n.attr(a, "class") || ""
  }
  n.fn.extend({
    addClass: function (a) {
      var b, c, d, e, f, g, h, i = 0;
      if (n.isFunction(a)) return this.each(function (b) {
        n(this).addClass(a.call(this, b, Cb(this)))
      });
      if ("string" == typeof a && a) {
        b = a.match(G) || [];
        while (c = this[i++])
          if (e = Cb(c), d = 1 === c.nodeType && (" " + e + " ").replace(Bb, " ")) {
            g = 0;
            while (f = b[g++]) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
            h = n.trim(d), e !== h && n.attr(c, "class", h)
          }
      }
      return this
    },
    removeClass: function (a) {
      var b, c, d, e, f, g, h, i = 0;
      if (n.isFunction(a)) return this.each(function (b) {
        n(this).removeClass(a.call(this, b, Cb(this)))
      });
      if (!arguments.length) return this.attr("class", "");
      if ("string" == typeof a && a) {
        b = a.match(G) || [];
        while (c = this[i++])
          if (e = Cb(c), d = 1 === c.nodeType && (" " + e + " ").replace(Bb, " ")) {
            g = 0;
            while (f = b[g++])
              while (d.indexOf(" " + f + " ") > -1) d = d.replace(" " + f + " ", " ");
            h = n.trim(d), e !== h && n.attr(c, "class", h)
          }
      }
      return this
    },
    toggleClass: function (a, b) {
      var c = typeof a;
      return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : n.isFunction(a) ? this.each(function (c) {
        n(this).toggleClass(a.call(this, c, Cb(this), b), b)
      }) : this.each(function () {
        var b, d, e, f;
        if ("string" === c) {
          d = 0, e = n(this), f = a.match(G) || [];
          while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
        } else void 0 !== a && "boolean" !== c || (b = Cb(this), b && n._data(this, "__className__", b), n.attr(this, "class", b || a === !1 ? "" : n._data(this, "__className__") || ""))
      })
    },
    hasClass: function (a) {
      var b, c, d = 0;
      b = " " + a + " ";
      while (c = this[d++])
        if (1 === c.nodeType && (" " + Cb(c) + " ").replace(Bb, " ").indexOf(b) > -1) return !0;
      return !1
    }
  }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
    n.fn[b] = function (a, c) {
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
    }
  }), n.fn.extend({
    hover: function (a, b) {
      return this.mouseenter(a).mouseleave(b || a)
    }
  });
  var Db = a.location,
    Eb = n.now(),
    Fb = /\?/,
    Gb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  n.parseJSON = function (b) {
    if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
    var c, d = null,
      e = n.trim(b + "");
    return e && !n.trim(e.replace(Gb, function (a, b, e, f) {
      return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
    })) ? Function("return " + e)() : n.error("Invalid JSON: " + b)
  }, n.parseXML = function (b) {
    var c, d;
    if (!b || "string" != typeof b) return null;
    try {
      a.DOMParser ? (d = new a.DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new a.ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
    } catch (e) {
      c = void 0
    }
    return c && c.documentElement && !c.getElementsByTagName("parsererror").length || n.error("Invalid XML: " + b), c
  };
  var Hb = /#.*$/,
    Ib = /([?&])_=[^&]*/,
    Jb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Kb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Lb = /^(?:GET|HEAD)$/,
    Mb = /^\/\//,
    Nb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    Ob = {},
    Pb = {},
    Qb = "*/".concat("*"),
    Rb = Db.href,
    Sb = Nb.exec(Rb.toLowerCase()) || [];

  function Tb(a) {
    return function (b, c) {
      "string" != typeof b && (c = b, b = "*");
      var d, e = 0,
        f = b.toLowerCase().match(G) || [];
      if (n.isFunction(c))
        while (d = f[e++]) "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
    }
  }

  function Ub(a, b, c, d) {
    var e = {},
      f = a === Pb;

    function g(h) {
      var i;
      return e[h] = !0, n.each(a[h] || [], function (a, h) {
        var j = h(b, c, d);
        return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
      }), i
    }
    return g(b.dataTypes[0]) || !e["*"] && g("*")
  }

  function Vb(a, b) {
    var c, d, e = n.ajaxSettings.flatOptions || {};
    for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
    return c && n.extend(!0, a, c), a
  }

  function Wb(a, b, c) {
    var d, e, f, g, h = a.contents,
      i = a.dataTypes;
    while ("*" === i[0]) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
    if (e)
      for (g in h)
        if (h[g] && h[g].test(e)) {
          i.unshift(g);
          break
        } if (i[0] in c) f = i[0];
    else {
      for (g in c) {
        if (!i[0] || a.converters[g + " " + i[0]]) {
          f = g;
          break
        }
        d || (d = g)
      }
      f = f || d
    }
    return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
  }

  function Xb(a, b, c, d) {
    var e, f, g, h, i, j = {},
      k = a.dataTypes.slice();
    if (k[1])
      for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
    f = k.shift();
    while (f)
      if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
        if ("*" === f) f = i;
        else if ("*" !== i && i !== f) {
      if (g = j[i + " " + f] || j["* " + f], !g)
        for (e in j)
          if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
            break
          } if (g !== !0)
        if (g && a["throws"]) b = g(b);
        else try {
          b = g(b)
        } catch (l) {
          return {
            state: "parsererror",
            error: g ? l : "No conversion from " + i + " to " + f
          }
        }
    }
    return {
      state: "success",
      data: b
    }
  }
  n.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Rb,
      type: "GET",
      isLocal: Kb.test(Sb[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": Qb,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": n.parseJSON,
        "text xml": n.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function (a, b) {
      return b ? Vb(Vb(a, n.ajaxSettings), b) : Vb(n.ajaxSettings, a)
    },
    ajaxPrefilter: Tb(Ob),
    ajaxTransport: Tb(Pb),
    ajax: function (b, c) {
      "object" == typeof b && (c = b, b = void 0), c = c || {};
      var d, e, f, g, h, i, j, k, l = n.ajaxSetup({}, c),
        m = l.context || l,
        o = l.context && (m.nodeType || m.jquery) ? n(m) : n.event,
        p = n.Deferred(),
        q = n.Callbacks("once memory"),
        r = l.statusCode || {},
        s = {},
        t = {},
        u = 0,
        v = "canceled",
        w = {
          readyState: 0,
          getResponseHeader: function (a) {
            var b;
            if (2 === u) {
              if (!k) {
                k = {};
                while (b = Jb.exec(g)) k[b[1].toLowerCase()] = b[2]
              }
              b = k[a.toLowerCase()]
            }
            return null == b ? null : b
          },
          getAllResponseHeaders: function () {
            return 2 === u ? g : null
          },
          setRequestHeader: function (a, b) {
            var c = a.toLowerCase();
            return u || (a = t[c] = t[c] || a, s[a] = b), this
          },
          overrideMimeType: function (a) {
            return u || (l.mimeType = a), this
          },
          statusCode: function (a) {
            var b;
            if (a)
              if (2 > u)
                for (b in a) r[b] = [r[b], a[b]];
              else w.always(a[w.status]);
            return this
          },
          abort: function (a) {
            var b = a || v;
            return j && j.abort(b), y(0, b), this
          }
        };
      if (p.promise(w).complete = q.add, w.success = w.done, w.error = w.fail, l.url = ((b || l.url || Rb) + "").replace(Hb, "").replace(Mb, Sb[1] + "//"), l.type = c.method || c.type || l.method || l.type, l.dataTypes = n.trim(l.dataType || "*").toLowerCase().match(G) || [""], null == l.crossDomain && (d = Nb.exec(l.url.toLowerCase()), l.crossDomain = !(!d || d[1] === Sb[1] && d[2] === Sb[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Sb[3] || ("http:" === Sb[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = n.param(l.data, l.traditional)), Ub(Ob, l, c, w), 2 === u) return w;
      i = n.event && l.global, i && 0 === n.active++ && n.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !Lb.test(l.type), f = l.url, l.hasContent || (l.data && (f = l.url += (Fb.test(f) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = Ib.test(f) ? f.replace(Ib, "$1_=" + Eb++) : f + (Fb.test(f) ? "&" : "?") + "_=" + Eb++)), l.ifModified && (n.lastModified[f] && w.setRequestHeader("If-Modified-Since", n.lastModified[f]), n.etag[f] && w.setRequestHeader("If-None-Match", n.etag[f])), (l.data && l.hasContent && l.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", l.contentType), w.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Qb + "; q=0.01" : "") : l.accepts["*"]);
      for (e in l.headers) w.setRequestHeader(e, l.headers[e]);
      if (l.beforeSend && (l.beforeSend.call(m, w, l) === !1 || 2 === u)) return w.abort();
      v = "abort";
      for (e in {
          success: 1,
          error: 1,
          complete: 1
        }) w[e](l[e]);
      if (j = Ub(Pb, l, c, w)) {
        if (w.readyState = 1, i && o.trigger("ajaxSend", [w, l]), 2 === u) return w;
        l.async && l.timeout > 0 && (h = a.setTimeout(function () {
          w.abort("timeout")
        }, l.timeout));
        try {
          u = 1, j.send(s, y)
        } catch (x) {
          if (!(2 > u)) throw x;
          y(-1, x)
        }
      } else y(-1, "No Transport");

      function y(b, c, d, e) {
        var k, s, t, v, x, y = c;
        2 !== u && (u = 2, h && a.clearTimeout(h), j = void 0, g = e || "", w.readyState = b > 0 ? 4 : 0, k = b >= 200 && 300 > b || 304 === b, d && (v = Wb(l, w, d)), v = Xb(l, v, w, k), k ? (l.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (n.lastModified[f] = x), x = w.getResponseHeader("etag"), x && (n.etag[f] = x)), 204 === b || "HEAD" === l.type ? y = "nocontent" : 304 === b ? y = "notmodified" : (y = v.state, s = v.data, t = v.error, k = !t)) : (t = y, !b && y || (y = "error", 0 > b && (b = 0))), w.status = b, w.statusText = (c || y) + "", k ? p.resolveWith(m, [s, y, w]) : p.rejectWith(m, [w, y, t]), w.statusCode(r), r = void 0, i && o.trigger(k ? "ajaxSuccess" : "ajaxError", [w, l, k ? s : t]), q.fireWith(m, [w, y]), i && (o.trigger("ajaxComplete", [w, l]), --n.active || n.event.trigger("ajaxStop")))
      }
      return w
    },
    getJSON: function (a, b, c) {
      return n.get(a, b, c, "json")
    },
    getScript: function (a, b) {
      return n.get(a, void 0, b, "script")
    }
  }), n.each(["get", "post"], function (a, b) {
    n[b] = function (a, c, d, e) {
      return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax(n.extend({
        url: a,
        type: b,
        dataType: e,
        data: c,
        success: d
      }, n.isPlainObject(a) && a))
    }
  }), n._evalUrl = function (a) {
    return n.ajax({
      url: a,
      type: "GET",
      dataType: "script",
      cache: !0,
      async: !1,
      global: !1,
      "throws": !0
    })
  }, n.fn.extend({
    wrapAll: function (a) {
      if (n.isFunction(a)) return this.each(function (b) {
        n(this).wrapAll(a.call(this, b))
      });
      if (this[0]) {
        var b = n(a, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
          var a = this;
          while (a.firstChild && 1 === a.firstChild.nodeType) a = a.firstChild;
          return a
        }).append(this)
      }
      return this
    },
    wrapInner: function (a) {
      return n.isFunction(a) ? this.each(function (b) {
        n(this).wrapInner(a.call(this, b))
      }) : this.each(function () {
        var b = n(this),
          c = b.contents();
        c.length ? c.wrapAll(a) : b.append(a)
      })
    },
    wrap: function (a) {
      var b = n.isFunction(a);
      return this.each(function (c) {
        n(this).wrapAll(b ? a.call(this, c) : a)
      })
    },
    unwrap: function () {
      return this.parent().each(function () {
        n.nodeName(this, "body") || n(this).replaceWith(this.childNodes)
      }).end()
    }
  });

  function Yb(a) {
    return a.style && a.style.display || n.css(a, "display")
  }

  function Zb(a) {
    if (!n.contains(a.ownerDocument || d, a)) return !0;
    while (a && 1 === a.nodeType) {
      if ("none" === Yb(a) || "hidden" === a.type) return !0;
      a = a.parentNode
    }
    return !1
  }
  n.expr.filters.hidden = function (a) {
    return l.reliableHiddenOffsets() ? a.offsetWidth <= 0 && a.offsetHeight <= 0 && !a.getClientRects().length : Zb(a)
  }, n.expr.filters.visible = function (a) {
    return !n.expr.filters.hidden(a)
  };
  var $b = /%20/g,
    _b = /\[\]$/,
    ac = /\r?\n/g,
    bc = /^(?:submit|button|image|reset|file)$/i,
    cc = /^(?:input|select|textarea|keygen)/i;

  function dc(a, b, c, d) {
    var e;
    if (n.isArray(b)) n.each(b, function (b, e) {
      c || _b.test(a) ? d(a, e) : dc(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
    });
    else if (c || "object" !== n.type(b)) d(a, b);
    else
      for (e in b) dc(a + "[" + e + "]", b[e], c, d)
  }
  n.param = function (a, b) {
    var c, d = [],
      e = function (a, b) {
        b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
      };
    if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a)) n.each(a, function () {
      e(this.name, this.value)
    });
    else
      for (c in a) dc(c, a[c], b, e);
    return d.join("&").replace($b, "+")
  }, n.fn.extend({
    serialize: function () {
      return n.param(this.serializeArray())
    },
    serializeArray: function () {
      return this.map(function () {
        var a = n.prop(this, "elements");
        return a ? n.makeArray(a) : this
      }).filter(function () {
        var a = this.type;
        return this.name && !n(this).is(":disabled") && cc.test(this.nodeName) && !bc.test(a) && (this.checked || !Z.test(a))
      }).map(function (a, b) {
        var c = n(this).val();
        return null == c ? null : n.isArray(c) ? n.map(c, function (a) {
          return {
            name: b.name,
            value: a.replace(ac, "\r\n")
          }
        }) : {
          name: b.name,
          value: c.replace(ac, "\r\n")
        }
      }).get()
    }
  }), n.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () {
    return this.isLocal ? ic() : d.documentMode > 8 ? hc() : /^(get|post|head|put|delete|options)$/i.test(this.type) && hc() || ic()
  } : hc;
  var ec = 0,
    fc = {},
    gc = n.ajaxSettings.xhr();
  a.attachEvent && a.attachEvent("onunload", function () {
    for (var a in fc) fc[a](void 0, !0)
  }), l.cors = !!gc && "withCredentials" in gc, gc = l.ajax = !!gc, gc && n.ajaxTransport(function (b) {
    if (!b.crossDomain || l.cors) {
      var c;
      return {
        send: function (d, e) {
          var f, g = b.xhr(),
            h = ++ec;
          if (g.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields)
            for (f in b.xhrFields) g[f] = b.xhrFields[f];
          b.mimeType && g.overrideMimeType && g.overrideMimeType(b.mimeType), b.crossDomain || d["X-Requested-With"] || (d["X-Requested-With"] = "XMLHttpRequest");
          for (f in d) void 0 !== d[f] && g.setRequestHeader(f, d[f] + "");
          g.send(b.hasContent && b.data || null), c = function (a, d) {
            var f, i, j;
            if (c && (d || 4 === g.readyState))
              if (delete fc[h], c = void 0, g.onreadystatechange = n.noop, d) 4 !== g.readyState && g.abort();
              else {
                j = {}, f = g.status, "string" == typeof g.responseText && (j.text = g.responseText);
                try {
                  i = g.statusText
                } catch (k) {
                  i = ""
                }
                f || !b.isLocal || b.crossDomain ? 1223 === f && (f = 204) : f = j.text ? 200 : 404
              } j && e(f, i, j, g.getAllResponseHeaders())
          }, b.async ? 4 === g.readyState ? a.setTimeout(c) : g.onreadystatechange = fc[h] = c : c()
        },
        abort: function () {
          c && c(void 0, !0)
        }
      }
    }
  });

  function hc() {
    try {
      return new a.XMLHttpRequest
    } catch (b) {}
  }

  function ic() {
    try {
      return new a.ActiveXObject("Microsoft.XMLHTTP")
    } catch (b) {}
  }
  n.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function (a) {
        return n.globalEval(a), a
      }
    }
  }), n.ajaxPrefilter("script", function (a) {
    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
  }), n.ajaxTransport("script", function (a) {
    if (a.crossDomain) {
      var b, c = d.head || n("head")[0] || d.documentElement;
      return {
        send: function (e, f) {
          b = d.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function (a, c) {
            (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || f(200, "success"))
          }, c.insertBefore(b, c.firstChild)
        },
        abort: function () {
          b && b.onload(void 0, !0)
        }
      }
    }
  });
  var jc = [],
    kc = /(=)\?(?=&|$)|\?\?/;
  n.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var a = jc.pop() || n.expando + "_" + Eb++;
      return this[a] = !0, a
    }
  }), n.ajaxPrefilter("json jsonp", function (b, c, d) {
    var e, f, g, h = b.jsonp !== !1 && (kc.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && kc.test(b.data) && "data");
    return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(kc, "$1" + e) : b.jsonp !== !1 && (b.url += (Fb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
      return g || n.error(e + " was not called"), g[0]
    }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
      g = arguments
    }, d.always(function () {
      void 0 === f ? n(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, jc.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0
    }), "script") : void 0
  }), n.parseHTML = function (a, b, c) {
    if (!a || "string" != typeof a) return null;
    "boolean" == typeof b && (c = b, b = !1), b = b || d;
    var e = x.exec(a),
      f = !c && [];
    return e ? [b.createElement(e[1])] : (e = ja([a], b, f), f && f.length && n(f).remove(), n.merge([], e.childNodes))
  };
  var lc = n.fn.load;
  n.fn.load = function (a, b, c) {
    if ("string" != typeof a && lc) return lc.apply(this, arguments);
    var d, e, f, g = this,
      h = a.indexOf(" ");
    return h > -1 && (d = n.trim(a.slice(h, a.length)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && n.ajax({
      url: a,
      type: e || "GET",
      dataType: "html",
      data: b
    }).done(function (a) {
      f = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a)
    }).always(c && function (a, b) {
      g.each(function () {
        c.apply(this, f || [a.responseText, b, a])
      })
    }), this
  }, n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
    n.fn[b] = function (a) {
      return this.on(b, a)
    }
  }), n.expr.filters.animated = function (a) {
    return n.grep(n.timers, function (b) {
      return a === b.elem
    }).length
  };

  function mc(a) {
    return n.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
  }
  n.offset = {
    setOffset: function (a, b, c) {
      var d, e, f, g, h, i, j, k = n.css(a, "position"),
        l = n(a),
        m = {};
      "static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && n.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, n.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
    }
  }, n.fn.extend({
    offset: function (a) {
      if (arguments.length) return void 0 === a ? this : this.each(function (b) {
        n.offset.setOffset(this, a, b)
      });
      var b, c, d = {
          top: 0,
          left: 0
        },
        e = this[0],
        f = e && e.ownerDocument;
      if (f) return b = f.documentElement, n.contains(b, e) ? ("undefined" != typeof e.getBoundingClientRect && (d = e.getBoundingClientRect()), c = mc(f), {
        top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
        left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
      }) : d
    },
    position: function () {
      if (this[0]) {
        var a, b, c = {
            top: 0,
            left: 0
          },
          d = this[0];
        return "fixed" === n.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], "html") || (c = a.offset()), c.top += n.css(a[0], "borderTopWidth", !0), c.left += n.css(a[0], "borderLeftWidth", !0)), {
          top: b.top - c.top - n.css(d, "marginTop", !0),
          left: b.left - c.left - n.css(d, "marginLeft", !0)
        }
      }
    },
    offsetParent: function () {
      return this.map(function () {
        var a = this.offsetParent;
        while (a && !n.nodeName(a, "html") && "static" === n.css(a, "position")) a = a.offsetParent;
        return a || Qa
      })
    }
  }), n.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (a, b) {
    var c = /Y/.test(b);
    n.fn[a] = function (d) {
      return Y(this, function (a, d, e) {
        var f = mc(a);
        return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(c ? n(f).scrollLeft() : e, c ? e : n(f).scrollTop()) : a[d] = e)
      }, a, d, arguments.length, null)
    }
  }), n.each(["top", "left"], function (a, b) {
    n.cssHooks[b] = Ua(l.pixelPosition, function (a, c) {
      return c ? (c = Sa(a, b), Oa.test(c) ? n(a).position()[b] + "px" : c) : void 0
    })
  }), n.each({
    Height: "height",
    Width: "width"
  }, function (a, b) {
    n.each({
      padding: "inner" + a,
      content: b,
      "": "outer" + a
    }, function (c, d) {
      n.fn[d] = function (d, e) {
        var f = arguments.length && (c || "boolean" != typeof d),
          g = c || (d === !0 || e === !0 ? "margin" : "border");
        return Y(this, function (b, c, d) {
          var e;
          return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g)
        }, b, f ? d : void 0, f, null)
      }
    })
  }), n.fn.extend({
    bind: function (a, b, c) {
      return this.on(a, null, b, c)
    },
    unbind: function (a, b) {
      return this.off(a, null, b)
    },
    delegate: function (a, b, c, d) {
      return this.on(b, a, c, d)
    },
    undelegate: function (a, b, c) {
      return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
    }
  }), n.fn.size = function () {
    return this.length
  }, n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
    return n
  });
  var nc = a.jQuery,
    oc = a.$;
  return n.noConflict = function (b) {
    return a.$ === n && (a.$ = oc), b && a.jQuery === n && (a.jQuery = nc), n
  }, b || (a.jQuery = a.$ = n), n
});

(function (V) {
  var E = V.fn.domManip,
    S = "_tmplitem",
    F = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
    U = {},
    Q = {},
    R, G = {
      key: 0,
      data: {}
    },
    N = 0,
    T = 0,
    K = [];

  function P(b, i, a, f) {
    var j = {
      data: f || (f === 0 || f === false) ? f : i ? i.data : {},
      _wrap: i ? i._wrap : null,
      tmpl: null,
      parent: i || null,
      nodes: [],
      calls: B,
      nest: z,
      wrap: y,
      html: A,
      update: C
    };
    b && V.extend(j, b, {
      nodes: [],
      parent: i
    });
    if (a) {
      j.tmpl = a;
      j._ctnt = j._ctnt || j.tmpl(V, j);
      j.key = ++N;
      (K.length ? Q : U)[N] = j
    }
    return j
  }
  V.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (a, b) {
    V.fn[a] = function (r) {
      var q = [],
        o = V(r),
        e, p, c, d, f = this.length === 1 && this[0].parentNode;
      R = U || {};
      if (f && f.nodeType === 11 && f.childNodes.length === 1 && o.length === 1) {
        o[b](this[0]);
        q = this
      } else {
        for (p = 0, c = o.length; p < c; p++) {
          T = p;
          e = (p > 0 ? this.clone(true) : this).get();
          V(o[p])[b](e);
          q = q.concat(e)
        }
        T = 0;
        q = this.pushStack(q, a, o.selector)
      }
      d = R;
      R = null;
      V.tmpl.complete(d);
      return q
    }
  });
  V.fn.extend({
    tmpl: function (e, f, a) {
      return V.tmpl(this[0], e, f, a)
    },
    tmplItem: function () {
      return V.tmplItem(this[0])
    },
    template: function (a) {
      return V.template(a, this[0])
    },
    domManip: function (p, a, b) {
      if (p[0] && V.isArray(p[0])) {
        var n = V.makeArray(arguments),
          l = p[0],
          c = l.length,
          e = 0,
          o;
        while (e < c && !(o = V.data(l[e++], "tmplItem"))) {}
        if (o && T) {
          n[2] = function (d) {
            V.tmpl.afterManip(this, d, b)
          }
        }
        E.apply(this, n)
      } else {
        E.apply(this, arguments)
      }
      T = 0;
      !R && V.tmpl.complete(U);
      return this
    }
  });
  V.extend({
    tmpl: function (j, f, g, l) {
      var b, a = !l;
      if (a) {
        l = G;
        j = V.template[j] || V.template(null, j);
        Q = {}
      } else {
        if (!j) {
          j = l.tmpl;
          U[l.key] = l;
          l.nodes = [];
          l.wrapped && I(l, l.wrapped);
          return V(M(l, null, l.tmpl(V, l)))
        }
      }
      if (!j) {
        return []
      }
      if (typeof f === "function") {
        f = f.call(l || {})
      }
      g && g.wrapped && I(g, g.wrapped);
      b = V.isArray(f) ? V.map(f, function (c) {
        return c ? P(g, l, j, c) : null
      }) : [P(g, l, j, f)];
      return a ? V(M(l, null, b)) : b
    },
    tmplItem: function (a) {
      var d;
      if (a instanceof V) {
        a = a[0]
      }
      while (a && a.nodeType === 1 && !(d = V.data(a, "tmplItem")) && (a = a.parentNode)) {}
      return d || G
    },
    template: function (d, a) {
      if (a) {
        if (typeof a === "string") {
          a = H(a)
        } else {
          if (a instanceof V) {
            a = a[0] || {}
          }
        }
        if (a.nodeType) {
          a = V.data(a, "tmpl") || V.data(a, "tmpl", H(a.innerHTML))
        }
        return typeof d === "string" ? (V.template[d] = a) : a
      }
      return d ? typeof d !== "string" ? V.template(null, d) : V.template[d] || V.template(null, F.test(d) ? d : V(d)) : null
    },
    encode: function (b) {
      return ("" + b).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
    }
  });
  V.extend(V.tmpl, {
    tag: {
      tmpl: {
        _default: {
          $2: "null"
        },
        open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
      },
      wrap: {
        _default: {
          $2: "null"
        },
        open: "$item.calls(__,$1,$2);__=[];",
        close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
      },
      each: {
        _default: {
          $2: "$index, $value"
        },
        open: "if($notnull_1){$.each($1a,function($2){with(this){",
        close: "}});}"
      },
      "if": {
        open: "if(($notnull_1) && $1a){",
        close: "}"
      },
      "else": {
        _default: {
          $1: "true"
        },
        open: "}else if(($notnull_1) && $1a){"
      },
      html: {
        open: "if($notnull_1){__.push($1a);}"
      },
      "=": {
        _default: {
          $1: "$data"
        },
        open: "if($notnull_1){__.push($.encode($1a));}"
      },
      "!": {
        open: ""
      }
    },
    complete: function () {
      U = {}
    },
    afterManip: function (c, a, h) {
      var g = a.nodeType === 11 ? V.makeArray(a.childNodes) : a.nodeType === 1 ? [a] : [];
      h.call(c, a);
      J(g);
      T++
    }
  });

  function M(i, d, h) {
    var a, j = h ? V.map(h, function (b) {
      return typeof b === "string" ? i.key ? b.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + S + '="' + i.key + '" $2') : b : M(b, i, b._ctnt)
    }) : i;
    if (d) {
      return j
    }
    j = j.join("");
    j.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function (b, l, g, k) {
      a = V(g).get();
      J(a);
      if (l) {
        a = L(l).concat(a)
      }
      if (k) {
        a = a.concat(L(k))
      }
    });
    return a ? a : L(j)
  }

  function L(d) {
    var a = document.createElement("div");
    a.innerHTML = d;
    return V.makeArray(a.childNodes)
  }

  function H(a) {
    return new Function("jQuery", "$item", "var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('" + V.trim(a).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function (h, n, o, r, w, v, u) {
      var p = V.tmpl.tag[o],
        q, t, s;
      if (!p) {
        throw "Unknown template tag: " + o
      }
      q = p._default || [];
      if (v && !/\w$/.test(w)) {
        w += v;
        v = ""
      }
      if (w) {
        w = O(w);
        u = u ? "," + O(u) + ")" : v ? ")" : "";
        t = v ? w.indexOf(".") > -1 ? w + O(v) : "(" + w + ").call($item" + u : w;
        s = v ? t : "(typeof(" + w + ")==='function'?(" + w + ").call($item):(" + w + "))"
      } else {
        s = t = q.$1 || "null"
      }
      r = O(r);
      return "');" + p[n ? "close" : "open"].split("$notnull_1").join(w ? "typeof(" + w + ")!=='undefined' && (" + w + ")!=null" : "true").split("$1a").join(s).split("$1").join(t).split("$2").join(r || q.$2 || "") + "__.push('"
    }) + "');}return __;")
  }

  function I(d, a) {
    d._wrap = M(d, true, V.isArray(a) ? a : [F.test(a) ? a : V(a).html()]).join("")
  }

  function O(b) {
    return b ? b.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
  }

  function D(c) {
    var d = document.createElement("div");
    d.appendChild(c.cloneNode(true));
    return d.innerHTML
  }

  function J(b) {
    var c = "_" + T,
      g, i, f = {},
      r, a, q;
    for (r = 0, a = b.length; r < a; r++) {
      if ((g = b[r]).nodeType !== 1) {
        continue
      }
      i = g.getElementsByTagName("*");
      for (q = i.length - 1; q >= 0; q--) {
        d(i[q])
      }
      d(g)
    }

    function d(s) {
      var v, t = s,
        n, u, l;
      if (l = s.getAttribute(S)) {
        while (t.parentNode && (t = t.parentNode).nodeType === 1 && !(v = t.getAttribute(S))) {}
        if (v !== l) {
          t = t.parentNode ? t.nodeType === 11 ? 0 : t.getAttribute(S) || 0 : 0;
          if (!(u = U[l])) {
            u = Q[l];
            u = P(u, U[t] || Q[t]);
            u.key = ++N;
            U[N] = u
          }
          T && w(l)
        }
        s.removeAttribute(S)
      } else {
        if (T && (u = V.data(s, "tmplItem"))) {
          w(u.key);
          U[u.key] = u;
          t = V.data(s.parentNode, "tmplItem");
          t = t ? t.key : 0
        }
      }
      if (u) {
        n = u;
        while (n && n.key != t) {
          n.nodes.push(s);
          n = n.parent
        }
        delete u._ctnt;
        delete u._wrap;
        V.data(s, "tmplItem", u)
      }

      function w(e) {
        e = e + c;
        u = f[e] = f[e] || P(u, U[u.parent.key + c] || u.parent)
      }
    }
  }

  function B(f, g, h, e) {
    if (!f) {
      return K.pop()
    }
    K.push({
      _: f,
      tmpl: g,
      item: this,
      data: h,
      options: e
    })
  }

  function z(e, f, a) {
    return V.tmpl(V.template(e), f, a, this)
  }

  function y(a, e) {
    var f = a.options || {};
    f.wrapped = e;
    return V.tmpl(V.template(a.tmpl), a.data, f, a.item)
  }

  function A(e, f) {
    var a = this._wrap;
    return V.map(V(V.isArray(a) ? a.join("") : a).filter(e || "*"), function (b) {
      return f ? b.innerText || b.textContent : b.outerHTML || D(b)
    })
  }

  function C() {
    var a = this.nodes;
    V.tmpl(null, null, null, this).insertBefore(a[0]);
    V(a).remove()
  }
})(jQuery);
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (b) {
  var d;
  if (typeof define === "function" && define.amd) {
    define(b);
    d = true
  }
  if (typeof exports === "object") {
    module.exports = b();
    d = true
  }
  if (!d) {
    var a = window.Cookies;
    var c = window.Cookies = b();
    c.noConflict = function () {
      window.Cookies = a;
      return c
    }
  }
}(function () {
  function b() {
    var f = 0;
    var c = {};
    for (; f < arguments.length; f++) {
      var d = arguments[f];
      for (var e in d) {
        c[e] = d[e]
      }
    }
    return c
  }

  function a(d) {
    function c(r, q, m) {
      if (typeof document === "undefined") {
        return
      }
      if (arguments.length > 1) {
        m = b({
          path: "/"
        }, c.defaults, m);
        if (typeof m.expires === "number") {
          m.expires = new Date(new Date() * 1 + m.expires + 5)
        }
        m.expires = m.expires ? m.expires.toUTCString() : "";
        try {
          var t = JSON.stringify(q);
          if (/^[\{\[]/.test(t)) {
            q = t
          }
        } catch (o) {}
        q = d.write ? d.write(q, r) : encodeURIComponent(String(q)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        r = encodeURIComponent(String(r)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
        var l = "";
        for (var p in m) {
          if (!m[p]) {
            continue
          }
          l += "; " + p;
          if (m[p] === true) {
            continue
          }
          l += "=" + m[p].split(";")[0]
        }
        return (document.cookie = r + "=" + q + l)
      }
      var j = {};
      var f = function (e) {
        return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
      };
      var s = document.cookie ? document.cookie.split("; ") : [];
      var n = 0;
      for (; n < s.length; n++) {
        var k = s[n].split("=");
        var h = k.slice(1).join("=");
        if (!this.json && h.charAt(0) === '"') {
          h = h.slice(1, -1)
        }
        try {
          var g = f(k[0]);
          h = (d.read || d)(h, g) || f(h);
          if (this.json) {
            try {
              h = JSON.parse(h)
            } catch (o) {}
          }
          j[g] = h;
          if (r === g) {
            break
          }
        } catch (o) {}
      }
      return r ? j[r] : j
    }
    c.set = c;
    c.get = function (e) {
      return c.call(c, e)
    };
    c.getJSON = function () {
      return c.apply({
        json: true
      }, arguments)
    };
    c.remove = function (f, e) {
      c(f, "", b(e, {
        expires: -1
      }))
    };
    c.defaults = {};
    c.withConverter = a;
    return c
  }
  return a(function () {})
}));
(function (c) {
  var b = c.ajax;
  c.ajax = function (d) {
    var e = d.success;
    d.success = function (g) {
      if (g && g.needLogin && (c("#main_left_side_id_js").length || /\/member\/perfect.html/.test(location.pathname))) {
        commonModule.showWindowLogin();
        return
      }
      e && e(g)
    };
    var f = d.error;
    d.error = function () {
      f && f()
    };
    return b(d)
  };
  var a = c.fn.load;
  c.fn.load = function () {
    if (arguments[0] && typeof arguments[0] == "string" && arguments[0].indexOf("/resources/template/") != -1) {
      arguments[0] = (commonModule.isSupportCORS ? (webSiteShareData.lcscStaticUrl) : "") + arguments[0] + "?v=" + webSiteShareData.commonVersion
    }
    return a.apply(this, arguments)
  }
})($);
var constantModule = {
  logoutPrompt: "是否要退出系统?",
  favTitle: "立创商城-专业电子元器件网络零售商城",
  collectPrompt: "收藏失败，您的浏览器不支持该方式收藏，请使用 <span style='color:#2e8ded'>Ctrl+D</span> 收藏立创商城网站。",
  setHomePrompt: "此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。",
  compareExistPrompt: "对比栏商品已存在",
  compareFullPrompt: "对比栏已满！",
  comparePrompt: "至少选择两种商品进行对比！",
  searchPrompt: "请输入型号或者产品相关信息进行搜索",
  errorPrompt: "系统繁忙，请联系客服人员或稍后再试！",
  emailPrompt: "请输入对方对方E-mail",
  txtPrompt: "请输入您的推荐附言",
  txtLimitPrompt: "附言字数不能大于200字",
  inputNamePrompt: "请输入您的姓名",
  inputNameLimitPrompt: "姓名不能大于20字",
  emailLimitPrompt: "每次最多可发 5 封邮件",
  emailErrorPrompt: "不是一个有效的邮箱地址，请更正。",
  sendSuccessPrompt: "您商品推荐邮件已成功发出。",
  sendErrorPrompt: "邮件发送失败，请检查您的输入信息。",
  sendNetErrorPrompt: "邮件发送失败，请稍候重试。",
  noLoginPrompt: "您还没有登录，不能进行此评分。是否现在登录？",
  consultedPrompt: "这条记录您已经评过分了，不允许重复评分。",
  consultFailPrompt: "评分失败，请稍候再试。",
  evaluateLoginPrompt: "您还没有登录，不能进行回复。是否现在登录？",
  priceErrorPrompt: "请输入正确的价格!",
  glPricePrompt: "第二个价格不能比第一个价格小!",
  selectMorePrompt: "至少需要勾选一项",
  noPriceChangePrompt: "当前商品没有价格变化！",
  conlectSuccessPrompt: "该商品已经成功添加到了您的收藏夹",
  conlectLoginPrompt: "您还没登录，请登录后再收藏。是否现在登录？",
  conlectExistedPrompt: "该商品已存在于您的收藏夹中，无需重复添加。",
  noticePhonePrompt: "请输入手机号码或邮箱！",
  noticeEmailErrorPrompt: "请输入正确的邮箱地址！",
  noticePhoneErrorPrompt: "请输入正确的联系手机号码！",
  noticeSuccessPrompt: "到货通知订阅成功！",
  noticeFailPrompt: "到货通知失败，请填正确的联系方式提交！",
  freeBanPrompt: "该商品没有空白开发板！",
  methodBanPrompt: "该商品没有方案验证板！",
  buyRecordPrompt: "该商品暂时没有购买记录",
  orderGoodsPrompt: "请选择是否需要订货",
  notBuyPrompt: "当前商品库存不足，不能添加到购物车，请选择其它商品下单。",
  addShoppingCartFail: "添加购物车超时，请稍候再试！",
  systemBusy: "系统繁忙，请联系客服人员或稍后再试！",
  validateLimitBuyTimeout: "验证限购超时，请稍后重试！",
  pleaseContactSystemUser: "请联系工作人员！",
  showedAll: "已显示所有搜索结果！",
  inputNumPrompt: "请填写购买数量！",
  gtTotal: "你要购买的数量大于库存量！",
  gtLimit: "购物车超出最大存储限制"
};
var searchModule = {
  liLength: Math.floor($(".sch_bd_catalog li").length / 2),
  stopkeywordAutoRefresh: false,
  calStartDate: Date.parse("2017-01-01 00:00:00"),
  keywordIndex: -1,
  searchCache: {},
  init: function () {
    searchModule.searchInit();
    if ($(".sch_bd_catalog li").length % 2 != 0) {
      $(".sch_bd_catalog li").last().remove()
    }
    $(".sch_bd_catalog li:gt(" + (searchModule.liLength - 1) + ")").hide();
    $(".sch_bd_catalog li:lt(" + searchModule.liLength + ")").show();
    $(".sch_search").click(function (a) {
      a.stopPropagation();
      $(".sch_bd01").parent().next().toggle()
    });
    $(".sch_bd_catalog").on("click", "li", function () {
      $(".sch_bd01").html($(this).attr("title"));
      $(".sch_bd01").attr("data-id", $(this).attr("data-id"));
      $(".sch_bd01").attr("title", $(this).attr("title"))
    });
    $(document).bind("click", function (a) {
      $(".sch_bd01").parent().next().hide();
      if (a.target.id != "search_input") {
        $("#search_list").hide()
      }
    });
    $(".sch .more_list").click(function (b) {
      b.stopPropagation();
      var a = $(".sch_bd_catalog li");
      if (a[0].style.display == "none") {
        $(".sch_bd_catalog li:gt(" + (searchModule.liLength - 1) + ")").hide();
        $(".sch_bd_catalog li:lt(" + searchModule.liLength + ")").show();
        $(this).children().css({
          backgroundPosition: "0 -90px"
        })
      } else {
        $(".sch_bd_catalog li:gt(" + (searchModule.liLength - 1) + ")").show();
        $(".sch_bd_catalog li:lt(" + searchModule.liLength + ")").hide();
        $(this).children().css({
          backgroundPosition: "0 -80px"
        })
      }
    });
    $(".sch_bd .sch_bd03").click(function () {
      searchModule.startGlobalSearch(0);
      var a = $(".search_input").val();
      var b = $(".search_input").index();
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        cp: "keyword_search",
        data: {
          op: "search",
          kw: a,
          no: b
        }
      })
    });
    $("#search_list").on("click", "li", function () {
      $("#search_input").val($(this).find(".search_word ").text());
      searchModule.startGlobalSearch(1);
      var a = $(".search_word").text();
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        data: {
          cp: "keyword_down_list",
          op: "search_list",
          kw: a
        }
      })
    });
    $("#search_list").on("click", "div", function () {
      $("#search_input").val($(this).find(".search_word ").text())
    });
    $("#search_list").on("mouseenter", "li", function () {
      $(this).addClass("active").siblings().removeClass("active");
      searchModule.keywordIndex = $(this).index();
      var a = $(".search_word").text();
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        data: {
          cp: "keyword_down_list",
          op: "search_list",
          kw: a
        }
      })
    });
    $("#search_input").on("keydown", function (c) {
      var b = $("#search_list li").length;
      if (b > 0 && !$("#search_list").is(":hidden")) {
        if (c.keyCode == 38) {
          searchModule.keywordIndex = searchModule.keywordIndex <= 0 ? 0 : searchModule.keywordIndex - 1;
          var f = $("#search_list li").eq(searchModule.keywordIndex);
          f.addClass("active").siblings().removeClass("active");
          $("#search_input").val(f.find(".search_word").text())
        } else {
          if (c.keyCode == 40) {
            searchModule.keywordIndex = searchModule.keywordIndex >= b - 1 ? b - 1 : searchModule.keywordIndex + 1;
            var f = $("#search_list li").eq(searchModule.keywordIndex);
            f.addClass("active").siblings().removeClass("active");
            $("#search_input").val(f.find(".search_word").text())
          }
        }
        var a = $(".search_input").val();
        var d = $(".search_input").index();
        commonModule.buriedPoint({
          pf: "pc",
          ty: "click",
          cp: "keyword_search",
          data: {
            op: "search",
            kw: a,
            no: d
          }
        })
      }
      if (c.keyCode == 13) {
        searchModule.startGlobalSearch(0);
        return false
      }
    });
    $("#search_input").on("focus", function (a) {
      searchModule.showHistoryList(this)
    });
    $("#search_list").on("click", ".history_record_search_del", function (c) {
      c.stopPropagation();
      var d = $(this).attr("delVal");
      var b = Cookies.get("searchHistoryRecord");
      var f = b.split("：");
      var a = [];
      $.each(f, function (e, g) {
        if (g != d) {
          a.push(g)
        }
      });
      Cookies.set("searchHistoryRecord", a.join("："), {
        domain: ".szlcsc.com",
        expires: 1000 * 60 * 60 * 24 * 30,
        path: "/"
      });
      $(this).closest("li").remove()
    });
    $("#search_list").on("click", ".history_record_search_del_all", function (a) {
      a.stopPropagation();
      Cookies.set("searchHistoryRecord", "", {
        domain: ".szlcsc.com",
        expires: 1000 * 60 * 60 * 24 * 30,
        path: "/"
      });
      $("#search_list").hide()
    });
    $(".sch .hot").on("click", ".hotNoHref", function () {
      $("#search_input").val($(this).text());
      searchModule.startGlobalSearch(0)
    });
    $(".sch .hot").on("click", "#keyWord", function () {
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        op: "hot",
        data: {
          cp: "hot",
          op: "search",
          kw: $(".keyWord").text()
        }
      })
    })
  },
  showHistoryList: function (b) {
    if ($(b).val() || !Cookies.get("searchHistoryRecord")) {
      return
    }
    var a = {
      searchList: []
    };
    $.each(Cookies.get("searchHistoryRecord").split("："), function (c, d) {
      a.searchList.push({
        word: d
      })
    });
    $("#search_list").show();
    $("#search_list").html("");
    $("#history_record_search_tmpl").tmpl(a).appendTo("#search_list")
  },
  keywordBold: function (e, d) {
    $("#search_list").show();
    $("#search_list").html("");
    e.lcscStaticUrl = webSiteShareData.lcscStaticUrl;
    e.domain = webSiteShareData.domain;
    e.lcscImageUrl = webSiteShareData.lcscImageUrl;
    e.lcscListUrl = webSiteShareData.lcscListUrl;
    $("#search_tmpl").tmpl(e).appendTo("#search_list");
    var b = $("#search_list .search_word");
    for (var a = 0; a < b.length; a++) {
      var c = $(b[a]).text().replace(d.toLowerCase(), "<b>" + d.toLowerCase() + "</b>");
      $(b[a]).html(c)
    }
  },
  searchInit: function () {
    var a = true;
    var c = "";
    var d = $("#search_input");
    var b = null;
    d.bind("keyup", function (h) {
      if (!d.val() && h.keyCode != 13) {
        searchModule.showHistoryList(this);
        return
      }
      if (h.keyCode == 38 || h.keyCode == 40 || h.keyCode == 13) {
        return
      }
      var g = $.trim(d.val());
      if (!g) {
        $("#search_list").hide().html("");
        c = "";
        return
      }
      if (g == c) {
        return
      }
      if (g.indexOf(c) == 0 && c != "") {
        if (!a) {
          return
        }
      }
      c = g;
      searchModule.keywordIndex = -1;
      if (g in searchModule.searchCache) {
        a = true;
        var f = {
          searchList: searchModule.searchCache[g]
        };
        searchModule.keywordBold(f, g);
        return
      }
      if (b) {
        clearTimeout(b)
      }
      b = setTimeout(function () {
        var e = "?keyword=" + encodeURI(encodeURI($.trim(d.val()))) + "&catalogId=";
        $.ajax({
          url: webSiteShareData.lcscSotipUrl + "/search/searchTip.html" + e,
          dataType: "jsonp",
          data: {},
          timeout: 3000,
          success: function (k) {
            if (k.length == 0) {
              $("#search_list").hide().html("");
              a = false
            } else {
              a = true;
              var o = {
                searchList: []
              };
              for (var m = 0, n = k.length; m < n; m++) {
                var p = {};
                for (var l in k[m]) {
                  p.word = k[m][l];
                  p.num = l
                }
                o.searchList.push(p)
              }
              if (!(g in searchModule.searchCache)) {
                searchModule.searchCache[g] = o.searchList
              }
              searchModule.keywordBold(o, g)
            }
          },
          error: function () {}
        })
      }, 300)
    })
  },
  replaceSpecialChar: function (b) {
    if (!(b && b != "")) {
      return ""
    }
    var c = new RegExp("'", "g");
    var a = $.trim(b);
    a = a.replace(c, " ");
    c = new RegExp('"', "g");
    a = a.replace(c, " ");
    c = new RegExp("‘", "g");
    a = a.replace(c, " ");
    c = new RegExp("“", "g");
    a = a.replace(c, " ");
    c = new RegExp("：", "g");
    a = a.replace(c, " ");
    return a
  },
  startGlobalSearch: function (g, b) {
    var l = "";
    if (g == 1) {
      l = "drop_box"
    }
    var i = $("#search_input");
    var e = searchModule.replaceSpecialChar($.trim(i.val()));
    if (e == "" && i.attr("placeholder") != "请输入型号或者产品相关信息...") {
      window.location.href = webSiteShareData.activityWebsite;
      return
    }
    if (e == "请输入型号或者产品相关信息...") {
      e = ""
    }
    if (e) {
      if (webSiteShareData.globleSearchNeedLogin == "true") {
        window.location.href = webSiteShareData.lcscCasUrl + "/login?service=" + document.location.href
      } else {
        if (g == 0) {
          window.name = JSON.stringify({
            ty: "click",
            op: "search",
            cp: commonModule.getBuriedPointCP ? commonModule.getBuriedPointCP() : "",
            data: {
              kw: e
            }
          })
        }
        if (g == 1) {
          window.name = JSON.stringify({
            ty: "click",
            op: "search_tip",
            cp: commonModule.getBuriedPointCP ? commonModule.getBuriedPointCP() : "",
            data: {
              kw: e,
              ix: searchModule.keywordIndex
            }
          })
        }
        var h = webSiteShareData.lcscSearchUrl;
        var c = document.getElementById("global-search-form");
        c.action = h + "/global.html";
        i.val(e);
        $("#hidden_search_input").val(encodeURI(e));
        $("#global_current_catalog").val($(".sch_bd .sch_bd01").attr("data-id"));
        if ($("#sellAbroad-tab").length && $("#sellAbroad-tab").hasClass("active")) {
          $("#isFormOverseas").removeAttr("disabled")
        } else {
          $("#isFormOverseas").attr("disabled", true)
        }
        var k = Cookies.get("searchHistoryRecord") || "";
        var j = k.split("：");
        var a = [];
        $.each(j, function (m, n) {
          if (n != e) {
            a.push(n)
          }
        });
        a.unshift(e.substring(0, 50));
        if (a.length > 8) {
          a.length = 8
        }
        Cookies.set("searchHistoryRecord", a.join("："), {
          domain: ".szlcsc.com",
          expires: 1000 * 60 * 60 * 24 * 30,
          path: "/"
        });
        c.submit()
      }
    } else {
      $("#search_input").css("background", "#ffe6c5");
      var f = 0;
      var d = setInterval(function () {
        if (f < 3) {
          if (f % 2 == 0) {
            $("#search_input").css("background", "#fff")
          } else {
            $("#search_input").css("background", "#ffe6c5")
          }
          f++
        } else {
          clearInterval(d)
        }
      }, 500)
    }
  },
};
searchModule.init();
var commonModule = {
  isImgLoad: false,
  isImgLoad_itemPDF: false,
  responseLoginMask: "",
  showLoginParams: [],
  browsePage: 2,
  onlineServiceQQ: "4000800709",
  buriedPointPid: -1,
  isSupportCORS: (function () {
    return "withCredentials" in new XMLHttpRequest()
  })(),
  init: function () {
    document.domain = "szlcsc.com";
    commonModule.buriedPointPid = commonModule.getUuid();
    if (window.Cookies) {
      if ("true" == Cookies.get("headMessageNotShow")) {
        $(".message").hide()
      } else {
        $(".message").show()
      }
      $("#dialog").on("click", function c() {
        $(".message").hide();
        Cookies.set("headMessageNotShow", true, {
          Domain: ".szlcsc.com"
        })
      });
      $("#banner_close").on("click", function c() {
        $(".advertising").hide();
        Cookies.set("AdvertisingNotShow", true, {
          Domain: ".szlcsc.com"
        })
      });
      if (Cookies.get("isShowRightUtils") == "yes" || !Cookies.get("isShowRightUtils")) {
        $(".right-utils .right-utils-item-needclose").removeClass("visibility-hidden")
      } else {
        $(".right-utils .right-utils-show-btn").removeClass("visibility-hidden")
      }
    }
    if (!webSiteShareData.indexFlag) {
      commonModule.navCatalogEvent()
    }
    $("#hint").on("click", "#ieShow", function () {
      commonModule.hideHint()
    });
    $("#hint").on("click", "#ieContinue", function () {
      commonModule.gotoVisit()
    });
    commonModule.checkPlaceholder();
    var b = commonModule.getOperCode() || "";
    $(window).load(function () {
      $("#common_tmpl_load_in_foot").load(webSiteShareData.domain + "/resources/template/commonTmpl.tmpl", function () {
        commonModule.ieTest()
      });
      var o = o || [];
      var h = document.createElement("script");
      h.src = "//hm.baidu.com/hm.js?e2986f4b6753d376004696a1628713d2";
      var p = document.getElementsByTagName("script")[document.getElementsByTagName("script").length - 1];
      p.parentNode.insertBefore(h, p);
      var f = document.createElement("script");
      var k = window.location.protocol.split(":")[0];
      if (k === "https") {
        f.src = "https://zz.bdstatic.com/linksubmit/push.js"
      } else {
        f.src = "http://push.zhanzhang.baidu.com/push.js"
      }
      var p = document.getElementsByTagName("script")[0];
      p.parentNode.insertBefore(f, p);
      $("#hiddenAutoLoginID").attr("src", $("#hiddenAutoLoginID").attr("data-src"));
      if (!Cookies.get("AdvertisingNotShow")) {
        $(".advertising").slideDown().css("display", "block")
      }
      var i = false;
      var n = $.getUrlParam("c");
      if (n && webSiteShareData.domain != "/member" && webSiteShareData.domain != "/cart" && !commonModule.isLogined()) {
        i = true;
        Cookies.set("cookies_save_operation_code_mark", n, {
          expires: 1000 * 60 * 60 * 24 * 10,
          domain: ".szlcsc.com",
          path: "/",
          secure: true,
          httpOnly: false
        })
      }
      var j = Cookies.get("customer_info");
      var m = j ? j.split(",") : [];
      if ((webSiteShareData.domain == "/www" || webSiteShareData.domain == "/list" || webSiteShareData.domain == "/op") && !(j && m.length == 4 && m[3] == "1") && Cookies.get("cookies_save_operation_code_mark")) {
        i = true
      }
      if (i) {
        var g = "/sale";
        if (webSiteShareData.domain == "/www" || webSiteShareData.domain == "/list" || webSiteShareData.domain == "/op") {
          g = webSiteShareData.lcscMemberUrl + g
        }
        $.ajax({
          type: "GET",
          url: g,
          dataType: "jsonp",
          timeout: 15000,
          success: function (q) {
            if (q.salesmanVO) {
              $("#forQQ").attr("qq", q.salesmanVO.qq).attr("title", "在线QQ咨询（" + q.salesmanVO.qq + "）");
              $(".forQQ-text").html(q.salesmanVO.qq);
              $(".hd .enter .er04").html("<b></b>" + q.salesmanVO.phoneNo);
              $("#kf_phone_n").html(q.salesmanVO.name);
              $("#kf_phone_p").html(q.salesmanVO.phoneNo);
              $("#dragon-boat-stopped").hide();
              if ($(".ser_txt .ser_txt03").length > 0) {
                $(".ser_txt .ser_txt02").html(q.salesmanVO.name);
                $(".ser_txt .ser_txt03 .span_phone").html(q.salesmanVO.phoneNo);
                $(".ser_txt .ser_txt03 .span_qq").html(q.salesmanVO.qq);
                $(".ser_txt .ser_txt03 #link_my").attr("param-click", q.salesmanVO.qq)
              }
            }
            if (q.complaintVO) {
              $("#complaint_phone_n").html(q.complaintVO.complaintName);
              $("#complaint_phone_p").html(q.complaintVO.complaintPhone)
            }
          }
        })
      }
      try {
        if (webSiteShareData.crossToken) {
          commonModule.loadScript(webSiteShareData.lcscCasUrl + "/js/jquery.jsonp.js", function () {
            commonModule.loadScript(webSiteShareData.lcscCasUrl + "/js/crossauth/cross_auth.js?20190314", function () {
              crossAuthLogin(webSiteShareData.jlcCasUrl + "/crossAuth", webSiteShareData.crossToken, 0, 5, webSiteShareData.lcscMemberUrl + "/portal/markFinishCrossAuth")
            })
          })
        } else {
          $.ajax({
            type: "GET",
            url: webSiteShareData.lcscMemberUrl + "/portal/getCrossAuth",
            dataType: "jsonp",
            timeout: 15000,
            success: function (q) {
              if (q.crossToken) {
                commonModule.loadScript(webSiteShareData.lcscCasUrl + "/js/jquery.jsonp.js", function () {
                  commonModule.loadScript(webSiteShareData.lcscCasUrl + "/js/crossauth/cross_auth.js?20190314", function () {
                    crossAuthLogin(webSiteShareData.jlcCasUrl + "/crossAuth", q.crossToken, 0, 5, webSiteShareData.lcscMemberUrl + "/portal/markFinishCrossAuth")
                  })
                })
              }
            }
          })
        }
      } catch (l) {}
    });
    if ((!webSiteShareData.isUserLogin && webSiteShareData.isUserLogin != "true") && webSiteShareData.domain != "/cart") {
      var e = Cookies.get("customer_info");
      var a = e ? e.split(",") : [];
      if (!(e && a.length == 4 && a[3] == "1")) {
        $("#shop .cart_icon2").text(a[0])
      }
    }
    $(window).on("scroll", function () {
      var j = document.documentElement.scrollTop || document.body.scrollTop;
      var i = $(".brand_list img");
      var f = $(".media_txt img");
      if (j > 220) {
        if (!commonModule.isImgLoad && f.length > 0 && webSiteShareData.indexFlag) {
          i.each(function (l, m) {
            $(m).attr("src", $(m).attr("data-src"))
          });
          f.each(function (l, m) {
            $(m).attr("src", $(m).attr("data-src"))
          });
          commonModule.isImgLoad = true
        }
        if (typeof webSiteShareDataList == "object" && webSiteShareDataList.detailsFlag && !commonModule.isImgLoad_itemPDF) {
          var k = $(window).height();
          var h = $("#pdf_view>div").length ? $("#pdf_view>div").position().top : 0;
          var g = h > 0 ? (h - j) < k : false;
          if (g) {
            $("#pdf_view .img-wrapper img").each(function (l, m) {
              $(m).attr("src", $(m).attr("data-src"))
            });
            commonModule.isImgLoad_itemPDF = true
          }
        }
        if ($(".logo_wraper")[0] && $(".logo_wraper")[0].className.indexOf("active") == -1) {
          $(".logo_wraper").css("top", "-120px").addClass("active").animate({
            top: 0
          })
        }
        if ($("#sellAbroad-tip").length && $("#shop_list").length) {}
      } else {
        $(".logo_wraper").removeClass("active")
      }
    });
    $(".banner_close").click(function (f) {
      f.preventDefault();
      $("#banner").hide()
    });
    $(".hd #center-wrapper-btn").mouseenter(function () {
      if (commonModule.member_list_slideDowning) {
        return
      }
      commonModule.member_list_slideDowning = true;
      $("#center-wrapper-btn .er01").addClass("active");
      $("#search_list").hide();
      $(".vip_border").addClass("border_hide");
      $("#center-wrapper-btn .member_list").slideDown(function () {
        commonModule.member_list_slideDowning = false
      })
    }).mouseleave(function () {
      if (commonModule.member_list_slideUping) {
        return
      }
      commonModule.member_list_slideUping = true;
      $("#center-wrapper-btn .er01").removeClass("active");
      $(".vip_border").removeClass("border_hide");
      $("#center-wrapper-btn .member_list").slideUp(function () {
        commonModule.member_list_slideUping = false
      })
    });
    $(".hd .er04").mouseenter(function () {
      $(this).addClass("active");
      $(".inlet").show()
    }).mouseleave(function () {
      $(this).removeClass("active");
      $(".inlet").hide()
    });
    $(".hd .inlet").mouseleave(function () {
      $(".er04").removeClass("active");
      $(this).hide()
    }).mouseenter(function () {
      $(this).show();
      $(".er04").addClass("active")
    });
    $(".hd .logout").click(function () {
      if (confirm("您确定要退出吗？")) {
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: webSiteShareData.jlcCasUrl + "/crossLogout?type=frontLogout",
          timeout: 3000,
          success: function (f) {},
          complete: function () {
            Cookies.set("isLoginCustomerFlag", "", {
              domain: ".szlcsc.com",
              path: "/"
            });
            var f = window.location.protocol + "//" + window.location.host;
            if (webSiteShareData.domain == "/www") {
              f = webSiteShareData.lcscMemberUrl
            }
            window.top.location.href = webSiteShareData.lcscCasUrl + "/logout?service=" + f + "/home/logout.html"
          }
        })
      }
    });
    $(".ass ul").mouseover(function (j) {
      $(".s-submnu").hide();
      var h = $(j.target).closest(".ass_list").children(".s-submnu"),
        g = $(".ass").height(),
        f = h.height(),
        i = $(".ass ul").children().index($(j.target).closest(".ass_list")) * $(".ass ul li").height();
      if (i > g - f) {
        h.show().css({
          top: g - f - 10 + "px"
        })
      } else {
        h.show().css({
          top: i + "px"
        })
      }
      $(".ass ul li").removeClass("active").children("p").show();
      $(j.target).closest(".ass_list").addClass("active").children("p").hide()
    }).mouseleave(function () {
      $(".s-submnu").hide()
    });
    $(".s-submnu").mouseleave(function () {
      $(this).hide()
    });
    $("#contrast").on("click", ".contrast_bt li", function (f) {
      $(".contrast_bt li").children().removeClass("hover");
      $(this).children().addClass("hover");
      if ($(this).children().html() == "对比栏") {
        commonModule.selectProductFromCookie()
      } else {
        commonModule.browsePage = 2;
        commonModule.rollProductBrowse()
      }
    });
    $("#contrast").on("click", ".contrast_h1 h1", function (f) {
      $(this).children(".contrast_xq").show()
    });
    $("#contrast").on("click", ".contrast_h1 ul li", function (f) {
      f.stopPropagation();
      $(this).closest("h1").children("span").html($(this).html());
      $(".contrast_h1 .contrast_xq").hide()
    });
    $("#contrast").on("mouseleave", ".contrast_h1 ul", function () {
      $(".contrast_h1 .contrast_xq").hide()
    });
    $("#contrast").on("click", ".lcsc_2015db_nr2_2", function () {
      var f = $(this).attr("product_param_id");
      commonModule.removeCompareProduct(f)
    });
    $("#contrast").on("click", ".contrast_btn a", function () {
      commonModule.removeAllCompareProduct()
    });
    $("#contrast").on("click", ".contrast_yc", function () {
      $("#contrast").hide()
    });
    $("#contrast").on("click", ".contrast_btn input", function () {
      commonModule.showCompareProductDetail()
    });
    $("#contrast").on("click", ".contrast_next,.contrast_pre", function () {
      commonModule.rollProductBrowse()
    });
    $("#contrast").on("click", ".lcsc_2015db_nr2_fd li", function () {
      var g = $(this).attr("id");
      var f = $(this).parent().attr("id");
      commonModule.showProductPriceList(f, g)
    });
    $(".right-utils .right-utils-item-hdb").click(function () {
      window.scrollTo(0, 0)
    });
    $(document).on("click", ".right-utils .right-utils-item-sq", function () {
      $(".right-utils .right-utils-item-needclose").addClass("visibility-hidden");
      $(".right-utils .right-utils-show-btn").removeClass("visibility-hidden");
      $(".right-utils .right-utils-item-hdb").css("border-radius", "0");
      Cookies.set("isShowRightUtils", "no", {
        domain: ".szlcsc.com",
        expires: 1000 * 60 * 60 * 24 * 30,
        path: "/"
      })
    });
    $(document).on("click", ".right-utils .right-utils-show-btn", function () {
      $(".right-utils .right-utils-item-needclose").removeClass("visibility-hidden");
      $(".right-utils .right-utils-show-btn").addClass("visibility-hidden");
      $(".right-utils .right-utils-item-hdb").css("border-radius", "0 0 3px 3px");
      Cookies.set("isShowRightUtils", "yes", {
        domain: ".szlcsc.com",
        expires: 1000 * 60 * 60 * 24 * 30,
        path: "/"
      })
    });
    $(".link ul li").click(function () {
      $(this).addClass("active").siblings().removeClass("active");
      if ($(this).index() == 0) {
        $(".member_site").show();
        $(".link_site").hide()
      } else {
        $(".link_site").show();
        $(".member_site").hide()
      }
    });
    $("#forQQ").click(function () {
      var g = new Array(1551433200, 1551488400);
      var f = Math.round(new Date() / 1000);
      if (g[0] < f && f < g[1]) {
        window.location.href = "https://www.szlcsc.com/news/12154.html"
      } else {
        commonModule._loadQQ("forQQ", $("#forQQ").attr("qq"))
      }
    });
    $("#QQ_contact").click(function () {
      commonModule._loadQQ("QQ_contact")
    });
    $(window).resize(function () {
      var g = $(window).width();
      if (g < 1200) {
        var f = $(".nav .sort");
        if (f && f.length > 0) {
          var h = f[0].offsetWidth;
          $(".ass div.s-submnu").css("left", h - 2 + "px")
        }
      } else {
        $(".ass div.s-submnu").css("left", "240px")
      }
    }).resize();
    $("#setLove").click(function () {
      commonModule.addFav()
    });
    $("#setHome").click(function () {
      commonModule.setHome(this)
    });
    $("#banner").click(function () {
      var f = $(this).attr("href");
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        cp: "top_header",
        data: {
          op: "top_banner",
          hf: f
        }
      })
    });
    $(".reg").on("click", "#login", function () {
      var f = $(this).attr("href");
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        cp: "top_header",
        data: {
          op: "login",
          hf: f
        }
      })
    });
    $(".reg").on("click", "#register", function () {
      var f = $(this).attr("href");
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        cp: "top_header",
        data: {
          op: "register",
          hf: f
        }
      })
    });
    $(".my_member").on("click", function () {
      var f = $(this).attr("href");
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        cp: "top_header",
        data: {
          op: "my_member",
          hf: f
        }
      })
    });
    $(".my_order").on("click", function () {
      d(this)
    });
    $(".my_collection").on("click", function () {
      d(this)
    });
    $(".complaints_sale").on("click", function () {
      d(this)
    });
    $(".my_discount_coupon").on("click", function () {
      d(this)
    });
    $(".prepaid_balance").on("click", function () {
      d(this)
    });
    $(".shipping_address").on("click", function () {
      d(this)
    });
    $(".my_message").on("click", function () {
      var f = $(this).attr("href");
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        cp: "top_header",
        data: {
          op: "message",
          hf: f
        }
      })
    });
    $(".steel_net").on("click", function () {
      var f = $(this).attr("href");
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        cp: "top_header",
        data: {
          op: "PBC_steel_net",
          hf: f
        }
      })
    });
    $(".global_website").on("click", function () {
      var f = $(this).attr("href");
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        cp: "top_header",
        data: {
          op: "global_website",
          hf: f
        }
      })
    });
    $(".phone").on("click", function () {
      var f = $(this).attr("href");
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        cp: "top_header",
        data: {
          op: "phone",
          hf: f
        }
      })
    });
    $(".lcsc").on("click", function () {
      var f = $(this).attr("href");
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        cp: "top_header",
        data: {
          op: "logo",
          hf: f
        }
      })
    });
    $(".cart_icon").on("click", function () {
      var f = $(this).attr("href");
      var g = window.location.href;
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        cp: "top_header",
        data: {
          op: "cart_icon",
          hf: f,
          current_href: g
        }
      })
    });
    $(".snav").on("click", "a", function () {
      var g = window.location.href;
      var h = $(this).text().trim();
      switch (h) {
        case "商城首页":
          var f = $(this).attr("href");
          commonModule.buriedPoint({
            pf: "pc",
            ty: "click",
            cp: "top_header",
            data: {
              op: "mall_homepage",
              hf: f
            }
          });
          break;
        case "商品目录":
          var f = $(this).attr("href");
          commonModule.buriedPoint({
            pf: "pc",
            ty: "click",
            cp: "top_header",
            data: {
              op: "product_catalogue",
              hf: f,
              current_href: g
            }
          });
          break;
        case "领券中心":
          var f = $(this).attr("href");
          commonModule.buriedPoint({
            pf: "pc",
            ty: "click",
            cp: "top_header",
            data: {
              op: "coupon_center",
              hf: f
            }
          });
          break;
        case "海外代购":
          var f = $(this).attr("href");
          commonModule.buriedPoint({
            pf: "pc",
            ty: "click",
            cp: "top_header",
            data: {
              op: "overseas_shopping",
              hf: f
            }
          });
          break;
        case "积分商城":
          var f = $(this).attr("href");
          commonModule.buriedPoint({
            pf: "pc",
            ty: "click",
            cp: "top_header",
            data: {
              op: "points_mall",
              hf: f
            }
          });
          break;
        case "免费入驻":
          var f = $(this).attr("href");
          commonModule.buriedPoint({
            pf: "pc",
            ty: "click",
            cp: "top_header",
            data: {
              op: "free_entry",
              hf: f
            }
          });
          break;
        case "BOM配单":
          var f = $(this).attr("href");
          commonModule.buriedPoint({
            pf: "pc",
            ty: "click",
            cp: "top_header",
            data: {
              op: "BOM_pairing",
              hf: f,
              current_href: g
            }
          });
          break
      }
    });
    $(".ass ul li").on("click", "a", function () {
      var f = $(this).attr("href");
      var g = window.location.href;
      var h = $(this).text();
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        cp: "top_header",
        data: {
          op: "top_banner",
          hf: f,
          current_href: g,
          sp: h
        }
      })
    });

    function d(g) {
      var f = $(g).attr("href");
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        cp: "top_header",
        data: {
          op: "my_member",
          hf: f
        }
      })
    }
    $(document).on("click", ".main_left a", function () {
      var f = $(this).attr("buriedPointOp");
      commonModule.buriedPoint({
        pf: "pc",
        ty: "click",
        cp: "member_centre",
        data: {
          op: f
        }
      })
    })
  },
  loadScript: function (b, c) {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.charset = "utf-8";
    if (a.readyState) {
      a.onreadystatechange = function () {
        if (a.readyState == "loaded" || a.readyState == "complete") {
          a.onreadystatechange = null;
          c()
        }
      }
    } else {
      a.onload = function () {
        c()
      }
    }
    a.src = b;
    document.getElementsByTagName("head")[0].appendChild(a)
  },
  alertFail: function (a, b) {
    $(".mask_alert").show();
    $(".commonAlertFailTipTmpl").show();
    $(".commonAlertFailTipTmpl .common_confirm_del_content_txt").html(a);
    $(".commonAlertFailTipTmpl .common_confirm_a").off("click");
    $(".commonAlertFailTipTmpl .common_confirm_del_close").off("click");
    $(".commonAlertFailTipTmpl .common_confirm_a").on("click", function () {
      if (b) {
        b()
      }
      $(".mask_alert").hide();
      $(".commonAlertFailTipTmpl").hide()
    });
    $(".commonAlertFailTipTmpl .common_confirm_del_close").on("click", function () {
      $(".mask_alert").hide();
      $(".commonAlertFailTipTmpl").hide()
    })
  },
  alertSuccess: function (a, c, b) {
    $(".mask_alert").show();
    $(".commonAlertSuccessTipTmpl").show();
    $(".commonAlertSuccessTipTmpl .common_confirm_del_content_txt").html(a);
    $(".commonAlertSuccessTipTmpl .common_confirm_a").off("click");
    $(".commonAlertSuccessTipTmpl .common_confirm_del_close").off("click");
    $(".commonAlertSuccessTipTmpl .common_confirm_a").on("click", function () {
      if (c) {
        c()
      }
      $(".mask_alert").hide();
      $(".commonAlertSuccessTipTmpl").hide()
    });
    $(".commonAlertSuccessTipTmpl .common_confirm_del_close").on("click", function () {
      if (b) {
        b()
      }
      $(".mask_alert").hide();
      $(".commonAlertSuccessTipTmpl").hide()
    })
  },
  commonConfirm: function (a, c, b) {
    $(".mask_alert").show();
    $(".commonConfirmDeleteTmpl").show();
    $(".commonConfirmDeleteTmpl .common_confirm_del_content_txt").html(a);
    $(".commonConfirmDeleteTmpl .common_cancel_a").off("click");
    $(".commonConfirmDeleteTmpl .common_confirm_a").off("click");
    $(".commonConfirmDeleteTmpl .common_confirm_del_close").off("click");
    $(".commonConfirmDeleteTmpl input").on("click", function () {
      if (this.value == "确定") {
        if (c) {
          c()
        }
      } else {
        if (b) {
          b()
        }
      }
      $(".mask_alert").hide();
      $(".commonConfirmDeleteTmpl").hide()
    });
    $(".commonConfirmDeleteTmpl .common_confirm_del_close").on("click", function () {
      if (b) {
        b()
      }
      $(".mask_alert").hide();
      $(".commonConfirmDeleteTmpl").hide()
    })
  },
  successTip: function (b) {
    var c = "success_tip" + new Date().getTime();
    var a = '<div id="' + c + '" class="success_tip"><div class="icon"></div><span>' + b + "</span></div>";
    $("body").append(a);
    $("#" + c).fadeIn();
    setTimeout(function () {
      $("#" + c).fadeOut();
      $("#" + c).remove()
    }, 5000)
  },
  failTip: function (b) {
    var c = "fail_tip" + new Date().getTime();
    var a = '<div id="' + c + '" class="fail_tip"><div class="icon"></div><span>' + b + "</span></div>";
    $("body").append(a);
    $("#" + c).fadeIn();
    setTimeout(function () {
      $("#" + c).fadeOut();
      $("#" + c).remove()
    }, 5000)
  },
  autoRefreshLoginInfo: function (b, j, l, m, c, g, a, f, p, o, n, d, i) {
    if (webSiteShareData.indexFlag == "yes") {
      floatAdverAnimate && floatAdverAnimate()
    }
    hasSubtractionDiscount && hasSubtractionDiscount();
    if (webSiteShareData.indexFlag == "yes" && $(".zhong-qiu-hd").length && (n == "0920" || n == "1001")) {
      $(".mask").show();
      $(".zhong-qiu-hd-" + n).attr("href", d).show();
      $(".zhong-qiu-hd-close").show()
    }
    var h = "";
    var e = "";
    var k = "";
    if (b == null || b == "") {
      return
    }
    if (j != undefined && j != null && j != "null" && j != "") {
      if (j.length <= 7) {
        k = j
      } else {
        k = j.slice(0, 6) + "..."
      }
      e = k + "(" + b + ")";
      h = j
    } else {
      k = b;
      e = b;
      h = b
    }
    if (!Cookies.get("isLoginCustomerFlag")) {
      Cookies.set("isLoginCustomerFlag", b, {
        domain: ".szlcsc.com",
        path: "/"
      });
      commonModule.buriedPoint({
        ty: "login",
        data: Cookies.get("noLoginCustomerFlag")
      });
      Cookies.set("noLoginCustomerFlag", "", {
        domain: ".szlcsc.com",
        path: "/"
      })
    }
    $("#custom").show().text(e);
    $("#custom").attr("title", b);
    $("#login").hide();
    $("#register").hide();
    $(".member_list dt").hide();
    $(".logout").show();
    $(".reg span").text("您好，");
    if (webSiteShareData.indexFlag) {
      $(".hello .index_center").css("marginLeft", "15px");
      $(".hello ul").eq(0).hide();
      $(".hello ul").eq(1).show();
      $(".hello ul").eq(1).children().eq(0).children("a").text(k);
      $(".index_center").css("marginTop", "18px");
      $("#coupon_number_for_index").text("(" + l + ")");
      if (typeof indexShuang11couponsDivShow != "undefined") {
        indexShuang11couponsDivShow()
      }
    }
    if (parseInt(c) >= 0 && parseInt(c) <= 99) {
      $(".enter .dope").html(c).css("color", "#f00")
    } else {
      if (parseInt(c) > 99) {
        $(".enter .dope").html("99+").css("color", "#f00")
      }
    }
    if (webSiteShareData.domain != "/cart") {
      $("#shop .cart_icon2").text(m)
    } else {
      if ($("#no_pro_login").length) {
        cartModuleLoadCartList && cartModuleLoadCartList()
      }
    }
    if (webSiteShareData.isUserLogin != "true" && $("body").attr("data-page") == "all-coupon-page") {
      allCouponsAsyncLoad && allCouponsAsyncLoad()
    }
    if (g) {
      $(".hd .enter .er04").html("<b></b>" + a);
      $("#forQQ").attr("qq", f).attr("title", "在线QQ咨询（" + f + "）");
      $(".forQQ-text").html(f);
      $("#kf_phone_n").html(g);
      $("#kf_phone_p").html(a);
      $("#dragon-boat-stopped").hide();
      if ($(".ser_txt .ser_txt03").length > 0) {
        $(".ser_txt .ser_txt02").html(g);
        $(".ser_txt .ser_txt03 .span_phone").html(a);
        $(".ser_txt .ser_txt03 .span_qq").html(f);
        $(".ser_txt .ser_txt03 #link_my").attr("param-click", f)
      }
    }
    if (p) {
      $("#complaint_phone_n").html(p);
      $("#complaint_phone_p").html(o)
    }
    if (i == "yes") {
      $.ajax({
        type: "GET",
        url: webSiteShareData.lcscActivityUrl + "/newcustomer/coupon/insert",
        dataType: "jsonp",
        timeout: 15000,
        success: function (q) {}
      })
    }
  },
  checkPlaceholder: function () {
    var a = "placeholder" in document.createElement("input");
    if (!a) {
      $("input").each(function (b, c) {
        if ($(c).attr("type") == "text" && $(c).attr("placeholder")) {
          var d = $(c).clone();
          d.removeAttr("name");
          $(c).hide();
          d.insertAfter($(c));
          d.addClass("placehd");
          if (!d.val()) {
            d.val(d.attr("placeholder"))
          }
          d.focus(function () {
            if (d.val() == d.attr("placeholder")) {
              d.val("")
            }
          });
          d.blur(function () {
            $(c).val(d.val());
            if (!d.val()) {
              d.val(d.attr("placeholder"))
            }
          })
        }
      })
    }
  },
  addFav: function () {
    var a = window.location.origin;
    if (document.all) {
      try {
        window.external.addFavorite(a, constantModule.favTitle)
      } catch (b) {
        commonModule.alertFail(constantModule.collectPrompt)
      }
    } else {
      if (window.sidebar) {
        window.sidebar.addPanel(constantModule.favTitle, a, "")
      } else {
        commonModule.alertFail(constantModule.collectPrompt)
      }
    }
  },
  setHome: function (d) {
    var b = window.location.origin;
    try {
      d.style.behavior = "url(#default#homepage)";
      d.setHomePage(b)
    } catch (c) {
      if (window.netscape) {
        try {
          netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
        } catch (c) {
          commonModule.alertFail(constantModule.setHomePrompt)
        }
        var a = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        a.setCharPref("browser.startup.homepage", b)
      }
    }
  },
  _loadQQ: function (h, e) {
    if (e == "2355775601") {
      e = "4000800709"
    }
    var i = webSiteShareData.lcscQqUrl + "/onlineQQ.html?" + (e || commonModule.onlineServiceQQ);
    var c = true;
    if (e == "2852512828") {
      i = "http://q.url.cn/CD7o8O?_type=wpa&qidian=true"
    } else {
      if (e == "2852370705") {
        i = "http://q.url.cn/ABZSGn?_type=wpa&qidian=true"
      } else {
        if (e == "800822815") {
          i = "http://q.url.cn/ABSL8o?_type=wpa&qidian=true"
        } else {
          if (e == "800850981") {
            i = "http://q.url.cn/CDT7Xo?_type=wpa&qidian=true"
          } else {
            if (e == "800822581") {
              i = "http://q.url.cn/abQY2o?_type=wpa&qidian=true"
            } else {
              if (e == "800821892") {
                i = "http://q.url.cn/cdGFBe?_type=wpa&qidian=true"
              } else {
                if (e == "800821856") {
                  i = "http://q.url.cn/ABfRqo?_type=wpa&qidian=true"
                } else {
                  if (e == "800135182") {
                    i = "http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDEzNTE4Ml80ODQxNzlfODAwMTM1MTgyXzJf";
                    c = false
                  } else {
                    if (e == "800135180") {
                      i = "http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDEzNTE4MF80ODQxNzVfODAwMTM1MTgwXzJf";
                      c = false
                    } else {
                      if (e == "800156618") {
                        i = "http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDE1NjYxOF80ODQxNzZfODAwMTU2NjE4XzJf";
                        c = false
                      } else {
                        if (e == "800135181") {
                          i = "http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDEzNTE4MV80ODQxNzNfODAwMTM1MTgxXzJf";
                          c = false
                        } else {
                          if (e == "800136682") {
                            i = "http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDEzNjY4Ml80ODQyMDRfODAwMTM2NjgyXzJf";
                            c = false
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    var b = "qqWindow";
    var a = 300;
    var d = 500;
    if (c) {
      a = 595;
      d = 740
    }
    var f = (window.screen.height - 30 - a) / 2;
    var g = (window.screen.width - 10 - d) / 2;
    window.open(i, b, "height=" + a + ",innerHeight=" + a + ",width=" + d + ",innerWidth=" + d + ",top=" + f + ",left=" + g + ",toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no")
  },
  addProductToCompare: function (c, a) {
    var b = webSiteShareData.lcscSearchUrl + "/compare/product/add?productId=" + c;
    $.ajax({
      type: "GET",
      url: b,
      dataType: "jsonp",
      timeout: 15000,
      success: function (d) {
        commonModule.selectProductFromCookie(a);
        switch (d.check_result) {
          case "existed":
            commonModule.alertFail(constantModule.compareExistPrompt);
            break;
          case "fail":
            commonModule.alertFail(constantModule.compareFullPrompt);
            break;
          default:
        }
      }
    })
  },
  selectProductFromCookie: function (a) {
    var b = Cookies.get("product_compare_bid");
    var c = Cookies.get("product_compare");
    if (!c && b) {
      Cookies.set("product_compare_bid", "", {
        domain: ".szlcsc.com",
        path: "/"
      })
    }
    if (c && !b) {
      Cookies.set("product_compare_bid", commonModule.getUuid(), {
        domain: ".szlcsc.com",
        path: "/"
      })
    }
    if (a) {
      a()
    }
    var d = webSiteShareData.lcscSearchUrl + "/compare/product/get";
    $.ajax({
      type: "GET",
      url: d,
      dataType: "jsonp",
      timeout: 15000,
      success: function (g) {
        var f = {
          lcscMallUrl: webSiteShareData.lcscOldMallUrl,
          isHistory: false,
          id: "product_compare_list_div"
        };
        $("#contrast").html("");
        $("#contrast").show();
        $("#contrastTmpl").tmpl(f).appendTo("#contrast");
        $("#product_compare_list_div").addClass("lcsc_2015db_nr2");
        var e = "";
        $.each(g, function (k, j) {
          if (j.productId != -1) {
            var m = parseInt(j.convesionRatio);
            e += '<dl style="position: relative;';
            if (k == 2) {
              e += "border-right: medium none;"
            }
            e += '"><dt><a href="' + webSiteShareData.lcscItemUrl + "/" + j.productId + '.html" target="_blank">';
            if (null != j.breviaryImageUrl && $.trim(j.breviaryImageUrl) != "") {
              e += '<img src="' + j.breviaryImageUrl + '" />'
            } else {
              e += '<img src="' + webSiteShareData.lcscStaticUrl + webSiteShareData.domain + '/resources/images/no_goods_pic_big.png" />'
            }
            e += '</a></dt><dd class="lfy_btg"><a href="' + webSiteShareData.lcscItemUrl + "/" + j.productId + '.html" productId= ' + j.productId + ' target="_blank" class="lcsc_2015db_nr2_1">' + $.trim(j.productName) + "</a>";
            e += '<a href="javaScript:void(0);"';
            e += "";
            e += ' class="lcsc_2015db_nr2_2" product_param_id="' + j.productId + '">删除</a></dd>';
            e += '<dd class="lfy_btg"><b>' + j.productModel + "</b></dd>";
            e += '<dd><div class="lcsc_2015db_nr2_3" style="float: left;"><div class="lcsc_2015db_nr2_fd">';
            e += '<ul id="price_ul_browse_' + k + '">';
            var n = 0;
            var l = j.productPriceList.length;
            var h = false;
            if (j.productMinEncapsulationUnit != "" && j.productMinEncapsulationNumber > 0) {
              if ((j.productMinEncapsulationNumber % m) == 0 && (j.productMinEncapsulationNumber > m)) {
                h = true
              }
            }
            $.each(j.productPriceList, function (w, y) {
              var x = parseInt(y.startPurchasedNumber);
              var o = parseInt(y.endPurchasedNumber);
              var z = parseFloat(y.productPrice);
              var A = parseFloat(z);
              var t = parseFloat(z);
              var p = false;
              var i = 0;
              var v = j.limitNumberPrice > A;
              var u = false;
              var s = false;
              var r = "";
              var q = 0;
              e += '<li id="price_li_browse_' + k + "_" + w + '"';
              if (w < (l - 1)) {
                e += 'style="display:none;cursor: default;"'
              } else {
                if (l > 1) {
                  e += 'style="background:url(' + webSiteShareData.lcscStaticUrl + webSiteShareData.domain + '/resources/images/jlc_2015db_xs.gif) no-repeat right;"'
                }
              }
              e += 'onclick="showProductPriceList("price_ul_browse_' + k + '","price_li_browse_' + k + "_" + w + '")"> ';
              if (l < 2) {
                e += '<b style="color: #ff7800; font-weight: bold">￥' + A + " / " + j.productUnit + "</b>&nbsp;"
              } else {
                if (o == -1) {
                  if (j.productMinEncapsulationUnit != "" && j.productMinEncapsulationNumber > 0) {
                    p = true;
                    i = t * j.productMinEncapsulationNumber;
                    s = true;
                    e += '<span class="bubbleInfo1">';
                    r = j.productMinEncapsulationUnit;
                    q = i.toFixed(2);
                    u = j.limitNumberEncapPrice > q
                  }
                  e += '<span class="trigger1" style="cursor: pointer;display: inline-block;width: 70px;text-align: right;">';
                  if (u && v && x * m >= j.productMinEncapsulationNumber && h) {
                    n = parseInt(x * m / j.productMinEncapsulationNumber);
                    if (x * m % parseInt(j.productMinEncapsulationNumber) > 0) {
                      n = n + 1
                    }
                    if (j.productMinEncapsulationUnit != "-") {
                      e += n + "+："
                    } else {
                      e += x * m + "+："
                    }
                  } else {
                    e += x * m + "+："
                  }
                  e += "</span>"
                } else {
                  if (j.productMinEncapsulationUnit != "" && j.productMinEncapsulationNumber > 0) {
                    if (j.productMinEncapsulationNumber <= o * m) {
                      p = true;
                      i = t * j.productMinEncapsulationNumber;
                      u = j.limitNumberEncapPrice > i.toFixed(2)
                    }
                  }
                  e += '<span class="trigger1" style="cursor: pointer;display: inline-block;width: 70px;text-align: right;">';
                  if (u && v && x * m >= j.productMinEncapsulationNumber && h) {
                    n = parseInt(x * m / j.productMinEncapsulationNumber);
                    if (x * m % parseInt(j.productMinEncapsulationNumber) > 0) {
                      n = n + 1
                    }
                    e += n + "+："
                  } else {
                    e += x * m + "+："
                  }
                  if (u && v && o * m >= j.productMinEncapsulationNumber && h) {
                    n = parseInt(x * m / j.productMinEncapsulationNumber);
                    if (x * m % parseInt(j.productMinEncapsulationNumber) > 0) {
                      n = n + 1
                    }
                    if (j.productMinEncapsulationUnit != "-") {} else {}
                  } else {}
                  e += "</span>"
                }
                if (p) {
                  e += '<span class="bubbleInfo">';
                  e += '<span class="trigger" style="cursor: pointer; color: #ff7900; font-weight: bold;" title="折合1' + j.productMinEncapsulationUnit + "(" + j.productMinEncapsulationNumber + j.productUnit + ")" + i.toFixed(2) + '元">￥' + A + "</span>";
                  e += "</span>"
                } else {
                  e += '<span class="STYLE10">￥' + A + "</span>"
                }
              }
              e += "</li>"
            });
            e += "</ul></div></div></dd></dl>"
          } else {
            e += '<dl class="lcsc_2015db_nr2_4"><dt><b>' + (k + 1) + "</b></dt>";
            e += "<dd>你还可以继续添加</dd></dl>"
          }
        });
        $("#product_compare_list_div").html(e);
        $(".lcsc_2015db_nr2_2").attr("onclick", null);
        $(".lcsc_2015db_nr2_fd li").attr("onclick", null)
      },
      error: function () {}
    })
  },
  removeCompareProduct: function (a) {
    var b = webSiteShareData.lcscSearchUrl + "/compare/product/remove?productId=" + a;
    $.ajax({
      type: "GET",
      url: b,
      dataType: "jsonp",
      timeout: 15000,
      success: function (c) {
        commonModule.selectProductFromCookie()
      }
    })
  },
  removeAllCompareProduct: function () {
    var a = webSiteShareData.lcscSearchUrl + "/compare/product/removeAll";
    $.ajax({
      type: "GET",
      url: a,
      dataType: "jsonp",
      timeout: 15000,
      success: function (b) {
        commonModule.selectProductFromCookie()
      }
    })
  },
  showCompareProductDetail: function () {
    var c = $(".contrast_cp .lcsc_2015db_nr2_4").size();
    if (c >= 2) {
      commonModule.alertFail(constantModule.comparePrompt);
      return
    }
    var d = window.open();
    var a = webSiteShareData.lcscSearchUrl + "/compare/product/check";
    $.ajax({
      type: "GET",
      url: a,
      dataType: "jsonp",
      timeout: 15000,
      success: function (g) {
        var b = g.check_result;
        if (b == "fail") {
          commonModule.alertFail(constantModule.comparePrompt)
        } else {
          d.location.href = webSiteShareData.lcscSearchUrl + "/compare/product/detail.html"
        }
      }
    });
    commonModule.buriedPoint({
      ty: "click",
      op: "compare",
      data: {
        pc: Cookies.get("product_compare"),
        bi: Cookies.get("product_compare_bid")
      }
    })
  },
  rollProductBrowse: function () {
    if (commonModule.browsePage == 1) {
      commonModule.browsePage = 2
    } else {
      commonModule.browsePage = 1
    }
    var a = webSiteShareData.lcscOldMallUrl + "/order/OrderCommonAction!clickRollProductToBrowse.action";
    $.ajax({
      type: "POST",
      url: a,
      dataType: "html",
      async: false,
      data: {
        browsePage: commonModule.browsePage
      },
      success: function (c) {
        var b = {
          lcscMallUrl: webSiteShareData.lcscOldMallUrl,
          isHistory: true,
          id: "product_compare_list_div1"
        };
        $("#contrast").html("");
        $("#contrast").show();
        $("#contrastTmpl").tmpl(b).appendTo("#contrast");
        $(".contrast_bt li").eq(0).children().removeClass("hover");
        $(".contrast_bt li").eq(1).children().addClass("hover");
        $("#product_compare_list_div1").html(c);
        $("#product_compare_list_div1").addClass("lcsc_2015ll_nr");
        $(".lcsc_2015_lbdb1").attr("onmousemove", null);
        $(".lcsc_2015_lbdb1").attr("onmouseout", null);
        $(".lcsc_2015_lbdb1").attr("onclick", null);
        $(".lcsc_2015db_nr2_fd li").attr("onclick", null)
      }
    })
  },
  showProductPriceList: function (c, b) {
    var a = $("#" + c).find("li");
    if (a.size() > 1) {
      a.each(function (d) {
        a.eq(d).toggle()
      });
      $("#" + b).show()
    }
    $("#" + c).mouseleave(function () {
      commonModule.hideProductPriceList(c, b)
    })
  },
  hideProductPriceList: function (c, b) {
    if (c != "") {
      var a = $("#" + c).find("li");
      if (a.size() > 1) {
        a.each(function (d) {
          a.eq(d).hide()
        })
      }
      if (b != "") {
        $("#" + b).show()
      } else {
        a.eq(a.size() - 1).show()
      }
    }
  },
  hideHint: function () {
    var a = "/hideHint?hideHint=cookie";
    if (webSiteShareData.domain == "/www") {
      a = webSiteShareData.lcscMemberUrl + a
    }
    $.ajax({
      type: "GET",
      url: a,
      dataType: "jsonp",
      timeout: 15000,
      success: function (b) {},
      error: function () {
        commonModule.alertFail(constantModule.errorPrompt)
      }
    });
    $("#hint").css("display", "none")
  },
  gotoVisit: function () {
    var a = "/hideHint?hideHint=session";
    if (webSiteShareData.domain == "/www" || webSiteShareData.domain == "/list" || webSiteShareData.domain == "/item" || webSiteShareData.domain == "/bom") {
      a = webSiteShareData.lcscMemberUrl + a
    }
    $.ajax({
      type: "GET",
      url: a,
      dataType: "jsonp",
      timeout: 15000,
      success: function (b) {},
      error: function () {
        commonModule.alertFail(constantModule.errorPrompt)
      }
    });
    $("#hint").css("display", "none")
  },
  ieTest: function () {
    var b = window.navigator.userAgent.toLowerCase();
    if (b.indexOf("msie") >= 0) {
      var a = b.match(/msie ([\d.]+)/)[1];
      if (a < 9) {
        $("#giveUpIe8TipsDiv").show()
      }
    }
  },
  isRightTaxNumber: function (c) {
    var h = $.trim(c);
    var f = h.length;
    var b = /^(\d{6}[0-9A-Z]+)|(\d{1}[A-Z]{1}\d{6}[0-9A-Z]+)|([A-Z]{1}\d{6}[0-9A-Z]+)|([A-Z]{2}\d{6}[0-9A-Z]+)$/;
    var d = /^(\d{15}[0-9A-Z]+)|([A-Z]{1}\d{15}[0-9A-Z]+)$/;
    if (f == 15) {
      if (/\d{15}/.test(h)) {
        return true
      }
      if (/.*[A-Z]./.test(h) && /.*\d.*/.test(h)) {
        return true
      }
    } else {
      if (f == 18) {
        return b.test(h)
      } else {
        if (f == 20) {
          if (d.test(h)) {
            return true
          }
          var e = h.substring(0, 6);
          if (!/^\d*$/.test(e)) {
            return false
          }
          var a = h.substring(6, 15);
          var g = h.substring(6, f);
          if (/.*[A-Z].*/.test(a)) {
            return !/.*[IOSZ].*/.test(g)
          }
          return false
        } else {
          return false
        }
      }
    }
    return false
  },
  navCatalogEvent: function () {
    $(".nav .sort").mouseenter(function () {
      var a = $(this).width();
      $("#noIndex").show().css("width", a + "px");
      $(".nav_bd .catalog_icon").addClass("active")
    }).mouseleave(function () {
      $("#noIndex").hide();
      $(".nav_bd .catalog_icon").removeClass("active")
    })
  },
  getOperCode: function () {
    var c = window.location.search;
    if (!c) {
      return null
    }
    c = c.substr(1);
    var b = c.split("&");
    for (var a = 0; a < b.length; a++) {
      if (b[a].length > 2 && b[a][0] === "c" && b[a][1] === "=") {
        return b[a].substr(2)
      }
    }
    return null
  },
  showWindowLogin: function () {
    $("#window_login_iframe").attr("src", webSiteShareData.lcscWinLoginUrl);
    $("#window_login_around_mask").show();
    commonModule.adjustLoginWindow()
  },
  adjustLoginWindow: function () {
    if ($("#window_login_around_mask:visible").length == 1) {
      var a = $("#window_login_around_mask");
      a.height($(document).height());
      a.width($(document).width());
      var d = ($(window).height() - $("#window_login_main_div").height()) / 2;
      var c = ($(window).width() - $("#window_login_main_div").width()) / 2;
      var b = $(document).scrollTop();
      var e = $(document).scrollLeft();
      $("#window_login_main_div").css({
        position: "absolute",
        top: d + b,
        left: c + e
      })
    }
  },
  isLogined: function () {
    var b = Cookies.get("customer_info");
    var a = b ? b.split(",") : [];
    return a.length == 4 && a[3] == "1"
  },
  getUuid: function () {
    return "xxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (d) {
      var b = Math.random() * 16 | 0,
        a = d == "x" ? b : (b & 3 | 8);
      return a.toString(16)
    })
  },
  _utf8_encode: function (b) {
    b = b.replace(/\r\n/g, "\n");
    var a = "";
    for (var e = 0; e < b.length; e++) {
      var d = b.charCodeAt(e);
      if (d < 128) {
        a += String.fromCharCode(d)
      } else {
        if ((d > 127) && (d < 2048)) {
          a += String.fromCharCode((d >> 6) | 192);
          a += String.fromCharCode((d & 63) | 128)
        } else {
          a += String.fromCharCode((d >> 12) | 224);
          a += String.fromCharCode(((d >> 6) & 63) | 128);
          a += String.fromCharCode((d & 63) | 128)
        }
      }
    }
    return a
  },
  base64Encode: function (d) {
    var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var a = "";
    var l, j, g, k, h, f, e;
    var b = 0;
    d = commonModule._utf8_encode(d);
    while (b < d.length) {
      l = d.charCodeAt(b++);
      j = d.charCodeAt(b++);
      g = d.charCodeAt(b++);
      k = l >> 2;
      h = ((l & 3) << 4) | (j >> 4);
      f = ((j & 15) << 2) | (g >> 6);
      e = g & 63;
      if (isNaN(j)) {
        f = e = 64
      } else {
        if (isNaN(g)) {
          e = 64
        }
      }
      a = a + c.charAt(k) + c.charAt(h) + c.charAt(f) + c.charAt(e)
    }
    return a
  },
  getBuriedPointCP: function () {
    var a = location.host;
    var b = "";
    if (/www\.szlcsc\.com/.test(a)) {
      b = "index"
    } else {
      if (/list\.szlcsc\.com/.test(a)) {
        b = "catalog_search"
      } else {
        if (/so\.szlcsc\.com/.test(a)) {
          b = "keyword_search"
        } else {
          if (/item\.szlcsc\.com/.test(a)) {
            b = "product_detail"
          } else {
            if (/cart\.szlcsc\.com/.test(a)) {
              b = "cart_list"
            } else {
              if (/order\.szlcsc\.com/.test(a)) {
                b = "confirm_order"
              }
            }
          }
        }
      }
    }
    return b
  },
  buriedPoint: function (g) {
    if (webSiteShareData.lcscCollectorUrl) {
      var d = location.host;
      var a = Cookies.get("noLoginCustomerFlag");
      if (!a) {
        a = commonModule.getUuid();
        Cookies.set("noLoginCustomerFlag", a, {
          domain: ".szlcsc.com",
          expires: 1000 * 60 * 60 * 24 * 30,
          path: "/"
        })
      }
      var c = Cookies.get("noLoginCustomerFlag2");
      if (!c) {
        c = commonModule.getUuid();
        Cookies.set("noLoginCustomerFlag2", c, {
          domain: ".szlcsc.com",
          expires: 1000 * 60 * 60 * 24 * 90,
          path: "/"
        })
      }
      var e = {
        sid: c,
        uid: Cookies.get("isLoginCustomerFlag") || a,
        pid: commonModule.buriedPointPid,
        referer: commonModule.base64Encode(document.referrer),
        cu: commonModule.base64Encode(location.href),
        ct: new Date().getTime()
      };
      for (key in g) {
        e[key] = g[key]
      }
      if (!e.cp) {
        e.cp = commonModule.getBuriedPointCP()
      }
      if (e.data) {
        var f = e.data;
        if (typeof f == "object") {
          f = JSON.stringify(e.data)
        }
        e.data = commonModule.base64Encode(f)
      }
      var b = new Image();
      b.src = webSiteShareData.lcscCollectorUrl + "/collect.js?" + $.param(e);
      b = null
    }
  },
  onloadLceda: function (p) {
    var i = document.getElementById("root");
    var g = document.getElementById("root2");
    var H = 1;
    var d = 1;
    var u = 10;
    var f;
    var z;
    var e = {
      x: 0,
      y: 0,
      width: 366,
      height: 366
    };
    var y = {
      x: 0,
      y: 0,
      width: 366,
      height: 366
    };
    var F = navigator.userAgent.indexOf("Firefox") > 0 ? true : false;
    var q = navigator.userAgent.indexOf("Edge") > -1 ? true : false;
    var D = (!!window.ActiveXObject || "ActiveXObject" in window) ? true : false;
    var w = $("#root").offset().left;
    var E = $("#root").offset().top;
    var t = $("#root2").offset().left;
    var s = $("#root2").offset().top;
    var r = 1,
      v = 1;

    function B(M) {
      var K = $("#grid1"),
        L = $("#gridOH"),
        J = $("#gridOV");
      K.attr("x", M.x);
      K.attr("y", M.y);
      K.attr("width", M.width);
      K.attr("height", M.height);
      L.attr("x1", M.x);
      L.attr("y1", 180);
      L.attr("x2", M.width + M.x);
      L.attr("y2", 180);
      J.attr("x1", 180);
      J.attr("y1", M.y);
      J.attr("x2", 180);
      J.attr("y2", M.height + M.y)
    }

    function I(N) {
      var L = $("#grid12"),
        M = $("#gridOH2"),
        J = $("#gridOV2"),
        K = $("#gridBg");
      L.attr("x", N.x);
      L.attr("y", N.y);
      L.attr("width", N.width);
      L.attr("height", N.height);
      M.attr("x1", N.x);
      M.attr("y1", 180);
      M.attr("x2", N.width + N.x);
      M.attr("y2", 180);
      J.attr("x1", 180);
      J.attr("y1", N.y);
      J.attr("x2", 180);
      J.attr("y2", N.height + N.y);
      K.attr("x", N.x);
      K.attr("y", N.y);
      K.attr("width", N.width);
      K.attr("height", N.height)
    }
    $(document).on("mousedown", "#root", function (M) {
      var K = M.originalEvent;
      var J = true;
      var N = K.offsetX,
        L = K.offsetY;
      if ((F || D || q) && K.target.tagName !== "svg") {
        N = K.pageX - w;
        L = K.pageY - E
      }
      $(document).on("mousemove", "#root", function (S) {
        var V = S.originalEvent;
        if (J) {
          var T = V.offsetX,
            R = V.offsetY;
          if ((F || D || q) && V.target.tagName !== "svg") {
            T = V.pageX - w;
            R = V.pageY - E
          }
          var Q = N - T,
            O = L - R;
          if (Q !== 0 && O !== 0) {
            var P = i.viewBox.baseVal;
            P.x += Q / H;
            P.y += O / H;
            var U = P.x + " " + P.y + " " + P.width + " " + P.height;
            i.setAttribute("viewBox", " " + U);
            B(P);
            N = T;
            L = R
          }
        }
      });
      $(document).on("mouseup", "#root", function (O) {
        J = false
      })
    });
    $(document).on("mousedown", "#root2", function (M) {
      var K = M.originalEvent;
      var J = true;
      var N = K.offsetX,
        L = K.offsetY;
      if ((F || D || q) && K.target.tagName !== "svg") {
        N = K.pageX - t;
        L = K.pageY - s
      }
      $(document).on("mousemove", "#root2", function (S) {
        var V = S.originalEvent;
        if (J) {
          var T = V.offsetX,
            R = V.offsetY;
          if ((F || D || q) && V.target.tagName !== "svg") {
            T = V.pageX - t;
            R = V.pageY - s
          }
          var Q = N - T,
            O = L - R;
          if (Q !== 0 && O !== 0) {
            var P = g.viewBox.baseVal;
            P.x += Q / d;
            P.y += O / d;
            var U = P.x + " " + P.y + " " + P.width + " " + P.height;
            g.setAttribute("viewBox", " " + U);
            I(P);
            N = T;
            L = R
          }
        }
      });
      $(document).on("mouseup", "#root2", function (O) {
        J = false
      })
    });
    $(document).on("contextmenu", "#root", function (J) {
      J.preventDefault()
    });
    $(document).on("contextmenu", "#root2", function (J) {
      J.preventDefault()
    });
    $(document).on("mousewheel DOMMouseScroll", "#root", function (K) {
      var L = (K.originalEvent.wheelDelta && (K.originalEvent.wheelDelta > 0 ? 1 : -1)) || (K.originalEvent.detail && (K.originalEvent.detail > 0 ? -1 : 1));
      if (L != 0) {
        var J = {
          x: K.originalEvent.offsetX,
          y: K.originalEvent.offsetY
        };
        if ((F || D || q) && K.target.tagName !== "svg") {
          J = {
            x: K.originalEvent.pageX - w,
            y: K.originalEvent.pageY - E
          }
        }
        if (L > 0) {
          b(100 * H * 1.2, J)
        } else {
          b(100 * H / 1.2, J)
        }
      }
    });
    $(document).on("mousewheel DOMMouseScroll", "#root2", function (K) {
      var L = (K.originalEvent.wheelDelta && (K.originalEvent.wheelDelta > 0 ? 1 : -1)) || (K.originalEvent.detail && (K.originalEvent.detail > 0 ? -1 : 1));
      if (L != 0) {
        var J = {
          x: K.originalEvent.offsetX,
          y: K.originalEvent.offsetY
        };
        if ((F || D || q) && K.target.tagName !== "svg") {
          J = {
            x: K.originalEvent.pageX - t,
            y: K.originalEvent.pageY - s
          }
        }
        if (L > 0) {
          n(100 * d * 1.2, J)
        } else {
          n(100 * d / 1.2, J)
        }
      }
    });

    function b(K, N) {
      if (K > 3000 || K < 25) {
        return
      }
      var S = H;
      H = K / 100;
      var U;
      var P = i.viewBox.baseVal,
        L = +i.getAttribute("width"),
        V = +i.getAttribute("height");
      if (N) {
        U = [P.x + N.x / S - N.x / H, P.y + N.y / S - N.y / H, L / H, V / H];
        f = N
      } else {
        var X = e;
        svgXY = {
          x: X.width ? X.x + X.width / 2 : (X.x || P.x + P.width / 2),
          y: X.height ? X.y + X.height / 2 : (X.y || P.y + P.height / 2)
        };
        U = [svgXY.x - (L / H / 2), svgXY.y - (V / H / 2), L / H, V / H]
      }
      var Y = {
        x: U[0],
        y: U[1],
        width: U[2],
        height: U[3]
      };
      var J = Y.x + " " + Y.y + " " + Y.width + " " + Y.height;
      i.setAttribute("viewBox", " " + J);
      B(Y);
      var M = document.getElementById("gridCell2"),
        O = document.getElementById("gridOH"),
        T = document.getElementById("gridOV");
      var R = 100 / K;
      $(M).attr("stroke-width", R);
      $(O).attr("stroke-width", R);
      $(T).attr("stroke-width", R);
      if (u < 1) {
        u = 1
      }
      while (u * H < 5) {
        if (u * H * 2 >= 5) {
          u *= 2
        } else {
          if (u * H * 5 >= 5) {
            u *= 5
          } else {
            u *= 10
          }
        }
      }
      if (H >= 1) {
        u = 10
      }
      var Q = document.getElementById("gridPattern2");
      $(Q).attr("width", u);
      $(Q).attr("height", u);
      $(M).attr("d", "M10 0V10H0".replace(/10/g, u))
    }

    function n(K, N) {
      if (K > 3000 || K < 25) {
        return
      }
      var S = d;
      d = K / 100;
      var U;
      var P = g.viewBox.baseVal,
        L = +g.getAttribute("width"),
        V = +g.getAttribute("height");
      if (N) {
        U = [P.x + N.x / S - N.x / d, P.y + N.y / S - N.y / d, L / d, V / d];
        z = N
      } else {
        var X = y;
        svgXY = {
          x: X.width ? X.x + X.width / 2 : (X.x || P.x + P.width / 2),
          y: X.height ? X.y + X.height / 2 : (X.y || P.y + P.height / 2)
        };
        U = [svgXY.x - (L / d / 2), svgXY.y - (V / d / 2), L / d, V / d]
      }
      var Y = {
        x: U[0],
        y: U[1],
        width: U[2],
        height: U[3]
      };
      var J = Y.x + " " + Y.y + " " + Y.width + " " + Y.height;
      g.setAttribute("viewBox", " " + J);
      I(Y);
      var M = document.getElementById("gridCell22"),
        O = document.getElementById("gridOH2"),
        T = document.getElementById("gridOV2");
      var R = 100 / K;
      $(M).attr("stroke-width", R);
      $(O).attr("stroke-width", R);
      $(T).attr("stroke-width", R);
      if (u < 1) {
        u = 1
      }
      while (u * d < 5) {
        if (u * d * 2 >= 5) {
          u *= 2
        } else {
          if (u * d * 5 >= 5) {
            u *= 5
          } else {
            u *= 10
          }
        }
      }
      if (d >= 1) {
        u = 10
      }
      var Q = document.getElementById("gridPattern22");
      $(Q).attr("width", u);
      $(Q).attr("height", u);
      $(M).attr("d", "M10 0V10H0".replace(/10/g, u))
    }
    $(document).on("click", "#rootlarger", function (J) {
      b(1.2 * H * 100, f)
    });
    $(document).on("click", "#rootsmaller", function (J) {
      b(H / 1.2 * 100, f)
    });
    $(document).on("click", "#rootreset", G);
    $(document).on("click", "#rootlarger2", function (J) {
      n(1.2 * d * 100, z)
    });
    $(document).on("click", "#rootsmaller2", function (J) {
      n(d / 1.2 * 100, z)
    });
    $(document).on("click", "#rootreset2", m);
    $(document).on("click", "#userButton", function (J) {
      if (J.target.tagName === "div" || J.target.tagName === "DIV") {
        $("#userButton a")[0].click()
      }
    });

    function G() {
      var J = 100 * r * 0.8;
      J = J > 3000 ? 3000 : J;
      J = J < 25 ? 25 : J;
      b(J)
    }

    function m() {
      var J = 100 * v * 0.8;
      J = J > 3000 ? 3000 : J;
      J = J < 25 ? 25 : J;
      n(J)
    }

    function o(J) {
      J = J.replace(/^<svg.*?>/, "");
      if (J.indexOf("</style>") >= 0) {
        J = J.split("</style>")[1]
      }
      return J.replace("</svg>", "")
    }

    function x() {
      var J = $("#getUse");
      J.text("申请设计");
      J.attr("href", "http://club.szlcsc.com/article/details_37429_1.html");
      var L = $("#userButton a");
      L.text("申请设计");
      L.attr("href", "http://club.szlcsc.com/article/details_37429_1.html");
      var K = $("#schCanvas");
      var M = $("#pcbCanvas");
      K.html('<div class="requestDesign">暂未绘制...</div>');
      M.html('<div class="requestDesign">暂未绘制...</div>')
    }

    function C(K) {
      var J = "https://lceda.cn/api/products/" + K + "/svgs";
      $.ajax({
        url: J,
        type: "GET",
        async: false,
      }).then(function (at) {
        if (at.success) {
          var ar = at.result;
          if (ar.length === 0) {
            x()
          } else {
            var V = 0,
              T = 0;
            var al = 0,
              ah = 0;
            var Y = [];
            var S = "",
              P = "",
              af = "";
            var ae = {};
            var aa = 1;
            var U = 2;
            var ak = "#libs=",
              an = [];
            var ao = "";
            for (var aj = 0; aj < ar.length; aj++) {
              if (ar[aj].docType === 6) {
                U = 6;
                break
              }
            }
            for (aj = 0; aj < ar.length; aj++) {
              S = ar[aj].svg;
              S = o(S);
              S = "<g>" + S + "</g>";
              if (ar[aj].docType === U) {
                V++;
                S = S.replace('fill="#FFFFFF"', 'fill="none"');
                S = S.replace('fill="#ffffff"', 'fill="none"');
                S = S.replace('fill="white"', 'fill="none"');
                P += S;
                var M = ar[aj].bbox;
                Y.push(M);
                al = M.width > al ? M.width : al;
                ah = M.height > ah ? M.height : ah;
                an.push(ar[aj].component_uuid)
              } else {
                if (ar[aj].docType === 4) {
                  S = S.replace('fill="#000000"', 'fill="none"');
                  S = S.replace('fill="black"', 'fill="none"');
                  T++;
                  af += S;
                  aa = aj;
                  ao = ar[aj].component_uuid
                }
              }
            }
            $("#g1").html(P);
            $("#g12").html(af);
            var Q = 10;
            ae = getSquareRowCol(V, al, ah, Q);
            e = {
              x: 0,
              y: 0,
              width: ae.width,
              height: ae.height
            };
            var O = e.width > e.height ? e.width : e.height;
            r = 366 / O;
            G();
            if (ar[aa].bbox.width) {
              y = ar[aa].bbox
            }
            var ai = y.width > y.height ? y.width : y.height;
            v = 366 / ai;
            m();
            ak += "&" + an[0];
            for (aj = 1; aj < an.length; aj++) {
              ak += "|&" + an[aj]
            }
            ak += "|!" + ao;
            $("#userButton a").attr("href", "https://lceda.cn/editor" + ak);
            $("#getUse").attr("href", "https://lceda.cn/editor" + ak);
            var Z = $("#g1 > g");
            var ad = 0,
              ac = 0;
            var ab = 1,
              ag = 1;
            for (aj = 0; aj < Z.length; aj++) {
              if (ag > ae.col) {
                ab++;
                ag = 1
              }
              ad = e.x - Y[aj].x + (al - Y[aj].width) / 2 + (ag - 1) * (al + Q);
              ac = e.y - Y[aj].y + (ab - 1) * (ah + Q);
              SVGMove.g(Z[aj], ad, ac);
              ag++
            }
            var ap = $('#g12 g[c_partid="part_pad"]');
            var am = $("#textTemp");
            var N = $("#gNets");
            var L, R, aq, X;
            for (aj = 0; aj < ap.length; aj++) {
              L = ap[aj].getAttribute("c_origin");
              X = ap[aj].getAttribute("number");
              if (L) {
                L = L.split(",")
              }
              if (L.length > 1) {
                aq = am[0].cloneNode(true);
                aq.setAttribute("x", L[0]);
                aq.setAttribute("y", L[1]);
                aq.innerHTML = X;
                N.append(aq)
              }
            }
            var W = $('#g1 g[c_partid="part_pin"] > text');
            for (aj = 0; aj < W.length; aj++) {
              attr(W[aj], "display", "");
              attr(W[aj], "font-size", "4pt")
            }
          }
        } else {
          x()
        }
      }, function (L) {
        x()
      })
    }
    if (!D) {
      C(p)
    } else {
      var c = window.navigator.userAgent.toLowerCase();
      if (c.indexOf("msie") >= 0) {
        var l = c.match(/msie ([\d.]+)/)[1];
        if (l < 9) {
          $("#lcedalogo a:eq(0)").html('<div style="height: 45px;width: 180px;margin-top:0;margin-left:30px;"></div>')
        }
      }
      var j = $("#getUse");
      j.attr("href", "https://lceda.cn/editor");
      var a = $("#userButton a");
      a.attr("href", "https://lceda.cn/editor");
      var h = $("#schCanvas");
      var A = $("#pcbCanvas");
      h.html('<div class="requestDesign">查看库图片暂不支持IE浏览器,</div><div style="text-align: center;font-size: 16px;font-weight: bold;">建议使用谷歌，火狐等浏览器</div>');
      A.html('<div class="requestDesign">查看库图片暂不支持IE浏览器,</div><div style="text-align: center;font-size: 16px;font-weight: bold;">建议使用谷歌，火狐等浏览器</div>');
      var k = "https://lceda.cn/api/products/" + p + "/svgs";
      $.ajax({
        url: k,
        type: "GET",
        async: false,
      }).then(function (N) {
        var O = "#libs=",
          L = [],
          K;
        if (N.success) {
          var P = N.result;
          if (P.length === 0) {
            return
          } else {
            var J = 2;
            for (var M = 0; M < P.length; M++) {
              if (P[M].docType === 6) {
                J = 6;
                break
              }
            }
            for (M = 0; M < P.length; M++) {
              if (P[M].docType === J) {
                L.push(P[M].component_uuid)
              } else {
                if (P[M].docType === 4) {
                  K = P[M].component_uuid
                }
              }
            }
            O += "&" + L[0];
            for (M = 1; M < L.length; M++) {
              O += "|&" + L[M]
            }
            O += "|!" + K;
            $("#userButton a").attr("href", "https://lceda.cn/editor" + O);
            $("#getUse").attr("href", "https://lceda.cn/editor" + O)
          }
        } else {
          return
        }
      })
    }
  }
};

function autoRefreshLoginInfo(b, f, g, h, c, e, a, d, j, i) {
  commonModule.autoRefreshLoginInfo(b, f, g, h, c, e, a, d, j, i)
}

function hideWindowLogin() {
  $("#window_login_around_mask").hide()
}

function responseLogin(c, e, d, a, b) {
  hideWindowLogin();
  autoRefreshLoginInfo(c, e, d, a, b)
}(function (a) {
  a.getUrlParam = function (b) {
    var c = new RegExp("(^|&)" + b + "=([^&]*)(&|$)");
    var d = window.location.search.substr(1).match(c);
    if (d != null) {
      return unescape(d[2])
    }
    return null
  }
})(jQuery);
commonModule.init();

function hasSubtractionDiscount() {
  $.ajax({
    type: "GET",
    url: webSiteShareData.lcscActivityUrl + "/activity/september/popup",
    dataType: "jsonp",
    success: function (a) {
      if (a && a.code == 200) {
        if (!Cookies.get("isShowSubtractionDiscount")) {
          Cookies.set("isShowSubtractionDiscount", "yes", {
            domain: ".szlcsc.com",
            expires: 1000 * 60 * 60 * 24 * 7,
            path: "/"
          });
          $(".mask").show();
          $(".subtraction_discount").show()
        }
      }
    },
  })
}
$(".subtraction_discount_close").on("click", function () {
  $(".mask").hide();
  $(".subtraction_discount").hide()
});

function getCustomertype() {
  var a = webSiteShareData.lcscMemberUrl + "/async/customer/customertype";
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    url: a,
    success: function (b) {
      if (b.code == 200 && b.result) {
        $("#confirmcustomerType input[name=link_phone]").val(b.result.bindPhone);
        $("#confirmcustomerType #ENTERPRISE_companyName").val(b.result.company);
        $("#confirmcustomerType #ENTERPRISE_taxpayerIdNum").val(b.result.taxNumber);
        $("#confirmcustomerType #ENTERPRISE_realityName").val(b.result.realName);
        $("#confirmcustomerType #PERSON_realityName").val(b.result.realName)
      }
    },
    error: function (b) {
      commonModule.failTip("系统繁忙，请联系客服人员或稍后再试！")
    }
  })
}

function confirmIdentityCard() {
  var c = $("#identityCardConfirm");
  if (c.val() == "" || c.val() == null) {
    $("#identityCardConfirm_info").hide();
    $("#identityCardConfirm_err").show();
    $("#identityCardConfirm_ok").hide();
    return false
  }
  var b = /^((\d{17}([0-9]|x|X))|(\d{15}))$/;
  if (c.val() != null && c.val() != "" && !b.test(c.val())) {
    $("#identityCardConfirm_info").hide();
    $("#identityCardConfirm_err").show();
    $("#identityCardConfirm_ok").hide();
    return
  }
  $("#identityCard").val(c.val());
  $("#confirmIdentityCard").hide();
  $("#hasConfirmIdentityCard").val("yes");
  var d = $("#signPosition").val();
  if (d == "wallet") {
    disport()
  } else {
    if (d == "consignEdit") {
      toSubmitConsignSale()
    } else {
      var a = "<common:webRoot/>/member/confirmIdentityCard.html";
      $.ajax({
        type: "POST",
        dataType: "text",
        url: a,
        async: false,
        data: {
          identityCard: c.val()
        },
        success: function (e) {
          if (e == "success") {} else {
            commonModule.alertFail("系统繁忙，请联系客服人员或稍后再试！")
          }
        },
        error: function (f) {
          alertFail("系统繁忙，请联系客服人员或稍后再试！")
        }
      })
    }
  }
  return false
}

function showCustomerType(b, a) {
  if (!$(a).hasClass("cur")) {
    $(a).addClass("cur").siblings().removeClass("cur")
  }
  if (b == "person") {
    $("#ENTERPRISE").hide();
    $("#customeTypeCode").val("PERSON");
    $("#PERSON").show()
  } else {
    $("#PERSON").hide();
    $("#customeTypeCode").val("ENTERPRISE");
    $("#ENTERPRISE").show()
  }
  $("#ENTERPRISE_companyName_info").show();
  $("#ENTERPRISE_companyName_ok").hide();
  $("#ENTERPRISE_companyName_err").hide();
  $("#ENTERPRISE_taxpayerIdNum_info").show();
  $("#ENTERPRISE_taxpayerIdNum_ok").hide();
  $("#ENTERPRISE_taxpayerIdNum_err").hide();
  $("#ENTERPRISE_realityName_info").show();
  $("#ENTERPRISE_realityName_ok").hide();
  $("#ENTERPRISE_realityName_err").hide();
  $("#PERSON_realityName_info").show();
  $("#PERSON_realityName_err").hide();
  $("#PERSON_realityName_ok").hide()
}

function closeConfirmIdentityCard() {
  var a = "${customerTypeConFlag}";
  if (a == "yes") {
    alertFail("为了响应个人客户与企业客户的不同需求，请选择账户类型谢谢！");
    return
  }
  $("#confirmcustomerType").hide();
  var b = $("#signPosition").val();
  if (b == "consignList") {
    $("#hasConfirmCustomerType").val("yes")
  }
  if (b == "shopCart") {
    $("#hasConfirmCustomerType").val("yes")
  }
  return
}

function confirmIdentityCardSubmit(c) {
  var b = webSiteShareData.lcscMemberUrl + "/async/customer/update/custype/person";
  if (c == "person") {
    var d = $("#PERSON_realityName").val();
    if (d == "" || d == null) {
      $("#PERSON_realityName_info").hide();
      $("#PERSON_realityName_ok").hide();
      $("#PERSON_realityName_err_text").text("填写真实姓名，不可修改！");
      $("#PERSON_realityName_err").show();
      return false
    }
    if (d && d.length > 32) {
      $("#PERSON_realityName_info").hide();
      $("#PERSON_realityName_ok").hide();
      $("#PERSON_realityName_err_text").text("长度不能超过32字符！");
      $("#PERSON_realityName_err").show();
      return false
    }
    var e = $("#checkReaded_PERSON:checked");
    if (e.length == 0) {
      $("#confrim_button_PERSON").css({
        background: "#999999",
        border: "1px solid #999999",
        cursor: "not-allowed"
      });
      return false
    }
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      scriptCharset: "utf-8",
      url: b,
      async: false,
      data: {
        customerType: c,
        realName: d,
        isAgree: true
      },
      success: function (h) {
        $("#confirmcustomerType").hide();
        if (h.code == 200) {
          $("#confirmcustomerType").hide();
          window.location.reload()
        } else {
          commonModule.failTip(h.msg)
        }
      },
      error: function (h) {
        commonModule.failTip("系统繁忙，请联系客服人员或稍后再试！")
      }
    })
  } else {
    b = webSiteShareData.lcscMemberUrl + "/async/customer/update/custype/enterprise";
    var f = $("#ENTERPRISE_companyName").val();
    var g = $("#ENTERPRISE_taxpayerIdNum").val();
    var a = $("#ENTERPRISE_realityName").val();
    if (f == "" || f == null) {
      $("#ENTERPRISE_companyName_info").hide();
      $("#ENTERPRISE_companyName_ok").hide();
      $("#ENTERPRISE_companyName_err_text").text("请填写工商局注册的全称，不可修改！");
      $("#ENTERPRISE_companyName_err").show();
      return false
    }
    if (f && f.replace(/[^\x00-\xff]/g, "**").length > 100) {
      $("#ENTERPRISE_companyName_info").hide();
      $("#ENTERPRISE_companyName_ok").hide();
      $("#ENTERPRISE_companyName_err_text").text("长度不能超过50字符！");
      $("#ENTERPRISE_companyName_err").show();
      return false
    }
    if (!commonModule.isRightTaxNumber(g)) {
      $("#ENTERPRISE_taxpayerIdNum_info").hide();
      $("#ENTERPRISE_taxpayerIdNum_ok").hide();
      $("#ENTERPRISE_taxpayerIdNum_err").show();
      return
    }
    if (a == "" || a == null) {
      $("#ENTERPRISE_realityName_info").hide();
      $("#ENTERPRISE_realityName_ok").hide();
      $("#ENTERPRISE_realityName_err_text").text("请填写联系人姓名！");
      $("#ENTERPRISE_realityName_err").show();
      return false
    }
    if (a && a.length > 32) {
      $("#ENTERPRISE_realityName_info").hide();
      $("#ENTERPRISE_realityName_ok").hide();
      $("#ENTERPRISE_realityName_err_text").text("长度不能超过32字符！");
      $("#ENTERPRISE_realityName_err").show();
      return false
    }
    var e = $("#checkReaded_ENTERPRISE:checked");
    if (e.length == 0) {
      $("#confrim_button_ENTERPRISE").css({
        background: "#999999",
        border: "1px solid #999999",
        cursor: "not-allowed"
      });
      return false
    }
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      scriptCharset: "utf-8",
      url: b,
      async: false,
      data: {
        customerType: c,
        company: f,
        taxNumber: g,
        realName: a,
        isAgree: true
      },
      success: function (h) {
        if (h.code == 200) {
          $("#confirmcustomerType").hide();
          window.location.reload();
          if (h.result) {
            $(".enterprise_modal .sub-c").text(h.result);
            $(".mask").show();
            $(".enterprise_modal").show()
          }
        } else {
          commonModule.failTip(h.msg)
        }
      },
      error: function (h) {
        commonModule.failTip("系统繁忙，请联系客服人员或稍后再试！")
      }
    })
  }
}
jQuery(document).ready(function () {
  var a = $.trim($("#needChooseCusType").val());
  if (a == "true") {
    getCustomertype()
  }
  $("#ENTERPRISE_companyName").blur(function () {
    var b = $("#ENTERPRISE_companyName").val();
    if (b == "") {
      $("#ENTERPRISE_companyName_info").hide();
      $("#ENTERPRISE_companyName_ok").hide();
      $("#ENTERPRISE_companyName_err_text").text("请填写工商局注册的全称，不可修改！");
      $("#ENTERPRISE_companyName_err").show();
      return
    } else {
      if (b && b.replace(/[^\x00-\xff]/g, "**").length > 100) {
        $("#ENTERPRISE_companyName_info").hide();
        $("#ENTERPRISE_companyName_ok").hide();
        $("#ENTERPRISE_companyName_err_text").text("长度不能超过50字符！");
        $("#ENTERPRISE_companyName_err").show();
        return false
      } else {
        $("#ENTERPRISE_companyName_info").hide();
        $("#ENTERPRISE_companyName_err").hide();
        $("#ENTERPRISE_companyName_ok").show()
      }
      return
    }
  });
  $("#ENTERPRISE_taxpayerIdNum").blur(function () {
    var b = $("#ENTERPRISE_taxpayerIdNum").val();
    if (!commonModule.isRightTaxNumber(b)) {
      $("#ENTERPRISE_taxpayerIdNum_info").hide();
      $("#ENTERPRISE_taxpayerIdNum_ok").hide();
      $("#ENTERPRISE_taxpayerIdNum_err").show();
      return
    } else {
      $("#ENTERPRISE_taxpayerIdNum_info").hide();
      $("#ENTERPRISE_taxpayerIdNum_err").hide();
      $("#ENTERPRISE_taxpayerIdNum_ok").show()
    }
  });
  $("#ENTERPRISE_realityName").blur(function () {
    var b = $("#ENTERPRISE_realityName").val();
    if (b == "") {
      $("#ENTERPRISE_realityName_info").hide();
      $("#ENTERPRISE_realityName_ok").hide();
      $("#ENTERPRISE_realityName_err_text").text("请填写联系人姓名！");
      $("#ENTERPRISE_realityName_err").show();
      return
    } else {
      if (b && b.length > 32) {
        $("#ENTERPRISE_realityName_info").hide();
        $("#ENTERPRISE_realityName_ok").hide();
        $("#ENTERPRISE_realityName_err_text").text("长度不能超过32字符！");
        $("#ENTERPRISE_realityName_err").show();
        return
      } else {
        $("#ENTERPRISE_realityName_info").hide();
        $("#ENTERPRISE_realityName_err").hide();
        $("#ENTERPRISE_realityName_ok").show()
      }
    }
  });
  $("#PERSON_realityName").blur(function () {
    var b = $("#PERSON_realityName").val();
    if (b == "") {
      $("#PERSON_realityName_info").hide();
      $("#PERSON_realityName_ok").hide();
      $("#PERSON_realityName_err_text").text("填写真实姓名，不可修改！");
      $("#PERSON_realityName_err").show();
      return
    } else {
      if (b && b.length > 32) {
        $("#PERSON_realityName_info").hide();
        $("#PERSON_realityName_ok").hide();
        $("#PERSON_realityName_err_text").text("长度不能超过32字符！");
        $("#PERSON_realityName_err").show();
        return
      } else {
        $("#PERSON_realityName_info").hide();
        $("#PERSON_realityName_err").hide();
        $("#PERSON_realityName_ok").show()
      }
      return
    }
  });
  $("#identityCardConfirm").blur(function () {
    var c = $("#identityCardConfirm").val();
    if (c == "") {
      $("#identityCardConfirm_info").hide();
      $("#identityCardConfirm_ok").hide();
      $("#identityCardConfirm_err").show();
      return
    } else {
      var b = /^((\d{17}([0-9]|x|X))|(\d{15}))$/;
      if (c != null && c != "" && !b.test(c)) {
        $("#identityCardConfirm_info").hide();
        $("#identityCardConfirm_err").show();
        $("#identityCardConfirm_ok").hide()
      } else {
        $("#identityCardConfirm_info").hide();
        $("#identityCardConfirm_err").hide();
        $("#identityCardConfirm_ok").show();
        return
      }
    }
  });
  $("#checkReaded_ENTERPRISE").click(function () {
    var b = $("#checkReaded_ENTERPRISE:checked");
    if (b.length == 0) {
      $("#confrim_button_ENTERPRISE").css({
        background: "#999999",
        border: "1px solid #999999",
        cursor: "not-allowed"
      })
    } else {
      $("#confrim_button_ENTERPRISE").css({
        background: "#34aff5",
        border: "1px solid #34aff5",
        cursor: "pointer"
      })
    }
  });
  $("#checkReaded_PERSON").click(function () {
    var b = $("#checkReaded_PERSON:checked");
    if (b.length == 0) {
      $("#confrim_button_PERSON").css({
        background: "#999999",
        border: "1px solid #999999",
        cursor: "not-allowed"
      })
    } else {
      $("#confrim_button_PERSON").css({
        background: "#34aff5",
        border: "1px solid #34aff5",
        cursor: "pointer"
      })
    }
  });
  $(document).on("click", ".enterprise_modal .close", function () {
    $(".mask").hide();
    $(".enterprise_modal").hide()
  })
});
var fileModule = {
  init: function () {
    $(".wrap_library").on("click", "a", function () {
      $(".wrap_library").hide()
    });
    $(".wrap_library").on("click", "input", function () {
      location.href = $(this).attr("aUrl");
      $(".wrap_library").hide()
    })
  },
  downloadFileInit: function (b, a) {
    $.ajax({
      type: "GET",
      url: webSiteShareData.lcscSearchUrl + "/product/showProductPDFAndPCBJsonp?annexNumber=" + b,
      dataType: "jsonp",
      timeout: 15000,
      success: function (f) {
        var e = f.status;
        if (e == "success" || e == "error") {
          var l = {
            fileList: [{
              noFile: 1,
              productCode: f.productCode
            }, {
              noFile: 2
            }, {
              noFile: 3
            }]
          };
          if (f.fileList && f.fileList.length) {
            for (var g = 0; g < f.fileList.length; g++) {
              var d = f.fileList[g];
              var m = d.annexRealName;
              var o = d.annexRemark;
              var c = webSiteShareData.lcscAttaUrl;
              var n = "";
              var j = "";
              var h = encodeURIComponent(d.urlSign);
              if (d.annexType == "productpdf") {
                if (d.annexSuffix.toUpperCase() == "PDF" || d.annexSuffix.toUpperCase() == ".PDF") {
                  n = c + d.annexUrl;
                  j = c + d.annexUrl + h;
                  d.aHref = "javascript:fileModule.downloadFileNoRemark('" + n + "','" + b + "','new_pdf_doc_pdf','pdf');";
                  d.bHref = "javascript:fileModule.downloadFileNoRemark('" + j + "','" + b + "','new_pdf_doc_pdf','');"
                } else {
                  n = c + d.annexUrl + h;
                  d.aHref = "javascript:fileModule.downloadFileNoRemark('" + n + "','" + b + "','new_pdf_doc_pdf','');";
                  d.downTxt = "下载数据手册压缩包"
                }
                l.fileList[0] = d
              } else {
                if (d.annexType == "productencap") {
                  if (d.annexSuffix == "d" || d.annexSuffix == "D") {
                    n = c + d.annexUrl + h;
                    d.aHref = "javascript:fileModule.downloadFileDivRemarkShow('" + n + "','" + b + "','product_pcb_doc_d');";
                    l.fileList[2] = d
                  } else {
                    if (d.annexSuffix.toUpperCase() == "PCBLIB") {
                      n = c + d.annexUrl + h;
                      d.aHref = "javascript:fileModule.downloadFileDivRemarkShow('" + n + "','" + b + "','product_pcb_doc_lib');";
                      l.fileList[1] = d
                    } else {
                      if (d.annexSuffix.toUpperCase() == "ZIP") {
                        n = c + d.annexUrl + h;
                        d.aHref = "javascript:fileModule.downloadFileDivRemarkShow('" + n + "','" + b + "','product_pcb_doc_zip');";
                        l.fileList[2] = d
                      } else {
                        if (d.annexSuffix.toUpperCase() == "RAR") {
                          n = c + d.annexUrl + h;
                          d.aHref = "javascript:fileModule.downloadFileDivRemarkShow('" + n + "','" + b + "','product_pcb_doc_rar');";
                          l.fileList[2] = d
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          $("body").css("overflow", "hidden");
          var k = $(window).height();
          if ($("#hint_down").height() > (k - 10)) {
            $(".hint_down").css({
              maxHeight: k - 10 + "px",
              overflow: "auto",
              marginTop: -(k - 10) / 2 + "px"
            })
          }
          $(".mask").show();
          $("#hint_down").html("").show();
          $("#hint_downTmpl").tmpl(l).appendTo("#hint_down");
          setTimeout(function () {
            commonModule.onloadLceda(l.fileList[0].productCode)
          }, 0)
        } else {
          if (e == "fail") {
            showWindowLogin();
            $("#downLoadFileFlag").val("yes");
            $("#downLoadFileProductId").val(b);
            $("#downLoadFileDataType").val(a);
            return false
          }
        }
      },
      error: function () {
        commonModule.alertFail(constantModule.errorPrompt)
      }
    })
  },
  downloadFileDivRemarkShow: function (c, d, b) {
    var a = webSiteShareData.lcscSearchUrl + "/product/insertViewRecordAndCheckJsonp?dataId=" + d + "&dataType=" + b;
    $.ajax({
      type: "GET",
      url: a,
      dataType: "jsonp",
      timeout: 15000,
      success: function (g) {
        var h = g.status;
        var e = g.limitedTimes;
        if (h == "fail") {
          commonModule.alertFail("抱歉，您今天下载资料的次数已经超过" + e + "次，请明天再试！");
          return
        } else {
          var f = {
            aUrl: c
          };
          $(".wrap_library").show().html("");
          $("#downloadTitleTmpl").tmpl(f).appendTo(".wrap_library")
        }
      }
    })
  },
  downloadFileNoRemark: function (c, d, b, e) {
    if (e == "pdf" || e == "PDF") {
      window.open(c, "_blank")
    } else {
      var a = webSiteShareData.lcscSearchUrl + "/product/insertViewRecordAndCheckJsonp?dataId=" + d + "&dataType=" + b;
      $.ajax({
        type: "GET",
        url: a,
        dataType: "jsonp",
        timeout: 15000,
        success: function (g) {
          var h = g.status;
          var f = g.limitedTimes;
          if (h == "fail") {
            commonModule.alertFail("抱歉，您今天下载资料的次数已经超过" + f + "次，请明天再试！");
            return
          } else {
            if (e == "pdf" || e == "PDF") {
              window.open(c, "_blank")
            } else {
              window.location.href = c
            }
          }
        }
      })
    }
  }
};

function lcscshowAddCartModal(c, l) {
  Number.prototype.basicRound = function (D, n) {
    var C = Math.round(this * Math.pow(10, D)) / Math.pow(10, D) + "";
    if (n) {
      C += ""
    } else {
      if (D > 0) {
        if (C.indexOf(".") < 0) {
          C += "."
        }
        var E = C.split(".");
        for (var B = 0, A = D - E[1].length; B < A; B++) {
          C += "0"
        }
      }
    }
    return C
  };
  var x = $("#product_tbody_line_" + c.productId);
  var s = {
    productId: c.productId,
    cartPrice: 0,
    cartTotalPrice: 0,
    ratio: 1,
    minEncapsulationNumber: 0,
    validStockNumber: 0,
    sampleStockNumber: 0,
    batchStockLimit: 0,
    batchStockNumber: 0,
    hasSampleRule: false,
    productPriceList: [],
    oversea: false,
    entryType: l || ""
  };
  var e = webSiteShareData.lcscCartUrl + "/check/status/jsonp?productId=" + s.productId;
  var z = {
    batchStockLimit: parseInt(x.attr("data-batchStockLimit")),
    brandName: x.find(".brand-name").text(),
    convesionRatio: parseInt(x.attr("data-convesionRatio")) || 0,
    encapStandard: x.attr("data-encapStandard"),
    hasSampleRule: x.attr("data-hasSampleRule") == "yes" ? true : false,
    productCode: x.attr("data-productCode"),
    productId: c.productId,
    productMinEncapsulationNumber: parseInt(x.attr("data-productMinEncapsulationNumber")),
    productMinEncapsulationUnit: x.attr("data-productMinEncapsulationUnit"),
    productModel: x.attr("data-productModel"),
    productName: x.attr("data-productName"),
    productUnit: x.attr("data-productUnit"),
    sampleStockNumber: parseInt(x.attr("data-sampleStockNumber")),
    isDiscountProduct: x.attr("data-isDiscountProduct"),
  };
  var i = [];
  var h = false;
  x.find(".ccd").each(function (n, A) {
    if ($(A).find(".again-btn").length) {
      h = true
    }
    i.push({
      endPurchasedNumber: parseFloat($(A).attr("data-endPurchasedNumber")),
      productPrice: (z.isDiscountProduct == "yes" ? parseFloat($(A).attr("data-productPrice-discount")) : parseFloat($(A).attr("data-productPrice"))) * (z.convesionRatio == 0 ? 1 : z.convesionRatio),
      startPurchasedNumber: parseFloat($(A).attr("data-startPurchasedNumber"))
    })
  });
  if (h) {
    i.splice(i.length - 1, 1);
    i[i.length - 1].endPurchasedNumber = -1
  }
  i[i.length - 1].endPurchasedNumber = -1;
  z.productPriceList = i;
  z.validStockNumber = parseInt(x.attr("data-validStockNumber")) * (z.convesionRatio == 0 ? 1 : z.convesionRatio);
  s.ratio = z.convesionRatio == 0 ? 1 : z.convesionRatio;
  s.cartPrice = (i[0].productPrice / s.ratio).basicRound(6, true);
  s.productPriceList = i;
  s.minEncapsulationNumber = z.productMinEncapsulationNumber;
  s.validStockNumber = z.validStockNumber;
  s.sampleStockNumber = z.sampleStockNumber;
  s.batchStockLimit = z.batchStockLimit;
  s.hasSampleRule = z.hasSampleRule;
  $(".add_cart_modal").children(".modal_content").remove().end().show();
  $(".mask").show();
  var g = "";
  var f = "";
  var m = "";
  var v = "暂无库存";
  for (var p = 0; p < i.length; p++) {
    var r = "￥" + (i[p].productPrice / s.ratio).basicRound(6, true);
    if (i.length == 1) {
      g += '<li class="' + (g ? "" : "frist") + '"><span class="span_2">' + r + "/" + z.productUnit + '</span><span class="span_1">单价<b class="separator">:</b></span></li>'
    } else {
      if (z.hasSampleRule && p == i.length - 1 && !h) {
        s.oversea = true
      }
      var u = "-" + (i[p].endPurchasedNumber * s.ratio) + z.productUnit;
      if (i[p].endPurchasedNumber <= 0 || (h && p == i.length - 1)) {
        u = z.productUnit + "以上"
      }
      f += '<li class="' + (f ? "" : "frist") + '"><span class="span_2">' + r + '</span><span class="span_1">' + (i[p].startPurchasedNumber * s.ratio) + '+<b class="separator">:</b></span></li>'
    }
  }
  if (g) {
    g = '<li class="item_border"><div class="ul_right_l"></div><ul>' + g + '</ul><div class="clear"></div></li>'
  }
  if (f) {
    f = '<li class="item_border"><ul>' + f + '</ul><div class="clear"></div></li>'
  }
  if ((z.sampleStockNumber && z.sampleStockNumber > 0) || z.hasSampleRule) {
    if (s.productPriceList.length > 2 && z.validStockNumber >= s.batchStockLimit * s.ratio) {
      var k = 0;
      if (z.validStockNumber - z.sampleStockNumber >= s.batchStockLimit * s.ratio && !z.hasSampleRule) {
        k = Number(z.validStockNumber - z.sampleStockNumber)
      } else {
        k = (s.batchStockLimit - 1) * s.ratio
      }
      s.batchStockNumber = k;
      if (k > 0 && z.productMinEncapsulationUnit && z.productMinEncapsulationNumber > 1 && z.validStockNumber / z.productMinEncapsulationNumber >= 100) {
        k = Math.floor(k / z.productMinEncapsulationNumber) + z.productMinEncapsulationUnit + "多"
      } else {
        k = k + z.productUnit
      }
      m = ""
    }
  }
  if (z.validStockNumber && z.validStockNumber > 0) {
    if (z.productMinEncapsulationUnit && z.productMinEncapsulationNumber > 1 && z.validStockNumber / z.productMinEncapsulationNumber >= 100) {
      v = Math.floor(z.validStockNumber / z.productMinEncapsulationNumber) + z.productMinEncapsulationUnit + "多"
    } else {
      v = z.validStockNumber + z.productUnit
    }
  }
  var d = (i[0].productPrice / s.ratio).basicRound(6, true);
  var q = '<div class="modal_content"><ul class="ul_left"><li><span class="item-tit-color">商品名称：</span><span class="li_name ellipsis" title="' + z.productName + '">' + z.productName + '</span></li><li><span class="item-tit-color">原厂型号：</span><span class="li_name ellipsis" title="' + z.productModel + '">' + z.productModel + '</span></li><li><span class="item-tit-color">品　　牌：</span><span class="li_name ellipsis" title="' + z.brandName + '">' + z.brandName + '</span></li><li><span class="item-tit-color">封装规格：</span>' + z.encapStandard + '</li><li><span class="item-tit-color">现货库存：</span>' + v + "</li>" + m + '</ul><ul class="ul_right"><li style="text-align: center; margin-bottom: 10px">含增值税</li>' + g + f + '<li class="buy_num"><span class="">购买数量：</span><input id="catInputNum" class="input yellow" type="text" value="' + s.ratio + '"> X <span class="yellow" id="buyPrice">￥' + d + '</span> = <b class="yellow" id="buyTotalPrice">￥' + (s.ratio * (i[0].productPrice / s.ratio)).toFixed(2) + "</b></li>" + (z.productMinEncapsulationUnit ? '<li class="mt8"><span class="">按整包装：</span><input class="input yellow" type="text" id="encapsulationNum"> ' + z.productMinEncapsulationUnit + "（1" + z.productMinEncapsulationUnit + "有" + z.productMinEncapsulationNumber + z.productUnit + "）</li>" : "") + '<li class="mt8" id="is_need" style="display: none;"><i class="icon_i"></i> 库存不足，加入购物车，下单后帮您订货</li><li class="mt8" id="is_need_limit" style="display: none;">   <i class="icon_i"></i> 超过限购数量，加入购物车，下单后帮您订货</li><li class="mt8"><button class="common_btn" id="addCartBtn" data-agl-cvt="15">加入购物车</button></li></ul><div class="clear"></div></div>';
  $(".add_cart_modal").append(q);
  $(".add_cart_modal").off();
  $(".add_cart_modal").on("keyup", "#catInputNum", function () {
    var n = Number(this.value) / s.ratio;
    if (isNaN(Number(this.value))) {
      $(this).val(this.value ? this.value.substring(0, this.value.length - 1) : "");
      return
    }
    b()
  });
  $(".add_cart_modal").on("blur", "#catInputNum", function () {
    o();
    b();
    y(this.value)
  });
  $(".add_cart_modal").on("keyup", "#encapsulationNum", function () {
    if (isNaN(Number(this.value))) {
      $(this).val(this.value ? this.value.substring(0, this.value.length - 1) : "");
      return
    }
    var n = Number(this.value) * s.minEncapsulationNumber || "";
    $("#catInputNum").val(n);
    b()
  });
  $(".add_cart_modal").on("blur", "#encapsulationNum", function () {
    y($("#catInputNum").val())
  });
  $(".add_cart_modal").on("click", "#addCartBtn", function (A) {
    var n = Number($("#catInputNum").val());
    if (n / s.ratio < 1 || n % s.ratio != 0) {
      o();
      b();
      return
    }
    var B = "0~" + s.productId + "~" + n / s.ratio;
    $.ajax({
      url: webSiteShareData.lcscCartUrl + "/jsonp/add",
      dataType: "jsonp",
      data: {
        cartKeyStr: B,
        entryType: s.entryType
      },
      timeout: 15000,
      success: function (C) {
        if (C.shifting != undefined && C.shifting != "") {
          commonModule.alertFail(C.shifting)
        } else {
          if (C.msg != undefined && C.msg != "" && C.msg.indexOf("needLogin") >= 0) {
            window.location.href = "/login.html"
          } else {
            if (C.msg != undefined && C.msg != "") {
              commonModule.alertFail(C.msg)
            } else {
              $(".add_cart_modal").fadeOut(1000);
              $(".mask").fadeOut(1000, function () {
                $(".mask").css("filter", "alpha(opacity=35)")
              });
              a(A, C.result.cart_contains_count);
              c.callback && c.callback(C.result)
            }
          }
        }
      },
      error: function () {
        commonModule.failTip("系统繁忙，请联系客服人员或稍后再试！")
      }
    })
  });
  $(".add_cart_modal").on("mouseenter", "#quotaPop", function () {
    $("#quotaPop .add_cart_modal_pop_box").show()
  });
  $(".add_cart_modal").on("mouseleave", "#quotaPop", function () {
    $("#quotaPop .add_cart_modal_pop_box").hide()
  });
  $(".add_cart_modal").on("click", "#closeModal", function () {
    $(".add_cart_modal").hide();
    $(".mask").hide()
  });

  function o() {
    var A = Number($("#catInputNum").val());
    var B = A / s.ratio;
    if (B < 1) {
      B = 1;
      $("#catInputNum").val(s.ratio);
      w("最小起订量为<b class='yellow'>" + s.ratio + "</b>，已为您修正。", $("#catInputNum"))
    } else {
      if (A % s.ratio != 0) {
        $("#catInputNum").val(s.ratio * Math.ceil(B));
        w("必须以<b class='yellow'>" + s.ratio + "</b>的倍数购买，已为您修正。", $("#catInputNum"))
      }
    }
    var n = s.minEncapsulationNumber == 0 ? 0 : (A / s.minEncapsulationNumber);
    n >= 1 ? $("#encapsulationNum").val(Math.floor(n)) : $("#encapsulationNum").val("")
  }

  function b() {
    var B = Number($("#catInputNum").val()) / s.ratio;
    for (var n = 0; n < s.productPriceList.length; n++) {
      var A = s.productPriceList[n];
      if (A.startPurchasedNumber <= B && (A.endPurchasedNumber >= B || A.endPurchasedNumber == -1)) {
        s.cartPrice = (A.productPrice / s.ratio).basicRound(6, true);
        if (s.oversea) {
          s.cartPrice = (s.productPriceList[n].productPrice / s.ratio).basicRound(6, true)
        }
        break
      }
    }
    s.cartTotalPrice = (s.cartPrice * B * s.ratio).toFixed(2);
    $("#buyPrice").html("￥" + s.cartPrice);
    $("#buyTotalPrice").html("￥" + s.cartTotalPrice)
  }

  function y(n) {
    var n = Number(n);
    if (n > s.validStockNumber) {
      $("#is_need").show();
      $("#is_need_limit").hide();
      return
    } else {
      $("#is_need").hide();
      $("#is_need_limit").hide()
    }
  }

  function w(n, A) {
    $("#addCartModaltoast").remove();
    var B = $('<div id="addCartModaltoast"><span class="icon"></span>' + n + "</div>");
    B.insertBefore(A);
    B.fadeIn().delay(3000).fadeOut(function () {
      B.remove()
    })
  }
  var j = {
    el: null,
    offset: [0, 0],
    targetEl: null,
    duration: 500,
    curvature: 0.01,
    callback: null,
    autostart: false,
    stepCallback: null
  };
  var t = function (n) {
    this.init(n)
  };
  t.prototype = {
    constructor: t,
    init: function (n) {
      this.opts = $.extend(j, n || {});
      if (!this.opts.el) {
        return
      }
      this.$el = $(this.opts.el);
      this.$elLeft = this._toInteger(this.$el.css("left"));
      this.$elTop = this._toInteger(this.$el.css("top"));
      if (this.opts.targetEl) {
        this.diffX = this._toInteger($(this.opts.targetEl).css("left")) - this.$elLeft;
        this.diffY = this._toInteger($(this.opts.targetEl).css("top")) - this.$elTop
      } else {
        this.diffX = this.opts.offset[0];
        this.diffY = this.opts.offset[1]
      }
      this.duration = this.opts.duration;
      this.curvature = this.opts.curvature;
      this.timerId = null;
      this.b = (this.diffY - this.curvature * this.diffX * this.diffX) / this.diffX;
      if (this.opts.autostart) {
        this.start()
      }
    },
    start: function () {
      var n = this;
      this.begin = (new Date()).getTime();
      this.end = this.begin + this.duration;
      if (this.diffX === 0 && this.diffY === 0) {
        return
      }
      if (!!this.timerId) {
        clearInterval(this.timerId);
        this.stop()
      }
      this.timerId = setInterval(function () {
        var A = (new Date()).getTime();
        n.step(A)
      }, 16);
      return this
    },
    step: function (A) {
      var B = this.opts;
      var n, C;
      if (A > this.end) {
        n = this.diffX;
        C = this.diffY;
        this.move(n, C);
        this.stop();
        if (typeof B.callback === "function") {
          B.callback.call(this)
        }
      } else {
        n = this.diffX * ((A - this.begin) / this.duration);
        C = this.curvature * n * n + this.b * n;
        this.move(n, C);
        if (typeof B.stepCallback === "function") {
          B.stepCallback.call(this, n, C)
        }
      }
      return this
    },
    move: function (n, A) {
      this.$el.css({
        position: "absolute",
        left: this.$elLeft + n + "px",
        top: this.$elTop + A + "px"
      });
      return this
    },
    getOptions: function (n) {
      if (typeof n !== "object") {
        n = {}
      }
      n = $.extend(j, n || {});
      return n
    },
    setOptions: function (n) {
      this.reset();
      if (typeof n !== "object") {
        n = {}
      }
      n = $.extend(this.opts, n);
      this.init(n);
      return this
    },
    reset: function (n, A) {
      this.stop();
      n = n ? n : 0;
      A = A ? A : 0;
      this.move(n, A);
      return this
    },
    stop: function () {
      if (!!this.timerId) {
        clearInterval(this.timerId)
      }
      return this
    },
    _toInteger: function (n) {
      n = parseInt(n);
      return isFinite(n) ? n : 0
    }
  };

  function a(B, A) {
    $(".add-cart-ball").offset({
      top: B.pageY,
      left: B.pageX
    }).css("visibility", "visible");
    var n = new t({
      el: ".add-cart-ball",
      offset: [$(".cart_icon2").offset().left - B.pageX, $(".cart_icon2").offset().top - B.pageY],
      duration: 1000,
      curvature: 0.0025,
      callback: function () {
        $(".add-cart-ball").css("visibility", "hidden");
        $("#shop .cart_icon2").text(A)
      },
    });
    n.start()
  }
};

(function (b) {
  function a() {
    this.alp = b("#alp").val() / 100;
    this.init()
  }
  a.prototype = {
    init: function () {
      var f = this;
      b("#select_method5 li[data-value=icbc]").append("<img class='yh-select-icon' src=" + webSiteShareData.lcscStaticUrl + webSiteShareData.domain + "/resources/images/yh-select-icon.png>");
      b("#select_method5 li[data-value=icbc]").addClass("active");
      if (IEVersion() == 8) {
        b("#payAccountPassword").replaceWith('<input type="password" id="payAccountPassword" value="" autocomplete="off">')
      }
      b("#pay_nav").on("click", "li", function () {
        var g = this.id.substring(this.id.length - 1);
        b("#submitSel").show();
        if (parseInt(g) == 2 && b("#en").val() == false) {
          b("#submitSel").hide()
        }
        b(".select_method").hide();
        b("#select_method" + g).show();
        b("#pay_nav li").removeClass("active");
        b(this).addClass("active")
      });
      b("#payAccountPassword").on("keydown", function (g) {
        if (g.keyCode == 13) {
          if (g.preventDefault) {
            g.preventDefault()
          } else {
            g.returnValue = false
          }
          if (b(".mask_alert").is(":hidden")) {
            e()
          } else {
            return
          }
          return false
        }
      });
      var c = "";
      b("#payPassword").on("keyup", function (g) {
        if (g.keyCode) {
          this.append('<i style="display: inline-block;width: 10px;height: 10px;background: #000;border-radius: 5px;" ></i>')
        }
      });
      b("#closePayModal").click(function () {
        b("#payModal").hide()
      });
      b("#select_else4").on("click", function () {
        b(this).siblings("li").show().end().hide()
      });
      b("#select_else1").on("click", function () {
        b(this).siblings("li").show().end().hide()
      });
      b(".bank_list.wx_list > li").on("click", function () {
        b(".bank_list.wx_list > li").removeClass();
        b(this).addClass("active")
      });
      b(".bank_list.fold_bank_list > li").on("click", function () {
        b(".bank_list.fold_bank_list > li").removeClass("active");
        b(".bank_list.fold_bank_list > li .yh-select-icon").remove();
        b(this).append("<img class='yh-select-icon' src=" + webSiteShareData.lcscStaticUrl + webSiteShareData.domain + "/resources/images/yh-select-icon.png>");
        b(this).addClass("active")
      });
      b("#recharge").on("click", function () {
        window.location.href = "/member/wallet/manage.html"
      });
      b("#payFail").on("click", function () {
        window.location.reload()
      });

      function e() {
        b.ajax({
          type: "GET",
          url: "/pay/checkAmountChange",
          async: false,
          data: {
            sn: b("#sn").val(),
            mo: b("#mo").val()
          },
          success: function (g) {
            g = b.parseJSON(g);
            if (g.result == "nullity") {
              commonModule.alertFail("交易已关闭，请重新发起支付", function () {
                location.href = g.url
              })
            } else {
              if (g.result == "done") {
                window.location.href = "/cashier/check?sn=" + b("#sn").val()
              } else {
                if (g.result == "overtime") {
                  commonModule.alertFail("支付超时，请重新发起支付", function () {
                    location.href = g.url
                  })
                } else {
                  d()
                }
              }
            }
          },
          error: function () {
            commonModule.alertFail("请求失败，系统异常，请与管理员联系")
          }
        })
      }

      function d() {
        var i = "/cashier/pay";
        var h = b(".pay_nav>li.active").attr("data-value");
        if (h == "netbank" || h == "expressBill") {
          b("#pt").val(h);
          var k = b(".bank_list.fold_bank_list_" + h + ">li.active").attr("data-value");
          if (!k) {
            commonModule.alertFail("您还没有选择支付银行。");
            return
          }
          b("#nbc").val(k)
        } else {
          if (h == "wechatOrAlipay") {
            var g = b(".bank_list.wx_list>li.active").attr("data-value");
            if (g == "wxpay") {
              wxPayPopInit(i, g, null, b("#sn").val());
              return
            }
            b("#pt").val(g)
          }
        }
        var j = b("#payForm");
        j.attr("target", "_blank");
        j.submit();
        b(".mask").show();
        b("#payResult").show()
      }
      b("#submitSel").on("click", e);
      b("#rechargeSubmit").on("click", function () {
        var j = "/recharge/pay";
        var i = b(".pay_nav>li.active").attr("data-value");
        var g = "";
        var k = b("#money").val();
        if (!b.trim(k)) {
          g = "请填写金额!"
        }
        if (isNaN(k) || /\+/.test(k)) {
          g = "金额必须为数字，请重新输入!"
        }
        if (/\s/.test(k)) {
          g = "不能输入空白符，请重新输入!"
        }
        if (parseFloat(b("#money").val()) < 1) {
          g = "抱歉，在线充值金额最低为1元，请输入1元以上的充值金额!"
        }
        if (g) {
          b(".validate_msg").text(g).css("display", "inline");
          return
        } else {
          b(".validate_msg").text("").hide()
        }
        var h = i == "wechatOrAlipay" ? b(".wx_list>li.active").attr("data-value") : i;
        b.ajax({
          type: "GET",
          url: j,
          async: false,
          data: {
            mn: b("#money").val(),
            py: h
          },
          success: function (o) {
            o = b.parseJSON(o);
            if (o.result == "fail") {
              commonModule.alertFail("充值出错，请与管理员联系")
            } else {
              if (o.result == "limitFail") {
                commonModule.alertFail("抱歉，在线充值金额最低为1元，请输入1元以上的充值金额。")
              } else {
                if (o.result == "disable") {
                  commonModule.alertFail("预付余额账户被禁用")
                } else {
                  b("#sn").val(o.serialNumber);
                  if (i == "netbank") {
                    var n = b(".bank_list.fold_bank_list_recharge>li.active").attr("data-value");
                    if (!n) {
                      commonModule.alertFail("您还没有选择支付银行。");
                      return
                    }
                    b("#pt").val(i);
                    b("#nbc").val(n)
                  } else {
                    if (i == "wechatOrAlipay") {
                      var l = b(".bank_list.wx_list>li.active").attr("data-value");
                      if (l == "wxpay") {
                        j = "/cashier/pay";
                        b("#wx_money").text(b(".wx_zfb_money").text());
                        wxPayPopInit(j, l, null, b("#sn").val());
                        return
                      }
                      b("#pt").val(l)
                    } else {
                      if (i == "icbcb2c") {
                        b("#pt").val(i);
                        var n = b(".fold_bank_list_recharge_B2C >li.active").attr("data-value");
                        if (!n) {
                          commonModule.alertFail("您还没有选择支付银行。");
                          return
                        }
                        b("#nbc").val(n)
                      }
                    }
                  }
                  var m = b("#rechargeForm");
                  m.attr("target", "_blank");
                  m.submit();
                  b(".mask").show();
                  b("#payResult").show()
                }
              }
            }
          },
          error: function () {
            commonModule.alertFail("请求失败，系统异常，请与管理员联系")
          }
        })
      });
      b("#paySuccess").on("click", function () {
        window.location.href = "/cashier/check?sn=" + b("#sn").val()
      });
      b("#wx_success").one("click", function () {
        window.location.href = "/cashier/check?sn=" + b("#sn").val()
      });
      b("#wx_problem").one("click", function () {
        window.location.reload()
      });
      b("#money").on("input propertychange", function () {
        if (b(this).val().length > 10) {
          b(this).val(b(this).val().substring(0, b(this).val().length - 1))
        }
        var g = parseFloat(b(this).val()) || 0;
        b(".bank_money").text(g.toFixed(2));
        b(".wx_zfb_money").text(g.toFixed(2));
        b(".wx_zfb_money_poundage").text((g * f.alp).toFixed(2))
      })
    }
  };
  new a()
})(jQuery);

function wxPayPopInit(a, c, b, d) {
  $("#submitSel").attr("disabled", true);
  $.ajax({
    url: a,
    type: "POST",
    dataType: "json",
    data: {
      sn: d,
      pt: c,
      nbc: b
    },
    success: function (e) {
      $("#encodeQrcode_img").attr("src", "/cashier/qrcode?codeUrl=" + e.codeUrl);
      $("#weixin_pay_div").show();
      if (_timeCountDown.interval != null) {
        _timeCountDown.hh = 0;
        _timeCountDown.mm = 0;
        _timeCountDown.ss = 0;
        clearInterval(_timeCountDown.interval)
      }
      _timeCountDown.mm = 2;
      _timeCountDown.target = $("#time_left");
      _timeCountDown.interval = setInterval(_timeCountDown.countDown, 1000)
    },
    error: function (f) {
      commonModule.alertFail("生成二维码失败，系统异常，请与管理员联系")
    },
    complete: function () {
      $("#submitSel").removeAttr("disabled")
    }
  })
}

function walletPay() {
  $("#submitSel").attr("disabled", true);
  var b = $("#sn").val();
  var a = "/wallet/pay";
  $.ajax({
    type: "POST",
    url: a,
    data: {
      sn: b,
      payAccountPassword: $("#payAccountPassword").val()
    },
    success: function (c) {
      if (c == "success") {
        window.location.href = "/cashier/check?sn=" + b
      } else {
        if (c == "pwdNoSet") {
          commonModule.alertFail("预付余额账户未设置密码")
        } else {
          if (c == "fail") {
            commonModule.alertFail("支付数据异常")
          } else {
            if (c == "pwdError") {
              commonModule.alertFail("密码错误")
            } else {
              if (c == "existed") {
                commonModule.alertFail("该订单已支付，请勿重复支付")
              } else {
                if (c == "disable") {
                  commonModule.alertFail("预付余额账户被禁用")
                } else {
                  if (c == "done") {
                    window.location.href = "/cashier/check?sn=" + b
                  } else {
                    if (c == "change") {
                      commonModule.alertFail("支付数据已变更")
                    } else {
                      if (c == "overtime") {
                        commonModule.alertFail("支付超时，请重新发起支付", function () {
                          window.location.href = "/cashier/check?sn=" + b
                        })
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      $("#payAccountPassword").val("")
    },
    error: function () {
      commonModule.alertFail("请求失败，系统异常，请与管理员联系")
    },
    complete: function () {
      $("#submitSel").removeAttr("disabled")
    }
  })
}
var _timeCountDown = {
  hh: 0,
  mm: 0,
  ss: 0,
  count: 0,
  interval: null,
  target: null,
  format: function (a) {
    if (a < 10) {
      return "0" + a
    }
    return a
  },
  countDown: function () {
    if (_timeCountDown.interval != null && _timeCountDown.target != null) {
      if (_timeCountDown.ss == 0) {
        if (_timeCountDown.mm == 0) {
          if (_timeCountDown.hh == 0) {
            clearInterval(_timeCountDown.interval);
            alert("该二维码已过期，请重新支付");
            return
          } else {
            _timeCountDown.hh--;
            _timeCountDown.mm = 59;
            _timeCountDown.ss = 59
          }
        } else {
          _timeCountDown.mm--;
          _timeCountDown.ss = 59
        }
      } else {
        _timeCountDown.ss--
      }
      _timeCountDown.count++;
      $(_timeCountDown.target).html(_timeCountDown.format(_timeCountDown.hh) + ":" + _timeCountDown.format(_timeCountDown.mm) + ":" + _timeCountDown.format(_timeCountDown.ss))
    }
  }
};

function IEVersion() {
  var e = navigator.userAgent;
  var b = e.indexOf("compatible") > -1 && e.indexOf("MSIE") > -1;
  var d = e.indexOf("Edge") > -1 && !b;
  var f = e.indexOf("Trident") > -1 && e.indexOf("rv:11.0") > -1;
  if (b) {
    var a = new RegExp("MSIE (\\d+\\.\\d+);");
    a.test(e);
    var c = parseFloat(RegExp["$1"]);
    if (c == 7) {
      return 7
    } else {
      if (c == 8) {
        return 8
      } else {
        if (c == 9) {
          return 9
        } else {
          if (c == 10) {
            return 10
          } else {
            return 6
          }
        }
      }
    }
  } else {
    if (d) {
      return "edge"
    } else {
      if (f) {
        return 11
      } else {
        return -1
      }
    }
  }
};
