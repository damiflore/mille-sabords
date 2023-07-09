System.register([__v__("/js/vendors.nomodule.js"), __v__("/js/app2.nomodule.js")], function (_export, _context) {
  "use strict";

  var __jsenv_default_import__, jsx, _objectSpread2, _objectWithoutProperties, jsxs, __jsenv_default_import__$1, Fragment, createLogger, addToHomescreen, loadImage, useUrlLoadingNotifier, symbolSwordUrl, createAction, diceToVisibleSymbol, isSwordChallengeCard, isAnimalsCard, SYMBOL_PARROT, SYMBOL_MONKEY, isPirateCard, isCoinCard, isDiamondCard, SYMBOL_DIAMOND, SYMBOL_COIN, SYMBOL_SWORD, useCurrentPlayerId, usePlayers, useCardIds, cardIdToCard, useRollCount, useDices, useChestSlots, useDiceRolledIds, useWitchUncursedDiceId, diceIsOnSkull, useDiceCursedIds, symbolIsSkull, useCurrentCardId, isOneSkullCard, SYMBOL_SKULL, isTwoSkullsCard, useScoreMarked, isChestCard, useAnimationsDisabled, useIsOnSkullIsland, mixDeck, useCurrentCardActivated, addLoadedListener, isFocusable, getStyleValue, isDocumentElement, useMainDomNode, symbolCoinUrl, symbolDiamondUrl, getDocumentScroll, symbolToImageUrl, SYMBOLS, symbolIsMonkey, symbolIsParrot, symbolIsCoin, symbolIsDiamond, cardToImageUrl, cardToSmallImageUrl, cardDefaultUrl, symbolSkullUrl, isWitchCard, addDomEventListener, useDiceDomNode, useDiceDomNodeSetter, useWitchCardEffectUsed, useRoundStarted, CARD_TWO_SWORDS_CHALLENGE, useGameStarted, defaultState, swFacade, useSoundDisabled, symbolMonkeyUrl, useMainDomNodeSetter, useGameCreated, cache, Status, useImage, useUpdateEffect, useBecomes, useTransition, usePrevious, useIntersecting, _excluded$5, Image, useImageLoadAnimation, ImageLoadingFallback, ImageNotIntersectingFallback, TRANSPARENT_PNG_DATA_URL, Home, ButtonNewGame, useCreateNewGame, chestSlotContentToSymbol, computeRoundScore, computeScoreForSwordChallenge, countSymbol, computeScoreForSymbols, getScoreAndPerfectBonus, countSymbolsOccurences, useMemo, useCardDeck, useCurrentPlayer, useHasNeverRolled, useHasRolledOnce, useIsFirstRoll, useSymbolsInChest, useRemainingSpotInCursedArea, useHasDicesToCurse, useDiceKeptIds, useDicesToCurse, useRollDiceAllowed, useCursedCount, useThreeSkullsOrMore, useThreeSkullsOrMoreInCursedArea, useSkullCountInCursedArea, useSymbolsFromCard, useMarkScoreButtonVisible, useMarkScoreAllowed, useStartNextRoundAllowed, useRoundScore, useSwordChallengeOnGoing, useSwordQuantityRequired, useStartPlayerRound, useEndPlayerRound, useActivateCurrentCard, useSendToSkullIsland, useMarkScore, ROUND_START_STATE, useSetDiceRolledAreaPosition, useSetDiceChestSlot, useCurseDice, useUncurseDice, useUnkeepDice, useKeepDice, useEffect$3, RoundEffects, useRoundEffects, useCurseDiceEffect, useFailSwordChallengeEffect, useFourSkullsOrMoreOnFirstRollEffect, useDrawCard, useAddExtraCoin, useAddExtraDiamond, useShuffleDeck, CardsEffects, useCoinCardEffect, useDiamondCardEffect, createSignal, useSignal, useSignalState, DiceOnGoing, startJavaScriptAnimation, useAnimateTransitionUsingJs, useAnimateTransition, ValueWithAnimatedTransition, _excluded$4, _excluded2$1, Stylesheet, memoizeLinksByHref, injectStylesheetIntoDocument, findFirstDescendant, findLastDescendant, findAfter, findBefore, getNextNode, createNextNodeIterator, createAfterNodeIterator, getDeepestNode, getPreviousNode, createPreviousNodeIterator, firstFocusableDescendantOrSelf, trapFocusInside, hasNegativeTabIndex, isDiscoverableWithKeyboard, isTabEvent, activeTraps, activate, trapScrollInside, getAllScrollableParent, getScrollableParent, getScrollingElement, getNextBodyElement, isBodyElement, bodyIsScrollable, isHidden, isCompliant, testScrollCompliance, isScrollable, verticalOverflowIsVisible, horizontalOverflowIsVisible, findScrollableParent, _excluded$3, _excluded2, dialogBaseCssUrl, useEffect$2, DialogBase, DialogBackDrop, hasOrContainsFocus, ESC_KEY, dialogCssUrl, Dialog, useDialogState, StarRain, Star, CloseIcon, _excluded$2, DialogWood, RoundScoreRulesDialog, _excluded$1, useScoreParticles, rotatePoint, getDistanceBetweenTwoPoints, getRectangleCenterPoint$1, rotateRectangle, degreesToRadians, lineCollidesWithLine, rotatedRectangleCollidesWithRotatedRectangle, lineCollidesWithRectangle, someRectangleSideLine, rectangleCollidesWithRectangle, rectangleInsideOf, rectangleRelativeTo, findRectangleCloserToRectangle, getRectangleCenterPoint, getDistanceBetweenRectangles, getDomNodeRectangle, rectangleToRectangleInsideDomNode, rectangleRelativeToDomNode, rectangleAbsoluteToDomNode, domNodeCollidesWithRectangle, findDomNodeClosestToRectangle, printPointInDocument, RoundScoreParticle, ScoreParticleTreasure, ScoreParticleCombo, ScoreParticlePerfect, animateScoreParticleMoveToTotalScore, animateScoreParticlePopOnPlace, useSvgFluidSizeEffect, domNodeToCenterPoint, useRoundScoreParticleEffects, useCoinEffect, useDiamondEffect, usePerfectEffect, useComboEffect, compareSymbols, COMBO_SCORES, useState$1, useEffect$1, RoundScore, useSwordChallengeOngoing, ScoreDisplay, ScoreWithAnimations, scoreParticleAnimationDelayGetter, ScoreWithoutAnimation, useScoreParticleMergeEffect, animateScoreParticleMerge, DoubleScoreIndicator, NegativeScoreSign, diceSize, cursedGridImageUrl, Chest, ChestSlot, CursedCover, cardsRules, CardRulesDialog, _excluded, SmallCardForward, SmallCard, swordsDisabledImageUrl, SwordChallengeIndicator, SwordIconActivated, SwordIconDisabled, Header, HeaderSmallCard, BackCard$1, CurrentPlayer, TotalScore, diceSpacing, rollDices, getRandomDiceRectangle, getDiceRandomRotation, getDiceRandomFace, getRandomNumberBetweenInterval, ButtonRoll, useRoll, Footer, ButtonMarkScore, ButtonEndRound, wichLabelImageUrl, SkullIsland, ExtraSkull, UncurseDiceLabel, Portal, stringifyTransformations, throttle, enableDragGesture, domNodeToPagePosition, mouseEventToPagePosition, touchEventToPagePosition, useEffect, useState, Dice, computeDiceColors, DiceContainer, getClickEffect, getDropEffect, dropTargetGetter, diceIsInRolledAreaGetter, diceIsInChestGetter, keepDiceAllowedGetter, unkeepDiceAllowedGetter, uncurseDiceAllowedGetter, rolledAreaDropPositionGetter, chestSlotDropPositionGetter, closestRolledAreaPositionGetter, highestRolledAreaZIndexGetter, firstAvailableChestSlotGetter, closestAvailableChestSlotGetter, diceToChestSlot, chestSlotToChestSlotDomNode, diceToLocation, diceLocationToProps, DrawCardDialog, BackCard, TopCard, DeckButton, ButtonDrawCard, ButtonShuffleDeck, animateDeckShuffle, StartButton, animateCardActivation, Round, RoundGameBoard, StartPlayerRoundDialog, winTreasureUrl, boarUrl, SCORE_MAX, pathList, ScoreBoard, getNextPlayer, PlayerPath, ratioToOffsetDistance, ratioToStrokeDashOffset, ThreeSkullsAnimated, Avatar, GameConfiguration, useSetPlayerCount, luffyUrl, missFortuneUrl, jackSparrowUrl, barbeRougeUrl, ginetteBouletteUrl, capitaineCrochetUrl, CHARACTERS, CharacterSelection, CrewMembers, useStartGame, characterIsAvailable, useSetPlayerCharacter, scrollEffect, Game, useIsOnGameConfigurationScreen, useIsOnCharacterSelectionScreen, useDisableAnimations, useEnableAnimations, useDisableSound, useEnableSound, useCancelGame, useAddToHomescreen, useAddToHomescreenAvailable, useAddToHomescreenPrompt, UpdateApplication, ServiceWorkerView, UpdateAvailable, UpdateNotAvailable, settingsCssUrl, Settings, SettingsDialog, AddToHomescreen, CheckIcon, ConfirmCancelGameDialog, App, AppBody;
  return {
    setters: [function (_vendorsJs) {
      __jsenv_default_import__ = _vendorsJs.__jsenv_default_import__;
      jsx = _vendorsJs.jsx;
      _objectSpread2 = _vendorsJs._objectSpread2;
      _objectWithoutProperties = _vendorsJs._objectWithoutProperties;
      jsxs = _vendorsJs.jsxs;
      __jsenv_default_import__$1 = _vendorsJs.__jsenv_default_import__$1;
      Fragment = _vendorsJs.Fragment;
      createLogger = _vendorsJs.createLogger;
      addToHomescreen = _vendorsJs.addToHomescreen;
    }, function (_app2Js) {
      loadImage = _app2Js.loadImage;
      useUrlLoadingNotifier = _app2Js.useUrlLoadingNotifier;
      symbolSwordUrl = _app2Js.symbolSwordUrl;
      createAction = _app2Js.createAction;
      diceToVisibleSymbol = _app2Js.diceToVisibleSymbol;
      isSwordChallengeCard = _app2Js.isSwordChallengeCard;
      isAnimalsCard = _app2Js.isAnimalsCard;
      SYMBOL_PARROT = _app2Js.SYMBOL_PARROT;
      SYMBOL_MONKEY = _app2Js.SYMBOL_MONKEY;
      isPirateCard = _app2Js.isPirateCard;
      isCoinCard = _app2Js.isCoinCard;
      isDiamondCard = _app2Js.isDiamondCard;
      SYMBOL_DIAMOND = _app2Js.SYMBOL_DIAMOND;
      SYMBOL_COIN = _app2Js.SYMBOL_COIN;
      SYMBOL_SWORD = _app2Js.SYMBOL_SWORD;
      useCurrentPlayerId = _app2Js.useCurrentPlayerId;
      usePlayers = _app2Js.usePlayers;
      useCardIds = _app2Js.useCardIds;
      cardIdToCard = _app2Js.cardIdToCard;
      useRollCount = _app2Js.useRollCount;
      useDices = _app2Js.useDices;
      useChestSlots = _app2Js.useChestSlots;
      useDiceRolledIds = _app2Js.useDiceRolledIds;
      useWitchUncursedDiceId = _app2Js.useWitchUncursedDiceId;
      diceIsOnSkull = _app2Js.diceIsOnSkull;
      useDiceCursedIds = _app2Js.useDiceCursedIds;
      symbolIsSkull = _app2Js.symbolIsSkull;
      useCurrentCardId = _app2Js.useCurrentCardId;
      isOneSkullCard = _app2Js.isOneSkullCard;
      SYMBOL_SKULL = _app2Js.SYMBOL_SKULL;
      isTwoSkullsCard = _app2Js.isTwoSkullsCard;
      useScoreMarked = _app2Js.useScoreMarked;
      isChestCard = _app2Js.isChestCard;
      useAnimationsDisabled = _app2Js.useAnimationsDisabled;
      useIsOnSkullIsland = _app2Js.useIsOnSkullIsland;
      mixDeck = _app2Js.mixDeck;
      useCurrentCardActivated = _app2Js.useCurrentCardActivated;
      addLoadedListener = _app2Js.addLoadedListener;
      isFocusable = _app2Js.isFocusable;
      getStyleValue = _app2Js.getStyleValue;
      isDocumentElement = _app2Js.isDocumentElement;
      useMainDomNode = _app2Js.useMainDomNode;
      symbolCoinUrl = _app2Js.symbolCoinUrl;
      symbolDiamondUrl = _app2Js.symbolDiamondUrl;
      getDocumentScroll = _app2Js.getDocumentScroll;
      symbolToImageUrl = _app2Js.symbolToImageUrl;
      SYMBOLS = _app2Js.SYMBOLS;
      symbolIsMonkey = _app2Js.symbolIsMonkey;
      symbolIsParrot = _app2Js.symbolIsParrot;
      symbolIsCoin = _app2Js.symbolIsCoin;
      symbolIsDiamond = _app2Js.symbolIsDiamond;
      cardToImageUrl = _app2Js.cardToImageUrl;
      cardToSmallImageUrl = _app2Js.cardToSmallImageUrl;
      cardDefaultUrl = _app2Js.cardDefaultUrl;
      symbolSkullUrl = _app2Js.symbolSkullUrl;
      isWitchCard = _app2Js.isWitchCard;
      addDomEventListener = _app2Js.addDomEventListener;
      useDiceDomNode = _app2Js.useDiceDomNode;
      useDiceDomNodeSetter = _app2Js.useDiceDomNodeSetter;
      useWitchCardEffectUsed = _app2Js.useWitchCardEffectUsed;
      useRoundStarted = _app2Js.useRoundStarted;
      CARD_TWO_SWORDS_CHALLENGE = _app2Js.CARD_TWO_SWORDS_CHALLENGE;
      useGameStarted = _app2Js.useGameStarted;
      defaultState = _app2Js.defaultState;
      swFacade = _app2Js.swFacade;
      useSoundDisabled = _app2Js.useSoundDisabled;
      symbolMonkeyUrl = _app2Js.symbolMonkeyUrl;
      useMainDomNodeSetter = _app2Js.useMainDomNodeSetter;
      useGameCreated = _app2Js.useGameCreated;
    }],
    execute: function () {
      cache = new Map();
      Status = {
        LOADING: "loading",
        LOADED: "loaded",
        FAILED: "failed"
      };
      useImage = function useImage(src) {
        let {
          lazy = false
        } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        const cacheEntry = cache.get(src);
        const statusInitial = cacheEntry ? Status.LOADED : Status.LOADING;
        const [status, setStatus] = __jsenv_default_import__.useState(statusInitial);
        const mounted = __jsenv_default_import__.useRef(false);
        __jsenv_default_import__.useEffect(() => {
          mounted.current = true;
          return () => {
            mounted.current = false;
          };
        }, []);
        const startLoading = __jsenv_default_import__.useCallback(async () => {
          if (status === Status.LOADED) {
            return;
          }
          try {
            const image = await loadImage(src);
            if (!mounted.current) {
              // don't call setState on unmounted component
              console.log("image unmounted");
              return;
            }
            cache.set(src, image);
            setStatus(Status.LOADED);
          } catch (error) {
            if (!mounted.current) {
              // don't call setState on unmounted component
              return;
            }
            cache.delete(src);
            setStatus(Status.FAILED);
          }
        }, [setStatus, src]);
        __jsenv_default_import__.useEffect(() => {
          if (!lazy) {
            startLoading();
          }
        }, [lazy]);
        return [status, startLoading];
      };
      useUpdateEffect = function useUpdateEffect(effect) {
        let dependencies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        let {
          layout = false
        } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        const isInitialMount = __jsenv_default_import__.useRef(true);
        (layout ? __jsenv_default_import__.useLayoutEffect : __jsenv_default_import__.useEffect)(() => {
          if (isInitialMount.current) {
            isInitialMount.current = false;
            return undefined;
          }
          return effect();
        }, dependencies);
      }; // https://stackoverflow.com/a/61680184/2634179
      useBecomes = (becomesPredicate, deps) => {
        const transition = useTransition(becomesPredicate, deps);
        return Boolean(transition);
      };
      useTransition = (transitionPredicate, deps) => {
        const mountedRef = __jsenv_default_import__.useRef(false);
        __jsenv_default_import__.useEffect(() => {
          if (mountedRef.current === false) {
            mountedRef.current = true;
          }
        });
        const depsRef = __jsenv_default_import__.useRef(deps);
        __jsenv_default_import__.useEffect(() => {
          depsRef.current = deps;
        }, deps);
        if (!mountedRef.current) {
          return null;
        }
        if (!transitionPredicate(...depsRef.current)) {
          return null;
        }
        return {
          from: depsRef.current,
          to: deps
        };
      };
      usePrevious = value => {
        const ref = __jsenv_default_import__.useRef(value);
        __jsenv_default_import__.useEffect(() => {
          ref.current = value;
        }, [value]);
        return ref.current;
      };
      useIntersecting = _ref => {
        let {
          root,
          rootMargin,
          threshold = 0
        } = _ref;
        const [isIntersecting, isIntersectingSetter] = __jsenv_default_import__.useState(false);
        const domNodeRef = __jsenv_default_import__.useRef();
        __jsenv_default_import__.useEffect(() => {
          const domNode = domNodeRef.current;
          if (!domNode) {
            return undefined;
          }
          if (isIntersecting) {
            return undefined;
          }

          // https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API
          const observer = new window.IntersectionObserver(_ref2 => {
            let [entry] = _ref2;
            if (entry.isIntersecting) {
              observer.unobserve(domNode);
              isIntersectingSetter(true);
            } else {
              isIntersectingSetter(false);
            }
          }, {
            root,
            rootMargin,
            threshold
          });
          observer.observe(domNode);
          return () => {
            observer.disconnect();
          };
        }, [isIntersecting]);
        return [domNodeRef, isIntersecting];
      };
      _excluded$5 = ["loadWhenIntersecting", "usePlaceholderWhileLoading", "animateLoaded", "intersectionRoot", "intersectionRootMargin", "intersectionThreshold", "FallbackWhileNotIntersecting", "FallbackWhileLoading", "useImageStatusHook", "src"];
      Image = _ref => {
        let {
            loadWhenIntersecting = true,
            usePlaceholderWhileLoading = true,
            animateLoaded = true,
            intersectionRoot,
            intersectionRootMargin,
            intersectionThreshold,
            FallbackWhileNotIntersecting = ImageNotIntersectingFallback,
            FallbackWhileLoading = ImageLoadingFallback,
            useImageStatusHook = useImage,
            src
          } = _ref,
          props = _objectWithoutProperties(_ref, _excluded$5);
        const [status, startLoadingImage] = useImageStatusHook(src, {
          lazy: loadWhenIntersecting
        });
        const statusPrevious = usePrevious(status);
        const [imageFetchStart, imageFetchEnd] = useUrlLoadingNotifier(src);
        __jsenv_default_import__.useEffect(() => {
          if (statusPrevious !== "loading" && status === "loading") {
            imageFetchStart();
          }
          if (statusPrevious !== "loaded" && status === "loaded") {
            imageFetchEnd();
          }
        }, [statusPrevious, status]);
        const [domNodeRefForIntersection, intersecting] = useIntersecting({
          root: intersectionRoot,
          rootMargin: intersectionRootMargin,
          threshold: intersectionThreshold
        });
        const intersectingPrevious = usePrevious(intersecting);
        __jsenv_default_import__.useEffect(() => {
          // console.log({ src, loadWhenIntersecting, intersectingPrevious, intersecting })
          if (loadWhenIntersecting && !intersectingPrevious && intersecting) {
            // console.log("start loading", String(src))
            startLoadingImage();
          }
        }, [loadWhenIntersecting, intersectingPrevious, intersecting]);
        const [domNodeRefForAnimation, startAnimation] = useImageLoadAnimation();
        __jsenv_default_import__.useLayoutEffect(() => {
          if (animateLoaded && statusPrevious !== "loaded" && status === "loaded") {
            startAnimation();
          }
        }, [animateLoaded, statusPrevious, status]);
        if (loadWhenIntersecting && status !== "loaded" && !intersecting) {
          return /*#__PURE__*/jsx(FallbackWhileNotIntersecting, {
            ref: domNodeRefForIntersection
          });
        }
        if (usePlaceholderWhileLoading && status !== "loaded") {
          return /*#__PURE__*/jsx(FallbackWhileLoading, {});
        }
        return /*#__PURE__*/jsx("img", _objectSpread2({
          src: src,
          ref: domNodeRefForAnimation
        }, props));
      };
      useImageLoadAnimation = () => {
        const domNodeRef = __jsenv_default_import__.useRef();
        const startAnimation = __jsenv_default_import__.useCallback(() => {
          const domNode = domNodeRef.current;
          const opacity = window.getComputedStyle(domNode).getPropertyValue("opacity");
          domNode.animate([{
            opacity: 0
          }, {
            opacity
          }], {
            duration: 300
          });
        });
        return [domNodeRef, startAnimation];
      }; // eslint-disable-next-line react/display-name
      ImageLoadingFallback = __jsenv_default_import__.forwardRef((props, ref) => {
        return /*#__PURE__*/jsx("img", _objectSpread2({
          src: TRANSPARENT_PNG_DATA_URL,
          ref: ref
        }, props));
      }); // eslint-disable-next-line react/display-name
      ImageNotIntersectingFallback = __jsenv_default_import__.forwardRef((props, ref) => {
        return /*#__PURE__*/jsx("img", _objectSpread2({
          src: TRANSPARENT_PNG_DATA_URL,
          ref: ref
        }, props));
      });
      TRANSPARENT_PNG_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
      Home = () => {
        return /*#__PURE__*/jsx(ButtonNewGame, {});
      };
      ButtonNewGame = () => {
        const createNewGame = useCreateNewGame();
        return /*#__PURE__*/jsxs("div", {
          className: "new-game",
          children: [/*#__PURE__*/jsx(Image, {
            src: symbolSwordUrl
          }), /*#__PURE__*/jsx("button", {
            onClick: createNewGame,
            children: "Nouvelle partie"
          })]
        });
      };
      useCreateNewGame = createAction(state => {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          gameCreated: true
        });
      });
      chestSlotContentToSymbol = (chestSlotContent, dices) => {
        if (chestSlotContent && chestSlotContent.type === "symbol") {
          return chestSlotContent.value;
        }
        if (chestSlotContent && chestSlotContent.type === "dice") {
          const diceId = chestSlotContent.value;
          const dice = dices[diceId];
          return diceToVisibleSymbol(dice);
        }
        return null;
      };
      computeRoundScore = _ref => {
        let {
          card,
          symbolsInChest,
          scoreMarked,
          markScoreAllowed
        } = _ref;
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
          return computeScoreForSymbols(symbolsInChest.map(symbol => symbol === SYMBOL_PARROT ? SYMBOL_MONKEY : symbol));
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
      computeScoreForSwordChallenge = (symbols, _ref2) => {
        let {
          goal,
          gamble
        } = _ref2;
        const swordChallengeAchieved = countSymbol(symbols, SYMBOL_SWORD) >= goal;
        if (swordChallengeAchieved) {
          return computeScoreForSymbols(symbols) + gamble;
        }
        return -gamble;
      };
      countSymbol = (symbolArray, symbol) => {
        return symbolArray.filter(symbolCandidate => symbolCandidate === symbol).length;
      };
      computeScoreForSymbols = (symbols, perfectCount) => {
        const {
          score,
          perfectBonus
        } = getScoreAndPerfectBonus(symbols, perfectCount);
        return score + perfectBonus;
      };
      getScoreAndPerfectBonus = function getScoreAndPerfectBonus(symbols) {
        let perfectCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
        let score = 0;
        let usefullSymbol = 0;

        // add points for dice combinaisons
        const symbolCountMap = countSymbolsOccurences(symbols);
        Object.values(symbolCountMap).forEach(symbolCount => {
          if (symbolCount === 3) score += 100;
          if (symbolCount === 4) score += 200;
          if (symbolCount === 5) score += 500;
          if (symbolCount === 6) score += 1000;
          if (symbolCount === 7) score += 2000;
          if (symbolCount === 8) score += 4000;
          if (symbolCount > 2) usefullSymbol += symbolCount;
        });

        // add 1 point for each coin and diamond
        symbols.forEach(symbol => {
          if (symbol === SYMBOL_DIAMOND) {
            score += 100;
            if (symbolCountMap[SYMBOL_DIAMOND] < 3) usefullSymbol += 1;
          }
          if (symbol === SYMBOL_COIN) {
            score += 100;
            if (symbolCountMap[SYMBOL_COIN] < 3) usefullSymbol += 1;
          }
        });
        return {
          score,
          perfectBonus: usefullSymbol === perfectCount ? 500 : 0
        };
      };
      countSymbolsOccurences = symbols => {
        const symbolCountMap = {};
        symbols.forEach(symbol => {
          if (symbolCountMap.hasOwnProperty(symbol)) {
            symbolCountMap[symbol]++;
          } else {
            symbolCountMap[symbol] = 1;
          }
        });
        return symbolCountMap;
      };
      ({
        useMemo
      } = __jsenv_default_import__);
      useCardDeck = function useCardDeck() {
        let {
          cardIds = useCardIds()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return cardIds.map(cardId => cardIdToCard(cardId));
      };
      useCurrentPlayer = function useCurrentPlayer() {
        let {
          currentPlayerId = useCurrentPlayerId(),
          players = usePlayers()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return players.find(playerCandidate => playerCandidate.id === currentPlayerId);
      };
      useHasNeverRolled = function useHasNeverRolled() {
        let {
          rollCount = useRollCount()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return rollCount === 0;
      };
      useHasRolledOnce = function useHasRolledOnce() {
        let {
          rollCount = useRollCount()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return rollCount > 0;
      };
      useIsFirstRoll = function useIsFirstRoll() {
        let {
          rollCount = useRollCount()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return rollCount === 1;
      };
      useSymbolsInChest = function useSymbolsInChest() {
        let {
          dices = useDices(),
          chestSlots = useChestSlots()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return Object.keys(chestSlots).reduce((previous, chestSlot) => {
          const symbol = chestSlotContentToSymbol(chestSlots[chestSlot], dices);
          if (symbol) {
            return [...previous, symbol];
          }
          return previous;
        }, []);
      };
      useRemainingSpotInCursedArea = function useRemainingSpotInCursedArea() {
        let {
          skullCountInCursedArea = useSkullCountInCursedArea()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return 3 - skullCountInCursedArea;
      };
      useHasDicesToCurse = function useHasDicesToCurse() {
        let {
          dicesToCurse = useDicesToCurse()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return dicesToCurse.length > 0;
      };
      useDiceKeptIds = function useDiceKeptIds() {
        let {
          chestSlots = useChestSlots()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return Object.keys(chestSlots).reduce((previous, chestSlot) => {
          const chestSlotContent = chestSlots[chestSlot];
          if (chestSlotContent && chestSlotContent.type === "dice") {
            return [...previous, chestSlotContent.value];
          }
          return previous;
        }, []);
      };
      useDicesToCurse = function useDicesToCurse() {
        let {
          dices = useDices(),
          diceRolledIds = useDiceRolledIds(),
          witchUncursedDiceId = useWitchUncursedDiceId(),
          remainingSpotInCursedArea = useRemainingSpotInCursedArea()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        const dicesToCurse = diceRolledIds.map(diceRolledId => dices[diceRolledId]).filter(diceRolled => {
          if (!diceIsOnSkull(diceRolled)) return false;
          if (diceRolled.id === witchUncursedDiceId) return false;
          return true;
        }).slice(0, remainingSpotInCursedArea);
        return dicesToCurse;
      };
      useRollDiceAllowed = function useRollDiceAllowed() {
        let {
          currentCardId = useCurrentCardId(),
          hasNeverRolled = useHasNeverRolled(),
          scoreMarked = useScoreMarked(),
          threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea(),
          hasDicesToCurse = useHasDicesToCurse()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
      useCursedCount = function useCursedCount() {
        let {
          dicesToCurse = useDicesToCurse(),
          skullCountInCursedArea = useSkullCountInCursedArea()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        const skullBeingCursedCount = dicesToCurse.length;
        const cursedCount = skullBeingCursedCount + skullCountInCursedArea;
        return cursedCount;
      };
      useThreeSkullsOrMore = function useThreeSkullsOrMore() {
        let {
          cursedCount = useCursedCount()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return cursedCount > 2;
      };
      useThreeSkullsOrMoreInCursedArea = function useThreeSkullsOrMoreInCursedArea() {
        let {
          skullCountInCursedArea = useSkullCountInCursedArea()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return skullCountInCursedArea > 2;
      };
      useSkullCountInCursedArea = function useSkullCountInCursedArea() {
        let {
          diceCursedIds = useDiceCursedIds(),
          symbolsFromCard = useSymbolsFromCard()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return diceCursedIds.length + symbolsFromCard.filter(symbol => symbolIsSkull(symbol)).length;
      };
      useSymbolsFromCard = function useSymbolsFromCard() {
        let {
          currentCardId = useCurrentCardId()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        if (!currentCardId) return [];
        const currentCard = cardIdToCard(currentCardId);
        if (isCoinCard(currentCard)) return [SYMBOL_COIN];
        if (isDiamondCard(currentCard)) return [SYMBOL_DIAMOND];
        if (isOneSkullCard(currentCard)) return [SYMBOL_SKULL];
        if (isTwoSkullsCard(currentCard)) return [SYMBOL_SKULL, SYMBOL_SKULL];
        return [];
      };
      useMarkScoreButtonVisible = function useMarkScoreButtonVisible() {
        let {
          hasRolledOnce = useHasRolledOnce(),
          scoreMarked = useScoreMarked(),
          currentCardId = useCurrentCardId(),
          hasDicesToCurse = useHasDicesToCurse()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
      useMarkScoreAllowed = function useMarkScoreAllowed() {
        let {
          scoreMarked = useScoreMarked(),
          currentCardId = useCurrentCardId(),
          threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea(),
          hasDicesToCurse = useHasDicesToCurse()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
      useStartNextRoundAllowed = function useStartNextRoundAllowed() {
        let {
          rollDiceAllowed = useRollDiceAllowed(),
          markScoreAllowed = useMarkScoreAllowed(),
          hasDicesToCurse = useHasDicesToCurse()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
      useRoundScore = function useRoundScore() {
        let {
          currentCardId = useCurrentCardId(),
          symbolsInChest = useSymbolsInChest(),
          scoreMarked = useScoreMarked(),
          markScoreAllowed = useMarkScoreAllowed()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return useMemo(() => computeRoundScore({
          card: cardIdToCard(currentCardId),
          symbolsInChest,
          scoreMarked,
          markScoreAllowed
        }), [currentCardId, symbolsInChest, scoreMarked, markScoreAllowed]);
      };
      useSwordChallengeOnGoing = () => {
        const currentCardId = useCurrentCardId();
        const card = cardIdToCard(currentCardId);
        const symbolsInChest = useSymbolsInChest();
        const quantityKept = countSymbol(symbolsInChest, SYMBOL_SWORD);
        const quantityRequired = useSwordQuantityRequired();
        if (!isSwordChallengeCard(card)) {
          return false;
        }
        return quantityKept < quantityRequired;
      };
      useSwordQuantityRequired = function useSwordQuantityRequired() {
        let {
          currentCardId = useCurrentCardId()
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        const card = cardIdToCard(currentCardId);
        if (isSwordChallengeCard(card)) return card.numberOfSwords;
        return null;
      };
      useStartPlayerRound = createAction((state, player) => {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          currentPlayerId: player.id,
          currentCardId: null,
          currentCardActivated: false,
          roundStarted: true
        }, ROUND_START_STATE);
      });
      useEndPlayerRound = createAction(state => {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          currentCardId: null,
          currentCardActivated: false,
          roundStarted: false
        });
      });
      useActivateCurrentCard = createAction(state => {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          currentCardActivated: true
        });
      });
      useSendToSkullIsland = createAction(state => {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          isOnSkullIsland: true
        });
      });
      useMarkScore = createAction((state, score) => {
        const {
          players,
          currentPlayerId
        } = state;
        const currentPlayer = players.find(_ref => {
          let {
            id
          } = _ref;
          return id === currentPlayerId;
        });
        const nextScore = currentPlayer.score + score;
        currentPlayer.score = nextScore < 0 ? 0 : nextScore;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          players: [...players],
          scoreMarked: true
        });
      });
      ROUND_START_STATE = {
        witchUncursedDiceId: null,
        witchCardEffectUsed: false,
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
      useSetDiceRolledAreaPosition = createAction((state, dice, _ref, zIndex) => {
        let {
          x,
          y
        } = _ref;
        const {
          dices
        } = state;
        dice.rolledAreaPosition = {
          x,
          y
        };
        dice.rolledAreaZIndex = zIndex;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          dices: _objectSpread2({}, dices)
        });
      });
      useSetDiceChestSlot = createAction((state, dice, chestSlot) => {
        const {
          chestSlots
        } = state;
        const previousChestSlot = Object.keys(chestSlots).find(chestSlot => {
          const chestSlotContent = chestSlots[chestSlot];
          return chestSlotContent && chestSlotContent.type === "dice" && chestSlotContent.value === dice.id;
        });
        return _objectSpread2(_objectSpread2({}, state), {}, {
          chestSlots: _objectSpread2(_objectSpread2(_objectSpread2({}, chestSlots), previousChestSlot ? {
            [previousChestSlot]: null
          } : {}), {}, {
            [chestSlot]: {
              type: "dice",
              value: dice.id
            }
          })
        });
      });
      useCurseDice = createAction((state, dice) => {
        const {
          diceRolledIds,
          diceCursedIds
        } = state;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          diceRolledIds: diceRolledIds.filter(diceRolledId => diceRolledId !== dice.id),
          diceCursedIds: [...diceCursedIds, dice.id]
        });
      });
      useUncurseDice = createAction(function (state, dice) {
        let fromLab = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        const {
          diceRolledIds,
          diceCursedIds
        } = state;
        return _objectSpread2(_objectSpread2(_objectSpread2({}, state), fromLab ? {} : {
          witchUncursedDiceId: dice.id,
          witchCardEffectUsed: true
        }), {}, {
          diceRolledIds: [...diceRolledIds, dice.id],
          diceCursedIds: diceCursedIds.filter(diceCursedId => diceCursedId !== dice.id)
        });
      });
      useUnkeepDice = createAction((state, dice) => {
        const {
          diceRolledIds,
          chestSlots
        } = state;
        const previousChestSlot = Object.keys(chestSlots).find(chestSlot => {
          const chestSlotContent = chestSlots[chestSlot];
          return chestSlotContent && chestSlotContent.type === "dice" && chestSlotContent.value === dice.id;
        });
        return _objectSpread2(_objectSpread2({}, state), {}, {
          diceRolledIds: [...diceRolledIds, dice.id],
          chestSlots: _objectSpread2(_objectSpread2({}, chestSlots), {}, {
            [previousChestSlot]: null
          })
        });
      });
      useKeepDice = createAction((state, dice, chestSlot) => {
        const {
          diceRolledIds,
          chestSlots
        } = state;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          diceRolledIds: diceRolledIds.filter(diceRolledId => diceRolledId !== dice.id),
          chestSlots: _objectSpread2(_objectSpread2({}, chestSlots), {}, {
            [chestSlot]: {
              type: "dice",
              value: dice.id
            }
          })
        });
      });
      ({
        useEffect: useEffect$3
      } = __jsenv_default_import__);
      RoundEffects = () => {
        useRoundEffects();
        return null;
      };
      useRoundEffects = () => {
        useCurseDiceEffect();
        useFailSwordChallengeEffect();
        useFourSkullsOrMoreOnFirstRollEffect();
      };
      useCurseDiceEffect = () => {
        const animationsDisabled = useAnimationsDisabled();
        const dicesToCurse = useDicesToCurse();
        const curseDice = useCurseDice();
        useEffect$3(() => {
          if (dicesToCurse.length === 0) {
            return () => {};
          }
          if (animationsDisabled) {
            dicesToCurse.forEach(dice => {
              curseDice(dice);
            });
            return () => {};
          }
          const timeout = setTimeout(() => {
            dicesToCurse.forEach(dice => {
              curseDice(dice);
            });
          }, 1000);
          return () => {
            clearTimeout(timeout);
          };
        }, [dicesToCurse]);
      }; // auto mark score for failed sword challenges
      useFailSwordChallengeEffect = () => {
        const currentCard = cardIdToCard(useCurrentCardId());
        const scoreMarked = useScoreMarked();
        const markScore = useMarkScore();
        const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea();
        const threeSkullsOrMoreInCursedAreaBecomesTrue = useBecomes(threeSkullsOrMoreInCursedAreaPrevious => !threeSkullsOrMoreInCursedAreaPrevious && threeSkullsOrMoreInCursedArea, [threeSkullsOrMoreInCursedArea]);
        const roundScore = useRoundScore();
        const swordChallengeCard = isSwordChallengeCard(currentCard);
        useEffect$3(() => {
          if (swordChallengeCard && !scoreMarked && threeSkullsOrMoreInCursedAreaBecomesTrue) {
            markScore(roundScore);
          }
        }, [swordChallengeCard, scoreMarked, threeSkullsOrMoreInCursedAreaBecomesTrue, roundScore]);
      }; // go to skull island if 4 skulls or more on first roll
      useFourSkullsOrMoreOnFirstRollEffect = () => {
        const isFirstRoll = useIsFirstRoll();
        const currentCard = cardIdToCard(useCurrentCardId());
        const isOnSkullIsland = useIsOnSkullIsland();
        const skullCountInCursedArea = useSkullCountInCursedArea();
        const sendToSkullIsland = useSendToSkullIsland();
        useEffect$3(() => {
          if (!isFirstRoll) return;
          if (isOnSkullIsland) return;
          if (isSwordChallengeCard(currentCard)) return;
          if (skullCountInCursedArea < 4) return;
          sendToSkullIsland();
        }, [isFirstRoll, isOnSkullIsland, currentCard, skullCountInCursedArea]);
      };
      useDrawCard = createAction(state => {
        const {
          cardIds,
          cardUsedIds
        } = state;
        const cardDrawnId = cardIds[0];
        return _objectSpread2(_objectSpread2({}, state), {}, {
          cardIds: cardIds.slice(1),
          cardUsedIds: [...cardUsedIds, cardDrawnId],
          currentCardId: cardDrawnId
        });
      });
      useAddExtraCoin = createAction(state => {
        const {
          chestSlots
        } = state;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          chestSlots: _objectSpread2(_objectSpread2({}, chestSlots), {}, {
            1: {
              type: "symbol",
              value: SYMBOL_COIN
            }
          })
        });
      });
      useAddExtraDiamond = createAction(state => {
        const {
          chestSlots
        } = state;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          chestSlots: _objectSpread2(_objectSpread2({}, chestSlots), {}, {
            1: {
              type: "symbol",
              value: SYMBOL_DIAMOND
            }
          })
        });
      });
      useShuffleDeck = createAction(state => {
        const {
          cardIds,
          cardUsedIds
        } = state;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          // shuffle deck is conceptually the action of taking all the cards
          // and shuffling them.
          // hence the [...cardIds, ...cardUsedIds]
          // For now shuffleDeck is called when cardsIds is empty.
          // If we change [...cardIds, ...cardUsedIds] by cardUsedIds
          // it makes shuffleDeck less robust because it cannot be called twice
          // or at any time.
          cardIds: mixDeck([...cardIds, ...cardUsedIds]),
          cardUsedIds: []
        });
      });
      CardsEffects = () => {
        useCoinCardEffect();
        useDiamondCardEffect();
        return null;
      };
      useCoinCardEffect = () => {
        const addExtraCoin = useAddExtraCoin();
        const currentCardId = useCurrentCardId();
        const currentCardActivated = useCurrentCardActivated();
        const currentCardBecomesActivated = useBecomes(currentCardActivatedPrevious => !currentCardActivatedPrevious === currentCardActivated, [currentCardActivated]);
        const currentCardIsCoinCard = currentCardId && isCoinCard(cardIdToCard(currentCardId));
        __jsenv_default_import__.useEffect(() => {
          if (currentCardIsCoinCard) {
            addExtraCoin();
          }
        }, []);
        __jsenv_default_import__.useEffect(() => {
          if (currentCardBecomesActivated && currentCardIsCoinCard) {
            addExtraCoin();
          }
        }, [currentCardBecomesActivated, currentCardIsCoinCard]);
      };
      useDiamondCardEffect = () => {
        const addExtraDiamond = useAddExtraDiamond();
        const currentCardId = useCurrentCardId();
        const currentCardActivated = useCurrentCardActivated();
        const currentCardBecomesActivated = useBecomes(currentCardActivatedPrevious => !currentCardActivatedPrevious === currentCardActivated, [currentCardActivated]);
        const currentCardIsDiamondCard = currentCardId && isDiamondCard(cardIdToCard(currentCardId));
        __jsenv_default_import__.useEffect(() => {
          if (currentCardIsDiamondCard) {
            addExtraDiamond();
          }
        }, []);
        __jsenv_default_import__.useEffect(() => {
          if (currentCardBecomesActivated && currentCardIsDiamondCard) {
            addExtraDiamond();
          }
        }, [currentCardBecomesActivated, currentCardIsDiamondCard]);
      };
      createSignal = () => {
        let listeners = [];
        const listen = function listen(callback) {
          let {
            once = false
          } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          if (once) {
            const callbackOriginal = callback;
            callback = function callback() {
              stopListening();
              callbackOriginal(...arguments);
            };
          }
          listeners = [...listeners, callback];
          let removed = false;
          const stopListening = () => {
            if (removed) return;
            removed = true;
            const listenersWithoutCallback = [];
            let i = listeners.length;
            let searching = true;
            while (i--) {
              const listenerCandidate = listeners[i];
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
          return stopListening;
        };
        const emit = function emit() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          listeners.forEach(listener => {
            listener(...args);
          });
        };
        return {
          listen,
          emit
        };
      };
      useSignal = () => {
        const [signal] = __jsenv_default_import__.useState(() => createSignal());
        return [signal.listen, signal.emit];
      };
      useSignalState = listen => {
        const [state, stateSetter] = __jsenv_default_import__.useState();
        __jsenv_default_import__.useEffect(() => {
          return listen(stateSetter);
        }, []);
        return state;
      };
      DiceOnGoing = _ref => {
        let {
          rolledAreaRef,
          offscreenRef,
          diceOverRolledAreaListener
        } = _ref;
        const diceOverRolledArea = useSignalState(diceOverRolledAreaListener);
        return /*#__PURE__*/jsxs("div", {
          className: "dice-ongoing",
          children: [/*#__PURE__*/jsx("div", {
            className: "map"
          }), /*#__PURE__*/jsx("div", {
            className: "area",
            ref: rolledAreaRef,
            style: _objectSpread2({}, diceOverRolledArea ? {
              outline: "2px dotted"
            } : {})
          }), /*#__PURE__*/jsx("div", {
            className: "offscreen-area",
            ref: offscreenRef
          })]
        });
      };
      startJavaScriptAnimation = _ref => {
        let {
          duration = 300,
          timingFunction = t => t,
          // https://easings.net/
          onProgress = () => {},
          onCancel = () => {},
          onComplete = () => {}
        } = _ref;
        if (isNaN(duration)) {
          console.warn(`duration must be a number, received ${duration}`);
          return () => {};
        }
        duration = parseInt(duration, 10);
        const startMs = performance.now();
        let currentRequestAnimationFrameId;
        let done = false;
        let rawProgress = 0;
        let progress = 0;
        const handler = () => {
          currentRequestAnimationFrameId = null;
          const nowMs = performance.now();
          rawProgress = Math.min((nowMs - startMs) / duration, 1);
          progress = timingFunction(rawProgress);
          done = rawProgress === 1;
          onProgress({
            done,
            rawProgress,
            progress
          });
          if (done) {
            onComplete();
          } else {
            currentRequestAnimationFrameId = window.requestAnimationFrame(handler);
          }
        };
        handler();
        const stop = () => {
          if (currentRequestAnimationFrameId) {
            window.cancelAnimationFrame(currentRequestAnimationFrameId);
            currentRequestAnimationFrameId = null;
          }
          if (!done) {
            done = true;
            onCancel({
              rawProgress,
              progress
            });
          }
        };
        return stop;
      }; // https://usehooks.com/useAnimation/
      useAnimateTransitionUsingJs = function useAnimateTransitionUsingJs(value) {
        let {
          duration = 300,
          timingFunction,
          condition
        } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        const [animatedValue, animatedValueSetter] = __jsenv_default_import__.useState(null);
        useAnimateTransition(value, (from, to) => {
          animatedValueSetter({
            value: from
          });
          return startJavaScriptAnimation({
            duration,
            timingFunction,
            onProgress: _ref => {
              let {
                progress
              } = _ref;
              const value = Math.round(from + (to - from) * progress);
              animatedValueSetter({
                value
              });
            },
            onComplete: () => {
              animatedValueSetter(null);
            }
          });
        }, {
          condition
        });
        return animatedValue;
      };
      useAnimateTransition = function useAnimateTransition(value, animate) {
        let {
          condition = () => true
        } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        const [transition, transitionSetter] = __jsenv_default_import__.useState(null);
        const valuePrevious = usePrevious(value);
        __jsenv_default_import__.useEffect(() => {
          if (valuePrevious !== value && condition(value, valuePrevious)) {
            transitionSetter({
              from: valuePrevious,
              to: value
            });
          }
        }, [valuePrevious, value]);
        __jsenv_default_import__.useEffect(() => {
          if (transition) {
            return animate(transition.from, transition.to);
          }
          return () => {};
        }, [transition]);
      };
      ValueWithAnimatedTransition = _ref => {
        let {
          value,
          duration,
          condition
        } = _ref;
        const animatedValue = useAnimateTransitionUsingJs(value, {
          duration,
          condition
        });
        return animatedValue ? animatedValue.value : value;
      };
      _excluded$4 = ["useCount"];
      _excluded2$1 = ["useCount"];
      Stylesheet = _ref => {
        let {
          href,
          onLoad = () => {}
        } = _ref;
        const [fetchStart, fetchEnd] = useUrlLoadingNotifier(href);
        __jsenv_default_import__.useEffect(() => {
          fetchStart();
          return injectStylesheetIntoDocument(href, {
            onload: () => {
              fetchEnd();
              onLoad();
            }
          });
        }, [href]);
        return null;
      };
      memoizeLinksByHref = fn => {
        const linkMap = new Map();
        const stopUsing = href => {
          if (!linkMap.has(href)) {
            return;
          }
          const _linkMap$get = linkMap.get(href),
            {
              useCount
            } = _linkMap$get,
            rest = _objectWithoutProperties(_linkMap$get, _excluded$4);
          if (useCount > 1) {
            linkMap.set(href, _objectSpread2({
              useCount: useCount - 1
            }, rest));
            return;
          }
          linkMap.delete(href);
          rest.linkCleanup();
        };
        return function (href) {
          if (linkMap.has(href)) {
            const _linkMap$get2 = linkMap.get(href),
              {
                useCount
              } = _linkMap$get2,
              rest = _objectWithoutProperties(_linkMap$get2, _excluded2$1);
            linkMap.set(href, _objectSpread2({
              useCount: useCount + 1
            }, rest));
            return stopUsing;
          }
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          const linkCleanup = fn(href, ...args);
          linkMap.set(href, {
            useCount: 1,
            linkCleanup
          });
          return stopUsing;
        };
      };
      injectStylesheetIntoDocument = memoizeLinksByHref(function (href) {
        let {
          onload = () => {}
        } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        const removeLoadedListener = addLoadedListener(link, onload);
        link.href = href;
        document.head.appendChild(link);
        return () => {
          removeLoadedListener();
          document.head.removeChild(link);
        };
      });
      findFirstDescendant = (rootNode, fn) => {
        const iterator = createNextNodeIterator(rootNode, rootNode);
        let {
          done,
          value: node
        } = iterator.next();
        while (done === false) {
          if (fn(node)) {
            return node;
          }
          ({
            done,
            value: node
          } = iterator.next());
        }
        return null;
      };
      findLastDescendant = (rootNode, fn) => {
        const deepestNode = getDeepestNode(rootNode);
        if (deepestNode) {
          const iterator = createPreviousNodeIterator(deepestNode, rootNode);
          let {
            done,
            value: node
          } = iterator.next();
          while (done === false) {
            if (fn(node)) {
              return node;
            }
            ({
              done,
              value: node
            } = iterator.next());
          }
        }
        return null;
      };
      findAfter = _ref => {
        let {
          from,
          root = null,
          predicate,
          skipChildren = false
        } = _ref;
        const iterator = createAfterNodeIterator(from, root, skipChildren);
        let {
          done,
          value: node
        } = iterator.next();
        while (done === false) {
          if (predicate(node)) {
            return node;
          }
          ({
            done,
            value: node
          } = iterator.next());
        }
        return null;
      };
      findBefore = _ref2 => {
        let {
          from,
          root = null,
          predicate
        } = _ref2;
        const iterator = createPreviousNodeIterator(from, root);
        let {
          done,
          value: node
        } = iterator.next();
        while (done === false) {
          if (predicate(node)) {
            return node;
          }
          ({
            done,
            value: node
          } = iterator.next());
        }
        return null;
      };
      getNextNode = function getNextNode(node, rootNode) {
        let skipChild = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (!skipChild) {
          const firstChild = node.firstChild;
          if (firstChild) {
            return firstChild;
          }
        }
        const nextSibling = node.nextSibling;
        if (nextSibling) {
          return nextSibling;
        }
        const parentNode = node.parentNode;
        if (parentNode && parentNode !== rootNode) {
          return getNextNode(parentNode, rootNode, true);
        }
        return null;
      };
      createNextNodeIterator = (node, rootNode) => {
        let current = node;
        const next = () => {
          const nextNode = getNextNode(current, rootNode);
          current = nextNode;
          return {
            done: Boolean(nextNode) === false,
            value: nextNode
          };
        };
        return {
          next
        };
      };
      createAfterNodeIterator = function createAfterNodeIterator(fromNode, rootNode) {
        let skipChildren = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        let current = fromNode;
        let childrenSkipped = false;
        const next = () => {
          const nextNode = getNextNode(current, rootNode, skipChildren && childrenSkipped === false);
          childrenSkipped = true;
          current = nextNode;
          return {
            done: Boolean(nextNode) === false,
            value: nextNode
          };
        };
        return {
          next
        };
      };
      getDeepestNode = node => {
        let deepestNode = node.lastChild;
        while (deepestNode) {
          const lastChild = deepestNode.lastChild;
          if (lastChild) {
            deepestNode = lastChild;
          } else {
            break;
          }
        }
        return deepestNode;
      };
      getPreviousNode = (node, rootNode) => {
        const previousSibling = node.previousSibling;
        if (previousSibling) {
          const deepestChild = getDeepestNode(previousSibling);
          if (deepestChild) {
            return deepestChild;
          }
          return previousSibling;
        }
        if (node !== rootNode) {
          const parentNode = node.parentNode;
          if (parentNode && parentNode !== rootNode) {
            return parentNode;
          }
        }
        return null;
      };
      createPreviousNodeIterator = (fromNode, rootNode) => {
        let current = fromNode;
        const next = () => {
          const previousNode = getPreviousNode(current, rootNode);
          current = previousNode;
          return {
            done: Boolean(previousNode) === false,
            value: previousNode
          };
        };
        return {
          next
        };
      };
      firstFocusableDescendantOrSelf = element => {
        const firstFocusableDescendant = findFirstDescendant(element, isFocusable);
        if (firstFocusableDescendant) return firstFocusableDescendant;
        if (isFocusable(element)) return element;
        return null;
      };
      trapFocusInside = element => {
        if (element.nodeType === 3) {
          console.warn("cannot trap focus inside a text node");
          return () => {};
        }
        const trappedElement = activeTraps.find(activeTrap => activeTrap.element === element);
        if (trappedElement) {
          console.warn("focus already trapped inside this element");
          return () => {};
        }
        const isEventOutside = event => {
          if (event.target === element) return false;
          if (element.contains(event.target)) return false;
          return true;
        };
        const getFirstTabbable = () => findFirstDescendant(element, isDiscoverableWithKeyboard);
        const getLastTabbable = () => findLastDescendant(element, isDiscoverableWithKeyboard);
        const getPreviousTabbableOrLast = () => {
          const previous = findBefore({
            from: document.activeElement,
            root: element,
            predicate: isDiscoverableWithKeyboard
          });
          return previous || getLastTabbable();
        };
        const getNextTabbableOrFirst = () => {
          const next = findAfter({
            from: document.activeElement,
            root: element,
            predicate: isDiscoverableWithKeyboard
          });
          return next || getFirstTabbable();
        };
        const performTabEventNavigation = event => {
          const activeElement = document.activeElement;
          const activeElementIsBody = activeElement === document.body;
          if (event.shiftKey) {
            const elementToFocus = activeElementIsBody ? getLastTabbable() : getPreviousTabbableOrLast();
            if (elementToFocus) {
              elementToFocus.focus();
            }
          } else {
            const elementToFocus = activeElementIsBody ? getFirstTabbable() : getNextTabbableOrFirst();
            if (elementToFocus) {
              elementToFocus.focus();
            }
          }
        };
        const lock = () => {
          const onmousedown = event => {
            if (isEventOutside(event)) {
              event.preventDefault();
              event.stopImmediatePropagation();
            }
          };
          const onkeydown = event => {
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
          return () => {
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
        const deactivate = activate({
          element,
          lock
        });
        const untrap = () => {
          deactivate();
        };
        return untrap;
      };
      hasNegativeTabIndex = element => {
        return element.hasAttribute && element.hasAttribute("tabIndex") && Number(element.getAttribute("tabindex")) < 0;
      };
      isDiscoverableWithKeyboard = element => {
        if (hasNegativeTabIndex(element)) {
          return false;
        }
        return isFocusable(element);
      };
      isTabEvent = event => event.key === "Tab" || event.keyCode === 9;
      activeTraps = [];
      activate = _ref => {
        let {
          lock
        } = _ref;
        // unlock any trap currently activated
        let previousTrap;
        if (activeTraps.length > 0) {
          previousTrap = activeTraps[activeTraps.length - 1];
          previousTrap.unlock();
        }

        // store trap methods to lock/unlock as traps are acivated/deactivated
        const trap = {
          lock,
          unlock: lock()
        };
        activeTraps.push(trap);
        return () => {
          if (activeTraps.length === 0) {
            console.warn("cannot deactivate an already deactivated trap");
            return;
          }
          const lastTrap = activeTraps[activeTraps.length - 1];
          if (trap !== lastTrap) {
            // TODO: investigate this and maybe remove this requirment
            console.warn("you must deactivate trap in the same order they were activated");
            return;
          }
          activeTraps.pop();
          trap.unlock();
          // if any,reactivate the previous trap
          if (previousTrap) {
            previousTrap.unlock = previousTrap.lock();
          }
        };
      };
      trapScrollInside = element => {
        const elementsToScrollLock = [];
        let previous = element.previousSibling;
        while (previous) {
          if (previous.nodeType === 1) {
            if (isScrollable(previous)) {
              elementsToScrollLock.push(previous);
            }
          }
          previous = previous.previousSibling;
        }
        const scrollableParents = getAllScrollableParent(element);
        elementsToScrollLock.push(...scrollableParents);
        const cleanUpArray = elementsToScrollLock.map(element => {
          const prev = element.style.overflow;
          element.style.overflow = "hidden";
          return () => {
            if (prev) {
              element.style.overflow = prev;
            } else {
              element.style.removeProperty("overflow");
            }
          };
        });
        return () => {
          cleanUpArray.forEach(cleanup => {
            cleanup();
          });
        };
      };
      getAllScrollableParent = element => {
        const scrollableParents = [];
        const visitElement = elementOrScrollableParent => {
          const scrollableParent = getScrollableParent(elementOrScrollableParent);
          if (scrollableParent) {
            scrollableParents.push(scrollableParent);
            if (scrollableParent === document) {
              return;
            }
            visitElement(scrollableParent);
          }
        };
        visitElement(element);
        return scrollableParents;
      };
      getScrollableParent = arg => {
        if (typeof arg !== "object" || arg.nodeType !== 1) {
          throw new TypeError("getScrollableParent first argument must be DOM node");
        }
        const element = arg;
        if (element === document.documentElement) {
          return null;
        }
        const position = getStyleValue(element, "position");
        if (position === "fixed") {
          return getScrollingElement(element.ownerDocument);
        }
        return findScrollableParent(element) || getScrollingElement(element.ownerDocument);
      };
      getScrollingElement = document => {
        if ("scrollingElement" in document) {
          return document.scrollingElement;
        }
        if (isCompliant(document)) {
          return document.documentElement;
        }
        const body = document.body;
        const isFrameset = body && !/body/i.test(body.tagName);
        const possiblyScrollingElement = isFrameset ? getNextBodyElement(body) : body;

        // If `body` is itself scrollable, it is not the `scrollingElement`.
        return possiblyScrollingElement && bodyIsScrollable(possiblyScrollingElement) ? null : possiblyScrollingElement;
      };
      getNextBodyElement = frameset => {
        // We use this function to be correct per spec in case `document.body` is
        // a `frameset` but there exists a later `body`. Since `document.body` is
        // a `frameset`, we know the root is an `html`, and there was no `body`
        // before the `frameset`, so we just need to look at siblings after the
        // `frameset`.
        let current = frameset;
        while (current = current.nextSibling) {
          if (current.nodeType === 1 && isBodyElement(current)) {
            return current;
          }
        }
        return null;
      };
      isBodyElement = element => element.ownerDocument.body === element;
      bodyIsScrollable = body => {
        // a body element is scrollable if body and html are scrollable and rendered
        if (!isScrollable(body)) {
          return false;
        }
        if (isHidden(body)) {
          return false;
        }
        const documentElement = body.ownerDocument.documentElement;
        if (!isScrollable(documentElement)) {
          return false;
        }
        if (isHidden(documentElement)) {
          return false;
        }
        return true;
      };
      isHidden = element => {
        const display = getStyleValue(element, "display");
        if (display === "none") {
          return false;
        }
        if (display === "table-row" || display === "table-group" || display === "table-column") {
          return getStyleValue(element, "visibility") !== "collapsed";
        }
        return true;
      };
      isCompliant = document => {
        // Note: document.compatMode can be toggle at runtime by document.write
        const isStandardsMode = /^CSS1/.test(document.compatMode);
        if (isStandardsMode) {
          return testScrollCompliance(document);
        }
        return false;
      };
      testScrollCompliance = document => {
        const iframe = document.createElement("iframe");
        iframe.style.height = "1px";
        const parentNode = document.body || document.documentElement || document;
        parentNode.appendChild(iframe);
        const iframeDocument = iframe.contentWindow.document;
        iframeDocument.write('<!DOCTYPE html><div style="height:9999em">x</div>');
        iframeDocument.close();
        const scrollComplianceResult = iframeDocument.documentElement.scrollHeight > iframeDocument.body.scrollHeight;
        iframe.parentNode.removeChild(iframe);
        return scrollComplianceResult;
      };
      isScrollable = element => {
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
      verticalOverflowIsVisible = element => {
        const verticalOverflow = getStyleValue(element, "overflow-x");
        if (verticalOverflow === "visible") {
          return true;
        }
        const overflow = getStyleValue(element, "overflow");
        return overflow === "visible";
      };
      horizontalOverflowIsVisible = element => {
        const horizontalOverflow = getStyleValue(element, "overflow-y");
        if (horizontalOverflow === "visible") {
          return true;
        }
        const overflow = getStyleValue(element, "overflow");
        return overflow === "visible";
      };
      findScrollableParent = element => {
        if (element === document.documentElement) return null;
        const position = getStyleValue(element, "position");
        let parent = element.parentNode;
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
      _excluded$3 = ["container", "insertTop", "insertLeft", "insertRight", "insertBottom", "children", "isOpen", "requestCloseOnEscape", "requestCloseOnClickOutside", "closeMethod", "stealFocus", "restoreStolenFocus", "trapFocus", "onAfterOpen", "onRequestClose", "onFocusIn", "onFocusOut", "backdropProps"];
      _excluded2 = ["onMouseDownActive"];
      dialogBaseCssUrl = new URL(__v__("/css/dialog.base.css"), _context.meta.url);
      ({
        useEffect: useEffect$2
      } = __jsenv_default_import__);
      /**
      https://github.com/reactjs/react-modal
      https://github.com/reactjs/react-modal/blob/master/src/components/ModalPortal.js
      https://fr.reactjs.org/docs/portals.html
      */
      DialogBase = _ref => {
        let {
            container = document.body,
            insertTop,
            insertLeft,
            insertRight,
            insertBottom,
            children,
            isOpen,
            requestCloseOnEscape = true,
            requestCloseOnClickOutside = false,
            // closeMethod can be "visibility-hidden", "hidden-attribute", "dom-remove"
            // ideally we should return null when isOpen is false and the dialog never rendered
            // (to avoid putting the dialog in display none while it might never be used)
            // (but it's too early to know exactly what we want/need)
            closeMethod = "display-none",
            stealFocus = true,
            restoreStolenFocus = true,
            trapFocus = true,
            onAfterOpen = () => {},
            onRequestClose = () => {},
            onFocusIn = () => {},
            onFocusOut = () => {},
            backdropProps = {}
          } = _ref,
          rest = _objectWithoutProperties(_ref, _excluded$3);
        if (!container) return null;
        const [dialogRootNode, dialogRootNodeSetter] = __jsenv_default_import__.useState(null);
        const isInsideDocument = Boolean(dialogRootNode);
        const becomesOpen = useBecomes(isOpenPrevious => !isOpenPrevious && isOpen, [isOpen]);
        if (becomesOpen) {
          onAfterOpen();
        }

        // onFocusIn, onFocusOut implementation
        // https://github.com/facebook/react/issues/6410
        useEffect$2(() => {
          if (!isOpen || !isInsideDocument) return () => {};
          let focusIsInsideDialog = hasOrContainsFocus(dialogRootNode);
          const onDocumentBlur = blurEvent => {
            // focus is leaving the document and it was inside dialog
            if (!blurEvent.relatedTarget) {
              if (focusIsInsideDialog) {
                focusIsInsideDialog = false;
                onFocusOut(blurEvent);
              }
            }
          };
          const onDialogFocus = focusEvent => {
            onFocusIn(focusEvent);
            focusIsInsideDialog = true;
          };
          const onDocumentFocus = focusEvent => {
            if (hasOrContainsFocus(dialogRootNode)) {
              focusIsInsideDialog = true;
            } else {
              focusIsInsideDialog = false;
              onFocusOut(focusEvent);
            }
          };
          dialogRootNode.addEventListener("focus", onDialogFocus, true);
          document.addEventListener("focus", onDocumentFocus, true);
          document.addEventListener("blur", onDocumentBlur, true);
          return () => {
            dialogRootNode.removeEventListener("focus", onDialogFocus, true);
            document.removeEventListener("focus", onDocumentFocus, true);
            document.removeEventListener("blur", onDocumentBlur, true);
          };
        }, [isOpen, isInsideDocument, onFocusIn, onFocusOut]);

        // trap scroll inside dialog
        useEffect$2(() => {
          if (!isOpen || !isInsideDocument) {
            return () => {};
          }
          return trapScrollInside(dialogRootNode);
        }, [isOpen, isInsideDocument]);

        // trap focus inside dialog
        useEffect$2(() => {
          if (!isOpen || !isInsideDocument || !trapFocus) return () => {};
          return trapFocusInside(dialogRootNode);
        }, [isOpen, isInsideDocument, trapFocus]);

        // steal focus to move it into dialog when it opens
        useEffect$2(() => {
          if (!isOpen || !isInsideDocument || !stealFocus) return () => {};
          const nodeFocusedBeforeTransfer = document.activeElement;
          const firstFocusableElement = firstFocusableDescendantOrSelf(dialogRootNode);
          if (firstFocusableElement) {
            firstFocusableElement.focus({
              preventScroll: true
            });
          }
          return () => {
            if (firstFocusableElement) {
              if (typeof restoreStolenFocus === "function") {
                restoreStolenFocus(nodeFocusedBeforeTransfer);
              } else if (restoreStolenFocus === true) {
                nodeFocusedBeforeTransfer.focus({
                  preventScroll: true
                });
              }
            }
          };
        }, [isOpen, isInsideDocument, stealFocus]);

        // put aria-hidden on elements behind this dialog
        useEffect$2(() => {
          if (!isOpen || !dialogRootNode || !dialogRootNode.parentNode) return () => {};
          const elementsToHide = [];
          /*
          we hide previous and next siblings
          because when dialog is opened everything around it should be considered
          hidden (you cannot have several modal visible at the same time).
           Let's keep in mind we are talking about a dialog in the accessibility terms.
          It should focus trap, prevent interaction with the rest of the page
          and consider the rest as hidden.
          This dialog is not meant to be used for tooltip and so on.
          */
          const parentChildren = Array.from(dialogRootNode.parentNode.children);
          parentChildren.forEach(child => {
            if (child !== dialogRootNode) {
              elementsToHide.push(child);
            }
          });
          elementsToHide.forEach(element => {
            element.setAttribute("aria-hidden", "true");
          });
          return () => {
            elementsToHide.forEach(element => {
              element.removeAttribute("aria-hidden", "true");
            });
          };
        }, [isOpen, dialogRootNode]);
        if (closeMethod === "dom-remove" && !isOpen) {
          return null;
        }
        return __jsenv_default_import__$1.createPortal( /*#__PURE__*/jsxs("div", _objectSpread2(_objectSpread2({}, rest), {}, {
          role: "dialog",
          className: `dialog--root${rest.className ? ` ${rest.className}` : ""}`,
          ref: element => {
            dialogRootNodeSetter(element);
            if (rest.ref) rest.ref(element);
          },
          onKeyDown: keydownEvent => {
            if (requestCloseOnEscape && keydownEvent.keyCode === ESC_KEY) {
              onRequestClose(keydownEvent);
            }
            if (rest.onKeyDown) rest.onKeyDown(keydownEvent);
          },
          tabIndex: "-1",
          style: _objectSpread2(_objectSpread2({}, closeMethod === "display-none" && !isOpen ? {
            display: "none"
          } : {}), closeMethod === "visibility-hidden" && !isOpen ? {
            visibility: "hidden"
          } : {}),
          hidden: closeMethod === "hidden-attribute" && !isOpen ? true : undefined,
          children: [/*#__PURE__*/jsx(Stylesheet, {
            href: dialogBaseCssUrl
          }), isOpen ? /*#__PURE__*/jsx(DialogBackDrop, _objectSpread2(_objectSpread2({}, backdropProps), {}, {
            className: "dialog--backdrop"
            // mousedown on backdrop -> transfer focus to dialog
            ,

            onMouseDownActive: mousedownEvent => {
              // prevent mousedown on backdrop from putting focus on document.body
              mousedownEvent.preventDefault();
              // instead foward focus to the dialog if not already inside
              if (!hasOrContainsFocus(dialogRootNode)) {
                const firstFocusableElement = firstFocusableDescendantOrSelf(dialogRootNode);
                if (firstFocusableElement) {
                  firstFocusableElement.focus({
                    preventScroll: true
                  });
                }
              }
            },
            onClick: clickEvent => {
              // I wonder if we should clickEvent.stopPropagation()
              // because back drop is also there to shallow click interaction
              // it would prevent the click event from bubbling and creates the potential
              // --- click-no-effect-scenario --- described at the top of this file.
              if (requestCloseOnClickOutside) {
                onRequestClose(clickEvent);
              }
              if (backdropProps.onClick) backdropProps.onClick(clickEvent);
            }
          })) : null, /*#__PURE__*/jsxs("div", {
            className: "dialog--document",
            children: [/*#__PURE__*/jsx("div", {
              className: "dialog--insert-top",
              children: insertTop
            }), /*#__PURE__*/jsxs("div", {
              className: "dialog--main",
              children: [/*#__PURE__*/jsx("div", {
                className: "dialog--insert-left",
                children: insertLeft
              }), /*#__PURE__*/jsx("div", {
                className: "dialog--scrollable-content",
                children: children
              }), /*#__PURE__*/jsx("div", {
                className: "dialog--insert-right",
                children: insertRight
              })]
            }), /*#__PURE__*/jsx("div", {
              className: "dialog--insert-bottom",
              children: insertBottom
            })]
          })]
        })), container);
      };
      DialogBackDrop = _ref2 => {
        let {
            onMouseDownActive
          } = _ref2,
          props = _objectWithoutProperties(_ref2, _excluded2);
        const [backdropElement, setBackdropElement] = __jsenv_default_import__.useState(null);
        useEffect$2(() => {
          if (!backdropElement) return () => {};
          backdropElement.addEventListener("mousedown", onMouseDownActive, {
            passive: false
          });
          return () => {
            backdropElement.removeEventListener("mousedown", onMouseDownActive, {
              passive: false
            });
          };
        }, [backdropElement]);
        return /*#__PURE__*/jsx("div", _objectSpread2({
          ref: element => {
            setBackdropElement(element);
            if (props.ref) props.ref(element);
          }
        }, props));
      };
      hasOrContainsFocus = element => {
        const {
          activeElement
        } = document;
        return element === activeElement || element.contains(activeElement);
      };
      ESC_KEY = 27;
      dialogCssUrl = new URL(__v__("/css/dialog.css"), _context.meta.url);
      Dialog = props => {
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx(Stylesheet, {
            href: dialogCssUrl
          }), /*#__PURE__*/jsx(DialogBase, _objectSpread2({
            container: useMainDomNode()
          }, props))]
        });
      };
      useDialogState = function useDialogState() {
        let initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        const [dialogIsOpen, setDialogIsOpen] = __jsenv_default_import__.useState(initialValue);
        const openDialog = () => {
          setDialogIsOpen(true);
        };
        const closeDialog = () => {
          setDialogIsOpen(false);
        };
        return [dialogIsOpen, openDialog, closeDialog];
      };
      StarRain = () => {
        return /*#__PURE__*/jsxs("div", {
          className: "star-rain-container",
          children: [/*#__PURE__*/jsx("div", {
            className: "star",
            id: "star-01",
            children: /*#__PURE__*/jsx(Star, {})
          }), /*#__PURE__*/jsx("div", {
            className: "star",
            id: "star-02",
            children: /*#__PURE__*/jsx(Star, {})
          }), /*#__PURE__*/jsx("div", {
            className: "star",
            id: "star-03",
            children: /*#__PURE__*/jsx(Star, {})
          }), /*#__PURE__*/jsx("div", {
            className: "star",
            id: "star-04",
            children: /*#__PURE__*/jsx(Star, {})
          }), /*#__PURE__*/jsx("div", {
            className: "star",
            id: "star-05",
            children: /*#__PURE__*/jsx(Star, {})
          }), /*#__PURE__*/jsx("div", {
            className: "star",
            id: "star-06",
            children: /*#__PURE__*/jsx(Star, {})
          })]
        });
      };
      Star = () => /*#__PURE__*/jsx("svg", {
        viewBox: "0 0 217.791 210.633",
        children: /*#__PURE__*/jsx("path", {
          fill: "#FFFFE6",
          d: "M94.15,77.97c0,0-2-54,10-73.5s23,28.5,25.5,72.5c0,0,69.197,4.589,86.5,21c13.637,12.934-61.5,31-87,33.5 c-2,14.5-1.831,60.464-16.5,75.5c-20,20.5-25.5-50.5-23-78c-19-1.5-81.5-3.5-89-17.5S52.15,85.97,94.15,77.97z"
        })
      });
      CloseIcon = () => /*#__PURE__*/jsx("svg", {
        viewBox: "0 0 320 512",
        width: "32",
        height: "32",
        children: /*#__PURE__*/jsx("path", {
          fill: "currentColor",
          d: "M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
        })
      });
      _excluded$2 = ["title", "spacingClasses", "children"];
      DialogWood = _ref => {
        let {
            title,
            spacingClasses,
            children
          } = _ref,
          props = _objectWithoutProperties(_ref, _excluded$2);
        return /*#__PURE__*/jsx(Dialog, _objectSpread2(_objectSpread2({
          requestCloseOnClickOutside: true,
          insertTop: /*#__PURE__*/jsxs(Fragment, {
            children: [/*#__PURE__*/jsx("div", {
              className: "dialog-border-top"
            }), /*#__PURE__*/jsx("div", {
              className: "dialog-title",
              children: /*#__PURE__*/jsx("div", {
                className: "dialog-title-text",
                children: title
              })
            }), /*#__PURE__*/jsx("div", {
              className: "dialog-close",
              onClick: props.onRequestClose,
              children: /*#__PURE__*/jsx(CloseIcon, {})
            })]
          }),
          insertBottom: /*#__PURE__*/jsx("div", {
            className: "dialog-border-bottom"
          }),
          insertLeft: /*#__PURE__*/jsx("div", {
            className: "dialog-border-left"
          }),
          insertRight: /*#__PURE__*/jsx("div", {
            className: "dialog-border-right"
          })
        }, props), {}, {
          className: `dialog-theme-wood ${spacingClasses || "dialog-spacing-10 dialog-spacing-fluid dialog-spacing-top-fixed"} ${props.className}`,
          children: children
        }));
      };
      RoundScoreRulesDialog = _ref => {
        let {
          dialogIsOpen,
          closeDialog
        } = _ref;
        return /*#__PURE__*/jsx(DialogWood, {
          className: "score-rules-dialog",
          isOpen: dialogIsOpen,
          onRequestClose: closeDialog,
          requestCloseOnClickOutside: true,
          title: "Score",
          spacingClasses: "dialog-spacing-10 dialog-spacing-fixed",
          children: /*#__PURE__*/jsxs(Fragment, {
            children: [/*#__PURE__*/jsxs("div", {
              className: "dialog-box",
              children: [/*#__PURE__*/jsx("div", {
                className: "dialog-label",
                children: "Combinaisons de d\xE9s"
              }), /*#__PURE__*/jsxs("div", {
                className: "columns",
                children: [/*#__PURE__*/jsxs("div", {
                  className: "column",
                  children: [/*#__PURE__*/jsx("div", {
                    className: "column-title",
                    children: "Symbols identiques"
                  }), /*#__PURE__*/jsx("span", {
                    className: "symbol-number",
                    children: "Combo 3"
                  }), /*#__PURE__*/jsx("span", {
                    className: "symbol-number",
                    children: "Combo 4"
                  }), /*#__PURE__*/jsx("span", {
                    className: "symbol-number",
                    children: "Combo 5"
                  }), /*#__PURE__*/jsx("span", {
                    className: "symbol-number",
                    children: "Combo 6"
                  }), /*#__PURE__*/jsx("span", {
                    className: "symbol-number",
                    children: "Combo 7"
                  }), /*#__PURE__*/jsx("span", {
                    className: "symbol-number",
                    children: "Combo 8"
                  })]
                }), /*#__PURE__*/jsxs("div", {
                  className: "column",
                  children: [/*#__PURE__*/jsx("div", {
                    className: "column-title",
                    children: "Points"
                  }), /*#__PURE__*/jsx("span", {
                    className: "points",
                    children: "100"
                  }), /*#__PURE__*/jsx("span", {
                    className: "points",
                    children: "200"
                  }), /*#__PURE__*/jsx("span", {
                    className: "points",
                    children: "500"
                  }), /*#__PURE__*/jsx("span", {
                    className: "points",
                    children: "1000"
                  }), /*#__PURE__*/jsx("span", {
                    className: "points",
                    children: "2000"
                  }), /*#__PURE__*/jsx("span", {
                    className: "points",
                    children: "4000"
                  })]
                })]
              })]
            }), /*#__PURE__*/jsxs("div", {
              className: "dialog-box",
              children: [/*#__PURE__*/jsx("div", {
                className: "dialog-label",
                children: "D\xE9s sp\xE9ciaux"
              }), /*#__PURE__*/jsxs("div", {
                className: "columns",
                children: [/*#__PURE__*/jsxs("div", {
                  className: "column",
                  children: [/*#__PURE__*/jsx("div", {
                    className: "column-title",
                    children: "Symbol"
                  }), /*#__PURE__*/jsx(Image, {
                    src: symbolCoinUrl
                  }), /*#__PURE__*/jsx(Image, {
                    src: symbolDiamondUrl
                  })]
                }), /*#__PURE__*/jsxs("div", {
                  className: "column",
                  children: [/*#__PURE__*/jsx("div", {
                    className: "column-title",
                    children: "Points"
                  }), /*#__PURE__*/jsx("span", {
                    className: "points",
                    children: "100"
                  }), /*#__PURE__*/jsx("span", {
                    className: "points",
                    children: "100"
                  })]
                })]
              })]
            }), /*#__PURE__*/jsxs("div", {
              className: "dialog-box last",
              children: [/*#__PURE__*/jsx("div", {
                className: "dialog-label",
                children: "Bonus coffre parfait"
              }), /*#__PURE__*/jsxs("div", {
                className: "columns",
                children: [/*#__PURE__*/jsxs("div", {
                  className: "column",
                  children: [/*#__PURE__*/jsx("div", {
                    className: "column-title",
                    children: "D\xE9s utilis\xE9s"
                  }), /*#__PURE__*/jsx("span", {
                    className: "symbol-number",
                    children: "8"
                  })]
                }), /*#__PURE__*/jsxs("div", {
                  className: "column",
                  children: [/*#__PURE__*/jsx("div", {
                    className: "column-title",
                    children: "Points"
                  }), /*#__PURE__*/jsx("span", {
                    className: "points",
                    children: "500"
                  })]
                })]
              })]
            })]
          })
        });
      };
      _excluded$1 = ["id", "value"];
      useScoreParticles = function useScoreParticles() {
        let {
          totalScore = 0,
          onScoreParticleAdded = () => {},
          onScoreParticleRemoved = () => {},
          onScoreParticleMerged = () => {}
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        const [score, scoreSetter] = __jsenv_default_import__.useState(totalScore);
        const [scoreParticles, scoreParticlesSetter] = __jsenv_default_import__.useState([]);
        __jsenv_default_import__.useEffect(() => {
          scoreSetter(totalScore);
        }, [totalScore]);
        const addScoreParticleToState = scoreParticle => {
          // scoreParticlesSetter([...scoreParticles, scoreParticle])
          // return () => {
          //   scoreParticlesSetter(
          //     scoreParticles.filter((scoreParticleCandidate) => scoreParticleCandidate !== scoreParticle),
          //   )
          // }
          scoreParticlesSetter(scoreParticles => {
            const scoreParticlesWithParticle = [...scoreParticles, scoreParticle];
            return scoreParticlesWithParticle;
          });
          onScoreParticleAdded(scoreParticle);
          let removed = false;
          return () => {
            if (removed) return;
            removed = true;
            scoreParticlesSetter(scoreParticles => {
              const scoreParticlesWithoutParticle = scoreParticles.filter(scoreParticleCandidate => scoreParticleCandidate !== scoreParticle);
              return scoreParticlesWithoutParticle;
            });
            scoreSetter(score => score - scoreParticle.value);
            onScoreParticleRemoved(scoreParticle);
          };
        };
        const addScoreParticle = _ref => {
          let {
              id,
              value
            } = _ref,
            rest = _objectWithoutProperties(_ref, _excluded$1);
          const scoreParticle = _objectSpread2(_objectSpread2({
            id,
            value
          }, rest), {}, {
            oncancel: () => {
              // not really needed as long as code calling addScoreParticle
              // does it in a useEffect and returns removeScoreParticleFromState
              removeScoreParticleFromState();
            },
            onfinish: () => {
              removeScoreParticleFromState();
              onScoreParticleMerged(scoreParticle);
              scoreSetter(score => score + value);
            }
          });
          const removeScoreParticleFromState = addScoreParticleToState(scoreParticle);
          return removeScoreParticleFromState;
        };
        const scoreInParticles = scoreParticles.reduce((previous, particle) => previous + particle.value, 0);
        const scoreDisplayed = score - scoreInParticles;
        return [scoreParticles, addScoreParticle, scoreDisplayed];
      };
      rotatePoint = (origin, point, degrees) => {
        const radians = degreesToRadians(degrees);
        const cosinus = Math.cos(radians);
        const sinus = Math.sin(radians);
        const run = point.x - origin.x;
        const rise = point.y - origin.y;
        return {
          x: Math.round(cosinus * run + sinus * rise + origin.x),
          y: Math.round(cosinus * rise - sinus * run + origin.y)
        };
      };
      getDistanceBetweenTwoPoints = (firstPoint, secondPoint) => {
        const horizontalDiff = firstPoint.x - secondPoint.x;
        const verticalDiff = firstPoint.y - secondPoint.y;
        return Math.sqrt(horizontalDiff * horizontalDiff + verticalDiff * verticalDiff);
      };
      getRectangleCenterPoint$1 = _ref => {
        let [topLeft, topRight, bottomRight, bottomLeft] = _ref;
        return {
          x: (topLeft.x + topRight.x + bottomRight.x + bottomLeft.x) / 4,
          y: (topLeft.y + topRight.y + bottomRight.y + bottomLeft.y) / 4
        };
      };
      rotateRectangle = function rotateRectangle(points, degree) {
        let origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getRectangleCenterPoint$1(points);
        return points.map(point => rotatePoint(origin, point, degree));
      };
      degreesToRadians = degrees => degrees * Math.PI / 180; // https://github.com/davidfig/intersects/blob/master/lineToLine.js
      lineCollidesWithLine = (_ref2, _ref3) => {
        let [firstLineStartPoint, firstLineEndPoint] = _ref2;
        let [secondLineStartPoint, secondLineEndPoint] = _ref3;
        let unknownA = (secondLineEndPoint.x - secondLineStartPoint.x) * (firstLineStartPoint.y - secondLineStartPoint.y) - (secondLineEndPoint.y - secondLineStartPoint.y) * (firstLineStartPoint.x - secondLineStartPoint.x);
        let unknownB = (firstLineEndPoint.x - firstLineStartPoint.x) * (firstLineStartPoint.y - secondLineStartPoint.y) - (firstLineEndPoint.y - firstLineStartPoint.y) * (firstLineStartPoint.x - secondLineStartPoint.x);
        const denominator = (secondLineEndPoint.y - secondLineStartPoint.y) * (firstLineEndPoint.x - firstLineStartPoint.x) - (secondLineEndPoint.x - secondLineStartPoint.x) * (firstLineEndPoint.y - firstLineStartPoint.y);

        // Test if Coincident
        // If the denominator and numerator for the ua and ub are 0
        // then the two lines are coincident.
        if (unknownA === 0 && unknownB === 0 && denominator === 0) {
          return false;
        }

        // Test if Parallel
        // If the denominator for the equations for ua and ub is 0
        // then the two lines are parallel.
        if (denominator === 0) {
          return false;
        }

        // test if line segments are colliding
        unknownA /= denominator;
        unknownB /= denominator;
        const isIntersecting = unknownA >= 0 && unknownA <= 1 && unknownB >= 0 && unknownB <= 1;
        return isIntersecting;
      };
      rotatedRectangleCollidesWithRotatedRectangle = (firstRotatedRectangle, secondRotatedRectangle) => someRectangleSideLine(firstRotatedRectangle, firstRotatedRectangleSideLine => lineCollidesWithRectangle(firstRotatedRectangleSideLine, secondRotatedRectangle)); // https://riptutorial.com/html5-canvas/example/17710/are-line-segment-and-rectangle-colliding-
      lineCollidesWithRectangle = (line, rectangle) => {
        const lineIntersects = someRectangleSideLine(rectangle, rectangleSideLine => lineCollidesWithLine(line, rectangleSideLine));
        if (lineIntersects) return true;
        // TODO: here we should check if line is contained inside the rectangle because in that case
        // it's not intersecting but it's colliding
        return false;
      };
      someRectangleSideLine = (_ref4, predicate) => {
        let [firstPoint, secondPoint, thirdPoint, fourthPoint] = _ref4;
        const rectangleFirstLine = [firstPoint, secondPoint];
        if (predicate(rectangleFirstLine)) return true;
        const rectangleSecondLine = [secondPoint, thirdPoint];
        if (predicate(rectangleSecondLine)) return true;
        const rectangleThirdLine = [thirdPoint, fourthPoint];
        if (predicate(rectangleThirdLine)) return true;
        const rectangleFourthLine = [fourthPoint, firstPoint];
        if (predicate(rectangleFourthLine)) return true;
        return false;
      }; // https://github.com/infusion/Rectangles.js/blob/master/rectangles.js
      rectangleCollidesWithRectangle = (firstRectangle, secondRectangle) => {
        // first left of second
        if (firstRectangle.right <= secondRectangle.left) return false;
        // first right of second
        if (firstRectangle.left >= secondRectangle.right) return false;
        // first above second
        if (firstRectangle.bottom <= secondRectangle.top) return false;
        // first below second
        if (firstRectangle.top >= secondRectangle.bottom) return false;
        return true;
      };
      rectangleInsideOf = (rectangle, parentRectangle) => {
        let left = rectangle.left;
        let right = rectangle.right;
        const width = right - left;
        if (left < parentRectangle.left) {
          left = parentRectangle.left;
          right = left + width;
        } else if (right > parentRectangle.right) {
          left = parentRectangle.right - width;
          right = left + width;
        }
        let top = rectangle.top;
        let bottom = rectangle.bottom;
        const height = bottom - top;
        if (top < parentRectangle.top) {
          top = parentRectangle.top;
          bottom = top + height;
        } else if (bottom > parentRectangle.bottom) {
          top = parentRectangle.bottom - height;
          bottom = top + height;
        }
        return {
          left,
          right,
          top,
          bottom
        };
      };
      rectangleRelativeTo = (rectangle, parentRectangle) => {
        const left = rectangle.left - parentRectangle.left;
        const width = rectangle.right - rectangle.left;
        const right = left + width;
        const top = rectangle.top - parentRectangle.top;
        const height = rectangle.bottom - rectangle.top;
        const bottom = top + height;
        return {
          left,
          right,
          top,
          bottom
        };
      };
      findRectangleCloserToRectangle = (rectangleCandidates, rectangle) => {
        let smallestDistance = getDistanceBetweenRectangles(rectangle, rectangleCandidates[0]);
        return rectangleCandidates.reduce((prev, rectangleCandidate) => {
          const distance = getDistanceBetweenRectangles(rectangle, rectangleCandidate);
          if (distance < smallestDistance) {
            smallestDistance = distance;
            return rectangleCandidate;
          }
          return prev;
        });
      };
      getRectangleCenterPoint = _ref2 => {
        let {
          left,
          right,
          top,
          bottom
        } = _ref2;
        return {
          x: left + (right - left) / 2,
          y: top + (bottom - top) / 2
        };
      };
      getDistanceBetweenRectangles = (firstRectangle, secondRectangle) => {
        const firstRectangleCenterPoint = getRectangleCenterPoint(firstRectangle);
        const secondRectangleCenterPoint = getRectangleCenterPoint(secondRectangle);
        return getDistanceBetweenTwoPoints(firstRectangleCenterPoint, secondRectangleCenterPoint);
      };
      getDomNodeRectangle = domNode => {
        const domNodeRect = domNode.getBoundingClientRect();
        const documentScroll = getDocumentScroll(domNode);
        const left = domNodeRect.left + documentScroll.x;
        const top = domNodeRect.top + documentScroll.y;
        const right = left + domNodeRect.width;
        const bottom = top + domNodeRect.height;
        return {
          left: Math.floor(left),
          top: Math.floor(top),
          right: Math.floor(right),
          bottom: Math.floor(bottom)
        };
      };
      rectangleToRectangleInsideDomNode = (rectangle, domNode) => {
        const domNodeRectangle = getDomNodeRectangle(domNode);
        const rectangleInsideDomNode = rectangleInsideOf(rectangle, domNodeRectangle);
        return rectangleInsideDomNode;
      };
      rectangleRelativeToDomNode = (rectangle, domNode) => {
        const domNodeRectangle = getDomNodeRectangle(domNode);
        const rectangleInsideDomNode = rectangleInsideOf(rectangle, domNodeRectangle);
        const rectangleInsideAndRelative = rectangleRelativeTo(rectangleInsideDomNode, domNodeRectangle);
        return rectangleInsideAndRelative;
      };
      rectangleAbsoluteToDomNode = (rectangle, domNode) => {
        const domNodeRectangle = getDomNodeRectangle(domNode);
        const rectangleWidth = rectangle.right - rectangle.left;
        const rectangleHeight = rectangle.bottom - rectangle.top;
        const rectangleAbsolute = {
          left: domNodeRectangle.left + rectangle.left,
          top: domNodeRectangle.top + rectangle.top,
          right: domNodeRectangle.left + rectangle.left + rectangleWidth,
          bottom: domNodeRectangle.top + rectangle.top + rectangleHeight
        };
        return rectangleAbsolute;
      };
      domNodeCollidesWithRectangle = (domNode, rectangle) => {
        const domNodeRectangle = getDomNodeRectangle(domNode);
        return rectangleCollidesWithRectangle(domNodeRectangle, rectangle);
      };
      findDomNodeClosestToRectangle = (domNodeCandidates, rectangle) => {
        const rectangleCandidates = domNodeCandidates.map(domNodeCandidate => getDomNodeRectangle(domNodeCandidate));
        const closestRectangle = findRectangleCloserToRectangle(rectangleCandidates, rectangle);
        return domNodeCandidates[rectangleCandidates.indexOf(closestRectangle)];
      };
      printPointInDocument = function printPointInDocument(_ref) {
        let {
          x,
          y
        } = _ref;
        let {
          color = "yellow",
          autoRemove = true,
          autoRemoveAfter = 2000
        } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.zIndex = "1000";
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        div.style.width = "5px";
        div.style.height = "5px";
        div.style.background = color;
        div.style.border = "1px solid red";
        document.body.appendChild(div);
        const remove = () => {
          document.body.removeChild(div);
        };
        let autoRemoveTimeout;
        if (autoRemove) {
          autoRemoveTimeout = setTimeout(remove, autoRemoveAfter);
        }
        return () => {
          remove();
          clearTimeout(autoRemoveTimeout);
        };
      };
      RoundScoreParticle = _ref => {
        let {
          totalScoreDomNodeRef,
          scoreParticle,
          animationDelayGetter = () => 0
        } = _ref;
        if (scoreParticle.type === "bonus") {
          return /*#__PURE__*/jsx(ScoreParticleTreasure, {
            totalScoreDomNodeRef: totalScoreDomNodeRef,
            scoreParticle: scoreParticle,
            animationDelayGetter: animationDelayGetter
          });
        }
        if (scoreParticle.type === "combo") {
          return /*#__PURE__*/jsx(ScoreParticleCombo, {
            scoreParticle: scoreParticle,
            animationDelayGetter: animationDelayGetter
          });
        }
        return /*#__PURE__*/jsx(ScoreParticlePerfect, {
          scoreParticle: scoreParticle,
          animationDelayGetter: animationDelayGetter
        });
      };
      ScoreParticleTreasure = _ref2 => {
        let {
          totalScoreDomNodeRef,
          scoreParticle,
          animationDuration = 800,
          animationDelayGetter
        } = _ref2;
        const symbolUrl = symbolToImageUrl(scoreParticle.symbol);
        const particleDomNodeRef = __jsenv_default_import__.useRef();
        __jsenv_default_import__.useEffect(() => {
          const particleDomNode = particleDomNodeRef.current;
          const totalScoreDomNode = totalScoreDomNodeRef.current;
          const particlePosition = domNodeToCenterPoint(document.querySelector(`[data-chest-slot="${scoreParticle.chestSlot}"]`));
          return animateScoreParticleMoveToTotalScore({
            particleDomNode,
            totalScoreDomNode,
            x: particlePosition.x,
            y: particlePosition.y,
            duration: animationDuration,
            delay: animationDelayGetter(),
            onfinish: scoreParticle.onfinish,
            oncancel: scoreParticle.oncancel
          });
        }, []);
        return /*#__PURE__*/jsxs("svg", {
          ref: particleDomNodeRef,
          width: "32",
          height: "32",
          className: "score-particle--symbol",
          children: [/*#__PURE__*/jsx("image", {
            href: symbolUrl,
            width: "32",
            height: "32"
          }), ","]
        });
      };
      ScoreParticleCombo = _ref3 => {
        let {
          scoreParticle,
          animationDuration = 800,
          animationDelayGetter
        } = _ref3;
        const [svgDomNodeRef, svgChildDomNodeRef] = useSvgFluidSizeEffect();
        __jsenv_default_import__.useEffect(() => {
          const svgDomNode = svgDomNodeRef.current;
          const particlePosition = domNodeToCenterPoint(document.querySelector(`.chest .box`));
          return animateScoreParticlePopOnPlace({
            particleDomNode: svgDomNode,
            x: particlePosition.x,
            y: particlePosition.y,
            duration: animationDuration,
            delay: animationDelayGetter(),
            onfinish: scoreParticle.onfinish,
            oncancel: scoreParticle.oncancel
          });
        }, []);
        return /*#__PURE__*/jsx("svg", {
          ref: svgDomNodeRef,
          className: "score-particle--perfect",
          children: /*#__PURE__*/jsx("g", {
            ref: svgChildDomNodeRef,
            children: /*#__PURE__*/jsxs("text", {
              x: "0",
              y: "0",
              dominantBaseline: "text-before-edge",
              children: ["Combo ", scoreParticle.symbolCount]
            })
          })
        });
      };
      ScoreParticlePerfect = _ref4 => {
        let {
          scoreParticle,
          animationDuration = 800,
          animationDelayGetter
        } = _ref4;
        const [svgDomNodeRef, svgChildDomNodeRef] = useSvgFluidSizeEffect();
        __jsenv_default_import__.useEffect(() => {
          const svgDomNode = svgDomNodeRef.current;
          const particlePosition = domNodeToCenterPoint(document.querySelector(`.chest .box`));
          return animateScoreParticlePopOnPlace({
            particleDomNode: svgDomNode,
            x: particlePosition.x,
            y: particlePosition.y,
            duration: animationDuration,
            delay: animationDelayGetter(),
            onfinish: scoreParticle.onfinish,
            oncancel: scoreParticle.oncancel
          });
        }, []);
        return /*#__PURE__*/jsx("svg", {
          ref: svgDomNodeRef,
          className: "score-particle--combo",
          children: /*#__PURE__*/jsx("g", {
            ref: svgChildDomNodeRef,
            children: /*#__PURE__*/jsx("text", {
              x: "0",
              y: "0",
              dominantBaseline: "text-before-edge",
              children: "Coffre parfait"
            })
          })
        });
      };
      animateScoreParticleMoveToTotalScore = _ref5 => {
        let {
          particleDomNode,
          totalScoreDomNode,
          x,
          y,
          duration,
          delay,
          onfinish = () => {},
          oncancel = () => {}
        } = _ref5;
        const particleDomNodeRectangle = getDomNodeRectangle(particleDomNode);
        const totalScoreDomNodeRectangle = getDomNodeRectangle(totalScoreDomNode);
        const particleWidth = particleDomNodeRectangle.right - particleDomNodeRectangle.left;
        const particleHeight = particleDomNodeRectangle.bottom - particleDomNodeRectangle.top;
        const startX = x - particleWidth / 2;
        const startY = y - particleHeight / 2;
        const intermediateX = startX;
        const intermediateY = startY - particleHeight * 1.1;
        const endX = totalScoreDomNodeRectangle.left;
        const endY = totalScoreDomNodeRectangle.top;
        particleDomNode.style.left = `${startX}px`;
        particleDomNode.style.top = `${startY}px`;
        const animation = particleDomNode.animate([{
          opacity: 0,
          visibility: "visible",
          transform: "translate(0px, 0px)"
        }, {
          offset: 0.1,
          opacity: 1
        }, {
          offset: 0.6,
          opacity: 1,
          transform: `translate(${intermediateX - startX}px, ${intermediateY - startY}px)`
        }, {
          transform: `translate(${endX - startX}px, ${endY - startY}px)`
        }], {
          duration,
          delay,
          fill: "forwards"
        });
        animation.onfinish = () => {
          onfinish();
        };
        return () => {
          oncancel();
          animation.cancel();
        };
      };
      animateScoreParticlePopOnPlace = _ref6 => {
        let {
          particleDomNode,
          x,
          y,
          duration,
          delay,
          onfinish = () => {},
          oncancel = () => {}
        } = _ref6;
        const particleDomNodeRectangle = getDomNodeRectangle(particleDomNode);
        const particleWidth = particleDomNodeRectangle.right - particleDomNodeRectangle.left;
        const particleHeight = particleDomNodeRectangle.bottom - particleDomNodeRectangle.top;
        const startX = x - particleWidth / 2;
        const startY = y - particleHeight / 2;
        particleDomNode.style.left = `${startX}px`;
        particleDomNode.style.top = `${startY}px`;
        const animation = particleDomNode.animate([{
          opacity: 0,
          visibility: "visible",
          transform: "translate(0px, 0px)"
        }, {
          offset: 0.1,
          opacity: 1
        }, {
          offset: 0.4,
          opacity: 1,
          transform: `scale(1.2)`
        }, {
          // transform: `scale(0)`,
        }], {
          duration,
          delay,
          fill: "forwards"
        });
        animation.onfinish = () => {
          onfinish();
        };
        return () => {
          oncancel();
          animation.cancel();
        };
      };
      useSvgFluidSizeEffect = () => {
        const svgDomNodeRef = __jsenv_default_import__.useRef();
        const svgChildDomNodeRef = __jsenv_default_import__.useRef();
        __jsenv_default_import__.useLayoutEffect(() => {
          const svgDomNode = svgDomNodeRef.current;
          const svgChildDomNode = svgChildDomNodeRef.current;
          const svgChildDomNodeBox = svgChildDomNode.getBBox();
          svgDomNode.setAttribute("width", Math.ceil(svgChildDomNodeBox.width));
          svgDomNode.setAttribute("height", Math.ceil(svgChildDomNodeBox.height));
        }, []);
        return [svgDomNodeRef, svgChildDomNodeRef];
      };
      domNodeToCenterPoint = domNode => {
        const domNodeRectangle = getDomNodeRectangle(domNode);
        const centerPoint = getRectangleCenterPoint(domNodeRectangle);
        return centerPoint;
      };
      useRoundScoreParticleEffects = _ref => {
        let {
          addScoreParticle
        } = _ref;
        useCoinEffect({
          addScoreParticle
        });
        useDiamondEffect({
          addScoreParticle
        });
        useComboEffect({
          addScoreParticle
        });
        usePerfectEffect({
          addScoreParticle
        });
      };
      useCoinEffect = _ref2 => {
        let {
          addScoreParticle
        } = _ref2;
        const chestSlots = useChestSlots();
        const dices = useDices();
        const effectSuspended = useSwordChallengeOnGoing();
        Object.keys(chestSlots).forEach(chestSlot => {
          const chestSlotContent = chestSlots[chestSlot];
          const chestSlotSymbol = chestSlotContentToSymbol(chestSlotContent, dices);
          const chestSlotContentIsCoin = chestSlotSymbol && symbolIsCoin(chestSlotSymbol);
          useUpdateEffect(() => {
            if (effectSuspended) return undefined;
            if (!chestSlotContentIsCoin) return undefined;
            return addScoreParticle({
              id: `chest-slot-${chestSlot}-coin`,
              type: "bonus",
              value: 100,
              symbol: SYMBOL_COIN,
              chestSlot
            });
          }, [effectSuspended, chestSlotContentIsCoin]);
        });
      };
      useDiamondEffect = _ref3 => {
        let {
          addScoreParticle
        } = _ref3;
        const chestSlots = useChestSlots();
        const dices = useDices();
        const effectSuspended = useSwordChallengeOnGoing();
        Object.keys(chestSlots).forEach(chestSlot => {
          const chestSlotContent = chestSlots[chestSlot];
          const chestSlotSymbol = chestSlotContentToSymbol(chestSlotContent, dices);
          const chestSlotContentIsDiamond = chestSlotSymbol && symbolIsDiamond(chestSlotSymbol);
          useUpdateEffect(() => {
            if (effectSuspended) return undefined;
            if (!chestSlotContentIsDiamond) return undefined;
            return addScoreParticle({
              id: `chest-slot-${chestSlot}-diamond`,
              type: "bonus",
              value: 100,
              symbol: SYMBOL_DIAMOND,
              chestSlot
            });
          }, [effectSuspended, chestSlotContentIsDiamond]);
        });
      };
      usePerfectEffect = _ref4 => {
        let {
          addScoreParticle
        } = _ref4;
        const chestSlots = useChestSlots();
        const dices = useDices();
        const effectSuspended = useSwordChallengeOnGoing();
        const perfect = __jsenv_default_import__.useMemo(() => {
          const symbols = [];
          Object.keys(chestSlots).forEach(chestSlot => {
            const chestSlotContent = chestSlots[chestSlot];
            if (!chestSlotContent) {
              return;
            }
            const chestSlotHasDice = chestSlotContent.type === "dice";
            if (!chestSlotHasDice) {
              return;
            }
            symbols.push(chestSlotContentToSymbol(chestSlotContent, dices));
          });
          const {
            perfectBonus
          } = getScoreAndPerfectBonus(symbols);
          return Boolean(perfectBonus);
        }, [chestSlots, dices]);
        useUpdateEffect(() => {
          if (effectSuspended) return undefined;
          if (!perfect) return undefined;
          return addScoreParticle({
            id: "perfect",
            type: "perfect",
            value: 500
          });
        }, [effectSuspended, perfect]);
      }; // on voudrait aussi déclencher une animation
      // sur les chest slots faisant partie de la combo
      useComboEffect = _ref5 => {
        let {
          addScoreParticle
        } = _ref5;
        const chestSlots = useChestSlots();
        const dices = useDices();
        const currentCardId = useCurrentCardId();
        const currentCard = cardIdToCard(currentCardId);
        const effectSuspended = useSwordChallengeOnGoing();
        SYMBOLS.forEach(symbol => {
          const chestSlotsWithThatSymbol = [];
          Object.keys(chestSlots).forEach(chestSlot => {
            const chestSlotContent = chestSlots[chestSlot];
            const chestSlotSymbol = chestSlotContentToSymbol(chestSlotContent, dices);
            if (!chestSlotSymbol) {
              return;
            }
            if (compareSymbols(chestSlotSymbol, symbol, currentCard)) {
              chestSlotsWithThatSymbol.push(chestSlot);
            }
          });
          const symbolCount = chestSlotsWithThatSymbol.length;
          const comboScore = COMBO_SCORES[symbolCount] || 0;
          const comboScorePreviousRef = __jsenv_default_import__.useRef(comboScore);
          // si la combo vient se se produire -> animation
          // si la combo part -> on annule l'ancienne
          // si la combo increases -> annule l'ancienne + joue la nouvelle
          // si la combo decrease -> on annule juste l'ancienne
          // attention avec la carte animals on a 2 fois la combo singe et perroquet
          // donc il ne faudra en faire que une
          const animationRef = __jsenv_default_import__.useRef(() => {});
          useUpdateEffect(() => {
            const comboScorePrevious = comboScorePreviousRef.current;
            // const comboFound = Boolean(!comboScorePrevious && comboScore)
            const comboIncreased = Boolean(comboScorePrevious && comboScore && comboScorePrevious < comboScore);
            const comboDecreased = Boolean(comboScorePrevious && comboScore && comboScorePrevious > comboScore);
            // const comboLost = Boolean(comboScorePrevious && !comboScore)
            comboScorePreviousRef.current = comboScore;

            // ne tiens pas compte des parrot lorsqu'ils sont transformé
            // en singe par la carte animals
            if (isAnimalsCard(currentCard) && symbolIsParrot(symbol)) return undefined;
            if (effectSuspended) return undefined;
            if (!comboScore) return undefined;
            if (comboDecreased) {
              animationRef.current();
              return undefined;
            }
            if (comboIncreased) {
              animationRef.current();
            }
            const id = `${symbolCount}-${symbol}-combo`;
            const value = comboScore - comboScorePrevious;
            const cleanupScoreParticle = addScoreParticle({
              id,
              type: "combo",
              value,
              symbol,
              symbolCount
            });
            animationRef.current = cleanupScoreParticle;
            const chestSlotAnimationCleanups = chestSlotsWithThatSymbol.map(chestSlotWithThatSymbol => {
              const chestSlotDomNodeSymbol = document.querySelector(`[data-chest-slot="${chestSlotWithThatSymbol}"] image`) ||
              // symbol coming from coin or diamond card have a different html structure
              // (they use an <img> tag)
              document.querySelector(`[data-chest-slot="${chestSlotWithThatSymbol}"] img`);
              // attention: l'animation de combo
              // peut etre delay
              // et dans ce cas on voudrait que le scaling se fasse en meme temps ?
              const animation = chestSlotDomNodeSymbol.animate([{
                transform: "scale(1)",
                transformOrigin: "center center"
              }, {
                transform: "scale(1.2)",
                transformOrigin: "center center"
              }, {
                transform: "scale(1)",
                transformOrigin: "center center"
              }], {
                duration: 400
              });
              return () => {
                animation.cancel();
              };
            });
            return () => {
              cleanupScoreParticle();
              chestSlotAnimationCleanups.forEach(chestSlotAnimationCleanup => {
                chestSlotAnimationCleanup();
              });
            };
          }, [effectSuspended, currentCard, comboScore]);
        });
      };
      compareSymbols = (leftSymbol, rightSymbol, currentCard) => {
        if (leftSymbol === rightSymbol) {
          return true;
        }
        if (isAnimalsCard(currentCard)) {
          if (symbolIsMonkey(leftSymbol) && symbolIsParrot(rightSymbol)) {
            return true;
          }
          if (symbolIsParrot(leftSymbol) && symbolIsMonkey(rightSymbol)) {
            return true;
          }
        }
        return false;
      };
      COMBO_SCORES = {
        3: 100,
        4: 200,
        5: 500,
        6: 1000,
        7: 2000,
        8: 4000
      };
      /* eslint-disable import/max-dependencies */
      ({
        useState: useState$1,
        useEffect: useEffect$1
      } = __jsenv_default_import__);
      RoundScore = () => {
        const currentCard = cardIdToCard(useCurrentCardId());
        const swordChallengeOngoing = useSwordChallengeOngoing();
        return /*#__PURE__*/jsx("div", {
          className: `score-area ${swordChallengeOngoing ? "animated" : ""}`,
          children: currentCard ? /*#__PURE__*/jsx(ScoreDisplay, {}) : null
        });
      };
      useSwordChallengeOngoing = () => {
        const currentCard = cardIdToCard(useCurrentCardId());
        const symbolsInChest = useSymbolsInChest();
        const quantityKept = countSymbol(symbolsInChest, SYMBOL_SWORD);
        const quantityRequired = useSwordQuantityRequired();
        if (!isSwordChallengeCard(currentCard)) {
          return false;
        }
        const challengeWon = quantityKept >= quantityRequired;
        return !challengeWon;
      };
      ScoreDisplay = () => {
        const currentCard = cardIdToCard(useCurrentCardId());
        const scoreMarked = useScoreMarked();
        const swordChallengeOngoing = useSwordChallengeOngoing();
        const [scoreDialogIsOpen, openScoreDialog, closeScoreDialog] = useDialogState();
        const animationsDisabled = useAnimationsDisabled();
        return /*#__PURE__*/jsxs(Fragment, {
          children: [isPirateCard(currentCard) ? /*#__PURE__*/jsx(DoubleScoreIndicator, {}) : null, scoreMarked ? /*#__PURE__*/jsx(StarRain, {}) : null, /*#__PURE__*/jsx("button", {
            className: `round-score ${swordChallengeOngoing ? "hidden" : ""}`,
            onClick: openScoreDialog,
            children: animationsDisabled ? /*#__PURE__*/jsx(ScoreWithoutAnimation, {}) : /*#__PURE__*/jsx(ScoreWithAnimations, {})
          }), isSwordChallengeCard(currentCard) ? /*#__PURE__*/jsx(NegativeScoreSign, {}) : null, /*#__PURE__*/jsx(RoundScoreRulesDialog, {
            dialogIsOpen: scoreDialogIsOpen,
            closeDialog: closeScoreDialog
          })]
        });
      };
      ScoreWithAnimations = () => {
        const roundScore = useRoundScore();
        const roundScoreDomNodeRef = __jsenv_default_import__.useRef();
        const [scoreParticleMergedListener, scoreParticleMergedEmitter] = useSignal();
        const [scoreParticles, addScoreParticle, scoreDisplayed] = useScoreParticles({
          totalScore: roundScore,
          onScoreParticleMerged: scoreParticleMergedEmitter
        });
        useRoundScoreParticleEffects({
          addScoreParticle
        });
        useScoreParticleMergeEffect({
          roundScoreDomNodeRef,
          scoreParticleMergedListener
        });
        const minDelayBetweenParticles = 600;
        const lastScoreParticleMsRef = __jsenv_default_import__.useRef(null);
        const animationDelayGetter = () => {
          const lastScoreParticleMs = lastScoreParticleMsRef.current;
          const animationDelay = scoreParticleAnimationDelayGetter(lastScoreParticleMs, minDelayBetweenParticles);
          lastScoreParticleMsRef.current = Date.now() + animationDelay;
          return animationDelay;
        };
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx("span", {
            ref: roundScoreDomNodeRef,
            className: "round-score--value",
            children: /*#__PURE__*/jsx(ValueWithAnimatedTransition, {
              value: scoreDisplayed,
              condition: (value, previousValue) => value > previousValue,
              duration: 600
            })
          }), scoreParticles.map(scoreParticle => {
            return /*#__PURE__*/jsx(RoundScoreParticle, {
              totalScoreDomNodeRef: roundScoreDomNodeRef,
              scoreParticle: scoreParticle,
              animationDelayGetter: animationDelayGetter
            }, scoreParticle.id);
          })]
        });
      };
      scoreParticleAnimationDelayGetter = (lastScoreParticleMs, minDelayBetweenParticles) => {
        if (!lastScoreParticleMs) {
          return 0;
        }
        const nowMs = Date.now();
        const msEllapsedSinceLastParticle = nowMs - lastScoreParticleMs;
        const msToWait = minDelayBetweenParticles - msEllapsedSinceLastParticle;
        if (msToWait <= 0) {
          return 0;
        }
        return msToWait;
      };
      ScoreWithoutAnimation = () => {
        const roundScore = useRoundScore();
        return /*#__PURE__*/jsx("span", {
          className: "round-score--value",
          children: roundScore
        });
      };
      useScoreParticleMergeEffect = _ref => {
        let {
          roundScoreDomNodeRef,
          scoreParticleMergedListener
        } = _ref;
        const scoreParticleMerged = useSignalState(scoreParticleMergedListener);
        __jsenv_default_import__.useEffect(() => {
          if (!scoreParticleMerged) {
            return undefined;
          }
          const roundScoreDomNode = roundScoreDomNodeRef.current;
          return animateScoreParticleMerge({
            roundScoreDomNode
          });
        }, [scoreParticleMerged]);
      };
      animateScoreParticleMerge = _ref2 => {
        let {
          roundScoreDomNode,
          duration = 500,
          easing = "ease-in-out"
        } = _ref2;
        const animation = roundScoreDomNode.animate([{
          transform: "scale(1.8)"
        }], {
          duration,
          easing
        });
        return () => {
          animation.cancel();
        };
      };
      DoubleScoreIndicator = () => {
        const currentCardActivated = useCurrentCardActivated();
        if (!currentCardActivated) {
          return /*#__PURE__*/jsx("div", {
            style: {
              display: "none"
            },
            className: "pirate-hook"
          });
        }
        return /*#__PURE__*/jsx("div", {
          className: "pirate-hook"
        });
      };
      NegativeScoreSign = () => {
        const roundScore = useRoundScore();
        const symbolsInChest = useSymbolsInChest();
        const quantityKept = countSymbol(symbolsInChest, SYMBOL_SWORD);
        const quantityRequired = useSwordQuantityRequired();
        const quantityRequiredArray = new Array(quantityRequired).fill("");
        const challengeWon = quantityKept >= quantityRequired;
        const swordNumberIncreased = useBecomes(quantityKeptPrevious => quantityKeptPrevious < quantityKept, [quantityKept]);
        const [swordSliceAnimation, swordSliceAnimationSetter] = useState$1(false);
        useEffect$1(() => {
          if (swordNumberIncreased) {
            swordSliceAnimationSetter(true);
          }
        }, [swordNumberIncreased]);
        useEffect$1(() => {
          if (swordSliceAnimation) {
            const timeout = setTimeout(() => {
              swordSliceAnimationSetter(false);
            }, 300);
            return () => {
              clearTimeout(timeout);
            };
          }
          return () => {};
        }, [swordSliceAnimation]);
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx("div", {
            className: `ropes ${challengeWon ? "challenge-won" : ""}`,
            children: quantityRequiredArray.map((value, index) => {
              if (quantityKept >= index + 1) return /*#__PURE__*/jsx("div", {
                className: `rope rope-${index + 1} cut-rope`
              }, index);
              return /*#__PURE__*/jsx("div", {
                className: `rope rope-${index + 1}`
              }, index);
            })
          }), swordSliceAnimation && quantityKept <= quantityRequired ? /*#__PURE__*/jsxs("div", {
            className: "sword-slice",
            children: [/*#__PURE__*/jsx("div", {
              className: "triangle-left"
            }), /*#__PURE__*/jsx("div", {
              className: "triangle-right"
            })]
          }) : null, /*#__PURE__*/jsx("div", {
            className: `negative-round-score rotate-${quantityKept} ${challengeWon ? "removed" : ""}`,
            children: roundScore
          })]
        });
      };
      diceSize = 50;
      cursedGridImageUrl = new URL(__v__("/other/cursed-grid.png"), _context.meta.url);
      Chest = _ref => {
        let {
          chestRef,
          diceOverChestListener
        } = _ref;
        const chestSlots = useChestSlots();
        const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea();
        const diceOverChest = useSignalState(diceOverChestListener);
        const currentCard = cardIdToCard(useCurrentCardId());
        const protectedByChestCard = threeSkullsOrMoreInCursedArea && isChestCard(currentCard);
        return /*#__PURE__*/jsxs("div", {
          className: "chest",
          children: [/*#__PURE__*/jsxs("div", {
            ref: chestRef,
            className: `dice-area ${isChestCard(currentCard) ? "glow" : ""}`,
            style: _objectSpread2({}, diceOverChest ? {
              outline: "2px dotted"
            } : {}),
            children: [/*#__PURE__*/jsx("div", {
              className: "box",
              children: Object.keys(chestSlots).map(chestSlot => /*#__PURE__*/jsx("div", {
                className: "slot",
                "data-chest-slot": chestSlot,
                children: /*#__PURE__*/jsx(ChestSlot, {
                  chestSlotContent: chestSlots[chestSlot]
                })
              }, chestSlot))
            }), /*#__PURE__*/jsx("div", {
              className: "top-left-corner"
            }), /*#__PURE__*/jsx("div", {
              className: "top-right-corner"
            }), /*#__PURE__*/jsx("div", {
              className: "bottom-left-corner"
            }), /*#__PURE__*/jsx("div", {
              className: "bottom-right-corner"
            }), threeSkullsOrMoreInCursedArea && !protectedByChestCard ? /*#__PURE__*/jsx(CursedCover, {}) : null]
          }), /*#__PURE__*/jsx(RoundScore, {})]
        });
      };
      ChestSlot = _ref2 => {
        let {
          chestSlotContent
        } = _ref2;
        const currentCard = cardIdToCard(useCurrentCardId());
        if (!chestSlotContent) {
          return null;
        }
        if (chestSlotContent.type === "symbol") {
          const symbol = chestSlotContent.value;
          return /*#__PURE__*/jsx("button", {
            className: "dice",
            style: {
              width: diceSize,
              height: diceSize,
              color: "#eaeaea",
              margin: "5px",
              backgroundColor: currentCard.color1,
              borderColor: currentCard.color2,
              borderWidth: "2px",
              borderStyle: "solid"
            },
            children: /*#__PURE__*/jsx(Image, {
              src: symbolToImageUrl(symbol),
              draggable: "false",
              style: {
                width: "100%",
                height: "100%"
              }
            })
          });
        }

        // it's a dice
        return null;
      };
      CursedCover = () => {
        return /*#__PURE__*/jsx("div", {
          className: "cursed-cover",
          children: /*#__PURE__*/jsx(Image, {
            draggable: "false",
            src: cursedGridImageUrl,
            alt: "cursed-cover"
          })
        });
      };
      cardsRules = {
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
          rule: "Grâce à l'aide du capitaine, tous les points comptabilisés pendant ce tour sont doublés !"
          //   more: "Si le joueur doit se rendre sur l'île de la tête de mort, ses adversaires perdent 200 points pour chaque tête de mort révélée."
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
          more: "Le score total ne peut pas descende en dessous de zéro. Ainsi si par exemple le joueur perds le défi au premier tour il restera à 0 points."
          // more: "Celui qui découvre un bateau pirate ne peut pas aller sur l'île de la tête de mort: un joueur qui obtiendrait 4 têtes de mort ou plus lors de son premier lancer perdrait donc immédiatement son tour."
        },

        "3sword-challenge": {
          name: "Bateau pirate",
          rule: "Le joueur doit obtenir au minimum 3 symbols sabres. Si il y parvient, il gagne +500 points, en plus de son résultat aux dés. Si il échoue, le joueur marque -500 points pour ce tour, quelque soit son résultat aux dés.",
          more: "Le score total ne peut pas descende en dessous de zéro. Ainsi si par exemple le joueur perds le défi au premier tour il restera à 0 points."
          // more: "Celui qui découvre un bateau pirate ne peut pas aller sur l'île de la tête de mort: un joueur qui obtiendrait 4 têtes de mort ou plus lors de son premier lancer perdrait donc immédiatement son tour."
        },

        "4sword-challenge": {
          name: "Bateau pirate",
          rule: "Le joueur doit obtenir au minimum 4 symbols sabres. Si il y parvient, il gagne +1000 points, en plus de son résultat aux dés. Si il échoue, le joueur marque -1000 points pour ce tour, quelque soit son résultat aux dés.",
          more: "Le score total ne peut pas descende en dessous de zéro. Ainsi si par exemple le joueur perds le défi au premier tour il restera à 0 points."
          // more: "Celui qui découvre un bateau pirate ne peut pas aller sur l'île de la tête de mort: un joueur qui obtiendrait 4 têtes de mort ou plus lors de son premier lancer perdrait donc immédiatement son tour."
        }
      };
      CardRulesDialog = _ref => {
        let {
          dialogIsOpen,
          closeDialog,
          card
        } = _ref;
        const cardRules = cardsRules[card.type];
        return /*#__PURE__*/jsx(DialogWood, {
          className: "card-rules-dialog",
          isOpen: dialogIsOpen,
          onRequestClose: closeDialog,
          requestCloseOnClickOutside: true,
          title: "Carte",
          children: cardRules ? /*#__PURE__*/jsxs(Fragment, {
            children: [/*#__PURE__*/jsx("div", {
              className: "dialog-label",
              children: cardRules.name
            }), /*#__PURE__*/jsx("div", {
              style: {
                textAlign: "center"
              },
              children: /*#__PURE__*/jsx(Image, {
                className: "current-card",
                src: cardToImageUrl(card),
                width: "150",
                alt: card.type
              })
            }), /*#__PURE__*/jsx("div", {
              className: "text-rule",
              children: cardRules.rule
            }), cardRules.more ? /*#__PURE__*/jsx("div", {
              className: "text-rule",
              children: cardRules.more
            }) : null]
          }) : "No rule"
        });
      };
      _excluded = ["card"];
      SmallCardForward = (_ref, ref) => {
        let {
            card
          } = _ref,
          props = _objectWithoutProperties(_ref, _excluded);
        return /*#__PURE__*/jsx("div", _objectSpread2(_objectSpread2({
          className: "card current-card",
          ref: ref,
          width: "55",
          height: "55",
          style: {
            backgroundColor: card.color1,
            borderColor: card.color2
          }
        }, props), {}, {
          children: /*#__PURE__*/jsx(Image, {
            src: cardToSmallImageUrl(card),
            alt: card.type,
            width: "55",
            height: "55"
          })
        }));
      };
      SmallCard = __jsenv_default_import__.forwardRef(SmallCardForward);
      swordsDisabledImageUrl = new URL(__v__("/other/swords-disabled.png"), _context.meta.url);
      SwordChallengeIndicator = () => {
        const currentCardId = useCurrentCardId();
        const symbolsInChest = useSymbolsInChest();
        const quantityRequired = useSwordQuantityRequired();
        if (!currentCardId) {
          return null;
        }
        const currentCard = cardIdToCard(currentCardId);
        if (!isSwordChallengeCard(currentCard)) {
          return null;
        }
        const quantityKept = countSymbol(symbolsInChest, SYMBOL_SWORD);
        const quantityRequiredArray = new Array(quantityRequired).fill("");
        return /*#__PURE__*/jsx("div", {
          className: "sword-challenge-indicators",
          children: quantityRequiredArray.map((value, index) => {
            if (quantityKept >= index + 1) return /*#__PURE__*/jsx(SwordIconActivated, {}, index);
            return /*#__PURE__*/jsx(SwordIconDisabled, {}, index);
          })
        });
      };
      SwordIconActivated = () => /*#__PURE__*/jsx("div", {
        className: "sword-icon",
        children: /*#__PURE__*/jsx(Image, {
          src: symbolSwordUrl
        })
      });
      SwordIconDisabled = () => /*#__PURE__*/jsx("div", {
        className: "sword-icon disabled",
        children: /*#__PURE__*/jsx(Image, {
          src: swordsDisabledImageUrl
        })
      });
      Header = _ref => {
        let {
          openScoreboard,
          headerSmallCardRef
        } = _ref;
        const currentCard = cardIdToCard(useCurrentCardId());
        const currentCardActivated = useCurrentCardActivated();
        return /*#__PURE__*/jsxs("div", {
          className: "header",
          children: [/*#__PURE__*/jsxs("div", {
            className: "card-container",
            style: {
              opacity: currentCardActivated ? "1" : "0"
            },
            children: [/*#__PURE__*/jsx("div", {
              className: "small-card",
              children: currentCard ? /*#__PURE__*/jsx(HeaderSmallCard, {
                headerSmallCardRef: headerSmallCardRef,
                currentCard: currentCard
              }) : /*#__PURE__*/jsx(BackCard$1, {})
            }), currentCardActivated && /*#__PURE__*/jsx(SwordChallengeIndicator, {})]
          }), /*#__PURE__*/jsx(CurrentPlayer, {
            openScoreboard: openScoreboard
          }), /*#__PURE__*/jsx(TotalScore, {})]
        });
      };
      HeaderSmallCard = _ref2 => {
        let {
          headerSmallCardRef,
          currentCard
        } = _ref2;
        const [cardDialogIsOpen, cardDialogIsOpenSetter] = __jsenv_default_import__.useState(false);
        const openCardDialog = () => {
          cardDialogIsOpenSetter(true);
        };
        const closeCardDialog = () => {
          cardDialogIsOpenSetter(false);
        };
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx(SmallCard, {
            onClick: () => {
              openCardDialog();
            },
            card: currentCard,
            ref: headerSmallCardRef
          }), /*#__PURE__*/jsx(CardRulesDialog, {
            card: currentCard,
            dialogIsOpen: cardDialogIsOpen,
            closeDialog: closeCardDialog
          })]
        });
      };
      BackCard$1 = () => {
        return /*#__PURE__*/jsx("div", {
          className: "card default-card",
          style: {
            backgroundImage: `url(${cardDefaultUrl})`,
            backgroundSize: "217px"
          }
        });
      };
      CurrentPlayer = _ref3 => {
        let {
          openScoreboard
        } = _ref3;
        const player = useCurrentPlayer();
        return /*#__PURE__*/jsx(Image, {
          onClick: openScoreboard,
          className: "avatar",
          src: player && player.character.img,
          alt: "player",
          style: {
            borderColor: player && player.character.color || "white"
          },
          width: "55",
          height: "55"
        });
      };
      TotalScore = () => {
        const player = useCurrentPlayer();
        const totalScore = player.score;
        const totalScoreAnimation = useAnimateTransitionUsingJs(totalScore, {
          duration: 1200,
          timingFunction: progress => 1 - Math.pow(1 - progress, 5)
        });
        return /*#__PURE__*/jsx("div", {
          className: "total-score",
          children: /*#__PURE__*/jsx("span", {
            className: "score",
            style: {
              backgroundColor: player && player.character.color || "white"
            },
            children: totalScoreAnimation ? totalScoreAnimation.value : totalScore
          })
        });
      }; // margin because of rotation
      diceSpacing = diceSize / 8;
      rollDices = (dices, _ref) => {
        let {
          rolledAreaDomNode
        } = _ref;
        const rolledAreaRectangle = getDomNodeRectangle(rolledAreaDomNode);
        const rolledAreaWidth = rolledAreaRectangle.right - rolledAreaRectangle.left;
        const rolledAreaHeight = rolledAreaRectangle.bottom - rolledAreaRectangle.top;
        const rectangleAllowed = {
          left: diceSpacing,
          right: rolledAreaWidth - (diceSize + diceSpacing),
          top: diceSpacing,
          bottom: rolledAreaHeight - (diceSize + diceSpacing)
        };
        const otherRotatedRectangles = [];
        const getRandomAndCollisionFreeInfo = dice => {
          let count = 0;
          const next = () => {
            const rectangleCandidate = getRandomDiceRectangle(dice, rectangleAllowed);
            const rotation = getDiceRandomRotation();
            const rotatedRectangleCandidate = rotateRectangle(rectangleCandidate, rotation);
            const someOtherDiceCollides = otherRotatedRectangles.some(otherRotatedRectangle => rotatedRectangleCollidesWithRotatedRectangle(rotatedRectangleCandidate, otherRotatedRectangle));
            if (!someOtherDiceCollides ||
            // better return a collisioning rectangle than an infinite loop
            count > 50) {
              return {
                rectangle: rectangleCandidate,
                rotation,
                rotatedRectangle: rotatedRectangleCandidate
              };
            }
            count++;
            return next();
          };
          return next();
        };
        dices.forEach((dice, index) => {
          dice.visibleFaceIndex = getDiceRandomFace(dice);
          const {
            rectangle,
            rotation,
            rotatedRectangle
          } = getRandomAndCollisionFreeInfo(dice);
          otherRotatedRectangles.push(rotatedRectangle);
          dice.rolledAreaZIndex = index + 1;
          dice.rolledAreaPosition = rectangle[0];
          dice.rotation = rotation;
        });
        return dices;
      };
      getRandomDiceRectangle = (dice, rectangleAllowed) => {
        const positionCandidate = {
          x: getRandomNumberBetweenInterval(rectangleAllowed.left, rectangleAllowed.right),
          y: getRandomNumberBetweenInterval(rectangleAllowed.top, rectangleAllowed.bottom)
        };
        const topLeft = {
          x: positionCandidate.x,
          y: positionCandidate.y
        };
        const topRight = {
          x: positionCandidate.x + diceSize,
          y: positionCandidate.y
        };
        const bottomRight = {
          x: positionCandidate.x + diceSize,
          y: positionCandidate.y + diceSize
        };
        const bottomLeft = {
          x: positionCandidate.x,
          y: positionCandidate.y + diceSize
        };
        const diceRectangle = [topLeft, topRight, bottomRight, bottomLeft];
        return diceRectangle;
      };
      getDiceRandomRotation = () => getRandomNumberBetweenInterval(-35, 35);
      getDiceRandomFace = dice => getRandomNumberBetweenInterval(0, dice.faces.length - 1);
      getRandomNumberBetweenInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
      ButtonRoll = _ref => {
        let {
          rolledAreaRef
        } = _ref;
        const rollDiceAllowed = useRollDiceAllowed();
        const diceRolledIds = useDiceRolledIds();
        const hasNeverRolled = useHasNeverRolled();
        const roll = useRoll();
        const currentCard = cardIdToCard(useCurrentCardId());
        const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea();
        const disabledNotEnoughDice = diceRolledIds.length < 2 && !hasNeverRolled;
        const disabledChestCard = threeSkullsOrMoreInCursedArea && isChestCard(currentCard);
        const disabled = disabledNotEnoughDice || disabledChestCard;
        if (rollDiceAllowed) {
          return /*#__PURE__*/jsxs("div", {
            className: "roll-action",
            children: [/*#__PURE__*/jsxs("button", {
              onClick: () => {
                roll(rolledAreaRef.current);
              },
              disabled: disabled,
              children: ["Lancer", disabledNotEnoughDice && !disabledChestCard && /*#__PURE__*/jsx("span", {
                className: "button-subtitle",
                children: "(au moins 2 d\xE9s !)"
              })]
            }), disabledChestCard && /*#__PURE__*/jsx(Image, {
              src: symbolSkullUrl,
              className: "skull-symbol"
            })]
          });
        }
        return null;
      };
      useRoll = createAction((state, rolledAreaDomNode) => {
        const {
          dices,
          rollCount,
          diceRolledIds
        } = state;
        const diceToRollIds = rollCount === 0 ? Object.keys(dices) : diceRolledIds;
        const dicesToRoll = diceToRollIds.map(diceRolledId => dices[diceRolledId]);
        rollDices(dicesToRoll, {
          rolledAreaDomNode
        });
        return _objectSpread2(_objectSpread2({}, state), {}, {
          rollCount: rollCount + 1,
          witchUncursedDiceId: null,
          diceRolledIds: dicesToRoll.map(dice => dice.id),
          dices: _objectSpread2({}, dices)
        });
      });
      Footer = _ref => {
        let {
          onRoundOver,
          rolledAreaRef
        } = _ref;
        return /*#__PURE__*/jsxs("div", {
          className: "footer actions",
          children: [/*#__PURE__*/jsx(ButtonRoll, {
            rolledAreaRef: rolledAreaRef
          }), /*#__PURE__*/jsx(ButtonMarkScore, {}), /*#__PURE__*/jsx(ButtonEndRound, {
            onRoundOver: onRoundOver
          })]
        });
      };
      ButtonMarkScore = () => {
        const roundScore = useRoundScore();
        const markScore = useMarkScore();
        const markScoreAllowed = useMarkScoreAllowed();
        const markScoreButtonVisible = useMarkScoreButtonVisible();
        const sign = roundScore < 0 ? "-" : "+";
        if (markScoreButtonVisible) {
          return /*#__PURE__*/jsxs("div", {
            className: "collect-action",
            children: [/*#__PURE__*/jsxs("button", {
              onClick: () => {
                markScore(roundScore);
              },
              disabled: !markScoreAllowed,
              children: [/*#__PURE__*/jsx("span", {
                children: "Collecter"
              }), /*#__PURE__*/jsxs("span", {
                className: "score",
                children: [sign, " ", Math.abs(roundScore)]
              })]
            }), !markScoreAllowed && /*#__PURE__*/jsx(Image, {
              src: symbolSkullUrl,
              className: "skull-symbol"
            })]
          });
        }
        return null;
      };
      ButtonEndRound = _ref2 => {
        let {
          onRoundOver
        } = _ref2;
        const startNextRoundAllowed = useStartNextRoundAllowed();
        const endPlayerRound = useEndPlayerRound();
        const roundScore = useRoundScore();
        const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea();
        const swordChallengeOnGoing = useSwordChallengeOnGoing();
        const symbolsInChest = useSymbolsInChest();
        const computeReason = () => {
          // TODO: case of the treasure chest card => some score will be marked even if 3 skulls (canMarkScore ?)
          if (threeSkullsOrMoreInCursedArea) return "3-skulls";
          // sword challenge is ongoing means is not resolved
          // if the user clicks on 'Terminer mon tour' with an unresolved challenge, it means that he failed it
          if (swordChallengeOnGoing) return "chalenge-failed";
          return "user-collect";
        };
        if (startNextRoundAllowed) {
          return /*#__PURE__*/jsx("div", {
            className: "next-round-action",
            children: /*#__PURE__*/jsx("button", {
              onClick: () => {
                // ici on sait que le round est terminé
                // on dit a ceux que ça intéresse comment ça s'est passé (scoreboard)
                // qui va alors animer le fait qu'on a marqué un score, fail sword challenge
                // ou qu'on s'est tapé 3 tete
                endPlayerRound();
                onRoundOver({
                  reason: computeReason(),
                  value: roundScore,
                  symbolsInChest
                });
              },
              children: "Terminer mon tour"
            })
          });
        }
        return null;
      };
      wichLabelImageUrl = new URL(__v__("/other/witch-label.png"), _context.meta.url);
      SkullIsland = _ref => {
        let {
          cursedAreaRef
        } = _ref;
        const currentCard = cardIdToCard(useCurrentCardId());
        return /*#__PURE__*/jsxs("div", {
          className: "skull-island",
          children: [isWitchCard(currentCard) ? /*#__PURE__*/jsx(UncurseDiceLabel, {}) : null, /*#__PURE__*/jsx("div", {
            className: "bottle",
            children: /*#__PURE__*/jsxs("div", {
              className: "area",
              ref: cursedAreaRef,
              children: [isOneSkullCard(currentCard) ? /*#__PURE__*/jsx(ExtraSkull, {
                card: currentCard
              }) : null, isTwoSkullsCard(currentCard) ? /*#__PURE__*/jsxs(Fragment, {
                children: [/*#__PURE__*/jsx(ExtraSkull, {
                  card: currentCard
                }), /*#__PURE__*/jsx(ExtraSkull, {
                  card: currentCard
                })]
              }) : null]
            })
          })]
        });
      };
      ExtraSkull = _ref2 => {
        let {
          card
        } = _ref2;
        return /*#__PURE__*/jsx("button", {
          className: "dice",
          style: {
            width: diceSize,
            height: diceSize,
            color: "#eaeaea",
            margin: "1px 5px",
            backgroundColor: card.color1,
            borderColor: card.color2,
            borderWidth: "2px"
          },
          children: /*#__PURE__*/jsx(Image, {
            src: symbolSkullUrl,
            style: {
              width: "100%",
              height: "100%"
            }
          })
        });
      };
      UncurseDiceLabel = () => {
        const currentCardActivated = useCurrentCardActivated();
        if (!currentCardActivated) {
          return /*#__PURE__*/jsx(Image, {
            style: {
              display: "none"
            },
            src: wichLabelImageUrl
          });
        }
        return /*#__PURE__*/jsxs("div", {
          className: "witch-label",
          children: [/*#__PURE__*/jsx(Image, {
            src: wichLabelImageUrl
          }), /*#__PURE__*/jsxs("svg", {
            x: "0px",
            y: "0px",
            width: "156.083px",
            height: "208.667px",
            viewBox: "0 0 156.083 208.667",
            children: [/*#__PURE__*/jsx("path", {
              id: "path_01",
              fill: "none",
              stroke: "#E4AD30",
              d: "M8.406,107.82 c2.541,2.178,2.375,2.875,14.25,3.5c14.782,0.778,19.26-11.965,19.26-11.965S47.918,88,40.251,72.917s-18.916,4.583-9.083,8.167 s27.759-1.338,35.142-12.417C74.75,56,77.583,45.333,79.25,37S78.477,15.833,66.31,3.833"
            }), /*#__PURE__*/jsx("path", {
              id: "path_02",
              fill: "none",
              stroke: "#E4AD30",
              d: "M44.031,110.094 c0,0,1,1.313-4.438,3.344s-14.244,7.281-32.125-2"
            }), /*#__PURE__*/jsx("path", {
              id: "path_03",
              fill: "none",
              stroke: "#E4AD30",
              d: "M42.125,103.688 c0,0,1.313,6.594-9.313,8.625S10.281,108.719,9.406,101"
            }), /*#__PURE__*/jsx("path", {
              id: "path_04",
              fill: "none",
              stroke: "#E4AD30",
              d: "M33.114,112.253c0,0,39.886-19.253,43.011,24.747 c0.372,0.447-0.959,1.208-2.542,1.625"
            })]
          })]
        });
      };
      Portal = _ref => {
        let {
          parent,
          children
        } = _ref;
        if (!parent) {
          return null;
        }
        return __jsenv_default_import__$1.createPortal( /*#__PURE__*/jsx(Fragment, {
          children: children
        }), parent);
      };
      stringifyTransformations = _ref => {
        let {
          rotate,
          scale,
          translate
        } = _ref;
        return [...(rotate ? [`rotate(${rotate}deg)`] : []), ...(scale && scale !== 1 ? [`scale(${scale})`] : []), ...(translate ? [`translate(${translate})`] : [])].join("");
      };
      throttle = function throttle(fn) {
        let ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;
        let {
          trailing = false
        } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        let timeout;
        let previousMs;
        const throttled = function throttled() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          clearTimeout(timeout);
          const nowMs = Date.now();
          // la fonction a été appelé il y a previous
          if (previousMs) {
            // ca fait combien de temps
            const msEllapsedSincePreviousCall = nowMs - previousMs;
            if (msEllapsedSincePreviousCall < ms) {
              // pas suffisament de temps écoulé
              if (trailing) {
                const remaining = ms - msEllapsedSincePreviousCall;
                timeout = setTimeout(() => throttled(...args), remaining);
              }
            } else {
              // suffisament de temps écoulé
              previousMs = nowMs;
              fn(...args);
            }
          } else {
            // calls right now
            previousMs = nowMs;
            fn(...args);
          }
        };
        const cancel = () => {
          clearTimeout(timeout);
        };
        throttled.cancel = cancel;
        return throttled;
      };
      enableDragGesture = (domNode, _ref) => {
        let {
          logLevel = "warn",
          onGrip = () => {},
          onLongGrip = () => {},
          // in case it's passed we will call it only on fast and precise click
          onClick = () => {},
          onDrag = () => {},
          onRelease = () => {},
          onCancel = () => {},
          longGripMs = 300
        } = _ref;
        const logger = createLogger({
          logLevel
        });
        // a small move is a drag gesture but
        // not yet a drag intent
        // long grip or big enough move set drag intent to true
        let dragIntent = false;
        let dragIntentTimeout;
        let pendingGesture;
        let removeMoveListener = () => {};
        let removeReleaseListener = () => {};
        let cancelMoveThrottling = () => {};
        logger.debug("enable drag on", domNode);

        // disable native drag
        // putting draggable="false" on the element is not enough for firefox
        const removeDragstartListener = addDomEventListener(domNode, "dragstart", dragstartEvent => {
          dragstartEvent.preventDefault();
        });
        const removeMousedownListener = addDomEventListener(domNode, "mousedown", mousedownEvent => {
          const isRightClick = mousedownEvent.which === 3;
          if (isRightClick) {
            logger.debug("ignore right click");
            return;
          }
          handleGrip(mouseEventToPagePosition(mousedownEvent), mousedownEvent);
          const mousemoveThrottled = throttle(mousemoveEvent => {
            handleMove(mouseEventToPagePosition(mousemoveEvent), mousemoveEvent);
          });
          cancelMoveThrottling = () => mousemoveThrottled.cancel();
          removeMoveListener = addDomEventListener(document, "mousemove", mousemoveThrottled);
          removeReleaseListener = addDomEventListener(document, "mouseup", mouseupEvent => {
            removeReleaseListener();
            removeMoveListener();
            handleRelease(mouseEventToPagePosition(mouseupEvent), mouseupEvent);
          });
        }, {
          passive: true
        });
        const removeTouchstartListener = addDomEventListener(domNode, "touchstart", touchstartEvent => {
          handleGrip(touchEventToPagePosition(touchstartEvent), touchstartEvent);
          const touchmoveThrottled = throttle(touchmoveEvent => {
            handleMove(touchEventToPagePosition(touchmoveEvent), touchmoveEvent);
          });
          cancelMoveThrottling = () => touchmoveThrottled.cancel();
          removeMoveListener = addDomEventListener(document, "touchmove", touchmoveThrottled);
          removeReleaseListener = addDomEventListener(document, "touchend", touchendEvent => {
            removeReleaseListener();
            removeMoveListener();
            handleRelease(touchEventToPagePosition(touchendEvent), touchendEvent);
          });
        }, {
          passive: true
        });
        const removeClickListener = addDomEventListener(domNode, "click", clickEvent => {
          if (!dragIntent && dropEffect === "none") {
            onClick(clickEvent);
          }
        });
        let pointerPositionPrevious;
        let domNodeStartPosition;
        let gripPointerPosition;
        let longGripTimeout;
        let dropEffect;
        const handleGrip = (pointerPosition, event) => {
          logger.debug("gripping node at", pointerPosition);
          pendingGesture = true;
          dropEffect = "none";
          gripPointerPosition = pointerPosition;
          pointerPositionPrevious = pointerPosition;
          domNodeStartPosition = domNodeToPagePosition(domNode);
          onGrip({
            x: domNodeStartPosition.x,
            y: domNodeStartPosition.y,
            event
          });
          longGripTimeout = setTimeout(handleLongGrip, longGripMs);
        };
        const handleLongGrip = () => {
          dragIntent = true;
          onLongGrip();
        };
        const handleMove = (pointerPosition, event) => {
          if (pointerPositionPrevious.x === pointerPosition.x && pointerPositionPrevious.y === pointerPosition.y) {
            logger.debug("no real move");
            return;
          }
          pointerPositionPrevious = pointerPosition;
          const gripHorizontalShift = gripPointerPosition.x - domNodeStartPosition.x;
          const gripVerticalShit = gripPointerPosition.y - domNodeStartPosition.y;
          const movePosition = {
            // il y a un décalage entre le bord de l'élément et l'endroit ou l'on l'attrape
            // ce décalage doit continuer d'exister pour savoir ou on place l'élément en position fixed
            x: pointerPosition.x - gripHorizontalShift,
            y: pointerPosition.y - gripVerticalShit
          };
          const relativeX = pointerPosition.x - gripPointerPosition.x;
          const relativeY = pointerPosition.y - gripPointerPosition.y;
          logger.debug("move node at", movePosition);
          onDrag(_objectSpread2(_objectSpread2({
            event
          }, movePosition), {}, {
            relativeX,
            relativeY,
            setDropEffect: value => {
              dropEffect = value;
            }
          }));
        };
        const handleRelease = (pointerPosition, event) => {
          logger.debug("releasing node");
          pendingGesture = false;
          clearTimeout(longGripTimeout);
          const gripHorizontalShift = gripPointerPosition.x - domNodeStartPosition.x;
          const gripVerticalShit = gripPointerPosition.y - domNodeStartPosition.y;
          onRelease({
            event,
            dropEffect,
            x: pointerPositionPrevious.x - gripHorizontalShift,
            y: pointerPositionPrevious.y - gripVerticalShit
          });
          // setTimeout is to ensure the click cannot happen just after mouseup
          dragIntentTimeout = setTimeout(() => {
            dragIntent = false;
          });
        };
        const handleCancel = event => {
          if (pendingGesture) {
            logger.debug("cancelling drag", event);
            pendingGesture = false;
            onCancel({
              event
            });
          }
        };
        return event => {
          removeDragstartListener();
          removeClickListener();
          removeMousedownListener();
          removeTouchstartListener();
          removeMoveListener();
          removeReleaseListener();
          clearTimeout(longGripTimeout);
          clearTimeout(dragIntentTimeout);
          cancelMoveThrottling();
          handleCancel(event);
        };
      };
      domNodeToPagePosition = domNode => {
        const rect = domNode.getBoundingClientRect();
        return {
          x: rect.left,
          y: rect.top
        };
      };
      mouseEventToPagePosition = mouseEvent => {
        return {
          x: mouseEvent.pageX,
          y: mouseEvent.pageY
        };
      };
      touchEventToPagePosition = touchEvent => {
        const firstChangedTouch = touchEvent.changedTouches[0];
        return {
          x: firstChangedTouch.pageX,
          y: firstChangedTouch.pageY
        };
      };
      ({
        useEffect,
        useState
      } = __jsenv_default_import__);
      Dice = _ref => {
        let {
          dice,
          diceAnimation,
          anmationDebug = false,
          parentNode,
          zIndex,
          x,
          y,
          rotation,
          draggable,
          onDiceClick,
          onDiceDrag,
          onDiceDrop,
          onDiceDragEnd,
          disapear,
          appear,
          traceUpdate = false
        } = _ref;

        // state from contexts
        const mainDomNode = useMainDomNode();
        const diceDomNode = useDiceDomNode(dice.id);
        const diceDomNodeSetter = useDiceDomNodeSetter(dice.id);
        const diceKeptIds = useDiceKeptIds();
        const isDiceKept = diceKeptIds.includes(dice.id);

        // local states
        const [diceGripped, diceGrippedSetter] = useState(false);
        const [dragGesture, setDragGesture] = useState(null);

        // si y'a une animation alors reste dans ton conteneur
        // le temps qu'elle se finisse
        const parentNodePrevious = usePrevious(parentNode);
        const portalParentNode = diceAnimation ? parentNodePrevious : parentNode;
        useEffect(() => {
          if (!draggable || !diceDomNode || !mainDomNode) {
            return () => {};
          }
          let bigMoveOccured = false;
          const disableDragGesture = enableDragGesture(diceDomNode, {
            onGrip: () => {
              diceGrippedSetter(true);
            },
            onClick: clickEvent => {
              onDiceClick(dice, clickEvent);
            },
            onDrag: _ref2 => {
              let {
                x,
                y,
                relativeX,
                relativeY,
                setDropEffect
              } = _ref2;
              const diceDesiredRect = {
                left: x,
                right: x + diceSize,
                top: y,
                bottom: y + diceSize
              };
              const diceRectangle = rectangleToRectangleInsideDomNode(diceDesiredRect, mainDomNode);
              setDragGesture({
                x: diceRectangle.left,
                y: diceRectangle.top
              });
              bigMoveOccured = bigMoveOccured || Math.abs(relativeX) > 10 || Math.abs(relativeY) > 10;
              if (bigMoveOccured) {
                onDiceDrag(dice, {
                  relativeX,
                  relativeY,
                  setDropEffect,
                  diceRectangle
                });
              }
            },
            onRelease: _ref3 => {
              let {
                dropEffect,
                x,
                y
              } = _ref3;
              if (dropEffect !== "none") {
                const diceRectangle = {
                  left: x,
                  right: x + diceSize,
                  top: y,
                  bottom: y + diceSize
                };
                onDiceDrop(dice, {
                  diceRectangle
                });
              }
              diceGrippedSetter(false);
              setDragGesture(null);
              onDiceDragEnd(dice);
            },
            onCancel: () => {
              diceGrippedSetter(false);
              setDragGesture(null);
              onDiceDragEnd(dice);
            }
          });
          return () => {
            disableDragGesture();
          };
        }, [draggable, diceDomNode, mainDomNode, onDiceClick, onDiceDrag, onDiceDrop, onDiceDragEnd]);
        useEffect(() => {
          if (!diceAnimation || !diceDomNode) return () => {};
          const {
            from,
            to,
            onfinish
          } = diceAnimation;
          if (anmationDebug) {
            printPointInDocument(from);
            printPointInDocument(to);
          }
          const transform = `translate(${Math.floor(to.x - from.x)}px, ${Math.floor(to.y - from.y)}px)`;
          const animation = diceDomNode.parentNode.animate([{
            transform
          }], {
            duration: 500,
            fill: "forwards",
            easing: "cubic-bezier(0, 0.55, 0.45, 1)"
          });
          animation.onfinish = onfinish;
          return () => {
            animation.cancel();
          };
        }, [diceDomNode, diceAnimation]);
        const onSkull = diceIsOnSkull(dice);
        const diceX = diceAnimation && diceAnimation.from ? diceAnimation.from.x : dragGesture ? dragGesture.x : x;
        const diceY = diceAnimation && diceAnimation.from ? diceAnimation.from.y : dragGesture ? dragGesture.y : y;
        const diceZIndex = dragGesture || diceAnimation ? 1000 : zIndex;

        // if (dice.id === 4 && !dragGesture) {
        //   console.log({
        //     diceX,
        //     diceY,
        //     diceAnimation: Boolean(diceAnimation),
        //     dragGesture: Boolean(dragGesture),
        //   })
        // }

        return /*#__PURE__*/jsx(Portal, {
          parent: portalParentNode,
          children: /*#__PURE__*/jsx("svg", {
            "data-dice-id": dice.id,
            className: "dice",
            onClick: draggable ? undefined : clickEvent => {
              onDiceClick(dice, clickEvent);
            },
            style: {
              width: diceSize,
              height: diceSize,
              left: `${diceX}px`,
              top: `${diceY}px`,
              zIndex: diceZIndex,
              cursor: draggable ? diceGripped ? "grabbing" : "grab" : undefined,
              position: dragGesture || diceAnimation ? "fixed" : undefined
            },
            children: /*#__PURE__*/jsxs("g", {
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
              },
              children: [/*#__PURE__*/jsx("rect", {
                className: "dice-background",
                width: "100%",
                height: "100%",
                rx: "5",
                ry: "5",
                fill: computeDiceColors(onSkull, isDiceKept).fill,
                stroke: computeDiceColors(onSkull, isDiceKept).stroke,
                strokeWidth: "1"
              }), /*#__PURE__*/jsx("image", {
                href: symbolToImageUrl(diceToVisibleSymbol(dice)),
                draggable: "false",
                style: {
                  width: "100%",
                  height: "100%"
                }
              })]
            })
          })
        });
      };
      computeDiceColors = (onSkull, isDiceKept) => {
        if (onSkull) {
          return {
            fill: "black",
            stroke: "black"
          };
        } else if (isDiceKept) {
          return {
            fill: "none",
            stroke: "none"
          };
        }
        return {
          fill: "#eaeaea",
          stroke: "#b9b9b9"
        };
      };
      DiceContainer = _ref => {
        let {
          offscreenDomNode,
          chestDomNode,
          rolledAreaDomNode,
          cursedAreaDomNode,
          onDiceOverChestChange = () => {},
          onDiceOverRolledAreaChange = () => {}
        } = _ref;
        // global state
        const dices = useDices();
        const chestSlots = useChestSlots();
        const diceRolledIds = useDiceRolledIds();
        const diceCursedIds = useDiceCursedIds();
        const witchUncursedDiceId = useWitchUncursedDiceId();
        const witchCardEffectUsed = useWitchCardEffectUsed();
        const currentCard = cardIdToCard(useCurrentCardId());
        const scoreMarked = useScoreMarked();
        const threeSkullsOrMore = useThreeSkullsOrMore();
        const hasDicesToCurse = useHasDicesToCurse();
        // local state
        const [diceAnimationState, dispatchDiceAnimation] = __jsenv_default_import__.useReducer((state, action) => {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            [action.key]: action.value
          });
        }, {});
        // actions
        const setDiceRolledAreaPosition = useSetDiceRolledAreaPosition();
        const keepDice = useKeepDice();
        const unkeepDice = useUnkeepDice();
        const uncurseDice = useUncurseDice();
        const setDiceChestSlot = useSetDiceChestSlot();
        // other
        const dropTargetRef = __jsenv_default_import__.useRef(null);
        return Object.keys(dices).map(diceId => {
          const dice = dices[diceId];
          const diceLocation = diceToLocation(dice, {
            chestSlots,
            diceRolledIds,
            diceCursedIds
          });
          const propsFromLocation = diceLocationToProps(diceLocation, {
            chestDomNode,
            rolledAreaDomNode,
            cursedAreaDomNode,
            offscreenDomNode
          });
          const {
            parentNode
          } = propsFromLocation;
          const diceIsGoingToBeCursed = dice.id !== witchUncursedDiceId && parentNode === rolledAreaDomNode && diceIsOnSkull(dice);
          const diceIsInCursedArea = parentNode === cursedAreaDomNode;
          const diceIsInRolledArea = diceIsInRolledAreaGetter(dice, diceRolledIds);

          // we use useCallback because it prevents dices
          // from being re-rendered and drag gesture to become
          // shortly unavailable while react is rerendering
          const onDiceClick = __jsenv_default_import__.useCallback(dice => {
            const clickEffect = getClickEffect(dice, {
              currentCard,
              witchCardEffectUsed,
              diceIsInRolledArea,
              diceIsInCursedArea,
              chestSlots,
              hasDicesToCurse,
              threeSkullsOrMore,
              scoreMarked
            });
            // console.log(`click dice#${dice.id} -> ${clickEffect} effect`)
            if (clickEffect === "keep") {
              const firstAvailableChestSlot = firstAvailableChestSlotGetter(chestSlots);
              keepDice(dice, firstAvailableChestSlot);
            } else if (clickEffect === "unkeep") {
              unkeepDice(dice);
            } else if (clickEffect === "uncurse") {
              uncurseDice(dice);
            }
          }, [diceIsInRolledArea, diceIsInCursedArea, chestSlots, scoreMarked, threeSkullsOrMore, currentCard, witchCardEffectUsed]);
          const onDiceDrag = __jsenv_default_import__.useCallback((dice, dragDiceGesture) => {
            dropTargetRef.current = dropTargetGetter({
              dragDiceGesture,
              chestDomNode,
              rolledAreaDomNode
            });
            const dropEffect = getDropEffect(dice, {
              diceIsInRolledArea,
              chestSlots,
              dropTargetRef,
              rolledAreaDomNode,
              chestDomNode,
              hasDicesToCurse,
              threeSkullsOrMore,
              scoreMarked
            });
            dragDiceGesture.setDropEffect(dropEffect);
            onDiceOverChestChange(dropEffect === "keep" ? dice : null);
            onDiceOverRolledAreaChange(dropEffect === "unkeep" ? dice : null);
          }, [diceIsInRolledArea, chestSlots, dropTargetRef, rolledAreaDomNode, chestDomNode, scoreMarked, threeSkullsOrMore, onDiceOverChestChange, onDiceOverRolledAreaChange]);
          const onDiceDrop = __jsenv_default_import__.useCallback((dice, dropDiceGesture) => {
            const dropEffect = getDropEffect(dice, {
              diceIsInRolledArea,
              chestSlots,
              dropTargetRef,
              rolledAreaDomNode,
              chestDomNode,
              scoreMarked,
              threeSkullsOrMore
            });
            // console.log(`drop dice#${dice.id} -> ${dropEffect} effect`)

            let dropAnimation = false;
            let dropPosition = null;
            if (dropEffect === "reposition-in-rolled-area") {
              const closestRolledAreaPosition = closestRolledAreaPositionGetter(dropDiceGesture.diceRectangle, rolledAreaDomNode);
              const highestRolledAreaZIndex = highestRolledAreaZIndexGetter(dice, {
                dices,
                diceRolledIds
              });
              setDiceRolledAreaPosition(dice, closestRolledAreaPosition, highestRolledAreaZIndex);
              // no animation needed, we drop exactly where we want it
            } else if (dropEffect === "back-to-rolled-area") {
              dropAnimation = true;
              dropPosition = rolledAreaDropPositionGetter(dice.rolledAreaPosition, rolledAreaDomNode);
            } else if (dropEffect === "keep") {
              const closestAvailableChestSlot = closestAvailableChestSlotGetter(dice, {
                chestSlots,
                rectangle: dropDiceGesture.diceRectangle,
                chestDomNode
              });
              keepDice(dice, closestAvailableChestSlot);
              dropAnimation = true;
              dropPosition = chestSlotDropPositionGetter(closestAvailableChestSlot, chestDomNode);
            } else if (dropEffect === "reposition-in-chest") {
              const closestAvailableChestSlot = closestAvailableChestSlotGetter(dice, {
                chestSlots,
                rectangle: dropDiceGesture.diceRectangle,
                chestDomNode
              });
              const diceChestSlot = diceToChestSlot(dice, chestSlots);
              if (diceChestSlot !== closestAvailableChestSlot) {
                setDiceChestSlot(dice, closestAvailableChestSlot);
                dropAnimation = true;
                dropPosition = chestSlotDropPositionGetter(closestAvailableChestSlot, chestDomNode);
              }
            } else if (dropEffect === "back-to-chest") {
              const diceChestSlot = diceToChestSlot(dice, chestSlots);
              dropAnimation = true;
              dropPosition = chestSlotDropPositionGetter(diceChestSlot, chestDomNode);
            } else if (dropEffect === "unkeep") {
              const closestRolledAreaPosition = closestRolledAreaPositionGetter(dropDiceGesture.diceRectangle, rolledAreaDomNode);
              setDiceRolledAreaPosition(dice, closestRolledAreaPosition, highestRolledAreaZIndexGetter(dice, {
                dices,
                diceRolledIds
              }));
              unkeepDice(dice);
              dropAnimation = true;
              dropPosition = rolledAreaDropPositionGetter(closestRolledAreaPosition, rolledAreaDomNode);
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
                  onfinish: () => {
                    // at the end of dice animation, dice is flickering briely
                    // (moving somewhere on the page and going back to where it's supposed to be)
                    // the following setTimeout fixes this
                    // of course we should improve that because it's an hint there is a deeper
                    // issue to resolve.
                    setTimeout(() => {
                      dispatchDiceAnimation({
                        key: dice.id,
                        value: null
                      });
                    });
                  }
                }
              });
            }
          }, [diceIsInRolledArea, chestSlots, dropTargetRef, rolledAreaDomNode, chestDomNode, scoreMarked, threeSkullsOrMore]);
          const onDiceDragEnd = __jsenv_default_import__.useCallback(() => {
            onDiceOverChestChange(null);
            onDiceOverRolledAreaChange(null);
          }, [onDiceOverChestChange, onDiceOverRolledAreaChange]);
          const props = _objectSpread2(_objectSpread2({
            key: dice.id
          }, propsFromLocation), {}, {
            dice,
            diceAnimation: diceAnimationState[dice.id],
            witchCardEffectUsed,
            disapear: diceIsGoingToBeCursed,
            appear: diceIsInCursedArea,
            onDiceClick,
            onDiceDrag,
            onDiceDrop,
            onDiceDragEnd
          });
          return __jsenv_default_import__.useMemo(() => /*#__PURE__*/jsx(Dice, _objectSpread2({}, props)), Object.keys(props).map(key => props[key]));
        });
      };
      getClickEffect = (dice, _ref2) => {
        let {
          currentCard,
          witchCardEffectUsed,
          diceIsInRolledArea,
          diceIsInCursedArea,
          chestSlots,
          hasDicesToCurse,
          threeSkullsOrMore,
          scoreMarked
        } = _ref2;
        if (diceIsInRolledArea) {
          if (keepDiceAllowedGetter(dice, {
            hasDicesToCurse,
            threeSkullsOrMore,
            scoreMarked
          })) {
            return "keep";
          }
          return "none";
        }
        if (diceIsInChestGetter(dice, chestSlots)) {
          if (unkeepDiceAllowedGetter(dice, {
            threeSkullsOrMore,
            scoreMarked
          })) {
            return "unkeep";
          }
          return "none";
        }
        if (diceIsInCursedArea) {
          if (uncurseDiceAllowedGetter(dice, {
            currentCard,
            witchCardEffectUsed,
            scoreMarked,
            threeSkullsOrMore
          })) {
            return "uncurse";
          }
          return "none";
        }
        return "none";
      };
      getDropEffect = (dice, _ref3) => {
        let {
          diceIsInRolledArea,
          chestSlots,
          dropTargetRef,
          rolledAreaDomNode,
          chestDomNode,
          hasDicesToCurse,
          threeSkullsOrMore,
          scoreMarked
        } = _ref3;
        if (diceIsInRolledArea) {
          if (dropTargetRef.current === rolledAreaDomNode) {
            return "reposition-in-rolled-area";
          }
          if (dropTargetRef.current === chestDomNode) {
            if (keepDiceAllowedGetter(dice, {
              hasDicesToCurse,
              threeSkullsOrMore,
              scoreMarked
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
              scoreMarked,
              threeSkullsOrMore
            })) {
              return "unkeep";
            }
            return "back-to-chest";
          }
          return "back-to-chest";
        }
        return "none";
      };
      dropTargetGetter = _ref4 => {
        let {
          dragDiceGesture,
          chestDomNode,
          rolledAreaDomNode
        } = _ref4;
        const diceIsOverChest = domNodeCollidesWithRectangle(chestDomNode, dragDiceGesture.diceRectangle);
        if (diceIsOverChest) {
          return chestDomNode;
        }
        const diceIsOverRolledArea = domNodeCollidesWithRectangle(rolledAreaDomNode, dragDiceGesture.diceRectangle);
        if (diceIsOverRolledArea) {
          return rolledAreaDomNode;
        }
        return null;
      };
      diceIsInRolledAreaGetter = (dice, diceRolledIds) => diceRolledIds.includes(dice.id);
      diceIsInChestGetter = (dice, chestSlots) => Object.keys(chestSlots).some(chestSlot => {
        const chestSlotContent = chestSlots[chestSlot];
        return chestSlotContent && chestSlotContent.type === "dice" && chestSlotContent.value === dice.id;
      }); // const diceIsInCursedAreaGetter = (dice, diceCursedIds) => diceCursedIds.includes(dice.id)
      keepDiceAllowedGetter = (dice, _ref5) => {
        let {
          hasDicesToCurse,
          threeSkullsOrMore,
          scoreMarked
        } = _ref5;
        if (diceIsOnSkull(dice)) {
          return false;
        }
        if (hasDicesToCurse) {
          return false;
        }
        if (threeSkullsOrMore) {
          return false;
        }
        if (scoreMarked) {
          return false;
        }
        return true;
      };
      unkeepDiceAllowedGetter = (dice, _ref6) => {
        let {
          scoreMarked,
          threeSkullsOrMore
        } = _ref6;
        if (scoreMarked) {
          return false;
        }
        if (threeSkullsOrMore) {
          return false;
        }
        return true;
      };
      uncurseDiceAllowedGetter = (dice, _ref7) => {
        let {
          currentCard,
          witchCardEffectUsed,
          scoreMarked,
          threeSkullsOrMore
        } = _ref7;
        if (!isWitchCard(currentCard)) {
          return false;
        }
        if (witchCardEffectUsed) {
          return false;
        }
        if (scoreMarked) {
          return false;
        }
        if (threeSkullsOrMore) {
          return false;
        }
        return true;
      };
      rolledAreaDropPositionGetter = (rolledAreaPosition, rolledAreaDomNode) => {
        const absoluteRolledAreaPositionRectangle = rectangleAbsoluteToDomNode({
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
      chestSlotDropPositionGetter = (chestSlot, chestDomNode) => {
        const destinationSlotDomNode = chestSlotToChestSlotDomNode(chestSlot, chestDomNode);
        const destinationSlotRectangle = getDomNodeRectangle(destinationSlotDomNode);
        return {
          // + 5 is because dice is centered in the chest slot
          x: destinationSlotRectangle.left + 5,
          y: destinationSlotRectangle.top + 5
        };
      };
      closestRolledAreaPositionGetter = (requestedRectangle, rolledAreaDomNode) => {
        const rectangle = rectangleRelativeToDomNode(requestedRectangle, rolledAreaDomNode);
        const closestRolledAreaPosition = {
          x: rectangle.left,
          y: rectangle.top
        };
        return closestRolledAreaPosition;
      };
      highestRolledAreaZIndexGetter = (dice, _ref8) => {
        let {
          diceRolledIds,
          dices
        } = _ref8;
        if (diceRolledIds.length === 0) {
          return 1;
        }
        const diceWithHighestZIndex = diceRolledIds.slice(1).reduce((previous, diceId) => {
          const dice = dices[diceId];
          const diceZIndex = dice.rolledAreaZIndex;
          if (diceZIndex > previous.rolledAreaZIndex) return dice;
          return previous;
        }, dices[diceRolledIds[0]]);
        if (diceWithHighestZIndex === dice) return dice.rolledAreaZIndex;
        return diceWithHighestZIndex.rolledAreaZIndex + 1;
      };
      firstAvailableChestSlotGetter = chestSlots => {
        const firstAvailableChestSlot = Object.keys(chestSlots).find(chestSlot => {
          const chestSlotContent = chestSlots[chestSlot];
          return !chestSlotContent;
        });
        return firstAvailableChestSlot;
      };
      closestAvailableChestSlotGetter = (dice, _ref9) => {
        let {
          chestSlots,
          rectangle,
          chestDomNode
        } = _ref9;
        const chestSlotMap = new Map();
        const domNodeCandidates = [];
        Object.keys(chestSlots).forEach(chestSlot => {
          const chestSlotContent = chestSlots[chestSlot];
          const chestSlotIsEmpty = !chestSlotContent;
          if (chestSlotIsEmpty || chestSlotContent.type === "dice" && chestSlotContent.value === dice.id) {
            const chestSlotDomNode = chestSlotToChestSlotDomNode(chestSlot, chestDomNode);
            chestSlotMap.set(chestSlotDomNode, chestSlot);
            domNodeCandidates.push(chestSlotDomNode);
          }
        });
        const closestDomNode = findDomNodeClosestToRectangle(domNodeCandidates, rectangle);
        const closestChestSlot = chestSlotMap.get(closestDomNode);
        return closestChestSlot;
      };
      diceToChestSlot = (dice, chestSlots) => {
        const diceChestSlot = Object.keys(chestSlots).find(chestSlot => {
          const chestSlotContent = chestSlots[chestSlot];
          return chestSlotContent && chestSlotContent.type === "dice" && chestSlotContent.value === dice.id;
        });
        return diceChestSlot;
      };
      chestSlotToChestSlotDomNode = (chestSlot, chestDomNode) => {
        const chestSlotDomNode = chestDomNode.querySelector(`[data-chest-slot="${chestSlot}"]`);
        return chestSlotDomNode;
      };
      diceToLocation = (dice, _ref10) => {
        let {
          chestSlots,
          diceRolledIds,
          diceCursedIds
        } = _ref10;
        const diceChestSlot = Object.keys(chestSlots).find(chestSlot => chestSlots[chestSlot] && chestSlots[chestSlot].type === "dice" && chestSlots[chestSlot].value === dice.id);
        if (diceChestSlot) {
          return {
            type: "chest-slot",
            value: diceChestSlot
          };
        }
        if (diceRolledIds.includes(dice.id)) {
          return {
            type: "rolled-area",
            value: _objectSpread2(_objectSpread2({}, dice.rolledAreaPosition), {}, {
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
      diceLocationToProps = (_ref11, _ref12) => {
        let {
          type,
          value
        } = _ref11;
        let {
          chestDomNode,
          rolledAreaDomNode,
          cursedAreaDomNode,
          offscreenDomNode
        } = _ref12;
        if (type === "chest-slot") {
          return {
            parentNode: chestDomNode.querySelector(`[data-chest-slot="${value}"]`),
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
      DrawCardDialog = _ref => {
        let {
          dialogIsOpen,
          closeDialog,
          headerSmallCardRef
        } = _ref;
        const cardDeck = useCardDeck();
        const currentCardId = useCurrentCardId();
        const currentCard = cardIdToCard(currentCardId) || null;
        const backCardRef = __jsenv_default_import__.useRef();
        const topCardRef = __jsenv_default_import__.useRef();
        const smallCardRef = __jsenv_default_import__.useRef();
        const shuffleCardsText = "Paquet de cartes épuisé. Mélangez-le pour pouvoir piocher à nouveau !";
        const drawCardText = "Piochez une carte pour le tour suivant.";
        return /*#__PURE__*/jsx(Dialog, {
          className: "draw-card-dialog dialog-spacing-10 dialog-spacing-fluid",
          isOpen: dialogIsOpen,
          onRequestClose: closeDialog,
          requestCloseOnClickOutside: false,
          children: /*#__PURE__*/jsxs("div", {
            className: "dialog-content",
            children: [/*#__PURE__*/jsxs("div", {
              className: "dialog-body",
              children: [/*#__PURE__*/jsxs("div", {
                className: "dialog-label",
                children: [cardDeck.length === 0 && !currentCard && shuffleCardsText, cardDeck.length !== 0 && !currentCard && drawCardText, currentCard && /*#__PURE__*/jsx("span", {
                  className: "card-name",
                  children: cardsRules[currentCard.type].name
                })]
              }), /*#__PURE__*/jsx("div", {
                className: "card-area",
                children: /*#__PURE__*/jsxs("div", {
                  style: {
                    position: "relative"
                  },
                  children: [/*#__PURE__*/jsx(BackCard, {
                    backCardRef: backCardRef,
                    currentCard: currentCard,
                    remainingCardCount: cardDeck.length
                  }), /*#__PURE__*/jsx(TopCard, {
                    topCardRef: topCardRef,
                    smallCardRef: smallCardRef,
                    currentCard: currentCard
                  })]
                })
              })]
            }), /*#__PURE__*/jsxs("div", {
              className: "dialog-actions",
              children: [/*#__PURE__*/jsx(DeckButton, {
                backCardRef: backCardRef,
                cardDeck: cardDeck,
                currentCard: currentCard
              }), currentCard ? /*#__PURE__*/jsx(StartButton, {
                headerSmallCardRef: headerSmallCardRef,
                smallCardRef: smallCardRef,
                backCardRef: backCardRef,
                topCardRef: topCardRef,
                currentCard: currentCard,
                closeDialog: closeDialog
              }) : null]
            })]
          })
        });
      };
      BackCard = _ref2 => {
        let {
          backCardRef,
          currentCard,
          remainingCardCount
        } = _ref2;
        return /*#__PURE__*/jsxs("div", {
          ref: backCardRef,
          className: "card default-card",
          style: {
            background: "none"
          },
          children: [/*#__PURE__*/jsx(Image, {
            src: cardDefaultUrl,
            width: "150"
          }), currentCard ? null : /*#__PURE__*/jsx("div", {
            className: "remaining-cards-number",
            children: remainingCardCount
          })]
        });
      };
      TopCard = _ref3 => {
        let {
          topCardRef,
          smallCardRef,
          currentCard
        } = _ref3;
        if (!currentCard) {
          return null;
        }
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx("div", {
            className: "card current-card",
            ref: topCardRef,
            children: /*#__PURE__*/jsx("div", {
              className: "flip-card",
              children: /*#__PURE__*/jsxs("div", {
                className: "flip-card-inner",
                children: [/*#__PURE__*/jsx("div", {
                  className: "flip-card-front",
                  children: /*#__PURE__*/jsx(Image, {
                    className: "card default-card",
                    src: cardDefaultUrl
                  })
                }), /*#__PURE__*/jsx("div", {
                  className: "flip-card-back",
                  children: /*#__PURE__*/jsx(Image, {
                    className: "card-img",
                    src: cardToImageUrl(currentCard),
                    width: "150",
                    alt: currentCard.type
                  })
                })]
              })
            })
          }), /*#__PURE__*/jsx("div", {
            className: "small-card",
            children: /*#__PURE__*/jsx(SmallCard, {
              card: currentCard,
              ref: smallCardRef
            })
          })]
        });
      };
      DeckButton = _ref4 => {
        let {
          backCardRef,
          cardDeck,
          currentCard
        } = _ref4;
        if (currentCard) {
          return null;
        }
        if (cardDeck.length === 0) {
          return /*#__PURE__*/jsx(ButtonShuffleDeck, {
            backCardRef: backCardRef
          });
        }
        return /*#__PURE__*/jsx(ButtonDrawCard, {});
      };
      ButtonDrawCard = () => {
        const drawCard = useDrawCard();
        return /*#__PURE__*/jsx("button", {
          className: "button-card-main button-draw-card",
          onClick: drawCard,
          children: "Piocher"
        });
      };
      ButtonShuffleDeck = _ref5 => {
        let {
          backCardRef
        } = _ref5;
        const animationsDisabled = useAnimationsDisabled();
        const shuffleDeck = useShuffleDeck();
        const [shufflePending, sufflePendingSetter] = __jsenv_default_import__.useState(false);
        const startShuffle = () => {
          sufflePendingSetter(true);
        };
        __jsenv_default_import__.useEffect(() => {
          if (!shufflePending) {
            return () => {};
          }
          shuffleDeck();
          if (animationsDisabled) {
            sufflePendingSetter(false);
            return () => {};
          }
          return animateDeckShuffle({
            backCard: backCardRef.current,
            duration: 1000,
            onfinish: () => {
              sufflePendingSetter(false);
            }
          });
        }, [shufflePending]);
        return /*#__PURE__*/jsx("button", {
          className: "button-card-main button-shuffle-deck",
          onClick: startShuffle,
          children: "M\xE9langer"
        });
      };
      animateDeckShuffle = _ref6 => {
        let {
          backCard,
          duration,
          onfinish
        } = _ref6;
        backCard.setAttribute("shaking-deck", "");
        const timeoutId = setTimeout(() => {
          backCard.removeAttribute("shaking-deck", "");
          onfinish();
        }, duration);
        return () => {
          backCard.removeAttribute("shaking-deck", "");
          clearTimeout(timeoutId);
        };
      };
      StartButton = _ref7 => {
        let {
          headerSmallCardRef,
          smallCardRef,
          backCardRef,
          topCardRef
        } = _ref7;
        const animationsDisabled = useAnimationsDisabled();
        const activateCurrentCard = useActivateCurrentCard();
        const [cardActivating, cardActivatingSetter] = __jsenv_default_import__.useState(false);
        const start = () => {
          if (cardActivating) {
            return;
          }
          cardActivatingSetter(true);
        };
        __jsenv_default_import__.useEffect(() => {
          if (!cardActivating) {
            return () => {};
          }
          if (animationsDisabled) {
            activateCurrentCard();
            return () => {};
          }
          return animateCardActivation({
            headerSmallCard: headerSmallCardRef.current,
            smallCard: smallCardRef.current,
            backCard: backCardRef.current,
            topCard: topCardRef.current,
            duration: 500,
            onfinish: () => {
              activateCurrentCard();
            }
          });
        }, [cardActivating]);
        return /*#__PURE__*/jsx("button", {
          className: "button-card-main button-activate-card",
          onClick: () => {
            start();
          },
          children: "Commencer"
        });
      };
      animateCardActivation = _ref8 => {
        let {
          headerSmallCard,
          topCard,
          backCard,
          smallCard,
          duration,
          onfinish
        } = _ref8;
        backCard.style.opacity = 0;
        const headerSmallCardRectangle = getDomNodeRectangle(headerSmallCard);
        const topCardAnimation = topCard.animate([{
          transform: "scale(1)",
          opacity: 1
        }, {
          transform: "scale(0)",
          opacity: 0
        }], {
          duration,
          fill: "forwards"
        });
        const smallCardAnimation = smallCard.animate([{
          transform: "scale(0)",
          opacity: 0,
          position: "fixed",
          top: `${headerSmallCardRectangle.top}.px`,
          left: `${headerSmallCardRectangle.left}.px`
        }, {
          transform: "scale(1)",
          opacity: 1,
          position: "fixed",
          top: `${headerSmallCardRectangle.top}.px`,
          left: `${headerSmallCardRectangle.left}.px`
        }], {
          duration,
          fill: "forwards"
        });
        smallCardAnimation.onfinish = onfinish;
        return () => {
          topCardAnimation.cancel();
          smallCardAnimation.cancel();
        };
      };
      Round = _ref => {
        let {
          openScoreboard,
          onRoundStart,
          onRoundOver
        } = _ref;
        const currentCardActivated = useCurrentCardActivated();
        const [roundMounted, roundMountedSetter] = __jsenv_default_import__.useState(false);
        __jsenv_default_import__.useEffect(() => {
          onRoundStart();
        }, []);
        const [diceOverRolledAreaListener, diceOverRolledAreaEmitter] = useSignal();
        const [diceOverChestListener, diceOverChestEmitter] = useSignal();
        const headerSmallCardRef = __jsenv_default_import__.useRef();
        return /*#__PURE__*/jsxs("div", {
          className: "round-container",
          children: [/*#__PURE__*/jsx(CardsEffects, {}), /*#__PURE__*/jsx(Header, {
            openScoreboard: openScoreboard,
            headerSmallCardRef: headerSmallCardRef
          }), currentCardActivated ? /*#__PURE__*/jsx(RoundGameBoard, {
            diceOverRolledAreaListener: diceOverRolledAreaListener,
            diceOverChestListener: diceOverChestListener,
            openScoreboard: openScoreboard,
            onRoundOver: onRoundOver,
            onRoundMounted: refs => {
              roundMountedSetter(refs);
            }
          }) : null, roundMounted ? /*#__PURE__*/jsx(DiceContainer, {
            offscreenDomNode: roundMounted.offscreenDomNode,
            chestDomNode: roundMounted.chestDomNode,
            rolledAreaDomNode: roundMounted.rolledAreaDomNode,
            cursedAreaDomNode: roundMounted.cursedAreaDomNode,
            onDiceOverChestChange: diceOverChestEmitter,
            onDiceOverRolledAreaChange: diceOverRolledAreaEmitter
          }) : null, /*#__PURE__*/jsx(DrawCardDialog, {
            dialogIsOpen: !currentCardActivated,
            headerSmallCardRef: headerSmallCardRef
          })]
        });
      };
      RoundGameBoard = _ref2 => {
        let {
          diceOverRolledAreaListener,
          diceOverChestListener,
          onRoundMounted,
          onRoundOver
        } = _ref2;
        const rolledAreaRef = __jsenv_default_import__.useRef(null);
        const chestRef = __jsenv_default_import__.useRef(null);
        const cursedAreaRef = __jsenv_default_import__.useRef(null);
        const offscreenRef = __jsenv_default_import__.useRef(null);
        __jsenv_default_import__.useEffect(() => {
          onRoundMounted({
            rolledAreaDomNode: rolledAreaRef.current,
            chestDomNode: chestRef.current,
            cursedAreaDomNode: cursedAreaRef.current,
            offscreenDomNode: offscreenRef.current
          });
        }, []);
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx(RoundEffects, {}), /*#__PURE__*/jsxs("div", {
            className: "chest-and-skulls",
            children: [/*#__PURE__*/jsx(Chest, {
              chestRef: chestRef,
              diceOverChestListener: diceOverChestListener
            }), /*#__PURE__*/jsx(SkullIsland, {
              cursedAreaRef: cursedAreaRef
            })]
          }), /*#__PURE__*/jsx(DiceOnGoing, {
            rolledAreaRef: rolledAreaRef,
            offscreenRef: offscreenRef,
            diceOverRolledAreaListener: diceOverRolledAreaListener
          }), /*#__PURE__*/jsx(Footer, {
            onRoundOver: onRoundOver,
            rolledAreaRef: rolledAreaRef
          })]
        });
      };
      StartPlayerRoundDialog = _ref => {
        let {
          closeDialog,
          dialogIsOpen,
          player
        } = _ref;
        const startPlayerRound = useStartPlayerRound();
        return /*#__PURE__*/jsx(Dialog, {
          className: "score-board-dialog dialog-spacing-10 dialog-spacing-fluid dialog-spacing-left-fixed dialog-spacing-right-fixed",
          isOpen: dialogIsOpen,
          onRequestClose: closeDialog,
          requestCloseOnClickOutside: true,
          children: /*#__PURE__*/jsxs("div", {
            className: "dialog-content",
            children: [/*#__PURE__*/jsx("div", {
              className: "dialog-close",
              onClick: closeDialog,
              children: /*#__PURE__*/jsx(CloseIcon, {})
            }), /*#__PURE__*/jsxs("div", {
              className: "dialog-body",
              children: [/*#__PURE__*/jsxs("div", {
                children: ["Au tour de", /*#__PURE__*/jsx("div", {
                  className: "dialog-label",
                  children: player.character.name
                }), /*#__PURE__*/jsx(Image, {
                  className: "player-img",
                  src: player && player.character.img,
                  alt: "player",
                  width: "40",
                  height: "40",
                  style: {
                    boxShadow: `inset 0px 0px 0px 4px ${player && player.character.color || "black"}`
                  }
                })]
              }), /*#__PURE__*/jsx("div", {
                className: "dialog-actions",
                children: /*#__PURE__*/jsx("button", {
                  onClick: () => {
                    closeDialog();
                    startPlayerRound(player);
                  },
                  children: "Jouer"
                })
              })]
            })]
          })
        });
      };
      winTreasureUrl = new URL(__v__("/other/win-treasure.png"), _context.meta.url);
      boarUrl = new URL(__v__("/other/boat.png"), _context.meta.url);
      SCORE_MAX = 6000;
      pathList = {
        path1: "M39.582,739.564c0-91.824,39.191-96.32,38.045-166.691s-30.042-70.37-47.326-161.729s38.128-86.388,31.276-186.42C55.405,134.602-3.014,89.176,8.812,129.825c5.333,18.333,30.77-21,30.77-129.825",
        path2: "M39.582,739.564c0-113.074-5.437-166.074-8.437-198.074s36-20.667,33.019-2c-1.796,11.248-24.583,13.333-23.699-22c1.229-49.158,22.68-111,23.68-169s-38-95-46-181S39.582,0,39.582,0",
        path3: "M39.582,739.564c0-71.926-15.437-155.074-17.437-253.074s30-185,31.087-217s-31.087-46-31.087-26s33,10,31-32s-31-110-31-144S39.582,0,39.582,0",
        path4: "M39.582,739.564c0-113.074-5.437-166.074-8.437-198.074s36-20.667,33.019-2c-1.796,11.248-24.583,13.333-23.699-22c1.229-49.158,22.68-111,23.68-169s-38-95-46-181S39.582,0,39.582,0"
      };
      ScoreBoard = _ref => {
        let {
          openedByUser,
          closeScoreboard,
          playerAnimation
        } = _ref;
        const players = usePlayers();
        const currentPlayer = useCurrentPlayer();
        const roundStarted = useRoundStarted();

        // dialogue StartPlayerRoundDialog
        const [startPlayerRoundDialogIsOpen, startPlayerRoundDialogIsOpenSetter] = __jsenv_default_import__.useState(false);
        const openStartPlayerRoundDialog = () => {
          startPlayerRoundDialogIsOpenSetter(true);
        };
        const closeStartPlayerRoundDialog = () => {
          startPlayerRoundDialogIsOpenSetter(false);
        };
        const nextPlayer = getNextPlayer();
        return /*#__PURE__*/jsxs("div", {
          className: "score-board-container",
          children: [openedByUser && /*#__PURE__*/jsx("div", {
            className: "cross",
            onClick: closeScoreboard,
            children: "X"
          }), !roundStarted && !currentPlayer && /*#__PURE__*/jsx("div", {
            className: "action-container",
            children: /*#__PURE__*/jsx("button", {
              className: "score-board-action",
              onClick: () => {
                openStartPlayerRoundDialog();
              },
              children: "Commencer \xE0 jouer"
            })
          }), /*#__PURE__*/jsx(Image, {
            className: "win-treasure-img",
            src: winTreasureUrl,
            alt: "win-treasure",
            width: "230",
            height: "150"
          }), /*#__PURE__*/jsx("div", {
            className: "users-path",
            children: players.map(player => /*#__PURE__*/jsx(PlayerPath, {
              player: player,
              openedByUser: openedByUser,
              pathCoordinates: pathList[`path${player.id}`],
              score: player.score,
              character: player.character,
              openStartPlayerRoundDialog: openStartPlayerRoundDialog,
              isCurrentPlayer: currentPlayer && player.id === currentPlayer.id,
              playerAnimation: playerAnimation
            }, player.id))
          }), /*#__PURE__*/jsx(StartPlayerRoundDialog, {
            dialogIsOpen: startPlayerRoundDialogIsOpen,
            closeDialog: closeStartPlayerRoundDialog,
            player: nextPlayer
          })]
        });
      };
      getNextPlayer = () => {
        const currentPlayer = useCurrentPlayer();
        const players = usePlayers();
        let nextPlayer;
        if (currentPlayer) {
          const currentPlayerIndex = players.findIndex(player => player.id === currentPlayer.id);
          nextPlayer = currentPlayerIndex === players.length - 1 ? players[0] : players[currentPlayerIndex + 1];
        } else {
          nextPlayer = players[0];
        }
        return nextPlayer;
      };
      PlayerPath = _ref2 => {
        let {
          pathCoordinates,
          player,
          openedByUser,
          character,
          score,
          openStartPlayerRoundDialog,
          playerAnimation
        } = _ref2;
        const pathForegroundElementRef = __jsenv_default_import__.useRef(null);
        const boatElementRef = __jsenv_default_import__.useRef(null);
        const animation3SkullsElementRef = __jsenv_default_import__.useRef(null);
        const animationSymbolsElementRef = __jsenv_default_import__.useRef(null);
        const nextPlayer = getNextPlayer();
        const [scoreAnimation, scoreAnimationSetter] = __jsenv_default_import__.useState(null);
        const [symbolsAnimation, symbolsAnimationSetter] = __jsenv_default_import__.useState([]);
        const [skullsAnimation, skullsAnimationSetter] = __jsenv_default_import__.useState(false);
        __jsenv_default_import__.useEffect(() => {
          if (playerAnimation && playerAnimation.player === player) {
            if (playerAnimation.roundOverReason === "user-collect") {
              scoreAnimationSetter(playerAnimation.score);
              symbolsAnimationSetter(playerAnimation.symbolsInChest);
            } else if (playerAnimation.roundOverReason === "3-skulls") {
              skullsAnimationSetter(true);
            } else if (playerAnimation.roundOverReason === "chalenge-failed") {
              scoreAnimationSetter(playerAnimation.score);
            }
          } else {
            scoreAnimationSetter(null);
          }
        }, [playerAnimation, player]);

        // // symbols animation
        // React.useEffect(() => {
        //   if (symbolsAnimation) {
        //     console.log(symbolsAnimation)
        //     //  HERE
        //   }
        // }, [symbolsAnimation])

        // score progress animation
        __jsenv_default_import__.useEffect(() => {
          if (!scoreAnimation) return undefined;
          const {
            from,
            to
          } = scoreAnimation;

          // Boat animation along the path
          const boatElement = boatElementRef.current;
          const boatAnimation = boatElement.animate([{
            offsetDistance: ratioToOffsetDistance(from / SCORE_MAX)
          }, {
            offsetDistance: ratioToOffsetDistance(to / SCORE_MAX)
          }], {
            duration: 1000,
            fill: "forwards"
          });

          // Symbols animation along the path (if exist)
          const symbolsElement = animationSymbolsElementRef.current;
          let symbolsAnimation = null;
          if (symbolsElement) {
            symbolsAnimation = symbolsElement.animate([{
              offsetDistance: ratioToOffsetDistance(from / SCORE_MAX)
            }, {
              offsetDistance: ratioToOffsetDistance(to / SCORE_MAX)
            }], {
              duration: 1000,
              fill: "forwards"
            });
          }

          // path animation
          const pathForegroundElement = pathForegroundElementRef.current;
          const pathLength = pathForegroundElement.getTotalLength();
          console.log("from", from);
          console.log("to", to);
          const pathForegroundAnimation = pathForegroundElement.animate([{
            strokeDashoffset: ratioToStrokeDashOffset(from / SCORE_MAX, pathLength)
          }, {
            strokeDashoffset: ratioToStrokeDashOffset(to / SCORE_MAX, pathLength)
          }], {
            duration: 1000,
            fill: "forwards"
          });
          pathForegroundAnimation.onfinish = () => {
            if (boatAnimation.playState === "finished") scoreAnimationSetter(null);
          };
          boatAnimation.onfinish = () => {
            if (pathForegroundAnimation.playState === "finished") scoreAnimationSetter(null);
          };
          return () => {
            pathForegroundAnimation.cancel();
            boatAnimation.cancel();
            if (symbolsAnimation) symbolsAnimation.cancel();
          };
        }, [scoreAnimation]);
        __jsenv_default_import__.useEffect(() => {
          // path-foreground line fill
          const pathForegroundElement = pathForegroundElementRef.current;
          const pathLength = pathForegroundElement.getTotalLength();
          pathForegroundElement.style.strokeDasharray = pathLength;
          pathForegroundElement.style.strokeDashoffset = ratioToStrokeDashOffset(score / SCORE_MAX, pathLength);
        }, [score]);
        return /*#__PURE__*/jsxs("div", {
          className: "user-path",
          children: [/*#__PURE__*/jsxs("svg", {
            viewBox: "0 0 79.164 739.564",
            width: "50",
            height: "450",
            fill: "none",
            stroke: "none",
            children: [/*#__PURE__*/jsx("path", {
              d: pathCoordinates,
              className: "path-background"
            }), /*#__PURE__*/jsx("path", {
              ref: pathForegroundElementRef,
              d: pathCoordinates,
              className: "path-foreground"
            }), /*#__PURE__*/jsxs("g", {
              className: "score-indicator",
              children: [/*#__PURE__*/jsx("image", {
                ref: boatElementRef,
                href: boarUrl,
                width: "26",
                height: "26",
                className: "boat",
                style: {
                  offsetPath: `path('${pathCoordinates}')`,
                  offsetDistance: ratioToOffsetDistance(score / SCORE_MAX)
                }
              }), symbolsAnimation && symbolsAnimation.length > 0 && /*#__PURE__*/jsx("g", {
                className: "animation-symbols",
                ref: animationSymbolsElementRef,
                style: {
                  offsetPath: `path('${pathCoordinates}')`,
                  offsetDistance: ratioToOffsetDistance(score / SCORE_MAX)
                },
                children: symbolsAnimation.map((symbol, index) => /*#__PURE__*/jsx("image", {
                  width: "30",
                  height: "30",
                  className: `symbol symbol-${index + 1}`,
                  href: symbolToImageUrl(symbol)
                }, index))
              })]
            })]
          }), /*#__PURE__*/jsx("div", {
            className: "speech-bubble",
            children: score
          }), /*#__PURE__*/jsxs("div", {
            className: `user-avatar ${nextPlayer.character.id === character.id && !openedByUser ? "next-player" : ""}`,
            onClick: () => {
              if (nextPlayer.character.id === character.id && !openedByUser) openStartPlayerRoundDialog();
            },
            children: [skullsAnimation && /*#__PURE__*/jsx("div", {
              className: "animation-3skulls",
              ref: animation3SkullsElementRef,
              children: /*#__PURE__*/jsx(ThreeSkullsAnimated, {})
            }), /*#__PURE__*/jsx(Avatar, {
              character: character
            })]
          })]
        });
      };
      ratioToOffsetDistance = ratio => `${ratio * 100}%`;
      ratioToStrokeDashOffset = (ratio, pathLength) => pathLength - ratio * pathLength;
      ThreeSkullsAnimated = () => new Array(3).fill("").map((item, index) => /*#__PURE__*/jsx(Image, {
        width: "30",
        height: "30",
        className: `skull skull-${index + 1}`,
        src: symbolSkullUrl,
        animateLoaded: false
      }, index));
      Avatar = _ref3 => {
        let {
          character
        } = _ref3;
        return /*#__PURE__*/jsx(Image, {
          className: "player-img",
          src: character.img,
          alt: "player",
          width: "40",
          height: "40",
          style: {
            boxShadow: `inset 0px 0px 0px 4px ${character.color || "black"}`
          }
        });
      };
      GameConfiguration = () => {
        const setPlayerCount = useSetPlayerCount();
        return /*#__PURE__*/jsxs("div", {
          className: "game-configuration",
          children: [/*#__PURE__*/jsx("div", {
            className: "background-image"
          }), /*#__PURE__*/jsxs("div", {
            className: "content",
            children: [/*#__PURE__*/jsx("div", {
              className: "title",
              children: "A l\u2019abordage !"
            }), /*#__PURE__*/jsx("div", {
              className: "subtitle",
              children: "Combien de joueurs participent \xE0 l\u2019aventure ?"
            }), /*#__PURE__*/jsx("div", {
              className: "buttons",
              children: [1, 2, 3, 4, 5].map(playerCount => {
                return /*#__PURE__*/jsx("button", {
                  onClick: () => {
                    setPlayerCount(playerCount);
                  },
                  children: playerCount
                }, playerCount);
              })
            })]
          })]
        });
      };
      useSetPlayerCount = createAction((state, playerCount) => {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          players: new Array(playerCount).fill("").map((_, index) => {
            return {
              id: index + 1,
              number: index + 1,
              score: 0
            };
          })
        });
      });
      luffyUrl = String(new URL(__v__("/other/Luffy.png"), _context.meta.url));
      missFortuneUrl = String(new URL(__v__("/other/miss_fortune.png"), _context.meta.url));
      jackSparrowUrl = String(new URL(__v__("/other/JackSparrow.png"), _context.meta.url));
      barbeRougeUrl = String(new URL(__v__("/other/BarbeRouge.png"), _context.meta.url));
      ginetteBouletteUrl = String(new URL(__v__("/other/GinetteBoulette.png"), _context.meta.url));
      capitaineCrochetUrl = String(new URL(__v__("/other/CapitaineCrochet.png"), _context.meta.url));
      CHARACTERS = [{
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
      CharacterSelection = _ref => {
        let {
          players
        } = _ref;
        const setPlayerCharacter = useSetPlayerCharacter();
        const startGame = useStartGame();
        const playerWithoutCharacter = players.find(player => !player.character);
        scrollEffect();
        __jsenv_default_import__.useEffect(() => {
          scrollEffect();
        }, []);
        return /*#__PURE__*/jsxs("div", {
          className: "character-selection-page",
          children: [/*#__PURE__*/jsx(CrewMembers, {}), playerWithoutCharacter && /*#__PURE__*/jsxs(Fragment, {
            children: [/*#__PURE__*/jsxs("p", {
              children: ["Joueur ", playerWithoutCharacter.number, " : quel pirate \xEAtes vous ?"]
            }), /*#__PURE__*/jsxs("div", {
              className: "characters-container",
              id: "menu-wrapper",
              children: [/*#__PURE__*/jsx("div", {
                className: "characters menu",
                children: CHARACTERS.map(character => {
                  return /*#__PURE__*/jsxs("div", {
                    className: `character item ${characterIsAvailable(character, players) ? "" : "disabled"}`,
                    onClick: event => {
                      if (characterIsAvailable(character, players)) {
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
                    },
                    children: [/*#__PURE__*/jsx(Image, {
                      className: "character-img",
                      width: "40",
                      height: "40",
                      src: character && character.img,
                      alt: "player",
                      style: {
                        border: `4px solid ${character && character.color || "black"}`
                      }
                    }), /*#__PURE__*/jsx("span", {
                      children: character.name
                    })]
                  }, character.id);
                })
              }), /*#__PURE__*/jsxs("div", {
                className: "paddles",
                children: [/*#__PURE__*/jsx("button", {
                  className: "left-paddle paddle hidden",
                  children: "<"
                }), /*#__PURE__*/jsx("button", {
                  className: "right-paddle paddle",
                  onClick: () => {
                    scrollEffect();
                  },
                  children: ">"
                })]
              })]
            })]
          }), !playerWithoutCharacter && /*#__PURE__*/jsxs("div", {
            className: "crew-completed",
            children: [/*#__PURE__*/jsx("p", {
              children: "L\u2019\xE9quipage est au complet !"
            }), /*#__PURE__*/jsx(Image, {
              style: {
                opacity: 0.5
              },
              src: cardToSmallImageUrl({
                type: CARD_TWO_SWORDS_CHALLENGE
              })
            }), /*#__PURE__*/jsx("button", {
              onClick: () => {
                startGame();
              },
              children: "D\xE9marrer la partie"
            })]
          })]
        });
      };
      CrewMembers = () => {
        const players = usePlayers();
        return /*#__PURE__*/jsxs("div", {
          className: `crew ${players.length > 3 ? "large-crew" : ""}`,
          children: [/*#__PURE__*/jsx("div", {
            className: "title",
            children: "Votre equipage:"
          }), /*#__PURE__*/jsx("ul", {
            children: players.map(player => {
              return /*#__PURE__*/jsxs("li", {
                children: [player.character ? /*#__PURE__*/jsx(Image, {
                  className: "crew-member-img",
                  width: "40px",
                  height: "40px",
                  src: player.character && player.character.img,
                  alt: "player",
                  style: {
                    border: `4px solid ${player.character && player.character.color || "black"}`
                  },
                  loadWhenIntersecting: false
                }) : /*#__PURE__*/jsx("div", {
                  className: "placeholder-img"
                }), /*#__PURE__*/jsx("span", {
                  children: player.character ? player.character.name : `Joueur${player.number}`
                })]
              }, player.id);
            })
          })]
        });
      };
      useStartGame = createAction(state => {
        const {
          cardIds
        } = state;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          gameStarted: true,
          cardIds: mixDeck(cardIds)
        });
      });
      characterIsAvailable = (character, players) => {
        return !players.some(player => player.character && player.character.name === character.name);
      };
      useSetPlayerCharacter = createAction((state, player, character) => {
        const {
          players
        } = state;
        player.character = character;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          players: [...players]
        });
      });
      scrollEffect = () => {
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
        window.onresize = () => {
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
          document.querySelector(".menu").onscroll = () => {
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
          rightPaddle.onclick = () => {
            if (document.querySelector(".menu")) {
              const scrollStart = document.querySelector(".menu").scrollLeft;
              const scrollEnd = scrollStart + menuWrapperSize;
              startJavaScriptAnimation({
                duration: scrollDuration,
                onProgress: _ref2 => {
                  let {
                    progress
                  } = _ref2;
                  document.querySelector(".menu").scrollLeft = scrollStart + (scrollEnd - scrollStart) * progress;
                }
              });
            }
          };
        }
        if (leftPaddle) {
          leftPaddle.onclick = () => {
            if (document.querySelector(".menu")) {
              const scrollStart = document.querySelector(".menu").scrollLeft;
              const scrollEnd = scrollStart - menuWrapperSize;
              startJavaScriptAnimation({
                duration: scrollDuration,
                onProgress: _ref3 => {
                  let {
                    progress
                  } = _ref3;
                  document.querySelector(".menu").scrollLeft = scrollStart + (scrollEnd - scrollStart) * progress;
                }
              });
            }
          };
        }
      };
      Game = _ref => {
        let {
          playerAnimationListener
        } = _ref;
        const players = usePlayers();
        const currentPlayerId = useCurrentPlayerId();
        const roundStarted = useRoundStarted();
        const isOnGameConfigurationScreen = useIsOnGameConfigurationScreen();
        const isOnCharacterSelectionScreen = useIsOnCharacterSelectionScreen();
        const [scoreboardOpenedByUser, scoreboardOpenedByUserSetter] = __jsenv_default_import__.useState(false);
        const [roundOverPayload, roundOverPayloadSetter] = __jsenv_default_import__.useState(null);
        const [playerAnimation, playerAnimationSetter] = __jsenv_default_import__.useState(null);
        const isOnScoreboardScreen = !roundStarted || scoreboardOpenedByUser;
        const player = players.find(player => player.id === currentPlayerId);
        const playerScoreWhenRoundStartedRef = __jsenv_default_import__.useRef(null);
        __jsenv_default_import__.useEffect(() => {
          if (roundOverPayload) {
            playerAnimationSetter({
              player,
              score: {
                from: playerScoreWhenRoundStartedRef.current,
                to: player.score
              },
              roundOverReason: roundOverPayload.reason,
              symbolsInChest: roundOverPayload.symbolsInChest
            });
          } else {
            playerAnimationSetter(null);
          }
        }, [roundOverPayload, currentPlayerId]);
        __jsenv_default_import__.useEffect(() => {
          if (playerAnimationListener) {
            return playerAnimationListener(playerAnimationSetter);
          }
          return undefined;
        }, [playerAnimationListener]);
        if (isOnGameConfigurationScreen) {
          return /*#__PURE__*/jsx(GameConfiguration, {});
        }
        if (isOnCharacterSelectionScreen) {
          return /*#__PURE__*/jsx(CharacterSelection, {
            players: players
          });
        }
        if (isOnScoreboardScreen) {
          return /*#__PURE__*/jsx(ScoreBoard, {
            openedByUser: scoreboardOpenedByUser,
            closeScoreboard: () => {
              scoreboardOpenedByUserSetter(false);
            },
            playerAnimation: playerAnimation
          });
        }
        return /*#__PURE__*/jsx(Round, {
          openScoreboard: () => {
            scoreboardOpenedByUserSetter(true);
          },
          onRoundStart: () => {
            playerScoreWhenRoundStartedRef.current = player.score;
            roundOverPayloadSetter(null);
          },
          onRoundOver: roundOverPayload => {
            roundOverPayloadSetter(roundOverPayload);
          }
        });
      };
      useIsOnGameConfigurationScreen = () => {
        const players = usePlayers();
        const needsToChooseNumberOfPlayers = players.length === 0;
        return needsToChooseNumberOfPlayers;
      };
      useIsOnCharacterSelectionScreen = () => {
        const gameStarted = useGameStarted();
        return !gameStarted;
      };
      useDisableAnimations = createAction(state => {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          animationsDisabled: true
        });
      });
      useEnableAnimations = createAction(state => {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          animationsDisabled: false
        });
      });
      useDisableSound = createAction(state => {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          soundDisabled: true
        });
      });
      useEnableSound = createAction(state => {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          soundDisabled: false
        });
      });
      useCancelGame = createAction(() => {
        return defaultState;
      });
      useAddToHomescreen = () => {
        const available = useAddToHomescreenAvailable();
        const prompt = useAddToHomescreenPrompt();
        return [available, prompt];
      };
      useAddToHomescreenAvailable = () => {
        const [addToHomescreenAvailable, addToHomescreenAvailableSetter] = __jsenv_default_import__.useState(addToHomescreen.availableRef.current);
        __jsenv_default_import__.useEffect(() => {
          return addToHomescreen.availableRef.subscribe(() => {
            addToHomescreenAvailableSetter(addToHomescreen.availableRef.current);
          });
        }, []);
        return addToHomescreenAvailable;
      };
      useAddToHomescreenPrompt = () => {
        return __jsenv_default_import__.useCallback(addToHomescreen.prompt);
      };
      UpdateApplication = _ref => {
        let {
          settingsDialogIsOpen
        } = _ref;
        if (!swFacade) {
          return null;
        }
        return /*#__PURE__*/jsx(ServiceWorkerView, {
          settingsDialogIsOpen: settingsDialogIsOpen
        });
      };
      ServiceWorkerView = _ref2 => {
        let {
          checkOnOpen = true,
          settingsDialogIsOpen
        } = _ref2;
        const [update, updateSetter] = __jsenv_default_import__.useState(swFacade.state.update);
        __jsenv_default_import__.useEffect(() => {
          return swFacade.subscribe(() => {
            updateSetter(swFacade.state.update);
          });
        }, []);
        __jsenv_default_import__.useEffect(() => {
          if (checkOnOpen && settingsDialogIsOpen) {
            swFacade.checkForUpdates();
          }
        }, [checkOnOpen, settingsDialogIsOpen]);
        return /*#__PURE__*/jsxs("fieldset", {
          style: {
            minHeight: "4em"
          },
          children: [/*#__PURE__*/jsx("legend", {
            children: "Mise a jour"
          }), update.readyState ? /*#__PURE__*/jsx(UpdateAvailable, {
            update: update
          }) : /*#__PURE__*/jsx(UpdateNotAvailable, {})]
        });
      };
      UpdateAvailable = _ref3 => {
        let {
          update
        } = _ref3;
        const {
          readyState,
          reloadRequired
        } = update;
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsxs("p", {
            children: [readyState === "installing" ? "Mise a jour..." : null, readyState === "installed" ? "Mise a jour prête" : null, readyState === "activating" ? "Activation de la mise a jour..." : null, readyState === "activated" ? `Mise a jour activée, la page va se recharger` : null]
          }), /*#__PURE__*/jsx("button", {
            disabled: !readyState,
            onClick: () => {
              swFacade.activateUpdate();
            },
            children: reloadRequired ? `Recharger pour mettre a jour` : `Mettre a jour`
          })]
        });
      };
      UpdateNotAvailable = () => {
        const [updateAttemptStatus, updateAttemptStatusSetter] = __jsenv_default_import__.useState("");
        const check = __jsenv_default_import__.useCallback(async () => {
          updateAttemptStatusSetter("fetching");
          try {
            const found = await swFacade.checkForUpdates();
            if (found) {
              // no need to handle that case because
              // an update is now available
              // meaning <UpdateAvailable /> will take over.
            } else {
              updateAttemptStatusSetter("notfound");
            }
          } catch (e) {
            updateAttemptStatusSetter("failed");
            console.error(e);
          }
        }, []);
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsxs("p", {
            children: [updateAttemptStatus === "fetching" ? "Recherche de mise a jour..." : null, updateAttemptStatus === "notfound" ? "Pas de mise a jour disponible." : null, updateAttemptStatus === "failed" ? "Une erreur est survenue." : null]
          }), /*#__PURE__*/jsx("button", {
            disabled: updateAttemptStatus === "fetching",
            onClick: check,
            children: "Chercher"
          })]
        });
      };
      settingsCssUrl = new URL(__v__("/css/settings.css"), _context.meta.url);
      Settings = () => {
        const [settingsDialogIsOpen, openSettingsDialog, closeSettingsDialog] = useDialogState();
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx(Stylesheet, {
            href: settingsCssUrl
          }), /*#__PURE__*/jsx("div", {
            id: "settings",
            onClick: () => {
              openSettingsDialog();
            },
            children: /*#__PURE__*/jsx("svg", {
              className: "settings-icon",
              width: "24px",
              height: "24px",
              viewBox: "0 0 24 24",
              children: /*#__PURE__*/jsx("path", {
                fill: "currentColor",
                d: "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
              })
            })
          }), /*#__PURE__*/jsx(SettingsDialog, {
            settingsDialogIsOpen: settingsDialogIsOpen,
            closeSettingsDialog: closeSettingsDialog
          })]
        });
      };
      SettingsDialog = _ref => {
        let {
          settingsDialogIsOpen,
          closeSettingsDialog
        } = _ref;
        const animationsDisabled = useAnimationsDisabled();
        const disableAnimations = useDisableAnimations();
        const enableAnimations = useEnableAnimations();

        // TODO later: give this an effect on sounds
        const soundDisabled = useSoundDisabled();
        const disableSound = useDisableSound();
        const enableSound = useEnableSound();
        const cancelGame = useCancelGame();
        const [confirmCancelGameDialogIsOpen, confirmCancelGameDialogIsOpenSetter] = __jsenv_default_import__.useState(false);
        const openConfirmCancelGameDialog = () => {
          confirmCancelGameDialogIsOpenSetter(true);
        };
        const closeConfirmCancelGameDialog = () => {
          confirmCancelGameDialogIsOpenSetter(false);
        };
        const requestCancelGame = () => {
          openConfirmCancelGameDialog();
        };
        const performCancelGame = () => {
          cancelGame();
          closeSettingsDialog();
        };
        return /*#__PURE__*/jsx(Dialog, {
          className: "settings-dialog dialog-spacing-10 dialog-spacing-fluid dialog-spacing-left-fixed dialog-spacing-right-fixed",
          isOpen: settingsDialogIsOpen,
          onRequestClose: closeSettingsDialog,
          requestCloseOnClickOutside: true,
          children: /*#__PURE__*/jsxs("div", {
            className: "settings-dialog-content",
            children: [/*#__PURE__*/jsx("div", {
              className: "dialog-close",
              onClick: closeSettingsDialog,
              children: /*#__PURE__*/jsx(CloseIcon, {})
            }), /*#__PURE__*/jsx("div", {
              className: "dialog-simple-title",
              children: "Settings"
            }), /*#__PURE__*/jsx("div", {
              className: "setting-element",
              children: /*#__PURE__*/jsxs("label", {
                children: [/*#__PURE__*/jsx("input", {
                  type: "checkbox",
                  className: animationsDisabled ? "checked" : "unchecked",
                  checked: animationsDisabled,
                  onChange: e => {
                    if (e.target.checked) {
                      disableAnimations();
                    } else {
                      enableAnimations();
                    }
                  }
                }), animationsDisabled && /*#__PURE__*/jsx(CheckIcon, {}), "D\xE9sactiver les animations"]
              })
            }), /*#__PURE__*/jsx("div", {
              className: "setting-element",
              children: /*#__PURE__*/jsxs("label", {
                children: [/*#__PURE__*/jsx("input", {
                  type: "checkbox",
                  className: soundDisabled ? "checked" : "unchecked",
                  checked: soundDisabled,
                  onChange: e => {
                    if (e.target.checked) {
                      disableSound();
                    } else {
                      enableSound();
                    }
                  }
                }), soundDisabled && /*#__PURE__*/jsx(CheckIcon, {}), "Couper le son"]
              })
            }), /*#__PURE__*/jsx("div", {
              className: "setting-element",
              children: /*#__PURE__*/jsx("button", {
                onClick: () => {
                  requestCancelGame();
                },
                children: "Annuler la partie"
              })
            }), /*#__PURE__*/jsx(AddToHomescreen, {}), /*#__PURE__*/jsx(UpdateApplication, {
              settingsDialogIsOpen: settingsDialogIsOpen
            }), /*#__PURE__*/jsx(ConfirmCancelGameDialog, {
              confirmCancelGameDialogIsOpen: confirmCancelGameDialogIsOpen,
              closeConfirmCancelGameDialog: closeConfirmCancelGameDialog,
              performCancelGame: performCancelGame
            })]
          })
        });
      };
      AddToHomescreen = () => {
        const [available, prompt] = useAddToHomescreen();
        if (!available) {
          return null;
        }
        return /*#__PURE__*/jsx("button", {
          onClick: () => {
            prompt();
          },
          children: "Installer application"
        });
      };
      CheckIcon = () => /*#__PURE__*/jsx("svg", {
        className: "check-icon",
        width: "20",
        height: "20",
        viewBox: "0 0 512 512",
        children: /*#__PURE__*/jsx("path", {
          fill: "currentColor",
          d: "M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"
        })
      });
      ConfirmCancelGameDialog = _ref2 => {
        let {
          confirmCancelGameDialogIsOpen,
          closeConfirmCancelGameDialog,
          performCancelGame
        } = _ref2;
        return /*#__PURE__*/jsx(Dialog, {
          className: "confirm-cancel-game-dialog dialog-spacing-10 dialog-spacing-fluid dialog-spacing-left-fixed dialog-spacing-right-fixed",
          isOpen: confirmCancelGameDialogIsOpen,
          onRequestClose: closeConfirmCancelGameDialog,
          requestCloseOnClickOutside: true,
          children: /*#__PURE__*/jsxs("div", {
            className: "settings-dialog-content",
            children: [/*#__PURE__*/jsx("div", {
              className: "dialog-close",
              onClick: closeConfirmCancelGameDialog,
              children: /*#__PURE__*/jsx(CloseIcon, {})
            }), /*#__PURE__*/jsxs("div", {
              className: "title-container",
              children: [/*#__PURE__*/jsx(Image, {
                className: "illustration",
                src: symbolMonkeyUrl,
                width: "40",
                height: "40"
              }), /*#__PURE__*/jsx("div", {
                className: "title",
                children: "\xCAtes-vous certain de vouloir annuler la partie ?"
              })]
            }), /*#__PURE__*/jsx("div", {
              className: "content",
              children: "Cette action irr\xE9versible effacera la progression actuelle et remettra la partie \xE0 z\xE9ro !"
            }), /*#__PURE__*/jsx("div", {
              className: "confirm-action",
              children: /*#__PURE__*/jsx("button", {
                onClick: () => {
                  performCancelGame();
                  closeConfirmCancelGameDialog();
                },
                children: "Confirmer"
              })
            })]
          })
        });
      };
      _export("App", App = props => {
        return /*#__PURE__*/jsxs("div", {
          id: "main",
          ref: useMainDomNodeSetter(),
          children: [/*#__PURE__*/jsx(Settings, {}), /*#__PURE__*/jsx(AppBody, _objectSpread2({}, props))]
        });
      });
      AppBody = props => {
        const gameCreated = useGameCreated();
        if (gameCreated) {
          return /*#__PURE__*/jsx(Game, _objectSpread2({}, props));
        }
        return /*#__PURE__*/jsx(Home, _objectSpread2({}, props));
      };
    }
  };
});