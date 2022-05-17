import React from "react"

import { CHARACTERS } from "/src/app/players/players.main.js"
import { Image } from "/src/app/generic/Image.jsx"
import { usePlayers, createAction } from "/src/app/main.store.js"
import {
  mixDeck,
  cardToSmallImageUrl,
  CARD_TWO_SWORDS_CHALLENGE,
} from "/src/app/cards/cards.js"
import { startJavaScriptAnimation } from "/src/app/animation/startJavaScriptAnimation.js"

export const CharacterSelection = ({ players }) => {
  const setPlayerCharacter = useSetPlayerCharacter()
  const startGame = useStartGame()
  const playerWithoutCharacter = players.find((player) => !player.character)
  scrollEffect()

  React.useEffect(() => {
    scrollEffect()
  }, [])

  return (
    <div className="character-selection-page">
      <CrewMembers />
      {playerWithoutCharacter && (
        <>
          <p>
            Joueur {playerWithoutCharacter.number} : quel pirate êtes vous ?
          </p>
          <div className="characters-container" id="menu-wrapper">
            <div className="characters menu">
              {CHARACTERS.map((character) => {
                return (
                  <div
                    className={`character item ${
                      characterIsAvailable(character, players) ? "" : "disabled"
                    }`}
                    key={character.id}
                    onClick={(event) => {
                      if (characterIsAvailable(character, players)) {
                        event.target.animate(
                          [
                            { transform: "scale(1)" },
                            { transform: "scale(1.3)" },
                            { transform: "scale(1)" },
                          ],
                          {
                            duration: 400,
                            fill: "forwards",
                          },
                        )
                        setPlayerCharacter(playerWithoutCharacter, character)
                      }
                    }}
                  >
                    <Image
                      className="character-img"
                      width="40"
                      height="40"
                      src={character && character.img}
                      alt="player"
                      style={{
                        border: `4px solid ${
                          (character && character.color) || "black"
                        }`,
                      }}
                    />
                    <span>{character.name}</span>
                  </div>
                )
              })}
            </div>
            <div className="paddles">
              <button className="left-paddle paddle hidden">{"<"}</button>
              <button
                className="right-paddle paddle"
                onClick={() => {
                  scrollEffect()
                }}
              >
                {">"}
              </button>
            </div>
          </div>
        </>
      )}

      {!playerWithoutCharacter && (
        <div className="crew-completed">
          <p>L’équipage est au complet !</p>
          <Image
            style={{ opacity: 0.5 }}
            src={cardToSmallImageUrl({ type: CARD_TWO_SWORDS_CHALLENGE })}
          />
          <button
            onClick={() => {
              startGame()
            }}
          >
            Démarrer la partie
          </button>
        </div>
      )}
    </div>
  )
}

const CrewMembers = () => {
  const players = usePlayers()

  return (
    <div className={`crew ${players.length > 3 ? "large-crew" : ""}`}>
      <div className="title">Votre equipage:</div>
      <ul>
        {players.map((player) => {
          return (
            <li key={player.id}>
              {player.character ? (
                <Image
                  className="crew-member-img"
                  width="40px"
                  height="40px"
                  src={player.character && player.character.img}
                  alt="player"
                  style={{
                    border: `4px solid ${
                      (player.character && player.character.color) || "black"
                    }`,
                  }}
                  loadWhenIntersecting={false}
                />
              ) : (
                <div className="placeholder-img"></div>
              )}
              <span>
                {player.character
                  ? player.character.name
                  : `Joueur${player.number}`}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const useStartGame = createAction((state) => {
  const { cardIds } = state
  return {
    ...state,
    gameStarted: true,
    cardIds: mixDeck(cardIds),
  }
})

const characterIsAvailable = (character, players) => {
  return !players.some(
    (player) => player.character && player.character.name === character.name,
  )
}

const useSetPlayerCharacter = createAction((state, player, character) => {
  const { players } = state
  player.character = character
  return {
    ...state,
    players: [...players],
  }
})

const scrollEffect = () => {
  var scrollDuration = 300
  var itemsLength = document.getElementsByClassName("item").length
  var itemSize = 123

  var getMenuWrapperSize = function () {
    return document.getElementById("menu-wrapper")
      ? document.getElementById("menu-wrapper").offsetWidth
      : null
  }
  var menuWrapperSize = getMenuWrapperSize()
  var getMenuSize = function () {
    return itemsLength * itemSize
  }
  var menuSize = getMenuSize()
  window.onresize = () => {
    menuWrapperSize = getMenuWrapperSize()
  }
  var menuVisibleSize = menuWrapperSize
  var menuInvisibleSize = menuSize - menuVisibleSize

  var getMenuPosition = function () {
    return document.querySelector(".menu").scrollLeft
  }
  var leftPaddle = document.querySelector(".left-paddle")
  var rightPaddle = document.querySelector(".right-paddle")

  if (document.querySelector(".menu")) {
    document.querySelector(".menu").onscroll = () => {
      menuInvisibleSize = menuSize - menuWrapperSize
      var menuPosition = getMenuPosition()
      var menuEndOffset = menuInvisibleSize

      if (menuPosition <= 0) {
        leftPaddle.classList.add("hidden")
        rightPaddle.classList.remove("hidden")
      } else if (menuPosition < menuEndOffset) {
        // show both paddles in the middle
        leftPaddle.classList.remove("hidden")
        rightPaddle.classList.remove("hidden")
      } else if (menuPosition >= menuEndOffset) {
        leftPaddle.classList.remove("hidden")
        rightPaddle.classList.add("hidden")
      }
    }
  }

  if (rightPaddle) {
    rightPaddle.onclick = () => {
      if (document.querySelector(".menu")) {
        const scrollStart = document.querySelector(".menu").scrollLeft
        const scrollEnd = scrollStart + menuWrapperSize
        startJavaScriptAnimation({
          duration: scrollDuration,
          onProgress: ({ progress }) => {
            document.querySelector(".menu").scrollLeft =
              scrollStart + (scrollEnd - scrollStart) * progress
          },
        })
      }
    }
  }

  if (leftPaddle) {
    leftPaddle.onclick = () => {
      if (document.querySelector(".menu")) {
        const scrollStart = document.querySelector(".menu").scrollLeft
        const scrollEnd = scrollStart - menuWrapperSize
        startJavaScriptAnimation({
          duration: scrollDuration,
          onProgress: ({ progress }) => {
            document.querySelector(".menu").scrollLeft =
              scrollStart + (scrollEnd - scrollStart) * progress
          },
        })
      }
    }
  }
}
