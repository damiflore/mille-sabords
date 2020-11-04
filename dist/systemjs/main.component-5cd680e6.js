System.register(['./index.js'], function (exports, module) {
  'use strict';
  var react, _slicedToArray, _objectSpread, _defineProperty, reactDom, createAction, symbolSwordUrl, _toConsumableArray, isSwordChallengeCard, isAnimalsCard, SYMBOL_PARROT, SYMBOL_MONKEY, isPirateCard, isCoinCard, isDiamondCard, SYMBOL_DIAMOND, SYMBOL_COIN, SYMBOL_SWORD, useCurrentPlayerId, usePlayers, cardIdToCard, symbolIsSkull, useCardIds, useRollCount, useDices, useDiceRolledIds, useWitchUncursedDiceId, diceIsOnSkull, useDiceCursedIds, useCurrentCardId, isOneSkullCard, SYMBOL_SKULL, isTwoSkullsCard, useScoreMarked, isChestCard, diceToVisibleSymbol, useChestSlots, useIsOnSkullIsland, mixDeck, _typeof, useMainDomNode, useCurrentCardActivated, symbolCoinUrl, symbolDiamondUrl, symbolToImageUrl, cardToImageUrl, cardToSmallImageUrl, symbolSkullUrl, isWitchCard, createLogger, useDiceDomNode, useDiceDomNodeSetter, useRoundStarted, CARD_TWO_SWORDS_CHALLENGE, useGameStarted, cardImageUrlMap, useMainDomNodeSetter, useGameCreated;
  return {
    setters: [function (module) {
      react = module.r;
      _slicedToArray = module._;
      _objectSpread = module.a;
      _defineProperty = module.b;
      reactDom = module.c;
      createAction = module.d;
      symbolSwordUrl = module.s;
      _toConsumableArray = module.e;
      isSwordChallengeCard = module.i;
      isAnimalsCard = module.f;
      SYMBOL_PARROT = module.S;
      SYMBOL_MONKEY = module.g;
      isPirateCard = module.h;
      isCoinCard = module.j;
      isDiamondCard = module.k;
      SYMBOL_DIAMOND = module.l;
      SYMBOL_COIN = module.m;
      SYMBOL_SWORD = module.n;
      useCurrentPlayerId = module.u;
      usePlayers = module.o;
      cardIdToCard = module.p;
      symbolIsSkull = module.q;
      useCardIds = module.t;
      useRollCount = module.v;
      useDices = module.w;
      useDiceRolledIds = module.x;
      useWitchUncursedDiceId = module.y;
      diceIsOnSkull = module.z;
      useDiceCursedIds = module.A;
      useCurrentCardId = module.B;
      isOneSkullCard = module.C;
      SYMBOL_SKULL = module.D;
      isTwoSkullsCard = module.E;
      useScoreMarked = module.F;
      isChestCard = module.G;
      diceToVisibleSymbol = module.H;
      useChestSlots = module.I;
      useIsOnSkullIsland = module.J;
      mixDeck = module.K;
      _typeof = module.L;
      useMainDomNode = module.M;
      useCurrentCardActivated = module.N;
      symbolCoinUrl = module.O;
      symbolDiamondUrl = module.P;
      symbolToImageUrl = module.Q;
      cardToImageUrl = module.R;
      cardToSmallImageUrl = module.T;
      symbolSkullUrl = module.U;
      isWitchCard = module.V;
      createLogger = module.W;
      useDiceDomNode = module.X;
      useDiceDomNodeSetter = module.Y;
      useRoundStarted = module.Z;
      CARD_TWO_SWORDS_CHALLENGE = module.$;
      useGameStarted = module.a0;
      cardImageUrlMap = module.a1;
      useMainDomNodeSetter = module.a2;
      useGameCreated = module.a3;
    }],
    execute: function () {

      var cardDefaultUrl = System.resolve("./assets/card_default.png", module.meta.url);

      /* eslint-disable valid-jsdoc */
      var addDomEventListener = function addDomEventListener(domNode, eventName, callback, options) {
        domNode.addEventListener(eventName, callback, options);
        return function () {
          domNode.removeEventListener(eventName, callback, options);
        };
      }; // checking if somthing is window is tricky
      // we could also use a.constructor.name === 'Window'
      // but it's safer to use approach below

      var elementIsWindow = function elementIsWindow(a) {
        return a.window === a;
      };
      var elementIsDocument = function elementIsDocument(a) {
        return a.nodeType === 9;
      };
      var isFocusable = function isFocusable(node) {
        // only element node can be focused, document, textNodes etc cannot
        if (node.nodeType !== 1) {
          return false;
        }

        var nodeName = node.nodeName.toLowerCase();

        if (nodeName === "input") {
          if (node.type === "hidden") {
            return false;
          }

          return isVisible(node);
        }

        if (["button", "select", "datalist", "iframe", "textarea"].indexOf(nodeName) > -1) {
          return isVisible(node);
        }

        if (node.hasAttribute("tabindex") || node.hasAttribute("tabIndex")) {
          return isVisible(node);
        }

        if (node.hasAttribute("draggable")) {
          return isVisible(node);
        }

        if (["a", "area"].indexOf(nodeName) > -1) {
          if (node.hasAttribute("href") === false) {
            return false;
          }

          return isVisible(node);
        }

        if (["audio", "video"].indexOf(nodeName) > -1) {
          if (node.hasAttribute("controls") === false) {
            return false;
          }

          return isVisible(node);
        }

        return false;
      };
      var isVisible = function isVisible(node) {
        if (isDocumentElement(node)) {
          return true;
        }

        if (getStyleValue(node, "visibility") === "hidden") {
          return false;
        }

        var nodeOrAncestor = node;

        while (nodeOrAncestor) {
          if (isDocumentElement(nodeOrAncestor)) {
            break;
          }

          if (getStyleValue(nodeOrAncestor, "display") === "none") {
            return false;
          }

          nodeOrAncestor = nodeOrAncestor.parentNode;
        }

        return true;
      }; // https://github.com/davidtheclark/tabbable/blob/master/index.js

      var isDocumentElement = function isDocumentElement(node) {
        return node === node.ownerDocument.documentElement;
      };
      var getStyle = function getStyle(element) {
        return elementToOwnerWindow(element).getComputedStyle(element);
      };
      var getStyleValue = function getStyleValue(element, name) {
        return getStyle(element).getPropertyValue(name);
      };
      /**
       * elementToOwnerWindow returns the window owning the element.
       * Usually an element window will just be window.
       * But when an element is inside an iframe, the window of that element
       * is iframe.contentWindow
       * It's often important to work with the correct window because
       * element are scoped per iframes.
       */

      var elementToOwnerWindow = function elementToOwnerWindow(element) {
        if (elementIsWindow(element)) return element;
        if (elementIsDocument(element)) return element.defaultView;
        return elementToOwnerDocument(element).defaultView;
      };
      /**
       * elementToOwnerDocument returns the document containing the element.
       * Usually an element document is window.document.
       * But when an element is inside an iframe, the document of that element
       * is iframe.contentWindow.document
       * It's often important to work with the correct document because
       * element are scoped per iframes.
       */

      var elementToOwnerDocument = function elementToOwnerDocument(element) {
        if (elementIsWindow(element)) return element.document;
        if (elementIsDocument(element)) return element;
        return element.ownerDocument;
      };
      var getDocumentScroll = function getDocumentScroll(element) {
        var elementWindow = elementToOwnerWindow(element);
        var elementDocument = elementToOwnerDocument(element);
        return {
          x: elementWindow.pageXOffset || elementDocument.documentElement.scrollLeft,
          y: elementWindow.pageYOffset || elementDocument.documentElement.scrollTop
        };
      };

      var UrlLoadingContext = react.createContext();

      var reducer = function reducer(state, action) {
        return action(state);
      };

      var initialState = {};
      var UrlLoadingProvider = function UrlLoadingProvider(_ref) {
        var children = _ref.children;
        return /*#__PURE__*/react.createElement(UrlLoadingContext.Provider, {
          value: react.useReducer(reducer, initialState)
        }, children);
      };
      var useAllUrlLoaded = function useAllUrlLoaded(fakeUrl) {
        var urlTrackerReady = useUrlTrackerReady(fakeUrl);
        var urlTrackerTotalCount = useUrlTrackerTotalCount();
        var urlTrackerLoadedCount = useUrlTrackerLoadedCount();

        var _React$useState = react.useState(false),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            allUrlLoaded = _React$useState2[0],
            allUrlLoadedSetter = _React$useState2[1];

        react.useEffect(function () {
          if (urlTrackerReady && urlTrackerLoadedCount === urlTrackerTotalCount) {
            allUrlLoadedSetter(true);
          }
        }, [urlTrackerReady, urlTrackerLoadedCount, urlTrackerTotalCount]);
        return allUrlLoaded;
      };
      var useUrlTrackerReady = function useUrlTrackerReady() {
        var fakeUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var urlLoadingState = useUrlLoadingState();
        var fakeUrlLoadends = useUrlLoadingNotifier(fakeUrl);
        var fakeUrlLoadingTracker = urlLoadingState[fakeUrl];

        var _React$useState3 = react.useState(false),
            _React$useState4 = _slicedToArray(_React$useState3, 2),
            ready = _React$useState4[0],
            readySetter = _React$useState4[1]; // wait a first fake url load ends to ensure other components are rendered
        // once and capable to call useUrlLoadingNotifier() informing us
        // that something is loading an url.


        react.useEffect(function () {
          // also use requestIdleCallback in case some image
          // use intersection observer before starting to load
          var callbackRequestId = window.requestIdleCallback(fakeUrlLoadends);
          return function () {
            window.cancelIdleCallback(callbackRequestId);
          };
        }, []);
        react.useEffect(function () {
          if (!fakeUrlLoadingTracker || fakeUrlLoadingTracker.status !== "loaded") {
            return;
          }

          readySetter(true);
        });
        return ready;
      };
      var useUrlTrackerTotalCount = function useUrlTrackerTotalCount() {
        var urlLoadingState = useUrlLoadingState();
        var totalCount = Object.keys(urlLoadingState).length;
        return totalCount;
      };
      var useUrlTrackerLoadedCount = function useUrlTrackerLoadedCount() {
        var urlLoadingState = useUrlLoadingState();
        var loadedCount = Object.keys(urlLoadingState).filter(function (url) {
          return urlLoadingState[url].status === "loaded";
        }).length;
        return loadedCount;
      };
      var useUrlLoadingNotifier = function useUrlLoadingNotifier(url) {
        var contextValue = react.useContext(UrlLoadingContext);

        if (!contextValue) {

          return function () {};
        }

        var dispatch = contextValue[1];

        var loadStarts = function loadStarts() {
          dispatch(function (state) {
            if (url in state) {
              // console.log("start loading early return", url, state[url])
              return state;
            }

            return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, url, {
              status: "loading"
            }));
          });
        };

        var loadEnds = function loadEnds() {
          dispatch(function (state) {
            if (url in state && state[url].status === "loaded") {
              // console.log("end loading early return", url, state[url])
              return state;
            }

            return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, url, {
              status: "loaded"
            }));
          });
        };

        react.useEffect(function () {
          loadStarts();
        }, []);
        return loadEnds;
      };
      var useDOMNodeLoadingNotifier = function useDOMNodeLoadingNotifier(url) {
        var loadEnds = useUrlLoadingNotifier(url);

        var nodeRefCallback = function nodeRefCallback(node) {
          if (node) {
            addLoadedListener(node, loadEnds);
          }
        };

        return nodeRefCallback;
      };

      var useUrlLoadingState = function useUrlLoadingState() {
        var contextValue = react.useContext(UrlLoadingContext);

        if (!contextValue) {

          return null;
        }

        return contextValue[0];
      };

      var addLoadedListener = function addLoadedListener(domNode, callback) {
        var removeLoadListener = addDomEventListener(domNode, "load", function () {
          removeErrorListener();
          callback();
        });
        var removeErrorListener = addDomEventListener(domNode, "error", function () {
          removeLoadListener();
          callback();
        });
        return function () {
          removeLoadListener();
          removeErrorListener();
        };
      };

      var Stylesheet = function Stylesheet(_ref) {
        var href = _ref.href;
        var ref = useDOMNodeLoadingNotifier(href);
        return reactDom.createPortal( /*#__PURE__*/react.createElement("link", {
          href: href,
          ref: ref,
          rel: "stylesheet",
          type: "text/css"
        }), document.head);
      };

      function assign(target) {
        for (var i = 1; i < arguments.length; i++) {
          // eslint-disable-next-line prefer-rest-params
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      }

      var _extends = Object.assign || assign;

      var objectWithoutPropertiesLoose = (function (source, excluded) {
        if (source === null) return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key;
        var i;

        for (i = 0; i < sourceKeys.length; i++) {
          key = sourceKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          target[key] = source[key];
        }

        return target;
      });

      var _objectWithoutProperties = (function (source, excluded) {
        if (source === null) return {};
        var target = objectWithoutPropertiesLoose(source, excluded);
        var key;
        var i;

        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

          for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
          }
        }

        return target;
      });

      // https://vincenttaverna.com/posts/react-image-hook/
      var loadImage = function loadImage(url, crossOrigin) {
        var image = new Image();

        if (crossOrigin) {
          image.crossOrigin = crossOrigin;
        }

        return new Promise(function (resolve, reject) {
          // Load Handler
          var loaded = function loaded(event) {
            // Cleanup our image element, we no longer need it
            unbindEvents(image); // Fulfill our promise with the event image element, even in older browsers

            resolve(event.target || event.srcElement);
          }; // Error Handler


          var errored = function errored(error) {
            // Cleanup our image element, we no longer need it
            unbindEvents(image); // Forward our error to the user

            reject(error);
          }; // Set our handlers


          image.onload = loaded;
          image.onerror = errored;
          image.onabort = errored; // Tell the browser we are ready to begin downloading

          image.src = url;
        });
      };

      var unbindEvents = function unbindEvents(image) {
        // Reset callbacks
        image.onload = null;
        image.onerror = null;
        image.onabort = null;

        try {
          // Some browsers need you to remove the src
          // in order to garbage collect the image object
          delete image.src;
        } catch (e) {// Safari's strict mode throws, ignore
        }
      };

      function _await(value, then, direct) {
        if (direct) {
          return then ? then(value) : value;
        }

        if (!value || !value.then) {
          value = Promise.resolve(value);
        }

        return then ? value.then(then) : value;
      }

      var cache = new Map();

      function _catch(body, recover) {
        try {
          var result = body();
        } catch (e) {
          return recover(e);
        }

        if (result && result.then) {
          return result.then(void 0, recover);
        }

        return result;
      }

      function _async(f) {
        return function () {
          for (var args = [], i = 0; i < arguments.length; i++) {
            args[i] = arguments[i];
          }

          try {
            return Promise.resolve(f.apply(this, args));
          } catch (e) {
            return Promise.reject(e);
          }
        };
      }

      var Status = {
        LOADING: "loading",
        LOADED: "loaded",
        FAILED: "failed"
      };
      var useImage = function useImage(src) {
        var cachedImg = cache.get(src);
        var initialState = cachedImg ? Status.LOADED : Status.LOADING;

        var _React$useState = react.useState(initialState),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            status = _React$useState2[0],
            setStatus = _React$useState2[1];

        var mounted = react.useRef(false);
        react.useEffect(function () {
          if (!src || status === Status.LOADED) {
            return function () {};
          }

          mounted.current = true;

          _async(function () {
            return _catch(function () {
              return _await(loadImage(src), function (image) {
                if (!mounted.current) return;
                cache.set(src, image);
                setStatus(Status.LOADED);
              });
            }, function () {
              if (!mounted.current) return;
              cache.delete(src);
              setStatus(Status.FAILED);
            });
          })();

          return function () {
            mounted.current = false;
          };
        }, [src, status]);
        return [status, cachedImg];
      };

      var OnceIntersectingSuspense = function OnceIntersectingSuspense(_ref) {
        var fallback = _ref.fallback,
            root = _ref.root,
            rootMargin = _ref.rootMargin,
            _ref$threshold = _ref.threshold,
            threshold = _ref$threshold === void 0 ? 0 : _ref$threshold,
            children = _ref.children;

        var _React$useState = react.useState(false),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            isIntersecting = _React$useState2[0],
            isIntersectingSetter = _React$useState2[1];

        var _React$useState3 = react.useState(null),
            _React$useState4 = _slicedToArray(_React$useState3, 2),
            node = _React$useState4[0],
            nodeSetter = _React$useState4[1];

        react.useEffect(function () {
          if (!node) {
            return function () {};
          }

          if (isIntersecting) {
            return function () {};
          } // https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API


          var observer = new window.IntersectionObserver(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 1),
                entry = _ref3[0];

            if (entry.isIntersecting) {
              observer.unobserve(node);
              isIntersectingSetter(true);
            } else {
              isIntersectingSetter(false);
            }
          }, {
            root: root,
            rootMargin: rootMargin,
            threshold: threshold
          });
          observer.observe(node);
          return function () {
            observer.disconnect();
          };
        }, [node, isIntersecting]);

        if (!isIntersecting) {
          return fallback({
            ref: nodeSetter
          });
        }

        return /*#__PURE__*/react.createElement(react.Fragment, null, children);
      };

      var Image$1 = function Image(_ref) {
        var _ref$loadWhenIntersec = _ref.loadWhenIntersecting,
            loadWhenIntersecting = _ref$loadWhenIntersec === void 0 ? true : _ref$loadWhenIntersec,
            _ref$usePlaceholderWh = _ref.usePlaceholderWhileLoading,
            usePlaceholderWhileLoading = _ref$usePlaceholderWh === void 0 ? true : _ref$usePlaceholderWh,
            _ref$animateLoaded = _ref.animateLoaded,
            animateLoaded = _ref$animateLoaded === void 0 ? true : _ref$animateLoaded,
            intersectionRoot = _ref.intersectionRoot,
            intersectionRootMargin = _ref.intersectionRootMargin,
            intersectionThreshold = _ref.intersectionThreshold,
            _ref$FallbackWhileNot = _ref.FallbackWhileNotIntersecting,
            FallbackWhileNotIntersecting = _ref$FallbackWhileNot === void 0 ? ImageNotIntersectingFallback : _ref$FallbackWhileNot,
            _ref$FallbackWhileLoa = _ref.FallbackWhileLoading,
            FallbackWhileLoading = _ref$FallbackWhileLoa === void 0 ? ImageLoadingFallback : _ref$FallbackWhileLoa,
            src = _ref.src,
            props = _objectWithoutProperties(_ref, ["loadWhenIntersecting", "usePlaceholderWhileLoading", "animateLoaded", "intersectionRoot", "intersectionRootMargin", "intersectionThreshold", "FallbackWhileNotIntersecting", "FallbackWhileLoading", "src"]);

        var _useImage = useImage(src),
            _useImage2 = _slicedToArray(_useImage, 1),
            status = _useImage2[0];

        var imageLoadEnds = useUrlLoadingNotifier(src);
        react.useEffect(function () {
          if (status === "loaded") {
            imageLoadEnds();
          }
        }, [status]);
        var Component = /*#__PURE__*/react.createElement("img", _extends({}, props, {
          src: src
        }));

        if (animateLoaded) {
          Component = /*#__PURE__*/react.createElement(AnimateImageLoaded, _extends({}, props, {
            src: src
          }));
        }

        if (usePlaceholderWhileLoading) {
          var ComponentPrevious = Component;
          Component = /*#__PURE__*/react.createElement(OnceImageLoadedSuspense, {
            src: src,
            fallback: /*#__PURE__*/react.createElement(FallbackWhileLoading, props)
          }, ComponentPrevious);
        }

        if (loadWhenIntersecting) {
          var _ComponentPrevious = Component;
          Component = /*#__PURE__*/react.createElement(OnceIntersectingSuspense, {
            fallback: function fallback(_ref2) {
              var ref = _ref2.ref;
              return /*#__PURE__*/react.createElement(FallbackWhileNotIntersecting, _extends({
                ref: ref
              }, props));
            },
            root: intersectionRoot,
            rootMargin: intersectionRootMargin,
            threshold: intersectionThreshold
          }, _ComponentPrevious);
        }

        return Component;
      };

      var AnimateImageLoaded = function AnimateImageLoaded(props) {
        var nodeRef = react.useRef();
        react.useEffect(function () {
          nodeRef.current.animate([{
            transform: "scale(0)",
            opacity: 0
          }, {
            transform: "scale(1)",
            opacity: 1
          }], {
            duration: 300,
            fill: "forwards"
          });
        }, [nodeRef]);
        return /*#__PURE__*/react.createElement("img", _extends({}, props, {
          ref: nodeRef
        }));
      };

      var OnceImageLoadedSuspense = function OnceImageLoadedSuspense(_ref3) {
        var fallback = _ref3.fallback,
            src = _ref3.src,
            children = _ref3.children;

        var _useImage3 = useImage(src),
            _useImage4 = _slicedToArray(_useImage3, 1),
            status = _useImage4[0];

        if (status !== "loaded") {
          return fallback;
        }

        return children;
      }; // eslint-disable-next-line react/display-name


      var ImageLoadingFallback = react.forwardRef(function (props, ref) {
        return /*#__PURE__*/react.createElement("img", _extends({
          src: TRANSPARENT_PNG_DATA_URL
        }, props, {
          ref: ref
        }));
      }); // eslint-disable-next-line react/display-name

      var ImageNotIntersectingFallback = react.forwardRef(function (props, ref) {
        return /*#__PURE__*/react.createElement("img", _extends({
          src: TRANSPARENT_PNG_DATA_URL
        }, props, {
          ref: ref
        }));
      });
      var TRANSPARENT_PNG_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";

      var Home = function Home() {
        return /*#__PURE__*/react.createElement(ButtonNewGame, null);
      };

      var ButtonNewGame = function ButtonNewGame() {
        var createNewGame = useCreateNewGame();
        return /*#__PURE__*/react.createElement("div", {
          className: "new-game"
        }, /*#__PURE__*/react.createElement(Image$1, {
          src: symbolSwordUrl
        }), /*#__PURE__*/react.createElement("button", {
          onClick: createNewGame
        }, "Nouvelle partie"));
      };

      var useCreateNewGame = createAction(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          gameCreated: true
        });
      });

      var createSignal = function createSignal() {
        var listeners = [];

        var listen = function listen(callback) {
          var removed = false;
          listeners = [].concat(_toConsumableArray(listeners), [callback]);
          return function () {
            if (removed) return;
            removed = true;
            var listenersWithoutCallback = [];
            var i = listeners.length;
            var searching = true;

            while (i--) {
              var listenerCandidate = listeners[i];

              if (searching) {
                if (listenerCandidate === callback) {
                  searching = false;
                } else {
                  listenersWithoutCallback.push(listenerCandidate);
                }
              } else {
                listenersWithoutCallback.push(listenerCandidate);
              }
            }

            listeners = listenersWithoutCallback;
          };
        };

        var emit = function emit() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          listeners.forEach(function (listener) {
            listener.apply(void 0, args);
          });
        };

        return {
          listen: listen,
          emit: emit
        };
      };

      var useBecomes = function useBecomes(becomesPredicate, deps) {
        var transition = useTransition(becomesPredicate, deps);
        return Boolean(transition);
      };
      var useTransition = function useTransition(transitionPredicate, deps) {
        var mountedRef = react.useRef(false);
        react.useEffect(function () {
          if (mountedRef.current === false) {
            mountedRef.current = true;
          }
        });
        var depsRef = react.useRef(deps);
        react.useEffect(function () {
          depsRef.current = deps;
        }, deps);

        if (!mountedRef.current) {
          return null;
        }

        if (!transitionPredicate.apply(void 0, _toConsumableArray(depsRef.current))) {
          return null;
        }

        return {
          from: depsRef.current,
          to: deps
        };
      };
      var usePrevious = function usePrevious(value) {
        var ref = react.useRef(value);
        react.useEffect(function () {
          ref.current = value;
        }, [value]);
        return ref.current;
      };
      var useSignalEmitter = function useSignalEmitter() {
        var _React$useState = react.useState(function () {
          return createSignal();
        }),
            _React$useState2 = _slicedToArray(_React$useState, 1),
            signal = _React$useState2[0];

        return signal;
      };
      var useSignalListener = function useSignalListener(signal) {
        var _React$useState3 = react.useState(),
            _React$useState4 = _slicedToArray(_React$useState3, 2),
            state = _React$useState4[0],
            stateSetter = _React$useState4[1];

        react.useEffect(function () {
          return signal.listen(stateSetter);
        }, []);
        return state;
      };

      var computeRoundScore = function computeRoundScore(_ref) {
        var card = _ref.card,
            symbolsInChest = _ref.symbolsInChest,
            scoreMarked = _ref.scoreMarked,
            markScoreAllowed = _ref.markScoreAllowed;

        if (isSwordChallengeCard(card)) {
          if (!scoreMarked && !markScoreAllowed) {
            return -card.gambleAmount;
          }

          return computeScoreForSwordChallenge(symbolsInChest, {
            goal: card.numberOfSwords,
            gamble: card.gambleAmount
          });
        }

        if (isAnimalsCard(card)) {
          return computeScoreForSymbols(symbolsInChest.map(function (symbol) {
            return symbol === SYMBOL_PARROT ? SYMBOL_MONKEY : symbol;
          }));
        }

        if (isPirateCard(card)) {
          return computeScoreForSymbols(symbolsInChest) * 2;
        }

        if (isCoinCard(card)) {
          return computeScoreForSymbols(symbolsInChest, 9);
        }

        if (isDiamondCard(card)) {
          return computeScoreForSymbols(symbolsInChest, 9);
        }

        return computeScoreForSymbols(symbolsInChest);
      };

      var computeScoreForSwordChallenge = function computeScoreForSwordChallenge(symbols, _ref2) {
        var goal = _ref2.goal,
            gamble = _ref2.gamble;
        var swordChallengeAchieved = countSymbol(symbols, SYMBOL_SWORD) >= goal;

        if (swordChallengeAchieved) {
          return computeScoreForSymbols(symbols) + gamble;
        }

        return -gamble;
      };

      var countSymbol = function countSymbol(symbolArray, symbol) {
        return symbolArray.filter(function (symbolCandidate) {
          return symbolCandidate === symbol;
        }).length;
      };

      var computeScoreForSymbols = function computeScoreForSymbols(symbols) {
        var perfectCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
        var score = 0;
        var usefullSymbol = 0; // add points for dice combinaisons

        var symbolCountMap = countSymbolsOccurences(symbols);
        Object.values(symbolCountMap).forEach(function (symbolCount) {
          if (symbolCount === 3) score += 100;
          if (symbolCount === 4) score += 200;
          if (symbolCount === 5) score += 500;
          if (symbolCount === 6) score += 1000;
          if (symbolCount === 7) score += 2000;
          if (symbolCount === 8) score += 4000;
          if (symbolCount > 2) usefullSymbol += symbolCount;
        }); // add 1 point for each coin and diamond

        symbols.forEach(function (symbol) {
          if (symbol === SYMBOL_DIAMOND) {
            score += 100;
            if (symbolCountMap[SYMBOL_DIAMOND] < 3) usefullSymbol += 1;
          }

          if (symbol === SYMBOL_COIN) {
            score += 100;
            if (symbolCountMap[SYMBOL_COIN] < 3) usefullSymbol += 1;
          }
        });
        if (usefullSymbol === perfectCount) score += 500;
        return score;
      };

      var countSymbolsOccurences = function countSymbolsOccurences(symbols) {
        var symbolCountMap = {};
        symbols.forEach(function (symbol) {
          if (symbolCountMap.hasOwnProperty(symbol)) {
            symbolCountMap[symbol]++;
          } else {
            symbolCountMap[symbol] = 1;
          }
        });
        return symbolCountMap;
      };

      var useMemo = react.useMemo;
      var useCardDeck = function useCardDeck() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$cardIds = _ref.cardIds,
            cardIds = _ref$cardIds === void 0 ? useCardIds() : _ref$cardIds;

        return cardIds.map(function (cardId) {
          return cardIdToCard(cardId);
        });
      };
      var useCurrentPlayer = function useCurrentPlayer() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$currentPlayerId = _ref2.currentPlayerId,
            currentPlayerId = _ref2$currentPlayerId === void 0 ? useCurrentPlayerId() : _ref2$currentPlayerId,
            _ref2$players = _ref2.players,
            players = _ref2$players === void 0 ? usePlayers() : _ref2$players;

        return players.find(function (playerCandidate) {
          return playerCandidate.id === currentPlayerId;
        });
      };
      var useHasNeverRolled = function useHasNeverRolled() {
        var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref4$rollCount = _ref4.rollCount,
            rollCount = _ref4$rollCount === void 0 ? useRollCount() : _ref4$rollCount;

        return rollCount === 0;
      };
      var useHasRolledOnce = function useHasRolledOnce() {
        var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref5$rollCount = _ref5.rollCount,
            rollCount = _ref5$rollCount === void 0 ? useRollCount() : _ref5$rollCount;

        return rollCount > 0;
      };
      var useIsFirstRoll = function useIsFirstRoll() {
        var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref6$rollCount = _ref6.rollCount,
            rollCount = _ref6$rollCount === void 0 ? useRollCount() : _ref6$rollCount;

        return rollCount === 1;
      };
      var useSymbolsInChest = function useSymbolsInChest() {
        var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref8$dices = _ref8.dices,
            dices = _ref8$dices === void 0 ? useDices() : _ref8$dices,
            _ref8$chestSlots = _ref8.chestSlots,
            chestSlots = _ref8$chestSlots === void 0 ? useChestSlots() : _ref8$chestSlots;

        return Object.keys(chestSlots).reduce(function (previous, chestSlot) {
          var chestSlotContent = chestSlots[chestSlot];

          if (chestSlotContent && chestSlotContent.type === "symbol") {
            return [].concat(_toConsumableArray(previous), [chestSlotContent.value]);
          }

          if (chestSlotContent && chestSlotContent.type === "dice") {
            var diceId = chestSlotContent.value;
            var dice = dices[diceId];
            return [].concat(_toConsumableArray(previous), [diceToVisibleSymbol(dice)]);
          }

          return previous;
        }, []);
      };
      var useRemainingSpotInCursedArea = function useRemainingSpotInCursedArea() {
        var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref9$skullCountInCur = _ref9.skullCountInCursedArea,
            skullCountInCursedArea = _ref9$skullCountInCur === void 0 ? useSkullCountInCursedArea() : _ref9$skullCountInCur;

        return 3 - skullCountInCursedArea;
      };
      var useHasDicesToCurse = function useHasDicesToCurse() {
        var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref10$dicesToCurse = _ref10.dicesToCurse,
            dicesToCurse = _ref10$dicesToCurse === void 0 ? useDicesToCurse() : _ref10$dicesToCurse;

        return dicesToCurse.length > 0;
      };
      var useDicesToCurse = function useDicesToCurse() {
        var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref12$dices = _ref12.dices,
            dices = _ref12$dices === void 0 ? useDices() : _ref12$dices,
            _ref12$diceRolledIds = _ref12.diceRolledIds,
            diceRolledIds = _ref12$diceRolledIds === void 0 ? useDiceRolledIds() : _ref12$diceRolledIds,
            _ref12$witchUncursedD = _ref12.witchUncursedDiceId,
            witchUncursedDiceId = _ref12$witchUncursedD === void 0 ? useWitchUncursedDiceId() : _ref12$witchUncursedD,
            _ref12$remainingSpotI = _ref12.remainingSpotInCursedArea,
            remainingSpotInCursedArea = _ref12$remainingSpotI === void 0 ? useRemainingSpotInCursedArea() : _ref12$remainingSpotI;

        var dicesToCurse = diceRolledIds.map(function (diceRolledId) {
          return dices[diceRolledId];
        }).filter(function (diceRolled) {
          if (!diceIsOnSkull(diceRolled)) return false;
          if (diceRolled.id === witchUncursedDiceId) return false;
          return true;
        }).slice(0, remainingSpotInCursedArea);
        return dicesToCurse;
      };
      var useRollDiceAllowed = function useRollDiceAllowed() {
        var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref13$currentCardId = _ref13.currentCardId,
            currentCardId = _ref13$currentCardId === void 0 ? useCurrentCardId() : _ref13$currentCardId,
            _ref13$hasNeverRolled = _ref13.hasNeverRolled,
            hasNeverRolled = _ref13$hasNeverRolled === void 0 ? useHasNeverRolled() : _ref13$hasNeverRolled,
            _ref13$scoreMarked = _ref13.scoreMarked,
            scoreMarked = _ref13$scoreMarked === void 0 ? useScoreMarked() : _ref13$scoreMarked,
            _ref13$threeSkullsOrM = _ref13.threeSkullsOrMoreInCursedArea,
            threeSkullsOrMoreInCursedArea = _ref13$threeSkullsOrM === void 0 ? useThreeSkullsOrMoreInCursedArea() : _ref13$threeSkullsOrM,
            _ref13$hasDicesToCurs = _ref13.hasDicesToCurse,
            hasDicesToCurse = _ref13$hasDicesToCurs === void 0 ? useHasDicesToCurse() : _ref13$hasDicesToCurs;

        if (!currentCardId) {
          return false;
        }

        if (scoreMarked) {
          return false;
        }

        if (hasNeverRolled) {
          return true;
        }

        if (threeSkullsOrMoreInCursedArea) {
          if (isChestCard(cardIdToCard(currentCardId))) {
            return true;
          }

          return false;
        }

        if (hasDicesToCurse) {
          return false;
        }

        return true;
      };
      var useThreeSkullsOrMoreInCursedArea = function useThreeSkullsOrMoreInCursedArea() {
        var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref14$skullCountInCu = _ref14.skullCountInCursedArea,
            skullCountInCursedArea = _ref14$skullCountInCu === void 0 ? useSkullCountInCursedArea() : _ref14$skullCountInCu;

        return skullCountInCursedArea > 2;
      };
      var useSkullCountInCursedArea = function useSkullCountInCursedArea() {
        var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref15$diceCursedIds = _ref15.diceCursedIds,
            diceCursedIds = _ref15$diceCursedIds === void 0 ? useDiceCursedIds() : _ref15$diceCursedIds,
            _ref15$symbolsFromCar = _ref15.symbolsFromCard,
            symbolsFromCard = _ref15$symbolsFromCar === void 0 ? useSymbolsFromCard() : _ref15$symbolsFromCar;

        return diceCursedIds.length + symbolsFromCard.filter(function (symbol) {
          return symbolIsSkull(symbol);
        }).length;
      };

      var useSymbolsFromCard = function useSymbolsFromCard() {
        var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref16$currentCardId = _ref16.currentCardId,
            currentCardId = _ref16$currentCardId === void 0 ? useCurrentCardId() : _ref16$currentCardId;

        if (!currentCardId) return [];
        var currentCard = cardIdToCard(currentCardId);
        if (isCoinCard(currentCard)) return [SYMBOL_COIN];
        if (isDiamondCard(currentCard)) return [SYMBOL_DIAMOND];
        if (isOneSkullCard(currentCard)) return [SYMBOL_SKULL];
        if (isTwoSkullsCard(currentCard)) return [SYMBOL_SKULL, SYMBOL_SKULL];
        return [];
      };

      var useMarkScoreButtonVisible = function useMarkScoreButtonVisible() {
        var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref17$hasRolledOnce = _ref17.hasRolledOnce,
            hasRolledOnce = _ref17$hasRolledOnce === void 0 ? useHasRolledOnce() : _ref17$hasRolledOnce,
            _ref17$scoreMarked = _ref17.scoreMarked,
            scoreMarked = _ref17$scoreMarked === void 0 ? useScoreMarked() : _ref17$scoreMarked,
            _ref17$currentCardId = _ref17.currentCardId,
            currentCardId = _ref17$currentCardId === void 0 ? useCurrentCardId() : _ref17$currentCardId,
            _ref17$hasDicesToCurs = _ref17.hasDicesToCurse,
            hasDicesToCurse = _ref17$hasDicesToCurs === void 0 ? useHasDicesToCurse() : _ref17$hasDicesToCurs;

        if (scoreMarked) {
          return false;
        }

        if (hasDicesToCurse) {
          return false;
        }

        if (!currentCardId) {
          return false;
        }

        if (!hasRolledOnce) {
          return false;
        }

        return true;
      };
      var useMarkScoreAllowed = function useMarkScoreAllowed() {
        var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref18$scoreMarked = _ref18.scoreMarked,
            scoreMarked = _ref18$scoreMarked === void 0 ? useScoreMarked() : _ref18$scoreMarked,
            _ref18$currentCardId = _ref18.currentCardId,
            currentCardId = _ref18$currentCardId === void 0 ? useCurrentCardId() : _ref18$currentCardId,
            _ref18$threeSkullsOrM = _ref18.threeSkullsOrMoreInCursedArea,
            threeSkullsOrMoreInCursedArea = _ref18$threeSkullsOrM === void 0 ? useThreeSkullsOrMoreInCursedArea() : _ref18$threeSkullsOrM,
            _ref18$hasDicesToCurs = _ref18.hasDicesToCurse,
            hasDicesToCurse = _ref18$hasDicesToCurs === void 0 ? useHasDicesToCurse() : _ref18$hasDicesToCurs;

        if (scoreMarked) {
          return false;
        }

        if (threeSkullsOrMoreInCursedArea) {
          if (isChestCard(cardIdToCard(currentCardId))) {
            return true;
          }

          return false;
        }

        if (hasDicesToCurse) {
          return false;
        }

        if (!currentCardId) {
          return false;
        }

        return true;
      };
      var useStartNextRoundAllowed = function useStartNextRoundAllowed() {
        var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref19$rollDiceAllowe = _ref19.rollDiceAllowed,
            rollDiceAllowed = _ref19$rollDiceAllowe === void 0 ? useRollDiceAllowed() : _ref19$rollDiceAllowe,
            _ref19$markScoreAllow = _ref19.markScoreAllowed,
            markScoreAllowed = _ref19$markScoreAllow === void 0 ? useMarkScoreAllowed() : _ref19$markScoreAllow,
            _ref19$hasDicesToCurs = _ref19.hasDicesToCurse,
            hasDicesToCurse = _ref19$hasDicesToCurs === void 0 ? useHasDicesToCurse() : _ref19$hasDicesToCurs;

        if (rollDiceAllowed) {
          return false;
        }

        if (markScoreAllowed) {
          return false;
        }

        if (hasDicesToCurse) {
          return false;
        }

        return true;
      };
      var useRoundScore = function useRoundScore() {
        var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref20$currentCardId = _ref20.currentCardId,
            currentCardId = _ref20$currentCardId === void 0 ? useCurrentCardId() : _ref20$currentCardId,
            _ref20$symbolsInChest = _ref20.symbolsInChest,
            symbolsInChest = _ref20$symbolsInChest === void 0 ? useSymbolsInChest() : _ref20$symbolsInChest,
            _ref20$scoreMarked = _ref20.scoreMarked,
            scoreMarked = _ref20$scoreMarked === void 0 ? useScoreMarked() : _ref20$scoreMarked,
            _ref20$markScoreAllow = _ref20.markScoreAllowed,
            markScoreAllowed = _ref20$markScoreAllow === void 0 ? useMarkScoreAllowed() : _ref20$markScoreAllow;

        return useMemo(function () {
          return computeRoundScore({
            card: cardIdToCard(currentCardId),
            symbolsInChest: symbolsInChest,
            scoreMarked: scoreMarked,
            markScoreAllowed: markScoreAllowed
          });
        }, [currentCardId, symbolsInChest, scoreMarked, markScoreAllowed]);
      };

      var useStartPlayerRound = createAction(function (state, player) {
        return _objectSpread(_objectSpread({}, state), {}, {
          currentPlayerId: player.id,
          currentCardId: null,
          currentCardActivated: false,
          roundStarted: true
        });
      });
      var useActivateCurrentCard = createAction(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          currentCardActivated: true
        }, ROUND_START_STATE);
      });
      var useSendToSkullIsland = createAction(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          isOnSkullIsland: true
        });
      });
      var useMarkScore = createAction(function (state, score) {
        var players = state.players,
            currentPlayerId = state.currentPlayerId;
        var currentPlayer = players.find(function (_ref) {
          var id = _ref.id;
          return id === currentPlayerId;
        });
        var nextScore = currentPlayer.score + score;
        currentPlayer.score = nextScore < 0 ? 0 : nextScore;
        return _objectSpread(_objectSpread({}, state), {}, {
          players: _toConsumableArray(players),
          scoreMarked: true
        });
      });
      var useResetRound = createAction(function (state) {
        return _objectSpread(_objectSpread({}, state), ROUND_START_STATE);
      });
      var useEndPlayerRound = createAction(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          roundStarted: false
        });
      });
      var ROUND_START_STATE = {
        witchUncursedDiceId: null,
        rollCount: 0,
        diceRolledIds: [],
        diceCursedIds: [],
        chestSlots: {
          1: null,
          2: null,
          3: null,
          4: null,
          5: null,
          6: null,
          7: null,
          8: null,
          9: null
        },
        scoreMarked: false,
        isOnSkullIsland: false
      };

      var useSetDiceRolledAreaPosition = createAction(function (state, dice, _ref, zIndex) {
        var x = _ref.x,
            y = _ref.y;
        var dices = state.dices;
        dice.rolledAreaPosition = {
          x: x,
          y: y
        };
        dice.rolledAreaZIndex = zIndex;
        return _objectSpread(_objectSpread({}, state), {}, {
          dices: _objectSpread({}, dices)
        });
      });
      var useSetDiceChestSlot = createAction(function (state, dice, chestSlot) {
        var chestSlots = state.chestSlots;
        var previousChestSlot = Object.keys(chestSlots).find(function (chestSlot) {
          var chestSlotContent = chestSlots[chestSlot];
          return chestSlotContent && chestSlotContent.type === "dice" && chestSlotContent.value === dice.id;
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          chestSlots: _objectSpread(_objectSpread(_objectSpread({}, chestSlots), previousChestSlot ? _defineProperty({}, previousChestSlot, null) : {}), {}, _defineProperty({}, chestSlot, {
            type: "dice",
            value: dice.id
          }))
        });
      });
      var useCurseDice = createAction(function (state, dice) {
        var diceRolledIds = state.diceRolledIds,
            diceCursedIds = state.diceCursedIds;
        return _objectSpread(_objectSpread({}, state), {}, {
          diceRolledIds: diceRolledIds.filter(function (diceRolledId) {
            return diceRolledId !== dice.id;
          }),
          diceCursedIds: [].concat(_toConsumableArray(diceCursedIds), [dice.id])
        });
      });
      var useUncurseDice = createAction(function (state, dice) {
        var fromLab = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var diceRolledIds = state.diceRolledIds,
            diceCursedIds = state.diceCursedIds;
        return _objectSpread(_objectSpread(_objectSpread({}, state), fromLab ? {} : {
          witchUncursedDiceId: dice.id
        }), {}, {
          diceRolledIds: [].concat(_toConsumableArray(diceRolledIds), [dice.id]),
          diceCursedIds: diceCursedIds.filter(function (diceCursedId) {
            return diceCursedId !== dice.id;
          })
        });
      });
      var useUnkeepDice = createAction(function (state, dice) {
        var diceRolledIds = state.diceRolledIds,
            chestSlots = state.chestSlots;
        var previousChestSlot = Object.keys(chestSlots).find(function (chestSlot) {
          var chestSlotContent = chestSlots[chestSlot];
          return chestSlotContent && chestSlotContent.type === "dice" && chestSlotContent.value === dice.id;
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          diceRolledIds: [].concat(_toConsumableArray(diceRolledIds), [dice.id]),
          chestSlots: _objectSpread(_objectSpread({}, chestSlots), {}, _defineProperty({}, previousChestSlot, null))
        });
      });
      var useKeepDice = createAction(function (state, dice, chestSlot) {
        var diceRolledIds = state.diceRolledIds,
            chestSlots = state.chestSlots;
        return _objectSpread(_objectSpread({}, state), {}, {
          diceRolledIds: diceRolledIds.filter(function (diceRolledId) {
            return diceRolledId !== dice.id;
          }),
          chestSlots: _objectSpread(_objectSpread({}, chestSlots), {}, _defineProperty({}, chestSlot, {
            type: "dice",
            value: dice.id
          }))
        });
      });

      var useEffect = react.useEffect;
      var RoundEffects = function RoundEffects() {
        useRoundEffects();
        return null;
      };
      var useRoundEffects = function useRoundEffects() {
        useCurseDiceEffect();
        useFailSwordChallengeEffect();
        useFourSkullsOrMoreOnFirstRollEffect();
      };

      var useCurseDiceEffect = function useCurseDiceEffect() {
        var dicesToCurse = useDicesToCurse();
        var curseDice = useCurseDice();
        useEffect(function () {
          if (dicesToCurse.length === 0) return function () {};
          var timeout = setTimeout(function () {
            dicesToCurse.forEach(function (dice) {
              curseDice(dice);
            });
          }, 1000);
          return function () {
            clearTimeout(timeout);
          };
        }, [dicesToCurse]);
      }; // auto mark score for failed sword challenges


      var useFailSwordChallengeEffect = function useFailSwordChallengeEffect() {
        var currentCard = cardIdToCard(useCurrentCardId());
        var scoreMarked = useScoreMarked();
        var markScore = useMarkScore();
        var threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea();
        var threeSkullsOrMoreInCursedAreaBecomesTrue = useBecomes(function (threeSkullsOrMoreInCursedAreaPrevious) {
          return !threeSkullsOrMoreInCursedAreaPrevious && threeSkullsOrMoreInCursedArea;
        }, [threeSkullsOrMoreInCursedArea]);
        var roundScore = useRoundScore();
        var swordChallengeCard = isSwordChallengeCard(currentCard);
        useEffect(function () {
          if (swordChallengeCard && !scoreMarked && threeSkullsOrMoreInCursedAreaBecomesTrue) {
            markScore(roundScore);
          }
        }, [swordChallengeCard, scoreMarked, threeSkullsOrMoreInCursedAreaBecomesTrue, roundScore]);
      }; // go to skull island if 4 skulls or more on first roll


      var useFourSkullsOrMoreOnFirstRollEffect = function useFourSkullsOrMoreOnFirstRollEffect() {
        var isFirstRoll = useIsFirstRoll();
        var currentCard = cardIdToCard(useCurrentCardId());
        var isOnSkullIsland = useIsOnSkullIsland();
        var skullCountInCursedArea = useSkullCountInCursedArea();
        var sendToSkullIsland = useSendToSkullIsland();
        useEffect(function () {
          if (!isFirstRoll) return;
          if (isOnSkullIsland) return;
          if (isSwordChallengeCard(currentCard)) return;
          if (skullCountInCursedArea < 4) return;
          sendToSkullIsland();
        }, [isFirstRoll, isOnSkullIsland, currentCard, skullCountInCursedArea]);
      };

      var useDrawCard = createAction(function (state) {
        var cardIds = state.cardIds,
            cardUsedIds = state.cardUsedIds;
        var cardDrawnId = cardIds[0];
        return _objectSpread(_objectSpread({}, state), {}, {
          cardIds: cardIds.slice(1),
          cardUsedIds: [].concat(_toConsumableArray(cardUsedIds), [cardDrawnId]),
          currentCardId: cardDrawnId
        });
      });
      var useAddExtraCoin = createAction(function (state) {
        var chestSlots = state.chestSlots;
        return _objectSpread(_objectSpread({}, state), {}, {
          chestSlots: _objectSpread(_objectSpread({}, chestSlots), {}, {
            1: {
              type: "symbol",
              value: SYMBOL_COIN
            }
          })
        });
      });
      var useAddExtraDiamond = createAction(function (state) {
        var chestSlots = state.chestSlots;
        return _objectSpread(_objectSpread({}, state), {}, {
          chestSlots: _objectSpread(_objectSpread({}, chestSlots), {}, {
            1: {
              type: "symbol",
              value: SYMBOL_DIAMOND
            }
          })
        });
      });
      var useShuffleDeck = createAction(function (state) {
        var cardUsedIds = state.cardUsedIds;
        return _objectSpread(_objectSpread({}, state), {}, {
          cardIds: mixDeck(cardUsedIds),
          cardUsedIds: []
        });
      });
      var useUndrawCard = createAction(function (state) {
        var currentCardId = state.currentCardId,
            cardIds = state.cardIds,
            cardUsedIds = state.cardUsedIds;
        return _objectSpread(_objectSpread({}, state), {}, {
          currentCardId: null,
          cardIds: [currentCardId].concat(_toConsumableArray(cardIds)),
          cardUsedIds: cardUsedIds.slice(1)
        });
      });

      var CardsEffects = function CardsEffects() {
        useCoinCardEffect();
        useDiamondCardEffect();
        return null;
      };

      var useCoinCardEffect = function useCoinCardEffect() {
        var addExtraCoin = useAddExtraCoin();
        var currentCardId = useCurrentCardId();
        var drawCoinCard = useBecomes(function (currentCardIdPrevious) {
          return !currentCardIdPrevious && currentCardId && isCoinCard(cardIdToCard(currentCardId));
        }, [currentCardId]);
        react.useEffect(function () {
          if (drawCoinCard) {
            addExtraCoin();
          }
        }, [drawCoinCard]);
      };

      var useDiamondCardEffect = function useDiamondCardEffect() {
        var addExtraDiamond = useAddExtraDiamond();
        var currentCardId = useCurrentCardId();
        var drawDiamondCard = useBecomes(function (currentCardIdPrevious) {
          return !currentCardIdPrevious && currentCardId && isDiamondCard(cardIdToCard(currentCardId));
        }, [currentCardId]);
        react.useEffect(function () {
          if (drawDiamondCard) {
            addExtraDiamond();
          }
        }, [drawDiamondCard]);
      };

      var DiceOnGoing = function DiceOnGoing(_ref) {
        var rolledAreaRef = _ref.rolledAreaRef,
            offscreenRef = _ref.offscreenRef,
            diceOverRolledAreaSignal = _ref.diceOverRolledAreaSignal;
        var diceOverRolledArea = useSignalListener(diceOverRolledAreaSignal);
        return /*#__PURE__*/react.createElement("div", {
          className: "dice-ongoing"
        }, /*#__PURE__*/react.createElement("div", {
          className: "map"
        }), /*#__PURE__*/react.createElement("div", {
          className: "area",
          ref: rolledAreaRef,
          style: _objectSpread({}, diceOverRolledArea ? {
            outline: "2px dotted"
          } : {})
        }), /*#__PURE__*/react.createElement("div", {
          className: "offscreen-area",
          ref: offscreenRef
        }));
      };

      var findFirstDescendant = function findFirstDescendant(rootNode, fn) {
        var iterator = createNextNodeIterator(rootNode, rootNode);

        var _iterator$next = iterator.next(),
            done = _iterator$next.done,
            node = _iterator$next.value;

        while (done === false) {
          if (fn(node)) {
            return node;
          }

          var _iterator$next2 = iterator.next();

          done = _iterator$next2.done;
          node = _iterator$next2.value;
        }

        return null;
      };
      var findLastDescendant = function findLastDescendant(rootNode, fn) {
        var deepestNode = getDeepestNode(rootNode);

        if (deepestNode) {
          var iterator = createPreviousNodeIterator(deepestNode, rootNode);

          var _iterator$next3 = iterator.next(),
              done = _iterator$next3.done,
              node = _iterator$next3.value;

          while (done === false) {
            if (fn(node)) {
              return node;
            }

            var _iterator$next4 = iterator.next();

            done = _iterator$next4.done;
            node = _iterator$next4.value;
          }
        }

        return null;
      };
      var findAfter = function findAfter(_ref) {
        var from = _ref.from,
            _ref$root = _ref.root,
            root = _ref$root === void 0 ? null : _ref$root,
            predicate = _ref.predicate,
            _ref$skipChildren = _ref.skipChildren,
            skipChildren = _ref$skipChildren === void 0 ? false : _ref$skipChildren;
        var iterator = createAfterNodeIterator(from, root, skipChildren);

        var _iterator$next5 = iterator.next(),
            done = _iterator$next5.done,
            node = _iterator$next5.value;

        while (done === false) {
          if (predicate(node)) {
            return node;
          }

          var _iterator$next6 = iterator.next();

          done = _iterator$next6.done;
          node = _iterator$next6.value;
        }

        return null;
      };
      var findBefore = function findBefore(_ref2) {
        var from = _ref2.from,
            _ref2$root = _ref2.root,
            root = _ref2$root === void 0 ? null : _ref2$root,
            predicate = _ref2.predicate;
        var iterator = createPreviousNodeIterator(from, root);

        var _iterator$next7 = iterator.next(),
            done = _iterator$next7.done,
            node = _iterator$next7.value;

        while (done === false) {
          if (predicate(node)) {
            return node;
          }

          var _iterator$next8 = iterator.next();

          done = _iterator$next8.done;
          node = _iterator$next8.value;
        }

        return null;
      };

      var getNextNode = function getNextNode(node, rootNode) {
        var skipChild = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!skipChild) {
          var firstChild = node.firstChild;

          if (firstChild) {
            return firstChild;
          }
        }

        var nextSibling = node.nextSibling;

        if (nextSibling) {
          return nextSibling;
        }

        var parentNode = node.parentNode;

        if (parentNode && parentNode !== rootNode) {
          return getNextNode(parentNode, rootNode, true);
        }

        return null;
      };

      var createNextNodeIterator = function createNextNodeIterator(node, rootNode) {
        var current = node;

        var next = function next() {
          var nextNode = getNextNode(current, rootNode);
          current = nextNode;
          return {
            done: Boolean(nextNode) === false,
            value: nextNode
          };
        };

        return {
          next: next
        };
      };

      var createAfterNodeIterator = function createAfterNodeIterator(fromNode, rootNode) {
        var skipChildren = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var current = fromNode;
        var childrenSkipped = false;

        var next = function next() {
          var nextNode = getNextNode(current, rootNode, skipChildren && childrenSkipped === false);
          childrenSkipped = true;
          current = nextNode;
          return {
            done: Boolean(nextNode) === false,
            value: nextNode
          };
        };

        return {
          next: next
        };
      };

      var getDeepestNode = function getDeepestNode(node) {
        var deepestNode = node.lastChild;

        while (deepestNode) {
          var lastChild = deepestNode.lastChild;

          if (lastChild) {
            deepestNode = lastChild;
          } else {
            break;
          }
        }

        return deepestNode;
      };

      var getPreviousNode = function getPreviousNode(node, rootNode) {
        var previousSibling = node.previousSibling;

        if (previousSibling) {
          var deepestChild = getDeepestNode(previousSibling);

          if (deepestChild) {
            return deepestChild;
          }

          return previousSibling;
        }

        if (node !== rootNode) {
          var parentNode = node.parentNode;

          if (parentNode && parentNode !== rootNode) {
            return parentNode;
          }
        }

        return null;
      };

      var createPreviousNodeIterator = function createPreviousNodeIterator(fromNode, rootNode) {
        var current = fromNode;

        var next = function next() {
          var previousNode = getPreviousNode(current, rootNode);
          current = previousNode;
          return {
            done: Boolean(previousNode) === false,
            value: previousNode
          };
        };

        return {
          next: next
        };
      };

      var firstFocusableDescendantOrSelf = function firstFocusableDescendantOrSelf(element) {
        var firstFocusableDescendant = findFirstDescendant(element, isFocusable);
        if (firstFocusableDescendant) return firstFocusableDescendant;
        if (isFocusable(element)) return element;
        return null;
      };
      var trapFocusInside = function trapFocusInside(element) {
        if (element.nodeType === 3) {
          console.warn("cannot trap focus inside a text node");
          return function () {};
        }

        var trappedElement = activeTraps.find(function (activeTrap) {
          return activeTrap.element === element;
        });

        if (trappedElement) {
          console.warn("focus already trapped inside this element");
          return function () {};
        }

        var isEventOutside = function isEventOutside(event) {
          if (event.target === element) return false;
          if (element.contains(event.target)) return false;
          return true;
        };

        var getFirstTabbable = function getFirstTabbable() {
          return findFirstDescendant(element, isDiscoverableWithKeyboard);
        };

        var getLastTabbable = function getLastTabbable() {
          return findLastDescendant(element, isDiscoverableWithKeyboard);
        };

        var getPreviousTabbableOrLast = function getPreviousTabbableOrLast() {
          var previous = findBefore({
            from: document.activeElement,
            root: element,
            predicate: isDiscoverableWithKeyboard
          });
          return previous || getLastTabbable();
        };

        var getNextTabbableOrFirst = function getNextTabbableOrFirst() {
          var next = findAfter({
            from: document.activeElement,
            root: element,
            predicate: isDiscoverableWithKeyboard
          });
          return next || getFirstTabbable();
        };

        var performTabEventNavigation = function performTabEventNavigation(event) {
          var activeElement = document.activeElement;
          var activeElementIsBody = activeElement === document.body;

          if (event.shiftKey) {
            var elementToFocus = activeElementIsBody ? getLastTabbable() : getPreviousTabbableOrLast();

            if (elementToFocus) {
              elementToFocus.focus();
            }
          } else {
            var _elementToFocus = activeElementIsBody ? getFirstTabbable() : getNextTabbableOrFirst();

            if (_elementToFocus) {
              _elementToFocus.focus();
            }
          }
        };

        var lock = function lock() {
          var onmousedown = function onmousedown(event) {
            if (isEventOutside(event)) {
              event.preventDefault();
              event.stopImmediatePropagation();
            }
          };

          var onkeydown = function onkeydown(event) {
            if (isTabEvent(event)) {
              event.preventDefault();
              performTabEventNavigation(event);
            }
          };

          document.addEventListener("mousedown", onmousedown, {
            capture: true,
            passive: false
          });
          document.addEventListener("keydown", onkeydown, {
            capture: true,
            passive: false
          });
          return function () {
            document.removeEventListener("mousedown", onmousedown, {
              capture: true,
              passive: false
            });
            document.removeEventListener("keydown", onkeydown, {
              capture: true,
              passive: false
            });
          };
        };

        var deactivate = activate({
          element: element,
          lock: lock
        });

        var untrap = function untrap() {
          deactivate();
        };

        return untrap;
      };

      var hasNegativeTabIndex = function hasNegativeTabIndex(element) {
        return element.hasAttribute && element.hasAttribute("tabIndex") && Number(element.getAttribute("tabindex")) < 0;
      };

      var isDiscoverableWithKeyboard = function isDiscoverableWithKeyboard(element) {
        if (hasNegativeTabIndex(element)) {
          return false;
        }

        return isFocusable(element);
      };

      var isTabEvent = function isTabEvent(event) {
        return event.key === "Tab" || event.keyCode === 9;
      };

      var activeTraps = [];

      var activate = function activate(_ref) {
        var lock = _ref.lock;
        // unlock any trap currently activated
        var previousTrap;

        if (activeTraps.length > 0) {
          previousTrap = activeTraps[activeTraps.length - 1];
          previousTrap.unlock();
        } // store trap methods to lock/unlock as traps are acivated/deactivated


        var trap = {
          lock: lock,
          unlock: lock()
        };
        activeTraps.push(trap);
        return function () {
          if (activeTraps.length === 0) {
            console.warn("cannot deactivate an already deactivated trap");
            return;
          }

          var lastTrap = activeTraps[activeTraps.length - 1];

          if (trap !== lastTrap) {
            // TODO: investigate this and maybe remove this requirment
            console.warn("you must deactivate trap in the same order they were activated");
            return;
          }

          activeTraps.pop();
          trap.unlock(); // if any,reactivate the previous trap

          if (previousTrap) {
            previousTrap.unlock = previousTrap.lock();
          }
        };
      };

      var trapScrollInside = function trapScrollInside(element) {
        var elementsToScrollLock = [];
        var previous = element.previousSibling;

        while (previous) {
          if (previous.nodeType === 1) {
            if (isScrollable(previous)) {
              elementsToScrollLock.push(previous);
            }
          }

          previous = previous.previousSibling;
        }

        var scrollableParent = getScrollableParent(element);
        elementsToScrollLock.push(scrollableParent);
        var cleanUpArray = elementsToScrollLock.map(function (element) {
          var prev = element.style.overflow;
          element.style.overflow = "hidden";
          return function () {
            if (prev) {
              element.style.overflow = prev;
            } else {
              delete element.style.overflow;
            }
          };
        });
        return function () {
          cleanUpArray.forEach(function (cleanup) {
            cleanup();
          });
        };
      };

      var getScrollableParent = function getScrollableParent(arg) {
        if (_typeof(arg) !== "object" || arg.nodeType !== 1) {
          throw new TypeError("getScrollableParent first argument must be DOM node");
        }

        var element = arg;
        var position = getStyleValue(element, "position");

        if (position === "fixed") {
          return getScrollingElement(element.ownerDocument);
        }

        return findScrollableParent(element) || getScrollingElement(element.ownerDocument);
      };

      var getScrollingElement = function getScrollingElement(document) {
        if ("scrollingElement" in document) {
          return document.scrollingElement;
        }

        if (isCompliant(document)) {
          return document.documentElement;
        }

        var body = document.body;
        var isFrameset = body && !/body/i.test(body.tagName);
        var possiblyScrollingElement = isFrameset ? getNextBodyElement(body) : body; // If `body` is itself scrollable, it is not the `scrollingElement`.

        return possiblyScrollingElement && bodyIsScrollable(possiblyScrollingElement) ? null : possiblyScrollingElement;
      };

      var getNextBodyElement = function getNextBodyElement(frameset) {
        // We use this function to be correct per spec in case `document.body` is
        // a `frameset` but there exists a later `body`. Since `document.body` is
        // a `frameset`, we know the root is an `html`, and there was no `body`
        // before the `frameset`, so we just need to look at siblings after the
        // `frameset`.
        var current = frameset;

        while (current = current.nextSibling) {
          if (current.nodeType === 1 && isBodyElement(current)) {
            return current;
          }
        }

        return null;
      };

      var isBodyElement = function isBodyElement(element) {
        return element.ownerDocument.body === element;
      };

      var bodyIsScrollable = function bodyIsScrollable(body) {
        // a body element is scrollable if body and html are scrollable and rendered
        if (!isScrollable(body)) {
          return false;
        }

        if (isHidden(body)) {
          return false;
        }

        var documentElement = body.ownerDocument.documentElement;

        if (!isScrollable(documentElement)) {
          return false;
        }

        if (isHidden(documentElement)) {
          return false;
        }

        return true;
      };

      var isHidden = function isHidden(element) {
        var display = getStyleValue(element, "display");

        if (display === "none") {
          return false;
        }

        if (display === "table-row" || display === "table-group" || display === "table-column") {
          return getStyleValue(element, "visibility") !== "collapsed";
        }

        return true;
      };

      var isCompliant = function isCompliant(document) {
        // Note: document.compatMode can be toggle at runtime by document.write
        var isStandardsMode = /^CSS1/.test(document.compatMode);

        if (isStandardsMode) {
          return testScrollCompliance(document);
        }

        return false;
      };

      var testScrollCompliance = function testScrollCompliance(document) {
        var iframe = document.createElement("iframe");
        iframe.style.height = "1px";
        var parentNode = document.body || document.documentElement || document;
        parentNode.appendChild(iframe);
        var iframeDocument = iframe.contentWindow.document;
        iframeDocument.write('<!DOCTYPE html><div style="height:9999em">x</div>');
        iframeDocument.close();
        var scrollComplianceResult = iframeDocument.documentElement.scrollHeight > iframeDocument.body.scrollHeight;
        iframe.parentNode.removeChild(iframe);
        return scrollComplianceResult;
      };

      var isScrollable = function isScrollable(element) {
        // note: keep in mind that an element with overflow: 'hidden' is scrollable
        // it can be scrolled using keyboard arrows or JavaScript properties such as scrollTop, scrollLeft
        if (!verticalOverflowIsVisible(element)) {
          return true;
        }

        if (!horizontalOverflowIsVisible(element)) {
          return true;
        }

        return false;
      };

      var verticalOverflowIsVisible = function verticalOverflowIsVisible(element) {
        var verticalOverflow = getStyleValue(element, "overflow-x");

        if (verticalOverflow === "visible") {
          return true;
        }

        var overflow = getStyleValue(element, "overflow");
        return overflow === "visible";
      };

      var horizontalOverflowIsVisible = function horizontalOverflowIsVisible(element) {
        var horizontalOverflow = getStyleValue(element, "overflow-y");

        if (horizontalOverflow === "visible") {
          return true;
        }

        var overflow = getStyleValue(element, "overflow");
        return overflow === "visible";
      };

      var findScrollableParent = function findScrollableParent(element) {
        var position = getStyleValue(element, "position");
        var parent = element.parentNode;

        while (parent) {
          if (isDocumentElement(parent)) {
            return null;
          }

          if (position === "absolute" && getStyleValue(parent, "position") === "static") {
            parent = parent.parentNode;
            continue;
          }

          if (isScrollable(parent)) {
            return parent;
          }

          parent = parent.parentNode;
        }

        return null;
      };

      var useEffect$1 = react.useEffect;
      /**
      https://github.com/reactjs/react-modal
      https://github.com/reactjs/react-modal/blob/master/src/components/ModalPortal.js
      https://fr.reactjs.org/docs/portals.html
      */

      var DIALOG_STYLE = {
        position: "absolute",
        top: "5%",
        left: "0",
        right: "0",
        width: "fit-content",
        height: "fit-content",
        margin: "auto",
        padding: "1em",
        // prevent body scrolling when scrolling the dialog content
        overscrollBehavior: "contain",
        outline: "none",
        background: "white",
        color: "black",
        border: "solid"
      };
      var BACKDROP_STYLE = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.46)"
      };
      var DialogBase = function DialogBase(_ref) {
        var _ref$container = _ref.container,
            container = _ref$container === void 0 ? document.body : _ref$container,
            children = _ref.children,
            isOpen = _ref.isOpen,
            _ref$closeMethod = _ref.closeMethod,
            closeMethod = _ref$closeMethod === void 0 ? "display-none" : _ref$closeMethod,
            _ref$stealFocus = _ref.stealFocus,
            stealFocus = _ref$stealFocus === void 0 ? true : _ref$stealFocus,
            _ref$restoreStolenFoc = _ref.restoreStolenFocus,
            restoreStolenFocus = _ref$restoreStolenFoc === void 0 ? true : _ref$restoreStolenFoc,
            _ref$trapFocus = _ref.trapFocus,
            trapFocus = _ref$trapFocus === void 0 ? true : _ref$trapFocus,
            _ref$requestCloseOnEs = _ref.requestCloseOnEscape,
            requestCloseOnEscape = _ref$requestCloseOnEs === void 0 ? true : _ref$requestCloseOnEs,
            _ref$requestCloseOnCl = _ref.requestCloseOnClickOutside,
            requestCloseOnClickOutside = _ref$requestCloseOnCl === void 0 ? false : _ref$requestCloseOnCl,
            _ref$onAfterOpen = _ref.onAfterOpen,
            onAfterOpen = _ref$onAfterOpen === void 0 ? function () {} : _ref$onAfterOpen,
            _ref$onRequestClose = _ref.onRequestClose,
            onRequestClose = _ref$onRequestClose === void 0 ? function () {} : _ref$onRequestClose,
            _ref$onFocusIn = _ref.onFocusIn,
            onFocusIn = _ref$onFocusIn === void 0 ? function () {} : _ref$onFocusIn,
            _ref$onFocusOut = _ref.onFocusOut,
            onFocusOut = _ref$onFocusOut === void 0 ? function () {} : _ref$onFocusOut,
            _ref$backdropProps = _ref.backdropProps,
            backdropProps = _ref$backdropProps === void 0 ? {} : _ref$backdropProps,
            rest = _objectWithoutProperties(_ref, ["container", "children", "isOpen", "closeMethod", "stealFocus", "restoreStolenFocus", "trapFocus", "requestCloseOnEscape", "requestCloseOnClickOutside", "onAfterOpen", "onRequestClose", "onFocusIn", "onFocusOut", "backdropProps"]);

        if (!container) return null;

        var _React$useState = react.useState(null),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            dialogElement = _React$useState2[0],
            setDialogElement = _React$useState2[1];

        var isInsideDocument = Boolean(dialogElement);
        var becomesOpen = useBecomes(function (isActivePrevious) {
          return !isActivePrevious && isOpen;
        }, [isOpen]);

        if (becomesOpen) {
          onAfterOpen();
        } // onFocusIn, onFocusOut implementation
        // https://github.com/facebook/react/issues/6410


        useEffect$1(function () {
          if (!isOpen || !isInsideDocument) return function () {};
          var focusIsInsideDialog = hasOrContainsFocus(dialogElement);

          var onDocumentBlur = function onDocumentBlur(blurEvent) {
            // focus is leaving the document and it was inside dialog
            if (!blurEvent.relatedTarget) {
              if (focusIsInsideDialog) {
                focusIsInsideDialog = false;
                onFocusOut(blurEvent);
              }
            }
          };

          var onDialogFocus = function onDialogFocus(focusEvent) {
            onFocusIn(focusEvent);
            focusIsInsideDialog = true;
          };

          var onDocumentFocus = function onDocumentFocus(focusEvent) {
            if (hasOrContainsFocus(dialogElement)) {
              focusIsInsideDialog = true;
            } else {
              focusIsInsideDialog = false;
              onFocusOut(focusEvent);
            }
          };

          dialogElement.addEventListener("focus", onDialogFocus, true);
          document.addEventListener("focus", onDocumentFocus, true);
          document.addEventListener("blur", onDocumentBlur, true);
          return function () {
            dialogElement.removeEventListener("focus", onDialogFocus, true);
            document.removeEventListener("focus", onDocumentFocus, true);
            document.removeEventListener("blur", onDocumentBlur, true);
          };
        }, [isOpen, isInsideDocument, onFocusIn, onFocusOut]); // trap scroll inside dialog

        useEffect$1(function () {
          if (!isOpen || !isInsideDocument) return function () {};
          return trapScrollInside(dialogElement);
        }, [isOpen, isInsideDocument]); // trap focus inside dialog

        useEffect$1(function () {
          if (!isOpen || !isInsideDocument || !trapFocus) return function () {};
          return trapFocusInside(dialogElement);
        }, [isOpen, isInsideDocument, trapFocus]); // steal focus to move it into dialog when it opens

        useEffect$1(function () {
          if (!isOpen || !isInsideDocument || !stealFocus) return function () {};
          var nodeFocusedBeforeTransfer = document.activeElement;
          var firstFocusableElement = firstFocusableDescendantOrSelf(dialogElement);

          if (firstFocusableElement) {
            firstFocusableElement.focus();
          }

          return function () {
            if (firstFocusableElement) {
              if (typeof restoreStolenFocus === "function") {
                restoreStolenFocus(nodeFocusedBeforeTransfer);
              } else if (restoreStolenFocus === true) {
                nodeFocusedBeforeTransfer.focus();
              }
            }
          };
        }, [isOpen, isInsideDocument, stealFocus]); // put aria-hidden on elements behind this dialog

        useEffect$1(function () {
          if (!isOpen || !dialogElement || !dialogElement.parentNode) return function () {};
          var elementsToHide = [];
          /*
          we hide previous and next siblings
          because when dialog is opened everything around it should be considered
          hidden (you cannot have several modal visible at the same time).
           Let's keep in mind we are talking about a dialog in the accessibility terms.
          It should focus trap, prevent interaction with the rest of the page
          and consider the rest as hidden.
          This dialog is not meant to be used for tooltip and so on.
          */

          var parentChildren = Array.from(dialogElement.parentNode.children);
          parentChildren.forEach(function (child) {
            if (child !== dialogElement) {
              elementsToHide.push(child);
            }
          });
          elementsToHide.forEach(function (element) {
            element.setAttribute("aria-hidden", "true");
          });
          return function () {
            elementsToHide.forEach(function (element) {
              element.removeAttribute("aria-hidden", "true");
            });
          };
        }, [isOpen, dialogElement]);

        if (closeMethod === "dom-remove" && !isOpen) {
          return null;
        }

        return reactDom.createPortal( /*#__PURE__*/react.createElement(react.Fragment, null, isOpen ? /*#__PURE__*/react.createElement(DialogBackDrop, _extends({}, backdropProps, {
          style: _objectSpread(_objectSpread({}, BACKDROP_STYLE), backdropProps.style) // mousedown on backdrop -> transfer focus to dialog
          ,
          onMouseDownPassive: function onMouseDownPassive(mousedownEvent) {
            // prevent mousedown on backdrop from putting focus on document.body
            mousedownEvent.preventDefault(); // instead foward focus to the dialog if not already inside

            if (!hasOrContainsFocus(dialogElement)) {
              var firstFocusableElement = firstFocusableDescendantOrSelf(dialogElement);

              if (firstFocusableElement) {
                firstFocusableElement.focus();
              }
            }
          },
          onClick: function onClick(clickEvent) {
            if (requestCloseOnClickOutside) {
              var target = clickEvent.target; // dialogElement.firstChild?

              if (target !== dialogElement && !dialogElement.contains(target)) {
                onRequestClose(clickEvent);
              }
            }

            if (backdropProps.onClick) backdropProps.onClick(clickEvent);
          }
        })) : null, /*#__PURE__*/react.createElement("div", _extends({}, rest, {
          style: _objectSpread(_objectSpread(_objectSpread({}, DIALOG_STYLE), rest.style), isOpen ? {} : getStyleForClose(closeMethod)),
          ref: function ref(element) {
            setDialogElement(element);
            if (rest.ref) rest.ref(element);
          },
          onKeyDown: function onKeyDown(keydownEvent) {
            if (requestCloseOnEscape && keydownEvent.keyCode === ESC_KEY) {
              onRequestClose(keydownEvent);
            }

            if (rest.onKeyDown) rest.onKeyDown(keydownEvent);
          },
          hidden: closeMethod === "hidden-attribute" ? isOpen : undefined,
          tabIndex: "-1"
        }), children)), container);
      };

      var DialogBackDrop = function DialogBackDrop(_ref2) {
        var onMouseDownPassive = _ref2.onMouseDownPassive,
            props = _objectWithoutProperties(_ref2, ["onMouseDownPassive"]);

        var _React$useState3 = react.useState(null),
            _React$useState4 = _slicedToArray(_React$useState3, 2),
            backdropElement = _React$useState4[0],
            setBackdropElement = _React$useState4[1];

        useEffect$1(function () {
          if (!backdropElement) return function () {};
          backdropElement.addEventListener("mousedown", onMouseDownPassive, {
            passive: false
          });
          return function () {
            backdropElement.removeEventListener("mousedown", onMouseDownPassive, {
              passive: false
            });
          };
        }, [backdropElement]);
        return /*#__PURE__*/react.createElement("div", _extends({
          ref: function ref(element) {
            setBackdropElement(element);
            if (props.ref) props.ref(element);
          }
        }, props));
      };

      var getStyleForClose = function getStyleForClose(closeMethod) {
        if (closeMethod === "display-none") {
          return {
            display: "none"
          };
        }

        if (closeMethod === "visibility-hidden") {
          return {
            visibility: "hidden"
          };
        }

        return {};
      };

      var hasOrContainsFocus = function hasOrContainsFocus(element) {
        var _document = document,
            activeElement = _document.activeElement;
        return element === activeElement || element.contains(activeElement);
      };

      var ESC_KEY = 27;

      var dialogCssUrl = System.resolve("./assets/dialog.css", module.meta.url);

      var Dialog = function Dialog(props) {
        return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(Stylesheet, {
          href: dialogCssUrl
        }), /*#__PURE__*/react.createElement(DialogBase, _extends({
          container: useMainDomNode(),
          backdropProps: {
            className: "dialog--backdrop"
          },
          style: {
            top: "10%",
            left: "6%",
            right: "6%",
            bottom: "8%",
            height: "auto",
            width: "auto",
            padding: "0",
            border: "none",
            background: "none",
            maxWidth: "620px",
            margin: "0 auto"
          },
          className: "dialog"
        }, props)));
      };

      var swordsDisabledImageUrl = System.resolve("./assets/swords-disabled.png", module.meta.url);

      var useSwordQuantityRequired = function useSwordQuantityRequired() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$currentCardId = _ref.currentCardId,
            currentCardId = _ref$currentCardId === void 0 ? useCurrentCardId() : _ref$currentCardId;

        var card = cardIdToCard(currentCardId);
        if (isSwordChallengeCard(card)) return card.numberOfSwords;
        return null;
      };
      var SwordChallengeIndicator = function SwordChallengeIndicator() {
        var currentCardId = useCurrentCardId();
        var symbolsInChest = useSymbolsInChest();
        var quantityRequired = useSwordQuantityRequired();

        if (!currentCardId) {
          return null;
        }

        var currentCard = cardIdToCard(currentCardId);

        if (!isSwordChallengeCard(currentCard)) {
          return null;
        }

        var quantityKept = countSymbol(symbolsInChest, SYMBOL_SWORD);
        var quantityRequiredArray = new Array(quantityRequired).fill("");
        return /*#__PURE__*/react.createElement("div", {
          className: "sword-challenge-indicators"
        }, quantityRequiredArray.map(function (value, index) {
          if (quantityKept >= index + 1) return /*#__PURE__*/react.createElement(SwordIconActivated, {
            key: index
          });
          return /*#__PURE__*/react.createElement(SwordIconDisabled, {
            key: index
          });
        }));
      };

      var SwordIconActivated = function SwordIconActivated() {
        return /*#__PURE__*/react.createElement("div", {
          className: "sword-icon"
        }, /*#__PURE__*/react.createElement(Image$1, {
          src: symbolSwordUrl
        }));
      };

      var SwordIconDisabled = function SwordIconDisabled() {
        return /*#__PURE__*/react.createElement("div", {
          className: "sword-icon disabled"
        }, /*#__PURE__*/react.createElement(Image$1, {
          src: swordsDisabledImageUrl
        }));
      };

      var StarRain = function StarRain() {
        return /*#__PURE__*/react.createElement("div", {
          className: "star-rain-container"
        }, /*#__PURE__*/react.createElement("div", {
          className: "star",
          id: "star-01"
        }, /*#__PURE__*/react.createElement(Star, null)), /*#__PURE__*/react.createElement("div", {
          className: "star",
          id: "star-02"
        }, /*#__PURE__*/react.createElement(Star, null)), /*#__PURE__*/react.createElement("div", {
          className: "star",
          id: "star-03"
        }, /*#__PURE__*/react.createElement(Star, null)), /*#__PURE__*/react.createElement("div", {
          className: "star",
          id: "star-04"
        }, /*#__PURE__*/react.createElement(Star, null)), /*#__PURE__*/react.createElement("div", {
          className: "star",
          id: "star-05"
        }, /*#__PURE__*/react.createElement(Star, null)), /*#__PURE__*/react.createElement("div", {
          className: "star",
          id: "star-06"
        }, /*#__PURE__*/react.createElement(Star, null)));
      };

      var Star = function Star() {
        return /*#__PURE__*/react.createElement("svg", {
          viewBox: "0 0 217.791 210.633"
        }, /*#__PURE__*/react.createElement("path", {
          fill: "#FFFFE6",
          d: "M94.15,77.97c0,0-2-54,10-73.5s23,28.5,25.5,72.5c0,0,69.197,4.589,86.5,21c13.637,12.934-61.5,31-87,33.5 c-2,14.5-1.831,60.464-16.5,75.5c-20,20.5-25.5-50.5-23-78c-19-1.5-81.5-3.5-89-17.5S52.15,85.97,94.15,77.97z"
        }));
      };

      var useState = react.useState,
          useEffect$2 = react.useEffect;

      var swordChallengeOngoing = function swordChallengeOngoing() {
        var currentCard = cardIdToCard(useCurrentCardId());
        var symbolsInChest = useSymbolsInChest();
        var quantityKept = countSymbol(symbolsInChest, SYMBOL_SWORD);
        var quantityRequired = useSwordQuantityRequired();
        if (!isSwordChallengeCard(currentCard)) return false;
        var challengeWon = quantityKept >= quantityRequired;
        return !challengeWon;
      };

      var RoundScore = function RoundScore() {
        var currentCard = cardIdToCard(useCurrentCardId());
        return /*#__PURE__*/react.createElement("div", {
          className: "score-area ".concat(swordChallengeOngoing() ? "animated" : "")
        }, currentCard ? /*#__PURE__*/react.createElement(ScoreDisplay, null) : null);
      };

      var ScoreDisplay = function ScoreDisplay() {
        var roundScore = useRoundScore();
        var currentCard = cardIdToCard(useCurrentCardId());
        var scoreMarked = useScoreMarked();

        var _useState = useState(false),
            _useState2 = _slicedToArray(_useState, 2),
            dialogIsOpen = _useState2[0],
            setDialogIsOpen = _useState2[1];

        var openDialog = function openDialog() {
          setDialogIsOpen(true);
        };

        var closeDialog = function closeDialog() {
          setDialogIsOpen(false);
        }; // const { isOnSkullIsland } = state
        // if (isOnSkullIsland) {
        //   return <span>Skull Island!</span>
        // }


        return /*#__PURE__*/react.createElement(react.Fragment, null, isPirateCard(currentCard) ? /*#__PURE__*/react.createElement(DoubleScoreIndicator, null) : null, scoreMarked && /*#__PURE__*/react.createElement(StarRain, null), /*#__PURE__*/react.createElement("div", {
          className: "round-score ".concat(swordChallengeOngoing() ? "hidden" : ""),
          onClick: function onClick() {
            openDialog();
          }
        }, roundScore), isSwordChallengeCard(currentCard) ? /*#__PURE__*/react.createElement(NegativeScoreSign, null) : null, /*#__PURE__*/react.createElement(ScoreRulesDialog, {
          dialogIsOpen: dialogIsOpen,
          closeDialog: closeDialog
        }));
      };

      var DoubleScoreIndicator = function DoubleScoreIndicator() {
        var currentCardActivated = useCurrentCardActivated();

        if (!currentCardActivated) {
          return /*#__PURE__*/react.createElement("div", {
            style: {
              display: "none"
            },
            className: "pirate-hook"
          });
        }

        return /*#__PURE__*/react.createElement("div", {
          className: "pirate-hook"
        });
      };

      var NegativeScoreSign = function NegativeScoreSign() {
        var roundScore = useRoundScore();
        var symbolsInChest = useSymbolsInChest();
        var quantityKept = countSymbol(symbolsInChest, SYMBOL_SWORD);
        var quantityRequired = useSwordQuantityRequired();
        var quantityRequiredArray = new Array(quantityRequired).fill("");
        var challengeWon = quantityKept >= quantityRequired;
        var swordNumberIncreased = useBecomes(function (quantityKeptPrevious) {
          return quantityKeptPrevious < quantityKept;
        }, [quantityKept]);

        var _useState3 = useState(false),
            _useState4 = _slicedToArray(_useState3, 2),
            swordSliceAnimation = _useState4[0],
            swordSliceAnimationSetter = _useState4[1];

        useEffect$2(function () {
          if (swordNumberIncreased) {
            swordSliceAnimationSetter(true);
          }
        }, [swordNumberIncreased]);
        useEffect$2(function () {
          if (swordSliceAnimation) {
            var timeout = setTimeout(function () {
              swordSliceAnimationSetter(false);
            }, 300);
            return function () {
              clearTimeout(timeout);
            };
          }

          return function () {};
        }, [swordSliceAnimation]);
        return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
          className: "ropes ".concat(challengeWon ? "challenge-won" : "")
        }, quantityRequiredArray.map(function (value, index) {
          if (quantityKept >= index + 1) return /*#__PURE__*/react.createElement("div", {
            key: index,
            className: "rope rope-".concat(index + 1, " cut-rope")
          });
          return /*#__PURE__*/react.createElement("div", {
            key: index,
            className: "rope rope-".concat(index + 1)
          });
        })), swordSliceAnimation && quantityKept <= quantityRequired ? /*#__PURE__*/react.createElement("div", {
          className: "sword-slice"
        }, /*#__PURE__*/react.createElement("div", {
          className: "triangle-left"
        }), /*#__PURE__*/react.createElement("div", {
          className: "triangle-right"
        })) : null, /*#__PURE__*/react.createElement("div", {
          className: "negative-round-score rotate-".concat(quantityKept, " ").concat(challengeWon ? "removed" : "")
        }, roundScore));
      };

      var ScoreRulesDialog = function ScoreRulesDialog(_ref) {
        var dialogIsOpen = _ref.dialogIsOpen,
            closeDialog = _ref.closeDialog;
        return /*#__PURE__*/react.createElement(Dialog, {
          isOpen: dialogIsOpen,
          onRequestClose: closeDialog,
          requestCloseOnClickOutside: true
        }, /*#__PURE__*/react.createElement("div", {
          className: "border border-right"
        }), /*#__PURE__*/react.createElement("div", {
          className: "border border-left"
        }), /*#__PURE__*/react.createElement("div", {
          className: "border border-top"
        }), /*#__PURE__*/react.createElement("div", {
          className: "border border-bottom"
        }), /*#__PURE__*/react.createElement("div", {
          className: "dialog-title"
        }, "Score"), /*#__PURE__*/react.createElement("div", {
          className: "dialog-content score-rules-dialog"
        }, /*#__PURE__*/react.createElement("div", {
          className: "dialog-body"
        }, /*#__PURE__*/react.createElement("div", {
          className: "dialog-box"
        }, /*#__PURE__*/react.createElement("div", {
          className: "dialog-label"
        }, "Combinaisons de d\xE9s"), /*#__PURE__*/react.createElement("div", {
          className: "columns"
        }, /*#__PURE__*/react.createElement("div", {
          className: "column"
        }, /*#__PURE__*/react.createElement("div", {
          className: "column-title"
        }, "Symbols identiques"), /*#__PURE__*/react.createElement("span", {
          className: "symbol-number"
        }, "3"), /*#__PURE__*/react.createElement("span", {
          className: "symbol-number"
        }, "4"), /*#__PURE__*/react.createElement("span", {
          className: "symbol-number"
        }, "5"), /*#__PURE__*/react.createElement("span", {
          className: "symbol-number"
        }, "6"), /*#__PURE__*/react.createElement("span", {
          className: "symbol-number"
        }, "7"), /*#__PURE__*/react.createElement("span", {
          className: "symbol-number"
        }, "8")), /*#__PURE__*/react.createElement("div", {
          className: "column"
        }, /*#__PURE__*/react.createElement("div", {
          className: "column-title"
        }, "Points"), /*#__PURE__*/react.createElement("span", {
          className: "points"
        }, "+100"), /*#__PURE__*/react.createElement("span", {
          className: "points"
        }, "+200"), /*#__PURE__*/react.createElement("span", {
          className: "points"
        }, "+500"), /*#__PURE__*/react.createElement("span", {
          className: "points"
        }, "+1000"), /*#__PURE__*/react.createElement("span", {
          className: "points"
        }, "+2000"), /*#__PURE__*/react.createElement("span", {
          className: "points"
        }, "+4000")))), /*#__PURE__*/react.createElement("div", {
          className: "dialog-box"
        }, /*#__PURE__*/react.createElement("div", {
          className: "dialog-label"
        }, "D\xE9s sp\xE9ciaux"), /*#__PURE__*/react.createElement("div", {
          className: "columns"
        }, /*#__PURE__*/react.createElement("div", {
          className: "column"
        }, /*#__PURE__*/react.createElement("div", {
          className: "column-title"
        }, "Symbol"), /*#__PURE__*/react.createElement(Image$1, {
          src: symbolCoinUrl
        }), /*#__PURE__*/react.createElement(Image$1, {
          src: symbolDiamondUrl
        })), /*#__PURE__*/react.createElement("div", {
          className: "column"
        }, /*#__PURE__*/react.createElement("div", {
          className: "column-title"
        }, "Points"), /*#__PURE__*/react.createElement("span", {
          className: "points"
        }, "+100"), /*#__PURE__*/react.createElement("span", {
          className: "points"
        }, "+100")))), /*#__PURE__*/react.createElement("div", {
          className: "dialog-box last"
        }, /*#__PURE__*/react.createElement("div", {
          className: "dialog-label"
        }, "Bonus coffre plein"), /*#__PURE__*/react.createElement("div", {
          className: "columns"
        }, /*#__PURE__*/react.createElement("div", {
          className: "column"
        }, /*#__PURE__*/react.createElement("div", {
          className: "column-title"
        }, "D\xE9s utilis\xE9s"), /*#__PURE__*/react.createElement("span", {
          className: "symbol-number"
        }, "8")), /*#__PURE__*/react.createElement("div", {
          className: "column"
        }, /*#__PURE__*/react.createElement("div", {
          className: "column-title"
        }, "Points"), /*#__PURE__*/react.createElement("span", {
          className: "points"
        }, "+500")))))));
      };

      var diceSize = 50;

      var cursedGridImageUrl = System.resolve("./assets/cursed-grid.png", module.meta.url);

      var Chest = function Chest(_ref) {
        var chestRef = _ref.chestRef,
            diceOverChestSignal = _ref.diceOverChestSignal;
        var chestSlots = useChestSlots();
        var threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea();
        var diceOverChest = useSignalListener(diceOverChestSignal);
        var currentCard = cardIdToCard(useCurrentCardId());
        var protectedByChestCard = threeSkullsOrMoreInCursedArea && isChestCard(currentCard);
        /*
          to get better user experience we should instantiate 9 elements even if the dices are not kept
          these elements would be valid drop target
          so that user can choose to put the dice where he wants in the dice kept area
           beware though because we still want user to drop a dice
          anywhere in the kept area and dice will choose to drop where it intersects most
           to achieve this the most intersecting drop target should win (how to do that remains to be found)
           il faut vraiment le coder comme ça
          parce que c'est plus simple a comprendre
        */

        return /*#__PURE__*/react.createElement("div", {
          className: "chest"
        }, /*#__PURE__*/react.createElement("div", {
          ref: chestRef,
          className: "dice-area ".concat(isChestCard(currentCard) ? "glow" : ""),
          style: _objectSpread({}, diceOverChest ? {
            outline: "2px dotted"
          } : {})
        }, /*#__PURE__*/react.createElement("div", {
          className: "box"
        }, Object.keys(chestSlots).map(function (chestSlot) {
          return /*#__PURE__*/react.createElement("div", {
            className: "slot",
            key: chestSlot,
            "data-chest-slot": chestSlot
          }, /*#__PURE__*/react.createElement(ChestSlot, {
            chestSlotContent: chestSlots[chestSlot]
          }));
        })), /*#__PURE__*/react.createElement("div", {
          className: "top-left-corner"
        }), /*#__PURE__*/react.createElement("div", {
          className: "top-right-corner"
        }), /*#__PURE__*/react.createElement("div", {
          className: "bottom-left-corner"
        }), /*#__PURE__*/react.createElement("div", {
          className: "bottom-right-corner"
        }), threeSkullsOrMoreInCursedArea && !protectedByChestCard ? /*#__PURE__*/react.createElement(CursedCover, null) : null), /*#__PURE__*/react.createElement(RoundScore, null));
      };

      var ChestSlot = function ChestSlot(_ref2) {
        var chestSlotContent = _ref2.chestSlotContent;
        var currentCard = cardIdToCard(useCurrentCardId());

        if (!chestSlotContent) {
          return null;
        }

        if (chestSlotContent.type === "symbol") {
          var symbol = chestSlotContent.value;
          return /*#__PURE__*/react.createElement("button", {
            className: "dice",
            style: {
              width: diceSize,
              height: diceSize,
              color: "#fcfcfc",
              margin: "5px",
              backgroundColor: currentCard.color1,
              borderColor: currentCard.color2,
              borderWidth: "2px",
              borderStyle: "solid"
            }
          }, /*#__PURE__*/react.createElement(Image$1, {
            src: symbolToImageUrl(symbol),
            draggable: "false",
            style: {
              width: "100%",
              height: "100%"
            }
          }));
        } // it's a dice


        return null;
      };

      var CursedCover = function CursedCover() {
        return /*#__PURE__*/react.createElement("div", {
          className: "cursed-cover"
        }, /*#__PURE__*/react.createElement(Image$1, {
          draggable: "false",
          src: cursedGridImageUrl,
          alt: "cursed-cover"
        }));
      };

      var cardsRules = {
        "animals": {
          name: "Animaux",
          rule: "Les singes et les perroquest obtenus sur les dés comptent comme un même symbol dans une combinaison.",
          more: "Par exemple 2 perroquets et 3 singes forment une conbinaison de 5 dés identiques, soit 500 points."
        },
        "chest": {
          name: "Coffre au trésor",
          rule: 'Lorsque le joueur sauvegarde ses dés, grâce à la carte "Coffre au trésor" les dés sont protégés du mauvais sort.',
          more: "Ainsi même lorsque le joueur obtient 3 têtes de morts, son tour prends fin, mais il peut marquer les points totalisés grâce aux dés sauvegardés!"
        },
        "coin": {
          name: "Pièce d'or",
          rule: "Le joueur commence son tour avec un symbol pièce d'or. Il rapporte des points aussi bien dans une combinaison de dés que comme simple pièce (+100)."
        },
        "diamond": {
          name: "Diamant",
          rule: "Le joueur commence son tour avec un symbol diamant. Il rapporte des points aussi bien dans une combinaison de dés que comme simple diamant (+100)."
        },
        "pirate": {
          name: "Capitaine des pirates",
          rule: "Grâce à l'aide du capitaine, tous les points comptabilisés pendant ce tour sont doublés !" //   more: "Si le joueur doit se rendre sur l'île de la tête de mort, ses adversaires perdent 200 points pour chaque tête de mort révélée."

        },
        "witch": {
          name: "Sorcière",
          rule: "Avec ses potions magiques, la sorcière permet exceptionnellement au joueur de relancer, une fois, un dé avec une tête de mort."
        },
        "1skull": {
          name: "Tête de mort",
          rule: "Le tour du joueur débute avec un symbole tête de mort."
        },
        "2skulls": {
          name: "2 têtes de mort",
          rule: "Le tour du joueur débute avec 2 symboles tête de mort."
        },
        "2sword-challenge": {
          name: "Bateau pirate",
          rule: "Le joueur doit obtenir au minimum 2 symbols sabres. Si il y parvient, il gagne +300 points, en plus de son résultat aux dés. Si il échoue, le joueur marque -300 points pour ce tour, quelque soit son résultat aux dés.",
          more: "Le score total ne peut pas descende en dessous de zéro. Ainsi si par exemple le joueur perds le défi au premier tour il restera à 0 points." // more: "Celui qui découvre un bateau pirate ne peut pas aller sur l'île de la tête de mort: un joueur qui obtiendrait 4 têtes de mort ou plus lors de son premier lancer perdrait donc immédiatement son tour."

        },
        "3sword-challenge": {
          name: "Bateau pirate",
          rule: "Le joueur doit obtenir au minimum 3 symbols sabres. Si il y parvient, il gagne +500 points, en plus de son résultat aux dés. Si il échoue, le joueur marque -500 points pour ce tour, quelque soit son résultat aux dés.",
          more: "Le score total ne peut pas descende en dessous de zéro. Ainsi si par exemple le joueur perds le défi au premier tour il restera à 0 points." // more: "Celui qui découvre un bateau pirate ne peut pas aller sur l'île de la tête de mort: un joueur qui obtiendrait 4 têtes de mort ou plus lors de son premier lancer perdrait donc immédiatement son tour."

        },
        "4sword-challenge": {
          name: "Bateau pirate",
          rule: "Le joueur doit obtenir au minimum 4 symbols sabres. Si il y parvient, il gagne +1000 points, en plus de son résultat aux dés. Si il échoue, le joueur marque -1000 points pour ce tour, quelque soit son résultat aux dés.",
          more: "Le score total ne peut pas descende en dessous de zéro. Ainsi si par exemple le joueur perds le défi au premier tour il restera à 0 points." // more: "Celui qui découvre un bateau pirate ne peut pas aller sur l'île de la tête de mort: un joueur qui obtiendrait 4 têtes de mort ou plus lors de son premier lancer perdrait donc immédiatement son tour."

        }
      };

      var CardRulesDialog = function CardRulesDialog(_ref) {
        var dialogIsOpen = _ref.dialogIsOpen,
            closeDialog = _ref.closeDialog,
            card = _ref.card;
        var cardRules = cardsRules[card.type];
        return /*#__PURE__*/react.createElement(Dialog, {
          isOpen: dialogIsOpen,
          onRequestClose: closeDialog,
          requestCloseOnClickOutside: true
        }, /*#__PURE__*/react.createElement("div", {
          className: "border border-right"
        }), /*#__PURE__*/react.createElement("div", {
          className: "border border-left"
        }), /*#__PURE__*/react.createElement("div", {
          className: "border border-top"
        }), /*#__PURE__*/react.createElement("div", {
          className: "border border-bottom"
        }), /*#__PURE__*/react.createElement("div", {
          className: "dialog-title"
        }, "Carte"), /*#__PURE__*/react.createElement("div", {
          className: "dialog-content card-rules-dialog"
        }, /*#__PURE__*/react.createElement("div", {
          className: "dialog-body"
        }, cardRules && /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
          className: "dialog-label"
        }, cardRules.name), /*#__PURE__*/react.createElement(Image$1, {
          className: "current-card",
          src: cardToImageUrl(card),
          alt: card.type
        }), /*#__PURE__*/react.createElement("div", {
          className: "text-rule"
        }, cardRules.rule), cardRules.more ? /*#__PURE__*/react.createElement("div", {
          className: "text-rule"
        }, cardRules.more) : null))));
      };

      var startJavaScriptAnimation = function startJavaScriptAnimation(_ref) {
        var _ref$duration = _ref.duration,
            duration = _ref$duration === void 0 ? 300 : _ref$duration,
            _ref$timingFunction = _ref.timingFunction,
            timingFunction = _ref$timingFunction === void 0 ? function (t) {
          return t;
        } : _ref$timingFunction,
            _ref$onProgress = _ref.onProgress,
            onProgress = _ref$onProgress === void 0 ? function () {} : _ref$onProgress,
            _ref$onCancel = _ref.onCancel,
            onCancel = _ref$onCancel === void 0 ? function () {} : _ref$onCancel,
            _ref$onComplete = _ref.onComplete,
            onComplete = _ref$onComplete === void 0 ? function () {} : _ref$onComplete;

        if (isNaN(duration)) {
          console.warn("duration must be a number, received ".concat(duration));
          return function () {};
        }

        duration = parseInt(duration, 10);
        var startMs = performance.now();
        var currentRequestAnimationFrameId;
        var done = false;
        var rawProgress = 0;
        var progress = 0;

        var handler = function handler() {
          currentRequestAnimationFrameId = null;
          var nowMs = performance.now();
          rawProgress = Math.min((nowMs - startMs) / duration, 1);
          progress = timingFunction(rawProgress);
          done = rawProgress === 1;
          onProgress({
            done: done,
            rawProgress: rawProgress,
            progress: progress
          });

          if (done) {
            onComplete();
          } else {
            currentRequestAnimationFrameId = window.requestAnimationFrame(handler);
          }
        };

        handler();

        var stop = function stop() {
          if (currentRequestAnimationFrameId) {
            window.cancelAnimationFrame(currentRequestAnimationFrameId);
            currentRequestAnimationFrameId = null;
          }

          if (!done) {
            done = true;
            onCancel({
              rawProgress: rawProgress,
              progress: progress
            });
          }
        };

        return stop;
      };

      var useAnimateTransitionUsingJs = function useAnimateTransitionUsingJs(value) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$duration = _ref.duration,
            duration = _ref$duration === void 0 ? 300 : _ref$duration,
            timingFunction = _ref.timingFunction;

        var _React$useState = react.useState(null),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            animatedValue = _React$useState2[0],
            animatedValueSetter = _React$useState2[1];

        useAnimateTransition(value, function (from, to) {
          animatedValueSetter({
            value: from
          });
          return startJavaScriptAnimation({
            duration: duration,
            timingFunction: timingFunction,
            onProgress: function onProgress(_ref2) {
              var progress = _ref2.progress;
              var value = Math.round(from + (to - from) * progress);
              animatedValueSetter({
                value: value
              });
            },
            onComplete: function onComplete() {
              animatedValueSetter(null);
            }
          });
        });
        return animatedValue;
      };

      var useAnimateTransition = function useAnimateTransition(value, animate) {
        var _React$useState3 = react.useState(null),
            _React$useState4 = _slicedToArray(_React$useState3, 2),
            transition = _React$useState4[0],
            transitionSetter = _React$useState4[1];

        var valuePrevious = usePrevious(value);
        react.useEffect(function () {
          if (valuePrevious !== value) {
            transitionSetter({
              from: valuePrevious,
              to: value
            });
          }
        }, [valuePrevious, value]);
        react.useEffect(function () {
          if (transition) {
            return animate(transition.from, transition.to);
          }

          return function () {};
        }, [transition]);
      };

      var Header = function Header(_ref) {
        var openScoreboard = _ref.openScoreboard;

        var _React$useState = react.useState(false),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            dialogIsOpen = _React$useState2[0],
            dialogIsOpenSetter = _React$useState2[1];

        var currentCard = cardIdToCard(useCurrentCardId());
        var currentCardActivated = useCurrentCardActivated();

        var openDialog = function openDialog() {
          if (currentCard) dialogIsOpenSetter(true);
        };

        var closeDialog = function closeDialog() {
          dialogIsOpenSetter(false);
        };

        return /*#__PURE__*/react.createElement("div", {
          className: "header"
        }, /*#__PURE__*/react.createElement("div", {
          className: "card-container",
          onClick: function onClick() {
            openDialog();
          }
        }, /*#__PURE__*/react.createElement("div", {
          className: "small-card"
        }, /*#__PURE__*/react.createElement(TopDeckCard, null)), currentCardActivated && /*#__PURE__*/react.createElement(SwordChallengeIndicator, null)), /*#__PURE__*/react.createElement(CurrentPlayer, {
          openScoreboard: openScoreboard
        }), /*#__PURE__*/react.createElement(TotalScore, null), currentCard ? /*#__PURE__*/react.createElement(CardRulesDialog, {
          card: currentCard,
          dialogIsOpen: dialogIsOpen,
          closeDialog: closeDialog
        }) : null);
      };

      var TopDeckCard = function TopDeckCard() {
        var currentCard = cardIdToCard(useCurrentCardId());
        var currentCardActivated = useCurrentCardActivated();
        return currentCard && currentCardActivated ? /*#__PURE__*/react.createElement(SmallCard, {
          card: currentCard
        }) : /*#__PURE__*/react.createElement(BackCard, null);
      };

      var BackCard = function BackCard() {
        return /*#__PURE__*/react.createElement("div", {
          className: "card default-card",
          style: {
            backgroundImage: "url(".concat(cardDefaultUrl, ")"),
            backgroundSize: "217px"
          }
        });
      };

      var SmallCard = function SmallCard(_ref2) {
        var card = _ref2.card;
        return /*#__PURE__*/react.createElement("div", {
          className: "card current-card",
          id: "small-card",
          style: {
            backgroundColor: card.color1,
            borderColor: card.color2
          }
        }, /*#__PURE__*/react.createElement(Image$1, {
          src: cardToSmallImageUrl(card),
          alt: card.type
        }));
      };

      var CurrentPlayer = function CurrentPlayer(_ref3) {
        var openScoreboard = _ref3.openScoreboard;
        var player = useCurrentPlayer();
        return /*#__PURE__*/react.createElement(Image$1, {
          onClick: openScoreboard,
          className: "avatar",
          src: player && player.character.img,
          alt: "player",
          style: {
            borderColor: player && player.character.color || "white"
          }
        });
      };

      var TotalScore = function TotalScore() {
        var player = useCurrentPlayer();
        var totalScore = player.score;
        var totalScoreAnimation = useAnimateTransitionUsingJs(totalScore, {
          duration: 1200,
          timingFunction: function timingFunction(progress) {
            return 1 - Math.pow(1 - progress, 5);
          }
        });
        return /*#__PURE__*/react.createElement("div", {
          className: "total-score"
        }, /*#__PURE__*/react.createElement("span", {
          className: "score",
          style: {
            backgroundColor: player && player.character.color || "white"
          }
        }, totalScoreAnimation ? totalScoreAnimation.value : totalScore));
      };

      var rotatePoint = function rotatePoint(origin, point, degrees) {
        var radians = degreesToRadians(degrees);
        var cosinus = Math.cos(radians);
        var sinus = Math.sin(radians);
        var run = point.x - origin.x;
        var rise = point.y - origin.y;
        return {
          x: Math.round(cosinus * run + sinus * rise + origin.x),
          y: Math.round(cosinus * rise - sinus * run + origin.y)
        };
      };
      var getDistanceBetweenTwoPoints = function getDistanceBetweenTwoPoints(firstPoint, secondPoint) {
        var horizontalDiff = firstPoint.x - secondPoint.x;
        var verticalDiff = firstPoint.y - secondPoint.y;
        return Math.sqrt(horizontalDiff * horizontalDiff + verticalDiff * verticalDiff);
      };

      var getRectangleCenterPoint = function getRectangleCenterPoint(_ref) {
        var _ref2 = _slicedToArray(_ref, 4),
            topLeft = _ref2[0],
            topRight = _ref2[1],
            bottomRight = _ref2[2],
            bottomLeft = _ref2[3];

        return {
          x: (topLeft.x + topRight.x + bottomRight.x + bottomLeft.x) / 4,
          y: (topLeft.y + topRight.y + bottomRight.y + bottomLeft.y) / 4
        };
      };

      var rotateRectangle = function rotateRectangle(points, degree) {
        var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getRectangleCenterPoint(points);
        return points.map(function (point) {
          return rotatePoint(origin, point, degree);
        });
      };

      var degreesToRadians = function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
      };


      var lineCollidesWithLine = function lineCollidesWithLine(_ref3, _ref4) {
        var _ref5 = _slicedToArray(_ref3, 2),
            firstLineStartPoint = _ref5[0],
            firstLineEndPoint = _ref5[1];

        var _ref6 = _slicedToArray(_ref4, 2),
            secondLineStartPoint = _ref6[0],
            secondLineEndPoint = _ref6[1];

        var unknownA = (secondLineEndPoint.x - secondLineStartPoint.x) * (firstLineStartPoint.y - secondLineStartPoint.y) - (secondLineEndPoint.y - secondLineStartPoint.y) * (firstLineStartPoint.x - secondLineStartPoint.x);
        var unknownB = (firstLineEndPoint.x - firstLineStartPoint.x) * (firstLineStartPoint.y - secondLineStartPoint.y) - (firstLineEndPoint.y - firstLineStartPoint.y) * (firstLineStartPoint.x - secondLineStartPoint.x);
        var denominator = (secondLineEndPoint.y - secondLineStartPoint.y) * (firstLineEndPoint.x - firstLineStartPoint.x) - (secondLineEndPoint.x - secondLineStartPoint.x) * (firstLineEndPoint.y - firstLineStartPoint.y); // Test if Coincident
        // If the denominator and numerator for the ua and ub are 0
        // then the two lines are coincident.

        if (unknownA === 0 && unknownB === 0 && denominator === 0) {
          return false;
        } // Test if Parallel
        // If the denominator for the equations for ua and ub is 0
        // then the two lines are parallel.


        if (denominator === 0) {
          return false;
        } // test if line segments are colliding


        unknownA /= denominator;
        unknownB /= denominator;
        var isIntersecting = unknownA >= 0 && unknownA <= 1 && unknownB >= 0 && unknownB <= 1;
        return isIntersecting;
      };
      var rotatedRectangleCollidesWithRotatedRectangle = function rotatedRectangleCollidesWithRotatedRectangle(firstRotatedRectangle, secondRotatedRectangle) {
        return someRectangleSideLine(firstRotatedRectangle, function (firstRotatedRectangleSideLine) {
          return lineCollidesWithRectangle(firstRotatedRectangleSideLine, secondRotatedRectangle);
        });
      }; // https://riptutorial.com/html5-canvas/example/17710/are-line-segment-and-rectangle-colliding-

      var lineCollidesWithRectangle = function lineCollidesWithRectangle(line, rectangle) {
        var lineIntersects = someRectangleSideLine(rectangle, function (rectangleSideLine) {
          return lineCollidesWithLine(line, rectangleSideLine);
        });
        if (lineIntersects) return true; // TODO: here we should check if line is contained inside the rectangle because in that case
        // it's not intersecting but it's colliding

        return false;
      };

      var someRectangleSideLine = function someRectangleSideLine(_ref7, predicate) {
        var _ref8 = _slicedToArray(_ref7, 4),
            firstPoint = _ref8[0],
            secondPoint = _ref8[1],
            thirdPoint = _ref8[2],
            fourthPoint = _ref8[3];

        var rectangleFirstLine = [firstPoint, secondPoint];
        if (predicate(rectangleFirstLine)) return true;
        var rectangleSecondLine = [secondPoint, thirdPoint];
        if (predicate(rectangleSecondLine)) return true;
        var rectangleThirdLine = [thirdPoint, fourthPoint];
        if (predicate(rectangleThirdLine)) return true;
        var rectangleFourthLine = [fourthPoint, firstPoint];
        if (predicate(rectangleFourthLine)) return true;
        return false;
      };

      // https://github.com/infusion/Rectangles.js/blob/master/rectangles.js
      var rectangleCollidesWithRectangle = function rectangleCollidesWithRectangle(firstRectangle, secondRectangle) {
        // first left of second
        if (firstRectangle.right <= secondRectangle.left) return false; // first right of second

        if (firstRectangle.left >= secondRectangle.right) return false; // first above second

        if (firstRectangle.bottom <= secondRectangle.top) return false; // first below second

        if (firstRectangle.top >= secondRectangle.bottom) return false;
        return true;
      };
      var rectangleInsideOf = function rectangleInsideOf(rectangle, parentRectangle) {
        var left = rectangle.left;
        var right = rectangle.right;
        var width = right - left;

        if (left < parentRectangle.left) {
          left = parentRectangle.left;
          right = left + width;
        } else if (right > parentRectangle.right) {
          left = parentRectangle.right - width;
          right = left + width;
        }

        var top = rectangle.top;
        var bottom = rectangle.bottom;
        var height = bottom - top;

        if (top < parentRectangle.top) {
          top = parentRectangle.top;
          bottom = top + height;
        } else if (bottom > parentRectangle.bottom) {
          top = parentRectangle.bottom - height;
          bottom = top + height;
        }

        return {
          left: left,
          right: right,
          top: top,
          bottom: bottom
        };
      };
      var rectangleRelativeTo = function rectangleRelativeTo(rectangle, parentRectangle) {
        var left = rectangle.left - parentRectangle.left;
        var width = rectangle.right - rectangle.left;
        var right = left + width;
        var top = rectangle.top - parentRectangle.top;
        var height = rectangle.bottom - rectangle.top;
        var bottom = top + height;
        return {
          left: left,
          right: right,
          top: top,
          bottom: bottom
        };
      };
      var findRectangleCloserToRectangle = function findRectangleCloserToRectangle(rectangleCandidates, rectangle) {
        var smallestDistance = getDistanceBetweenRectangles(rectangle, rectangleCandidates[0]);
        return rectangleCandidates.reduce(function (prev, rectangleCandidate) {
          var distance = getDistanceBetweenRectangles(rectangle, rectangleCandidate);

          if (distance < smallestDistance) {
            smallestDistance = distance;
            return rectangleCandidate;
          }

          return prev;
        });
      };

      var getRectangleCenterPoint$1 = function getRectangleCenterPoint(_ref2) {
        var left = _ref2.left,
            right = _ref2.right,
            top = _ref2.top,
            bottom = _ref2.bottom;
        return {
          x: left + (right - left) / 2,
          y: top + (bottom - top) / 2
        };
      };

      var getDistanceBetweenRectangles = function getDistanceBetweenRectangles(firstRectangle, secondRectangle) {
        var firstRectangleCenterPoint = getRectangleCenterPoint$1(firstRectangle);
        var secondRectangleCenterPoint = getRectangleCenterPoint$1(secondRectangle);
        return getDistanceBetweenTwoPoints(firstRectangleCenterPoint, secondRectangleCenterPoint);
      };

      var getDomNodeRectangle = function getDomNodeRectangle(domNode) {
        var domNodeRect = domNode.getBoundingClientRect();
        var documentScroll = getDocumentScroll(domNode);
        var left = domNodeRect.left + documentScroll.x;
        var top = domNodeRect.top + documentScroll.y;
        var right = left + domNodeRect.width;
        var bottom = top + domNodeRect.height;
        return {
          left: Math.floor(left),
          top: Math.floor(top),
          right: Math.floor(right),
          bottom: Math.floor(bottom)
        };
      };
      var rectangleToRectangleInsideDomNode = function rectangleToRectangleInsideDomNode(rectangle, domNode) {
        var domNodeRectangle = getDomNodeRectangle(domNode);
        var rectangleInsideDomNode = rectangleInsideOf(rectangle, domNodeRectangle);
        return rectangleInsideDomNode;
      };
      var rectangleRelativeToDomNode = function rectangleRelativeToDomNode(rectangle, domNode) {
        var domNodeRectangle = getDomNodeRectangle(domNode);
        var rectangleInsideDomNode = rectangleInsideOf(rectangle, domNodeRectangle);
        var rectangleInsideAndRelative = rectangleRelativeTo(rectangleInsideDomNode, domNodeRectangle);
        return rectangleInsideAndRelative;
      };
      var rectangleAbsoluteToDomNode = function rectangleAbsoluteToDomNode(rectangle, domNode) {
        var domNodeRectangle = getDomNodeRectangle(domNode);
        var rectangleWidth = rectangle.right - rectangle.left;
        var rectangleHeight = rectangle.bottom - rectangle.top;
        var rectangleAbsolute = {
          left: domNodeRectangle.left + rectangle.left,
          top: domNodeRectangle.top + rectangle.top,
          right: domNodeRectangle.left + rectangle.left + rectangleWidth,
          bottom: domNodeRectangle.top + rectangle.top + rectangleHeight
        };
        return rectangleAbsolute;
      };
      var domNodeCollidesWithRectangle = function domNodeCollidesWithRectangle(domNode, rectangle) {
        var domNodeRectangle = getDomNodeRectangle(domNode);
        return rectangleCollidesWithRectangle(domNodeRectangle, rectangle);
      };
      var findDomNodeClosestToRectangle = function findDomNodeClosestToRectangle(domNodeCandidates, rectangle) {
        var rectangleCandidates = domNodeCandidates.map(function (domNodeCandidate) {
          return getDomNodeRectangle(domNodeCandidate);
        });
        var closestRectangle = findRectangleCloserToRectangle(rectangleCandidates, rectangle);
        return domNodeCandidates[rectangleCandidates.indexOf(closestRectangle)];
      };
      var printPointInDocument = function printPointInDocument(_ref) {
        var x = _ref.x,
            y = _ref.y;

        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref2$color = _ref2.color,
            color = _ref2$color === void 0 ? "yellow" : _ref2$color,
            _ref2$autoRemoveAfter = _ref2.autoRemoveAfter,
            autoRemoveAfter = _ref2$autoRemoveAfter === void 0 ? 2000 : _ref2$autoRemoveAfter;

        var div = document.createElement("div");
        div.style.position = "absolute";
        div.style.zIndex = "1000";
        div.style.left = "".concat(x, "px");
        div.style.top = "".concat(y, "px");
        div.style.width = "5px";
        div.style.height = "5px";
        div.style.background = color;
        div.style.border = "1px solid red";
        document.body.appendChild(div);

        var remove = function remove() {
          document.body.removeChild(div);
        };

        var autoRemoveTimeout;

        if (autoRemoveAfter) {
          autoRemoveTimeout = setTimeout(remove, autoRemoveAfter);
        }

        return function () {
          remove();
          clearTimeout(autoRemoveTimeout);
        };
      };

      var diceSpacing = diceSize / 8;
      var rollDices = function rollDices(dices, _ref) {
        var rolledAreaDomNode = _ref.rolledAreaDomNode;
        var rolledAreaRectangle = getDomNodeRectangle(rolledAreaDomNode);
        var rolledAreaWidth = rolledAreaRectangle.right - rolledAreaRectangle.left;
        var rolledAreaHeight = rolledAreaRectangle.bottom - rolledAreaRectangle.top;
        var rectangleAllowed = {
          left: diceSpacing,
          right: rolledAreaWidth - (diceSize + diceSpacing),
          top: diceSpacing,
          bottom: rolledAreaHeight - (diceSize + diceSpacing)
        };
        var otherRotatedRectangles = [];

        var getRandomAndCollisionFreeInfo = function getRandomAndCollisionFreeInfo(dice) {
          var count = 0;

          var next = function next() {
            var rectangleCandidate = getRandomDiceRectangle(dice, rectangleAllowed);
            var rotation = getDiceRandomRotation();
            var rotatedRectangleCandidate = rotateRectangle(rectangleCandidate, rotation);
            var someOtherDiceCollides = otherRotatedRectangles.some(function (otherRotatedRectangle) {
              return rotatedRectangleCollidesWithRotatedRectangle(rotatedRectangleCandidate, otherRotatedRectangle);
            });

            if (!someOtherDiceCollides || // better return a collisioning rectangle than an infinite loop
            count > 50) {
              return {
                rectangle: rectangleCandidate,
                rotation: rotation,
                rotatedRectangle: rotatedRectangleCandidate
              };
            }

            count++;
            return next();
          };

          return next();
        };

        dices.forEach(function (dice, index) {
          dice.visibleFaceIndex = getDiceRandomFace(dice);

          var _getRandomAndCollisio = getRandomAndCollisionFreeInfo(dice),
              rectangle = _getRandomAndCollisio.rectangle,
              rotation = _getRandomAndCollisio.rotation,
              rotatedRectangle = _getRandomAndCollisio.rotatedRectangle;

          otherRotatedRectangles.push(rotatedRectangle);
          dice.rolledAreaZIndex = index + 1;
          dice.rolledAreaPosition = rectangle[0];
          dice.rotation = rotation;
        });
        return dices;
      };

      var getRandomDiceRectangle = function getRandomDiceRectangle(dice, rectangleAllowed) {
        var positionCandidate = {
          x: getRandomNumberBetweenInterval(rectangleAllowed.left, rectangleAllowed.right),
          y: getRandomNumberBetweenInterval(rectangleAllowed.top, rectangleAllowed.bottom)
        };
        var topLeft = {
          x: positionCandidate.x,
          y: positionCandidate.y
        };
        var topRight = {
          x: positionCandidate.x + diceSize,
          y: positionCandidate.y
        };
        var bottomRight = {
          x: positionCandidate.x + diceSize,
          y: positionCandidate.y + diceSize
        };
        var bottomLeft = {
          x: positionCandidate.x,
          y: positionCandidate.y + diceSize
        };
        var diceRectangle = [topLeft, topRight, bottomRight, bottomLeft];
        return diceRectangle;
      };

      var getDiceRandomRotation = function getDiceRandomRotation() {
        return getRandomNumberBetweenInterval(-35, 35);
      };

      var getDiceRandomFace = function getDiceRandomFace(dice) {
        return getRandomNumberBetweenInterval(0, dice.faces.length - 1);
      };

      var getRandomNumberBetweenInterval = function getRandomNumberBetweenInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

      var ButtonRoll = function ButtonRoll(_ref) {
        var rolledAreaRef = _ref.rolledAreaRef;
        var rollDiceAllowed = useRollDiceAllowed();
        var diceRolledIds = useDiceRolledIds();
        var hasNeverRolled = useHasNeverRolled();
        var roll = useRoll();
        var currentCard = cardIdToCard(useCurrentCardId());
        var threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea();
        var disabledNotEnoughDice = diceRolledIds.length < 2 && !hasNeverRolled;
        var disabledChestCard = threeSkullsOrMoreInCursedArea && isChestCard(currentCard);
        var disabled = disabledNotEnoughDice || disabledChestCard;

        if (rollDiceAllowed) {
          return /*#__PURE__*/react.createElement("div", {
            className: "roll-action"
          }, /*#__PURE__*/react.createElement("button", {
            onClick: function onClick() {
              roll(rolledAreaRef.current);
            },
            disabled: disabled
          }, "Lancer", disabledNotEnoughDice && !disabledChestCard && /*#__PURE__*/react.createElement("span", {
            className: "button-subtitle"
          }, "(au moins 2 d\xE9s !)")), disabledChestCard && /*#__PURE__*/react.createElement(Image$1, {
            src: symbolSkullUrl,
            className: "skull-symbol"
          }));
        }

        return null;
      };
      var useRoll = createAction(function (state, rolledAreaDomNode) {
        var dices = state.dices,
            rollCount = state.rollCount,
            diceRolledIds = state.diceRolledIds;
        var diceToRollIds = rollCount === 0 ? Object.keys(dices) : diceRolledIds;
        var dicesToRoll = diceToRollIds.map(function (diceRolledId) {
          return dices[diceRolledId];
        });
        rollDices(dicesToRoll, {
          rolledAreaDomNode: rolledAreaDomNode
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          rollCount: rollCount + 1,
          witchUncursedDiceId: null,
          diceRolledIds: dicesToRoll.map(function (dice) {
            return dice.id;
          }),
          dices: _objectSpread({}, dices)
        });
      });

      var Footer = function Footer(_ref) {
        var onRoundOver = _ref.onRoundOver,
            rolledAreaRef = _ref.rolledAreaRef;
        // const roundStarted = useRoundStarted()
        // if (!roundStarted && !dialogIsOpen) openDialog()
        // TODO: fix bug in DialogBase: dialog cannot be instantiated open
        return /*#__PURE__*/react.createElement("div", {
          className: "footer actions"
        }, /*#__PURE__*/react.createElement(ButtonRoll, {
          rolledAreaRef: rolledAreaRef
        }), /*#__PURE__*/react.createElement(ButtonMarkScore, null), /*#__PURE__*/react.createElement(ButtonEndRound, {
          onRoundOver: onRoundOver
        }));
      };

      var ButtonMarkScore = function ButtonMarkScore() {
        var roundScore = useRoundScore();
        var markScore = useMarkScore();
        var markScoreAllowed = useMarkScoreAllowed();
        var markScoreButtonVisible = useMarkScoreButtonVisible();
        var sign = roundScore < 0 ? "-" : "+";

        if (markScoreButtonVisible) {
          return /*#__PURE__*/react.createElement("div", {
            className: "collect-action"
          }, /*#__PURE__*/react.createElement("button", {
            onClick: function onClick() {
              markScore(roundScore);
            },
            disabled: !markScoreAllowed
          }, /*#__PURE__*/react.createElement("span", null, "Collecter"), /*#__PURE__*/react.createElement("span", {
            className: "score"
          }, sign, " ", Math.abs(roundScore))), !markScoreAllowed && /*#__PURE__*/react.createElement(Image$1, {
            src: symbolSkullUrl,
            className: "skull-symbol"
          }));
        }

        return null;
      };

      var ButtonEndRound = function ButtonEndRound(_ref2) {
        var onRoundOver = _ref2.onRoundOver;
        var startNextRoundAllowed = useStartNextRoundAllowed();
        var endPlayerRound = useEndPlayerRound();
        var roundScore = useRoundScore();

        if (startNextRoundAllowed) {
          return /*#__PURE__*/react.createElement("div", {
            className: "next-round-action"
          }, /*#__PURE__*/react.createElement("button", {
            onClick: function onClick() {
              // ici on sait que le round est terminé
              // on peut dire a ceux que ça intéresse
              // comment ça s'est passé (scoreboard)
              // qui va alors animer le fait qu'on a marqué un score
              // on devrait aussi animer le cas ou on fail sword challenge
              // et le cas ou on se tape 3 tete
              endPlayerRound();
              onRoundOver({
                // a faire ici:
                // si on fail sword-challenge ou qu'on fait 3 skulls
                // alors la raison doit changer
                // et le scoreboard fera une autre animation
                reason: "score-marked",
                value: roundScore
              });
            }
          }, "Terminer mon tour"));
        }

        return null;
      };

      var witchLabelUrl = System.resolve("./assets/witch-label.png", module.meta.url);

      var SkullIsland = function SkullIsland(_ref) {
        var cursedAreaRef = _ref.cursedAreaRef;
        var currentCard = cardIdToCard(useCurrentCardId());
        return /*#__PURE__*/react.createElement("div", {
          className: "skull-island"
        }, isWitchCard(currentCard) ? /*#__PURE__*/react.createElement(UncurseDiceLabel, null) : null, /*#__PURE__*/react.createElement("div", {
          className: "bottle"
        }, /*#__PURE__*/react.createElement("div", {
          className: "area",
          ref: cursedAreaRef
        }, isOneSkullCard(currentCard) ? /*#__PURE__*/react.createElement(ExtraSkull, {
          card: currentCard
        }) : null, isTwoSkullsCard(currentCard) ? /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(ExtraSkull, {
          card: currentCard
        }), /*#__PURE__*/react.createElement(ExtraSkull, {
          card: currentCard
        })) : null)));
      };

      var ExtraSkull = function ExtraSkull(_ref2) {
        var card = _ref2.card;
        return /*#__PURE__*/react.createElement("button", {
          className: "dice",
          style: {
            width: diceSize,
            height: diceSize,
            color: "#fcfcfc",
            margin: "1px 5px",
            backgroundColor: card.color1,
            borderColor: card.color2,
            borderWidth: "2px"
          }
        }, /*#__PURE__*/react.createElement(Image$1, {
          src: symbolSkullUrl,
          style: {
            width: "100%",
            height: "100%"
          }
        }));
      };

      var UncurseDiceLabel = function UncurseDiceLabel() {
        var currentCardActivated = useCurrentCardActivated();

        if (!currentCardActivated) {
          return /*#__PURE__*/react.createElement(Image$1, {
            style: {
              display: "none"
            },
            src: witchLabelUrl
          });
        }

        return /*#__PURE__*/react.createElement("div", {
          className: "witch-label"
        }, /*#__PURE__*/react.createElement(Image$1, {
          src: witchLabelUrl
        }), /*#__PURE__*/react.createElement("svg", {
          x: "0px",
          y: "0px",
          width: "156.083px",
          height: "208.667px",
          viewBox: "0 0 156.083 208.667"
        }, /*#__PURE__*/react.createElement("path", {
          id: "path_01",
          fill: "none",
          stroke: "#E4AD30",
          d: "M8.406,107.82 c2.541,2.178,2.375,2.875,14.25,3.5c14.782,0.778,19.26-11.965,19.26-11.965S47.918,88,40.251,72.917s-18.916,4.583-9.083,8.167 s27.759-1.338,35.142-12.417C74.75,56,77.583,45.333,79.25,37S78.477,15.833,66.31,3.833"
        }), /*#__PURE__*/react.createElement("path", {
          id: "path_02",
          fill: "none",
          stroke: "#E4AD30",
          d: "M44.031,110.094 c0,0,1,1.313-4.438,3.344s-14.244,7.281-32.125-2"
        }), /*#__PURE__*/react.createElement("path", {
          id: "path_03",
          fill: "none",
          stroke: "#E4AD30",
          d: "M42.125,103.688 c0,0,1.313,6.594-9.313,8.625S10.281,108.719,9.406,101"
        }), /*#__PURE__*/react.createElement("path", {
          id: "path_04",
          fill: "none",
          stroke: "#E4AD30",
          d: "M33.114,112.253c0,0,39.886-19.253,43.011,24.747 c0.372,0.447-0.959,1.208-2.542,1.625"
        })));
      };

      var Portal = function Portal(_ref) {
        var parent = _ref.parent,
            children = _ref.children;

        if (!parent) {
          return null;
        }

        return reactDom.createPortal( /*#__PURE__*/react.createElement(react.Fragment, null, children), parent);
      };

      var stringifyTransformations = function stringifyTransformations(_ref) {
        var rotate = _ref.rotate,
            scale = _ref.scale,
            translate = _ref.translate;
        return [].concat(_toConsumableArray(rotate ? ["rotate(".concat(rotate, "deg)")] : []), _toConsumableArray(scale && scale !== 1 ? ["scale(".concat(scale, ")")] : []), _toConsumableArray(translate ? ["translate(".concat(translate, ")")] : [])).join("");
      };

      var throttle = function throttle(fn) {
        var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;

        var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref$trailing = _ref.trailing,
            trailing = _ref$trailing === void 0 ? false : _ref$trailing;

        var timeout;
        var previousMs;

        var throttled = function throttled() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          clearTimeout(timeout);
          var nowMs = Date.now(); // la fonction a été appelé il y a previous

          if (previousMs) {
            // ca fait combien de temps
            var msEllapsedSincePreviousCall = nowMs - previousMs;

            if (msEllapsedSincePreviousCall < ms) {
              // pas suffisament de temps écoulé
              if (trailing) {
                var remaining = ms - msEllapsedSincePreviousCall;
                timeout = setTimeout(function () {
                  return throttled.apply(void 0, args);
                }, remaining);
              }
            } else {
              // suffisament de temps écoulé
              previousMs = nowMs;
              fn.apply(void 0, args);
            }
          } else {
            // calls right now
            previousMs = nowMs;
            fn.apply(void 0, args);
          }
        };

        var cancel = function cancel() {
          clearTimeout(timeout);
        };

        throttled.cancel = cancel;
        return throttled;
      };

      var enableDragGesture = function enableDragGesture(domNode, _ref) {
        var _ref$logLevel = _ref.logLevel,
            logLevel = _ref$logLevel === void 0 ? "warn" : _ref$logLevel,
            _ref$onGrip = _ref.onGrip,
            onGrip = _ref$onGrip === void 0 ? function () {} : _ref$onGrip,
            _ref$onLongGrip = _ref.onLongGrip,
            onLongGrip = _ref$onLongGrip === void 0 ? function () {} : _ref$onLongGrip,
            _ref$onClick = _ref.onClick,
            onClick = _ref$onClick === void 0 ? function () {} : _ref$onClick,
            _ref$onDrag = _ref.onDrag,
            onDrag = _ref$onDrag === void 0 ? function () {} : _ref$onDrag,
            _ref$onRelease = _ref.onRelease,
            onRelease = _ref$onRelease === void 0 ? function () {} : _ref$onRelease,
            _ref$onCancel = _ref.onCancel,
            onCancel = _ref$onCancel === void 0 ? function () {} : _ref$onCancel,
            _ref$longGripMs = _ref.longGripMs,
            longGripMs = _ref$longGripMs === void 0 ? 300 : _ref$longGripMs;
        var logger = createLogger({
          logLevel: logLevel
        }); // a small move is a drag gesture but
        // not yet a drag intent
        // long grip or big enough move set drag intent to true

        var dragIntent = false;
        var dragIntentTimeout;
        var pendingGesture;

        var removeMoveListener = function removeMoveListener() {};

        var removeReleaseListener = function removeReleaseListener() {};

        logger.debug("enable drag on", domNode);
        var removeMousedownListener = addDomEventListener(domNode, "mousedown", function (mousedownEvent) {
          var isRightClick = mousedownEvent.which === 3;

          if (isRightClick) {
            logger.debug("ignore right click");
            return;
          }

          handleGrip(mouseEventToPagePosition(mousedownEvent), mousedownEvent);
          removeMoveListener = addDomEventListener(document, "mousemove", throttle(function (mousemoveEvent) {
            handleMove(mouseEventToPagePosition(mousemoveEvent), mousemoveEvent);
          }));
          removeReleaseListener = addDomEventListener(document, "mouseup", function (mouseupEvent) {
            removeReleaseListener();
            removeMoveListener();
            handleRelease(mouseEventToPagePosition(mouseupEvent), mouseupEvent);
          });
        }, {
          passive: true
        });
        var removeTouchstartListener = addDomEventListener(domNode, "touchstart", function (touchstartEvent) {
          handleGrip(touchEventToPagePosition(touchstartEvent), touchstartEvent);
          removeMoveListener = addDomEventListener(document, "touchmove", throttle(function (touchmoveEvent) {
            handleMove(touchEventToPagePosition(touchmoveEvent), touchmoveEvent);
          }));
          removeReleaseListener = addDomEventListener(document, "touchend", function (touchendEvent) {
            removeReleaseListener();
            removeMoveListener();
            handleRelease(touchEventToPagePosition(touchendEvent), touchendEvent);
          });
        }, {
          passive: true
        });
        var removeClickListener = addDomEventListener(domNode, "click", function (clickEvent) {
          if (!dragIntent && dropEffect === "none") {
            onClick(clickEvent);
          }
        });
        var pointerPositionPrevious;
        var domNodeStartPosition;
        var gripPointerPosition;
        var longGripTimeout;
        var dropEffect;

        var handleGrip = function handleGrip(pointerPosition, event) {
          logger.debug("gripping node at", pointerPosition);
          pendingGesture = true;
          dropEffect = "none";
          gripPointerPosition = pointerPosition;
          pointerPositionPrevious = pointerPosition;
          domNodeStartPosition = domNodeToPagePosition(domNode);
          onGrip({
            x: domNodeStartPosition.x,
            y: domNodeStartPosition.y,
            event: event
          });
          longGripTimeout = setTimeout(handleLongGrip, longGripMs);
        };

        var handleLongGrip = function handleLongGrip() {
          dragIntent = true;
          onLongGrip();
        };

        var handleMove = function handleMove(pointerPosition, event) {
          if (pointerPositionPrevious.x === pointerPosition.x && pointerPositionPrevious.y === pointerPosition.y) {
            logger.debug("no real move");
            return;
          }

          pointerPositionPrevious = pointerPosition;
          var gripHorizontalShift = gripPointerPosition.x - domNodeStartPosition.x;
          var gripVerticalShit = gripPointerPosition.y - domNodeStartPosition.y;
          var movePosition = {
            // il y a un décalage entre le bord de l'élément et l'endroit ou l'on l'attrape
            // ce décalage doit continuer d'exister pour savoir ou on place l'élément en position fixed
            x: pointerPosition.x - gripHorizontalShift,
            y: pointerPosition.y - gripVerticalShit
          };
          var relativeX = pointerPosition.x - gripPointerPosition.x;
          var relativeY = pointerPosition.y - gripPointerPosition.y;
          logger.debug("move node at", movePosition);
          onDrag(_objectSpread(_objectSpread({
            event: event
          }, movePosition), {}, {
            relativeX: relativeX,
            relativeY: relativeY,
            setDropEffect: function setDropEffect(value) {
              dropEffect = value;
            }
          }));
        };

        var handleRelease = function handleRelease(pointerPosition, event) {
          logger.debug("releasing node");
          pendingGesture = false;
          clearTimeout(longGripTimeout);
          var gripHorizontalShift = gripPointerPosition.x - domNodeStartPosition.x;
          var gripVerticalShit = gripPointerPosition.y - domNodeStartPosition.y;
          onRelease({
            event: event,
            dropEffect: dropEffect,
            x: pointerPositionPrevious.x - gripHorizontalShift,
            y: pointerPositionPrevious.y - gripVerticalShit
          }); // setTimeout is to ensure the click cannot happen just after mouseup

          dragIntentTimeout = setTimeout(function () {
            dragIntent = false;
          });
        };

        var handleCancel = function handleCancel(event) {
          if (pendingGesture) {
            logger.debug("cancelling drag", event);
            pendingGesture = false;
            onCancel({
              event: event
            });
          }
        };

        return function (event) {
          removeClickListener();
          removeMousedownListener();
          removeTouchstartListener();
          removeMoveListener();
          removeReleaseListener();
          clearTimeout(longGripTimeout);
          clearTimeout(dragIntentTimeout);
          handleCancel(event);
        };
      };

      var domNodeToPagePosition = function domNodeToPagePosition(domNode) {
        var rect = domNode.getBoundingClientRect();
        return {
          x: rect.left,
          y: rect.top
        };
      };

      var mouseEventToPagePosition = function mouseEventToPagePosition(mouseEvent) {
        return {
          x: mouseEvent.pageX,
          y: mouseEvent.pageY
        };
      };

      var touchEventToPagePosition = function touchEventToPagePosition(touchEvent) {
        var firstChangedTouch = touchEvent.changedTouches[0];
        return {
          x: firstChangedTouch.pageX,
          y: firstChangedTouch.pageY
        };
      };

      var useEffect$3 = react.useEffect,
          useState$1 = react.useState;
      var Dice = function Dice(_ref) {
        var dice = _ref.dice,
            diceAnimation = _ref.diceAnimation,
            _ref$anmationDebug = _ref.anmationDebug,
            anmationDebug = _ref$anmationDebug === void 0 ? false : _ref$anmationDebug,
            parentNode = _ref.parentNode,
            zIndex = _ref.zIndex,
            x = _ref.x,
            y = _ref.y,
            rotation = _ref.rotation,
            draggable = _ref.draggable,
            onDiceClick = _ref.onDiceClick,
            onDiceDrag = _ref.onDiceDrag,
            onDiceDrop = _ref.onDiceDrop,
            onDiceDragEnd = _ref.onDiceDragEnd,
            disapear = _ref.disapear,
            appear = _ref.appear;
        // state from contexts
        var mainDomNode = useMainDomNode();
        var diceDomNode = useDiceDomNode(dice.id);
        var diceDomNodeSetter = useDiceDomNodeSetter(dice.id); // local states

        var _useState = useState$1(false),
            _useState2 = _slicedToArray(_useState, 2),
            diceGripped = _useState2[0],
            diceGrippedSetter = _useState2[1];

        var _useState3 = useState$1(null),
            _useState4 = _slicedToArray(_useState3, 2),
            dragGesture = _useState4[0],
            setDragGesture = _useState4[1]; // si y'a une animation alors reste dans ton conteneur
        // le temps qu'elle se finisse


        var parentNodePrevious = usePrevious(parentNode);
        var portalParentNode = diceAnimation ? parentNodePrevious : parentNode;
        useEffect$3(function () {
          if (!draggable || !diceDomNode || !mainDomNode) {
            return function () {};
          }

          var bigMoveOccured = false;
          var disableDragGesture = enableDragGesture(diceDomNode, {
            onGrip: function onGrip() {
              diceGrippedSetter(true);
            },
            onClick: function onClick(clickEvent) {
              onDiceClick(dice, clickEvent);
            },
            onDrag: function onDrag(_ref2) {
              var x = _ref2.x,
                  y = _ref2.y,
                  relativeX = _ref2.relativeX,
                  relativeY = _ref2.relativeY,
                  setDropEffect = _ref2.setDropEffect;
              var diceDesiredRect = {
                left: x,
                right: x + diceSize,
                top: y,
                bottom: y + diceSize
              };
              var diceRectangle = rectangleToRectangleInsideDomNode(diceDesiredRect, mainDomNode);
              setDragGesture({
                x: diceRectangle.left,
                y: diceRectangle.top
              });
              bigMoveOccured = bigMoveOccured || Math.abs(relativeX) > 10 || Math.abs(relativeY) > 10;

              if (bigMoveOccured) {
                onDiceDrag(dice, {
                  relativeX: relativeX,
                  relativeY: relativeY,
                  setDropEffect: setDropEffect,
                  diceRectangle: diceRectangle
                });
              }
            },
            onRelease: function onRelease(_ref3) {
              var dropEffect = _ref3.dropEffect,
                  x = _ref3.x,
                  y = _ref3.y;

              if (dropEffect !== "none") {
                var diceRectangle = {
                  left: x,
                  right: x + diceSize,
                  top: y,
                  bottom: y + diceSize
                };
                onDiceDrop(dice, {
                  diceRectangle: diceRectangle
                });
              }

              diceGrippedSetter(false);
              setDragGesture(null);
              onDiceDragEnd(dice);
            },
            onCancel: function onCancel() {
              diceGrippedSetter(false);
              setDragGesture(null);
              onDiceDragEnd(dice);
            }
          });
          return function () {
            disableDragGesture();
          };
        }, [draggable, diceDomNode, mainDomNode, onDiceClick, onDiceDrag, onDiceDrop, onDiceDragEnd]);
        useEffect$3(function () {
          if (!diceAnimation || !diceDomNode) return function () {};
          var from = diceAnimation.from,
              to = diceAnimation.to,
              onfinish = diceAnimation.onfinish;

          if (anmationDebug) {
            printPointInDocument(from);
            printPointInDocument(to);
          }

          var transform = "translate(".concat(Math.floor(to.x - from.x), "px, ").concat(Math.floor(to.y - from.y), "px)");
          var animation = diceDomNode.parentNode.animate([{
            transform: transform
          }], {
            duration: 500,
            fill: "forwards",
            easing: "cubic-bezier(0, 0.55, 0.45, 1)"
          });
          animation.onfinish = onfinish;
          return function () {
            animation.cancel();
          };
        }, [diceDomNode, diceAnimation]);
        var onSkull = diceIsOnSkull(dice);
        var diceX = diceAnimation && diceAnimation.from ? diceAnimation.from.x : dragGesture ? dragGesture.x : x;
        var diceY = diceAnimation && diceAnimation.from ? diceAnimation.from.y : dragGesture ? dragGesture.y : y;
        var diceZIndex = dragGesture || diceAnimation ? 1000 : zIndex; // if (dice.id === 4 && !dragGesture) {
        //   console.log({
        //     diceX,
        //     diceY,
        //     diceAnimation: Boolean(diceAnimation),
        //     dragGesture: Boolean(dragGesture),
        //   })
        // }

        return /*#__PURE__*/react.createElement(Portal, {
          parent: portalParentNode
        }, /*#__PURE__*/react.createElement("svg", {
          "data-dice-id": dice.id,
          className: "dice",
          onClick: draggable ? undefined : function (clickEvent) {
            onDiceClick(dice, clickEvent);
          },
          style: {
            width: diceSize,
            height: diceSize,
            left: "".concat(diceX, "px"),
            top: "".concat(diceY, "px"),
            zIndex: diceZIndex,
            position: dragGesture || diceAnimation ? "fixed" : undefined
          }
        }, /*#__PURE__*/react.createElement("g", {
          ref: diceDomNodeSetter,
          className: disapear ? "dice-cursed-disapear" : appear ? "dice-cursed-appear" : "",
          style: {
            transform: stringifyTransformations({
              rotate: rotation ? rotation : 0,
              scale: diceGripped ? "1.1" : "1"
            }),
            transitionProperty: "transform",
            transitionDuration: "500ms",
            // https://easings.net/#easeOutCirc
            transitionTimingFunction: "cubic-bezier(0, 0.55, 0.45, 1)",
            transformOrigin: "center center"
          }
        }, /*#__PURE__*/react.createElement("rect", {
          className: "dice-background",
          width: "100%",
          height: "100%",
          rx: "5",
          ry: "5",
          fill: onSkull ? "black" : "#fcfcfc",
          stroke: onSkull ? "black" : "#b9b9b9",
          strokeWidth: "1"
        }), /*#__PURE__*/react.createElement("image", {
          xlinkHref: symbolToImageUrl(diceToVisibleSymbol(dice)),
          draggable: "false",
          style: {
            width: "100%",
            height: "100%"
          }
        }))));
      };

      var DiceContainer = function DiceContainer(_ref) {
        var offscreenDomNode = _ref.offscreenDomNode,
            chestDomNode = _ref.chestDomNode,
            rolledAreaDomNode = _ref.rolledAreaDomNode,
            cursedAreaDomNode = _ref.cursedAreaDomNode,
            _ref$onDiceOverChestC = _ref.onDiceOverChestChange,
            onDiceOverChestChange = _ref$onDiceOverChestC === void 0 ? function () {} : _ref$onDiceOverChestC,
            _ref$onDiceOverRolled = _ref.onDiceOverRolledAreaChange,
            onDiceOverRolledAreaChange = _ref$onDiceOverRolled === void 0 ? function () {} : _ref$onDiceOverRolled;
        // global state
        var dices = useDices();
        var chestSlots = useChestSlots();
        var diceRolledIds = useDiceRolledIds();
        var diceCursedIds = useDiceCursedIds();
        var witchUncursedDiceId = useWitchUncursedDiceId();
        var currentCard = cardIdToCard(useCurrentCardId());
        var scoreMarked = useScoreMarked();
        var threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea(); // local state

        var _React$useReducer = react.useReducer(function (state, action) {
          return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.key, action.value));
        }, {}),
            _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
            diceAnimationState = _React$useReducer2[0],
            dispatchDiceAnimation = _React$useReducer2[1]; // actions


        var setDiceRolledAreaPosition = useSetDiceRolledAreaPosition();
        var keepDice = useKeepDice();
        var unkeepDice = useUnkeepDice();
        var uncurseDice = useUncurseDice();
        var setDiceChestSlot = useSetDiceChestSlot(); // other

        var dropTargetRef = react.useRef(null);
        return Object.keys(dices).map(function (diceId) {
          var dice = dices[diceId];
          var diceLocation = diceToLocation(dice, {
            chestSlots: chestSlots,
            diceRolledIds: diceRolledIds,
            diceCursedIds: diceCursedIds
          });
          var propsFromLocation = diceLocationToProps(diceLocation, {
            chestDomNode: chestDomNode,
            rolledAreaDomNode: rolledAreaDomNode,
            cursedAreaDomNode: cursedAreaDomNode,
            offscreenDomNode: offscreenDomNode
          });
          var parentNode = propsFromLocation.parentNode;
          var diceIsGoingToBeCursed = dice.id !== witchUncursedDiceId && parentNode === rolledAreaDomNode && diceIsOnSkull(dice);
          var diceInCursedArea = parentNode === cursedAreaDomNode; // we use useCallback because it prevents dices
          // from being re-rendered and drag gesture to become
          // shortly unavailable while react is rerendering

          var onDiceClick = react.useCallback(function (dice) {
            var clickEffect = getClickEffect(dice, {
              diceRolledIds: diceRolledIds,
              chestSlots: chestSlots,
              diceCursedIds: diceCursedIds,
              scoreMarked: scoreMarked,
              threeSkullsOrMoreInCursedArea: threeSkullsOrMoreInCursedArea,
              currentCard: currentCard,
              witchUncursedDiceId: witchUncursedDiceId
            }); // console.log(`click dice#${dice.id} -> ${clickEffect} effect`)

            if (clickEffect === "keep") {
              var firstAvailableChestSlot = firstAvailableChestSlotGetter(chestSlots);
              keepDice(dice, firstAvailableChestSlot);
            } else if (clickEffect === "unkeep") {
              unkeepDice(dice);
            } else if (clickEffect === "uncurse") {
              uncurseDice(dice);
            }
          }, [diceRolledIds, chestSlots, diceCursedIds, scoreMarked, threeSkullsOrMoreInCursedArea, currentCard, witchUncursedDiceId]);
          var onDiceDrag = react.useCallback(function (dice, dragDiceGesture) {
            dropTargetRef.current = dropTargetGetter({
              dragDiceGesture: dragDiceGesture,
              chestDomNode: chestDomNode,
              rolledAreaDomNode: rolledAreaDomNode
            });
            var dropEffect = getDropEffect(dice, {
              diceRolledIds: diceRolledIds,
              chestSlots: chestSlots,
              dropTargetRef: dropTargetRef,
              rolledAreaDomNode: rolledAreaDomNode,
              chestDomNode: chestDomNode,
              scoreMarked: scoreMarked,
              threeSkullsOrMoreInCursedArea: threeSkullsOrMoreInCursedArea
            });
            dragDiceGesture.setDropEffect(dropEffect);
            onDiceOverChestChange(dropEffect === "keep" ? dice : null);
            onDiceOverRolledAreaChange(dropEffect === "unkeep" ? dice : null);
          }, [diceRolledIds, chestSlots, dropTargetRef, rolledAreaDomNode, chestDomNode, scoreMarked, threeSkullsOrMoreInCursedArea, onDiceOverChestChange, onDiceOverRolledAreaChange]);
          var onDiceDrop = react.useCallback(function (dice, dropDiceGesture) {
            var dropEffect = getDropEffect(dice, {
              diceRolledIds: diceRolledIds,
              chestSlots: chestSlots,
              dropTargetRef: dropTargetRef,
              rolledAreaDomNode: rolledAreaDomNode,
              chestDomNode: chestDomNode,
              scoreMarked: scoreMarked,
              threeSkullsOrMoreInCursedArea: threeSkullsOrMoreInCursedArea
            }); // console.log(`drop dice#${dice.id} -> ${dropEffect} effect`)

            var dropAnimation = false;
            var dropPosition = null;

            if (dropEffect === "reposition-in-rolled-area") {
              var closestRolledAreaPosition = closestRolledAreaPositionGetter(dropDiceGesture.diceRectangle, rolledAreaDomNode);
              var highestRolledAreaZIndex = highestRolledAreaZIndexGetter(dice, {
                dices: dices,
                diceRolledIds: diceRolledIds
              });
              setDiceRolledAreaPosition(dice, closestRolledAreaPosition, highestRolledAreaZIndex); // no animation needed, we drop exactly where we want it
            } else if (dropEffect === "back-to-rolled-area") {
              dropAnimation = true;
              dropPosition = rolledAreaDropPositionGetter(dice.rolledAreaPosition, rolledAreaDomNode);
            } else if (dropEffect === "keep") {
              var closestAvailableChestSlot = closestAvailableChestSlotGetter(dice, {
                chestSlots: chestSlots,
                rectangle: dropDiceGesture.diceRectangle,
                chestDomNode: chestDomNode
              });
              keepDice(dice, closestAvailableChestSlot);
              dropAnimation = true;
              dropPosition = chestSlotDropPositionGetter(closestAvailableChestSlot, chestDomNode);
            } else if (dropEffect === "reposition-in-chest") {
              var _closestAvailableChestSlot = closestAvailableChestSlotGetter(dice, {
                chestSlots: chestSlots,
                rectangle: dropDiceGesture.diceRectangle,
                chestDomNode: chestDomNode
              });

              var diceChestSlot = diceToChestSlot(dice, chestSlots);

              if (diceChestSlot !== _closestAvailableChestSlot) {
                setDiceChestSlot(dice, _closestAvailableChestSlot);
                dropAnimation = true;
                dropPosition = chestSlotDropPositionGetter(_closestAvailableChestSlot, chestDomNode);
              }
            } else if (dropEffect === "back-to-chest") {
              var _diceChestSlot = diceToChestSlot(dice, chestSlots);

              dropAnimation = true;
              dropPosition = chestSlotDropPositionGetter(_diceChestSlot, chestDomNode);
            } else if (dropEffect === "unkeep") {
              var _closestRolledAreaPosition = closestRolledAreaPositionGetter(dropDiceGesture.diceRectangle, rolledAreaDomNode);

              setDiceRolledAreaPosition(dice, _closestRolledAreaPosition, highestRolledAreaZIndexGetter(dice, {
                dices: dices,
                diceRolledIds: diceRolledIds
              }));
              unkeepDice(dice);
              dropAnimation = true;
              dropPosition = rolledAreaDropPositionGetter(_closestRolledAreaPosition, rolledAreaDomNode);
            }

            if (dropAnimation) {
              dispatchDiceAnimation({
                key: dice.id,
                value: {
                  from: {
                    x: dropDiceGesture.diceRectangle.left,
                    y: dropDiceGesture.diceRectangle.top
                  },
                  to: dropPosition,
                  onfinish: function onfinish() {
                    // at the end of dice animation, dice is flickering briely
                    // (moving somewhere on the page and going back to where it's supposed to be)
                    // the following setTimeout fixes this
                    // of course we should improve that because it's an hint there is a deeper
                    // issue to resolve.
                    setTimeout(function () {
                      dispatchDiceAnimation({
                        key: dice.id,
                        value: null
                      });
                    });
                  }
                }
              });
            }
          }, [diceRolledIds, chestSlots, dropTargetRef, rolledAreaDomNode, chestDomNode, scoreMarked, threeSkullsOrMoreInCursedArea]);
          var onDiceDragEnd = react.useCallback(function () {
            onDiceOverChestChange(null);
            onDiceOverRolledAreaChange(null);
          }, [onDiceOverChestChange, onDiceOverRolledAreaChange]);

          var props = _objectSpread(_objectSpread({
            key: dice.id
          }, propsFromLocation), {}, {
            dice: dice,
            diceAnimation: diceAnimationState[dice.id],
            witchUncursedDiceId: witchUncursedDiceId,
            disapear: diceIsGoingToBeCursed,
            appear: diceInCursedArea,
            onDiceClick: onDiceClick,
            onDiceDrag: onDiceDrag,
            onDiceDrop: onDiceDrop,
            onDiceDragEnd: onDiceDragEnd
          });

          return react.useMemo(function () {
            return /*#__PURE__*/react.createElement(Dice, props);
          }, Object.keys(props).map(function (key) {
            return props[key];
          }));
        });
      };

      var getClickEffect = function getClickEffect(dice, _ref2) {
        var diceRolledIds = _ref2.diceRolledIds,
            chestSlots = _ref2.chestSlots,
            diceCursedIds = _ref2.diceCursedIds,
            scoreMarked = _ref2.scoreMarked,
            threeSkullsOrMoreInCursedArea = _ref2.threeSkullsOrMoreInCursedArea,
            currentCard = _ref2.currentCard,
            witchUncursedDiceId = _ref2.witchUncursedDiceId;

        if (diceIsInRolledAreaGetter(dice, diceRolledIds)) {
          if (keepDiceAllowedGetter(dice, {
            scoreMarked: scoreMarked,
            threeSkullsOrMoreInCursedArea: threeSkullsOrMoreInCursedArea
          })) {
            return "keep";
          }

          return "none";
        }

        if (diceIsInChestGetter(dice, chestSlots)) {
          if (unkeepDiceAllowedGetter(dice, {
            scoreMarked: scoreMarked,
            threeSkullsOrMoreInCursedArea: threeSkullsOrMoreInCursedArea
          })) {
            return "unkeep";
          }

          return "none";
        }

        if (diceIsInCursedAreaGetter(dice, diceCursedIds)) {
          if (uncurseDiceAllowedGetter(dice, {
            scoreMarked: scoreMarked,
            threeSkullsOrMoreInCursedArea: threeSkullsOrMoreInCursedArea,
            currentCard: currentCard,
            witchUncursedDiceId: witchUncursedDiceId
          })) {
            return "uncurse";
          }

          return "none";
        }

        return "none";
      };

      var getDropEffect = function getDropEffect(dice, _ref3) {
        var diceRolledIds = _ref3.diceRolledIds,
            chestSlots = _ref3.chestSlots,
            dropTargetRef = _ref3.dropTargetRef,
            rolledAreaDomNode = _ref3.rolledAreaDomNode,
            chestDomNode = _ref3.chestDomNode,
            scoreMarked = _ref3.scoreMarked,
            threeSkullsOrMoreInCursedArea = _ref3.threeSkullsOrMoreInCursedArea;

        if (diceIsInRolledAreaGetter(dice, diceRolledIds)) {
          if (dropTargetRef.current === rolledAreaDomNode) {
            return "reposition-in-rolled-area";
          }

          if (dropTargetRef.current === chestDomNode) {
            if (keepDiceAllowedGetter(dice, {
              scoreMarked: scoreMarked,
              threeSkullsOrMoreInCursedArea: threeSkullsOrMoreInCursedArea
            })) {
              return "keep";
            }

            return "back-to-rolled-area";
          }

          return "back-to-rolled-area";
        }

        if (diceIsInChestGetter(dice, chestSlots)) {
          if (dropTargetRef.current === chestDomNode) {
            return "reposition-in-chest";
          }

          if (dropTargetRef.current === rolledAreaDomNode) {
            if (unkeepDiceAllowedGetter(dice, {
              scoreMarked: scoreMarked,
              threeSkullsOrMoreInCursedArea: threeSkullsOrMoreInCursedArea
            })) {
              return "unkeep";
            }

            return "back-to-chest";
          }

          return "back-to-chest";
        }

        return "none";
      };

      var dropTargetGetter = function dropTargetGetter(_ref4) {
        var dragDiceGesture = _ref4.dragDiceGesture,
            chestDomNode = _ref4.chestDomNode,
            rolledAreaDomNode = _ref4.rolledAreaDomNode;
        var diceIsOverChest = domNodeCollidesWithRectangle(chestDomNode, dragDiceGesture.diceRectangle);

        if (diceIsOverChest) {
          return chestDomNode;
        }

        var diceIsOverRolledArea = domNodeCollidesWithRectangle(rolledAreaDomNode, dragDiceGesture.diceRectangle);

        if (diceIsOverRolledArea) {
          return rolledAreaDomNode;
        }

        return null;
      };

      var diceIsInRolledAreaGetter = function diceIsInRolledAreaGetter(dice, diceRolledIds) {
        return diceRolledIds.includes(dice.id);
      };

      var diceIsInChestGetter = function diceIsInChestGetter(dice, chestSlots) {
        return Object.keys(chestSlots).some(function (chestSlot) {
          var chestSlotContent = chestSlots[chestSlot];
          return chestSlotContent && chestSlotContent.type === "dice" && chestSlotContent.value === dice.id;
        });
      };

      var diceIsInCursedAreaGetter = function diceIsInCursedAreaGetter(dice, diceCursedIds) {
        return diceCursedIds.includes(dice.id);
      };

      var keepDiceAllowedGetter = function keepDiceAllowedGetter(dice, _ref5) {
        var scoreMarked = _ref5.scoreMarked,
            threeSkullsOrMoreInCursedArea = _ref5.threeSkullsOrMoreInCursedArea;

        if (scoreMarked) {
          return false;
        }

        if (threeSkullsOrMoreInCursedArea) {
          return false;
        }

        return true;
      };

      var unkeepDiceAllowedGetter = function unkeepDiceAllowedGetter(dice, _ref6) {
        var scoreMarked = _ref6.scoreMarked,
            threeSkullsOrMoreInCursedArea = _ref6.threeSkullsOrMoreInCursedArea;

        if (scoreMarked) {
          return false;
        }

        if (threeSkullsOrMoreInCursedArea) {
          return false;
        }

        return true;
      };

      var uncurseDiceAllowedGetter = function uncurseDiceAllowedGetter(dice, _ref7) {
        var scoreMarked = _ref7.scoreMarked,
            threeSkullsOrMoreInCursedArea = _ref7.threeSkullsOrMoreInCursedArea,
            currentCard = _ref7.currentCard,
            witchUncursedDiceId = _ref7.witchUncursedDiceId;

        if (scoreMarked) {
          return false;
        }

        if (threeSkullsOrMoreInCursedArea) {
          return false;
        }

        if (!isWitchCard(currentCard)) {
          return false;
        }

        if (witchUncursedDiceId !== dice.id) {
          return false;
        }

        return true;
      };

      var rolledAreaDropPositionGetter = function rolledAreaDropPositionGetter(rolledAreaPosition, rolledAreaDomNode) {
        var absoluteRolledAreaPositionRectangle = rectangleAbsoluteToDomNode({
          left: rolledAreaPosition.x,
          top: rolledAreaPosition.y,
          right: 0,
          bottom: 0
        }, rolledAreaDomNode);
        return {
          x: absoluteRolledAreaPositionRectangle.left,
          y: absoluteRolledAreaPositionRectangle.top
        };
      };

      var chestSlotDropPositionGetter = function chestSlotDropPositionGetter(chestSlot, chestDomNode) {
        var destinationSlotDomNode = chestSlotToChestSlotDomNode(chestSlot, chestDomNode);
        var destinationSlotRectangle = getDomNodeRectangle(destinationSlotDomNode);
        return {
          // + 5 is because dice is centered in the chest slot
          x: destinationSlotRectangle.left + 5,
          y: destinationSlotRectangle.top + 5
        };
      };

      var closestRolledAreaPositionGetter = function closestRolledAreaPositionGetter(requestedRectangle, rolledAreaDomNode) {
        var rectangle = rectangleRelativeToDomNode(requestedRectangle, rolledAreaDomNode);
        var closestRolledAreaPosition = {
          x: rectangle.left,
          y: rectangle.top
        };
        return closestRolledAreaPosition;
      };

      var highestRolledAreaZIndexGetter = function highestRolledAreaZIndexGetter(dice, _ref8) {
        var diceRolledIds = _ref8.diceRolledIds,
            dices = _ref8.dices;

        if (diceRolledIds.length === 0) {
          return 1;
        }

        var diceWithHighestZIndex = diceRolledIds.slice(1).reduce(function (previous, diceId) {
          var dice = dices[diceId];
          var diceZIndex = dice.rolledAreaZIndex;
          if (diceZIndex > previous.rolledAreaZIndex) return dice;
          return previous;
        }, dices[diceRolledIds[0]]);
        if (diceWithHighestZIndex === dice) return dice.rolledAreaZIndex;
        return diceWithHighestZIndex.rolledAreaZIndex + 1;
      };

      var firstAvailableChestSlotGetter = function firstAvailableChestSlotGetter(chestSlots) {
        var firstAvailableChestSlot = Object.keys(chestSlots).find(function (chestSlot) {
          var chestSlotContent = chestSlots[chestSlot];
          return !chestSlotContent;
        });
        return firstAvailableChestSlot;
      };

      var closestAvailableChestSlotGetter = function closestAvailableChestSlotGetter(dice, _ref9) {
        var chestSlots = _ref9.chestSlots,
            rectangle = _ref9.rectangle,
            chestDomNode = _ref9.chestDomNode;
        var chestSlotMap = new Map();
        var domNodeCandidates = [];
        Object.keys(chestSlots).forEach(function (chestSlot) {
          var chestSlotContent = chestSlots[chestSlot];
          var chestSlotIsEmpty = !chestSlotContent;

          if (chestSlotIsEmpty || chestSlotContent.type === "dice" && chestSlotContent.value === dice.id) {
            var chestSlotDomNode = chestSlotToChestSlotDomNode(chestSlot, chestDomNode);
            chestSlotMap.set(chestSlotDomNode, chestSlot);
            domNodeCandidates.push(chestSlotDomNode);
          }
        });
        var closestDomNode = findDomNodeClosestToRectangle(domNodeCandidates, rectangle);
        var closestChestSlot = chestSlotMap.get(closestDomNode);
        return closestChestSlot;
      };

      var diceToChestSlot = function diceToChestSlot(dice, chestSlots) {
        var diceChestSlot = Object.keys(chestSlots).find(function (chestSlot) {
          var chestSlotContent = chestSlots[chestSlot];
          return chestSlotContent && chestSlotContent.type === "dice" && chestSlotContent.value === dice.id;
        });
        return diceChestSlot;
      };

      var chestSlotToChestSlotDomNode = function chestSlotToChestSlotDomNode(chestSlot, chestDomNode) {
        var chestSlotDomNode = chestDomNode.querySelector("[data-chest-slot=\"".concat(chestSlot, "\"]"));
        return chestSlotDomNode;
      };

      var diceToLocation = function diceToLocation(dice, _ref10) {
        var chestSlots = _ref10.chestSlots,
            diceRolledIds = _ref10.diceRolledIds,
            diceCursedIds = _ref10.diceCursedIds;
        var diceChestSlot = Object.keys(chestSlots).find(function (chestSlot) {
          return chestSlots[chestSlot] && chestSlots[chestSlot].type === "dice" && chestSlots[chestSlot].value === dice.id;
        });

        if (diceChestSlot) {
          return {
            type: "chest-slot",
            value: diceChestSlot
          };
        }

        if (diceRolledIds.includes(dice.id)) {
          return {
            type: "rolled-area",
            value: _objectSpread(_objectSpread({}, dice.rolledAreaPosition), {}, {
              rotation: dice.rotation,
              zIndex: dice.rolledAreaZIndex
            })
          };
        }

        if (diceCursedIds.includes(dice.id)) {
          return {
            type: "cursed-area",
            value: undefined
          };
        }

        return {
          type: "offscreen-area"
        };
      };

      var diceLocationToProps = function diceLocationToProps(_ref11, _ref12) {
        var type = _ref11.type,
            value = _ref11.value;
        var chestDomNode = _ref12.chestDomNode,
            rolledAreaDomNode = _ref12.rolledAreaDomNode,
            cursedAreaDomNode = _ref12.cursedAreaDomNode,
            offscreenDomNode = _ref12.offscreenDomNode;

        if (type === "chest-slot") {
          return {
            parentNode: chestDomNode.querySelector("[data-chest-slot=\"".concat(value, "\"]")),
            zIndex: undefined,
            rotation: 0,
            x: undefined,
            y: undefined,
            draggable: true
          };
        }

        if (type === "rolled-area") {
          return {
            parentNode: rolledAreaDomNode,
            zIndex: value.zIndex,
            rotation: value.rotation,
            x: value.x,
            y: value.y,
            draggable: true
          };
        }

        if (type === "cursed-area") {
          return {
            parentNode: cursedAreaDomNode,
            zIndex: undefined,
            rotation: 0,
            x: undefined,
            y: undefined,
            draggable: false
          };
        }

        return {
          parentNode: offscreenDomNode,
          zIndex: undefined,
          rotation: 0,
          x: undefined,
          y: undefined,
          draggable: false
        };
      };

      var DrawCardDialog = function DrawCardDialog(_ref) {
        var dialogIsOpen = _ref.dialogIsOpen,
            closeDialog = _ref.closeDialog;
        var cardDeck = useCardDeck();
        var currentCardId = useCurrentCardId();
        var currentCard = cardIdToCard(currentCardId) || null;
        var shuffleCardsText = "Paquet de cartes épuisé. Mélangez-le pour pouvoir piocher à nouveau !";
        var drawCardText = "Piochez une carte pour le tour suivant.";
        return /*#__PURE__*/react.createElement(Dialog, {
          isOpen: dialogIsOpen,
          onRequestClose: closeDialog,
          requestCloseOnClickOutside: false
        }, /*#__PURE__*/react.createElement("div", {
          className: "dialog-content draw-card-dialog"
        }, /*#__PURE__*/react.createElement("div", {
          className: "dialog-body"
        }, /*#__PURE__*/react.createElement("div", {
          className: "dialog-label"
        }, cardDeck.length === 0 && !currentCard && shuffleCardsText, cardDeck.length !== 0 && !currentCard && drawCardText, currentCard && /*#__PURE__*/react.createElement("span", {
          className: "card-name"
        }, cardsRules[currentCard.type].name)), /*#__PURE__*/react.createElement("div", {
          className: "card-area"
        }, /*#__PURE__*/react.createElement("div", {
          style: {
            position: "relative"
          }
        }, /*#__PURE__*/react.createElement(BackCard$1, {
          currentCard: currentCard,
          remainingCardCount: cardDeck.length
        }), /*#__PURE__*/react.createElement(TopCard, {
          currentCard: currentCard
        })))), /*#__PURE__*/react.createElement("div", {
          className: "dialog-actions"
        }, /*#__PURE__*/react.createElement(DeckButton, {
          cardDeck: cardDeck,
          currentCard: currentCard
        }), currentCard ? /*#__PURE__*/react.createElement(StartButton, {
          currentCard: currentCard,
          closeDialog: closeDialog
        }) : null)));
      };

      var TopCard = function TopCard(_ref2) {
        var currentCard = _ref2.currentCard;

        if (!currentCard) {
          return null;
        }

        return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
          className: "card current-card",
          id: "big-card"
        }, /*#__PURE__*/react.createElement("div", {
          className: "flip-card"
        }, /*#__PURE__*/react.createElement("div", {
          className: "flip-card-inner"
        }, /*#__PURE__*/react.createElement("div", {
          className: "flip-card-front"
        }, /*#__PURE__*/react.createElement(Image$1, {
          className: "card default-card",
          src: cardDefaultUrl
        })), /*#__PURE__*/react.createElement("div", {
          className: "flip-card-back"
        }, /*#__PURE__*/react.createElement(Image$1, {
          className: "card-img",
          src: cardToImageUrl(currentCard),
          width: "150",
          alt: currentCard.type
        }))))), /*#__PURE__*/react.createElement("div", {
          className: "small-card"
        }, /*#__PURE__*/react.createElement(SmallCard, {
          card: currentCard
        })));
      };

      var BackCard$1 = function BackCard(_ref3) {
        var currentCard = _ref3.currentCard,
            remainingCardCount = _ref3.remainingCardCount;
        return /*#__PURE__*/react.createElement("div", {
          className: "card default-card",
          id: "back-deck-card",
          style: {
            background: "none"
          }
        }, /*#__PURE__*/react.createElement(Image$1, {
          src: cardDefaultUrl,
          width: "150"
        }), !currentCard && /*#__PURE__*/react.createElement("div", {
          className: "remaining-cards-number"
        }, remainingCardCount));
      };

      var DeckButton = function DeckButton(_ref4) {
        var cardDeck = _ref4.cardDeck,
            currentCard = _ref4.currentCard;

        if (currentCard) {
          return null;
        }

        if (cardDeck.length === 0) {
          return /*#__PURE__*/react.createElement(ButtonShuffleDeck, null);
        }

        return /*#__PURE__*/react.createElement(ButtonDrawCard, null);
      };

      var ButtonDrawCard = function ButtonDrawCard() {
        var drawCard = useDrawCard();
        return /*#__PURE__*/react.createElement("button", {
          className: "draw-card-btn",
          onClick: drawCard
        }, "Piocher");
      };

      var ButtonShuffleDeck = function ButtonShuffleDeck() {
        var shuffleDeck = useShuffleDeck();

        var shuffleDeckAnimation = function shuffleDeckAnimation() {
          document.getElementById("back-deck-card").setAttribute("shaking-deck", "");
          setTimeout(function () {
            document.getElementById("back-deck-card").removeAttribute("shaking-deck", "");
            shuffleDeck();
          }, 1000);
        };

        return /*#__PURE__*/react.createElement("button", {
          className: "draw-card-btn",
          onClick: shuffleDeckAnimation
        }, "M\xE9langer");
      };

      var animateCard = function animateCard(duration) {
        var bigCard = document.querySelector("#big-card");
        var bigCardBack = document.querySelector("#back-deck-card");
        var smallCard = document.querySelector("#small-card");
        bigCardBack.style.opacity = 0;
        bigCard.animate([{
          transform: "scale(1)",
          opacity: 1
        }, {
          transform: "scale(0)",
          opacity: 0
        }], {
          duration: duration,
          fill: "forwards"
        });
        smallCard.animate([{
          transform: "scale(0)",
          opacity: 0,
          position: "fixed",
          top: "auto",
          left: "auto"
        }, {
          transform: "scale(1)",
          opacity: 1,
          position: "fixed",
          top: "15px",
          left: "15px"
        }], {
          duration: duration,
          fill: "forwards"
        });
      };

      var StartButton = function StartButton() {
        var activateCurrentCard = useActivateCurrentCard();

        var start = function start() {
          var animationDuration = 500;
          animateCard(animationDuration);
          setTimeout(function () {
            activateCurrentCard();
          }, animationDuration);
        };

        return /*#__PURE__*/react.createElement("button", {
          className: "draw-card-btn",
          onClick: function onClick() {
            start();
          }
        }, "Commencer");
      };

      var Round = function Round(_ref) {
        var openScoreboard = _ref.openScoreboard,
            onRoundStart = _ref.onRoundStart,
            onRoundOver = _ref.onRoundOver;
        var currentCardActivated = useCurrentCardActivated();

        var _React$useState = react.useState(false),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            roundMounted = _React$useState2[0],
            roundMountedSetter = _React$useState2[1];

        react.useEffect(function () {
          onRoundStart();
        }, []);
        var diceOverRolledAreaSignal = useSignalEmitter();
        var diceOverChestSignal = useSignalEmitter();
        return /*#__PURE__*/react.createElement("div", {
          className: "round-container"
        }, /*#__PURE__*/react.createElement(CardsEffects, null), /*#__PURE__*/react.createElement(Header, {
          openScoreboard: openScoreboard
        }), currentCardActivated ? /*#__PURE__*/react.createElement(RoundGameBoard, {
          diceOverRolledAreaSignal: diceOverRolledAreaSignal,
          diceOverChestSignal: diceOverChestSignal,
          openScoreboard: openScoreboard,
          onRoundOver: onRoundOver,
          onRoundMounted: function onRoundMounted(refs) {
            roundMountedSetter(refs);
          }
        }) : null, roundMounted ? /*#__PURE__*/react.createElement(DiceContainer, {
          offscreenDomNode: roundMounted.offscreenDomNode,
          chestDomNode: roundMounted.chestDomNode,
          rolledAreaDomNode: roundMounted.rolledAreaDomNode,
          cursedAreaDomNode: roundMounted.cursedAreaDomNode,
          onDiceOverChestChange: diceOverChestSignal.emit,
          onDiceOverRolledAreaChange: diceOverRolledAreaSignal.emit
        }) : null, /*#__PURE__*/react.createElement(DrawCardDialog, {
          dialogIsOpen: !currentCardActivated
        }));
      };

      var RoundGameBoard = function RoundGameBoard(_ref2) {
        var diceOverRolledAreaSignal = _ref2.diceOverRolledAreaSignal,
            diceOverChestSignal = _ref2.diceOverChestSignal,
            onRoundMounted = _ref2.onRoundMounted,
            onRoundOver = _ref2.onRoundOver;
        var rolledAreaRef = react.useRef(null);
        var chestRef = react.useRef(null);
        var cursedAreaRef = react.useRef(null);
        var offscreenRef = react.useRef(null);
        react.useEffect(function () {
          onRoundMounted({
            rolledAreaDomNode: rolledAreaRef.current,
            chestDomNode: chestRef.current,
            cursedAreaDomNode: cursedAreaRef.current,
            offscreenDomNode: offscreenRef.current
          });
        }, []);
        return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(RoundEffects, null), /*#__PURE__*/react.createElement("div", {
          className: "chest-and-skulls"
        }, /*#__PURE__*/react.createElement(Chest, {
          chestRef: chestRef,
          diceOverChestSignal: diceOverChestSignal
        }), /*#__PURE__*/react.createElement(SkullIsland, {
          cursedAreaRef: cursedAreaRef
        })), /*#__PURE__*/react.createElement(DiceOnGoing, {
          rolledAreaRef: rolledAreaRef,
          offscreenRef: offscreenRef,
          diceOverRolledAreaSignal: diceOverRolledAreaSignal
        }), /*#__PURE__*/react.createElement(Footer, {
          onRoundOver: onRoundOver,
          rolledAreaRef: rolledAreaRef
        }));
      };

      var StartPlayerRoundDialog = function StartPlayerRoundDialog(_ref) {
        var closeDialog = _ref.closeDialog,
            dialogIsOpen = _ref.dialogIsOpen,
            player = _ref.player;
        var startPlayerRound = useStartPlayerRound();
        return /*#__PURE__*/react.createElement(Dialog, {
          isOpen: dialogIsOpen,
          onRequestClose: closeDialog,
          requestCloseOnClickOutside: true
        }, /*#__PURE__*/react.createElement("div", {
          className: "dialog-content score-board-dialog"
        }, /*#__PURE__*/react.createElement("div", {
          className: "cross",
          onClick: closeDialog
        }, "X"), /*#__PURE__*/react.createElement("div", {
          className: "dialog-body"
        }, /*#__PURE__*/react.createElement("div", null, "Au tour de", /*#__PURE__*/react.createElement("div", {
          className: "dialog-label"
        }, player.character.name), /*#__PURE__*/react.createElement(Image$1, {
          className: "player-img",
          src: player && player.character.img,
          alt: "player",
          style: {
            boxShadow: "inset 0px 0px 0px 4px ".concat(player && player.character.color || "black")
          }
        })), /*#__PURE__*/react.createElement("div", {
          className: "dialog-actions"
        }, /*#__PURE__*/react.createElement("button", {
          onClick: function onClick() {
            closeDialog();
            startPlayerRound(player);
          }
        }, "Jouer")))));
      };

      var winTreasureUrl = System.resolve("./assets/win-treasure.png", module.meta.url);

      var SCORE_MAX = 6000;
      var pathList = {
        path1: "M39.582,739.564c0-91.824,39.191-96.32,38.045-166.691s-30.042-70.37-47.326-161.729s38.128-86.388,31.276-186.42C55.405,134.602-3.014,89.176,8.812,129.825c5.333,18.333,30.77-21,30.77-129.825",
        path2: "M39.582,739.564c0-113.074-5.437-166.074-8.437-198.074s36-20.667,33.019-2c-1.796,11.248-24.583,13.333-23.699-22c1.229-49.158,22.68-111,23.68-169s-38-95-46-181S39.582,0,39.582,0",
        path3: "M39.582,739.564c0-71.926-15.437-155.074-17.437-253.074s30-185,31.087-217s-31.087-46-31.087-26s33,10,31-32s-31-110-31-144S39.582,0,39.582,0",
        path4: "M39.582,739.564c0-113.074-5.437-166.074-8.437-198.074s36-20.667,33.019-2c-1.796,11.248-24.583,13.333-23.699-22c1.229-49.158,22.68-111,23.68-169s-38-95-46-181S39.582,0,39.582,0"
      };
      var ScoreBoard = function ScoreBoard(_ref) {
        var openedByUser = _ref.openedByUser,
            closeScoreboard = _ref.closeScoreboard,
            playerAnimation = _ref.playerAnimation;
        var players = usePlayers();
        var currentPlayer = useCurrentPlayer();
        var roundStarted = useRoundStarted(); // dialogue StartPlayerRoundDialog

        var _React$useState = react.useState(false),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            startPlayerRoundDialogIsOpen = _React$useState2[0],
            startPlayerRoundDialogIsOpenSetter = _React$useState2[1];

        var openStartPlayerRoundDialog = function openStartPlayerRoundDialog() {
          startPlayerRoundDialogIsOpenSetter(true);
        };

        var closeStartPlayerRoundDialog = function closeStartPlayerRoundDialog() {
          startPlayerRoundDialogIsOpenSetter(false);
        };

        var nextPlayer = getNextPlayer();
        return /*#__PURE__*/react.createElement("div", {
          className: "score-board-container"
        }, openedByUser && /*#__PURE__*/react.createElement("div", {
          className: "cross",
          onClick: closeScoreboard
        }, "X"), !roundStarted && !currentPlayer && /*#__PURE__*/react.createElement("div", {
          className: "action-container"
        }, /*#__PURE__*/react.createElement("button", {
          className: "score-board-action",
          onClick: function onClick() {
            openStartPlayerRoundDialog();
          }
        }, "Commencer \xE0 jouer")), /*#__PURE__*/react.createElement(Image$1, {
          className: "win-treasure-img",
          src: winTreasureUrl,
          alt: "win-treasure"
        }), /*#__PURE__*/react.createElement("div", {
          className: "users-path"
        }, players.map(function (player) {
          return /*#__PURE__*/react.createElement(PlayerPath, {
            key: player.id,
            player: player,
            pathCoordinates: pathList["path".concat(player.id)],
            score: player.score,
            character: player.character,
            openStartPlayerRoundDialog: openStartPlayerRoundDialog,
            isCurrentPlayer: currentPlayer && player.id === currentPlayer.id,
            playerAnimation: playerAnimation
          });
        })), /*#__PURE__*/react.createElement(StartPlayerRoundDialog, {
          dialogIsOpen: startPlayerRoundDialogIsOpen,
          closeDialog: closeStartPlayerRoundDialog,
          player: nextPlayer
        }));
      };

      var getNextPlayer = function getNextPlayer() {
        var currentPlayer = useCurrentPlayer();
        var players = usePlayers();
        var nextPlayer;

        if (currentPlayer) {
          var currentPlayerIndex = players.findIndex(function (player) {
            return player.id === currentPlayer.id;
          });
          nextPlayer = currentPlayerIndex === players.length - 1 ? players[0] : players[currentPlayerIndex + 1];
        } else {
          nextPlayer = players[0];
        }

        return nextPlayer;
      };

      var PlayerPath = function PlayerPath(_ref2) {
        var pathCoordinates = _ref2.pathCoordinates,
            player = _ref2.player,
            character = _ref2.character,
            score = _ref2.score,
            openStartPlayerRoundDialog = _ref2.openStartPlayerRoundDialog,
            playerAnimation = _ref2.playerAnimation;
        var pathForegroundElementRef = react.useRef(null);
        var circleElementRef = react.useRef(null);
        var nextPlayer = getNextPlayer();

        var _React$useState3 = react.useState(),
            _React$useState4 = _slicedToArray(_React$useState3, 2),
            scoreAnimation = _React$useState4[0],
            scoreAnimationSetter = _React$useState4[1];

        react.useEffect(function () {
          if (playerAnimation && playerAnimation.player === player) {
            scoreAnimationSetter(playerAnimation.score);
          } else {
            scoreAnimationSetter(null);
          }
        }, [playerAnimation, player]);
        react.useEffect(function () {
          if (!scoreAnimation) return function () {};
          var from = scoreAnimation.from,
              to = scoreAnimation.to;
          var pathForegroundElement = pathForegroundElementRef.current;
          var pathLength = pathForegroundElement.getTotalLength();
          var pathForegroundAnimation = pathForegroundElement.animate([{
            strokeDashoffset: ratioToStrokeDashOffset(from / SCORE_MAX, pathLength)
          }, {
            strokeDashoffset: ratioToStrokeDashOffset(to / SCORE_MAX, pathLength)
          }], {
            duration: 1000,
            fill: "forwards"
          });
          var circleElement = circleElementRef.current;
          var circleAnimation = circleElement.animate([{
            offsetDistance: ratioToOffsetDistance(from / SCORE_MAX)
          }, {
            offsetDistance: ratioToOffsetDistance(to / SCORE_MAX)
          }], {
            duration: 1000,
            fill: "forwards"
          });

          pathForegroundAnimation.onfinish = function () {
            if (circleAnimation.playState === "finished") scoreAnimationSetter(null);
          };

          circleAnimation.onfinish = function () {
            if (pathForegroundAnimation.playState === "finished") scoreAnimationSetter(null);
          };

          return function () {
            pathForegroundAnimation.cancel();
            circleAnimation.cancel();
          };
        }, [scoreAnimation]); // uncomment to test score animation
        // React.useEffect(() => {
        //   scoreAnimationSetter({
        //     from: 0,
        //     to: -1000,
        //   })
        // }, [])

        react.useEffect(function () {
          // path-foreground line fill
          var pathForegroundElement = pathForegroundElementRef.current;
          var pathLength = pathForegroundElement.getTotalLength();
          pathForegroundElement.style.strokeDasharray = pathLength;
          pathForegroundElement.style.strokeDashoffset = ratioToStrokeDashOffset(score / SCORE_MAX, pathLength);
        }, [score]);
        return /*#__PURE__*/react.createElement("div", {
          className: "user-path"
        }, /*#__PURE__*/react.createElement("svg", {
          viewBox: "0 0 79.164 739.564"
        }, /*#__PURE__*/react.createElement("path", {
          d: pathCoordinates,
          className: "path-background"
        }), /*#__PURE__*/react.createElement("path", {
          ref: pathForegroundElementRef,
          d: pathCoordinates,
          className: "path-foreground"
        }), /*#__PURE__*/react.createElement("circle", {
          ref: circleElementRef,
          r: "13",
          fill: character.color || "white",
          className: "score-indicator",
          style: {
            offsetPath: "path('".concat(pathCoordinates, "')"),
            offsetDistance: ratioToOffsetDistance(score / SCORE_MAX)
          }
        })), /*#__PURE__*/react.createElement("div", {
          className: "speech-bubble"
        }, score), /*#__PURE__*/react.createElement("div", {
          className: "user-avatar ".concat(nextPlayer.character.id === character.id ? "next-player" : ""),
          onClick: function onClick() {
            if (nextPlayer.character.id === character.id) openStartPlayerRoundDialog();
          }
        }, /*#__PURE__*/react.createElement(Avatar, {
          character: character
        })));
      };

      var ratioToOffsetDistance = function ratioToOffsetDistance(ratio) {
        return "".concat(ratio * 100, "%");
      };

      var ratioToStrokeDashOffset = function ratioToStrokeDashOffset(ratio, pathLength) {
        return pathLength - ratio * pathLength;
      };

      var Avatar = function Avatar(_ref3) {
        var character = _ref3.character;
        return /*#__PURE__*/react.createElement(Image$1, {
          className: "player-img",
          src: character.img,
          alt: "player",
          style: {
            boxShadow: "inset 0px 0px 0px 4px ".concat(character.color || "black")
          }
        });
      };

      var GameConfiguration = function GameConfiguration() {
        var setPlayerCount = useSetPlayerCount();
        return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("p", null, "Combien de joueur?"), [1, 2, 3, 4, 5].map(function (playerCount) {
          return /*#__PURE__*/react.createElement("button", {
            key: playerCount,
            onClick: function onClick() {
              setPlayerCount(playerCount);
            }
          }, playerCount === 1 ? "1 joueur" : "".concat(playerCount, " joueurs"));
        }));
      };
      var useSetPlayerCount = createAction(function (state, playerCount) {
        return _objectSpread(_objectSpread({}, state), {}, {
          players: new Array(playerCount).fill("").map(function (_, index) {
            return {
              id: index + 1,
              number: index + 1,
              score: 0
            };
          })
        });
      });

      var luffyUrl = System.resolve("./assets/Luffy.png", module.meta.url);

      var missFortuneUrl = System.resolve("./assets/MissFortune.png", module.meta.url);

      var jackSparrowUrl = System.resolve("./assets/JackSparrow.png", module.meta.url);

      var barbeRougeUrl = System.resolve("./assets/BarbeRouge.png", module.meta.url);

      var ginetteBouletteUrl = System.resolve("./assets/GinetteBoulette.png", module.meta.url);

      var capitaineCrochetUrl = System.resolve("./assets/CapitaineCrochet.png", module.meta.url);

      var CHARACTERS = [{
        id: 1,
        name: "Luffy",
        color: "#ef9620",
        img: luffyUrl
      }, {
        id: 2,
        name: "Miss Fortune",
        color: "#d90f1b",
        img: missFortuneUrl
      }, {
        id: 3,
        name: "Jack Sparrow",
        color: "#007033",
        img: jackSparrowUrl
      }, {
        id: 4,
        name: "Barbe Rouge",
        color: "#7baac9",
        img: barbeRougeUrl
      }, {
        id: 5,
        name: "Ginette Boulette",
        color: "#e2500c",
        img: ginetteBouletteUrl
      }, {
        id: 6,
        name: "Capitaine Crochet",
        color: "#952460",
        img: capitaineCrochetUrl
      }];

      var CharacterSelection = function CharacterSelection(_ref) {
        var players = _ref.players;
        var setPlayerCharacter = useSetPlayerCharacter();
        var startGame = useStartGame();
        var playerWithoutCharacter = players.find(function (player) {
          return !player.character;
        });
        scrollEffect();
        react.useEffect(function () {
          scrollEffect();
        }, []);
        return /*#__PURE__*/react.createElement("div", {
          className: "character-selection-page"
        }, /*#__PURE__*/react.createElement(CrewMembers, null), playerWithoutCharacter && /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("p", null, "Joueur ", playerWithoutCharacter.number, " : quel pirate \xEAtes vous ?"), /*#__PURE__*/react.createElement("div", {
          className: "characters-container",
          id: "menu-wrapper"
        }, /*#__PURE__*/react.createElement("div", {
          className: "characters menu"
        }, CHARACTERS.map(function (character) {
          return /*#__PURE__*/react.createElement("div", {
            className: "character item ".concat(characterIsAvailable(character, players) ? "" : "disabled"),
            key: character.id,
            onClick: function onClick(event) {
              event.target.animate([{
                transform: "scale(1)"
              }, {
                transform: "scale(1.3)"
              }, {
                transform: "scale(1)"
              }], {
                duration: 400,
                fill: "forwards"
              });
              setPlayerCharacter(playerWithoutCharacter, character);
            }
          }, /*#__PURE__*/react.createElement(Image$1, {
            className: "character-img",
            src: character && character.img,
            alt: "player",
            style: {
              border: "4px solid ".concat(character && character.color || "black")
            }
          }), /*#__PURE__*/react.createElement("span", null, character.name));
        })), /*#__PURE__*/react.createElement("div", {
          className: "paddles"
        }, /*#__PURE__*/react.createElement("button", {
          className: "left-paddle paddle hidden"
        }, "<"), /*#__PURE__*/react.createElement("button", {
          className: "right-paddle paddle",
          onClick: function onClick() {
            scrollEffect();
          }
        }, ">")))), !playerWithoutCharacter && /*#__PURE__*/react.createElement("div", {
          className: "crew-completed"
        }, /*#__PURE__*/react.createElement("p", null, "L\u2018\xE9quipage est au complet !"), /*#__PURE__*/react.createElement(Image$1, {
          src: cardToSmallImageUrl({
            type: CARD_TWO_SWORDS_CHALLENGE
          })
        }), /*#__PURE__*/react.createElement("button", {
          onClick: function onClick() {
            startGame();
          }
        }, "D\xE9marrer la partie")));
      };

      var CrewMembers = function CrewMembers() {
        var players = usePlayers();
        return /*#__PURE__*/react.createElement("div", {
          className: "crew ".concat(players.length > 3 ? "large-crew" : "")
        }, /*#__PURE__*/react.createElement("p", null, "Votre \xE9quipage:"), /*#__PURE__*/react.createElement("ul", null, players.map(function (player) {
          return /*#__PURE__*/react.createElement("li", {
            key: player.id
          }, player.character ? /*#__PURE__*/react.createElement(Image$1, {
            className: "crew-member-img",
            src: player.character && player.character.img,
            alt: "player",
            style: {
              border: "4px solid ".concat(player.character && player.character.color || "black")
            }
          }) : /*#__PURE__*/react.createElement("div", {
            className: "placeholder-img"
          }), /*#__PURE__*/react.createElement("span", null, player.character ? player.character.name : "Joueur".concat(player.number)));
        })));
      };

      var useStartGame = createAction(function (state) {
        var cardIds = state.cardIds;
        return _objectSpread(_objectSpread({}, state), {}, {
          gameStarted: true,
          cardIds: mixDeck(cardIds)
        });
      });

      var characterIsAvailable = function characterIsAvailable(character, players) {
        return !players.some(function (player) {
          return player.character && player.character.name === character.name;
        });
      };

      var useSetPlayerCharacter = createAction(function (state, player, character) {
        var players = state.players;
        player.character = character;
        return _objectSpread(_objectSpread({}, state), {}, {
          players: _toConsumableArray(players)
        });
      });

      var scrollEffect = function scrollEffect() {
        var scrollDuration = 300;
        var itemsLength = document.getElementsByClassName("item").length;
        var itemSize = 123;

        var getMenuWrapperSize = function getMenuWrapperSize() {
          return document.getElementById("menu-wrapper") ? document.getElementById("menu-wrapper").offsetWidth : null;
        };

        var menuWrapperSize = getMenuWrapperSize();

        var getMenuSize = function getMenuSize() {
          return itemsLength * itemSize;
        };

        var menuSize = getMenuSize();

        window.onresize = function () {
          menuWrapperSize = getMenuWrapperSize();
        };

        var menuVisibleSize = menuWrapperSize;
        var menuInvisibleSize = menuSize - menuVisibleSize;

        var getMenuPosition = function getMenuPosition() {
          return document.querySelector(".menu").scrollLeft;
        };

        var leftPaddle = document.querySelector(".left-paddle");
        var rightPaddle = document.querySelector(".right-paddle");

        if (document.querySelector(".menu")) {
          document.querySelector(".menu").onscroll = function () {
            menuInvisibleSize = menuSize - menuWrapperSize;
            var menuPosition = getMenuPosition();
            var menuEndOffset = menuInvisibleSize;

            if (menuPosition <= 0) {
              leftPaddle.classList.add("hidden");
              rightPaddle.classList.remove("hidden");
            } else if (menuPosition < menuEndOffset) {
              // show both paddles in the middle
              leftPaddle.classList.remove("hidden");
              rightPaddle.classList.remove("hidden");
            } else if (menuPosition >= menuEndOffset) {
              leftPaddle.classList.remove("hidden");
              rightPaddle.classList.add("hidden");
            }
          };
        }

        if (rightPaddle) {
          rightPaddle.onclick = function () {
            if (document.querySelector(".menu")) {
              var scrollStart = document.querySelector(".menu").scrollLeft;
              var scrollEnd = scrollStart + menuWrapperSize;
              startJavaScriptAnimation({
                duration: scrollDuration,
                onProgress: function onProgress(_ref2) {
                  var progress = _ref2.progress;
                  document.querySelector(".menu").scrollLeft = scrollStart + (scrollEnd - scrollStart) * progress;
                }
              });
            }
          };
        }

        if (leftPaddle) {
          leftPaddle.onclick = function () {
            if (document.querySelector(".menu")) {
              var scrollStart = document.querySelector(".menu").scrollLeft;
              var scrollEnd = scrollStart - menuWrapperSize;
              startJavaScriptAnimation({
                duration: scrollDuration,
                onProgress: function onProgress(_ref3) {
                  var progress = _ref3.progress;
                  document.querySelector(".menu").scrollLeft = scrollStart + (scrollEnd - scrollStart) * progress;
                }
              });
            }
          };
        }
      };

      var Game = function Game(_ref) {
        var playerAnimationSignal = _ref.playerAnimationSignal;
        var players = usePlayers();
        var currentPlayerId = useCurrentPlayerId();
        var roundStarted = useRoundStarted();
        var isOnGameConfigurationScreen = useIsOnGameConfigurationScreen();
        var isOnCharacterSelectionScreen = useIsOnCharacterSelectionScreen();

        var _React$useState = react.useState(false),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            scoreboardOpenedByUser = _React$useState2[0],
            scoreboardOpenedByUserSetter = _React$useState2[1];

        var _React$useState3 = react.useState(null),
            _React$useState4 = _slicedToArray(_React$useState3, 2),
            roundOverPayload = _React$useState4[0],
            roundOverPayloadSetter = _React$useState4[1];

        var _React$useState5 = react.useState(null),
            _React$useState6 = _slicedToArray(_React$useState5, 2),
            playerAnimation = _React$useState6[0],
            playerAnimationSetter = _React$useState6[1];

        var isOnScoreboardScreen = !roundStarted || scoreboardOpenedByUser;
        react.useEffect(function () {
          if (roundOverPayload && roundOverPayload.reason === "score-marked") {
            var player = players.find(function (player) {
              return player.id === currentPlayerId;
            });
            var roundScore = roundOverPayload.value;
            var fromScore = player.score - roundScore;
            playerAnimationSetter({
              player: player,
              score: {
                from: fromScore < 0 ? 0 : fromScore,
                to: player.score
              }
            });
          } else {
            playerAnimationSetter(null);
          }
        }, [roundOverPayload, currentPlayerId]);
        react.useEffect(function () {
          if (playerAnimationSignal) {
            playerAnimationSignal.listen(playerAnimationSetter);
          }
        }, [playerAnimationSignal]);

        if (isOnGameConfigurationScreen) {
          return /*#__PURE__*/react.createElement(GameConfiguration, null);
        }

        if (isOnCharacterSelectionScreen) {
          return /*#__PURE__*/react.createElement(CharacterSelection, {
            players: players
          });
        }

        if (isOnScoreboardScreen) {
          return /*#__PURE__*/react.createElement(ScoreBoard, {
            openedByUser: scoreboardOpenedByUser,
            closeScoreboard: function closeScoreboard() {
              scoreboardOpenedByUserSetter(false);
            },
            playerAnimation: playerAnimation
          });
        }

        return /*#__PURE__*/react.createElement(Round, {
          openScoreboard: function openScoreboard() {
            scoreboardOpenedByUserSetter(true);
          },
          onRoundStart: function onRoundStart() {
            roundOverPayloadSetter(null);
          },
          onRoundOver: function onRoundOver(roundOverPayload) {
            roundOverPayloadSetter(roundOverPayload);
          }
        });
      };
      var useIsOnGameConfigurationScreen = function useIsOnGameConfigurationScreen() {
        var players = usePlayers();
        var needsToChooseNumberOfPlayers = players.length === 0;
        return needsToChooseNumberOfPlayers;
      };
      var useIsOnCharacterSelectionScreen = function useIsOnCharacterSelectionScreen() {
        var gameStarted = useGameStarted();
        return !gameStarted;
      };

      var _classCallCheck = (function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      });

      var _createClass = (function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      });

      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      var setPrototypeOf = Object.setPrototypeOf || function (o, p) {
        // eslint-disable-next-line no-proto
        o.__proto__ = p;
        return o;
      };

      var _inherits = (function (subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        if (superClass) setPrototypeOf(subClass, superClass);
      });

      var getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : // eslint-disable-next-line no-proto
      function (o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };

      function isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false; // core-js@3

        if (Reflect.construct.sham) return false; // Proxy can't be polyfilled. Every browser implemented
        // proxies before or at the same time as Reflect.construct,
        // so if they support Proxy they also support Reflect.construct.

        if (typeof Proxy === "function") return true; // Since Reflect.construct can't be properly polyfilled, some
        // implementations (e.g. core-js@2) don't set the correct internal slots.
        // Those polyfills don't allow us to subclass built-ins, so we need to
        // use our fallback implementation.

        try {
          // If the internal slots aren't set, this throws an error similar to
          //   TypeError: this is not a Date object.
          Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
          return true;
        } catch (e) {
          return false;
        }
      }

      var assertThisInitialized = (function (self) {
        // eslint-disable-next-line no-void
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      });

      var possibleConstructorReturn = (function (self, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }

        return assertThisInitialized(self);
      });

      function _createSuper(Derived) {
        var hasNativeReflectConstruct = isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = getPrototypeOf(Derived);
          var result;

          if (hasNativeReflectConstruct) {
            // NOTE: This doesn't work if this.__proto__.constructor has been modified.
            var NewTarget = getPrototypeOf(this).constructor; // eslint-disable-next-line prefer-rest-params

            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            // eslint-disable-next-line prefer-rest-params
            result = Super.apply(this, arguments);
          }

          return possibleConstructorReturn(this, result);
        };
      }

      var catchError = function catchError(LowerLevelComponent, ComponentDisplayedOnError) {
        var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
          _inherits(ErrorBoundary, _React$Component);

          var _super = _createSuper(ErrorBoundary);

          function ErrorBoundary(props) {
            var _this;

            _classCallCheck(this, ErrorBoundary);

            _this = _super.call(this, props);
            _this.state = {
              hasError: false,
              error: null
            };
            return _this;
          }

          _createClass(ErrorBoundary, [{
            key: "render",
            value: function render() {
              if (this.state.hasError) {
                return /*#__PURE__*/react.createElement(ComponentDisplayedOnError, {
                  error: this.state.error
                });
              }

              return /*#__PURE__*/react.createElement(LowerLevelComponent, this.props);
            }
          }], [{
            key: "getDerivedStateFromError",
            value: function getDerivedStateFromError(error) {
              return {
                hasError: true,
                error: error
              };
            }
          }]);

          return ErrorBoundary;
        }(react.Component);

        return ErrorBoundary;
      };

      var woodUrl = System.resolve("./assets/wood.jpg", module.meta.url);

      var pirateHookUrl = System.resolve("./assets/pirate-hook.png", module.meta.url);

      var pirateHook2Url = System.resolve("./assets/pirate-hook-02.png", module.meta.url);

      var woodBoxUrl = System.resolve("./assets/wood-box.jpg", module.meta.url);

      var treasureMapUrl = System.resolve("./assets/treasure-map.png", module.meta.url);

      var skullBottleUrl = System.resolve("./assets/skull-bottle.png", module.meta.url);

      function _await$1(value, then, direct) {
        if (direct) {
          return then ? then(value) : value;
        }

        if (!value || !value.then) {
          value = Promise.resolve(value);
        }

        return then ? value.then(then) : value;
      }

      function _async$1(f) {
        return function () {
          for (var args = [], i = 0; i < arguments.length; i++) {
            args[i] = arguments[i];
          }

          try {
            return Promise.resolve(f.apply(this, args));
          } catch (e) {
            return Promise.reject(e);
          }
        };
      }

      function _empty() {}

      function _awaitIgnored(value, direct) {
        if (!direct) {
          return value && value.then ? value.then(_empty) : Promise.resolve();
        }
      }

      function _invokeIgnored(body) {
        var result = body();

        if (result && result.then) {
          return result.then(_empty);
        }
      }

      function _catch$1(body, recover) {
        try {
          var result = body();
        } catch (e) {
          return recover(e);
        }

        if (result && result.then) {
          return result.then(void 0, recover);
        }

        return result;
      }

      function _continueIgnored(value) {
        if (value && value.then) {
          return value.then(_empty);
        }
      }

      var preloadImages = _async$1(function (images) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$chunkSize = _ref.chunkSize,
            chunkSize = _ref$chunkSize === void 0 ? 7 : _ref$chunkSize,
            _ref$msDelayBetweenCh = _ref.msDelayBetweenChunks,
            msDelayBetweenChunks = _ref$msDelayBetweenCh === void 0 ? 2000 : _ref$msDelayBetweenCh;

        var index = 0;
        var loaded = {};
        var failed = {};

        var preloadChunk = _async$1(function (chunk) {
          return _await$1(Promise.all(chunk.map(_async$1(function (src) {
            return _continueIgnored(_catch$1(function () {
              return _await$1(loadImage(src), function (image) {
                loaded[src] = image;
              });
            }, function () {
              failed[src] = true;
            }));
          }))), function () {
            return _await$1(new Promise(function (resolve) {
              setTimeout(resolve, msDelayBetweenChunks);
            }), function () {
              var nextChunk = getNextChunk();
              return _invokeIgnored(function () {
                if (nextChunk.length > 0) {
                  return _awaitIgnored(preloadChunk(nextChunk));
                }
              });
            });
          });
        });

        var getNextChunk = function getNextChunk() {
          var chunk = [];
          var i = 0;

          while (i < chunkSize && index < images.length) {
            chunk.push(images[index]);
            i++;
            index++;
          }

          return chunk;
        };

        return _await$1(preloadChunk(getNextChunk()), function () {
          return {
            loaded: loaded,
            failed: failed
          };
        });
      });

      var ImagePreloader = function ImagePreloader() {
        var images = [woodUrl, pirateHookUrl, pirateHook2Url, woodBoxUrl, treasureMapUrl, witchLabelUrl, skullBottleUrl, cardDefaultUrl].concat(_toConsumableArray(Object.keys(cardImageUrlMap).map(function (key) {
          return cardImageUrlMap[key];
        })));
        react.useEffect(function () {
          setTimeout(function () {
            return preloadImages(images);
          }, 2000);
        }, []);
        return null;
      };

      var milleSabordsCssUrl = System.resolve("./assets/mille-sabord.css", module.meta.url);

      var loadscreenCssUrl = System.resolve("./assets/loadscreen.css", module.meta.url);

      var MainRaw = function MainRaw(props) {
        return /*#__PURE__*/react.createElement(UrlLoadingProvider, null, /*#__PURE__*/react.createElement(LoadScreen, null, /*#__PURE__*/react.createElement("div", {
          id: "main-container"
        }, /*#__PURE__*/react.createElement("div", {
          id: "main",
          ref: useMainDomNodeSetter()
        }, /*#__PURE__*/react.createElement(Stylesheet, {
          href: milleSabordsCssUrl
        }), /*#__PURE__*/react.createElement(AppBody, props)))));
      };

      var LoadScreen = function LoadScreen(_ref) {
        var children = _ref.children;
        var loadscreenRef = react.useRef();
        var loadScreenUrlsLoaded = useAllUrlLoaded("loadscreen"); // main must wait for loadscreen + request idle callback before starting

        var _React$useState = react.useState(false),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            mainUrlTrackerReady = _React$useState2[0],
            mainUrlTrackerReadySetter = _React$useState2[1];

        var _React$useState3 = react.useState(false),
            _React$useState4 = _slicedToArray(_React$useState3, 2),
            mainUrlsLoaded = _React$useState4[0],
            mainsUrlsLoadedSetter = _React$useState4[1];

        var urlTrackerTotalCount = useUrlTrackerTotalCount();
        var urlTrackerLoadedCount = useUrlTrackerLoadedCount();
        react.useEffect(function () {
          if (!loadScreenUrlsLoaded) {
            return function () {};
          }

          window.splashscreen.remove();
          var callbackRequestId = window.requestIdleCallback(function () {
            mainUrlTrackerReadySetter(true);
          });
          return function () {
            window.cancelIdleCallback(callbackRequestId);
          };
        }, [loadScreenUrlsLoaded]);
        react.useEffect(function () {
          if (mainUrlTrackerReady && urlTrackerLoadedCount === urlTrackerTotalCount) {
            mainsUrlsLoadedSetter(true);
          }
        }, [mainUrlTrackerReady, urlTrackerLoadedCount, urlTrackerTotalCount]);
        react.useEffect(function () {
          if (mainUrlsLoaded && loadscreenRef) {
            var animation = loadscreenRef.current.animate([{
              opacity: 1
            }, {
              opacity: 0
            }], {
              duration: 300,
              fill: "forwards"
            });

            animation.onfinish = function () {
              loadscreenRef.current.style.display = "none";
            };
          }
        }, [loadscreenRef, mainUrlsLoaded]);
        return /*#__PURE__*/react.createElement(react.Fragment, null, loadScreenUrlsLoaded ? children : null, /*#__PURE__*/react.createElement("div", {
          id: "loadscreen",
          ref: loadscreenRef
        }, /*#__PURE__*/react.createElement(Stylesheet, {
          href: loadscreenCssUrl
        }), /*#__PURE__*/react.createElement(Image$1, {
          src: symbolSkullUrl,
          animateLoaded: false
        }), /*#__PURE__*/react.createElement("p", null, "Loading files (", urlTrackerLoadedCount, "/", urlTrackerTotalCount, ")")), mainUrlsLoaded ? /*#__PURE__*/react.createElement(ImagePreloader, null) : null);
      };

      var AppBody = function AppBody(props) {
        var gameCreated = useGameCreated();

        if (gameCreated) {
          return /*#__PURE__*/react.createElement(Game, props);
        }

        return /*#__PURE__*/react.createElement(Home, props);
      };

      var ErrorScreen = function ErrorScreen(_ref2) {
        var error = _ref2.error;
        window.splashscreen.remove();
        return /*#__PURE__*/react.createElement("div", null, "An error occured", /*#__PURE__*/react.createElement("pre", null, _typeof(error) === "object" ? error.stack : error));
      };

      var Main = exports('Main', catchError(MainRaw, ErrorScreen));

    }
  };
});

//# sourceMappingURL=main.component-5cd680e6.js.map