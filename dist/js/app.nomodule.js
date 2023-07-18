System.register([__v__("/js/vendors.nomodule.js")], function (_export, _context) {
  "use strict";

  var __jsenv_default_import__, _objectSpread2, jsx, createLogger, createServiceWorkerFacade, _objectWithoutProperties, jsxs, Fragment, createRoot, createContext$1, useContext$1, useReducer, useEffect, createStructuredStateStore, cardOneSkullSmallUrl, cardTwoSkullsSmallUrl, cardSwordChallengeSmallUrl, cardAnimalsSmallUrl, cardChestSmallUrl, cardCoinSmallUrl, cardDiamondSmallUrl, cardPirateSmallUrl, cardWitchSmallUrl, cardOneSkullUrl, cardTwoSkullsUrl, cardTwoSwordChallengeUrl, cardThreeSwordChallengeUrl, cardFourSwordChallengeUrl, cardAnimalsUrl, cardChestUrl, cardCoinUrl, cardDefaultUrl, cardDiamondUrl, cardPirateUrl, cardWitchUrl, CARD_ANIMALS, CARD_CHEST, CARD_COIN, CARD_DIAMOND, CARD_PIRATE, CARD_WITCH, CARD_ONE_SKULL, CARD_TWO_SKULLS, CARD_TWO_SWORDS_CHALLENGE, CARD_THREE_SWORDS_CHALLENGE, CARD_FOUR_SWORDS_CHALLENGE, cardImageUrlMap, cardToImageUrl, cardSmallImageUrlMap, cardToSmallImageUrl, cardData, createDeck, CARDS, mixDeck, swapTwoCards, randomIndex, cardIds, cardIdToCard, isPirateCard, isWitchCard, isChestCard, isAnimalsCard, isDiamondCard, isCoinCard, isOneSkullCard, isTwoSkullsCard, isTwoSwordsChallengeCard, isThreeSwordsChallengeCard, isFourSwordsChallengeCard, isSwordChallengeCard, symbolCoinUrl, symbolDiamondUrl, symbolMonkeyUrl, symbolParrotUrl, symbolSkullUrl, symbolSwordUrl, SYMBOL_COIN, SYMBOL_DIAMOND, SYMBOL_MONKEY, SYMBOL_PARROT, SYMBOL_SKULL, SYMBOL_SWORD, symbolIsSkull, symbolIsCoin, symbolIsDiamond, symbolIsMonkey, symbolIsParrot, SYMBOLS, symbolUrlMap, symbolToImageUrl, faces, diceId, createDice, DICES, diceIsOnSkull, diceToVisibleSymbol, defaultState, logger, stateStorageKey, store, createAction, useGameCreated, useGameStarted, usePlayers, useCurrentPlayerId, useCardIds, useDices, useRoundStarted, useCurrentCardId, useCurrentCardActivated, useRollCount, useScoreMarked, useIsOnSkullIsland, useWitchUncursedDiceId, useWitchCardEffectUsed, useDiceRolledIds, useDiceCursedIds, useChestSlots, useAnimationsDisabled, useSoundDisabled, createContext, useContext, useState, MainDomNodeContext, useMainDomNode, useMainDomNodeSetter, diceDomNodeContexts, diceDomNodeProviders, DiceDomNodesProvider, useDiceDomNode, useDiceDomNodeSetter, DomNodesProvider, ContextProvider, requestAsapCallback, nextIDLEPromise, catchError, addDomEventListener, elementIsWindow, elementIsDocument, isFocusable, isVisible, isDocumentElement, getStyle, getStyleValue, elementToOwnerWindow, elementToOwnerDocument, getDocumentScroll, UrlLoadingContext, reducer, initialState, UrlLoadingProvider, useUrlTrackerTotalCount, useUrlTrackerLoadedCount, useUrlLoadingNotifier, useUrlLoadingState, addLoadedListener, useWaitABit, swFacade, loadImage, unbindEvents, preloadImages, woodUrl, pirateHookUrl, pirateHook2Url, woodBoxUrl, treasureMapUrl, witchLabelUrl, skullBottleUrl, Preloader, ImagePreloader, _excluded, _excluded2, MainRaw, ErrorScreen, LoadScreen, Main, createMilleSabordGame, app;
  return {
    setters: [function (_vendorsJs) {
      __jsenv_default_import__ = _vendorsJs._;
      _objectSpread2 = _vendorsJs.a;
      jsx = _vendorsJs.j;
      createLogger = _vendorsJs.c;
      createServiceWorkerFacade = _vendorsJs.b;
      _objectWithoutProperties = _vendorsJs.d;
      jsxs = _vendorsJs.e;
      Fragment = _vendorsJs.F;
      createRoot = _vendorsJs.f;
    }],
    execute: function () {
      ({
        createContext: createContext$1,
        useContext: useContext$1,
        useReducer,
        useEffect
      } = __jsenv_default_import__);
      createStructuredStateStore = function createStructuredStateStore(defaultState, init) {
        let {
          name = "global",
          effect = () => {}
        } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        const StateContextMap = {};
        const stateKeys = Object.keys(defaultState);
        stateKeys.forEach(key => {
          const KeyedStateContext = createContext$1(defaultState[key]);
          StateContextMap[key] = KeyedStateContext;
          KeyedStateContext.Provider.displayName = `${name}.state.${key}.Provider`;
        });
        const DispatchContext = createContext$1(null);
        const reducer = (state, action) => action(state);
        let getStateInternal = () => defaultState;

        // to be able to getState from outside react
        const getState = () => getStateInternal();
        const Provider = _ref => {
          let {
            initialState,
            children
          } = _ref;
          const [state, dispatch] = useReducer(reducer, defaultState, init);
          getStateInternal = () => state;
          useEffect(() => {
            if (!initialState) return;
            dispatch(state => {
              return _objectSpread2(_objectSpread2({}, state), initialState);
            });
          }, [initialState]);
          useEffect(() => {
            if (effect) effect(state);
          }, [state]);
          const DispatchProvider = DispatchContext.Provider;
          DispatchProvider.displayName = `${name}.dispatch.Provider`;

          // nested provider info: https://github.com/facebook/react/issues/14620
          const element = /*#__PURE__*/jsx(DispatchProvider, {
            value: dispatch,
            children: children
          });
          return stateKeys.reduce((element, key) => {
            const KeyedStateProvider = StateContextMap[key].Provider;
            return /*#__PURE__*/jsx(KeyedStateProvider, {
              value: state[key],
              children: element
            });
          }, element);
        };
        const useState = () => getState();
        const useKeyedState = key => {
          return useContext$1(StateContextMap[key]);
        };
        const useDispatch = () => useContext$1(DispatchContext);
        const createAction = actionReducer => {
          return () => {
            const dispatch = useDispatch();
            return function () {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              dispatch(state => actionReducer(state, ...args));
            };
          };
        };
        return {
          Provider,
          useKeyedState,
          useDispatch,
          createAction,
          // in theory should not be used but could be handy ?
          useState,
          getState
        };
      };
      cardOneSkullSmallUrl = new URL(__v__("/other/card_small-1skull.png"), _context.meta.url);
      cardTwoSkullsSmallUrl = new URL(__v__("/other/card_small-2skulls.png"), _context.meta.url);
      cardSwordChallengeSmallUrl = new URL(__v__("/other/card_small-sword-challenge.png"), _context.meta.url);
      cardAnimalsSmallUrl = new URL(__v__("/other/card_small-animals.png"), _context.meta.url);
      cardChestSmallUrl = new URL(__v__("/other/card_small-chest.png"), _context.meta.url);
      cardCoinSmallUrl = new URL(__v__("/other/card_small-coin.png"), _context.meta.url);
      cardDiamondSmallUrl = new URL(__v__("/other/card_small-diamond.png"), _context.meta.url);
      cardPirateSmallUrl = new URL(__v__("/other/card_small-pirate.png"), _context.meta.url);
      cardWitchSmallUrl = new URL(__v__("/other/card_small-witch.png"), _context.meta.url);
      cardOneSkullUrl = new URL(__v__("/other/card_1skull.png"), _context.meta.url);
      cardTwoSkullsUrl = new URL(__v__("/other/card_2skulls.png"), _context.meta.url);
      cardTwoSwordChallengeUrl = new URL(__v__("/other/card_2sword-challenge.png"), _context.meta.url);
      cardThreeSwordChallengeUrl = new URL(__v__("/other/card_3sword-challenge.png"), _context.meta.url);
      cardFourSwordChallengeUrl = new URL(__v__("/other/card_4sword-challenge.png"), _context.meta.url);
      cardAnimalsUrl = new URL(__v__("/other/card_animals.png"), _context.meta.url);
      cardChestUrl = new URL(__v__("/other/card_chest.png"), _context.meta.url);
      cardCoinUrl = new URL(__v__("/other/card_coin.png"), _context.meta.url);
      _export("$", cardDefaultUrl = new URL(__v__("/other/card_default.png"), _context.meta.url));
      cardDiamondUrl = new URL(__v__("/other/card_diamond.png"), _context.meta.url);
      cardPirateUrl = new URL(__v__("/other/card_pirate.png"), _context.meta.url);
      cardWitchUrl = new URL(__v__("/other/card_witch.png"), _context.meta.url);
      CARD_ANIMALS = "animals";
      CARD_CHEST = "chest";
      CARD_COIN = "coin";
      CARD_DIAMOND = "diamond";
      CARD_PIRATE = "pirate";
      CARD_WITCH = "witch";
      CARD_ONE_SKULL = "1skull";
      CARD_TWO_SKULLS = "2skulls";
      _export("a7", CARD_TWO_SWORDS_CHALLENGE = "2sword-challenge");
      CARD_THREE_SWORDS_CHALLENGE = "3sword-challenge";
      CARD_FOUR_SWORDS_CHALLENGE = "4sword-challenge";
      cardImageUrlMap = {
        [CARD_ONE_SKULL]: cardOneSkullUrl,
        [CARD_TWO_SKULLS]: cardTwoSkullsUrl,
        [CARD_TWO_SWORDS_CHALLENGE]: cardTwoSwordChallengeUrl,
        [CARD_THREE_SWORDS_CHALLENGE]: cardThreeSwordChallengeUrl,
        [CARD_FOUR_SWORDS_CHALLENGE]: cardFourSwordChallengeUrl,
        [CARD_ANIMALS]: cardAnimalsUrl,
        [CARD_CHEST]: cardChestUrl,
        [CARD_COIN]: cardCoinUrl,
        [CARD_DIAMOND]: cardDiamondUrl,
        [CARD_PIRATE]: cardPirateUrl,
        [CARD_WITCH]: cardWitchUrl
      };
      _export("Z", cardToImageUrl = card => cardImageUrlMap[card.type]);
      cardSmallImageUrlMap = {
        [CARD_ONE_SKULL]: cardOneSkullSmallUrl,
        [CARD_TWO_SKULLS]: cardTwoSkullsSmallUrl,
        [CARD_TWO_SWORDS_CHALLENGE]: cardSwordChallengeSmallUrl,
        [CARD_THREE_SWORDS_CHALLENGE]: cardSwordChallengeSmallUrl,
        [CARD_FOUR_SWORDS_CHALLENGE]: cardSwordChallengeSmallUrl,
        [CARD_ANIMALS]: cardAnimalsSmallUrl,
        [CARD_CHEST]: cardChestSmallUrl,
        [CARD_COIN]: cardCoinSmallUrl,
        [CARD_DIAMOND]: cardDiamondSmallUrl,
        [CARD_PIRATE]: cardPirateSmallUrl,
        [CARD_WITCH]: cardWitchSmallUrl
      };
      _export("_", cardToSmallImageUrl = card => cardSmallImageUrlMap[card.type]);
      cardData = {
        [CARD_ANIMALS]: {
          type: CARD_ANIMALS,
          color1: "#99D380",
          color2: "#39B100"
        },
        [CARD_CHEST]: {
          type: CARD_CHEST,
          color1: "#C69C6D",
          color2: "#8C6239"
        },
        [CARD_COIN]: {
          type: CARD_COIN,
          color1: "#FFF5BB",
          color2: "#CE9109"
        },
        [CARD_DIAMOND]: {
          type: CARD_DIAMOND,
          color1: "#95C1E5",
          color2: "#3E57A6"
        },
        [CARD_PIRATE]: {
          type: CARD_PIRATE,
          color1: "#E6A9AB",
          color2: "#C1272D"
        },
        [CARD_WITCH]: {
          type: CARD_WITCH,
          color1: "#757092",
          color2: "#482399"
        },
        [CARD_ONE_SKULL]: {
          type: CARD_ONE_SKULL,
          color1: "#666666",
          color2: "#000000"
        },
        [CARD_TWO_SKULLS]: {
          type: CARD_TWO_SKULLS,
          color1: "#666666",
          color2: "#000000"
        },
        [CARD_TWO_SWORDS_CHALLENGE]: {
          type: CARD_TWO_SWORDS_CHALLENGE,
          color1: "#F4B392",
          color2: "#CB6828",
          numberOfSwords: 2,
          gambleAmount: 300
        },
        [CARD_THREE_SWORDS_CHALLENGE]: {
          type: CARD_THREE_SWORDS_CHALLENGE,
          color1: "#F4B392",
          color2: "#CB6828",
          numberOfSwords: 3,
          gambleAmount: 500
        },
        [CARD_FOUR_SWORDS_CHALLENGE]: {
          type: CARD_FOUR_SWORDS_CHALLENGE,
          color1: "#F4B392",
          color2: "#CB6828",
          numberOfSwords: 4,
          gambleAmount: 1000
        }
      };
      createDeck = repartition => {
        const cards = [];
        Object.keys(repartition).forEach(cardType => {
          const quantity = repartition[cardType];
          for (var i = 0; i < quantity; i++) {
            const card = _objectSpread2({
              id: cards.length + 1
            }, cardData[cardType]);
            cards.push(card);
          }
        });
        return cards;
      };
      CARDS = createDeck({
        [CARD_PIRATE]: 4,
        [CARD_WITCH]: 4,
        [CARD_CHEST]: 4,
        [CARD_ANIMALS]: 4,
        [CARD_DIAMOND]: 4,
        [CARD_COIN]: 3,
        [CARD_ONE_SKULL]: 3,
        [CARD_TWO_SKULLS]: 2,
        [CARD_TWO_SWORDS_CHALLENGE]: 2,
        [CARD_THREE_SWORDS_CHALLENGE]: 3,
        [CARD_FOUR_SWORDS_CHALLENGE]: 4
      });
      _export("I", mixDeck = deck => {
        const deckMixed = [...deck];
        for (var i = 0; i < 100; i++) swapTwoCards(deckMixed);
        return deckMixed;
      });
      swapTwoCards = deck => {
        // pick two random indexes
        const index1 = randomIndex(deck.length);
        const index2 = randomIndex(deck.length);
        // swap cards at these indexes
        const temp = deck[index1];
        deck[index1] = deck[index2];
        deck[index2] = temp;
        return deck;
      };
      randomIndex = arrayLength => Math.floor(Math.random() * arrayLength);
      cardIds = CARDS.map(card => card.id);
      _export("p", cardIdToCard = cardId => CARDS.find(cardCandidate => cardCandidate.id === cardId));
      _export("e", isPirateCard = card => card.type === CARD_PIRATE);
      _export("a1", isWitchCard = card => card.type === CARD_WITCH);
      _export("F", isChestCard = card => card.type === CARD_CHEST);
      _export("a", isAnimalsCard = card => card.type === CARD_ANIMALS);
      _export("g", isDiamondCard = card => card.type === CARD_DIAMOND);
      _export("f", isCoinCard = card => card.type === CARD_COIN);
      _export("B", isOneSkullCard = card => card.type === CARD_ONE_SKULL);
      _export("D", isTwoSkullsCard = card => card.type === CARD_TWO_SKULLS);
      isTwoSwordsChallengeCard = card => card.type === CARD_TWO_SWORDS_CHALLENGE;
      isThreeSwordsChallengeCard = card => card.type === CARD_THREE_SWORDS_CHALLENGE;
      isFourSwordsChallengeCard = card => card.type === CARD_FOUR_SWORDS_CHALLENGE;
      _export("i", isSwordChallengeCard = card => isTwoSwordsChallengeCard(card) || isThreeSwordsChallengeCard(card) || isFourSwordsChallengeCard(card));
      _export("P", symbolCoinUrl = new URL(__v__("/other/dice_coin.png"), _context.meta.url));
      _export("Q", symbolDiamondUrl = new URL(__v__("/other/dice_diamond.png"), _context.meta.url));
      _export("ac", symbolMonkeyUrl = new URL(__v__("/other/dice_monkey.png"), _context.meta.url));
      symbolParrotUrl = new URL(__v__("/other/dice_parrot.png"), _context.meta.url);
      _export("a0", symbolSkullUrl = new URL(__v__("/other/dice_skull.png"), _context.meta.url));
      _export("s", symbolSwordUrl = new URL(__v__("/other/dice_sword.png"), _context.meta.url));
      _export("j", SYMBOL_COIN = "coin");
      _export("h", SYMBOL_DIAMOND = "diamond");
      _export("b", SYMBOL_MONKEY = "monkey");
      _export("S", SYMBOL_PARROT = "parrot");
      _export("C", SYMBOL_SKULL = "skull");
      _export("k", SYMBOL_SWORD = "sword");
      _export("z", symbolIsSkull = symbol => symbol === SYMBOL_SKULL);
      _export("X", symbolIsCoin = symbol => symbol === SYMBOL_COIN);
      _export("Y", symbolIsDiamond = symbol => symbol === SYMBOL_DIAMOND);
      _export("V", symbolIsMonkey = symbol => symbol === SYMBOL_MONKEY);
      _export("W", symbolIsParrot = symbol => symbol === SYMBOL_PARROT);
      _export("U", SYMBOLS = [SYMBOL_COIN, SYMBOL_DIAMOND, SYMBOL_MONKEY, SYMBOL_PARROT, SYMBOL_SKULL, SYMBOL_SWORD]);
      symbolUrlMap = {
        [SYMBOL_COIN]: symbolCoinUrl,
        [SYMBOL_DIAMOND]: symbolDiamondUrl,
        [SYMBOL_MONKEY]: symbolMonkeyUrl,
        [SYMBOL_PARROT]: symbolParrotUrl,
        [SYMBOL_SKULL]: symbolSkullUrl,
        [SYMBOL_SWORD]: symbolSwordUrl
      };
      _export("T", symbolToImageUrl = symbol => symbolUrlMap[symbol]);
      faces = [SYMBOL_COIN, SYMBOL_DIAMOND, SYMBOL_MONKEY, SYMBOL_PARROT, SYMBOL_SKULL, SYMBOL_SWORD]; // Don't use an id: 0
      // Otherwise if(witchUncursedDiceId) would return false and we would have to check
      // if (typeof witchUncursedDiceId === 'number')
      diceId = 1;
      createDice = props => {
        return _objectSpread2({
          faces,
          visibleFaceIndex: 0,
          id: diceId++
        }, props);
      };
      DICES = {};
      new Array(8).fill("").forEach(() => {
        const dice = createDice();
        DICES[dice.id] = dice;
      });
      _export("x", diceIsOnSkull = dice => diceToVisibleSymbol(dice) === SYMBOL_SKULL);
      _export("d", diceToVisibleSymbol = _ref => {
        let {
          faces,
          visibleFaceIndex
        } = _ref;
        return faces[visibleFaceIndex];
      });
      _export("a9", defaultState = {
        animationsDisabled: false,
        soundDisabled: false,
        gameCreated: false,
        gameStarted: false,
        players: [],
        currentPlayerId: null,
        // persist accross a game round
        cardIds,
        cardUsedIds: [],
        dices: DICES,
        // game round
        roundStarted: false,
        currentCardId: null,
        currentCardActivated: false,
        rollCount: 0,
        scoreMarked: false,
        isOnSkullIsland: false,
        witchUncursedDiceId: null,
        witchCardEffectUsed: false,
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
        }
      });
      logger = createLogger({
        logLevel: "warn"
      });
      stateStorageKey = "game";
      store = createStructuredStateStore(defaultState, () => {
        if (localStorage.hasOwnProperty(stateStorageKey)) {
          const valueFromStorage = JSON.parse(localStorage.getItem(stateStorageKey));

          // idéalement on voudrait plus qu'un log ici
          // on voudrait afficher un message dans la ui pour expliquer pourquoi la partie a été supprimée

          // Here we check for missing or extra key in case the stored game state is outdated.
          // It happens when a new version of the game is released and the stored game state
          // is not in sync with the new game state
          // We could use a version instead but during dev we won't think to update the version
          const missingKey = Object.keys(defaultState).find(key => key in valueFromStorage === false);
          if (missingKey) {
            logger.warn(`stored game state is missing a property (${missingKey}) -> use initial game state instead`);
            return defaultState;
          }
          const extraKey = Object.keys(valueFromStorage).find(key => key in defaultState === false);
          if (extraKey) {
            logger.warn(`stored game state contains an unknown property (${extraKey}) -> use initial game state instead`);
            return defaultState;
          }
          logger.info(`read storage ${stateStorageKey} = `, valueFromStorage);
          return valueFromStorage;
        }
        logger.debug(`no game state stored -> use initial game state`);
        return defaultState;
      }, {
        effect: state => {
          logger.debug(`store ${stateStorageKey} = `, state);
          localStorage.setItem(stateStorageKey, JSON.stringify(state));
        }
      });
      store.Provider.displayName = "storeProvider";
      _export("c", createAction = store.createAction);
      _export("ae", useGameCreated = () => store.useKeyedState("gameCreated"));
      _export("a8", useGameStarted = () => store.useKeyedState("gameStarted"));
      _export("n", usePlayers = () => store.useKeyedState("players"));
      _export("m", useCurrentPlayerId = () => store.useKeyedState("currentPlayerId"));
      _export("o", useCardIds = () => store.useKeyedState("cardIds"));
      _export("r", useDices = () => store.useKeyedState("dices"));
      _export("a6", useRoundStarted = () => store.useKeyedState("roundStarted"));
      _export("A", useCurrentCardId = () => store.useKeyedState("currentCardId"));
      _export("J", useCurrentCardActivated = () => store.useKeyedState("currentCardActivated"));
      _export("q", useRollCount = () => store.useKeyedState("rollCount"));
      _export("E", useScoreMarked = () => store.useKeyedState("scoreMarked"));
      _export("H", useIsOnSkullIsland = () => store.useKeyedState("isOnSkullIsland"));
      _export("w", useWitchUncursedDiceId = () => store.useKeyedState("witchUncursedDiceId"));
      _export("a5", useWitchCardEffectUsed = () => store.useKeyedState("witchCardEffectUsed"));
      _export("v", useDiceRolledIds = () => store.useKeyedState("diceRolledIds"));
      _export("y", useDiceCursedIds = () => store.useKeyedState("diceCursedIds"));
      _export("t", useChestSlots = () => store.useKeyedState("chestSlots"));
      _export("G", useAnimationsDisabled = () => store.useKeyedState("animationsDisabled"));
      _export("ab", useSoundDisabled = () => store.useKeyedState("soundDisabled"));
      ({
        createContext,
        useContext,
        useState
      } = __jsenv_default_import__);
      MainDomNodeContext = createContext();
      _export("O", useMainDomNode = () => useContext(MainDomNodeContext)[0]);
      _export("ad", useMainDomNodeSetter = () => useContext(MainDomNodeContext)[1]);
      diceDomNodeContexts = {};
      Object.keys(DICES).forEach(diceId => {
        diceDomNodeContexts[diceId] = createContext();
      });
      diceDomNodeProviders = Object.keys(diceDomNodeContexts).map(key => diceDomNodeContexts[key].Provider);
      DiceDomNodesProvider = _ref => {
        let {
          children
        } = _ref;
        return diceDomNodeProviders.reduceRight((prev, Next) => {
          return /*#__PURE__*/jsx(Next, {
            value: useState(),
            children: prev
          });
        }, children);
      };
      _export("a3", useDiceDomNode = id => useContext(diceDomNodeContexts[id])[0]);
      _export("a4", useDiceDomNodeSetter = id => useContext(diceDomNodeContexts[id])[1]);
      DomNodesProvider = _ref2 => {
        let {
          children
        } = _ref2;
        return /*#__PURE__*/jsx(MainDomNodeContext.Provider, {
          value: useState(),
          children: /*#__PURE__*/jsx(DiceDomNodesProvider, {
            children: children
          })
        });
      };
      ContextProvider = _ref => {
        let {
          initialState,
          children
        } = _ref;
        return /*#__PURE__*/jsx(store.Provider, {
          initialState: initialState,
          children: /*#__PURE__*/jsx(DomNodesProvider, {
            children: children
          })
        });
      };
      requestAsapCallback = window.requestIdleCallback ? callback => {
        const requestId = window.requestIdleCallback(callback, {
          timeout: 400
        });
        return () => {
          window.cancelIdleCallback(requestId);
        };
      } : callback => {
        const requestId = window.requestAnimationFrame(callback);
        return () => {
          window.cancelAnimationFrame(requestId);
        };
      };
      nextIDLEPromise = window.requestIdleCallback ? function () {
        let {
          timeout = 60
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return new Promise(resolve => {
          window.requestIdleCallback(resolve, {
            timeout
          });
        });
      } : () => {
        return new Promise(resolve => {
          window.requestAnimationFrame(resolve);
        });
      };
      catchError = LowerLevelComponent => {
        class ErrorBoundary extends __jsenv_default_import__.Component {
          constructor(props) {
            super(props);
            this.state = {
              hasError: false,
              error: null
            };
          }
          static getDerivedStateFromError(error) {
            return {
              hasError: true,
              error
            };
          }
          render() {
            if (this.state.hasError) {
              return /*#__PURE__*/jsx(LowerLevelComponent, _objectSpread2(_objectSpread2({}, this.props), {}, {
                error: this.state.error
              }));
            }
            return /*#__PURE__*/jsx(LowerLevelComponent, _objectSpread2({}, this.props));
          }
        }
        return ErrorBoundary;
      };
      /* eslint-disable valid-jsdoc */
      _export("a2", addDomEventListener = (domNode, eventName, callback, options) => {
        domNode.addEventListener(eventName, callback, options);
        return () => {
          domNode.removeEventListener(eventName, callback, options);
        };
      }); // checking if somthing is window is tricky
      // we could also use a.constructor.name === 'Window'
      // but it's safer to use approach below
      elementIsWindow = a => a.window === a;
      elementIsDocument = a => a.nodeType === 9;
      _export("L", isFocusable = node => {
        // only element node can be focused, document, textNodes etc cannot
        if (node.nodeType !== 1) {
          return false;
        }
        const nodeName = node.nodeName.toLowerCase();
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
      });
      isVisible = node => {
        if (isDocumentElement(node)) {
          return true;
        }
        if (getStyleValue(node, "visibility") === "hidden") {
          return false;
        }
        let nodeOrAncestor = node;
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
      _export("N", isDocumentElement = node => node === node.ownerDocument.documentElement);
      getStyle = element => elementToOwnerWindow(element).getComputedStyle(element);
      _export("M", getStyleValue = (element, name) => getStyle(element).getPropertyValue(name));
      /**
       * elementToOwnerWindow returns the window owning the element.
       * Usually an element window will just be window.
       * But when an element is inside an iframe, the window of that element
       * is iframe.contentWindow
       * It's often important to work with the correct window because
       * element are scoped per iframes.
       */
      elementToOwnerWindow = element => {
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
      elementToOwnerDocument = element => {
        if (elementIsWindow(element)) return element.document;
        if (elementIsDocument(element)) return element;
        return element.ownerDocument;
      };
      _export("R", getDocumentScroll = element => {
        const elementWindow = elementToOwnerWindow(element);
        const elementDocument = elementToOwnerDocument(element);
        return {
          x: elementWindow.pageXOffset || elementDocument.documentElement.scrollLeft,
          y: elementWindow.pageYOffset || elementDocument.documentElement.scrollTop
        };
      });
      UrlLoadingContext = __jsenv_default_import__.createContext();
      reducer = (state, action) => action(state);
      initialState = {};
      UrlLoadingProvider = _ref => {
        let {
          children
        } = _ref;
        return /*#__PURE__*/jsx(UrlLoadingContext.Provider, {
          value: __jsenv_default_import__.useReducer(reducer, initialState),
          children: children
        });
      };
      useUrlTrackerTotalCount = () => {
        const urlLoadingState = useUrlLoadingState();
        const totalCount = Object.keys(urlLoadingState).length;
        return totalCount;
      };
      useUrlTrackerLoadedCount = () => {
        const urlLoadingState = useUrlLoadingState();
        const loadedCount = Object.keys(urlLoadingState).filter(url => urlLoadingState[url].status === "loaded").length;
        return loadedCount;
      };
      _export("u", useUrlLoadingNotifier = url => {
        url = String(url);
        const contextValue = __jsenv_default_import__.useContext(UrlLoadingContext);
        const dispatch = contextValue ? contextValue[1] : undefined;
        __jsenv_default_import__.useEffect(() => {
          if (dispatch) {
            return fetchAbort;
          }
          return null;
        }, []);
        const fetchStart = () => {
          dispatch(state => {
            if (url in state) {
              return state;
            }
            return _objectSpread2(_objectSpread2({}, state), {}, {
              [url]: {
                status: "loading"
              }
            });
          });
        };
        const fetchAbort = () => {
          dispatch(state => {
            if (!state.hasOwnProperty(url)) {
              return state;
            }
            const status = state[url].status;
            if (status !== "loading") {
              return state;
            }
            const stateWithoutUrl = {};
            Object.keys(state).forEach(key => {
              if (key !== url) {
                stateWithoutUrl[key] = state[key];
              }
            });
            return stateWithoutUrl;
          });
        };
        const fetchEnd = () => {
          dispatch(state => {
            if (url in state && state[url].status === "loaded") {
              // console.log("end loading early return", url, state[url])
              return state;
            }
            return _objectSpread2(_objectSpread2({}, state), {}, {
              [url]: {
                status: "loaded"
              }
            });
          });
        };
        if (!contextValue) {
          // if (import.meta.dev) {
          //   console.warn(`useUrlLoadingNotifier was called on a component without UrlLoadingContext`)
          // }
          return [() => {}, () => {}, () => {}];
        }
        return [fetchStart, fetchEnd, fetchAbort];
      });
      useUrlLoadingState = () => {
        const contextValue = __jsenv_default_import__.useContext(UrlLoadingContext);
        if (!contextValue) {
          // if (import.meta.dev) {
          //   console.warn(`useUrlLoadingState was called on a component without UrlLoadingContext`)
          // }
          return null;
        }
        return contextValue[0];
      };
      _export("K", addLoadedListener = (domNode, callback) => {
        const removeLoadListener = addDomEventListener(domNode, "load", () => {
          removeErrorListener();
          callback();
        });
        const removeErrorListener = addDomEventListener(domNode, "error", () => {
          removeLoadListener();
          callback();
        });
        return () => {
          removeLoadListener();
          removeErrorListener();
        };
      });
      useWaitABit = () => {
        const [waited, waitedSetter] = __jsenv_default_import__.useState(false);
        __jsenv_default_import__.useEffect(() => {
          return requestAsapCallback(() => {
            waitedSetter(true);
          });
        }, []);
        return waited;
      };
      _export("aa", swFacade = createServiceWorkerFacade()); // https://vincenttaverna.com/posts/react-image-hook/
      _export("l", loadImage = (url, crossOrigin) => {
        const image = new Image();
        if (crossOrigin) {
          image.crossOrigin = crossOrigin;
        }
        return new Promise((resolve, reject) => {
          // Load Handler
          const loaded = event => {
            // Cleanup our image element, we no longer need it
            unbindEvents(image);
            // Fulfill our promise with the event image element, even in older browsers
            resolve(event.target || event.srcElement);
          };

          // Error Handler
          const errored = error => {
            // Cleanup our image element, we no longer need it
            unbindEvents(image);
            // Forward our error to the user
            reject(error);
          };

          // Set our handlers
          image.onload = loaded;
          image.onerror = errored;
          image.onabort = errored;

          // Tell the browser we are ready to begin downloading
          image.src = url;
        });
      });
      unbindEvents = image => {
        // Reset callbacks
        image.onload = null;
        image.onerror = null;
        image.onabort = null;
        try {
          // Some browsers need you to remove the src
          // in order to garbage collect the image object
          delete image.src;
        } catch (e) {
          // Safari's strict mode throws, ignore
        }
      };
      preloadImages = async function preloadImages(images) {
        let {
          chunkSize = 7,
          msDelayBetweenChunks = 2000
        } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        let index = 0;
        const loaded = {};
        const failed = {};
        const preloadChunk = async chunk => {
          await Promise.all(chunk.map(async src => {
            try {
              const image = await loadImage(src);
              loaded[src] = image;
            } catch (error) {
              failed[src] = true;
            }
          }));
          await new Promise(resolve => {
            setTimeout(resolve, msDelayBetweenChunks);
          });
          const nextChunk = getNextChunk();
          if (nextChunk.length > 0) {
            await preloadChunk(nextChunk);
          }
        };
        const getNextChunk = () => {
          const chunk = [];
          let i = 0;
          while (i < chunkSize && index < images.length) {
            chunk.push(images[index]);
            i++;
            index++;
          }
          return chunk;
        };
        await preloadChunk(getNextChunk());
        return {
          loaded,
          failed
        };
      };
      woodUrl = new URL(__v__("/other/wood.jpg"), _context.meta.url);
      pirateHookUrl = new URL(__v__("/other/pirate-hook.png"), _context.meta.url);
      pirateHook2Url = new URL(__v__("/other/pirate-hook-02.png"), _context.meta.url);
      woodBoxUrl = new URL(__v__("/other/wood-box.jpg"), _context.meta.url);
      treasureMapUrl = new URL(__v__("/other/treasure-map.png"), _context.meta.url);
      witchLabelUrl = new URL(__v__("/other/witch-label.png"), _context.meta.url);
      skullBottleUrl = new URL(__v__("/other/skull-bottle.png"), _context.meta.url);
      Preloader = () => {
        const waited = useWaitABit();
        __jsenv_default_import__.useEffect(() => {
          if (waited && swFacade) {
            swFacade.setRegistrationPromise(window.navigator.serviceWorker.register(new URL("/service_worker.js", _context.meta.url)));
          }
        }, [waited]);
        return waited ? /*#__PURE__*/jsx(ImagePreloader, {}) : null;
      };
      ImagePreloader = () => {
        const images = [woodUrl, pirateHookUrl, pirateHook2Url, woodBoxUrl, treasureMapUrl, witchLabelUrl, skullBottleUrl, cardDefaultUrl, ...Object.keys(cardImageUrlMap).map(key => cardImageUrlMap[key])];
        __jsenv_default_import__.useEffect(() => {
          const timeoutId = setTimeout(() => preloadImages(images), 2000);
          return () => {
            clearTimeout(timeoutId);
          };
        }, []);
        return null;
      };
      _excluded = ["error", "onError"];
      _excluded2 = ["rootNode", "onLoadProgress", "onReady"];
      MainRaw = _ref => {
        let {
            error,
            onError
          } = _ref,
          props = _objectWithoutProperties(_ref, _excluded);
        if (error) {
          return /*#__PURE__*/jsx(ErrorScreen, {
            error: error,
            onError: onError
          });
        }
        return /*#__PURE__*/jsx(UrlLoadingProvider, {
          children: /*#__PURE__*/jsx(LoadScreen, _objectSpread2({}, props))
        });
      };
      ErrorScreen = _ref2 => {
        let {
          error,
          onError
        } = _ref2;
        __jsenv_default_import__.useEffect(() => {
          onError(error);
        }, []);
        return /*#__PURE__*/jsxs("div", {
          style: {
            maxWidth: "100vw"
          },
          children: [/*#__PURE__*/jsx("div", {
            style: {
              margin: "10px 15px"
            },
            children: "An error occured"
          }), /*#__PURE__*/jsx("pre", {
            style: {
              overflow: "auto",
              margin: "10px 15px"
            },
            children: typeof error === "object" ? error.stack : error
          })]
        });
      };
      LoadScreen = _ref3 => {
        let {
            rootNode,
            onLoadProgress,
            onReady
          } = _ref3,
          props = _objectWithoutProperties(_ref3, _excluded2);
        const loadscreenUrlTrackerReady = useWaitABit();
        const [loadscreenUrlsLoaded, loadscreenUrlsLoadedSetter] = __jsenv_default_import__.useState(false);

        // main must wait for loadscreen + request idle callback before starting
        const [mainImportNamespace, mainImportNamespaceSetter] = __jsenv_default_import__.useState(null);
        const [mainUrlTrackerReady, mainUrlTrackerReadySetter] = __jsenv_default_import__.useState(false);
        const [mainUrlsLoaded, mainsUrlsLoadedSetter] = __jsenv_default_import__.useState(false);
        const [, mainUrlErrorSetter] = __jsenv_default_import__.useState();
        const urlTrackerTotalCount = useUrlTrackerTotalCount();
        const urlTrackerLoadedCount = useUrlTrackerLoadedCount();
        __jsenv_default_import__.useEffect(() => {
          if (mainUrlTrackerReady) {
            onLoadProgress({
              loadedCount: urlTrackerLoadedCount,
              total: urlTrackerTotalCount
            });
          }
        }, [mainUrlTrackerReady, urlTrackerLoadedCount, urlTrackerTotalCount]);
        __jsenv_default_import__.useEffect(() => {
          performance.measure(`loading screen displayed`);
          rootNode.querySelector(`#main-container`).setAttribute("data-loading", "");
        }, []);
        __jsenv_default_import__.useEffect(() => {
          if (mainUrlsLoaded) {
            rootNode.querySelector(`#main-container`).removeAttribute("data-loading");
          }
        }, [mainUrlsLoaded]);
        __jsenv_default_import__.useEffect(() => {
          if (loadscreenUrlTrackerReady && urlTrackerLoadedCount === urlTrackerTotalCount) {
            loadscreenUrlsLoadedSetter(true);
          }
        }, [loadscreenUrlTrackerReady, urlTrackerLoadedCount, urlTrackerTotalCount]);
        __jsenv_default_import__.useEffect(() => {
          if (!loadscreenUrlsLoaded) {
            return;
          }
          (async () => {
            try {
              const namespace = await _context.import(__v__("/js/root.nomodule.js"));
              mainImportNamespaceSetter(namespace);
              await nextIDLEPromise();
              mainUrlTrackerReadySetter(true);
            } catch (e) {
              // https://github.com/facebook/react/issues/14981
              mainUrlErrorSetter(() => {
                throw e;
              });
            }
          })();
        }, [loadscreenUrlsLoaded]);
        __jsenv_default_import__.useEffect(() => {
          if (mainUrlTrackerReady && urlTrackerLoadedCount === urlTrackerTotalCount) {
            mainsUrlsLoadedSetter(true);
          }
        }, [mainUrlTrackerReady, urlTrackerLoadedCount, urlTrackerTotalCount]);
        __jsenv_default_import__.useEffect(() => {
          if (mainUrlsLoaded) {
            onReady();
          }
        }, [mainUrlsLoaded]);
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx("div", {
            id: "main-container",
            children: mainImportNamespace ? /*#__PURE__*/jsx(mainImportNamespace.App, _objectSpread2({}, props)) : null
          }), mainUrlsLoaded ? /*#__PURE__*/jsx(Preloader, {}) : null]
        });
      };
      Main = catchError(MainRaw);
      _export("createMilleSabordGame", createMilleSabordGame = _ref => {
        let {
          into,
          onLoadProgress
        } = _ref;
        return new Promise((resolve, reject) => {
          const root = createRoot(into);
          root.render( /*#__PURE__*/jsx(ContextProvider, {
            children: /*#__PURE__*/jsx(Main, {
              rootNode: into,
              onLoadProgress: onLoadProgress,
              onError: reject,
              onReady: resolve
            })
          }));
        });
      });
      _export("af", app = /*#__PURE__*/Object.freeze( /*#__PURE__*/Object.defineProperty({
        __proto__: null,
        createMilleSabordGame
      }, Symbol.toStringTag, {
        value: 'Module'
      })));
    }
  };
});