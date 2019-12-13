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
      v = o ? Symbol.for("react.suspense_list") : 60120,
      b = o ? Symbol.for("react.memo") : 60115,
      g = o ? Symbol.for("react.lazy") : 60116,
      w = "function" == typeof Symbol && Symbol.iterator;

  function k(e) {
    for (var t = e.message, n = "https://reactjs.org/docs/error-decoder.html?invariant=" + t, r = 1; r < arguments.length; r++) n += "&args[]=" + encodeURIComponent(arguments[r]);

    return e.message = "Minified React error #" + t + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", e;
  }

  var E = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {}
  },
      x = {};

  function _(e, t, n) {
    this.props = e, this.context = t, this.refs = x, this.updater = n || E;
  }

  function T() {}

  function C(e, t, n) {
    this.props = e, this.context = t, this.refs = x, this.updater = n || E;
  }

  _.prototype.isReactComponent = {}, _.prototype.setState = function (t, n) {
    if ("object" !== e(t) && "function" != typeof t && null != t) throw k(Error(85));
    this.updater.enqueueSetState(this, t, n, "setState");
  }, _.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  }, T.prototype = _.prototype;
  var S = C.prototype = new T();
  S.constructor = C, i(S, _.prototype), S.isPureReactComponent = !0;
  var P = {
    current: null
  },
      N = {
    suspense: null
  },
      O = {
    current: null
  },
      R = Object.prototype.hasOwnProperty,
      z = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };

  function M(e, t, n) {
    var r = void 0,
        l = {},
        a = null,
        i = null;
    if (null != t) for (r in void 0 !== t.ref && (i = t.ref), void 0 !== t.key && (a = "" + t.key), t) R.call(t, r) && !z.hasOwnProperty(r) && (l[r] = t[r]);
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
      _owner: O.current
    };
  }

  function I(t) {
    return "object" === e(t) && null !== t && t.$$typeof === u;
  }

  var D = /\/+/g,
      U = [];

  function F(e, t, n, r) {
    if (U.length) {
      var l = U.pop();
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

  function A(e) {
    e.result = null, e.keyPrefix = null, e.func = null, e.context = null, e.count = 0, 10 > U.length && U.push(e);
  }

  function L(t, n, r) {
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
      if (o) return l(a, n, "" === r ? "." + j(n, 0) : r), 1;
      if (o = 0, r = "" === r ? "." : r + ":", Array.isArray(n)) for (var s = 0; s < n.length; s++) {
        var f = r + j(i = n[s], s);
        o += t(i, f, l, a);
      } else if (null === n || "object" !== e(n) ? f = null : f = "function" == typeof (f = w && n[w] || n["@@iterator"]) ? f : null, "function" == typeof f) for (n = f.call(n), s = 0; !(i = n.next()).done;) o += t(i = i.value, f = r + j(i, s++), l, a);else if ("object" === i) throw l = "" + n, k(Error(31), "[object Object]" === l ? "object with keys {" + Object.keys(n).join(", ") + "}" : l, "");
      return o;
    }(t, "", n, r);
  }

  function j(t, n) {
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

  function W(e, t) {
    e.func.call(e.context, t, e.count++);
  }

  function B(e, t, n) {
    var r = e.result,
        l = e.keyPrefix;
    e = e.func.call(e.context, t, e.count++), Array.isArray(e) ? V(e, r, n, function (e) {
      return e;
    }) : null != e && (I(e) && (e = function (e, t) {
      return {
        $$typeof: u,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
      };
    }(e, l + (!e.key || t && t.key === e.key ? "" : ("" + e.key).replace(D, "$&/") + "/") + n)), r.push(e));
  }

  function V(e, t, n, r, l) {
    var a = "";
    null != n && (a = ("" + n).replace(D, "$&/") + "/"), L(e, B, t = F(t, a, r, l)), A(t);
  }

  function Q() {
    var e = P.current;
    if (null === e) throw k(Error(321));
    return e;
  }

  var H = {
    Children: {
      map: function (e, t, n) {
        if (null == e) return e;
        var r = [];
        return V(e, r, null, t, n), r;
      },
      forEach: function (e, t, n) {
        if (null == e) return e;
        L(e, W, t = F(null, null, t, n)), A(t);
      },
      count: function (e) {
        return L(e, function () {
          return null;
        }, null);
      },
      toArray: function (e) {
        var t = [];
        return V(e, t, null, function (e) {
          return e;
        }), t;
      },
      only: function (e) {
        if (!I(e)) throw k(Error(143));
        return e;
      }
    },
    createRef: function () {
      return {
        current: null
      };
    },
    Component: _,
    PureComponent: C,
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
        $$typeof: g,
        _ctor: e,
        _status: -1,
        _result: null
      };
    },
    memo: function (e, t) {
      return {
        $$typeof: b,
        type: e,
        compare: void 0 === t ? null : t
      };
    },
    useCallback: function (e, t) {
      return Q().useCallback(e, t);
    },
    useContext: function (e, t) {
      return Q().useContext(e, t);
    },
    useEffect: function (e, t) {
      return Q().useEffect(e, t);
    },
    useImperativeHandle: function (e, t, n) {
      return Q().useImperativeHandle(e, t, n);
    },
    useDebugValue: function () {},
    useLayoutEffect: function (e, t) {
      return Q().useLayoutEffect(e, t);
    },
    useMemo: function (e, t) {
      return Q().useMemo(e, t);
    },
    useReducer: function (e, t, n) {
      return Q().useReducer(e, t, n);
    },
    useRef: function (e) {
      return Q().useRef(e);
    },
    useState: function (e) {
      return Q().useState(e);
    },
    Fragment: s,
    Profiler: d,
    StrictMode: f,
    Suspense: y,
    unstable_SuspenseList: v,
    createElement: M,
    cloneElement: function (e, t, n) {
      if (null == e) throw k(Error(267), e);
      var r = void 0,
          l = i({}, e.props),
          a = e.key,
          o = e.ref,
          c = e._owner;

      if (null != t) {
        void 0 !== t.ref && (o = t.ref, c = O.current), void 0 !== t.key && (a = "" + t.key);
        var s = void 0;

        for (r in e.type && e.type.defaultProps && (s = e.type.defaultProps), t) R.call(t, r) && !z.hasOwnProperty(r) && (l[r] = void 0 === t[r] && void 0 !== s ? s[r] : t[r]);
      }

      if (1 === (r = arguments.length - 2)) l.children = n;else if (1 < r) {
        s = Array(r);

        for (var f = 0; f < r; f++) s[f] = arguments[f + 2];

        l.children = s;
      }
      return {
        $$typeof: u,
        type: e.type,
        key: a,
        ref: o,
        props: l,
        _owner: c
      };
    },
    createFactory: function (e) {
      var t = M.bind(null, e);
      return t.type = e, t;
    },
    isValidElement: I,
    version: "16.9.0",
    unstable_withSuspenseConfig: function (e, t) {
      var n = N.suspense;
      N.suspense = void 0 === t ? null : t;

      try {
        e();
      } finally {
        N.suspense = n;
      }
    },
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
      ReactCurrentDispatcher: P,
      ReactCurrentBatchConfig: N,
      ReactCurrentOwner: O,
      IsSomeRendererActing: {
        current: !1
      },
      assign: i
    }
  },
      $ = {
    default: H
  },
      q = $ && H || $,
      K = q.default || q,
      X = (t(function (e) {}), t(function (e) {
    e.exports = K;
  }));

  function Y(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }

  function G(e, t) {
    return e(t = {
      exports: {}
    }, t.exports), t.exports;
    /*
      object-assign
      (c) Sindre Sorhus
      @license MIT
      */
  }

  var Z = Object.getOwnPropertySymbols,
      J = Object.prototype.hasOwnProperty,
      ee = Object.prototype.propertyIsEnumerable;

  function te(e) {
    if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(e);
  }

  var ne = function () {
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
    for (var n, r, l = te(e), a = 1; a < arguments.length; a++) {
      for (var i in n = Object(arguments[a])) J.call(n, i) && (l[i] = n[i]);

      if (Z) {
        r = Z(n);

        for (var o = 0; o < r.length; o++) ee.call(n, r[o]) && (l[r[o]] = n[r[o]]);
      }
    }

    return l;
  },
      re = G(function (t, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var r = void 0,
        l = void 0,
        a = void 0,
        i = void 0,
        o = void 0;

    if (n.unstable_now = void 0, n.unstable_forceFrameRate = void 0, "undefined" == typeof window || "function" != typeof MessageChannel) {
      var u = null,
          c = null,
          s = function e() {
        if (null !== u) try {
          var t = n.unstable_now();
          u(!0, t), u = null;
        } catch (t) {
          throw setTimeout(e, 0), t;
        }
      };

      n.unstable_now = function () {
        return Date.now();
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
      var f = window.performance,
          d = window.Date,
          p = window.setTimeout,
          m = window.clearTimeout,
          h = window.requestAnimationFrame,
          y = window.cancelAnimationFrame;
      "undefined" != typeof console && ("function" != typeof h && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"), "function" != typeof y && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills")), n.unstable_now = "object" === e(f) && "function" == typeof f.now ? function () {
        return f.now();
      } : function () {
        return d.now();
      };
      var v = !1,
          b = null,
          g = -1,
          w = -1,
          k = 33.33,
          E = -1,
          x = -1,
          _ = 0,
          T = !1;
      i = function () {
        return n.unstable_now() >= _;
      }, o = function () {}, n.unstable_forceFrameRate = function (e) {
        0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported") : 0 < e ? (k = Math.floor(1e3 / e), T = !0) : (k = 33.33, T = !1);
      };

      var C = function () {
        if (null !== b) {
          var e = n.unstable_now(),
              t = 0 < _ - e;

          try {
            b(t, e) || (b = null);
          } catch (e) {
            throw P.postMessage(null), e;
          }
        }
      },
          S = new MessageChannel(),
          P = S.port2;

      S.port1.onmessage = C;
      r = function (e) {
        b = e, v || (v = !0, h(function (e) {
          !function e(t) {
            if (null === b) x = E = -1, v = !1;else {
              v = !0, h(function (t) {
                m(g), e(t);
              });

              if (g = p(function e() {
                _ = n.unstable_now() + k / 2, C(), g = p(e, 3 * k);
              }, 3 * k), -1 !== E && .1 < t - E) {
                var r = t - E;
                !T && -1 !== x && r < k && x < k && 8.33 > (k = r < x ? x : r) && (k = 8.33), x = r;
              }

              E = t, _ = t + k, P.postMessage(null);
            }
          }(e);
        }));
      }, l = function (e, t) {
        w = p(function () {
          e(n.unstable_now());
        }, t);
      }, a = function () {
        m(w), w = -1;
      };
    }

    var N = null,
        O = null,
        R = null,
        z = 3,
        M = !1,
        I = !1,
        D = !1;

    function U(e, t) {
      var n = e.next;
      if (n === e) N = null;else {
        e === N && (N = n);
        var r = e.previous;
        r.next = n, n.previous = r;
      }
      e.next = e.previous = null, n = e.callback, r = z;
      var l = R;
      z = e.priorityLevel, R = e;

      try {
        var a = e.expirationTime <= t;

        switch (z) {
          case 1:
            var i = n(a);
            break;

          case 2:
          case 3:
          case 4:
            i = n(a);
            break;

          case 5:
            i = n(a);
        }
      } catch (e) {
        throw e;
      } finally {
        z = r, R = l;
      }

      if ("function" == typeof i) if (t = e.expirationTime, e.callback = i, null === N) N = e.next = e.previous = e;else {
        i = null, a = N;

        do {
          if (t <= a.expirationTime) {
            i = a;
            break;
          }

          a = a.next;
        } while (a !== N);

        null === i ? i = N : i === N && (N = e), (t = i.previous).next = i.previous = e, e.next = i, e.previous = t;
      }
    }

    function F(e) {
      if (null !== O && O.startTime <= e) do {
        var t = O,
            n = t.next;
        if (t === n) O = null;else {
          O = n;
          var r = t.previous;
          r.next = n, n.previous = r;
        }
        t.next = t.previous = null, W(t, t.expirationTime);
      } while (null !== O && O.startTime <= e);
    }

    function A(e) {
      D = !1, F(e), I || (null !== N ? (I = !0, r(L)) : null !== O && l(A, O.startTime - e));
    }

    function L(e, t) {
      I = !1, D && (D = !1, a()), F(t), M = !0;

      try {
        if (e) {
          if (null !== N) do {
            U(N, t), F(t = n.unstable_now());
          } while (null !== N && !i());
        } else for (; null !== N && N.expirationTime <= t;) U(N, t), F(t = n.unstable_now());

        return null !== N || (null !== O && l(A, O.startTime - t), !1);
      } finally {
        M = !1;
      }
    }

    function j(e) {
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

    function W(e, t) {
      if (null === N) N = e.next = e.previous = e;else {
        var n = null,
            r = N;

        do {
          if (t < r.expirationTime) {
            n = r;
            break;
          }

          r = r.next;
        } while (r !== N);

        null === n ? n = N : n === N && (N = e), (t = n.previous).next = n.previous = e, e.next = n, e.previous = t;
      }
    }

    var B = o;
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

      var n = z;
      z = e;

      try {
        return t();
      } finally {
        z = n;
      }
    }, n.unstable_next = function (e) {
      switch (z) {
        case 1:
        case 2:
        case 3:
          var t = 3;
          break;

        default:
          t = z;
      }

      var n = z;
      z = t;

      try {
        return e();
      } finally {
        z = n;
      }
    }, n.unstable_scheduleCallback = function (t, i, o) {
      var u = n.unstable_now();

      if ("object" === e(o) && null !== o) {
        var c = o.delay;
        c = "number" == typeof c && 0 < c ? u + c : u, o = "number" == typeof o.timeout ? o.timeout : j(t);
      } else o = j(t), c = u;

      if (t = {
        callback: i,
        priorityLevel: t,
        startTime: c,
        expirationTime: o = c + o,
        next: null,
        previous: null
      }, c > u) {
        if (o = c, null === O) O = t.next = t.previous = t;else {
          i = null;
          var s = O;

          do {
            if (o < s.startTime) {
              i = s;
              break;
            }

            s = s.next;
          } while (s !== O);

          null === i ? i = O : i === O && (O = t), (o = i.previous).next = i.previous = t, t.next = i, t.previous = o;
        }
        null === N && O === t && (D ? a() : D = !0, l(A, c - u));
      } else W(t, o), I || M || (I = !0, r(L));

      return t;
    }, n.unstable_cancelCallback = function (e) {
      var t = e.next;

      if (null !== t) {
        if (e === t) e === N ? N = null : e === O && (O = null);else {
          e === N ? N = t : e === O && (O = t);
          var n = e.previous;
          n.next = t, t.previous = n;
        }
        e.next = e.previous = null;
      }
    }, n.unstable_wrapCallback = function (e) {
      var t = z;
      return function () {
        var n = z;
        z = t;

        try {
          return e.apply(this, arguments);
        } finally {
          z = n;
        }
      };
    }, n.unstable_getCurrentPriorityLevel = function () {
      return z;
    }, n.unstable_shouldYield = function () {
      var e = n.unstable_now();
      return F(e), null !== R && null !== N && N.startTime <= e && N.expirationTime < R.expirationTime || i();
    }, n.unstable_requestPaint = B, n.unstable_continueExecution = function () {
      I || M || (I = !0, r(L));
    }, n.unstable_pauseExecution = function () {}, n.unstable_getFirstCallbackNode = function () {
      return N;
    };
  });
  Y(re);
  re.unstable_now, re.unstable_forceFrameRate, re.unstable_ImmediatePriority, re.unstable_UserBlockingPriority, re.unstable_NormalPriority, re.unstable_IdlePriority, re.unstable_LowPriority, re.unstable_runWithPriority, re.unstable_next, re.unstable_scheduleCallback, re.unstable_cancelCallback, re.unstable_wrapCallback, re.unstable_getCurrentPriorityLevel, re.unstable_shouldYield, re.unstable_requestPaint, re.unstable_continueExecution, re.unstable_pauseExecution, re.unstable_getFirstCallbackNode;
  var le = G(function (e, t) {});
  Y(le);
  le.unstable_now, le.unstable_forceFrameRate, le.unstable_ImmediatePriority, le.unstable_UserBlockingPriority, le.unstable_NormalPriority, le.unstable_IdlePriority, le.unstable_LowPriority, le.unstable_runWithPriority, le.unstable_next, le.unstable_scheduleCallback, le.unstable_cancelCallback, le.unstable_wrapCallback, le.unstable_getCurrentPriorityLevel, le.unstable_shouldYield, le.unstable_requestPaint, le.unstable_continueExecution, le.unstable_pauseExecution, le.unstable_getFirstCallbackNode;
  var ae = G(function (e) {
    e.exports = re;
  });

  function ie(e) {
    for (var t = e.message, n = "https://reactjs.org/docs/error-decoder.html?invariant=" + t, r = 1; r < arguments.length; r++) n += "&args[]=" + encodeURIComponent(arguments[r]);

    return e.message = "Minified React error #" + t + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", e;
  }

  if (!X) throw ie(Error(227));
  var oe = null,
      ue = {};

  function ce() {
    if (oe) for (var e in ue) {
      var t = ue[e],
          n = oe.indexOf(e);
      if (!(-1 < n)) throw ie(Error(96), e);

      if (!fe[n]) {
        if (!t.extractEvents) throw ie(Error(97), e);

        for (var r in fe[n] = t, n = t.eventTypes) {
          var l = void 0,
              a = n[r],
              i = t,
              o = r;
          if (de.hasOwnProperty(o)) throw ie(Error(99), o);
          de[o] = a;
          var u = a.phasedRegistrationNames;

          if (u) {
            for (l in u) u.hasOwnProperty(l) && se(u[l], i, o);

            l = !0;
          } else a.registrationName ? (se(a.registrationName, i, o), l = !0) : l = !1;

          if (!l) throw ie(Error(98), r, e);
        }
      }
    }
  }

  function se(e, t, n) {
    if (pe[e]) throw ie(Error(100), e);
    pe[e] = t, me[e] = t.eventTypes[n].dependencies;
  }

  var fe = [],
      de = {},
      pe = {},
      me = {};

  function he(e, t, n, r, l, a, i, o, u) {
    var c = Array.prototype.slice.call(arguments, 3);

    try {
      t.apply(n, c);
    } catch (e) {
      this.onError(e);
    }
  }

  var ye = !1,
      ve = null,
      be = !1,
      ge = null,
      we = {
    onError: function (e) {
      ye = !0, ve = e;
    }
  };

  function ke(e, t, n, r, l, a, i, o, u) {
    ye = !1, ve = null, he.apply(we, arguments);
  }

  var Ee = null,
      xe = null,
      _e = null;

  function Te(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = _e(n), function (e, t, n, r, l, a, i, o, u) {
      if (ke.apply(this, arguments), ye) {
        if (!ye) throw ie(Error(198));
        var c = ve;
        ye = !1, ve = null, be || (be = !0, ge = c);
      }
    }(r, t, void 0, e), e.currentTarget = null;
  }

  function Ce(e, t) {
    if (null == t) throw ie(Error(30));
    return null == e ? t : Array.isArray(e) ? Array.isArray(t) ? (e.push.apply(e, t), e) : (e.push(t), e) : Array.isArray(t) ? [e].concat(t) : [e, t];
  }

  function Se(e, t, n) {
    Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e);
  }

  var Pe = null;

  function Ne(e) {
    if (e) {
      var t = e._dispatchListeners,
          n = e._dispatchInstances;
      if (Array.isArray(t)) for (var r = 0; r < t.length && !e.isPropagationStopped(); r++) Te(e, t[r], n[r]);else t && Te(e, t, n);
      e._dispatchListeners = null, e._dispatchInstances = null, e.isPersistent() || e.constructor.release(e);
    }
  }

  function Oe(e) {
    if (null !== e && (Pe = Ce(Pe, e)), e = Pe, Pe = null, e) {
      if (Se(e, Ne), Pe) throw ie(Error(95));
      if (be) throw e = ge, be = !1, ge = null, e;
    }
  }

  var Re = {
    injectEventPluginOrder: function (e) {
      if (oe) throw ie(Error(101));
      oe = Array.prototype.slice.call(e), ce();
    },
    injectEventPluginsByName: function (e) {
      var t,
          n = !1;

      for (t in e) if (e.hasOwnProperty(t)) {
        var r = e[t];

        if (!ue.hasOwnProperty(t) || ue[t] !== r) {
          if (ue[t]) throw ie(Error(102), t);
          ue[t] = r, n = !0;
        }
      }

      n && ce();
    }
  };

  function ze(t, n) {
    var r = t.stateNode;
    if (!r) return null;
    var l = Ee(r);
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
    if (r && "function" != typeof r) throw ie(Error(231), n, e(r));
    return r;
  }

  var Me = Math.random().toString(36).slice(2),
      Ie = "__reactInternalInstance$" + Me,
      De = "__reactEventHandlers$" + Me;

  function Ue(e) {
    if (e[Ie]) return e[Ie];

    for (; !e[Ie];) {
      if (!e.parentNode) return null;
      e = e.parentNode;
    }

    return 5 === (e = e[Ie]).tag || 6 === e.tag ? e : null;
  }

  function Fe(e) {
    return !(e = e[Ie]) || 5 !== e.tag && 6 !== e.tag ? null : e;
  }

  function Ae(e) {
    if (5 === e.tag || 6 === e.tag) return e.stateNode;
    throw ie(Error(33));
  }

  function Le(e) {
    return e[De] || null;
  }

  function je(e) {
    do {
      e = e.return;
    } while (e && 5 !== e.tag);

    return e || null;
  }

  function We(e, t, n) {
    (t = ze(e, n.dispatchConfig.phasedRegistrationNames[t])) && (n._dispatchListeners = Ce(n._dispatchListeners, t), n._dispatchInstances = Ce(n._dispatchInstances, e));
  }

  function Be(e) {
    if (e && e.dispatchConfig.phasedRegistrationNames) {
      for (var t = e._targetInst, n = []; t;) n.push(t), t = je(t);

      for (t = n.length; 0 < t--;) We(n[t], "captured", e);

      for (t = 0; t < n.length; t++) We(n[t], "bubbled", e);
    }
  }

  function Ve(e, t, n) {
    e && n && n.dispatchConfig.registrationName && (t = ze(e, n.dispatchConfig.registrationName)) && (n._dispatchListeners = Ce(n._dispatchListeners, t), n._dispatchInstances = Ce(n._dispatchInstances, e));
  }

  function Qe(e) {
    e && e.dispatchConfig.registrationName && Ve(e._targetInst, null, e);
  }

  function He(e) {
    Se(e, Be);
  }

  var $e = !("undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement);

  function qe(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }

  var Ke = {
    animationend: qe("Animation", "AnimationEnd"),
    animationiteration: qe("Animation", "AnimationIteration"),
    animationstart: qe("Animation", "AnimationStart"),
    transitionend: qe("Transition", "TransitionEnd")
  },
      Xe = {},
      Ye = {};

  function Ge(e) {
    if (Xe[e]) return Xe[e];
    if (!Ke[e]) return e;
    var t,
        n = Ke[e];

    for (t in n) if (n.hasOwnProperty(t) && t in Ye) return Xe[e] = n[t];

    return e;
  }

  $e && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete Ke.animationend.animation, delete Ke.animationiteration.animation, delete Ke.animationstart.animation), "TransitionEvent" in window || delete Ke.transitionend.transition);
  var Ze = Ge("animationend"),
      Je = Ge("animationiteration"),
      et = Ge("animationstart"),
      tt = Ge("transitionend"),
      nt = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
      rt = null,
      lt = null,
      at = null;

  function it() {
    if (at) return at;
    var e,
        t,
        n = lt,
        r = n.length,
        l = "value" in rt ? rt.value : rt.textContent,
        a = l.length;

    for (e = 0; e < r && n[e] === l[e]; e++);

    var i = r - e;

    for (t = 1; t <= i && n[r - t] === l[a - t]; t++);

    return at = l.slice(e, 1 < t ? 1 - t : void 0);
  }

  function ot() {
    return !0;
  }

  function ut() {
    return !1;
  }

  function ct(e, t, n, r) {
    for (var l in this.dispatchConfig = e, this._targetInst = t, this.nativeEvent = n, e = this.constructor.Interface) e.hasOwnProperty(l) && ((t = e[l]) ? this[l] = t(n) : "target" === l ? this.target = r : this[l] = n[l]);

    return this.isDefaultPrevented = (null != n.defaultPrevented ? n.defaultPrevented : !1 === n.returnValue) ? ot : ut, this.isPropagationStopped = ut, this;
  }

  function st(e, t, n, r) {
    if (this.eventPool.length) {
      var l = this.eventPool.pop();
      return this.call(l, e, t, n, r), l;
    }

    return new this(e, t, n, r);
  }

  function ft(e) {
    if (!(e instanceof this)) throw ie(Error(279));
    e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e);
  }

  function dt(e) {
    e.eventPool = [], e.getPooled = st, e.release = ft;
  }

  ne(ct.prototype, {
    preventDefault: function () {
      this.defaultPrevented = !0;
      var e = this.nativeEvent;
      e && (e.preventDefault ? e.preventDefault() : "unknown" != typeof e.returnValue && (e.returnValue = !1), this.isDefaultPrevented = ot);
    },
    stopPropagation: function () {
      var e = this.nativeEvent;
      e && (e.stopPropagation ? e.stopPropagation() : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0), this.isPropagationStopped = ot);
    },
    persist: function () {
      this.isPersistent = ot;
    },
    isPersistent: ut,
    destructor: function () {
      var e,
          t = this.constructor.Interface;

      for (e in t) this[e] = null;

      this.nativeEvent = this._targetInst = this.dispatchConfig = null, this.isPropagationStopped = this.isDefaultPrevented = ut, this._dispatchInstances = this._dispatchListeners = null;
    }
  }), ct.Interface = {
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
  }, ct.extend = function (e) {
    function t() {}

    function n() {
      return r.apply(this, arguments);
    }

    var r = this;
    t.prototype = r.prototype;
    var l = new t();
    return ne(l, n.prototype), n.prototype = l, n.prototype.constructor = n, n.Interface = ne({}, r.Interface, e), n.extend = r.extend, dt(n), n;
  }, dt(ct);
  var pt = ct.extend({
    data: null
  }),
      mt = ct.extend({
    data: null
  }),
      ht = [9, 13, 27, 32],
      yt = $e && "CompositionEvent" in window,
      vt = null;
  $e && "documentMode" in document && (vt = document.documentMode);
  var bt = $e && "TextEvent" in window && !vt,
      gt = $e && (!yt || vt && 8 < vt && 11 >= vt),
      wt = String.fromCharCode(32),
      kt = {
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
      Et = !1;

  function xt(e, t) {
    switch (e) {
      case "keyup":
        return -1 !== ht.indexOf(t.keyCode);

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

  function _t(t) {
    return t = t.detail, "object" === e(t) && "data" in t ? t.data : null;
  }

  var Tt = !1;
  var Ct = {
    eventTypes: kt,
    extractEvents: function (e, t, n, r) {
      var l = void 0,
          a = void 0;
      if (yt) e: {
        switch (e) {
          case "compositionstart":
            l = kt.compositionStart;
            break e;

          case "compositionend":
            l = kt.compositionEnd;
            break e;

          case "compositionupdate":
            l = kt.compositionUpdate;
            break e;
        }

        l = void 0;
      } else Tt ? xt(e, n) && (l = kt.compositionEnd) : "keydown" === e && 229 === n.keyCode && (l = kt.compositionStart);
      return l ? (gt && "ko" !== n.locale && (Tt || l !== kt.compositionStart ? l === kt.compositionEnd && Tt && (a = it()) : (lt = "value" in (rt = r) ? rt.value : rt.textContent, Tt = !0)), l = pt.getPooled(l, t, n, r), a ? l.data = a : null !== (a = _t(n)) && (l.data = a), He(l), a = l) : a = null, (e = bt ? function (e, t) {
        switch (e) {
          case "compositionend":
            return _t(t);

          case "keypress":
            return 32 !== t.which ? null : (Et = !0, wt);

          case "textInput":
            return (e = t.data) === wt && Et ? null : e;

          default:
            return null;
        }
      }(e, n) : function (e, t) {
        if (Tt) return "compositionend" === e || !yt && xt(e, t) ? (e = it(), at = lt = rt = null, Tt = !1, e) : null;

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
            return gt && "ko" !== t.locale ? null : t.data;

          default:
            return null;
        }
      }(e, n)) ? ((t = mt.getPooled(kt.beforeInput, t, n, r)).data = e, He(t)) : t = null, null === a ? t : null === t ? a : [a, t];
    }
  },
      St = null,
      Pt = null,
      Nt = null;

  function Ot(e) {
    if (e = xe(e)) {
      if ("function" != typeof St) throw ie(Error(280));
      var t = Ee(e.stateNode);
      St(e.stateNode, e.type, t);
    }
  }

  function Rt(e) {
    Pt ? Nt ? Nt.push(e) : Nt = [e] : Pt = e;
  }

  function zt() {
    if (Pt) {
      var e = Pt,
          t = Nt;
      if (Nt = Pt = null, Ot(e), t) for (e = 0; e < t.length; e++) Ot(t[e]);
    }
  }

  function Mt(e, t) {
    return e(t);
  }

  function It(e, t, n, r) {
    return e(t, n, r);
  }

  function Dt() {}

  var Ut = Mt,
      Ft = !1;

  function At() {
    null === Pt && null === Nt || (Dt(), zt());
  }

  var Lt = {
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

  function jt(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return "input" === t ? !!Lt[e.type] : "textarea" === t;
  }

  function Wt(e) {
    return (e = e.target || e.srcElement || window).correspondingUseElement && (e = e.correspondingUseElement), 3 === e.nodeType ? e.parentNode : e;
  }

  function Bt(e) {
    if (!$e) return !1;
    var t = (e = "on" + e) in document;
    return t || ((t = document.createElement("div")).setAttribute(e, "return;"), t = "function" == typeof t[e]), t;
  }

  function Vt(e) {
    var t = e.type;
    return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t);
  }

  function Qt(e) {
    e._valueTracker || (e._valueTracker = function (e) {
      var t = Vt(e) ? "checked" : "value",
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

  function Ht(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = "";
    return e && (r = Vt(e) ? e.checked ? "true" : "false" : e.value), (e = r) !== n && (t.setValue(e), !0);
  }

  var $t = X.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  $t.hasOwnProperty("ReactCurrentDispatcher") || ($t.ReactCurrentDispatcher = {
    current: null
  }), $t.hasOwnProperty("ReactCurrentBatchConfig") || ($t.ReactCurrentBatchConfig = {
    suspense: null
  });
  var qt = /^(.*)[\\\/]/,
      Kt = "function" == typeof Symbol && Symbol.for,
      Xt = Kt ? Symbol.for("react.element") : 60103,
      Yt = Kt ? Symbol.for("react.portal") : 60106,
      Gt = Kt ? Symbol.for("react.fragment") : 60107,
      Zt = Kt ? Symbol.for("react.strict_mode") : 60108,
      Jt = Kt ? Symbol.for("react.profiler") : 60114,
      en = Kt ? Symbol.for("react.provider") : 60109,
      tn = Kt ? Symbol.for("react.context") : 60110,
      nn = Kt ? Symbol.for("react.concurrent_mode") : 60111,
      rn = Kt ? Symbol.for("react.forward_ref") : 60112,
      ln = Kt ? Symbol.for("react.suspense") : 60113,
      an = Kt ? Symbol.for("react.suspense_list") : 60120,
      on = Kt ? Symbol.for("react.memo") : 60115,
      un = Kt ? Symbol.for("react.lazy") : 60116,
      cn = "function" == typeof Symbol && Symbol.iterator;

  function sn(t) {
    return null === t || "object" !== e(t) ? null : "function" == typeof (t = cn && t[cn] || t["@@iterator"]) ? t : null;
  }

  function fn(t) {
    if (null == t) return null;
    if ("function" == typeof t) return t.displayName || t.name || null;
    if ("string" == typeof t) return t;

    switch (t) {
      case Gt:
        return "Fragment";

      case Yt:
        return "Portal";

      case Jt:
        return "Profiler";

      case Zt:
        return "StrictMode";

      case ln:
        return "Suspense";

      case an:
        return "SuspenseList";
    }

    if ("object" === e(t)) switch (t.$$typeof) {
      case tn:
        return "Context.Consumer";

      case en:
        return "Context.Provider";

      case rn:
        var n = t.render;
        return n = n.displayName || n.name || "", t.displayName || ("" !== n ? "ForwardRef(" + n + ")" : "ForwardRef");

      case on:
        return fn(t.type);

      case un:
        if (t = 1 === t._status ? t._result : null) return fn(t);
    }
    return null;
  }

  function dn(e) {
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
              a = fn(e.type);
          n = null, r && (n = fn(r.type)), r = a, a = "", l ? a = " (at " + l.fileName.replace(qt, "") + ":" + l.lineNumber + ")" : n && (a = " (created by " + n + ")"), n = "\n    in " + (r || "Unknown") + a;
      }

      t += n, e = e.return;
    } while (e);

    return t;
  }

  var pn = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      mn = Object.prototype.hasOwnProperty,
      hn = {},
      yn = {};

  function vn(t, n, r, l) {
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

  function bn(e, t, n, r, l, a) {
    this.acceptsBooleans = 2 === t || 3 === t || 4 === t, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = a;
  }

  var gn = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (e) {
    gn[e] = new bn(e, 0, !1, e, null, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (e) {
    var t = e[0];
    gn[t] = new bn(t, 1, !1, e[1], null, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    gn[e] = new bn(e, 2, !1, e.toLowerCase(), null, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
    gn[e] = new bn(e, 2, !1, e, null, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (e) {
    gn[e] = new bn(e, 3, !1, e.toLowerCase(), null, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function (e) {
    gn[e] = new bn(e, 3, !0, e, null, !1);
  }), ["capture", "download"].forEach(function (e) {
    gn[e] = new bn(e, 4, !1, e, null, !1);
  }), ["cols", "rows", "size", "span"].forEach(function (e) {
    gn[e] = new bn(e, 6, !1, e, null, !1);
  }), ["rowSpan", "start"].forEach(function (e) {
    gn[e] = new bn(e, 5, !1, e.toLowerCase(), null, !1);
  });
  var wn = /[\-:]([a-z])/g;

  function kn(e) {
    return e[1].toUpperCase();
  }

  function En(e, t, n, r) {
    var l = gn.hasOwnProperty(t) ? gn[t] : null;
    (null !== l ? 0 === l.type : !r && 2 < t.length && ("o" === t[0] || "O" === t[0]) && ("n" === t[1] || "N" === t[1])) || (vn(t, n, l, r) && (n = null), r || null === l ? function (e) {
      return !!mn.call(yn, e) || !mn.call(hn, e) && (pn.test(e) ? yn[e] = !0 : (hn[e] = !0, !1));
    }(t) && (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = null === n ? 3 !== l.type && "" : n : (t = l.attributeName, r = l.attributeNamespace, null === n ? e.removeAttribute(t) : (n = 3 === (l = l.type) || 4 === l && !0 === n ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }

  function xn(t) {
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

  function _n(e, t) {
    var n = t.checked;
    return ne({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: null != n ? n : e._wrapperState.initialChecked
    });
  }

  function Tn(e, t) {
    var n = null == t.defaultValue ? "" : t.defaultValue,
        r = null != t.checked ? t.checked : t.defaultChecked;
    n = xn(null != t.value ? t.value : n), e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled: "checkbox" === t.type || "radio" === t.type ? null != t.checked : null != t.value
    };
  }

  function Cn(e, t) {
    null != (t = t.checked) && En(e, "checked", t, !1);
  }

  function Sn(e, t) {
    Cn(e, t);
    var n = xn(t.value),
        r = t.type;
    if (null != n) "number" === r ? (0 === n && "" === e.value || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);else if ("submit" === r || "reset" === r) return void e.removeAttribute("value");
    t.hasOwnProperty("value") ? Nn(e, t.type, n) : t.hasOwnProperty("defaultValue") && Nn(e, t.type, xn(t.defaultValue)), null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked);
  }

  function Pn(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!("submit" !== r && "reset" !== r || void 0 !== t.value && null !== t.value)) return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }

    "" !== (n = e.name) && (e.name = ""), e.defaultChecked = !e.defaultChecked, e.defaultChecked = !!e._wrapperState.initialChecked, "" !== n && (e.name = n);
  }

  function Nn(e, t, n) {
    "number" === t && e.ownerDocument.activeElement === e || (null == n ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }

  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (e) {
    var t = e.replace(wn, kn);
    gn[t] = new bn(t, 1, !1, e, null, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (e) {
    var t = e.replace(wn, kn);
    gn[t] = new bn(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var t = e.replace(wn, kn);
    gn[t] = new bn(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1);
  }), ["tabIndex", "crossOrigin"].forEach(function (e) {
    gn[e] = new bn(e, 1, !1, e.toLowerCase(), null, !1);
  }), gn.xlinkHref = new bn("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0), ["src", "href", "action", "formAction"].forEach(function (e) {
    gn[e] = new bn(e, 1, !1, e.toLowerCase(), null, !0);
  });
  var On = {
    change: {
      phasedRegistrationNames: {
        bubbled: "onChange",
        captured: "onChangeCapture"
      },
      dependencies: "blur change click focus input keydown keyup selectionchange".split(" ")
    }
  };

  function Rn(e, t, n) {
    return (e = ct.getPooled(On.change, e, t, n)).type = "change", Rt(n), He(e), e;
  }

  var zn = null,
      Mn = null;

  function In(e) {
    Oe(e);
  }

  function Dn(e) {
    if (Ht(Ae(e))) return e;
  }

  function Un(e, t) {
    if ("change" === e) return t;
  }

  var Fn = !1;

  function An() {
    zn && (zn.detachEvent("onpropertychange", Ln), Mn = zn = null);
  }

  function Ln(e) {
    if ("value" === e.propertyName && Dn(Mn)) if (e = Rn(Mn, e, Wt(e)), Ft) Oe(e);else {
      Ft = !0;

      try {
        Mt(In, e);
      } finally {
        Ft = !1, At();
      }
    }
  }

  function jn(e, t, n) {
    "focus" === e ? (An(), Mn = n, (zn = t).attachEvent("onpropertychange", Ln)) : "blur" === e && An();
  }

  function Wn(e) {
    if ("selectionchange" === e || "keyup" === e || "keydown" === e) return Dn(Mn);
  }

  function Bn(e, t) {
    if ("click" === e) return Dn(t);
  }

  function Vn(e, t) {
    if ("input" === e || "change" === e) return Dn(t);
  }

  $e && (Fn = Bt("input") && (!document.documentMode || 9 < document.documentMode));
  var Qn = {
    eventTypes: On,
    _isInputEventSupported: Fn,
    extractEvents: function (e, t, n, r) {
      var l = t ? Ae(t) : window,
          a = void 0,
          i = void 0,
          o = l.nodeName && l.nodeName.toLowerCase();
      if ("select" === o || "input" === o && "file" === l.type ? a = Un : jt(l) ? Fn ? a = Vn : (a = Wn, i = jn) : (o = l.nodeName) && "input" === o.toLowerCase() && ("checkbox" === l.type || "radio" === l.type) && (a = Bn), a && (a = a(e, t))) return Rn(a, n, r);
      i && i(e, l, t), "blur" === e && (e = l._wrapperState) && e.controlled && "number" === l.type && Nn(l, "number", l.value);
    }
  },
      Hn = ct.extend({
    view: null,
    detail: null
  }),
      $n = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };

  function qn(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : !!(e = $n[e]) && !!t[e];
  }

  function Kn() {
    return qn;
  }

  var Xn = 0,
      Yn = 0,
      Gn = !1,
      Zn = !1,
      Jn = Hn.extend({
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
    getModifierState: Kn,
    button: null,
    buttons: null,
    relatedTarget: function (e) {
      return e.relatedTarget || (e.fromElement === e.srcElement ? e.toElement : e.fromElement);
    },
    movementX: function (e) {
      if ("movementX" in e) return e.movementX;
      var t = Xn;
      return Xn = e.screenX, Gn ? "mousemove" === e.type ? e.screenX - t : 0 : (Gn = !0, 0);
    },
    movementY: function (e) {
      if ("movementY" in e) return e.movementY;
      var t = Yn;
      return Yn = e.screenY, Zn ? "mousemove" === e.type ? e.screenY - t : 0 : (Zn = !0, 0);
    }
  }),
      er = Jn.extend({
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
  }),
      tr = {
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
      nr = {
    eventTypes: tr,
    extractEvents: function (e, t, n, r) {
      var l = "mouseover" === e || "pointerover" === e,
          a = "mouseout" === e || "pointerout" === e;
      if (l && (n.relatedTarget || n.fromElement) || !a && !l) return null;
      if (l = r.window === r ? r : (l = r.ownerDocument) ? l.defaultView || l.parentWindow : window, a ? (a = t, t = (t = n.relatedTarget || n.toElement) ? Ue(t) : null) : a = null, a === t) return null;
      var i = void 0,
          o = void 0,
          u = void 0,
          c = void 0;
      "mouseout" === e || "mouseover" === e ? (i = Jn, o = tr.mouseLeave, u = tr.mouseEnter, c = "mouse") : "pointerout" !== e && "pointerover" !== e || (i = er, o = tr.pointerLeave, u = tr.pointerEnter, c = "pointer");
      var s = null == a ? l : Ae(a);
      if (l = null == t ? l : Ae(t), (e = i.getPooled(o, a, n, r)).type = c + "leave", e.target = s, e.relatedTarget = l, (n = i.getPooled(u, t, n, r)).type = c + "enter", n.target = l, n.relatedTarget = s, r = t, a && r) e: {
        for (l = r, c = 0, i = t = a; i; i = je(i)) c++;

        for (i = 0, u = l; u; u = je(u)) i++;

        for (; 0 < c - i;) t = je(t), c--;

        for (; 0 < i - c;) l = je(l), i--;

        for (; c--;) {
          if (t === l || t === l.alternate) break e;
          t = je(t), l = je(l);
        }

        t = null;
      } else t = null;

      for (l = t, t = []; a && a !== l && (null === (c = a.alternate) || c !== l);) t.push(a), a = je(a);

      for (a = []; r && r !== l && (null === (c = r.alternate) || c !== l);) a.push(r), r = je(r);

      for (r = 0; r < t.length; r++) Ve(t[r], "bubbled", e);

      for (r = a.length; 0 < r--;) Ve(a[r], "captured", n);

      return [e, n];
    }
  };

  function rr(e, t) {
    return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t;
  }

  var lr = Object.prototype.hasOwnProperty;

  function ar(t, n) {
    if (rr(t, n)) return !0;
    if ("object" !== e(t) || null === t || "object" !== e(n) || null === n) return !1;
    var r = Object.keys(t),
        l = Object.keys(n);
    if (r.length !== l.length) return !1;

    for (l = 0; l < r.length; l++) if (!lr.call(n, r[l]) || !rr(t[r[l]], n[r[l]])) return !1;

    return !0;
  }

  function ir(e, t) {
    return {
      responder: e,
      props: t
    };
  }

  function or(e) {
    var t = e;
    if (e.alternate) for (; t.return;) t = t.return;else {
      if (0 != (2 & t.effectTag)) return 1;

      for (; t.return;) if (0 != (2 & (t = t.return).effectTag)) return 1;
    }
    return 3 === t.tag ? 2 : 3;
  }

  function ur(e) {
    if (2 !== or(e)) throw ie(Error(188));
  }

  function cr(e) {
    if (!(e = function (e) {
      var t = e.alternate;

      if (!t) {
        if (3 === (t = or(e))) throw ie(Error(188));
        return 1 === t ? null : e;
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
            if (a === n) return ur(l), e;
            if (a === r) return ur(l), t;
            a = a.sibling;
          }

          throw ie(Error(188));
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

            if (!i) throw ie(Error(189));
          }
        }
        if (n.alternate !== r) throw ie(Error(190));
      }

      if (3 !== n.tag) throw ie(Error(188));
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

  var sr = ct.extend({
    animationName: null,
    elapsedTime: null,
    pseudoElement: null
  }),
      fr = ct.extend({
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }),
      dr = Hn.extend({
    relatedTarget: null
  });

  function pr(e) {
    var t = e.keyCode;
    return "charCode" in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : e = t, 10 === e && (e = 13), 32 <= e || 13 === e ? e : 0;
  }

  for (var mr = {
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
  }, hr = {
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
  }, yr = Hn.extend({
    key: function (e) {
      if (e.key) {
        var t = mr[e.key] || e.key;
        if ("Unidentified" !== t) return t;
      }

      return "keypress" === e.type ? 13 === (e = pr(e)) ? "Enter" : String.fromCharCode(e) : "keydown" === e.type || "keyup" === e.type ? hr[e.keyCode] || "Unidentified" : "";
    },
    location: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    repeat: null,
    locale: null,
    getModifierState: Kn,
    charCode: function (e) {
      return "keypress" === e.type ? pr(e) : 0;
    },
    keyCode: function (e) {
      return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
    },
    which: function (e) {
      return "keypress" === e.type ? pr(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
    }
  }), vr = Jn.extend({
    dataTransfer: null
  }), br = Hn.extend({
    touches: null,
    targetTouches: null,
    changedTouches: null,
    altKey: null,
    metaKey: null,
    ctrlKey: null,
    shiftKey: null,
    getModifierState: Kn
  }), gr = ct.extend({
    propertyName: null,
    elapsedTime: null,
    pseudoElement: null
  }), wr = Jn.extend({
    deltaX: function (e) {
      return ("deltaX" in e) ? e.deltaX : ("wheelDeltaX" in e) ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return ("deltaY" in e) ? e.deltaY : ("wheelDeltaY" in e) ? -e.wheelDeltaY : ("wheelDelta" in e) ? -e.wheelDelta : 0;
    },
    deltaZ: null,
    deltaMode: null
  }), kr = [["blur", "blur", 0], ["cancel", "cancel", 0], ["click", "click", 0], ["close", "close", 0], ["contextmenu", "contextMenu", 0], ["copy", "copy", 0], ["cut", "cut", 0], ["auxclick", "auxClick", 0], ["dblclick", "doubleClick", 0], ["dragend", "dragEnd", 0], ["dragstart", "dragStart", 0], ["drop", "drop", 0], ["focus", "focus", 0], ["input", "input", 0], ["invalid", "invalid", 0], ["keydown", "keyDown", 0], ["keypress", "keyPress", 0], ["keyup", "keyUp", 0], ["mousedown", "mouseDown", 0], ["mouseup", "mouseUp", 0], ["paste", "paste", 0], ["pause", "pause", 0], ["play", "play", 0], ["pointercancel", "pointerCancel", 0], ["pointerdown", "pointerDown", 0], ["pointerup", "pointerUp", 0], ["ratechange", "rateChange", 0], ["reset", "reset", 0], ["seeked", "seeked", 0], ["submit", "submit", 0], ["touchcancel", "touchCancel", 0], ["touchend", "touchEnd", 0], ["touchstart", "touchStart", 0], ["volumechange", "volumeChange", 0], ["drag", "drag", 1], ["dragenter", "dragEnter", 1], ["dragexit", "dragExit", 1], ["dragleave", "dragLeave", 1], ["dragover", "dragOver", 1], ["mousemove", "mouseMove", 1], ["mouseout", "mouseOut", 1], ["mouseover", "mouseOver", 1], ["pointermove", "pointerMove", 1], ["pointerout", "pointerOut", 1], ["pointerover", "pointerOver", 1], ["scroll", "scroll", 1], ["toggle", "toggle", 1], ["touchmove", "touchMove", 1], ["wheel", "wheel", 1], ["abort", "abort", 2], [Ze, "animationEnd", 2], [Je, "animationIteration", 2], [et, "animationStart", 2], ["canplay", "canPlay", 2], ["canplaythrough", "canPlayThrough", 2], ["durationchange", "durationChange", 2], ["emptied", "emptied", 2], ["encrypted", "encrypted", 2], ["ended", "ended", 2], ["error", "error", 2], ["gotpointercapture", "gotPointerCapture", 2], ["load", "load", 2], ["loadeddata", "loadedData", 2], ["loadedmetadata", "loadedMetadata", 2], ["loadstart", "loadStart", 2], ["lostpointercapture", "lostPointerCapture", 2], ["playing", "playing", 2], ["progress", "progress", 2], ["seeking", "seeking", 2], ["stalled", "stalled", 2], ["suspend", "suspend", 2], ["timeupdate", "timeUpdate", 2], [tt, "transitionEnd", 2], ["waiting", "waiting", 2]], Er = {}, xr = {}, _r = 0; _r < kr.length; _r++) {
    var Tr = kr[_r],
        Cr = Tr[0],
        Sr = Tr[1],
        Pr = Tr[2],
        Nr = "on" + (Sr[0].toUpperCase() + Sr.slice(1)),
        Or = {
      phasedRegistrationNames: {
        bubbled: Nr,
        captured: Nr + "Capture"
      },
      dependencies: [Cr],
      eventPriority: Pr
    };
    Er[Sr] = Or, xr[Cr] = Or;
  }

  var Rr = {
    eventTypes: Er,
    getEventPriority: function (e) {
      return void 0 !== (e = xr[e]) ? e.eventPriority : 2;
    },
    extractEvents: function (e, t, n, r) {
      var l = xr[e];
      if (!l) return null;

      switch (e) {
        case "keypress":
          if (0 === pr(n)) return null;

        case "keydown":
        case "keyup":
          e = yr;
          break;

        case "blur":
        case "focus":
          e = dr;
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
          e = Jn;
          break;

        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          e = vr;
          break;

        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          e = br;
          break;

        case Ze:
        case Je:
        case et:
          e = sr;
          break;

        case tt:
          e = gr;
          break;

        case "scroll":
          e = Hn;
          break;

        case "wheel":
          e = wr;
          break;

        case "copy":
        case "cut":
        case "paste":
          e = fr;
          break;

        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          e = er;
          break;

        default:
          e = ct;
      }

      return He(t = e.getPooled(l, t, n, r)), t;
    }
  },
      zr = Rr.getEventPriority,
      Mr = [];

  function Ir(e) {
    var t = e.targetInst,
        n = t;

    do {
      if (!n) {
        e.ancestors.push(n);
        break;
      }

      var r;

      for (r = n; r.return;) r = r.return;

      if (!(r = 3 !== r.tag ? null : r.stateNode.containerInfo)) break;
      e.ancestors.push(n), n = Ue(r);
    } while (n);

    for (n = 0; n < e.ancestors.length; n++) {
      t = e.ancestors[n];
      var l = Wt(e.nativeEvent);
      r = e.topLevelType;

      for (var a = e.nativeEvent, i = null, o = 0; o < fe.length; o++) {
        var u = fe[o];
        u && (u = u.extractEvents(r, t, a, l)) && (i = Ce(i, u));
      }

      Oe(i);
    }
  }

  var Dr = !0;

  function Ur(e, t) {
    Fr(t, e, !1);
  }

  function Fr(e, t, n) {
    switch (zr(t)) {
      case 0:
        var r = Ar.bind(null, t, 1);
        break;

      case 1:
        r = Lr.bind(null, t, 1);
        break;

      default:
        r = jr.bind(null, t, 1);
    }

    n ? e.addEventListener(t, r, !0) : e.addEventListener(t, r, !1);
  }

  function Ar(e, t, n) {
    Ft || Dt();
    var r = jr,
        l = Ft;
    Ft = !0;

    try {
      It(r, e, t, n);
    } finally {
      (Ft = l) || At();
    }
  }

  function Lr(e, t, n) {
    jr(e, t, n);
  }

  function jr(e, t, n) {
    if (Dr) {
      if (null === (t = Ue(t = Wt(n))) || "number" != typeof t.tag || 2 === or(t) || (t = null), Mr.length) {
        var r = Mr.pop();
        r.topLevelType = e, r.nativeEvent = n, r.targetInst = t, e = r;
      } else e = {
        topLevelType: e,
        nativeEvent: n,
        targetInst: t,
        ancestors: []
      };

      try {
        if (n = e, Ft) Ir(n);else {
          Ft = !0;

          try {
            Ut(Ir, n, void 0);
          } finally {
            Ft = !1, At();
          }
        }
      } finally {
        e.topLevelType = null, e.nativeEvent = null, e.targetInst = null, e.ancestors.length = 0, 10 > Mr.length && Mr.push(e);
      }
    }
  }

  var Wr = new ("function" == typeof WeakMap ? WeakMap : Map)();

  function Br(e) {
    var t = Wr.get(e);
    return void 0 === t && (t = new Set(), Wr.set(e, t)), t;
  }

  function Vr(e) {
    if (void 0 === (e = e || ("undefined" != typeof document ? document : void 0))) return null;

    try {
      return e.activeElement || e.body;
    } catch (t) {
      return e.body;
    }
  }

  function Qr(e) {
    for (; e && e.firstChild;) e = e.firstChild;

    return e;
  }

  function Hr(e, t) {
    var n,
        r = Qr(e);

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

      r = Qr(r);
    }
  }

  function $r() {
    for (var e = window, t = Vr(); t instanceof e.HTMLIFrameElement;) {
      try {
        var n = "string" == typeof t.contentWindow.location.href;
      } catch (e) {
        n = !1;
      }

      if (!n) break;
      t = Vr((e = t.contentWindow).document);
    }

    return t;
  }

  function qr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && ("input" === t && ("text" === e.type || "search" === e.type || "tel" === e.type || "url" === e.type || "password" === e.type) || "textarea" === t || "true" === e.contentEditable);
  }

  var Kr = $e && "documentMode" in document && 11 >= document.documentMode,
      Xr = {
    select: {
      phasedRegistrationNames: {
        bubbled: "onSelect",
        captured: "onSelectCapture"
      },
      dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")
    }
  },
      Yr = null,
      Gr = null,
      Zr = null,
      Jr = !1;

  function el(e, t) {
    var n = t.window === t ? t.document : 9 === t.nodeType ? t : t.ownerDocument;
    return Jr || null == Yr || Yr !== Vr(n) ? null : ("selectionStart" in (n = Yr) && qr(n) ? n = {
      start: n.selectionStart,
      end: n.selectionEnd
    } : n = {
      anchorNode: (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection()).anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }, Zr && ar(Zr, n) ? null : (Zr = n, (e = ct.getPooled(Xr.select, Gr, e, t)).type = "select", e.target = Yr, He(e), e));
  }

  var tl = {
    eventTypes: Xr,
    extractEvents: function (e, t, n, r) {
      var l,
          a = r.window === r ? r.document : 9 === r.nodeType ? r : r.ownerDocument;

      if (!(l = !a)) {
        e: {
          a = Br(a), l = me.onSelect;

          for (var i = 0; i < l.length; i++) if (!a.has(l[i])) {
            a = !1;
            break e;
          }

          a = !0;
        }

        l = !a;
      }

      if (l) return null;

      switch (a = t ? Ae(t) : window, e) {
        case "focus":
          (jt(a) || "true" === a.contentEditable) && (Yr = a, Gr = t, Zr = null);
          break;

        case "blur":
          Zr = Gr = Yr = null;
          break;

        case "mousedown":
          Jr = !0;
          break;

        case "contextmenu":
        case "mouseup":
        case "dragend":
          return Jr = !1, el(n, r);

        case "selectionchange":
          if (Kr) break;

        case "keydown":
        case "keyup":
          return el(n, r);
      }

      return null;
    }
  };

  function nl(e, t) {
    return e = ne({
      children: void 0
    }, t), (t = function (e) {
      var t = "";
      return X.Children.forEach(e, function (e) {
        null != e && (t += e);
      }), t;
    }(t.children)) && (e.children = t), e;
  }

  function rl(e, t, n, r) {
    if (e = e.options, t) {
      t = {};

      for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;

      for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + xn(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) return e[l].selected = !0, void (r && (e[l].defaultSelected = !0));
        null !== t || e[l].disabled || (t = e[l]);
      }

      null !== t && (t.selected = !0);
    }
  }

  function ll(e, t) {
    if (null != t.dangerouslySetInnerHTML) throw ie(Error(91));
    return ne({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue
    });
  }

  function al(e, t) {
    var n = t.value;

    if (null == n) {
      if (n = t.defaultValue, null != (t = t.children)) {
        if (null != n) throw ie(Error(92));

        if (Array.isArray(t)) {
          if (!(1 >= t.length)) throw ie(Error(93));
          t = t[0];
        }

        n = t;
      }

      null == n && (n = "");
    }

    e._wrapperState = {
      initialValue: xn(n)
    };
  }

  function il(e, t) {
    var n = xn(t.value),
        r = xn(t.defaultValue);
    null != n && ((n = "" + n) !== e.value && (e.value = n), null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)), null != r && (e.defaultValue = "" + r);
  }

  function ol(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && (e.value = t);
  }

  Re.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" ")), Ee = Le, xe = Fe, _e = Ae, Re.injectEventPluginsByName({
    SimpleEventPlugin: Rr,
    EnterLeaveEventPlugin: nr,
    ChangeEventPlugin: Qn,
    SelectEventPlugin: tl,
    BeforeInputEventPlugin: Ct
  });
  var ul = {
    html: "http://www.w3.org/1999/xhtml",
    mathml: "http://www.w3.org/1998/Math/MathML",
    svg: "http://www.w3.org/2000/svg"
  };

  function cl(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";

      case "math":
        return "http://www.w3.org/1998/Math/MathML";

      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }

  function sl(e, t) {
    return null == e || "http://www.w3.org/1999/xhtml" === e ? cl(t) : "http://www.w3.org/2000/svg" === e && "foreignObject" === t ? "http://www.w3.org/1999/xhtml" : e;
  }

  var fl = void 0,
      dl = function (e) {
    return "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function (t, n, r, l) {
      MSApp.execUnsafeLocalFunction(function () {
        return e(t, n);
      });
    } : e;
  }(function (e, t) {
    if (e.namespaceURI !== ul.svg || "innerHTML" in e) e.innerHTML = t;else {
      for ((fl = fl || document.createElement("div")).innerHTML = "<svg>" + t + "</svg>", t = fl.firstChild; e.firstChild;) e.removeChild(e.firstChild);

      for (; t.firstChild;) e.appendChild(t.firstChild);
    }
  });

  function pl(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && 3 === n.nodeType) return void (n.nodeValue = t);
    }

    e.textContent = t;
  }

  var ml = {
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
      hl = ["Webkit", "ms", "Moz", "O"];

  function yl(e, t, n) {
    return null == t || "boolean" == typeof t || "" === t ? "" : n || "number" != typeof t || 0 === t || ml.hasOwnProperty(e) && ml[e] ? ("" + t).trim() : t + "px";
  }

  function vl(e, t) {
    for (var n in e = e.style, t) if (t.hasOwnProperty(n)) {
      var r = 0 === n.indexOf("--"),
          l = yl(n, t[n], r);
      "float" === n && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
    }
  }

  Object.keys(ml).forEach(function (e) {
    hl.forEach(function (t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), ml[t] = ml[e];
    });
  });
  var bl = ne({
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

  function gl(t, n) {
    if (n) {
      if (bl[t] && (null != n.children || null != n.dangerouslySetInnerHTML)) throw ie(Error(137), t, "");

      if (null != n.dangerouslySetInnerHTML) {
        if (null != n.children) throw ie(Error(60));
        if (!("object" === e(n.dangerouslySetInnerHTML) && "__html" in n.dangerouslySetInnerHTML)) throw ie(Error(61));
      }

      if (null != n.style && "object" !== e(n.style)) throw ie(Error(62), "");
    }
  }

  function wl(e, t) {
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

  function kl(e, t) {
    var n = Br(e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument);
    t = me[t];

    for (var r = 0; r < t.length; r++) {
      var l = t[r];

      if (!n.has(l)) {
        switch (l) {
          case "scroll":
            Fr(e, "scroll", !0);
            break;

          case "focus":
          case "blur":
            Fr(e, "focus", !0), Fr(e, "blur", !0), n.add("blur"), n.add("focus");
            break;

          case "cancel":
          case "close":
            Bt(l) && Fr(e, l, !0);
            break;

          case "invalid":
          case "submit":
          case "reset":
            break;

          default:
            -1 === nt.indexOf(l) && Ur(l, e);
        }

        n.add(l);
      }
    }
  }

  function El() {}

  var xl = null,
      _l = null;

  function Tl(e, t) {
    switch (e) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        return !!t.autoFocus;
    }

    return !1;
  }

  function Cl(t, n) {
    return "textarea" === t || "option" === t || "noscript" === t || "string" == typeof n.children || "number" == typeof n.children || "object" === e(n.dangerouslySetInnerHTML) && null !== n.dangerouslySetInnerHTML && null != n.dangerouslySetInnerHTML.__html;
  }

  var Sl = "function" == typeof setTimeout ? setTimeout : void 0,
      Pl = "function" == typeof clearTimeout ? clearTimeout : void 0;

  function Nl(e) {
    for (; null != e; e = e.nextSibling) {
      var t = e.nodeType;
      if (1 === t || 3 === t) break;
    }

    return e;
  }

  var Ol = [],
      Rl = -1;

  function zl(e) {
    0 > Rl || (e.current = Ol[Rl], Ol[Rl] = null, Rl--);
  }

  function Ml(e, t) {
    Ol[++Rl] = e.current, e.current = t;
  }

  var Il = {},
      Dl = {
    current: Il
  },
      Ul = {
    current: !1
  },
      Fl = Il;

  function Al(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Il;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var l,
        a = {};

    for (l in n) a[l] = t[l];

    return r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = a), a;
  }

  function Ll(e) {
    return null != (e = e.childContextTypes);
  }

  function jl(e) {
    zl(Ul), zl(Dl);
  }

  function Wl(e) {
    zl(Ul), zl(Dl);
  }

  function Bl(e, t, n) {
    if (Dl.current !== Il) throw ie(Error(168));
    Ml(Dl, t), Ml(Ul, n);
  }

  function Vl(e, t, n) {
    var r = e.stateNode;
    if (e = t.childContextTypes, "function" != typeof r.getChildContext) return n;

    for (var l in r = r.getChildContext()) if (!(l in e)) throw ie(Error(108), fn(t) || "Unknown", l);

    return ne({}, n, r);
  }

  function Ql(e) {
    var t = e.stateNode;
    return t = t && t.__reactInternalMemoizedMergedChildContext || Il, Fl = Dl.current, Ml(Dl, t), Ml(Ul, Ul.current), !0;
  }

  function Hl(e, t, n) {
    var r = e.stateNode;
    if (!r) throw ie(Error(169));
    n ? (t = Vl(e, t, Fl), r.__reactInternalMemoizedMergedChildContext = t, zl(Ul), zl(Dl), Ml(Dl, t)) : zl(Ul), Ml(Ul, n);
  }

  var $l = ae.unstable_runWithPriority,
      ql = ae.unstable_scheduleCallback,
      Kl = ae.unstable_cancelCallback,
      Xl = ae.unstable_shouldYield,
      Yl = ae.unstable_requestPaint,
      Gl = ae.unstable_now,
      Zl = ae.unstable_getCurrentPriorityLevel,
      Jl = ae.unstable_ImmediatePriority,
      ea = ae.unstable_UserBlockingPriority,
      ta = ae.unstable_NormalPriority,
      na = ae.unstable_LowPriority,
      ra = ae.unstable_IdlePriority,
      la = {},
      aa = void 0 !== Yl ? Yl : function () {},
      ia = null,
      oa = null,
      ua = !1,
      ca = Gl(),
      sa = 1e4 > ca ? Gl : function () {
    return Gl() - ca;
  };

  function fa() {
    switch (Zl()) {
      case Jl:
        return 99;

      case ea:
        return 98;

      case ta:
        return 97;

      case na:
        return 96;

      case ra:
        return 95;

      default:
        throw ie(Error(332));
    }
  }

  function da(e) {
    switch (e) {
      case 99:
        return Jl;

      case 98:
        return ea;

      case 97:
        return ta;

      case 96:
        return na;

      case 95:
        return ra;

      default:
        throw ie(Error(332));
    }
  }

  function pa(e, t) {
    return e = da(e), $l(e, t);
  }

  function ma(e, t, n) {
    return e = da(e), ql(e, t, n);
  }

  function ha(e) {
    return null === ia ? (ia = [e], oa = ql(Jl, va)) : ia.push(e), la;
  }

  function ya() {
    null !== oa && Kl(oa), va();
  }

  function va() {
    if (!ua && null !== ia) {
      ua = !0;
      var e = 0;

      try {
        var t = ia;
        pa(99, function () {
          for (; e < t.length; e++) {
            var n = t[e];

            do {
              n = n(!0);
            } while (null !== n);
          }
        }), ia = null;
      } catch (t) {
        throw null !== ia && (ia = ia.slice(e + 1)), ql(Jl, ya), t;
      } finally {
        ua = !1;
      }
    }
  }

  function ba(e, t) {
    return 1073741823 === t ? 99 : 1 === t ? 95 : 0 >= (e = 10 * (1073741821 - t) - 10 * (1073741821 - e)) ? 99 : 250 >= e ? 98 : 5250 >= e ? 97 : 95;
  }

  function ga(e, t) {
    if (e && e.defaultProps) for (var n in t = ne({}, t), e = e.defaultProps) void 0 === t[n] && (t[n] = e[n]);
    return t;
  }

  var wa = {
    current: null
  },
      ka = null,
      Ea = null,
      xa = null;

  function _a() {
    xa = Ea = ka = null;
  }

  function Ta(e, t) {
    var n = e.type._context;
    Ml(wa, n._currentValue), n._currentValue = t;
  }

  function Ca(e) {
    var t = wa.current;
    zl(wa), e.type._context._currentValue = t;
  }

  function Sa(e, t) {
    for (; null !== e;) {
      var n = e.alternate;
      if (e.childExpirationTime < t) e.childExpirationTime = t, null !== n && n.childExpirationTime < t && (n.childExpirationTime = t);else {
        if (!(null !== n && n.childExpirationTime < t)) break;
        n.childExpirationTime = t;
      }
      e = e.return;
    }
  }

  function Pa(e, t) {
    ka = e, xa = Ea = null, null !== (e = e.dependencies) && null !== e.firstContext && (e.expirationTime >= t && (fo = !0), e.firstContext = null);
  }

  function Na(e, t) {
    if (xa !== e && !1 !== t && 0 !== t) if ("number" == typeof t && 1073741823 !== t || (xa = e, t = 1073741823), t = {
      context: e,
      observedBits: t,
      next: null
    }, null === Ea) {
      if (null === ka) throw ie(Error(308));
      Ea = t, ka.dependencies = {
        expirationTime: 0,
        firstContext: t,
        responders: null
      };
    } else Ea = Ea.next = t;
    return e._currentValue;
  }

  var Oa = !1;

  function Ra(e) {
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

  function za(e) {
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

  function Ma(e, t) {
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

  function Ia(e, t) {
    null === e.lastUpdate ? e.firstUpdate = e.lastUpdate = t : (e.lastUpdate.next = t, e.lastUpdate = t);
  }

  function Da(e, t) {
    var n = e.alternate;

    if (null === n) {
      var r = e.updateQueue,
          l = null;
      null === r && (r = e.updateQueue = Ra(e.memoizedState));
    } else r = e.updateQueue, l = n.updateQueue, null === r ? null === l ? (r = e.updateQueue = Ra(e.memoizedState), l = n.updateQueue = Ra(n.memoizedState)) : r = e.updateQueue = za(l) : null === l && (l = n.updateQueue = za(r));

    null === l || r === l ? Ia(r, t) : null === r.lastUpdate || null === l.lastUpdate ? (Ia(r, t), Ia(l, t)) : (Ia(r, t), l.lastUpdate = t);
  }

  function Ua(e, t) {
    var n = e.updateQueue;
    null === (n = null === n ? e.updateQueue = Ra(e.memoizedState) : Fa(e, n)).lastCapturedUpdate ? n.firstCapturedUpdate = n.lastCapturedUpdate = t : (n.lastCapturedUpdate.next = t, n.lastCapturedUpdate = t);
  }

  function Fa(e, t) {
    var n = e.alternate;
    return null !== n && t === n.updateQueue && (t = e.updateQueue = za(t)), t;
  }

  function Aa(e, t, n, r, l, a) {
    switch (n.tag) {
      case 1:
        return "function" == typeof (e = n.payload) ? e.call(a, r, l) : e;

      case 3:
        e.effectTag = -2049 & e.effectTag | 64;

      case 0:
        if (null == (l = "function" == typeof (e = n.payload) ? e.call(a, r, l) : e)) break;
        return ne({}, r, l);

      case 2:
        Oa = !0;
    }

    return r;
  }

  function La(e, t, n, r, l) {
    Oa = !1;

    for (var a = (t = Fa(e, t)).baseState, i = null, o = 0, u = t.firstUpdate, c = a; null !== u;) {
      var s = u.expirationTime;
      s < l ? (null === i && (i = u, a = c), o < s && (o = s)) : (Vu(s, u.suspenseConfig), c = Aa(e, 0, u, c, n, r), null !== u.callback && (e.effectTag |= 32, u.nextEffect = null, null === t.lastEffect ? t.firstEffect = t.lastEffect = u : (t.lastEffect.nextEffect = u, t.lastEffect = u))), u = u.next;
    }

    for (s = null, u = t.firstCapturedUpdate; null !== u;) {
      var f = u.expirationTime;
      f < l ? (null === s && (s = u, null === i && (a = c)), o < f && (o = f)) : (c = Aa(e, 0, u, c, n, r), null !== u.callback && (e.effectTag |= 32, u.nextEffect = null, null === t.lastCapturedEffect ? t.firstCapturedEffect = t.lastCapturedEffect = u : (t.lastCapturedEffect.nextEffect = u, t.lastCapturedEffect = u))), u = u.next;
    }

    null === i && (t.lastUpdate = null), null === s ? t.lastCapturedUpdate = null : e.effectTag |= 32, null === i && null === s && (a = c), t.baseState = a, t.firstUpdate = i, t.firstCapturedUpdate = s, e.expirationTime = o, e.memoizedState = c;
  }

  function ja(e, t, n) {
    null !== t.firstCapturedUpdate && (null !== t.lastUpdate && (t.lastUpdate.next = t.firstCapturedUpdate, t.lastUpdate = t.lastCapturedUpdate), t.firstCapturedUpdate = t.lastCapturedUpdate = null), Wa(t.firstEffect, n), t.firstEffect = t.lastEffect = null, Wa(t.firstCapturedEffect, n), t.firstCapturedEffect = t.lastCapturedEffect = null;
  }

  function Wa(e, t) {
    for (; null !== e;) {
      var n = e.callback;

      if (null !== n) {
        e.callback = null;
        var r = t;
        if ("function" != typeof n) throw ie(Error(191), n);
        n.call(r);
      }

      e = e.nextEffect;
    }
  }

  var Ba = $t.ReactCurrentBatchConfig,
      Va = new X.Component().refs;

  function Qa(e, t, n, r) {
    n = null == (n = n(r, t = e.memoizedState)) ? t : ne({}, t, n), e.memoizedState = n, null !== (r = e.updateQueue) && 0 === e.expirationTime && (r.baseState = n);
  }

  var Ha = {
    isMounted: function (e) {
      return !!(e = e._reactInternalFiber) && 2 === or(e);
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternalFiber;
      var r = Ou(),
          l = Ba.suspense;
      (l = Ma(r = Ru(r, e, l), l)).payload = t, null != n && (l.callback = n), Da(e, l), Mu(e, r);
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternalFiber;
      var r = Ou(),
          l = Ba.suspense;
      (l = Ma(r = Ru(r, e, l), l)).tag = 1, l.payload = t, null != n && (l.callback = n), Da(e, l), Mu(e, r);
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternalFiber;
      var n = Ou(),
          r = Ba.suspense;
      (r = Ma(n = Ru(n, e, r), r)).tag = 2, null != t && (r.callback = t), Da(e, r), Mu(e, n);
    }
  };

  function $a(e, t, n, r, l, a, i) {
    return "function" == typeof (e = e.stateNode).shouldComponentUpdate ? e.shouldComponentUpdate(r, a, i) : !t.prototype || !t.prototype.isPureReactComponent || !ar(n, r) || !ar(l, a);
  }

  function qa(t, n, r) {
    var l = !1,
        a = Il,
        i = n.contextType;
    return "object" === e(i) && null !== i ? i = Na(i) : (a = Ll(n) ? Fl : Dl.current, i = (l = null != (l = n.contextTypes)) ? Al(t, a) : Il), n = new n(r, i), t.memoizedState = null !== n.state && void 0 !== n.state ? n.state : null, n.updater = Ha, t.stateNode = n, n._reactInternalFiber = t, l && ((t = t.stateNode).__reactInternalMemoizedUnmaskedChildContext = a, t.__reactInternalMemoizedMaskedChildContext = i), n;
  }

  function Ka(e, t, n, r) {
    e = t.state, "function" == typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r), "function" == typeof t.UNSAFE_componentWillReceiveProps && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ha.enqueueReplaceState(t, t.state, null);
  }

  function Xa(t, n, r, l) {
    var a = t.stateNode;
    a.props = r, a.state = t.memoizedState, a.refs = Va;
    var i = n.contextType;
    "object" === e(i) && null !== i ? a.context = Na(i) : (i = Ll(n) ? Fl : Dl.current, a.context = Al(t, i)), null !== (i = t.updateQueue) && (La(t, i, r, a, l), a.state = t.memoizedState), "function" == typeof (i = n.getDerivedStateFromProps) && (Qa(t, n, i, r), a.state = t.memoizedState), "function" == typeof n.getDerivedStateFromProps || "function" == typeof a.getSnapshotBeforeUpdate || "function" != typeof a.UNSAFE_componentWillMount && "function" != typeof a.componentWillMount || (n = a.state, "function" == typeof a.componentWillMount && a.componentWillMount(), "function" == typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(), n !== a.state && Ha.enqueueReplaceState(a, a.state, null), null !== (i = t.updateQueue) && (La(t, i, r, a, l), a.state = t.memoizedState)), "function" == typeof a.componentDidMount && (t.effectTag |= 4);
  }

  var Ya = Array.isArray;

  function Ga(t, n, r) {
    if (null !== (t = r.ref) && "function" != typeof t && "object" !== e(t)) {
      if (r._owner) {
        r = r._owner;
        var l = void 0;

        if (r) {
          if (1 !== r.tag) throw ie(Error(309));
          l = r.stateNode;
        }

        if (!l) throw ie(Error(147), t);
        var a = "" + t;
        return null !== n && null !== n.ref && "function" == typeof n.ref && n.ref._stringRef === a ? n.ref : ((n = function (e) {
          var t = l.refs;
          t === Va && (t = l.refs = {}), null === e ? delete t[a] : t[a] = e;
        })._stringRef = a, n);
      }

      if ("string" != typeof t) throw ie(Error(284));
      if (!r._owner) throw ie(Error(290), t);
    }

    return t;
  }

  function Za(e, t) {
    if ("textarea" !== e.type) throw ie(Error(31), "[object Object]" === Object.prototype.toString.call(t) ? "object with keys {" + Object.keys(t).join(", ") + "}" : t, "");
  }

  function Ja(t) {
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
      return (e = ic(e, t)).index = 0, e.sibling = null, e;
    }

    function i(e, n, r) {
      return e.index = r, t ? null !== (r = e.alternate) ? (r = r.index) < n ? (e.effectTag = 2, n) : r : (e.effectTag = 2, n) : n;
    }

    function o(e) {
      return t && null === e.alternate && (e.effectTag = 2), e;
    }

    function u(e, t, n, r) {
      return null === t || 6 !== t.tag ? ((t = cc(n, e.mode, r)).return = e, t) : ((t = a(t, n)).return = e, t);
    }

    function c(e, t, n, r) {
      return null !== t && t.elementType === n.type ? ((r = a(t, n.props)).ref = Ga(e, t, n), r.return = e, r) : ((r = oc(n.type, n.key, n.props, null, e.mode, r)).ref = Ga(e, t, n), r.return = e, r);
    }

    function s(e, t, n, r) {
      return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? ((t = sc(n, e.mode, r)).return = e, t) : ((t = a(t, n.children || [])).return = e, t);
    }

    function f(e, t, n, r, l) {
      return null === t || 7 !== t.tag ? ((t = uc(n, e.mode, r, l)).return = e, t) : ((t = a(t, n)).return = e, t);
    }

    function d(t, n, r) {
      if ("string" == typeof n || "number" == typeof n) return (n = cc("" + n, t.mode, r)).return = t, n;

      if ("object" === e(n) && null !== n) {
        switch (n.$$typeof) {
          case Xt:
            return (r = oc(n.type, n.key, n.props, null, t.mode, r)).ref = Ga(t, null, n), r.return = t, r;

          case Yt:
            return (n = sc(n, t.mode, r)).return = t, n;
        }

        if (Ya(n) || sn(n)) return (n = uc(n, t.mode, r, null)).return = t, n;
        Za(t, n);
      }

      return null;
    }

    function p(t, n, r, l) {
      var a = null !== n ? n.key : null;
      if ("string" == typeof r || "number" == typeof r) return null !== a ? null : u(t, n, "" + r, l);

      if ("object" === e(r) && null !== r) {
        switch (r.$$typeof) {
          case Xt:
            return r.key === a ? r.type === Gt ? f(t, n, r.props.children, l, a) : c(t, n, r, l) : null;

          case Yt:
            return r.key === a ? s(t, n, r, l) : null;
        }

        if (Ya(r) || sn(r)) return null !== a ? null : f(t, n, r, l, null);
        Za(t, r);
      }

      return null;
    }

    function m(t, n, r, l, a) {
      if ("string" == typeof l || "number" == typeof l) return u(n, t = t.get(r) || null, "" + l, a);

      if ("object" === e(l) && null !== l) {
        switch (l.$$typeof) {
          case Xt:
            return t = t.get(null === l.key ? r : l.key) || null, l.type === Gt ? f(n, t, l.props.children, a, l.key) : c(n, t, l, a);

          case Yt:
            return s(n, t = t.get(null === l.key ? r : l.key) || null, l, a);
        }

        if (Ya(l) || sn(l)) return f(n, t = t.get(r) || null, l, a, null);
        Za(n, l);
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
      var c = sn(o);
      if ("function" != typeof c) throw ie(Error(150));
      if (null == (o = c.call(o))) throw ie(Error(151));

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
      var c = "object" === e(i) && null !== i && i.type === Gt && null === i.key;
      c && (i = i.props.children);
      var s = "object" === e(i) && null !== i;
      if (s) switch (i.$$typeof) {
        case Xt:
          e: {
            for (s = i.key, c = l; null !== c;) {
              if (c.key === s) {
                if (7 === c.tag ? i.type === Gt : c.elementType === i.type) {
                  r(t, c.sibling), (l = a(c, i.type === Gt ? i.props.children : i.props)).ref = Ga(t, c, i), l.return = t, t = l;
                  break e;
                }

                r(t, c);
                break;
              }

              n(t, c), c = c.sibling;
            }

            i.type === Gt ? ((l = uc(i.props.children, t.mode, u, i.key)).return = t, t = l) : ((u = oc(i.type, i.key, i.props, null, t.mode, u)).ref = Ga(t, l, i), u.return = t, t = u);
          }

          return o(t);

        case Yt:
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

            (l = sc(i, t.mode, u)).return = t, t = l;
          }

          return o(t);
      }
      if ("string" == typeof i || "number" == typeof i) return i = "" + i, null !== l && 6 === l.tag ? (r(t, l.sibling), (l = a(l, i)).return = t, t = l) : (r(t, l), (l = cc(i, t.mode, u)).return = t, t = l), o(t);
      if (Ya(i)) return h(t, l, i, u);
      if (sn(i)) return y(t, l, i, u);
      if (s && Za(t, i), void 0 === i && !c) switch (t.tag) {
        case 1:
        case 0:
          throw t = t.type, ie(Error(152), t.displayName || t.name || "Component");
      }
      return r(t, l);
    };
  }

  var ei = Ja(!0),
      ti = Ja(!1),
      ni = {},
      ri = {
    current: ni
  },
      li = {
    current: ni
  },
      ai = {
    current: ni
  };

  function ii(e) {
    if (e === ni) throw ie(Error(174));
    return e;
  }

  function oi(e, t) {
    Ml(ai, t), Ml(li, e), Ml(ri, ni);
    var n = t.nodeType;

    switch (n) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : sl(null, "");
        break;

      default:
        t = sl(t = (n = 8 === n ? t.parentNode : t).namespaceURI || null, n = n.tagName);
    }

    zl(ri), Ml(ri, t);
  }

  function ui(e) {
    zl(ri), zl(li), zl(ai);
  }

  function ci(e) {
    ii(ai.current);
    var t = ii(ri.current),
        n = sl(t, e.type);
    t !== n && (Ml(li, e), Ml(ri, n));
  }

  function si(e) {
    li.current === e && (zl(ri), zl(li));
  }

  var fi = 1,
      di = 1,
      pi = 2,
      mi = {
    current: 0
  };

  function hi(e) {
    for (var t = e; null !== t;) {
      if (13 === t.tag) {
        if (null !== t.memoizedState) return t;
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

  var yi = 0,
      vi = 2,
      bi = 4,
      gi = 8,
      wi = 16,
      ki = 32,
      Ei = 64,
      xi = 128,
      _i = $t.ReactCurrentDispatcher,
      Ti = 0,
      Ci = null,
      Si = null,
      Pi = null,
      Ni = null,
      Oi = null,
      Ri = null,
      zi = 0,
      Mi = null,
      Ii = 0,
      Di = !1,
      Ui = null,
      Fi = 0;

  function Ai() {
    throw ie(Error(321));
  }

  function Li(e, t) {
    if (null === t) return !1;

    for (var n = 0; n < t.length && n < e.length; n++) if (!rr(e[n], t[n])) return !1;

    return !0;
  }

  function ji(e, t, n, r, l, a) {
    if (Ti = a, Ci = t, Pi = null !== e ? e.memoizedState : null, _i.current = null === Pi ? Ji : eo, t = n(r, l), Di) {
      do {
        Di = !1, Fi += 1, Pi = null !== e ? e.memoizedState : null, Ri = Ni, Mi = Oi = Si = null, _i.current = eo, t = n(r, l);
      } while (Di);

      Ui = null, Fi = 0;
    }

    if (_i.current = Zi, (e = Ci).memoizedState = Ni, e.expirationTime = zi, e.updateQueue = Mi, e.effectTag |= Ii, e = null !== Si && null !== Si.next, Ti = 0, Ri = Oi = Ni = Pi = Si = Ci = null, zi = 0, Mi = null, Ii = 0, e) throw ie(Error(300));
    return t;
  }

  function Wi() {
    _i.current = Zi, Ti = 0, Ri = Oi = Ni = Pi = Si = Ci = null, zi = 0, Mi = null, Ii = 0, Di = !1, Ui = null, Fi = 0;
  }

  function Bi() {
    var e = {
      memoizedState: null,
      baseState: null,
      queue: null,
      baseUpdate: null,
      next: null
    };
    return null === Oi ? Ni = Oi = e : Oi = Oi.next = e, Oi;
  }

  function Vi() {
    if (null !== Ri) Ri = (Oi = Ri).next, Pi = null !== (Si = Pi) ? Si.next : null;else {
      if (null === Pi) throw ie(Error(310));
      var e = {
        memoizedState: (Si = Pi).memoizedState,
        baseState: Si.baseState,
        queue: Si.queue,
        baseUpdate: Si.baseUpdate,
        next: null
      };
      Oi = null === Oi ? Ni = e : Oi.next = e, Pi = Si.next;
    }
    return Oi;
  }

  function Qi(e, t) {
    return "function" == typeof t ? t(e) : t;
  }

  function Hi(e) {
    var t = Vi(),
        n = t.queue;
    if (null === n) throw ie(Error(311));

    if (n.lastRenderedReducer = e, 0 < Fi) {
      var r = n.dispatch;

      if (null !== Ui) {
        var l = Ui.get(n);

        if (void 0 !== l) {
          Ui.delete(n);
          var a = t.memoizedState;

          do {
            a = e(a, l.action), l = l.next;
          } while (null !== l);

          return rr(a, t.memoizedState) || (fo = !0), t.memoizedState = a, t.baseUpdate === n.last && (t.baseState = a), n.lastRenderedState = a, [a, r];
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
        s < Ti ? (c || (c = !0, o = i, l = a), s > zi && (zi = s)) : (Vu(s, u.suspenseConfig), a = u.eagerReducer === e ? u.eagerState : e(a, u.action)), i = u, u = u.next;
      } while (null !== u && u !== r);

      c || (o = i, l = a), rr(a, t.memoizedState) || (fo = !0), t.memoizedState = a, t.baseUpdate = o, t.baseState = l, n.lastRenderedState = a;
    }

    return [t.memoizedState, n.dispatch];
  }

  function $i(e, t, n, r) {
    return e = {
      tag: e,
      create: t,
      destroy: n,
      deps: r,
      next: null
    }, null === Mi ? (Mi = {
      lastEffect: null
    }).lastEffect = e.next = e : null === (t = Mi.lastEffect) ? Mi.lastEffect = e.next = e : (n = t.next, t.next = e, e.next = n, Mi.lastEffect = e), e;
  }

  function qi(e, t, n, r) {
    var l = Bi();
    Ii |= e, l.memoizedState = $i(t, n, void 0, void 0 === r ? null : r);
  }

  function Ki(e, t, n, r) {
    var l = Vi();
    r = void 0 === r ? null : r;
    var a = void 0;

    if (null !== Si) {
      var i = Si.memoizedState;
      if (a = i.destroy, null !== r && Li(r, i.deps)) return void $i(yi, n, a, r);
    }

    Ii |= e, l.memoizedState = $i(t, n, a, r);
  }

  function Xi(e, t) {
    return "function" == typeof t ? (e = e(), t(e), function () {
      t(null);
    }) : null != t ? (e = e(), t.current = e, function () {
      t.current = null;
    }) : void 0;
  }

  function Yi() {}

  function Gi(e, t, n) {
    if (!(25 > Fi)) throw ie(Error(301));
    var r = e.alternate;
    if (e === Ci || null !== r && r === Ci) {
      if (Di = !0, e = {
        expirationTime: Ti,
        suspenseConfig: null,
        action: n,
        eagerReducer: null,
        eagerState: null,
        next: null
      }, null === Ui && (Ui = new Map()), void 0 === (n = Ui.get(t))) Ui.set(t, e);else {
        for (t = n; null !== t.next;) t = t.next;

        t.next = e;
      }
    } else {
      var l = Ou(),
          a = Ba.suspense;
      a = {
        expirationTime: l = Ru(l, e, a),
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
        if (a.eagerReducer = r, a.eagerState = c, rr(c, u)) return;
      } catch (e) {}
      Mu(e, l);
    }
  }

  var Zi = {
    readContext: Na,
    useCallback: Ai,
    useContext: Ai,
    useEffect: Ai,
    useImperativeHandle: Ai,
    useLayoutEffect: Ai,
    useMemo: Ai,
    useReducer: Ai,
    useRef: Ai,
    useState: Ai,
    useDebugValue: Ai,
    useResponder: Ai
  },
      Ji = {
    readContext: Na,
    useCallback: function (e, t) {
      return Bi().memoizedState = [e, void 0 === t ? null : t], e;
    },
    useContext: Na,
    useEffect: function (e, t) {
      return qi(516, xi | Ei, e, t);
    },
    useImperativeHandle: function (e, t, n) {
      return n = null != n ? n.concat([e]) : null, qi(4, bi | ki, Xi.bind(null, t, e), n);
    },
    useLayoutEffect: function (e, t) {
      return qi(4, bi | ki, e, t);
    },
    useMemo: function (e, t) {
      var n = Bi();
      return t = void 0 === t ? null : t, e = e(), n.memoizedState = [e, t], e;
    },
    useReducer: function (e, t, n) {
      var r = Bi();
      return t = void 0 !== n ? n(t) : t, r.memoizedState = r.baseState = t, e = (e = r.queue = {
        last: null,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: t
      }).dispatch = Gi.bind(null, Ci, e), [r.memoizedState, e];
    },
    useRef: function (e) {
      return e = {
        current: e
      }, Bi().memoizedState = e;
    },
    useState: function (e) {
      var t = Bi();
      return "function" == typeof e && (e = e()), t.memoizedState = t.baseState = e, e = (e = t.queue = {
        last: null,
        dispatch: null,
        lastRenderedReducer: Qi,
        lastRenderedState: e
      }).dispatch = Gi.bind(null, Ci, e), [t.memoizedState, e];
    },
    useDebugValue: Yi,
    useResponder: ir
  },
      eo = {
    readContext: Na,
    useCallback: function (e, t) {
      var n = Vi();
      t = void 0 === t ? null : t;
      var r = n.memoizedState;
      return null !== r && null !== t && Li(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
    },
    useContext: Na,
    useEffect: function (e, t) {
      return Ki(516, xi | Ei, e, t);
    },
    useImperativeHandle: function (e, t, n) {
      return n = null != n ? n.concat([e]) : null, Ki(4, bi | ki, Xi.bind(null, t, e), n);
    },
    useLayoutEffect: function (e, t) {
      return Ki(4, bi | ki, e, t);
    },
    useMemo: function (e, t) {
      var n = Vi();
      t = void 0 === t ? null : t;
      var r = n.memoizedState;
      return null !== r && null !== t && Li(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
    },
    useReducer: Hi,
    useRef: function () {
      return Vi().memoizedState;
    },
    useState: function (e) {
      return Hi(Qi);
    },
    useDebugValue: Yi,
    useResponder: ir
  },
      to = null,
      no = null,
      ro = !1;

  function lo(e, t) {
    var n = lc(5, null, null, 0);
    n.elementType = "DELETED", n.type = "DELETED", n.stateNode = t, n.return = e, n.effectTag = 8, null !== e.lastEffect ? (e.lastEffect.nextEffect = n, e.lastEffect = n) : e.firstEffect = e.lastEffect = n;
  }

  function ao(e, t) {
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

  function io(e) {
    if (ro) {
      var t = no;

      if (t) {
        var n = t;

        if (!ao(e, t)) {
          if (!(t = Nl(n.nextSibling)) || !ao(e, t)) return e.effectTag |= 2, ro = !1, void (to = e);
          lo(to, n);
        }

        to = e, no = Nl(t.firstChild);
      } else e.effectTag |= 2, ro = !1, to = e;
    }
  }

  function oo(e) {
    for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag && 18 !== e.tag;) e = e.return;

    to = e;
  }

  function uo(e) {
    if (e !== to) return !1;
    if (!ro) return oo(e), ro = !0, !1;
    var t = e.type;
    if (5 !== e.tag || "head" !== t && "body" !== t && !Cl(t, e.memoizedProps)) for (t = no; t;) lo(e, t), t = Nl(t.nextSibling);
    return oo(e), no = to ? Nl(e.stateNode.nextSibling) : null, !0;
  }

  function co() {
    no = to = null, ro = !1;
  }

  var so = $t.ReactCurrentOwner,
      fo = !1;

  function po(e, t, n, r) {
    t.child = null === e ? ti(t, null, n, r) : ei(t, e.child, n, r);
  }

  function mo(e, t, n, r, l) {
    n = n.render;
    var a = t.ref;
    return Pa(t, l), r = ji(e, t, n, r, a, l), null === e || fo ? (t.effectTag |= 1, po(e, t, r, l), t.child) : (t.updateQueue = e.updateQueue, t.effectTag &= -517, e.expirationTime <= l && (e.expirationTime = 0), Co(e, t, l));
  }

  function ho(e, t, n, r, l, a) {
    if (null === e) {
      var i = n.type;
      return "function" != typeof i || ac(i) || void 0 !== i.defaultProps || null !== n.compare || void 0 !== n.defaultProps ? ((e = oc(n.type, null, r, null, t.mode, a)).ref = t.ref, e.return = t, t.child = e) : (t.tag = 15, t.type = i, yo(e, t, i, r, l, a));
    }

    return i = e.child, l < a && (l = i.memoizedProps, (n = null !== (n = n.compare) ? n : ar)(l, r) && e.ref === t.ref) ? Co(e, t, a) : (t.effectTag |= 1, (e = ic(i, r)).ref = t.ref, e.return = t, t.child = e);
  }

  function yo(e, t, n, r, l, a) {
    return null !== e && ar(e.memoizedProps, r) && e.ref === t.ref && (fo = !1, l < a) ? Co(e, t, a) : bo(e, t, n, r, a);
  }

  function vo(e, t) {
    var n = t.ref;
    (null === e && null !== n || null !== e && e.ref !== n) && (t.effectTag |= 128);
  }

  function bo(e, t, n, r, l) {
    var a = Ll(n) ? Fl : Dl.current;
    return a = Al(t, a), Pa(t, l), n = ji(e, t, n, r, a, l), null === e || fo ? (t.effectTag |= 1, po(e, t, n, l), t.child) : (t.updateQueue = e.updateQueue, t.effectTag &= -517, e.expirationTime <= l && (e.expirationTime = 0), Co(e, t, l));
  }

  function go(t, n, r, l, a) {
    if (Ll(r)) {
      var i = !0;
      Ql(n);
    } else i = !1;

    if (Pa(n, a), null === n.stateNode) null !== t && (t.alternate = null, n.alternate = null, n.effectTag |= 2), qa(n, r, l), Xa(n, r, l, a), l = !0;else if (null === t) {
      var o = n.stateNode,
          u = n.memoizedProps;
      o.props = u;
      var c = o.context,
          s = r.contextType;
      "object" === e(s) && null !== s ? s = Na(s) : s = Al(n, s = Ll(r) ? Fl : Dl.current);
      var f = r.getDerivedStateFromProps,
          d = "function" == typeof f || "function" == typeof o.getSnapshotBeforeUpdate;
      d || "function" != typeof o.UNSAFE_componentWillReceiveProps && "function" != typeof o.componentWillReceiveProps || (u !== l || c !== s) && Ka(n, o, l, s), Oa = !1;
      var p = n.memoizedState;
      c = o.state = p;
      var m = n.updateQueue;
      null !== m && (La(n, m, l, o, a), c = n.memoizedState), u !== l || p !== c || Ul.current || Oa ? ("function" == typeof f && (Qa(n, r, f, l), c = n.memoizedState), (u = Oa || $a(n, r, u, l, p, c, s)) ? (d || "function" != typeof o.UNSAFE_componentWillMount && "function" != typeof o.componentWillMount || ("function" == typeof o.componentWillMount && o.componentWillMount(), "function" == typeof o.UNSAFE_componentWillMount && o.UNSAFE_componentWillMount()), "function" == typeof o.componentDidMount && (n.effectTag |= 4)) : ("function" == typeof o.componentDidMount && (n.effectTag |= 4), n.memoizedProps = l, n.memoizedState = c), o.props = l, o.state = c, o.context = s, l = u) : ("function" == typeof o.componentDidMount && (n.effectTag |= 4), l = !1);
    } else o = n.stateNode, u = n.memoizedProps, o.props = n.type === n.elementType ? u : ga(n.type, u), c = o.context, s = r.contextType, "object" === e(s) && null !== s ? s = Na(s) : s = Al(n, s = Ll(r) ? Fl : Dl.current), (d = "function" == typeof (f = r.getDerivedStateFromProps) || "function" == typeof o.getSnapshotBeforeUpdate) || "function" != typeof o.UNSAFE_componentWillReceiveProps && "function" != typeof o.componentWillReceiveProps || (u !== l || c !== s) && Ka(n, o, l, s), Oa = !1, c = n.memoizedState, p = o.state = c, null !== (m = n.updateQueue) && (La(n, m, l, o, a), p = n.memoizedState), u !== l || c !== p || Ul.current || Oa ? ("function" == typeof f && (Qa(n, r, f, l), p = n.memoizedState), (f = Oa || $a(n, r, u, l, c, p, s)) ? (d || "function" != typeof o.UNSAFE_componentWillUpdate && "function" != typeof o.componentWillUpdate || ("function" == typeof o.componentWillUpdate && o.componentWillUpdate(l, p, s), "function" == typeof o.UNSAFE_componentWillUpdate && o.UNSAFE_componentWillUpdate(l, p, s)), "function" == typeof o.componentDidUpdate && (n.effectTag |= 4), "function" == typeof o.getSnapshotBeforeUpdate && (n.effectTag |= 256)) : ("function" != typeof o.componentDidUpdate || u === t.memoizedProps && c === t.memoizedState || (n.effectTag |= 4), "function" != typeof o.getSnapshotBeforeUpdate || u === t.memoizedProps && c === t.memoizedState || (n.effectTag |= 256), n.memoizedProps = l, n.memoizedState = p), o.props = l, o.state = p, o.context = s, l = f) : ("function" != typeof o.componentDidUpdate || u === t.memoizedProps && c === t.memoizedState || (n.effectTag |= 4), "function" != typeof o.getSnapshotBeforeUpdate || u === t.memoizedProps && c === t.memoizedState || (n.effectTag |= 256), l = !1);
    return wo(t, n, r, l, i, a);
  }

  function wo(e, t, n, r, l, a) {
    vo(e, t);
    var i = 0 != (64 & t.effectTag);
    if (!r && !i) return l && Hl(t, n, !1), Co(e, t, a);
    r = t.stateNode, so.current = t;
    var o = i && "function" != typeof n.getDerivedStateFromError ? null : r.render();
    return t.effectTag |= 1, null !== e && i ? (t.child = ei(t, e.child, null, a), t.child = ei(t, null, o, a)) : po(e, t, o, a), t.memoizedState = r.state, l && Hl(t, n, !0), t.child;
  }

  function ko(e) {
    var t = e.stateNode;
    t.pendingContext ? Bl(0, t.pendingContext, t.pendingContext !== t.context) : t.context && Bl(0, t.context, !1), oi(e, t.containerInfo);
  }

  var Eo = {};

  function xo(e, t, n) {
    var r,
        l = t.mode,
        a = t.pendingProps,
        i = mi.current,
        o = null,
        u = !1;
    if ((r = 0 != (64 & t.effectTag)) || (r = 0 != (i & pi) && (null === e || null !== e.memoizedState)), r ? (o = Eo, u = !0, t.effectTag &= -65) : null !== e && null === e.memoizedState || void 0 === a.fallback || !0 === a.unstable_avoidThisFallback || (i |= di), Ml(mi, i &= fi), null === e) {
      if (u) {
        if (a = a.fallback, (e = uc(null, l, 0, null)).return = t, 0 == (2 & t.mode)) for (u = null !== t.memoizedState ? t.child.child : t.child, e.child = u; null !== u;) u.return = e, u = u.sibling;
        (n = uc(a, l, n, null)).return = t, e.sibling = n, l = e;
      } else l = n = ti(t, null, a.children, n);
    } else {
      if (null !== e.memoizedState) {
        if (l = (i = e.child).sibling, u) {
          if (a = a.fallback, (n = ic(i, i.pendingProps)).return = t, 0 == (2 & t.mode) && (u = null !== t.memoizedState ? t.child.child : t.child) !== i.child) for (n.child = u; null !== u;) u.return = n, u = u.sibling;
          (a = ic(l, a, l.expirationTime)).return = t, n.sibling = a, l = n, n.childExpirationTime = 0, n = a;
        } else l = n = ei(t, i.child, a.children, n);
      } else if (i = e.child, u) {
        if (u = a.fallback, (a = uc(null, l, 0, null)).return = t, a.child = i, null !== i && (i.return = a), 0 == (2 & t.mode)) for (i = null !== t.memoizedState ? t.child.child : t.child, a.child = i; null !== i;) i.return = a, i = i.sibling;
        (n = uc(u, l, n, null)).return = t, a.sibling = n, n.effectTag |= 2, l = a, a.childExpirationTime = 0;
      } else n = l = ei(t, i, a.children, n);
      t.stateNode = e.stateNode;
    }
    return t.memoizedState = o, t.child = l, n;
  }

  function _o(e, t, n, r, l) {
    var a = e.memoizedState;
    null === a ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      last: r,
      tail: n,
      tailExpiration: 0,
      tailMode: l
    } : (a.isBackwards = t, a.rendering = null, a.last = r, a.tail = n, a.tailExpiration = 0, a.tailMode = l);
  }

  function To(e, t, n) {
    var r = t.pendingProps,
        l = r.revealOrder,
        a = r.tail;
    if (po(e, t, r.children, n), 0 != ((r = mi.current) & pi)) r = r & fi | pi, t.effectTag |= 64;else {
      if (null !== e && 0 != (64 & e.effectTag)) e: for (e = t.child; null !== e;) {
        if (13 === e.tag) {
          if (null !== e.memoizedState) {
            e.expirationTime < n && (e.expirationTime = n);
            var i = e.alternate;
            null !== i && i.expirationTime < n && (i.expirationTime = n), Sa(e.return, n);
          }
        } else if (null !== e.child) {
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
      r &= fi;
    }
    if (Ml(mi, r), 0 == (2 & t.mode)) t.memoizedState = null;else switch (l) {
      case "forwards":
        for (n = t.child, l = null; null !== n;) null !== (r = n.alternate) && null === hi(r) && (l = n), n = n.sibling;

        null === (n = l) ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), _o(t, !1, l, n, a);
        break;

      case "backwards":
        for (n = null, l = t.child, t.child = null; null !== l;) {
          if (null !== (r = l.alternate) && null === hi(r)) {
            t.child = l;
            break;
          }

          r = l.sibling, l.sibling = n, n = l, l = r;
        }

        _o(t, !0, n, null, a);

        break;

      case "together":
        _o(t, !1, null, null, void 0);

        break;

      default:
        t.memoizedState = null;
    }
    return t.child;
  }

  function Co(e, t, n) {
    if (null !== e && (t.dependencies = e.dependencies), t.childExpirationTime < n) return null;
    if (null !== e && t.child !== e.child) throw ie(Error(153));

    if (null !== t.child) {
      for (n = ic(e = t.child, e.pendingProps, e.expirationTime), t.child = n, n.return = t; null !== e.sibling;) e = e.sibling, (n = n.sibling = ic(e, e.pendingProps, e.expirationTime)).return = t;

      n.sibling = null;
    }

    return t.child;
  }

  function So(e) {
    e.effectTag |= 4;
  }

  var Po = void 0,
      No = void 0,
      Oo = void 0,
      Ro = void 0;

  function zo(e, t) {
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

  function Mo(e) {
    switch (e.tag) {
      case 1:
        Ll(e.type) && jl();
        var t = e.effectTag;
        return 2048 & t ? (e.effectTag = -2049 & t | 64, e) : null;

      case 3:
        if (ui(), Wl(), 0 != (64 & (t = e.effectTag))) throw ie(Error(285));
        return e.effectTag = -2049 & t | 64, e;

      case 5:
        return si(e), null;

      case 13:
        return zl(mi), 2048 & (t = e.effectTag) ? (e.effectTag = -2049 & t | 64, e) : null;

      case 18:
        return null;

      case 19:
        return zl(mi), null;

      case 4:
        return ui(), null;

      case 10:
        return Ca(e), null;

      default:
        return null;
    }
  }

  function Io(e, t) {
    return {
      value: e,
      source: t,
      stack: dn(t)
    };
  }

  Po = function (e, t) {
    for (var n = t.child; null !== n;) {
      if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);else if (20 === n.tag) e.appendChild(n.stateNode.instance);else if (4 !== n.tag && null !== n.child) {
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
  }, No = function () {}, Oo = function (e, t, n, r, l) {
    var a = e.memoizedProps;

    if (a !== r) {
      var i = t.stateNode;

      switch (ii(ri.current), e = null, n) {
        case "input":
          a = _n(i, a), r = _n(i, r), e = [];
          break;

        case "option":
          a = nl(i, a), r = nl(i, r), e = [];
          break;

        case "select":
          a = ne({}, a, {
            value: void 0
          }), r = ne({}, r, {
            value: void 0
          }), e = [];
          break;

        case "textarea":
          a = ll(i, a), r = ll(i, r), e = [];
          break;

        default:
          "function" != typeof a.onClick && "function" == typeof r.onClick && (i.onclick = El);
      }

      gl(n, r), i = n = void 0;
      var o = null;

      for (n in a) if (!r.hasOwnProperty(n) && a.hasOwnProperty(n) && null != a[n]) if ("style" === n) {
        var u = a[n];

        for (i in u) u.hasOwnProperty(i) && (o || (o = {}), o[i] = "");
      } else "dangerouslySetInnerHTML" !== n && "children" !== n && "suppressContentEditableWarning" !== n && "suppressHydrationWarning" !== n && "autoFocus" !== n && (pe.hasOwnProperty(n) ? e || (e = []) : (e = e || []).push(n, null));

      for (n in r) {
        var c = r[n];
        if (u = null != a ? a[n] : void 0, r.hasOwnProperty(n) && c !== u && (null != c || null != u)) if ("style" === n) {
          if (u) {
            for (i in u) !u.hasOwnProperty(i) || c && c.hasOwnProperty(i) || (o || (o = {}), o[i] = "");

            for (i in c) c.hasOwnProperty(i) && u[i] !== c[i] && (o || (o = {}), o[i] = c[i]);
          } else o || (e || (e = []), e.push(n, o)), o = c;
        } else "dangerouslySetInnerHTML" === n ? (c = c ? c.__html : void 0, u = u ? u.__html : void 0, null != c && u !== c && (e = e || []).push(n, "" + c)) : "children" === n ? u === c || "string" != typeof c && "number" != typeof c || (e = e || []).push(n, "" + c) : "suppressContentEditableWarning" !== n && "suppressHydrationWarning" !== n && (pe.hasOwnProperty(n) ? (null != c && kl(l, n), e || u === c || (e = [])) : (e = e || []).push(n, c));
      }

      o && (e = e || []).push("style", o), l = e, (t.updateQueue = l) && So(t);
    }
  }, Ro = function (e, t, n, r) {
    n !== r && So(t);
  };
  var Do = "function" == typeof WeakSet ? WeakSet : Set;

  function Uo(e, t) {
    var n = t.source,
        r = t.stack;
    null === r && null !== n && (r = dn(n)), null !== n && fn(n.type), t = t.value, null !== e && 1 === e.tag && fn(e.type);

    try {
      console.error(t);
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }

  function Fo(e) {
    var t = e.ref;
    if (null !== t) if ("function" == typeof t) try {
      t(null);
    } catch (t) {
      Gu(e, t);
    } else t.current = null;
  }

  function Ao(e, t, n) {
    if (null !== (n = null !== (n = n.updateQueue) ? n.lastEffect : null)) {
      var r = n = n.next;

      do {
        if ((r.tag & e) !== yi) {
          var l = r.destroy;
          r.destroy = void 0, void 0 !== l && l();
        }

        (r.tag & t) !== yi && (l = r.create, r.destroy = l()), r = r.next;
      } while (r !== n);
    }
  }

  function Lo(e, t) {
    switch ("function" == typeof nc && nc(e), e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        var n = e.updateQueue;

        if (null !== n && null !== (n = n.lastEffect)) {
          var r = n.next;
          pa(97 < t ? 97 : t, function () {
            var t = r;

            do {
              var n = t.destroy;

              if (void 0 !== n) {
                var l = e;

                try {
                  n();
                } catch (e) {
                  Gu(l, e);
                }
              }

              t = t.next;
            } while (t !== r);
          });
        }

        break;

      case 1:
        Fo(e), "function" == typeof (t = e.stateNode).componentWillUnmount && function (e, t) {
          try {
            t.props = e.memoizedProps, t.state = e.memoizedState, t.componentWillUnmount();
          } catch (t) {
            Gu(e, t);
          }
        }(e, t);
        break;

      case 5:
        Fo(e);
        break;

      case 4:
        Vo(e, t);
    }
  }

  function jo(e, t) {
    for (var n = e;;) if (Lo(n, t), null !== n.child && 4 !== n.tag) n.child.return = n, n = n.child;else {
      if (n === e) break;

      for (; null === n.sibling;) {
        if (null === n.return || n.return === e) return;
        n = n.return;
      }

      n.sibling.return = n.return, n = n.sibling;
    }
  }

  function Wo(e) {
    return 5 === e.tag || 3 === e.tag || 4 === e.tag;
  }

  function Bo(e) {
    e: {
      for (var t = e.return; null !== t;) {
        if (Wo(t)) {
          var n = t;
          break e;
        }

        t = t.return;
      }

      throw ie(Error(160));
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
        throw ie(Error(161));
    }

    16 & n.effectTag && (pl(t, ""), n.effectTag &= -17);

    e: t: for (n = e;;) {
      for (; null === n.sibling;) {
        if (null === n.return || Wo(n.return)) {
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

      if (a || 20 === l.tag) {
        var i = a ? l.stateNode : l.stateNode.instance;
        if (n) {
          if (r) {
            var o = i;
            i = n, 8 === (a = t).nodeType ? a.parentNode.insertBefore(o, i) : a.insertBefore(o, i);
          } else t.insertBefore(i, n);
        } else r ? (8 === (o = t).nodeType ? (a = o.parentNode).insertBefore(i, o) : (a = o).appendChild(i), null != (o = o._reactRootContainer) || null !== a.onclick || (a.onclick = El)) : t.appendChild(i);
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

  function Vo(e, t) {
    for (var n = e, r = !1, l = void 0, a = void 0;;) {
      if (!r) {
        r = n.return;

        e: for (;;) {
          if (null === r) throw ie(Error(160));

          switch (l = r.stateNode, r.tag) {
            case 5:
              a = !1;
              break e;

            case 3:
            case 4:
              l = l.containerInfo, a = !0;
              break e;
          }

          r = r.return;
        }

        r = !0;
      }

      if (5 === n.tag || 6 === n.tag) {
        if (jo(n, t), a) {
          var i = l,
              o = n.stateNode;
          8 === i.nodeType ? i.parentNode.removeChild(o) : i.removeChild(o);
        } else l.removeChild(n.stateNode);
      } else if (20 === n.tag) o = n.stateNode.instance, jo(n, t), a ? 8 === (i = l).nodeType ? i.parentNode.removeChild(o) : i.removeChild(o) : l.removeChild(o);else if (4 === n.tag) {
        if (null !== n.child) {
          l = n.stateNode.containerInfo, a = !0, n.child.return = n, n = n.child;
          continue;
        }
      } else if (Lo(n, t), null !== n.child) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === e) break;

      for (; null === n.sibling;) {
        if (null === n.return || n.return === e) return;
        4 === (n = n.return).tag && (r = !1);
      }

      n.sibling.return = n.return, n = n.sibling;
    }
  }

  function Qo(e, t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ao(bi, gi, t);
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
            for (n[De] = r, "input" === e && "radio" === r.type && null != r.name && Cn(n, r), wl(e, l), t = wl(e, r), l = 0; l < a.length; l += 2) {
              var i = a[l],
                  o = a[l + 1];
              "style" === i ? vl(n, o) : "dangerouslySetInnerHTML" === i ? dl(n, o) : "children" === i ? pl(n, o) : En(n, i, o, t);
            }

            switch (e) {
              case "input":
                Sn(n, r);
                break;

              case "textarea":
                il(n, r);
                break;

              case "select":
                t = n._wrapperState.wasMultiple, n._wrapperState.wasMultiple = !!r.multiple, null != (e = r.value) ? rl(n, !!r.multiple, e, !1) : t !== !!r.multiple && (null != r.defaultValue ? rl(n, !!r.multiple, r.defaultValue, !0) : rl(n, !!r.multiple, r.multiple ? [] : "", !1));
            }
          }
        }

        break;

      case 6:
        if (null === t.stateNode) throw ie(Error(162));
        t.stateNode.nodeValue = t.memoizedProps;
        break;

      case 3:
      case 12:
        break;

      case 13:
        if (n = t, null === t.memoizedState ? r = !1 : (r = !0, n = t.child, yu = sa()), null !== n) e: for (e = n;;) {
          if (5 === e.tag) a = e.stateNode, r ? "function" == typeof (a = a.style).setProperty ? a.setProperty("display", "none", "important") : a.display = "none" : (a = e.stateNode, l = null != (l = e.memoizedProps.style) && l.hasOwnProperty("display") ? l.display : null, a.style.display = yl("display", l));else if (6 === e.tag) e.stateNode.nodeValue = r ? "" : e.memoizedProps;else {
            if (13 === e.tag && null !== e.memoizedState) {
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
        Ho(t);
        break;

      case 19:
        Ho(t);
        break;

      case 17:
      case 20:
        break;

      default:
        throw ie(Error(163));
    }
  }

  function Ho(e) {
    var t = e.updateQueue;

    if (null !== t) {
      e.updateQueue = null;
      var n = e.stateNode;
      null === n && (n = e.stateNode = new Do()), t.forEach(function (t) {
        var r = Ju.bind(null, e, t);
        n.has(t) || (n.add(t), t.then(r, r));
      });
    }
  }

  var $o = "function" == typeof WeakMap ? WeakMap : Map;

  function qo(e, t, n) {
    (n = Ma(n, null)).tag = 3, n.payload = {
      element: null
    };
    var r = t.value;
    return n.callback = function () {
      gu || (gu = !0, wu = r), Uo(e, t);
    }, n;
  }

  function Ko(e, t, n) {
    (n = Ma(n, null)).tag = 3;
    var r = e.type.getDerivedStateFromError;

    if ("function" == typeof r) {
      var l = t.value;

      n.payload = function () {
        return Uo(e, t), r(l);
      };
    }

    var a = e.stateNode;
    return null !== a && "function" == typeof a.componentDidCatch && (n.callback = function () {
      "function" != typeof r && (null === ku ? ku = new Set([this]) : ku.add(this), Uo(e, t));
      var n = t.stack;
      this.componentDidCatch(t.value, {
        componentStack: null !== n ? n : ""
      });
    }), n;
  }

  var Xo = Math.ceil,
      Yo = $t.ReactCurrentDispatcher,
      Go = $t.ReactCurrentOwner,
      Zo = 0,
      Jo = 8,
      eu = 16,
      tu = 32,
      nu = 0,
      ru = 1,
      lu = 2,
      au = 3,
      iu = 4,
      ou = Zo,
      uu = null,
      cu = null,
      su = 0,
      fu = nu,
      du = 1073741823,
      pu = 1073741823,
      mu = null,
      hu = !1,
      yu = 0,
      vu = 500,
      bu = null,
      gu = !1,
      wu = null,
      ku = null,
      Eu = !1,
      xu = null,
      _u = 90,
      Tu = 0,
      Cu = null,
      Su = 0,
      Pu = null,
      Nu = 0;

  function Ou() {
    return (ou & (eu | tu)) !== Zo ? 1073741821 - (sa() / 10 | 0) : 0 !== Nu ? Nu : Nu = 1073741821 - (sa() / 10 | 0);
  }

  function Ru(e, t, n) {
    if (0 == (2 & (t = t.mode))) return 1073741823;
    var r = fa();
    if (0 == (4 & t)) return 99 === r ? 1073741823 : 1073741822;
    if ((ou & eu) !== Zo) return su;
    if (null !== n) e = 1073741821 - 25 * (1 + ((1073741821 - e + (0 | n.timeoutMs || 5e3) / 10) / 25 | 0));else switch (r) {
      case 99:
        e = 1073741823;
        break;

      case 98:
        e = 1073741821 - 10 * (1 + ((1073741821 - e + 15) / 10 | 0));
        break;

      case 97:
      case 96:
        e = 1073741821 - 25 * (1 + ((1073741821 - e + 500) / 25 | 0));
        break;

      case 95:
        e = 1;
        break;

      default:
        throw ie(Error(326));
    }
    return null !== uu && e === su && --e, e;
  }

  var zu = 0;

  function Mu(e, t) {
    if (50 < Su) throw Su = 0, Pu = null, ie(Error(185));

    if (null !== (e = Iu(e, t))) {
      e.pingTime = 0;
      var n = fa();
      if (1073741823 === t) {
        if ((ou & Jo) !== Zo && (ou & (eu | tu)) === Zo) for (var r = Bu(e, 1073741823, !0); null !== r;) r = r(!0);else Du(e, 99, 1073741823), ou === Zo && ya();
      } else Du(e, n, t);
      (4 & ou) === Zo || 98 !== n && 99 !== n || (null === Cu ? Cu = new Map([[e, t]]) : (void 0 === (n = Cu.get(e)) || n > t) && Cu.set(e, t));
    }
  }

  function Iu(e, t) {
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
    return null !== l && (t > l.firstPendingTime && (l.firstPendingTime = t), 0 === (e = l.lastPendingTime) || t < e) && (l.lastPendingTime = t), l;
  }

  function Du(e, t, n) {
    if (e.callbackExpirationTime < n) {
      var r = e.callbackNode;
      null !== r && r !== la && Kl(r), e.callbackExpirationTime = n, 1073741823 === n ? e.callbackNode = ha(Uu.bind(null, e, Bu.bind(null, e, n))) : (r = null, 1 !== n && (r = {
        timeout: 10 * (1073741821 - n) - sa()
      }), e.callbackNode = ma(t, Uu.bind(null, e, Bu.bind(null, e, n)), r));
    }
  }

  function Uu(e, t, n) {
    var r = e.callbackNode,
        l = null;

    try {
      return null !== (l = t(n)) ? Uu.bind(null, e, l) : null;
    } finally {
      null === l && r === e.callbackNode && (e.callbackNode = null, e.callbackExpirationTime = 0);
    }
  }

  function Fu() {
    (ou & (1 | eu | tu)) === Zo && (function () {
      if (null !== Cu) {
        var e = Cu;
        Cu = null, e.forEach(function (e, t) {
          ha(Bu.bind(null, t, e));
        }), ya();
      }
    }(), Ku());
  }

  function Au(e, t) {
    var n = ou;
    ou |= 1;

    try {
      return e(t);
    } finally {
      (ou = n) === Zo && ya();
    }
  }

  function Lu(e, t, n, r) {
    var l = ou;
    ou |= 4;

    try {
      return pa(98, e.bind(null, t, n, r));
    } finally {
      (ou = l) === Zo && ya();
    }
  }

  function ju(e, t) {
    var n = ou;
    ou &= -2, ou |= Jo;

    try {
      return e(t);
    } finally {
      (ou = n) === Zo && ya();
    }
  }

  function Wu(e, t) {
    e.finishedWork = null, e.finishedExpirationTime = 0;
    var n = e.timeoutHandle;
    if (-1 !== n && (e.timeoutHandle = -1, Pl(n)), null !== cu) for (n = cu.return; null !== n;) {
      var r = n;

      switch (r.tag) {
        case 1:
          var l = r.type.childContextTypes;
          null != l && jl();
          break;

        case 3:
          ui(), Wl();
          break;

        case 5:
          si(r);
          break;

        case 4:
          ui();
          break;

        case 13:
        case 19:
          zl(mi);
          break;

        case 10:
          Ca(r);
      }

      n = n.return;
    }
    uu = e, cu = ic(e.current, null), su = t, fu = nu, pu = du = 1073741823, mu = null, hu = !1;
  }

  function Bu(t, n, r) {
    if ((ou & (eu | tu)) !== Zo) throw ie(Error(327));
    if (t.firstPendingTime < n) return null;
    if (r && t.finishedExpirationTime === n) return $u.bind(null, t);
    if (Ku(), t !== uu || n !== su) Wu(t, n);else if (fu === au) if (hu) Wu(t, n);else {
      var l = t.lastPendingTime;
      if (l < n) return Bu.bind(null, t, l);
    }

    if (null !== cu) {
      l = ou, ou |= eu;
      var a = Yo.current;

      if (null === a && (a = Zi), Yo.current = Zi, r) {
        if (1073741823 !== n) {
          var i = Ou();
          if (i < n) return ou = l, _a(), Yo.current = a, Bu.bind(null, t, i);
        }
      } else Nu = 0;

      for (;;) try {
        if (r) for (; null !== cu;) cu = Qu(cu);else for (; null !== cu && !Xl();) cu = Qu(cu);
        break;
      } catch (r) {
        if (_a(), Wi(), null === (i = cu) || null === i.return) throw Wu(t, n), ou = l, r;

        e: {
          var o = t,
              u = i.return,
              c = i,
              s = r,
              f = su;

          if (c.effectTag |= 1024, c.firstEffect = c.lastEffect = null, null !== s && "object" === e(s) && "function" == typeof s.then) {
            var d = s,
                p = 0 != (mi.current & di);
            s = u;

            do {
              var m;

              if ((m = 13 === s.tag) && (null !== s.memoizedState ? m = !1 : m = void 0 !== (m = s.memoizedProps).fallback && (!0 !== m.unstable_avoidThisFallback || !p)), m) {
                if (null === (u = s.updateQueue) ? ((u = new Set()).add(d), s.updateQueue = u) : u.add(d), 0 == (2 & s.mode)) {
                  s.effectTag |= 64, c.effectTag &= -1957, 1 === c.tag && (null === c.alternate ? c.tag = 17 : ((f = Ma(1073741823, null)).tag = 2, Da(c, f))), c.expirationTime = 1073741823;
                  break e;
                }

                c = o, o = f, null === (p = c.pingCache) ? (p = c.pingCache = new $o(), u = new Set(), p.set(d, u)) : void 0 === (u = p.get(d)) && (u = new Set(), p.set(d, u)), u.has(o) || (u.add(o), c = Zu.bind(null, c, d, o), d.then(c, c)), s.effectTag |= 2048, s.expirationTime = f;
                break e;
              }

              s = s.return;
            } while (null !== s);

            s = Error((fn(c.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." + dn(c));
          }

          fu !== iu && (fu = ru), s = Io(s, c), c = u;

          do {
            switch (c.tag) {
              case 3:
                c.effectTag |= 2048, c.expirationTime = f, Ua(c, f = qo(c, s, f));
                break e;

              case 1:
                if (d = s, o = c.type, u = c.stateNode, 0 == (64 & c.effectTag) && ("function" == typeof o.getDerivedStateFromError || null !== u && "function" == typeof u.componentDidCatch && (null === ku || !ku.has(u)))) {
                  c.effectTag |= 2048, c.expirationTime = f, Ua(c, f = Ko(c, d, f));
                  break e;
                }

            }

            c = c.return;
          } while (null !== c);
        }

        cu = Hu(i);
      }

      if (ou = l, _a(), Yo.current = a, null !== cu) return Bu.bind(null, t, n);
    }

    if (t.finishedWork = t.current.alternate, t.finishedExpirationTime = n, function (e, t) {
      var n = e.firstBatch;
      return !!(null !== n && n._defer && n._expirationTime >= t) && (ma(97, function () {
        return n._onComplete(), null;
      }), !0);
    }(t, n)) return null;

    switch (uu = null, fu) {
      case nu:
        throw ie(Error(328));

      case ru:
        return (l = t.lastPendingTime) < n ? Bu.bind(null, t, l) : r ? $u.bind(null, t) : (Wu(t, n), ha(Bu.bind(null, t, n)), null);

      case lu:
        return 1073741823 === du && !r && 10 < (r = yu + vu - sa()) ? hu ? (Wu(t, n), Bu.bind(null, t, n)) : (l = t.lastPendingTime) < n ? Bu.bind(null, t, l) : (t.timeoutHandle = Sl($u.bind(null, t), r), null) : $u.bind(null, t);

      case au:
        if (!r) {
          if (hu) return Wu(t, n), Bu.bind(null, t, n);
          if ((r = t.lastPendingTime) < n) return Bu.bind(null, t, r);
          if (1073741823 !== pu ? r = 10 * (1073741821 - pu) - sa() : 1073741823 === du ? r = 0 : (r = 10 * (1073741821 - du) - 5e3, 0 > (r = (l = sa()) - r) && (r = 0), (n = 10 * (1073741821 - n) - l) < (r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Xo(r / 1960)) - r) && (r = n)), 10 < r) return t.timeoutHandle = Sl($u.bind(null, t), r), null;
        }

        return $u.bind(null, t);

      case iu:
        return !r && 1073741823 !== du && null !== mu && (l = du, 0 >= (n = 0 | (a = mu).busyMinDurationMs) ? n = 0 : (r = 0 | a.busyDelayMs, n = (l = sa() - (10 * (1073741821 - l) - (0 | a.timeoutMs || 5e3))) <= r ? 0 : r + n - l), 10 < n) ? (t.timeoutHandle = Sl($u.bind(null, t), n), null) : $u.bind(null, t);

      default:
        throw ie(Error(329));
    }
  }

  function Vu(e, t) {
    e < du && 1 < e && (du = e), null !== t && e < pu && 1 < e && (pu = e, mu = t);
  }

  function Qu(e) {
    var t = ec(e.alternate, e, su);
    return e.memoizedProps = e.pendingProps, null === t && (t = Hu(e)), Go.current = null, t;
  }

  function Hu(e) {
    cu = e;

    do {
      var t = cu.alternate;

      if (e = cu.return, 0 == (1024 & cu.effectTag)) {
        e: {
          var n = t,
              r = su,
              l = (t = cu).pendingProps;

          switch (t.tag) {
            case 2:
            case 16:
              break;

            case 15:
            case 0:
              break;

            case 1:
              Ll(t.type) && jl();
              break;

            case 3:
              ui(), Wl(), (r = t.stateNode).pendingContext && (r.context = r.pendingContext, r.pendingContext = null), null !== n && null !== n.child || (uo(t), t.effectTag &= -3), No(t);
              break;

            case 5:
              si(t), r = ii(ai.current);
              var a = t.type;
              if (null !== n && null != t.stateNode) Oo(n, t, a, l, r), n.ref !== t.ref && (t.effectTag |= 128);else if (l) {
                var i = ii(ri.current);

                if (uo(t)) {
                  l = void 0, a = (n = t).stateNode;
                  var o = n.type,
                      u = n.memoizedProps;

                  switch (a[Ie] = n, a[De] = u, o) {
                    case "iframe":
                    case "object":
                    case "embed":
                      Ur("load", a);
                      break;

                    case "video":
                    case "audio":
                      for (var c = 0; c < nt.length; c++) Ur(nt[c], a);

                      break;

                    case "source":
                      Ur("error", a);
                      break;

                    case "img":
                    case "image":
                    case "link":
                      Ur("error", a), Ur("load", a);
                      break;

                    case "form":
                      Ur("reset", a), Ur("submit", a);
                      break;

                    case "details":
                      Ur("toggle", a);
                      break;

                    case "input":
                      Tn(a, u), Ur("invalid", a), kl(r, "onChange");
                      break;

                    case "select":
                      a._wrapperState = {
                        wasMultiple: !!u.multiple
                      }, Ur("invalid", a), kl(r, "onChange");
                      break;

                    case "textarea":
                      al(a, u), Ur("invalid", a), kl(r, "onChange");
                  }

                  for (l in gl(o, u), c = null, u) u.hasOwnProperty(l) && (i = u[l], "children" === l ? "string" == typeof i ? a.textContent !== i && (c = ["children", i]) : "number" == typeof i && a.textContent !== "" + i && (c = ["children", "" + i]) : pe.hasOwnProperty(l) && null != i && kl(r, l));

                  switch (o) {
                    case "input":
                      Qt(a), Pn(a, u, !0);
                      break;

                    case "textarea":
                      Qt(a), ol(a);
                      break;

                    case "select":
                    case "option":
                      break;

                    default:
                      "function" == typeof u.onClick && (a.onclick = El);
                  }

                  r = c, n.updateQueue = r, null !== r && So(t);
                } else {
                  u = a, n = l, o = t, c = 9 === r.nodeType ? r : r.ownerDocument, i === ul.html && (i = cl(u)), i === ul.html ? "script" === u ? ((u = c.createElement("div")).innerHTML = "<script><\/script>", c = u.removeChild(u.firstChild)) : "string" == typeof n.is ? c = c.createElement(u, {
                    is: n.is
                  }) : (c = c.createElement(u), "select" === u && (u = c, n.multiple ? u.multiple = !0 : n.size && (u.size = n.size))) : c = c.createElementNS(i, u), (u = c)[Ie] = o, u[De] = n, Po(n = u, t, !1, !1), o = n;
                  var s = r,
                      f = wl(a, l);

                  switch (a) {
                    case "iframe":
                    case "object":
                    case "embed":
                      Ur("load", o), r = l;
                      break;

                    case "video":
                    case "audio":
                      for (r = 0; r < nt.length; r++) Ur(nt[r], o);

                      r = l;
                      break;

                    case "source":
                      Ur("error", o), r = l;
                      break;

                    case "img":
                    case "image":
                    case "link":
                      Ur("error", o), Ur("load", o), r = l;
                      break;

                    case "form":
                      Ur("reset", o), Ur("submit", o), r = l;
                      break;

                    case "details":
                      Ur("toggle", o), r = l;
                      break;

                    case "input":
                      Tn(o, l), r = _n(o, l), Ur("invalid", o), kl(s, "onChange");
                      break;

                    case "option":
                      r = nl(o, l);
                      break;

                    case "select":
                      o._wrapperState = {
                        wasMultiple: !!l.multiple
                      }, r = ne({}, l, {
                        value: void 0
                      }), Ur("invalid", o), kl(s, "onChange");
                      break;

                    case "textarea":
                      al(o, l), r = ll(o, l), Ur("invalid", o), kl(s, "onChange");
                      break;

                    default:
                      r = l;
                  }

                  gl(a, r), u = void 0, c = a, i = o;
                  var d = r;

                  for (u in d) if (d.hasOwnProperty(u)) {
                    var p = d[u];
                    "style" === u ? vl(i, p) : "dangerouslySetInnerHTML" === u ? null != (p = p ? p.__html : void 0) && dl(i, p) : "children" === u ? "string" == typeof p ? ("textarea" !== c || "" !== p) && pl(i, p) : "number" == typeof p && pl(i, "" + p) : "suppressContentEditableWarning" !== u && "suppressHydrationWarning" !== u && "autoFocus" !== u && (pe.hasOwnProperty(u) ? null != p && kl(s, u) : null != p && En(i, u, p, f));
                  }

                  switch (a) {
                    case "input":
                      Qt(o), Pn(o, l, !1);
                      break;

                    case "textarea":
                      Qt(o), ol(o);
                      break;

                    case "option":
                      null != l.value && o.setAttribute("value", "" + xn(l.value));
                      break;

                    case "select":
                      r = o, o = l, r.multiple = !!o.multiple, null != (u = o.value) ? rl(r, !!o.multiple, u, !1) : null != o.defaultValue && rl(r, !!o.multiple, o.defaultValue, !0);
                      break;

                    default:
                      "function" == typeof r.onClick && (o.onclick = El);
                  }

                  Tl(a, l) && So(t), t.stateNode = n;
                }

                null !== t.ref && (t.effectTag |= 128);
              } else if (null === t.stateNode) throw ie(Error(166));
              break;

            case 6:
              if (n && null != t.stateNode) Ro(n, t, n.memoizedProps, l);else {
                if ("string" != typeof l && null === t.stateNode) throw ie(Error(166));
                n = ii(ai.current), ii(ri.current), uo(t) ? (r = t.stateNode, n = t.memoizedProps, r[Ie] = t, r.nodeValue !== n && So(t)) : (r = t, (n = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(l))[Ie] = t, r.stateNode = n);
              }
              break;

            case 11:
              break;

            case 13:
              if (zl(mi), l = t.memoizedState, 0 != (64 & t.effectTag)) {
                t.expirationTime = r;
                break e;
              }

              r = null !== l, l = !1, null === n ? uo(t) : (l = null !== (a = n.memoizedState), r || null === a || null !== (a = n.child.sibling) && (null !== (o = t.firstEffect) ? (t.firstEffect = a, a.nextEffect = o) : (t.firstEffect = t.lastEffect = a, a.nextEffect = null), a.effectTag = 8)), r && !l && 0 != (2 & t.mode) && (null === n && !0 !== t.memoizedProps.unstable_avoidThisFallback || 0 != (mi.current & di) ? fu === nu && (fu = lu) : fu !== nu && fu !== lu || (fu = au)), (r || l) && (t.effectTag |= 4);
              break;

            case 7:
            case 8:
            case 12:
              break;

            case 4:
              ui(), No(t);
              break;

            case 10:
              Ca(t);
              break;

            case 9:
            case 14:
              break;

            case 17:
              Ll(t.type) && jl();
              break;

            case 18:
              break;

            case 19:
              if (zl(mi), null === (l = t.memoizedState)) break;

              if (a = 0 != (64 & t.effectTag), null === (o = l.rendering)) {
                if (a) zo(l, !1);else if (fu !== nu || null !== n && 0 != (64 & n.effectTag)) for (n = t.child; null !== n;) {
                  if (null !== (o = hi(n))) {
                    for (t.effectTag |= 64, zo(l, !1), null !== (n = o.updateQueue) && (t.updateQueue = n, t.effectTag |= 4), t.firstEffect = t.lastEffect = null, n = t.child; null !== n;) a = r, (l = n).effectTag &= 2, l.nextEffect = null, l.firstEffect = null, l.lastEffect = null, null === (o = l.alternate) ? (l.childExpirationTime = 0, l.expirationTime = a, l.child = null, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null) : (l.childExpirationTime = o.childExpirationTime, l.expirationTime = o.expirationTime, l.child = o.child, l.memoizedProps = o.memoizedProps, l.memoizedState = o.memoizedState, l.updateQueue = o.updateQueue, a = o.dependencies, l.dependencies = null === a ? null : {
                      expirationTime: a.expirationTime,
                      firstContext: a.firstContext,
                      responders: a.responders
                    }), n = n.sibling;

                    Ml(mi, mi.current & fi | pi), t = t.child;
                    break e;
                  }

                  n = n.sibling;
                }
              } else {
                if (!a) if (null !== (n = hi(o))) {
                  if (t.effectTag |= 64, a = !0, zo(l, !0), null === l.tail && "hidden" === l.tailMode) {
                    null !== (r = n.updateQueue) && (t.updateQueue = r, t.effectTag |= 4), null !== (t = t.lastEffect = l.lastEffect) && (t.nextEffect = null);
                    break;
                  }
                } else sa() > l.tailExpiration && 1 < r && (t.effectTag |= 64, a = !0, zo(l, !1), t.expirationTime = t.childExpirationTime = r - 1);
                l.isBackwards ? (o.sibling = t.child, t.child = o) : (null !== (r = l.last) ? r.sibling = o : t.child = o, l.last = o);
              }

              if (null !== l.tail) {
                0 === l.tailExpiration && (l.tailExpiration = sa() + 500), r = l.tail, l.rendering = r, l.tail = r.sibling, l.lastEffect = t.lastEffect, r.sibling = null, n = mi.current, Ml(mi, n = a ? n & fi | pi : n & fi), t = r;
                break e;
              }

              break;

            case 20:
              break;

            default:
              throw ie(Error(156));
          }

          t = null;
        }

        if (r = cu, 1 === su || 1 !== r.childExpirationTime) {
          for (n = 0, l = r.child; null !== l;) (a = l.expirationTime) > n && (n = a), (o = l.childExpirationTime) > n && (n = o), l = l.sibling;

          r.childExpirationTime = n;
        }

        if (null !== t) return t;
        null !== e && 0 == (1024 & e.effectTag) && (null === e.firstEffect && (e.firstEffect = cu.firstEffect), null !== cu.lastEffect && (null !== e.lastEffect && (e.lastEffect.nextEffect = cu.firstEffect), e.lastEffect = cu.lastEffect), 1 < cu.effectTag && (null !== e.lastEffect ? e.lastEffect.nextEffect = cu : e.firstEffect = cu, e.lastEffect = cu));
      } else {
        if (null !== (t = Mo(cu))) return t.effectTag &= 1023, t;
        null !== e && (e.firstEffect = e.lastEffect = null, e.effectTag |= 1024);
      }

      if (null !== (t = cu.sibling)) return t;
      cu = e;
    } while (null !== cu);

    return fu === nu && (fu = iu), null;
  }

  function $u(e) {
    var t = fa();
    return pa(99, qu.bind(null, e, t)), null !== xu && ma(97, function () {
      return Ku(), null;
    }), null;
  }

  function qu(e, t) {
    if (Ku(), (ou & (eu | tu)) !== Zo) throw ie(Error(327));
    var n = e.finishedWork,
        r = e.finishedExpirationTime;
    if (null === n) return null;
    if (e.finishedWork = null, e.finishedExpirationTime = 0, n === e.current) throw ie(Error(177));
    e.callbackNode = null, e.callbackExpirationTime = 0;
    var l = n.expirationTime,
        a = n.childExpirationTime;

    if (l = a > l ? a : l, e.firstPendingTime = l, l < e.lastPendingTime && (e.lastPendingTime = l), e === uu && (cu = uu = null, su = 0), 1 < n.effectTag ? null !== n.lastEffect ? (n.lastEffect.nextEffect = n, l = n.firstEffect) : l = n : l = n.firstEffect, null !== l) {
      a = ou, ou |= tu, Go.current = null, xl = Dr;
      var i = $r();

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

      _l = {
        focusedElem: i,
        selectionRange: o
      }, Dr = !1, bu = l;

      do {
        try {
          for (; null !== bu;) {
            if (0 != (256 & bu.effectTag)) {
              var g = bu.alternate;

              switch ((i = bu).tag) {
                case 0:
                case 11:
                case 15:
                  Ao(vi, yi, i);
                  break;

                case 1:
                  if (256 & i.effectTag && null !== g) {
                    var w = g.memoizedProps,
                        k = g.memoizedState,
                        E = i.stateNode,
                        x = E.getSnapshotBeforeUpdate(i.elementType === i.type ? w : ga(i.type, w), k);
                    E.__reactInternalSnapshotBeforeUpdate = x;
                  }

                  break;

                case 3:
                case 5:
                case 6:
                case 4:
                case 17:
                  break;

                default:
                  throw ie(Error(163));
              }
            }

            bu = bu.nextEffect;
          }
        } catch (e) {
          if (null === bu) throw ie(Error(330));
          Gu(bu, e), bu = bu.nextEffect;
        }
      } while (null !== bu);

      bu = l;

      do {
        try {
          for (g = t; null !== bu;) {
            var _ = bu.effectTag;

            if (16 & _ && pl(bu.stateNode, ""), 128 & _) {
              var T = bu.alternate;

              if (null !== T) {
                var C = T.ref;
                null !== C && ("function" == typeof C ? C(null) : C.current = null);
              }
            }

            switch (14 & _) {
              case 2:
                Bo(bu), bu.effectTag &= -3;
                break;

              case 6:
                Bo(bu), bu.effectTag &= -3, Qo(bu.alternate, bu);
                break;

              case 4:
                Qo(bu.alternate, bu);
                break;

              case 8:
                Vo(w = bu, g), w.return = null, w.child = null, w.memoizedState = null, w.updateQueue = null, w.dependencies = null;
                var S = w.alternate;
                null !== S && (S.return = null, S.child = null, S.memoizedState = null, S.updateQueue = null, S.dependencies = null);
            }

            bu = bu.nextEffect;
          }
        } catch (e) {
          if (null === bu) throw ie(Error(330));
          Gu(bu, e), bu = bu.nextEffect;
        }
      } while (null !== bu);

      if (C = _l, T = $r(), _ = C.focusedElem, g = C.selectionRange, T !== _ && _ && _.ownerDocument && function e(t, n) {
        return !(!t || !n) && (t === n || (!t || 3 !== t.nodeType) && (n && 3 === n.nodeType ? e(t, n.parentNode) : "contains" in t ? t.contains(n) : !!t.compareDocumentPosition && !!(16 & t.compareDocumentPosition(n))));
      }(_.ownerDocument.documentElement, _)) {
        null !== g && qr(_) && (T = g.start, void 0 === (C = g.end) && (C = T), "selectionStart" in _ ? (_.selectionStart = T, _.selectionEnd = Math.min(C, _.value.length)) : (C = (T = _.ownerDocument || document) && T.defaultView || window).getSelection && (C = C.getSelection(), w = _.textContent.length, S = Math.min(g.start, w), g = void 0 === g.end ? S : Math.min(g.end, w), !C.extend && S > g && (w = g, g = S, S = w), w = Hr(_, S), k = Hr(_, g), w && k && (1 !== C.rangeCount || C.anchorNode !== w.node || C.anchorOffset !== w.offset || C.focusNode !== k.node || C.focusOffset !== k.offset) && ((T = T.createRange()).setStart(w.node, w.offset), C.removeAllRanges(), S > g ? (C.addRange(T), C.extend(k.node, k.offset)) : (T.setEnd(k.node, k.offset), C.addRange(T))))), T = [];

        for (C = _; C = C.parentNode;) 1 === C.nodeType && T.push({
          element: C,
          left: C.scrollLeft,
          top: C.scrollTop
        });

        for ("function" == typeof _.focus && _.focus(), _ = 0; _ < T.length; _++) (C = T[_]).element.scrollLeft = C.left, C.element.scrollTop = C.top;
      }

      _l = null, Dr = !!xl, xl = null, e.current = n, bu = l;

      do {
        try {
          for (_ = r; null !== bu;) {
            var P = bu.effectTag;

            if (36 & P) {
              var N = bu.alternate;

              switch (C = _, (T = bu).tag) {
                case 0:
                case 11:
                case 15:
                  Ao(wi, ki, T);
                  break;

                case 1:
                  var O = T.stateNode;
                  if (4 & T.effectTag) if (null === N) O.componentDidMount();else {
                    var R = T.elementType === T.type ? N.memoizedProps : ga(T.type, N.memoizedProps);
                    O.componentDidUpdate(R, N.memoizedState, O.__reactInternalSnapshotBeforeUpdate);
                  }
                  var z = T.updateQueue;
                  null !== z && ja(0, z, O);
                  break;

                case 3:
                  var M = T.updateQueue;

                  if (null !== M) {
                    if (S = null, null !== T.child) switch (T.child.tag) {
                      case 5:
                        S = T.child.stateNode;
                        break;

                      case 1:
                        S = T.child.stateNode;
                    }
                    ja(0, M, S);
                  }

                  break;

                case 5:
                  var I = T.stateNode;
                  null === N && 4 & T.effectTag && (C = I, Tl(T.type, T.memoizedProps) && C.focus());
                  break;

                case 6:
                case 4:
                case 12:
                  break;

                case 13:
                case 19:
                case 17:
                case 20:
                  break;

                default:
                  throw ie(Error(163));
              }
            }

            if (128 & P) {
              var D = bu.ref;

              if (null !== D) {
                var U = bu.stateNode;

                switch (bu.tag) {
                  case 5:
                    var F = U;
                    break;

                  default:
                    F = U;
                }

                "function" == typeof D ? D(F) : D.current = F;
              }
            }

            512 & P && (Eu = !0), bu = bu.nextEffect;
          }
        } catch (e) {
          if (null === bu) throw ie(Error(330));
          Gu(bu, e), bu = bu.nextEffect;
        }
      } while (null !== bu);

      bu = null, aa(), ou = a;
    } else e.current = n;

    if (Eu) Eu = !1, xu = e, Tu = r, _u = t;else for (bu = l; null !== bu;) t = bu.nextEffect, bu.nextEffect = null, bu = t;
    if (0 !== (t = e.firstPendingTime) ? Du(e, P = ba(P = Ou(), t), t) : ku = null, "function" == typeof tc && tc(n.stateNode, r), 1073741823 === t ? e === Pu ? Su++ : (Su = 0, Pu = e) : Su = 0, gu) throw gu = !1, e = wu, wu = null, e;
    return (ou & Jo) !== Zo ? null : (ya(), null);
  }

  function Ku() {
    if (null === xu) return !1;
    var e = xu,
        t = Tu,
        n = _u;
    return xu = null, Tu = 0, _u = 90, pa(97 < n ? 97 : n, Xu.bind(null, e, t));
  }

  function Xu(e) {
    if ((ou & (eu | tu)) !== Zo) throw ie(Error(331));
    var t = ou;

    for (ou |= tu, e = e.current.firstEffect; null !== e;) {
      try {
        var n = e;
        if (0 != (512 & n.effectTag)) switch (n.tag) {
          case 0:
          case 11:
          case 15:
            Ao(xi, yi, n), Ao(yi, Ei, n);
        }
      } catch (t) {
        if (null === e) throw ie(Error(330));
        Gu(e, t);
      }

      n = e.nextEffect, e.nextEffect = null, e = n;
    }

    return ou = t, ya(), !0;
  }

  function Yu(e, t, n) {
    Da(e, t = qo(e, t = Io(n, t), 1073741823)), null !== (e = Iu(e, 1073741823)) && Du(e, 99, 1073741823);
  }

  function Gu(e, t) {
    if (3 === e.tag) Yu(e, e, t);else for (var n = e.return; null !== n;) {
      if (3 === n.tag) {
        Yu(n, e, t);
        break;
      }

      if (1 === n.tag) {
        var r = n.stateNode;

        if ("function" == typeof n.type.getDerivedStateFromError || "function" == typeof r.componentDidCatch && (null === ku || !ku.has(r))) {
          Da(n, e = Ko(n, e = Io(t, e), 1073741823)), null !== (n = Iu(n, 1073741823)) && Du(n, 99, 1073741823);
          break;
        }
      }

      n = n.return;
    }
  }

  function Zu(e, t, n) {
    var r = e.pingCache;
    null !== r && r.delete(t), uu === e && su === n ? fu === au || fu === lu && 1073741823 === du && sa() - yu < vu ? Wu(e, su) : hu = !0 : e.lastPendingTime < n || 0 !== (t = e.pingTime) && t < n || (e.pingTime = n, e.finishedExpirationTime === n && (e.finishedExpirationTime = 0, e.finishedWork = null), Du(e, t = ba(t = Ou(), n), n));
  }

  function Ju(e, t) {
    var n = e.stateNode;
    null !== n && n.delete(t), n = ba(n = Ou(), t = Ru(n, e, null)), null !== (e = Iu(e, t)) && Du(e, n, t);
  }

  var ec = void 0;

  ec = function (t, n, r) {
    var l = n.expirationTime;

    if (null !== t) {
      var a = n.pendingProps;
      if (t.memoizedProps !== a || Ul.current) fo = !0;else if (l < r) {
        switch (fo = !1, n.tag) {
          case 3:
            ko(n), co();
            break;

          case 5:
            if (ci(n), 4 & n.mode && 1 !== r && a.hidden) return n.expirationTime = n.childExpirationTime = 1, null;
            break;

          case 1:
            Ll(n.type) && Ql(n);
            break;

          case 4:
            oi(n, n.stateNode.containerInfo);
            break;

          case 10:
            Ta(n, n.memoizedProps.value);
            break;

          case 13:
            if (null !== n.memoizedState) return 0 !== (l = n.child.childExpirationTime) && l >= r ? xo(t, n, r) : (Ml(mi, mi.current & fi), null !== (n = Co(t, n, r)) ? n.sibling : null);
            Ml(mi, mi.current & fi);
            break;

          case 19:
            if (l = n.childExpirationTime >= r, 0 != (64 & t.effectTag)) {
              if (l) return To(t, n, r);
              n.effectTag |= 64;
            }

            if (null !== (a = n.memoizedState) && (a.rendering = null, a.tail = null), Ml(mi, mi.current), !l) return null;
        }

        return Co(t, n, r);
      }
    } else fo = !1;

    switch (n.expirationTime = 0, n.tag) {
      case 2:
        if (l = n.type, null !== t && (t.alternate = null, n.alternate = null, n.effectTag |= 2), t = n.pendingProps, a = Al(n, Dl.current), Pa(n, r), a = ji(null, n, l, t, a, r), n.effectTag |= 1, "object" === e(a) && null !== a && "function" == typeof a.render && void 0 === a.$$typeof) {
          if (n.tag = 1, Wi(), Ll(l)) {
            var i = !0;
            Ql(n);
          } else i = !1;

          n.memoizedState = null !== a.state && void 0 !== a.state ? a.state : null;
          var o = l.getDerivedStateFromProps;
          "function" == typeof o && Qa(n, l, o, t), a.updater = Ha, n.stateNode = a, a._reactInternalFiber = n, Xa(n, l, t, r), n = wo(null, n, l, !0, i, r);
        } else n.tag = 0, po(null, n, a, r), n = n.child;

        return n;

      case 16:
        switch (a = n.elementType, null !== t && (t.alternate = null, n.alternate = null, n.effectTag |= 2), t = n.pendingProps, a = function (e) {
          var t = e._result;

          switch (e._status) {
            case 1:
              return t;

            case 2:
            case 0:
              throw t;

            default:
              switch (e._status = 0, (t = (t = e._ctor)()).then(function (t) {
                0 === e._status && (t = t.default, e._status = 1, e._result = t);
              }, function (t) {
                0 === e._status && (e._status = 2, e._result = t);
              }), e._status) {
                case 1:
                  return e._result;

                case 2:
                  throw e._result;
              }

              throw e._result = t, t;
          }
        }(a), n.type = a, i = n.tag = function (e) {
          if ("function" == typeof e) return ac(e) ? 1 : 0;

          if (null != e) {
            if ((e = e.$$typeof) === rn) return 11;
            if (e === on) return 14;
          }

          return 2;
        }(a), t = ga(a, t), i) {
          case 0:
            n = bo(null, n, a, t, r);
            break;

          case 1:
            n = go(null, n, a, t, r);
            break;

          case 11:
            n = mo(null, n, a, t, r);
            break;

          case 14:
            n = ho(null, n, a, ga(a.type, t), l, r);
            break;

          default:
            throw ie(Error(306), a, "");
        }

        return n;

      case 0:
        return l = n.type, a = n.pendingProps, bo(t, n, l, a = n.elementType === l ? a : ga(l, a), r);

      case 1:
        return l = n.type, a = n.pendingProps, go(t, n, l, a = n.elementType === l ? a : ga(l, a), r);

      case 3:
        if (ko(n), null === (l = n.updateQueue)) throw ie(Error(282));
        return a = null !== (a = n.memoizedState) ? a.element : null, La(n, l, n.pendingProps, null, r), (l = n.memoizedState.element) === a ? (co(), n = Co(t, n, r)) : (a = n.stateNode, (a = (null === t || null === t.child) && a.hydrate) && (no = Nl(n.stateNode.containerInfo.firstChild), to = n, a = ro = !0), a ? (n.effectTag |= 2, n.child = ti(n, null, l, r)) : (po(t, n, l, r), co()), n = n.child), n;

      case 5:
        return ci(n), null === t && io(n), l = n.type, a = n.pendingProps, i = null !== t ? t.memoizedProps : null, o = a.children, Cl(l, a) ? o = null : null !== i && Cl(l, i) && (n.effectTag |= 16), vo(t, n), 4 & n.mode && 1 !== r && a.hidden ? (n.expirationTime = n.childExpirationTime = 1, n = null) : (po(t, n, o, r), n = n.child), n;

      case 6:
        return null === t && io(n), null;

      case 13:
        return xo(t, n, r);

      case 4:
        return oi(n, n.stateNode.containerInfo), l = n.pendingProps, null === t ? n.child = ei(n, null, l, r) : po(t, n, l, r), n.child;

      case 11:
        return l = n.type, a = n.pendingProps, mo(t, n, l, a = n.elementType === l ? a : ga(l, a), r);

      case 7:
        return po(t, n, n.pendingProps, r), n.child;

      case 8:
      case 12:
        return po(t, n, n.pendingProps.children, r), n.child;

      case 10:
        e: {
          if (l = n.type._context, a = n.pendingProps, o = n.memoizedProps, Ta(n, i = a.value), null !== o) {
            var u = o.value;

            if (0 === (i = rr(u, i) ? 0 : 0 | ("function" == typeof l._calculateChangedBits ? l._calculateChangedBits(u, i) : 1073741823))) {
              if (o.children === a.children && !Ul.current) {
                n = Co(t, n, r);
                break e;
              }
            } else for (null !== (u = n.child) && (u.return = n); null !== u;) {
              var c = u.dependencies;

              if (null !== c) {
                o = u.child;

                for (var s = c.firstContext; null !== s;) {
                  if (s.context === l && 0 != (s.observedBits & i)) {
                    1 === u.tag && ((s = Ma(r, null)).tag = 2, Da(u, s)), u.expirationTime < r && (u.expirationTime = r), null !== (s = u.alternate) && s.expirationTime < r && (s.expirationTime = r), Sa(u.return, r), c.expirationTime < r && (c.expirationTime = r);
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

          po(t, n, a.children, r), n = n.child;
        }

        return n;

      case 9:
        return a = n.type, l = (i = n.pendingProps).children, Pa(n, r), l = l(a = Na(a, i.unstable_observedBits)), n.effectTag |= 1, po(t, n, l, r), n.child;

      case 14:
        return i = ga(a = n.type, n.pendingProps), ho(t, n, a, i = ga(a.type, i), l, r);

      case 15:
        return yo(t, n, n.type, n.pendingProps, l, r);

      case 17:
        return l = n.type, a = n.pendingProps, a = n.elementType === l ? a : ga(l, a), null !== t && (t.alternate = null, n.alternate = null, n.effectTag |= 2), n.tag = 1, Ll(l) ? (t = !0, Ql(n)) : t = !1, Pa(n, r), qa(n, l, a), Xa(n, l, a, r), wo(null, n, l, !0, t, r);

      case 19:
        return To(t, n, r);
    }

    throw ie(Error(156));
  };

  var tc = null,
      nc = null;

  function rc(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.effectTag = 0, this.lastEffect = this.firstEffect = this.nextEffect = null, this.childExpirationTime = this.expirationTime = 0, this.alternate = null;
  }

  function lc(e, t, n, r) {
    return new rc(e, t, n, r);
  }

  function ac(e) {
    return !(!(e = e.prototype) || !e.isReactComponent);
  }

  function ic(e, t) {
    var n = e.alternate;
    return null === n ? ((n = lc(e.tag, t, e.key, e.mode)).elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.effectTag = 0, n.nextEffect = null, n.firstEffect = null, n.lastEffect = null), n.childExpirationTime = e.childExpirationTime, n.expirationTime = e.expirationTime, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = null === t ? null : {
      expirationTime: t.expirationTime,
      firstContext: t.firstContext,
      responders: t.responders
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }

  function oc(t, n, r, l, a, i) {
    var o = 2;
    if (l = t, "function" == typeof t) ac(t) && (o = 1);else if ("string" == typeof t) o = 5;else e: switch (t) {
      case Gt:
        return uc(r.children, a, i, n);

      case nn:
        o = 8, a |= 7;
        break;

      case Zt:
        o = 8, a |= 1;
        break;

      case Jt:
        return (t = lc(12, r, n, 8 | a)).elementType = Jt, t.type = Jt, t.expirationTime = i, t;

      case ln:
        return (t = lc(13, r, n, a)).type = ln, t.elementType = ln, t.expirationTime = i, t;

      case an:
        return (t = lc(19, r, n, a)).elementType = an, t.expirationTime = i, t;

      default:
        if ("object" === e(t) && null !== t) switch (t.$$typeof) {
          case en:
            o = 10;
            break e;

          case tn:
            o = 9;
            break e;

          case rn:
            o = 11;
            break e;

          case on:
            o = 14;
            break e;

          case un:
            o = 16, l = null;
            break e;
        }
        throw ie(Error(130), null == t ? t : e(t), "");
    }
    return (n = lc(o, r, n, a)).elementType = t, n.type = l, n.expirationTime = i, n;
  }

  function uc(e, t, n, r) {
    return (e = lc(7, e, r, t)).expirationTime = n, e;
  }

  function cc(e, t, n) {
    return (e = lc(6, e, null, t)).expirationTime = n, e;
  }

  function sc(e, t, n) {
    return (t = lc(4, null !== e.children ? e.children : [], e.key, t)).expirationTime = n, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }

  function fc(e, t, n) {
    this.tag = t, this.current = null, this.containerInfo = e, this.pingCache = this.pendingChildren = null, this.finishedExpirationTime = 0, this.finishedWork = null, this.timeoutHandle = -1, this.pendingContext = this.context = null, this.hydrate = n, this.callbackNode = this.firstBatch = null, this.pingTime = this.lastPendingTime = this.firstPendingTime = this.callbackExpirationTime = 0;
  }

  function dc(e, t, n) {
    return e = new fc(e, t, n), t = lc(3, null, null, 2 === t ? 7 : 1 === t ? 3 : 0), e.current = t, t.stateNode = e;
  }

  function pc(e, t, n, r, l, a) {
    var i = t.current;

    e: if (n) {
      t: {
        if (2 !== or(n = n._reactInternalFiber) || 1 !== n.tag) throw ie(Error(170));
        var o = n;

        do {
          switch (o.tag) {
            case 3:
              o = o.stateNode.context;
              break t;

            case 1:
              if (Ll(o.type)) {
                o = o.stateNode.__reactInternalMemoizedMergedChildContext;
                break t;
              }

          }

          o = o.return;
        } while (null !== o);

        throw ie(Error(171));
      }

      if (1 === n.tag) {
        var u = n.type;

        if (Ll(u)) {
          n = Vl(n, u, o);
          break e;
        }
      }

      n = o;
    } else n = Il;

    return null === t.context ? t.context = n : t.pendingContext = n, t = a, (l = Ma(r, l)).payload = {
      element: e
    }, null !== (t = void 0 === t ? null : t) && (l.callback = t), Da(i, l), Mu(i, r), r;
  }

  function mc(e, t, n, r) {
    var l = t.current,
        a = Ou(),
        i = Ba.suspense;
    return pc(e, t, n, l = Ru(a, l, i), i, r);
  }

  function hc(e) {
    if (!(e = e.current).child) return null;

    switch (e.child.tag) {
      case 5:
      default:
        return e.child.stateNode;
    }
  }

  function yc(e) {
    var t = 1073741821 - 25 * (1 + ((1073741821 - Ou() + 500) / 25 | 0));
    t <= zu && --t, this._expirationTime = zu = t, this._root = e, this._callbacks = this._next = null, this._hasChildren = this._didComplete = !1, this._children = null, this._defer = !0;
  }

  function vc() {
    this._callbacks = null, this._didCommit = !1, this._onCommit = this._onCommit.bind(this);
  }

  function bc(e, t, n) {
    this._internalRoot = dc(e, t, n);
  }

  function gc(e, t) {
    this._internalRoot = dc(e, 2, t);
  }

  function wc(e) {
    return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue));
  }

  function kc(e, t, n, r, l) {
    var a = n._reactRootContainer,
        i = void 0;

    if (a) {
      if (i = a._internalRoot, "function" == typeof l) {
        var o = l;

        l = function () {
          var e = hc(i);
          o.call(e);
        };
      }

      mc(t, i, e, l);
    } else {
      if (a = n._reactRootContainer = function (e, t) {
        if (t || (t = !(!(t = e ? 9 === e.nodeType ? e.documentElement : e.firstChild : null) || 1 !== t.nodeType || !t.hasAttribute("data-reactroot"))), !t) for (var n; n = e.lastChild;) e.removeChild(n);
        return new bc(e, 0, t);
      }(n, r), i = a._internalRoot, "function" == typeof l) {
        var u = l;

        l = function () {
          var e = hc(i);
          u.call(e);
        };
      }

      ju(function () {
        mc(t, i, e, l);
      });
    }

    return hc(i);
  }

  function Ec(e, t) {
    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!wc(t)) throw ie(Error(200));
    return function (e, t, n) {
      var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return {
        $$typeof: Yt,
        key: null == r ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
      };
    }(e, t, null, n);
  }

  St = function (e, t, n) {
    switch (t) {
      case "input":
        if (Sn(e, n), t = n.name, "radio" === n.type && null != t) {
          for (n = e; n.parentNode;) n = n.parentNode;

          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];

            if (r !== e && r.form === e.form) {
              var l = Le(r);
              if (!l) throw ie(Error(90));
              Ht(r), Sn(r, l);
            }
          }
        }

        break;

      case "textarea":
        il(e, n);
        break;

      case "select":
        null != (t = n.value) && rl(e, !!n.multiple, t, !1);
    }
  }, yc.prototype.render = function (e) {
    if (!this._defer) throw ie(Error(250));
    this._hasChildren = !0, this._children = e;
    var t = this._root._internalRoot,
        n = this._expirationTime,
        r = new vc();
    return pc(e, t, null, n, null, r._onCommit), r;
  }, yc.prototype.then = function (e) {
    if (this._didComplete) e();else {
      var t = this._callbacks;
      null === t && (t = this._callbacks = []), t.push(e);
    }
  }, yc.prototype.commit = function () {
    var e = this._root._internalRoot,
        t = e.firstBatch;
    if (!this._defer || null === t) throw ie(Error(251));

    if (this._hasChildren) {
      var n = this._expirationTime;

      if (t !== this) {
        this._hasChildren && (n = this._expirationTime = t._expirationTime, this.render(this._children));

        for (var r = null, l = t; l !== this;) r = l, l = l._next;

        if (null === r) throw ie(Error(251));
        r._next = l._next, this._next = t, e.firstBatch = this;
      }

      if (this._defer = !1, t = n, (ou & (eu | tu)) !== Zo) throw ie(Error(253));
      ha(Bu.bind(null, e, t)), ya(), t = this._next, this._next = null, null !== (t = e.firstBatch = t) && t._hasChildren && t.render(t._children);
    } else this._next = null, this._defer = !1;
  }, yc.prototype._onComplete = function () {
    if (!this._didComplete) {
      this._didComplete = !0;
      var e = this._callbacks;
      if (null !== e) for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }, vc.prototype.then = function (e) {
    if (this._didCommit) e();else {
      var t = this._callbacks;
      null === t && (t = this._callbacks = []), t.push(e);
    }
  }, vc.prototype._onCommit = function () {
    if (!this._didCommit) {
      this._didCommit = !0;
      var e = this._callbacks;
      if (null !== e) for (var t = 0; t < e.length; t++) {
        var n = e[t];
        if ("function" != typeof n) throw ie(Error(191), n);
        n();
      }
    }
  }, gc.prototype.render = bc.prototype.render = function (e, t) {
    var n = this._internalRoot,
        r = new vc();
    return null !== (t = void 0 === t ? null : t) && r.then(t), mc(e, n, null, r._onCommit), r;
  }, gc.prototype.unmount = bc.prototype.unmount = function (e) {
    var t = this._internalRoot,
        n = new vc();
    return null !== (e = void 0 === e ? null : e) && n.then(e), mc(null, t, null, n._onCommit), n;
  }, gc.prototype.createBatch = function () {
    var e = new yc(this),
        t = e._expirationTime,
        n = this._internalRoot,
        r = n.firstBatch;
    if (null === r) n.firstBatch = e, e._next = null;else {
      for (n = null; null !== r && r._expirationTime >= t;) n = r, r = r._next;

      e._next = r, null !== n && (n._next = e);
    }
    return e;
  }, Mt = Au, It = Lu, Dt = Fu, Ut = function (e, t) {
    var n = ou;
    ou |= 2;

    try {
      return e(t);
    } finally {
      (ou = n) === Zo && ya();
    }
  };

  var xc,
      _c,
      Tc = {
    createPortal: Ec,
    findDOMNode: function (e) {
      if (null == e) e = null;else if (1 !== e.nodeType) {
        var t = e._reactInternalFiber;

        if (void 0 === t) {
          if ("function" == typeof e.render) throw ie(Error(188));
          throw ie(Error(268), Object.keys(e));
        }

        e = null === (e = cr(t)) ? null : e.stateNode;
      }
      return e;
    },
    hydrate: function (e, t, n) {
      if (!wc(t)) throw ie(Error(200));
      return kc(null, e, t, !0, n);
    },
    render: function (e, t, n) {
      if (!wc(t)) throw ie(Error(200));
      return kc(null, e, t, !1, n);
    },
    unstable_renderSubtreeIntoContainer: function (e, t, n, r) {
      if (!wc(n)) throw ie(Error(200));
      if (null == e || void 0 === e._reactInternalFiber) throw ie(Error(38));
      return kc(e, t, n, !1, r);
    },
    unmountComponentAtNode: function (e) {
      if (!wc(e)) throw ie(Error(40));
      return !!e._reactRootContainer && (ju(function () {
        kc(null, null, e, !1, function () {
          e._reactRootContainer = null;
        });
      }), !0);
    },
    unstable_createPortal: function () {
      return Ec.apply(void 0, arguments);
    },
    unstable_batchedUpdates: Au,
    unstable_interactiveUpdates: function (e, t, n, r) {
      return Fu(), Lu(e, t, n, r);
    },
    unstable_discreteUpdates: Lu,
    unstable_flushDiscreteUpdates: Fu,
    flushSync: function (e, t) {
      if ((ou & (eu | tu)) !== Zo) throw ie(Error(187));
      var n = ou;
      ou |= 1;

      try {
        return pa(99, e.bind(null, t));
      } finally {
        ou = n, ya();
      }
    },
    unstable_createRoot: function (e, t) {
      if (!wc(e)) throw ie(Error(299), "unstable_createRoot");
      return new gc(e, null != t && !0 === t.hydrate);
    },
    unstable_createSyncRoot: function (e, t) {
      if (!wc(e)) throw ie(Error(299), "unstable_createRoot");
      return new bc(e, 1, null != t && !0 === t.hydrate);
    },
    unstable_flushControlled: function (e) {
      var t = ou;
      ou |= 1;

      try {
        pa(99, e);
      } finally {
        (ou = t) === Zo && ya();
      }
    },
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
      Events: [Fe, Ae, Le, Re.injectEventPluginsByName, de, He, function (e) {
        Se(e, Qe);
      }, Rt, zt, jr, Oe, Ku, {
        current: !1
      }]
    }
  };

  _c = (xc = {
    findFiberByHostInstance: Ue,
    bundleType: 0,
    version: "16.9.0",
    rendererPackageName: "react-dom"
  }).findFiberByHostInstance, function (e) {
    if ("undefined" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled || !t.supportsFiber) return !0;

    try {
      var n = t.inject(e);
      tc = function (e) {
        try {
          t.onCommitFiberRoot(n, e, void 0, 64 == (64 & e.current.effectTag));
        } catch (e) {}
      }, nc = function (e) {
        try {
          t.onCommitFiberUnmount(n, e);
        } catch (e) {}
      };
    } catch (e) {}
  }(ne({}, xc, {
    overrideHookState: null,
    overrideProps: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: $t.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return null === (e = cr(e)) ? null : e.stateNode;
    },
    findFiberByHostInstance: function (e) {
      return _c ? _c(e) : null;
    },
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null
  }));
  var Cc = {
    default: Tc
  },
      Sc = Cc && Tc || Cc,
      Pc = Sc.default || Sc,
      Nc = G(function (e, t) {
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
  Y(Nc);
  Nc.__interactionsRef, Nc.__subscriberRef, Nc.unstable_clear, Nc.unstable_getCurrent, Nc.unstable_getThreadID, Nc.unstable_trace, Nc.unstable_wrap, Nc.unstable_subscribe, Nc.unstable_unsubscribe;
  var Oc = G(function (e, t) {});
  Y(Oc);
  Oc.__interactionsRef, Oc.__subscriberRef, Oc.unstable_clear, Oc.unstable_getCurrent, Oc.unstable_getThreadID, Oc.unstable_trace, Oc.unstable_wrap, Oc.unstable_subscribe, Oc.unstable_unsubscribe, G(function (e) {
    e.exports = Nc;
  }), G(function (e) {});

  var Rc = G(function (e) {
    !function e() {
      if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (e) {
        console.error(e);
      }
    }(), e.exports = Pc;
  }),
      zc = function (e) {
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
      Mc = function (e, t) {
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
      Ic = function (e, t) {
    return !(e.right <= t.left) && !(e.left >= t.right) && !(e.bottom <= t.top) && !(e.top >= t.bottom);
  },
      Dc = function (e) {
    var t = e.diceArray,
        n = e.keepDiceAllowed,
        r = e.keepDice;
    return X.createElement("div", {
      className: "diceOnGoing"
    }, X.createElement("span", {
      className: "title"
    }, "Dice on going"), X.createElement("div", {
      className: "area"
    }, t.map(function (e) {
      return X.createElement("button", {
        key: e.id,
        disabled: !n,
        onClick: function () {
          return r(e);
        },
        className: "dice",
        style: {
          width: 40,
          height: 40,
          left: "".concat(e.position.x, "px"),
          top: "".concat(e.position.y, "px"),
          transform: "rotate(".concat(e.rotation, "deg)"),
          position: "absolute"
        }
      }, e.symbol);
    })));
  },
      Uc = function (e) {
    var t = e.rollDicePermission,
        n = e.onClick;
    return t.allowed ? X.createElement("button", {
      onClick: n
    }, "Roll!") : "3 skulls or more" === t.reaon ? null : X.createElement(X.Fragment, null, X.createElement("button", {
      disabled: !0
    }, "Roll!"), X.createElement("span", null, "(".concat(t.reason, ")")));
  },
      Fc = function (e) {
    var t = e.diceArray,
        n = e.unkeepDiceAllowed,
        r = e.unkeepDice;
    return X.createElement("div", {
      className: "diceKept"
    }, X.createElement("span", {
      className: "title"
    }, "Dice kept"), X.createElement("div", {
      className: "area"
    }, t.map(function (e) {
      return X.createElement("button", {
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
      Ac = function (e) {
    var t = e.onClick;
    return X.createElement("button", {
      onClick: t,
      style: {
        marginLeft: "20px"
      }
    }, "Mark this score");
  },
      Lc = function (e) {
    var t = e.rollIndex,
        n = e.isOnSkullIsland,
        r = e.roundScore,
        l = e.markScorePermission,
        a = e.markScore;
    return -1 === t ? null : X.createElement("div", null, X.createElement("span", {
      className: "subtitle"
    }, " Round score: "), X.createElement(jc, {
      isOnSkullIsland: n,
      markScorePermission: l,
      roundScore: r,
      markScore: a
    }));
  },
      jc = function (e) {
    var t = e.markScorePermission,
        n = e.isOnSkullIsland,
        r = e.roundScore,
        l = e.markScore;
    return n ? X.createElement("span", null, "XXX -Skull Island- XXX") : X.createElement(X.Fragment, null, X.createElement("span", null, r), t.allowed ? X.createElement(Ac, {
      onClick: l
    }) : null, X.createElement("div", null, "has-three-skulls-or-more" === t.reason ? "Round over !" : t.reason));
  },
      Wc = function (e) {
    var t = e.totalScore;
    return X.createElement("div", null, X.createElement("span", {
      className: "subtitle"
    }, " Total score: "), X.createElement("span", {
      className: "totalScore"
    }, t));
  },
      Bc = function (e) {
    var t = e.cardDeck,
        n = e.cardDrawn,
        r = e.drawCard,
        l = e.card;
    return X.createElement("div", null, !n && X.createElement("button", {
      onClick: function () {
        return r();
      },
      style: {
        marginTop: "20px"
      }
    }, t.length > 0 ? "Draw a card" : "Shuffle the deck"), X.createElement("div", {
      style: {
        marginTop: "10px"
      }
    }, "Remaining cards: ", t.length), X.createElement("span", {
      className: "card"
    }, l.label));
  },
      Vc = function (e) {
    var t = e.diceCursed,
        n = e.canRemoveSkull,
        r = e.removeSkull;
    return X.createElement("div", {
      className: "skullIsland"
    }, X.createElement("span", {
      className: "title"
    }, "Skull Island"), X.createElement("div", {
      className: "area"
    }, t.map(function (e) {
      return X.createElement("button", {
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
      Qc = function (e) {
    var t = e.nextRoundPermission,
        n = e.nextRound;
    return t.allowed ? X.createElement("button", {
      onClick: function () {
        return n();
      }
    }, "Start next round") : null;
  },
      Hc = [{
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
      $c = function (e) {
    return Math.floor(Math.random() * e);
  },
      qc = function (e) {
    var t = $c(e.length),
        n = $c(e.length),
        r = e[t];
    return e[t] = e[n], e[n] = r, e;
  },
      Kc = function () {
    return function (e) {
      for (var t = 0; t < 100; t++) qc(e);

      return e;
    }((e = [], Hc.forEach(function (t) {
      e = function (e, t) {
        for (var n = 0; n < t.cardQuantiy; n++) e.push(t);

        return e;
      }(e, t);
    }), e));
    var e;
  },
      Xc = [{
    id: 1,
    symbol: "coin",
    position: {
      x: 0,
      y: 0
    }
  }, {
    id: 2,
    symbol: "diamond",
    position: {
      x: 0,
      y: 0
    }
  }, {
    id: 3,
    symbol: "sword",
    position: {
      x: 0,
      y: 0
    }
  }, {
    id: 4,
    symbol: "parrot",
    position: {
      x: 0,
      y: 0
    }
  }, {
    id: 5,
    symbol: "monkey",
    position: {
      x: 0,
      y: 0
    }
  }, {
    id: 6,
    symbol: "skull",
    position: {
      x: 0,
      y: 0
    }
  }, {
    id: 7,
    symbol: "skull",
    position: {
      x: 0,
      y: 0
    }
  }, {
    id: 8,
    symbol: "skull",
    position: {
      x: 0,
      y: 0
    }
  }],
      Yc = {
    1: "coin",
    2: "diamond",
    3: "sword",
    4: "parrot",
    5: "monkey",
    6: "skull"
  },
      Gc = function (e) {
    e.forEach(function (t, n) {
      Jc(t, n, e);
    });
  },
      Zc = function (e) {
    return e.symbol;
  },
      Jc = function (e, t, n) {
    e.symbol = es(), e.position = rs(n.slice(0, t)), e.rotation = ls();
  },
      es = function () {
    return Yc[ts()];
  },
      ts = function () {
    return Math.floor(6 * Math.random()) + 1;
  },
      ns = function (e, t) {
    return Math.floor(Math.random() * (t - e + 1) + e);
  },
      rs = function e(t) {
    var n = {
      x: ns(0, 350),
      y: ns(0, 350)
    };
    return function (e, t) {
      return t.some(function (t) {
        return Ic({
          top: e.y - 5,
          left: e.x - 5,
          bottom: e.y + 40 + 5,
          right: e.x + 40 + 5
        }, {
          top: t.position.y - 5,
          left: t.position.x - 5,
          bottom: t.position.y + 40 + 5,
          right: t.position.x + 40 + 5
        });
      });
    }(n, t) && (n = e(t)), n;
  },
      ls = function () {
    return ns(-35, 35);
  },
      as = function (e) {
    var t = e.card,
        n = e.diceCursed.length;
    return "skull" === t.type && (n += t.skullAmount), n;
  },
      is = function (e) {
    var t = e.card;
    return 0 === e.rollIndex && "sword-challenge" !== t.type;
  },
      os = function (e) {
    var t = e.card,
        n = e.diceCursed;
    return as({
      card: t,
      diceCursed: n
    }) >= 4;
  },
      us = function (e) {
    var t = e.card,
        n = e.diceKept;
    if (!e.markScoreAllowed) return "sword-challenge" === t.type ? -t.gamble : 0;
    var r = 8 === n.length,
        l = n.map(function (e) {
      return Zc(e);
    });
    return "sword-challenge" === t.type ? cs(l, "sword") >= t.goal ? ss(l, {
      perfectEnabled: r
    }) + t.gamble : -t.gamble : "diamond" === t.type || "coin" === t.type ? ss([].concat(zc(l), [t.type]), {
      perfectEnabled: r
    }) : "animals" === t.type ? ss(l.map(function (e) {
      return "parrot" === e ? "monkey" : e;
    }), {
      perfectEnabled: r
    }) : "pirate" === t.type ? 2 * ss(l, {
      perfectEnabled: r
    }) : ss(l, {
      perfectEnabled: r
    });
  },
      cs = function (e, t) {
    return e.filter(function (e) {
      return e === t;
    }).length;
  },
      ss = function (e, t) {
    var n = t.perfectEnabled,
        r = 0,
        l = 0,
        a = fs(e);
    return Object.values(a).forEach(function (e) {
      3 === e && (r += 100), 4 === e && (r += 200), 5 === e && (r += 500), 6 === e && (r += 1e3), 7 === e && (r += 2e3), 8 === e && (r += 4e3), e > 2 && (l += e);
    }), e.forEach(function (e) {
      "diamond" === e && (r += 100, a.diamond < 3 && (l += 1)), "coin" === e && (r += 100, a.coin < 3 && (l += 1));
    }), n && l >= e.length && (r += 500), r;
  },
      fs = function (e) {
    var t = {};
    return e.forEach(function (e) {
      t.hasOwnProperty(e) ? t[e]++ : t[e] = 1;
    }), t;
  },
      ds = function (e) {
    var t = X.useRef();
    return X.useEffect(function () {
      t.current = e;
    }), t.current;
  };

  Rc.render(X.createElement(function () {
    var e = X.useState(Xc),
        t = Mc(e, 2),
        n = t[0],
        r = t[1],
        l = X.useState([]),
        a = Mc(l, 2),
        i = a[0],
        o = a[1],
        u = X.useState([]),
        c = Mc(u, 2),
        s = c[0],
        f = c[1],
        d = X.useState([]),
        p = Mc(d, 2),
        m = p[0],
        h = p[1],
        y = X.useState(0),
        v = Mc(y, 2),
        b = v[0],
        g = v[1],
        w = X.useState(Kc()),
        k = Mc(w, 2),
        E = k[0],
        x = k[1],
        _ = X.useState({}),
        T = Mc(_, 2),
        C = T[0],
        S = T[1],
        P = X.useState(-1),
        N = Mc(P, 2),
        O = N[0],
        R = N[1],
        z = X.useState(!1),
        M = Mc(z, 2),
        I = M[0],
        D = M[1],
        U = X.useState(!1),
        F = Mc(U, 2),
        A = F[0],
        L = F[1],
        j = X.useState(!1),
        W = Mc(j, 2),
        B = W[0],
        V = W[1],
        Q = X.useState(!1),
        H = Mc(Q, 2),
        $ = H[0],
        q = H[1],
        K = X.useState({}),
        Y = Mc(K, 2),
        G = Y[0],
        Z = Y[1],
        J = X.useState(!1),
        ee = Mc(J, 2),
        te = ee[0],
        ne = ee[1],
        re = X.useState(!1),
        le = Mc(re, 2),
        ae = le[0],
        ie = le[1],
        oe = X.useState({}),
        ue = Mc(oe, 2),
        ce = ue[0],
        se = ue[1],
        fe = X.useState({}),
        de = Mc(fe, 2),
        pe = de[0],
        me = de[1],
        he = X.useState(!1),
        ye = Mc(he, 2),
        ve = ye[0],
        be = ye[1];

    X.useEffect(function () {
      as({
        card: C,
        diceCursed: m
      }) > 2 || A ? (ne(!1), ie(!1)) : (ne(!0), ie(!0));
    }, [C, m, A]), X.useEffect(function () {
      V(function (e) {
        var t = e.isOnSkullIsland,
            n = e.card,
            r = e.rollIndex,
            l = e.diceCursed;
        return !!t || !(!is({
          card: n,
          rollIndex: r
        }) || !os({
          card: n,
          diceCursed: l
        }));
      }({
        isOnSkullIsland: B,
        card: C,
        rollIndex: O,
        diceCursed: m
      }));
    }, [C, O, m]), X.useEffect(function () {
      Z(function (e) {
        var t = e.cardDrawn,
            n = e.scoreMarked,
            r = e.card,
            l = e.diceCursed,
            a = e.rollIndex,
            i = e.diceOnGoing;
        return t ? n ? {
          allowed: !1,
          reason: "round-not-started"
        } : as({
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
        cardDrawn: I,
        scoreMarked: A,
        card: C,
        diceCursed: m
      }));
    }, [I, A, C, m]), X.useEffect(function () {
      se(function (e) {
        var t = e.rollIndex,
            n = e.card,
            r = e.diceCursed;
        return e.scoreMarked ? {
          allowed: !1
        } : as({
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
        rollIndex: O,
        card: C,
        diceCursed: m,
        scoreMarked: A
      }));
    }, [C, O, m, A]), X.useEffect(function () {
      q(us({
        card: C,
        diceKept: s,
        markScoreAllowed: ce.allowed
      }));
    }, [C, s, ce]), X.useEffect(function () {
      -1 === O ? me({
        allowed: !1
      }) : G.allowed || ce.allowed || me({
        allowed: !0
      });
    }, [O, G, ce]), X.useEffect(function () {
      "witch" === C.type ? m.length > 2 ? be(!1) : C.effectUsed ? be(!1) : be(!0) : be(!1);
    }, [C, m]);
    var ge = ds(ce);
    X.useEffect(function () {
      "sword-challenge" !== C.type || A || !ge.allowed || ce.allowed || Ee();
    }, [C, A, ge, ce]);

    var we = function (e) {
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

      o(n), h([].concat(zc(m), zc(r)));
    },
        ke = function (e) {
      if ("skull" === e.symbol) {
        "witch" === C.type && (C.effectUsed = !0);
        var t = m.filter(function (t) {
          return t !== e;
        });
        h(t);
      } else {
        var n = s.filter(function (t) {
          return t !== e;
        });
        f(n);
      }

      var r = [].concat(zc(i), [e]);
      o(r);
    },
        Ee = function () {
      g(Math.max(b + $, 0)), L(!0);
    };

    return X.createElement(X.Fragment, null, X.createElement(Bc, {
      cardDeck: E,
      cardDrawn: I,
      drawCard: function () {
        E.length > 0 ? (S(E.pop()), x(E), D(!0)) : x(Kc());
      },
      card: C
    }), X.createElement("div", null, X.createElement(Uc, {
      rollDicePermission: G,
      onClick: function () {
        var e;
        -1 === O ? (e = n, Gc(n), o(zc(n)), r([]), R(0)) : (e = i, Gc(i), R(O + 1)), we(e);
      }
    }), X.createElement(Qc, {
      nextRoundPermission: pe,
      nextRound: function () {
        r(Xc), o([]), f([]), h([]), R(-1), L(!1), D(!1), V(!1), q(0);
      }
    })), X.createElement(Dc, {
      diceArray: i,
      keepDiceAllowed: te,
      keepDice: function (e) {
        if ("skull" === e.symbol) {
          "witch" === C.type && (C.effectUsed = !1);
          var t = [].concat(zc(m), [e]);
          h(t);
        } else {
          var n = [].concat(zc(s), [e]);
          f(n);
        }

        var r = i.filter(function (t) {
          return t !== e;
        });
        o(r);
      }
    }), X.createElement(Fc, {
      diceArray: s,
      unkeepDiceAllowed: ae,
      unkeepDice: ke
    }), X.createElement(Vc, {
      diceCursed: m,
      canRemoveSkull: ve,
      removeSkull: function (e) {
        return ke(e);
      }
    }), X.createElement(Lc, {
      rollIndex: O,
      isOnSkullIsland: B,
      roundScore: $,
      markScorePermission: ce,
      markScore: Ee
    }), X.createElement(Wc, {
      totalScore: b
    }));
  }, null), document.body);
}();
//# sourceMappingURL=./main.js.map