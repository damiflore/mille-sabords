System.register(['./index-00c14db8.js'], function (exports) {
  'use strict';
  var react, _objectSpread, _defineProperty, reactDom, createAction, _toConsumableArray, isTwoSwordsChallengeCard, TWO_SWORDS_CHALLENGE_GAMBLE, isThreeSwordsChallengeCard, THREE_SWORDS_CHALLENGE_GAMBLE, isFourSwordsChallengeCard, FOUR_SWORDS_CHALLENGE_GAMBLE, isAnimalsCard, SYMBOL_PARROT, SYMBOL_MONKEY, isPirateCard, isCoinCard, isDiamondCard, SYMBOL_DIAMOND, SYMBOL_COIN, SYMBOL_SWORD, diceIsOnSkull, symbolIsSkull, useCurrentPlayerId, usePlayers, useRollCount, useDicesRolled, useWitchUncursedDiceId, useDicesCursed, useCurrentCard, isWitchCard, useScoreMarked, isChestCard, diceToVisibleSymbol, isOneSkullCard, SYMBOL_SKULL, isTwoSkullsCard, useChestSlots, mixDeck, useIsOnSkullIsland, isSwordChallengeCard, cardList, _slicedToArray, createLogger, useMainDomNode, useDiceDomNode, useDiceDomNodeSetter, useDragDiceGestureSetter, useRolledAreaDomNode, useDragDiceGesture, useRolledAreaDomNodeSetter, _typeof, useRoundStarted, cardColors, useCardDeck, useMainDomNodeSetter, useGameStarted;
  return {
    setters: [function (module) {
      react = module.r;
      _objectSpread = module._;
      _defineProperty = module.a;
      reactDom = module.b;
      createAction = module.c;
      _toConsumableArray = module.d;
      isTwoSwordsChallengeCard = module.i;
      TWO_SWORDS_CHALLENGE_GAMBLE = module.T;
      isThreeSwordsChallengeCard = module.e;
      THREE_SWORDS_CHALLENGE_GAMBLE = module.f;
      isFourSwordsChallengeCard = module.g;
      FOUR_SWORDS_CHALLENGE_GAMBLE = module.F;
      isAnimalsCard = module.h;
      SYMBOL_PARROT = module.S;
      SYMBOL_MONKEY = module.j;
      isPirateCard = module.k;
      isCoinCard = module.l;
      isDiamondCard = module.m;
      SYMBOL_DIAMOND = module.n;
      SYMBOL_COIN = module.o;
      SYMBOL_SWORD = module.p;
      diceIsOnSkull = module.q;
      symbolIsSkull = module.s;
      useCurrentPlayerId = module.u;
      usePlayers = module.t;
      useRollCount = module.v;
      useDicesRolled = module.w;
      useWitchUncursedDiceId = module.x;
      useDicesCursed = module.y;
      useCurrentCard = module.z;
      isWitchCard = module.A;
      useScoreMarked = module.B;
      isChestCard = module.C;
      diceToVisibleSymbol = module.D;
      isOneSkullCard = module.E;
      SYMBOL_SKULL = module.G;
      isTwoSkullsCard = module.H;
      useChestSlots = module.I;
      mixDeck = module.J;
      useIsOnSkullIsland = module.K;
      isSwordChallengeCard = module.L;
      cardList = module.M;
      _slicedToArray = module.N;
      createLogger = module.O;
      useMainDomNode = module.P;
      useDiceDomNode = module.Q;
      useDiceDomNodeSetter = module.R;
      useDragDiceGestureSetter = module.U;
      useRolledAreaDomNode = module.V;
      useDragDiceGesture = module.W;
      useRolledAreaDomNodeSetter = module.X;
      _typeof = module.Y;
      useRoundStarted = module.Z;
      cardColors = module.$;
      useCardDeck = module.a0;
      useMainDomNodeSetter = module.a1;
      useGameStarted = module.a2;
    }],
    execute: function () {

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

      var createContext = react.createContext,
          useContext = react.useContext,
          useReducer = react.useReducer;
      var watchBooting = function watchBooting(LowerLevelComponent, onBoot) {
        var Booting = function Booting(props) {
          // fake the loading of some ressource to ensure
          // other components had time to register their own asset tracking
          var assetLoadEnds = useAssetTracker("");
          react.useEffect(function () {
            assetLoadEnds();
          }, []);
          var bootAssetTracking = useAssetTracking("");
          var assetsTracking = useAssetsTracking();
          react.useEffect(function () {
            if (!bootAssetTracking) {
              return;
            }

            var allLoaded = Object.keys(assetsTracking).every(function (url) {
              return assetsTracking[url].status === "loaded";
            }); // console.log("ressource tracked", Object.keys(assetsTracking), allLoaded, assetsTracking)

            if (allLoaded) {
              setTimeout(function () {
                // console.info(`all game ressource loaded`, Object.keys(assetsTracking))
                onBoot();
              }, // give bit of time for the browser to render stuff
              50);
            }
          }, [bootAssetTracking, assetsTracking]);
          return /*#__PURE__*/react.createElement(LowerLevelComponent, props);
        };

        var BootingWithAssetTrackingProvider = function BootingWithAssetTrackingProvider() {
          return /*#__PURE__*/react.createElement(AssetsTrackingProvider, null, /*#__PURE__*/react.createElement(Booting, null));
        };

        return BootingWithAssetTrackingProvider;
      };
      var AssetsContext = createContext();

      var assetTrackingReducer = function assetTrackingReducer(state, action) {
        return action(state);
      };

      var assetTrackingInitialState = {};

      var AssetsTrackingProvider = function AssetsTrackingProvider(_ref) {
        var children = _ref.children;
        return /*#__PURE__*/react.createElement(AssetsContext.Provider, {
          value: useReducer(assetTrackingReducer, assetTrackingInitialState)
        }, children);
      };

      var useAssetsTracking = function useAssetsTracking() {
        return useContext(AssetsContext)[0];
      };
      var useAssetTracking = function useAssetTracking(url) {
        return useContext(AssetsContext)[0][url];
      };
      var useAssetTracker = function useAssetTracker(url) {
        var dispatch = useContext(AssetsContext)[1];

        var assetLoadStarts = function assetLoadStarts() {
          dispatch(function (state) {
            if (url in state) {
              // console.log("start loading early return", url, state[url])
              return state;
            } // console.log("start loading", url)


            return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, url, {
              status: "loading"
            }));
          });
        };

        var assetLoadEnds = function assetLoadEnds() {
          dispatch(function (state) {
            if (url in state && state[url].status === "loaded") {
              // console.log("end loading early return", url, state[url])
              return state;
            } // console.log("end loading", url)


            return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, url, {
              status: "loaded"
            }));
          });
        };

        react.useEffect(function () {
          assetLoadStarts();
        }, []);
        return assetLoadEnds;
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
        var stylesheetLoadEnds = useAssetTracker(href);
        return reactDom.createPortal( /*#__PURE__*/react.createElement("link", {
          href: href,
          ref: function ref(node) {
            if (!node) return function () {};
            return addLoadedListener(node, stylesheetLoadEnds);
          },
          rel: "stylesheet",
          type: "text/css"
        }), document.head);
      };

      var Home = function Home() {
        return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement(ButtonNewGame, null));
      };

      var ButtonNewGame = function ButtonNewGame() {
        var startNewGame = useStartNewGame();
        return /*#__PURE__*/react.createElement("button", {
          onClick: startNewGame
        }, "Nouvelle partie");
      };

      var useStartNewGame = createAction(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          gameStarted: true
        });
      });

      var useEffect = react.useEffect,
          useRef = react.useRef; // https://stackoverflow.com/a/61680184/2634179

      var useBecomes = function useBecomes(callback, deps) {
        var mountedRef = useRef(false);
        useEffect(function () {
          if (mountedRef.current === false) {
            mountedRef.current = true;
          }
        });
        var depsRef = useRef(deps);
        useEffect(function () {
          depsRef.current = deps;
        }, deps);
        return mountedRef.current ? Boolean(callback.apply(void 0, _toConsumableArray(depsRef.current))) : false;
      };

      var computeRoundScore = function computeRoundScore(_ref) {
        var card = _ref.card,
            symbolsInChest = _ref.symbolsInChest,
            scoreMarked = _ref.scoreMarked,
            markScoreAllowed = _ref.markScoreAllowed;

        if (isTwoSwordsChallengeCard(card)) {
          if (!scoreMarked && !markScoreAllowed) {
            return -TWO_SWORDS_CHALLENGE_GAMBLE.gambleAmount;
          }

          return computeScoreForSwordChallenge(symbolsInChest, {
            goal: TWO_SWORDS_CHALLENGE_GAMBLE.numberOfSwords,
            gamble: TWO_SWORDS_CHALLENGE_GAMBLE.gambleAmount
          });
        }

        if (isThreeSwordsChallengeCard(card)) {
          if (!scoreMarked && !markScoreAllowed) {
            return -THREE_SWORDS_CHALLENGE_GAMBLE.gambleAmount;
          }

          return computeScoreForSwordChallenge(symbolsInChest, {
            goal: THREE_SWORDS_CHALLENGE_GAMBLE.numberOfSwords,
            gamble: THREE_SWORDS_CHALLENGE_GAMBLE.gambleAmount
          });
        }

        if (isFourSwordsChallengeCard(card)) {
          if (!scoreMarked && !markScoreAllowed) {
            return -FOUR_SWORDS_CHALLENGE_GAMBLE.gambleAmount;
          }

          return computeScoreForSwordChallenge(symbolsInChest, {
            goal: FOUR_SWORDS_CHALLENGE_GAMBLE.numberOfSwords,
            gamble: FOUR_SWORDS_CHALLENGE_GAMBLE.gambleAmount
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
      var useCurrentPlayer = function useCurrentPlayer() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$currentPlayerId = _ref.currentPlayerId,
            currentPlayerId = _ref$currentPlayerId === void 0 ? useCurrentPlayerId() : _ref$currentPlayerId,
            _ref$players = _ref.players,
            players = _ref$players === void 0 ? usePlayers() : _ref$players;

        return players.find(function (playerCandidate) {
          return playerCandidate.id === currentPlayerId;
        });
      };
      var useHasNeverRolled = function useHasNeverRolled() {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref3$rollCount = _ref3.rollCount,
            rollCount = _ref3$rollCount === void 0 ? useRollCount() : _ref3$rollCount;

        return rollCount === 0;
      };
      var useHasRolledOnce = function useHasRolledOnce() {
        var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref4$rollCount = _ref4.rollCount,
            rollCount = _ref4$rollCount === void 0 ? useRollCount() : _ref4$rollCount;

        return rollCount > 0;
      };
      var useIsFirstRoll = function useIsFirstRoll() {
        var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref5$rollCount = _ref5.rollCount,
            rollCount = _ref5$rollCount === void 0 ? useRollCount() : _ref5$rollCount;

        return rollCount === 1;
      };
      var useHasRolledMoreThanOnce = function useHasRolledMoreThanOnce() {
        var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref6$rollCount = _ref6.rollCount,
            rollCount = _ref6$rollCount === void 0 ? useRollCount() : _ref6$rollCount;

        return rollCount > 1;
      };
      var useSymbolsFromCard = function useSymbolsFromCard() {
        var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref7$currentCard = _ref7.currentCard,
            currentCard = _ref7$currentCard === void 0 ? useCurrentCard() : _ref7$currentCard;

        if (isCoinCard(currentCard)) return [SYMBOL_COIN];
        if (isDiamondCard(currentCard)) return [SYMBOL_DIAMOND];
        if (isOneSkullCard(currentCard)) return [SYMBOL_SKULL];
        if (isTwoSkullsCard(currentCard)) return [SYMBOL_SKULL, SYMBOL_SKULL];
        return [];
      };
      var useSymbolsInChest = function useSymbolsInChest() {
        var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref8$chestSlots = _ref8.chestSlots,
            chestSlots = _ref8$chestSlots === void 0 ? useChestSlots() : _ref8$chestSlots;

        return Object.keys(chestSlots).filter(function (chestSlot) {
          return chestSlots[chestSlot];
        }).map(function (chestSlot) {
          var chestSlotContent = chestSlots[chestSlot];

          if (chestSlotContent.type === "symbol") {
            return chestSlotContent.value;
          }

          return diceToVisibleSymbol(chestSlotContent.value);
        });
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
        var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref11$dicesRolled = _ref11.dicesRolled,
            dicesRolled = _ref11$dicesRolled === void 0 ? useDicesRolled() : _ref11$dicesRolled,
            _ref11$witchUncursedD = _ref11.witchUncursedDiceId,
            witchUncursedDiceId = _ref11$witchUncursedD === void 0 ? useWitchUncursedDiceId() : _ref11$witchUncursedD,
            _ref11$remainingSpotI = _ref11.remainingSpotInCursedArea,
            remainingSpotInCursedArea = _ref11$remainingSpotI === void 0 ? useRemainingSpotInCursedArea() : _ref11$remainingSpotI;

        return dicesRolled.filter(function (dice) {
          return diceIsOnSkull(dice) && dice.id !== witchUncursedDiceId;
        }).slice(0, remainingSpotInCursedArea);
      };
      var useRollDiceAllowed = function useRollDiceAllowed() {
        var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref12$currentCard = _ref12.currentCard,
            currentCard = _ref12$currentCard === void 0 ? useCurrentCard() : _ref12$currentCard,
            _ref12$hasNeverRolled = _ref12.hasNeverRolled,
            hasNeverRolled = _ref12$hasNeverRolled === void 0 ? useHasNeverRolled() : _ref12$hasNeverRolled,
            _ref12$dicesRolled = _ref12.dicesRolled,
            dicesRolled = _ref12$dicesRolled === void 0 ? useDicesRolled() : _ref12$dicesRolled,
            _ref12$scoreMarked = _ref12.scoreMarked,
            scoreMarked = _ref12$scoreMarked === void 0 ? useScoreMarked() : _ref12$scoreMarked,
            _ref12$threeSkullsOrM = _ref12.threeSkullsOrMoreInCursedArea,
            threeSkullsOrMoreInCursedArea = _ref12$threeSkullsOrM === void 0 ? useThreeSkullsOrMoreInCursedArea() : _ref12$threeSkullsOrM,
            _ref12$hasDicesToCurs = _ref12.hasDicesToCurse,
            hasDicesToCurse = _ref12$hasDicesToCurs === void 0 ? useHasDicesToCurse() : _ref12$hasDicesToCurs;

        if (!currentCard) {
          return false;
        }

        if (scoreMarked) {
          return false;
        }

        if (hasNeverRolled) {
          return true;
        }

        if (threeSkullsOrMoreInCursedArea) {
          return false;
        }

        if (hasDicesToCurse) {
          return false;
        }

        if (dicesRolled.length < 2) {
          return false;
        }

        return true;
      };
      var useThreeSkullsOrMoreInCursedArea = function useThreeSkullsOrMoreInCursedArea() {
        var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref13$skullCountInCu = _ref13.skullCountInCursedArea,
            skullCountInCursedArea = _ref13$skullCountInCu === void 0 ? useSkullCountInCursedArea() : _ref13$skullCountInCu;

        return skullCountInCursedArea > 2;
      };
      var useSkullCountInCursedArea = function useSkullCountInCursedArea() {
        var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref14$dicesCursed = _ref14.dicesCursed,
            dicesCursed = _ref14$dicesCursed === void 0 ? useDicesCursed() : _ref14$dicesCursed,
            _ref14$symbolsFromCar = _ref14.symbolsFromCard,
            symbolsFromCard = _ref14$symbolsFromCar === void 0 ? useSymbolsFromCard() : _ref14$symbolsFromCar;

        return dicesCursed.length + symbolsFromCard.filter(function (symbol) {
          return symbolIsSkull(symbol);
        }).length;
      };
      var useRemoveSkullAllowed = function useRemoveSkullAllowed() {
        var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref15$witchUncursedD = _ref15.witchUncursedDiceId,
            witchUncursedDiceId = _ref15$witchUncursedD === void 0 ? useWitchUncursedDiceId() : _ref15$witchUncursedD,
            _ref15$currentCard = _ref15.currentCard,
            currentCard = _ref15$currentCard === void 0 ? useCurrentCard() : _ref15$currentCard,
            _ref15$threeSkullsOrM = _ref15.threeSkullsOrMoreInCursedArea,
            threeSkullsOrMoreInCursedArea = _ref15$threeSkullsOrM === void 0 ? useThreeSkullsOrMoreInCursedArea() : _ref15$threeSkullsOrM;

        if (!isWitchCard(currentCard)) {
          return false;
        }

        if (threeSkullsOrMoreInCursedArea) {
          return false;
        }

        if (witchUncursedDiceId) {
          return false;
        }

        return true;
      };
      var useKeepDiceAllowed = function useKeepDiceAllowed() {
        var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref16$scoreMarked = _ref16.scoreMarked,
            scoreMarked = _ref16$scoreMarked === void 0 ? useScoreMarked() : _ref16$scoreMarked,
            _ref16$threeSkullsOrM = _ref16.threeSkullsOrMoreInCursedArea,
            threeSkullsOrMoreInCursedArea = _ref16$threeSkullsOrM === void 0 ? useThreeSkullsOrMoreInCursedArea() : _ref16$threeSkullsOrM;

        if (scoreMarked) {
          return false;
        }

        if (threeSkullsOrMoreInCursedArea) {
          return false;
        }

        return true;
      };
      var useUnkeepDiceAllowed = function useUnkeepDiceAllowed() {
        var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref17$scoreMarked = _ref17.scoreMarked,
            scoreMarked = _ref17$scoreMarked === void 0 ? useScoreMarked() : _ref17$scoreMarked,
            _ref17$threeSkullsOrM = _ref17.threeSkullsOrMoreInCursedArea,
            threeSkullsOrMoreInCursedArea = _ref17$threeSkullsOrM === void 0 ? useThreeSkullsOrMoreInCursedArea() : _ref17$threeSkullsOrM;

        if (scoreMarked) {
          return false;
        }

        if (threeSkullsOrMoreInCursedArea) {
          return false;
        }

        return true;
      };
      var useMarkScoreButtonVisible = function useMarkScoreButtonVisible() {
        var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref18$hasRolledOnce = _ref18.hasRolledOnce,
            hasRolledOnce = _ref18$hasRolledOnce === void 0 ? useHasRolledOnce() : _ref18$hasRolledOnce,
            _ref18$scoreMarked = _ref18.scoreMarked,
            scoreMarked = _ref18$scoreMarked === void 0 ? useScoreMarked() : _ref18$scoreMarked,
            _ref18$currentCard = _ref18.currentCard,
            currentCard = _ref18$currentCard === void 0 ? useCurrentCard() : _ref18$currentCard,
            _ref18$hasDicesToCurs = _ref18.hasDicesToCurse,
            hasDicesToCurse = _ref18$hasDicesToCurs === void 0 ? useHasDicesToCurse() : _ref18$hasDicesToCurs;

        if (scoreMarked) {
          return false;
        }

        if (hasDicesToCurse) {
          return false;
        }

        if (!currentCard) {
          return false;
        }

        if (!hasRolledOnce) {
          return false;
        }

        return true;
      };
      var useMarkScoreAllowed = function useMarkScoreAllowed() {
        var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref19$hasRolledMoreT = _ref19.hasRolledMoreThanOnce,
            hasRolledMoreThanOnce = _ref19$hasRolledMoreT === void 0 ? useHasRolledMoreThanOnce() : _ref19$hasRolledMoreT,
            _ref19$scoreMarked = _ref19.scoreMarked,
            scoreMarked = _ref19$scoreMarked === void 0 ? useScoreMarked() : _ref19$scoreMarked,
            _ref19$currentCard = _ref19.currentCard,
            currentCard = _ref19$currentCard === void 0 ? useCurrentCard() : _ref19$currentCard,
            _ref19$threeSkullsOrM = _ref19.threeSkullsOrMoreInCursedArea,
            threeSkullsOrMoreInCursedArea = _ref19$threeSkullsOrM === void 0 ? useThreeSkullsOrMoreInCursedArea() : _ref19$threeSkullsOrM,
            _ref19$hasDicesToCurs = _ref19.hasDicesToCurse,
            hasDicesToCurse = _ref19$hasDicesToCurs === void 0 ? useHasDicesToCurse() : _ref19$hasDicesToCurs;

        if (scoreMarked) {
          return false;
        }

        if (threeSkullsOrMoreInCursedArea) {
          if (isChestCard(currentCard) && hasRolledMoreThanOnce) {
            return true;
          }

          return false;
        }

        if (hasDicesToCurse) {
          return false;
        }

        if (!currentCard) {
          return false;
        }

        return true;
      };
      var useStartNextRoundAllowed = function useStartNextRoundAllowed() {
        var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref20$rollDiceAllowe = _ref20.rollDiceAllowed,
            rollDiceAllowed = _ref20$rollDiceAllowe === void 0 ? useRollDiceAllowed() : _ref20$rollDiceAllowe,
            _ref20$markScoreAllow = _ref20.markScoreAllowed,
            markScoreAllowed = _ref20$markScoreAllow === void 0 ? useMarkScoreAllowed() : _ref20$markScoreAllow,
            _ref20$hasDicesToCurs = _ref20.hasDicesToCurse,
            hasDicesToCurse = _ref20$hasDicesToCurs === void 0 ? useHasDicesToCurse() : _ref20$hasDicesToCurs;

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
        var _ref21 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref21$currentCard = _ref21.currentCard,
            currentCard = _ref21$currentCard === void 0 ? useCurrentCard() : _ref21$currentCard,
            _ref21$symbolsInChest = _ref21.symbolsInChest,
            symbolsInChest = _ref21$symbolsInChest === void 0 ? useSymbolsInChest() : _ref21$symbolsInChest,
            _ref21$scoreMarked = _ref21.scoreMarked,
            scoreMarked = _ref21$scoreMarked === void 0 ? useScoreMarked() : _ref21$scoreMarked,
            _ref21$markScoreAllow = _ref21.markScoreAllowed,
            markScoreAllowed = _ref21$markScoreAllow === void 0 ? useMarkScoreAllowed() : _ref21$markScoreAllow;

        return useMemo(function () {
          return computeRoundScore({
            card: currentCard,
            symbolsInChest: symbolsInChest,
            scoreMarked: scoreMarked,
            markScoreAllowed: markScoreAllowed
          });
        }, [currentCard, symbolsInChest, scoreMarked, markScoreAllowed]);
      };

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
      var useSendToSkullIsland = createAction(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          isOnSkullIsland: true
        });
      });
      var useStartRound = createAction(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          roundStarted: true
        });
      });

      var useCurseDice = createAction(function (state, dice) {
        var dicesRolled = state.dicesRolled,
            dicesCursed = state.dicesCursed;
        return _objectSpread(_objectSpread({}, state), {}, {
          dicesRolled: dicesRolled.filter(function (diceRolled) {
            return diceRolled.id !== dice.id;
          }),
          dicesCursed: [].concat(_toConsumableArray(dicesCursed), [dice])
        });
      });
      var useUncurseDice = createAction(function (state, dice) {
        var dicesRolled = state.dicesRolled,
            dicesCursed = state.dicesCursed;
        return _objectSpread(_objectSpread({}, state), {}, {
          witchUncursedDiceId: dice.id,
          dicesRolled: [].concat(_toConsumableArray(dicesRolled), [dice]),
          dicesCursed: dicesCursed.filter(function (diceCursed) {
            return diceCursed.id !== dice.id;
          })
        });
      });
      var useUnkeepDice = createAction(function (state, dice, rolledAreaPosition) {
        var dicesRolled = state.dicesRolled,
            chestSlots = state.chestSlots;
        dice.rolledAreaPosition = rolledAreaPosition;
        return _objectSpread(_objectSpread({}, state), {}, {
          dicesRolled: [].concat(_toConsumableArray(dicesRolled), [dice]),
          chestSlots: _objectSpread(_objectSpread({}, chestSlots), {}, _defineProperty({}, dice.chestSlot, null))
        });
      });
      var useKeepDice = createAction(function (state, dice, chestSlot) {
        var dicesRolled = state.dicesRolled,
            chestSlots = state.chestSlots;
        dice.chestSlot = chestSlot;
        return _objectSpread(_objectSpread({}, state), {}, {
          dicesRolled: dicesRolled.filter(function (diceRolled) {
            return diceRolled.id !== dice.id;
          }),
          chestSlots: _objectSpread(_objectSpread({}, chestSlots), {}, _defineProperty({}, chestSlot, {
            type: "dice",
            value: dice
          }))
        });
      });

      var useDrawCard = createAction(function (state) {
        var cardDeck = state.cardDeck,
            cardsUsed = state.cardsUsed;
        var cardDrawn = cardDeck[0];
        return _objectSpread(_objectSpread({}, state), {}, {
          cardDeck: cardDeck.slice(1),
          cardsUsed: [].concat(_toConsumableArray(cardsUsed), [cardDrawn]),
          currentCard: cardDrawn
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
        var cardsUsed = state.cardsUsed;
        return _objectSpread(_objectSpread({}, state), {}, {
          cardsUsed: [],
          cardDeck: mixDeck(cardsUsed)
        });
      });

      var useEffect$1 = react.useEffect;
      var GameEffects = function GameEffects() {
        useGameEffects();
        return null;
      };
      var useGameEffects = function useGameEffects() {
        useCurseDiceEffect();
        useFailSwordChallengeEffect();
        useFourSkullsOrMoreOnFirstRollEffect();
        useCoinCardEffect();
        useDiamondCardEffect();
      };

      var useCurseDiceEffect = function useCurseDiceEffect() {
        var dicesToCurse = useDicesToCurse();
        var curseDice = useCurseDice();
        useEffect$1(function () {
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
        var currentCard = useCurrentCard();
        var scoreMarked = useScoreMarked();
        var markScore = useMarkScore();
        var threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea();
        var threeSkullsOrMoreInCursedAreaBecomesTrue = useBecomes(function (threeSkullsOrMoreInCursedAreaPrevious) {
          return !threeSkullsOrMoreInCursedAreaPrevious && threeSkullsOrMoreInCursedArea;
        }, [threeSkullsOrMoreInCursedArea]);
        var roundScore = useRoundScore();
        var swordChallengeCard = isSwordChallengeCard(currentCard);
        useEffect$1(function () {
          if (swordChallengeCard && !scoreMarked && threeSkullsOrMoreInCursedAreaBecomesTrue) {
            markScore(roundScore);
          }
        }, [swordChallengeCard, scoreMarked, threeSkullsOrMoreInCursedAreaBecomesTrue, roundScore]);
      }; // go to skull island if 4 skulls or more on first roll


      var useFourSkullsOrMoreOnFirstRollEffect = function useFourSkullsOrMoreOnFirstRollEffect() {
        var isFirstRoll = useIsFirstRoll();
        var currentCard = useCurrentCard();
        var isOnSkullIsland = useIsOnSkullIsland();
        var skullCountInCursedArea = useSkullCountInCursedArea();
        var sendToSkullIsland = useSendToSkullIsland();
        useEffect$1(function () {
          if (!isFirstRoll) return;
          if (isOnSkullIsland) return;
          if (isSwordChallengeCard(currentCard)) return;
          if (skullCountInCursedArea < 4) return;
          sendToSkullIsland();
        }, [isFirstRoll, isOnSkullIsland, currentCard, skullCountInCursedArea]);
      };

      var useCoinCardEffect = function useCoinCardEffect() {
        var addExtraCoin = useAddExtraCoin();
        var currentCard = useCurrentCard();
        var drawCoinCard = useBecomes(function (currentCardPrevious) {
          return !isCoinCard(currentCardPrevious) && isCoinCard(currentCard);
        }, [currentCard]);
        useEffect$1(function () {
          if (drawCoinCard) {
            addExtraCoin();
          }
        }, [drawCoinCard]);
      };

      var useDiamondCardEffect = function useDiamondCardEffect() {
        var addExtraDiamond = useAddExtraDiamond();
        var currentCard = useCurrentCard();
        var drawDiamondCard = useBecomes(function (currentCardPrevious) {
          return !isDiamondCard(currentCardPrevious) && isDiamondCard(currentCard);
        }, [currentCard]);
        useEffect$1(function () {
          if (drawDiamondCard) {
            addExtraDiamond();
          }
        }, [drawDiamondCard]);
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

      var Image = function Image(_ref) {
        var ref = _ref.ref,
            src = _ref.src,
            props = _objectWithoutProperties(_ref, ["ref", "src"]);

        var imageLoadEnds = useAssetTracker(src);

        var nodeRef = function nodeRef(domNode) {
          if (!domNode) return function () {};

          if (domNode.complete) {
            imageLoadEnds();
            return function () {};
          }

          return addLoadedListener(domNode, imageLoadEnds);
        };

        if (ref) {
          var oldRef = ref;

          ref = function ref(node) {
            oldRef(node);
            nodeRef(node);
          };
        } else {
          ref = nodeRef;
        }

        return /*#__PURE__*/react.createElement("img", _extends({}, props, {
          src: src,
          ref: ref
        }));
      };

      var PreloadImages = function PreloadImages() {
        var images = ["/src/wood.jpg", "/src/chest/pirate-hook.png", "/src/chest/pirate-hook-02.png", "/src/chest/wood-box.jpg", "/src/dice-ongoing/treasure-map.png", "/src/skull-island/witch-label.png", "/src/skull-island/skull-bottle.png", "/src/cards/card_default.png"].concat(_toConsumableArray(cardList.map(function (card) {
          return "/src/cards/card_".concat(card, ".png");
        })));
        return /*#__PURE__*/react.createElement("div", {
          style: {
            display: "none"
          }
        }, images.map(function (src) {
          return /*#__PURE__*/react.createElement(Image, {
            key: src,
            src: src
          });
        }));
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
      var findClosestRectangle = function findClosestRectangle(rectangle, rectangleCandidates) {
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

      var diceSize = 50;

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
            _ref$onRelease = _ref.onRelease,
            onRelease = _ref$onRelease === void 0 ? function () {} : _ref$onRelease,
            _ref$onDrag = _ref.onDrag,
            onDrag = _ref$onDrag === void 0 ? function () {} : _ref$onDrag,
            _ref$onCancel = _ref.onCancel,
            onCancel = _ref$onCancel === void 0 ? function () {} : _ref$onCancel;
        var logger = createLogger({
          logLevel: logLevel
        });
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
        var pointerPositionPrevious;
        var domNodeStartPosition;
        var gripPointerPosition;
        var longGripTimeout;

        var handleGrip = function handleGrip(pointerPosition, event) {
          logger.debug("gripping node at", pointerPosition);
          pendingGesture = true; // gripTimestamp = Date.now()

          gripPointerPosition = pointerPosition;
          pointerPositionPrevious = pointerPosition;
          domNodeStartPosition = domNodeToPagePosition(domNode);
          onGrip({
            x: domNodeStartPosition.x,
            y: domNodeStartPosition.y,
            event: event
          });
          longGripTimeout = setTimeout(handleLongGrip, 300);
        };

        var handleLongGrip = function handleLongGrip() {
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
          logger.debug("move node at", movePosition);
          onDrag(_objectSpread(_objectSpread({
            event: event
          }, movePosition), {}, {
            relativeX: pointerPosition.x - gripPointerPosition.x,
            relativeY: pointerPosition.y - gripPointerPosition.y
          }));
        };

        var handleRelease = function handleRelease(pointerPosition, event) {
          logger.debug("releasing node");
          pendingGesture = false;
          var gripHorizontalShift = gripPointerPosition.x - domNodeStartPosition.x;
          var gripVerticalShit = gripPointerPosition.y - domNodeStartPosition.y;
          clearTimeout(longGripTimeout);
          onRelease({
            event: event,
            x: pointerPositionPrevious.x - gripHorizontalShift,
            y: pointerPositionPrevious.y - gripVerticalShit
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
          removeMousedownListener();
          removeTouchstartListener();
          removeMoveListener();
          removeReleaseListener();
          clearTimeout(longGripTimeout);
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

      var useEffect$2 = react.useEffect,
          useState = react.useState;
      var Dice = function Dice(_ref) {
        var dice = _ref.dice,
            clickAllowed = _ref.clickAllowed,
            disabled = _ref.disabled,
            draggable = _ref.draggable,
            onClickAction = _ref.onClickAction,
            specificStyle = _ref.specificStyle,
            diceOnGoing = _ref.diceOnGoing;
        var onSkull = diceIsOnSkull(dice);
        var mainDomNode = useMainDomNode();
        var diceDomNode = useDiceDomNode(dice.id);
        var diceDomNodeSetter = useDiceDomNodeSetter(dice.id);
        var witchUncursedDiceId = useWitchUncursedDiceId();

        var _useState = useState(false),
            _useState2 = _slicedToArray(_useState, 2),
            dragIntent = _useState2[0],
            setDragIntent = _useState2[1];

        var _useState3 = useState(null),
            _useState4 = _slicedToArray(_useState3, 2),
            dragGesture = _useState4[0],
            setDragGesture = _useState4[1];

        var setDragDiceGesture = useDragDiceGestureSetter();

        var skullDiceClass = function skullDiceClass(dice) {
          if (dice.id === witchUncursedDiceId) return "dice";
          return diceOnGoing ? "dice dice-cursed-disapear" : "dice dice-cursed-appear";
        };

        useEffect$2(function () {
          if (!draggable || !diceDomNode || !mainDomNode) {
            return function () {};
          }

          var dragIntentTimeout;
          var dropHandlerMap = new Map();
          var disableDragGesture = enableDragGesture(diceDomNode, {
            onGrip: function onGrip() {// nothing yet
            },
            onLongGrip: function onLongGrip() {
              setDragIntent(true);
            },
            onDrag: function onDrag(_ref2) {
              var x = _ref2.x,
                  y = _ref2.y,
                  relativeX = _ref2.relativeX,
                  relativeY = _ref2.relativeY;

              if (Math.abs(relativeX) > 5 || Math.abs(relativeY) > 5) {
                setDragIntent(true);
              }

              var diceDesiredRect = {
                left: x,
                right: x + diceSize,
                top: y,
                bottom: y + diceSize
              };
              var mainDomNodeRect = getDomNodeRectangle(mainDomNode);
              var diceRectangle = rectangleInsideOf(diceDesiredRect, mainDomNodeRect);
              setDragGesture({
                x: diceRectangle.left,
                y: diceRectangle.top
              });
              setDragDiceGesture({
                dice: dice,
                diceRectangle: diceRectangle,
                setDropHandler: function setDropHandler(domNode, dropHandler) {
                  dropHandlerMap.set(domNode, dropHandler);
                }
              });
            },
            onRelease: function onRelease(_ref3) {
              var x = _ref3.x,
                  y = _ref3.y;
              // setTimeout is to ensure the click cannot happen just after mouseup
              dragIntentTimeout = setTimeout(function () {
                return setDragIntent(false);
              });
              setDragGesture(null);
              setDragDiceGesture(null);
              var diceRectangle = {
                left: x,
                right: x + diceSize,
                top: y,
                bottom: y + diceSize
              };
              dropHandlerMap.forEach(function (dropHandler) {
                return dropHandler({
                  diceRectangle: diceRectangle
                });
              });
            },
            onCancel: function onCancel() {
              setDragIntent(false);
              setDragGesture(null);
              setDragDiceGesture(null);
            }
          });
          return function () {
            disableDragGesture();
            clearTimeout(dragIntentTimeout);
          };
        }, [draggable, diceDomNode, mainDomNode]);
        return /*#__PURE__*/react.createElement("button", {
          disabled: disabled,
          "data-dice-id": dice.id,
          ref: diceDomNodeSetter,
          onClick: onClickAction && clickAllowed && !dragIntent ? function () {
            return onClickAction(dice);
          } : undefined,
          className: onSkull ? skullDiceClass(dice) : "dice",
          style: _objectSpread(_objectSpread({
            width: diceSize,
            height: diceSize,
            background: onSkull ? "black" : "#fcfcfc",
            color: onSkull ? "black" : "#fcfcfc",
            borderColor: onSkull ? "black" : "#b9b9b9"
          }, specificStyle), dragGesture ? {
            position: "fixed",
            zIndex: 1000,
            transform: "none",
            left: dragGesture.x,
            top: dragGesture.y
          } : {})
        }, /*#__PURE__*/react.createElement("img", {
          src: "/src/dices/dice_".concat(diceToVisibleSymbol(dice), ".png"),
          draggable: "false",
          style: {
            width: "100%",
            height: "100%"
          }
        }));
      };

      var useState$1 = react.useState,
          useEffect$3 = react.useEffect;
      var DiceOnGoing = function DiceOnGoing() {
        var dicesRolled = useDicesRolled();
        var keepDiceAllowed = useKeepDiceAllowed();
        var keepDice = useKeepDice();
        var rolledAreaDomNode = useRolledAreaDomNode();
        var dragDiceGesture = useDragDiceGesture();

        var _useState = useState$1(false),
            _useState2 = _slicedToArray(_useState, 2),
            diceDraggedOver = _useState2[0],
            diceDraggedOverSetter = _useState2[1];

        useEffect$3(function () {
          diceDraggedOverSetter(diceDraggedOverGetter({
            dragDiceGesture: dragDiceGesture,
            rolledAreaDomNode: rolledAreaDomNode
          }));
        }, [dragDiceGesture, rolledAreaDomNode]);
        var chestSlots = useChestSlots();
        var hoveredByKeptDice = diceDraggedOver && Object.keys(chestSlots).some(function (key) {
          return chestSlots[key] && chestSlots[key].value === diceDraggedOver;
        });
        var hoveredByRolledDice = diceDraggedOver && dicesRolled.includes(diceDraggedOver);
        var unkeepDice = useUnkeepDice();
        var repositionDiceInRolledArea = useRepositionDiceInRolledArea();
        useEffect$3(function () {
          if (dragDiceGesture) {
            dragDiceGesture.setDropHandler(rolledAreaDomNode, function (_ref) {
              var diceRectangle = _ref.diceRectangle;
              if (!hoveredByKeptDice && !hoveredByRolledDice) return;
              var rolledAreaDomNodeRectangle = getDomNodeRectangle(rolledAreaDomNode);
              var diceRectangleRelative = rectangleRelativeTo(rectangleInsideOf(diceRectangle, rolledAreaDomNodeRectangle), rolledAreaDomNodeRectangle);

              if (hoveredByKeptDice) {
                unkeepDice(diceDraggedOver, {
                  x: diceRectangleRelative.left,
                  y: diceRectangleRelative.top
                });
              } else {
                repositionDiceInRolledArea(diceDraggedOver, {
                  x: diceRectangleRelative.left,
                  y: diceRectangleRelative.top
                });
              }
            });
          }
        }, [dragDiceGesture, rolledAreaDomNode]);
        return /*#__PURE__*/react.createElement("div", {
          className: "dice-ongoing"
        }, /*#__PURE__*/react.createElement("div", {
          className: "map"
        }), /*#__PURE__*/react.createElement("div", {
          className: "area",
          ref: useRolledAreaDomNodeSetter(),
          style: _objectSpread({}, hoveredByKeptDice ? {
            outline: "2px dotted"
          } : {})
        }, dicesRolled.map(function (dice) {
          return /*#__PURE__*/react.createElement(Dice, {
            key: dice.id,
            dice: dice,
            clickAllowed: diceIsOnSkull(dice) ? false : keepDiceAllowed,
            onClickAction: function onClickAction(dice) {
              var freeSlot = Object.keys(chestSlots).find(function (key) {
                return !chestSlots[key];
              });
              keepDice(dice, freeSlot);
            },
            draggable: true,
            diceOnGoing: true,
            specificStyle: {
              left: "".concat(dice.rolledAreaPosition.x, "px"),
              top: "".concat(dice.rolledAreaPosition.y, "px"),
              transform: "rotate(".concat(dice.rotation, "deg)"),
              position: "absolute"
            }
          });
        })));
      };

      var diceDraggedOverGetter = function diceDraggedOverGetter(_ref2) {
        var dragDiceGesture = _ref2.dragDiceGesture,
            rolledAreaDomNode = _ref2.rolledAreaDomNode;

        if (!dragDiceGesture) {
          return null;
        }

        var rolledAreaDomNodeRectangle = getDomNodeRectangle(rolledAreaDomNode);

        if (!rectangleCollidesWithRectangle(dragDiceGesture.diceRectangle, rolledAreaDomNodeRectangle)) {
          return null;
        }

        return dragDiceGesture.dice;
      };

      var useRepositionDiceInRolledArea = createAction(function (state, dice, position) {
        var dicesRolled = state.dicesRolled;
        dice.rotation = 0;
        dice.rolledAreaPosition = position;
        return _objectSpread(_objectSpread({}, state), {}, {
          dicesRolled: _toConsumableArray(dicesRolled)
        });
      });

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

      var useEffect$4 = react.useEffect;
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


        useEffect$4(function () {
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

        useEffect$4(function () {
          if (!isOpen || !isInsideDocument) return function () {};
          return trapScrollInside(dialogElement);
        }, [isOpen, isInsideDocument]); // trap focus inside dialog

        useEffect$4(function () {
          if (!isOpen || !isInsideDocument || !trapFocus) return function () {};
          return trapFocusInside(dialogElement);
        }, [isOpen, isInsideDocument, trapFocus]); // steal focus to move it into dialog when it opens

        useEffect$4(function () {
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

        useEffect$4(function () {
          if (!isOpen || !isInsideDocument) return function () {};
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
        }, [isOpen, isInsideDocument]);
        if (closeMethod === "dom-remove" && !isOpen) return null;
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

        useEffect$4(function () {
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

      var Dialog = function Dialog(props) {
        return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(Stylesheet, {
          href: "/src/dialog/dialog.css"
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

      var useSwordQuantityRequired = function useSwordQuantityRequired() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$currentCard = _ref.currentCard,
            currentCard = _ref$currentCard === void 0 ? useCurrentCard() : _ref$currentCard;

        if (isTwoSwordsChallengeCard(currentCard)) return TWO_SWORDS_CHALLENGE_GAMBLE.numberOfSwords;
        if (isThreeSwordsChallengeCard(currentCard)) return THREE_SWORDS_CHALLENGE_GAMBLE.numberOfSwords;
        if (isFourSwordsChallengeCard(currentCard)) return FOUR_SWORDS_CHALLENGE_GAMBLE.numberOfSwords;
        return null;
      };
      var SwordChallengeIndicator = function SwordChallengeIndicator() {
        var currentCard = useCurrentCard();
        var symbolsInChest = useSymbolsInChest();
        var quantityRequired = useSwordQuantityRequired();

        if (!currentCard || !isSwordChallengeCard(currentCard)) {
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
        }, /*#__PURE__*/react.createElement("img", {
          src: "/src/dices/dice_sword.png"
        }));
      };

      var SwordIconDisabled = function SwordIconDisabled() {
        return /*#__PURE__*/react.createElement("div", {
          className: "sword-icon disabled"
        }, /*#__PURE__*/react.createElement("img", {
          src: "/src/header/swords-disabled.png"
        }));
      };

      var useState$2 = react.useState,
          useEffect$5 = react.useEffect;

      var swordChallengeOngoing = function swordChallengeOngoing() {
        var currentCard = useCurrentCard();
        var symbolsInChest = useSymbolsInChest();
        var quantityKept = countSymbol(symbolsInChest, SYMBOL_SWORD);
        var quantityRequired = useSwordQuantityRequired();
        if (!isSwordChallengeCard(currentCard)) return false;
        var challengeWon = quantityKept >= quantityRequired;
        return !challengeWon;
      };

      var RoundScore = function RoundScore() {
        var currentCard = useCurrentCard();
        return /*#__PURE__*/react.createElement("div", {
          className: "score-area ".concat(swordChallengeOngoing() ? "animated" : "")
        }, currentCard ? /*#__PURE__*/react.createElement(ScoreDisplay, null) : null);
      };

      var ScoreDisplay = function ScoreDisplay() {
        var roundScore = useRoundScore();
        var currentCard = useCurrentCard();

        var _useState = useState$2(false),
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


        return /*#__PURE__*/react.createElement(react.Fragment, null, isPirateCard(currentCard) ? /*#__PURE__*/react.createElement(DoubleScoreIndicator, null) : null, /*#__PURE__*/react.createElement("div", {
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
        var roundStarted = useRoundStarted();
        if (roundStarted) return /*#__PURE__*/react.createElement("div", {
          className: "pirate-hook"
        });
        return /*#__PURE__*/react.createElement("div", {
          style: {
            display: "none"
          },
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

        var _useState3 = useState$2(false),
            _useState4 = _slicedToArray(_useState3, 2),
            swordSliceAnimation = _useState4[0],
            swordSliceAnimationSetter = _useState4[1];

        useEffect$5(function () {
          if (swordNumberIncreased) {
            swordSliceAnimationSetter(true);
          }
        }, [swordNumberIncreased]);
        useEffect$5(function () {
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
        }, "Symbol"), /*#__PURE__*/react.createElement("img", {
          src: "/src/dices/dice_coin.png"
        }), /*#__PURE__*/react.createElement("img", {
          src: "/src/dices/dice_diamond.png"
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

      var useState$3 = react.useState,
          useEffect$6 = react.useEffect;
      var Chest = function Chest() {
        var chestSlots = useChestSlots();

        var _useState = useState$3(null),
            _useState2 = _slicedToArray(_useState, 2),
            chestDropAreaDomNode = _useState2[0],
            chestDropAreaDomNodeSetter = _useState2[1];

        var dragDiceGesture = useDragDiceGesture();

        var _useState3 = useState$3(false),
            _useState4 = _slicedToArray(_useState3, 2),
            diceDraggedOver = _useState4[0],
            diceDraggedOverSetter = _useState4[1];

        useEffect$6(function () {
          diceDraggedOverSetter(diceDraggedOverGetter$1({
            dragDiceGesture: dragDiceGesture,
            chestDropAreaDomNode: chestDropAreaDomNode
          }));
        }, [dragDiceGesture, chestDropAreaDomNode]);
        var dicesRolled = useDicesRolled();
        var hoveredByRolledDice = diceDraggedOver && dicesRolled.includes(diceDraggedOver);
        var hoveredByKeptDice = diceDraggedOver && Object.keys(chestSlots).some(function (key) {
          return chestSlots[key] && chestSlots[key].value === diceDraggedOver;
        });
        var keepDice = useKeepDice();
        var repositionDiceInChest = useRepositionDiceInChest();
        useEffect$6(function () {
          if (dragDiceGesture) {
            dragDiceGesture.setDropHandler(chestDropAreaDomNode, function (_ref) {
              var diceRectangle = _ref.diceRectangle;
              if (threeSkullsOrMoreInCursedArea) return;
              if (!hoveredByRolledDice && !hoveredByKeptDice) return;
              var rectangleToChestSlotMap = new Map();
              var rectangleCandidates = [];
              Object.keys(chestSlots).forEach(function (chestSlot) {
                var chestSlotContent = chestSlots[chestSlot];
                var chestSlotIsEmpty = !chestSlotContent;

                if (chestSlotIsEmpty || chestSlotContent.value === diceDraggedOver) {
                  var chestSlotDomNode = chestDropAreaDomNode.querySelector("[data-chest-slot=\"".concat(chestSlot, "\"]"));
                  var rectangle = getDomNodeRectangle(chestSlotDomNode);
                  rectangleToChestSlotMap.set(rectangle, chestSlot);
                  rectangleCandidates.push(rectangle);
                }
              });
              var closestRectangle = findClosestRectangle(diceRectangle, rectangleCandidates);
              var closestChestSlot = rectangleToChestSlotMap.get(closestRectangle);

              if (hoveredByRolledDice) {
                keepDice(diceDraggedOver, closestChestSlot);
              } else {
                repositionDiceInChest(diceDraggedOver, closestChestSlot);
              }
            });
          }
        }, [dragDiceGesture, chestDropAreaDomNode]);
        var threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea();
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
          className: "dice-area",
          ref: chestDropAreaDomNodeSetter,
          style: _objectSpread({}, hoveredByRolledDice && !threeSkullsOrMoreInCursedArea ? {
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
        }), threeSkullsOrMoreInCursedArea ? /*#__PURE__*/react.createElement(CursedCover, null) : null), /*#__PURE__*/react.createElement(RoundScore, null));
      };

      var ChestSlot = function ChestSlot(_ref2) {
        var chestSlotContent = _ref2.chestSlotContent;
        var currentCard = useCurrentCard();
        var unkeepDiceAllowed = useUnkeepDiceAllowed();
        var unkeepDice = useUnkeepDice();

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
              backgroundColor: cardColors[currentCard].color1,
              borderColor: cardColors[currentCard].color2,
              borderWidth: "2px",
              borderStyle: "solid"
            }
          }, /*#__PURE__*/react.createElement("img", {
            src: "/src/dices/dice_".concat(symbol, ".png"),
            draggable: "false",
            style: {
              width: "100%",
              height: "100%"
            }
          }));
        } // it's a dice


        var dice = chestSlotContent.value;
        return /*#__PURE__*/react.createElement(Dice, {
          dice: dice,
          draggable: true,
          clickAllowed: unkeepDiceAllowed,
          onClickAction: function onClickAction(dice) {
            unkeepDice(dice, dice.rolledAreaPosition);
          }
        });
      };

      var diceDraggedOverGetter$1 = function diceDraggedOverGetter(_ref3) {
        var dragDiceGesture = _ref3.dragDiceGesture,
            chestDropAreaDomNode = _ref3.chestDropAreaDomNode;

        if (!dragDiceGesture) {
          return null;
        }

        var chestDropAreaDomNodeRectangle = getDomNodeRectangle(chestDropAreaDomNode);

        if (!rectangleCollidesWithRectangle(dragDiceGesture.diceRectangle, chestDropAreaDomNodeRectangle)) {
          return null;
        }

        return dragDiceGesture.dice;
      };

      var CursedCover = function CursedCover() {
        return /*#__PURE__*/react.createElement("div", {
          className: "cursed-cover"
        }, /*#__PURE__*/react.createElement("img", {
          src: "/src/chest/cursed-grid.png",
          alt: "cursed-cover"
        }));
      };

      var useRepositionDiceInChest = createAction(function (state, dice, chestSlot) {
        var _objectSpread2;

        var chestSlots = state.chestSlots;
        var previousChestSlot = dice.chestSlot;
        dice.chestSlot = chestSlot;
        return _objectSpread(_objectSpread({}, state), {}, {
          chestSlots: _objectSpread(_objectSpread({}, chestSlots), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, previousChestSlot, null), _defineProperty(_objectSpread2, chestSlot, {
            type: "dice",
            value: dice
          }), _objectSpread2))
        });
      });

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
            closeDialog = _ref.closeDialog;
        var card = useCurrentCard();
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
        }, cardsRules[card] && /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
          className: "dialog-label"
        }, cardsRules[card].name), /*#__PURE__*/react.createElement("img", {
          className: "current-card",
          src: "/src/cards/card_".concat(card, ".png"),
          alt: card
        }), /*#__PURE__*/react.createElement("div", {
          className: "text-rule"
        }, cardsRules[card].rule), cardsRules[card].more ? /*#__PURE__*/react.createElement("div", {
          className: "text-rule"
        }, cardsRules[card].more) : null))));
      };

      var Header = function Header() {
        var _React$useState = react.useState(false),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            dialogIsOpen = _React$useState2[0],
            setDialogIsOpen = _React$useState2[1];

        var card = useCurrentCard();

        var openDialog = function openDialog() {
          if (card) setDialogIsOpen(true);
        };

        var closeDialog = function closeDialog() {
          setDialogIsOpen(false);
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
        }, /*#__PURE__*/react.createElement(TopDeckCard, null)), /*#__PURE__*/react.createElement(SwordChallengeIndicator, null)), /*#__PURE__*/react.createElement(CurrentPlayer, null), /*#__PURE__*/react.createElement(TotalScore, null), /*#__PURE__*/react.createElement(CardRulesDialog, {
          dialogIsOpen: dialogIsOpen,
          closeDialog: closeDialog
        }));
      };

      var TopDeckCard = function TopDeckCard() {
        var currentCard = useCurrentCard();
        return currentCard ? /*#__PURE__*/react.createElement(Card, {
          card: currentCard
        }) : /*#__PURE__*/react.createElement(BackCard, null);
      };

      var BackCard = function BackCard() {
        return /*#__PURE__*/react.createElement("div", {
          className: "card default-card",
          style: {
            backgroundImage: "url('/src/cards/card_default.png')",
            backgroundSize: "217px"
          }
        });
      };

      var Card = function Card(_ref) {
        var card = _ref.card;
        return /*#__PURE__*/react.createElement("div", {
          className: "card current-card",
          style: {
            backgroundColor: cardColors[card].color1,
            borderColor: cardColors[card].color2
          }
        }, /*#__PURE__*/react.createElement("img", {
          src: "/src/cards/card_small-".concat(isSwordChallengeCard(card) ? "sword-challenge" : card, ".png"),
          alt: card
        }));
      };

      var CurrentPlayer = function CurrentPlayer() {
        var currentPlayer = useCurrentPlayer();
        return /*#__PURE__*/react.createElement("span", null, "Joueur actuel: ", currentPlayer.character.name);
      };

      var TotalScore = function TotalScore() {
        var currentPlayer = useCurrentPlayer();
        return /*#__PURE__*/react.createElement("div", {
          className: "total-score"
        }, /*#__PURE__*/react.createElement("span", {
          className: "score"
        }, currentPlayer.score));
      };

      var ButtonNextRound = function ButtonNextRound(_ref) {
        var openDialog = _ref.openDialog;
        var startNextRoundAllowed = useStartNextRoundAllowed();
        var startNextRound = useStartNextRound();

        var openNextRoundDialog = function openNextRoundDialog() {
          openDialog(true);
          startNextRound();
        };

        if (startNextRoundAllowed) {
          return /*#__PURE__*/react.createElement("div", {
            className: "next-round-action"
          }, /*#__PURE__*/react.createElement("button", {
            onClick: openNextRoundDialog
          }, "Tour suivant"));
        }

        return null;
      };
      var useStartNextRound = createAction(function (state) {
        var players = state.players,
            currentPlayerId = state.currentPlayerId;
        var currentPlayerIndex = players.findIndex(function (player) {
          return player.id === currentPlayerId;
        });
        var nextPlayerId = currentPlayerIndex === players.length - 1 ? players[0].id : players[currentPlayerIndex + 1].id;
        return _objectSpread(_objectSpread({}, state), {}, {
          currentPlayerId: nextPlayerId,
          witchUncursedDiceId: null,
          roundStarted: false,
          rollCount: 0,
          dicesRolled: [],
          dicesCursed: [],
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
          currentCard: null,
          isOnSkullIsland: false
        });
      });

      var DrawCardDialog = function DrawCardDialog(_ref) {
        var dialogIsOpen = _ref.dialogIsOpen,
            closeDialog = _ref.closeDialog;
        var cardDeck = useCardDeck();
        var card = useCurrentCard();
        return /*#__PURE__*/react.createElement(Dialog, {
          isOpen: dialogIsOpen,
          onRequestClose: closeDialog,
          requestCloseOnClickOutside: false
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
        }, "Suivant"), /*#__PURE__*/react.createElement("div", {
          className: "dialog-content draw-card-dialog"
        }, /*#__PURE__*/react.createElement("div", {
          className: "dialog-body"
        }, /*#__PURE__*/react.createElement("div", {
          className: "dialog-label"
        }, cardDeck.length === 0 && !card ? "Paquet de cartes épuisé. Mélangez-le pour pouvoir piocher à nouveau." : "Piochez une carte pour le tour suivant."), /*#__PURE__*/react.createElement("div", {
          className: "card-area"
        }, /*#__PURE__*/react.createElement(BackCard$1, null), /*#__PURE__*/react.createElement(TopCard, null)), /*#__PURE__*/react.createElement(CardDescription, null)), /*#__PURE__*/react.createElement("div", {
          className: "dialog-actions"
        }, /*#__PURE__*/react.createElement(DeckButton, null), /*#__PURE__*/react.createElement(StartButton, {
          closeDialog: closeDialog
        }))));
      };

      var TopCard = function TopCard() {
        var card = useCurrentCard();
        if (card) return /*#__PURE__*/react.createElement("div", {
          className: "card current-card"
        }, /*#__PURE__*/react.createElement("div", {
          className: "flip-card"
        }, /*#__PURE__*/react.createElement("div", {
          className: "flip-card-inner"
        }, /*#__PURE__*/react.createElement("div", {
          className: "flip-card-front"
        }, /*#__PURE__*/react.createElement("div", {
          className: "card default-card",
          style: {
            backgroundImage: "url('/src/cards/card_default.png')"
          }
        })), /*#__PURE__*/react.createElement("div", {
          className: "flip-card-back"
        }, /*#__PURE__*/react.createElement("img", {
          src: "/src/cards/card_".concat(card, ".png"),
          alt: card
        })))));
        return null;
      };

      var CardDescription = function CardDescription() {
        var card = useCurrentCard();

        var _React$useState = react.useState(false),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            moreInfoVisible = _React$useState2[0],
            setMoreInfoVisible = _React$useState2[1];

        var toggleMoreInfoVisibility = function toggleMoreInfoVisibility() {
          setMoreInfoVisible(!moreInfoVisible);
        };

        if (card) {
          return /*#__PURE__*/react.createElement("div", {
            className: "card-description"
          }, /*#__PURE__*/react.createElement("span", {
            className: "subtitle"
          }, cardsRules[card].name), /*#__PURE__*/react.createElement("button", {
            className: "moreInfoIcon",
            onClick: function onClick() {
              return toggleMoreInfoVisibility();
            }
          }, moreInfoVisible ? /*#__PURE__*/react.createElement(IconMinus, null) : /*#__PURE__*/react.createElement(IconPlus, null)), /*#__PURE__*/react.createElement(MoreInfo, {
            moreInfoVisible: moreInfoVisible
          }));
        }

        return null;
      };

      var MoreInfo = function MoreInfo(_ref2) {
        var moreInfoVisible = _ref2.moreInfoVisible;
        var card = useCurrentCard();
        if (!moreInfoVisible) return null;

        if (cardsRules[card].more) {
          return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
            className: "text-rule"
          }, cardsRules[card].rule), /*#__PURE__*/react.createElement("div", {
            className: "text-rule"
          }, cardsRules[card].more));
        }

        return /*#__PURE__*/react.createElement("div", {
          className: "text-rule"
        }, cardsRules[card].rule);
      };

      var IconPlus = function IconPlus() {
        return /*#__PURE__*/react.createElement("svg", {
          viewBox: "0 0 24 24",
          height: "24px",
          width: "24px"
        }, /*#__PURE__*/react.createElement("path", {
          d: "M0 0h24v24H0z",
          fill: "none"
        }), /*#__PURE__*/react.createElement("path", {
          d: "M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        }));
      };

      var IconMinus = function IconMinus() {
        return /*#__PURE__*/react.createElement("svg", {
          viewBox: "0 0 24 24",
          width: "24px",
          height: "24px"
        }, /*#__PURE__*/react.createElement("path", {
          d: "M0 0h24v24H0z",
          fill: "none"
        }), /*#__PURE__*/react.createElement("path", {
          d: "M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        }));
      };

      var BackCard$1 = function BackCard() {
        var cardDeck = useCardDeck();
        return /*#__PURE__*/react.createElement("div", {
          className: "card default-card",
          id: "back-deck-card",
          style: {
            backgroundImage: "url('/src/cards/card_default.png')"
          }
        }, /*#__PURE__*/react.createElement("div", {
          className: "remaining-cards-number"
        }, cardDeck.length));
      };

      var DeckButton = function DeckButton() {
        var currentCard = useCurrentCard();
        var cardDeck = useCardDeck();
        if (currentCard) return null;
        if (cardDeck.length === 0) return /*#__PURE__*/react.createElement(ShuffleDeckButton, null);
        return /*#__PURE__*/react.createElement(DrawCardButton, null);
      };

      var DrawCardButton = function DrawCardButton() {
        var drawCard = useDrawCard();
        return /*#__PURE__*/react.createElement("button", {
          className: "draw-card-btn",
          onClick: drawCard
        }, "Piocher");
      };

      var ShuffleDeckButton = function ShuffleDeckButton() {
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
        }, "M\xE9langer le paquet");
      };

      var StartButton = function StartButton(_ref3) {
        var closeDialog = _ref3.closeDialog;
        var currentCard = useCurrentCard();
        var startRound = useStartRound();

        var start = function start() {
          startRound();
          closeDialog();
        };

        if (currentCard) {
          return /*#__PURE__*/react.createElement("button", {
            className: "draw-card-btn",
            onClick: start
          }, "Commencer");
        }

        return null;
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

        dices.forEach(function (dice) {
          dice.visibleFaceIndex = getDiceRandomFace(dice);

          var _getRandomAndCollisio = getRandomAndCollisionFreeInfo(dice),
              rectangle = _getRandomAndCollisio.rectangle,
              rotation = _getRandomAndCollisio.rotation,
              rotatedRectangle = _getRandomAndCollisio.rotatedRectangle;

          otherRotatedRectangles.push(rotatedRectangle);
          dice.rotation = rotation;
          dice.rolledAreaPosition = rectangle[0];
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

      var ButtonRoll = function ButtonRoll() {
        var rollDiceAllowed = useRollDiceAllowed();
        var rolledAreaDomNode = useRolledAreaDomNode();
        var roll = useRoll();

        if (rollDiceAllowed) {
          return /*#__PURE__*/react.createElement("div", {
            className: "roll-action"
          }, /*#__PURE__*/react.createElement("button", {
            onClick: function onClick() {
              roll(rolledAreaDomNode);
            }
          }, "Lancer"));
        }

        return null;
      };
      var useRoll = createAction(function (state, rolledAreaDomNode) {
        var rollCount = state.rollCount,
            dices = state.dices,
            dicesRolled = state.dicesRolled;
        return _objectSpread(_objectSpread({}, state), {}, {
          rollCount: rollCount + 1,
          dicesRolled: // [...] to ensure rolling dice re-render
          _toConsumableArray(rollDices(rollCount === 0 ? dices : dicesRolled, {
            rolledAreaDomNode: rolledAreaDomNode
          }))
        });
      });

      var Footer = function Footer() {
        var markScore = useMarkScore();
        var roundScore = useRoundScore();

        var _React$useState = react.useState(false),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            dialogIsOpen = _React$useState2[0],
            setDialogIsOpen = _React$useState2[1];

        var openDialog = function openDialog() {
          setDialogIsOpen(true);
        };

        var closeDialog = function closeDialog() {
          setDialogIsOpen(false);
        }; // const roundStarted = useRoundStarted()
        // if (!roundStarted && !dialogIsOpen) openDialog()
        // TODO: fix bug in DialogBase: dialog cannot be instantiated open


        return /*#__PURE__*/react.createElement("div", {
          className: "actions"
        }, /*#__PURE__*/react.createElement(ButtonRoll, null), /*#__PURE__*/react.createElement(ButtonNextRound, {
          openDialog: openDialog
        }), /*#__PURE__*/react.createElement(ButtonMarkScore, {
          onClick: function onClick() {
            markScore(roundScore);
          }
        }), /*#__PURE__*/react.createElement(DrawCardDialog, {
          dialogIsOpen: dialogIsOpen,
          closeDialog: closeDialog
        }));
      };

      var ButtonMarkScore = function ButtonMarkScore(_ref) {
        var onClick = _ref.onClick;
        var markScoreAllowed = useMarkScoreAllowed();
        var markScoreButtonVisible = useMarkScoreButtonVisible();
        var roundScore = useRoundScore();
        var sign = roundScore < 0 ? "-" : "+";
        if (markScoreButtonVisible) return /*#__PURE__*/react.createElement("div", {
          className: "collect-action"
        }, /*#__PURE__*/react.createElement("button", {
          onClick: onClick,
          disabled: !markScoreAllowed
        }, /*#__PURE__*/react.createElement("span", null, "Collecter"), /*#__PURE__*/react.createElement("span", {
          className: "score"
        }, sign, " ", Math.abs(roundScore))), !markScoreAllowed && /*#__PURE__*/react.createElement("img", {
          src: "/src/dices/dice_skull.png",
          className: "skull-symbol"
        }));
        return null;
      };

      var SkullIsland = function SkullIsland() {
        var currentCard = useCurrentCard();
        var dicesCursed = useDicesCursed();
        var removeSkullAllowed = useRemoveSkullAllowed();
        var uncurseDice = useUncurseDice();
        return /*#__PURE__*/react.createElement("div", {
          className: "skull-island"
        }, isWitchCard(currentCard) ? /*#__PURE__*/react.createElement(UncurseDiceLabel, null) : null, /*#__PURE__*/react.createElement("div", {
          className: "bottle"
        }, /*#__PURE__*/react.createElement("div", {
          className: "area"
        }, isOneSkullCard(currentCard) ? /*#__PURE__*/react.createElement(ExtraSkull, {
          card: currentCard
        }) : null, isTwoSkullsCard(currentCard) ? /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(ExtraSkull, {
          card: currentCard
        }), /*#__PURE__*/react.createElement(ExtraSkull, {
          card: currentCard
        })) : null, dicesCursed.map(function (dice) {
          return /*#__PURE__*/react.createElement(Dice, {
            key: dice.id,
            dice: dice,
            clickAllowed: removeSkullAllowed,
            onClickAction: function onClickAction(dice) {
              uncurseDice(dice);
            },
            specificStyle: {
              margin: "1px 5px"
            }
          });
        }))));
      };

      var ExtraSkull = function ExtraSkull(_ref) {
        var card = _ref.card;
        return /*#__PURE__*/react.createElement("button", {
          className: "dice",
          style: {
            width: diceSize,
            height: diceSize,
            color: "#fcfcfc",
            margin: "1px 5px",
            backgroundColor: cardColors[card].color1,
            borderColor: cardColors[card].color2,
            borderWidth: "2px"
          }
        }, /*#__PURE__*/react.createElement("img", {
          src: "/src/dices/dice_skull.png",
          style: {
            width: "100%",
            height: "100%"
          }
        }));
      };

      var UncurseDiceLabel = function UncurseDiceLabel() {
        var roundStarted = useRoundStarted();
        if (!roundStarted) return /*#__PURE__*/react.createElement("img", {
          style: {
            display: "none"
          },
          src: "/src/skull-island/witch-label.png"
        });
        return /*#__PURE__*/react.createElement("div", {
          className: "witch-label"
        }, /*#__PURE__*/react.createElement("img", {
          src: "/src/skull-island/witch-label.png"
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

      var useMemo$1 = react.useMemo;
      var Round = function Round() {
        /*
        https://github.com/facebook/react/issues/15156#issuecomment-474590693
         useMemo usage below means the components won't be re-rendered when game global state changes
        and it's fine because as you can see component structure is not conditioned by the gameState or anything.
        Every descendant will still be re-rendered by react and if some component are expensive to render
        they can be wrapped by useMemo with the same pattern.
        (Don't forget to pass dependencies as second arg if there is any).
         There is no real need for useMemo here: it's kept as an example.
        */
        return useMemo$1(function () {
          return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(GameEffects, null), /*#__PURE__*/react.createElement(PreloadImages, null), /*#__PURE__*/react.createElement(Header, null), /*#__PURE__*/react.createElement("div", {
            className: "chest-and-skulls"
          }, /*#__PURE__*/react.createElement(Chest, null), /*#__PURE__*/react.createElement(SkullIsland, null)), /*#__PURE__*/react.createElement(DiceOnGoing, null), /*#__PURE__*/react.createElement(Footer, null));
        });
      };

      var CHARACTERS = [{
        id: 1,
        name: "Barbe Rousse"
      }, {
        id: 2,
        name: "Ginette Boulette"
      }, {
        id: 3,
        name: "Jack Sparrow"
      }];

      var Game = function Game() {
        var players = usePlayers();
        var currentPlayerId = useCurrentPlayerId();
        var needsToChooseNumberOfPlayers = players.length === 0;

        if (needsToChooseNumberOfPlayers) {
          return /*#__PURE__*/react.createElement(PlayerCountSelection, null);
        }

        var playerWithoutCharacter = players.find(function (player) {
          return !player.character;
        });

        if (playerWithoutCharacter) {
          return /*#__PURE__*/react.createElement(CharacterSelection, {
            player: playerWithoutCharacter,
            players: players
          });
        }

        if (!currentPlayerId) {
          return /*#__PURE__*/react.createElement(StartGameScreen, null);
        }

        return /*#__PURE__*/react.createElement(Round, null);
      };

      var PlayerCountSelection = function PlayerCountSelection() {
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

      var CharacterSelection = function CharacterSelection(_ref) {
        var player = _ref.player,
            players = _ref.players;
        var setPlayerCharacter = useSetPlayerCharacter();
        return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("p", null, "Choisissez un personnage pour le joueur ", player.number), CHARACTERS.map(function (character) {
          return /*#__PURE__*/react.createElement("button", {
            key: character.id,
            disabled: !characterIsAvailable(character, players),
            onClick: function onClick() {
              setPlayerCharacter(player, character);
            }
          }, character.name);
        }));
      };

      var characterIsAvailable = function characterIsAvailable(character, players) {
        return !players.some(function (player) {
          return player.character === character;
        });
      };

      var useSetPlayerCharacter = createAction(function (state, player, character) {
        var players = state.players;
        player.character = character;
        return _objectSpread(_objectSpread({}, state), {}, {
          players: _toConsumableArray(players)
        });
      });

      var StartGameScreen = function StartGameScreen() {
        var players = usePlayers();
        var startPlaying = useStartPlaying();
        return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("p", null, "L'\xE9quipage est au complet"), /*#__PURE__*/react.createElement("ul", null, players.map(function (player) {
          console.log(player.id);
          return /*#__PURE__*/react.createElement("li", {
            key: player.id
          }, player.character.name, " (Joueur ", player.number, ")");
        })), /*#__PURE__*/react.createElement("button", {
          onClick: startPlaying
        }, "D\xE9marrer la partie"));
      };

      var useStartPlaying = createAction(function (state) {
        var players = state.players;
        return _objectSpread(_objectSpread({}, state), {}, {
          currentPlayerId: players[0].id
        });
      });

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
        return function () {
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

      var MainRaw = function MainRaw() {
        return /*#__PURE__*/react.createElement("div", {
          id: "main-container"
        }, /*#__PURE__*/react.createElement("div", {
          id: "main",
          ref: useMainDomNodeSetter()
        }, /*#__PURE__*/react.createElement(Stylesheet, {
          href: "/mille-sabord.css"
        }), /*#__PURE__*/react.createElement(AppBody, null)));
      };

      var AppBody = function AppBody() {
        var gameStarted = useGameStarted();

        if (gameStarted) {
          return /*#__PURE__*/react.createElement(Game, null);
        }

        return /*#__PURE__*/react.createElement(Home, null);
      };

      var ErrorScreen = function ErrorScreen(_ref) {
        var error = _ref.error;
        window.removeSplashscreen();
        return /*#__PURE__*/react.createElement("div", null, "An error occured", /*#__PURE__*/react.createElement("pre", null, _typeof(error) === "object" ? error.stack : error));
      };

      var Main = exports('Main', catchError(watchBooting(MainRaw, function () {
        return window.removeSplashscreen();
      }), ErrorScreen));

    }
  };
});
//# sourceMappingURL=main.component-a1a57ec9.js.map
