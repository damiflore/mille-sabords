!function () {
  "use strict";

  var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  };

  function t(e, t) {
    return e(t = {
      exports: {}
    }, t.exports), t.exports;
    /*
      object-assign
      (c) Sindre Sorhus
      @license MIT
      */
  }

  var n = Object.getOwnPropertySymbols,
      r = Object.prototype.hasOwnProperty,
      l = Object.prototype.propertyIsEnumerable;

  function a(e) {
    if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(e);
  }

  var i = function () {
    try {
      if (!Object.assign) return !1;
      var e = new String("abc");
      if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;

      for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;

      if ("0123456789" !== Object.getOwnPropertyNames(t).map(function (e) {
        return t[e];
      }).join("")) return !1;
      var r = {};
      return "abcdefghijklmnopqrst".split("").forEach(function (e) {
        r[e] = e;
      }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("");
    } catch (e) {
      return !1;
    }
  }() ? Object.assign : function (e, t) {
    for (var i, o, u = a(e), c = 1; c < arguments.length; c++) {
      for (var s in i = Object(arguments[c])) r.call(i, s) && (u[s] = i[s]);

      if (n) {
        o = n(i);

        for (var f = 0; f < o.length; f++) l.call(i, o[f]) && (u[o[f]] = i[o[f]]);
      }
    }

    return u;
  },
      o = "function" == typeof Symbol && Symbol.for,
      u = o ? Symbol.for("react.element") : 60103,
      c = o ? Symbol.for("react.portal") : 60106,
      s = o ? Symbol.for("react.fragment") : 60107,
      f = o ? Symbol.for("react.strict_mode") : 60108,
      d = o ? Symbol.for("react.profiler") : 60114,
      p = o ? Symbol.for("react.provider") : 60109,
      m = o ? Symbol.for("react.context") : 60110,
      h = o ? Symbol.for("react.forward_ref") : 60112,
      y = o ? Symbol.for("react.suspense") : 60113,
      v = o ? Symbol.for("react.memo") : 60115,
      b = o ? Symbol.for("react.lazy") : 60116,
      g = "function" == typeof Symbol && Symbol.iterator;

  function k(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);

    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }

  var w = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {}
  },
      E = {};

  function x(e, t, n) {
    this.props = e, this.context = t, this.refs = E, this.updater = n || w;
  }

  function T() {}

  function S(e, t, n) {
    this.props = e, this.context = t, this.refs = E, this.updater = n || w;
  }

  x.prototype.isReactComponent = {}, x.prototype.setState = function (t, n) {
    if ("object" !== e(t) && "function" != typeof t && null != t) throw Error(k(85));
    this.updater.enqueueSetState(this, t, n, "setState");
  }, x.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  }, T.prototype = x.prototype;
  var C = S.prototype = new T();
  C.constructor = S, i(C, x.prototype), C.isPureReactComponent = !0;
  var _ = {
    current: null
  },
      P = {
    current: null
  },
      N = Object.prototype.hasOwnProperty,
      O = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };

  function M(e, t, n) {
    var r,
        l = {},
        a = null,
        i = null;
    if (null != t) for (r in void 0 !== t.ref && (i = t.ref), void 0 !== t.key && (a = "" + t.key), t) N.call(t, r) && !O.hasOwnProperty(r) && (l[r] = t[r]);
    var o = arguments.length - 2;
    if (1 === o) l.children = n;else if (1 < o) {
      for (var c = Array(o), s = 0; s < o; s++) c[s] = arguments[s + 2];

      l.children = c;
    }
    if (e && e.defaultProps) for (r in o = e.defaultProps) void 0 === l[r] && (l[r] = o[r]);
    return {
      $$typeof: u,
      type: e,
      key: a,
      ref: i,
      props: l,
      _owner: P.current
    };
  }

  function z(t) {
    return "object" === e(t) && null !== t && t.$$typeof === u;
  }

  var I = /\/+/g,
      R = [];

  function D(e, t, n, r) {
    if (R.length) {
      var l = R.pop();
      return l.result = e, l.keyPrefix = t, l.func = n, l.context = r, l.count = 0, l;
    }

    return {
      result: e,
      keyPrefix: t,
      func: n,
      context: r,
      count: 0
    };
  }

  function F(e) {
    e.result = null, e.keyPrefix = null, e.func = null, e.context = null, e.count = 0, 10 > R.length && R.push(e);
  }

  function U(t, n, r) {
    return null == t ? 0 : function t(n, r, l, a) {
      var i = e(n);
      "undefined" !== i && "boolean" !== i || (n = null);
      var o = !1;
      if (null === n) o = !0;else switch (i) {
        case "string":
        case "number":
          o = !0;
          break;

        case "object":
          switch (n.$$typeof) {
            case u:
            case c:
              o = !0;
          }

      }
      if (o) return l(a, n, "" === r ? "." + L(n, 0) : r), 1;
      if (o = 0, r = "" === r ? "." : r + ":", Array.isArray(n)) for (var s = 0; s < n.length; s++) {
        var f = r + L(i = n[s], s);
        o += t(i, f, l, a);
      } else if (null === n || "object" !== e(n) ? f = null : f = "function" == typeof (f = g && n[g] || n["@@iterator"]) ? f : null, "function" == typeof f) for (n = f.call(n), s = 0; !(i = n.next()).done;) o += t(i = i.value, f = r + L(i, s++), l, a);else if ("object" === i) throw l = "" + n, Error(k(31, "[object Object]" === l ? "object with keys {" + Object.keys(n).join(", ") + "}" : l, ""));
      return o;
    }(t, "", n, r);
  }

  function L(t, n) {
    return "object" === e(t) && null !== t && null != t.key ? function (e) {
      var t = {
        "=": "=0",
        ":": "=2"
      };
      return "$" + ("" + e).replace(/[=:]/g, function (e) {
        return t[e];
      });
    }(t.key) : n.toString(36);
  }

  function j(e, t) {
    e.func.call(e.context, t, e.count++);
  }

  function A(e, t, n) {
    var r = e.result,
        l = e.keyPrefix;
    e = e.func.call(e.context, t, e.count++), Array.isArray(e) ? W(e, r, n, function (e) {
      return e;
    }) : null != e && (z(e) && (e = function (e, t) {
      return {
        $$typeof: u,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
      };
    }(e, l + (!e.key || t && t.key === e.key ? "" : ("" + e.key).replace(I, "$&/") + "/") + n)), r.push(e));
  }

  function W(e, t, n, r, l) {
    var a = "";
    null != n && (a = ("" + n).replace(I, "$&/") + "/"), U(e, A, t = D(t, a, r, l)), F(t);
  }

  function V() {
    var e = _.current;
    if (null === e) throw Error(k(321));
    return e;
  }

  var B = {
    Children: {
      map: function (e, t, n) {
        if (null == e) return e;
        var r = [];
        return W(e, r, null, t, n), r;
      },
      forEach: function (e, t, n) {
        if (null == e) return e;
        U(e, j, t = D(null, null, t, n)), F(t);
      },
      count: function (e) {
        return U(e, function () {
          return null;
        }, null);
      },
      toArray: function (e) {
        var t = [];
        return W(e, t, null, function (e) {
          return e;
        }), t;
      },
      only: function (e) {
        if (!z(e)) throw Error(k(143));
        return e;
      }
    },
    createRef: function () {
      return {
        current: null
      };
    },
    Component: x,
    PureComponent: S,
    createContext: function (e, t) {
      return void 0 === t && (t = null), (e = {
        $$typeof: m,
        _calculateChangedBits: t,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      }).Provider = {
        $$typeof: p,
        _context: e
      }, e.Consumer = e;
    },
    forwardRef: function (e) {
      return {
        $$typeof: h,
        render: e
      };
    },
    lazy: function (e) {
      return {
        $$typeof: b,
        _ctor: e,
        _status: -1,
        _result: null
      };
    },
    memo: function (e, t) {
      return {
        $$typeof: v,
        type: e,
        compare: void 0 === t ? null : t
      };
    },
    useCallback: function (e, t) {
      return V().useCallback(e, t);
    },
    useContext: function (e, t) {
      return V().useContext(e, t);
    },
    useEffect: function (e, t) {
      return V().useEffect(e, t);
    },
    useImperativeHandle: function (e, t, n) {
      return V().useImperativeHandle(e, t, n);
    },
    useDebugValue: function () {},
    useLayoutEffect: function (e, t) {
      return V().useLayoutEffect(e, t);
    },
    useMemo: function (e, t) {
      return V().useMemo(e, t);
    },
    useReducer: function (e, t, n) {
      return V().useReducer(e, t, n);
    },
    useRef: function (e) {
      return V().useRef(e);
    },
    useState: function (e) {
      return V().useState(e);
    },
    Fragment: s,
    Profiler: d,
    StrictMode: f,
    Suspense: y,
    createElement: M,
    cloneElement: function (e, t, n) {
      if (null == e) throw Error(k(267, e));
      var r = i({}, e.props),
          l = e.key,
          a = e.ref,
          o = e._owner;

      if (null != t) {
        if (void 0 !== t.ref && (a = t.ref, o = P.current), void 0 !== t.key && (l = "" + t.key), e.type && e.type.defaultProps) var c = e.type.defaultProps;

        for (s in t) N.call(t, s) && !O.hasOwnProperty(s) && (r[s] = void 0 === t[s] && void 0 !== c ? c[s] : t[s]);
      }

      var s = arguments.length - 2;
      if (1 === s) r.children = n;else if (1 < s) {
        c = Array(s);

        for (var f = 0; f < s; f++) c[f] = arguments[f + 2];

        r.children = c;
      }
      return {
        $$typeof: u,
        type: e.type,
        key: l,
        ref: a,
        props: r,
        _owner: o
      };
    },
    createFactory: function (e) {
      var t = M.bind(null, e);
      return t.type = e, t;
    },
    isValidElement: z,
    version: "16.12.0",
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
      ReactCurrentDispatcher: _,
      ReactCurrentBatchConfig: {
        suspense: null
      },
      ReactCurrentOwner: P,
      IsSomeRendererActing: {
        current: !1
      },
      assign: i
    }
  },
      Q = {
    default: B
  },
      $ = Q && B || Q,
      H = $.default || $,
      K = (t(function (e) {}), t(function (e) {
    e.exports = H;
  }));

  function q(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }

  function X(e, t) {
    return e(t = {
      exports: {}
    }, t.exports), t.exports;
    /*
      object-assign
      (c) Sindre Sorhus
      @license MIT
      */
  }

  var Y = Object.getOwnPropertySymbols,
      G = Object.prototype.hasOwnProperty,
      Z = Object.prototype.propertyIsEnumerable;

  function J(e) {
    if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(e);
  }

  var ee = function () {
    try {
      if (!Object.assign) return !1;
      var e = new String("abc");
      if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;

      for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;

      if ("0123456789" !== Object.getOwnPropertyNames(t).map(function (e) {
        return t[e];
      }).join("")) return !1;
      var r = {};
      return "abcdefghijklmnopqrst".split("").forEach(function (e) {
        r[e] = e;
      }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("");
    } catch (e) {
      return !1;
    }
  }() ? Object.assign : function (e, t) {
    for (var n, r, l = J(e), a = 1; a < arguments.length; a++) {
      for (var i in n = Object(arguments[a])) G.call(n, i) && (l[i] = n[i]);

      if (Y) {
        r = Y(n);

        for (var o = 0; o < r.length; o++) Z.call(n, r[o]) && (l[r[o]] = n[r[o]]);
      }
    }

    return l;
  },
      te = X(function (t, n) {
    var r, l, a, i, o;

    if (Object.defineProperty(n, "__esModule", {
      value: !0
    }), "undefined" == typeof window || "function" != typeof MessageChannel) {
      var u = null,
          c = null,
          s = function e() {
        if (null !== u) try {
          var t = n.unstable_now();
          u(!0, t), u = null;
        } catch (t) {
          throw setTimeout(e, 0), t;
        }
      },
          f = Date.now();

      n.unstable_now = function () {
        return Date.now() - f;
      }, r = function (e) {
        null !== u ? setTimeout(r, 0, e) : (u = e, setTimeout(s, 0));
      }, l = function (e, t) {
        c = setTimeout(e, t);
      }, a = function () {
        clearTimeout(c);
      }, i = function () {
        return !1;
      }, o = n.unstable_forceFrameRate = function () {};
    } else {
      var d = window.performance,
          p = window.Date,
          m = window.setTimeout,
          h = window.clearTimeout;

      if ("undefined" != typeof console) {
        var y = window.cancelAnimationFrame;
        "function" != typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"), "function" != typeof y && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
      }

      if ("object" === e(d) && "function" == typeof d.now) n.unstable_now = function () {
        return d.now();
      };else {
        var v = p.now();

        n.unstable_now = function () {
          return p.now() - v;
        };
      }
      var b = !1,
          g = null,
          k = -1,
          w = 5,
          E = 0;
      i = function () {
        return n.unstable_now() >= E;
      }, o = function () {}, n.unstable_forceFrameRate = function (e) {
        0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
      };
      var x = new MessageChannel(),
          T = x.port2;
      x.port1.onmessage = function () {
        if (null !== g) {
          var e = n.unstable_now();
          E = e + w;

          try {
            g(!0, e) ? T.postMessage(null) : (b = !1, g = null);
          } catch (e) {
            throw T.postMessage(null), e;
          }
        } else b = !1;
      }, r = function (e) {
        g = e, b || (b = !0, T.postMessage(null));
      }, l = function (e, t) {
        k = m(function () {
          e(n.unstable_now());
        }, t);
      }, a = function () {
        h(k), k = -1;
      };
    }

    function S(e, t) {
      var n = e.length;
      e.push(t);

      e: for (;;) {
        var r = Math.floor((n - 1) / 2),
            l = e[r];
        if (!(void 0 !== l && 0 < P(l, t))) break e;
        e[r] = t, e[n] = l, n = r;
      }
    }

    function C(e) {
      return void 0 === (e = e[0]) ? null : e;
    }

    function _(e) {
      var t = e[0];

      if (void 0 !== t) {
        var n = e.pop();

        if (n !== t) {
          e[0] = n;

          e: for (var r = 0, l = e.length; r < l;) {
            var a = 2 * (r + 1) - 1,
                i = e[a],
                o = a + 1,
                u = e[o];
            if (void 0 !== i && 0 > P(i, n)) void 0 !== u && 0 > P(u, i) ? (e[r] = u, e[o] = n, r = o) : (e[r] = i, e[a] = n, r = a);else {
              if (!(void 0 !== u && 0 > P(u, n))) break e;
              e[r] = u, e[o] = n, r = o;
            }
          }
        }

        return t;
      }

      return null;
    }

    function P(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return 0 !== n ? n : e.id - t.id;
    }

    var N = [],
        O = [],
        M = 1,
        z = null,
        I = 3,
        R = !1,
        D = !1,
        F = !1;

    function U(e) {
      for (var t = C(O); null !== t;) {
        if (null === t.callback) _(O);else {
          if (!(t.startTime <= e)) break;
          _(O), t.sortIndex = t.expirationTime, S(N, t);
        }
        t = C(O);
      }
    }

    function L(e) {
      if (F = !1, U(e), !D) if (null !== C(N)) D = !0, r(j);else {
        var t = C(O);
        null !== t && l(L, t.startTime - e);
      }
    }

    function j(e, t) {
      D = !1, F && (F = !1, a()), R = !0;
      var r = I;

      try {
        for (U(t), z = C(N); null !== z && (!(z.expirationTime > t) || e && !i());) {
          var o = z.callback;

          if (null !== o) {
            z.callback = null, I = z.priorityLevel;
            var u = o(z.expirationTime <= t);
            t = n.unstable_now(), "function" == typeof u ? z.callback = u : z === C(N) && _(N), U(t);
          } else _(N);

          z = C(N);
        }

        if (null !== z) var c = !0;else {
          var s = C(O);
          null !== s && l(L, s.startTime - t), c = !1;
        }
        return c;
      } finally {
        z = null, I = r, R = !1;
      }
    }

    function A(e) {
      switch (e) {
        case 1:
          return -1;

        case 2:
          return 250;

        case 5:
          return 1073741823;

        case 4:
          return 1e4;

        default:
          return 5e3;
      }
    }

    var W = o;
    n.unstable_ImmediatePriority = 1, n.unstable_UserBlockingPriority = 2, n.unstable_NormalPriority = 3, n.unstable_IdlePriority = 5, n.unstable_LowPriority = 4, n.unstable_runWithPriority = function (e, t) {
      switch (e) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;

        default:
          e = 3;
      }

      var n = I;
      I = e;

      try {
        return t();
      } finally {
        I = n;
      }
    }, n.unstable_next = function (e) {
      switch (I) {
        case 1:
        case 2:
        case 3:
          var t = 3;
          break;

        default:
          t = I;
      }

      var n = I;
      I = t;

      try {
        return e();
      } finally {
        I = n;
      }
    }, n.unstable_scheduleCallback = function (t, i, o) {
      var u = n.unstable_now();

      if ("object" === e(o) && null !== o) {
        var c = o.delay;
        c = "number" == typeof c && 0 < c ? u + c : u, o = "number" == typeof o.timeout ? o.timeout : A(t);
      } else o = A(t), c = u;

      return t = {
        id: M++,
        callback: i,
        priorityLevel: t,
        startTime: c,
        expirationTime: o = c + o,
        sortIndex: -1
      }, c > u ? (t.sortIndex = c, S(O, t), null === C(N) && t === C(O) && (F ? a() : F = !0, l(L, c - u))) : (t.sortIndex = o, S(N, t), D || R || (D = !0, r(j))), t;
    }, n.unstable_cancelCallback = function (e) {
      e.callback = null;
    }, n.unstable_wrapCallback = function (e) {
      var t = I;
      return function () {
        var n = I;
        I = t;

        try {
          return e.apply(this, arguments);
        } finally {
          I = n;
        }
      };
    }, n.unstable_getCurrentPriorityLevel = function () {
      return I;
    }, n.unstable_shouldYield = function () {
      var e = n.unstable_now();
      U(e);
      var t = C(N);
      return t !== z && null !== z && null !== t && null !== t.callback && t.startTime <= e && t.expirationTime < z.expirationTime || i();
    }, n.unstable_requestPaint = W, n.unstable_continueExecution = function () {
      D || R || (D = !0, r(j));
    }, n.unstable_pauseExecution = function () {}, n.unstable_getFirstCallbackNode = function () {
      return C(N);
    }, n.unstable_Profiling = null;
  });
  q(te);
  te.unstable_now, te.unstable_forceFrameRate, te.unstable_ImmediatePriority, te.unstable_UserBlockingPriority, te.unstable_NormalPriority, te.unstable_IdlePriority, te.unstable_LowPriority, te.unstable_runWithPriority, te.unstable_next, te.unstable_scheduleCallback, te.unstable_cancelCallback, te.unstable_wrapCallback, te.unstable_getCurrentPriorityLevel, te.unstable_shouldYield, te.unstable_requestPaint, te.unstable_continueExecution, te.unstable_pauseExecution, te.unstable_getFirstCallbackNode, te.unstable_Profiling;
  var ne = X(function (e, t) {});
  q(ne);
  ne.unstable_now, ne.unstable_forceFrameRate, ne.unstable_ImmediatePriority, ne.unstable_UserBlockingPriority, ne.unstable_NormalPriority, ne.unstable_IdlePriority, ne.unstable_LowPriority, ne.unstable_runWithPriority, ne.unstable_next, ne.unstable_scheduleCallback, ne.unstable_cancelCallback, ne.unstable_wrapCallback, ne.unstable_getCurrentPriorityLevel, ne.unstable_shouldYield, ne.unstable_requestPaint, ne.unstable_continueExecution, ne.unstable_pauseExecution, ne.unstable_getFirstCallbackNode, ne.unstable_Profiling;
  var re = X(function (e) {
    e.exports = te;
  });

  function le(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);

    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }

  if (!K) throw Error(le(227));
  var ae = null,
      ie = {};

  function oe() {
    if (ae) for (var e in ie) {
      var t = ie[e],
          n = ae.indexOf(e);
      if (!(-1 < n)) throw Error(le(96, e));

      if (!ce[n]) {
        if (!t.extractEvents) throw Error(le(97, e));

        for (var r in ce[n] = t, n = t.eventTypes) {
          var l = void 0,
              a = n[r],
              i = t,
              o = r;
          if (se.hasOwnProperty(o)) throw Error(le(99, o));
          se[o] = a;
          var u = a.phasedRegistrationNames;

          if (u) {
            for (l in u) u.hasOwnProperty(l) && ue(u[l], i, o);

            l = !0;
          } else a.registrationName ? (ue(a.registrationName, i, o), l = !0) : l = !1;

          if (!l) throw Error(le(98, r, e));
        }
      }
    }
  }

  function ue(e, t, n) {
    if (fe[e]) throw Error(le(100, e));
    fe[e] = t, de[e] = t.eventTypes[n].dependencies;
  }

  var ce = [],
      se = {},
      fe = {},
      de = {};

  function pe(e, t, n, r, l, a, i, o, u) {
    var c = Array.prototype.slice.call(arguments, 3);

    try {
      t.apply(n, c);
    } catch (e) {
      this.onError(e);
    }
  }

  var me = !1,
      he = null,
      ye = !1,
      ve = null,
      be = {
    onError: function (e) {
      me = !0, he = e;
    }
  };

  function ge(e, t, n, r, l, a, i, o, u) {
    me = !1, he = null, pe.apply(be, arguments);
  }

  var ke = null,
      we = null,
      Ee = null;

  function xe(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = Ee(n), function (e, t, n, r, l, a, i, o, u) {
      if (ge.apply(this, arguments), me) {
        if (!me) throw Error(le(198));
        var c = he;
        me = !1, he = null, ye || (ye = !0, ve = c);
      }
    }(r, t, void 0, e), e.currentTarget = null;
  }

  function Te(e, t) {
    if (null == t) throw Error(le(30));
    return null == e ? t : Array.isArray(e) ? Array.isArray(t) ? (e.push.apply(e, t), e) : (e.push(t), e) : Array.isArray(t) ? [e].concat(t) : [e, t];
  }

  function Se(e, t, n) {
    Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e);
  }

  var Ce = null;

  function _e(e) {
    if (e) {
      var t = e._dispatchListeners,
          n = e._dispatchInstances;
      if (Array.isArray(t)) for (var r = 0; r < t.length && !e.isPropagationStopped(); r++) xe(e, t[r], n[r]);else t && xe(e, t, n);
      e._dispatchListeners = null, e._dispatchInstances = null, e.isPersistent() || e.constructor.release(e);
    }
  }

  function Pe(e) {
    if (null !== e && (Ce = Te(Ce, e)), e = Ce, Ce = null, e) {
      if (Se(e, _e), Ce) throw Error(le(95));
      if (ye) throw e = ve, ye = !1, ve = null, e;
    }
  }

  var Ne = {
    injectEventPluginOrder: function (e) {
      if (ae) throw Error(le(101));
      ae = Array.prototype.slice.call(e), oe();
    },
    injectEventPluginsByName: function (e) {
      var t,
          n = !1;

      for (t in e) if (e.hasOwnProperty(t)) {
        var r = e[t];

        if (!ie.hasOwnProperty(t) || ie[t] !== r) {
          if (ie[t]) throw Error(le(102, t));
          ie[t] = r, n = !0;
        }
      }

      n && oe();
    }
  };

  function Oe(t, n) {
    var r = t.stateNode;
    if (!r) return null;
    var l = ke(r);
    if (!l) return null;
    r = l[n];

    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
        (l = !l.disabled) || (l = !("button" === (t = t.type) || "input" === t || "select" === t || "textarea" === t)), t = !l;
        break e;

      default:
        t = !1;
    }

    if (t) return null;
    if (r && "function" != typeof r) throw Error(le(231, n, e(r)));
    return r;
  }

  var Me = K.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  Me.hasOwnProperty("ReactCurrentDispatcher") || (Me.ReactCurrentDispatcher = {
    current: null
  }), Me.hasOwnProperty("ReactCurrentBatchConfig") || (Me.ReactCurrentBatchConfig = {
    suspense: null
  });
  var ze = /^(.*)[\\\/]/,
      Ie = "function" == typeof Symbol && Symbol.for,
      Re = Ie ? Symbol.for("react.element") : 60103,
      De = Ie ? Symbol.for("react.portal") : 60106,
      Fe = Ie ? Symbol.for("react.fragment") : 60107,
      Ue = Ie ? Symbol.for("react.strict_mode") : 60108,
      Le = Ie ? Symbol.for("react.profiler") : 60114,
      je = Ie ? Symbol.for("react.provider") : 60109,
      Ae = Ie ? Symbol.for("react.context") : 60110,
      We = Ie ? Symbol.for("react.concurrent_mode") : 60111,
      Ve = Ie ? Symbol.for("react.forward_ref") : 60112,
      Be = Ie ? Symbol.for("react.suspense") : 60113,
      Qe = Ie ? Symbol.for("react.suspense_list") : 60120,
      $e = Ie ? Symbol.for("react.memo") : 60115,
      He = Ie ? Symbol.for("react.lazy") : 60116,
      Ke = "function" == typeof Symbol && Symbol.iterator;

  function qe(t) {
    return null === t || "object" !== e(t) ? null : "function" == typeof (t = Ke && t[Ke] || t["@@iterator"]) ? t : null;
  }

  function Xe(t) {
    if (null == t) return null;
    if ("function" == typeof t) return t.displayName || t.name || null;
    if ("string" == typeof t) return t;

    switch (t) {
      case Fe:
        return "Fragment";

      case De:
        return "Portal";

      case Le:
        return "Profiler";

      case Ue:
        return "StrictMode";

      case Be:
        return "Suspense";

      case Qe:
        return "SuspenseList";
    }

    if ("object" === e(t)) switch (t.$$typeof) {
      case Ae:
        return "Context.Consumer";

      case je:
        return "Context.Provider";

      case Ve:
        var n = t.render;
        return n = n.displayName || n.name || "", t.displayName || ("" !== n ? "ForwardRef(" + n + ")" : "ForwardRef");

      case $e:
        return Xe(t.type);

      case He:
        if (t = 1 === t._status ? t._result : null) return Xe(t);
    }
    return null;
  }

  function Ye(e) {
    var t = "";

    do {
      e: switch (e.tag) {
        case 3:
        case 4:
        case 6:
        case 7:
        case 10:
        case 9:
          var n = "";
          break e;

        default:
          var r = e._debugOwner,
              l = e._debugSource,
              a = Xe(e.type);
          n = null, r && (n = Xe(r.type)), r = a, a = "", l ? a = " (at " + l.fileName.replace(ze, "") + ":" + l.lineNumber + ")" : n && (a = " (created by " + n + ")"), n = "\n    in " + (r || "Unknown") + a;
      }

      t += n, e = e.return;
    } while (e);

    return t;
  }

  var Ge = !("undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement),
      Ze = null,
      Je = null,
      et = null;

  function tt(e) {
    if (e = we(e)) {
      if ("function" != typeof Ze) throw Error(le(280));
      var t = ke(e.stateNode);
      Ze(e.stateNode, e.type, t);
    }
  }

  function nt(e) {
    Je ? et ? et.push(e) : et = [e] : Je = e;
  }

  function rt() {
    if (Je) {
      var e = Je,
          t = et;
      if (et = Je = null, tt(e), t) for (e = 0; e < t.length; e++) tt(t[e]);
    }
  }

  function lt(e, t) {
    return e(t);
  }

  function at(e, t, n, r) {
    return e(t, n, r);
  }

  function it() {}

  var ot = lt,
      ut = !1,
      ct = !1;

  function st() {
    null === Je && null === et || (it(), rt());
  }

  var ft = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      dt = Object.prototype.hasOwnProperty,
      pt = {},
      mt = {};

  function ht(t, n, r, l) {
    if (null == n || function (t, n, r, l) {
      if (null !== r && 0 === r.type) return !1;

      switch (e(n)) {
        case "function":
        case "symbol":
          return !0;

        case "boolean":
          return !l && (null !== r ? !r.acceptsBooleans : "data-" !== (t = t.toLowerCase().slice(0, 5)) && "aria-" !== t);

        default:
          return !1;
      }
    }(t, n, r, l)) return !0;
    if (l) return !1;
    if (null !== r) switch (r.type) {
      case 3:
        return !n;

      case 4:
        return !1 === n;

      case 5:
        return isNaN(n);

      case 6:
        return isNaN(n) || 1 > n;
    }
    return !1;
  }

  function yt(e, t, n, r, l, a) {
    this.acceptsBooleans = 2 === t || 3 === t || 4 === t, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = a;
  }

  var vt = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (e) {
    vt[e] = new yt(e, 0, !1, e, null, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (e) {
    var t = e[0];
    vt[t] = new yt(t, 1, !1, e[1], null, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    vt[e] = new yt(e, 2, !1, e.toLowerCase(), null, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
    vt[e] = new yt(e, 2, !1, e, null, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (e) {
    vt[e] = new yt(e, 3, !1, e.toLowerCase(), null, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function (e) {
    vt[e] = new yt(e, 3, !0, e, null, !1);
  }), ["capture", "download"].forEach(function (e) {
    vt[e] = new yt(e, 4, !1, e, null, !1);
  }), ["cols", "rows", "size", "span"].forEach(function (e) {
    vt[e] = new yt(e, 6, !1, e, null, !1);
  }), ["rowSpan", "start"].forEach(function (e) {
    vt[e] = new yt(e, 5, !1, e.toLowerCase(), null, !1);
  });
  var bt = /[\-:]([a-z])/g;

  function gt(e) {
    return e[1].toUpperCase();
  }

  function kt(t) {
    switch (e(t)) {
      case "boolean":
      case "number":
      case "object":
      case "string":
      case "undefined":
        return t;

      default:
        return "";
    }
  }

  function wt(e, t, n, r) {
    var l = vt.hasOwnProperty(t) ? vt[t] : null;
    (null !== l ? 0 === l.type : !r && 2 < t.length && ("o" === t[0] || "O" === t[0]) && ("n" === t[1] || "N" === t[1])) || (ht(t, n, l, r) && (n = null), r || null === l ? function (e) {
      return !!dt.call(mt, e) || !dt.call(pt, e) && (ft.test(e) ? mt[e] = !0 : (pt[e] = !0, !1));
    }(t) && (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = null === n ? 3 !== l.type && "" : n : (t = l.attributeName, r = l.attributeNamespace, null === n ? e.removeAttribute(t) : (n = 3 === (l = l.type) || 4 === l && !0 === n ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }

  function Et(e) {
    var t = e.type;
    return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t);
  }

  function xt(e) {
    e._valueTracker || (e._valueTracker = function (e) {
      var t = Et(e) ? "checked" : "value",
          n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
          r = "" + e[t];

      if (!e.hasOwnProperty(t) && void 0 !== n && "function" == typeof n.get && "function" == typeof n.set) {
        var l = n.get,
            a = n.set;
        return Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return l.call(this);
          },
          set: function (e) {
            r = "" + e, a.call(this, e);
          }
        }), Object.defineProperty(e, t, {
          enumerable: n.enumerable
        }), {
          getValue: function () {
            return r;
          },
          setValue: function (e) {
            r = "" + e;
          },
          stopTracking: function () {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }(e));
  }

  function Tt(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = "";
    return e && (r = Et(e) ? e.checked ? "true" : "false" : e.value), (e = r) !== n && (t.setValue(e), !0);
  }

  function St(e, t) {
    var n = t.checked;
    return ee({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: null != n ? n : e._wrapperState.initialChecked
    });
  }

  function Ct(e, t) {
    var n = null == t.defaultValue ? "" : t.defaultValue,
        r = null != t.checked ? t.checked : t.defaultChecked;
    n = kt(null != t.value ? t.value : n), e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled: "checkbox" === t.type || "radio" === t.type ? null != t.checked : null != t.value
    };
  }

  function _t(e, t) {
    null != (t = t.checked) && wt(e, "checked", t, !1);
  }

  function Pt(e, t) {
    _t(e, t);

    var n = kt(t.value),
        r = t.type;
    if (null != n) "number" === r ? (0 === n && "" === e.value || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);else if ("submit" === r || "reset" === r) return void e.removeAttribute("value");
    t.hasOwnProperty("value") ? Ot(e, t.type, n) : t.hasOwnProperty("defaultValue") && Ot(e, t.type, kt(t.defaultValue)), null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked);
  }

  function Nt(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!("submit" !== r && "reset" !== r || void 0 !== t.value && null !== t.value)) return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }

    "" !== (n = e.name) && (e.name = ""), e.defaultChecked = !e.defaultChecked, e.defaultChecked = !!e._wrapperState.initialChecked, "" !== n && (e.name = n);
  }

  function Ot(e, t, n) {
    "number" === t && e.ownerDocument.activeElement === e || (null == n ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }

  function Mt(e, t) {
    return e = ee({
      children: void 0
    }, t), (t = function (e) {
      var t = "";
      return K.Children.forEach(e, function (e) {
        null != e && (t += e);
      }), t;
    }(t.children)) && (e.children = t), e;
  }

  function zt(e, t, n, r) {
    if (e = e.options, t) {
      t = {};

      for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;

      for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + kt(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) return e[l].selected = !0, void (r && (e[l].defaultSelected = !0));
        null !== t || e[l].disabled || (t = e[l]);
      }

      null !== t && (t.selected = !0);
    }
  }

  function It(e, t) {
    if (null != t.dangerouslySetInnerHTML) throw Error(le(91));
    return ee({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue
    });
  }

  function Rt(e, t) {
    var n = t.value;

    if (null == n) {
      if (n = t.defaultValue, null != (t = t.children)) {
        if (null != n) throw Error(le(92));

        if (Array.isArray(t)) {
          if (!(1 >= t.length)) throw Error(le(93));
          t = t[0];
        }

        n = t;
      }

      null == n && (n = "");
    }

    e._wrapperState = {
      initialValue: kt(n)
    };
  }

  function Dt(e, t) {
    var n = kt(t.value),
        r = kt(t.defaultValue);
    null != n && ((n = "" + n) !== e.value && (e.value = n), null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)), null != r && (e.defaultValue = "" + r);
  }

  function Ft(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && "" !== t && null !== t && (e.value = t);
  }

  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (e) {
    var t = e.replace(bt, gt);
    vt[t] = new yt(t, 1, !1, e, null, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (e) {
    var t = e.replace(bt, gt);
    vt[t] = new yt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var t = e.replace(bt, gt);
    vt[t] = new yt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1);
  }), ["tabIndex", "crossOrigin"].forEach(function (e) {
    vt[e] = new yt(e, 1, !1, e.toLowerCase(), null, !1);
  }), vt.xlinkHref = new yt("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0), ["src", "href", "action", "formAction"].forEach(function (e) {
    vt[e] = new yt(e, 1, !1, e.toLowerCase(), null, !0);
  });
  var Ut = "http://www.w3.org/1999/xhtml",
      Lt = "http://www.w3.org/2000/svg";

  function jt(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";

      case "math":
        return "http://www.w3.org/1998/Math/MathML";

      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }

  function At(e, t) {
    return null == e || "http://www.w3.org/1999/xhtml" === e ? jt(t) : "http://www.w3.org/2000/svg" === e && "foreignObject" === t ? "http://www.w3.org/1999/xhtml" : e;
  }

  var Wt,
      Vt = function (e) {
    return "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function (t, n, r, l) {
      MSApp.execUnsafeLocalFunction(function () {
        return e(t, n);
      });
    } : e;
  }(function (e, t) {
    if (e.namespaceURI !== Lt || "innerHTML" in e) e.innerHTML = t;else {
      for ((Wt = Wt || document.createElement("div")).innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Wt.firstChild; e.firstChild;) e.removeChild(e.firstChild);

      for (; t.firstChild;) e.appendChild(t.firstChild);
    }
  });

  function Bt(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && 3 === n.nodeType) return void (n.nodeValue = t);
    }

    e.textContent = t;
  }

  function Qt(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }

  var $t = {
    animationend: Qt("Animation", "AnimationEnd"),
    animationiteration: Qt("Animation", "AnimationIteration"),
    animationstart: Qt("Animation", "AnimationStart"),
    transitionend: Qt("Transition", "TransitionEnd")
  },
      Ht = {},
      Kt = {};

  function qt(e) {
    if (Ht[e]) return Ht[e];
    if (!$t[e]) return e;
    var t,
        n = $t[e];

    for (t in n) if (n.hasOwnProperty(t) && t in Kt) return Ht[e] = n[t];

    return e;
  }

  Ge && (Kt = document.createElement("div").style, "AnimationEvent" in window || (delete $t.animationend.animation, delete $t.animationiteration.animation, delete $t.animationstart.animation), "TransitionEvent" in window || delete $t.transitionend.transition);
  var Xt = qt("animationend"),
      Yt = qt("animationiteration"),
      Gt = qt("animationstart"),
      Zt = qt("transitionend"),
      Jt = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");

  function en(e) {
    var t = e,
        n = e;
    if (e.alternate) for (; t.return;) t = t.return;else {
      e = t;

      do {
        0 != (1026 & (t = e).effectTag) && (n = t.return), e = t.return;
      } while (e);
    }
    return 3 === t.tag ? n : null;
  }

  function tn(e) {
    if (13 === e.tag) {
      var t = e.memoizedState;
      if (null === t && null !== (e = e.alternate) && (t = e.memoizedState), null !== t) return t.dehydrated;
    }

    return null;
  }

  function nn(e) {
    if (en(e) !== e) throw Error(le(188));
  }

  function rn(e) {
    if (!(e = function (e) {
      var t = e.alternate;

      if (!t) {
        if (null === (t = en(e))) throw Error(le(188));
        return t !== e ? null : e;
      }

      for (var n = e, r = t;;) {
        var l = n.return;
        if (null === l) break;
        var a = l.alternate;

        if (null === a) {
          if (null !== (r = l.return)) {
            n = r;
            continue;
          }

          break;
        }

        if (l.child === a.child) {
          for (a = l.child; a;) {
            if (a === n) return nn(l), e;
            if (a === r) return nn(l), t;
            a = a.sibling;
          }

          throw Error(le(188));
        }

        if (n.return !== r.return) n = l, r = a;else {
          for (var i = !1, o = l.child; o;) {
            if (o === n) {
              i = !0, n = l, r = a;
              break;
            }

            if (o === r) {
              i = !0, r = l, n = a;
              break;
            }

            o = o.sibling;
          }

          if (!i) {
            for (o = a.child; o;) {
              if (o === n) {
                i = !0, n = a, r = l;
                break;
              }

              if (o === r) {
                i = !0, r = a, n = l;
                break;
              }

              o = o.sibling;
            }

            if (!i) throw Error(le(189));
          }
        }
        if (n.alternate !== r) throw Error(le(190));
      }

      if (3 !== n.tag) throw Error(le(188));
      return n.stateNode.current === n ? e : t;
    }(e))) return null;

    for (var t = e;;) {
      if (5 === t.tag || 6 === t.tag) return t;
      if (t.child) t.child.return = t, t = t.child;else {
        if (t === e) break;

        for (; !t.sibling;) {
          if (!t.return || t.return === e) return null;
          t = t.return;
        }

        t.sibling.return = t.return, t = t.sibling;
      }
    }

    return null;
  }

  var ln,
      an,
      on,
      un = !1,
      cn = [],
      sn = null,
      fn = null,
      dn = null,
      pn = new Map(),
      mn = new Map(),
      hn = [],
      yn = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(" "),
      vn = "focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(" ");

  function bn(e, t, n, r) {
    return {
      blockedOn: e,
      topLevelType: t,
      eventSystemFlags: 32 | n,
      nativeEvent: r
    };
  }

  function gn(e, t) {
    switch (e) {
      case "focus":
      case "blur":
        sn = null;
        break;

      case "dragenter":
      case "dragleave":
        fn = null;
        break;

      case "mouseover":
      case "mouseout":
        dn = null;
        break;

      case "pointerover":
      case "pointerout":
        pn.delete(t.pointerId);
        break;

      case "gotpointercapture":
      case "lostpointercapture":
        mn.delete(t.pointerId);
    }
  }

  function kn(e, t, n, r, l) {
    return null === e || e.nativeEvent !== l ? (e = bn(t, n, r, l), null !== t && null !== (t = ul(t)) && an(t), e) : (e.eventSystemFlags |= r, e);
  }

  function wn(e) {
    var t = ol(e.target);

    if (null !== t) {
      var n = en(t);
      if (null !== n) if (13 === (t = n.tag)) {
        if (null !== (t = tn(n))) return e.blockedOn = t, void re.unstable_runWithPriority(e.priority, function () {
          on(n);
        });
      } else if (3 === t && n.stateNode.hydrate) return void (e.blockedOn = 3 === n.tag ? n.stateNode.containerInfo : null);
    }

    e.blockedOn = null;
  }

  function En(e) {
    if (null !== e.blockedOn) return !1;
    var t = Or(e.topLevelType, e.eventSystemFlags, e.nativeEvent);

    if (null !== t) {
      var n = ul(t);
      return null !== n && an(n), e.blockedOn = t, !1;
    }

    return !0;
  }

  function xn(e, t, n) {
    En(e) && n.delete(t);
  }

  function Tn() {
    for (un = !1; 0 < cn.length;) {
      var e = cn[0];

      if (null !== e.blockedOn) {
        null !== (e = ul(e.blockedOn)) && ln(e);
        break;
      }

      var t = Or(e.topLevelType, e.eventSystemFlags, e.nativeEvent);
      null !== t ? e.blockedOn = t : cn.shift();
    }

    null !== sn && En(sn) && (sn = null), null !== fn && En(fn) && (fn = null), null !== dn && En(dn) && (dn = null), pn.forEach(xn), mn.forEach(xn);
  }

  function Sn(e, t) {
    e.blockedOn === t && (e.blockedOn = null, un || (un = !0, re.unstable_scheduleCallback(re.unstable_NormalPriority, Tn)));
  }

  function Cn(e) {
    function t(t) {
      return Sn(t, e);
    }

    if (0 < cn.length) {
      Sn(cn[0], e);

      for (var n = 1; n < cn.length; n++) {
        var r = cn[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }

    for (null !== sn && Sn(sn, e), null !== fn && Sn(fn, e), null !== dn && Sn(dn, e), pn.forEach(t), mn.forEach(t), n = 0; n < hn.length; n++) (r = hn[n]).blockedOn === e && (r.blockedOn = null);

    for (; 0 < hn.length && null === (n = hn[0]).blockedOn;) wn(n), null === n.blockedOn && hn.shift();
  }

  function _n(e) {
    return (e = e.target || e.srcElement || window).correspondingUseElement && (e = e.correspondingUseElement), 3 === e.nodeType ? e.parentNode : e;
  }

  function Pn(e) {
    do {
      e = e.return;
    } while (e && 5 !== e.tag);

    return e || null;
  }

  function Nn(e, t, n) {
    (t = Oe(e, n.dispatchConfig.phasedRegistrationNames[t])) && (n._dispatchListeners = Te(n._dispatchListeners, t), n._dispatchInstances = Te(n._dispatchInstances, e));
  }

  function On(e) {
    if (e && e.dispatchConfig.phasedRegistrationNames) {
      for (var t = e._targetInst, n = []; t;) n.push(t), t = Pn(t);

      for (t = n.length; 0 < t--;) Nn(n[t], "captured", e);

      for (t = 0; t < n.length; t++) Nn(n[t], "bubbled", e);
    }
  }

  function Mn(e, t, n) {
    e && n && n.dispatchConfig.registrationName && (t = Oe(e, n.dispatchConfig.registrationName)) && (n._dispatchListeners = Te(n._dispatchListeners, t), n._dispatchInstances = Te(n._dispatchInstances, e));
  }

  function zn(e) {
    e && e.dispatchConfig.registrationName && Mn(e._targetInst, null, e);
  }

  function In(e) {
    Se(e, On);
  }

  function Rn() {
    return !0;
  }

  function Dn() {
    return !1;
  }

  function Fn(e, t, n, r) {
    for (var l in this.dispatchConfig = e, this._targetInst = t, this.nativeEvent = n, e = this.constructor.Interface) e.hasOwnProperty(l) && ((t = e[l]) ? this[l] = t(n) : "target" === l ? this.target = r : this[l] = n[l]);

    return this.isDefaultPrevented = (null != n.defaultPrevented ? n.defaultPrevented : !1 === n.returnValue) ? Rn : Dn, this.isPropagationStopped = Dn, this;
  }

  function Un(e, t, n, r) {
    if (this.eventPool.length) {
      var l = this.eventPool.pop();
      return this.call(l, e, t, n, r), l;
    }

    return new this(e, t, n, r);
  }

  function Ln(e) {
    if (!(e instanceof this)) throw Error(le(279));
    e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e);
  }

  function jn(e) {
    e.eventPool = [], e.getPooled = Un, e.release = Ln;
  }

  ee(Fn.prototype, {
    preventDefault: function () {
      this.defaultPrevented = !0;
      var e = this.nativeEvent;
      e && (e.preventDefault ? e.preventDefault() : "unknown" != typeof e.returnValue && (e.returnValue = !1), this.isDefaultPrevented = Rn);
    },
    stopPropagation: function () {
      var e = this.nativeEvent;
      e && (e.stopPropagation ? e.stopPropagation() : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0), this.isPropagationStopped = Rn);
    },
    persist: function () {
      this.isPersistent = Rn;
    },
    isPersistent: Dn,
    destructor: function () {
      var e,
          t = this.constructor.Interface;

      for (e in t) this[e] = null;

      this.nativeEvent = this._targetInst = this.dispatchConfig = null, this.isPropagationStopped = this.isDefaultPrevented = Dn, this._dispatchInstances = this._dispatchListeners = null;
    }
  }), Fn.Interface = {
    type: null,
    target: null,
    currentTarget: function () {
      return null;
    },
    eventPhase: null,
    bubbles: null,
    cancelable: null,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: null,
    isTrusted: null
  }, Fn.extend = function (e) {
    function t() {}

    function n() {
      return r.apply(this, arguments);
    }

    var r = this;
    t.prototype = r.prototype;
    var l = new t();
    return ee(l, n.prototype), n.prototype = l, n.prototype.constructor = n, n.Interface = ee({}, r.Interface, e), n.extend = r.extend, jn(n), n;
  }, jn(Fn);
  var An = Fn.extend({
    animationName: null,
    elapsedTime: null,
    pseudoElement: null
  }),
      Wn = Fn.extend({
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }),
      Vn = Fn.extend({
    view: null,
    detail: null
  }),
      Bn = Vn.extend({
    relatedTarget: null
  });

  function Qn(e) {
    var t = e.keyCode;
    return "charCode" in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : e = t, 10 === e && (e = 13), 32 <= e || 13 === e ? e : 0;
  }

  var $n = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  },
      Hn = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  },
      Kn = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };

  function qn(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : !!(e = Kn[e]) && !!t[e];
  }

  function Xn() {
    return qn;
  }

  for (var Yn = Vn.extend({
    key: function (e) {
      if (e.key) {
        var t = $n[e.key] || e.key;
        if ("Unidentified" !== t) return t;
      }

      return "keypress" === e.type ? 13 === (e = Qn(e)) ? "Enter" : String.fromCharCode(e) : "keydown" === e.type || "keyup" === e.type ? Hn[e.keyCode] || "Unidentified" : "";
    },
    location: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    repeat: null,
    locale: null,
    getModifierState: Xn,
    charCode: function (e) {
      return "keypress" === e.type ? Qn(e) : 0;
    },
    keyCode: function (e) {
      return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
    },
    which: function (e) {
      return "keypress" === e.type ? Qn(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
    }
  }), Gn = 0, Zn = 0, Jn = !1, er = !1, tr = Vn.extend({
    screenX: null,
    screenY: null,
    clientX: null,
    clientY: null,
    pageX: null,
    pageY: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    getModifierState: Xn,
    button: null,
    buttons: null,
    relatedTarget: function (e) {
      return e.relatedTarget || (e.fromElement === e.srcElement ? e.toElement : e.fromElement);
    },
    movementX: function (e) {
      if (("movementX" in e)) return e.movementX;
      var t = Gn;
      return Gn = e.screenX, Jn ? "mousemove" === e.type ? e.screenX - t : 0 : (Jn = !0, 0);
    },
    movementY: function (e) {
      if (("movementY" in e)) return e.movementY;
      var t = Zn;
      return Zn = e.screenY, er ? "mousemove" === e.type ? e.screenY - t : 0 : (er = !0, 0);
    }
  }), nr = tr.extend({
    pointerId: null,
    width: null,
    height: null,
    pressure: null,
    tangentialPressure: null,
    tiltX: null,
    tiltY: null,
    twist: null,
    pointerType: null,
    isPrimary: null
  }), rr = tr.extend({
    dataTransfer: null
  }), lr = Vn.extend({
    touches: null,
    targetTouches: null,
    changedTouches: null,
    altKey: null,
    metaKey: null,
    ctrlKey: null,
    shiftKey: null,
    getModifierState: Xn
  }), ar = Fn.extend({
    propertyName: null,
    elapsedTime: null,
    pseudoElement: null
  }), ir = tr.extend({
    deltaX: function (e) {
      return ("deltaX" in e) ? e.deltaX : ("wheelDeltaX" in e) ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return ("deltaY" in e) ? e.deltaY : ("wheelDeltaY" in e) ? -e.wheelDeltaY : ("wheelDelta" in e) ? -e.wheelDelta : 0;
    },
    deltaZ: null,
    deltaMode: null
  }), or = [["blur", "blur", 0], ["cancel", "cancel", 0], ["click", "click", 0], ["close", "close", 0], ["contextmenu", "contextMenu", 0], ["copy", "copy", 0], ["cut", "cut", 0], ["auxclick", "auxClick", 0], ["dblclick", "doubleClick", 0], ["dragend", "dragEnd", 0], ["dragstart", "dragStart", 0], ["drop", "drop", 0], ["focus", "focus", 0], ["input", "input", 0], ["invalid", "invalid", 0], ["keydown", "keyDown", 0], ["keypress", "keyPress", 0], ["keyup", "keyUp", 0], ["mousedown", "mouseDown", 0], ["mouseup", "mouseUp", 0], ["paste", "paste", 0], ["pause", "pause", 0], ["play", "play", 0], ["pointercancel", "pointerCancel", 0], ["pointerdown", "pointerDown", 0], ["pointerup", "pointerUp", 0], ["ratechange", "rateChange", 0], ["reset", "reset", 0], ["seeked", "seeked", 0], ["submit", "submit", 0], ["touchcancel", "touchCancel", 0], ["touchend", "touchEnd", 0], ["touchstart", "touchStart", 0], ["volumechange", "volumeChange", 0], ["drag", "drag", 1], ["dragenter", "dragEnter", 1], ["dragexit", "dragExit", 1], ["dragleave", "dragLeave", 1], ["dragover", "dragOver", 1], ["mousemove", "mouseMove", 1], ["mouseout", "mouseOut", 1], ["mouseover", "mouseOver", 1], ["pointermove", "pointerMove", 1], ["pointerout", "pointerOut", 1], ["pointerover", "pointerOver", 1], ["scroll", "scroll", 1], ["toggle", "toggle", 1], ["touchmove", "touchMove", 1], ["wheel", "wheel", 1], ["abort", "abort", 2], [Xt, "animationEnd", 2], [Yt, "animationIteration", 2], [Gt, "animationStart", 2], ["canplay", "canPlay", 2], ["canplaythrough", "canPlayThrough", 2], ["durationchange", "durationChange", 2], ["emptied", "emptied", 2], ["encrypted", "encrypted", 2], ["ended", "ended", 2], ["error", "error", 2], ["gotpointercapture", "gotPointerCapture", 2], ["load", "load", 2], ["loadeddata", "loadedData", 2], ["loadedmetadata", "loadedMetadata", 2], ["loadstart", "loadStart", 2], ["lostpointercapture", "lostPointerCapture", 2], ["playing", "playing", 2], ["progress", "progress", 2], ["seeking", "seeking", 2], ["stalled", "stalled", 2], ["suspend", "suspend", 2], ["timeupdate", "timeUpdate", 2], [Zt, "transitionEnd", 2], ["waiting", "waiting", 2]], ur = {}, cr = {}, sr = 0; sr < or.length; sr++) {
    var fr = or[sr],
        dr = fr[0],
        pr = fr[1],
        mr = fr[2],
        hr = "on" + (pr[0].toUpperCase() + pr.slice(1)),
        yr = {
      phasedRegistrationNames: {
        bubbled: hr,
        captured: hr + "Capture"
      },
      dependencies: [dr],
      eventPriority: mr
    };
    ur[pr] = yr, cr[dr] = yr;
  }

  var vr = {
    eventTypes: ur,
    getEventPriority: function (e) {
      return void 0 !== (e = cr[e]) ? e.eventPriority : 2;
    },
    extractEvents: function (e, t, n, r) {
      var l = cr[e];
      if (!l) return null;

      switch (e) {
        case "keypress":
          if (0 === Qn(n)) return null;

        case "keydown":
        case "keyup":
          e = Yn;
          break;

        case "blur":
        case "focus":
          e = Bn;
          break;

        case "click":
          if (2 === n.button) return null;

        case "auxclick":
        case "dblclick":
        case "mousedown":
        case "mousemove":
        case "mouseup":
        case "mouseout":
        case "mouseover":
        case "contextmenu":
          e = tr;
          break;

        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          e = rr;
          break;

        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          e = lr;
          break;

        case Xt:
        case Yt:
        case Gt:
          e = An;
          break;

        case Zt:
          e = ar;
          break;

        case "scroll":
          e = Vn;
          break;

        case "wheel":
          e = ir;
          break;

        case "copy":
        case "cut":
        case "paste":
          e = Wn;
          break;

        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          e = nr;
          break;

        default:
          e = Fn;
      }

      return In(t = e.getPooled(l, t, n, r)), t;
    }
  },
      br = re.unstable_UserBlockingPriority,
      gr = re.unstable_runWithPriority,
      kr = vr.getEventPriority,
      wr = [];

  function Er(e) {
    var t = e.targetInst,
        n = t;

    do {
      if (!n) {
        e.ancestors.push(n);
        break;
      }

      var r = n;
      if (3 === r.tag) r = r.stateNode.containerInfo;else {
        for (; r.return;) r = r.return;

        r = 3 !== r.tag ? null : r.stateNode.containerInfo;
      }
      if (!r) break;
      5 !== (t = n.tag) && 6 !== t || e.ancestors.push(n), n = ol(r);
    } while (n);

    for (n = 0; n < e.ancestors.length; n++) {
      t = e.ancestors[n];

      var l = _n(e.nativeEvent);

      r = e.topLevelType;

      for (var a = e.nativeEvent, i = e.eventSystemFlags, o = null, u = 0; u < ce.length; u++) {
        var c = ce[u];
        c && (c = c.extractEvents(r, t, a, l, i)) && (o = Te(o, c));
      }

      Pe(o);
    }
  }

  var xr = !0;

  function Tr(e, t) {
    Sr(t, e, !1);
  }

  function Sr(e, t, n) {
    switch (kr(t)) {
      case 0:
        var r = Cr.bind(null, t, 1);
        break;

      case 1:
        r = _r.bind(null, t, 1);
        break;

      default:
        r = Nr.bind(null, t, 1);
    }

    n ? e.addEventListener(t, r, !0) : e.addEventListener(t, r, !1);
  }

  function Cr(e, t, n) {
    ut || it();
    var r = Nr,
        l = ut;
    ut = !0;

    try {
      at(r, e, t, n);
    } finally {
      (ut = l) || st();
    }
  }

  function _r(e, t, n) {
    gr(br, Nr.bind(null, e, t, n));
  }

  function Pr(e, t, n, r) {
    if (wr.length) {
      var l = wr.pop();
      l.topLevelType = e, l.eventSystemFlags = t, l.nativeEvent = n, l.targetInst = r, e = l;
    } else e = {
      topLevelType: e,
      eventSystemFlags: t,
      nativeEvent: n,
      targetInst: r,
      ancestors: []
    };

    try {
      if (t = Er, n = e, ct) t(n, void 0);else {
        ct = !0;

        try {
          ot(t, n, void 0);
        } finally {
          ct = !1, st();
        }
      }
    } finally {
      e.topLevelType = null, e.nativeEvent = null, e.targetInst = null, e.ancestors.length = 0, wr.length < 10 && wr.push(e);
    }
  }

  function Nr(e, t, n) {
    if (xr) if (0 < cn.length && -1 < yn.indexOf(e)) e = bn(null, e, t, n), cn.push(e);else {
      var r = Or(e, t, n);
      null === r ? gn(e, n) : -1 < yn.indexOf(e) ? (e = bn(r, e, t, n), cn.push(e)) : function (e, t, n, r) {
        switch (t) {
          case "focus":
            return sn = kn(sn, e, t, n, r), !0;

          case "dragenter":
            return fn = kn(fn, e, t, n, r), !0;

          case "mouseover":
            return dn = kn(dn, e, t, n, r), !0;

          case "pointerover":
            var l = r.pointerId;
            return pn.set(l, kn(pn.get(l) || null, e, t, n, r)), !0;

          case "gotpointercapture":
            return l = r.pointerId, mn.set(l, kn(mn.get(l) || null, e, t, n, r)), !0;
        }

        return !1;
      }(r, e, t, n) || (gn(e, n), Pr(e, t, n, null));
    }
  }

  function Or(e, t, n) {
    var r = _n(n);

    if (null !== (r = ol(r))) {
      var l = en(r);
      if (null === l) r = null;else {
        var a = l.tag;

        if (13 === a) {
          if (null !== (r = tn(l))) return r;
          r = null;
        } else if (3 === a) {
          if (l.stateNode.hydrate) return 3 === l.tag ? l.stateNode.containerInfo : null;
          r = null;
        } else l !== r && (r = null);
      }
    }

    return Pr(e, t, n, r), null;
  }

  function Mr(e) {
    if (!Ge) return !1;
    var t = (e = "on" + e) in document;
    return t || ((t = document.createElement("div")).setAttribute(e, "return;"), t = "function" == typeof t[e]), t;
  }

  var zr = new ("function" == typeof WeakMap ? WeakMap : Map)();

  function Ir(e) {
    var t = zr.get(e);
    return void 0 === t && (t = new Set(), zr.set(e, t)), t;
  }

  function Rr(e, t, n) {
    if (!n.has(e)) {
      switch (e) {
        case "scroll":
          Sr(t, "scroll", !0);
          break;

        case "focus":
        case "blur":
          Sr(t, "focus", !0), Sr(t, "blur", !0), n.add("blur"), n.add("focus");
          break;

        case "cancel":
        case "close":
          Mr(e) && Sr(t, e, !0);
          break;

        case "invalid":
        case "submit":
        case "reset":
          break;

        default:
          -1 === Jt.indexOf(e) && Tr(e, t);
      }

      n.add(e);
    }
  }

  var Dr = {
    animationIterationCount: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  },
      Fr = ["Webkit", "ms", "Moz", "O"];

  function Ur(e, t, n) {
    return null == t || "boolean" == typeof t || "" === t ? "" : n || "number" != typeof t || 0 === t || Dr.hasOwnProperty(e) && Dr[e] ? ("" + t).trim() : t + "px";
  }

  function Lr(e, t) {
    for (var n in e = e.style, t) if (t.hasOwnProperty(n)) {
      var r = 0 === n.indexOf("--"),
          l = Ur(n, t[n], r);
      "float" === n && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
    }
  }

  Object.keys(Dr).forEach(function (e) {
    Fr.forEach(function (t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Dr[t] = Dr[e];
    });
  });
  var jr = ee({
    menuitem: !0
  }, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
  });

  function Ar(t, n) {
    if (n) {
      if (jr[t] && (null != n.children || null != n.dangerouslySetInnerHTML)) throw Error(le(137, t, ""));

      if (null != n.dangerouslySetInnerHTML) {
        if (null != n.children) throw Error(le(60));
        if (!("object" === e(n.dangerouslySetInnerHTML) && "__html" in n.dangerouslySetInnerHTML)) throw Error(le(61));
      }

      if (null != n.style && "object" !== e(n.style)) throw Error(le(62, ""));
    }
  }

  function Wr(e, t) {
    if (-1 === e.indexOf("-")) return "string" == typeof t.is;

    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;

      default:
        return !0;
    }
  }

  function Vr(e, t) {
    var n = Ir(e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument);
    t = de[t];

    for (var r = 0; r < t.length; r++) Rr(t[r], e, n);
  }

  function Br() {}

  function Qr(e) {
    if (void 0 === (e = e || ("undefined" != typeof document ? document : void 0))) return null;

    try {
      return e.activeElement || e.body;
    } catch (t) {
      return e.body;
    }
  }

  function $r(e) {
    for (; e && e.firstChild;) e = e.firstChild;

    return e;
  }

  function Hr(e, t) {
    var n,
        r = $r(e);

    for (e = 0; r;) {
      if (3 === r.nodeType) {
        if (n = e + r.textContent.length, e <= t && n >= t) return {
          node: r,
          offset: t - e
        };
        e = n;
      }

      e: {
        for (; r;) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }

          r = r.parentNode;
        }

        r = void 0;
      }

      r = $r(r);
    }
  }

  function Kr() {
    for (var e = window, t = Qr(); t instanceof e.HTMLIFrameElement;) {
      try {
        var n = "string" == typeof t.contentWindow.location.href;
      } catch (e) {
        n = !1;
      }

      if (!n) break;
      t = Qr((e = t.contentWindow).document);
    }

    return t;
  }

  function qr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && ("input" === t && ("text" === e.type || "search" === e.type || "tel" === e.type || "url" === e.type || "password" === e.type) || "textarea" === t || "true" === e.contentEditable);
  }

  var Xr = null,
      Yr = null;

  function Gr(e, t) {
    switch (e) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        return !!t.autoFocus;
    }

    return !1;
  }

  function Zr(t, n) {
    return "textarea" === t || "option" === t || "noscript" === t || "string" == typeof n.children || "number" == typeof n.children || "object" === e(n.dangerouslySetInnerHTML) && null !== n.dangerouslySetInnerHTML && null != n.dangerouslySetInnerHTML.__html;
  }

  var Jr = "function" == typeof setTimeout ? setTimeout : void 0,
      el = "function" == typeof clearTimeout ? clearTimeout : void 0;

  function tl(e) {
    for (; null != e; e = e.nextSibling) {
      var t = e.nodeType;
      if (1 === t || 3 === t) break;
    }

    return e;
  }

  function nl(e) {
    e = e.previousSibling;

    for (var t = 0; e;) {
      if (8 === e.nodeType) {
        var n = e.data;

        if ("$" === n || "$!" === n || "$?" === n) {
          if (0 === t) return e;
          t--;
        } else "/$" === n && t++;
      }

      e = e.previousSibling;
    }

    return null;
  }

  var rl = Math.random().toString(36).slice(2),
      ll = "__reactInternalInstance$" + rl,
      al = "__reactEventHandlers$" + rl,
      il = "__reactContainere$" + rl;

  function ol(e) {
    var t = e[ll];
    if (t) return t;

    for (var n = e.parentNode; n;) {
      if (t = n[il] || n[ll]) {
        if (n = t.alternate, null !== t.child || null !== n && null !== n.child) for (e = nl(e); null !== e;) {
          if (n = e[ll]) return n;
          e = nl(e);
        }
        return t;
      }

      n = (e = n).parentNode;
    }

    return null;
  }

  function ul(e) {
    return !(e = e[ll] || e[il]) || 5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag ? null : e;
  }

  function cl(e) {
    if (5 === e.tag || 6 === e.tag) return e.stateNode;
    throw Error(le(33));
  }

  function sl(e) {
    return e[al] || null;
  }

  var fl = null,
      dl = null,
      pl = null;

  function ml() {
    if (pl) return pl;
    var e,
        t,
        n = dl,
        r = n.length,
        l = "value" in fl ? fl.value : fl.textContent,
        a = l.length;

    for (e = 0; e < r && n[e] === l[e]; e++);

    var i = r - e;

    for (t = 1; t <= i && n[r - t] === l[a - t]; t++);

    return pl = l.slice(e, 1 < t ? 1 - t : void 0);
  }

  var hl = Fn.extend({
    data: null
  }),
      yl = Fn.extend({
    data: null
  }),
      vl = [9, 13, 27, 32],
      bl = Ge && "CompositionEvent" in window,
      gl = null;
  Ge && "documentMode" in document && (gl = document.documentMode);
  var kl = Ge && "TextEvent" in window && !gl,
      wl = Ge && (!bl || gl && 8 < gl && 11 >= gl),
      El = String.fromCharCode(32),
      xl = {
    beforeInput: {
      phasedRegistrationNames: {
        bubbled: "onBeforeInput",
        captured: "onBeforeInputCapture"
      },
      dependencies: ["compositionend", "keypress", "textInput", "paste"]
    },
    compositionEnd: {
      phasedRegistrationNames: {
        bubbled: "onCompositionEnd",
        captured: "onCompositionEndCapture"
      },
      dependencies: "blur compositionend keydown keypress keyup mousedown".split(" ")
    },
    compositionStart: {
      phasedRegistrationNames: {
        bubbled: "onCompositionStart",
        captured: "onCompositionStartCapture"
      },
      dependencies: "blur compositionstart keydown keypress keyup mousedown".split(" ")
    },
    compositionUpdate: {
      phasedRegistrationNames: {
        bubbled: "onCompositionUpdate",
        captured: "onCompositionUpdateCapture"
      },
      dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(" ")
    }
  },
      Tl = !1;

  function Sl(e, t) {
    switch (e) {
      case "keyup":
        return -1 !== vl.indexOf(t.keyCode);

      case "keydown":
        return 229 !== t.keyCode;

      case "keypress":
      case "mousedown":
      case "blur":
        return !0;

      default:
        return !1;
    }
  }

  function Cl(t) {
    return t = t.detail, "object" === e(t) && "data" in t ? t.data : null;
  }

  var _l = !1;

  var Pl = {
    eventTypes: xl,
    extractEvents: function (e, t, n, r) {
      var l;
      if (bl) e: {
        switch (e) {
          case "compositionstart":
            var a = xl.compositionStart;
            break e;

          case "compositionend":
            a = xl.compositionEnd;
            break e;

          case "compositionupdate":
            a = xl.compositionUpdate;
            break e;
        }

        a = void 0;
      } else _l ? Sl(e, n) && (a = xl.compositionEnd) : "keydown" === e && 229 === n.keyCode && (a = xl.compositionStart);
      return a ? (wl && "ko" !== n.locale && (_l || a !== xl.compositionStart ? a === xl.compositionEnd && _l && (l = ml()) : (dl = "value" in (fl = r) ? fl.value : fl.textContent, _l = !0)), a = hl.getPooled(a, t, n, r), l ? a.data = l : null !== (l = Cl(n)) && (a.data = l), In(a), l = a) : l = null, (e = kl ? function (e, t) {
        switch (e) {
          case "compositionend":
            return Cl(t);

          case "keypress":
            return 32 !== t.which ? null : (Tl = !0, El);

          case "textInput":
            return (e = t.data) === El && Tl ? null : e;

          default:
            return null;
        }
      }(e, n) : function (e, t) {
        if (_l) return "compositionend" === e || !bl && Sl(e, t) ? (e = ml(), pl = dl = fl = null, _l = !1, e) : null;

        switch (e) {
          case "paste":
            return null;

          case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
              if (t.char && 1 < t.char.length) return t.char;
              if (t.which) return String.fromCharCode(t.which);
            }

            return null;

          case "compositionend":
            return wl && "ko" !== t.locale ? null : t.data;

          default:
            return null;
        }
      }(e, n)) ? ((t = yl.getPooled(xl.beforeInput, t, n, r)).data = e, In(t)) : t = null, null === l ? t : null === t ? l : [l, t];
    }
  },
      Nl = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };

  function Ol(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return "input" === t ? !!Nl[e.type] : "textarea" === t;
  }

  var Ml = {
    change: {
      phasedRegistrationNames: {
        bubbled: "onChange",
        captured: "onChangeCapture"
      },
      dependencies: "blur change click focus input keydown keyup selectionchange".split(" ")
    }
  };

  function zl(e, t, n) {
    return (e = Fn.getPooled(Ml.change, e, t, n)).type = "change", nt(n), In(e), e;
  }

  var Il = null,
      Rl = null;

  function Dl(e) {
    Pe(e);
  }

  function Fl(e) {
    if (Tt(cl(e))) return e;
  }

  function Ul(e, t) {
    if ("change" === e) return t;
  }

  var Ll = !1;

  function jl() {
    Il && (Il.detachEvent("onpropertychange", Al), Rl = Il = null);
  }

  function Al(e) {
    if ("value" === e.propertyName && Fl(Rl)) if (e = zl(Rl, e, _n(e)), ut) Pe(e);else {
      ut = !0;

      try {
        lt(Dl, e);
      } finally {
        ut = !1, st();
      }
    }
  }

  function Wl(e, t, n) {
    "focus" === e ? (jl(), Rl = n, (Il = t).attachEvent("onpropertychange", Al)) : "blur" === e && jl();
  }

  function Vl(e) {
    if ("selectionchange" === e || "keyup" === e || "keydown" === e) return Fl(Rl);
  }

  function Bl(e, t) {
    if ("click" === e) return Fl(t);
  }

  function Ql(e, t) {
    if ("input" === e || "change" === e) return Fl(t);
  }

  Ge && (Ll = Mr("input") && (!document.documentMode || 9 < document.documentMode));
  var $l,
      Hl = {
    eventTypes: Ml,
    _isInputEventSupported: Ll,
    extractEvents: function (e, t, n, r) {
      var l = t ? cl(t) : window,
          a = l.nodeName && l.nodeName.toLowerCase();
      if ("select" === a || "input" === a && "file" === l.type) var i = Ul;else if (Ol(l)) {
        if (Ll) i = Ql;else {
          i = Vl;
          var o = Wl;
        }
      } else (a = l.nodeName) && "input" === a.toLowerCase() && ("checkbox" === l.type || "radio" === l.type) && (i = Bl);
      if (i && (i = i(e, t))) return zl(i, n, r);
      o && o(e, l, t), "blur" === e && (e = l._wrapperState) && e.controlled && "number" === l.type && Ot(l, "number", l.value);
    }
  },
      Kl = {
    mouseEnter: {
      registrationName: "onMouseEnter",
      dependencies: ["mouseout", "mouseover"]
    },
    mouseLeave: {
      registrationName: "onMouseLeave",
      dependencies: ["mouseout", "mouseover"]
    },
    pointerEnter: {
      registrationName: "onPointerEnter",
      dependencies: ["pointerout", "pointerover"]
    },
    pointerLeave: {
      registrationName: "onPointerLeave",
      dependencies: ["pointerout", "pointerover"]
    }
  },
      ql = {
    eventTypes: Kl,
    extractEvents: function (e, t, n, r, l) {
      var a = "mouseover" === e || "pointerover" === e,
          i = "mouseout" === e || "pointerout" === e;
      if (a && 0 == (32 & l) && (n.relatedTarget || n.fromElement) || !i && !a) return null;
      if (l = r.window === r ? r : (l = r.ownerDocument) ? l.defaultView || l.parentWindow : window, i ? (i = t, null !== (t = (t = n.relatedTarget || n.toElement) ? ol(t) : null) && (t !== (a = en(t)) || 5 !== t.tag && 6 !== t.tag) && (t = null)) : i = null, i === t) return null;
      if ("mouseout" === e || "mouseover" === e) var o = tr,
          u = Kl.mouseLeave,
          c = Kl.mouseEnter,
          s = "mouse";else "pointerout" !== e && "pointerover" !== e || (o = nr, u = Kl.pointerLeave, c = Kl.pointerEnter, s = "pointer");
      if (e = null == i ? l : cl(i), l = null == t ? l : cl(t), (u = o.getPooled(u, i, n, r)).type = s + "leave", u.target = e, u.relatedTarget = l, (r = o.getPooled(c, t, n, r)).type = s + "enter", r.target = l, r.relatedTarget = e, s = t, (o = i) && s) e: {
        for (e = s, i = 0, t = c = o; t; t = Pn(t)) i++;

        for (t = 0, l = e; l; l = Pn(l)) t++;

        for (; 0 < i - t;) c = Pn(c), i--;

        for (; 0 < t - i;) e = Pn(e), t--;

        for (; i--;) {
          if (c === e || c === e.alternate) break e;
          c = Pn(c), e = Pn(e);
        }

        c = null;
      } else c = null;

      for (e = c, c = []; o && o !== e && (null === (i = o.alternate) || i !== e);) c.push(o), o = Pn(o);

      for (o = []; s && s !== e && (null === (i = s.alternate) || i !== e);) o.push(s), s = Pn(s);

      for (s = 0; s < c.length; s++) Mn(c[s], "bubbled", u);

      for (s = o.length; 0 < s--;) Mn(o[s], "captured", r);

      return n === $l ? ($l = null, [u]) : ($l = n, [u, r]);
    }
  };
  var Xl = "function" == typeof Object.is ? Object.is : function (e, t) {
    return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t;
  },
      Yl = Object.prototype.hasOwnProperty;

  function Gl(t, n) {
    if (Xl(t, n)) return !0;
    if ("object" !== e(t) || null === t || "object" !== e(n) || null === n) return !1;
    var r = Object.keys(t),
        l = Object.keys(n);
    if (r.length !== l.length) return !1;

    for (l = 0; l < r.length; l++) if (!Yl.call(n, r[l]) || !Xl(t[r[l]], n[r[l]])) return !1;

    return !0;
  }

  var Zl = Ge && "documentMode" in document && 11 >= document.documentMode,
      Jl = {
    select: {
      phasedRegistrationNames: {
        bubbled: "onSelect",
        captured: "onSelectCapture"
      },
      dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")
    }
  },
      ea = null,
      ta = null,
      na = null,
      ra = !1;

  function la(e, t) {
    var n = t.window === t ? t.document : 9 === t.nodeType ? t : t.ownerDocument;
    return ra || null == ea || ea !== Qr(n) ? null : ("selectionStart" in (n = ea) && qr(n) ? n = {
      start: n.selectionStart,
      end: n.selectionEnd
    } : n = {
      anchorNode: (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection()).anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }, na && Gl(na, n) ? null : (na = n, (e = Fn.getPooled(Jl.select, ta, e, t)).type = "select", e.target = ea, In(e), e));
  }

  var aa = {
    eventTypes: Jl,
    extractEvents: function (e, t, n, r) {
      var l,
          a = r.window === r ? r.document : 9 === r.nodeType ? r : r.ownerDocument;

      if (!(l = !a)) {
        e: {
          a = Ir(a), l = de.onSelect;

          for (var i = 0; i < l.length; i++) if (!a.has(l[i])) {
            a = !1;
            break e;
          }

          a = !0;
        }

        l = !a;
      }

      if (l) return null;

      switch (a = t ? cl(t) : window, e) {
        case "focus":
          (Ol(a) || "true" === a.contentEditable) && (ea = a, ta = t, na = null);
          break;

        case "blur":
          na = ta = ea = null;
          break;

        case "mousedown":
          ra = !0;
          break;

        case "contextmenu":
        case "mouseup":
        case "dragend":
          return ra = !1, la(n, r);

        case "selectionchange":
          if (Zl) break;

        case "keydown":
        case "keyup":
          return la(n, r);
      }

      return null;
    }
  };
  Ne.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" ")), ke = sl, we = ul, Ee = cl, Ne.injectEventPluginsByName({
    SimpleEventPlugin: vr,
    EnterLeaveEventPlugin: ql,
    ChangeEventPlugin: Hl,
    SelectEventPlugin: aa,
    BeforeInputEventPlugin: Pl
  });
  var ia = [],
      oa = -1;

  function ua(e) {
    0 > oa || (e.current = ia[oa], ia[oa] = null, oa--);
  }

  function ca(e, t) {
    oa++, ia[oa] = e.current, e.current = t;
  }

  var sa = {},
      fa = {
    current: sa
  },
      da = {
    current: !1
  },
      pa = sa;

  function ma(e, t) {
    var n = e.type.contextTypes;
    if (!n) return sa;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var l,
        a = {};

    for (l in n) a[l] = t[l];

    return r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = a), a;
  }

  function ha(e) {
    return null != (e = e.childContextTypes);
  }

  function ya(e) {
    ua(da), ua(fa);
  }

  function va(e) {
    ua(da), ua(fa);
  }

  function ba(e, t, n) {
    if (fa.current !== sa) throw Error(le(168));
    ca(fa, t), ca(da, n);
  }

  function ga(e, t, n) {
    var r = e.stateNode;
    if (e = t.childContextTypes, "function" != typeof r.getChildContext) return n;

    for (var l in r = r.getChildContext()) if (!(l in e)) throw Error(le(108, Xe(t) || "Unknown", l));

    return ee({}, n, {}, r);
  }

  function ka(e) {
    var t = e.stateNode;
    return t = t && t.__reactInternalMemoizedMergedChildContext || sa, pa = fa.current, ca(fa, t), ca(da, da.current), !0;
  }

  function wa(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(le(169));
    n ? (t = ga(e, t, pa), r.__reactInternalMemoizedMergedChildContext = t, ua(da), ua(fa), ca(fa, t)) : ua(da), ca(da, n);
  }

  var Ea = re.unstable_runWithPriority,
      xa = re.unstable_scheduleCallback,
      Ta = re.unstable_cancelCallback,
      Sa = re.unstable_shouldYield,
      Ca = re.unstable_requestPaint,
      _a = re.unstable_now,
      Pa = re.unstable_getCurrentPriorityLevel,
      Na = re.unstable_ImmediatePriority,
      Oa = re.unstable_UserBlockingPriority,
      Ma = re.unstable_NormalPriority,
      za = re.unstable_LowPriority,
      Ia = re.unstable_IdlePriority,
      Ra = {},
      Da = void 0 !== Ca ? Ca : function () {},
      Fa = null,
      Ua = null,
      La = !1,
      ja = _a(),
      Aa = 1e4 > ja ? _a : function () {
    return _a() - ja;
  };

  function Wa() {
    switch (Pa()) {
      case Na:
        return 99;

      case Oa:
        return 98;

      case Ma:
        return 97;

      case za:
        return 96;

      case Ia:
        return 95;

      default:
        throw Error(le(332));
    }
  }

  function Va(e) {
    switch (e) {
      case 99:
        return Na;

      case 98:
        return Oa;

      case 97:
        return Ma;

      case 96:
        return za;

      case 95:
        return Ia;

      default:
        throw Error(le(332));
    }
  }

  function Ba(e, t) {
    return e = Va(e), Ea(e, t);
  }

  function Qa(e, t, n) {
    return e = Va(e), xa(e, t, n);
  }

  function $a(e) {
    return null === Fa ? (Fa = [e], Ua = xa(Na, Ka)) : Fa.push(e), Ra;
  }

  function Ha() {
    if (null !== Ua) {
      var e = Ua;
      Ua = null, Ta(e);
    }

    Ka();
  }

  function Ka() {
    if (!La && null !== Fa) {
      La = !0;
      var e = 0;

      try {
        var t = Fa;
        Ba(99, function () {
          for (; e < t.length; e++) {
            var n = t[e];

            do {
              n = n(!0);
            } while (null !== n);
          }
        }), Fa = null;
      } catch (t) {
        throw null !== Fa && (Fa = Fa.slice(e + 1)), xa(Na, Ha), t;
      } finally {
        La = !1;
      }
    }
  }

  var qa = 3;

  function Xa(e, t, n) {
    return 1073741821 - (1 + ((1073741821 - e + t / 10) / (n /= 10) | 0)) * n;
  }

  function Ya(e, t) {
    if (e && e.defaultProps) for (var n in t = ee({}, t), e = e.defaultProps) void 0 === t[n] && (t[n] = e[n]);
    return t;
  }

  var Ga = {
    current: null
  },
      Za = null,
      Ja = null,
      ei = null;

  function ti() {
    ei = Ja = Za = null;
  }

  function ni(e, t) {
    var n = e.type._context;
    ca(Ga, n._currentValue), n._currentValue = t;
  }

  function ri(e) {
    var t = Ga.current;
    ua(Ga), e.type._context._currentValue = t;
  }

  function li(e, t) {
    for (; null !== e;) {
      var n = e.alternate;
      if (e.childExpirationTime < t) e.childExpirationTime = t, null !== n && n.childExpirationTime < t && (n.childExpirationTime = t);else {
        if (!(null !== n && n.childExpirationTime < t)) break;
        n.childExpirationTime = t;
      }
      e = e.return;
    }
  }

  function ai(e, t) {
    Za = e, ei = Ja = null, null !== (e = e.dependencies) && null !== e.firstContext && (e.expirationTime >= t && (Ao = !0), e.firstContext = null);
  }

  function ii(e, t) {
    if (ei !== e && !1 !== t && 0 !== t) if ("number" == typeof t && 1073741823 !== t || (ei = e, t = 1073741823), t = {
      context: e,
      observedBits: t,
      next: null
    }, null === Ja) {
      if (null === Za) throw Error(le(308));
      Ja = t, Za.dependencies = {
        expirationTime: 0,
        firstContext: t,
        responders: null
      };
    } else Ja = Ja.next = t;
    return e._currentValue;
  }

  var oi = !1;

  function ui(e) {
    return {
      baseState: e,
      firstUpdate: null,
      lastUpdate: null,
      firstCapturedUpdate: null,
      lastCapturedUpdate: null,
      firstEffect: null,
      lastEffect: null,
      firstCapturedEffect: null,
      lastCapturedEffect: null
    };
  }

  function ci(e) {
    return {
      baseState: e.baseState,
      firstUpdate: e.firstUpdate,
      lastUpdate: e.lastUpdate,
      firstCapturedUpdate: null,
      lastCapturedUpdate: null,
      firstEffect: null,
      lastEffect: null,
      firstCapturedEffect: null,
      lastCapturedEffect: null
    };
  }

  function si(e, t) {
    return {
      expirationTime: e,
      suspenseConfig: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
      nextEffect: null
    };
  }

  function fi(e, t) {
    null === e.lastUpdate ? e.firstUpdate = e.lastUpdate = t : (e.lastUpdate.next = t, e.lastUpdate = t);
  }

  function di(e, t) {
    var n = e.alternate;

    if (null === n) {
      var r = e.updateQueue,
          l = null;
      null === r && (r = e.updateQueue = ui(e.memoizedState));
    } else r = e.updateQueue, l = n.updateQueue, null === r ? null === l ? (r = e.updateQueue = ui(e.memoizedState), l = n.updateQueue = ui(n.memoizedState)) : r = e.updateQueue = ci(l) : null === l && (l = n.updateQueue = ci(r));

    null === l || r === l ? fi(r, t) : null === r.lastUpdate || null === l.lastUpdate ? (fi(r, t), fi(l, t)) : (fi(r, t), l.lastUpdate = t);
  }

  function pi(e, t) {
    var n = e.updateQueue;
    null === (n = null === n ? e.updateQueue = ui(e.memoizedState) : mi(e, n)).lastCapturedUpdate ? n.firstCapturedUpdate = n.lastCapturedUpdate = t : (n.lastCapturedUpdate.next = t, n.lastCapturedUpdate = t);
  }

  function mi(e, t) {
    var n = e.alternate;
    return null !== n && t === n.updateQueue && (t = e.updateQueue = ci(t)), t;
  }

  function hi(e, t, n, r, l, a) {
    switch (n.tag) {
      case 1:
        return "function" == typeof (e = n.payload) ? e.call(a, r, l) : e;

      case 3:
        e.effectTag = -4097 & e.effectTag | 64;

      case 0:
        if (null == (l = "function" == typeof (e = n.payload) ? e.call(a, r, l) : e)) break;
        return ee({}, r, l);

      case 2:
        oi = !0;
    }

    return r;
  }

  function yi(e, t, n, r, l) {
    oi = !1;

    for (var a = (t = mi(e, t)).baseState, i = null, o = 0, u = t.firstUpdate, c = a; null !== u;) {
      var s = u.expirationTime;
      s < l ? (null === i && (i = u, a = c), o < s && (o = s)) : (sc(s, u.suspenseConfig), c = hi(e, 0, u, c, n, r), null !== u.callback && (e.effectTag |= 32, u.nextEffect = null, null === t.lastEffect ? t.firstEffect = t.lastEffect = u : (t.lastEffect.nextEffect = u, t.lastEffect = u))), u = u.next;
    }

    for (s = null, u = t.firstCapturedUpdate; null !== u;) {
      var f = u.expirationTime;
      f < l ? (null === s && (s = u, null === i && (a = c)), o < f && (o = f)) : (c = hi(e, 0, u, c, n, r), null !== u.callback && (e.effectTag |= 32, u.nextEffect = null, null === t.lastCapturedEffect ? t.firstCapturedEffect = t.lastCapturedEffect = u : (t.lastCapturedEffect.nextEffect = u, t.lastCapturedEffect = u))), u = u.next;
    }

    null === i && (t.lastUpdate = null), null === s ? t.lastCapturedUpdate = null : e.effectTag |= 32, null === i && null === s && (a = c), t.baseState = a, t.firstUpdate = i, t.firstCapturedUpdate = s, fc(o), e.expirationTime = o, e.memoizedState = c;
  }

  function vi(e, t, n) {
    null !== t.firstCapturedUpdate && (null !== t.lastUpdate && (t.lastUpdate.next = t.firstCapturedUpdate, t.lastUpdate = t.lastCapturedUpdate), t.firstCapturedUpdate = t.lastCapturedUpdate = null), bi(t.firstEffect, n), t.firstEffect = t.lastEffect = null, bi(t.firstCapturedEffect, n), t.firstCapturedEffect = t.lastCapturedEffect = null;
  }

  function bi(e, t) {
    for (; null !== e;) {
      var n = e.callback;

      if (null !== n) {
        e.callback = null;
        var r = t;
        if ("function" != typeof n) throw Error(le(191, n));
        n.call(r);
      }

      e = e.nextEffect;
    }
  }

  var gi = Me.ReactCurrentBatchConfig,
      ki = new K.Component().refs;

  function wi(e, t, n, r) {
    n = null == (n = n(r, t = e.memoizedState)) ? t : ee({}, t, n), e.memoizedState = n, null !== (r = e.updateQueue) && 0 === e.expirationTime && (r.baseState = n);
  }

  var Ei = {
    isMounted: function (e) {
      return !!(e = e._reactInternalFiber) && en(e) === e;
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternalFiber;
      var r = Gu(),
          l = gi.suspense;
      (l = si(r = Zu(r, e, l), l)).payload = t, null != n && (l.callback = n), di(e, l), Ju(e, r);
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternalFiber;
      var r = Gu(),
          l = gi.suspense;
      (l = si(r = Zu(r, e, l), l)).tag = 1, l.payload = t, null != n && (l.callback = n), di(e, l), Ju(e, r);
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternalFiber;
      var n = Gu(),
          r = gi.suspense;
      (r = si(n = Zu(n, e, r), r)).tag = 2, null != t && (r.callback = t), di(e, r), Ju(e, n);
    }
  };

  function xi(e, t, n, r, l, a, i) {
    return "function" == typeof (e = e.stateNode).shouldComponentUpdate ? e.shouldComponentUpdate(r, a, i) : !t.prototype || !t.prototype.isPureReactComponent || !Gl(n, r) || !Gl(l, a);
  }

  function Ti(t, n, r) {
    var l = !1,
        a = sa,
        i = n.contextType;
    return "object" === e(i) && null !== i ? i = ii(i) : (a = ha(n) ? pa : fa.current, i = (l = null != (l = n.contextTypes)) ? ma(t, a) : sa), n = new n(r, i), t.memoizedState = null !== n.state && void 0 !== n.state ? n.state : null, n.updater = Ei, t.stateNode = n, n._reactInternalFiber = t, l && ((t = t.stateNode).__reactInternalMemoizedUnmaskedChildContext = a, t.__reactInternalMemoizedMaskedChildContext = i), n;
  }

  function Si(e, t, n, r) {
    e = t.state, "function" == typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r), "function" == typeof t.UNSAFE_componentWillReceiveProps && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ei.enqueueReplaceState(t, t.state, null);
  }

  function Ci(t, n, r, l) {
    var a = t.stateNode;
    a.props = r, a.state = t.memoizedState, a.refs = ki;
    var i = n.contextType;
    "object" === e(i) && null !== i ? a.context = ii(i) : (i = ha(n) ? pa : fa.current, a.context = ma(t, i)), null !== (i = t.updateQueue) && (yi(t, i, r, a, l), a.state = t.memoizedState), "function" == typeof (i = n.getDerivedStateFromProps) && (wi(t, n, i, r), a.state = t.memoizedState), "function" == typeof n.getDerivedStateFromProps || "function" == typeof a.getSnapshotBeforeUpdate || "function" != typeof a.UNSAFE_componentWillMount && "function" != typeof a.componentWillMount || (n = a.state, "function" == typeof a.componentWillMount && a.componentWillMount(), "function" == typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(), n !== a.state && Ei.enqueueReplaceState(a, a.state, null), null !== (i = t.updateQueue) && (yi(t, i, r, a, l), a.state = t.memoizedState)), "function" == typeof a.componentDidMount && (t.effectTag |= 4);
  }

  var _i = Array.isArray;

  function Pi(t, n, r) {
    if (null !== (t = r.ref) && "function" != typeof t && "object" !== e(t)) {
      if (r._owner) {
        if (r = r._owner) {
          if (1 !== r.tag) throw Error(le(309));
          var l = r.stateNode;
        }

        if (!l) throw Error(le(147, t));
        var a = "" + t;
        return null !== n && null !== n.ref && "function" == typeof n.ref && n.ref._stringRef === a ? n.ref : ((n = function (e) {
          var t = l.refs;
          t === ki && (t = l.refs = {}), null === e ? delete t[a] : t[a] = e;
        })._stringRef = a, n);
      }

      if ("string" != typeof t) throw Error(le(284));
      if (!r._owner) throw Error(le(290, t));
    }

    return t;
  }

  function Ni(e, t) {
    if ("textarea" !== e.type) throw Error(le(31, "[object Object]" === Object.prototype.toString.call(t) ? "object with keys {" + Object.keys(t).join(", ") + "}" : t, ""));
  }

  function Oi(t) {
    function n(e, n) {
      if (t) {
        var r = e.lastEffect;
        null !== r ? (r.nextEffect = n, e.lastEffect = n) : e.firstEffect = e.lastEffect = n, n.nextEffect = null, n.effectTag = 8;
      }
    }

    function r(e, r) {
      if (!t) return null;

      for (; null !== r;) n(e, r), r = r.sibling;

      return null;
    }

    function l(e, t) {
      for (e = new Map(); null !== t;) null !== t.key ? e.set(t.key, t) : e.set(t.index, t), t = t.sibling;

      return e;
    }

    function a(e, t, n) {
      return (e = Mc(e, t)).index = 0, e.sibling = null, e;
    }

    function i(e, n, r) {
      return e.index = r, t ? null !== (r = e.alternate) ? (r = r.index) < n ? (e.effectTag = 2, n) : r : (e.effectTag = 2, n) : n;
    }

    function o(e) {
      return t && null === e.alternate && (e.effectTag = 2), e;
    }

    function u(e, t, n, r) {
      return null === t || 6 !== t.tag ? ((t = Rc(n, e.mode, r)).return = e, t) : ((t = a(t, n)).return = e, t);
    }

    function c(e, t, n, r) {
      return null !== t && t.elementType === n.type ? ((r = a(t, n.props)).ref = Pi(e, t, n), r.return = e, r) : ((r = zc(n.type, n.key, n.props, null, e.mode, r)).ref = Pi(e, t, n), r.return = e, r);
    }

    function s(e, t, n, r) {
      return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? ((t = Dc(n, e.mode, r)).return = e, t) : ((t = a(t, n.children || [])).return = e, t);
    }

    function f(e, t, n, r, l) {
      return null === t || 7 !== t.tag ? ((t = Ic(n, e.mode, r, l)).return = e, t) : ((t = a(t, n)).return = e, t);
    }

    function d(t, n, r) {
      if ("string" == typeof n || "number" == typeof n) return (n = Rc("" + n, t.mode, r)).return = t, n;

      if ("object" === e(n) && null !== n) {
        switch (n.$$typeof) {
          case Re:
            return (r = zc(n.type, n.key, n.props, null, t.mode, r)).ref = Pi(t, null, n), r.return = t, r;

          case De:
            return (n = Dc(n, t.mode, r)).return = t, n;
        }

        if (_i(n) || qe(n)) return (n = Ic(n, t.mode, r, null)).return = t, n;
        Ni(t, n);
      }

      return null;
    }

    function p(t, n, r, l) {
      var a = null !== n ? n.key : null;
      if ("string" == typeof r || "number" == typeof r) return null !== a ? null : u(t, n, "" + r, l);

      if ("object" === e(r) && null !== r) {
        switch (r.$$typeof) {
          case Re:
            return r.key === a ? r.type === Fe ? f(t, n, r.props.children, l, a) : c(t, n, r, l) : null;

          case De:
            return r.key === a ? s(t, n, r, l) : null;
        }

        if (_i(r) || qe(r)) return null !== a ? null : f(t, n, r, l, null);
        Ni(t, r);
      }

      return null;
    }

    function m(t, n, r, l, a) {
      if ("string" == typeof l || "number" == typeof l) return u(n, t = t.get(r) || null, "" + l, a);

      if ("object" === e(l) && null !== l) {
        switch (l.$$typeof) {
          case Re:
            return t = t.get(null === l.key ? r : l.key) || null, l.type === Fe ? f(n, t, l.props.children, a, l.key) : c(n, t, l, a);

          case De:
            return s(n, t = t.get(null === l.key ? r : l.key) || null, l, a);
        }

        if (_i(l) || qe(l)) return f(n, t = t.get(r) || null, l, a, null);
        Ni(n, l);
      }

      return null;
    }

    function h(e, a, o, u) {
      for (var c = null, s = null, f = a, h = a = 0, y = null; null !== f && h < o.length; h++) {
        f.index > h ? (y = f, f = null) : y = f.sibling;
        var v = p(e, f, o[h], u);

        if (null === v) {
          null === f && (f = y);
          break;
        }

        t && f && null === v.alternate && n(e, f), a = i(v, a, h), null === s ? c = v : s.sibling = v, s = v, f = y;
      }

      if (h === o.length) return r(e, f), c;

      if (null === f) {
        for (; h < o.length; h++) null !== (f = d(e, o[h], u)) && (a = i(f, a, h), null === s ? c = f : s.sibling = f, s = f);

        return c;
      }

      for (f = l(e, f); h < o.length; h++) null !== (y = m(f, e, h, o[h], u)) && (t && null !== y.alternate && f.delete(null === y.key ? h : y.key), a = i(y, a, h), null === s ? c = y : s.sibling = y, s = y);

      return t && f.forEach(function (t) {
        return n(e, t);
      }), c;
    }

    function y(e, a, o, u) {
      var c = qe(o);
      if ("function" != typeof c) throw Error(le(150));
      if (null == (o = c.call(o))) throw Error(le(151));

      for (var s = c = null, f = a, h = a = 0, y = null, v = o.next(); null !== f && !v.done; h++, v = o.next()) {
        f.index > h ? (y = f, f = null) : y = f.sibling;
        var b = p(e, f, v.value, u);

        if (null === b) {
          null === f && (f = y);
          break;
        }

        t && f && null === b.alternate && n(e, f), a = i(b, a, h), null === s ? c = b : s.sibling = b, s = b, f = y;
      }

      if (v.done) return r(e, f), c;

      if (null === f) {
        for (; !v.done; h++, v = o.next()) null !== (v = d(e, v.value, u)) && (a = i(v, a, h), null === s ? c = v : s.sibling = v, s = v);

        return c;
      }

      for (f = l(e, f); !v.done; h++, v = o.next()) null !== (v = m(f, e, h, v.value, u)) && (t && null !== v.alternate && f.delete(null === v.key ? h : v.key), a = i(v, a, h), null === s ? c = v : s.sibling = v, s = v);

      return t && f.forEach(function (t) {
        return n(e, t);
      }), c;
    }

    return function (t, l, i, u) {
      var c = "object" === e(i) && null !== i && i.type === Fe && null === i.key;
      c && (i = i.props.children);
      var s = "object" === e(i) && null !== i;
      if (s) switch (i.$$typeof) {
        case Re:
          e: {
            for (s = i.key, c = l; null !== c;) {
              if (c.key === s) {
                if (7 === c.tag ? i.type === Fe : c.elementType === i.type) {
                  r(t, c.sibling), (l = a(c, i.type === Fe ? i.props.children : i.props)).ref = Pi(t, c, i), l.return = t, t = l;
                  break e;
                }

                r(t, c);
                break;
              }

              n(t, c), c = c.sibling;
            }

            i.type === Fe ? ((l = Ic(i.props.children, t.mode, u, i.key)).return = t, t = l) : ((u = zc(i.type, i.key, i.props, null, t.mode, u)).ref = Pi(t, l, i), u.return = t, t = u);
          }

          return o(t);

        case De:
          e: {
            for (c = i.key; null !== l;) {
              if (l.key === c) {
                if (4 === l.tag && l.stateNode.containerInfo === i.containerInfo && l.stateNode.implementation === i.implementation) {
                  r(t, l.sibling), (l = a(l, i.children || [])).return = t, t = l;
                  break e;
                }

                r(t, l);
                break;
              }

              n(t, l), l = l.sibling;
            }

            (l = Dc(i, t.mode, u)).return = t, t = l;
          }

          return o(t);
      }
      if ("string" == typeof i || "number" == typeof i) return i = "" + i, null !== l && 6 === l.tag ? (r(t, l.sibling), (l = a(l, i)).return = t, t = l) : (r(t, l), (l = Rc(i, t.mode, u)).return = t, t = l), o(t);
      if (_i(i)) return h(t, l, i, u);
      if (qe(i)) return y(t, l, i, u);
      if (s && Ni(t, i), void 0 === i && !c) switch (t.tag) {
        case 1:
        case 0:
          throw t = t.type, Error(le(152, t.displayName || t.name || "Component"));
      }
      return r(t, l);
    };
  }

  var Mi = Oi(!0),
      zi = Oi(!1),
      Ii = {},
      Ri = {
    current: Ii
  },
      Di = {
    current: Ii
  },
      Fi = {
    current: Ii
  };

  function Ui(e) {
    if (e === Ii) throw Error(le(174));
    return e;
  }

  function Li(e, t) {
    ca(Fi, t), ca(Di, e), ca(Ri, Ii);
    var n = t.nodeType;

    switch (n) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : At(null, "");
        break;

      default:
        t = At(t = (n = 8 === n ? t.parentNode : t).namespaceURI || null, n = n.tagName);
    }

    ua(Ri), ca(Ri, t);
  }

  function ji(e) {
    ua(Ri), ua(Di), ua(Fi);
  }

  function Ai(e) {
    Ui(Fi.current);
    var t = Ui(Ri.current),
        n = At(t, e.type);
    t !== n && (ca(Di, e), ca(Ri, n));
  }

  function Wi(e) {
    Di.current === e && (ua(Ri), ua(Di));
  }

  var Vi = {
    current: 0
  };

  function Bi(e) {
    for (var t = e; null !== t;) {
      if (13 === t.tag) {
        var n = t.memoizedState;
        if (null !== n && (null === (n = n.dehydrated) || "$?" === n.data || "$!" === n.data)) return t;
      } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
        if (0 != (64 & t.effectTag)) return t;
      } else if (null !== t.child) {
        t.child.return = t, t = t.child;
        continue;
      }

      if (t === e) break;

      for (; null === t.sibling;) {
        if (null === t.return || t.return === e) return null;
        t = t.return;
      }

      t.sibling.return = t.return, t = t.sibling;
    }

    return null;
  }

  function Qi(e, t) {
    return {
      responder: e,
      props: t
    };
  }

  var $i = Me.ReactCurrentDispatcher,
      Hi = Me.ReactCurrentBatchConfig,
      Ki = 0,
      qi = null,
      Xi = null,
      Yi = null,
      Gi = null,
      Zi = null,
      Ji = null,
      eo = 0,
      to = null,
      no = 0,
      ro = !1,
      lo = null,
      ao = 0;

  function io() {
    throw Error(le(321));
  }

  function oo(e, t) {
    if (null === t) return !1;

    for (var n = 0; n < t.length && n < e.length; n++) if (!Xl(e[n], t[n])) return !1;

    return !0;
  }

  function uo(e, t, n, r, l, a) {
    if (Ki = a, qi = t, Yi = null !== e ? e.memoizedState : null, $i.current = null === Yi ? Po : No, t = n(r, l), ro) {
      do {
        ro = !1, ao += 1, Yi = null !== e ? e.memoizedState : null, Ji = Gi, to = Zi = Xi = null, $i.current = No, t = n(r, l);
      } while (ro);

      lo = null, ao = 0;
    }

    if ($i.current = _o, (e = qi).memoizedState = Gi, e.expirationTime = eo, e.updateQueue = to, e.effectTag |= no, e = null !== Xi && null !== Xi.next, Ki = 0, Ji = Zi = Gi = Yi = Xi = qi = null, eo = 0, to = null, no = 0, e) throw Error(le(300));
    return t;
  }

  function co() {
    $i.current = _o, Ki = 0, Ji = Zi = Gi = Yi = Xi = qi = null, eo = 0, to = null, no = 0, ro = !1, lo = null, ao = 0;
  }

  function so() {
    var e = {
      memoizedState: null,
      baseState: null,
      queue: null,
      baseUpdate: null,
      next: null
    };
    return null === Zi ? Gi = Zi = e : Zi = Zi.next = e, Zi;
  }

  function fo() {
    if (null !== Ji) Ji = (Zi = Ji).next, Yi = null !== (Xi = Yi) ? Xi.next : null;else {
      if (null === Yi) throw Error(le(310));
      var e = {
        memoizedState: (Xi = Yi).memoizedState,
        baseState: Xi.baseState,
        queue: Xi.queue,
        baseUpdate: Xi.baseUpdate,
        next: null
      };
      Zi = null === Zi ? Gi = e : Zi.next = e, Yi = Xi.next;
    }
    return Zi;
  }

  function po(e, t) {
    return "function" == typeof t ? t(e) : t;
  }

  function mo(e) {
    var t = fo(),
        n = t.queue;
    if (null === n) throw Error(le(311));

    if (n.lastRenderedReducer = e, 0 < ao) {
      var r = n.dispatch;

      if (null !== lo) {
        var l = lo.get(n);

        if (void 0 !== l) {
          lo.delete(n);
          var a = t.memoizedState;

          do {
            a = e(a, l.action), l = l.next;
          } while (null !== l);

          return Xl(a, t.memoizedState) || (Ao = !0), t.memoizedState = a, t.baseUpdate === n.last && (t.baseState = a), n.lastRenderedState = a, [a, r];
        }
      }

      return [t.memoizedState, r];
    }

    r = n.last;
    var i = t.baseUpdate;

    if (a = t.baseState, null !== i ? (null !== r && (r.next = null), r = i.next) : r = null !== r ? r.next : null, null !== r) {
      var o = l = null,
          u = r,
          c = !1;

      do {
        var s = u.expirationTime;
        s < Ki ? (c || (c = !0, o = i, l = a), s > eo && fc(eo = s)) : (sc(s, u.suspenseConfig), a = u.eagerReducer === e ? u.eagerState : e(a, u.action)), i = u, u = u.next;
      } while (null !== u && u !== r);

      c || (o = i, l = a), Xl(a, t.memoizedState) || (Ao = !0), t.memoizedState = a, t.baseUpdate = o, t.baseState = l, n.lastRenderedState = a;
    }

    return [t.memoizedState, n.dispatch];
  }

  function ho(e) {
    var t = so();
    return "function" == typeof e && (e = e()), t.memoizedState = t.baseState = e, e = (e = t.queue = {
      last: null,
      dispatch: null,
      lastRenderedReducer: po,
      lastRenderedState: e
    }).dispatch = Co.bind(null, qi, e), [t.memoizedState, e];
  }

  function yo(e) {
    return mo(po);
  }

  function vo(e, t, n, r) {
    return e = {
      tag: e,
      create: t,
      destroy: n,
      deps: r,
      next: null
    }, null === to ? (to = {
      lastEffect: null
    }).lastEffect = e.next = e : null === (t = to.lastEffect) ? to.lastEffect = e.next = e : (n = t.next, t.next = e, e.next = n, to.lastEffect = e), e;
  }

  function bo(e, t, n, r) {
    var l = so();
    no |= e, l.memoizedState = vo(t, n, void 0, void 0 === r ? null : r);
  }

  function go(e, t, n, r) {
    var l = fo();
    r = void 0 === r ? null : r;
    var a = void 0;

    if (null !== Xi) {
      var i = Xi.memoizedState;
      if (a = i.destroy, null !== r && oo(r, i.deps)) return void vo(0, n, a, r);
    }

    no |= e, l.memoizedState = vo(t, n, a, r);
  }

  function ko(e, t) {
    return bo(516, 192, e, t);
  }

  function wo(e, t) {
    return go(516, 192, e, t);
  }

  function Eo(e, t) {
    return "function" == typeof t ? (e = e(), t(e), function () {
      t(null);
    }) : null != t ? (e = e(), t.current = e, function () {
      t.current = null;
    }) : void 0;
  }

  function xo() {}

  function To(e, t) {
    return so().memoizedState = [e, void 0 === t ? null : t], e;
  }

  function So(e, t) {
    var n = fo();
    t = void 0 === t ? null : t;
    var r = n.memoizedState;
    return null !== r && null !== t && oo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
  }

  function Co(e, t, n) {
    if (!(25 > ao)) throw Error(le(301));
    var r = e.alternate;
    if (e === qi || null !== r && r === qi) {
      if (ro = !0, e = {
        expirationTime: Ki,
        suspenseConfig: null,
        action: n,
        eagerReducer: null,
        eagerState: null,
        next: null
      }, null === lo && (lo = new Map()), void 0 === (n = lo.get(t))) lo.set(t, e);else {
        for (t = n; null !== t.next;) t = t.next;

        t.next = e;
      }
    } else {
      var l = Gu(),
          a = gi.suspense;
      a = {
        expirationTime: l = Zu(l, e, a),
        suspenseConfig: a,
        action: n,
        eagerReducer: null,
        eagerState: null,
        next: null
      };
      var i = t.last;
      if (null === i) a.next = a;else {
        var o = i.next;
        null !== o && (a.next = o), i.next = a;
      }
      if (t.last = a, 0 === e.expirationTime && (null === r || 0 === r.expirationTime) && null !== (r = t.lastRenderedReducer)) try {
        var u = t.lastRenderedState,
            c = r(u, n);
        if (a.eagerReducer = r, a.eagerState = c, Xl(c, u)) return;
      } catch (e) {}
      Ju(e, l);
    }
  }

  var _o = {
    readContext: ii,
    useCallback: io,
    useContext: io,
    useEffect: io,
    useImperativeHandle: io,
    useLayoutEffect: io,
    useMemo: io,
    useReducer: io,
    useRef: io,
    useState: io,
    useDebugValue: io,
    useResponder: io,
    useDeferredValue: io,
    useTransition: io
  },
      Po = {
    readContext: ii,
    useCallback: To,
    useContext: ii,
    useEffect: ko,
    useImperativeHandle: function (e, t, n) {
      return n = null != n ? n.concat([e]) : null, bo(4, 36, Eo.bind(null, t, e), n);
    },
    useLayoutEffect: function (e, t) {
      return bo(4, 36, e, t);
    },
    useMemo: function (e, t) {
      var n = so();
      return t = void 0 === t ? null : t, e = e(), n.memoizedState = [e, t], e;
    },
    useReducer: function (e, t, n) {
      var r = so();
      return t = void 0 !== n ? n(t) : t, r.memoizedState = r.baseState = t, e = (e = r.queue = {
        last: null,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: t
      }).dispatch = Co.bind(null, qi, e), [r.memoizedState, e];
    },
    useRef: function (e) {
      return e = {
        current: e
      }, so().memoizedState = e;
    },
    useState: ho,
    useDebugValue: xo,
    useResponder: Qi,
    useDeferredValue: function (e, t) {
      var n = ho(e),
          r = n[0],
          l = n[1];
      return ko(function () {
        re.unstable_next(function () {
          var n = Hi.suspense;
          Hi.suspense = void 0 === t ? null : t;

          try {
            l(e);
          } finally {
            Hi.suspense = n;
          }
        });
      }, [e, t]), r;
    },
    useTransition: function (e) {
      var t = ho(!1),
          n = t[0],
          r = t[1];
      return [To(function (t) {
        r(!0), re.unstable_next(function () {
          var n = Hi.suspense;
          Hi.suspense = void 0 === e ? null : e;

          try {
            r(!1), t();
          } finally {
            Hi.suspense = n;
          }
        });
      }, [e, n]), n];
    }
  },
      No = {
    readContext: ii,
    useCallback: So,
    useContext: ii,
    useEffect: wo,
    useImperativeHandle: function (e, t, n) {
      return n = null != n ? n.concat([e]) : null, go(4, 36, Eo.bind(null, t, e), n);
    },
    useLayoutEffect: function (e, t) {
      return go(4, 36, e, t);
    },
    useMemo: function (e, t) {
      var n = fo();
      t = void 0 === t ? null : t;
      var r = n.memoizedState;
      return null !== r && null !== t && oo(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
    },
    useReducer: mo,
    useRef: function () {
      return fo().memoizedState;
    },
    useState: yo,
    useDebugValue: xo,
    useResponder: Qi,
    useDeferredValue: function (e, t) {
      var n = yo(),
          r = n[0],
          l = n[1];
      return wo(function () {
        re.unstable_next(function () {
          var n = Hi.suspense;
          Hi.suspense = void 0 === t ? null : t;

          try {
            l(e);
          } finally {
            Hi.suspense = n;
          }
        });
      }, [e, t]), r;
    },
    useTransition: function (e) {
      var t = yo(),
          n = t[0],
          r = t[1];
      return [So(function (t) {
        r(!0), re.unstable_next(function () {
          var n = Hi.suspense;
          Hi.suspense = void 0 === e ? null : e;

          try {
            r(!1), t();
          } finally {
            Hi.suspense = n;
          }
        });
      }, [e, n]), n];
    }
  },
      Oo = null,
      Mo = null,
      zo = !1;

  function Io(e, t) {
    var n = Nc(5, null, null, 0);
    n.elementType = "DELETED", n.type = "DELETED", n.stateNode = t, n.return = e, n.effectTag = 8, null !== e.lastEffect ? (e.lastEffect.nextEffect = n, e.lastEffect = n) : e.firstEffect = e.lastEffect = n;
  }

  function Ro(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return null !== (t = 1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t) && (e.stateNode = t, !0);

      case 6:
        return null !== (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) && (e.stateNode = t, !0);

      case 13:
      default:
        return !1;
    }
  }

  function Do(e) {
    if (zo) {
      var t = Mo;

      if (t) {
        var n = t;

        if (!Ro(e, t)) {
          if (!(t = tl(n.nextSibling)) || !Ro(e, t)) return e.effectTag = -1025 & e.effectTag | 2, zo = !1, void (Oo = e);
          Io(Oo, n);
        }

        Oo = e, Mo = tl(t.firstChild);
      } else e.effectTag = -1025 & e.effectTag | 2, zo = !1, Oo = e;
    }
  }

  function Fo(e) {
    for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;) e = e.return;

    Oo = e;
  }

  function Uo(e) {
    if (e !== Oo) return !1;
    if (!zo) return Fo(e), zo = !0, !1;
    var t = e.type;
    if (5 !== e.tag || "head" !== t && "body" !== t && !Zr(t, e.memoizedProps)) for (t = Mo; t;) Io(e, t), t = tl(t.nextSibling);

    if (Fo(e), 13 === e.tag) {
      if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null)) throw Error(le(317));

      e: {
        for (e = e.nextSibling, t = 0; e;) {
          if (8 === e.nodeType) {
            var n = e.data;

            if ("/$" === n) {
              if (0 === t) {
                Mo = tl(e.nextSibling);
                break e;
              }

              t--;
            } else "$" !== n && "$!" !== n && "$?" !== n || t++;
          }

          e = e.nextSibling;
        }

        Mo = null;
      }
    } else Mo = Oo ? tl(e.stateNode.nextSibling) : null;

    return !0;
  }

  function Lo() {
    Mo = Oo = null, zo = !1;
  }

  var jo = Me.ReactCurrentOwner,
      Ao = !1;

  function Wo(e, t, n, r) {
    t.child = null === e ? zi(t, null, n, r) : Mi(t, e.child, n, r);
  }

  function Vo(e, t, n, r, l) {
    n = n.render;
    var a = t.ref;
    return ai(t, l), r = uo(e, t, n, r, a, l), null === e || Ao ? (t.effectTag |= 1, Wo(e, t, r, l), t.child) : (t.updateQueue = e.updateQueue, t.effectTag &= -517, e.expirationTime <= l && (e.expirationTime = 0), lu(e, t, l));
  }

  function Bo(e, t, n, r, l, a) {
    if (null === e) {
      var i = n.type;
      return "function" != typeof i || Oc(i) || void 0 !== i.defaultProps || null !== n.compare || void 0 !== n.defaultProps ? ((e = zc(n.type, null, r, null, t.mode, a)).ref = t.ref, e.return = t, t.child = e) : (t.tag = 15, t.type = i, Qo(e, t, i, r, l, a));
    }

    return i = e.child, l < a && (l = i.memoizedProps, (n = null !== (n = n.compare) ? n : Gl)(l, r) && e.ref === t.ref) ? lu(e, t, a) : (t.effectTag |= 1, (e = Mc(i, r)).ref = t.ref, e.return = t, t.child = e);
  }

  function Qo(e, t, n, r, l, a) {
    return null !== e && Gl(e.memoizedProps, r) && e.ref === t.ref && (Ao = !1, l < a) ? lu(e, t, a) : Ho(e, t, n, r, a);
  }

  function $o(e, t) {
    var n = t.ref;
    (null === e && null !== n || null !== e && e.ref !== n) && (t.effectTag |= 128);
  }

  function Ho(e, t, n, r, l) {
    var a = ha(n) ? pa : fa.current;
    return a = ma(t, a), ai(t, l), n = uo(e, t, n, r, a, l), null === e || Ao ? (t.effectTag |= 1, Wo(e, t, n, l), t.child) : (t.updateQueue = e.updateQueue, t.effectTag &= -517, e.expirationTime <= l && (e.expirationTime = 0), lu(e, t, l));
  }

  function Ko(t, n, r, l, a) {
    if (ha(r)) {
      var i = !0;
      ka(n);
    } else i = !1;

    if (ai(n, a), null === n.stateNode) null !== t && (t.alternate = null, n.alternate = null, n.effectTag |= 2), Ti(n, r, l), Ci(n, r, l, a), l = !0;else if (null === t) {
      var o = n.stateNode,
          u = n.memoizedProps;
      o.props = u;
      var c = o.context,
          s = r.contextType;
      "object" === e(s) && null !== s ? s = ii(s) : s = ma(n, s = ha(r) ? pa : fa.current);
      var f = r.getDerivedStateFromProps,
          d = "function" == typeof f || "function" == typeof o.getSnapshotBeforeUpdate;
      d || "function" != typeof o.UNSAFE_componentWillReceiveProps && "function" != typeof o.componentWillReceiveProps || (u !== l || c !== s) && Si(n, o, l, s), oi = !1;
      var p = n.memoizedState;
      c = o.state = p;
      var m = n.updateQueue;
      null !== m && (yi(n, m, l, o, a), c = n.memoizedState), u !== l || p !== c || da.current || oi ? ("function" == typeof f && (wi(n, r, f, l), c = n.memoizedState), (u = oi || xi(n, r, u, l, p, c, s)) ? (d || "function" != typeof o.UNSAFE_componentWillMount && "function" != typeof o.componentWillMount || ("function" == typeof o.componentWillMount && o.componentWillMount(), "function" == typeof o.UNSAFE_componentWillMount && o.UNSAFE_componentWillMount()), "function" == typeof o.componentDidMount && (n.effectTag |= 4)) : ("function" == typeof o.componentDidMount && (n.effectTag |= 4), n.memoizedProps = l, n.memoizedState = c), o.props = l, o.state = c, o.context = s, l = u) : ("function" == typeof o.componentDidMount && (n.effectTag |= 4), l = !1);
    } else o = n.stateNode, u = n.memoizedProps, o.props = n.type === n.elementType ? u : Ya(n.type, u), c = o.context, s = r.contextType, "object" === e(s) && null !== s ? s = ii(s) : s = ma(n, s = ha(r) ? pa : fa.current), (d = "function" == typeof (f = r.getDerivedStateFromProps) || "function" == typeof o.getSnapshotBeforeUpdate) || "function" != typeof o.UNSAFE_componentWillReceiveProps && "function" != typeof o.componentWillReceiveProps || (u !== l || c !== s) && Si(n, o, l, s), oi = !1, c = n.memoizedState, p = o.state = c, null !== (m = n.updateQueue) && (yi(n, m, l, o, a), p = n.memoizedState), u !== l || c !== p || da.current || oi ? ("function" == typeof f && (wi(n, r, f, l), p = n.memoizedState), (f = oi || xi(n, r, u, l, c, p, s)) ? (d || "function" != typeof o.UNSAFE_componentWillUpdate && "function" != typeof o.componentWillUpdate || ("function" == typeof o.componentWillUpdate && o.componentWillUpdate(l, p, s), "function" == typeof o.UNSAFE_componentWillUpdate && o.UNSAFE_componentWillUpdate(l, p, s)), "function" == typeof o.componentDidUpdate && (n.effectTag |= 4), "function" == typeof o.getSnapshotBeforeUpdate && (n.effectTag |= 256)) : ("function" != typeof o.componentDidUpdate || u === t.memoizedProps && c === t.memoizedState || (n.effectTag |= 4), "function" != typeof o.getSnapshotBeforeUpdate || u === t.memoizedProps && c === t.memoizedState || (n.effectTag |= 256), n.memoizedProps = l, n.memoizedState = p), o.props = l, o.state = p, o.context = s, l = f) : ("function" != typeof o.componentDidUpdate || u === t.memoizedProps && c === t.memoizedState || (n.effectTag |= 4), "function" != typeof o.getSnapshotBeforeUpdate || u === t.memoizedProps && c === t.memoizedState || (n.effectTag |= 256), l = !1);
    return qo(t, n, r, l, i, a);
  }

  function qo(e, t, n, r, l, a) {
    $o(e, t);
    var i = 0 != (64 & t.effectTag);
    if (!r && !i) return l && wa(t, n, !1), lu(e, t, a);
    r = t.stateNode, jo.current = t;
    var o = i && "function" != typeof n.getDerivedStateFromError ? null : r.render();
    return t.effectTag |= 1, null !== e && i ? (t.child = Mi(t, e.child, null, a), t.child = Mi(t, null, o, a)) : Wo(e, t, o, a), t.memoizedState = r.state, l && wa(t, n, !0), t.child;
  }

  function Xo(e) {
    var t = e.stateNode;
    t.pendingContext ? ba(0, t.pendingContext, t.pendingContext !== t.context) : t.context && ba(0, t.context, !1), Li(e, t.containerInfo);
  }

  var Yo,
      Go,
      Zo,
      Jo = {
    dehydrated: null,
    retryTime: 0
  };

  function eu(e, t, n) {
    var r,
        l = t.mode,
        a = t.pendingProps,
        i = Vi.current,
        o = !1;

    if ((r = 0 != (64 & t.effectTag)) || (r = 0 != (2 & i) && (null === e || null !== e.memoizedState)), r ? (o = !0, t.effectTag &= -65) : null !== e && null === e.memoizedState || void 0 === a.fallback || !0 === a.unstable_avoidThisFallback || (i |= 1), ca(Vi, 1 & i), null === e) {
      if (void 0 !== a.fallback && Do(t), o) {
        if (o = a.fallback, (a = Ic(null, l, 0, null)).return = t, 0 == (2 & t.mode)) for (e = null !== t.memoizedState ? t.child.child : t.child, a.child = e; null !== e;) e.return = a, e = e.sibling;
        return (n = Ic(o, l, n, null)).return = t, a.sibling = n, t.memoizedState = Jo, t.child = a, n;
      }

      return l = a.children, t.memoizedState = null, t.child = zi(t, null, l, n);
    }

    if (null !== e.memoizedState) {
      if (l = (e = e.child).sibling, o) {
        if (a = a.fallback, (n = Mc(e, e.pendingProps)).return = t, 0 == (2 & t.mode) && (o = null !== t.memoizedState ? t.child.child : t.child) !== e.child) for (n.child = o; null !== o;) o.return = n, o = o.sibling;
        return (l = Mc(l, a, l.expirationTime)).return = t, n.sibling = l, n.childExpirationTime = 0, t.memoizedState = Jo, t.child = n, l;
      }

      return n = Mi(t, e.child, a.children, n), t.memoizedState = null, t.child = n;
    }

    if (e = e.child, o) {
      if (o = a.fallback, (a = Ic(null, l, 0, null)).return = t, a.child = e, null !== e && (e.return = a), 0 == (2 & t.mode)) for (e = null !== t.memoizedState ? t.child.child : t.child, a.child = e; null !== e;) e.return = a, e = e.sibling;
      return (n = Ic(o, l, n, null)).return = t, a.sibling = n, n.effectTag |= 2, a.childExpirationTime = 0, t.memoizedState = Jo, t.child = a, n;
    }

    return t.memoizedState = null, t.child = Mi(t, e, a.children, n);
  }

  function tu(e, t) {
    e.expirationTime < t && (e.expirationTime = t);
    var n = e.alternate;
    null !== n && n.expirationTime < t && (n.expirationTime = t), li(e.return, t);
  }

  function nu(e, t, n, r, l, a) {
    var i = e.memoizedState;
    null === i ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      last: r,
      tail: n,
      tailExpiration: 0,
      tailMode: l,
      lastEffect: a
    } : (i.isBackwards = t, i.rendering = null, i.last = r, i.tail = n, i.tailExpiration = 0, i.tailMode = l, i.lastEffect = a);
  }

  function ru(e, t, n) {
    var r = t.pendingProps,
        l = r.revealOrder,
        a = r.tail;
    if (Wo(e, t, r.children, n), 0 != (2 & (r = Vi.current))) r = 1 & r | 2, t.effectTag |= 64;else {
      if (null !== e && 0 != (64 & e.effectTag)) e: for (e = t.child; null !== e;) {
        if (13 === e.tag) null !== e.memoizedState && tu(e, n);else if (19 === e.tag) tu(e, n);else if (null !== e.child) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;

        for (; null === e.sibling;) {
          if (null === e.return || e.return === t) break e;
          e = e.return;
        }

        e.sibling.return = e.return, e = e.sibling;
      }
      r &= 1;
    }
    if (ca(Vi, r), 0 == (2 & t.mode)) t.memoizedState = null;else switch (l) {
      case "forwards":
        for (n = t.child, l = null; null !== n;) null !== (e = n.alternate) && null === Bi(e) && (l = n), n = n.sibling;

        null === (n = l) ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), nu(t, !1, l, n, a, t.lastEffect);
        break;

      case "backwards":
        for (n = null, l = t.child, t.child = null; null !== l;) {
          if (null !== (e = l.alternate) && null === Bi(e)) {
            t.child = l;
            break;
          }

          e = l.sibling, l.sibling = n, n = l, l = e;
        }

        nu(t, !0, n, null, a, t.lastEffect);
        break;

      case "together":
        nu(t, !1, null, null, void 0, t.lastEffect);
        break;

      default:
        t.memoizedState = null;
    }
    return t.child;
  }

  function lu(e, t, n) {
    null !== e && (t.dependencies = e.dependencies);
    var r = t.expirationTime;
    if (0 !== r && fc(r), t.childExpirationTime < n) return null;
    if (null !== e && t.child !== e.child) throw Error(le(153));

    if (null !== t.child) {
      for (n = Mc(e = t.child, e.pendingProps, e.expirationTime), t.child = n, n.return = t; null !== e.sibling;) e = e.sibling, (n = n.sibling = Mc(e, e.pendingProps, e.expirationTime)).return = t;

      n.sibling = null;
    }

    return t.child;
  }

  function au(e) {
    e.effectTag |= 4;
  }

  function iu(e, t) {
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;

        for (var n = null; null !== t;) null !== t.alternate && (n = t), t = t.sibling;

        null === n ? e.tail = null : n.sibling = null;
        break;

      case "collapsed":
        n = e.tail;

        for (var r = null; null !== n;) null !== n.alternate && (r = n), n = n.sibling;

        null === r ? t || null === e.tail ? e.tail = null : e.tail.sibling = null : r.sibling = null;
    }
  }

  function ou(e) {
    switch (e.tag) {
      case 1:
        ha(e.type) && ya();
        var t = e.effectTag;
        return 4096 & t ? (e.effectTag = -4097 & t | 64, e) : null;

      case 3:
        if (ji(), va(), 0 != (64 & (t = e.effectTag))) throw Error(le(285));
        return e.effectTag = -4097 & t | 64, e;

      case 5:
        return Wi(e), null;

      case 13:
        return ua(Vi), 4096 & (t = e.effectTag) ? (e.effectTag = -4097 & t | 64, e) : null;

      case 19:
        return ua(Vi), null;

      case 4:
        return ji(), null;

      case 10:
        return ri(e), null;

      default:
        return null;
    }
  }

  function uu(e, t) {
    return {
      value: e,
      source: t,
      stack: Ye(t)
    };
  }

  Yo = function (e, t) {
    for (var n = t.child; null !== n;) {
      if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);else if (4 !== n.tag && null !== n.child) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t) break;

      for (; null === n.sibling;) {
        if (null === n.return || n.return === t) return;
        n = n.return;
      }

      n.sibling.return = n.return, n = n.sibling;
    }
  }, Go = function (e, t, n, r, l) {
    var a = e.memoizedProps;

    if (a !== r) {
      var i,
          o,
          u = t.stateNode;

      switch (Ui(Ri.current), e = null, n) {
        case "input":
          a = St(u, a), r = St(u, r), e = [];
          break;

        case "option":
          a = Mt(u, a), r = Mt(u, r), e = [];
          break;

        case "select":
          a = ee({}, a, {
            value: void 0
          }), r = ee({}, r, {
            value: void 0
          }), e = [];
          break;

        case "textarea":
          a = It(u, a), r = It(u, r), e = [];
          break;

        default:
          "function" != typeof a.onClick && "function" == typeof r.onClick && (u.onclick = Br);
      }

      for (i in Ar(n, r), n = null, a) if (!r.hasOwnProperty(i) && a.hasOwnProperty(i) && null != a[i]) if ("style" === i) for (o in u = a[i]) u.hasOwnProperty(o) && (n || (n = {}), n[o] = "");else "dangerouslySetInnerHTML" !== i && "children" !== i && "suppressContentEditableWarning" !== i && "suppressHydrationWarning" !== i && "autoFocus" !== i && (fe.hasOwnProperty(i) ? e || (e = []) : (e = e || []).push(i, null));

      for (i in r) {
        var c = r[i];
        if (u = null != a ? a[i] : void 0, r.hasOwnProperty(i) && c !== u && (null != c || null != u)) if ("style" === i) {
          if (u) {
            for (o in u) !u.hasOwnProperty(o) || c && c.hasOwnProperty(o) || (n || (n = {}), n[o] = "");

            for (o in c) c.hasOwnProperty(o) && u[o] !== c[o] && (n || (n = {}), n[o] = c[o]);
          } else n || (e || (e = []), e.push(i, n)), n = c;
        } else "dangerouslySetInnerHTML" === i ? (c = c ? c.__html : void 0, u = u ? u.__html : void 0, null != c && u !== c && (e = e || []).push(i, "" + c)) : "children" === i ? u === c || "string" != typeof c && "number" != typeof c || (e = e || []).push(i, "" + c) : "suppressContentEditableWarning" !== i && "suppressHydrationWarning" !== i && (fe.hasOwnProperty(i) ? (null != c && Vr(l, i), e || u === c || (e = [])) : (e = e || []).push(i, c));
      }

      n && (e = e || []).push("style", n), l = e, (t.updateQueue = l) && au(t);
    }
  }, Zo = function (e, t, n, r) {
    n !== r && au(t);
  };
  var cu = "function" == typeof WeakSet ? WeakSet : Set;

  function su(e, t) {
    var n = t.source,
        r = t.stack;
    null === r && null !== n && (r = Ye(n)), null !== n && Xe(n.type), t = t.value, null !== e && 1 === e.tag && Xe(e.type);

    try {
      console.error(t);
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }

  function fu(e) {
    var t = e.ref;
    if (null !== t) if ("function" == typeof t) try {
      t(null);
    } catch (t) {
      xc(e, t);
    } else t.current = null;
  }

  function du(e, t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        pu(2, 0, t);
        break;

      case 1:
        if (256 & t.effectTag && null !== e) {
          var n = e.memoizedProps,
              r = e.memoizedState;
          t = (e = t.stateNode).getSnapshotBeforeUpdate(t.elementType === t.type ? n : Ya(t.type, n), r), e.__reactInternalSnapshotBeforeUpdate = t;
        }

        break;

      case 3:
      case 5:
      case 6:
      case 4:
      case 17:
        break;

      default:
        throw Error(le(163));
    }
  }

  function pu(e, t, n) {
    if (null !== (n = null !== (n = n.updateQueue) ? n.lastEffect : null)) {
      var r = n = n.next;

      do {
        if (0 != (r.tag & e)) {
          var l = r.destroy;
          r.destroy = void 0, void 0 !== l && l();
        }

        0 != (r.tag & t) && (l = r.create, r.destroy = l()), r = r.next;
      } while (r !== n);
    }
  }

  function mu(e, t, n) {
    switch ("function" == typeof _c && _c(t), t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (null !== (e = t.updateQueue) && null !== (e = e.lastEffect)) {
          var r = e.next;
          Ba(97 < n ? 97 : n, function () {
            var e = r;

            do {
              var n = e.destroy;

              if (void 0 !== n) {
                var l = t;

                try {
                  n();
                } catch (e) {
                  xc(l, e);
                }
              }

              e = e.next;
            } while (e !== r);
          });
        }

        break;

      case 1:
        fu(t), "function" == typeof (n = t.stateNode).componentWillUnmount && function (e, t) {
          try {
            t.props = e.memoizedProps, t.state = e.memoizedState, t.componentWillUnmount();
          } catch (t) {
            xc(e, t);
          }
        }(t, n);
        break;

      case 5:
        fu(t);
        break;

      case 4:
        bu(e, t, n);
    }
  }

  function hu(e) {
    var t = e.alternate;
    e.return = null, e.child = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.alternate = null, e.firstEffect = null, e.lastEffect = null, e.pendingProps = null, e.memoizedProps = null, null !== t && hu(t);
  }

  function yu(e) {
    return 5 === e.tag || 3 === e.tag || 4 === e.tag;
  }

  function vu(e) {
    e: {
      for (var t = e.return; null !== t;) {
        if (yu(t)) {
          var n = t;
          break e;
        }

        t = t.return;
      }

      throw Error(le(160));
    }

    switch (t = n.stateNode, n.tag) {
      case 5:
        var r = !1;
        break;

      case 3:
      case 4:
        t = t.containerInfo, r = !0;
        break;

      default:
        throw Error(le(161));
    }

    16 & n.effectTag && (Bt(t, ""), n.effectTag &= -17);

    e: t: for (n = e;;) {
      for (; null === n.sibling;) {
        if (null === n.return || yu(n.return)) {
          n = null;
          break e;
        }

        n = n.return;
      }

      for (n.sibling.return = n.return, n = n.sibling; 5 !== n.tag && 6 !== n.tag && 18 !== n.tag;) {
        if (2 & n.effectTag) continue t;
        if (null === n.child || 4 === n.tag) continue t;
        n.child.return = n, n = n.child;
      }

      if (!(2 & n.effectTag)) {
        n = n.stateNode;
        break e;
      }
    }

    for (var l = e;;) {
      var a = 5 === l.tag || 6 === l.tag;

      if (a) {
        var i = a ? l.stateNode : l.stateNode.instance;
        if (n) {
          if (r) {
            var o = i;
            i = n, 8 === (a = t).nodeType ? a.parentNode.insertBefore(o, i) : a.insertBefore(o, i);
          } else t.insertBefore(i, n);
        } else r ? (8 === (o = t).nodeType ? (a = o.parentNode).insertBefore(i, o) : (a = o).appendChild(i), null != (o = o._reactRootContainer) || null !== a.onclick || (a.onclick = Br)) : t.appendChild(i);
      } else if (4 !== l.tag && null !== l.child) {
        l.child.return = l, l = l.child;
        continue;
      }

      if (l === e) break;

      for (; null === l.sibling;) {
        if (null === l.return || l.return === e) return;
        l = l.return;
      }

      l.sibling.return = l.return, l = l.sibling;
    }
  }

  function bu(e, t, n) {
    for (var r, l, a = t, i = !1;;) {
      if (!i) {
        i = a.return;

        e: for (;;) {
          if (null === i) throw Error(le(160));

          switch (r = i.stateNode, i.tag) {
            case 5:
              l = !1;
              break e;

            case 3:
            case 4:
              r = r.containerInfo, l = !0;
              break e;
          }

          i = i.return;
        }

        i = !0;
      }

      if (5 === a.tag || 6 === a.tag) {
        e: for (var o = e, u = a, c = n, s = u;;) if (mu(o, s, c), null !== s.child && 4 !== s.tag) s.child.return = s, s = s.child;else {
          if (s === u) break;

          for (; null === s.sibling;) {
            if (null === s.return || s.return === u) break e;
            s = s.return;
          }

          s.sibling.return = s.return, s = s.sibling;
        }

        l ? (o = r, u = a.stateNode, 8 === o.nodeType ? o.parentNode.removeChild(u) : o.removeChild(u)) : r.removeChild(a.stateNode);
      } else if (4 === a.tag) {
        if (null !== a.child) {
          r = a.stateNode.containerInfo, l = !0, a.child.return = a, a = a.child;
          continue;
        }
      } else if (mu(e, a, n), null !== a.child) {
        a.child.return = a, a = a.child;
        continue;
      }

      if (a === t) break;

      for (; null === a.sibling;) {
        if (null === a.return || a.return === t) return;
        4 === (a = a.return).tag && (i = !1);
      }

      a.sibling.return = a.return, a = a.sibling;
    }
  }

  function gu(e, t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        pu(4, 8, t);
        break;

      case 1:
        break;

      case 5:
        var n = t.stateNode;

        if (null != n) {
          var r = t.memoizedProps,
              l = null !== e ? e.memoizedProps : r;
          e = t.type;
          var a = t.updateQueue;

          if (t.updateQueue = null, null !== a) {
            for (n[al] = r, "input" === e && "radio" === r.type && null != r.name && _t(n, r), Wr(e, l), t = Wr(e, r), l = 0; l < a.length; l += 2) {
              var i = a[l],
                  o = a[l + 1];
              "style" === i ? Lr(n, o) : "dangerouslySetInnerHTML" === i ? Vt(n, o) : "children" === i ? Bt(n, o) : wt(n, i, o, t);
            }

            switch (e) {
              case "input":
                Pt(n, r);
                break;

              case "textarea":
                Dt(n, r);
                break;

              case "select":
                t = n._wrapperState.wasMultiple, n._wrapperState.wasMultiple = !!r.multiple, null != (e = r.value) ? zt(n, !!r.multiple, e, !1) : t !== !!r.multiple && (null != r.defaultValue ? zt(n, !!r.multiple, r.defaultValue, !0) : zt(n, !!r.multiple, r.multiple ? [] : "", !1));
            }
          }
        }

        break;

      case 6:
        if (null === t.stateNode) throw Error(le(162));
        t.stateNode.nodeValue = t.memoizedProps;
        break;

      case 3:
        (t = t.stateNode).hydrate && (t.hydrate = !1, Cn(t.containerInfo));
        break;

      case 12:
        break;

      case 13:
        if (n = t, null === t.memoizedState ? r = !1 : (r = !0, n = t.child, ju = Aa()), null !== n) e: for (e = n;;) {
          if (5 === e.tag) a = e.stateNode, r ? "function" == typeof (a = a.style).setProperty ? a.setProperty("display", "none", "important") : a.display = "none" : (a = e.stateNode, l = null != (l = e.memoizedProps.style) && l.hasOwnProperty("display") ? l.display : null, a.style.display = Ur("display", l));else if (6 === e.tag) e.stateNode.nodeValue = r ? "" : e.memoizedProps;else {
            if (13 === e.tag && null !== e.memoizedState && null === e.memoizedState.dehydrated) {
              (a = e.child.sibling).return = e, e = a;
              continue;
            }

            if (null !== e.child) {
              e.child.return = e, e = e.child;
              continue;
            }
          }
          if (e === n) break e;

          for (; null === e.sibling;) {
            if (null === e.return || e.return === n) break e;
            e = e.return;
          }

          e.sibling.return = e.return, e = e.sibling;
        }
        ku(t);
        break;

      case 19:
        ku(t);
        break;

      case 17:
      case 20:
      case 21:
        break;

      default:
        throw Error(le(163));
    }
  }

  function ku(e) {
    var t = e.updateQueue;

    if (null !== t) {
      e.updateQueue = null;
      var n = e.stateNode;
      null === n && (n = e.stateNode = new cu()), t.forEach(function (t) {
        var r = Sc.bind(null, e, t);
        n.has(t) || (n.add(t), t.then(r, r));
      });
    }
  }

  var wu = "function" == typeof WeakMap ? WeakMap : Map;

  function Eu(e, t, n) {
    (n = si(n, null)).tag = 3, n.payload = {
      element: null
    };
    var r = t.value;
    return n.callback = function () {
      Wu || (Wu = !0, Vu = r), su(e, t);
    }, n;
  }

  function xu(e, t, n) {
    (n = si(n, null)).tag = 3;
    var r = e.type.getDerivedStateFromError;

    if ("function" == typeof r) {
      var l = t.value;

      n.payload = function () {
        return su(e, t), r(l);
      };
    }

    var a = e.stateNode;
    return null !== a && "function" == typeof a.componentDidCatch && (n.callback = function () {
      "function" != typeof r && (null === Bu ? Bu = new Set([this]) : Bu.add(this), su(e, t));
      var n = t.stack;
      this.componentDidCatch(t.value, {
        componentStack: null !== n ? n : ""
      });
    }), n;
  }

  var Tu,
      Su = Math.ceil,
      Cu = Me.ReactCurrentDispatcher,
      _u = Me.ReactCurrentOwner,
      Pu = 0,
      Nu = null,
      Ou = null,
      Mu = 0,
      zu = 0,
      Iu = null,
      Ru = 1073741823,
      Du = 1073741823,
      Fu = null,
      Uu = 0,
      Lu = !1,
      ju = 0,
      Au = null,
      Wu = !1,
      Vu = null,
      Bu = null,
      Qu = !1,
      $u = null,
      Hu = 90,
      Ku = null,
      qu = 0,
      Xu = null,
      Yu = 0;

  function Gu() {
    return 0 != (48 & Pu) ? 1073741821 - (Aa() / 10 | 0) : 0 !== Yu ? Yu : Yu = 1073741821 - (Aa() / 10 | 0);
  }

  function Zu(e, t, n) {
    if (0 == (2 & (t = t.mode))) return 1073741823;
    var r = Wa();
    if (0 == (4 & t)) return 99 === r ? 1073741823 : 1073741822;
    if (0 != (16 & Pu)) return Mu;
    if (null !== n) e = Xa(e, 0 | n.timeoutMs || 5e3, 250);else switch (r) {
      case 99:
        e = 1073741823;
        break;

      case 98:
        e = Xa(e, 150, 100);
        break;

      case 97:
      case 96:
        e = Xa(e, 5e3, 250);
        break;

      case 95:
        e = 2;
        break;

      default:
        throw Error(le(326));
    }
    return null !== Nu && e === Mu && --e, e;
  }

  function Ju(e, t) {
    if (50 < qu) throw qu = 0, Xu = null, Error(le(185));

    if (null !== (e = ec(e, t))) {
      var n = Wa();
      1073741823 === t ? 0 != (8 & Pu) && 0 == (48 & Pu) ? lc(e) : (nc(e), 0 === Pu && Ha()) : nc(e), 0 == (4 & Pu) || 98 !== n && 99 !== n || (null === Ku ? Ku = new Map([[e, t]]) : (void 0 === (n = Ku.get(e)) || n > t) && Ku.set(e, t));
    }
  }

  function ec(e, t) {
    e.expirationTime < t && (e.expirationTime = t);
    var n = e.alternate;
    null !== n && n.expirationTime < t && (n.expirationTime = t);
    var r = e.return,
        l = null;
    if (null === r && 3 === e.tag) l = e.stateNode;else for (; null !== r;) {
      if (n = r.alternate, r.childExpirationTime < t && (r.childExpirationTime = t), null !== n && n.childExpirationTime < t && (n.childExpirationTime = t), null === r.return && 3 === r.tag) {
        l = r.stateNode;
        break;
      }

      r = r.return;
    }
    return null !== l && (Nu === l && (fc(t), 4 === zu && Lc(l, Mu)), jc(l, t)), l;
  }

  function tc(e) {
    var t = e.lastExpiredTime;
    return 0 !== t ? t : Uc(e, t = e.firstPendingTime) ? (t = e.lastPingedTime) > (e = e.nextKnownPendingLevel) ? t : e : t;
  }

  function nc(e) {
    if (0 !== e.lastExpiredTime) e.callbackExpirationTime = 1073741823, e.callbackPriority = 99, e.callbackNode = $a(lc.bind(null, e));else {
      var t = tc(e),
          n = e.callbackNode;
      if (0 === t) null !== n && (e.callbackNode = null, e.callbackExpirationTime = 0, e.callbackPriority = 90);else {
        var r = Gu();

        if (1073741823 === t ? r = 99 : 1 === t || 2 === t ? r = 95 : r = 0 >= (r = 10 * (1073741821 - t) - 10 * (1073741821 - r)) ? 99 : 250 >= r ? 98 : 5250 >= r ? 97 : 95, null !== n) {
          var l = e.callbackPriority;
          if (e.callbackExpirationTime === t && l >= r) return;
          n !== Ra && Ta(n);
        }

        e.callbackExpirationTime = t, e.callbackPriority = r, t = 1073741823 === t ? $a(lc.bind(null, e)) : Qa(r, rc.bind(null, e), {
          timeout: 10 * (1073741821 - t) - Aa()
        }), e.callbackNode = t;
      }
    }
  }

  function rc(e, t) {
    if (Yu = 0, t) return Ac(e, t = Gu()), nc(e), null;
    var n = tc(e);

    if (0 !== n) {
      if (t = e.callbackNode, 0 != (48 & Pu)) throw Error(le(327));

      if (kc(), e === Nu && n === Mu || oc(e, n), null !== Ou) {
        var r = Pu;
        Pu |= 16;

        for (var l = cc();;) try {
          pc();
          break;
        } catch (t) {
          uc(e, t);
        }

        if (ti(), Pu = r, Cu.current = l, 1 === zu) throw t = Iu, oc(e, n), Lc(e, n), nc(e), t;
        if (null === Ou) switch (l = e.finishedWork = e.current.alternate, e.finishedExpirationTime = n, r = zu, Nu = null, r) {
          case 0:
          case 1:
            throw Error(le(345));

          case 2:
            Ac(e, 2 < n ? 2 : n);
            break;

          case 3:
            if (Lc(e, n), n === (r = e.lastSuspendedTime) && (e.nextKnownPendingLevel = yc(l)), 1073741823 === Ru && 10 < (l = ju + 500 - Aa())) {
              if (Lu) {
                var a = e.lastPingedTime;

                if (0 === a || a >= n) {
                  e.lastPingedTime = n, oc(e, n);
                  break;
                }
              }

              if (0 !== (a = tc(e)) && a !== n) break;

              if (0 !== r && r !== n) {
                e.lastPingedTime = r;
                break;
              }

              e.timeoutHandle = Jr(vc.bind(null, e), l);
              break;
            }

            vc(e);
            break;

          case 4:
            if (Lc(e, n), n === (r = e.lastSuspendedTime) && (e.nextKnownPendingLevel = yc(l)), Lu && (0 === (l = e.lastPingedTime) || l >= n)) {
              e.lastPingedTime = n, oc(e, n);
              break;
            }

            if (0 !== (l = tc(e)) && l !== n) break;

            if (0 !== r && r !== n) {
              e.lastPingedTime = r;
              break;
            }

            if (1073741823 !== Du ? r = 10 * (1073741821 - Du) - Aa() : 1073741823 === Ru ? r = 0 : (r = 10 * (1073741821 - Ru) - 5e3, 0 > (r = (l = Aa()) - r) && (r = 0), (n = 10 * (1073741821 - n) - l) < (r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Su(r / 1960)) - r) && (r = n)), 10 < r) {
              e.timeoutHandle = Jr(vc.bind(null, e), r);
              break;
            }

            vc(e);
            break;

          case 5:
            if (1073741823 !== Ru && null !== Fu) {
              a = Ru;
              var i = Fu;

              if (0 >= (r = 0 | i.busyMinDurationMs) ? r = 0 : (l = 0 | i.busyDelayMs, r = (a = Aa() - (10 * (1073741821 - a) - (0 | i.timeoutMs || 5e3))) <= l ? 0 : l + r - a), 10 < r) {
                Lc(e, n), e.timeoutHandle = Jr(vc.bind(null, e), r);
                break;
              }
            }

            vc(e);
            break;

          default:
            throw Error(le(329));
        }
        if (nc(e), e.callbackNode === t) return rc.bind(null, e);
      }
    }

    return null;
  }

  function lc(e) {
    var t = e.lastExpiredTime;
    if (t = 0 !== t ? t : 1073741823, e.finishedExpirationTime === t) vc(e);else {
      if (0 != (48 & Pu)) throw Error(le(327));

      if (kc(), e === Nu && t === Mu || oc(e, t), null !== Ou) {
        var n = Pu;
        Pu |= 16;

        for (var r = cc();;) try {
          dc();
          break;
        } catch (t) {
          uc(e, t);
        }

        if (ti(), Pu = n, Cu.current = r, 1 === zu) throw n = Iu, oc(e, t), Lc(e, t), nc(e), n;
        if (null !== Ou) throw Error(le(261));
        e.finishedWork = e.current.alternate, e.finishedExpirationTime = t, Nu = null, vc(e), nc(e);
      }
    }
    return null;
  }

  function ac(e, t) {
    var n = Pu;
    Pu |= 1;

    try {
      return e(t);
    } finally {
      0 === (Pu = n) && Ha();
    }
  }

  function ic(e, t) {
    var n = Pu;
    Pu &= -2, Pu |= 8;

    try {
      return e(t);
    } finally {
      0 === (Pu = n) && Ha();
    }
  }

  function oc(e, t) {
    e.finishedWork = null, e.finishedExpirationTime = 0;
    var n = e.timeoutHandle;
    if (-1 !== n && (e.timeoutHandle = -1, el(n)), null !== Ou) for (n = Ou.return; null !== n;) {
      var r = n;

      switch (r.tag) {
        case 1:
          var l = r.type.childContextTypes;
          null != l && ya();
          break;

        case 3:
          ji(), va();
          break;

        case 5:
          Wi(r);
          break;

        case 4:
          ji();
          break;

        case 13:
        case 19:
          ua(Vi);
          break;

        case 10:
          ri(r);
      }

      n = n.return;
    }
    Nu = e, Ou = Mc(e.current, null), Mu = t, zu = 0, Iu = null, Du = Ru = 1073741823, Fu = null, Uu = 0, Lu = !1;
  }

  function uc(t, n) {
    for (;;) {
      try {
        if (ti(), co(), null === Ou || null === Ou.return) return zu = 1, Iu = n, null;

        e: {
          var r = t,
              l = Ou.return,
              a = Ou,
              i = n;

          if (n = Mu, a.effectTag |= 2048, a.firstEffect = a.lastEffect = null, null !== i && "object" === e(i) && "function" == typeof i.then) {
            var o = i,
                u = 0 != (1 & Vi.current),
                c = l;

            do {
              var s;

              if (s = 13 === c.tag) {
                var f = c.memoizedState;
                if (null !== f) s = null !== f.dehydrated;else {
                  var d = c.memoizedProps;
                  s = void 0 !== d.fallback && (!0 !== d.unstable_avoidThisFallback || !u);
                }
              }

              if (s) {
                var p = c.updateQueue;

                if (null === p) {
                  var m = new Set();
                  m.add(o), c.updateQueue = m;
                } else p.add(o);

                if (0 == (2 & c.mode)) {
                  if (c.effectTag |= 64, a.effectTag &= -2981, 1 === a.tag) if (null === a.alternate) a.tag = 17;else {
                    var h = si(1073741823, null);
                    h.tag = 2, di(a, h);
                  }
                  a.expirationTime = 1073741823;
                  break e;
                }

                i = void 0, a = n;
                var y = r.pingCache;

                if (null === y ? (y = r.pingCache = new wu(), i = new Set(), y.set(o, i)) : void 0 === (i = y.get(o)) && (i = new Set(), y.set(o, i)), !i.has(a)) {
                  i.add(a);
                  var v = Tc.bind(null, r, o, a);
                  o.then(v, v);
                }

                c.effectTag |= 4096, c.expirationTime = n;
                break e;
              }

              c = c.return;
            } while (null !== c);

            i = Error((Xe(a.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." + Ye(a));
          }

          5 !== zu && (zu = 2), i = uu(i, a), c = l;

          do {
            switch (c.tag) {
              case 3:
                o = i, c.effectTag |= 4096, c.expirationTime = n, pi(c, Eu(c, o, n));
                break e;

              case 1:
                o = i;
                var b = c.type,
                    g = c.stateNode;

                if (0 == (64 & c.effectTag) && ("function" == typeof b.getDerivedStateFromError || null !== g && "function" == typeof g.componentDidCatch && (null === Bu || !Bu.has(g)))) {
                  c.effectTag |= 4096, c.expirationTime = n, pi(c, xu(c, o, n));
                  break e;
                }

            }

            c = c.return;
          } while (null !== c);
        }

        Ou = hc(Ou);
      } catch (e) {
        n = e;
        continue;
      }

      break;
    }
  }

  function cc() {
    var e = Cu.current;
    return Cu.current = _o, null === e ? _o : e;
  }

  function sc(e, t) {
    e < Ru && 2 < e && (Ru = e), null !== t && e < Du && 2 < e && (Du = e, Fu = t);
  }

  function fc(e) {
    e > Uu && (Uu = e);
  }

  function dc() {
    for (; null !== Ou;) Ou = mc(Ou);
  }

  function pc() {
    for (; null !== Ou && !Sa();) Ou = mc(Ou);
  }

  function mc(e) {
    var t = Tu(e.alternate, e, Mu);
    return e.memoizedProps = e.pendingProps, null === t && (t = hc(e)), _u.current = null, t;
  }

  function hc(e) {
    Ou = e;

    do {
      var t = Ou.alternate;

      if (e = Ou.return, 0 == (2048 & Ou.effectTag)) {
        e: {
          var n = t,
              r = Mu,
              l = (t = Ou).pendingProps;

          switch (t.tag) {
            case 2:
            case 16:
              break;

            case 15:
            case 0:
              break;

            case 1:
              ha(t.type) && ya();
              break;

            case 3:
              ji(), va(), (l = t.stateNode).pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (null === n || null === n.child) && Uo(t) && au(t);
              break;

            case 5:
              Wi(t), r = Ui(Fi.current);
              var a = t.type;
              if (null !== n && null != t.stateNode) Go(n, t, a, l, r), n.ref !== t.ref && (t.effectTag |= 128);else if (l) {
                var i = Ui(Ri.current);

                if (Uo(t)) {
                  var o = (l = t).stateNode;
                  n = l.type;
                  var u = l.memoizedProps,
                      c = r;

                  switch (o[ll] = l, o[al] = u, a = void 0, r = o, n) {
                    case "iframe":
                    case "object":
                    case "embed":
                      Tr("load", r);
                      break;

                    case "video":
                    case "audio":
                      for (o = 0; o < Jt.length; o++) Tr(Jt[o], r);

                      break;

                    case "source":
                      Tr("error", r);
                      break;

                    case "img":
                    case "image":
                    case "link":
                      Tr("error", r), Tr("load", r);
                      break;

                    case "form":
                      Tr("reset", r), Tr("submit", r);
                      break;

                    case "details":
                      Tr("toggle", r);
                      break;

                    case "input":
                      Ct(r, u), Tr("invalid", r), Vr(c, "onChange");
                      break;

                    case "select":
                      r._wrapperState = {
                        wasMultiple: !!u.multiple
                      }, Tr("invalid", r), Vr(c, "onChange");
                      break;

                    case "textarea":
                      Rt(r, u), Tr("invalid", r), Vr(c, "onChange");
                  }

                  for (a in Ar(n, u), o = null, u) u.hasOwnProperty(a) && (i = u[a], "children" === a ? "string" == typeof i ? r.textContent !== i && (o = ["children", i]) : "number" == typeof i && r.textContent !== "" + i && (o = ["children", "" + i]) : fe.hasOwnProperty(a) && null != i && Vr(c, a));

                  switch (n) {
                    case "input":
                      xt(r), Nt(r, u, !0);
                      break;

                    case "textarea":
                      xt(r), Ft(r);
                      break;

                    case "select":
                    case "option":
                      break;

                    default:
                      "function" == typeof u.onClick && (r.onclick = Br);
                  }

                  a = o, l.updateQueue = a, (l = null !== a) && au(t);
                } else {
                  n = t, c = a, u = l, o = 9 === r.nodeType ? r : r.ownerDocument, i === Ut && (i = jt(c)), i === Ut ? "script" === c ? ((u = o.createElement("div")).innerHTML = "<script><\/script>", o = u.removeChild(u.firstChild)) : "string" == typeof u.is ? o = o.createElement(c, {
                    is: u.is
                  }) : (o = o.createElement(c), "select" === c && (c = o, u.multiple ? c.multiple = !0 : u.size && (c.size = u.size))) : o = o.createElementNS(i, c), (u = o)[ll] = n, u[al] = l, Yo(u, t), t.stateNode = u;
                  var s = r,
                      f = Wr(c = a, n = l);

                  switch (c) {
                    case "iframe":
                    case "object":
                    case "embed":
                      Tr("load", u), r = n;
                      break;

                    case "video":
                    case "audio":
                      for (r = 0; r < Jt.length; r++) Tr(Jt[r], u);

                      r = n;
                      break;

                    case "source":
                      Tr("error", u), r = n;
                      break;

                    case "img":
                    case "image":
                    case "link":
                      Tr("error", u), Tr("load", u), r = n;
                      break;

                    case "form":
                      Tr("reset", u), Tr("submit", u), r = n;
                      break;

                    case "details":
                      Tr("toggle", u), r = n;
                      break;

                    case "input":
                      Ct(u, n), r = St(u, n), Tr("invalid", u), Vr(s, "onChange");
                      break;

                    case "option":
                      r = Mt(u, n);
                      break;

                    case "select":
                      u._wrapperState = {
                        wasMultiple: !!n.multiple
                      }, r = ee({}, n, {
                        value: void 0
                      }), Tr("invalid", u), Vr(s, "onChange");
                      break;

                    case "textarea":
                      Rt(u, n), r = It(u, n), Tr("invalid", u), Vr(s, "onChange");
                      break;

                    default:
                      r = n;
                  }

                  Ar(c, r), o = void 0, i = c;
                  var d = u,
                      p = r;

                  for (o in p) if (p.hasOwnProperty(o)) {
                    var m = p[o];
                    "style" === o ? Lr(d, m) : "dangerouslySetInnerHTML" === o ? null != (m = m ? m.__html : void 0) && Vt(d, m) : "children" === o ? "string" == typeof m ? ("textarea" !== i || "" !== m) && Bt(d, m) : "number" == typeof m && Bt(d, "" + m) : "suppressContentEditableWarning" !== o && "suppressHydrationWarning" !== o && "autoFocus" !== o && (fe.hasOwnProperty(o) ? null != m && Vr(s, o) : null != m && wt(d, o, m, f));
                  }

                  switch (c) {
                    case "input":
                      xt(u), Nt(u, n, !1);
                      break;

                    case "textarea":
                      xt(u), Ft(u);
                      break;

                    case "option":
                      null != n.value && u.setAttribute("value", "" + kt(n.value));
                      break;

                    case "select":
                      (r = u).multiple = !!n.multiple, null != (u = n.value) ? zt(r, !!n.multiple, u, !1) : null != n.defaultValue && zt(r, !!n.multiple, n.defaultValue, !0);
                      break;

                    default:
                      "function" == typeof r.onClick && (u.onclick = Br);
                  }

                  (l = Gr(a, l)) && au(t);
                }

                null !== t.ref && (t.effectTag |= 128);
              } else if (null === t.stateNode) throw Error(le(166));
              break;

            case 6:
              if (n && null != t.stateNode) Zo(0, t, n.memoizedProps, l);else {
                if ("string" != typeof l && null === t.stateNode) throw Error(le(166));
                r = Ui(Fi.current), Ui(Ri.current), Uo(t) ? (a = (l = t).stateNode, r = l.memoizedProps, a[ll] = l, (l = a.nodeValue !== r) && au(t)) : (a = t, (l = (9 === r.nodeType ? r : r.ownerDocument).createTextNode(l))[ll] = a, t.stateNode = l);
              }
              break;

            case 11:
              break;

            case 13:
              if (ua(Vi), l = t.memoizedState, 0 != (64 & t.effectTag)) {
                t.expirationTime = r;
                break e;
              }

              l = null !== l, a = !1, null === n ? void 0 !== t.memoizedProps.fallback && Uo(t) : (a = null !== (r = n.memoizedState), l || null === r || null !== (r = n.child.sibling) && (null !== (u = t.firstEffect) ? (t.firstEffect = r, r.nextEffect = u) : (t.firstEffect = t.lastEffect = r, r.nextEffect = null), r.effectTag = 8)), l && !a && 0 != (2 & t.mode) && (null === n && !0 !== t.memoizedProps.unstable_avoidThisFallback || 0 != (1 & Vi.current) ? 0 === zu && (zu = 3) : (0 !== zu && 3 !== zu || (zu = 4), 0 !== Uu && null !== Nu && (Lc(Nu, Mu), jc(Nu, Uu)))), (l || a) && (t.effectTag |= 4);
              break;

            case 7:
            case 8:
            case 12:
              break;

            case 4:
              ji();
              break;

            case 10:
              ri(t);
              break;

            case 9:
            case 14:
              break;

            case 17:
              ha(t.type) && ya();
              break;

            case 19:
              if (ua(Vi), null === (l = t.memoizedState)) break;

              if (a = 0 != (64 & t.effectTag), null === (u = l.rendering)) {
                if (a) iu(l, !1);else if (0 !== zu || null !== n && 0 != (64 & n.effectTag)) for (n = t.child; null !== n;) {
                  if (null !== (u = Bi(n))) {
                    for (t.effectTag |= 64, iu(l, !1), null !== (a = u.updateQueue) && (t.updateQueue = a, t.effectTag |= 4), null === l.lastEffect && (t.firstEffect = null), t.lastEffect = l.lastEffect, l = r, a = t.child; null !== a;) n = l, (r = a).effectTag &= 2, r.nextEffect = null, r.firstEffect = null, r.lastEffect = null, null === (u = r.alternate) ? (r.childExpirationTime = 0, r.expirationTime = n, r.child = null, r.memoizedProps = null, r.memoizedState = null, r.updateQueue = null, r.dependencies = null) : (r.childExpirationTime = u.childExpirationTime, r.expirationTime = u.expirationTime, r.child = u.child, r.memoizedProps = u.memoizedProps, r.memoizedState = u.memoizedState, r.updateQueue = u.updateQueue, n = u.dependencies, r.dependencies = null === n ? null : {
                      expirationTime: n.expirationTime,
                      firstContext: n.firstContext,
                      responders: n.responders
                    }), a = a.sibling;

                    ca(Vi, 1 & Vi.current | 2), t = t.child;
                    break e;
                  }

                  n = n.sibling;
                }
              } else {
                if (!a) if (null !== (n = Bi(u))) {
                  if (t.effectTag |= 64, a = !0, null !== (r = n.updateQueue) && (t.updateQueue = r, t.effectTag |= 4), iu(l, !0), null === l.tail && "hidden" === l.tailMode && !u.alternate) {
                    null !== (t = t.lastEffect = l.lastEffect) && (t.nextEffect = null);
                    break;
                  }
                } else Aa() > l.tailExpiration && 1 < r && (t.effectTag |= 64, a = !0, iu(l, !1), t.expirationTime = t.childExpirationTime = r - 1);
                l.isBackwards ? (u.sibling = t.child, t.child = u) : (null !== (r = l.last) ? r.sibling = u : t.child = u, l.last = u);
              }

              if (null !== l.tail) {
                0 === l.tailExpiration && (l.tailExpiration = Aa() + 500), r = l.tail, l.rendering = r, l.tail = r.sibling, l.lastEffect = t.lastEffect, r.sibling = null, l = Vi.current, ca(Vi, l = a ? 1 & l | 2 : 1 & l), t = r;
                break e;
              }

              break;

            case 20:
            case 21:
              break;

            default:
              throw Error(le(156, t.tag));
          }

          t = null;
        }

        if (l = Ou, 1 === Mu || 1 !== l.childExpirationTime) {
          for (a = 0, r = l.child; null !== r;) (n = r.expirationTime) > a && (a = n), (u = r.childExpirationTime) > a && (a = u), r = r.sibling;

          l.childExpirationTime = a;
        }

        if (null !== t) return t;
        null !== e && 0 == (2048 & e.effectTag) && (null === e.firstEffect && (e.firstEffect = Ou.firstEffect), null !== Ou.lastEffect && (null !== e.lastEffect && (e.lastEffect.nextEffect = Ou.firstEffect), e.lastEffect = Ou.lastEffect), 1 < Ou.effectTag && (null !== e.lastEffect ? e.lastEffect.nextEffect = Ou : e.firstEffect = Ou, e.lastEffect = Ou));
      } else {
        if (null !== (t = ou(Ou))) return t.effectTag &= 2047, t;
        null !== e && (e.firstEffect = e.lastEffect = null, e.effectTag |= 2048);
      }

      if (null !== (t = Ou.sibling)) return t;
      Ou = e;
    } while (null !== Ou);

    return 0 === zu && (zu = 5), null;
  }

  function yc(e) {
    var t = e.expirationTime;
    return t > (e = e.childExpirationTime) ? t : e;
  }

  function vc(e) {
    var t = Wa();
    return Ba(99, bc.bind(null, e, t)), null;
  }

  function bc(e, t) {
    do {
      kc();
    } while (null !== $u);

    if (0 != (48 & Pu)) throw Error(le(327));
    var n = e.finishedWork,
        r = e.finishedExpirationTime;
    if (null === n) return null;
    if (e.finishedWork = null, e.finishedExpirationTime = 0, n === e.current) throw Error(le(177));
    e.callbackNode = null, e.callbackExpirationTime = 0, e.callbackPriority = 90, e.nextKnownPendingLevel = 0;
    var l = yc(n);

    if (e.firstPendingTime = l, r <= e.lastSuspendedTime ? e.firstSuspendedTime = e.lastSuspendedTime = e.nextKnownPendingLevel = 0 : r <= e.firstSuspendedTime && (e.firstSuspendedTime = r - 1), r <= e.lastPingedTime && (e.lastPingedTime = 0), r <= e.lastExpiredTime && (e.lastExpiredTime = 0), e === Nu && (Ou = Nu = null, Mu = 0), 1 < n.effectTag ? null !== n.lastEffect ? (n.lastEffect.nextEffect = n, l = n.firstEffect) : l = n : l = n.firstEffect, null !== l) {
      var a = Pu;
      Pu |= 32, _u.current = null, Xr = xr;
      var i = Kr();

      if (qr(i)) {
        if ("selectionStart" in i) var o = {
          start: i.selectionStart,
          end: i.selectionEnd
        };else e: {
          var u = (o = (o = i.ownerDocument) && o.defaultView || window).getSelection && o.getSelection();

          if (u && 0 !== u.rangeCount) {
            o = u.anchorNode;
            var c = u.anchorOffset,
                s = u.focusNode;
            u = u.focusOffset;

            try {
              o.nodeType, s.nodeType;
            } catch (e) {
              o = null;
              break e;
            }

            var f = 0,
                d = -1,
                p = -1,
                m = 0,
                h = 0,
                y = i,
                v = null;

            t: for (;;) {
              for (var b; y !== o || 0 !== c && 3 !== y.nodeType || (d = f + c), y !== s || 0 !== u && 3 !== y.nodeType || (p = f + u), 3 === y.nodeType && (f += y.nodeValue.length), null !== (b = y.firstChild);) v = y, y = b;

              for (;;) {
                if (y === i) break t;
                if (v === o && ++m === c && (d = f), v === s && ++h === u && (p = f), null !== (b = y.nextSibling)) break;
                v = (y = v).parentNode;
              }

              y = b;
            }

            o = -1 === d || -1 === p ? null : {
              start: d,
              end: p
            };
          } else o = null;
        }
        o = o || {
          start: 0,
          end: 0
        };
      } else o = null;

      Yr = {
        focusedElem: i,
        selectionRange: o
      }, xr = !1, Au = l;

      do {
        try {
          gc();
        } catch (e) {
          if (null === Au) throw Error(le(330));
          xc(Au, e), Au = Au.nextEffect;
        }
      } while (null !== Au);

      Au = l;

      do {
        try {
          for (i = e, o = t; null !== Au;) {
            var g = Au.effectTag;

            if (16 & g && Bt(Au.stateNode, ""), 128 & g) {
              var k = Au.alternate;

              if (null !== k) {
                var w = k.ref;
                null !== w && ("function" == typeof w ? w(null) : w.current = null);
              }
            }

            switch (1038 & g) {
              case 2:
                vu(Au), Au.effectTag &= -3;
                break;

              case 6:
                vu(Au), Au.effectTag &= -3, gu(Au.alternate, Au);
                break;

              case 1024:
                Au.effectTag &= -1025;
                break;

              case 1028:
                Au.effectTag &= -1025, gu(Au.alternate, Au);
                break;

              case 4:
                gu(Au.alternate, Au);
                break;

              case 8:
                bu(i, c = Au, o), hu(c);
            }

            Au = Au.nextEffect;
          }
        } catch (e) {
          if (null === Au) throw Error(le(330));
          xc(Au, e), Au = Au.nextEffect;
        }
      } while (null !== Au);

      if (w = Yr, k = Kr(), g = w.focusedElem, o = w.selectionRange, k !== g && g && g.ownerDocument && function e(t, n) {
        return !(!t || !n) && (t === n || (!t || 3 !== t.nodeType) && (n && 3 === n.nodeType ? e(t, n.parentNode) : "contains" in t ? t.contains(n) : !!t.compareDocumentPosition && !!(16 & t.compareDocumentPosition(n))));
      }(g.ownerDocument.documentElement, g)) {
        null !== o && qr(g) && (k = o.start, void 0 === (w = o.end) && (w = k), "selectionStart" in g ? (g.selectionStart = k, g.selectionEnd = Math.min(w, g.value.length)) : (w = (k = g.ownerDocument || document) && k.defaultView || window).getSelection && (w = w.getSelection(), c = g.textContent.length, i = Math.min(o.start, c), o = void 0 === o.end ? i : Math.min(o.end, c), !w.extend && i > o && (c = o, o = i, i = c), c = Hr(g, i), s = Hr(g, o), c && s && (1 !== w.rangeCount || w.anchorNode !== c.node || w.anchorOffset !== c.offset || w.focusNode !== s.node || w.focusOffset !== s.offset) && ((k = k.createRange()).setStart(c.node, c.offset), w.removeAllRanges(), i > o ? (w.addRange(k), w.extend(s.node, s.offset)) : (k.setEnd(s.node, s.offset), w.addRange(k))))), k = [];

        for (w = g; w = w.parentNode;) 1 === w.nodeType && k.push({
          element: w,
          left: w.scrollLeft,
          top: w.scrollTop
        });

        for ("function" == typeof g.focus && g.focus(), g = 0; g < k.length; g++) (w = k[g]).element.scrollLeft = w.left, w.element.scrollTop = w.top;
      }

      Yr = null, xr = !!Xr, Xr = null, e.current = n, Au = l;

      do {
        try {
          for (g = r; null !== Au;) {
            var E = Au.effectTag;

            if (36 & E) {
              var x = Au.alternate;

              switch (w = g, (k = Au).tag) {
                case 0:
                case 11:
                case 15:
                  pu(16, 32, k);
                  break;

                case 1:
                  var T = k.stateNode;
                  if (4 & k.effectTag) if (null === x) T.componentDidMount();else {
                    var S = k.elementType === k.type ? x.memoizedProps : Ya(k.type, x.memoizedProps);
                    T.componentDidUpdate(S, x.memoizedState, T.__reactInternalSnapshotBeforeUpdate);
                  }
                  var C = k.updateQueue;
                  null !== C && vi(0, C, T);
                  break;

                case 3:
                  var _ = k.updateQueue;

                  if (null !== _) {
                    if (i = null, null !== k.child) switch (k.child.tag) {
                      case 5:
                        i = k.child.stateNode;
                        break;

                      case 1:
                        i = k.child.stateNode;
                    }
                    vi(0, _, i);
                  }

                  break;

                case 5:
                  var P = k.stateNode;
                  null === x && 4 & k.effectTag && Gr(k.type, k.memoizedProps) && P.focus();
                  break;

                case 6:
                case 4:
                case 12:
                  break;

                case 13:
                  if (null === k.memoizedState) {
                    var N = k.alternate;

                    if (null !== N) {
                      var O = N.memoizedState;

                      if (null !== O) {
                        var M = O.dehydrated;
                        null !== M && Cn(M);
                      }
                    }
                  }

                  break;

                case 19:
                case 17:
                case 20:
                case 21:
                  break;

                default:
                  throw Error(le(163));
              }
            }

            if (128 & E) {
              k = void 0;
              var z = Au.ref;

              if (null !== z) {
                var I = Au.stateNode;

                switch (Au.tag) {
                  case 5:
                    k = I;
                    break;

                  default:
                    k = I;
                }

                "function" == typeof z ? z(k) : z.current = k;
              }
            }

            Au = Au.nextEffect;
          }
        } catch (e) {
          if (null === Au) throw Error(le(330));
          xc(Au, e), Au = Au.nextEffect;
        }
      } while (null !== Au);

      Au = null, Da(), Pu = a;
    } else e.current = n;

    if (Qu) Qu = !1, $u = e, Hu = t;else for (Au = l; null !== Au;) t = Au.nextEffect, Au.nextEffect = null, Au = t;
    if (0 === (t = e.firstPendingTime) && (Bu = null), 1073741823 === t ? e === Xu ? qu++ : (qu = 0, Xu = e) : qu = 0, "function" == typeof Cc && Cc(n.stateNode, r), nc(e), Wu) throw Wu = !1, e = Vu, Vu = null, e;
    return 0 != (8 & Pu) ? null : (Ha(), null);
  }

  function gc() {
    for (; null !== Au;) {
      var e = Au.effectTag;
      0 != (256 & e) && du(Au.alternate, Au), 0 == (512 & e) || Qu || (Qu = !0, Qa(97, function () {
        return kc(), null;
      })), Au = Au.nextEffect;
    }
  }

  function kc() {
    if (90 !== Hu) {
      var e = 97 < Hu ? 97 : Hu;
      return Hu = 90, Ba(e, wc);
    }
  }

  function wc() {
    if (null === $u) return !1;
    var e = $u;
    if ($u = null, 0 != (48 & Pu)) throw Error(le(331));
    var t = Pu;

    for (Pu |= 32, e = e.current.firstEffect; null !== e;) {
      try {
        var n = e;
        if (0 != (512 & n.effectTag)) switch (n.tag) {
          case 0:
          case 11:
          case 15:
            pu(128, 0, n), pu(0, 64, n);
        }
      } catch (t) {
        if (null === e) throw Error(le(330));
        xc(e, t);
      }

      n = e.nextEffect, e.nextEffect = null, e = n;
    }

    return Pu = t, Ha(), !0;
  }

  function Ec(e, t, n) {
    di(e, t = Eu(e, t = uu(n, t), 1073741823)), null !== (e = ec(e, 1073741823)) && nc(e);
  }

  function xc(e, t) {
    if (3 === e.tag) Ec(e, e, t);else for (var n = e.return; null !== n;) {
      if (3 === n.tag) {
        Ec(n, e, t);
        break;
      }

      if (1 === n.tag) {
        var r = n.stateNode;

        if ("function" == typeof n.type.getDerivedStateFromError || "function" == typeof r.componentDidCatch && (null === Bu || !Bu.has(r))) {
          di(n, e = xu(n, e = uu(t, e), 1073741823)), null !== (n = ec(n, 1073741823)) && nc(n);
          break;
        }
      }

      n = n.return;
    }
  }

  function Tc(e, t, n) {
    var r = e.pingCache;
    null !== r && r.delete(t), Nu === e && Mu === n ? 4 === zu || 3 === zu && 1073741823 === Ru && Aa() - ju < 500 ? oc(e, Mu) : Lu = !0 : Uc(e, n) && (0 !== (t = e.lastPingedTime) && t < n || (e.lastPingedTime = n, e.finishedExpirationTime === n && (e.finishedExpirationTime = 0, e.finishedWork = null), nc(e)));
  }

  function Sc(e, t) {
    var n = e.stateNode;
    null !== n && n.delete(t), 0 === (t = 0) && (t = Zu(t = Gu(), e, null)), null !== (e = ec(e, t)) && nc(e);
  }

  Tu = function (t, n, r) {
    var l = n.expirationTime;

    if (null !== t) {
      var a = n.pendingProps;
      if (t.memoizedProps !== a || da.current) Ao = !0;else {
        if (l < r) {
          switch (Ao = !1, n.tag) {
            case 3:
              Xo(n), Lo();
              break;

            case 5:
              if (Ai(n), 4 & n.mode && 1 !== r && a.hidden) return n.expirationTime = n.childExpirationTime = 1, null;
              break;

            case 1:
              ha(n.type) && ka(n);
              break;

            case 4:
              Li(n, n.stateNode.containerInfo);
              break;

            case 10:
              ni(n, n.memoizedProps.value);
              break;

            case 13:
              if (null !== n.memoizedState) return 0 !== (l = n.child.childExpirationTime) && l >= r ? eu(t, n, r) : (ca(Vi, 1 & Vi.current), null !== (n = lu(t, n, r)) ? n.sibling : null);
              ca(Vi, 1 & Vi.current);
              break;

            case 19:
              if (l = n.childExpirationTime >= r, 0 != (64 & t.effectTag)) {
                if (l) return ru(t, n, r);
                n.effectTag |= 64;
              }

              if (null !== (a = n.memoizedState) && (a.rendering = null, a.tail = null), ca(Vi, Vi.current), !l) return null;
          }

          return lu(t, n, r);
        }

        Ao = !1;
      }
    } else Ao = !1;

    switch (n.expirationTime = 0, n.tag) {
      case 2:
        if (l = n.type, null !== t && (t.alternate = null, n.alternate = null, n.effectTag |= 2), t = n.pendingProps, a = ma(n, fa.current), ai(n, r), a = uo(null, n, l, t, a, r), n.effectTag |= 1, "object" === e(a) && null !== a && "function" == typeof a.render && void 0 === a.$$typeof) {
          if (n.tag = 1, co(), ha(l)) {
            var i = !0;
            ka(n);
          } else i = !1;

          n.memoizedState = null !== a.state && void 0 !== a.state ? a.state : null;
          var o = l.getDerivedStateFromProps;
          "function" == typeof o && wi(n, l, o, t), a.updater = Ei, n.stateNode = a, a._reactInternalFiber = n, Ci(n, l, t, r), n = qo(null, n, l, !0, i, r);
        } else n.tag = 0, Wo(null, n, a, r), n = n.child;

        return n;

      case 16:
        if (a = n.elementType, null !== t && (t.alternate = null, n.alternate = null, n.effectTag |= 2), t = n.pendingProps, function (e) {
          if (-1 === e._status) {
            e._status = 0;
            var t = e._ctor;
            t = t(), e._result = t, t.then(function (t) {
              0 === e._status && (t = t.default, e._status = 1, e._result = t);
            }, function (t) {
              0 === e._status && (e._status = 2, e._result = t);
            });
          }
        }(a), 1 !== a._status) throw a._result;

        switch (a = a._result, n.type = a, i = n.tag = function (e) {
          if ("function" == typeof e) return Oc(e) ? 1 : 0;

          if (null != e) {
            if ((e = e.$$typeof) === Ve) return 11;
            if (e === $e) return 14;
          }

          return 2;
        }(a), t = Ya(a, t), i) {
          case 0:
            n = Ho(null, n, a, t, r);
            break;

          case 1:
            n = Ko(null, n, a, t, r);
            break;

          case 11:
            n = Vo(null, n, a, t, r);
            break;

          case 14:
            n = Bo(null, n, a, Ya(a.type, t), l, r);
            break;

          default:
            throw Error(le(306, a, ""));
        }

        return n;

      case 0:
        return l = n.type, a = n.pendingProps, Ho(t, n, l, a = n.elementType === l ? a : Ya(l, a), r);

      case 1:
        return l = n.type, a = n.pendingProps, Ko(t, n, l, a = n.elementType === l ? a : Ya(l, a), r);

      case 3:
        if (Xo(n), null === (l = n.updateQueue)) throw Error(le(282));
        if (a = null !== (a = n.memoizedState) ? a.element : null, yi(n, l, n.pendingProps, null, r), (l = n.memoizedState.element) === a) Lo(), n = lu(t, n, r);else {
          if ((a = n.stateNode.hydrate) && (Mo = tl(n.stateNode.containerInfo.firstChild), Oo = n, a = zo = !0), a) for (r = zi(n, null, l, r), n.child = r; r;) r.effectTag = -3 & r.effectTag | 1024, r = r.sibling;else Wo(t, n, l, r), Lo();
          n = n.child;
        }
        return n;

      case 5:
        return Ai(n), null === t && Do(n), l = n.type, a = n.pendingProps, i = null !== t ? t.memoizedProps : null, o = a.children, Zr(l, a) ? o = null : null !== i && Zr(l, i) && (n.effectTag |= 16), $o(t, n), 4 & n.mode && 1 !== r && a.hidden ? (n.expirationTime = n.childExpirationTime = 1, n = null) : (Wo(t, n, o, r), n = n.child), n;

      case 6:
        return null === t && Do(n), null;

      case 13:
        return eu(t, n, r);

      case 4:
        return Li(n, n.stateNode.containerInfo), l = n.pendingProps, null === t ? n.child = Mi(n, null, l, r) : Wo(t, n, l, r), n.child;

      case 11:
        return l = n.type, a = n.pendingProps, Vo(t, n, l, a = n.elementType === l ? a : Ya(l, a), r);

      case 7:
        return Wo(t, n, n.pendingProps, r), n.child;

      case 8:
      case 12:
        return Wo(t, n, n.pendingProps.children, r), n.child;

      case 10:
        e: {
          if (l = n.type._context, a = n.pendingProps, o = n.memoizedProps, ni(n, i = a.value), null !== o) {
            var u = o.value;

            if (0 === (i = Xl(u, i) ? 0 : 0 | ("function" == typeof l._calculateChangedBits ? l._calculateChangedBits(u, i) : 1073741823))) {
              if (o.children === a.children && !da.current) {
                n = lu(t, n, r);
                break e;
              }
            } else for (null !== (u = n.child) && (u.return = n); null !== u;) {
              var c = u.dependencies;

              if (null !== c) {
                o = u.child;

                for (var s = c.firstContext; null !== s;) {
                  if (s.context === l && 0 != (s.observedBits & i)) {
                    1 === u.tag && ((s = si(r, null)).tag = 2, di(u, s)), u.expirationTime < r && (u.expirationTime = r), null !== (s = u.alternate) && s.expirationTime < r && (s.expirationTime = r), li(u.return, r), c.expirationTime < r && (c.expirationTime = r);
                    break;
                  }

                  s = s.next;
                }
              } else o = 10 === u.tag && u.type === n.type ? null : u.child;

              if (null !== o) o.return = u;else for (o = u; null !== o;) {
                if (o === n) {
                  o = null;
                  break;
                }

                if (null !== (u = o.sibling)) {
                  u.return = o.return, o = u;
                  break;
                }

                o = o.return;
              }
              u = o;
            }
          }

          Wo(t, n, a.children, r), n = n.child;
        }

        return n;

      case 9:
        return a = n.type, l = (i = n.pendingProps).children, ai(n, r), l = l(a = ii(a, i.unstable_observedBits)), n.effectTag |= 1, Wo(t, n, l, r), n.child;

      case 14:
        return i = Ya(a = n.type, n.pendingProps), Bo(t, n, a, i = Ya(a.type, i), l, r);

      case 15:
        return Qo(t, n, n.type, n.pendingProps, l, r);

      case 17:
        return l = n.type, a = n.pendingProps, a = n.elementType === l ? a : Ya(l, a), null !== t && (t.alternate = null, n.alternate = null, n.effectTag |= 2), n.tag = 1, ha(l) ? (t = !0, ka(n)) : t = !1, ai(n, r), Ti(n, l, a), Ci(n, l, a, r), qo(null, n, l, !0, t, r);

      case 19:
        return ru(t, n, r);
    }

    throw Error(le(156, n.tag));
  };

  var Cc = null,
      _c = null;

  function Pc(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.effectTag = 0, this.lastEffect = this.firstEffect = this.nextEffect = null, this.childExpirationTime = this.expirationTime = 0, this.alternate = null;
  }

  function Nc(e, t, n, r) {
    return new Pc(e, t, n, r);
  }

  function Oc(e) {
    return !(!(e = e.prototype) || !e.isReactComponent);
  }

  function Mc(e, t) {
    var n = e.alternate;
    return null === n ? ((n = Nc(e.tag, t, e.key, e.mode)).elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.effectTag = 0, n.nextEffect = null, n.firstEffect = null, n.lastEffect = null), n.childExpirationTime = e.childExpirationTime, n.expirationTime = e.expirationTime, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = null === t ? null : {
      expirationTime: t.expirationTime,
      firstContext: t.firstContext,
      responders: t.responders
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }

  function zc(t, n, r, l, a, i) {
    var o = 2;
    if (l = t, "function" == typeof t) Oc(t) && (o = 1);else if ("string" == typeof t) o = 5;else e: switch (t) {
      case Fe:
        return Ic(r.children, a, i, n);

      case We:
        o = 8, a |= 7;
        break;

      case Ue:
        o = 8, a |= 1;
        break;

      case Le:
        return (t = Nc(12, r, n, 8 | a)).elementType = Le, t.type = Le, t.expirationTime = i, t;

      case Be:
        return (t = Nc(13, r, n, a)).type = Be, t.elementType = Be, t.expirationTime = i, t;

      case Qe:
        return (t = Nc(19, r, n, a)).elementType = Qe, t.expirationTime = i, t;

      default:
        if ("object" === e(t) && null !== t) switch (t.$$typeof) {
          case je:
            o = 10;
            break e;

          case Ae:
            o = 9;
            break e;

          case Ve:
            o = 11;
            break e;

          case $e:
            o = 14;
            break e;

          case He:
            o = 16, l = null;
            break e;
        }
        throw Error(le(130, null == t ? t : e(t), ""));
    }
    return (n = Nc(o, r, n, a)).elementType = t, n.type = l, n.expirationTime = i, n;
  }

  function Ic(e, t, n, r) {
    return (e = Nc(7, e, r, t)).expirationTime = n, e;
  }

  function Rc(e, t, n) {
    return (e = Nc(6, e, null, t)).expirationTime = n, e;
  }

  function Dc(e, t, n) {
    return (t = Nc(4, null !== e.children ? e.children : [], e.key, t)).expirationTime = n, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }

  function Fc(e, t, n) {
    this.tag = t, this.current = null, this.containerInfo = e, this.pingCache = this.pendingChildren = null, this.finishedExpirationTime = 0, this.finishedWork = null, this.timeoutHandle = -1, this.pendingContext = this.context = null, this.hydrate = n, this.callbackNode = null, this.callbackPriority = 90, this.lastExpiredTime = this.lastPingedTime = this.nextKnownPendingLevel = this.lastSuspendedTime = this.firstSuspendedTime = this.firstPendingTime = 0;
  }

  function Uc(e, t) {
    var n = e.firstSuspendedTime;
    return e = e.lastSuspendedTime, 0 !== n && n >= t && e <= t;
  }

  function Lc(e, t) {
    var n = e.firstSuspendedTime,
        r = e.lastSuspendedTime;
    n < t && (e.firstSuspendedTime = t), (r > t || 0 === n) && (e.lastSuspendedTime = t), t <= e.lastPingedTime && (e.lastPingedTime = 0), t <= e.lastExpiredTime && (e.lastExpiredTime = 0);
  }

  function jc(e, t) {
    t > e.firstPendingTime && (e.firstPendingTime = t);
    var n = e.firstSuspendedTime;
    0 !== n && (t >= n ? e.firstSuspendedTime = e.lastSuspendedTime = e.nextKnownPendingLevel = 0 : t >= e.lastSuspendedTime && (e.lastSuspendedTime = t + 1), t > e.nextKnownPendingLevel && (e.nextKnownPendingLevel = t));
  }

  function Ac(e, t) {
    var n = e.lastExpiredTime;
    (0 === n || n > t) && (e.lastExpiredTime = t);
  }

  function Wc(e, t, n, r) {
    var l = t.current,
        a = Gu(),
        i = gi.suspense;
    a = Zu(a, l, i);

    e: if (n) {
      t: {
        if (en(n = n._reactInternalFiber) !== n || 1 !== n.tag) throw Error(le(170));
        var o = n;

        do {
          switch (o.tag) {
            case 3:
              o = o.stateNode.context;
              break t;

            case 1:
              if (ha(o.type)) {
                o = o.stateNode.__reactInternalMemoizedMergedChildContext;
                break t;
              }

          }

          o = o.return;
        } while (null !== o);

        throw Error(le(171));
      }

      if (1 === n.tag) {
        var u = n.type;

        if (ha(u)) {
          n = ga(n, u, o);
          break e;
        }
      }

      n = o;
    } else n = sa;

    return null === t.context ? t.context = n : t.pendingContext = n, (t = si(a, i)).payload = {
      element: e
    }, null !== (r = void 0 === r ? null : r) && (t.callback = r), di(l, t), Ju(l, a), a;
  }

  function Vc(e) {
    if (!(e = e.current).child) return null;

    switch (e.child.tag) {
      case 5:
      default:
        return e.child.stateNode;
    }
  }

  function Bc(e, t) {
    null !== (e = e.memoizedState) && null !== e.dehydrated && e.retryTime < t && (e.retryTime = t);
  }

  function Qc(e, t) {
    Bc(e, t), (e = e.alternate) && Bc(e, t);
  }

  function $c(e, t, n) {
    var r = new Fc(e, t, n = null != n && !0 === n.hydrate),
        l = Nc(3, null, null, 2 === t ? 7 : 1 === t ? 3 : 0);
    r.current = l, l.stateNode = r, e[il] = r.current, n && 0 !== t && function (e) {
      var t = Ir(e);
      yn.forEach(function (n) {
        Rr(n, e, t);
      }), vn.forEach(function (n) {
        Rr(n, e, t);
      });
    }(9 === e.nodeType ? e : e.ownerDocument), this._internalRoot = r;
  }

  function Hc(e) {
    return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue));
  }

  function Kc(e, t, n, r, l) {
    var a = n._reactRootContainer;

    if (a) {
      var i = a._internalRoot;

      if ("function" == typeof l) {
        var o = l;

        l = function () {
          var e = Vc(i);
          o.call(e);
        };
      }

      Wc(t, i, e, l);
    } else {
      if (a = n._reactRootContainer = function (e, t) {
        if (t || (t = !(!(t = e ? 9 === e.nodeType ? e.documentElement : e.firstChild : null) || 1 !== t.nodeType || !t.hasAttribute("data-reactroot"))), !t) for (var n; n = e.lastChild;) e.removeChild(n);
        return new $c(e, 0, t ? {
          hydrate: !0
        } : void 0);
      }(n, r), i = a._internalRoot, "function" == typeof l) {
        var u = l;

        l = function () {
          var e = Vc(i);
          u.call(e);
        };
      }

      ic(function () {
        Wc(t, i, e, l);
      });
    }

    return Vc(i);
  }

  function qc(e, t, n) {
    var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return {
      $$typeof: De,
      key: null == r ? null : "" + r,
      children: e,
      containerInfo: t,
      implementation: n
    };
  }

  function Xc(e, t) {
    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!Hc(t)) throw Error(le(200));
    return qc(e, t, null, n);
  }

  $c.prototype.render = function (e, t) {
    Wc(e, this._internalRoot, null, void 0 === t ? null : t);
  }, $c.prototype.unmount = function (e) {
    var t = this._internalRoot,
        n = void 0 === e ? null : e,
        r = t.containerInfo;
    Wc(null, t, null, function () {
      r[il] = null, null !== n && n();
    });
  }, ln = function (e) {
    if (13 === e.tag) {
      var t = Xa(Gu(), 150, 100);
      Ju(e, t), Qc(e, t);
    }
  }, an = function (e) {
    if (13 === e.tag) {
      Gu();
      var t = qa++;
      Ju(e, t), Qc(e, t);
    }
  }, on = function (e) {
    if (13 === e.tag) {
      var t = Gu();
      Ju(e, t = Zu(t, e, null)), Qc(e, t);
    }
  }, Ze = function (e, t, n) {
    switch (t) {
      case "input":
        if (Pt(e, n), t = n.name, "radio" === n.type && null != t) {
          for (n = e; n.parentNode;) n = n.parentNode;

          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];

            if (r !== e && r.form === e.form) {
              var l = sl(r);
              if (!l) throw Error(le(90));
              Tt(r), Pt(r, l);
            }
          }
        }

        break;

      case "textarea":
        Dt(e, n);
        break;

      case "select":
        null != (t = n.value) && zt(e, !!n.multiple, t, !1);
    }
  }, lt = ac, at = function (e, t, n, r) {
    var l = Pu;
    Pu |= 4;

    try {
      return Ba(98, e.bind(null, t, n, r));
    } finally {
      0 === (Pu = l) && Ha();
    }
  }, it = function () {
    0 == (49 & Pu) && (function () {
      if (null !== Ku) {
        var e = Ku;
        Ku = null, e.forEach(function (e, t) {
          Ac(t, e), nc(t);
        }), Ha();
      }
    }(), kc());
  }, ot = function (e, t) {
    var n = Pu;
    Pu |= 2;

    try {
      return e(t);
    } finally {
      0 === (Pu = n) && Ha();
    }
  };
  var Yc,
      Gc,
      Zc = {
    createPortal: Xc,
    findDOMNode: function (e) {
      if (null == e) return null;
      if (1 === e.nodeType) return e;
      var t = e._reactInternalFiber;

      if (void 0 === t) {
        if ("function" == typeof e.render) throw Error(le(188));
        throw Error(le(268, Object.keys(e)));
      }

      return e = null === (e = rn(t)) ? null : e.stateNode;
    },
    hydrate: function (e, t, n) {
      if (!Hc(t)) throw Error(le(200));
      return Kc(null, e, t, !0, n);
    },
    render: function (e, t, n) {
      if (!Hc(t)) throw Error(le(200));
      return Kc(null, e, t, !1, n);
    },
    unstable_renderSubtreeIntoContainer: function (e, t, n, r) {
      if (!Hc(n)) throw Error(le(200));
      if (null == e || void 0 === e._reactInternalFiber) throw Error(le(38));
      return Kc(e, t, n, !1, r);
    },
    unmountComponentAtNode: function (e) {
      if (!Hc(e)) throw Error(le(40));
      return !!e._reactRootContainer && (ic(function () {
        Kc(null, null, e, !1, function () {
          e._reactRootContainer = null, e[il] = null;
        });
      }), !0);
    },
    unstable_createPortal: function () {
      return Xc.apply(void 0, arguments);
    },
    unstable_batchedUpdates: ac,
    flushSync: function (e, t) {
      if (0 != (48 & Pu)) throw Error(le(187));
      var n = Pu;
      Pu |= 1;

      try {
        return Ba(99, e.bind(null, t));
      } finally {
        Pu = n, Ha();
      }
    },
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
      Events: [ul, cl, sl, Ne.injectEventPluginsByName, se, In, function (e) {
        Se(e, zn);
      }, nt, rt, Nr, Pe, kc, {
        current: !1
      }]
    }
  };
  Gc = (Yc = {
    findFiberByHostInstance: ol,
    bundleType: 0,
    version: "16.12.0",
    rendererPackageName: "react-dom"
  }).findFiberByHostInstance, function (e) {
    if ("undefined" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled || !t.supportsFiber) return !0;

    try {
      var n = t.inject(e);
      Cc = function (e) {
        try {
          t.onCommitFiberRoot(n, e, void 0, 64 == (64 & e.current.effectTag));
        } catch (e) {}
      }, _c = function (e) {
        try {
          t.onCommitFiberUnmount(n, e);
        } catch (e) {}
      };
    } catch (e) {}
  }(ee({}, Yc, {
    overrideHookState: null,
    overrideProps: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Me.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return null === (e = rn(e)) ? null : e.stateNode;
    },
    findFiberByHostInstance: function (e) {
      return Gc ? Gc(e) : null;
    },
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null
  }));
  var Jc = {
    default: Zc
  },
      es = Jc && Zc || Jc,
      ts = es.default || es,
      ns = X(function (e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = 0;
    t.__interactionsRef = null, t.__subscriberRef = null, t.unstable_clear = function (e) {
      return e();
    }, t.unstable_getCurrent = function () {
      return null;
    }, t.unstable_getThreadID = function () {
      return ++n;
    }, t.unstable_trace = function (e, t, n) {
      return n();
    }, t.unstable_wrap = function (e) {
      return e;
    }, t.unstable_subscribe = function () {}, t.unstable_unsubscribe = function () {};
  });
  q(ns);
  ns.__interactionsRef, ns.__subscriberRef, ns.unstable_clear, ns.unstable_getCurrent, ns.unstable_getThreadID, ns.unstable_trace, ns.unstable_wrap, ns.unstable_subscribe, ns.unstable_unsubscribe;
  var rs = X(function (e, t) {});
  q(rs);
  rs.__interactionsRef, rs.__subscriberRef, rs.unstable_clear, rs.unstable_getCurrent, rs.unstable_getThreadID, rs.unstable_trace, rs.unstable_wrap, rs.unstable_subscribe, rs.unstable_unsubscribe, X(function (e) {
    e.exports = ns;
  }), X(function (e) {});

  var ls = X(function (e) {
    !function e() {
      if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (e) {
        console.error(e);
      }
    }(), e.exports = ts;
  }),
      as = function (e) {
    return function (e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];

        return n;
      }
    }(e) || function (e) {
      if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }();
  },
      is = function (e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) {
        var n,
            r,
            l = [],
            a = !0,
            i = !1,
            o = e[Symbol.iterator]();

        try {
          for (; !(a = (r = o.next()).done) && (l.push(r.value), !t || l.length !== t); a = !0);
        } catch (e) {
          i = !0, n = e;
        } finally {
          try {
            a || null === o.return || o.return();
          } finally {
            if (i) throw n;
          }
        }

        return l;
      }
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }();
  },
      os = function (e, t) {
    return !(e.right <= t.left) && !(e.left >= t.right) && !(e.bottom <= t.top) && !(e.top >= t.bottom);
  },
      us = K.forwardRef(function (e, t) {
    var n = e.diceArray,
        r = e.keepDiceAllowed,
        l = e.keepDice;
    return K.createElement("div", {
      className: "diceOnGoing",
      ref: t
    }, K.createElement("span", {
      className: "title"
    }, "Dice on going"), K.createElement("div", {
      className: "area"
    }, n.map(function (e) {
      return K.createElement("button", {
        key: e.id,
        disabled: !r,
        onClick: function () {
          return l(e);
        },
        className: "dice",
        style: {
          width: 40,
          height: 40,
          left: "".concat(e.x, "px"),
          top: "".concat(e.y, "px"),
          transform: "rotate(".concat(e.rotation, "deg)"),
          position: "absolute"
        }
      }, e.symbol);
    })));
  }),
      cs = function (e) {
    var t = e.rollDicePermission,
        n = e.onClick;
    return t.allowed ? K.createElement("button", {
      onClick: n
    }, "Roll!") : "3 skulls or more" === t.reaon ? null : K.createElement(K.Fragment, null, K.createElement("button", {
      disabled: !0
    }, "Roll!"), K.createElement("span", null, "(".concat(t.reason, ")")));
  },
      ss = function (e) {
    var t = e.diceArray,
        n = e.unkeepDiceAllowed,
        r = e.unkeepDice;
    return K.createElement("div", {
      className: "diceKept"
    }, K.createElement("span", {
      className: "title"
    }, "Dice kept"), K.createElement("div", {
      className: "area"
    }, t.map(function (e) {
      return K.createElement("button", {
        key: e.id,
        disabled: !n,
        onClick: function () {
          return r(e);
        },
        className: "dice",
        style: {
          width: 40,
          height: 40
        }
      }, e.symbol);
    })));
  },
      fs = function (e) {
    var t = e.onClick;
    return K.createElement("button", {
      onClick: t,
      style: {
        marginLeft: "20px"
      }
    }, "Mark this score");
  },
      ds = function (e) {
    var t = e.rollIndex,
        n = e.isOnSkullIsland,
        r = e.roundScore,
        l = e.markScorePermission,
        a = e.markScore;
    return -1 === t ? null : K.createElement("div", null, K.createElement("span", {
      className: "subtitle"
    }, " Round score: "), K.createElement(ps, {
      isOnSkullIsland: n,
      markScorePermission: l,
      roundScore: r,
      markScore: a
    }));
  },
      ps = function (e) {
    var t = e.markScorePermission,
        n = e.isOnSkullIsland,
        r = e.roundScore,
        l = e.markScore;
    return n ? K.createElement("span", null, "XXX -Skull Island- XXX") : K.createElement(K.Fragment, null, K.createElement("span", null, r), t.allowed ? K.createElement(fs, {
      onClick: l
    }) : null, K.createElement("div", null, "has-three-skulls-or-more" === t.reason ? "Round over !" : t.reason));
  },
      ms = function (e) {
    var t = e.totalScore;
    return K.createElement("div", null, K.createElement("span", {
      className: "subtitle"
    }, " Total score: "), K.createElement("span", {
      className: "totalScore"
    }, t));
  },
      hs = function (e) {
    var t = e.cardDeck,
        n = e.cardDrawn,
        r = e.drawCard,
        l = e.card;
    return K.createElement("div", null, !n && K.createElement("button", {
      onClick: function () {
        return r();
      },
      style: {
        marginTop: "20px"
      }
    }, t.length > 0 ? "Draw a card" : "Shuffle the deck"), K.createElement("div", {
      style: {
        marginTop: "10px"
      }
    }, "Remaining cards: ", t.length), K.createElement("span", {
      className: "card"
    }, l.label));
  },
      ys = function (e) {
    var t = e.diceCursed,
        n = e.canRemoveSkull,
        r = e.removeSkull;
    return K.createElement("div", {
      className: "skullIsland"
    }, K.createElement("span", {
      className: "title"
    }, "Skull Island"), K.createElement("div", {
      className: "area"
    }, t.map(function (e) {
      return K.createElement("button", {
        key: e.id,
        disabled: !n,
        onClick: function () {
          return r(e);
        },
        className: "dice",
        style: {
          width: 40,
          height: 40
        }
      }, e.symbol);
    })));
  },
      vs = function (e) {
    var t = e.nextRoundPermission,
        n = e.nextRound;
    return t.allowed ? K.createElement("button", {
      onClick: function () {
        return n();
      }
    }, "Start next round") : null;
  },
      bs = function () {
    return Es(gs());
  },
      gs = function () {
    var e = [];
    return ks.forEach(function (t) {
      e = ws(e, t);
    }), e;
  },
      ks = [{
    type: "pirate",
    cardQuantiy: 4,
    label: "Pirate"
  }, {
    type: "witch",
    cardQuantiy: 4,
    label: "Witch"
  }, {
    type: "chest",
    cardQuantiy: 4,
    label: "Treasure chest"
  }, {
    type: "animals",
    cardQuantiy: 4,
    label: "Parrot = monkey"
  }, {
    type: "diamond",
    cardQuantiy: 4,
    label: "Diamond"
  }, {
    type: "coin",
    cardQuantiy: 3,
    label: "Coin"
  }, {
    type: "skull",
    skullAmount: 1,
    cardQuantiy: 3,
    label: "1 skull"
  }, {
    type: "skull",
    skullAmount: 2,
    cardQuantiy: 2,
    label: "2 skulls"
  }, {
    type: "sword-challenge",
    goal: 2,
    gamble: 300,
    cardQuantiy: 2,
    label: "2 sword challenge"
  }, {
    type: "sword-challenge",
    goal: 3,
    gamble: 500,
    cardQuantiy: 3,
    label: "3 sword challenge"
  }, {
    type: "sword-challenge",
    goal: 4,
    gamble: 1e3,
    cardQuantiy: 2,
    label: "4 sword challenge"
  }],
      ws = function (e, t) {
    for (var n = 0; n < t.cardQuantiy; n++) e.push(t);

    return e;
  },
      Es = function (e) {
    for (var t = 0; t < 100; t++) xs(e);

    return e;
  },
      xs = function (e) {
    var t = Ts(e.length),
        n = Ts(e.length),
        r = e[t];
    return e[t] = e[n], e[n] = r, e;
  },
      Ts = function (e) {
    return Math.floor(Math.random() * e);
  },
      Ss = function (e) {
    var t = e.dice,
        n = e.index,
        r = e.dices,
        l = e.xMin,
        a = e.xMax,
        i = e.yMin,
        o = e.yMax,
        u = Cs(r.slice(0, n), {
      xMin: l,
      xMax: a,
      yMin: i,
      yMax: o
    }),
        c = u.x,
        s = u.y;
    t.x = c, t.y = s, t.rotation = _s(), t.symbol = Ns();
  },
      Cs = function (e, t) {
    var n = t.xMin,
        r = t.xMax,
        l = t.yMin,
        a = t.yMax,
        i = 0;
    return function t() {
      var o,
          u = {
        x: Ms(n, r),
        y: Ms(l, a)
      };
      return o = u, e.some(function (e) {
        return os({
          top: o.y - 5,
          left: o.x - 5,
          bottom: o.y + 40 + 5,
          right: o.x + 40 + 5
        }, {
          top: e.y - 5,
          left: e.x - 5,
          bottom: e.y + 40 + 5,
          right: e.x + 40 + 5
        });
      }) ? ++i > 50 ? u : t() : u;
    }();
  },
      _s = function () {
    return Ms(-35, 35);
  },
      Ps = {
    1: "coin",
    2: "diamond",
    3: "sword",
    4: "parrot",
    5: "monkey",
    6: "skull"
  },
      Ns = function () {
    return Ps[Os()];
  },
      Os = function () {
    return Ms(1, 6);
  },
      Ms = function (e, t) {
    return Math.floor(Math.random() * (t - e + 1) + e);
  },
      zs = function (e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  };

  function Is(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null === arguments[t] ? {} : arguments[t];
      t % 2 ? Rs(Object(n), !0).forEach(function (t) {
        zs(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Rs(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }

    return e;
  }

  function Rs(e, t) {
    var n = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r);
    }

    return n;
  }

  var Ds,
      Fs,
      Us,
      Ls = {
    x: 0,
    y: 0
  },
      js = [Is({}, Ls, {
    id: 1,
    symbol: "coin"
  }), Is({}, Ls, {
    id: 2,
    symbol: "diamond"
  }), Is({}, Ls, {
    id: 3,
    symbol: "sword"
  }), Is({}, Ls, {
    id: 4,
    symbol: "parrot"
  }), Is({}, Ls, {
    id: 5,
    symbol: "monkey"
  }), Is({}, Ls, {
    id: 6,
    symbol: "skull"
  }), Is({}, Ls, {
    id: 7,
    symbol: "skull"
  }), Is({}, Ls, {
    id: 8,
    symbol: "skull"
  })],
      As = function (e) {
    var t = e.card,
        n = e.diceCursed.length;
    return "skull" === t.type && (n += t.skullAmount), n;
  },
      Ws = function (e) {
    var t = e.card;
    return 0 === e.rollIndex && "sword-challenge" !== t.type;
  },
      Vs = function (e) {
    var t = e.card,
        n = e.diceCursed;
    return As({
      card: t,
      diceCursed: n
    }) >= 4;
  },
      Bs = function (e) {
    return e.map(function (e) {
      return Qs(e);
    });
  },
      Qs = function (e) {
    return e.symbol;
  },
      $s = function (e, t) {
    return e.filter(function (e) {
      return e === t;
    }).length;
  },
      Hs = function (e, t) {
    var n = t.perfectEnabled,
        r = 0,
        l = 0,
        a = Ks(e);
    return Object.values(a).forEach(function (e) {
      3 === e && (r += 100), 4 === e && (r += 200), 5 === e && (r += 500), 6 === e && (r += 1e3), 7 === e && (r += 2e3), 8 === e && (r += 4e3), e > 2 && (l += e);
    }), e.forEach(function (e) {
      "diamond" === e && (r += 100, a.diamond < 3 && (l += 1)), "coin" === e && (r += 100, a.coin < 3 && (l += 1));
    }), n && l >= e.length && (r += 500), r;
  },
      Ks = function (e) {
    var t = {};
    return e.forEach(function (e) {
      t.hasOwnProperty(e) ? t[e]++ : t[e] = 1;
    }), t;
  },
      qs = function (e) {
    var t = e.diceArray,
        n = K.useState(t),
        r = is(n, 2),
        l = r[0],
        a = r[1],
        i = K.useState([]),
        o = is(i, 2),
        u = o[0],
        c = o[1],
        s = K.useState([]),
        f = is(s, 2),
        d = f[0],
        p = f[1],
        m = K.useState([]),
        h = is(m, 2),
        y = h[0],
        v = h[1],
        b = K.useState(0),
        g = is(b, 2),
        k = g[0],
        w = g[1],
        E = K.useState(bs()),
        x = is(E, 2),
        T = x[0],
        S = x[1],
        C = K.useState({}),
        _ = is(C, 2),
        P = _[0],
        N = _[1],
        O = K.useState(-1),
        M = is(O, 2),
        z = M[0],
        I = M[1],
        R = K.useState(!1),
        D = is(R, 2),
        F = D[0],
        U = D[1],
        L = K.useState(!1),
        j = is(L, 2),
        A = j[0],
        W = j[1],
        V = K.useState(!1),
        B = is(V, 2),
        Q = B[0],
        $ = B[1],
        H = K.useState(!1),
        q = is(H, 2),
        X = q[0],
        Y = q[1],
        G = K.useState({}),
        Z = is(G, 2),
        J = Z[0],
        ee = Z[1],
        te = K.useState(!1),
        ne = is(te, 2),
        re = ne[0],
        le = ne[1],
        ae = K.useState(!1),
        ie = is(ae, 2),
        oe = ie[0],
        ue = ie[1],
        ce = K.useState({}),
        se = is(ce, 2),
        fe = se[0],
        de = se[1],
        pe = K.useState({}),
        me = is(pe, 2),
        he = me[0],
        ye = me[1],
        ve = K.useState(!1),
        be = is(ve, 2),
        ge = be[0],
        ke = be[1];

    K.useEffect(function () {
      As({
        card: P,
        diceCursed: y
      }) > 2 || A ? (le(!1), ue(!1)) : (le(!0), ue(!0));
    }, [P, y, A]), K.useEffect(function () {
      $(function (e) {
        var t = e.isOnSkullIsland,
            n = e.card,
            r = e.rollIndex,
            l = e.diceCursed;
        return !!t || !(!Ws({
          card: n,
          rollIndex: r
        }) || !Vs({
          card: n,
          diceCursed: l
        }));
      }({
        isOnSkullIsland: Q,
        card: P,
        rollIndex: z,
        diceCursed: y
      }));
    }, [P, z, y]), K.useEffect(function () {
      ee(function (e) {
        var t = e.cardDrawn,
            n = e.scoreMarked,
            r = e.card,
            l = e.diceCursed,
            a = e.rollIndex,
            i = e.diceOnGoing;
        return t ? n ? {
          allowed: !1,
          reason: "round-not-started"
        } : As({
          card: r,
          diceCursed: l
        }) > 2 ? {
          allowed: !1,
          reason: "has-three-skulls-or-more"
        } : a > 0 && i.length < 2 ? {
          allowed: !1,
          reason: "not-enough-dice-to-roll"
        } : {
          allowed: !0,
          reason: ""
        } : {
          allowed: !1,
          reason: "card-not-drawn"
        };
      }({
        cardDrawn: F,
        scoreMarked: A,
        card: P,
        diceCursed: y
      }));
    }, [F, A, P, y]), K.useEffect(function () {
      de(function (e) {
        var t = e.rollIndex,
            n = e.card,
            r = e.diceCursed;
        return e.scoreMarked ? {
          allowed: !1
        } : As({
          card: n,
          diceCursed: r
        }) > 2 ? "chest" === n.type && t > 0 ? {
          allowed: !0
        } : {
          allowed: !1,
          reason: "has-three-skulls-or-more"
        } : {
          allowed: !0
        };
      }({
        rollIndex: z,
        card: P,
        diceCursed: y,
        scoreMarked: A
      }));
    }, [P, z, y, A]), K.useEffect(function () {
      Y(function (e) {
        var t = e.card,
            n = e.diceKept;
        if (!e.markScoreAllowed) return "sword-challenge" === t.type ? -t.gamble : 0;
        var r = 8 === n.length,
            l = Bs(n);
        return "sword-challenge" === t.type ? $s(l, "sword") >= t.goal ? Hs(l, {
          perfectEnabled: r
        }) + t.gamble : -t.gamble : "diamond" === t.type || "coin" === t.type ? Hs([].concat(as(l), [t.type]), {
          perfectEnabled: r
        }) : "animals" === t.type ? Hs(l.map(function (e) {
          return "parrot" === e ? "monkey" : e;
        }), {
          perfectEnabled: r
        }) : "pirate" === t.type ? 2 * Hs(l, {
          perfectEnabled: r
        }) : Hs(l, {
          perfectEnabled: r
        });
      }({
        card: P,
        diceKept: d,
        markScoreAllowed: fe.allowed
      }));
    }, [P, d, fe]), K.useEffect(function () {
      -1 === z ? ye({
        allowed: !1
      }) : J.allowed || fe.allowed || ye({
        allowed: !0
      });
    }, [z, J, fe]), K.useEffect(function () {
      "witch" === P.type ? y.length > 2 ? ke(!1) : P.effectUsed ? ke(!1) : ke(!0) : ke(!1);
    }, [P, y]);
    var we = Xs(fe);
    K.useEffect(function () {
      "sword-challenge" !== P.type || A || !we.allowed || fe.allowed || Se();
    }, [P, A, we, fe]);

    var Ee = K.createRef(),
        xe = function (e) {
      var t = function (e) {
        var t = [],
            n = [];
        return e.forEach(function (e) {
          "skull" === e.symbol ? n.push(e) : t.push(e);
        }), {
          withoutSkulls: t,
          skulls: n
        };
      }(e),
          n = t.withoutSkulls,
          r = t.skulls;

      c(n), v([].concat(as(y), as(r)));
    },
        Te = function (e) {
      if ("skull" === e.symbol) {
        "witch" === P.type && (P.effectUsed = !0);
        var t = y.filter(function (t) {
          return t !== e;
        });
        v(t);
      } else {
        var n = d.filter(function (t) {
          return t !== e;
        });
        p(n);
      }

      var r = [].concat(as(u), [e]);
      c(r);
    },
        Se = function () {
      w(Math.max(k + X, 0)), W(!0);
    };

    return K.createElement(K.Fragment, null, K.createElement(hs, {
      cardDeck: T,
      cardDrawn: F,
      drawCard: function () {
        T.length > 0 ? (N(T.pop()), S(T), U(!0)) : S(bs());
      },
      card: P
    }), K.createElement("div", null, K.createElement(cs, {
      rollDicePermission: J,
      onClick: function () {
        var e;
        -1 === z ? (e = l, c(as(l)), a([]), I(0)) : (e = u, I(z + 1)), function (e, t) {
          var n = t.diceParentElement.getBoundingClientRect(),
              r = n.width - 40,
              l = n.height - 40;
          e.forEach(function (t, n) {
            Ss({
              dice: t,
              index: n,
              dices: e,
              xMin: 0,
              xMax: r,
              yMin: 0,
              yMax: l
            });
          });
        }(e, {
          diceParentElement: Ee.current.querySelector(".area")
        }), xe(e);
      }
    }), K.createElement(vs, {
      nextRoundPermission: he,
      nextRound: function () {
        a(t), c([]), p([]), v([]), I(-1), W(!1), U(!1), $(!1), Y(0);
      }
    })), K.createElement(us, {
      ref: Ee,
      diceArray: u,
      keepDiceAllowed: re,
      keepDice: function (e) {
        if ("skull" === e.symbol) {
          "witch" === P.type && (P.effectUsed = !1);
          var t = [].concat(as(y), [e]);
          v(t);
        } else {
          var n = [].concat(as(d), [e]);
          p(n);
        }

        var r = u.filter(function (t) {
          return t !== e;
        });
        c(r);
      }
    }), K.createElement(ss, {
      diceArray: d,
      unkeepDiceAllowed: oe,
      unkeepDice: Te
    }), K.createElement(ys, {
      diceCursed: y,
      canRemoveSkull: ge,
      removeSkull: function (e) {
        return Te(e);
      }
    }), K.createElement(ds, {
      rollIndex: z,
      isOnSkullIsland: Q,
      roundScore: X,
      markScorePermission: fe,
      markScore: Se
    }), K.createElement(ms, {
      totalScore: k
    }));
  },
      Xs = function (e) {
    var t = K.useRef();
    return K.useEffect(function () {
      t.current = e;
    }), t.current;
  };

  Ds = {
    into: document.querySelector("#mille-sabord-container")
  }, Fs = Ds.into, Us = js.map(function (e) {
    return Is({}, e);
  }), ls.render(K.createElement(qs, {
    diceArray: Us
  }), Fs);
}();
//# sourceMappingURL=./main.js.map